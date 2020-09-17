<template>
    <div class="assets-debt">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div style="clear: both"></div>
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          @inquire="inquire"
          @changeAccountNo="changeAccountNo"
          @reset="reset"
        ></m-new-form>
        <div class="form-box" v-if="showResult">
          <div class="treeList">
            <el-tree
              :data="treeList"
              :props="defaultProps"
              :default-expand-all="true"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
          <d-table
            :table-data="tableData"
            :tableHeadData="tableHeadData"
          ></d-table>
        </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type_entity } from '@/assets/js/entity'
export default {
  name: 'multiLevelLedgerQuery',
  data () {
    return {
      // 面包屑导航
      breadData: ['现金管理', '多级账簿', '多级账簿余额查询'],
      showResult: false,
      acList: [],
      formModel: {
        acNo: '',
        currencyCode: '',
        acName: '',
        asAcNo: ''
      },
      formConfigJson: {
        rules: {
          acNo: [{ required: false, message: '请选择账户', trigger: 'submit' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            labelWidth: '30%',
            title: '多级账簿余额查询',
            showSeparate: true,
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                'options': [],
                trans: { value: 'payerAcNoShow', key: 'acNo' },
                'changeEventName': 'changeAccountNo',
                'key': 'acNo'
              },
              {
                'disabled': false,
                'label': '币种',
                'type': 'text',
                'key': 'currencyCode',
                formatter: (key, value) => currency_type_entity[value]
              },
              {
                'disabled': false,
                'label': '户名',
                'type': 'text',
                'key': 'acName'
              // },
              // {
              //   'disabled': false,
              //   'label': '账簿号',
              //   'type': 'input',
              //   'key': 'asAcNo'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      tableHeadData: [
        { label: '账簿号', prop: 'asAcNo' },
        { label: '账簿名', prop: 'asAcName' },
        { label: '可用余额', prop: 'selfBal', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) }
        // { label: '自身余额', prop: 'selfBal', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        // { label: '上存金额', prop: 'uppBal', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        // { label: '上日余额', prop: 'lastBal', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        // { label: '上日可用余额', prop: 'lastUseBal', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        // { label: '冻结余额', prop: 'freezeBal', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) }
      ],
      tableData: [],
      treeList: [],
      multistageBookBal: [],
      defaultProps: {
        children: 'subLevel',
        label: 'showAsAcName'
      }
    }
  },
  methods: {
    // 树形枝叶点击事件
    handleNodeClick (data) {
      // 清空表格,避免数据堆积
      this.tableData = []
      // 递归处理点击的枝叶数据
      this.pushtableLList(data)
      // httpPost('/eweb-cash.MultistageBookBalQry.do', {
      //   acNo: data.acNo,
      //   currencyCode: data.currencyCode,
      //   asAcNo: data.asLevel === '1' ? '' : data.asAcNo
      // }).then(res => {
      //   this.tableData = res.list
      //   this.showResult = true
      // })
    },
    // 递归处理点击的枝叶数据
    pushtableLList (obj) {
      // console.log(this.multistageBookBal.find(item => item.asAcNo === obj.asAcNo))
      // 往数组塞入需要的数据
      if (this.multistageBookBal.find(item => item.asAcNo === obj.asAcNo)) {
        this.tableData.push({
          asAcNo: obj.asAcNo,
          asAcName: obj.asAcName,
          selfBal: obj.selfBal
        })
      }
      // 如果有子账簿,则循环遍历子账簿列表
      if (obj.subLevel) {
        obj.subLevel.forEach(item => {
          // 递归处理数据
          this.pushtableLList(item)
        })
      }
    },
    reset (res) {
      this.formModel = res
      this.showResult = false
      this.PayerAccountListQry()
    },
    inquire (res) {
      // 发送接口重新查询
      this.showResult = false
      httpPost('/eweb-cash.MultistageBookInfoQry.do', {
        acNo: res.acNo,
        currencyCode: res.currencyCode
      }).then(res => {
        this.treeList = res.levelList
        this.changeTreeList(this.treeList)
        let obj = this.treeList.find(item => item.asLevel === '1')
        httpPost('/eweb-cash.MultistageBookBalQry.do', {
          acNo: obj.acNo,
          currencyCode: obj.currencyCode
        }).then(ress => {
          this.tableData = ress.list
          this.multistageBookBal = Object.assign(ress.list)
          this.showResult = true
        })
      })
    },
    changeTreeList (arr) {
      if (Array.isArray(arr) && arr.length > 0) {
        arr.forEach(item => {
          item.showAsAcName = `${item.asAcNo} - ${item.asAcName}`
          if (item.subLevel && item.subLevel.length > 0) {
            this.changeTreeList(item.subLevel)
          }
        })
      }
    },
    // 交易账户获取
    PayerAccountListQry () {
      httpPost('/eweb-cash.MultistageBookActListQry.do', { productType: '02' }).then(res => {
        this.acList = res.acList
        this.acList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = res.acList
        if (this.acList.length > 0 || this.acList.length === '') {
          this.formModel.acNo = this.acList[0].acNo
          this.changeAccountNo(this.formModel)
        } else {
          this.formModel.acNo = ''
          this.formModel.currencyCode = ''
          this.formModel.acName = ''
        }
      })
    },
    changeAccountNo (data) {
      let obj = this.acList.find(item => item.acNo === data.acNo)
      this.$set(this.formModel, 'currencyCode', obj.currencyCode)
      this.$set(this.formModel, 'acName', obj.acName)
    }
  },
  created () {
    this.PayerAccountListQry()
  }
}
</script>

<style lang="scss" scoped>
.treeList {
  float: left;
  width: 29.5%;
  box-shadow: 0 0 10px #ddd;
  min-height: 300px;
  overflow-x: auto;
  border-right: 1px solid #eee;
}
.d-table {
  float: right;
  width: 70%;
}
</style>
<style>
	.el-tree-node > .el-tree-node__children {
		overflow: inherit;
	}
</style>
