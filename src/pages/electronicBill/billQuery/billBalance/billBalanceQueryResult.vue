<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :formModel="formModel">
      </m-new-form>
      <d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :actionData="actionData"
              :pageNation="pageNation"
              @InQuery="InQuery"
              @back="back">
      </d-table>
    </div>
  </div>
</template>
<script>
import PageNation from '@/components/d-table/PageNation'
import { httpPost } from '@/api/sys/http'
import { bill_Type, status_type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'billBalanceQueryResult',
  data () {
    return {
      formModel: {
        totalMoney: ''
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '汇总金额',
                'type': 'text',
                'key': 'totalMoney',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      },
      breadData: ['电子商业汇票 ', '票据信息查询', '票据余额查询'],
      tableHeadData: [
        { label: '票据号码', prop: 'stdbillnum', clickEventName: 'InQuery' },
        {
          label: '票据类型',
          prop: 'stdbilltyp',
          width: '80px',
          formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, cellValue)
        },
        {
          label: '出票日期',
          prop: 'stdissdate',
          width: '120px',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '到期日',
          prop: 'stdduedate',
          width: '120px',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '票面金额',
          prop: 'stdpmmoney',
          // sortable: 'custom',
          width: '180px',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '出票人名称', prop: 'stddrwrnam' },
        { label: '收款人名称', prop: 'stdpyeenam' },
        {
          label: '交易发起人',
          prop: 'reqName',
          show: false
        },
        {
          label: '交易接收人',
          prop: 'rcvName',
          show: false
        },
        {
          label: '票据状态',
          prop: 'status',
          show: false,
          formatter: (row, column, cellValue, index) => util.handleEnums(status_type, cellValue)
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
      ],
      routerObj: {},
      pageNation: null
    }
  },
  methods: {
    goDetails (data) {
      const params = {
        stdBillNum: data.stdbillnum
      }
      httpPost('/eweb-edraft.BillFaceQry.do', params).then(res => {
        this.$router.push({
          name: 'billFace',
          params: {
            res,
            name: 'billBalanceQueryResult',
            pageNation: this.pageNation, // 分页信息
            params: this.$route.params.params // 查询条件
          }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    back () {
      this.$router.push({
        name: 'billBalanceQuery'
      })
    },
    // 票据正面按钮
    InQuery (data) {
      const params = {
        stdBillNum: data.stdbillnum
      }
      httpPost('/eweb-edraft.BillFaceQry.do', params).then(res => {
        this.$router.push({
          name: 'billInfoFront',
          params: {
            res,
            acNo: this.acNo,
            params: this.$route.params.params,
            pageNation: this.pageNation // 分页信息
          }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    customerQry (params) {
      httpPost('/eweb-edraft.BillBalanceQry.do', params).then(res => {
        this.tableData = res.list
        this.formModel.totalMoney = res.totalMny
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.acNo = this.$route.params.acNo
    this.routerObj = this.$route.params.params
    if (this.$route.params.res) {
      this.pageNation = new PageNation(20, 1, this.$route.params.res.totalAmt, (pageNo, size) => {
        this.$route.params.params.pageIndex = pageNo
        if (size) this.$route.params.params.pageSize = size
        this.customerQry(this.$route.params.params)
      })
      this.tableData = this.$route.params.res.list
      // 判断持票余额 显示 交易发起人， 交易接收人，票据状态 字段
      if (this.$route.params.params.stdQryCont === '04') {
        this.tableHeadData[7].show = true
        this.tableHeadData[8].show = true
        this.tableHeadData[9].show = true
      }
      this.formModel.totalMoney = this.$route.params.res.totalMny
    }
    if (this.$route.params.pageNation) {
      this.pageNation = new PageNation(this.$route.params.pageNation.pageSize,
        this.$route.params.params.pageIndex, this.$route.params.pageNation.totalCount, (pageNo) => {
          this.$route.params.params.pageIndex = pageNo
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
