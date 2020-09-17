<template>
    <div class="payrollRecordQuery">
        <m-breadcrumb id="breadcrumb" :data="breadData"></m-breadcrumb>
        <div class="main">
          <div id="formBox" class="form-box">
              <m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @submit="inquire"
              >
              </m-new-form>
          </div>
          <div class="form-box" v-if="showTable">
              <d-table
                id="dTable"
                :table-data="tableData"
                :pagesize="20"
                :firstColIndex="firstColIndex"
                :tableHeadData="tableHeadData"
                :actionData="actionData"
                @downloadAll="download"
                @handleCurrentChange="handleCurrentChange"
                @handleBack="handleBack"
                @print="print"
              >
              </d-table>
              <!-- <d-table
                id="dTable"
                :table-data="tableData"
                :pagesize="20"
                :firstColIndex="firstColIndex"
                :tableHeadData="tableHeadData"
                :actionData="actionData"
                @handleCurrentChange="handleCurrentChange"
                @downloadAll="download('0')"
                @downloadSucceed="download('1')"
                @downloadFailed="download('2')"
                @handleBack="handleBack"
                @print="print"
              >
              </d-table> -->
          </div>
          <m-hint-box id="hintBox" :msgs="promptList"></m-hint-box>
          <!-- 电子对账单下载弹窗 -->
          <el-dialog title="代发工资记录下载" center :visible.sync="centerDialogVisible">
            <el-form :model="downloadForm">
              <el-form-item label="导出格式：">
                <el-radio-group v-model="downloadForm.downloadType">
                  <el-radio :key="idx" :label="type.value" v-for="(type, idx) in downloadTypes">{{type.label}}</el-radio>
                </el-radio-group>
                <br>
                <el-radio-group v-model="downloadForm.fileType">
                  <el-radio :key="idx" :label="type.value" v-for="(type, idx) in fileTypes">{{type.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <m-btn :btnData="dialogBtnData" @click="dialogClickEvent"></m-btn>
          </el-dialog>
        </div>
    </div>
</template>

<script>
/**
 *@name: 代发工资记录查询
 * @author: 邓焕
 * @date: 2019-12-10
 */

import util from '@/libs/util'
import { httpPost, downloadFile } from '@/api/sys/http'

export default {
  name: 'payrollRecordQuery',
  data () {
    return {
      showTable: false,
      selected: {},
      payment: [],
      promptList: ['1.通过该交易可查询上传文件处理状态和员工工资发放结果明细。', '2.“处理状态”分为处理失败、处理成功。如果处理 状态”显示为“处理失败”，可能由于核心系统繁忙，请稍后再重新进行文件上传，如果“处理状态”显示为“处理成功”，并不表示上传文件中所有员工工资发放成功，您可通过点击“代发状态”下的“全部”、“成功”、“失败”按钮查询相应代发状态的笔数和金额，并下载相应明细。'],
      filename: __filename,
      breadData: ['财务管理', '代发工资', '代发工资记录查询'],
      formModel: {
        startDate: '',
        endDate: '',
        contractNo: ''
      },
      formConfigJson: {
        formWidth: '100%',
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
          contractNo: [{ required: true, message: '请输入合同号', trigger: 'submit' }]
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
                options: [],
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
      firstColIndex: {
        label: '选择',
        type: 'radio'
      },
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
        { label: '处理状态', prop: 'Qtxx1' }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '下载',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'downloadAll'
        },
        // {
        //   btnText: '下载全部明细',
        //   type: 'info',
        //   class: 'm-submit-btn',
        //   eventName: 'downloadAll'
        // },
        // {
        //   btnText: '下载成功明细',
        //   type: 'info',
        //   class: 'm-submit-btn',
        //   eventName: 'downloadSucceed'
        // },
        // {
        //   btnText: '下载失败明细',
        //   type: 'info',
        //   class: 'm-submit-btn',
        //   eventName: 'downloadFailed'
        // },
        // {
        //   btnText: '打印',
        //   class: 'm-submit-btn',
        //   type: 'info',
        //   eventName: 'print'
        // },
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'handleBack'
        }
      ],
      dialogBtnData: [
        {
          btnText: '下载',
          class: 'm-submit-btn',
          eventName: 'download'
        },
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          eventName: 'backHandler'
        }
      ],
      centerDialogVisible: false,
      fileTypes: [
        { label: 'excel', value: 'xls' },
        { label: 'pdf', value: 'pdf' }
      ],
      downloadTypes: [
        { label: '下载全部明细', value: '0' },
        { label: '下载成功明细', value: '1' },
        { label: '下载失败明细', value: '2' }
      ],
      downloadForm: {
        fileType: 'xls',
        downloadType: '0'
      }
    }
  },
  methods: {
    print () {
      // document.getElementById('breadcrumb').style.display = 'none'
      // document.getElementById('formBox').style.display = 'none'
      // document.getElementById('hintBox').style.display = 'none'
      document.getElementById('dTable').print()
      window.location.reload()
    },
    handleCurrentChange (selection) {
      // 监听表格选择事件触发
      this.selected = selection
    },
    inquire (res) {
      // 发送接口重新查询
      this.showTable = false
      this.selected = {}
      this.formModel.contractNo = res.contractNo
      let params = {
        startDate: res.startDate.replace(/-/g, ''),
        endDate: res.endDate.replace(/-/g, ''),
        contractNo: this.payment[res.contractNo].Ywbh,
        summaryCode: '327'
      }
      httpPost('/eweb-transfer.PaySalaryRecordQuery.do', params).then(res => {
        this.tableData = res.result
        this.showTable = true
      })
    },
    download () {
      if (this.selected.Pch) {
        this.centerDialogVisible = true
      } else {
        this.$msg('请选择一条记录')
      }
    },
    dialogClickEvent (eventName) {
      switch (eventName) {
        case 'backHandler':
          this.centerDialogVisible = false
          break
        case 'download':
          this.downloadConfirm()
          break
      }
    },
    downloadConfirm () {
      const data = {
        queryFlag: this.downloadForm.downloadType,
        batchNo: this.selected.Pch, // 批次号
        contractNo: this.payment[this.formModel.contractNo].Ywbh, // 合同号
        fkzh: this.selected.Fkzh, // 付款账号
        zbs: this.selected.Zbs, // 总笔数
        zje: this.selected.Zje, // 总金额(元)
        cgbs: this.selected.Cgbs, // 成功笔数
        cgje: this.selected.Cgje, // 成功金额
        sbbs: this.selected.Sbbs, // 失败笔数
        sbje: this.selected.Sbje, // 失败金额
        ffrq: this.selected.Ffrq, // 发放日期
        qtxx1: this.selected.Qtxx1, // 处理状态
        plywbh: this.selected.Plywbh, // 签约协议编号
        dwbh: this.selected.Dwbh, // 客户编号、单位编号
        clzt: this.selected.Clzt, // 处理状态，0成功
        qdbs: this.selected.Qdbs, // 渠道
        _Download: this.downloadForm.fileType
      }
      if (this.selected.Clzt === 2 && queryFlag === '1') {
        this.$msg('当前记录没有成功明细')
      } else if (this.downloadForm.fileType === 'xls') {
        downloadFile('/eweb-transfer.PaySalaryRecordDownload.do', data)
      } else {
        downloadFile('/eweb-transfer.PaySalaryRecordDownloadPdf.do', data)
      }
      this.centerDialogVisible = false
    },
    handleBack (res) {
      // 返回
      this.showTable = false
    },
    //  获取合同号
    getPaymentSalaryInfoQuery () {
      httpPost('/eweb-transfer.PaymentSalaryInfoQuery.do').then(result => {
        this.payment = result.result
        this.formConfigJson.formItems[0].group[1].options = this.payment
        this.formModel.contractNo = 0
      })
    }
  },
  created () {
    //  初始化数据
    this.getPaymentSalaryInfoQuery()
    let filterDate = util.filterDate('1')
    this.formModel.startDate = filterDate.startDate
    this.formModel.endDate = filterDate.endDate
  }
}
</script>
