<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
			<div class="form-box">
				<m-new-form
          :componentJson="tableFormData"
          :formModel="tableFormModel"
				></m-new-form>
				<d-table
          :table-data="tableData"
          :tableHeadData="tableHeadData"
          :actionData="actionData"
          @download="download"
          @handleBack="handleBack"
				></d-table>
			</div>
    </div>
</template>

<script>
/**
* @name: 小额定期借记业务查询
* @author: 邓焕
* @date: 2019-12-10
*/
import { downloadFile } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: 'queryPayrollDetailRecords',
  data () {
    const businesssStateDesc = [
      { value: '1', label: '成功发送' },
      { value: '2', label: '发送失败' },
      { value: '3', label: '处理中' },
      { value: '4', label: '全部' }
    ]
    const receipStateDesc = [
      { value: '1', label: '已付款' },
      { value: '2', label: '未付款' },
      { value: '3', label: '未回执' },
      { value: '4', label: '全部' }
    ]
    return {
      tableFormModel: {
        paymentAct: '',
        startDate: '',
        endDate: ''
      },
      breadData: ['财务管理', '小额定期借记业务查询'],
      tableFormData: {
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '20%',
            group: [
              {
                'disabled': false,
                'label': '收款账户',
                'type': 'text',
                'key': 'showAcNo'
              },
              {
                type: 'dateArea',
                label: '查询日期',
                changeEventName: 'changeDate',
                firstKey: 'startDate',
                secondKey: 'endDate'
              }
            ]
          }
        ]
      },
      tableHeadData: [
        { label: '交易日期', prop: 'transDate' },
        { label: '交易金额', prop: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '发放业务状态', prop: 'borrowBusinessState', formatter: (row, column, cellValue, index) => util.handleEnums(businesssStateDesc, cellValue) },
        { label: '回执状态', prop: 'receiptState', formatter: (row, column, cellValue, index) => util.handleEnums(receipStateDesc, cellValue) }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '下载',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'download'
        },
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'handleBack'
        }
      ]
    }
  },
  methods: {
    download () {
      downloadFile('/eweb-transfer.SmallLimitBorrowDownload.do', {
        startDate: this.tableFormModel.startDate,
        endDate: this.tableFormModel.endDate,
        queryJnlNo: this.tableFormModel.queryJnlNo,
        acNo: this.$route.params.msg.payeeAccNoList[this.$route.params.msg.paymentAct].acNo,
        Download: 'xls'
      })
    },
    handleBack () {
      let tableDataLast = this.$route.params.tableData
      let formModel = this.$route.params.msg
      this.$router.push({
        name: 'smallPeriodicDebitsInquire',
        params: {
          tableData: tableDataLast,
          formModel: formModel
        }
      })
    }
  },
  created () {
    if (this.$route.params) {
      this.tableFormModel.queryJnlNo = this.$route.params.data.respTransRecordId
      this.tableFormModel.paymentAct = this.$route.params.msg.paymentAct
      this.tableFormModel.showAcNo = this.$route.params.msg.payeeAccNoList[this.$route.params.msg.paymentAct].showAcNo
      this.tableFormModel.startDate = this.$route.params.msg.startDate
      this.tableFormModel.endDate = this.$route.params.msg.endDate
      this.tableData = this.$route.params.msg.list
    }
  }
}
</script>
