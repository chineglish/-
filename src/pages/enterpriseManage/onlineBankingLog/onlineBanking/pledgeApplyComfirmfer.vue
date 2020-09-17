<template>
  <div class="form-box">
    <d-table
      :tableData="tableData"
      :tableHeadData="tableHeadData"
      >
    </d-table>
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
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'pledgeApplyComfirmfer',
  data () {
    return {
      tableHeadData: [
        { label: '票据号码', prop: 'stdBillNum' },
        { label: '票据类型',
          prop: 'stdBillTyp',
          formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, cellValue) },
        { label: '出票日期', prop: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '到期日', prop: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '票面金额', prop: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '出票人名称', prop: 'stdDrwrNam' },
        { label: '收款人名称', prop: 'stdPyeeNam' },
        { label: '承兑人名称', prop: 'stdAccpNam' }
      ],
      formConfigJson: {
        formItems: [
          {
            title: '质权人信息',
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '质权人名称',
                'type': 'text',
                'key': 'pledgeeName'
              },
              {
                'disabled': false,
                'label': '质权人账号',
                'type': 'text',
                'key': 'pledgeeAcc'
              },
              {
                'disabled': false,
                'label': '质权人开户行',
                'type': 'text',
                'key': 'pledgeeBank'
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
                'key': 'stdDrwrAcc'
              }
            ]
          }
        ]
      }
    }
  },
  created () {
    this.formModel.stdDrwrAcc = this.formModel.list[0].stdCobkAcc
    this.formModel.pledgeeBank = this.formModel.list[0].stdCobkBnm
    this.formModel.pledgeeAcc = this.formModel.list[0].stdCobkAcc
    this.formModel.pledgeeName = this.formModel.list[0].stdCobkNam
  }
}
</script>
