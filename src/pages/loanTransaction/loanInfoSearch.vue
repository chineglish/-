<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <div>
      <d-table
        :table-data="tableData"
        :options="options"
        :isPagination="true"
        :tableHeadData="tableHeadData"
        :infoTips="infoTips"
        columnKey="debitAmt"
        :pageNation="pageNation"
        :operate-data="operateData"
        @goDetail="goDetail"
      ></d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { currency_type } from '@/assets/js/entity'
import PageNation from '@/components/d-table/PageNation'
import util from '@/libs/util'
export default {
  name: 'loanInfoSearch',
  data: function () {
    return {
      totalCount: '',
      data: ['贷款业务', '贷款信息查询'],
      msgs: [
        '用于贷款信息查询功能，可以查看每笔贷款业务的明细。'
      ],
      pageNation: new PageNation(10, 1, 10, (currentRow) => {
        httpPost('/eweb-query.EloanInfoQuery.do', {
          pageIndex: currentRow * 6,
          pageSize: 6
        }).then(res => {
          // this.tableData = res.list
        }).catch(() => {
          this.$message({
            showClose: true,
            message: '获取数据失败',
            type: 'error'
          })
        })
      }),
      // 贷款账户状态 0=正常,1=销户,2=已核销,3=准销户,4=录入,5=已减免
      loanAcNoType: [
        { label: '正常', value: '0' },
        { label: '销户', value: '1' },
        { label: '已核销', value: '2' },
        { label: '准销户', value: '3' },
        { label: '录入', value: '4' },
        { label: '已减免', value: '5' }
      ],
      // 以下为动态数据
      tableHeadData: [
        { label: '贷款种类', prop: 'keepOrLendType' },
        { label: '账号', prop: 'loanAcNo' },
        // { label: '贷款金额', prop: 'debitAmt', sortable: true, formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        {
          label: '币种',
          prop: 'currency',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        // { label: '贷款本金余额', prop: 'balance', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '金额', prop: 'balance', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '到期日期', prop: 'eloanEndDate', sortable: 'custom', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        {
          label: '账户状态',
          prop: 'loanAcNoType',
          formatter: (row, column, cellValue, index) => util.handleEnums(this.loanAcNoType, cellValue)
        }
      ],
      tableData: [],
      options: { // table属性
        border: true,
        stripe: true
      },
      infoTips: [ // 信息提示
      ],
      firstColIndex: {
        type: 'selection',
        eventName: ''
      },
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '详情',
            eventName: 'goDetail'
          }
        ]
      }
    }
  },
  methods: {
    goDetail (data) {
      httpPost('/eweb-query.EloanAcNoInfoQuery.do', {
        loanAcNo: data.data.loanAcNo,
        loanTermSerialNum: data.data.loanTermSerialNum
      }).then(res => {
        this.$router.push({
          name: 'loanDetail',
          params: { formModel: res }
        })
      })
    },
    tableMsg () {
      httpPost('/eweb-query.EloanInfoQuery.do', {
        pageIndex: 1,
        pageSize: 20
      }).then(res => {
        this.tableData = res.list
        this.totalCount = res.totalCount
        this.pageNation = new PageNation(20, 1, res.totalCount, (currentRow, size) => {
          if (size) this.pageSize = size
          httpPost('/eweb-query.EloanInfoQuery.do', {
            pageIndex: ((currentRow - 1) * size + 1),
            pageSize: size
          }).then(res => {
            this.tableData = res.list
          }).catch(() => {
            this.$message({
              showClose: true,
              message: '获取数据失败',
              type: 'error'
            })
          })
        })
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '获取数据失败',
          type: 'error'
        })
      })
    }
  },
  created () {
    this.tableMsg()
  }
}
</script>
