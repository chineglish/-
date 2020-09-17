<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack" @confirm="confirm"></m-form-res>
  </div>
</template>

<script>
export default {
  name: 'certificateResolve',
  data: function () {
    return {
      titleData: ['企业管理', '证书管理', '缴费结果'],
      formModel: {
        transName: '',
        transDate: '',
        payerAcNo: '',
        payerAcName: '',
        feesUserId: '',
        amount: '',
        payCertNo: '',
        fundUsage: '',
        feesUserName: '',
        feesUserSeq: '',
        operatorName: '',
        operatorNo: ''
      },
      btnData: [
        { btnText: '返回首页', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        _JnlStatus: '',
        stepsActive: 2,
        resData: {
          title: '交易已提交',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transTime' },
            { label: '缴费账户', key: 'payerAcNo' },
            { label: '账户名称', key: 'payerAcName' },
            { label: '缴费操作员号', key: 'feesUserId' },
            { label: '交易金额', key: 'amount' },
            { label: '证书编号', key: 'payCertNo' },
            { label: '摘要', key: 'fundUsage' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }
          ]
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    onBack () {
      // this.$router.go(-1)
      this.$router.push({
        name: 'index'
      })
    },
    confirm () {}
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      const user = this.getUser()
      this.formModel.operatorName = user ? user.userName : ''
      this.formModel.operatorId = user ? user.userId : ''
      this.formModel.transTime = this.$route.params.formModel.res._transTime
      this.data.resData._jnlNo = this.$route.params.formModel.res._jnlNo
      this.data._JnlStatus = this.$route.params.formModel.res._processState
    }
  },
  components: {}
}
</script>
