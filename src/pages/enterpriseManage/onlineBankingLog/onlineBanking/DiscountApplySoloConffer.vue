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
import { bill_Type, endorse_Type, clearing_Type, payment_Type, discount_Method } from '@/assets/js/entity'
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
  name: 'DiscountApplySoloConffer',
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
                'label': '票据类型',
                'type': 'text',
                'key': 'stdBillTyp',
                formatter: (key, value) => util.handleEnums(bill_Type, value)
              },
              // {
              //   'disabled': false,
              //   'label': '票据类型',
              //   'type': 'text',
              //   'key': 'paperType'
              // },
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
              },
              {
                'disabled': false,
                'label': '票面金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stdPmMoney'
              },
              {
                'disabled': false,
                'label': '贴现方式',
                'type': 'text',
                'key': 'stdDsntTyp',
                formatter: (key, value) => util.handleEnums(discount_Method, value)
              },
              {
                'disabled': false,
                'label': '付息方式',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(payment_Type, value),
                'key': 'stdInteMtd'
              },
              {
                'disabled': false,
                'label': '协议付息比例',
                'type': 'text',
                'show': false,
                'key': 'stdIntRate'
              },
              {
                'disabled': false,
                'label': '贴现利率',
                'type': 'text',
                formatter: (key, value) => util.formatInterestRate(value),
                'key': 'stdDscntRt'
              },
              {
                'disabled': false,
                'label': '实付金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stdRealAmt'
              },
              {
                'disabled': false,
                'label': '贴现日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdDscntDt'
              }
            ]
          },
          {
            title: '贴入人信息',
            group: [
              {
                'disabled': false,
                'label': '贴入人名称',
                'type': 'text',
                'key': 'stdDsbkNme'
              },
              {
                'disabled': false,
                'label': '贴入人开户行',
                'type': 'text',
                'key': 'stdDsbkBnm'
              },
              {
                'disabled': false,
                'label': '银行选择',
                'type': 'text',
                'key': 'stdDsbkBnam'
              },
              {
                'disabled': false,
                'label': '清算方式',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(clearing_Type, value),
                'key': 'stdStlMthd'
              }
            ]
          },
          {
            title: '入账信息',
            group: [
              {
                'disabled': false,
                'label': '入账账号',
                'type': 'text',
                'key': 'stdAoaiAcc'
              },
              {
                'disabled': false,
                'label': '银行选择',
                'type': 'text',
                'key': 'stdAoaiBnam'
              },
              {
                'disabled': false,
                'label': '允许背书',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(endorse_Type, value),
                'key': 'stdBnedRmt'
              }
            ]
          },
          {
            title: '申请人信息',
            group: [
              {
                'disabled': false,
                'label': '客户账号',
                'type': 'text',
                'key': 'stdPropAcc'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    changeMtd (res) {
      this.formModel = res
      if (this.formModel.stdInteMtd === '01') {
        this.formConfigJson.formItems[0].group[7].show = false
      }
      if (this.formModel.stdInteMtd === '02') {
        this.formConfigJson.formItems[0].group[7].show = false
      }
      if (this.formModel.stdInteMtd === '03') {
        this.formConfigJson.formItems[0].group[7].show = true
      }
    }
  },
  created () {
    this.changeMtd(this.formModel)
  }
}
</script>
