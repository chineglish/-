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
 *@name: 预约交易撤销
 * @date: 2019-12-13
 */
import util from '@/libs/util'
import { trans_type, remit_model } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'transCancelfer',
  data () {
    return {
      // titleData: ['转账汇款', '预约交易查询', '预约转账撤销'],
      formConfigJson: {
        formWidth: '100%',
        formItems: [
          {
            title: '定期通开户',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '付款账号',
                'key': 'payerAcNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '付款账户名称',
                'key': 'payerAcName'
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
                'label': '收款账户名称',
                'key': 'payeeAcName'
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
                'label': '处理方式',
                'key': 'scheduleType',
                formatter: (key, value) => util.handleEnums(remit_model, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '交易状态',
                'key': 'trsState',
                formatter: (key, value) => util.handleEnums(trans_type, value)
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
                'label': '交易结果',
                'key': 'respMessage'
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
    // let trsState = [
    //   { value: 'C', label: '成功' },
    //   { value: 'F', label: '失败' },
    //   { value: 'I', label: '初始化' },
    //   { value: 'R', label: '撤销' }
    // ]
    // let res = this.$route.params
    // this.activeName = res.activeName
    // if (this.$route.params) {
    //   Object.assign(this.formModel, this.$route.params.msg.data)
    //   this.formModel.trsState = util.handleEnums(trsState, this.formModel.trsState)
    //   this.formModel.capital = util.getMoneyHanzi(this.formModel.amount)
    //   this.formModel.transDate = util.separationDate(this.formModel.transDate)
    // }
  }
}
</script>
