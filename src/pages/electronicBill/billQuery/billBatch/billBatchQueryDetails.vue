<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <d-table
              :table-data="tableData"
              :options="options"
              :isPagination="true"
              :tableHeadData="tableHeadData"
              :pagesize="20"
              @batchQuery="batchQuery">
      </d-table>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { productName_Type } from '@/assets/js/entity'
export default {
  name: 'billBatchQueryDetails',
  data () {
    return {
      breadData: ['电子商业汇票 ', '票据信息查询', '票据批量查询'],
      options: { // table属性
        border: true,
        stripe: true
      },
      tableHeadData: [
        {
          label: '日期',
          prop: 'createDate',
          formatter: (row, column, cellValue, index) => {
            return cellValue.substring(0, 10)
          }
        },
        {
          label: '业务类型',
          prop: 'productName',
          formatter: (row, column, cellValue, index) => util.handleEnums(productName_Type, cellValue)
        },
        { label: '批次号', prop: 'globalJnlNo', clickEventName: 'batchQuery' }
      ],
      tableData: []
      // actionData: [
      //   {
      //     btnText: '查询',
      //     class: 'm-cancel-btn',
      //     type: 'info',
      //     eventName: 'query'
      //   }
      // ]
    }
  },
  methods: {
    batchQuery (res) {
      const params = {
        protocolNo: res.globalJnlNo,
        stdCustAcc: res.billAccount,
        productName: res.productName
      }
      httpPost('/eweb-edraft.BatchTransResultQry.do', params).then(res => {
        if (params.productName === '011') {
          this.$router.push({
            name: 'billBatchQueryResult',
            params: res
          })
        } else {
          this.$router.push({
            name: 'billBatchQueryResulta',
            params: res
          })
        }
      })
    }
  },
  created () {
    this.tableData = this.$route.params.list
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
