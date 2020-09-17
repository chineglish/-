<template>
    <d2-container>
        <m-breadcrumb :data="data"></m-breadcrumb>
        <div class="form-box">
          <m-new-form
            :componentJson="formConfigJson"
            :btnData="btnData"
            :formModel="formModel"
            @submit="onSubmit"
            @back="onBack"
          ></m-new-form>
        </div>
    </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'confirmRegularDraw',
  data () {
    return {
      // accountBalance: '0',
      formModel: {
        lDAcNo: '',
        actBal: '',
        currency: '',
        openDate: '',
        interestType: '',
        depositTerm: '',
        transferType: '',
        drawType: '',
        amount: ''
      },
      data: ['理财服务', '定活互转', '定期支取'],
      // 以下为动态数据
      formConfigJson: {
        stepsActive: 1,
        // labelWidth: '100%',
        rules: {},
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '定期账号',
                'type': 'text',
                // 'changeEventName': 'changePayerAccNo',
                'key': 'lDAcNo'
              },
              {
                'disabled': true,
                'label': '开户日期',
                'type': 'text',
                'key': 'openDate'
              },
              {
                'disabled': true,
                'label': '存期',
                'type': 'text',
                'key': 'depositTerm'
              },
              {
                'disabled': true,
                'label': '币种',
                'type': 'text',
                'key': 'currency'
              },
              {
                'disabled': true,
                'label': '账户余额',
                'type': 'text',
                textType: 'shy',
                'key': 'actBal',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '付息方式',
                'type': 'text',
                'key': 'interestType'
              },
              {
                'disabled': true,
                'label': '到期是否自动转存',
                'type': 'text',
                'key': 'transferType'
              },
              {
                'disabled': true,
                'label': '支取方式',
                'type': 'text',
                'options': [{ 'value': '全部支取' }, { 'value': '部分支取' }],
                'key': 'drawType'
              },
              {
                'disabled': true,
                'label': '支取金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    onSubmit (data) {
      const _params = data
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: data._Data2Sign, _authenticateType: data._authenticateType })
        httpPost('/eweb-invest.PeriodicWithdrawal.do', {
          _dataMapKey: data._dataMapKey,
          _authenticateTypeChoose: data._authenticateType ? data._authenticateType[0] : '',
          CSIISignature: singMsg,
          acNo: data.lDAcNo,
          subAcNo: data.zhhaoxuh,
          currency: data.currencyCode,
          balance: data.actBal,
          openDate: data.kaihriqi,
          saveDate: data.cunqiiii,
          extendFlg: data.zhcunfsh,
          drawType: data.drawType,
          amount: data.amount,
          _tokenName: token._tokenName
        }).then(res => {
          Object.assign(_params, res)
          this.$router.push({
            name: 'resultRegularDraw',
            params: {
              data: _params,
              res: res
            }
          })
        })
      })
    },
    onBack (data) {
      this.$router.push({
        name: 'innerRegularDraw',
        params: data
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

<style  scoped>
    .form-box{
        width :1120px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    }
</style>
