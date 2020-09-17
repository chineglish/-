<template>
  <d2-container>
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel">
    </m-new-form>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
// import { currency_type, acc_type, limit_type, handleChannel, payerRate, chaohui_flag, acc_status } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'comfirmAccountfer',
  data () {
    return {
      // data: [],
      // stepsActive: 1,
      formConfigJson: {
        formItems: [
          {
            title: '',
            formWidth: '100%',
            group: [
              {
                'disable': 'false',
                'type': 'text',
                'label': '证实书（存单）编号',
                'key': 'serial'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '账户名称',
                'key': 'payerAcName'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '账户类型',
                'key': 'payerAcType'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '账号',
                'key': 'payerAcNo'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '子账户序号',
                'key': 'payerSubAcNo'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '币种',
                'key': 'currency',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '开户金额',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '年利率（%）',
                'key': 'struRates'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '开通渠道',
                'key': 'openChannel',
                formatter: (key, value) => util.handleEnums(handleChannel, value)
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '付息方式',
                'key': 'fxType',
                formatter: (key, value) => util.handleEnums(payerRate, value)
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '开户日期',
                'key': 'openDate'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '到期日期',
                'key': 'endDate'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '转出账户',
                'key': 'payerAcNo'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '收本收息账户',
                'key': 'payeeAcNo'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '钞汇标志',
                'key': 'cashFlag',
                formatter: (key, value) => util.handleEnums(chaohui_flag, value)
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '账户状态',
                'key': 'actStatus',
                formatter: (key, value) => util.handleEnums(acc_status, value)
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '限制类型',
                'key': 'nono',
                formatter: (key, value) => '正常'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
  },
  created () {
    // this.getAccountMesg(this.$route.params)
    //
    // this.formModel.payeeAccNo = this.$route.params.payeeAccNo
  }
}
</script>
