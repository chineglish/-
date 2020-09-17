<template>
    <div>
        <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @selctDate="selctDate"
              @inquire="inquire"
              @changeDate="changeDate"
            ></m-new-form>
        </div>
        <div class="form-box" v-if="showTable">
            <d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :pagesize="pagesize"
            ></d-table>
        </div>
        <m-hint-box :msgs="promptList"></m-hint-box>
    </div>
</template>

<script>
/**
 *@name:单笔转账查询
 */
import util from '@/libs/util'
import { httpPost } from '@/api/sys/http'
import { trsState_Type } from '@/assets/js/entity'

export default {
  name: 'single',
  data () {
    return {
      showTable: false,
      payerAccNoList: [], // 付款账户信息列表
      formModel: {
        payerAcc: '', // 账户
        transDate: '', // 交易日期
        payeeName: '', // 收款账户名称
        transMoney: '', // 交易金额
        startDate: '', // 开始时间
        endDate: '', // 结束时间
        minMoney: '', // 最小金额
        maxMoney: '' // 最大金额
      },
      formConfigJson: {
        rules: {
          minMoney: [
            { validator: (rule, value, callback) => {
              this.formModel.minMoney = value
              if (parseFloat(value) > parseFloat(this.formModel.maxMoney)) {
                callback(new Error('最小金额大于最大金额!'))
              } else {
                callback()
              }
            },
            trigger: 'change' }
          ],
          maxMoney: [
            { validator: (rule, value, callback) => {
              this.formModel.maxMoney = value
              if (parseFloat(value) < parseFloat(this.formModel.minMoney)) {
                callback(new Error('最小金额大于最大金额!'))
              } else {
                callback()
              }
            },
            trigger: 'blur' }
          ]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                'options': [],
                'key': 'payerAcc'
              },
              {
                'disabled': false,
                'label': '查询日期',
                'type': 'radio',
                'options': [
                  { 'value': '近一周', 'key': '0' },
                  { 'value': '近一月', 'key': '1' },
                  { 'value': '近三个月', 'key': '2' },
                  { 'value': '近半年', 'key': '3' },
                  { 'value': '自定义', 'key': '4' }
                ],
                // 'rightSlotName': 'dateRange',
                'changeEventName': 'selctDate',
                'key': 'transDate'
              },
              {
                label: ' ',
                'disabled': true,
                type: 'dateArea',
                changeEventName: 'changeDate',
                firstKey: 'startDate',
                secondKey: 'endDate'
              }
            ]
          },
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '35%',
            group: [
              {
                'disabled': false,
                'label': '收款账户名称',
                'type': 'input',
                'key': 'payeeName'
              },
              {
                'disabled': false,
                'label': '交易金额',
                'type': 'moneyArea',
                firstKey: 'minMoney',
                secondKey: 'maxMoney'
              }
            ]
          }
        ]
      },
      btnData: [{ btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' }],
      firstColIndex: { type: 'selection' },
      pagesize: 20,
      tableHeadData: [
        { label: '交易流水编号', prop: 'globalJnlNo' },
        { label: '交易时间',
          prop: 'transTime',
          width: '120' },
        { label: '付款账号', prop: 'payerAcNo', width: '160' },
        { label: '收款账号', prop: 'payeeAcNo', width: '160' },
        { label: '收款户名', prop: 'payeeAcName' },
        { label: '交易金额',
          prop: 'amount',
          width: '180',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '交易类型',
          prop: 'trsType',
          width: 100,
          formatter: (row, column, cellValue, index) => cellValue === '0' ? '行内' : '跨行'
        },
        { label: '交易状态',
          prop: 'trsState',
          width: 100,
          style: (value) => value === 'C' ? 'color: #03AF3A;' : value === 'I' ? 'color: #009CD8;' : value === 'R' ? 'color: #FFD308;' : 'color: #D70110;',
          formatter: (row, column, value, index) => util.handleEnums(trsState_Type, value)
        }
      ],
      tableData: [],
      promptList: [
        '1.您可以通过此交易实时查询某笔跨行转账的汇款状态',
        '2.该交易可查询2014年12月6日之后发起的跨行转账结果。如果“汇款状态”显示为成功，表示该笔转账交易已成功从我行转出，如果“汇款状态”显示为失败，表示该笔交易失败，请根据错误信息联系我行;如果“汇款状态”显示为处理中，请稍后进行查询。',
        '3.如有其它问题，请咨询我行客户服务热线4006640099。'
      ]
    }
  },
  methods: {
    // 自定义修改起止日期同步到formModel,避免出现选择近一周出现不改变的问题
    changeDate (res) {
      this.formModel = res
    },
    // 改变交易日期
    selctDate (res) {
      this.formConfigJson.formItems[0].group[2].disabled = true
      let filterDate = util.filterDate(res.transDate)
      switch (res.transDate) {
        case '0':
          this.formModel.startDate = filterDate.startDate
          this.formModel.endDate = filterDate.endDate
          break
        case '1':
          this.formModel.startDate = filterDate.startDate
          this.formModel.endDate = filterDate.endDate
          break
        case '2':
          this.formModel.startDate = filterDate.startDate
          this.formModel.endDate = filterDate.endDate
          break
        case '3':
          this.formModel.startDate = filterDate.startDate
          this.formModel.endDate = filterDate.endDate
          break
        case '4':
          filterDate = util.filterDate('1')
          this.formModel.startDate = filterDate.startDate
          this.formModel.endDate = filterDate.endDate
          this.formConfigJson.formItems[0].group[2].disabled = false
          break
      }
    },
    getList () {
      httpPost('eweb-query.PayerAccountListQry.do').then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
          .map(item => ({ value: util.getPayerAccount(item), key: item.acNo + '-' + item.subAcNo }))
        this.formModel.payerAcc = res.AcList[0].acNo + '-' + res.AcList[0].subAcNo
      })
    },
    inquire (res) {
      const [accNo, subAcNo] = (res.payerAcc || '').split('-')
      let params = {
        payerAcNo: accNo,
        subAcNo: subAcNo,
        startDate: res.startDate,
        endDate: res.endDate,
        payeeAcName: res.payeeName,
        minMoney: res.minMoney,
        maxMoney: res.maxMoney
      }
      httpPost('/eweb-transfer.TransferResultQry.do', params).then(res => {
        this.tableData = res.list
        this.showTable = true
      })
    }
  },
  created () {
    this.getList()
    this.formModel.transDate = '0'
    this.selctDate(this.formModel)
  }
}
</script>
