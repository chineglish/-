/* eslint-disable indent */
<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <d-table
              :table-data="tableData"
              :firstColIndex="firstColIndex"
              @handleCurrentChange="tableSelectChange"
              :tableHeadData="tableHeadData"
              :actionData="actionData"
              :pageNation="pageNation"
              @enterSolo="enterSolo"
              @InQuery="InQuery">
      </d-table>
    </div>
  </div>
</template>
<script>
import PageNation from '@/components/d-table/PageNation'
import { httpPost } from '@/api/sys/http'
import { bill_Type, transStatus_type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'billInfoQueryList',
  data () {
    return {
      breadData: ['电子商业汇票 ', '票据信息查询', '票据信息查询'],
      pageNation: null,
      firstColIndex: {
        type: 'radio',
        eventName: ''
      },
      tableHeadData: [
        { label: '票据号码', prop: 'stdBillNum', width: '180', clickEventName: 'enterSolo' },
        {
          label: '票据类型',
          prop: 'stdBillTyp',
          width: '80',
          formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, cellValue)
        },
        {
          label: '出票日期',
          prop: 'stdIssDate',
          width: '120',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '到期日',
          prop: 'stdDueDate',
          width: '120',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '票面金额',
          prop: 'stdPmMoney',
          width: '180',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '交易发起人',
          prop: 'reqName',
          width: '200'
        },
        {
          label: '交易接收人',
          prop: 'rcvName',
          width: '200'
        },
        {
          label: '出票人名称',
          prop: 'stdDrwrNam',
          width: '200'
        },
        {
          label: '收款人名称',
          prop: 'stdPyeeNam',
          width: '200'
        },
        {
          label: '承兑人名称',
          prop: 'stdAccpNam',
          width: '200'
        },
        { label: '票据状态', prop: 'transName', width: '80' },
        {
          label: '交易状态',
          prop: 'transStatus',
          width: '80',
          formatter: (row, column, cellValue, index) => util.handleEnums(transStatus_type, cellValue)
        }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '票据正面',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'InQuery'
        }
      ],
      routerObj: {}
    }
  },
  methods: {
    tableSelectChange (selection) {
      // 监听表格选择事件触发
      this.selected = selection
    },
    enterSolo (res) {
      console.log(res)
      const params = {
        stdBillNum: res.stdbillnum
      }
      httpPost('/eweb-edraft.BillResultQuery.do', params).then(res => {
        this.$router.push({
          name: 'billInfoQueryResult',
          params: {
            res,
            acNo: this.acNo,
            pageNation: this.pageNation, // 分页信息
            params: this.$route.params.params // 查询条件
          }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    // 票据正面按钮
    InQuery () {
      const params = {
        stdBillNum: this.selected.stdBillNum
      }
      httpPost('/eweb-edraft.BillFaceQry.do', params).then(res => {
        this.$router.push({
          name: 'billInfoTable',
          params: {
            res,
            acNo: this.acNo,
            params: this.$route.params.params, // 查询条件
            pageNation: this.pageNation // 分页信息
          }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    customerQry (params) {
      httpPost('/eweb-edraft.BillOperateResultQry.do', params).then(res => {
        this.tableData = res.list
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.acNo = this.$route.params.acNo
    this.routerObj = this.$route.params.params
    if (this.$route.params.res) {
      this.pageNation = new PageNation(20, 1, this.$route.params.res.stdTotalNum, (pageNum, size) => {
        this.routerObj.pageIndex = pageNum
        if (size) this.routerObj.pageSize = size
        this.customerQry(this.routerObj)
      })
      this.tableData = this.$route.params.res.list
    }
    if (this.$route.params.pageNation) {
      this.pageNation = new PageNation(this.$route.params.pageNation.pageSize,
        this.$route.params.params.pageIndex, this.$route.params.pageNation.totalCount, (pageNo, size) => {
          this.$route.params.params.pageIndex = pageNo
          if (size) this.$route.params.params.pageSize = size
          this.customerQry(this.$route.params.params)
        })
      this.customerQry(this.$route.params.params)
    }
  }
}
</script>
