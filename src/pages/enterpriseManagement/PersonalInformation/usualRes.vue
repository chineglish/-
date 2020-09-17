<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="goHome"></m-form-res>
    </div>
</template>

<script>
export default {
  name: 'usualRes',
  data () {
    return {
      breadData: ['企业管理台', '操作员个人信息维护'],
      formModel: {},
      btnData: [{ btnText: '返回首页', class: 'm-cancel-btn', clickEventName: 'back' }],
      data: {
        _JnlStatus: '0',
        itemWidth: '4',
        resData: {
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '提交时间', key: 'submitTime' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorNum' }]
        }
      }
    }
  },
  methods: {
    goHome () {
      this.$router.push({
        name: 'index'
      })
    }
  },
  mounted () {
    const res = this.$route.params.res
    const user = this.getUser()
    this.formModel = {
      transName: '密码修改',
      submitTime: res ? res._transTime : '',
      operatorName: user ? user.userName : '',
      operatorNum: user ? user.userId : ''
    }
    this.data._JnlStatus = res ? res._processState : ''
    this.data.resData._jnlNo = res ? res._jnlNo : ''
  }
}
</script>
