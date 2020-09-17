<template>
    <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-new-form
          v-if="formShow"
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
          @changeUp="changeUp"
          @submit="onSubmit"
        >
        </m-new-form>
    </d2-container>
</template>
<script>/**
 * @name 挡板账户资金回退录入
 * @date 2019-12-24
 * @auther 邓焕
 */

import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: 'baffleAccountPre',
  data () {
    return {
      formShow: false,
      formModel: {},
      breadData: ['财务管理', '代发工资', '挡板账户资金回退'],
      // 以下为动态数据
      formConfigJson: {
        stepsActive: 0,
        rules: {
          amount: [
            { required: true, message: '请输入退回金额', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              if (parseFloat(value) > this.formModel.balance) {
                callback(new Error('退回金额大于挡板账户余额'))
              } else if (parseFloat(value) <= 0) {
                callback(new Error('退回金额必须大于0'))
              } else {
                callback()
              }
            },
            trigger: 'submit' }
          ]
        },
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
                'type': 'input',
                inputType: 'money',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                'inputEventName': 'changeUp',
                'key': 'amount'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
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
    },
    onSubmit (res) {
      let _params = {
        payerAcNo: res.baffleAcNo, // 付款人账号
        payeeAcNo: res.baseAcNo, // 收款人账号
        payerAcName: res.baffleAcName, // 付款人姓名
        payeeAcName: res.baseAcName, // 收款人姓名
        amount: res.amount, // 交易金额
        payeeBankCode: res.baseBankNo, // 收款行行号
        baffleAcctBalance: res.balance, // 挡板账户余额
        contractNo: res.contractNo
      }
      httpPost('/eweb-transfer.BaffleAcctMoneyBackConfirm.do', _params).then(result => {
        let indexFormModel = this.$route.params.indexFormModel
        this.$router.push({
          name: 'baffleAccountConf',
          params: {
            formModel: {
              ...res,
              ...result
            },
            indexFormModel: indexFormModel
          }
        })
      }).catch(() => {})
    },
    getCompanyDeductAcNo () {
      httpPost('/eweb-transfer.CompanyDeductAcNoQuery.do', {
        serviceNum: this.$route.params.contractNo
      }).then(res => {
        this.formModel = res
        this.formModel.contractNo = this.$route.params.contractNo
        this.formShow = true
      }).catch(() => {
        this.$router.push('/baffleAccount')
      })
    }
  },
  created () {
    if (this.$route.params.contractNo) {
      this.formModel.contractNo = this.$route.params.contractNo
      this.getCompanyDeductAcNo()
    } else if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
      this.formShow = true
    } else {
      this.$router.push('/baffleAccount')
    }
  }
}
</script>
