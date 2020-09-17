<template>
    <div>
        <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @selectAcc="selectAcc"
              @selctDate="selctDate"
              @inquire="inquire"
            ></m-new-form>
        </div>
        <div class="form-box" v-if="showTable">
            <d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :pagesize="pagesize"
              :operate-data="operateData"
              @handleSelect="handleSelect"
              @changeDate="changeDate"
            ></d-table>
        </div>
        <m-hint-box :msgs="promptList"></m-hint-box>
    </div>
</template>

<script>
/**
 *@name:批量转账查询
 */
import util from '@/libs/util'
import { trsState_Type } from '@/assets/js/entity'
import { httpPost } from '@/api/sys/http'

export default {
  name: 'batchs',
  data () {
    return {
      showTable: false,
      payerAccNoList: [], // 付款账户信息列表
      promptList: [
        '1.建议上传文件成功后半个小时再进行批量转账结果查询。',
        '2.批量转账结果查询支持按照单个批量包查询，并支持付款人账号或转账金额详细查询。'
      ],
      formModel: {
        payerAcc: '', // 账户
        transDate: '', // 交易日期
        startDate: '', // 开始时间
        endDate: '' // 结束时间
      },
      formConfigJson: {
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '100%',
            // labelWidth: '15%',
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                'options': [],
                'changeEventName': 'selectAcc',
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
                'changeEventName': 'selctDate',
                'key': 'transDate'
              },
              {
                label: ' ',
                'disabled': true,
                type: 'dateArea',
                firstKey: 'startDate',
                secondKey: 'endDate',
                changeEventName: 'changeDate'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' }
      ],
      firstColIndex: {
        type: 'selection'
      },
      pagesize: 20,
      tableHeadData: [
        { label: '付款账号', prop: 'payerAcNo' },
        { label: '交易日期',
          prop: 'transDate',
          width: 140,
          formatter: (row, column, value, index) => {
            return value.substring(0, 10)
          } },
        { label: '总笔数', prop: 'totalCount', width: 100 },
        { label: '总金额', prop: 'amount', width: 200, formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '手续费总额', prop: 'feeAmount', width: 130, formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        // { label: '交易类型', prop: 'transType' },
        { label: '交易状态',
          width: 100,
          prop: 'trsState',
          style: (value) => value === 'C' ? 'color: #03AF3A;' : value === 'I' ? 'color: #009CD8;' : value === 'R' ? 'color: #FFD308;' : 'color: #D70110;',
          formatter: (row, column, value, index) => util.handleEnums(trsState_Type, value)
        }
      ],
      tableData: [],
      operateData: {
        width: 100,
        btnData: [
          {
            type: 'text',
            btnText: '查看',
            eventName: 'handleSelect'
          }
        ]
      }
    }
  },
  methods: {
    changeDate (res) {
      this.formModel = res
    },
    handleSelect (index) {
      console.log(index.data)
      let transDate = index.data.transDate
      let params = {
        origChannelSerNo: index.data.respTransRecordId,
        origChannelDate: transDate.substring(0, 10)
      }
      httpPost('/eweb-transfer.BatchTransferDetailQry.do', params).then(res => {
        this.showTable = true
        this.formModel.result = res.result
        this.formModel.objData = index.data
        this.formModel.activeName = 'second'
        this.formModel.batchTableData = this.tableData
        Object.assign(this.formModel, res)
        this.$router.push({
          name: 'batchTransDetail',
          params: this.formModel
        })
      })
    },
    selectAcc (res) {},
    selctDate (res) {
      this.formConfigJson.formItems[0].group[2].disabled = true
      let filterDate
      switch (res.transDate) {
        case '0':
          filterDate = util.filterDate('0')
          this.formModel.startDate = filterDate.startDate
          this.formModel.endDate = filterDate.endDate
          break
        case '1':
          filterDate = util.filterDate('1')
          this.formModel.startDate = filterDate.startDate
          this.formModel.endDate = filterDate.endDate
          break
        case '2':
          filterDate = util.filterDate('2')
          this.formModel.startDate = filterDate.startDate
          this.formModel.endDate = filterDate.endDate
          break
        case '3':
          filterDate = util.filterDate('3')
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
        endDate: res.endDate
      }
      httpPost('/eweb-transfer.BatchTransferResultQry.do', params).then(res => {
        this.showTable = true
        console.log(res)
        this.tableData = res.list
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
