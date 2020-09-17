<template>
  <d2-container class="enterprise-bank-check-bill-conf">
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>

    <d2-container>
		<m-new-form
				:componentJson="formConfigJson"
				:formModel="formModel"
				:btnData="actionData"
				@submit="submitHandler"
				@back="backHandler"
		></m-new-form>
    </d2-container>
  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util.js'

export default {
  name: 'enterprise-bank-check-bill-conf',
  data () {
    return {
      breadcrumb: ['账户管理', '银企对账'],
      formModel: {},
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                label: '账号',
                type: 'text',
                key: 'acNo'
              },
              {
                label: '对账单编号',
                type: 'text',
                key: 'voucherNo'
              },
              {
                label: '账单日期',
                type: 'text',
                key: 'docDate',
                formatter: (row, value) => util.separationDate(value)
              },
              {
                label: '当期余额',
                type: 'text',
                textType: 'shy',
                key: 'credit',
                formatter: (row, value) => util.formatCurrency(value)
              },
              {
                label: '对账结果',
                type: 'text',
                key: 'ebillResult'
              }
            ]
          }
        ]
      },
      actionData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    submitHandler () {
      httpPost('eweb-common.GenToken.do').then(res => {
        const params = {
          ebillResult: '1',
          acNo: this.$route.params.data.acNo,
          voucherNo: this.$route.params.data.voucherNo,
          docDate: this.$route.params.data.docDate,
          credit: this.$route.params.data.credit,
          _dataMapKey: this.$route.params.res._dataMapKey,
          _tokenName: res._tokenName
        }
        httpPost('eweb-query.BankCheckOutcome.do', params).then(res => {
          console.log('银企对账', res)
          this.$router.push({
            name: 'enterpriseBankCheckBillRes',
            params: ({
              _JnlStatus: res._processState,
              _jnlNo: res._jnlNo,
              _transTime: res._transTime
            })
          })
        })
      })
    },
    backHandler () {
      // this.$router.back()
      this.$router.push({
        name: 'enterpriseBankCheckBillPre',
        params: {
          acNo: this.$route.params.acNo
        }
      })
    }
  },
  created () {
    this.formModel = this.$route.params.data
    this.formModel.ebillResult = this.formModel.ebillResult === '1' ? '核对相符' : '核对不符'
  }
}
</script>

<style lang="scss" scoped>
// .enterprise-bank-check-bill-conf {}
</style>
