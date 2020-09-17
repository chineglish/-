<template>
  <div class="form-box">
    <m-new-form :componentJson="formConfigJson"
      :formModel="formModel">
    </m-new-form>
  </div>
</template>
<script>
import { usualDate, extendFlg_Type, payerRate } from '@/assets/js/entity.js'
// import { Sign } from '@/assets/js/SignMsg'
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
  name: 'confirmCurrentTofer',
  data () {
    return {
      //   data: ['理财服务', '定活互转', '活期转定期确定页'],
      formConfigJson: {
        formItems: [
          {
            title: '理财服务 > 活期转定期',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '转出账号',
                'type': 'text',
                'key': 'payerAcNo'
              },
              {
                'disabled': true,
                'label': '转出账户名称',
                'type': 'text',
                'key': 'payerAcName'
              },
              { 'disabled': true,
                'label': '存期',
                'type': 'text',
                'key': 'saveDate',
                formatter: (key, value) => util.handleEnums(usualDate, value)
              },
              {
                'disabled': false,
                'label': '转存金额(元)',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '付息方式',
                'type': 'text',
                'key': 'ratesType',
                formatter: (key, value) => util.handleEnums(payerRate, value)
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
                'label': '对账联系人',
                'type': 'text',
                'key': 'contactName'
              },
              {
                'disabled': true,
                'label': '联系人手机',
                'type': 'text',
                'key': 'contactPhone'
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
