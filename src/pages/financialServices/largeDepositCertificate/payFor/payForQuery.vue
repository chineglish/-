<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <d-table
        :table-data="tableData"
        :firstColIndex="firstColIndex"
        :tableHeadData="tableHeadData"
        @handleCurrentChange="tableSelectChange"
        :actionData="actionData"
        :pagesize="20"
        @clickAccount="clickAccount"
        @payFor="payFor">
      </d-table>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, chaohui_flag, acc_type, acc_status } from '@/assets/js/entity'
export default {
  name: 'payForQuery',
  data () {
    return {
      breadData: ['理财服务', '大额存单', '单位大额存单转让查询'],
      firstColIndex: {
        type: 'radio',
        label: '操作'
      },
      tableHeadData: [
        { label: '账户名称', prop: 'zhhuzwmc', width: '250' },
        {
          label: '账户类型',
          prop: 'kehuzhlx',
          width: '120',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_type, cellValue)
        },
        { label: '账号', prop: 'kehuzhao', width: '150', clickEventName: 'clickAccount' },
        { label: '子账户序号', prop: 'zhhaoxuh', width: '100' },
        {
          label: '币种',
          prop: 'currencyCode',
          width: '80',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '开户金额',
          prop: 'openAmount',
          width: '140',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '可用余额',
          prop: 'zhanghye',
          width: '140',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '年利率(%)',
          prop: 'zhxililv',
          width: '100' },
        {
          label: '钞汇标志',
          prop: 'chaohubz',
          formatter: (row, column, cellValue, index) => util.handleEnums(chaohui_flag, cellValue)
        },
        {
          label: '账户状态',
          prop: 'zhhuztai',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_status, cellValue)
        }
      ],
      tableData: [],
      actionData: [
        { btnText: '转让', class: 'm-submit-btn', eventName: 'payFor' }
      ]
    }
  },
  methods: {
    tableSelectChange (selection) {
      // 监听表格选择事件触发
      this.selected = selection
    },
    // 单位大额转让详情
    clickAccount (data) {
      httpPost('/eweb-largeDeposit.EntLargeDepositDetailQry.do', {
        lDAcNo: data.lDAcNo,
        subAcNo: data.subAcNo
      }).then(res => {
        Object.assign(res, data)
        this.$router.push({
          name: 'payForQueryDetail',
          params: res
        })
      }).catch(err => {
        console.error(err)
      })
    },
    // 列表查询
    payForQuery () {
      httpPost('/eweb-largeDeposit.EntLargeDepositQry.do', { qryType: '2' }).then(res => {
        this.tableData = res.list
      }).catch(err => {
        console.error(err)
      })
    },
    // 转让按钮
    payFor () {
      httpPost('/eweb-largeDeposit.EntLargeDepositAssignApplyDetailQry.do', {
        lDAcNo: this.selected.lDAcNo,
        subAcNo: this.selected.subAcNo
      }).then(res => {
        this.$router.push({
          name: 'payForInner',
          params: { res }
        })
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.payForQuery()
  }
}
</script>
