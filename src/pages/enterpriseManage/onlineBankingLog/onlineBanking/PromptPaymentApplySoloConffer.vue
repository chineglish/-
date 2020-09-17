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
import { clearing_Type, bill_Type } from '@/assets/js/entity'
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
  name: 'PromptPaymentApplySoloConffer',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '票据号码',
                'type': 'text',
                'key': 'stdBillNum'
              },
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'text',
                'key': 'stdBillTyp',
                formatter: (key, value) => util.handleEnums(bill_Type, value)
              },
              {
                'disabled': false,
                'label': '出票日期',
                'type': 'text',
                'key': 'stdIssDate',
                formatter: (key, value) => util.separationDate(value)
              },
              {
                'disabled': false,
                'label': '票面到期日',
                'type': 'text',
                'key': 'stdDueDate',
                formatter: (key, value) => util.separationDate(value)
              },
              {
                'disabled': false,
                'label': '票面金额',
                'type': 'text',
                'key': 'stdPmMoney',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '提示付款申请日期',
                'type': 'text',
                'key': 'stdApplDat',
                formatter: (key, value) => util.separationDate(value)
              },
              {
                'disabled': false,
                'label': '线上清算标志',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(clearing_Type, value),
                'key': 'stdSttlFlg'
              },
              {
                'disabled': false,
                'label': '逾期原因',
                'type': 'text',
                show: false,
                'key': 'stdOduersn'
              },
              {
                'disabled': false,
                'label': '备注',
                'type': 'text',
                'key': 'std400Memo'
              }
            ]
          },
          {
            title: '申请人信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '客户账号',
                'type': 'text',
                'key': 'stdDrwrAcc'
              }
            ]
          }
        ]
      }
    }
  },
  created () {
    this.formModel.stdDrwrAcc = this.formModel.stdPrsnAcc
    if (this.formModel.stdBussTyp === '02') {
      this.formConfigJson.formItems[0].group[7].show = true
    }
  }
}
</script>
