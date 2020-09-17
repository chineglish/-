<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <el-steps :active="stepsActive" align-center>
        <el-step title="信息录入"></el-step>
        <el-step title="交易确认"></el-step>
        <el-step title="提交结果"></el-step>
        </el-steps>
        <div class="form-box">
            <d-table
                    :table-data="tableData"
                    :tableTitle="tableTitle"
                    :tableHeadData="tableHeadData"
                    :actionData="actionData"
                    @add="add"
                    @onReturn="onReturn"
            >
            </d-table>
        </div>
    </div>
</template>
<script>
/**
     *@name: 提示收票申请
     */
import util from '@/libs/util'
import { bill_Type } from '@/assets/js/entity'
import { httpPost } from '@/api/sys/http'
export default {
  name: 'PromptReceiptApplyConf',
  data () {
    return {
      breadData: ['电子商业汇票 ', '提示收票申请', '提示收票申请确认'],
      stepsActive: 1,
      tableTitle: {
        rightInfo: {
          tip: '总金额:' + util.formatCurrency(this.$route.params.amount) + ',  总笔数:' + this.$route.params.formModel.length
        }
      },
      tableHeadData: [
        { label: '票据号码', prop: 'stdBillNum' },
        { label: '票据类型',
          prop: 'stdBillTyp',
          formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, cellValue) },
        { label: '出票日期', prop: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '到期日', prop: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '票面金额', prop: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '出票人名称', prop: 'stdDrwrNam' },
        { label: '收款人名称', prop: 'stdPyeeNam' },
        { label: '承兑人名称', prop: 'stdAccpNam' }
      ],
      tableData: [
      ],
      actionData: [
        { btnText: '确定', class: 'm-submit-btn', type: 'info', eventName: 'add' },
        { btnText: '返回', class: 'm-cancel-btn', type: 'info', eventName: 'onReturn' }
      ]
    }
  },
  methods: {
    add (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        let params = {
          amount: this.$route.params.amount,
          sum: this.tableData.length,
          stdDrwrAcc: this.$route.params.params.stdCustAcc,
          list: this.tableData,
          stdDrwrSgn: singMsg, // 电子签名
          _tokenName: token._tokenName,
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('eweb-edraft.PromptChargeTicketBatch.do', params).then(res => {
          this.$router.push({
            name: 'PromptReceiptApplyRes',
            params: {
              formModel: params, res
            }
          })
        })
      })
    },
    onReturn (data) {
      this.$router.push({
        name: 'PromptReceiptApplyDetail',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.tableData = this.$route.params.formModel
    }
  }
}
</script>

<style scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
</style>
