<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <d-table
              :table-data="tableData"
              :options="options"
              :isPagination="true"
              :tableHeadData="tableHeadData"
              :actionData="actionData"
              :pagesize="6"
              @back="back">
      </d-table>
    </div>
  </div>
</template>
<script>
import { transName_type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'billBatchQueryResulta',
  data () {
    return {
      breadData: ['电子商业汇票 ', '票据信息查询', '票据批量查询'],
      options: { // table属性
        border: true,
        stripe: true
      },
      tableHeadData: [
        {
          label: '票据号码',
          prop: 'electricDraftId'
        },
        {
          label: '申请日期',
          prop: 'reqDate',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '申请人',
          prop: 'reqName'
        },
        { label: '业务类型',
          prop: 'msgType',
          formatter: (row, column, cellValue, index) => util.handleEnums(transName_type, cellValue)
        },
        { label: '详细结果',
          prop: 'errMsg'
        }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'back'
        }
      ]
    }
  },
  methods: {
    back () {
      this.$router.push({
        name: 'billBatchQuery'
      })
    }
  },
  created () {
    this.tableData = this.$route.params.bills
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
