<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
    >
    </m-new-form>
    <d-table
      :tableData="tableData"
      :tableHeadData="tableHeadData">
    </d-table>
  </div>
</template>

<script>
import util from '@/libs/util'
import { bill_Type, endorse_Type } from '@/assets/js/entity'
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
  name: 'TicketRegistrationBatchConffer',
  data () {
    return {
      tableHeadData: [
        { label: '票据类型',
          prop: 'stdBillTyp',
          formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, cellValue) },
        { label: '出票日期', prop: 'stdIssDate', width: '120px', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '到期日', prop: 'stdDueDate', width: '120px', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '票面金额', prop: 'stdPmMoney', width: '100px', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '允许背书', prop: 'stdEndOrmk', formatter: (row, column, cellValue, index) => util.handleEnums(endorse_Type, cellValue) },
        { label: '出票人名称', prop: 'stdDrwrNam', width: '150px' },
        { label: '出票人账号', prop: 'stdDrwrAcc', width: '150px' },
        { label: '出票人行号', prop: 'stdDrwrBnm', width: '150px' },
        { label: '出票人行名', prop: 'stdDrwrBnam', width: '150px' },
        { label: '承兑人名称', prop: 'stdAccpNam', width: '150px' },
        { label: '承兑人账号', prop: 'stdAccpAcc', width: '150px' },
        { label: '承兑人行号', prop: 'stdAccpBnm', width: '150px' },
        { label: '承兑人行名', prop: 'stdAccpBnam', width: '150px' },
        { label: '收款人名称', prop: 'stdPyeeNam', width: '150px' },
        { label: '收款人账号', prop: 'stdPyeeAcc', width: '150px' },
        { label: '收款人行号', prop: 'stdPyeeBnm', width: '150px' },
        { label: '收款人行名', prop: 'stdPyeeBnam', width: '150px' }
      ],
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '批量出票登记',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '总金额',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '总笔数',
                'key': 'total'
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
