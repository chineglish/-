<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @continue="OnContinue" @transDetail="transDetail"></m-form-res>
  </d2-container>
</template>
<script>
/**
 *@name: 批量转账结果页
 */
import util from '@/libs/util'
import { process_state } from '@/assets/js/entity'

export default {
  name: 'batchTransferRes',
  data () {
    return {
      formModel: {
        transName: '批量转账',
        transDate: '',
        amount: '',
        totalCount: '',
        payerAcNo: ''
      },
      titleData: ['转账汇款', '批量转账'],
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
          title: '转账申请已提交，请等待审核员审查！',
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transDate' },
            { label: '总金额', key: 'amount', formatter: (value) => util.formatCurrency(value) },
            { label: '交易状态', key: 'status', formatter: (value) => util.handleEnums(process_state, value) },
            { label: '总笔数', key: 'totalCount' },
            { label: '手续费', key: 'totalFeeAmount', formatter: (value) => util.formatCurrency(value) },
            { label: '付款账号', key: 'payerAcNo' },
            { label: '付款账户名称', key: 'payerAcName' },
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
        name: 'batchTransfer',
        params: this.routeParams
      })
    }
  },
  created () {
    this.formModel = this.$route.params.formModel || this.formModel
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    const res = this.$route.params.res
    this.data._JnlStatus = res ? res._processState : ''
    this.formModel.status = res ? res._processState : ''
    this.data.resData._jnlNo = res ? res._jnlNo : ''
    this.formModel.transName = '批量转账'
    this.formModel.transDate = res ? res._transTime : ''
    // this.formModel.totalFeeAmount = res ? res.totalFeeAmount : ''
  }
}
</script>
