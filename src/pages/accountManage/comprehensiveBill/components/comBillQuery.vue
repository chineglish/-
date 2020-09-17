<template>
  <d2-container class="comprehensive-bill-qry">
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          @submit="Onsubmit"
          @optionChange="optionChange"
        >
        </m-new-form>
      <d-table
        v-show="showTable"
        :tableData="tableData"
        :tableHeadData="tableHeadData"
        :pagesize="20"
        @billType="billType"
        >
      </d-table>
  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { transName_type, transName_typeTwo } from '@/assets/js/entity'
export default {
  name: 'comBillQuery',
  data () {
    return {
      showTable: false,
      formModel: {
        stdQryTyp: '0'
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                label: '操作类型',
                key: 'stdQryTyp',
                type: 'select',
                formWidth: '100%',
                options: [
                  { value: '待签收', key: '0' },
                  { value: '可申请', key: '1' }
                ],
                changeEventName: 'optionChange'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      tableHeadData: [
        {
          label: '票据类型',
          prop: 'transName',
          clickEventName: 'billType',
          formatter: (row, column, cellValue, index) => util.handleEnums(transName_type, cellValue)
        },
        {
          label: '数量',
          prop: 'busiCount'
        },
        {
          label: '账号',
          prop: 'accountNo'
        }
      ],
      tableData: []
    }
  },
  methods: {
    optionChange (res) {
      this.showTable = false
      this.formModel = res
      this.tableData = []
      if (res.stdQryTyp === '0') {
        this.tableHeadData[0].formatter = (row, column, cellValue, index) => util.handleEnums(transName_type, cellValue)
      } else if (res.stdQryTyp === '1') {
        this.tableHeadData[0].formatter = (row, column, cellValue, index) => util.handleEnums(transName_typeTwo, cellValue)
      }
    },
    Onsubmit (res) {
      this.showTable = true
      httpPost('/eweb-edraft.CustSumQuery.do', { stdQryTyp: res.stdQryTyp }).then(res => {
        this.tableData = res.list
      })
    },
    billType (data) {
      if (this.formModel.stdQryTyp === '0') {
        const params = {
          stdQryCont: data.transName, // 查询内容编号
          stdTrastat: '0', // 交易状态0可操作 1正在操作
          stdSendFlg: '02', // 发送方标志01发起方（查询所有可发起的交易） 02接收方（查询所有可签收的交易)
          stdCustAcc: data.accountNo, // 账号
          stdBillTyp: '', // 票据类型
          pageSize: '20', // 分页大小
          pageIndex: '1' // 分页索引
        }
        if (data.transName === '02') { // 提示承兑
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'PromptAcceptanceReply',
              params: { res, params }
            })
          })
        } else if (data.transName === '03') { // 提示收票
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'PromptReceiptReply',
              params: { res, params }
            })
          })
        } else if (data.transName === '17') { // 提示付款
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'PromptPaymentSignforInquire',
              params: { res, params }
            })
          })
        } else if (data.transName === '05') { // 背书
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'EndorsementTransferReplyInquire',
              params: { res, params }
            })
          })
        } else if (data.transName === '12') { // 背书保证
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'EnsureReplyInquire',
              params: { res, params }
            })
          })
        } else if (data.transName === '13') { // 承兑保证
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'EnsureReplyInquire',
              params: { res, params }
            })
          })
        } else if (data.transName === '14') { // 出票保证
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'EnsureReplyInquire',
              params: { res, params }
            })
          })
        } else if (data.transName === '15') { // 质押
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'pledgeReplyQuery',
              params: { res, params }
            })
          })
        } else if (data.transName === '16') { // 质押解除
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'jiePledgeReplyQuery',
              params: { res, params }
            })
          })
        } else if (data.transName === '18') { // 逾期提示付款
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'PromptPaymentSignforInquire',
              params: { res, params }
            })
          })
        } else if (data.transName === '19') { // 拒付追索通知
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'agreePayApplyQuery',
              params: { res, params }
            })
          })
        } else if (data.transName === '20') { // 非拒付追索
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'agreePayApplyQuery',
              params: { res, params }
            })
          })
        } else if (data.transName === '21') { // 追索同意清偿请求
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'agreePayReplyQuery',
              params: { res, params }
            })
          })
        }
      } else if (this.formModel.stdQryTyp === '1') {
        let params = {
          stdQryCont: data.transName, // 查询内容编号
          stdTrastat: '0', // 交易状态0可操作 1正在操作
          stdSendFlg: '01', // 发送方标志01发起方（查询所有可发起的交易） 02接收方（查询所有可签收的交易)
          stdCustAcc: data.accountNo, // 账号
          stdBillTyp: '', // 票据类型
          pageSize: '20', // 分页大小
          pageIndex: '1' // 分页索引
        }
        if (data.transName === '02') { // 提示承兑
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'promptAcceptanceInquire',
              params: { res, params }
            })
          })
        } else if (data.transName === '00') { // 提示付款、背书、贴现等
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            // this.$router.push({
            //   name: '',
            //   params: { res, params }
            // })
          })
        } else if (data.transName === '03') { // 提示收票
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'PromptReceiptInquire',
              params: { res, params }
            })
          })
        } else if (data.transName === '40') { // 背书转让
          params.stdQryCont = '05'
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'EndorsementTransferApplyInquire',
              params: { res, params }
            })
          })
        } else if (data.transName === '41') { // 质押申请
          params.stdQryCont = '15'
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'pledgeApplyQuery',
              params: { res, params }
            })
          })
        } else if (data.transName === '42') { // 贴现申请
          params.stdQryCont = '06'
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'DiscountApplyInquire',
              params: { res, params }
            })
          })
        } else if (data.transName === '43') { // 提示付款
          params.stdQryCont = '17'// 默认非逾期付款
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'PromptPaymentApplyInquire',
              params: { res, params }
            })
          })
        } else if (data.transName === '44') { // 提示付款
          params.stdQryCont = '18'// 默认逾期付款
          httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
            this.$router.push({
              name: 'PromptPaymentApplyInquire',
              params: { res, params }
            })
          })
        }
      }
    }
  },
  created () {
  }
}
</script>
