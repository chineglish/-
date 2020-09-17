<template>
  <d2-container class="account-group-detail">
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>
    <m-new-form
      :formModel="formModel"
      :componentJson="formConfigJson"
      :btnData="btnData"
      @submit="submitHandler"
    ></m-new-form>
    <d-table
      :tableHeadData="tableHeadData"
      :tableData="tableData"
      :actionData="actionData"
      @on-back="backHandler"></d-table>
  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { currency_type, currency_type_entity } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'AccountGroupDetail',
  data () {
    return {
      payerAccNoList: [],
      breadcrumb: ['统计分析', '账户归集明细分析'],
      formModel: {
        AcNo: '',
        currencyCode: 'CNY',
        beginDate: '',
        endDate: '',
        incomePayType: '01',
        oppAcNo: '',
        oppAcName: ''
      },
      formConfigJson: {
        rules: {
          AcNo: [{ required: true, message: '请选择账户', trigger: 'change' }],
          currencyCode: [{ required: true, message: '请选择币种', trigger: 'change' }],
          beginDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '30%',
            group: [
              {
                label: '账户',
                key: 'AcNo',
                type: 'select',
                options: [],
                trans: { value: 'acShow', key: 'acNo' }
              },
              {
                label: '币种',
                type: 'select',
                trans: {
                  key: 'value',
                  value: 'label'
                },
                key: 'currencyCode',
                options: currency_type
              },
              {
                label: '收支类型',
                key: 'incomePayType',
                type: 'select',
                options: [
                  { label: '收入', value: '01' },
                  { label: '支出', value: '02' }
                ],
                trans: { value: 'label', key: 'value' }
              },
              {
                label: '对方账号',
                key: 'oppAcNo',
                type: 'input',
                placeholder: '请输入对方账号'
              },
              {
                label: '对方户名',
                key: 'oppAcName',
                type: 'input',
                placeholder: '对方户名'
              },
              {
                type: 'dateArea',
                label: '查询日期',
                changeEventName: 'changeDate',
                firstKey: 'beginDate',
                secondKey: 'endDate',
                valueFormat: 'yyyyMMdd'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      tableHeadData: [
        {
          label: '交易流水号',
          prop: 'serialNo'
        },
        {
          label: '交易日期',
          prop: 'trsAcdt',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '交易时间',
          prop: 'trsTime',
          formatter: (row, column, cellValue, index) => util.separationTime(cellValue)
        },
        {
          label: '收入金额',
          prop: 'amt',
          formatter: (row, column, cellValue, index) => row.crdrFlag === 'C' ? util.formatCurrency(cellValue) : ''
        },
        {
          label: '支出金额',
          prop: 'amt',
          formatter: (row, column, cellValue, index) => row.crdrFlag === 'D' ? util.formatCurrency(cellValue) : ''
        },
        {
          label: '对方账户',
          prop: 'oppAcNo'
        },
        {
          label: '对方币种',
          prop: 'oppCurrencyCode',
          formatter: (row, column, cellValue, index) => currency_type_entity[cellValue]
        },
        {
          label: '对方户名',
          prop: 'oppAcName'
        },
        {
          label: '摘要',
          prop: 'purpose'
        }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'on-back'
        }
      ]
    }
  },
  methods: {
    accountListQry () {
      httpPost('eweb-query.PayerAccountListQry.do').then(res => {
        if (res && res.AcList) {
          this.payerAccNoList = res.AcList
          this.payerAccNoList.forEach(item => {
            item.acShow = util.getPayerAccount(item)
          })
          this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
          if (this.payerAccNoList.length > 0) {
            this.formModel.AcNo = this.payerAccNoList[0].acNo
          }
        }
      })
    },
    backHandler () {
      this.$router.back()
    },
    submitHandler (formModel) {
      const params = {
        acNo: formModel.AcNo,
        currencyCode: formModel.currencyCode,
        crdrFlag: formModel.incomePayType,
        beginDate: formModel.beginDate,
        endDate: formModel.endDate,
        oppAcNo: formModel.oppAcNo,
        oppAcName: formModel.oppAcName
      }
      httpPost('/eweb-cash.AcctCollectionDetailQry.do', params).then(res => {
        this.tableData = res.list
      })
    }
  },
  mounted () {
    const dateArea = util.filterDate1('1')
    this.formModel.beginDate = dateArea.startDate
    this.formModel.endDate = dateArea.endDate
    debugger
    this.accountListQry()
  }
}
</script>
