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
 *@name: 大额存单支取-确认
 * @author: 陈天浩
 * @date: 2020
 */
import util from '@/libs/util'
import { acc_type, handleChannel, acc_status, payerRate } from '@/assets/js/entity'

// import { httpPost } from '@/api/sys/http'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'withdrawConffer',
  data () {
    return {
      // titleData: ['理财服务', '大额存单', '单位大额存单支取'],
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '单位大额存单支取',
            group: [
              {
                'disabled': true,
                'label': '账户名称',
                'type': 'text',
                'key': 'payeeAcName'
              }, {
                'disabled': true,
                'label': '账户类型',
                'type': 'text',
                'key': 'payeeAcType',
                formatter: (value) => util.handleEnums(acc_type, this.formModel.payeeAcType ? this.formModel.payeeAcType : '')
              }, {
                'disabled': true,
                'label': '账号',
                'type': 'text',
                'key': 'IdAccountNo'
              }, {
                'disabled': true,
                'label': '子账户序号',
                'type': 'text',
                'key': 'ldSubAccNo'
              }, {
                'disabled': true,
                'label': '开户金额',
                'type': 'text',
                'key': 'openAmount',
                formatter: (name, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '账户余额',
                'type': 'text',
                'key': 'actBal',
                formatter: (name, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '产品期次编号',
                'type': 'text',
                'key': 'prdBatchCode'
              }, {
                'disabled': true,
                'label': '年利率（%）',
                'type': 'text',
                'key': 'actualRate',
                formatter: (key, value) => util.formatInterestRate(value)
              }, {
                'disabled': true,
                'label': '办理渠道',
                'type': 'text',
                'key': 'openChannel',
                formatter: (key, value) => util.handleEnums(handleChannel, value)
              }, {
                'disabled': true,
                'label': '付息方式',
                'type': 'text',
                'key': 'interestFrequency',
                formatter: (key, value) => util.handleEnums(payerRate, value)
              }, {
                'disabled': true,
                'label': '开户日期',
                'type': 'text',
                'key': 'openDate',
                formatter: (key, value) => util.separationDate(value)
              }, {
                'disabled': true,
                'label': '到期日期',
                'type': 'text',
                'key': 'matureDate',
                formatter: (key, value) => util.separationDate(value)
              }, {
                'disabled': true,
                'label': '收付款账户',
                'type': 'text',
                'key': 'payeeAcNo'
              }, {
                'disabled': true,
                'label': '账户状态',
                'type': 'text',
                'key': 'ldAcStatus',
                formatter: (key, value) => util.handleEnums(acc_status, this.formModel.ldAcStatus ? this.formModel.ldAcStatus : '')
              }, {
                'disabled': true,
                'label': '交易金额(元)',
                'type': 'text',
                'key': 'amount',
                formatter: (name, value) => util.formatCurrency(value)
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
    // if (this.$route.params) {
    //   Object.assign(this.formModel, this.$route.params)
    // }
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
</style>
