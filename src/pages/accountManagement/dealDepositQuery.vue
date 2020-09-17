<template>
  <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <d-table
          :table-data="tableData"
          :firstColIndex = "firstColIndex"
          :tableHeadData="tableHeadData"
          :pagesize="pagesize"
          :actionData="actionData"
          @back="onBack"
        >
        </d-table>
        <m-hint-box :msgs="msgs"></m-hint-box>
  </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, chaohui_flag, acc_type, acc_status } from '@/assets/js/entity'
export default {
  name: 'dealDepositQuery',
  data () {
    return {
      breadData: ['账户管理', '协定存款查询'],
      msgs: ['1.用于企业用户查询协定存款账户明细。', '2.用户点击“账户管理-协定存款查询”，页面展示操作员有操作权限的本企业加挂全部协定存款账户的信息列表'],
      routeParams: {},
      pagesize: 4,
      firstColIndex: {
        type: 'index',
        label: '序号',
        eventName: ''
      },
      tableHeadData: [
        // 首字母大写已改成小写
        {
          label: '账户',
          prop: 'acNo'
        },
        { label: '账户名称', prop: 'acName' },
        {
          label: '账户类型',
          prop: 'zhzsbfbz',
          formatter: (row, column, cellValue, index) => {
            const target = acc_type.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          }
        },
        { label: '子账户序号', prop: 'subAcNo', width: 100 },
        {
          label: '币种',
          prop: 'currency',
          formatter: (row, column, cellValue, index) => {
            const target = currency_type.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          }
        },
        {
          label: '账户余额',
          prop: 'protocolAmt',
          width: '150px',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '协定利率(%)',
          prop: 'protocolPeriod',
          width: '120',
          formatter: (row, column, cellValue, index) => util.formatInterestRate(cellValue)
        },
        {
          label: '起始日期',
          prop: 'beginDate',
          width: '110',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '终止日期',
          prop: 'endDate',
          width: '110',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
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
        }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          // type: 'info',
          eventName: 'back'
        }
      ]
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        // name: 'childAccountQuery'
        name: 'index'
      })
    },
    getMsg () {
      httpPost('/eweb-acmgmt.AgreementSavQry.do').then(res => {
        this.tableData = res.list
      }).catch(() => {
      })
    }
  },
  created () {
    this.getMsg()
    this.stringDate = util.formatDate
  }
}
</script>
