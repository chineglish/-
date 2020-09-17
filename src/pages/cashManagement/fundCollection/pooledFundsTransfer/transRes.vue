<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
import { process_state } from '@/assets/js/entity'
export default {
  name: 'pooledFundsTransferRes',
  data () {
    return {
      formModel: {
        payName: '',
        transDate: '',
        payMoney: '',
        payStatus: '',
        payerAcc: '',
        payeeAcc: '',
        operatorName: '',
        operatorId: ''
      },
      titleData: ['现金管理', '资金归集', '归集资金划拨'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '4',
        stepsActive: 2,
        resData: {
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'payName' },
            { label: '交易日期', key: 'transDate' },
            {
              label: '交易金额',
              key: 'payMoney',
              formatter: (row) => util.formatCurrency(row)
            },
            {
              label: '交易状态',
              key: 'payStatus',
              formatter: (cellValue) => {
                return util.handleEnums(process_state, cellValue)
              }
            },
            { label: '付款账户', key: 'payerAcc' },
            { label: '收款账户', key: 'payeeAcc' },
            { label: '操作员', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'pooledFundsTransferPre'
      })
    }
  },
  created () {
    let res = this.$route.params.msg
    this.formModel.payName = '归集资金划拨'
    this.data._JnlStatus = this.$route.params._JnlStatus ? this.$route.params._JnlStatus : ''
    this.data.resData._jnlNo = this.$route.params._jnlNo ? this.$route.params._jnlNo : ''
    this.formModel.payMoney = res.amount
    this.formModel.payerAcc = res.payerAcc
    this.formModel.payeeAcc = res.payeeAcc
    this.formModel.payStatus = this.$route.params._JnlStatus
    this.formModel.transDate = this.$route.params._transTime
    // this.formModel.transDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : '' // (操作员名 )
    this.formModel.operatorId = user ? user.userId : '' // (操作员名)
  }
}
</script>
