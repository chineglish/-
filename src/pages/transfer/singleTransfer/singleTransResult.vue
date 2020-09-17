<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @continue="OnContinue" @transDetail="transDetail"></m-form-res>
  </d2-container>
</template>
<script>
/**
 *@name: 单笔转账结果页
 */
import util from '@/libs/util'
import { process_state } from '@/assets/js/entity'

export default {
  name: 'singleTransResult',
  data () {
    return {
      formModel: {
        summary: '单笔转账',
        transDate: '4545454',
        amount: '7878',
        JnlStatus: '787',
        payerAcNo: '78',
        payeeAcNo: '778',
        operatorName: '78',
        operatorId: '78'
      },
      titleData: ['转账汇款', '单笔转账'],
      routeParams: {},
      btnData: [
        { btnText: '继续转账', class: 'm-cancel-btn', clickEventName: 'continue' },
        { btnText: '查看交易明细', class: 'm-submit-btn', clickEventName: 'transDetail' }
      ],
      data: {
        _RejMessage: '',
        _JnlStatus: '',
        itemWidth: '4',
        stepsActive: 2,
        resData: {
          title: '转账申请已提交，请等待审核员审查！',
          group: [
            { label: '交易名称', key: 'summary' },
            { label: '交易日期', key: 'transDate' },
            { label: '转账金额', key: 'amount', formatter: (value) => util.formatCurrency(value) },
            { label: '交易状态', key: 'JnlStatus', formatter: (value) => util.handleEnums(process_state, value) },
            { label: '付款账号', key: 'payerAcNo' },
            { label: '收款账号', key: 'payeeAcNo' },
            { label: '账簿号', key: 'asAcNo', show: this.$route.params.msg.asFlag === '1' },
            { label: '账簿名', key: 'asAcName', show: this.$route.params.msg.asFlag === '1' },
            { label: '操作员号', key: 'operatorId' },
            { label: '操作员名', key: 'operatorName' }
          ]
        }
      }
    }
  },
  methods: {
    transDetail () {
      this.$router.push('/accountDetailQry')
    },
    OnContinue (data) {
      this.$router.push({
        name: 'singleTransPre',
        params: this.routeParams
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    sessionStorage.removeItem('cached_page_data')
    next()
  },
  created () {
    // this.data._JnlStatus = 'this.$route.params.msg.JnlStatus'
    // this.data._JnlStatus = 'WCK'
    // this.data.resData._jnlNo = '11111'
    if (this.$route.params.msg) {
      this.formModel = this.$route.params.msg
      const user = this.getUser()
      this.formModel.operatorName = user ? user.userName : ''
      this.formModel.operatorId = user ? user.userId : ''
      this.formModel.summary = '单笔转账'
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
