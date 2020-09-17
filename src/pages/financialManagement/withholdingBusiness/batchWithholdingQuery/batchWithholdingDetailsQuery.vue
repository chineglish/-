<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <d-table
      :tableHeadData="tableHeadData"
      :table-data="tableData"
      :actionData="actionData"
      @back="back"
      >
    </d-table>
  </div>
</template>
<script>
import { currency_type } from '@/assets/js/entity'
import util from '@/libs/util'
const stat = {
  '6': '失败',
  '9': '成功'
}

export default {
  name: 'batchWithholdingDetailsQuery',
  data () {
    return {
      breadData: ['财务管理', '代扣业务', '批量代扣明细查询'],
      tableHeadData: [
        {
          label: '序号',
          prop: 'seqNo'
        },
        {
          label: '账号',
          prop: 'acNo',
          width: '170px'
        },
        {
          label: '币种',
          prop: 'curCode',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '户名',
          prop: 'acName'
        },
        {
          label: '金额',
          prop: 'amt',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '备注',
          prop: 'summary'
        },
        {
          label: '交易日期',
          prop: 'trAcdt',
          width: '100px',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '交易时间',
          prop: 'trTime',
          formatter: (row, column, cellValue, index) => util.separationTime(cellValue)
        },
        {
          label: '状态',
          prop: 'stat',
          formatter: (row, column, cellValue, index) => stat[cellValue]
        },
        {
          label: '交易信息',
          prop: 'errMsg'
        },
        {
          label: '批次号',
          prop: 'batchNo'
        }
      ],
      actionData: [
        {
          btnText: '返回',
          type: 'info',
          class: 'm-cancel-btn',
          eventName: 'back'
        }
      ],
      tableData: []
    }
  },
  methods: {
    back (data) {
      this.$router.push({
        name: 'batchWithholdingQuery',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params) {
      // Object.assign(this.tableData, this.$route.params)
      this.tableData = this.$route.params.list
    }
  }
}
</script>
