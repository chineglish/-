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
import { bill_Type, endorse_Type } from '@/assets/js/entity'
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
  name: 'EndorsementTransferApplyConffer',
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
                'label': '总金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '总笔数',
                'type': 'text',
                'key': 'total'
              }
            ]
          },
          {
            title: '票据信息',
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '被背书人名称',
                'type': 'text',
                'key': 'stdEndeNam'
              },
              {
                'disabled': false,
                'label': '被背书人账号',
                'type': 'text',
                'key': 'stdEndeAcc'
              },
              {
                'disabled': false,
                'label': '被背书人开户行号',
                'type': 'text',
                'key': 'stdEndeBnm'
              },
              {
                'disabled': false,
                'label': '转让标记',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(endorse_Type, value),
                'key': 'stdBanmFlg'
              },
              {
                'disabled': false,
                'label': '被背书人备注',
                'type': 'text',
                'key': 'std400Memo'
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
                'key': 'stdCustAcc'
              }
            ]
          }
        ]
      }
    }
  },
  created () {
    this.formModel.stdCustAcc = this.tableData[0].stdEndeAcc
    this.formModel.std400Memo = this.tableData[0].std400Memo
    this.formModel.stdBanmFlg = this.tableData[0].stdBanmFlg
    this.formModel.stdEndeBnm = this.tableData[0].stdEndeBnm
    this.formModel.stdEndeAcc = this.tableData[0].stdEndeAcc
    this.formModel.stdEndeNam = this.tableData[0].stdEndeNam
  }
}
</script>
