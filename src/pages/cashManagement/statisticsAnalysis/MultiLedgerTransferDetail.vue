<template>
  <d2-container class="multi-ledger-transfer-detail">
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
      breadcrumb: ['统计分析', '多级账簿成员单位交易查询'],
      formModel: {
        acNo: '',
        currency: '',
        beginDate: '',
        endDate: '',
        incomePayType: '',
        opAccountNo: '',
        opAccountName: ''
      },
      formConfigJson: {
        rules: {},
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '30%',
            group: [
              {
                label: '账户',
                key: 'acNo',
                type: 'select',
                options: [],
                trans: { value: 'label', key: 'value' }
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
                label: '子账户',
                key: 'asAcNo',
                type: 'input',
                placeholder: '子账户'
              },
              // {
              //   label: '开始日期',
              //   key: 'beginDate',
              //   type: 'date',
              //   valueFormat: 'yyyyMMdd',
              //   placeholder: '开始日期'
              // },
              // {
              //   label: '结束日期',
              //   key: 'endDate',
              //   type: 'date',
              //   valueFormat: 'yyyyMMdd',
              //   placeholder: '结束日期'
              // },
              {
                label: '收支类型',
                key: 'crdrFlag',
                type: 'select',
                options: [
                  { label: '收入', value: '01' },
                  { label: '支出', value: '02' }
                ],
                trans: { value: 'label', key: 'value' }
              },
              {
                label: '对方账户',
                key: 'oppAcNo',
                type: 'input',
                placeholder: '对方账户'
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
                valueFormat: 'yyyyMMdd',
                firstKey: 'beginDate',
                secondKey: 'endDate'
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
          prop: 'transferJnlNo'
        },
        {
          label: '交易日期',
          prop: 'transferDate',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '交易时间',
          prop: 'transferTime'
        },
        {
          label: '收入金额',
          prop: 'income',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '支出金额',
          prop: 'expenditure',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '手续费',
          prop: 'fee',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '对方账户',
          prop: 'opAccountNo'
        },
        {
          label: '对方币种',
          prop: 'opCurrency',
          formatter: (row, column, cellValue, index) => currency_type_entity[cellValue]
        },
        {
          label: '对方账户户名',
          prop: 'opAccountName'
        },
        {
          label: '摘要',
          prop: 'remark'
        },
        {
          label: '附言',
          prop: 'postscript'
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
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        if (res && res.AcList) {
          this.payerAccNoList = res.AcList
          this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
            .map(item => ({ label: util.getPayerAccount(item), value: item.acNo + '-' + item.subAcNo }))
        }
      }).catch(e => {
        console.error(e)
      })
    },
    backHandler () {
      this.$router.back()
    },
    submitHandler (formModel) {
      const params = {
        ...formModel
      }
      httpPost('/eweb-cash.MultistageBookTrsDetailQry.do', params).then(res => {
        // TODO 接口联调时，需要修改
        this.tableData = res.list
      }).catch(e => {
        console.error(e)
      })
    }
  },
  mounted () {
    this.accountListQry()
    this.formConfigJson.formItems[0].group[1].options = currency_type
  }
}
</script>

<style lang="scss" scoped>
</style>
