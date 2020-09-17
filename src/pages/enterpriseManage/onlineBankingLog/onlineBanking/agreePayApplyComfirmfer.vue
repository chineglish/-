<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
      >
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
  name: 'agreePayApplyComfirmfer',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '票据号码',
                'type': 'text',
                'key': 'stdBillNum'
              },
              {
                'disabled': false,
                'label': '追索人账号',
                'type': 'text',
                'key': 'stdAppAcct'
              },
              {
                'disabled': false,
                'label': '被追索人账号',
                'type': 'text',
                'key': 'stdRcvAcct'
              },
              {
                'disabled': false,
                'label': '票面金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stdPmMoney'
              }, {
                'disabled': true,
                'label': '同意清偿金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stdApayAmt'
              }, {
                'disabled': true,
                'label': '同意清偿日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdApplDte'
              }
            ]
          },
          {
            title: '申请人信息',
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '客户账号',
                'type': 'text',
                'key': 'stdAppAcct'
              }
            ]
          }
        ]
      }
    }
  },
  created () {}
}
</script>
