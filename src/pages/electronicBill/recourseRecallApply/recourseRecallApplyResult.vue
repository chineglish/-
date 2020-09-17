<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
export default {
  name: 'recourseRecallApplyResult',
  data () {
    return {
      formModel: {
        billNum: '',
        billMoney: '',
        transDate: '',
        transTime: ''
      },
      titleData: ['电子商业汇票 ', '追索', '追索撤回'],
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
            { label: '票据号码', key: 'stdBillNum' },
            { label: '金额', key: 'stdPmMoney' },
            { label: '交易日期', key: 'transDate' },
            { label: '交易时间', key: 'transTime' }]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'recourseRecallApplyComfirm'
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      this.data._JnlStatus = this.$route.params._JnlStatus
      this.data._jnlNo = this.$route.params._jnlNo
    }
  }
}
</script>
