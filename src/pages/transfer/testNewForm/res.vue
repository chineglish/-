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
import { createNamespacedHelpers } from 'vuex'
// import util from '@/libs/util'
const { mapState: mapStateOfCommon } = createNamespacedHelpers('common')

export default {
  name: 'singleTransResult',
  computed: {
    ...mapStateOfCommon([
      'user'
    ])
  },
  data () {
    return {
      formModel: {
        summary: '单笔转账',
        transDate: '',
        amount: '',
        status: '',
        payerAcNo: '',
        payeeAcNo: '',
        operatorName: '',
        operatorId: ''
      },
      titleData: ['转账汇款', '单笔转账'],
      routeParams: {},
      btnData: [
        { btnText: '继续转账', class: 'm-cancel-btn', clickEventName: 'continue' },
        { btnText: '查看交易明细', class: 'm-submit-btn', clickEventName: 'transDetail' }
      ],
      data: {
        _RejMessage: '',
        _JnlStatus: '0',
        itemWidth: '4',
        stepsActive: 2,
        resData: {
          title: '转账申请已提交，请等待审核员审查！',
          _jnlNo: '454545454',
          group: [
            { label: '交易名称', key: 'summary' },
            { label: '交易日期', key: 'transDate' },
            { label: '转账金额', key: 'amount' },
            { label: '交易状态', key: 'status' },
            { label: '付款账户', key: 'payerAcNo' },
            { label: '收款账户', key: 'payeeAcNo' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }]
        }
      },
      status: {
        'NW': '成功',
        'WCK': '待审核'
      }
    }
  },
  methods: {
    payerAccList () {
      if (this.formModel.JnlStatus) {
        this.formModel.status = this.status[this.formModel.JnlStatus]
      }
    },
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
    this.formModel.operatorName = 'hjsdkhjkshdjf'
    this.formModel.operatorId = 'dfjhfdj'
    this.formModel.summary = '单笔转账'
    this.formModel.amount = '11212'
    this.formModel[this.data.resData.group[1].key] = '233121'
    this.data._JnlStatus = 'WCK'
    this.formModel.status = 'sak'
    // this.payerAccList()
  }
}
</script>
