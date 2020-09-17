<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel">
    </m-new-form>
  </div>
</template>
<script>
/**
 *@name: 信用卡还款确认页
 * @author: 陈天浩
 * @date: 2020
 */
// import { httpPost } from '@/api/sys/http'
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
  name: 'singleTransfer',
  data () {
    return {
      formConfigJson: {
        formWidth: '100%',
        formItems: [
          {
            title: '信用卡还款',
            group: [
              {
                'disabled': true,
                'label': '还款账户',
                'type': 'text',
                'key': 'payeeAcName'
              },
              {
                'disabled': true,
                'label': '还款金额(元)',
                'type': 'text',
                'key': 'amount',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '信用卡号',
                'key': 'payerAcNo'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '还款账号',
                'key': 'payeeAcNo'
              },
              // {
              //   'disabled': true,
              //   'type': 'text',
              //   'label': '本期账单未还金额',
              //   'key': ''
              // },
              {
                'disabled': true,
                'type': 'text',
                'label': '持卡人姓名',
                'key': 'payerAcName'
              }
              // {
              //   'disabled': true,
              //   'type': 'text',
              //   'label': '账户欠款总额',
              //   'key': ''
              // },
              // {
              //   'disabled': true,
              //   'type': 'text',
              //   'label': '本期账单金额',
              //   'key': ''
              // }
            ]
          }
        ]
      }
    }
  },
  methods: {
  }
  // created () {
  // }
}
</script>
<style scoped>
</style>
