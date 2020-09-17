<template>
  <d2-container class="migrant-workers-security-deposit-qry">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
      <m-new-form ref="mNewForm"
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @reset="reset"
        @submit="submit"
      ></m-new-form>
      <d-table
        :table-data="tableData"
        :firstColIndex="firstColIndex"
        :pagesize="20"
        :tableHeadData="tableHeadData"
        :actionData="actionData"
        @handleCurrentChange="CurrentChange"
        @on-edit="editHandler"
        @on-download="downloadHandler"
        @on-back="backHandler"
        @handleTipsClick="handleTipsClick"
      ></d-table>
      <m-hint-box :msgs="msgs"></m-hint-box>
      <!-- 下载弹窗 -->
      <el-dialog title="电子对账单下载" center :visible.sync="centerDialogVisible">
        <el-form :model="downloadForm">
          <el-form-item label="导出格式：">
            <el-radio-group v-model="downloadForm.fileType">
              <el-radio :key="idx" :label="type.value" v-for="(type, idx) in fileTypes">导出为{{type.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="info" class="m-submit-btn" @click="downloadConfirm">下载</el-button>
          <el-button type="info" class="m-cancel-btn" @click="centerDialogVisible = false">返回</el-button>
        </span>
      </el-dialog>
  </d2-container>
</template>

<script>
import { Message } from 'element-ui'
import { httpPost, downloadFile } from '@/api/sys/http'
import util from '@/libs/util.js'

export default {
  name: 'migrant-workers-security-deposit-qry',
  data () {
    return {
      centerDialogVisible: false,
      downloadForm: {
        fileType: ''
      },
      fileTypes: [
        { label: 'excel', value: 'xls' },
        // { label: '记事本', value: 'txt' },
        { label: 'pdf', value: 'pdf' }
      ],
      breadData: ['账户管理', '农民工保证金查询'],
      formModel: {
        cifName: '',
        projectNm: '',
        projectType: '',
        startDate: '',
        endDate: ''
      },
      formConfigJson: {
        rules: {
          startDate: [
            { required: true, message: '请选择起止日期', trigger: 'blur' }
          ],
          endDate: [
            { required: true, message: '请选择起止日期', trigger: 'blur' }
          ],
          projectType: [
            { required: true, message: '请选择状态', trigger: 'blur' }
          ]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                label: '单位名称',
                key: 'cifName',
                type: 'input',
                value: '',
                maxlength: 30
              },
              {
                label: '项目名称',
                key: 'projectNm',
                type: 'input',
                value: '',
                maxlength: 30
              },
              {
                label: '状态',
                key: 'projectType',
                type: 'select',
                value: '',
                options: [
                  { value: '已预存', key: '00' },
                  { value: '划支', key: '12' },
                  { value: '补足', key: '14' },
                  { value: '已解除监管', key: '99' },
                  { value: '未解除监管', key: '13' },
                  { value: '划支未补足未解除监管', key: '10' },
                  { value: '划支未补足已解除监管', key: '17' },
                  { value: '划支已补足未解除监管', key: '11' },
                  { value: '划支已补足已解除监管', key: '18' },
                  { value: '已预存且未解除监管', key: '15' },
                  { value: '已预存且已解除监管', key: '16' },
                  { value: '全部', key: '88' }
                ],
                changeEventName: 'selectAcnoItem'
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
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: ['1.用户选择账户管理-农民工保证金查询，用于企业用户查询农民工保证金明细。'],
      firstColIndex: {
        type: 'radio',
        eventName: 'CurrentChange'
      },
      tableHeadData: [
        {
          label: '单位名称',
          prop: 'dwmc'
        },
        {
          label: '项目名称',
          prop: 'xmmc'
        },
        {
          label: '交易金额',
          prop: 'jyje',
          formatter: (row, cell, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '账户余额',
          prop: 'zhye',
          formatter: (row, cell, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '结算账户',
          prop: 'zh'
        },
        {
          label: '交易日期',
          prop: 'jyrq'
        }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '编辑',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'on-edit'
        },
        {
          btnText: '下载',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'on-download'
        },
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'on-back'
        }
      ],
      selectionData: []
    }
  },
  methods: {
    CurrentChange (res) {
      // 监听表格选择事件触发
      // console.log(res)
      this.selectionData[0] = res
    },
    /**
     * 默认查询
     */
    initmng () {
      if (this.$route.params.formModel) {
        this.formModel = this.$route.params.formModel
      } else {
        const endDate = new Date()
        const startDate = new Date()
        startDate.setTime(startDate.getTime() - 3600 * 1000 * 24 * 30)
        this.formModel.projectType = '88'
        this.formModel.startDate = startDate
        this.formModel.endDate = endDate
      }
      this.listQry(this.formModel)
    },
    submit (res) {
      // 查询
      // this.formModel = res
      this.listQry(res)
    },
    listQry (data) {
      const params = {
        startDate: util.standardDate(data.startDate),
        endDate: util.standardDate(data.endDate),
        projectType: data.projectType,
        cifName: data.cifName,
        projectNm: data.projectNm
      }
      httpPost('eweb-special.MigrantWorkerDepositInfoQry.do', params).then(res => {
        this.tableData = res.list || []
        this.showTable = true
        this.tableData.forEach(element => {
          element.jyrq = util.separationDate(element.jyrq)
        })
      }).catch(err => {
        console.error(err)
        this.tableData = []
      })
    },
    editHandler (res) {
      //  下载
      // console.log(res)
      if (this.selectionData.length !== 1) {
        Message.warning({
          message: '请勾选一条数据'
        })
      } else {
        // const params = {
        //   securityDeposit: this.selectionData[0]
        // }
        this.$router.push({
          name: 'migrantWorkersSecurityDepositDownload',
          params: {
            securityDeposit: this.selectionData[0],
            formModel: this.formModel
          }
        })
      }
    },
    downloadConfirm () {
      const data = this.$refs.mNewForm.$data.form
      const params = {
        startDate: util.standardDate(data.startDate),
        endDate: util.standardDate(data.endDate),
        projectType: data.projectType,
        cifName: data.cifName,
        projectNm: data.projectNm,
        _Download: this.downloadForm.fileType }
      downloadFile('/eweb-special.MigrantWorkerDepositInfoQryDown.do', params)
      this.$nextTick(() => {
        this.centerDialogVisible = false
      })
    },
    downloadHandler (res) {
      if (this.tableData.length > 0) {
        this.centerDialogVisible = true
      }
    },
    backHandler (res) {
      // 返回
      this.$router.push('/index')
    },
    reset (res) {
      res.startDate = this.formModel.startDate
      res.endDate = this.formModel.endDate
      res = this.formModel
      this.listQry(res)
    },
    handleTipsClick (res) {
      //  下载失败/成功明细
    },
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList.map(item => ({ value: util.getPayerAccount(item), key: item.acNo }))
        if (this.$route.params.formModel) {
          this.formModel = this.$route.params.formModel
        } else {
          this.formModel.acNo = this.payerAccNoList[0].acNo
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          this.formModel.startDate = start
          this.formModel.endDate = end
        }
        this.submit(this.formModel)
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    // this.listQry()
    this.initmng()
  }
}
</script>
