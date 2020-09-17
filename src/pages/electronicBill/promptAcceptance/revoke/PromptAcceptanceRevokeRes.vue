<template>
    <d2-container>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
    </d2-container>
</template>
<script>
/**
     *@name: 提示承兑申请-结果页
     */
import util from '@/libs/util'
export default {
  name: 'PromptAcceptanceRevokeRes',
  data () {
    return {
      formModel: {
        transName: '撤销提示承兑'
      },
      titleData: ['电子商业汇票', '提示承兑', '撤销提示承兑结果'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '2',
        stepsActive: 2,
        resData: {
          title: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '票据号码', key: 'stdBillNum' },
            { label: '金额', key: 'stdPmMoney', formatter: (value) => util.formatCurrency(value) },
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
        name: 'PromptAcceptanceRevokePre'
      })
    }
  },
  created () {
    if (this.$route.params.data) {
      Object.assign(this.formModel, this.$route.params.data)
      this.formModel.status = this.$route.params.res._processState
      const user = this.getUser()
      this.formModel.operatorName = user ? user.userName : ''
      this.formModel.operatorId = user ? user.userId : ''
      this.formModel.transTime = this.$route.params.res._transTime
      this.data.resData._jnlNo = this.$route.params.res._jnlNo
      this.data._JnlStatus = this.$route.params.res._processState
    }
  }
}
</script>
