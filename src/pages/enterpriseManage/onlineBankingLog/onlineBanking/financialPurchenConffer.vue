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

export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'financialPurchenConffer',
  data () {
    return {
      // data: ['理财服务', '理财产品', '产品购买确认']
      formConfigJson: {
        formItems: [
          {
            title: '理财产品 > 理财认购',
            formWidth: '100%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '产品名称',
                'key': 'prdName'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '购买金额',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '转出账户',
                'key': 'payerAcNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '七日年化收益率',
                'key': 'weekRate',
                'show': false
              },
              {
                'disable': true,
                'type': 'text',
                'label': '业绩基准',
                'key': 'modelComment',
                'show': false
              },
              {
                'disable': true,
                'type': 'text',
                'label': '推荐人编号',
                'key': 'mutiRecommender'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '单位净值',
                'key': 'netWorth',
                formatter: (key, value) => Number(this.formModel.netWorth).toFixed(6)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '起购金额',
                'key': 'ofirstAmt',
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
    if (this.formModel.prdTemplate === '1300') {
      this.formConfigJson.formItems[0].group[3].show = true
    } else {
      this.formConfigJson.formItems[0].group[4].show = true
    }
    // this.formModel = this.$route.params.formModel
  }
}
</script>
<style  scoped>
</style>
