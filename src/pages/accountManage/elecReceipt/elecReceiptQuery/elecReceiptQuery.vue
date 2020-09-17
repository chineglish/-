<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form ref="mNewForm"
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @statisticsTypeChangeHandler="statisticsTypeChangeHandler"
              @submit="(data)=>{
                pageNation.currentPage = 1
                data.pageNo = '1'
                submit(data)
              }">
      </m-new-form>
    </div>
    <div class="form-box" v-show="tableShow">
      <d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :actionData="actionData"
              :firstColIndex="firstColIndex"
              :pageNation="pageNation"
              layout="pager, next, slot, total, jumper"
              @handleSelectionChange="handleSelectionChange"
              @downLoad="downLoad"
              @back="back">
      </d-table>
    </div>
  </div>
</template>
<script>
import util from '@/libs/util'
import { httpPost, downloadFile } from '@/api/sys/http'
import { Message } from 'element-ui'
import PageNation from '@/components/d-table/PageNation'
export default {
  name: 'elecReceiptQuery',
  data () {
    return {
      payerAccNoList: [], // 付款账户信息列表
      promptList: [
        '1.通过该交易可以查询并打印行内转账、跨行转账的电子回单。'
      ],
      breadData: ['账户管理', '客户回单', '客户回单查询'],
      tableShow: false,
      formModel: {
        acNo: '',
        status: 'N',
        pageNo: 1,
        beginDate: '',
        endDate: ''
      },
      formConfigJson: {
        rules: {
          acNo: [{ required: true, message: '账户不能为空', trigger: 'change' }],
          status: [{ required: true, message: '回单状态不能为空', trigger: 'change' }],
          beginDate: [{ required: true, message: '起止日期', trigger: 'change' }],
          endDate: [{ required: true, message: '起止日期', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '20%',
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                'key': 'acNo',
                'options': [],
                'trans': { value: 'acNoLabel', key: 'acNo' }
              },
              {
                'disabled': false,
                'label': '回单状态',
                'type': 'select',
                'key': 'status',
                'options': [
                  { 'value': '未打印回单', 'key': 'N' },
                  { 'value': '补制回单', 'key': 'Y' }
                ],
                changeEventName: 'statisticsTypeChangeHandler'
              },
              {
                'disabled': false,
                'label': '起止日期',
                type: 'dateArea',
                'firstKey': 'beginDate',
                'secondKey': 'endDate',
                'show': false
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      options: { // table属性
        border: true,
        stripe: true
      },
      pageNation: new PageNation(6, 1, 0),
      // 多选框
      firstColIndex: {
        type: 'selection',
        label: '选择'
      },
      tableHeadData: [
        { label: '日期',
          prop: 'acDate',
          formatter: (row, cell, cellValue, index) => util.separationDate(cellValue) },
        { label: '本方账号', prop: 'ourAcNo' },
        { label: '对方户名', prop: 'oppAcName' },
        { label: '借方',
          prop: 'debitAmount',
          formatter: (row, cell, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '贷方',
          prop: 'creditAmount',
          formatter: (row, cell, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '凭证种类', prop: 'receiptName' },
        { label: '打印次数', prop: 'printNum' }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '下载',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'downLoad'
        },
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'back'
        }
      ]
    }
  },
  methods: {
    handleSelectionChange (selection) {
      // 监听表格选择事件触发
      this.selection = selection
    },
    // 切换查询方式
    statisticsTypeChangeHandler (formModel) {
      this.tableShow = false
      this.formModel.pageNo = 1
      switch (formModel.status) {
        case 'N':
          this.formConfigJson.formItems[0].group[2].show = false
          break
        case 'Y':
          this.formConfigJson.formItems[0].group[2].show = true
          break
      }
    },
    downLoad () {
      // console.log(this.selection)
      // 未选择时，this.selection为未定义
      if (this.selection === undefined || this.selection.length === 0) {
        Message.warning({
          message: '请至少勾选一条数据'
        })
      } else {
        const params1 = {
          acNo: this.formModel.acNo,
          status: this.formModel.status,
          receiptId: this.selection[0].receiptId
        }
        if (this.selection.length !== 1) {
          for (let i = 1; i < this.selection.length; i++) {
            params1.receiptId += '|' + this.selection[i].receiptId
          }
        }
        debugger
        downloadFile('/eweb-query.EleReceiptDown.do', params1, () => {
          this.submit(this.formModel)
        })
      }
    },
    back () {
      this.tableShow = false
    },
    submit (obj) {
      this.formModel = obj
      const params = {
        acNo: obj.acNo,
        // acNo: '810001209008109',
        status: obj.status,
        num: String(obj.pageNo)
        // num: '1'
      }
      if (obj.status === 'Y') {
        params.beginDate = this.formModel.beginDate
        params.endDate = this.formModel.endDate
      }
      httpPost('eweb-query.EleReceiptQry.do', params).then(res => {
        this.tableShow = true
        this.tableData = res.list
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].cdFlag === 'D') {
            this.tableData[i].debitAmount = this.tableData[i].amount
            this.tableData[i].ourAcNo = this.tableData[i].acNoD
            this.tableData[i].oppAcName = this.tableData[i].acNameC
          } else {
            this.tableData[i].creditAmount = this.tableData[i].amount
            this.tableData[i].ourAcNo = this.tableData[i].acNoC
            this.tableData[i].oppAcName = this.tableData[i].acNameD
          }
        }
        this.pageNation = new PageNation(this.pageNation.pageSize, this.pageNation.currentPage, res.count, (pageNo, size) => {
          obj.pageNo = pageNo
          // if (size) this.pageNation.pageSize = size
          this.currentChang(obj)
        })
      }).catch(err => {
        console.error(err)
        this.tableShow = false
      })
    },
    currentChang (obj) {
      this.pageNation.currentPage = obj.pageNo
      this.formModel = obj
      const params = {
        acNo: obj.acNo,
        status: obj.status,
        num: String(obj.pageNo)
      }
      if (obj.status === 'Y') {
        params.beginDate = this.formModel.beginDate
        params.endDate = this.formModel.endDate
      }
      httpPost('eweb-query.EleReceiptQry.do', params).then(res => {
        this.tableData = res.list
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].cdFlag === 'D') {
            this.tableData[i].debitAmount = this.tableData[i].amount
            this.tableData[i].ourAcNo = this.tableData[i].acNoD
            this.tableData[i].oppAcName = this.tableData[i].acNameC
          } else {
            this.tableData[i].creditAmount = this.tableData[i].amount
            this.tableData[i].ourAcNo = this.tableData[i].acNoC
            this.tableData[i].oppAcName = this.tableData[i].acNameD
          }
        }
      }).catch(err => {
        console.error(err)
        this.tableShow = false
      })
    },
    /**
     * 交易账户获取
     */
    accNoListQry () {
      httpPost('eweb-query.EleReceiptAcNoQry.do').then(res => {
        res.list.forEach(item => {
          item.acNoLabel = util.getPayerAccount(item)
        })
        this.payerAccNoList = res.list || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.formModel.acNo = this.payerAccNoList[0].acNo
        this.submit(this.formModel)
      }).catch(err => {
        console.error(err)
        this.tableData = []
      })
    }
  },
  created () {
    const end = new Date()
    const begin = new Date()
    begin.setTime(begin.getTime() - 3600 * 1000 * 24 * 30 * 6)
    this.formModel.beginDate = util.formatDate(begin)
    this.formModel.endDate = util.formatDate(end)
    this.accNoListQry()
  }
}
</script>
