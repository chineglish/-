<template>
  <div class="d-vertical-table">
    <div v-if="tableTitle" class="table-title fs16" :class="tableTitle.isBorder ? 'title-border' : ''" :style="styleObject">
      {{tableTitle.title}}
    </div>
     <table class="mailTable fs14" :style="styleObject" v-if="showOneColumn">
      <tr v-for="(item, index) in totalCount" :key="index">
        <td class="column">{{tableData[index].label}}</td>
        <td>{{tableData[index].value}}</td>
      </tr>
    </table>
    <table class="mailTable fs14" :style="styleObject" v-if="!showOneColumn">
      <tr v-for="index in rowCount" :key="index">
        <td class="column">{{tableData[index-1].label}}</td>
        <td>{{tableData[index-1].value}}</td>
        <td class="column">{{tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].label : ''}}</td>
        <td>{{tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].value : ''}}</td>
      </tr>
    </table>
    <!-- 操作按钮 -->
      <div class="action-btn" v-if="actionData === []">
        <div v-for="(item, index) in actionData" :key="index">
          <el-button
            :type="item.type"
            :size="item.size || 'mini'"
            :plain="item.plain || false"
            :round="item.round || false"
            :circle="item.circle || false"
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
  name: 'd-vertical-table',
  data () {
    return {
      styleObject: {},
      showOneColumn: false,
      tableData: [], // table数据
      totalCount: [] // 只显示一列
    }
  },
  props: {
    tableTitle: { // table标题
      type: Object,
      default: () => {}
    },
    actionData: { // 操作配置
      type: Array,
      default: () => []
    },
    tabledata: { // table数据
      type: Array,
      default: () => []
    },
    tableStyle: { // table样式
      type: Object,
      default: () => {}
    },
    showOne: { // 显示一列
      type: Boolean,
      default: false
    }
  },
  watch: {
    tabledata: {
      deep: true,
      handler (newArr) {
        if (newArr.length === 0) return
        this.tableData = this._deepCopyList(newArr)
      }
    }
  },
  computed: {
    rowCount () {
      return Math.ceil(this.tableData.length / 2)
    }
  },
  methods: {
    // 处理action操作 点击事件
    handleActionClickEvent (eventName, tabledata) {
      if (!eventName) return
      let params = {
        data: tabledata
      }
      this.$emit(eventName, params)
    },
    // 深度遍历table数据
    _deepCopyList (list) {
      let that = this
      let reset = list instanceof Array ? [] : {}
      for (let i in list) {
        reset[i] = typeof list[i] === 'object' ? that._deepCopyList(list[i]) : list[i]
      }
      return reset
    }
  },
  created () {
    this.styleObject = this.tableStyle
    this.tableData = this._deepCopyList(this.tabledata)
    if (this.showOne) {
      this.showOneColumn = this.showOne
      let arr = []
      for (let i = 0; i < this.tableData.length; i++) {
        arr.push(i)
      }
      this.totalCount = arr
    }
  }
}
</script>

<style lang="scss" scoped>
.table-title {
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
}

.title-border {
  border-top: 1px solid #E6EAEE;
  border-left: 1px solid #E6EAEE;
  border-right: 1px solid #E6EAEE;
}

.mailTable, .mailTable tr, .mailTable tr td {
  border:1px solid #E6EAEE;
  text-align: center;
}

.mailTable {
   color: #71787E;
   margin: 0 auto;
   border-collapse: collapse;
 }

.mailTable tr td {
   border:1px solid #E6EAEE;
   width: 150px;
   height: 50px;
   line-height: 50px;
   box-sizing: border-box;
   padding: 0 10px;
 }

 .mailTable tr td.column {
   background-color: #EFF3F6;
   color: #393C3E;
 }
</style>
