<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
// import util from '@/libs/util'
// import { process_state } from '@/assets/js/entity'
export default {
  name: 'telephoneBankOpenRes',
  data () {
    return {
      formModel: {
        transName: '',
        submitTime: '',
        operatorName: '',
        operatorNum: ''
      },
      titleData: ['企业管理台', '电话银行开通'],
      btnData: [
        { btnText: '返回首页', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '0',
        itemWidth: '4',
        resData: {
          title: '电话银行开通成功',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '提交时间', key: 'submitTime' },
            { label: '账号', key: 'acNo' },
            { label: '账户名称', key: 'acName' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }
          ]
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
        name: 'index'
      })
    }
  },
  created () {
    // Object.assign(this.formModel, this.$route.params.formModel)
    this.formModel.acName = this.$route.params.acName
    this.formModel.acNo = this.$route.params.acNo
    this.formModel.transName = '电话银行开通'
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : '' // (操作员名 )
    this.formModel.operatorId = user ? user.userId : '' // (操作员名)
    const res = this.$route.params.res
    this.data._JnlStatus = res ? res._processState : ''
    this.data.resData._jnlNo = res ? res._jnlNo : ''
    this.formModel.submitTime = res ? res._transTime : ''
  }
}
</script>
