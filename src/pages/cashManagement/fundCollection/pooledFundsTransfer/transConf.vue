<template>
    <div class="assets-debt">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
								@submit="submit"
								@back="back"
        >
        </m-new-form>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { huabo_Type } from '@/assets/js/entity'
export default {
  name: 'pooledFundsTransferConf',
  data () {
    return {
      payerAccNoList: [], // 付款账户信息列表
      // 面包屑导航
      breadData: ['现金管理', '资金归集', '归集资金划拨'],
      formModel: {
        payerAcc: '',
        payerCur: '',
        payerAccName: '',
        payeeAcc: '',
        payeeCur: '',
        payeeAccName: '',
        amount: '',
        transType: '',
        use: '',
        postscript: ''
      },
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '30%',
            title: '归集资金划拨确认',
            group: [
              {
                'disabled': false,
                'label': '付款账户',
                'type': 'text',
                'key': 'payerAcc'
              },
              {
                'disabled': false,
                'label': '付款户名',
                'type': 'text',
                'key': 'payerAccName'
              },
              {
                'disabled': false,
                'label': '收款账户',
                'type': 'text',
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
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '交易类型',
                'type': 'text',
                'key': 'huabo',
                formatter: (key, value) => {
                  return util.handleEnums(huabo_Type, value)
                }
              },
              {
                'disabled': false,
                'label': '用途',
                'type': 'text',
                'key': 'use'
              },
              {
                'disabled': false,
                'label': '附言',
                'type': 'text',
                'key': 'postscript'
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
    submit (data) {
      let _params = data
      httpPost('/eweb-common.GenToken.do').then(token => {
        const singMsg = this.isSign({ _Data2Sign: _params._Data2Sign, _authenticateType: _params._authenticateType })
        httpPost('eweb-cash.CollectCashPooling.do', {
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          _dataMapKey: this.$route.params._dataMapKey,
          CSIISignature: singMsg,
          payerAcNo: _params.payerAcc,
          payerCurrencyCode: _params.payerCurrencyCode,
          payerAcName: _params.payerAccName,
          payeeAcNo: _params.payeeAcc,
          payeeCurrencyCode: _params.payeeCurrencyCode,
          payeeAcName: _params.payeeAccName,
          amount: data.amount,
          transType: data.huabo,
          purpose: _params.use,
          postscript: _params.postscript,
          _tokenName: token._tokenName
        }).then(res => {
          this.$router.push({
            name: 'pooledFundsTransferRes',
            params: {
              msg: _params,
              _JnlStatus: res._processState, // (_JnlStatus是跳转页面路由传值给_JnlStatus的值)
              _jnlNo: res._jnlNo, // 流水号
              _transTime: res._transTime // 交易日期
            }
          })
        }).catch(err => {
          console.error(err)
        })
      })
    },
    back (data) {
      this.$router.push({
        name: 'pooledFundsTransferPre',
        params: data
      })
    }
  },
  created () {
    this.formModel = this.$route.params
    this.formModel.payerAcc = this.$route.params.payerAcNo
    this.formModel.payeeAcc = this.$route.params.payeeAcNo
    // if (this.$route.params) {
    //   Object.assign(this.formModel, this.$route.params)
    // }

    // switch (this.formModel.payeeAcc) {
    //   case '0':
    //     this.formModel.payeeAcc = '12312312312'
    //     break
    // }
    // switch (this.formModel.transType) {
    //   case '0':
    //     this.formModel.transType = '上划'
    //     break
    //   case '1':
    //     this.formModel.transType = '下拨'
    //     break
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
