<template>
    <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-form-res
          :data="data"
          :formModel="formModel"
          :btnData="btnData"
          @back="onBack"
        ></m-form-res>
    </d2-container>
</template>
<script>
import { process_state } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'resultPage',
  data () {
    return {
      formModel: {
        payName: '',
        transDate: '',
        transName: '',
        amount: '',
        operatorName: '',
        operatorId: '',
        jnlNo: '',
        payerAccNo: ''
      },
      routeParams: {},
      breadData: ['财务管理', '财务报销', '批量报销'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        // _RejMessage: '',
        stepsActive: 2,
        itemWidth: '4',
        resData: {
          _jnlNo: '',
          // title: '交易已提交，请等待审核员审查！',
          group: [
            { label: '交易名称', key: 'payName', formatter: () => '批量报销' },
            { label: '交易日期', key: 'transDate' },
            { label: '总金额', key: 'amount', formatter: (row) => util.formatCurrency(row) },
            { label: '交易状态', key: '_JnlStatus', formatter: (cellValue) => util.handleEnums(process_state, cellValue) },
            { label: '总笔数', key: 'totalNum' },
            { label: '合同号', key: 'contractNo' },
            { label: '付款账号', key: 'payerAccNo' },
            { label: '付款名称', key: 'payerAccName' },
            { label: '操作员名称', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }
          ]
        }
      }
    }
  },
  methods: {
    onBack (data) {
      this.$router.push({
        name: 'bulkReimbursementPre'
      })
    }
  },
  created () {
    this.formModel = this.$route.params
    this.formModel.payerAccNo = this.formModel.acNo
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    let res = this.$route.params.res
    this.formModel.transDate = res ? res._transTime : ''
    this.formModel._JnlStatus = res ? res._processState : ''
    this.data._JnlStatus = res ? res._processState : ''
    this.data.resData._jnlNo = res ? res._jnlNo : ''
    this.formModel.payName = '批量报销'
  }
}
</script>
