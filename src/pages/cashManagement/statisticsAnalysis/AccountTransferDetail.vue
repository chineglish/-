<template>
  <d2-container class="account-transfer-detail">
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>
    <m-new-form
      :formModel="formModel"
      :componentJson="formConfigJson"
      :btnData="btnData"
      @submit="submitHandler">
    </m-new-form>
    <d-table
      :tableHeadData="tableHeadData"
      :tableData="tableData"
      :actionData="actionData"
      @on-back="backHandler">
    </d-table>
  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { currency_type } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'AccountTransferDetail',
  data () {
    return {
      payerAccNoList: [],
      breadcrumb: ['统计分析', '账户交易明细分析'],
      formModel: {
        acNo: '',
        currencyCode: '',
        beginDate: '',
        endDate: '',
        inoutType: '',
        oppAcNo: '',
        oppAcName: ''
      },
      formConfigJson: {
        rules: {
          maxAmt: [
            { validator: (rule, value, callback) => {
              this.formModel.maxAmt = value
              if ((this.formModel.maxAmt || value) && (this.formModel.maxAmt && value)) {
                callback(new Error('请填写完整交易金额!'))
              } else if (parseFloat(value) < parseFloat(this.formModel.minAmt)) {
                callback(new Error('最小金额大于最大金额!'))
              } else {
                callback()
              }
            },
            trigger: 'submit' }
          ],
          minAmt: [
            { validator: (rule, value, callback) => {
              this.formModel.minAmt = value
              if ((this.formModel.maxAmt || value) && (this.formModel.maxAmt && value)) {
                callback(new Error('请填写完整交易金额!'))
              } else if (parseFloat(value) > parseFloat(this.formModel.maxAmt)) {
                callback(new Error('最小金额大于最大金额!'))
              } else {
                callback()
              }
            },
            trigger: 'submit' }
          ]
        },
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
                key: 'currencyCode',
                type: 'select',
                options: [],
                trans: { value: 'label', key: 'value' }
              },
              {
                label: '查询日期',
                firstKey: 'beginDate',
                secondKey: 'endDate',
                type: 'dateArea',
                dateType: 'date',
                format: 'yyyy-MM-dd',
                valueFormat: 'yyyyMMdd'
              },
              // {
              //   label: '起始日期',
              //   key: 'beginDate',
              //   type: 'date',
              //   valueFormat: 'yyyyMMdd',
              //   placeholder: '起始日期'
              // },
              // {
              //   label: '截至日期',
              //   key: 'endDate',
              //   type: 'date',
              //   valueFormat: 'yyyyMMdd',
              //   placeholder: '截至日期'
              // },
              {
                label: '摘要',
                key: 'summary',
                type: 'input',
                placeholder: '摘要'
              },
              {
                label: '收支类型',
                key: 'inoutType',
                type: 'select',
                options: [
                  { label: '收入', value: '01' },
                  { label: '支出', value: '02' }
                ],
                trans: { value: 'label', key: 'value' }
              },
              {
                label: '交易金额(元)',
                type: 'moneyArea',
                firstKey: 'minAmt',
                secondKey: 'maxAmt'
              },
              // {
              //   label: '起始金额',
              //   key: 'minAmt',
              //   type: 'input',
              //   placeholder: '起始金额'
              // },
              // {
              //   label: '截至金额',
              //   key: 'maxAmt',
              //   type: 'input',
              //   placeholder: '截至金额'
              // },
              {
                label: '对方账户',
                key: 'oppAcNo',
                type: 'input',
                placeholder: '对方账户'
              },
              {
                label: '对方账户名称',
                key: 'oppAcName',
                type: 'input',
                placeholder: '对方账户名称'
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
          label: '流水号',
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
          label: '余额',
          prop: 'balance',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
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
      httpPost('/eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        if (res && res.AcList) {
          this.payerAccNoList = res.AcList
          this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
            .map(item => ({ label: util.getPayerAccount(item), value: item.acNo + '-' + item.subAcNo }))
          this.formModel.acNo = this.payerAccNoList[0].acNo + '/' + this.payerAccNoList[0].acName
        }
      }).catch(e => {
        console.error(e)
      })
    },
    backHandler () {
      this.$router.back()
    },
    submitHandler (formModel) {
      console.log(formModel)
      const params = {
        // ...formModel
        acNo: '',
        currencyCode: '',
        beginDate: '',
        endDate: '',
        summary: '',
        inoutType: '',
        minAmt: '',
        maxAmt: '',
        oppAcNo: '',
        oppAcName: ''
      }
      httpPost('/eweb-cash.AcctTrsDetailQry.do', params).then(res => {
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
