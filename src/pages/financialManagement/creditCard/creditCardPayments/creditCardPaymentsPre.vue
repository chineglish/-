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
          :showOne="showOne"
          :tableStyle="{width: '100%'}"></d-vertical-table>
        <div class="title fs16" style="margin-top: 10px">
          <span class="title-separate">&nbsp;</span>
          还款信息
        </div>
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
          @changeUp="changeUp"
          @submit="submit"
          @reset="reset"
          @gotoback="gotoback"
          @changeAcNo="changeAcNo"
        ></m-new-form>
    </div>
</template>

<script>
/**
     * @name: 信用卡还款录入
     * @author: 邓焕
     * @date: 2019-12-16
     */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'creditCardpaymentsPre',
  data () {
    return {
      breadData: ['财务管理', '信用卡', '信用卡还款'],
      stepsData: {
        stepsActive: 0,
        stepsData: [
          '信用卡还款录入',
          '还款确认',
          '还款结果'
        ]
      },
      showOne: false,
      // showOne: true,
      topTableData: [],
      AcList: [],
      formConfigJson: {
        rules: {
          repaymentAccount: [{ required: true, message: '请选择还款账户', trigger: 'submit' }],
          repaymentAmt: [{ required: true, message: '请输入还款金额', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              if (Number(this.formModel.balances) < Number(value)) {
                callback(new Error('输入金额超出余额'))
              } else {
                callback()
              }
            },
            trigger: 'submit' }
          ]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '还款账户',
                'type': 'select',
                'options': this.$route.params.payerAccountList ? this.$route.params.payerAccountList : [],
                trans: { value: 'showAcNo' },
                'rightSlotName': 'checkBalances',
                changeEventName: 'changeAcNo',
                'key': 'repaymentAct'
              },
              {
                label: '可用余额',
                type: 'text',
                textType: 'shy',
                key: 'balances',
                formatter: (key, value) => value ? util.formatCurrency(value) + '元' : '未查询到余额'
              },
              {
                'disabled': false,
                'label': '还款金额(元)',
                'type': 'input',
                inputType: 'money',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                'inputEventName': 'changeUp',
                'key': 'repaymentAmt'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-submit-btn', clickEventName: 'reset' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'gotoback' }
      ],
      formModel: {
        repaymentAct: '',
        repaymentAmt: '',
        balances: ''
      },
      creditCardAcct: {}
    }
  },
  methods: {
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.repaymentAmt = util.limitInputMoney(res.repaymentAmt)
    },
    changeAcNo (data) {
      this.formModel = data
      this.checkBalances()
    },
    submit (res) {
      httpPost('/eweb-transfer.CreditCardRepayConfirm.do', {
        acNo: this.AcList[res.repaymentAct].acNo,
        payerAcName: this.AcList[res.repaymentAct].acName,
        amount: res.repaymentAmt,
        creditCardNo: this.creditCardAcct.cardNbr,
        creditCardName: this.creditCardAcct.acctName
      }).then(conf => {
        Object.assign(conf, res)
        this.$router.push({
          name: 'creditCardPaymentsConf',
          params: {
            formModel: conf,
            topTableData: this.topTableData,
            payerAccountList: this.AcList,
            creditCardAcct: this.creditCardAcct,
            data: this.$route.params.data
          }
        })
      }).catch(conf => {})
    },
    reset (res) {
      res.repaymentAmtcopy = ''
      this.PayerAccountListQry()
    },
    gotoback () {
      this.$router.push('./creditCardPayments')
    },
    checkBalances () {
      httpPost('/eweb-acmgmt.AccountInfoQuery.do', {
        payerAcNo: this.AcList[this.formModel.repaymentAct].acNo,
        payerSubAcNo: this.AcList[this.formModel.repaymentAct].subAcNo
      }).then(AccountInfo => {
        this.formModel.balances = AccountInfo.availBal
      }).catch(AccountInfo => {
        this.formModel.balances = ''
      })
    },
    CreditCardAcctQuery (acNo) {
      if (this.$route.params.topTableData) {
        this.topTableData = this.$route.params.topTableData
        this.creditCardAcct = this.$route.params.creditCardAcct
      } else {
        httpPost('/eweb-transfer.CreditCardAcctQuery.do', { acNo: acNo }).then(CreditCardAcct => {
          this.creditCardAcct = CreditCardAcct
          this.topTableData = [
            { key: 'cardNbr', label: '信用卡号', value: CreditCardAcct.cardNbr },
            { key: 'creditLimit', label: '账户信用额度', value: util.formatCurrency(CreditCardAcct.creditLimit) + '元' },
            { key: 'currentLimit', label: '目前可用额度', value: util.formatCurrency(CreditCardAcct.currentLimit) + '元' },
            { key: 'lastRepayAmount', label: '本期账单未还金额', value: util.formatCurrency(CreditCardAcct.lastRepayAmount) + '元' },
            { key: 'acctName', label: '持卡人姓名', value: CreditCardAcct.acctName },
            { key: 'indepPayTotal', label: '账户欠款总额', value: util.formatCurrency(CreditCardAcct.indepPayTotal) + '元' },
            { key: 'accountBalance', label: '本期账单金额', value: util.formatCurrency(CreditCardAcct.accountBalance) + '元' }
          ]
        })
      }
    },
    PayerAccountListQry () {
      httpPost('/eweb-query.PayerAccountListQry.do', { TransCode: 'CreditCardRepay' }).then(PayerAccountList => {
        this.AcList = PayerAccountList.AcList
        this.AcList.forEach(item => {
          item.showAcNo = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.AcList
        this.formModel.repaymentAct = 0
        this.checkBalances()
      })
    }
  },
  created () {
    this.PayerAccountListQry()
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
      this.CreditCardAcctQuery(this.$route.params.formModel.acNo)
    }
  }
}
</script>

<style lang="scss" scoped>
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
    height: 35px;
    display: flex;
    display: inline-block\9;

    justify-content: space-between;
    margin-left: 2.5%;
}
</style>
