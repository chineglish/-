<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @submit="submit"
        @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
        @changeUp="changeUp"
        @back="back"
        @reset="reset">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 * @name 入金交易录入
 * @date 2019-12-18
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currencyMath_type, currency_type } from '@/assets/js/entity'

export default {
  name: 'depositPre',
  data () {
    return {
      titleData: ['转账汇款', '上海航运', '入金交易录入'],
      formModel: {
        acNo: '',
        Balance: '',
        Khmc: '',
        marketOrgName: '',
        Yhbh: '',
        amount: ''
      },
      formConfigJson: {
        rules: {
          amount: [{ required: true, message: '入金金额', trigger: 'change' },
            { validator: (rule, value, callback) => {
              const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
              if (reg.test(value) === true) {
                if (parseFloat(value) <= 0) {
                  callback(new Error('金额不能小于0'))
                } else { callback() }
              } else {
                callback(new Error('金额输入错误'))
              }
            },
            trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '交易商银行账号',
                'type': 'text',
                'key': 'acNo'
              },
              {
                'disabled': true,
                'label': '账户余额',
                'type': 'text',
                textType: 'shy',
                'key': 'Balance',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '交易商户名',
                'type': 'text',
                'key': 'Khmc'
              },
              {
                'disabled': true,
                'label': '交易市场名称',
                'type': 'text',
                'key': 'marketOrgName'
              },
              {
                'disabled': true,
                'label': '交易商交易资金账号',
                'type': 'text',
                'key': 'Yhbh'
              },
              {
                'disabled': true,
                'label': '币种',
                'type': 'text',
                formatter: (key, value) => {
                  let currency = currencyMath_type.concat(currency_type)
                  return util.handleEnums(currency, value)
                },
                'key': 'Khbz'
              },
              {
                'disabled': false,
                'label': '入金金额',
                'type': 'input',
                'key': 'amount',
                inputType: 'money',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                inputEventName: 'changeUp',
                'content': '(元)'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    back (data) {
      this.$router.push({
        name: 'shipTrans',
        params: data
      })
    },
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    /**
     * 将金额数据转换成大写
     */
    changeUp (res) {
      res.amount = util.limitInputMoney(res.amount)
    },
    submit (params) {
      let _params = params
      httpPost('/eweb-transfer.SHShipIncomeConfirm.do', {
        acNo: params.acNo,
        dealerName: params.Khmc,
        dealerNum: params.Khbh,
        currency: params.Khbz,
        amount: params.amount,
        voucherNo: params.Yhbh
      }).then(res => {
        _params._Data2Sign = res._Data2Sign
        _params._dataMapKey = res._dataMapKey
        _params._authenticateTypeChoose = res._authenticateType ? res._authenticateType[0] : ''
        this.$router.push({
          name: 'depositConf',
          params: _params
        })
      })
    },
    reset (res) {
      res.amountcopy = ''
    }
  },
  created () {
    if (this.$route.params) {
      this.formModel.acNo = this.$route.params.acNo
      this.formModel.Balance = this.$route.params.Balance
      this.formModel.marketOrgName = this.$route.params.marketOrgName
      this.formModel.Khbz = this.$route.params.Khbz
      this.formModel.Yhbh = this.$route.params.Yhbh
      this.formModel.Khmc = this.$route.params.Khmc
      this.formModel.Khbh = this.$route.params.Khbh
      if (this.$route.params.amount) {
        this.formModel.amount = this.$route.params.amount
      }
    }
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
