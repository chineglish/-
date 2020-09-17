<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
/**
 *@name: 出金交易结果
 */
export default {
  name: 'withdrawalRes',
  data () {
    return {
      formModel: {
        transName: '出金交易',
        transDate: '',
        acNo: '',
        depositMoney: '',
        operatorName: '',
        operatorId: '',
        amount: ''
      },
      titleData: ['转账汇款', '上海航运', '出金交易结果'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '4',
        resData: {
          title: '交易已提交，请等待审核员审查！',
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transDate' },
            { label: '交易账户', key: 'acNo' },
            { label: '交易金额', key: 'amount', formatter: (value) => util.formatCurrency(value) },
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
    this.formModel.transDate = res.transDate
    this.formModel.acNo = res.acNo
    this.formModel.amount = res.amount
    if (res._jnlNo) {
      this.data.resData._jnlNo = res._jnlNo
    }
    if (this.getUser() !== undefined) {
      this.formModel.operatorName = this.getUser().userName
      this.formModel.operatorId = this.getUser().userId
    }
  }
}
</script>
