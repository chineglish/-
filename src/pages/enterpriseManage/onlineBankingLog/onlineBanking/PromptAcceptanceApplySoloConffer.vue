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
import { bill_Type } from '@/assets/js/entity.js'
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
  name: 'PromptAcceptanceApplySoloConffer',
  data () {
    return {
      formConfigJson: {
        formWidth: '100%',
        formItems: [
          {
            title: '票据信息',
            group: [
              {
                'disabled': false,
                'label': '票据号码',
                'key': 'stdBillNum',
                'type': 'text'
              },
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(bill_Type, value),
                'key': 'stdBillTyp'
              },
              {
                'disabled': false,
                'label': '出票日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdIssDate'
              },
              {
                'disabled': false,
                'label': '票面到期日',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdDueDate'
              },
              {
                'disabled': false,
                'label': '票面金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stdAccpAmt'
              },
              {
                'disabled': false,
                'label': '出票人名称',
                'type': 'text',
                'key': 'stdDrwrNam'
              },
              {
                'disabled': false,
                'label': '收款人名称',
                'type': 'text',
                'key': 'stdPyeeNam'
              },
              {
                'disabled': false,
                'label': '承兑人名称',
                'type': 'text',
                'key': 'stdAccpNam'
              },
              {
                'disabled': false,
                'label': '合同编号',
                'type': 'text',
                'key': 'stdContRnm	'
              },
              {
                'disabled': false,
                'label': '发票编号',
                'type': 'text',
                'key': 'stdInvcNum'
              },
              {
                'disabled': false,
                'label': '批次号',
                'type': 'text',
                'key': 'stdBatchNm'
              },
              {
                'disabled': false,
                'label': '备注',
                'type': 'text',
                'key': 'std400Mem'
              },
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
  }
}
</script>
<style scoped>
</style>
