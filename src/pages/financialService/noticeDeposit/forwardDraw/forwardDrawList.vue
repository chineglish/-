<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <d-table
          :table-data="tableData"
          :tableHeadData="tableHeadData"
          :firstColIndex = "firstColIndex"
          :pagesize="pagesize"
          @accountBtn="accountBtn"
      >
      </d-table>
      <m-hint-box :msgs="msgs"></m-hint-box>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { currency_type, chaohui_flag, acc_type, acc_status, saveDate } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'forwardDrawList',
  data () {
    return {
      pagesize: 20,
      filename: __filename,
      breadData: ['理财服务', '通知存款', '通知存款支取'],
      msgs: [
        '1.本交易提供客户通过网上银行办理本公司的活期账户资金转存通知存款。',
        '2.单位通知存款是在存款时不约定存期，支取时需提前通知银行，根据通知存款类型约定支取存款日期。',
        '3.人民币账户通知存款开户，最低起存金额为五十万元。',
        '4.网上办理活期存款转通知款成功后，如需要单位通知存款证实书，到转出活期存款账户的开户网点办理领取单位通知存款证实书手续。取得单位通知存款证实书的网上活期存款转存的通知存款，不能再通过网上银行办理通知存款转活期存款，只能到开户网点办理相关支取手续。'
      ],
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
        { label: '账号', prop: 'lDAcNo', width: '150', clickEventName: 'accountBtn' },
        { label: '子账户序号', prop: 'subAcNo', width: '100' },
        { label: '币种',
          prop: 'currencyCode',
          width: '80',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '开户金额',
          prop: 'openAmount',
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
      operateData: {
        btnData: []
      },
      tableData: [],
      messageType: {
        '1D': '一天',
        '7D': '七天'
      }
    }
  },
  methods: {
    inquire (res) {
    },
    accountBtn (res) {
      this.$router.push({
        name: 'innerDraw',
        params: {
          tableData: this.tableData,
          item: res
        }
      })
    }
  },
  mounted () {
    if (this.$route.params) {
      this.tableData = this.$route.params.tableData
    }
    let params = {
      bgnCnt: 0,
      inqrngCnt: 9999,
      withdrawFlg: '1'
    }
    httpPost('/eweb-invest.DepositWithdrawList.do', params).then(res => {
      this.tableData = res.acctInfoList
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
