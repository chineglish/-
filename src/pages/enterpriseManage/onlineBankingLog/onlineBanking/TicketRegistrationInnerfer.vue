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

import { bill_Type, endorse_Type, stdsgn_Type } from '@/assets/js/entity'
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
  name: 'TicketRegistrationInnerfer',
  data () {
    return {
      formConfigJson: {
        formWidth: '100%',
        formItems: [
          {
            title: '出票登记',
            // formWidth: '50%',
            // labelWidth: '50%',
            group: [
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
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdIssDate'
              },
              {
                'disabled': false,
                'label': '到期日',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdDueDate'
              }
            ]
          },
          {
            title: '出票人信息',
            group: [
              {
                'disabled': false,
                'label': '出票人类型',
                'type': 'text',
                'key': 'stdDrwrTyp',
                formatter: (key, value) => util.handleEnums(stdsgn_Type, value)
              },
              {
                'disabled': false,
                'label': '出票人名称',
                'type': 'text',
                'key': 'stdDrwrNam'
              },
              {
                'disabled': false,
                'label': '出票人组织机构代码证',
                'type': 'text',
                'key': 'stdDrwrCod'
              },
              {
                'disabled': false,
                'label': '出票人开户账号',
                'type': 'text',
                'key': 'stdDrwrAcc'
              },
              {
                'disabled': false,
                'label': '出票人开户行名称',
                'type': 'text',
                'key': 'stdDrwrBnam'
              },
              {
                'disabled': true,
                'label': '到期无条件支付委托',
                'type': 'text',
                'key': 'stdUncnPay'
              }
            ]
          },
          {
            title: '承兑人信息',
            group: [
              {
                'disabled': false,
                'label': '承兑人名称',
                'type': 'text',
                'key': 'stdAccpNam'
              },
              {
                'disabled': false,
                'label': '承兑人账号',
                'type': 'text',
                'key': 'stdAccpAcc'
              },
              {
                'disabled': false,
                'label': '银行选择',
                'type': 'text',
                // formatter: (value) => value || '请选择银行',
                // 'clickEventName': 'selectBank',
                'key': 'stdAccpBnam'
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
                'label': '允许背书',
                'type': 'text',
                'key': 'stdEndOrmk',
                formatter: (key, value) => util.handleEnums(endorse_Type, value)
              }
            ]
          },
          {
            title: '收款人信息',
            group: [
              {
                'disabled': false,
                'label': '银行选择',
                'type': 'text',
                'key': 'stdPyeeBnam'
              },
              {
                'disabled': false,
                'label': '收款户名',
                'type': 'text',
                'key': 'stdPyeeNam'
              },
              {
                'disabled': false,
                'label': '收款账户',
                'type': 'text',
                'key': 'stdPyeeAcc'
              },
              {
                'disabled': false,
                'label': '出票登记备注',
                'type': 'text',
                'key': 'stdDrwrMem'
              }
            ]
          }
        ]
      }
    }
  },
  created () {
    if (this.formModel.stdUncnPay === 'CC00') {
      this.formModel.stdUncnPay = '到期无条件支付委托'
    }
  }
}
</script>
<style scoped>
</style>
