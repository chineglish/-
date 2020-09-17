<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
/**
 *@name: 非税缴费结果页
 * @author: 梁文彬
 * @date: 2019-12-17
 */
export default {
  name: 'noTaxPayRes',
  data () {
    return {
      formModel: {
        paymentCode: '',
        payeeName: '',
        payerName: '',
        payerAcc: '',
        payMoney: '',
        transDate: '',
        transTime: '',
        operatorName: ''
      },
      titleData: ['转账汇款', '非税缴费'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '4',
        stepsActive: 2,
        resData: {
          title: '交易已提交，请等待审核员审查！',
          _jnlNo: '',
          group: [
            { label: '缴款码', key: 'paymentCode' },
            { label: '收款人名称', key: 'payeeName' },
            { label: '付款账户名称', key: 'payerName' },
            { label: '付款账户', key: 'payerAcc' },
            { label: '缴款金额', key: 'payMoney' },
            { label: '交易日期', key: 'transDate' },
            { label: '交易时间', key: 'transTime' },
            { label: '操作员', key: 'operatorName' }]
        }
      },
      status: {
        '0': '失败',
        '1': '待审核'
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'noTaxPay'
      })
    }
  },
  created () {
    if (this.$route.params.msg) {
      this.data._JnlStatus = this.$route.params.msg.JnlStatus
      this.data.resData._jnlNo = this.$route.params.msg._jnlNo
      this.formModel.paymentCode = this.$route.params.msg.payCode
      this.formModel.payeeName = this.$route.params.msg.payeeAcName
      this.formModel.payerName = this.$route.params.msg.payerAcName
      this.formModel.payerAcc = this.$route.params.msg.payerAcNo
      this.formModel.payMoney = this.$route.params.msg.amount
      this.formModel.transDate = this.$route.params.msg._transTime.substring(0, 10)
      this.formModel.transTime = this.$route.params.msg._transTime.substring(11, this.$route.params.msg._transTime.length)
      const user = this.getUser()
      this.formModel.operatorName = user ? user.userName : ''
    }
  }
}
</script>
