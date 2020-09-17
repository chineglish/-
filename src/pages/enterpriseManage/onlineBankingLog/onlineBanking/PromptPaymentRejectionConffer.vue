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
import { bill_Type } from '@/assets/js/entity'
const rcdCode_Type = [
  { value: 'DC00', label: '与自己有直接债权债务关系的持票人未履行约定义务' },
  { value: 'DC01', label: '持票人明知有欺诈、偷盗或者胁迫等情形，出于恶意取得票据' },
  { value: 'DC02', label: '持票人明知债务人与出票人或者持票人的前手之间存在抗辩事由而取得票据' },
  { value: 'DC03', label: '持票人因重大过失取得不符合《票据法》规定的票据' },
  { value: 'DC04', label: '超过提示付款期' },
  { value: 'DC05', label: '被法院冻结或收到法院止付通知书' },
  { value: 'DC06', label: '票据未到期' },
  { value: 'DC07', label: '商业承兑汇票承兑人账户余额不足' },
  { value: 'DC08', label: '其他' }
]
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'PromptPaymentRejectionConffer',
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
                'key': 'stdAccpAmt',
                formatter: (key, value) => util.formatCurrency(value)
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
                'label': '拒付代码',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(rcdCode_Type, value),
                'key': 'stdDshnRcd'
              },
              {
                'disabled': false,
                'label': '拒付备注',
                'type': 'text',
                show: false,
                'key': 'stdDshnRsn'
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
              }
            ]
          }
        ]
      }
    }
  },
  created () {
    if (this.formModel.stdDshnRcd === 'DC08') {
      this.formConfigJson.formItems[0].group[8].show = true
    }
  }
}
</script>
