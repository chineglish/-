<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <d-table
                    :table-data="tableData"
                    :firstColIndex="firstColIndex"
                    :pageNation="pageNation"
                    :tableHeadData="tableHeadData"
                    :actionData="actionData"
                    :operateData="operateData"
                    @goDetails="goDetails"
                    @add="add"
                    @enterSolo="enterSolo"
                    @handleSelectionChange="handleSelectionChange"
            >
            </d-table>
        </div>
    </div>
</template>
<script>
/**
     *@name: 被背书应答
     */
import PageNation from '@/components/d-table/PageNation'
import util from '@/libs/util'
import { bill_Type, endorse_Type } from '@/assets/js/entity'
import { httpPost } from '@/api/sys/http'
export default {
  name: 'EndorsementTransferReplyInquire',
  data () {
    return {
      breadData: ['电子商业汇票 ', '背书转让', '被背书应答'],
      operateData: {
        btnData: [
          { type: 'text', btnText: '详情', eventName: 'goDetails' }
        ]
      },
      firstColIndex: {
        type: 'selection',
        selectable: (row) => row.authQueue === '1'
      },
      tableHeadData: [
        { label: '票据号码', prop: 'stdBillNum', clickEventName: 'enterSolo', checkLink: (value, row) => row.authQueue === '1', width: '150px' },
        { label: '票据类型',
          prop: 'stdBillTyp',
          formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, cellValue) },
        { label: '出票日期', prop: 'stdIssDate', sortable: 'custom', width: '120px', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '到期日', prop: 'stdDueDate', sortable: 'custom', width: '120px', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '票面金额', prop: 'stdPmMoney', sortable: 'custom', width: '120px', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '出票人名称', prop: 'stdDrwrNam', width: '150px' },
        { label: '收款人名称', prop: 'stdPyeeNam', width: '150px' },
        { label: '承兑人名称', prop: 'stdAccpNam', width: '150px' },
        { label: '转让标记', prop: 'stdEndOrmk', formatter: (row, column, cellValue, index) => util.handleEnums(endorse_Type, cellValue) },
        { label: '审核状态', prop: 'authState' }
      ],
      tableData: [
      ],
      actionData: [
        { btnText: '申请', class: 'm-submit-btn', type: 'info', eventName: 'add' }
      ]
    }
  },
  methods: {
    goDetails (data) {
      const params = {
        stdBillNum: data.data.stdBillNum
      }
      httpPost('/eweb-edraft.BillFaceQry.do', params).then(res => {
        this.$router.push({
          name: 'billFace',
          params: {
            res,
            name: 'EndorsementTransferReplyInquire',
            pageNation: this.pageNation, // 分页信息
            params: this.$route.params.params // 查询条件
          }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    enterSolo (res) {
      this.$router.push({
        name: 'EndorsementTransferReplySolo',
        params: {
          formModel: res, // 列表信息
          pageNation: this.pageNation, // 分页信息
          params: this.$route.params.params // 查询条件
        }
      })
    },
    handleSelectionChange (selection) {
      this.selection = selection
    },
    add (data) {
      this.selection.forEach(item => {
        item.amount = item.stdPmMoney
      })
      let params = {
        list: this.selection
      }
      httpPost('/eweb-edraft.ToTalAmount.do', params).then(res => {
        this.$router.push({
          name: 'EndorsementTransferReplyDetail',
          params: {
            formModel: this.selection,
            pageNation: this.pageNation, // 分页信息
            params: this.$route.params.params, // 查询条件
            amount: res.totalAmount
          }
        })
      })
    },
    customerQry (params) {
      httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
        this.tableData = res.list
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    if (this.$route.params.res) {
      this.pageNation = new PageNation(20, 1, this.$route.params.res.stdTotalNum, (pageNo, size) => {
        this.$route.params.params.pageIndex = pageNo
        if (size) { this.$route.params.params.pageSize = size }
        this.customerQry(this.$route.params.params)
      })
      this.tableData = this.$route.params.res.list
    }
    if (this.$route.params.pageNation) {
      this.pageNation = new PageNation(this.$route.params.pageNation.pageSize,
        this.$route.params.params.pageIndex, this.$route.params.pageNation.totalCount, (pageNo, size) => {
          this.$route.params.params.pageIndex = pageNo
          if (size) { this.$route.params.params.pageSize = size }
          this.customerQry(this.$route.params.params)
        })
      this.customerQry(this.$route.params.params)
    }
  }
}
</script>

<style scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
</style>
