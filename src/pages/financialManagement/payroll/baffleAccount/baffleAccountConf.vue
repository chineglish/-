<template>
    <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @submit="onSubmit"
              @back="goBack"
            >
            </m-new-form>
        </div>
    </d2-container>
</template>
<script>
/**
 * @name 挡板账户资金回退确认
 * @date 2019-12-24
 * @auther 邓焕
 */

import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: 'baffleAccountConf',
  data () {
    return {
      formModel: {
        baffleAccountAct: '',
        baffleAccountName: '',
        basicAct: '',
        basicName: '',
        baffleAccountBalance: '',
        refundAmt: ''
      },
      breadData: ['财务管理', '代发工资', '挡板账户资金回退'],
      // 以下为动态数据
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '挡板账户账号',
                'type': 'text',
                'key': 'baffleAcNo'
              },
              {
                'disabled': true,
                'label': '挡板账户户名',
                'type': 'text',
                'key': 'baffleAcName'
              },
              {
                'disabled': true,
                'label': '基本户账号',
                'type': 'text',
                'key': 'baseAcNo'
              },
              {
                'disabled': true,
                'label': '基本户户名',
                'type': 'text',
                'key': 'baseAcName'
              },
              {
                'disabled': true,
                'label': '挡板账户余额',
                'type': 'text',
                textType: 'shy',
                'key': 'balance',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '退回金额',
                'type': 'text',
                'key': 'amount',
                formatter: (name, value) => util.formatCurrency(value)
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
    onSubmit (res) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.formModel._Data2Sign, _authenticateType: this.formModel._authenticateType })
        let incomeData = {
          _dataMapKey: this.formModel._dataMapKey,
          _authenticateTypeChoose: this.formModel._authenticateType ? this.formModel._authenticateType[0] : '',
          CSIISignature: singMsg,
          _tokenName: token._tokenName,
          payerAcNo: res.baffleAcNo, // 付款人账号
          payeeAcNo: res.baseAcNo, // 收款人账号
          payerAcName: res.baffleAcName, // 付款人姓名
          payeeAcName: res.baseAcName, // 收款人姓名
          amount: res.amount, // 交易金额
          payeeBankCode: res.baseBankNo, // 收款行行号
          baffleAcctBalance: res.balance, // 挡板账户余额
          contractNo: res.contractNo
        }
        httpPost('/eweb-transfer.BaffleAcctMoneyBack.do', incomeData).then(result => {
          let _params = {
            _JnlStatus: result._processState,
            _jnlNo: result._jnlNo,
            transDate: result._transTime,
            ...res
          }
          let indexFormModel = this.$route.params.indexFormModel
          this.$router.push({
            name: 'baffleAccountRes',
            params: {
              _params: _params,
              indexFormModel: indexFormModel
            }
          })
        }).catch(res => {})
      })
    },
    goBack () {
      this.$router.push({
        name: 'baffleAccountPre',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
    } else {
      this.goBack()
    }
  }
}
</script>
