<template>
    <!-- 日期区域 -->
    <div>
        <el-col style="width: 156px">
            <div class="date-area">
            <!-- 月选择 -->
            <el-date-picker
                v-if="item.dateType === 'month'"
                v-model="form[item.firstKey]"
                type="month"
                :format="item.format ? item.format : 'yyyy-MM-dd'"
                :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
                placeholder="请选择月"
                @change="changeEvent(item.changeEventName)"
                >
            </el-date-picker>
            <!-- 年选择 -->
            <el-date-picker
                v-else-if="item.dateType === 'year'"
                v-model="form[item.firstKey]"
                type="year"
                :format="item.format ? item.format : 'yyyy-MM-dd'"
                :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
                placeholder="请选择年"
                @change="changeEvent(item.changeEventName)"
                >
            </el-date-picker>
            <!-- 季度选择 -->
            <quarter
                v-else-if="item.dateType === 'quarter'"
                spliceValue='0'
                :valueArr='item.valueArr'
                @change="(obj, value) => {
                form[item.firstKey] = value
                item.changeEventName ? changeEvent(item.changeEventName) : ''
                }"
            ></quarter>
            <!-- 多日期选择 -->
            <el-date-picker
                v-else-if="item.dateType === 'dates'"
                type="dates"
                v-model="form[item.firstKey]"
                @change="changeEvent(item.changeEventName)"
                placeholder="请选择一个或多个日期">
            </el-date-picker>
            <!-- 正常日期选择 -->
            <el-date-picker
                v-else
                type="date"
                :picker-options="statPickerOptions(form[item.secondKey], item.areaLimit, item.startRestrictionStart, item.endRestrictionEnd, item.valueFormat)"
                :disabled="item.disabled || form[item.isDisabled]"
                :placeholder="item.placeholder ? item.placeholder : '请选择日期'"
                v-model="form[item.firstKey]"
                :style="{'width': item.width ? item.width : '100%'}"
                :format="item.format ? item.format : 'yyyy-MM-dd'"
                :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
                @change="changeEvent(item.changeEventName)">
            </el-date-picker>
            </div>
        </el-col>
        <el-col style="text-align: center; width: 30px">-</el-col>
        <el-col class="date-area" style="width: 156px">
            <div class="date-area">
            <!-- 月选择 -->
            <el-date-picker
              v-if="item.dateType === 'month'"
              v-model="form[item.secondKey]"
              type="month"
              :format="item.format ? item.format : 'yyyy-MM-dd'"
              :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
              placeholder="请选择月"
              @change="changeEvent(item.changeEventName)"
              >
            </el-date-picker>
            <!-- 年选择 -->
            <el-date-picker
                v-else-if="item.dateType === 'year'"
                v-model="form[item.secondKey]"
                type="year"
                :format="item.format ? item.format : 'yyyy-MM-dd'"
                :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
                placeholder="请选择年"
                @change="changeEvent(item.changeEventName)"
                >
            </el-date-picker>
            <!-- 季度选择 -->
            <quarter
                v-else-if="item.dateType === 'quarter'"
                spliceValue='1'
                :valueArr='item.valueArr'
                @change="(obj, value)=>{
                form[item.secondKey] = value
                item.changeEventName ? changeEvent(item.changeEventName) : ''
                }"
            ></quarter>
            <!-- 多日期选择 -->
            <el-date-picker
                v-else-if="item.dateType === 'dates'"
                type="dates"
                v-model="form[item.secondKey]"
                placeholder="请选择一个或多个日期"
                @change="changeEvent(item.changeEventName)"
                >
            </el-date-picker>
            <!-- 正常日期选择 -->
            <el-date-picker
                v-else
                :picker-options="endPickerOptions(form[item.firstKey], item.areaLimit, item.endRestrictionStart, item.endRestrictionEnd, item.valueFormat)"
                :disabled="item.disabled || form[item.isDisabled]"
                :placeholder="item.placeholder ? item.placeholder : '请选择日期'"
                v-model="form[item.secondKey]"
                :format="item.format ? item.format : 'yyyy-MM-dd'"
                :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
                :style="{'width': item.width ? item.width : '100%'}"
                @change="changeEvent(item.changeEventName)"
            ></el-date-picker>
            </div>
        </el-col>
    </div>
</template>

<script>
import Quarter from './quarter'
import util from '@/libs/util'
export default {
  name: 'DateArea',
  components: {
    Quarter
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    form: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    changeEvent (changeEventName) {
      this.$emit('changeDate', changeEventName)
    },
    // 筛选时间域开始日期
    /**
     * startRestriction 可以限制开始日期前面不可选的范围
     * endRestriction 可以限制开始日期后面不可选的范围
     */
    statPickerOptions (endDate, areaLimit, startRestriction, endRestriction, valueFormat) {
      let startTime = {
        disabledDate: time => {
          let flag = false
          if (endDate) {
            let end = endDate
            if (valueFormat && (valueFormat === 'yyyyMMDD' || valueFormat === 'yyyyMMdd')) {
              end = util.separationDate(endDate)
            }
            flag = flag || (time.getTime() > new Date(end).getTime())
            if (areaLimit === '3M') {
              flag = flag || (time.getTime() < (new Date(end).getTime() - 1000 * 60 * 60 * 24 * 30 * 3))
            }
          }
          if (startRestriction) {
            flag = flag || (time.getTime() < startRestriction)
          }
          if (endRestriction) {
            flag = flag || (time.getTime() > endRestriction)
          }
          return flag
        }
      }
      return startTime
    },
    // 筛选时间域结束日期
    endPickerOptions (startDate, areaLimit, startRestriction, endRestriction, valueFormat) {
      let endTime = {
        disabledDate: time => {
          let flag = false
          if (startDate) {
            let start = startDate
            if (valueFormat && (valueFormat === 'yyyyMMDD' || valueFormat === 'yyyyMMdd')) {
              start = util.separationDate(startDate)
            }
            const startTime = new Date(start).getTime()
            flag = flag || (time.getTime() < (startTime - 1000 * 3600 * 24))
            if (areaLimit === '3M') {
              flag = flag || (time.getTime() > (new Date(start).getTime() + 1000 * 60 * 60 * 24 * 30 * 3))
            }
          }
          if (startRestriction) {
            flag = flag || (time.getTime() > startRestriction)
          }
          if (endRestriction) {
            flag = flag || (time.getTime() < endRestriction)
          }
          return flag
        }
      }
      return endTime
    }
  },
  created () {
  }
}
</script>
