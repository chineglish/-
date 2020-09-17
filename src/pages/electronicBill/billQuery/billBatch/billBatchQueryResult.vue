<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <d-table
              :table-data="tableData"
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
import { bill_Type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'billBatchQueryResult',
  data () {
    return {
      breadData: ['电子商业汇票 ', '票据信息查询', '票据批量查询'],
      tableHeadData: [
        {
          label: '票据类型',
          prop: 'stdbilltyp',
          formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, cellValue)
        },
        {
          label: '出票日期',
          prop: 'stdissdate',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '到期日',
          prop: 'stdduedate',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        { label: '出票人', prop: 'stddrwrnam' },
        { label: '承兑人', prop: 'stdaccpnam' },
        { label: '收款人', prop: 'stdpyeenam' },
        {
          label: '金额',
          prop: 'stdpmmoney',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '业务类型',
          prop: 'transName'
        },
        { label: '交易状态',
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
