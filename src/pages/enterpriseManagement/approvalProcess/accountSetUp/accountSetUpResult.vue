<template>
  <d2-container>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>

export default {
  name: 'account-setup-result',
  data () {
    return {

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
        _JnlStatus: '',
        stepsActive: 2,
        itemWidth: '4',
        resData: {
          title: '交易已提交，请等待审核员审查！',
          group: [
            { label: '交易名称', key: 'payerWater' },
            { label: '交易日期', key: 'transDate' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }
          ]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({ name: 'index' })
    }
  },
  created () {
    this.formModel = this.$route.params
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.data._JnlStatus = this.formModel._JnlStatus ? this.formModel._JnlStatus : ''
    this.data.resData._jnlNo = this.formModel._jnlNo ? this.formModel._jnlNo : ''
  }
}
</script>
