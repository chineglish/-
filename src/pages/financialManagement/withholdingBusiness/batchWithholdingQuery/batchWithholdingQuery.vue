<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @submit="inquire"
        @reset="reset"
        >
      </m-new-form>
    </div>
    <div class="form-box" v-if="showResult">
      <d-table
        :table-data="tableData"
        :tableHeadData="tableHeadData"
        :pagesize="pagesize"
        @clickTableLink="clickTableLink"
        >
      </d-table>
    </div>
  </div>
</template>

<script>
/**
* @name: 批量代扣查询
* @author: 陈天浩
* @date: 2020-4.22
*/
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { Transaction_status, currency_type } from '@/assets/js/entity'
export default {
  name: 'batchWithholdingQuery',
  data () {
    return {
      showResult: false,
      breadData: ['财务管理', '代扣业务', '批量代扣查询'],
      formModel: {
        startDate: '',
        endDate: ''
      },
      formConfigJson: {
        rules: {
          startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                type: 'dateArea',
                label: '查询日期',
                valueFormat: 'yyyyMMdd',
                firstKey: 'startDate',
                secondKey: 'endDate'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      pageNo: 1,
      pagesize: 20,
      tableHeadData: [
        {
          label: '流水号',
          prop: 'serialNo',
          clickEventName: 'clickTableLink'
        },
        {
          label: '批次号',
          prop: 'batchNo'
        },
        {
          label: '账号',
          prop: 'acNo'
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
          label: '项目编号',
          prop: 'itemTypeNo'
        },
        {
          label: '项目名称',
          prop: 'itemTypeNo'
        },
        {
          label: '总笔数',
          prop: 'totalSum'
        },
        {
          label: '总金额',
          prop: 'amt',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '成功笔数',
          prop: 'succCount'
        },
        {
          label: '成功金额',
          prop: 'succAmt',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '交易日期',
          prop: 'trAcdt',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '交易时间',
          prop: 'trTime',
          formatter: (row, column, cellValue, index) => util.separationTime(cellValue)
        },
        {
          label: '交易状态',
          prop: 'stat',
          formatter: (row, column, cellValue, index) => util.handleEnums(Transaction_status, cellValue)
        },
        {
          label: '现金管理平台号',
          prop: 'cmsCorpNo'
        },
        {
          label: '企业名称',
          prop: 'corpCnName'
        },
        {
          label: '用户号',
          prop: 'userNo'
        },
        {
          label: '用户名',
          prop: 'userName'
        },
        {
          label: '摘要',
          prop: 'summary'
        },
        {
          label: '主机批次号',
          prop: 'hostBatchNo'
        },
        {
          label: '账簿号',
          prop: 'asAcNo'
        },
        {
          label: '账簿名',
          prop: 'asAcName'
        }
      ],
      tableData: []
    }
  },
  methods: {
    inquire (data) {
      this.formModel = data
      httpPost('/eweb-transfer.BatchWithholdingQry.do', {
        startDate: data.startDate,
        endDate: data.endDate
      }).then(res => {
        this.tableData = res.list
        this.showResult = true
      }).catch(e => {})
    },
    reset (res) {
      this.showResult = false
      this.tableData = []
      res.startDate = this.formModel.startDate
      res.endDate = this.formModel.endDate
      this.formModel = res
      // if (this.formModel.payerAccNoList.length > 0) {
      //   this.formModel.paymentAct = 0
      //   this.formConfigJson.formItems[0].group[0].options = this.formModel.payerAccNoList
      //   this.payerAcNo = this.formModel.payerAccNoList[0].acNo
      // }
    },
    clickTableLink (res) {
      let params = {
        ...res,
        serialNo: res.serialNo,
        batchNo: res.batchNo,
        trAcdt: res.trAcdt
      }
      httpPost('/eweb-transfer.BatchWithholdingDetailQry.do', params).then(res => {
        this.$router.push({
          name: 'batchWithholdingDetailsQuery',
          params: {
            ...res,
            startDate: this.formModel.startDate,
            endDate: this.formModel.endDate,
            trAcdt: this.tableHeadData.trAcdt
          }
        })
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel.startDate = this.$route.params.startDate
      this.formModel.endDate = this.$route.params.endDate
      this.inquire()
    }
    let filterDate = util.filterDate('1')
    this.formModel.startDate = util.standardDate(filterDate.startDate)
    this.formModel.endDate = util.standardDate(filterDate.endDate)
  }
}
</script>
