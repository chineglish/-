<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>/**
 *@name: 操作员管理-修改结果
 * @author: 梁文彬
 * @date: 2019-12-17
 */

// import util from '@/libs/util'

export default {
  name: 'resetPasswordRes',
  data () {
    return {
      formModel: {
        transName: '',
        transDate: '',
        operatorName: '',
        operatorId: ''
      },
      titleData: ['企业管理台', '操作员管理'],
      btnData: [
        { btnText: '返回首页', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '4',
        resData: {
          title: '密码重置已提交，请等待审核员审查！',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transDate' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }]
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
      this.$router.push('/opManagement')
    }
  },
  created () {
    if (this.$route.params.msg) {
      this.formModel = this.$route.params.msg
      if (this.formModel.JnlStatus) {
        this.data._JnlStatus = this.formModel.JnlStatus
      }
      if (this.formModel._jnlNo) {
        this.data.resData._jnlNo = this.formModel._jnlNo
      }
    }
  }
}
</script>
