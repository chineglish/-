<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <d-table
        :table-data="tableData"
        :firstColIndex="firstColIndex"
        :tableHeadData="tableHeadData"
        :pagesize="pagesize"
        :actionData="actionData"
        @back="onBack"
        @account="account"
      ></d-table>
      <m-hint-box :msgs="msgs"></m-hint-box>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, chaohui_flag, acc_type, acc_status } from '@/assets/js/entity'
export default {
  name: 'structureQuery',
  data () {
    return {
      msgs: [
        '用于企业对结构性存款交易账户的查询功能。'
      ],
      filename: __filename,
      breadData: ['理财服务', '结构性存款', '结构性存款查询'],
      pagesize: 20,
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      tableHeadData: [
        { label: '账户名称', prop: 'zhhuzwmc', width: '250' },
        {
          label: '账户类型',
          prop: 'kehuzhlx',
          width: '120',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_type, cellValue)
        },
        { label: '账号', prop: 'kehuzhao', width: '150', clickEventName: 'account' },
        { label: '子账户序号', prop: 'zhhaoxuh', width: '120' },
        {
          label: '币种',
          prop: 'currencyCode',
          width: '80',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '开户金额',
          prop: 'zhanghye',
          width: '140',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '年利率(%)', prop: 'zhxililv', width: '100', formatter: (row, column, cellValue, index) => util.formatInterestRate(cellValue) },
        {
          label: '钞汇标志',
          prop: 'chaohubz',
          formatter: (row, column, cellValue, index) => util.handleEnums(chaohui_flag, cellValue)
        },
        {
          label: '开户日期',
          prop: 'kaihriqi',
          width: '100',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '到期日期',
          prop: 'doqiriqi',
          width: '100',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '账户状态',
          prop: 'zhhuztai',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_status, cellValue)
        }
      ],
      operateData: {
        btnData: []
      },
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
  // mounted () {
  //   this.getAccountList()
  // },
  methods: {
    onBack () {
      this.$router.push({
        // name: 'childAccountQuery'
        name: 'index'
      })
    },
    account (res) {
      this.$router.push({
        name: 'structureQueryDetails',
        params: {
          lDAcNo: res.lDAcNo,
          subAcNo: res.subAcNo,
          ...res
        }
      })
    },
    getAccountList () {
      httpPost('/eweb-invest.StructuredDepositList.do').then(res => {
        this.tableData = res.acctInfoList
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.getAccountList()
  }
}
</script>
