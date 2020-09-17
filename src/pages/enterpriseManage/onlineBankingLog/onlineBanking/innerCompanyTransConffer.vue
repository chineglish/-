<template>
  <div class="form-box">
    <m-new-form :componentJson="formConfigJson"
      :formModel="formModel"
      >
    </m-new-form>
  </div>
</template>
<script>
/**
 *@name: 公司内部转账确认页
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
  name: 'innerCompanyTransConffer',
  data () {
    return {
      // data: ['转账汇款', '公司内部转账']
      formConfigJson: {
        formWidth: '100%',
        formItems: [{
          title: '公司内部转账',
          group: [
            {
              'disabled': true,
              'label': '付款账号',
              'type': 'text',
              'key': 'payerAcNo'
            },
            // {
            //   'disabled': false,
            //   'label': '可用余额',
            //   'type': 'text',
            //   'key': 'balance',
            //   formatter: (key, value) => util.formatCurrency(value)
            // },
            {
              'disabled': true,
              'label': '付款账户名称',
              'type': 'text',
              'key': 'payerAcName'
            },
            {
              'disabled': false,
              'label': '付款账户开户行',
              'type': 'text',
              'key': 'payerBankName'
            },
            {
              'disabled': true,
              'label': '收款账号',
              'type': 'text',
              'key': 'payeeAcNo'
            }, {
              'disabled': true,
              'label': '收款账户名称',
              'type': 'text',
              'key': 'payeeAcName'
            }, {
              'disabled': true,
              'label': '收款账户开户行',
              'type': 'text',
              'key': 'payeeBankDeptName'
            },
            {
              'showCapital': true,
              'disabled': true,
              'label': '转账金额',
              'type': 'text',
              'key': 'amount',
              formatter: (name, value) => util.formatCurrency(value)
            },
            {
              'disabled': true,
              'label': '附言',
              'type': 'text',
              'key': 'remark'
            }
          ]
        }]
      }
    }
  },
  methods: {
  },
  created () {
    // this.formModel = this.$route.params
  }
}
</script>
<style scoped>
</style>
