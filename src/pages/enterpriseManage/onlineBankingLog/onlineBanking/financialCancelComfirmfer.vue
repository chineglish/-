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
  name: 'financialCancelComfirmfer',
  data () {
    return {
      // data: ['理财服务', 购买撤销']
      formConfigJson: {
        formItems: [
          {
            title: '理财产品 > 购买撤销',
            formWidth: '100%',
            group: [
              {
                'disable': 'false',
                'type': 'text',
                'label': '产品名称',
                'key': 'prdName'
              },
              // {
              //   'disable': 'false',
              //   'type': 'text',
              //   'label': '撤销份额',
              //   'key': 'portion'
              // },
              {
                'disable': 'false',
                'type': 'text',
                'label': '撤销金额',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '交易账户',
                'key': 'payeeAcNo'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '推荐人编号',
                'key': 'mutiRecommender'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '被撤流水',
                'key': 'coreJnlNo'
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
      this.formConfigJson.formItems[0].group[5].show = true
    } else {
      this.formConfigJson.formItems[0].group[6].show = true
    }
  }
}
</script>

<style  scoped>
</style>
