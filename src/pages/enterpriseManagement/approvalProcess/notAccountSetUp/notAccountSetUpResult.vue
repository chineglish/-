<template>
  <d2-container>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-new-form :componentJson="formConfigJson"></m-new-form>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>

export default {
  name: 'not-account-setup-result',
  data () {
    return {
      formConfigJson: {
        stepsActive: 2
      },
      formModel: {
        payerWater: '审批流程设置',
        transDate: '',
        operatorName: '',
        operatorId: ''
      },
      breadData: ['企业管理台', '审批流程设置'],
      routeParams: {},
      btnData: [
        { btnText: '返回首页', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _RejMessage: '',
        _JnlStatus: '1',
        itemWidth: '4',
        resData: {
          title: '交易已提交，请等待审核员审查！',
          group: [
            { label: '交易名称', key: 'payerWater' },
            { label: '交易日期', key: 'transDate' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }]
        }
      }
    }
  },
  methods: {
    onBack (data) {
      this.$router.push({ name: 'index' })
    }
  },
  created () {
    this.data._JnlStatus = this.$route.params._processState
    this.data.resData._jnlNo = this.$route.params._jnlNo
    const user = this.getUser()
    this.formModel.operatorName = this.$route.params.userName ? this.$route.params.userName : user ? user.userName : '' // (操作员名 )
    this.formModel.operatorId = this.$route.params.userId ? this.$route.params.userId : user ? user.userId : '' // (操作员名)
    this.formModel.transDate = this.$route.params._transTime
    this.formModel.payerWater = '审批流程设置'
  }
}
</script>
