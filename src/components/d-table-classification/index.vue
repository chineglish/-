<template>
  <div class="d-table-classification">
    <!-- table - title -->
    <div class="table-title" :class="tableTitle.isBorder ? 'title-border' : ''" v-if="tableTitle">
      <div class="left" v-if="tableTitle.leftInfo">
        <span class="title">{{tableTitle.leftInfo.title}}</span>
        <span class="select" v-if="tableTitle.leftInfo.options">
          <el-select v-model="optValue" placeholder="请选择">
            <el-option
              v-for="item in tableTitle.leftInfo.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="right" v-if="tableTitle.rightInfo">
        <span class="tip" v-if="tableTitle.rightInfo.tip">{{tableTitle.rightInfo.tip}}</span>
        <span class="btn" v-if="tableTitle.rightInfo.queryBtn">
          <el-button
            :type="tableTitle.rightInfo.queryBtn.type || 'primary'"
            :size="tableTitle.rightInfo.queryBtn.size || 'mini'"
            @click.native.prevent="handleActionClickEvent(tableTitle.rightInfo.queryBtn.eventName, optValue)"
          >
            {{tableTitle.rightInfo.queryBtn.innerText}}
          </el-button>
        </span>
      </div>
    </div>
    <!-- table 开始-->
    <table class="table">
      <thead class="thead fs14">
      <th class="th" :key="idx" v-for="(item, idx) in tableHeadData">{{item.label}}</th>
      </thead>
      <tbody class="tbody fs16">
      <template v-for="(item, idx) in copyTableData">
        <!-- 大类行数据 -->
        <tr class="tr fs13 classification-tr" :key="fields.parentTypeField + idx">
          <td
            :key="fields.parentTypeField + subIdx"
            :class="{'first-td': subItem.prop === fields.typeField}"
            v-for="(subItem, subIdx) in tableHeadData">
            <span v-if="subItem.prop === fields.typeField" class="collapse-icon" @click="handleCollapseChange(item)">{{item.collapse ? '+' : '-'}}</span>
            <span>{{subItem.prop === fields.typeField ? item[fields.parentTypeField] : item[subItem.prop]}}</span>
          </td>
        </tr>
        <!-- 子类行数据 -->
        <tr class="tr fs13" v-show="!item.collapse" :key="fields.typeField + idx + subIdx" v-for="(subItem, subIdx) in item.children">
          <td
            :key="fields.typeField + ssubIdx"
            :class="{'first-td': ssubItem.prop === fields.typeField}"
            v-for="(ssubItem, ssubIdx) in tableHeadData">{{subItem[ssubItem.prop]}}
          </td>
        </tr>
      </template>
      </tbody>
    </table>
    <!-- 信息提示 -->
    <div class="info-tips fs16" v-if="infoTips.length !== 0">
      <span
      class="fs16"
        v-for="(item, index) in infoTips"
        :key="index"
        @click="handleTipsClick(item, index)"
      >
        {{item}}
      </span>
    </div>
    <!-- 分页   -->
    <el-pagination
      v-show="isPagination"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      background
      layout="->, prev, pager, next, total, jumper"
      :total="copyTableData.length">
    </el-pagination>
    <!-- 操作按钮 -->
    <div class="action-btn" v-if="actionData.length !== 0">
      <div v-for="(item, index) in actionData" :key="index">
        <el-button
          :type="item.type"
          :size="item.size || 'mini'"
          :plain="item.plain || false"
          :round="item.round || false"
          :circle="item.circle || false"
          :class="item.class || 'm-submit-btn'"
          :disabled="item.disabled || false"
          @click.native.prevent="handleActionClickEvent(item.eventName, copyTableData)"
        >{{item.btnText}}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'd-table-classification',
  props: {
    tableTitle: { // table title
      type: Object,
      default: () => ({})
    },
    options: { // table properties
      type: Object,
      default: () => ({
        // 是否 启用斑马线效果
        stripe: true,
        // 是否 启用边框
        border: false,
        // 是否 修改表头背景色，字体颜色
        headerClassName: true,
        // 是否 启用当前行高亮
        highCurrentRow: false,
        // 当前行 css 类名
        rowClassName: ''
      })
    },
    tableData: { // table body-data
      type: Array,
      default: () => []
    },
    firstColIndex: { // table first index column
      type: Object,
      required: null
    },
    tableHeight: { // 表格高度
      type: [String, Number],
      default: null
    },
    tableHeadData: { // 表头数据
      type: Array,
      default: () => []
    },
    operateData: { // 操作配置
      type: Object,
      default: null
    },
    infoTips: { // 信息提示
      type: Array,
      default: () => []
    },
    actionData: { // 按钮操作配置
      type: Array,
      default: () => []
    },
    isPagination: { // 是否分页
      type: Boolean,
      default: false
    },
    linkKey: { // 链接判断标志
      type: String,
      default: null
    },
    fields: { // 表格数据字段说明
      type: Object,
      required: true
    }
  },
  data () {
    return {
      optValue: '全部', // 下拉选择框
      copyTableData: [],
      height: null, // 表格高度
      currentPage: 1, // 当前页数
      pagesize: 8 // 每页显示数据条数
    }
  },
  watch: {
    // 监听表格高度变化
    tableHeight (newVal) {
      this.height = newVal
    },
    // 深度监听table数据
    tableData: {
      immediate: true,
      deep: true,
      handler (newArr) {
        if (newArr.length === 0) return
        this.copyTableData = this.handleTableData(this._deepCopyList(newArr), this.fields.parentTypeField)
      }
    }
  },
  methods: {
    // 设置表头颜色
    getRowClass ({ rowIndex }) {
      if (rowIndex === 0) {
        return 'background: #fdf2f3; color: #3d3c3c;'
      } else {
        return ''
      }
    },
    // 处理信息提示
    handleTipsClick (item, index) {
      let params = {
        item: item,
        index: index
      }
      this.$emit('handleTipsClick', params)
    },
    // 处理table点击事件
    handleClickEvent (eventName, index, tabledata) {
      if (!eventName) return
      let params = {
        index: index,
        data: tabledata
      }
      this.$emit(eventName, params)
    },
    // 处理action操作 点击事件
    handleActionClickEvent (eventName, tabledata) {
      if (!eventName) return
      let params = {
        data: tabledata
      }
      this.$emit(eventName, params)
    },
    // 处理多选table事件
    handleSelectionChange (selection) {
      this.$emit('handleSelectionChange', selection)
    },
    // 深度遍历table数据
    _deepCopyList (list) {
      let that = this
      let reset = list instanceof Array ? [] : {}
      for (let i in list) {
        reset[i] = typeof list[i] === 'object' ? that._deepCopyList(list[i]) : list[i]
      }
      return reset
    },
    // 分页改变
    handleCurrentChange () {
    },
    clickTableLink (data) {
      this.$emit('clickTableLink', data)
    },
    // 表格数据归类
    handleTableData (data = [], fieldName) {
      if (typeof fieldName !== 'string' || fieldName.length === 0) {
        return data
      }

      const result = data.reduce((acc, cur) => {
        const parentType = cur[fieldName]
        const idx = acc.findIndex(item => item[fieldName] === parentType)
        if (idx !== -1) {
          const oldValue = acc[idx]
          acc[idx] = { ...oldValue, children: [...oldValue.children, cur] }
        } else {
          acc = [...acc, { ...cur, collapse: true, children: [cur] }]
        }
        return acc
      }, [])

      return result
    },
    // 折叠子类行数据
    handleCollapseChange (row) {
      row.collapse = !row.collapse
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-class-name {
    color: #f00;
  }

  .d-table-classification {
    box-shadow: 0 0 10px #ddd;

    .table {
      border-collapse: collapse;
      border: none;
      width: 100%;
      text-align: center;

      .thead {
        color: #333;
        background: #FDF2F3;

        .th {
          box-sizing: border-box;
          vertical-align: bottom;
          padding: 0;
          height: 46px;
          line-height: 46px;
        }
      }

      .tbody {
        color: #666;
        background: #fff;

        .tr {
          height: 46px;

          &:not(:last-of-type) {
            border-bottom: 1px solid #ebeef5;
          }

          &:hover {
            background: #f5f7fa;
          }

          &.classification-tr {
            height: 54px;
            background: #f8f8f8;
          }

          td.first-td {
            position: relative;
            padding-left: 42px;
            text-align: left;

            .collapse-icon {
              position: absolute;
              top: 50%;
              left: 18px;
              transform: translateY(-50%);
              width: 14px;
              height: 14px;
              line-height: 14px;
              text-align: center;
              background: #B51011;
              border: 1px solid #B51011;
              border-radius: 50%;
              color: #fff;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .d-table-classification .table-title {
    height: 54px;
    line-height: 54px;
    padding: 0px 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }

  // table标题的border
  .title-border {
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
    border-right: 1px solid #eee;
  }

  .tableTitle .left {
    float: left;
  }

  .table-title .right {
    float: right;
  }

  .table-title .title, .table-title .tip {
    margin-right: 20px;
  }

  .info-tips {
    width: 90%;
    display: flex;
    justify-content: flex-end;
    padding-right: 10%;
    height: 50px;
    line-height: 50px;
  }

  .info-tips span {
    display: inline-block;
    padding-right: 100px;
    color: #009CD8;
    cursor: pointer;
  }
</style>
