<template>
  <d2-container class="account-detail-qry">
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>
    <d2-container>
      <m-new-form ref="mNewForm"
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @reset="reset"
        @changeAcc='changeAcc'
        @changeRadioItem="changeRadioItem"
        @changeDate="changeDate"
        @submit="submit"
        @changeMiniRetAmt="changeMiniRetAmt"
        @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
      >
        <div slot="otherPanel" class="other-panel">
          <span style="cursor: pointer;" @click="moreConditions">
            {{ isMore ? '收起' : '更多查询条件' }} >>
          </span>
        </div>
      </m-new-form>
    </d2-container>
    <d2-container v-if="showTable">
      <d-table
        :tableData="tableData"
        :tableHeadData="tableHeadData"
        :actionData="actionData"
        :pagesize="20"
        :defaultSort="defaultSort"
        @handleSelectionChange="tableSelectChange"
        @detailHandler="detailHandler"
        @on-download="downloadHandler"
        @on-back="backHandler">
      </d-table>
    </d2-container>

    <m-hint-box :msgs="msgs"></m-hint-box>
    <!-- 电子对账单下载弹窗 -->
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
import { httpPost, downloadFile } from '@/api/sys/http'
import util from '@/libs/util.js'
import _ from 'lodash'

export default {
  name: 'accountDetailQry',
  data () {
    return {
      showTable: false,
      payerAccNoList: [],
      endTrsAmount: '',
      centerDialogVisible: false,
      downloadForm: {
        fileType: 'pdf'
      },
      fileTypes: [
        { label: 'excel', value: 'xls' },
        { label: 'pdf', value: 'pdf' }
      ],
      breadcrumb: ['账户管理', '账户明细查询'],
      formModel: {
        acNoidex: '',
        subAcNo: '',
        oppAcNo: '',
        oppAcName: '',
        remark: '',
        startDate: '',
        endDate: '',
        radioVal: '1',
        isDisabled: true,
        beginTrsAmount: '',
        endTrsAmount: ''
      },
      formConfigJson: {
        rules: {
          acNoidex: [{ required: true, message: '请选择账号/账户名称', trigger: 'submit' }],
          startDate: [{ required: true, message: '请选择开始日期', trigger: 'submit' }],
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                label: '账户',
                key: 'acNoidex',
                type: 'select',
                defaultValue: '',
                options: [],
                labelWidth: '13%',
                formWidth: '100%',
                trans: { value: 'acNoLabel' },
                changeEventName: 'changeAcc'
              },
              {
                label: '查询日期',
                key: 'radioVal',
                type: 'radio',
                changeEventName: 'changeRadioItem',
                options: [
                  {
                    key: '0',
                    value: '近一周'
                  },
                  {
                    key: '1',
                    value: '近一月'
                  },
                  {
                    key: '2',
                    value: '近三月'
                  },
                  {
                    key: '3',
                    value: '近半年'
                  },
                  {
                    key: '4',
                    value: '自定义'
                  }
                ],
                labelWidth: '13%',
                formWidth: '100%'
              },
              {
                label: ' ',
                firstKey: 'startDate',
                secondKey: 'endDate',
                type: 'dateArea',
                labelWidth: '13%',
                formWidth: '100%',
                isDisabled: 'isDisabled',
                changeEventName: 'changeDate'
                // startRestrictionStart: null
                // endRestrictionStart: new Date().getTime()
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      backupData1: [
        {
          formWidth: '100%',
          label: '账户',
          key: 'acNoidex',
          type: 'select',
          defaultValue: '',
          options: [],
          trans: { value: 'acNoLabel' },
          changeEventName: 'changeAcc'
        },
        // {
        //   label: '交易金额(元)',
        //   key: 'money',
        //   slotName: 'moneyRange'
        // },
        {
          label: '交易金额(元)',
          type: 'moneyArea',
          firstKey: 'beginTrsAmount',
          secondKey: 'endTrsAmount'
        },
        {
          label: '对方账号',
          key: 'oppAcNo',
          type: 'input',
          maxlength: 50
        },
        {
          label: '对方户名',
          key: 'oppAcName',
          type: 'input',
          maxlength: 70
        },
        {
          label: '摘要',
          key: 'remark',
          type: 'input',
          // labelWidth: '13%',
          // formWidth: '100%',
          maxlength: 70
        },
        {
          label: '查询日期',
          key: 'radioVal',
          type: 'radio',
          changeEventName: 'changeRadioItem',
          options: [
            {
              key: '0',
              value: '近一周'
            },
            {
              key: '1',
              value: '近一月'
            },
            {
              key: '2',
              value: '近三月'
            },
            {
              key: '3',
              value: '近半年'
            },
            {
              key: '4',
              value: '自定义'
            }
          ],
          labelWidth: '13%',
          formWidth: '100%'
        },
        {
          label: ' ',
          firstKey: 'startDate',
          secondKey: 'endDate',
          type: 'dateArea',
          labelWidth: '13%',
          formWidth: '100%',
          changeEventName: 'changeDate',
          isDisabled: 'isDisabled'
          // startRestrictionStart: null
          // endRestrictionStart: new Date().getTime()
        }
      ],
      backupData2: [
        {
          label: '账户',
          key: 'acNoidex',
          type: 'select',
          defaultValue: '',
          options: [],
          labelWidth: '13%',
          formWidth: '100%',
          trans: { value: 'acNoLabel' },
          changeEventName: 'changeAcc'
        },
        {
          label: '查询日期',
          key: 'radioVal',
          type: 'radio',
          changeEventName: 'changeRadioItem',
          options: [
            {
              key: '0',
              value: '近一周'
            },
            {
              key: '1',
              value: '近一月'
            },
            {
              key: '2',
              value: '近三月'
            },
            {
              key: '3',
              value: '近半年'
            },
            {
              key: '4',
              value: '自定义'
            }
          ],
          labelWidth: '13%',
          formWidth: '100%'
        },
        {
          label: ' ',
          firstKey: 'startDate',
          secondKey: 'endDate',
          type: 'dateArea',
          formWidth: '100%',
          changeEventName: 'changeDate',
          isDisabled: 'isDisabled'
          // startRestrictionStart: null
          // endRestrictionStart: new Date().getTime()
        }
      ],
      isMore: false,
      msgs: [
        '1.查询起止时间最长为六个月,通常历史明细查询可查询该账户最近六个月内的所有交易明细。',
        '2.用于查询本企业加挂全部账户的交易明细详情，并可对交易明细详情进行下载和打印。'
      ],
      defaultSort: {
        prop: 'sortFlag',
        order: 'descending'
      },
      tableHeadData: [
        {
          label: '序号',
          prop: 'sortFlag',
          sortable: 'custom',
          width: '80'
        },
        {
          label: '交易日期',
          prop: 'transDateF',
          // prop: 'transDateTime',
          // sortable: 'custom',
          width: '110'
          // formatter: (row, cell, cellValue, index) => util.formatTransTime(cellValue)
        },
        {
          label: '流水号',
          prop: 'jnlNo',
          clickEventName: 'detailHandler'
        },
        {
          label: '凭证号',
          prop: 'voucher'
        },
        {
          label: '借记金额',
          prop: 'pickAmount',
          sortable: 'custom',
          width: '150',
          formatter: (row, cell, cellValue, index) => row.crFlag1 === '借记' ? util.formatCurrency(cellValue) : ''
        },
        {
          label: '贷记金额',
          prop: 'loanAmount',
          sortable: 'custom',
          width: '150',
          formatter: (row, cell, cellValue, index) => row.crFlag1 === '贷记' ? util.formatCurrency(cellValue) : ''
        },
        // {
        //   label: '交易金额',
        //   prop: 'amount',
        //   sortable: 'custom',
        //   width: '200',
        //   formatter: (row, cell, cellValue, index) => util.formatCurrency(cellValue)
        // },
        // {
        //   label: '借贷标志',
        //   prop: 'crFlag1',
        //   width: '100',
        //   filters: [
        //     // { text: '全部', value: 'all' },
        //     { text: '借记', value: '借记' },
        //     { text: '贷记', value: '贷记' }
        //   ],
        //   filterHandler: (value, row, column) => {
        //     if (value === 'all') { return true } else { return row.crFlag1 === value }
        //   }
        // },
        {
          label: '账户余额',
          prop: 'balance',
          width: '160',
          formatter: (row, cell, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '对方户名',
          prop: 'oppAcName'
        },
        {
          label: '对方账号',
          prop: 'oppAcNo'
        },
        {
          label: '对方开户行',
          prop: 'oppFinName',
          width: '100'
        },
        {
          label: '摘要',
          prop: 'remark'
        },
        {
          label: '附言',
          prop: 'infoRemarks'
        }
      ],
      tableData: [],
      actionData: [
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
      selection: [],
      backupFormModel: {}
    }
  },
  methods: {
    changeMiniRetAmt (res) {
      res.beginTrsAmount = util.limitInputMoney(res.beginTrsAmount)
      res.endTrsAmount = util.limitInputMoney(res.endTrsAmount)
    },
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeDate (obj) {
      this.formModel = obj
      // this.formModel[key] = obj[key]
    },
    moreConditions () {
      this.formConfigJson.formItems[0].group.splice(0)
      if (this.isMore) {
        this.formModel.beginTrsAmount = ''
        this.formModel.endTrsAmount = ''
        this.formModel.oppAcNo = ''
        this.formModel.oppAcName = ''
        this.formModel.remark = ''
        this.backupData2.forEach(item => {
          this.formConfigJson.formItems[0].group.push(item)
        })
        this.isMore = !this.isMore
      } else {
        this.backupData1.forEach(item => {
          this.formConfigJson.formItems[0].group.push(item)
        })
        this.isMore = !this.isMore
      }
    },
    // 金额的效验
    limitInputMoney (e) {
      util.limitInputMoney(e)
    },
    reset (form) {
      this.formModel = form

      Object.keys(this.backupFormModel).forEach(key => {
        this.$set(this.formModel, key, this.backupFormModel[key])
      })

      this.calculateDates(this.formModel.radioVal)

      this.showTable = false
      this.tableData = []
    },
    /**
     * 付款账户列表查询
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        res.AcList.forEach(item => {
          item.acNoLabel = util.getPayerAccount(item)
        })
        this.payerAccNoList = res.AcList || []
        this.backupData2[0].options = this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.backupData1[0].options = this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        if (this.$route.params.item) {
          // this.formModel.acNo = this.$route.params.item.acNo
          this.$set(this.formModel, 'acNoidex', this.$route.params.item.acNo)
          this.$set(this.formModel, 'subAcNo', this.$route.params.item.subAcNo)
        } else {
          this.$set(this.formModel, 'acNoidex', 0)
          this.$set(this.formModel, 'subAcNo', this.payerAccNoList[0].subAcNo)
        }
        this.backupFormModel = _.cloneDeep(this.formModel)
        let data = {
          acNo: this.payerAccNoList[this.formModel.acNoidex].acNo,
          startDate: util.standardDate(this.formModel.startDate),
          endDate: util.standardDate(this.formModel.endDate),
          oppAcNo: this.formModel.oppAcNo,
          oppAcName: this.formModel.oppAcName,
          remark: this.formModel.remark,
          subAcNo: this.payerAccNoList[this.formModel.acNoidex].subAcNo,
          // radioVal: this.formModel.radioVal,
          // isDisabled: true,
          beginTrsAmount: this.formModel.beginTrsAmount,
          endTrsAmount: this.formModel.endTrsAmount
        }
        this.listQuery(data)
      })
    },
    detailHandler (res = {}) {
      this.$router.push({
        name: 'accountDetail',
        params: {
          detail: res,
          formModel: this.formModel
        }
      })
    },
    changeAcc (res, obj) {
      console.log(res)
      console.log(obj)
      // obj.subAcNo = res.subAcNo
    },
    listQuery (params) {
      params.isSort = '0'
      // params.subAcNo =
      httpPost('eweb-acmgmt.AcctDetailQry.do', params).then(res => {
        this.tableData = (res.list || []).map(item => ({ 
          ...item, 
          operBranchNm: res.operBranchNm,
          loanAmount: item.crFlag1 === '贷记' ? item.amount : '0',
          pickAmount: item.crFlag1 === '借记' ? item.amount : '0'
        }))
        this.showTable = true
      })
    },
    downloadHandler () {
      if (this.tableData.length > 0) {
        this.centerDialogVisible = true
      }
    },
    downloadConfirm () {
      const data = {
        acNo: this.payerAccNoList[this.formModel.acNoidex].acNo,
        subAcNo: this.payerAccNoList[this.formModel.acNoidex].subAcNo,
        startDate: util.standardDate(this.formModel.startDate),
        endDate: util.standardDate(this.formModel.endDate),
        oppAcNo: this.formModel.oppAcNo,
        oppAcName: this.formModel.oppAcName,
        remark: this.formModel.remark,
        beginTrsAmount: this.formModel.beginTrsAmount,
        endTrsAmount: this.formModel.endTrsAmount,
        _Download: this.downloadForm.fileType,
        isSort: '0'
      }
      downloadFile('/eweb-acmgmt.AcctDetailQryDown.do', data)
      this.centerDialogVisible = false
    },
    backHandler () {
      // this.$router.back()
      this.showTable = false
    },
    tableSelectChange (selection) {
      this.selection = selection
    },
    submit (res) {
      this.formModel = res
      let params = {
        acNo: this.payerAccNoList[this.formModel.acNoidex].acNo,
        subAcNo: this.payerAccNoList[this.formModel.acNoidex].subAcNo,
        startDate: util.standardDate(new Date(Date.parse(res.startDate))),
        endDate: util.standardDate(new Date(Date.parse(res.endDate)))
      }
      params = this.isMore ? Object.assign(params, {
        beginTrsAmount: this.formModel.beginTrsAmount,
        endTrsAmount: this.formModel.endTrsAmount,
        oppAcName: res.oppAcName,
        oppAcNo: res.oppAcNo,
        remark: res.remark
      }) : params
      this.listQuery(params)
      this.showTable = true
    },
    changeRadioItem (obj) {
      // this.$set(this.formModel, 'isDisabled', !(obj.radioVal === '4'))
      this.formModel.radioVal = obj.radioVal
      this.calculateDates(this.formModel.radioVal)
    },
    calculateDates (str) {
      this.$set(this.formModel, 'isDisabled', !(str === '4'))
      const end = new Date()
      const start = new Date()
      switch (str) {
        case '0':
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          break
        case '1':
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          break
        case '2':
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 3)
          break
        case '3':
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 6)
          break
        case '4':
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          break
      }
      this.formModel.startDate = util.formatDate(start)
      this.formModel.endDate = util.formatDate(end)
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      this.formModel.beginTrsAmount = this.$route.params.formModel.beginTrsAmount
      this.formModel.endTrsAmount = this.$route.params.formModel.endTrsAmount
      if (
        this.formModel.beginTrsAmount !== '' ||
        this.formModel.endTrsAmount !== '' ||
        this.formModel.oppAcNo !== '' ||
        this.formModel.oppAcName !== '' ||
        this.formModel.remark !== ''
      ) {
        this.formConfigJson.formItems[0].group = this.backupData1
        this.isMore = !this.isMore
      }
    }

    // let startTime = new Date().setFullYear(new Date().getFullYear() - 3) - 1 * 24 * 60 * 60 * 1000
    // this.formConfigJson.formItems[0].group[2].startRestrictionStart = startTime
    // this.backupData1[5].startRestrictionStart = startTime
    // this.backupData2[2].startRestrictionStart = startTime

    this.calculateDates(this.formModel.radioVal)
    this.accNoListQry()
    this.backupFormModel = JSON.parse(JSON.stringify(this.formModel))
  }
}
</script>

<style scoped>
.other-panel {
  line-height: 40px;
  padding-right: 15px;
  color: #2886E2;
  text-align: right;
}
</style>
