<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
      >
    </m-new-form>
  </div>
</template>
<script>
import util from '@/libs/util'
import { currencyMath_type } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'depositConffer',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '上海航运-入金',
            group: [
              {
                'disabled': true,
                'label': '交易商银行账号',
                'type': 'text',
                'key': 'acNo'
              },
              // {
              //   'disabled': true,
              //   'label': '账户余额',
              //   'type': 'text',
              //   'key': 'Balance',
              //   formatter: (key, value) => util.formatCurrency(value)
              // },
              {
                'disabled': true,
                'label': '交易商户名',
                'type': 'text',
                'key': 'subAcNo'
              },
              {
                'disabled': true,
                'label': '交易市场名称',
                'type': 'text',
                'key': 'dealerName'
              },
              {
                'disabled': true,
                'label': '交易商交易资金账号',
                'type': 'text',
                'key': 'dealerNum'
              },
              {
                'disabled': true,
                'label': '币种',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(currencyMath_type, value),
                'key': 'currencyCode'
              },
              {
                'disabled': true,
                'label': '入金金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
