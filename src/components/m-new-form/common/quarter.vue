<template>
    <div>
        <div style="position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,0);z-index:999;" v-show="showSeason" @click.stop="showSeason=false"></div>
        <el-input placeholder="请选择季度" v-model="value" style="width:150px;" @focus="showSeason=true">
            <i slot="prefix" class="el-input__icon el-icon-date"></i>
        </el-input>
        <el-card class="box-card" style="width:322px;padding: 0 3px 20px;margin-top:10px;position:absolute;z-index:9999" v-show="showSeason">
            <div slot="header" class="clearfix" style="text-align:center;padding:0">
                <button type="button" aria-label="前一年" class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left" @click="prev"></button>
                <span role="button" class="el-date-picker__header-label">{{year}}年</span>
                <button type="button" aria-label="后一年" @click="next" class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"></button>
            </div>
            <div class="text item" style="text-align:center; overflow: hidden;">
                <el-button v-for="item in seasonList" :key="item.key" type="text" size="medium" style="width: 50%; color: #606266; float:left;" @click="selectSeason(item)">
                    {{ item.value }}
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'common',
  data () {
    return {
      value: '',
      showSeason: false,
      year: this.defaultDate ? new Date(this.defaultDate).getFullYear() : new Date().getFullYear(),
      seasonList: [
        {
          key: '0101/0331',
          value: '第一季度'
        },
        {
          key: '0401/0630',
          value: '第二季度'
        },
        {
          key: '0701/0930',
          value: '第三季度'
        },
        {
          key: '1001/1231',
          value: '第四季度'
        }
      ]
    }
  },
  props: {
    valueArr: {
      default: () => {
        return ['01-03', '04-06', '07-09', '10-12']
      },
      type: Array
    },
    defaultDate: {
      default: () => {
        return new Date()
      }
    },
    spliceValue: {
      default: '',
      type: String
    }
  },
  watch: {
    defaultDate: function (val) {
      this.handleQuarterDate(val)
    }
  },
  methods: {
    prev () {
      this.year = this.year * 1 - 1
    },
    next () {
      this.year = this.year * 1 + 1
    },
    selectSeason (obj) {
      // console.log(' selectSeason (obj) ===  ', obj)
      this.value = `${this.year}年${obj.value}`
      this.showSeason = false
      let list = obj.key.split('/')
      list[0] = `${this.year}${list[0]}`
      list[1] = `${this.year}${list[1]}`
      if (this.spliceValue === '') {
        this.$emit('change', obj, list)
      } else {
        this.$emit('change', obj, list[this.spliceValue])
      }
    },
    handleQuarterDate (val) {
      const newDate = new Date(val)
      let str = newDate.getMonth() >= 1 && newDate.getMonth() <= 3 ? '01-03' : newDate.getMonth() >= 4 && newDate.getMonth() <= 6 ? '04-06' : newDate.getMonth() >= 7 && newDate.getMonth() <= 9 ? '07-09' : newDate.getMonth() >= 10 && newDate.getMonth() <= 12 ? '10-12' : ''
      this.value = `${this.year}年${this.seasonList[this.valueArr.indexOf(str)].value}`
      switch (str) {
        case '01-03':
          this.selectSeason(this.seasonList[0])
          break
        case '04-06':
          this.selectSeason(this.seasonList[1])
          break
        case '07-09':
          this.selectSeason(this.seasonList[2])
          break
        case '10-12':
          this.selectSeason(this.seasonList[3])
          break
      }
    }
  },
  created () {
    if (this.defaultDate) {
      this.handleQuarterDate(this.defaultDate)
    }
  }
}
</script>

<style scoped>
    .el-button+.el-button {
        margin: 0;
    }
</style>
