<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <d-table
        :table-data="tableData"
        :pageNation="pageNation"
        :firstColIndex = "firstColIndex"
        :defaultSort="defaultSort"
        :tableHeadData="tableHeadData"
        @batChildNum = "batChildNum"
      ></d-table>
      <m-hint-box :msgs="msgs"></m-hint-box>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { currency_type, acc_status, acc_type, chaohui_flag, saveDate } from '@/assets/js/entity'
import PageNation from '@/components/d-table/PageNation'
import util from '@/libs/util'

export default {
  name: 'regularQuery',
  data () {
    return {
      pageSize: 20,
      currentPage: 1,
      pageNation: null,
      breadData: ['理财服务', '定活互转', '定期存款查询'],
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      defaultSort: {
        prop: 'openAmount',
        order: 'descending'
      },
      tableHeadData: [
        { label: '账户名称', prop: 'acName', width: '250' },
        {
          label: '账户类型',
          prop: 'kehuzhlx',
          width: '120',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_type, cellValue)
        },
        { label: '账号', prop: 'lDAcNo', width: '150', clickEventName: 'batChildNum' },
        { label: '子账户序号', prop: 'subAcNo', width: '100' },
        { label: '币种',
          prop: 'currencyCode',
          width: '80',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '开户金额',
          prop: 'openAmount',
          sortable: 'custom',
          width: '140px',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '可用余额',
          prop: 'actBal',
          width: '140px',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '钞汇标志',
          prop: 'cashFlag',
          formatter: (row, column, cellValue, index) => util.handleEnums(chaohui_flag, cellValue)
        },
        {
          label: '存期',
          prop: 'cunqiiii',
          width: '50',
          formatter: (row, column, cellValue, index) => util.handleEnums(saveDate, cellValue)
        },
        {
          label: '账户状态',
          prop: 'actStatus',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_status, cellValue)
        }
      ],
      msgs: ['用于企业用户查询定期账户明细。'],
      tableData: []
    }
  },
  methods: {
    // 获取查询列表
    getRegularList (currentPage, isFirst) {
      let vm = this
      const params = {
        bgnCnt: (currentPage - 1) * this.pageSize,
        inqrngCnt: this.pageSize
      }
      httpPost('/eweb-invest.PeriodicWithdrawalList.do', params).then(res => {
        vm.tableData = res.acctInfoList
        if (isFirst) {
          this.pageNation = new PageNation(this.pageSize, currentPage, res.totalNum, (currentPage, size) => {
            if (size) params.pageSize = size
            this.getRegularList(currentPage, params.totalNum, params.pageSize)
          })
        }
      })
    },
    batChildNum (data) {
      const params = {
        acNo: data ? data.lDAcNo : ''
      }
      httpPost('/eweb-invest.PeriodicQuery.do', params).then(res => {
        if (res && Array.isArray(res.acctInfoList) && res.acctInfoList.length > 0) {
          this.$router.push({
            name: 'regularQueryDetails',
            params: { ...res, ...res.acctInfoList[0] }
          })
        }
      })
    }
  },
  mounted () {
    this.getRegularList(this.currentPage, true)
  }
}
</script>

<style lang="scss" scoped>
</style>
