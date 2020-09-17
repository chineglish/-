<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-new-form :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                :msgs="msgs"
                @printHandler="printHandler"
                @backHandler="backHandler">
    </m-new-form>
  </d2-container>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import { currency_type, trans_TType } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'adjustmentConfirm',
  data: function () {
    return {
      data: ['现金管理', '多级账簿', '多级账簿明细调账确认'],
      acList: [],
      bookIntoQryList: [],
      formModel: {
        // acNo: '', // 账户
        // currencyCode: '', // 币种
        // asAcNo: '', // 账簿号
        // acName: '', // 户名
        // asAcName: '', // 账簿名
        // bigNum: '', // 金额大写
        // serialNo: '', // 流水
        // trsAcDate: '', // 交易时间
        // amount: '', // 金额
        // reserved2: '', // 手续费
        // purpose: '', // 原因
        // trsType: '' // 交易类型
      },
      formConfigJson: {
        stepsActive: 1,
        rules: {
          limitAsAcNo: [{ required: true, message: '调入账簿号', trigger: 'change' }]
        },
        formItems: [{
          formWidth: '50%',
          // labelWidth: '30%',
          group: [
            {
              'disabled': false,
              'label': '流水号',
              'type': 'text',
              'key': 'serialNo'
            },
            {
              'disabled': false,
              'label': '交易日期',
              'type': 'text',
              'key': 'trsDate',
              formatter: (key, value) => util.separationDate(value)
            },
            {
              'disabled': false,
              'label': '账户',
              'type': 'text',
              'key': 'acNo'
            },
            {
              'disabled': false,
              'label': '户名',
              'type': 'text',
              'key': 'acName'
            },
            {
              'disabled': false,
              'label': '币种',
              'type': 'text',
              'key': 'currencyCode'
            },
            {
              'disabled': false,
              'label': '  ',
              'type': 'text'
            },
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
              'key': 'asAcName'
            },
            {
              'disabled': false,
              'label': '金额',
              'type': 'text',
              'key': 'amount'
            },
            {
              'disabled': false,
              'label': '金额大写',
              'type': 'text',
              'key': 'bigNum'
            },
            // {
            //   'disabled': false,
            //   'label': '手续费',
            //   'type': 'text',
            //   'key': 'feeAmt'
            // },
            {
              'disabled': false,
              'label': '  ',
              'type': 'text'
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
              'key': 'asInAcName'
            },
            {
              'disabled': false,
              'label': '调账原因',
              'type': 'text',
              'key': 'purpose'
            },
            {
              'disabled': false,
              'label': '交易类型',
              'type': 'text',
              'key': 'trsType'
            }
          ]
        }]
      },
      btnData: [{ btnText: '确定', class: 'm-submit-btn', clickEventName: 'printHandler' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'backHandler' }],
      msgs: []
    }
  },
  mounted: function () {
  },
  methods: {
    // 提交确认
    printHandler (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        data.currencyCode = this.$route.params.currencyCode
        data.trsType = this.$route.params.trsType
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        let params = { ...data,
          _tokenName: token._tokenName,
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg,
          ...this.formModel
        }
        httpPost('/eweb-cash.MultistageBookDetailAdjust.do', params).then(res => {
          this.$router.push({
            name: 'adjustmentRes',
            params: { ...params, ...res }
          })
        })
      }).catch(e => {
        console.error(e)
      })
    },
    // 返回
    backHandler () {
      this.$router.push({
        name: 'adjustmentForm',
        params: { ...this.$route.params, confirmFlag: 1 }
      })
    }
  },
  created () {
    this.formModel.acNo = this.$route.params.acNo
    this.formModel.currencyCode = util.handleEnums(currency_type, this.$route.params.currencyCode)
    this.formModel.acName = this.$route.params.acName
    this.formModel.asAcName = this.$route.params.asAcName
    this.formModel.outAsAcNo = this.$route.params.outAsAcNo
    this.formModel.inAsAcNo = this.$route.params.inAsAcNo
    this.formModel.asInAcName = this.$route.params.asInAcName
    this.formModel.serialNo = this.$route.params.serialNo
    this.formModel.purpose = this.$route.params.purpose
    this.formModel.trsDate = this.$route.params.trsDate
    this.formModel.feeAmt = this.$route.params.feeAmt
    this.formModel.trsType = util.handleEnums(trans_TType, this.$route.params.trsType)
    this.formModel.amount = this.$route.params.amount
    this.formModel.bigNum = this.$route.params.bigNum
  },
  components: {}
}
</script>
