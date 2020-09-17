<template>
    <d2-container>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
    </d2-container>
</template>
<script>
/**
     *@name: 背书撤回-结果页
     */
export default {
  name: 'EndorsementTransferRevokeRes',
  data () {
    return {
      formModel: {
        transName: '背书撤销'
      },
      titleData: ['电子商业汇票', '背书转让', '背书撤销结果'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '2',
        resData: {
          title: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '票据号码', key: 'stdBillNum' },
            { label: '金额', key: 'stdPmMoney' },
            { label: '交易日期', key: 'transTime' },
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
        name: 'EndorsementTransferRevokePre'
      })
    }
  },
  created () {
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    if (this.$route.params.data) {
      Object.assign(this.formModel, this.$route.params.data)
      this.formModel.status = this.$route.params.res._processState
      this.formModel.transTime = this.$route.params.res._transTime
      this.data.resData._jnlNo = this.$route.params.res._jnlNo
      this.data._JnlStatus = this.$route.params.res._processState
    }
  }
}
</script>
