<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
import { process_state } from '@/assets/js/entity'
/**
 *@name: 入金交易结果
 */
export default {
  name: 'depositRes',
  data () {
    return {
      formModel: {
        transName: '上海航运入金交易',
        transDate: '',
        payerAccont: '',
        amount: '',
        operatorName: '',
        operatorId: ''
      },
      titleData: ['转账汇款', '上海航运', '入金交易结果'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '4',
        resData: {
          title: '交易已提交，请等待审核员审查！',
          group: [
            { label: '交易名称', key: 'transName', formatter: (value) => '上海航运入金交易' },
            { label: '交易日期', key: 'transDate' },
            { label: '交易金额', key: 'amount', formatter: (value) => util.formatCurrency(value) },
            { label: '交易状态', key: 'status', formatter: (value) => util.handleEnums(process_state, value) },
            { label: '交易商银行账号', key: 'acNo' },
            { label: '交易商交易资金账号', key: 'Yhbh' },
            { label: '交易商户名', key: 'Khmc' },
            { label: '交易市场名称', key: 'marketOrgName' },
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
    onBack () {
      this.$router.push('/shipTrans')
    }
  },
  created () {
    let res = this.$route.params.msg
    this.data._JnlStatus = res.JnlStatus
    this.formModel = res
    this.formModel.status = res.JnlStatus
    if (this.getUser() !== undefined) {
      this.formModel.operatorName = this.getUser().userName
      this.formModel.operatorId = this.getUser().userId
      if (res._jnlNo) {
        this.data.resData._jnlNo = res._jnlNo
      }
    }
  }
}
</script>
