<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>

/**
 *@name: 操作员管理-修改结果
 */
export default {
  name: 'opUpdateRes',
  data () {
    return {
      formModel: {
        transName: '',
        transDate: '',
        operatorName: '',
        operatorId: '',
        jnlNo: '',
        _JnlStatus: '',
        _jnlNo: ''
      },
      titleData: ['企业管理台', '操作员管理'],
      btnData: [
        { btnText: '返回首页', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '4',
        stepsActive: 2,
        resData: {
          title: '交易已完成，等待审核员审核！',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transDate' },
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
      this.$router.push('/index')
    }
  },
  created () {
    let res = this.$route.params
    if (res.JnlStatus) {
      this.data._JnlStatus = res.JnlStatus
    }
    if (res._jnlNo) {
      this.data.resData._jnlNo = res._jnlNo
    }
    this.formModel = res
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : '' // (操作员名 )
    this.formModel.operatorId = user ? user.userId : '' // (操作员名)
  }
}
</script>
