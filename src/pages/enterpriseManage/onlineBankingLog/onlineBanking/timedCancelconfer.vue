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
import { trans_type, remit_model, pdeal_msg } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'timedCancelconfer',
  data () {
    return {
      // breadData: ['财务管理', '定时交易撤销']
      formConfigJson: {
        formWidth: '100%',
        formItems: [
          {
            title: '定时交易撤销',
            group: [
              {
                'disabled': true,
                'label': '付款账户名称',
                'type': 'text',
                'key': 'payerAcName'
              },
              {
                'disabled': true,
                'label': '收款账户名称',
                'type': 'text',
                'key': 'payeeAcName'
              },
              {
                'disabled': true,
                'label': '付款账号',
                'type': 'text',
                'key': 'payerAcNo'
              },
              {
                'disabled': true,
                'label': '收款账号',
                'type': 'text',
                'key': 'payeeAcNo'
              },
              {
                'disabled': true,
                'label': '付款行',
                'type': 'text',
                'key': 'payerBankName'
              },
              {
                'disabled': true,
                'label': '收款行',
                'type': 'text',
                'key': 'payerBankName'
              },
              {
                'disabled': true,
                'label': '交易金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '处理方式',
                'type': 'text',
                'key': 'remitModel',
                formatter: (key, value) => util.handleEnums(remit_model, value)
              },
              {
                'disabled': true,
                'label': '手续费',
                'type': 'text',
                'key': 'initfeeTotalamt',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '附言',
                'type': 'text',
                'key': 'postScript'
              },
              {
                'disabled': true,
                'label': '预约时间',
                'type': 'text',
                'key': 'bankDate'
              },
              {
                'disabled': true,
                'label': '交易状态',
                'type': 'text',
                'key': 'tradeBusistep',
                formatter: (key, value) => util.handleEnums(trans_type, value)
              },
              {
                'disabled': true,
                'label': '交易结果',
                'type': 'text',
                'key': 'pdealMsg',
                formatter: (key, value) => util.handleEnums(pdeal_msg, value)
              },
              {
                'disabled': true,
                'label': '账簿号',
                'type': 'text',
                'key': 'asAcNo',
                show: this.formModel.msg ? this.formModel.asFlag === '1' : false
              },
              {
                'disabled': true,
                'label': '账簿名',
                'type': 'text',
                'key': 'asAcName',
                show: this.formModel.msg ? this.formModel.asFlag === '1' : false
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
