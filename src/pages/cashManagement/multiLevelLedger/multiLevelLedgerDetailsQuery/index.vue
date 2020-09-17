<template>
  <div class="assets-debt">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div style="clear: both"></div>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @submit="inquire"
      @changeAccountNo="changeAccountNo"
      @changelimitAsAcNo="changelimitAsAcNo"
      @reset="reset"
    ></m-new-form>
    <div class="form-box" v-if="showResult">
      <d-table
        :table-data="tableData"
        :pageSize="20"
        :tableHeadData="tableHeadData"
        :operateData="operateData"
        :defaultSort="defaultSort"
        @goDetails="goDetails"
      ></d-table>
    </div>
  </div>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type_entity, transbook_Type } from '@/assets/js/entity'
export default {
  name: 'multiLevelLedgerDetailsQuery',
  data: function () {
    return {
      // 面包屑导航
      breadData: ['现金管理', '多级账簿', '多级账簿明细查询'],
      showResult: false,
      acList: [],
      list: [],
      formModel: {
        acNo: '',
        currencyCode: '',
        acName: '',
        trsType: '',
        ledgerName: '',
        startDate: '',
        ledgerNum: '',
        endDate: ''
      },
      formConfigJson: {
        rules: {
          trsType: [{ required: false, message: '交易类型', trigger: 'submit' }],
          ledgerNum: [{ required: true, message: '账簿号', trigger: 'submit' }],
          startDate: [{ required: true, message: '开始日期', trigger: 'submit' }],
          endDate: [{ required: true, message: '结束日期', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '30%',
            title: '多级账簿明细查询',
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
              },
              {
                'disabled': false,
                'label': '交易类型',
                'type': 'select',
                'key': 'trsType',
                'options': [
                  { 'value': '全部', 'key': '' },
                  { 'value': '自身收付款', 'key': '1' },
                  { 'value': '结息', 'key': '3' },
                  { 'value': '收费', 'key': '4' },
                  { 'value': '账簿间调账', 'key': '5' },
                  { 'value': '账簿间转账', 'key': '6' },
                  { 'value': '其他', 'key': '7' }
                ]
              },
              {
                'disabled': false,
                'label': '账簿号',
                'type': 'input',
                filterOptions: true,
                'options': [],
                trans: { value: 'showName', key: 'limitAsAcNo' },
                'changeEventName': 'changelimitAsAcNo',
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
                'type': 'input',
                'key': 'ledgerName'
              }
            ]
          }
        ]
      },
      operateData: {
        btnData: [
          { btnText: '查看', type: 'text', eventName: 'goDetails' }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      defaultSort: {
        prop: 'trsAcDate',
        order: 'descending'
      },
      tableHeadData: [
        { label: '流水号', prop: 'serialNo' },
        { label: '交易日期', prop: 'trsAcDate', sortable: true },
        { label: '收入金额', prop: 'rcvAmt' },
        { label: '支出金额', prop: 'payAmt' },
        { label: '对方账户', width: '200', prop: 'oppAcNo' },
        { label: '对方户名', prop: 'oppAcName' },
        { label: '对方账簿号', prop: 'oppAsAcNo' },
        { label: '对方账簿名', prop: 'oppAsAcName' },
        { label: '交易类别',
          prop: 'trsType',
          formatter: (row, cell, cellValue, index) => util.handleEnums(transbook_Type, cellValue)
        }
      ],
      tableData: []
    }
  },
  methods: {
    // 重置
    reset (res) {
      this.formModel = res
      this.getAccountList()
    },
    // 查询
    inquire (res) {
      // 发送接口重新查询
      this.showResult = false
      let req = {
        acNo: res.acNo,
        currencyCode: res.currencyCode,
        asAcNo: res.ledgerNum,
        startDate: res.startDate.split('-').join(''),
        endDate: res.endDate.split('-').join(''),
        trsType: res.trsType
      }
      httpPost('/eweb-cash.MultistageBookDetailQry.do', req).then(res => {
        this.tableData = res.list
        this.showResult = true
      }).catch(() => {
        this.showResult = true
      })
    },
    // 查询账户列表
    getAccountList () {
      httpPost('/eweb-cash.MultistageBookActListQry.do', { productType: '02' }).then(res => {
        this.acList = res.acList
        this.acList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = res.acList
        this.formModel.acNo = this.acList[0].acNo
        // 初始起止日期
        let filterDate = util.filterDate('1')
        this.formModel.startDate = util.standardDate(filterDate.startDate)
        this.formModel.endDate = util.standardDate(filterDate.endDate)
        if (this.acList.length > 0 || this.acList.length === '') {
          this.changeAccountNo(this.formModel, this.acList[0])
        } else {
          this.formModel.acNo = ''
          this.formModel.currencyCode = ''
          this.formModel.acName = ''
        }
      })
    },
    changeAccountNo (res, obj) {
      this.$set(this.formModel, 'currencyCode', obj.currencyCode)
      this.$set(this.formModel, 'acName', obj.acName)
      httpPost('/eweb-cash.MultistageBookRightQry.do', {
        acNo: obj.acNo,
        currencyCode: obj.currencyCode,
        asAcNo: obj.asAcno,
        userNo: this.getUser().userId
      }).then(res => {
        this.list = res.list
        this.list.forEach(item => {
          item['showName'] = `${item.limitAsAcNo} | ${item.asAcName}`
        })
        this.formConfigJson.formItems[0].group[4].options = this.list
        // if (res.list.length > 0) {
        //   this.changelimitAsAcNo(res.list[0])
        // }
      })
    },
    changelimitAsAcNo (data) {
      // 等list里的返回账簿名字
      this.$set(this.formModel, 'ledgerNum', data.limitAsAcNo)
      this.$set(this.formModel, 'ledgerName', data.asAcName)
    },
    goDetails (res) {
      this.$router.push({
        name: 'ledgerDetailsPage',
        params: res
      })
    }
  },
  created () {
    this.getAccountList()
  }
}
</script>
