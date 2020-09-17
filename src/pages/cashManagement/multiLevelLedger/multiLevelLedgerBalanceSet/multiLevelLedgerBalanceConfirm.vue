<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @printHandler="printHandler"
      @backHandler="backHandler">
    </m-new-form>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { currency_type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'multiLevelBalanceConfirm',
  data: function () {
    return {
      data: ['现金管理', '多级账簿', '多级账簿余额调整确认'],
      bookIntoQryList: [],
      acList: [],
      actList: [],
      formModel: {
      },
      formConfigJson: {
        stepsActive: 1,
        rules: {
          outLedgerNum: [{ required: true, message: '调出账簿号', trigger: 'change' }],
          incomeLedgerNum: [{ required: true, message: '调入账簿号', trigger: 'change' }],
          setAmount: [{ required: true, message: '调整金额', trigger: 'change' }],
          user: [{ required: true, message: '用途', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '30%',
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'text',
                'key': 'acNo'
              },
              {
                'disabled': true,
                'label': '币种',
                'type': 'text',
                'key': 'currencyCode'
              },
              // {
              //   'disabled': false,
              //   'label': '户名',
              //   'type': 'text',
              //   'key': 'acName'
              // },
              {
                'disabled': false,
                'label': '调出账簿号',
                'type': 'text',
                'key': 'outAsAcNo'
              },
              {
                'disabled': false,
                'label': '调出账簿名',
                'type': 'text',
                'key': 'outAsAcName'
              },
              {
                'disabled': false,
                'label': '调入账簿号',
                'type': 'text',
                'key': 'inAsAcNo'
              },
              {
                'disabled': false,
                'label': '调入账簿名',
                'type': 'text',
                'key': 'inAsAcName'
              },
              {
                'disabled': false,
                'label': '调整金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '金额大写',
                'type': 'text',
                'key': 'bigNum'
              },
              {
                'disabled': false,
                'label': '用途',
                'type': 'text',
                'key': 'purpose'
              },
              {
                'disabled': false,
                'label': '附言',
                'type': 'text',
                'key': 'postScript'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'printHandler' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'backHandler' }
      ]
    }
  },
  methods: {
    // 提交确认
    printHandler (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        this.formModel._tokenName = token._tokenName
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        this.formModel.currencyCode = this.$route.params.currencyCode
        let params = { ...this.formModel,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg,
          _dataMapKey: this.$route.params._dataMapKey
        }
        httpPost('/eweb-cash.MultistageBookBalUpdate.do', params).then(res => {
          this.$router.push({
            name: 'multiLevelLedgerBalanceSetRes',
            params: { ...this.formModel, res }
          })
        })
      }).catch(e => {
        console.error(e)
      })
    },
    // 返回
    backHandler () {
      this.$router.push({
        name: 'multiLevelLedgerBalanceSet'
      })
    }
  },
  created () {
    this.formModel.acNo = this.$route.params.acNo
    this.formModel.acName = this.$route.params.acName
    this.formModel.inAsAcNo = this.$route.params.inAsAcNo
    this.formModel.inAsAcName = this.$route.params.inAsAcName
    this.formModel.outAsAcNo = this.$route.params.outAsAcNo
    this.formModel.outAsAcName = this.$route.params.outAsAcName
    this.formModel.amount = this.$route.params.amount
    this.formModel.bigNum = this.$route.params.bigNum
    this.formModel.purpose = this.$route.params.purpose
    this.formModel.postScript = this.$route.params.postScript
    this.formModel.currencyCode = util.handleEnums(currency_type, this.$route.params.currencyCode)
  },
  components: {}
}
</script>
