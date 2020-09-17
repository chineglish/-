<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <d-form-previewer
      :form-struction="formStruction"
      :form-model="formData"
      :action-data="actionData">
    </d-form-previewer>
  </div>
</template>

<script type="text/javascript">
import util from '@/libs/util'
import { currency_type, trans_TType } from '@/assets/js/entity'
export default {
  name: 'multiLevelLedgerAdjDetail',
  data: function () {
    return {
      data: ['现金管理', '多级账簿', '多级账簿明细详情'],
      formData: {
        serialNo: '',
        trsAcDate: '',
        trsTime: '',
        rcvAmt: '',
        payAmt: '',
        reserved2: '',
        selfBal: '',
        purpose: '',
        postScript: '',
        oppAcNo: '',
        oppAcName: '',
        oppCurrencyCode: '',
        oppAsAcNo: '',
        oppAsAcName: '',
        trsType: ''
      },
      formStruction: {
        groups: [
          {
            formItems: [
              { label: '流水号', fieldName: 'serialNo' },
              { label: '交易日期', fieldName: 'trsAcDate', formatter: (key, value) => util.separationDate(value) },
              { label: '交易时间', fieldName: 'trsTime', formatter: (key, value) => util.separationTime(value) },
              { label: '收入金额', fieldName: 'rcvAmt' },
              { label: '支出金额', fieldName: 'payAmt' },
              { label: '手续费', fieldName: 'reserved2' },
              { label: '自身余额', fieldName: 'selfBal', formatter: (key, value) => util.formatCurrency(value) },
              { label: '摘要', fieldName: 'purpose' },
              { label: '附言', fieldName: 'postScript' },
              { label: '对方账户', fieldName: 'oppAcNo' },
              { label: '对方户名', fieldName: 'oppAcName' },
              { label: '对方币种',
                fieldName: 'oppCurrencyCode',
                formatter: (currencyCode, value) => util.handleEnums(currency_type, value) },
              { label: '对方账簿号', fieldName: 'oppAsAcNo' },
              { label: '对方账簿名', fieldName: 'oppAsAcName' },
              { label: '交易类型',
                fieldName: 'trsType',
                formatter: (trsType, value) => util.handleEnums(trans_TType, value) }
            ]
          }
        ]
      },
      actionData: [
        { btnText: '返回', class: 'm-cancel-btn', handler: this.backHandler }
      ]
    }
  },
  methods: {
    // 返回上一个页面
    backHandler () {
      this.$router.push({
        name: 'multiLevelLedgerDetailAdjustment'
      })
    }
  },
  created () {
    this.formData.serialNo = this.$route.params.data.serialNo
    this.formData.trsAcDate = this.$route.params.data.trsAcDate
    this.formData.trsTime = this.$route.params.data.trsTime
    this.formData.rcvAmt = this.$route.params.data.rcvAmt
    this.formData.payAmt = this.$route.params.data.payAmt
    this.formData.reserved2 = this.$route.params.data.reserved2
    this.formData.selfBal = this.$route.params.data.selfBal
    this.formData.purpose = this.$route.params.data.purpose
    this.formData.postScript = this.$route.params.data.postScript
    this.formData.oppAcNo = this.$route.params.data.oppAcNo
    this.formData.oppAcName = this.$route.params.data.oppAcName
    this.formData.oppCurrencyCode = this.$route.params.data.oppCurrencyCode
    this.formData.oppAsAcNo = this.$route.params.data.oppAsAcNo
    this.formData.oppAsAcName = this.$route.params.data.oppAsAcName
    this.formData.trsType = this.$route.params.data.trsType
  }
}
</script>
