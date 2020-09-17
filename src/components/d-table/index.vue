<template>
  <div class="d-table">
    <!-- table - title -->
    <div ref="tableTitleDom" id="tableTitleDom" class="table-title" :class="tableTitle.isBorder ? 'title-border' : ''" v-if="tableTitle">
      <div class="left" v-if="tableTitle.leftInfo">
        <span class="title fs18 ">{{tableTitle.leftInfo.title}}</span>
        <span class="select" v-if="tableTitle.leftInfo.options">
          <el-select v-model="optValue" placeholder="请选择">
            <el-option
              v-for="item in tableTitle.leftInfo.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
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
    <el-table
        id="table"
        v-loading="loading"
        :data="pagesize ? copyTableData.slice((currentPage-1)*pageSize,currentPage*pageSize) : copyTableData"
        :stripe="options.stripe"
        :border="options.border"
        :header-cell-style="getRowClass"
        :highlight-current-row="options.highCurrentRow ? options.highCurrentRow : true"
        :row-class-name="options.rowClassName"
        :height="height"
        :default-sort="defaultSort"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
        @current-change="(row) => getSelectable(row)"
        style="width: 100%">
        <!-- 是否展示行号,多选 -->
        <el-table-column
          v-if="firstColIndex && firstColIndex.type !== 'radio'"
          :label="firstColIndex.label ? firstColIndex.label : ''"
          :type="firstColIndex.type"
          :align="firstColIndex.center || 'center'"
          :fixed="firstColIndex.fixed || false"
          :selectable="firstColIndex.selectable"
          :width="firstColIndex.width || '55'">
        </el-table-column>
        <!-- 单选 -->
        <el-table-column
          v-if="firstColIndex && firstColIndex.type === 'radio'"
          :label="firstColIndex.label ? firstColIndex.label : ''"
          :type="firstColIndex.type"
          :align="firstColIndex.center || 'center'"
          :fixed="firstColIndex.fixed || false"
          :selectable="firstColIndex.selectable"
          :width="firstColIndex.width || '55'">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row"
              :disabled="typeof firstColIndex.selectable === 'function' ? !firstColIndex.selectable(scope.row) : false"
              v-model="templateRadio"
              @change.native="getSelectable(scope.row)">
              {{''}}
            </el-radio>
          </template>
        </el-table-column>
        <!-- 表头数据 -->
        <template v-for="(head, index) in tableHeadData">
          <!-- 表格内容拥有clickEventName,链接可点击 -->
          <el-table-column
            v-if="head.clickEventName"
            :key="index"
            :prop="head.prop"
            :label="head.label"
            :align="head.align || 'center'"
            :header-align="head.headerAlign || 'center'"
            :fixed="head.fixed || false"
            :width="head.width || null"
            :formatter="head.formatter"
            :sortable="head.sortable || false"
            :sort-method="head.sortMethod"
            :filters="head.filters"
            :filter-method="head.filterHandler"
          >
            <template slot-scope="scope">
              <!-- 如果checkLink存在并且返回false不可点击 -->
              <div class="table-link fs13" v-if="head.checkLink === undefined || head.checkLink(scope.row[head.prop], scope.row)"
                   style="width: auto; text-align: center; color: #2bb0f1; cursor: pointer;"
                   @click="clickTableLink(scope.row, head.clickEventName)">
                {{head.formatter ? head.formatter('', '', scope.row[head.prop], '')  : scope.row[head.prop]}}
              </div>
              <div class="table-link fs13"  v-else>{{head.formatter ? head.formatter('', '', scope.row[head.prop], '')  : scope.row[head.prop]}}</div>
            </template>
          </el-table-column>
          <!-- 如有style,可自定义表格一列的样式 -->
          <el-table-column
            v-else-if="head.style"
            :key="index"
            :prop="head.prop"
            :label="head.label"
            :align="head.align || 'center'"
            :sortable="head.sortable || false"
            :header-align="head.headerAlign || 'center'"
            :fixed="head.fixed || false"
            :width="head.width || null"
            :formatter="head.formatter"
            :filters="head.filters"
            :filter-method="head.filterHandler"
          >
            <template slot-scope="scope">
              <div class="fs13" :style="head.style(scope.row[head.prop], scope.row)">{{head.formatter ? head.formatter(scope.row, '', scope.row[head.prop], '')  : scope.row[head.prop]}}</div>
            </template>
          </el-table-column>
          <!-- 拥有插槽,可自定义内容 -->
          <el-table-column
            v-else-if="head.soltName"
            :key="index"
            :prop="head.prop"
            :label="head.label"
            :align="head.align || 'center'"
            :sortable="head.sortable || false"
            :header-align="head.headerAlign || 'center'"
            :fixed="head.fixed || false"
            :width="head.width || null"
            :formatter="head.formatter"
            :filters="head.filters"
            :filter-method="head.filterHandler"
          >
            <template slot-scope="scope">
              <slot :scope="scope.row"></slot>
            </template>
          </el-table-column>
          <!-- 正常表格内容, show为true显示 -->
          <el-table-column
            v-else-if="head.show !== false"
            :key="index"
            :prop="head.prop"
            :label="head.label"
            :align="head.align || 'center'"
            :sortable="head.sortable || false"
            :header-align="head.headerAlign || 'center'"
            :fixed="head.fixed || false"
            :width="head.width || null"
            :formatter="head.formatter"
            :filters="head.filters"
            :filter-method="head.filterHandler"
          >
          </el-table-column>
        </template>
        <!-- 操作 -->
        <el-table-column
          v-if="operateData"
          fixed="right"
          :align="operateData.align || 'center'"
          :label="operateData.label || '操作'"
          :width="operateData.width || null"
        >
          <template slot-scope="scope">
            <el-button
              v-for="(item, index) in scope.row.btnData || operateData.btnData"
              v-show="item.pick ? item.pick(scope.row) : true"
              :key="index"
              :type="item.type || 'text'"
              :size="item.size"
              :plain="item.plain || false"
              :round="item.round || false"
              :circle="item.circle || false"
              :disabled="item.disabled || false"
              @click.native.prevent="handleClickEvent(item.eventName, scope.$index, scope.row)"
            >{{item.btnText}}
          </el-button>
          </template>
        </el-table-column>
    </el-table>
    <!-- 信息提示 -->
    <div ref="infoTipsDom" id="infoTipsDom" class="info-tips fs16" v-if="infoTips.length !== 0">
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
    <div ref="paginationDom" v-if="pageNation || pagesize" style="margin-top: 12px; height: 40px;">
      <!-- 服务端分页 -->
      <div class="pagination" v-if="pageNation">
        <el-pagination
          :page-size="pageNation.pageSize"
          :current-page="pageNation.currentPage"
          @current-change="pageNation.pageChangeHandler"
          background
          layout="->, slot, prev"
          :total="pageNation.totalCount">
          <div class="first-pager fs13" @click="jumpPage('1')">首页</div>
        </el-pagination>
        <el-pagination
          :pagerCount="5"
          :page-size="pageNation.pageSize"
          :current-page="pageNation.currentPage"
          @current-change="pageNation.pageChangeHandler"
          background
          :layout="layout"
          :total="pageNation.totalCount"
          @size-change="sizeChange">
          <div class="last-pager fs13" @click="jumpPage('0', pageNation.pageSize, pageNation.totalCount)">末页</div>
        </el-pagination>
      </div>
      <!-- 前端分页 -->
      <div class="pagination" v-else-if="pagesize">
        <el-pagination
          background
          :current-page="currentPage"
          @current-change="currentChange"
          :page-size="pageSize"
          layout="->, slot, prev"
          :total="copyTableData.length">
          <div class="first-pager fs13" @click="jumpPage('1')">首页</div>
        </el-pagination>
        <el-pagination
          :pagerCount="5"
          background
          @size-change="sizeChange"
          :current-page="currentPage"
          @current-change="currentChange"
          :page-size="pageSize"
          layout="pager, next, slot, total, jumper, sizes"
          :total="copyTableData.length">
          <div class="last-pager fs13" @click="jumpPage('0', pageSize, copyTableData.length)">末页</div>
        </el-pagination>
      </div>
    </div>
    <!-- 按钮 -->
    <m-btn :btnData="actionData" @click="handleActionClickEvent"></m-btn>
  </div>
