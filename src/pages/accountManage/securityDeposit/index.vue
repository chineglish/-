<template>
  <d2-container class="security-deposit-qry">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
      <d-table
        :tableData="tableData"
        :firstColIndex="firstColIndex"
        :tableHeadData="tableHeadData"
        :pageSize="pageSize"
        @on-account-click="accountClickHandler"
      >
      </d-table>
      <m-hint-box :msgs="msgs"></m-hint-box>
  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { acc_type_entity, currency_type_entity, chaohui_flag_entity } from '@/assets/js/entity'

export default {
  name: 'security-deposit-qry',
  data () {
    return {
      breadData: ['账户管理', '保证金查询'],
      msgs: ['1.用于企业用户查询保证金账户明细。', '2.点击账户链接显示保证金查询明细页面，显示保证金账户的详细信息。'],
      pageSize: 20,
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      tableHeadData: [
        {
          label: '账户名称',
          prop: 'zhhuzwmc'
        },
        {
          label: '账户类型',
          prop: 'kehuzhlx',
          formatter: (row, column, cellValue, index) => acc_type_entity[cellValue] || '未知'
        },
        {
          label: '账户',
          prop: 'kehuzhao',
          width: 150,
          clickEventName: 'on-account-click'
        },
        {
          label: '子账户序号',
          prop: 'zhhaoxuh'
        },
        {
          label: '币种',
          prop: 'huobdaih',
          formatter: (row, column, cellValue, index) => currency_type_entity[cellValue] || '未知'
        },
        {
          label: '账户余额',
          prop: 'zhanghye',
          width: 150,
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '可用余额',
          prop: 'keyongye',
          width: 150,
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '钞汇标志',
          prop: 'chaohubz',
          formatter: (row, column, cellValue, index) => chaohui_flag_entity[cellValue] || '未知'
        },
        {
          label: '开户网点',
          prop: 'kaihjigo'
        }
      ],
      tableData: []
    }
  },
  methods: {
    listQry () {
      httpPost('eweb-acmgmt.DepositAmountQry.do', {}).then(res => {
        this.tableData = res.acctInfoList || []
      })
    },
    accountClickHandler (row) {
      this.$router.push({ name: 'securityDepositDetails', params: row })
    }
  },
  created () {
    this.listQry()
  }
}
</script>
