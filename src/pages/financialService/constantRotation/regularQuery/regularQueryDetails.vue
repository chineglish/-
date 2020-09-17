<template>
  <d2-container>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @back="onBack">
      </m-new-form>
    </div>
  </d2-container>
</template>
<script>
import { acc_type, currency_type, handleChannel, payerRate, deposit_flag, chaohui_flag, acc_status, limit_type, usualDate } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'regularQueryDetails',
  data () {
    return {
      formModel: {
        serial: '',
        acName: '',
        acType: '',
        lDAcNo: '',
        subAcNo: '',
        currencyCode: '',
        actBal: '',
        openAmount: '',
        depositTerm: '',
        struRates: '',
        openChannel: '',
        struRatesType: '',
        transferType: '',
        openDate: '',
        matureDate: '',
        cashFlag: '',
        actStatus: '',
        limitType: ''
      },
      breadData: ['理财服务', '定活互转', '定期账户查询详情'],
      routeParams: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      formConfigJson: {
        rules: {},
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '证实书（存单）编号',
                'key': 'serial'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '账户名称',
                'key': 'acName'
              }
            ]
          },
          {
            formWidth: '50%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '账号',
                'key': 'lDAcNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '子账户序号',
                'key': 'subAcNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '币种',
                'key': 'currencyCode',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '账户类型',
                'key': 'acType',
                formatter: (key, value) => util.handleEnums(acc_type, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '开户金额',
                'key': 'openAmount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '账户余额',
                textType: 'shy',
                'key': 'actBal',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '存期',
                'key': 'depositTerm',
                formatter: (key, value) => util.handleEnums(usualDate, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '年利率（%）',
                'key': 'zhxililv',
                formatter: (key, value) => util.formatInterestRate(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '开通渠道',
                'key': 'openChannel',
                formatter: (key, value) => util.handleEnums(handleChannel, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '付息方式',
                'key': 'lxzffans',
                formatter: (key, value) => util.handleEnums(payerRate, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '自动转存标志',
                'key': 'zhcunfsh',
                formatter: (key, value) => util.handleEnums(deposit_flag, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '开户日期',
                'key': 'qixiriqi',
                formatter: (key, value) => util.separationDate(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '到期日期',
                'key': 'doqiriqi',
                formatter: (key, value) => util.separationDate(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '钞汇标志',
                'key': 'cashFlag',
                formatter: (key, value) => util.handleEnums(chaohui_flag, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '账户状态',
                'key': 'actStatus',
                formatter: (key, value) => util.handleEnums(acc_status, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '限制类型',
                'key': 'xzhileix',
                formatter: (key, value) => util.handleEnums(limit_type, value)
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {},
    onBack (data) {
      this.$router.push({
        name: 'regularQuery',
        params: this.$route.params
      })
    }
  },
  created () {
    const params = this.$route.params
    if (params) {
      this.formModel = { ...this.formModel, ...params }
    }
  }
}
</script>
