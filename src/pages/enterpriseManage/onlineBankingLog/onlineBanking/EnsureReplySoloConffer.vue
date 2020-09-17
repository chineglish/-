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
import { response_Type, bill_Type } from '@/assets/js/entity'
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
  name: 'EnsureReplySoloConffer',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
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
                'key': 'stdAccpAmt',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '票面收款人名称',
                'type': 'text',
                'key': 'stdPyeeNam'
              },
              {
                'disabled': false,
                'label': '票面付款人名称',
                'type': 'text',
                'key': 'stdSgnrNam'
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
                'key': 'stdSgnrAcc'
              },
              {
                'disabled': false,
                'label': '签收人地址',
                'type': 'text',
                'key': 'stdSgnrAdr'
              },
              {
                'disabled': false,
                'label': '应答意见',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(response_Type, value),
                'key': 'stdSgnrRes'
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
