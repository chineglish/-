<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <d-table
              :table-data="tableData"
              :isPagination="true"
              :firstColIndex="firstColIndex"
              :tableHeadData="tableHeadData"
              :actionData="actionData"
              :pagesize="6"
              :operateData="operateData"
              @goDetails="goDetails"
              @enterSolo="enterSolo">
      </d-table>
    </div>
  </div>
</template>
<script>
import PageNation from '@/components/d-table/PageNation'
import { bill_Type } from '@/assets/js/entity'
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'recourseRecallApplyQuery',
  data () {
    return {
      breadData: ['电子商业汇票 ', '票据追索', '追索撤回'],
      operateData: {
        btnData: [
          { type: 'text', btnText: '详情', eventName: 'goDetails' }
        ]
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
        { label: '审核状态', prop: 'authState' }
      ],
      actionData: [
        {
          btnText: '申请',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'apply'
        }
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
            name: 'recourseRecallApplyQuery',
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
        name: 'recourseRecallApplyComfirmPre',
        params: {
          formModel: res, // 列表信息
          pageNation: this.pageNation, // 分页信息
          params: this.$route.params.params // 查询条件
        }
      })
    },
    // apply () {
    //   this.$router.push({
    //     name: 'pledgeApplyComfirm'
    //   })
    // },
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
        if (size) this.$route.params.params.pageSize = size
        this.customerQry(this.$route.params.params)
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

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
