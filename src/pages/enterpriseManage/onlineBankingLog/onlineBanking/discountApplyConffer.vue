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
import { bill_Type, payment_Type, clearing_Type, endorse_Type, discount_Method } from '@/assets/js/entity'
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
  name: 'discountApplyConffer',
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
        { label: '实付金额', prop: 'stdRealAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '出票人名称', prop: 'stdDrwrNam' },
        { label: '收款人名称', prop: 'stdPyeeNam' },
        { label: '承兑人名称', prop: 'stdAccpNam' }
      ],
      formConfigJson: {
        formItems: [
          {
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
                'label': '总条数',
                'type': 'text',
                'key': 'total'
              }
            ]
          },
          {
            title: '票据信息',
            group: [
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
                'key': 'stdDscntRt',
                formatter: (key, value) => util.formatInterestRate(value)
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
                'key': 'stdCustAcc'
              }
            ]
          }
        ]
      }
    }
  },
  created () {
    this.formModel.stdDsntTyp = this.tableData[0].stdDsntTyp
    this.formModel.stdInteMtd = this.tableData[0].stdInteMtd
    this.formModel.stdDscntRt = this.tableData[0].stdDscntRt
    this.formModel.stdIntRate = this.tableData[0].stdIntRate
    this.formModel.stdDsbkNme = this.tableData[0].stdDsbkNme
    this.formModel.stdDsbkBnm = this.tableData[0].stdDsbkBnm
    this.formModel.stdDsbkBnam = this.tableData[0].stdDsbkBnam
    this.formModel.stdStlMthd = this.tableData[0].stdStlMthd
    this.formModel.stdAoaiAcc = this.tableData[0].stdAoaiAcc
    this.formModel.stdAoaiBnam = this.tableData[0].stdAoaiBnam
    this.formModel.stdBnedRmt = this.tableData[0].stdBnedRmt
    this.formModel.stdCustAcc = this.tableData[0].stdAoaiAcc
    if (this.formModel.stdInteMtd === '03') {
      this.formConfigJson.formItems[1].group[2].show = true
    }
  }
}
</script>
