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
  name: 'financiaRedeemConfirmfer',
  data: function () {
    return {
      // data: ['理财服务', '理财产品', '赎回确认'],
      formConfigJson: {
        formItems: [
          {
            title: '理财产品 > 赎回确认',
            formWidth: '100%',
            group: [
              { 'disable': true,
                'type': 'text',
                'label': '产品名称',
                'key': 'prdName'
              },
              { 'disable': true,
                'type': 'text',
                'label': '产品代码',
                'key': 'prdCode'
              },
              { 'disable': true,
                'type': 'text',
                'label': '转出账号',
                'key': 'payeeAcNo'
              },
              { 'disable': true,
                'type': 'text',
                'label': '可用份额(份)',
                'key': 'vol',
                formatter: (key, value) => util.formatCurrency(value)
              },
              { 'disable': true,
                'type': 'text',
                'label': '赎回份额(份)',
                'key': 'portion',
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
    // if (this.$route.params) {
    //   Object.assign(this.formModel, this.$route.params)
    // }
  }
}
</script>
<style  scoped>
</style>
