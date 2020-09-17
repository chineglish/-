<template>
    <div class="assets-debt">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
								@submit="submit"
								@reset="reset"
                @selectAcc="selectAcc"
                @selectQuery="selectQuery"
                @selectHuabo="selectHuabo"
                @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
								@inquiry="inquiry"
                @changeUp="changeUp"
        >
          <div class="checkBalances" slot="inquiry">
						<el-button @click="inquiry" class="m-submit-btn fs14">查询收款</el-button>
          </div>
        </m-new-form>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'pooledFundsTransferPre',
  data () {
    return {
      payerAccNoList: [], // 付款账户信息列表
      // 面包屑导航
      breadData: ['现金管理', '资金归集', '归集资金划拨'],
      formModel: {
        payerAcc: 0,
        payerCur: '',
        payerAccName: '',
        payeeAcc: '',
        payeeCur: '',
        payeeAccName: '',
        amount: '',
        bigMoney: '',
        use: '',
        postscript: '',
        huabo: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          payerAcc: [{ required: true, message: '付款账户', trigger: 'change' }],
          payeeAcc: [{ required: true, message: '收款账户', trigger: 'change' }],
          amount: [{ required: true, message: '金额', trigger: 'change' }, {
            validator: (rule, value, callback) => util.verifyAmount(value, callback), trigger: 'submit'
          }],
          use: [{ required: true, message: '用途', trigger: 'change' }],
          huabo: [{ required: true, message: '划拨类型', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '30%',
            title: '归集资金划拨录入',
            showSeparate: true,
            group: [
              {
                'disabled': false,
                'label': '付款账户',
                'type': 'select',
                'options': [],
                trans: { value: 'payerAcNoShow' },
                'key': 'payerAcc',
                'changeEventName': 'selectAcc'
              },
              {
                'disabled': false,
                'label': '付款户名',
                'type': 'text',
                'key': 'payerAccName'
              },
              {
                'disabled': false,
                'label': '划拨类型',
                'type': 'select',
                'options': [
                  { 'value': '资金上划', 'key': '0' },
                  { 'value': '资金下拨', 'key': '1' }
                ],
                'slotName': 'inquiry',
                'key': 'huabo',
                'changeEventName': 'selectHuabo'
              },
              {
                label: ' '
              },
              {
                'disabled': false,
                'label': '收款账户',
                'type': 'select',
                'options': [],
                trans: { value: 'acNo' },
                'changeEventName': 'selectQuery',
                'key': 'payeeAcc'
              },
              {
                'disabled': false,
                'label': '收款户名',
                'type': 'text',
                'key': 'payeeAccName'
              },
              {
                'disabled': false,
                'label': '金额',
                'type': 'input',
                // maxlength: 13,
                inputType: 'money',
                keydownEventName: 'limitMoneyInputKeyDown',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                'key': 'amount',
                'inputEventName': 'changeUp'
              },
              {
                'disabled': false,
                'label': '金额大写',
                'type': 'text',
                'key': 'bigMoney'
              },
              {
                'disabled': false,
                'label': '用途',
                'type': 'input',
                'key': 'use'
              },
              {
                'disabled': false,
                'label': '附言',
                maxlength: 70,
                'type': 'input',
                'key': 'postscript'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn fs14', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  methods: {
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.amount = util.limitInputMoney(res.amount)
      res.bigMoney = util.getMoneyHanzi(res.amount)
    },
    // 确定
    submit (data) {
      const params = {
        payerAcNo: this.payerAccNoList[data.payerAcc].acNo,
        payerCurrencyCode: this.payerAccNoList[data.payerAcc].currency,
        payerAcName: data.payerAccName,
        payeeAcNo: this.queryList[data.payeeAcc].acNo,
        payeeCurrencyCode: this.queryList[data.payeeAcc].currencyCode,
        payeeAcName: data.payeeAccName,
        amount: data.amount,
        transType: data.huabo,
        purpose: data.use,
        postscript: data.postscript,
        capAmount: data.capAmount
      }
      httpPost('eweb-cash.CollectCashPoolingConfirm.do', params).then(res => {
        this.$router.push({
          name: 'pooledFundsTransferConf',
          params: {
            ...data,
            payerAcNo: this.payerAccNoList[data.payerAcc].acNo,
            payeeAcNo: this.queryList[data.payeeAcc].acNo,
            payerCurrencyCode: this.payerAccNoList[data.payerAcc].currency,
            payeeCurrencyCode: this.queryList[data.payeeAcc].currencyCode,
            _Data2Sign: res._Data2Sign,
            _authenticateType: res._authenticateType,
            _dataMapKey: res._dataMapKey
          }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    reset (res) {
      // this.selectAcc(this.formModel)
      res.amountcopy = ''
      res.payerAccName = this.payerAccNoList[res.payerAcc].acName
      this.formModel = res
      this.formModel.huabo = ''
      this.formConfigJson.formItems[0].group[4].options = []
    },
    // 划拨类型，查询按钮
    inquiry (data) {
      // const accNo = (data.payerAcc || '').split('-')[0]
      // const currentPayerAccNo = this.payerAccNoList.find(item => item.acNo === accNo)
      const params = {
        payerAcNo: this.payerAccNoList[this.formModel.payerAcc].acNo,
        payerCurrencyCode: this.payerAccNoList[this.formModel.payerAcc].currency,
        transType: this.formModel.huabo
      }
      httpPost('eweb-cash.CollectAcNoQry.do', params).then(res => {
        this.queryList = res.list
        this.formConfigJson.formItems[0].group[4].options = this.queryList
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 交易账户获取
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'CollectCashPooling' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.selectAcc(this.formModel)
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 显示选择账户的余额与账户名称
     */
    selectAcc (data) {
      const currentPayerAccNo = this.payerAccNoList[data.payerAcc]
      data.payerAccName = currentPayerAccNo.acName
    },
    // 收款账户
    selectQuery (data) {
      const payeeAccount = this.queryList[data.payeeAcc]
      this.formModel.payeeAccName = payeeAccount.acName
    },
    // 划拨类型
    selectHuabo (data) {
      this.formModel = data
      if (this.formModel.huabo === '') {
        this.rules.huabo = true
      }
      this.formModel.payeeAcc = ''
      this.formModel.payeeAccName = ''
    }
  },
  created () {
    this.accNoListQry()
  }
}
</script>

<style lang="scss" scoped>
.checkBalances{
  width: 30%;
  height: 35px;
  display: flex;
  display: inline-block\9;
  justify-content: space-between;
  align-items: center;
  margin-left: 2.5%;

  .m-submit-btn{
      margin: 0!important;
      padding: 0 10px!important;
      height: 32px;
  }
}
</style>
