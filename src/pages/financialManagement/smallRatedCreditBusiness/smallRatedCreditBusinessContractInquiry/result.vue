<template>
    <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-form-res
                :data="data"
                :form-model="formModel"
                :btnData="btnData"
                @gotoContinue="gotoContinue"
                @gotoBack="gotoBack"
        ></m-form-res>
    </d2-container>
</template>
<script>
import util from '@/libs/util'

export default {
  name: 'smallRatedCreditBusinessContractResult',
  data () {
    return {
      formModel: {
        tradeName: '小额定期贷记业务签约',
        tradeDate: '',
        tradeAmt: '',
        tradeNum: '',
        operatorName: '',
        operatorNo: ''
      },
      routeParams: {},
      breadData: ['财务管理', '小额定期贷记业务'],
      btnData: [
        { btnText: '继续', class: 'm-submit-btn', clickEventName: 'gotoContinue' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'gotoBack' }
      ],
      data: {
        _JnlStatus: '',
        _jnlNo: '',
        _RejMessage: '',
        stepsActive: 2,
        itemWidth: '4',
        resData: {
          title: '交易已提交，请等待审核员审查！',
          group: [
            { label: '交易名称', key: 'tradeName' },
            { label: '交易日期', key: 'tradeDate' },
            { label: '交易金额',
              key: 'tradeAmt',
              formatter: (value) => util.formatCurrency(value)
            },
            { label: '交易笔数', key: 'tradeNum' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorNo' }
          ]
        }
      }
    }
  },
  methods: {
    gotoBack () {
      this.$router.push({ path: '/index' })
    },
    gotoContinue (data) {
      this.$route.params.msg.payerAmt = ''
      this.$route.params.msg.detailsNum = ''
      this.$route.params.msg.uploadFile = []
      this.$router.push({
        name: 'smallRatedCreditBusinessContractPre',
        params: {
          formModeluu: this.$route.params.msg
        }
      })
    }
  },
  created () {
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorNo = user ? user.userId : ''
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params.msg)
      this.data._JnlStatus = this.formModel.JnlStatus
      this.formModel.tradeDate = this.formModel._transTime
      this.formModel.tradeAmt = this.formModel.payerAmt
      this.formModel.tradeNum = this.formModel.detailsNum
    }
    this.data._JnlStatus = this.$route.params.res._processState
    this.data.resData._jnlNo = this.$route.params.res._jnlNo
    this.formModel.transDate = this.$route.params.res._transTime
  }
}
</script>
