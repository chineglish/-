<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
        <d-table
          :tableData="tableData"
          :firstColIndex = "firstColIndex"
          :tableHeadData="tableHeadData"
          :pagesize="20"
          @account="account"
        ></d-table>
      <m-hint-box :msgs="msgs"></m-hint-box>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { currency_type, acc_status, acc_type, chaohui_flag, saveDate } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'regularDraw',
  data () {
    return {
      breadData: ['理财服务', '定活互转', '定期支取'],
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      tableHeadData: [
        { label: '账户名称', prop: 'acName', width: '250' },
        {
          label: '账户类型',
          prop: 'kehuzhlx',
          width: '120',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_type, cellValue)
        },
        { label: '账号', prop: 'lDAcNo', width: '150', clickEventName: 'account' },
        { label: '子账户序号', prop: 'subAcNo', width: '100' },
        { label: '币种',
          prop: 'currencyCode',
          width: '80',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '开户金额',
          prop: 'openAmount',
          width: '160px',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '可用余额',
          prop: 'actBal',
          width: '160px',
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
      msgs: ['1.已经在柜面打印证实书（存单）的定期存款，不能通过此交易支取定期存款。'],
      tableData: [],
      messageType: {
        '3M': '三个月',
        '6M': '六个月',
        '1Y': '一年',
        '2Y': '两年',
        '3Y': '三年',
        '5Y': '五年'
      }
    }
  },
  mounted () {
    this.getRegularList(this.currentPage, true)
  },
  methods: {
    account (data) {
      httpPost('/eweb-invest.PeriodicQuery.do', { acNo: data.lDAcNo }).then(res => {
        if (res && Array.isArray(res.acctInfoList) && res.acctInfoList.length > 0) {
          this.$router.push({
            name: 'innerRegularDraw',
            params: { ...data, ...res.acctInfoList[0] }
          })
        }
      })
    },
    getRegularList (currentPage, isFirst) {
      const params = {
        bgnCnt: '1',
        inqrngCnt: this.pageSize,
        withdrawFlg: '1'
      }
      httpPost('/eweb-invest.PeriodicWithdrawalList.do', params).then(res => {
        if (res && Array.isArray(res.acctInfoList)) {
          this.tableData = res.acctInfoList
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
