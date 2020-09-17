<template>
	<div id="transactionManagementDetails">
		<m-breadcrumb :data="titleData"></m-breadcrumb>
		<div class="form-box">
      <m-steps :data="stepsData"></m-steps>
      <d-table
          :table-data="dataDetail"
          :tableHeadData="titleHeadData">
      </d-table>
      <div class="fs22" style="padding: 5px 15px;background: #fff;font-weight: 700">录入详情</div>
			<m-new-form
					:componentJson="formConfigJson"
					:btnData="btnData"
					:formModel="formModel"
					@on-idea-change="ideaChangeHandler"
					@back="back"
					@submit="submit"
          @cancel="cancel"
          @downFile="downFile"
			>
        <div style="width:100%" slot="billTable">
          <d-table
							:table-data="formModel.list"
							:tableHeadData="billHeadData">
					</d-table>
        </div>
        <div style="width:100%;" slot="ticketBill">
          <d-table
							:table-data="formModel.list"
							:tableHeadData="ticketBillData">
					</d-table>
        </div>
				<div style="width:100%;" slot="formTable">
					<d-table
							:table-data="tableData"
							:tableHeadData="tableHeadData"
							@changeDate="changeDate">
						<div slot-scope="data">
							<template v-if="data.scope.userId.split(',').length > 2">
								<el-tooltip class="item" effect="dark" :content="data.scope.userId" placement="top">
									<p style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{ data.scope.userId }}</p>
								</el-tooltip>
							</template>
							<template v-else>
								<p>{{ data.scope.userId }}</p>
							</template>
						</div>
					</d-table>
				</div>
			</m-new-form>
		</div>
	</div>
</template>

<script>
import { httpPost, downloadFile } from '@/api/sys/http'
import details from '../details'
import util from '@/libs/util'
import { approvalStatusList, bill_Type, endorse_Type, process_state } from '@/assets/js/entity'

