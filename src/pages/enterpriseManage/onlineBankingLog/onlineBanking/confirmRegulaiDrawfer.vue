<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel">
    </m-new-form>
  </div>
</template>
<script>
// import { httpPost } from '../../../../api/sys/http'
import util from '@/libs/util'
import { usualDate, currency_type, extendFlg_Type } from '@/assets/js/entity'
const withdrawalMethod = {
  '0': '全部支取',
  '1': '部分支取'
}
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'confirmRegularDrawfer',
  data () {
    return {
      // data: ['理财服务', '定活互转', '定期支取'],
      formConfigJson: {
        formItems: [
          {
            title: '定期支取',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '定期账号',
                'type': 'text',
                'key': 'payerAcNo'
              },
              {
                'disabled': true,
                'label': '开户日期',
                'type': 'text',
                'key': 'openDate'
              },
              {
                'disabled': true,
                'label': '存期',
                'type': 'text',
                'key': 'saveDate',
                formatter: (key, value) => util.handleEnums(usualDate, value)
              },
              {
                'disabled': true,
                'label': '币种',
                'type': 'text',
                'key': 'currency',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disabled': true,
                'label': '账户余额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '付息方式',
                'type': 'text',
                'key': 'interestType',
                formatter: (key, value) => (this.formModel.interestType ? this.formModel.interestType : '定期付息')
              },
              {
                'disabled': true,
                'label': '到期是否自动转存',
                'type': 'text',
                'key': 'extendflg',
                formatter: (key, value) => util.handleEnums(extendFlg_Type, value)
              },
              {
                'disabled': true,
                'label': '支取方式',
                'type': 'text',
                'key': 'drawType',
                formatter: (key, value) => withdrawalMethod[value]
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
    // if (this.$route.params) {
    //   Object.assign(this.formModel, this.$route.params)
    // }
  }
}
</script>

<style  scoped>
</style>
