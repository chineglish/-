<template>
  <d2-container class="migrant-workers-security-deposit-edit-history-qry">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @submit="submit"
        @reset="reset"
      ></m-new-form>
      <d-table
        :table-data="tableData"
        :pagesize="20"
        :tableHeadData="tableHeadData"
        :actionData="actionData"
        @on-back="backHandler"
      ></d-table>
      <m-hint-box :msgs="msgs"></m-hint-box>
  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util.js'

const remarkEntity = {
  '1': '预存通知',
  '2': '补足通知',
  '3': '划支通知',
  '4': '解除通知'
}

const projectTypeEntity = {
  '00': '已预存',
  '10': '划支未补足',
  '11': '划支已补足',
  '99': '已接触监管'
}

export default {
  name: 'migrant-workers-security-deposit-edit-history-qry',
  data () {
    return {
      breadData: ['账户管理', '农民工保证金修改记录查询'],
      msgs: ['1.用户选择账户管理-农民工保证金查询-农民工保证金修改记录查询，用于企业用户查询农民工保证金修改记录信息。'],
      formModel: {
        entPrjAcNo: '',
        clericalNum: '',
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
          ]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                label: '企业项目账户',
                key: 'entPrjAcNo',
                type: 'input',
                value: '',
                maxlength: 30
              },
              {
                label: '文书编号',
                key: 'clericalNum',
                type: 'input',
                value: '',
                maxlength: 30
              },
              {
                type: 'dateArea',
                label: '查询日期',
                changeEventName: 'changeDate',
                firstKey: 'startDate',
                secondKey: 'endDate'
              },
              {
                label: ' ',
                key: ' '
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      tableHeadData: [
        {
          label: '单位名称',
          prop: 'cifName'
        },
        {
          label: '项目名称',
          prop: 'projectNm'
        },
        {
          label: '修改日期',
          prop: 'modDate',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '修改时间',
          prop: 'modTime',
          formatter: (row, column, cellValue, index) => util.separationTime(cellValue)
        },
        {
          label: '交易金额',
          prop: 'amount',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '摘要',
          prop: 'remark',
          formatter: (row, column, cellValue, index) => remarkEntity[cellValue]
        },
        {
          label: '文书编号',
          prop: 'clericalNum'
        },
        {
          label: '项目状态',
          prop: 'projectType',
          formatter: (row, column, cellValue, index) => projectTypeEntity[cellValue]
        }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'on-back'
        }
      ]
    }
  },
  methods: {
    submit (res) {
      // 查询
      this.listQry(res)
    },
    reset (res) {
      res.startDate = this.formModel.startDate
      res.endDate = this.formModel.endDate
      res = this.formModel
      this.listQry(res)
    },
    listQry (data) {
      const params = {
        startDate: util.standardDate(data.startDate),
        endDate: util.standardDate(data.endDate),
        entPrjAcNo: data.entPrjAcNo,
        clericalNum: data.clericalNum
      }
      httpPost('eweb-special.MigrantWorkerDepositQry.do', params).then(res => {
        this.tableData = res.list || []
      }).catch(err => {
        console.error(err)
        this.tableData = []
      })
    },
    backHandler (res) {
      // 返回
      this.$router.push('/index')
    }
  },
  created () {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setTime(startDate.getTime() - 3600 * 1000 * 24 * 30)
    this.formModel.startDate = startDate
    this.formModel.endDate = endDate
    this.listQry(this.formModel)
  }
}
</script>
