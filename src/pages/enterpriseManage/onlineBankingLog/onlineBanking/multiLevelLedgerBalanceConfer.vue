<template>
  <div>
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
      >
    </m-new-form>
  </div>
</template>

<script type="text/javascript">
// import { httpPost } from '@/api/sys/http'
import { currency_type } from '@/assets/js/entity'
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
  name: 'multiLevelBalanceConfer',
  data: function () {
    return {
      // data: ['现金管理', '多级账簿', '多级账簿余额调整确认']
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '多级账簿余额调整',
            // labelWidth: '30%',
            group: [
              {
                'disabled': false,
                'label': '用户账号',
                'type': 'text',
                'key': 'acNo'
              },
              {
                'disabled': false,
                'label': '用户户名',
                'type': 'text',
                'key': 'acName'
              },
              {
                'disabled': true,
                'label': '币种',
                'type': 'text',
                'key': 'currencyCode',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disabled': false,
                'label': '调出账簿号',
                'type': 'text',
                'key': 'outAsAcNo'
              },
              {
                'disabled': false,
                'label': '调出账簿名',
                'type': 'text',
                'key': 'outAsAcName'
              },
              {
                'disabled': false,
                'label': '调入账簿号',
                'type': 'text',
                'key': 'inAsAcNo'
              },
              {
                'disabled': false,
                'label': '调入账簿名',
                'type': 'text',
                'key': 'inAsAcName'
              },
              {
                'disabled': false,
                'label': '调整金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
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
                'key': 'postScript'
              }
            ]
          }
        ]
      }
    }
  },
  mounted: function () {
  },
  methods: {

  },
  created () {
    // this.formModel.acNo = this.$route.params.acNo
    // this.formModel.acName = this.$route.params.acName
    // this.formModel.inAsAcNo = this.$route.params.inAsAcNo
    // this.formModel.inAsAcName = this.$route.params.inAsAcName
    // this.formModel.outAsAcNo = this.$route.params.outAsAcNo
    // this.formModel.outAsAcName = this.$route.params.outAsAcName
    // this.formModel.amount = this.$route.params.amount
    // this.formModel.bigNum = this.$route.params.bigNum
    // this.formModel.purpose = this.$route.params.purpose
    // this.formModel.postScript = this.$route.params.postScript
    // this.formModel.currencyCode = util.handleEnums(currency_type, this.$route.params.currencyCode)
  },
  components: {}
}
</script>
