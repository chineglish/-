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
import { currency_type, saveDate, draw_type } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'depositWithdrawfer',
  data () {
    return {
      // data: ['理财服务', '通知存款', '通知存款支取']
      formConfigJson: {
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '账号',
                'type': 'text',
                'key': 'payerAcNo'
              },
              {
                'disabled': true,
                'label': '币种/钞汇',
                'type': 'text',
                'key': 'currency',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disabled': true,
                'label': '存储类型',
                'type': 'text',
                'key': 'saveDate',
                formatter: (key, value) => util.handleEnums(saveDate, value)
              },
              {
                'disabled': true,
                'label': '开户日期',
                'type': 'text',
                'key': 'openDate',
                formatter: (key, value) => util.separationDate(value)
              },
              {
                'disabled': true,
                'label': '支取方式',
                'type': 'text',
                'key': 'drawType',
                formatter: (key, value) => util.handleEnums(draw_type, value)
              },
              {
                'disabled': true,
                'label': '支取金额',
                'type': 'text',
                'key': 'amount',
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
    // this.formModel = this.$route.params.formModel
  }
}
</script>
<style  scoped>
</style>
