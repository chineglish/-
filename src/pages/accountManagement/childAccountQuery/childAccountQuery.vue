<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <d-table
        :table-data="tableData"
        :firstColIndex = "firstColIndex"
        :tableHeadData="tableHeadData"
        :pagesize="pagesize"
        @account="account">
      </d-table>
      <m-hint-box :msgs="msgs"></m-hint-box>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, chaohui_flag, acc_type, acc_status } from '@/assets/js/entity'
export default {
  name: 'childAccountQuery',
  data () {
    const kzState = [
      { value: '0000', label: '正常' },
      { value: '1000', label: '金额冻结' },
      { value: '0100', label: '封闭冻结' },
      { value: '0010', label: '只收不付' },
      { value: '0001', label: '只付不收' },
      { value: '1001', label: '金额冻结/只付不收' },
      { value: '1010', label: '金额冻结/只收不付' },
      { value: '1100', label: '金额冻结/封闭冻结' },
      { value: '1011', label: '金额冻结/只收不付/只付不收' },
      { value: '1101', label: '金额冻结/封闭冻结/只付不收' },
      { value: '1110', label: '金额冻结/封闭冻结/只收不付' },
      { value: '1111', label: '金额冻结/封闭冻结/只收不付/只付不收' },
      { value: '0101', label: '封闭冻结/只付不收' },
      { value: '0110', label: '封闭冻结/只收不付' },
      { value: '0111', label: '封闭冻结/只收不付/只付不收' },
      { value: '0011', label: '只收不付/只付不收' }
    ]
    return {
      breadData: ['账户管理', '子账户查询'],
      msgs: [
        '1.系统默认显示最近六个月交易明细。'
      ],
      firstColIndex: {
        type: 'index',
        label: '序号',
        eventName: ''
      },
      pagesize: 20,
      tableHeadData: [
        // 首字母大写已改成小写
        { label: '账户', prop: 'acNo', clickEventName: 'account', width: '160' },
        { label: '账户名称', prop: 'acName' },
        {
          label: '账户类型',
          prop: 'acType',
          formatter: (row, column, cellValue, index) => {
            const target = acc_type.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          }
        },
        {
          label: '币种',
          prop: 'currency',
          width: '80',
          formatter: (row, column, cellValue, index) => {
            const target = currency_type.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          }
        },
        {
          label: '账户余额',
          prop: 'balance',
          width: 150,
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '可用余额',
          prop: 'availBal',
          width: 150,
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '钞汇标志',
          prop: 'currType',
          formatter: (row, column, cellValue, index) => {
            const target = chaohui_flag.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          }
        },
        {
          label: '账户状态',
          prop: 'acStatus',
          formatter: (row, column, cellValue, index) => {
            const target = acc_status.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          }
        },
        {
          label: '限制类型',
          prop: 'kzState',
          formatter: (row, column, cellValue, index) => util.handleEnums(kzState, cellValue)
        }
      ],
      tableData: []
    }
  },
  methods: {
    account (data) {
      this.$router.push({
        name: 'childAccountQueryDetails',
        params: data
      })
    },
    getChildAccQuery () {
      httpPost('/eweb-acmgmt.SubAccountQry.do').then(res => {
        this.tableData = res.list
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.getChildAccQuery()
  }
}
</script>
