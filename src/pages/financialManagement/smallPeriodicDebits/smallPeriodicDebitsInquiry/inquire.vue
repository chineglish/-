<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @changePayeeAcNo="changePayeeAcNo"
              @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
              @changeUp="changeUp"
              @submit="inquire"
              @reset="reset"
            >
            </m-new-form>
        </div>
        <div v-if="showResult" class="form-box">
            <d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              @clickTableLink="clickTableLink"
            >
            </d-table>
        </div>
        <m-hint-box :msgs="promptList"></m-hint-box>
    </div>
</template>

<script>
/**
  * @name: 小额定期借记业务查询
  * @author: 邓焕
  * @date: 2019-12-10
  */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: 'queryHistoricalPayrollRecords',
  data () {
    const processStateDesc = [
      { value: 'OK', label: '成功' },
      { value: 'FL', label: '失败' }
    ]
    return {
      payerAcNo: '', // 备选账号
      showResult: false,
      promptList: [
        '1.根据账号和时间范围，查询小额定期贷记交易记录，并可下载打印。不能做为转账凭证，需至柜面打印回单。',
        '2.可查看交易处理状态。'
      ],
      filename: __filename,
      breadData: ['财务管理', '小额定期借记业务查询'],
      formModel: {
        payeeAccNoList: [], // 存放账号列表
        paymentAct: '',
        startDate: '',
        endDate: '',
        paymentAmt: '',
        professionStatus: 'ALL'
      },
      formConfigJson: {
        rules: {
          startDate: [{ required: true, message: '请选择开始日期', trigger: 'submit' }],
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'submit' }],
          professionStatus: [{ required: true, message: '请选择交易状态', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                disabled: false,
                label: '收款账户',
                type: 'select',
                options: [],
                'changeEventName': 'changePayeeAcNo',
                trans: { value: 'showAcNo' },
                key: 'paymentAct'
              },
              {
                'disabled': false,
                'label': '支付金额',
                'type': 'input',
                inputType: 'money',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                'inputEventName': 'changeUp',
                'key': 'paymentAmt'
              },
              {
                disabled: false,
                label: '交易状态',
                type: 'select',
                options: [
                  { 'value': '全部', 'key': 'ALL' },
                  { 'value': '成功', 'key': 'OK' },
                  { 'value': '失败', 'key': 'FL' }
                ],
                key: 'professionStatus'
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
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      options: { // table属性
        border: true,
        stripe: true
      },
      tableHeadData: [
        { label: '交易日期', prop: 'transDate', formatter: (row, column, cellValue, index) => cellValue.substring(0, 10) },
        { label: '流水号', prop: 'globalJnlNo', clickEventName: 'clickTableLink', checkLink: (value, obj) => obj.processState === 'OK', width: '250' },
        { label: '交易金额', prop: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '交易笔数', prop: 'totalCount' },
        { label: '手续费', prop: 'feeAmount' },
        { label: '交易状态', prop: 'processState', formatter: (row, column, cellValue, index) => util.handleEnums(processStateDesc, cellValue) }
      ],
      operateData: {
        btnData: []
      },
      tableData: []
    }
  },
  methods: {
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.paymentAmt = util.limitInputMoney(res.paymentAmt)
    },
    inquire (data) {
      this.formModel = data
      // 发送接口重新查询
      httpPost('/eweb-transfer.SmallLimitBorrowRecordQuery.do', {
        startDate: data.startDate,
        endDate: data.endDate,
        payeeAcNo: this.payeeAcNo,
        amount: data.paymentAmt,
        trsState: data.professionStatus,
        type: 'borrow'
      }).then(res => {
        this.tableData = res.list
        this.showResult = true
      })
    },
    reset (res) {
      this.showResult = false
      this.tableData = []
      res.startDate = this.formModel.startDate
      res.endDate = this.formModel.endDate
      res.paymentAmtcopy = ''
      res.paymentAct = this.formModel.paymentAct
      this.formModel = res
    },
    clickTableLink (data) {
      httpPost('/eweb-transfer.SmallLimitBorrowQuery.do', {
        startDate: this.formModel.startDate,
        endDate: this.formModel.endDate,
        queryJnlNo: data.respTransRecordId
      }).then(res => {
        let _params = this.formModel
        Object.assign(_params, res)
        this.$router.push({
          name: 'smallPeriodicDebitsInquireDetail',
          params: {
            msg: _params,
            data: data,
            tableData: this.tableData
          }
        })
      })
    },
    // 选择账号
    changePayeeAcNo (data) {
      this.payeeAcNo = this.formModel.payeeAccNoList[data.paymentAct].acNo
    },
    getPayeeAccountList () {
      // SmallLimitLeadRecordQuery
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.formModel.payeeAccNoList = res.AcList || []
        this.formModel.payeeAccNoList.forEach(item => {
          item.showAcNo = util.getPayerAccount(item)
        })
        if (this.formModel.payeeAccNoList.length > 0) {
          this.payeeAcNo = this.formModel.payeeAccNoList[0].acNo
          this.formModel.paymentAct = 0
        }
        this.formConfigJson.formItems[0].group[0].options = this.formModel.payeeAccNoList
      })
    }
  },
  created () {
    if (this.$route.params.tableData) {
      this.showResult = true
      this.tableData = this.$route.params.tableData
      this.formModel = this.$route.params.formModel
      this.formConfigJson.formItems[0].group[0].options = this.formModel.payeeAccNoList
    } else {
      this.getPayeeAccountList()
      let filterDate = util.filterDate('1')
      this.formModel.startDate = filterDate.startDate
      this.formModel.endDate = filterDate.endDate
    }
  }
}
</script>
