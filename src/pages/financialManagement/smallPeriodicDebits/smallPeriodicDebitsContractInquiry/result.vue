<template>
    <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-form-res
                :data="data"
                :form-model="formModel"
                :btnData="btnData"
                @continue="gotoContinue"
                @gotoBack="gotoBack"
        ></m-form-res>
    </d2-container>
</template>
<script>
/**
     * @name: 小额定期借记业务签约
     * @date: 2019-12-23
     * @author: 邓焕
     */
import util from '@/libs/util'
export default {
  name: 'smallPeriodicDebitsContractResult',
  data () {
    return {
      formModel: {
        tradeName: '小额定期借记业务签约',
        tradeDate: '',
        tradeAmt: '',
        tradeNum: '',
        operatorName: '',
        operatorNo: ''
      },
      routeParams: {},
      breadData: ['财务管理', '小额定期借记业务签约'],
      btnData: [
        { btnText: '继续', class: 'm-submit-btn', clickEventName: 'continue' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'gotoBack' }
      ],
      data: {
        _JnlStatus: '',
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
    _formatList (data) {
      this.formModel = data
    },
    gotoBack () {
      this.$router.push('/index')
    },
    gotoContinue (data) {
      this.$router.push({
        name: 'smallPeriodicDebitsContractPre'
      })
    }
  },
  created () {
    if (this.$route.params.msg) {
      const user = this.getUser()
      this.formModel.operatorName = user ? user.userName : ''
      this.formModel.operatorId = user ? user.userId : ''
      Object.assign(this.formModel, this.$route.params.msg)
      this.formModel.tradeAmt = this.formModel.payerAmt
      this.formModel.tradeNum = this.formModel.detailsNum
    }
    this.data._JnlStatus = this.$route.params.res._processState ? this.$route.params.res._processState : ''
    this.data.resData._jnlNo = this.$route.params.res._jnlNo ? this.$route.params.res._jnlNo : ''
    this.formModel.tradeDate = this.$route.params.res._transTime
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : '' // (操作员名 )
    this.formModel.operatorNo = user ? user.userId : '' // (操作员名)
  }
}
</script>
