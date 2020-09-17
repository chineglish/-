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
            title: '申请人信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '被保证人账户',
                'type': 'text',
                'key': 'account'
              },
              {
                'disabled': false,
                'label': '被保证人账户名称',
                'type': 'text',
                'key': 'name'
              },
              {
                'disabled': false,
                'label': '被保证人组织机构代码',
                'type': 'text',
                'key': 'code'
              },
              {
                'disabled': false,
                'label': '被保证人开户行号',
                'type': 'text',
                'key': 'bankNumber'
              }
            ]
          },
          {
            title: '保证人信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '保证人名称',
                'type': 'text',
                'key': 'stdWareNam'
              },
              {
                'disabled': false,
                'label': '保证人账号',
                'type': 'text',
                'key': 'stdWareAcc'
              },
              {
                'disabled': false,
                'label': '保证人开户行号',
                'type': 'text',
                'key': 'stdWareBnm'
              }
            ]
          }
        ]
      }
    }
  },
  created () {
    this.formModel.stdWareAcc = this.tableData[0].stdWareAcc
    this.formModel.stdWareNam = this.tableData[0].stdWareNam
    this.formModel.stdWareBnm = this.tableData[0].stdWareBnm
    this.formModel.account = this.tableData[0].stdRcvAcct
    this.formModel.name = this.tableData[0].stdRcvName
    this.formModel.code = this.tableData[0].stdRcvCode
    this.formModel.bankNumber = this.tableData[0].stdRcvBnm
  }
}
</script>