</template>

<script>
import PageNation from './PageNation'

export default {
  name: 'd-table',
  props: {
    childrenName: {
      type: String,
      default: ''
    },
    tableTitle: { // table title
      type: Object,
      required: false
    },
    currentPage: {
      type: Number,
      default: 1
    }, // 当前页数,
    layout: {
      type: String,
      default: 'pager, next, slot, total, jumper, sizes'
    },
    options: { // table properties
      type: Object,
      default: () => ({
        // 是否 启用斑马线效果
        stripe: true,
        // 是否 启用边框
        border: true,
        // 是否 修改表头背景色，字体颜色
        headerClassName: true,
        // 是否 启用当前行高亮
        highCurrentRow: true,
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
    pagesize: { // 分页大小
      type: Number,
      default: 0
    },
    linkKey: { // 链接判断标志
      type: String,
      default: null
    },
    pageNation: {
      type: PageNation,
      required: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    defaultSort: {
      type: Object,
      default: () => {}
      // {
      //   prop: '',
      //   order: 'ascending/descending'
      // }
    }
  },
  data () {
    return {
      optValue: '全部', // 下拉选择框
      templateRadio: '',
      copyTableData: [],
      height: null, // 表格高度
      pageSize: 20,
      dateReg: /^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$/ // 日期校验
    }
  },
  watch: {
    // 监听表格高度变化
    tableHeight (newVal) {
      this.height = newVal
    },
    // 深度监听table数据
    tableData: {
      deep: true,
      handler (newArr) {
        if (!Array.isArray(newArr)) return
        this.copyTableData = this._deepCopyList(newArr)
      }
    }
  },
  methods: {
    // 倒序
    descending (val1, val2, prop) {
      if (this.dateReg.test(val1) && this.dateReg.test(val2)) {
        return new Date(val1[prop]).getTime() - new Date(val2[prop]).getTime()
      } else if (/[^0-9.]/g.test(val2[prop]) === false && /[^0-9.]/g.test(val1[prop]) === false) {
        if (parseFloat(val1[prop]) === 0) {
          return 1
        } else { 
          console.log(parseFloat(val1[prop]), parseFloat(val2[prop]))
          return parseFloat(val1[prop]) - parseFloat(val2[prop]) 
        }
      }
    },
    // 顺序
    ascending (val1, val2, prop) {
      if (this.dateReg.test(val1[prop]) && this.dateReg.test(val2[prop])) {
        // 日期
        return new Date(val2[prop]).getTime() - new Date(val1[prop]).getTime()
      } else if (/[^0-9.]/g.test(val2[prop]) === false && /[^0-9.]/g.test(val1[prop]) === false) {
        // 数值
        return parseFloat(val2[prop]) - parseFloat(val1[prop])
      }
    },
    // 排序改变触发事件,需要sortable: 'custom',
    sortChange (data) {
      if (data.order === 'descending') {
        // 先执行正序排序,将0的元素排到最后面,避免0对正常排序的影响
        this.copyTableData.sort((val1, val2) => this.ascending(val1, val2, data.prop))
        this.copyTableData.sort((val1, val2) => this.descending(val1, val2, data.prop))
      } else if (data.order === 'ascending') {
        this.copyTableData.sort((val1, val2) => this.ascending(val1, val2, data.prop))
      }
    },
    sizeChange (size) {
      if (this.pageNation) {
        this.pageNation.pageChangeHandler(this.pageNation.currentPage, size)
      } else if (this.pagesize) {
        this.pageSize = size
      }
    },
    getSelectable (row) {
      if (this.firstColIndex) {
        if (typeof this.firstColIndex.selectable === 'function') {
          if (this.firstColIndex.selectable(row)) {
            this.handleCurrentChange(row)
          }
        } else {
          this.handleCurrentChange(row)
        }
      } else {
        this.handleCurrentChange(row)
      }
    },
    currentChange (currentPage) {
      this.currentPage = currentPage
    },
    jumpPage (val, pagesize, totalCount) {
      switch (val) {
        case '1' :
          if (this.pageNation) {
            this.pageNation.currentPage = 1
          } else {
            this.currentPage = 1
          }
          break
        case '0':
          if (this.pageNation) {
            this.pageNation.currentPage = Math.ceil(totalCount / pagesize)
          } else {
            this.currentPage = Math.ceil(totalCount / pagesize)
          }
          break
      }
      if (this.pageNation) { this.pageNation.pageChangeHandler(this.pageNation.currentPage) }
    },
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
    // 获取选中数据
    getTemplateRow (index, row) {
      this.$emit('handleCurrentChange', row)
    },
    // 处理action操作 点击事件
    handleActionClickEvent (eventName) {
      if (!eventName) return
      if (eventName === 'print') {
        this.$refs.tableTitleDom.style.display = this.$refs.tableTitleDom ? 'none' : ''
        this.$refs.infoTipsDom.style.display = this.$refs.infoTipsDom ? 'none' : ''
        this.$refs.paginationDom.style.display = this.$refs.paginationDom ? 'none' : ''
        this.$refs.actionBtnDom.style.display = this.$refs.actionBtnDom ? 'none' : ''
        this.$emit(eventName)
      } else {
        let params = {
          data: this.copyTableData
        }
        this.$emit(eventName, params)
      }
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
        reset[i] = (typeof list[i] === 'object' && list[i] !== null) ? that._deepCopyList(list[i]) : list[i]
      }
      return reset
    },
    // 单选点击
    handleCurrentChange (val) {
      this.templateRadio = val
      this.$emit('handleCurrentChange', val)
    },
    clickTableLink (data, clickEventName) {
      this.$emit(clickEventName, data)
    }
  },
  created () {
    this.pageSize = this.pagesize
    this.copyTableData = this._deepCopyList(this.tableData)
  }
}
</script>

<style lang="scss">
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #ffffff !important;
  color: #D62629 !important;
  border: 1px solid #D62629 !important;
}
.d-table {
  .el-radio__label {
    padding-left: 0!important;
  }
}
</style>

<style lang="scss" scoped>
@import '~@/assets/style/unit/color.scss';
.pagination >>> .el-input__inner {
  line-height: 28px;
}
.error-box {
  margin: 0 !important;
}
.pagination {
  float: right;
  .el-pagination{
    float: left;
    .first-pager{
      display: inline;
      height: 28px;
      line-height: 28px;
      color: #606266;
      font-weight: 400;
      cursor: pointer;
    }
    .last-pager{
      display: inline;
      color: #606266;
      height: 28px;
      line-height: 28px;
      margin-right: 20px;
      font-weight: 400;
      cursor: pointer;
    }
    .el-pagination__jump{
      line-height: 28px;
      color: #606266;
      .el-input {
        line-height: 28px!important;
      }
      .el-input__inner {
        line-height: 28px!important;
      }
      text{
        height: 28px;
        line-height: 28px;
      }
    }
    .el-pagination__editor{
      .el-input{
        line-height: 28px!important;
        .el-input__inner {
          line-height: 28px!important;
        }
      }
    }
  }
}
.printHideCss {
  display: none
}

.header-class-name {
  color: #f00;
}
// .d-table >>> .header-class-name {
//   background-color: #f00 !important;
//   color: #f00;
// }

.d-table {
  box-shadow: 0 0 10px #ddd;
}

.d-table .table-title {
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
.table-title .title{
  font-weight: bold;
  margin-left: 18px;
}
.table-title .title,  .table-title .tip{
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
  color:  #009CD8;
  cursor: pointer;
}
/*#app {
	.m-form-btn {
		m-submit-btn:focus, .m-submit-btn:hover {
			border-color: $color-primary;
			background-color: $color-primary;
			background-image: linear-gradient(0deg, #530001 0%, #7D0405 17%, #BB0B0D 86%, #FFA1A3 100%);
		}
		.m-submit-btn:active {
			border-color: $color-primary-active;
			background-color: $color-primary-active;
			background-image: linear-gradient(0deg, #8a0203 0%, #b30608 17%, #de1f21 86%, #fdcecf 100%)
		}
		.m-cancel-btn:active {
			background-image: linear-gradient(0deg, #ad9292 0%, #d4baba 10%, #eadede 86%, #f9f1f1 99%);
		}
	}
}*/
</style>
