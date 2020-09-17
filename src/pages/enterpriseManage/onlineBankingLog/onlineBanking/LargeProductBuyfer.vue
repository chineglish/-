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
import { saveDate, payerRate, drawType } from '@/assets/js/entity'

export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'LargeProductBuyfer',
  data () {
    return {
      // data: ['理财服务 ', '大额存单', '单位大额存单申购']
      formConfigJson: {
        formItems: [
          {
            title: '单位大额存单申购',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '产品编号',
                'type': 'text',
                'key': 'prdBatchCode'
              }, {
                'disabled': true,
                'label': '产品名称',
                'type': 'text',
                'key': 'prdBatchName'
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
                'label': '利息支付方式',
                'type': 'text',
                'key': 'interestPayWay',
                formatter: (key, value) => util.handleEnums(payerRate, value)
              }, {
                'disabled': true,
                'label': '支取标识',
                'type': 'text',
                'key': 'isAllowAdvancedDraw',
                formatter: (key, value) => util.handleEnums(drawType, value)
              }, {
                'disabled': true,
                'label': '交易金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '转出账号',
                'type': 'text',
                'key': 'payerAcNo'
              }, {
                'disabled': true,
                'label': '转出账户名称',
                'type': 'text',
                'key': 'payerAcName'
              }, {
                'disabled': true,
                'label': '对账联系人',
                'type': 'text',
                'key': 'linkman'
              }, {
                'disabled': true,
                'label': '联系人电话',
                'type': 'text',
                'key': 'linkmanPhone'
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
    // this.formModel = this.$route.params.formModel
  }
}
</script>
<style  scoped>
</style>
