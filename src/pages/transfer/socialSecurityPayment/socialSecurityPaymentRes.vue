<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-form-res
      :data="data"
      :form-model="formModel"
      :btnData="btnData"
      @back="onBack"
      >
    </m-form-res>
    </div>
  </div>
</template>
<script>
/**
     *@name: 社保缴费结果
*/
import util from '@/libs/util'
import { process_state } from '@/assets/js/entity'
export default {
  name: 'socialSecurityPaymentRes',
  data () {
    return {
      formModel: {
        payName: '',
        totalAmount: '',
        transName: '',
        transDate: '',
        operatorName: '',
        operatorId: '',
        jnlNo: '',
        acNo: '',
        acName: ''
      },
      titleData: ['转账汇款', '社保缴费'],
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
            { label: '交易名称', key: 'payName' },
            { label: '交易日期', key: 'transDate' },
            { label: '操作员号', key: 'operatorId' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '交易状态', key: '_JnlStatus', formatter: (cellValue) => util.handleEnums(process_state, cellValue) },
            { label: '交易金额', key: 'totalAmount' },
            { label: '付款账号', key: 'acNo' },
            { label: '付款账户名称', key: 'acName' }
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
        name: 'socialSecurityPayment'
      })
    }
  },
  created () {
    this.formModel = this.$route.params
    this.formModel.payName = '社保缴费'
    const user = this.getUser()
    this.formModel._JnlStatus = this.$route.params.JnlStatus
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.data._JnlStatus = this.$route.params.JnlStatus ? this.$route.params.JnlStatus : ''
    this.data.resData._jnlNo = this.formModel._jnlNo ? this.$route.params._jnlNo : ''
  }
}
</script>
