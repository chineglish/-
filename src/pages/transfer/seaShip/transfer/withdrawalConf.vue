<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @submit="submit"
              @back="back">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 * @name 出金交易确认
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currencyMath_type, currency_type } from '@/assets/js/entity'

export default {
  name: 'withdrawalConf',
  data () {
    return {
      titleData: ['转账汇款', '上海航运', '出金交易确认'],
      formModel: {
        transName: '',
        currency: '',
        amount: ''
      },
      formConfigJson: {
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
                'disabled': true,
                'label': '出金金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    submit (data) {
      let _params = data
      /**
       * 发送接口数据
       */
      httpPost('/eweb-common.GenToken.do').then(token => {
        const singMsg = this.isSign({ _Data2Sign: data._Data2Sign, _authenticateType: data._authenticateType })
        httpPost('/eweb-transfer.SHShipPayments.do', {
          _dataMapKey: data._dataMapKey,
          _authenticateTypeChoose: data._authenticateType ? data._authenticateType[0] : '',
          CSIISignature: singMsg,
          _tokenName: token._tokenName,
          acNo: data.acNo,
          dealerName: data.Khmc,
          dealerNum: data.Khbh,
          currency: data.Khbz,
          amount: data.amount,
          voucherNo: data.Yhbh
        }).then(res => {
          _params.JnlStatus = res._processState
          _params._jnlNo = res._jnlNo
          _params.transDate = res._transTime
          this.$router.push({
            name: 'withdrawalRes',
            params: {
              msg: _params,
              ...res
            }
          })
        })
      })
    },
    back (data) {
      this.$router.push({
        name: 'withdrawalPre',
        params: this.formModel
      })
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
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
