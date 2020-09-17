<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @selctDate="selctDate"
              @changeDate="changeDate"
              @submit="inquire"
              @reset="reset"
            ></m-new-form>
        </div>
        <div v-if="showTable" class="form-box">
            <d-table
              :table-data="tableData"
              :actionData="actionData"
              :tableHeadData="tableHeadData"
              @loadMore="loadMore"
              @handleBack="handleBack"
            ></d-table>
        </div>
        <m-hint-box :msgs="promptList"></m-hint-box>
    </div>
</template>

<script>
/**
 * @name:信用卡交易明细查询
 * @author: 邓焕
 * @date: 2019-12-17
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: 'single',
  data () {
    return {
      companyNo: '',
      queryType: '',
      showTable: false,
      showDateArea: false,
      tableSize: 20,
      startDate: '',
      endDate: '',
      dateArea: {},
      pickerOptions: {},
      value1: '',
      resData: {},
      breadData: ['财务管理', '信用卡', '信用卡交易明细查询'],
      formModel: {
        companyNo: '', // 公司编号
        transDate: '0', // 交易日期
        startDate: '',
        endDate: '',
        isDisabled: true
      },
      formConfigJson: {
        rules: {
          transDate: [{ required: true, message: '请选择查询日期', trigger: 'submit' }],
          startDate: [{ required: true, message: '请选择开始时间', trigger: 'submit' }],
          endDate: [{ required: true, message: '请选择结束时间', trigger: 'submit' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '100%',
            // labelWidth: '15%',
            group: [
              {
                'disabled': true,
                'label': '公司编号',
                'type': 'text',
                'key': 'companyNo'
              },
              {
                'disabled': false,
                'label': '查询日期',
                'type': 'radio',
                'options': [
                  { 'value': '近一周', 'key': '0' },
                  { 'value': '近一月', 'key': '1' },
                  { 'value': '近三个月', 'key': '3' },
                  { 'value': '近半年', 'key': '6' },
                  { 'value': '自定义', 'key': '7' }
                ],
                'rightSlotName': 'dateRange',
                'changeEventName': 'selctDate',
                'key': 'transDate'
              },
              {
                label: ' ',
                type: 'dateArea',
                firstKey: 'startDate',
                changeEventName: 'changeDate',
                secondKey: 'endDate',
                isDisabled: 'isDisabled'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      tableHeadData: [
        { label: '信用卡号', prop: 'creditCardNo' },
        { label: '交易日期', prop: 'expenditureDate', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '交易时间', prop: 'expenditureTime', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '交易金额', prop: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '交易描述', prop: 'desline1' }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '加载更多',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'loadMore'
        },
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'handleBack'
        }
      ],
      allTableData: [],
      promptList: [
        '1.此功能用于企业操作员查看信用卡交易明细。'
      ]
    }
  },
  methods: {
    changeDate (res) {
      this.formModel = res
    },
    selctDate (res) {
      let today = new Date()
      let time = today.getTime()
      this.formModel.endDate = util.formatDate(time)
      if (res.transDate === '7') {
        // this.showDateArea = true
        this.formModel.isDisabled = false
        var filterDate = util.filterDate('1')
        this.startDate = filterDate.startDate
        this.endDate = filterDate.endDate
        this.formModel.startDate = filterDate.startDate
      } else {
        this.formModel.isDisabled = true
        if (res.transDate === '0') {
          //  近一周
          this.formModel.startDate = util.formatDate(time - 24 * 60 * 60 * 1000 * 7)
        } else if (res.transDate === '1') {
          //  近一月
          this.formModel.startDate = util.formatDate(time - 24 * 60 * 60 * 1000 * 30)
        } else if (res.transDate === '3') {
          //  近三月
          this.formModel.startDate = util.formatDate(time - 24 * 60 * 60 * 1000 * 30 * 3)
        } else if (res.transDate === '6') {
          //  近六月
          this.formModel.startDate = util.formatDate(time - 24 * 60 * 60 * 1000 * 30 * 6)
        }
      }
    },
    inquire (data) {
      if (this.dateNouNull(data.startDate, data.endDate)) {
        this.formModel = data
        const params = {
          queryType: data.transDate,
          beginDate: data.startDate,
          endDate: data.endDate,
          companyNo: data.companyNo,
          pagingFlag: '',
          list: []
        }
        httpPost('/eweb-transfer.CreditCartTransDetailQuery.do', params).then(res => {
          this.tableData = res.list
          this.showTable = true
          this.resData = res
        }).catch(err => {
          console.error(err)
        })
      }
    },
    reset (res) {
      this.showTable = false
      res.companyNo = this.companyNo
      res.isDisabled = true
      let today = new Date()
      let time = today.getTime()
      res.endDate = util.formatDate(time)
      res.startDate = util.formatDate(time - 24 * 60 * 60 * 1000 * 7)
      this.formModel = res
    },
    loadMore () {
      if (this.dateNouNull(this.formModel.transDate, this.formModel.endDate)) {
        const params = {
          queryType: this.formModel.transDate,
          beginDate: this.formModel.startDate,
          endDate: this.formModel.endDate,
          companyNo: this.formModel.companyNo,
          pagingFlag: this.resData.pagingFlag,
          list: this.tableData
        }
        httpPost('/eweb-transfer.CreditCartTransDetailQuery.do', params).then(res => {
          this.tableData = res.list
          this.showTable = true
        }).catch(err => {
          console.error(err)
        })
      }
    },
    handleBack () {
      this.showTable = false
    },
    getcompanyNo () {
      httpPost('/eweb-transfer.CompanyNoQuery.do').then(res => {
        var list = res.list
        this.companyNo = list[0].companyNo
        this.formModel.companyNo = list[0].companyNo
      }).catch(err => {
        console.error(err)
      })
    },
    // 查询时间不能为空
    dateNouNull (transDate, endDate) {
      if (transDate === null || transDate === '') {
        setTimeout(() => {
          this.$msg('warning')
        }, 100)
        return false
      }
      if (endDate === null || endDate === '') {
        setTimeout(() => {
          this.$msg('请输入结束日期')
        }, 100)
        return false
      }
      return true
    },
    // 选则日期，formModel负值
    changeStart (date) {
      this.formModel.startDate = util.formatDate(date)
    },
    changeEnd (date) {
      this.formModel.endDate = util.formatDate(date)
    }
  },
  created () {
    this.getcompanyNo()
    //  近一周
    let today = new Date()
    let time = today.getTime()
    this.formModel.startDate = util.formatDate(time - 24 * 60 * 60 * 1000 * 7)
    this.formModel.endDate = util.formatDate(time)
  }
}
</script>
