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
/**
 *@name: 定时交易撤销
 */
import util from '@/libs/util'
import { timer_state, process_state } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'timedCancelfer',
  data () {
    return {
      // titleData: ['转账汇款', '定时交易查询', '撤销'],
      formConfigJson: {
        formWidth: '100%',
        formItems: [
          {
            title: '预约转账撤销',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '付款账户名称',
                'key': 'payerAcName'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '收款账户名称',
                'key': 'payeeAcName'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '付款账号',
                'key': 'payerAcNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '收款账号',
                'key': 'payeeAcNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '付款行',
                'key': 'payerBankName'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '收款行',
                'key': 'payeeBankDeptName'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '交易金额',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '处理方式',
                'key': 'process',
                formatter: () => '预约转账'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '手续费',
                'key': 'feeAmount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '附言',
                'key': 'remark'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '执行时间',
                'key': 'transDate'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '交易状态',
                'key': 'timerState',
                formatter: (key, value) => util.handleEnums(timer_state, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '交易结果',
                'key': 'processState',
                formatter: (value) => util.handleEnums(process_state, this.formModel.processState ? this.formModel.processState : '')
              },
              {
                'disabled': true,
                'label': '账簿号',
                'type': 'text',
                'key': 'asAcNo',
                show: this.formModel ? this.formModel.asFlag === '1' : false
              },
              {
                'disabled': true,
                'label': '账簿名',
                'type': 'text',
                'key': 'asAcName',
                show: this.formModel ? this.formModel.asFlag === '1' : false
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
    // if (this.$route.params.msg.data) {
    //   Object.assign(this.formModel, this.$route.params.msg.data) // 接收选择的查询数据
    // }
    // this.formModel.tradebusistep = util.handleEnums(trans_type, this.formModel.tradebusistep)
    // this.formModel.bankdate = util.separationDate(this.formModel.bankdate)
  }
}
</script>
