<template>
    <d2-container>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
    </d2-container>
</template>
<script>
/**
 *@name: 付款签收-结果页
 */
import util from '@/libs/util'
export default {
  name: 'PromptPaymentSignforRes',
  data () {
    return {
      formModel: {
        transName: '付款签收'
      },
      titleData: ['电子商业汇票', '提示付款', '付款签收结果'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '2',
        stepsActive: 2,
        _JnlStatus: '',
        resData: {
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '票据号码', key: 'stdBillNum' },
            {
              label: '金额',
              key: 'stdPmMoney',
              formatter: (value) => util.formatCurrency(value)
            },
            { label: '交易日期', key: 'transTime' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }
          ]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'PromptPaymentSignforPre'
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
