<template>
  <d2-container>
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @on-back="backHandler"></m-form-res>
  </d2-container>
</template>
<script>
export default {
  name: 'leave-message-res',
  data () {
    return {
      formModel: {
        transName: '留言服务'
      },
      breadcrumb: ['企业管理台', '留言服务'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'on-back' }
      ],
      data: {
        _RejMessage: '',
        _JnlStatus: '0',
        itemWidth: '4',
        stepsActive: 2,
        resData: {
          // title: '留言成功！',
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '提交时间', key: '_transTime' },
            { label: '企业名称', key: 'userName' },
            { label: '操作员号', key: 'userId' }
          ]
        }
      }
    }
  },
  methods: {
    backHandler () {
      this.$router.push('/queryIndex')
    }
  },
  created () {
    this.formModel = this.$route.params.res
    this.data._JnlStatus = this.$route.params.res._processState
    this.data.resData._jnlNo = this.$route.params.res._jnlNo
  }
}
</script>
