<template>
  <m-new-form
    :componentJson="formConfigJson"
    :formModel="formModel"
  >
  </m-new-form>
</template>

<script>
// import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { huabo_Type } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'transConffer',
  data () {
    return {
      payerAccNoList: [], // 付款账户信息列表
      // 面包屑导航
      // breadData: ['现金管理', '资金归集', '归集资金划拨'],
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            // labelWidth: '30%',
            title: '归集资金划拨',
            group: [
              {
                'disabled': false,
                'label': '付款账号',
                'type': 'text',
                'key': 'payerAcNo'
              },
              {
                'disabled': false,
                'label': '付款户名',
                'type': 'text',
                'key': 'payerAcName'
              },
              {
                'disabled': false,
                'label': '收款账号',
                'type': 'text',
                'key': 'payeeAcNo'
              },
              {
                'disabled': false,
                'label': '收款户名',
                'type': 'text',
                'key': 'payeeAcName'
              },
              {
                'disabled': false,
                'label': '金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '交易类型',
                'type': 'text',
                'key': 'transType',
                formatter: (key, value) => {
                  return util.handleEnums(huabo_Type, value)
                }
              },
              {
                'disabled': false,
                'label': '用途',
                'type': 'text',
                'key': 'purpose'
              },
              {
                'disabled': false,
                'label': '附言',
                'type': 'text',
                'key': 'postscript'
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
    // this.formModel = this.$route.params
    // this.formModel.payerAcc = this.$route.params.payerAcNo
    // this.formModel.payeeAcc = this.$route.params.payeeAcNo
    //
    // if (this.$route.params) {
    //   Object.assign(this.formModel, this.$route.params)
    // }

    // switch (this.formModel.payeeAcc) {
    //   case '0':
    //     this.formModel.payeeAcc = '12312312312'
    //     break
    // }
    // switch (this.formModel.transType) {
    //   case '0':
    //     this.formModel.transType = '上划'
    //     break
    //   case '1':
    //     this.formModel.transType = '下拨'
    //     break
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
