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
            >
            </d-table>
          <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @add="add"
                    @onReturn="onReturn"
            >
            </m-new-form>
         </div>
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
  name: 'PromptReceiptReplyDetail',
  data () {
    return {
      breadData: ['电子商业汇票 ', '提示收票', '提示收票应答录入'],
      stepsActive: 0,
      tableTitle: {
        rightInfo: {
          tip: '总金额:' + util.formatCurrency(this.$route.params.amount) + ',  总笔数:' + this.$route.params.formModel.length
        }
      },
      options: { // table属性
        stripe: true
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
      formModel: {
        stdSgnrRes: 'SU00'
      },
      formConfigJson: {
        rules: {
          stdSgnrRes: [{ required: true, message: '应答意见', trigger: 'submit' }]
        },
        formItems: [
          {
            title: '应答意见',
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '应答意见',
                'type': 'select',
                'options': [
                  { 'value': '同意', 'key': 'SU00' },
                  { 'value': '拒绝', 'key': 'SU01' }
                ],
                'key': 'stdSgnrRes'
              }
            ]
          },
          {
            title: '应答人信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '客户账号',
                'type': 'text',
                'key': 'stdCustAcc'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'add' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'onReturn' }
      ]
    }
  },
  methods: {
    add (data) {
      let params = {
        stdBussTyp: '03', // 业务类型
        amount: this.$route.params.amount,
        sum: this.tableData.length,
        stdSgnrAcc: data.stdCustAcc,
        stdSgnrRes: data.stdSgnrRes,
        list: this.tableData
      }
      httpPost('eweb-edraft.SpCurrentSignBatchConfirm.do', params).then(res => {
        this.$router.push({
          name: 'PromptReceiptReplyConf',
          params: {
            _Data2Sign: res._Data2Sign,
            _authenticateType: res._authenticateType,
            _dataMapKey: res._dataMapKey,
            formModel: this.tableData, // 列表数据
            data: data, // 表单数据
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params, // 查询条件
            amount: this.$route.params.amount // 总金额
          }
        })
      })
    },
    onReturn (data) {
      this.$router.push({
        name: 'PromptReceiptReply',
        params: {
          pageNation: this.$route.params.pageNation, // 分页信息
          params: this.$route.params.params // 查询条件
        }
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.tableData = this.$route.params.formModel
      this.formModel.stdCustAcc = this.$route.params.params.stdCustAcc
    }
    if (this.$route.params.data) {
      Object.assign(this.formModel, this.$route.params.data)
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
