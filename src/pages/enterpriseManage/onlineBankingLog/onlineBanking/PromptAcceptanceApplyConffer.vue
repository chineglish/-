<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
    >
    </m-new-form>
    <d-table
      :tableData="tableData"
      :tableHeadData="tableHeadData"
    >
    </d-table>
  </div>
</template>

<script>
import util from '@/libs/util'
import { bill_Type } from '@/assets/js/entity'
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
  name: 'PromptReceiptApplyConffer',
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
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '总笔数',
                'type': 'text',
                'key': 'total'
              },
              {
                'disabled': false,
                'label': '总金额',
                'type': 'text',
                'key': 'amount'
              }
            ]
          },
          {
            title: '票据信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '合同编号',
                'type': 'text',
                'key': 'stdContRnm'
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
                'key': 'stdCustAcc'
              }
            ]
          }
        ]
      }
    }
  },
  created () {
    this.formModel.stdCustAcc = this.formModel.list[0].stdAccpAcc
  }
}
</script>
