<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @inquire="inquire"
      @reset="reset"
      @changeNum="changeNum"
      @changeName="changeName">
    </m-new-form>
    <div class="form-box" v-if="showResult">
      <d-table
        :table-data="tableData"
        :tableHeadData="tableHeadData"
        :operateData="operateData"
        :pagesize="pagesize"
        :defaultSort="defaultSort"
        @goDetails="goDetails"
        @goAdjustment="goAdjustment">
      </d-table>
    </div>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { currency_type_entity, trans_TType } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'multiLevelLedgerDetailAdjustment',
  data: function () {
    return {
      // 面包屑导航
      breadData: ['现金管理', '多级账簿', '多级账簿明细调账'],
      showResult: false,
      bookIntoQryList: [],
      acList: [],
      actList: [],
      pagesize: 20,
      operateData: {
        btnData: [
          { type: 'text', btnText: '查看', eventName: 'goDetails' },
          { type: 'text', btnText: '调账', eventName: 'goAdjustment' }
        ]
      },
      formModel: {
        acNo: '',
        currencyCode: '',
        accountName: '',
        transType: '',
        ledgerNum: '',
        startDate: '',
        ledgerName: '',
        endDate: ''
      },
      formConfigJson: {
        rules: {
          acNo: [{ required: true, message: '账户', trigger: 'change' }],
          currencyCode: [{ required: true, message: '币种', trigger: 'change' }],
          accountName: [{ required: true, message: '户名', trigger: 'change' }],
          transType: [{ required: true, message: '交易类别', trigger: 'change' }],
          ledgerNum: [{ required: true, message: '账簿号', trigger: 'change' }],
          startDate: [{ required: true, message: '开始日期', trigger: 'change' }],
          ledgerName: [{ required: true, message: '账簿名', trigger: 'change' }],
          endDate: [{ required: true, message: '结束日期', trigger: 'change' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '30%',
            title: '多级账簿明细调账查询',
            showSeparate: true,
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                'options': [],
                'trans': { 'value': 'showAcNo', 'key': 'acNo' },
                'changeEventName': 'changeNum',
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
                'key': 'accountName'
              },
              {
                'disabled': false,
                'label': '交易类别',
                'type': 'select',
                'key': 'transType',
                'options': [
                  { key: '', value: '全部' },
                  { key: '1', value: '自身收付款' },
                  { key: '2', value: '资金归集' },
                  { key: '3', value: '结息' },
                  { key: '4', value: '收费' },
                  { key: '5', value: '虚户间调账' },
                  { key: '6', value: '虚户间转账' },
                  { key: '7', value: '其他' }
                ]
              },
              {
                'disabled': false,
                'label': '账簿号',
                'type': 'select',
                'options': [],
                'changeEventName': 'changeName',
                'trans': { 'value': 'showName', 'key': 'limitAsAcNo' },
                'key': 'ledgerNum'
              },
              {
                label: '查询日期',
                firstKey: 'startDate',
                secondKey: 'endDate',
                type: 'dateArea',
                valueFormat: 'yyyyMMdd',
                placeholder: '开始日期'
              },
              {
                'disabled': false,
                'label': '账簿名',
                'type': 'text',
                'key': 'ledgerName'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      defaultSort: {
        prop: 'trsAcDate',
        order: 'descending'
      },
      tableHeadData: [
        { label: '流水号', prop: 'serialNo' },
        { label: '交易日期',
          prop: 'trsAcDate',
          sortable: true,
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '收入金额', prop: 'rcvAmt' },
        { label: '支出金额', prop: 'payAmt' },
        { label: '对方账户', prop: 'oppAcNo' },
        { label: '对方户名', prop: 'oppAcName' },
        { label: '对方账簿号', prop: 'oppAsAcNo' },
        { label: '交易类别',
          prop: 'trsType',
          formatter: (row, column, cellValue, index) => util.handleEnums(trans_TType, cellValue)
        }
      ],
      tableData: []
    }
  },
  methods: {
    reset (res) {
      this.formModel = res
      this.actListQry()
    },
    changeName (data, options) {
      data.ledgerName = options.asAcName
      this.$router.params && this.$router.params.pageFlag === 1 && this.inquire(this.formModel)
    },
    changeNum (data, option) {
      // 多级账簿信息查询
      let params = {
        acNo: option.acNo,
        currencyCode: option.currencyCode,
        userNo: this.getUser().userId
      }
      this.formModel.currencyCode = this.actList[0].currencyCode
      httpPost('/eweb-cash.MultistageBookRightQry.do', params).then(res => {
        res.list.forEach(item => {
          item['showName'] = `${item.limitAsAcNo} | ${item.asAcName}`
        })
        this.bookIntoQryList = res.list
        this.formConfigJson.formItems[0].group[4].options = this.bookIntoQryList
        // this.formModel.ledgerNum = this.bookIntoQryList.length > 0 ? this.bookIntoQryList[0].limitAsAcNo : ''
        // this.formModel.ledgerName = this.bookIntoQryList.length > 0 ? this.bookIntoQryList[0].asAcName : ''
      })
    },
    actListQry () {
      httpPost('/eweb-cash.MultistageBookActListQry.do', { productType: '02' }).then(res => {
        this.actList = res.acList
        this.actList.forEach(item => {
          item.showAcNo = util.getPayerAccount(item)
        })
        this.formModel.currencyCode = this.actList[0].currencyCode
        this.formConfigJson.formItems[0].group[0].options = this.actList
        this.formModel.acNo = this.actList[0].acNo
        this.formModel.accountName = this.actList[0].acName
        let filterDate = util.filterDate('1')
        this.formModel.startDate = util.standardDate(filterDate.startDate)
        this.formModel.endDate = util.standardDate(filterDate.endDate)
        this.changeNum(this.formModel, this.actList[0])
      })
    },
    inquire (res) {
      this.formModel = res
      let params = {
        acNo: res.acNo,
        currencyCode: res.currencyCode,
        trsType: res.transType,
        asAcNo: res.ledgerNum,
        startDate: res.startDate,
        endDate: res.endDate
      }
      httpPost('/eweb-cash.MultistageBookDetailAdjustAccQry.do', params).then(res => {
        this.showResult = true
        this.tableData = res.list
      }).catch(e => {
        this.showResult = false
      })
    },
    goDetails (res) {
      this.$router.push({
        name: 'adjustmentDetail',
        params: { ...res,
          accountNo: this.formModel.accountNo,
          transType: this.formModel.transType,
          ledgerNum: this.formModel.ledgerNum,
          startDate: this.formModel.startDate,
          endDate: this.formModel.endDate }
      })
    },
    goAdjustment (res) {
      let params = {
        ...res,
        acList: this.acList,
        bookIntoQryList: this.bookIntoQryList,
        accountNo: this.formModel.accountNo,
        transType: this.formModel.transType,
        ledgerNum: this.formModel.ledgerNum,
        startDate: this.formModel.startDate,
        endDate: this.formModel.endDate
      }
      this.$router.push({
        name: 'adjustmentForm',
        params: params
      })
    }
  },
  created () {
    this.actListQry()
  }
}
</script>
