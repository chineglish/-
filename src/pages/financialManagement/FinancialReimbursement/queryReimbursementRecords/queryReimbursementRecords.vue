<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @submit="inquire"
        >
        </m-new-form>
        <d-table
                v-if="showSearchResult"
                :table-data="tableData"
                :pagesize="20"
                :firstColIndex="firstColIndex"
                :tableHeadData="tableHeadData"
                :actionData="actionData"
                @handleCurrentChange="tableSelectChange"
                @downloadAll="download('0')"
                @downloadSucceed="download('1')"
                @downloadFailed="download('2')"
                @handleBack="handleBack"
        >
        </d-table>
        <m-hint-box :msgs="promptList"></m-hint-box>
    </div>
</template>

<script>
import { httpPost, downloadFile } from '@/api/sys/http'
import { process_status } from '@/assets/js/entity'
import util from '@/libs/util'

/**
 * @name: 报销记录查询
 * @author: 邓焕
 * @date: 2019-12-14
 */
export default {
  name: 'queryReimbursementRecords',
  data () {
    return {
      payment: [],
      showSearchResult: false,
      breadData: ['财务管理', '财务报销', '报销记录查询'],
      promptList: ['1.通过该交易可查询上传文件处理状态和员工工资发放结果明细。', '2.“处理状态”分为处理失败、处理成功。如果处理 状态”显示为“处理失败”，可能由于核心系统繁忙，请稍后再重新进行文件上传，如果“处理状态”显示为“处理成功”，并不表示上传文件中所有员工工资发放成功，您可通过点击“代发状态”下的“全部”、“成功”、“失败”按钮查询相应代发状态的笔数和金额，并下载相应明细。'],
      formModel: {
        startDate: '',
        endDate: '',
        contractNo: 0
      },
      formConfigJson: {
        // formWidth: '50%',
        // labelWidth: '100%',
        rules: {
          startDate: [
            { required: true, message: '请选择开始日期', trigger: 'change' },
            { validator: (rule, value, callback) => {
              this.formModel.startDate = value
              if (value === '') {
                callback(new Error('请选择开始日期'))
              } else if (this.formModel.endDate !== '' && value > this.formModel.endDate) {
                callback(new Error('开始日期大于结束日期'))
              } else {
                callback()
              }
            },
            trigger: 'blur' }
          ],
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'change' },
            { validator: (rule, value, callback) => {
              this.formModel.endDate = value
              if (value === '') {
                callback(new Error('请选择开始日期'))
              } else if (this.formModel.startDate !== '' && value < this.formModel.startDate) {
                callback(new Error('开始日期大于结束日期'))
              } else {
                callback()
              }
            },
            trigger: 'blur' }
          ],
          contractNo: [{ required: true, message: '请输入合同号', trigger: 'change' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '查询日期',
                'type': 'dateArea',
                'firstKey': 'startDate',
                'secondKey': 'endDate'
              },
              {
                'disabled': false,
                'label': '合同号',
                'type': 'select',
                'options': [],
                trans: { value: 'Ywbh' },
                'key': 'contractNo'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      selected: {},
      // options: { // table属性
      //   border: true,
      //   stripe: true
      // },
      tableHeadData: [
        { label: '批次号', prop: 'Pch' },
        { label: '付款账号', prop: 'Fkzh' },
        { label: '总笔数', prop: 'Zbs' },
        { label: '总金额(元)', prop: 'Zje', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '成功笔数', prop: 'Cgbs' },
        { label: '成功金额', prop: 'Cgje', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '失败笔数', prop: 'Sbbs' },
        { label: '失败金额', prop: 'Sbje', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '发放日期', prop: 'Ffrq', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '处理状态', prop: 'Clzt', formatter: (row, column, cellValue, index) => util.handleEnums(process_status, cellValue) }
      ],
      firstColIndex: {
        type: 'radio',
        label: '选择'
      },
      tableData: [],
      actionData: [
        {
          btnText: '下载全部明细',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'downloadAll'
        },
        {
          btnText: '下载成功明细',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'downloadSucceed'
        },
        {
          btnText: '下载失败明细',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'downloadFailed'
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
    tableSelectChange (selection) {
      // 监听表格选择事件触发
      this.selected = selection
    },
    inquire (res) {
      // 发送接口查询
      let params = {
        startDate: res.startDate.replace(/-/g, ''),
        endDate: res.endDate.replace(/-/g, ''),
        contractNo: this.payment[res.contractNo].Ywbh,
        summaryCode: 'IB0320'
      }
      httpPost('/eweb-transfer.FinanceReimburseRecordQuery.do', params).then(res => {
        this.tableData = res.result
        this.showSearchResult = true
      }).catch()
    },
    handleBack (res) {
      // 返回
      this.showSearchResult = false
    },
    download (queryFlag) {
      //  下载全部
      if (this.selected.Pch) {
        let params = {
          batchNo: this.selected.Pch,
          _Download: 'xls',
          queryFlag: queryFlag
        }
        downloadFile('/eweb-transfer.FinanceReimburseRecordDownload.do', params).then(res => {
          this.$message({
            showClose: true,
            message: '下载成功',
            type: 'success'
          })
        }).catch((result) => {
          this.$message({
            showClose: true,
            message: '下载失败',
            type: 'error'
          })
        })
      } else {
        this.$msg('请选择一条记录')
      }
    },
    //  获取账户信息
    getpaymentSalaryInfo () {
      httpPost('/eweb-transfer.PaymentSalaryInfoQuery.do').then(result => {
        this.payment = result.result
        this.formConfigJson.formItems[0].group[1].options = this.payment
      }).catch((result) => {
        this.$msg('获取数据失败')
      })
    }
  },
  created () {
    this.getpaymentSalaryInfo()
    let filterDate = util.filterDate('1')
    this.formModel.startDate = filterDate.startDate
    this.formModel.endDate = filterDate.endDate
  }
}
</script>
