<template>
  <div class="form-box">
      <m-new-form
				:componentJson="formConfigJson"
				:formModel="formModel">
      </m-new-form>
    </div>
</template>

<script>
import { bill_Type, recourseTyp_Type } from '@/assets/js/entity'
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
  name: 'raConfAgainfer',
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
                'key': 'stdPmMoney'
              },
              {
                'disabled': true,
                'label': '票面出票人名称',
                'type': 'text',
                'key': 'stdDrwrNam'
              }, {
                'disabled': true,
                'label': '票面承兑人名称',
                'type': 'text',
                'key': 'stdAccpNam'
              },
              {
                'disabled': false,
                'label': '追索类型',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(recourseTyp_Type, value),
                'key': 'stdBussTyp'
              },
              {
                'disabled': false,
                'label': '追索理由',
                'type': 'text',
                'key': 'recourseReason'
              }, {
                'disabled': false,
                'label': '追索金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stdPpayAmt'
              }, {
                'disabled': true,
                'label': '追索申请日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdApplDte'
              }
            ]
          },
          {
            title: '追索人信息',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '追索人账号',
                'type': 'text',
                'key': 'stdRcrsAcc'
              }, {
                'disabled': false,
                'label': '追索人名称',
                'type': 'text',
                'key': 'stdRcrsNme'
              },
              {
                'disabled': true,
                'label': '追索人行号',
                'type': 'text',
                'key': 'stdRcrsBnm'
              },
              {
                'disabled': false,
                'label': '追索人组织机构代码',
                'type': 'text',
                'key': 'stdRcrsCod'
              }
            ]
          },
          {
            title: '被追索人信息',
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '被追索人名称',
                'type': 'text',
                'key': 'stdRcvgNme'
              },
              {
                'disabled': false,
                'label': '被追索人行号',
                'type': 'text',
                'key': 'stdRcvgBnm'
              },
              {
                'disabled': false,
                'label': '被追索人账号',
                'type': 'text',
                'key': 'stdRcvgAcc'
              },
              {
                'disabled': false,
                'label': '可被追索人组织机构代码',
                'type': 'text',
                'key': 'stdRecrCod'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