export default {
  name: 'transactionManagementDetails',
  data () {
    return {
      stepsData: {
        stepsActive: 0
      },
      titleData: [],
      formModel: {
        // payName: '',
        drawInterestType: '0',
        signFeeList: [],
        relFeeList: [],
        updateFeeList: [],
        // makeName: '',
        // payAccount: '',
        // makeAccount: '',
        // payBank: '',
        // makeBank: '',
        // payMoney: '',
        // makeMoneyBig: '',
        // payerWater: '',
        // payerClass: '',
        // useFunction: '',
        // add: '',
        // operaMan: '',
        // submitDate: '',
        idea: '',
        refuse: '',
        dateArea: {},
        protocalNo: '',
        currency: '',
        feeAmount: ''
      },
      titleHeadData: [
        { label: '流水号', prop: 'taskSeq' },
        { label: '制单人', prop: 'userName' },
        { label: '交易状态', prop: 'trsProcessState', formatter: (row, column, cellValue, index) => util.handleEnums(process_state, cellValue) }
      ],
      dataDetail: [],
      formConfigJson: {
        rules: {
          signAccount: [{ required: true, message: '请选择续费签约账户', trigger: 'submit' }],
          idea: [{ required: true, message: '请选择审核意见', trigger: 'submit' }],
          refuse: [{ required: true, message: '请输入拒绝原因', trigger: 'submit' }],
          dateArea: [{ required: true, message: '请选择时间', trigger: 'submit' }]
        },
        formItems: []
      },
      billHeadData: [
        { label: '票据号码', prop: 'stdBillNum' },
        { label: '票据类型', prop: 'stdBillTyp', width: '90px', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, cellValue) },
        { label: '出票日期', prop: 'stdIssDate', width: '120px', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '到期日', prop: 'stdDueDate', width: '120px', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '票面金额', prop: 'stdPmMoney', width: '120px', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '出票人名称', prop: 'stdDrwrNam', width: '135px' },
        { label: '收款人名称', prop: 'stdPyeeNam', width: '135px' },
        { label: '承兑人名称', prop: 'stdAccpNam', width: '135px' }
      ],
      ticketBillData: [
        { label: '票据类型', prop: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, cellValue) },
        { label: '出票日期', prop: 'stdIssDate', width: '120px', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '到期日', prop: 'stdDueDate', width: '120px', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '票面金额', prop: 'stdPmMoney', width: '100px', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '允许背书', prop: 'stdEndOrmk', formatter: (row, column, cellValue, index) => util.handleEnums(endorse_Type, cellValue) },
        { label: '出票人名称', prop: 'stdDrwrNam', width: '150px' },
        { label: '出票人账号', prop: 'stdDrwrAcc', width: '150px' },
        { label: '出票人行号', prop: 'stdDrwrBnm', width: '150px' },
        { label: '出票人行名', prop: 'stdDrwrBnam', width: '150px' },
        { label: '承兑人名称', prop: 'stdAccpNam', width: '150px' },
        { label: '承兑人账号', prop: 'stdAccpAcc', width: '150px' },
        { label: '承兑人行号', prop: 'stdAccpBnm', width: '150px' },
        { label: '承兑人行名', prop: 'stdAccpBnam', width: '150px' },
        { label: '收款人名称', prop: 'stdPyeeNam', width: '150px' },
        { label: '收款人账号', prop: 'stdPyeeAcc', width: '150px' },
        { label: '收款人行号', prop: 'stdPyeeBnm', width: '150px' },
        { label: '收款人行名', prop: 'stdPyeeBnam', width: '150px' }
      ],
      tableHeadData: [
        { label: '审核进度', prop: 'progress' },
        { label: '操作员号', prop: 'userId', width: '370px', soltName: 'userId' },
        { label: '审核时间', prop: 'checkTime', width: '170px' },
        { label: '审核意见', prop: 'opinion' },
        { label: '审核状态', prop: 'authProcessState', formatter: (row, column, cellValue, index) => approvalStatusList[row.processState] }
      ],
      tableData: [],
      btnData: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '撤回', class: 'm-submit-btn', clickEventName: 'cancel' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    downFile () {
      console.log(this.formModel.sourceFilePath)
      const params = {
        fileName: this.formModel.fileName,
        filePath: this.formModel.sourceFilePath
      }
      downloadFile('/eweb-common.DownloadFile.do', params)
    },
    changeDate (params) {
      console.log(params)
    },
    ideaChangeHandler (formModel) {
      const { idea, refuse } = formModel
      this.formModel.refuse = idea === '1' ? refuse : ''
      this.formConfigJson.rules.refuse[0].required = idea === '1'
      this.formConfigJson.formItems[this.formConfigJson.formItems.length - 1].group[1].show = idea === '1'
    },
    // 确定
    submit (data) {
      if (data.idea === '0') {
        httpPost('/eweb-setting.CheckPassOrRejForNManConfirm.do').then(res => {
          this.$router.push({
            name: 'confirmPage',
            params: {
              data: this.dataDetail,
              formModel: res
            }
          })
        })
      } else {
        httpPost('/eweb-setting.CheckPassOrRejForNManConfirm.do').then(res => {
          this.$router.push({
            name: 'refuseConfirmPage',
            params: {
              data: this.dataDetail,
              refuse: data.refuse,
              formModel: res
            }
          })
        })
      }
    },
    // 撤回
    cancel () {
      httpPost('/eweb-setting.CheckPassOrRejForCcNManConfirm.do', {}).then(res => {
        this.$router.push({
          name: 'myFormConfirm',
          params: {
            data: this.dataDetail,
            formModel: res,
            type: '3'
          }
        })
      })
    },
    // 返回
    back (res) {
      if (this.activeName === 'third') {
        this.$router.push({
          name: 'myForm'
        }) 
      } else {
        this.$router.push({
          name: 'waitQPage',
          params: {
            activeName: this.activeName
          }
        }) 
      }
    },
    handleTableData (res) {
      this.tableData = res.taskInfo
      let arr = []
      let list1 = []
      let list = []
      for (let i = 0; i < this.tableData.length; i++) {
        arr.push(this.tableData[i].userId)
        this.tableData[i].progress = this.tableData[i].message.split(',')[0]
        this.tableData[i].opinion = this.tableData[i].message.split(',')[1]
      }
      res.authList && res.authList.forEach(item => {
        !arr.includes(item.userId) && list1.push(item)
      })
      list1.forEach(item => {
        if (list[item.level - 1] === undefined) {
          item['progress'] = `${item.level}级审核`
          this.$set(list, item.level - 1, item)
        } else {
          list[item.level - 1].userId += ', ' + item.userId
        }
      })
      list.forEach(item => {
        item.processState = 'WCK'
      })
      this.tableData = [ ...this.tableData, ...list ]
    }
  },
  created () {
    let { type, jnlNo, transCode, detail } = this.$route.params
    if (this.$route.params.detail) {
      this.dataDetail.push(this.$route.params.detail)
    } else {
      this.back()
    }
    console.log(transCode, type)
    this.formConfigJson.formItems = details(transCode, type)
    let params = {
      jnlNo: jnlNo,
      productId: detail.productId,
      acSeq: detail.acSeq ? detail.acSeq : '',
      mgmtFlag: '0'
    }
    if (type === '1') {
      this.activeName = 'first'
      this.btnData[1].show = false
      httpPost('eweb-query.WaitAuthQryJnl.do', params).then(res => {
        if (transCode === 'eweb-transfer.TimeTransferTrsRepeal') { // 定时交易处理
          if (res.bodyMap.asFlag === '1') {
            this.formConfigJson.formItems[0].group[14].show = true
            this.formConfigJson.formItems[0].group[15].show = true
          }
        }
        this.formModel = res.bodyMap
        if (transCode === 'eweb-invest.InvestProductBuy') { // 判断理财购买收益类型
          if (res.bodyMap.prdTemplate === '1300') {
            this.formConfigJson.formItems[0].group.splice(6, 0, { label: '单位净值', key: 'netWorth', type: 'text', formatter: (row, column, cellValue, index) => Number(column).toFixed(6) })
            this.formConfigJson.formItems[0].group.splice(7, 0, { label: '七日年化收益率', key: 'weekRate', type: 'text' })
            this.formModel.netWorth = Number(this.formModel.netWorth).toFixed(6) + '(' + this.formModel.apNavDate + ')'
            this.formModel.interestDays = '无固定期限'
          } else {
            this.formConfigJson.formItems[0].group.splice(6, 0, { label: '募集期', key: 'ipoStartDate', type: 'text' })
            this.formConfigJson.formItems[0].group.splice(7, 0, { label: '冷静期', key: 'ipoEndDate', type: 'text' })
            this.formConfigJson.formItems[0].group.splice(8, 0, { label: '起息日', key: 'incomeDate', type: 'text' })
            this.formConfigJson.formItems[0].group.splice(9, 0, { label: '到期日', key: 'incomeEndDate', type: 'text' })
            this.formConfigJson.formItems[0].group.splice(10, 0, { label: '业绩比较基准', key: 'modelComment', type: 'text' })
            this.formModel.ipoStartDate = this.formModel.ipoStartDate + '-' + this.formModel.ipoEndDate
          }
        }
        if (transCode === 'eweb-invest.InvestProductCancle') { // 判断理财购买撤销类型
          if (res.bodyMap.prdTemplate === '1300') {
            this.formConfigJson.formItems[0].group[8].show = true
            this.formConfigJson.formItems[0].group[9].show = true
            this.formModel.netWorth = Number(this.formModel.netWorth).toFixed(6) + '(' + util.sepDate(this.formModel.apNavDate) + ')'
          } else {
            this.formConfigJson.formItems[0].group[5].show = true
            this.formConfigJson.formItems[0].group[6].show = true
            this.formConfigJson.formItems[0].group[7].show = true
          }
        }
        if (transCode === 'eweb-invest.InvestProductRedCancle') { // 理财赎回撤销
          this.formModel.netWorth = Number(this.formModel.netWorth).toFixed(6) + '(' + util.sepDate(this.formModel.apNavDate) + ')'
        }
        if (transCode === 'eweb-edraft.AcceptApplicationBatch') { // 批量提示承兑
          const obj = res.bodyMap.list[0]
          // this.formModel.stdDrwrAcc = res.bodyMap.list[0].stdAccpAcc
          this.formModel = {
            ...this.formModel,
            ...obj
          }
        }
        if (transCode === 'eweb-edraft.CdCurrentSignBatch') { // 批量提示承兑应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdAccpAcc
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
        }
        if (transCode === 'eweb-edraft.GuaranteeApplyBatch') { // 批量保证申请
          this.formModel.stdGteeAcc = res.bodyMap.list[0].stdRcvAcct
          this.formModel.stdGteeNam = res.bodyMap.list[0].stdRcvName
          this.formModel.stdGteeCod = res.bodyMap.list[0].stdRcvCode
          this.formModel.stdGteeBnm = res.bodyMap.list[0].stdRcvBnm
          this.formModel.stdWareNam = res.bodyMap.list[0].stdWareNam
          this.formModel.stdWareAcc = res.bodyMap.list[0].stdWareAcc
          this.formModel.stdWareBnm = res.bodyMap.list[0].stdWareBnm
        }
        if (transCode === 'eweb-edraft.BzCurrentSignBatch') { // 批量保证应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdAccpAcc
          this.formModel.stdSgnrAdr = res.bodyMap.list[0].stdSgnrAdr
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
        }
        if (transCode === 'eweb-edraft.PledgeReqBatch') { // 批量质押申请
          this.formModel.pledgeeName = res.bodyMap.list[0].stdCobkNam
          this.formModel.pledgeeAcc = res.bodyMap.list[0].stdRcvAcct
          this.formModel.pledgeeBank = res.bodyMap.list[0].stdCobkBnm
          this.formModel.stdColtAcc = res.bodyMap.list[0].stdRcvAcct
        }
        if (transCode === 'eweb-edraft.ZyCurrentSignBatch') { // 批量质押应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdDrwrAcc
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
        }
        if (transCode === 'eweb-edraft.EndorsedTransferBatch') { // 批量背书申请
          this.formModel.stdCustAcc = res.bodyMap.list[0].stdRcvAcct
          this.formModel.stdEndeNam = res.bodyMap.list[0].stdEndeNam
          this.formModel.stdEndeAcc = res.bodyMap.list[0].stdEndeAcc
          this.formModel.stdEndeBnm = res.bodyMap.list[0].stdEndeBnm
          this.formModel.stdBanmFlg = res.bodyMap.list[0].stdBanmFlg
          this.formModel.std400Memo = res.bodyMap.list[0].std400Memo
        }
        if (transCode === 'eweb-edraft.BsCurrentSignBatch') { // 批量背书应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdRcvAcct
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
          this.formModel.std400Memo = res.bodyMap.list[0].std400Memo
        }
        if (transCode === 'eweb-edraft.SpCurrentSignBatch') { // 批量提示收票应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdAccpAcc
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
        }
        if (transCode === 'eweb-edraft.PaymentReminder') { // 提示付款申请
          if (this.formModel.stdBussTyp === '02') {
            this.formConfigJson.formItems[0].group[7].show = true
          }
        }
        if (transCode === 'eweb-edraft.JfCurrentSign') { // 拒付
          if (this.formModel.stdDshnRcd === 'DC08') {
            this.formConfigJson.formItems[0].group[8].show = true
          }
        }
        if (transCode === 'eweb-edraft.Discount') { // 贴现申请（单笔）
          if (this.formModel.stdDshnRcd === '03') {
            this.formConfigJson.formItems[0].group[7].show = true
          }
        }
        if (transCode === 'eweb-edraft.DiscountBatch') { // 贴现申请（批量）
          this.formModel.stdDsntTyp = res.bodyMap.list[0].stdDsntTyp
          this.formModel.stdInteMtd = res.bodyMap.list[0].stdInteMtd
          this.formModel.stdDscntRt = res.bodyMap.list[0].stdDscntRt
          this.formModel.stdDsbkNme = res.bodyMap.list[0].stdDsbkNme
          this.formModel.stdDsbkBnm = res.bodyMap.list[0].stdDsbkBnm
          this.formModel.stdDsbkBnam = res.bodyMap.list[0].stdDsbkBnam
          this.formModel.stdStlMthd = res.bodyMap.list[0].stdStlMthd
          this.formModel.stdAoaiAcc = res.bodyMap.list[0].stdAoaiAcc
          this.formModel.stdAoaiBnam = res.bodyMap.list[0].stdAoaiBnam
          this.formModel.stdBnedRmt = res.bodyMap.list[0].stdBnedRmt
          this.formModel.stdCustAcc = res.bodyMap.list[0].stdAoaiAcc
          if (this.formModel.stdInteMtd === '03') {
            this.formConfigJson.formItems[1].group[2].show = true
            this.formModel.stdIntRate = res.bodyMap.list[0].stdIntRate
          }
        }

        if (transCode === 'eweb-edraft.IssueRegister' && this.formModel.stdBillTyp === 'AC02') { // 出票登记(单笔)
          this.formConfigJson.formItems[2].group[0].show = true
          this.formConfigJson.formItems[2].group[1].show = true
        }
        if (transCode === 'eweb-transfer.BatchTransfer' && this.formModel.sourceFilePath) { // 批量转账
          this.formConfigJson.formItems[0].group[4].show = true
        }
        if (transCode === 'eweb-transfer.FinanceReimburse' && this.formModel.sourceFilePath) { // 财务报销
          this.formConfigJson.formItems[0].group[6].show = true
        }
        if (transCode === 'eweb-transfer.SmallLimitBorrow' && this.formModel.sourceFilePath) { // 小额定期借记业务
          this.formConfigJson.formItems[0].group[8].show = true
        }
        if (transCode === 'eweb-transfer.PaySalaryUpload' && this.formModel.sourceFilePath) { // 代发工资
          this.formConfigJson.formItems[0].group[6].show = true
        }
        if (transCode === 'eweb-transfer.LotteryPayFee') { // 体彩缴费
          this.formModel.payArea = '大连'
          this.formModel.payItem = '体彩缴费'
          this.formModel.chargeUnit = '大连体彩中心'
          if (this.formModel.serviceNum === '0120000501') {
            this.formModel.lotteryType = '电脑彩票'
          }
        }
        if (transCode === 'eweb-transfer.PaySalaryUpload' || transCode === 'eweb-transfer.BatchTransfer' || transCode === 'eweb-transfer.FinanceReimburse') {
          this.formModel.payerAccNo = res.bodyMap.payerAccount.acNo
        }
        if (transCode === 'eweb-transfer.Transfer') { // 单笔转账
          if (this.formModel.remitModel === '0' && this.formModel.scheduleFlag === 'Y') { // 判断到账模式是否为预约
            this.formModel.remitModel = '3'
            this.formConfigJson.formItems[0].group[13].show = true
            this.formConfigJson.formItems[0].group[14].show = true
            this.formModel.scheduleBeginTime = this.formModel.scheduleBeginTime.split(' ')[1]
          }
          if (this.formModel.asFlag === '1') { // 判断是否使用账簿
            this.formConfigJson.formItems[0].group[6].show = true
            this.formConfigJson.formItems[0].group[7].show = true
          }
        }
        if (transCode === 'eweb-cash.MultistageBookTransfer') { // 多级账簿转账
          if (this.formModel.bookingFlag === '1') { // 判断到账模式是否为预约
            this.formConfigJson.formItems[0].group[15].show = true
            this.formConfigJson.formItems[0].group[16].show = true
          }
          if (this.formModel.asFlag === '1') { // 判断是否使用账簿
            this.formConfigJson.formItems[0].group[4].show = true
            this.formConfigJson.formItems[0].group[5].show = true
          }
        }
        if (transCode === 'eweb-largeDeposit.LargeDepositAssignApply' && this.formModel.priceType === '1') { // 判断单位大额存单转让是否为客户定价
          this.formConfigJson.formItems[0].group[14].show = true
        }
        if (transCode === 'eweb-largeDeposit.LargeDepositAssignAffirm') {
          if (this.formModel.isConfirm === '1') { // 判断单位大额存单受让是否为拒绝操作
            this.formConfigJson.formItems[0].title = '单位大额存单受让拒绝'
          }
          if (this.formModel.priceType === '1') { // 判断单位大额存单转让是否为客户定价
            this.formConfigJson.formItems[0].group[12].show = true
          }
        }
        this.dataDetail[0].trsProcessState = res.trsProcessState
        this.handleTableData(res)
      })
    } else if (type === '2') {
      this.activeName = 'second'
      delete this.stepsData.stepsActive
      this.titleHeadData[0].prop = 'jnlno'
      this.btnData[0].show = false
      this.btnData[1].show = false
      httpPost('eweb-query.WaitAuthedQryJnl.do', params).then(res => {
        this.formModel = res.bodyMap
        if (transCode === 'eweb-invest.InvestProductBuy') { // 判断理财购买收益类型
          if (res.bodyMap.prdTemplate === '1300') {
            this.formConfigJson.formItems[0].group.splice(6, 0, { label: '单位净值', key: 'netWorth', type: 'text', formatter: (row, column, cellValue, index) => Number(column).toFixed(6) })
            this.formConfigJson.formItems[0].group.splice(7, 0, { label: '七日年化收益率', key: 'weekRate', type: 'text' })
            this.formModel.netWorth = Number(this.formModel.netWorth).toFixed(6) + '(' + this.formModel.apNavDate + ')'
            this.formModel.interestDays = '无固定期限'
          } else {
            this.formConfigJson.formItems[0].group.splice(6, 0, { label: '募集期', key: 'ipoStartDate', type: 'text' })
            this.formConfigJson.formItems[0].group.splice(7, 0, { label: '冷静期', key: 'ipoEndDate', type: 'text' })
            this.formConfigJson.formItems[0].group.splice(8, 0, { label: '起息日', key: 'incomeDate', type: 'text' })
            this.formConfigJson.formItems[0].group.splice(9, 0, { label: '到期日', key: 'incomeEndDate', type: 'text' })
            this.formConfigJson.formItems[0].group.splice(10, 0, { label: '业绩比较基准', key: 'modelComment', type: 'text' })
            this.formModel.ipoStartDate = this.formModel.ipoStartDate + '-' + this.formModel.ipoEndDate
          }
        }
        if (transCode === 'eweb-invest.InvestProductCancle') { // 判断理财购买撤销类型
          if (res.bodyMap.prdTemplate === '1300') {
            this.formConfigJson.formItems[0].group[8].show = true
            this.formConfigJson.formItems[0].group[9].show = true
            this.formModel.netWorth = Number(this.formModel.netWorth).toFixed(6) + '(' + util.sepDate(this.formModel.apNavDate) + ')'
          } else {
            this.formConfigJson.formItems[0].group[5].show = true
            this.formConfigJson.formItems[0].group[6].show = true
            this.formConfigJson.formItems[0].group[7].show = true
          }
        }
        if (transCode === 'eweb-invest.InvestProductRedCancle') { // 理财赎回撤销
          this.formModel.netWorth = Number(this.formModel.netWorth).toFixed(6) + '(' + util.sepDate(this.formModel.apNavDate) + ')'
        }
        if (transCode === 'eweb-transfer.TimeTransferTrsRepeal') { // 定时交易处理
          if (res.bodyMap.asFlag === '1') {
            this.formConfigJson.formItems[0].group[14].show = true
            this.formConfigJson.formItems[0].group[15].show = true
          }
        }
        switch (this.$route.params.detail.authProcessState) {
          case 'AG':
            this.formModel.idea = '0'
            this.formConfigJson.formItems[this.formConfigJson.formItems.length - 1].group[1].show = false
            break
          case 'RJ':
            this.formModel.idea = '1'
            this.formConfigJson.formItems[this.formConfigJson.formItems.length - 1].group[1].show = true
            break
        }
        if (this.formModel.idea === '1') {
          for (let i = 0; i < res.taskInfo.length; i++) {
            if (res.taskInfo[i].processState === 'RJ') {
              this.formModel.refuse = res.taskInfo[i].remark
              break
            }
          }
        }
        if (transCode === 'eweb-edraft.AcceptApplicationBatch') { // 批量提示承兑
          // this.formModel.stdDrwrAcc = res.bodyMap.list[0].stdAccpAcc
          const obj = res.bodyMap.list[0]
          // this.formModel.stdDrwrAcc = res.bodyMap.list[0].stdAccpAcc
          this.formModel = {
            ...this.formModel,
            ...obj
          }
        }
        if (transCode === 'eweb-edraft.CdCurrentSignBatch') { // 批量提示承兑应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdAccpAcc
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
        }
        if (transCode === 'eweb-edraft.GuaranteeApplyBatch') { // 批量保证申请
          this.formModel.stdGteeAcc = res.bodyMap.list[0].stdRcvAcct
          this.formModel.stdGteeNam = res.bodyMap.list[0].stdRcvName
          this.formModel.stdGteeCod = res.bodyMap.list[0].stdRcvCode
          this.formModel.stdGteeBnm = res.bodyMap.list[0].stdRcvBnm
          this.formModel.stdWareNam = res.bodyMap.list[0].stdWareNam
          this.formModel.stdWareAcc = res.bodyMap.list[0].stdWareAcc
          this.formModel.stdWareBnm = res.bodyMap.list[0].stdWareBnm
        }
        if (transCode === 'eweb-edraft.BzCurrentSignBatch') { // 批量保证应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdAccpAcc
          this.formModel.stdSgnrAdr = res.bodyMap.list[0].stdSgnrAdr
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
        }
        if (transCode === 'eweb-edraft.PledgeReqBatch') { // 批量质押申请
          this.formModel.pledgeeName = res.bodyMap.list[0].stdCobkNam
          this.formModel.pledgeeAcc = res.bodyMap.list[0].stdRcvAcct
          this.formModel.pledgeeBank = res.bodyMap.list[0].stdCobkBnm
          this.formModel.stdColtAcc = res.bodyMap.list[0].stdRcvAcct
        }
        if (transCode === 'eweb-edraft.ZyCurrentSignBatch') { // 批量质押应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdDrwrAcc
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
        }
        if (transCode === 'eweb-edraft.EndorsedTransferBatch') { // 批量背书申请
          this.formModel.stdCustAcc = res.bodyMap.list[0].stdRcvAcct
          this.formModel.stdEndeNam = res.bodyMap.list[0].stdEndeNam
          this.formModel.stdEndeAcc = res.bodyMap.list[0].stdEndeAcc
          this.formModel.stdEndeBnm = res.bodyMap.list[0].stdEndeBnm
          this.formModel.stdBanmFlg = res.bodyMap.list[0].stdBanmFlg
          this.formModel.std400Memo = res.bodyMap.list[0].std400Memo
        }
        if (transCode === 'eweb-edraft.BsCurrentSignBatch') { // 批量背书应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdRcvAcct
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
          this.formModel.std400Memo = res.bodyMap.list[0].std400Memo
        }
        if (transCode === 'eweb-edraft.SpCurrentSignBatch') { // 批量提示收票应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdAccpAcc
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
        }
        if (transCode === 'eweb-edraft.PaymentReminder') { // 提示付款申请
          if (this.formModel.stdBussTyp === '02') {
            this.formConfigJson.formItems[0].group[7].show = true
          }
        }
        if (transCode === 'eweb-edraft.JfCurrentSign') { // 拒付
          if (this.formModel.stdDshnRcd === 'DC08') {
            this.formConfigJson.formItems[0].group[8].show = true
          }
        }
        if (transCode === 'eweb-edraft.Discount') { // 贴现申请（单笔）
          if (this.formModel.stdDshnRcd === '03') {
            this.formConfigJson.formItems[0].group[7].show = true
          }
        }
        if (transCode === 'eweb-edraft.DiscountBatch') { // 贴现申请（批量）
          this.formModel.stdDsntTyp = res.bodyMap.list[0].stdDsntTyp
          this.formModel.stdInteMtd = res.bodyMap.list[0].stdInteMtd
          this.formModel.stdDscntRt = res.bodyMap.list[0].stdDscntRt
          this.formModel.stdDsbkNme = res.bodyMap.list[0].stdDsbkNme
          this.formModel.stdDsbkBnm = res.bodyMap.list[0].stdDsbkBnm
          this.formModel.stdDsbkBnam = res.bodyMap.list[0].stdDsbkBnam
          this.formModel.stdStlMthd = res.bodyMap.list[0].stdStlMthd
          this.formModel.stdAoaiAcc = res.bodyMap.list[0].stdAoaiAcc
          this.formModel.stdAoaiBnam = res.bodyMap.list[0].stdAoaiBnam
          this.formModel.stdBnedRmt = res.bodyMap.list[0].stdBnedRmt
          this.formModel.stdCustAcc = res.bodyMap.list[0].stdAoaiAcc
          if (this.formModel.stdInteMtd === '03') {
            this.formConfigJson.formItems[1].group[2].show = true
            this.formModel.stdIntRate = res.bodyMap.list[0].stdIntRate
          }
        }

        if (transCode === 'eweb-edraft.IssueRegister' && this.formModel.stdBillTyp === 'AC02') { // 出票登记(单笔)
          this.formConfigJson.formItems[2].group[0].show = true
          this.formConfigJson.formItems[2].group[1].show = true
        }
        if (transCode === 'eweb-transfer.BatchTransfer' && this.formModel.sourceFilePath) { // 批量转账
          this.formConfigJson.formItems[0].group[4].show = true
        }
        if (transCode === 'eweb-transfer.FinanceReimburse' && this.formModel.sourceFilePath) { // 财务报销
          this.formConfigJson.formItems[0].group[6].show = true
        }
        if (transCode === 'eweb-transfer.SmallLimitBorrow' && this.formModel.sourceFilePath) { // 小额定期借记业务
          this.formConfigJson.formItems[0].group[8].show = true
        }
        if (transCode === 'eweb-transfer.PaySalaryUpload' && this.formModel.sourceFilePath) { // 代发工资
          this.formConfigJson.formItems[0].group[6].show = true
        }
        if (transCode === 'eweb-transfer.LotteryPayFee') { // 体彩缴费
          this.formModel.payArea = '大连'
          this.formModel.payItem = '体彩缴费'
          this.formModel.chargeUnit = '大连体彩中心'
          if (this.formModel.serviceNum === '0120000501') {
            this.formModel.lotteryType = '电脑彩票'
          }
        }
        if (transCode === 'eweb-transfer.PaySalaryUpload' || transCode === 'eweb-transfer.BatchTransfer' || transCode === 'eweb-transfer.FinanceReimburse') {
          this.formModel.payerAccNo = res.bodyMap.payerAccount.acNo
        }
        if (transCode === 'eweb-transfer.Transfer') { // 单笔转账
          if (this.formModel.remitModel === '0' && this.formModel.scheduleFlag === 'Y') { // 判断到账模式是否为预约
            this.formModel.remitModel = '3'
            this.formConfigJson.formItems[0].group[13].show = true
            this.formConfigJson.formItems[0].group[14].show = true
            this.formModel.scheduleBeginTime = this.formModel.scheduleBeginTime.split(' ')[1]
          }
          if (this.formModel.asFlag === '1') { // 判断是否使用账簿
            this.formConfigJson.formItems[0].group[6].show = true
            this.formConfigJson.formItems[0].group[7].show = true
          }
        }
        if (transCode === 'eweb-cash.MultistageBookTransfer') { // 多级账簿转账
          if (this.formModel.bookingFlag === '1') { // 判断到账模式是否为预约
            this.formConfigJson.formItems[0].group[15].show = true
            this.formConfigJson.formItems[0].group[16].show = true
          }
          if (this.formModel.asFlag === '1') { // 判断是否使用账簿
            this.formConfigJson.formItems[0].group[4].show = true
            this.formConfigJson.formItems[0].group[5].show = true
          }
        }
        if (transCode === 'eweb-largeDeposit.LargeDepositAssignApply' && this.formModel.priceType === '1') { // 判断单位大额存单转让是否为客户定价
          this.formConfigJson.formItems[0].group[14].show = true
        }
        if (transCode === 'eweb-largeDeposit.LargeDepositAssignAffirm') {
          if (this.formModel.isConfirm === '1') { // 判断单位大额存单受让是否为拒绝操作
            this.formConfigJson.formItems[0].title = '单位大额存单受让拒绝'
          }
          if (this.formModel.priceType === '1') { // 判断单位大额存单转让是否为客户定价
            this.formConfigJson.formItems[0].group[12].show = true
          }
        }
        this.dataDetail[0].trsProcessState = res.trsProcessState
        this.handleTableData(res)
      })
    } else {
      this.activeName = 'third'
      this.btnData[0].show = false
      if (!(this.$route.params.detail.processState === 'WCK' || this.$route.params.detail.processState === 'CK')) {
        this.btnData[1].show = false
        delete this.stepsData.stepsActive
      }
      httpPost('eweb-query.SelfAuthDetailQuery.do', params).then(res => {
        this.formModel = res.bodyMap
        if (transCode === 'eweb-invest.InvestProductBuy') { // 判断理财购买收益类型
          if (res.bodyMap.prdTemplate === '1300') {
            this.formConfigJson.formItems[0].group.splice(6, 0, { label: '单位净值', key: 'netWorth', type: 'text' })
            this.formConfigJson.formItems[0].group.splice(7, 0, { label: '七日年化收益率', key: 'weekRate', type: 'text' })
            this.formModel.netWorth = Number(this.formModel.netWorth).toFixed(6) + '(' + this.formModel.apNavDate + ')'
            this.formModel.interestDays = '无固定期限'
          } else {
            this.formConfigJson.formItems[0].group.splice(6, 0, { label: '募集期', key: 'ipoStartDate', type: 'text' })
            this.formConfigJson.formItems[0].group.splice(7, 0, { label: '冷静期', key: 'ipoEndDate', type: 'text' })
            this.formConfigJson.formItems[0].group.splice(8, 0, { label: '起息日', key: 'incomeDate', type: 'text' })
            this.formConfigJson.formItems[0].group.splice(9, 0, { label: '到期日', key: 'incomeEndDate', type: 'text' })
            this.formConfigJson.formItems[0].group.splice(10, 0, { label: '业绩比较基准', key: 'modelComment', type: 'text' })
            this.formModel.ipoStartDate = this.formModel.ipoStartDate + '-' + this.formModel.ipoEndDate
          }
        }
        if (transCode === 'eweb-invest.InvestProductCancle') { // 判断理财购买撤销类型
          if (res.bodyMap.prdTemplate === '1300') {
            this.formConfigJson.formItems[0].group[8].show = true
            this.formConfigJson.formItems[0].group[9].show = true
            this.formModel.netWorth = Number(this.formModel.netWorth).toFixed(6) + '(' + util.sepDate(this.formModel.apNavDate) + ')'
          } else {
            this.formConfigJson.formItems[0].group[5].show = true
            this.formConfigJson.formItems[0].group[6].show = true
            this.formConfigJson.formItems[0].group[7].show = true
          }
        }
        if (transCode === 'eweb-invest.InvestProductRedCancle') { // 理财赎回撤销
          this.formModel.netWorth = Number(this.formModel.netWorth).toFixed(6) + '(' + util.sepDate(this.formModel.apNavDate) + ')'
        }
        if (transCode === 'eweb-transfer.TimeTransferTrsRepeal') { // 定时交易处理
          if (res.bodyMap.asFlag === '1') {
            this.formConfigJson.formItems[0].group[14].show = true
            this.formConfigJson.formItems[0].group[15].show = true
          }
        }
        if (transCode === 'eweb-edraft.AcceptApplicationBatch') { // 批量提示承兑
          // this.formModel.stdDrwrAcc = res.bodyMap.list[0].stdDrwrAcc
          const obj = res.bodyMap.list[0]
          // this.formModel.stdDrwrAcc = res.bodyMap.list[0].stdAccpAcc
          this.formModel = {
            ...this.formModel,
            ...obj
          }
        }
        if (transCode === 'eweb-edraft.CdCurrentSignBatch') { // 批量提示承兑应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdAccpAcc
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
        }
        if (transCode === 'eweb-edraft.GuaranteeApplyBatch') { // 批量保证申请
          this.formModel.stdGteeAcc = res.bodyMap.list[0].stdRcvAcct
          this.formModel.stdGteeNam = res.bodyMap.list[0].stdRcvName
          this.formModel.stdGteeCod = res.bodyMap.list[0].stdRcvCode
          this.formModel.stdGteeBnm = res.bodyMap.list[0].stdRcvBnm
          this.formModel.stdWareNam = res.bodyMap.list[0].stdWareNam
          this.formModel.stdWareAcc = res.bodyMap.list[0].stdWareAcc
          this.formModel.stdWareBnm = res.bodyMap.list[0].stdWareBnm
        }
        if (transCode === 'eweb-edraft.BzCurrentSignBatch') { // 批量保证应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdAccpAcc
          this.formModel.stdSgnrAdr = res.bodyMap.list[0].stdSgnrAdr
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
        }
        if (transCode === 'eweb-edraft.PledgeReqBatch') { // 批量质押申请
          this.formModel.pledgeeName = res.bodyMap.list[0].stdCobkNam
          this.formModel.pledgeeAcc = res.bodyMap.list[0].stdRcvAcct
          this.formModel.pledgeeBank = res.bodyMap.list[0].stdCobkBnm
          this.formModel.stdColtAcc = res.bodyMap.list[0].stdRcvAcct
        }
        if (transCode === 'eweb-edraft.ZyCurrentSignBatch') { // 批量质押应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdDrwrAcc
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
        }
        if (transCode === 'eweb-edraft.EndorsedTransferBatch') { // 批量背书申请
          this.formModel.stdCustAcc = res.bodyMap.list[0].stdRcvAcct
          this.formModel.stdEndeNam = res.bodyMap.list[0].stdEndeNam
          this.formModel.stdEndeAcc = res.bodyMap.list[0].stdEndeAcc
          this.formModel.stdEndeBnm = res.bodyMap.list[0].stdEndeBnm
          this.formModel.stdBanmFlg = res.bodyMap.list[0].stdBanmFlg
          this.formModel.std400Memo = res.bodyMap.list[0].std400Memob
        }
        if (transCode === 'eweb-edraft.BsCurrentSignBatch') { // 批量背书应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdRcvAcct
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
          this.formModel.std400Memo = res.bodyMap.list[0].std400Memob
        }
        if (transCode === 'eweb-edraft.SpCurrentSignBatch') { // 批量提示收票应答
          this.formModel.stdSgnrAcc = res.bodyMap.list[0].stdAccpAcc
          this.formModel.stdSgnrRes = res.bodyMap.list[0].stdSgnrRes
        }
        if (transCode === 'eweb-edraft.PaymentReminder') { // 提示付款申请
          if (this.formModel.stdBussTyp === '02') {
            this.formConfigJson.formItems[0].group[7].show = true
          }
        }
        if (transCode === 'eweb-edraft.JfCurrentSign') { // 拒付
          if (this.formModel.stdDshnRcd === 'DC08') {
            this.formConfigJson.formItems[0].group[8].show = true
          }
        }
        if (transCode === 'eweb-edraft.Discount') { // 贴现申请（单笔）
          if (this.formModel.stdDshnRcd === '03') {
            this.formConfigJson.formItems[0].group[7].show = true
          }
        }
        if (transCode === 'eweb-edraft.DiscountBatch') { // 贴现申请（批量）
          this.formModel.stdDsntTyp = res.bodyMap.list[0].stdDsntTyp
          this.formModel.stdInteMtd = res.bodyMap.list[0].stdInteMtd
          this.formModel.stdDscntRt = res.bodyMap.list[0].stdDscntRt
          this.formModel.stdDsbkNme = res.bodyMap.list[0].stdDsbkNme
          this.formModel.stdDsbkBnm = res.bodyMap.list[0].stdDsbkBnm
          this.formModel.stdDsbkBnam = res.bodyMap.list[0].stdDsbkBnam
          this.formModel.stdStlMthd = res.bodyMap.list[0].stdStlMthd
          this.formModel.stdAoaiAcc = res.bodyMap.list[0].stdAoaiAcc
          this.formModel.stdAoaiBnam = res.bodyMap.list[0].stdAoaiBnam
          this.formModel.stdBnedRmt = res.bodyMap.list[0].stdBnedRmt
          this.formModel.stdCustAcc = res.bodyMap.list[0].stdAoaiAcc
          if (this.formModel.stdInteMtd === '03') {
            this.formConfigJson.formItems[1].group[2].show = true
            this.formModel.stdIntRate = res.bodyMap.list[0].stdIntRate
          }
        }

        if (transCode === 'eweb-edraft.IssueRegister' && this.formModel.stdBillTyp === 'AC02') { // 出票登记(单笔)
          this.formConfigJson.formItems[2].group[0].show = true
          this.formConfigJson.formItems[2].group[1].show = true
        }
        if (transCode === 'eweb-transfer.BatchTransfer' && this.formModel.sourceFilePath) { // 批量转账
          this.formConfigJson.formItems[0].group[4].show = true
        }
        if (transCode === 'eweb-transfer.FinanceReimburse' && this.formModel.sourceFilePath) { // 财务报销
          this.formConfigJson.formItems[0].group[6].show = true
        }
        if (transCode === 'eweb-transfer.SmallLimitBorrow' && this.formModel.sourceFilePath) { // 小额定期借记业务
          this.formConfigJson.formItems[0].group[8].show = true
        }
        if (transCode === 'eweb-transfer.PaySalaryUpload' && this.formModel.sourceFilePath) { // 代发工资
          this.formConfigJson.formItems[0].group[6].show = true
        }
        if (transCode === 'eweb-transfer.LotteryPayFee') { // 体彩缴费
          this.formModel.payArea = '大连'
          this.formModel.payItem = '体彩缴费'
          this.formModel.chargeUnit = '大连体彩中心'
          if (this.formModel.serviceNum === '0120000501') {
            this.formModel.lotteryType = '电脑彩票'
          }
        }
        if (transCode === 'eweb-transfer.PaySalaryUpload' || transCode === 'eweb-transfer.BatchTransfer' || transCode === 'eweb-transfer.FinanceReimburse') {
          this.formModel.payerAccNo = res.bodyMap.payerAccount.acNo
        }
        if (transCode === 'eweb-transfer.Transfer') { // 单笔转账
          if (this.formModel.remitModel === '0' && this.formModel.scheduleFlag === 'Y') { // 判断到账模式是否为预约
            this.formModel.remitModel = '3'
            this.formConfigJson.formItems[0].group[13].show = true
            this.formConfigJson.formItems[0].group[14].show = true
            this.formModel.scheduleBeginTime = this.formModel.scheduleBeginTime.split(' ')[1]
          }
          if (this.formModel.asFlag === '1') { // 判断是否使用账簿
            this.formConfigJson.formItems[0].group[6].show = true
            this.formConfigJson.formItems[0].group[7].show = true
          }
        }
        if (transCode === 'eweb-cash.MultistageBookTransfer') { // 多级账簿转账
          if (this.formModel.bookingFlag === '1') { // 判断到账模式是否为预约
            this.formConfigJson.formItems[0].group[15].show = true
            this.formConfigJson.formItems[0].group[16].show = true
          }
          if (this.formModel.asFlag === '1') { // 判断是否使用账簿
            this.formConfigJson.formItems[0].group[4].show = true
            this.formConfigJson.formItems[0].group[5].show = true
          }
        }
        if (transCode === 'eweb-largeDeposit.LargeDepositAssignApply' && this.formModel.priceType === '1') { // 判断单位大额存单转让是否为客户定价
          this.formConfigJson.formItems[0].group[14].show = true
        }
        if (transCode === 'eweb-largeDeposit.LargeDepositAssignAffirm') {
          if (this.formModel.isConfirm === '1') { // 判断单位大额存单受让是否为拒绝操作
            this.formConfigJson.formItems[0].title = '单位大额存单受让拒绝'
          }
          if (this.formModel.priceType === '1') { // 判断单位大额存单转让是否为客户定价
            this.formConfigJson.formItems[0].group[12].show = true
          }
        }
        this.dataDetail[0].trsProcessState = res.trsProcessState
        this.handleTableData(res)
      })
    }
    switch (this.activeName) {
      case 'first':
        this.titleData = ['交易管理', '业务类交易审核', '待审核记录查询']
        break
      case 'second':
        this.titleData = ['交易管理', '业务类交易审核', '审核记录查询']
        break
      case 'third':
        this.titleData = ['交易管理', '业务类交易审核', '我的制单']
        break
    }
  }
}
</script>
