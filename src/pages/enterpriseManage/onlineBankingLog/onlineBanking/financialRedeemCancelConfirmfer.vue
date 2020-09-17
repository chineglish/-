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
  name: 'financialRedeemCancelConfirmfer',
  data: function () {
    return {
      // data: ['理财赎回撤单'],
      formConfigJson: {
        formItems: [
          {
            title: '理财赎回撤单',
            formWidth: '100%',
            group: [
              { 'disabled': true,
                'type': 'text',
                'label': '产品名称',
                'key': 'prdName'
              },
              { 'disabled': true,
                'type': 'text',
                'label': '产品代码',
                'key': 'prdCode'
              },
              { 'disabled': true,
                'type': 'text',
                'label': '交易份额',
                'key': 'vol',
                formatter: (key, value) => util.formatCurrency(value)
              },
              { 'disabled': true,
                'type': 'text',
                'label': '撤销份额(份)',
                'key': 'portion',
                formatter: (key, value) => util.formatCurrency(value)
              },
              { 'disabled': true,
                'type': 'text',
                'label': '业绩比较基准',
                'key': 'modelComment',
                'show': false
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '单位净值',
                'key': 'netWorth',
                formatter: (key, value) => this.net(value),
                'show': false
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '七日年化收益率',
                'key': 'weekRate',
                'show': false
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '交易账户',
                'key': 'payeeAcNo'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '推荐人编号',
                'key': 'mutiRecommender'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    // 拼接净值和净值日期
    net (value) {
      return value + '(' + this.formModel.apNavDate + ')'
    }
  },
  created () {
    this.formModel.apNavDate = util.sepDate(this.formModel.apNavDate)
    this.formModel.netWorth = Number(this.formModel.netWorth).toFixed(6)
    if (this.formModel.prdTemplate === '1300') {
      this.formStruction.groups[0].formItems[6].show = true
      this.formStruction.groups[0].formItems[7].show = true
    } else {
      this.formStruction.groups[0].formItems[5].show = true
    }
  }
}
</script>
<style  scoped>
</style>
