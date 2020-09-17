<template>
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
    >
    </m-new-form>
</template>

<script type="text/javascript">
// import { httpPost } from '@/api/sys/http'
import { currency_type, trans_TType } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'adjustmentConfirmfer',
  data: function () {
    return {
      // data: ['现金管理', '多级账簿', '多级账簿明细调账确认']
      formConfigJson: {
        formItems: [{
          formWidth: '100%',
          title: '多级账簿明细调账',
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
              'label': '账号',
              'type': 'text',
              'key': 'acNo'
            },
            {
              'disabled': false,
              'label': '户名',
              'type': '账户名称',
              'key': 'acName'
            },
            {
              'disabled': false,
              'label': '币种',
              'type': 'text',
              'key': 'currencyCode',
              formatter: (key, value) => util.handleEnums(currency_type, value)
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
              'label': '手续费',
              'type': 'text',
              'key': 'feeAmt',
              formatter: (name, value) => util.formatCurrency(value)
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
              'key': 'trsType',
              formatter: (key, value) => util.handleEnums(trans_TType, value)
            }
          ]
        }]
      }
    }
  },
  mounted: function () {
  },
  methods: {
  },
  created () {
  },
  components: {}
}
</script>
