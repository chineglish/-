<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </div>
</template>
<script type="text/javascript">
export default {
  name: '',
  data: function () {
    return {
      titleData: ['企业管理台', '限额管理', '限额修改结果'],
      formModel: {
        transName: '限额修改',
        transDate: '',
        operatorNo: '',
        operatorName: ''
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        stepsActive: 3,
        _JnlStatus: '',
        itemWidth: '4',
        resData: {
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transDate' },
            { label: '操作员号', key: 'operatorNo' },
            { label: '操作员姓名', key: 'operatorName' }
          ]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'quotaManage'
      })
    }
  },
  created () {
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorNo = user ? user.userId : ''
    this.formModel.transDate = this.$route.params.transDate
    this.data._JnlStatus = this.$route.params._JnlStatus
    this.data.resData._jnlNo = this.$route.params._jnlNo
  }
}
</script>
