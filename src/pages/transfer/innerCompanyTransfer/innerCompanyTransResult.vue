<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @continue="OnContinue" @transDetail="transDetail"></m-form-res>
  </d2-container>
</template>
<script>
/**
 *@name: 公司内部转账结果页
 */
import util from '@/libs/util'
import { process_state } from '@/assets/js/entity'

export default {
  name: 'innerCompanyTransResult',
  data () {
    return {
      formModel: {
        summary: '公司内部转账',
        transDate: '',
        amount: '',
        status: '',
        payerAcNo: '',
        payeeAcNo: '',
        operatorName: '',
        operatorId: ''
      },
      titleData: ['转账汇款', '公司内部转账'],
      routeParams: {},
      btnData: [
        { btnText: '继续转账', class: 'm-submit-btn', clickEventName: 'continue' },
        { btnText: '查看交易明细', class: 'm-cancel-btn', clickEventName: 'transDetail' }
      ],
      data: {
        _RejMessage: '',
        _JnlStatus: '0',
        itemWidth: '4',
        stepsActive: 2,
        resData: {
          title: '交易已提交',
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'summary' },
            { label: '交易日期', key: 'transTime' },
            { label: '转账金额', key: 'amount', formatter: (value) => util.formatCurrency(value) },
            { label: '交易状态', key: 'JnlStatus', formatter: (value) => util.handleEnums(process_state, value) },
            { label: '付款账号', key: 'payerAcNo' },
            { label: '收款账号', key: 'payeeAcNo' },
            { label: '付款账户名称', key: 'payerAcName' },
            { label: '收款账户名称', key: 'payeeAcName' },
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
    transDetail () {
      this.$router.push('/accountDetailQry')
    },
    OnContinue (data) {
      this.$router.push({
        name: 'innerCompanyTransPre',
        params: this.formModel
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    sessionStorage.removeItem('cached_page_data')
    next()
  },
  created () {
    const user = this.getUser()
    this.formModel = this.$route.params.msg
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.formModel.summary = '公司内部转账'
    // this.formModel.amount = util.formatCurrency(res.msg.amount)
    // this.data.resData.title = '交易流水号：' + this.$route.params._jnlNo + ',请等待复审员审核！'
    if (this.formModel.JnlStatus) {
      this.data._JnlStatus = this.formModel.JnlStatus
    }
    if (this.formModel._jnlNo) {
      this.data.resData._jnlNo = this.formModel._jnlNo
    }
  }
}
</script>
