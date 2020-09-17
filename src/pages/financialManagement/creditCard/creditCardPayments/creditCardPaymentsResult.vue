<template>
    <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-form-res
                :data="data"
                :form-model="formModel"
                :btnData="btnData"
                @back="onBack"
        ></m-form-res>
    </d2-container>
</template>
<script>
import util from '@/libs/util'
export default {
  name: 'resultPage',
  data () {
    return {
      formModel: {},
      routeParams: {},
      breadData: ['财务管理', '信用卡', '信用卡还款'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        _RejMessage: '',
        stepsActive: 2,
        stepsData: [
          '信用卡还款录入',
          '还款确认',
          '还款结果'
        ],
        itemWidth: '4',
        resData: {
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'tradeName' },
            { label: '交易日期', key: 'tradeDate' },
            { label: '信用卡号', key: 'creditCardNum' },
            { label: '持卡人姓名', key: 'cardHolderName' },
            { label: '还款账户', key: 'repaymentAct' },
            { label: '还款金额(元)',
              key: 'repaymentAmt',
              formatter: (value) => util.formatCurrency(value)
            },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorNo' }
          ]
        }
      }
    }
  },
  methods: {
    _formatList (data) {
      for (let key in data) {
        if (key === 'transfType') {
          data[key] = this.transTypeList[data[key]]
        } else if (key === 'smsMessage' || key === 'savepayeeInfo') {
          data[key] = this.isTrue[data[key]]
        }
      }
      this.formModel = data
    },
    onBack () {
      this.$router.push({
        name: 'creditCardPayments'
      })
    }
  },
  created () {
    this.routeParams = this.$route.params
    this.data._JnlStatus = this.routeParams._JnlStatus
    this.data.resData._jnlNo = this.routeParams._jnlNo
    this._formatList({ ...this.routeParams })
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorNo = user ? user.userId : ''
  }
}
</script>
