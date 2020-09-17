<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-steps :data="stepsData"></m-steps>
        <div class="title" style="margin-top: 10px">
            <span class="title-separate">&nbsp;</span>
            账单信息
        </div>
        <d-vertical-table
          :tabledata="topTableData"
          :showOne="false"
          :tableStyle="{
              width: '100%'
          }"
        >
        </d-vertical-table>
        <div class="title fs16" style=" margin-top: 10px">
            <span class="title-separate">&nbsp;</span>
            还款信息
        </div>
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          @submit="submit"
          @gotoback="gotoback"
        >
        </m-new-form>
    </div>
</template>

<script>/**
     * @name: 信用卡还款确认
     * @author: 邓焕
     * @date: 2019-12-16
     */

import util from '../../../../libs/util'
import { httpPost } from '../../../../api/sys/http'
export default {
  name: 'creditCardPayments',
  data () {
    return {
      balances: '',
      breadData: ['财务管理', '信用卡', '信用卡还款'],
      stepsData: {
        stepsActive: 1,
        stepsData: [
          '信用卡还款录入',
          '还款确认',
          '还款结果'
        ]
      },
      topTableData: [
        { key: '', label: '信用卡号', value: '' },
        { key: '', label: '账户信用额度', value: '' },
        { key: '', label: '目前可用额度', value: '' },
        { key: '', label: '本期账单未还金额', value: '' },
        { key: '', label: '持卡人姓名', value: '' },
        { key: '', label: '账户欠款总额', value: '' },
        { key: '', label: '本期账单金额', value: '' }
      ],
      formConfigJson: {
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '还款账户',
                'type': 'text',
                'key': 'repaymentAct',
                formatter: (name, value) => this.$route.params.payerAccountList[value].showAcNo
              },
              {
                'disabled': true,
                'label': '还款金额(元)',
                'type': 'text',
                'key': 'repaymentAmt',
                formatter: (name, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'gotoback' }
      ],
      formModel: {},
      creditCardAcct: {}
    }
  },
  methods: {
    submit (data) {
      httpPost('/eweb-common.GenToken.do', this.$route.params.data).then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params.formModel._Data2Sign, _authenticateType: this.$route.params.formModel._authenticateType })
        httpPost('/eweb-transfer.CreditCardRepay.do', {
          _dataMapKey: this.$route.params.formModel._dataMapKey,
          _authenticateTypeChoose: this.$route.params.formModel._authenticateType ? this.$route.params.formModel._authenticateType[0] : '',
          CSIISignature: singMsg,
          acNo: this.$route.params.payerAccountList[this.$route.params.formModel.repaymentAct].acNo,
          payerAcName: this.$route.params.payerAccountList[this.$route.params.formModel.repaymentAct].acName,
          amount: this.$route.params.formModel.repaymentAmt,
          creditCardNo: this.$route.params.creditCardAcct.cardNbr,
          creditCardName: this.$route.params.creditCardAcct.acctName,
          _tokenName: token._tokenName
        }).then(repay => {
          this.$router.push({
            name: 'creditCardPaymentsResult',
            params: {
              _JnlStatus: repay._processState,
              _jnlNo: repay._jnlNo,
              tradeDate: repay._transTime,
              JnlStatus: '1',
              tradeName: '信用卡还款',
              creditCardNum: this.$route.params.creditCardAcct.cardNbr,
              cardHolderName: this.$route.params.creditCardAcct.acctName,
              operatorName: this.getUser().userName,
              operatorNo: this.getUser().userId,
              repaymentAct: this.$route.params.payerAccountList[this.$route.params.formModel.repaymentAct].showAcNo,
              repaymentAmt: this.formModel.repaymentAmt
            }
          })
        })
      })
    },
    gotoback () {
      this.$router.push({
        name: 'creditCardPaymentsPre',
        params: {
          formModel: this.$route.params.formModel,
          topTableData: this.$route.params.topTableData,
          payerAccountList: this.$route.params.payerAccountList,
          creditCardAcct: this.$route.params.creditCardAcct
        }
      })
    }
  },
  created () {
    if (this.$route.params.topTableData) {
      this.topTableData = this.$route.params.topTableData
      this.formModel = this.$route.params.formModel
      this.creditCardAcct = this.$route.params.creditCardAcct
    } else {
      this.$router.push('./creditCardPayments')
    }
  }
}
</script>

<style lang="scss" scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
    .title{
        background: #FDF2F3;
        color: #333333;
        line-height: 40px;
        margin: 30px 0px;

        .title-separate{
            margin-left: 20px;
            background: #D41618;
            width: 6px;
            height: 28px;
        }
    }
    .checkBalances{
        width: 30%;
        display: flex;
        display: inline-block\9;
        justify-content: space-between;
        margin-left: 2.5%;
    }
</style>
