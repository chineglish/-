<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
export default {
  name: 'periodicColSet',
  data () {
    return {
      formModel: {
        transName: '',
        transDate: '',
        acc: '',
        accName: '',
        operatorName: '',
        operatorId: ''
      },
      titleData: ['现金管理', '资金归集', '定时归集设置'],
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
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transDate' },
            { label: '账户', key: 'acc' },
            { label: '户名', key: 'accName' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'periodicColSet'
      })
    }
  },
  created () {
    this.formModel.transName = '定时归集设置'
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    if (this.$route.params) {
      this.data._JnlStatus = this.$route.params._JnlStatus
      this.data.resData._jnlNo = this.$route.params._jnlNo
      this.formModel.acc = this.$route.params.acNo
      this.formModel.accName = this.$route.params.acName
      this.formModel.transDate = this.$route.params._transTime
    }
  }
}
</script>
