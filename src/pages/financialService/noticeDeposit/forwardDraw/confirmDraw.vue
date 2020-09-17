<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @submit="onSubmit"
        @back = "onBack">
      </m-new-form>
    </div>
  </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, notify_type } from '@/assets/js/entity'

export default {
  name: 'confirmDraw',
  data () {
    return {
      formModel: {
        lDAcNo: '',
        currencyCode: '',
        depositTerm: '',
        openDate: '',
        drawType: '',
        amount: ''
      },
      data: ['理财服务', '通知存款', '通知存款支取'],
      // 以下为动态数据
      formConfigJson: {
        formWidth: '50%',
        stepsActive: 1,
        // labelWidth: '100%',
        rules: {},
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '账号',
                'type': 'text',
                'key': 'lDAcNo'
              },
              {
                'disabled': true,
                'label': '币种/钞汇',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(currency_type, value),
                'key': 'currencyCode'
              },
              {
                'disabled': true,
                'label': '通知类型',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(notify_type, value),
                'key': 'depositTerm'
              },
              {
                'disabled': true,
                'label': '开户日期',
                'type': 'text',
                'key': 'openDate'
              },
              {
                'disabled': true,
                'label': '支取方式',
                'type': 'text',
                'options': [{ 'value': '全部支取', 'key': '0' }, { 'value': '部分支取', 'key': '1' }],
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
      // switch (data.drawType) {
      //   case '全部支取':
      //     data.drawType = '0'
      //     break
      //   case '部分支取':
      //     data.drawType = '1'
      //     break
      // }
      const _params = data
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: data._Data2Sign, _authenticateType: data._authenticateType })
        httpPost('/eweb-invest.DepositWithdraw.do', {
          _dataMapKey: data._dataMapKey,
          _authenticateTypeChoose: data._authenticateType ? data._authenticateType[0] : '',
          CSIISignature: singMsg,
          acNo: data.lDAcNo,
          subAcNo: data.zhhaoxuh,
          currency: data.currencyCode,
          balance: data.actBal,
          notifyType: data.cunqiiii,
          openDate: data.kaihriqi,
          amount: data.amount,
          drawType: data.drawType,
          _tokenName: token._tokenName
        }).then(res => {
          this.$router.push({
            name: 'resultDraw',
            params: {
              data: _params,
              res: res
            }
          })
        })
      })
    },
    onBack () {
      this.$router.push({
        name: 'innerDraw',
        params: {
          item: this.$route.params
        }
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
