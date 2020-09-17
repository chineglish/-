<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :actionData="actionData"
              :pageNation="pageNation"
              @onBank="onBank">
      </d-table>
    </div>
  </div>
</template>
<script>
import PageNation from '@/components/d-table/PageNation'
import { httpPost } from '@/api/sys/http'
// import { stdinfotyp_Type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'billInfoDetailsResult',
  data () {
    return {
      breadData: ['电子商业汇票 ', '票据信息查询', '票据信息查询'],
      options: { // table属性
        border: true,
        stripe: true
      },
      tableHeadData: [
        { label: '交易发起方全称', prop: 'stdAppName' },
        { label: '交易接收方全称', prop: 'stdRcvName' },
        {
          label: '交易发起日期',
          prop: 'stdAppDate',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '交易结束期日',
          prop: 'stdRcrsDat',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '交易名称',
          prop: 'stdtrastat'
          // formatter: (row, column, cellValue, index) => util.handleEnums(stdinfotyp_Type, cellValue)
        }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'onBank'
        }
      ]
    }
  },
  methods: {
    onBank () {
      this.$router.push({
        name: 'billInfoTable',
        params: {
          res: this.list,
          acNo: this.acNo,
          stdBilStat: this.$route.params.stdBilStat,
          params: this.$route.params.params.params, // 查询条件
          pageNation: this.$route.params.params.pageNation // 分页信息
        }
      })
    },
    customerQry (params) {
      httpPost('/eweb-edraft.BillTransDetQry.do', params).then(res => {
        this.tableData = res.list
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    // if (this.$route.params) {
    //   this.tableData = this.$route.params.list
    // },
    this.list = this.$route.params.resList
    this.acNo = this.$route.params.acNo
    debugger
    this.routerObj = this.$route.params.params
    if (this.$route.params.res) {
      this.pageNation = new PageNation(20, 1, this.$route.params.res.stdTotalNum, (pageNum, size) => {
        this.routerObj.pageIndex = pageNum
        if (size) this.routerObj.pageSize = size
        this.customerQry(this.routerObj)
      })
      this.tableData = this.$route.params.res.list
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
