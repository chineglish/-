<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <d-table
        :table-data="tableData"
        :tableHeadData="tableHeadData"
        :firstColIndex="firstColIndex"
        @batChildNum="batChildNum"
        :pagesize="pagesize"
      >
      </d-table>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, acc_status } from '@/assets/js/entity'
// import PageNation from '@/components/d-table/PageNation'

export default {
  name: 'noticeFinding',
  data () {
    return {
      // totals: null,
      // currentPage: 1,
      pagesize: 20,
      filename: __filename,
      breadData: ['理财服务', '通知存款', '通知存款账户查询'],
      options: { // table属性
        border: true,
        stripe: true
      },
      firstColIndex: {
        type: 'index',
        eventName: ''
      },
      pageNation: {},
      tableHeadData: [
        { label: '账户', prop: 'lDAcNo', clickEventName: 'batChildNum' },
        { label: '账户名称', prop: 'acName' },
        { label: '账户类型', prop: 'acType', formatter: (row, column, cellValue, index) => this.accType[cellValue] },
        { label: '子账户序号', prop: 'subAcNo', width: 110 },
        { label: '币种',
          prop: 'currencyCode',
          formatter: (row, column, cellValue, index) => {
            let coinType = currency_type.find(item => item.value === cellValue)
            if (coinType != null) return coinType.label
          },
          width: 80
        },
        { label: '余额',
          prop: 'actBal',
          width: 150,
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '可用余额',
          prop: 'availBal',
          width: 150,
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '钞汇标志', prop: 'cashFlag', formatter: (row, column, cellValue, index) => this.rmbType[cellValue] },
        { label: '通知类型', prop: 'depositTerm', formatter: (row, column, cellValue, index) => this.messageType[cellValue] },
        { label: '账户状态',
          prop: 'actStatus',
          formatter: (row, column, cellValue, index) => {
            let acState = acc_status.find(item => item.value === cellValue)
            if (acState != null) return acState.label
          }
        }
      ],
      tableData: [],
      rmbType: {
        '0': '现钞',
        '1': '现汇',
        'N': '无'
      },
      accType: {
        '0': '对公一般账户',
        '1': '卡',
        '2': '活期一本通',
        '3': '定期一本通',
        '4': '活期存折',
        '5': '存单',
        '7': '股金账户',
        '8': '贷款账户',
        '9': '内部账',
        'A': '组合账户',
        'B': '一号通 ',
        'F': '个人一本通存折',
        'G': '国债',
        'N': '电子储蓄国债',
        'X': '待销账',
        'K': '会计账户',
        'D': '电子账户',
        'J': '快捷账户'
      },
      messageType: {
        '1D': '一天',
        '7D': '七天'
      }
    }
  },
  methods: {
    batChildNum (res) {
      this.$router.push({
        name: 'noticeFindDetailsQuery',
        params: {
          tableData: this.tableData,
          lDAcNo: res.lDAcNo
        }
      })
    },
    getData () {
      // 后台分页
      // let params = {
      //   bgnCnt: (this.currentPage - 1) * 5,
      //   inqrngCnt: 5
      // }
      // httpPost('eweb-invest.DepositWithdrawList.do', params).then(res => {
      //   if (this.totals === null) {
      //     this.pageNation = new PageNation(5, this.currentPage, res.acctInfoCount, (pageNo) => {
      //       this.pageNation.currentPage = pageNo
      //       this.currentPage = pageNo
      //     })
      //   }
      //   this.totals = res.acctInfoCount
      // })
    }
  },
  mounted () {
    // this.getData()
    if (this.$route.params) {
      this.tableData = this.$route.params.tableData
    }
    let params = {
      bgnCnt: 0,
      inqrngCnt: 9999
    }
    httpPost('eweb-query.ManageDepositQry.do', params).then(res => {
      this.tableData = res.acctInfoList
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
