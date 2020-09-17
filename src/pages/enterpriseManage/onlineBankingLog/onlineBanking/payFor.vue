<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel">
    </m-new-form>
  </div>
</template>

<script>
import util from '@/libs/util'
import { lxzffans_type, saveDate, drawType, price_type, zr_type } from '@/assets/js/entity'

export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'payFor',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            title: '单位大额存单转让',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '产品期次编号',
                'type': 'text',
                'key': 'prdBatchCode'
              }, {
                'disabled': true,
                'label': '产品名称',
                'type': 'text',
                'key': 'chanpshm'
              }, {
                'disabled': true,
                'label': '年利率(%)',
                'type': 'text',
                'key': 'actualRate',
                formatter: (key, value) => util.formatInterestRate(value)
              }, {
                'disabled': true,
                'label': '产品期限',
                'type': 'text',
                'key': 'depositTerm',
                formatter: (key, value) => util.handleEnums(saveDate, value)
              }, {
                'disabled': true,
                'label': '支付利息方式',
                'type': 'text',
                'key': 'lxzffans',
                formatter: (key, value) => util.handleEnums(lxzffans_type, value)
              }, {
                'disabled': true,
                'label': '支取标识',
                'type': 'text',
                'key': 'isAllowAdvancedDraw',
                formatter: (key, value) => util.handleEnums(drawType, value)
              }, {
                'disabled': true,
                'label': '转让账号',
                'type': 'text',
                'key': 'ldAcNo'
              },
              {
                'disabled': true,
                'label': '转让账户名称',
                'type': 'text',
                'key': 'crrmingc'
              }, {
                'disabled': true,
                'label': '开户金额',
                'type': 'text',
                'key': 'openAmount',
                formatter: (key, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '可用余额',
                'type': 'text',
                'key': 'actBal',
                formatter: (key, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '转让类型',
                'type': 'text',
                'key': 'drawType',
                formatter: (key, value) => util.handleEnums(zr_type, value)
              }, {
                'disabled': true,
                'label': '转让份额',
                'type': 'text',
                'key': 'shareAmount',
                formatter: (key, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '定价方式',
                'type': 'text',
                'key': 'priceType',
                formatter: (key, value) => util.handleEnums(price_type, value)
              }, {
                'disabled': true,
                'label': '转让价格',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '已计提利息',
                'type': 'text',
                show: false,
                'key': 'accruedInterestUnpaid',
                formatter: (key, value) => util.formatCurrency(value)
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
    if (this.formModel.priceType === '1') {
      this.formConfigJson.formItems[0].group[14].show = true
    }
  }
}
</script>
<style  scoped>
</style>
