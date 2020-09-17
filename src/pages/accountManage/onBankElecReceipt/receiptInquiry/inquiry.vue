<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form ref="mNewForm"
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @submit="submit">
      </m-new-form>
    </div>
    <div class="form-box" :style="{ display: visiblePublish }" v-if="tableShow">
      <d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :actionData="actionData"
              :operateData="operateData"
              :pageNation="pageNation"
              :firstColIndex="firstColIndex"
              @batchDaYin="batchDaYin"
              @handleSelectionChange="handleSelectionChange"
              @batchDownload="batchDownload"
              @clickTableLink="clickTableLink"
              @back="back"
              @downLoad="downLoad">
      </d-table>
    </div>
    <m-hint-box :msgs="promptList"></m-hint-box>
  </div>
</template>
<script>
import { currency_type } from '@/assets/js/entity'
import util from '@/libs/util.js'
import { Message } from 'element-ui'
import { httpPost, downloadFile } from '@/api/sys/http'
import PageNation from '@/components/d-table/PageNation'

export default {
  name: 'receiptInquiry',
  data () {
    return {
      visiblePublish: '',
      payerAccNoList: [], // 付款账号信息列表
      promptList: [
        '1.用于企业用户查询网银动账交易的电子回单。',
        '2.通过该交易可以查询并打印行内转账、跨行转账的电子回单。'
      ],
      breadData: ['账户管理', '网银电子回单查询'],
      tableShow: false,
      formModel: {
        acNoIndex: '',
        beginDate: '',
        endDate: ''
      },
      formConfigJson: {
        rules: {
          acNoIndex: [{ required: true, message: '请选择账户', trigger: 'change' }],
          beginDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                'key': 'acNoIndex',
                'options': [],
                'trans': { value: 'acNoLabel' }
              },
              {
                'disabled': false,
                'label': '查询日期',
                type: 'dateArea',
                'firstKey': 'beginDate',
                'secondKey': 'endDate'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      pageNation: new PageNation(20, 1, 0),
      // 多选框
      firstColIndex: {
        type: 'selection',
        label: '选择'
      },
      tableHeadData: [
        { label: '交易流水', prop: 'jnlNo', clickEventName: 'clickTableLink', width: '220px' },
        { label: '录入时间', prop: 'transTime', width: '110px' },
        { label: '对方户名', prop: 'payeeAcName', width: '180px' },
        { label: '对方账号', prop: 'payeeAcNo', width: '160px' },
        { label: '对方开户行', prop: 'payeeBank' },
        { label: '币种',
          prop: 'currency',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        { label: '交易金额',
          prop: 'amount',
          width: '180px',
          formatter: (row, cell, cellValue, index) => util.formatCurrency(cellValue)
        }
      ],
      tableData: [],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '下载',
            eventName: 'downLoad'
          }
        ]
      },
      actionData: [
        {
          btnText: '批量打印',
          class: 'm-submit-btn',
          eventName: 'batchDaYin'
        },
        {
          btnText: '批量下载',
          class: 'm-submit-btn',
          eventName: 'batchDownload'
        },
        {
          btnText: '返回',
          class: 'm-cancel-btn',
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
    // 批量打印
    batchDaYin (obj) {
      // console.log(22222222, this.selection)
      // 未选择时，this.selection为未定义
      if (this.selection === undefined || this.selection.length === 0) {
        Message.warning({
          message: '请至少勾选一条数据'
        })
      } else {
        // 将勾选列表跳带到批量页面
        this.$router.push({
          name: 'receiptDaYin',
          params: {
            data: this.selection,
            formModel: this.formModel
          }
        })
      }
    },
    clickTableLink (obj) {
      if (obj.transCode === '体彩缴费') {
        this.$router.push({
          name: 'receiptDetail',
          params: {
            data: obj,
            formModel: this.formModel,
            flag: 0
          }
        })
      } else {
        this.$router.push({
          name: 'verifyRes',
          params: {
            data: obj,
            formModel: this.formModel,
            flag: 0
          }
        })
      }
    },
    downLoad (e) {
      const params = {
        jnlNo: e.data.jnlNo,
        serviceId: e.data.serviceId,
        feesFlag: '',
        _Download: 'pdf',
        prdId: e.data.prdId
      }
      downloadFile('/eweb-query.IBPSeleReceiptDetDown.do', params)
    },
    handleBack () {
      const params = {}
      httpPost('', params).then(res => {
        this.tableShow = false
      }).catch(err => {
        console.error(err)
      })
    },
    batchDownload (obj) {
      const params = {
        acNo: this.payerAccNoList[this.formModel.acNoIndex].acNo,
        subAcNo: this.payerAccNoList[this.formModel.acNoIndex].subAcNo,
        beginDate: util.standardDate(this.formModel.beginDate),
        endDate: util.standardDate(this.formModel.endDate),
        pageNo: String(this.pageNation.currentPage),
        pageSize: String(this.pageNation.pageSize),
        _Download: 'pdf'
      }
      downloadFile('/eweb-query.IBPSeleReceiptListDown.do', params)
    },
    back (obj) {
      // this.$router.push({ name: 'index' })
      // this.tableData = []
      // this.pageNation = new PageNation(this.pageNation.pageSize, 1, 0)
      this.visiblePublish = 'none'
    },
    currentChang (obj) {
      this.pageNation.currentPage = obj.pageNo
      httpPost('eweb-query.IBPSeleReceiptListQry.do', {
        acNo: this.payerAccNoList[this.formModel.acNoIndex].acNo,
        subAcNo: this.payerAccNoList[this.formModel.acNoIndex].subAcNo,
        beginDate: util.standardDate(obj.beginDate),
        endDate: util.standardDate(obj.endDate),
        // pageNo: String(this.pageNation.currentPage),
        pageNo: obj.pageNo,
        pageSize: String(this.pageNation.pageSize)
      }).then(res => {
        this.tableData = res.list
        for (let i = 0; i < this.tableData.length; i++) {
          // if (typeof (this.tableData[i].payeeBank) === 'undefined') {
          //   this.tableData[i].payeeBank = '大连银行'
          // }
          if (typeof (this.tableData[i].payeeAcName) === 'undefined') {
            this.tableData[i].payeeAcName = '-'
          }
          if (typeof (this.tableData[i].payeeAcNo) === 'undefined') {
            this.tableData[i].payeeAcNo = '-'
          }
        }
      })
    },
    submit (obj) {
      this.formModel = obj
      const params = {
        acNo: this.payerAccNoList[this.formModel.acNoIndex].acNo,
        subAcNo: this.payerAccNoList[this.formModel.acNoIndex].subAcNo,
        beginDate: util.standardDate(obj.beginDate),
        endDate: util.standardDate(obj.endDate),
        pageNo: String(this.pageNation.currentPage),
        pageSize: String(this.pageNation.pageSize)
      }
      httpPost('eweb-query.IBPSeleReceiptListQry.do', params).then(res => {
        this.visiblePublish = ''
        this.tableShow = true
        this.tableData = res.list
        this.pageNation = new PageNation(this.pageNation.pageSize, this.pageNation.currentPage, res.counts, (pageNo, size) => {
          obj.pageNo = pageNo
          if (size) this.pageNation.pageSize = size
          this.currentChang(obj)
        })
        for (let i = 0; i < this.tableData.length; i++) {
          if (typeof (this.tableData[i].payeeBank) === 'undefined') {
            this.tableData[i].payeeBank = '大连银行'
          }
          if (typeof (this.tableData[i].payeeAcName) === 'undefined') {
            this.tableData[i].payeeAcName = '-'
          }
          if (typeof (this.tableData[i].payeeAcNo) === 'undefined') {
            this.tableData[i].payeeAcNo = '-'
          }
        }
      }).catch(err => {
        console.error(err)
        this.tableShow = false
      })
    },
    /**
     * 交易账号获取
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        res.AcList.forEach(item => {
          item.acNoLabel = util.getPayerAccount(item)
        })
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        if (this.$route.params.formModel) {
          this.formModel = this.$route.params.formModel
        } else {
          this.formModel.acNoIndex = 0
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          this.formModel.beginDate = start
          this.formModel.endDate = end
        }
        this.submit(this.formModel)
      }).catch(err => {
        console.error(err)
        this.tableData = []
      })
    }
  },
  created () {
    this.accNoListQry()
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
