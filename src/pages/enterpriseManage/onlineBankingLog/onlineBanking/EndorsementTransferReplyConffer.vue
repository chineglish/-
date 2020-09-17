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
import { bill_Type, endorse_Type, response_Type } from '@/assets/js/entity'
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
  name: 'EndorsementTransferReplyConffer',
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
        { label: '承兑人名称', prop: 'stdAccpNam' },
        { label: '转让标记', prop: 'stdEndOrmk', formatter: (row, column, cellValue, index) => util.handleEnums(endorse_Type, cellValue) },
        { label: '审核状态', prop: 'authState' }
      ],
      formConfigJson: {
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '客户账号',
                'type': 'text',
                'key': 'stdCustAcc'
              },
              {
                'disabled': false,
                'label': '应答意见',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(response_Type, value),
                'key': 'stdSgnrRes'
              },
              {
                'disabled': false,
                'label': '备注',
                'type': 'text',
                'key': 'std400Memob'
              }
            ]
          }
        ]
      }
    }
  },
  created () {
    this.formModel.stdCustAcc = this.tableData[0].stdRcvAcct
    this.formModel.stdSgnrRes = this.tableData[0].stdSgnrRes
    this.formModel.std400Memob = this.tableData[0].std400Memob
  }
}
</script>
