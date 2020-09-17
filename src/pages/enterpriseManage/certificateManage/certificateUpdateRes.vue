<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'certificateUpdateRes',
  data: function () {
    return {
      titleData: ['企业管理', '证书管理', '更新结果'],
      formModel: {
        transName: '证书更新',
        _JnlStatus: '',
        _jnlNo: '',
        _RejMessage: ''
      },
      btnData: [
        { btnText: '返回首页', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        _JnlStatus: '',
        stepsActive: 2,
        resData: {
          title: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transTime' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }
          ]
        }
      }
    }
  },
  mounted: function () {

  },
  methods: {
    onBack () {
      this.$router.push('/index')
    }
  },
  created () {
    if (this.$route.params) {
      const user = this.getUser()
      this.formModel.operatorName = user ? user.userName : ''
      this.formModel.operatorId = user ? user.userId : ''
      this.formModel.transTime = this.$route.params.res._transTime
      this.data.resData._jnlNo = this.$route.params.res._jnlNo
      this.data._JnlStatus = this.$route.params.res._processState
    }
  },
  components: {}
}
</script>
