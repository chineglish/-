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
import { bill_Type } from '@/assets/js/entity'
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
  name: 'pledgeApplyComffer',
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
                'disabled': true,
                'label': '票据类型',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(bill_Type, value),
                'key': 'stdBillTyp'
              },
              {
                'disabled': true,
                'label': '出票日期',
                'type': 'text',
                // formatter: (key, value) => util.separationDate(value),
                'key': 'stdIssDate'
              },
              {
                'disabled': true,
                'label': '票面到期日',
                'type': 'text',
                // formatter: (key, value) => util.separationDate(value),
                'key': 'stdDueDate'
              },
              {
                'disabled': true,
                'label': '票面金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stdPmMoney'
              }
            ]
          },
          {
            title: '质权人信息',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '质权人名称',
                'type': 'text',
                'key': 'stdCobkNam'
              },
              {
                'disabled': true,
                'label': '质权人账号',
                'type': 'text',
                'key': 'stdCobkAcc'
              },
              {
                'disabled': true,
                'label': '质权人开户行',
                'type': 'text',
                'key': 'stdCobkBnm'
              }
            ]
          },
          {
            title: '申请人信息',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '客户账号',
                'type': 'text',
                'key': 'stdColtAcc'
              }
            ]
          }
        ]
      }
    }
  },
  created () {
  }
}
</script>
