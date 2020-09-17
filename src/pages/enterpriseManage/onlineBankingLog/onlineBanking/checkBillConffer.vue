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
import { reconciliation_type } from '@/assets/js/entity'
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
  name: 'checkBillConffer',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            title: '银企对账',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '账号',
                'type': 'text',
                'key': 'acNo'
              },
              {
                'disabled': true,
                'label': '对账单编号',
                'type': 'text',
                'key': 'voucherNo'
              },
              {
                'disabled': true,
                'label': '账单日期',
                'type': 'text',
                'key': 'docDate',
                formatter: (row, value) => util.separationDate(value)
              },
              {
                'disabled': true,
                'label': '当期余额',
                'type': 'text',
                'key': 'credit',
                formatter: (row, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '对账结果',
                'type': 'text',
                'key': 'ebillResult',
                formatter: (key, value) => util.handleEnums(reconciliation_type, value)
              }
            ]
          }
        ]
      }
    }
  },
  created () {}
}
</script>
