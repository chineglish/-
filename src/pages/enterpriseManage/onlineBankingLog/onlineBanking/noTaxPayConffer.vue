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
 *@name: 非税缴费确认
 */
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
  name: 'noTaxPayConf',
  data () {
    return {
      // titleData: ['转账汇款', '非税缴费'],
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '非税缴费',
            group: [
              {
                'disabled': true,
                'label': '付款账户',
                'type': 'text',
                'key': 'payerAcNo'
              }, {
                'disabled': true,
                'label': '可用余额',
                'type': 'text',
                'key': 'balance',
                formatter: (key, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '缴款项目',
                'type': 'text',
                'key': 'payItem'
              }, {
                'disabled': true,
                'label': '缴款码',
                'type': 'text',
                'key': 'payCode'
              }, {
                'disabled': true,
                'label': '执行单位名称',
                'type': 'text',
                'key': 'chgAgenName'
              }, {
                'disabled': true,
                'label': '执行单位编码',
                'type': 'text',
                'key': 'chgAgenCode'
              }, {
                'disabled': true,
                'label': '缴款人名称',
                'type': 'text',
                'key': 'payerAcName'
              }, {
                'disabled': true,
                'label': '收款人名称',
                'type': 'text',
                'key': 'payeeAcName'
              }, {
                'disabled': true,
                'label': '摘要',
                'type': 'text',
                'key': 'remark'
              }, {
                'disabled': true,
                'label': '缴款金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '缴款状态',
                'type': 'text',
                'key': 'payStats'
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
</style>
