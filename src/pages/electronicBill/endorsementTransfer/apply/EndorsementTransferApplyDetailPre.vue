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
                    @selectBank="selectBank"
                    @add="add"
                    @onReturn="onReturn"
            >
            <div class="right-slot" slot="selectUser" @click="selectUser">
            常用往来账户
          </div>
            </m-new-form>
         </div>
        <el-dialog
          title="常用往来账户"
          :visible.sync="showUserQuery"
          width="80%"
          center>
          <user-query eventName="userQuery"  @userQuery="userQuery"/>
        </el-dialog>
        <el-dialog
          title="银行网点查询"
          :visible.sync="showBankSelection"
          width="80%"
          center>
          <bank-query eventName="bankSelect"  @bankSelect="bankSelect"/>
        </el-dialog>
        </div>
    </div>
</template>
<script>
/**
     *@name: 背书转让
     */
import util from '@/libs/util'
import { bill_Type } from '@/assets/js/entity'
import { httpPost } from '@/api/sys/http'
import userQuery from '../../module/userQuery'
import BankQuery from '../../module/bankQuery'

export default {
  name: 'EndorsementTransferApplyDetailPre',
  components: {
    userQuery, BankQuery
  },
  data () {
    return {
      breadData: ['电子商业汇票 ', '背书转让', '背书申请录入'],
      stepsActive: 0,
      showUserQuery: false,
      showBankSelection: false,
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
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'add' },
        { btnText: '取消', class: 'm-cancel-btn', clickEventName: 'onReturn' }
      ],
      formModel: {
        stdEndeNam: '',
        stdEndeAcc: '',
        stdEndeBnm: '',
        stdEndeBnam: '',
        stdBanmFlg: 'EM00'
      },
      formConfigJson: {
        rules: {
          stdEndeNam: [{ required: true, message: '被背书人名称', trigger: 'submit' }],
          stdEndeAcc: [{ required: true, message: '被背书人账号', trigger: 'submit' }],
          stdEndeBnm: [{ required: true, message: '被背书人开户行号', trigger: 'submit' }],
          stdEndeBnam: [{ required: true, message: '被背书人开户行行名', trigger: 'submit' }],
          stdBanmFlg: [{ required: true, message: '转让标记', trigger: 'submit' }]
        },
        formItems: [
          {
            title: '被背书人信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '被背书人名称',
                'type': 'input',
                'key': 'stdEndeNam'
              },
              {
                'disabled': false,
                'label': '被背书人账号',
                'type': 'input',
                'rightSlotName': 'selectUser',
                'key': 'stdEndeAcc'
              },
              {
                'disabled': false,
                'label': '被背书人开户行名',
                'type': 'link',
                formatter: value => value || '请选择被背书人开户行行名',
                'clickEventName': 'selectBank',
                'key': 'stdEndeBnam'
              },
              // {
              //   'disabled': false,
              //   'label': '银行网点',
              //   'type': 'link',
              //   'key': 'stdEndeBnm'
              // },
              {
                'disabled': false,
                'label': '转让标记',
                'type': 'select',
                'options': [
                  { 'value': '可再转让', 'key': 'EM00' },
                  { 'value': '不得转让', 'key': 'EM01' }
                ],
                'key': 'stdBanmFlg'
              },
              {
                'disabled': false,
                'label': '被背书人备注',
                'type': 'input',
                'key': 'std400Memo'
              }
            ]
          },
          {
            title: '申请人信息',
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
      }
    }
  },
  methods: {
    userQuery (data) {
      this.showUserQuery = false
      if (data !== '' && data !== null) {
        // this.formConfigJson.formItems[0].group[0].disabled = true
        // this.formConfigJson.formItems[0].group[1].disabled = true
        this.formModel.stdEndeNam = data.payeeAccountName
        this.formModel.stdEndeAcc = data.payeeAccountNo
        this.formModel.stdEndeBnm = data.payeeBankDeptId
        this.formModel.stdEndeBnam = data.payeeBankDeptName
      }
    },
    selectBank () {
      this.showBankSelection = true
    },
    bankSelect (data) {
      this.showBankSelection = false
      this.formModel.stdEndeBnam = data.lName
      this.formModel.stdEndeBnm = data.bankCode
    },
    selectUser () {
      this.showUserQuery = true
    },
    add (data) {
      let params = {
        stdEndrAcc: data.stdCustAcc,
        stdBanmFlg: data.stdBanmFlg,
        stdEndeNam: data.stdEndeNam,
        stdEndeAcc: data.stdEndeAcc,
        stdEndeBnm: data.stdEndeBnm,
        std400Memo: data.std400Memo,
        amount: this.$route.params.amount, // 金额 注意转义
        sum: this.tableData.length, // 总笔数
        list: this.tableData
      }
      httpPost('eweb-edraft.EndorsedTransferBatchConfirm.do', params).then(res => {
        this.$router.push({
          name: 'EndorsementTransferApplyConf',
          params: {
            formModel: this.tableData, // 列表数据
            data: data, // 表单数据
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params, // 查询条件
            amount: this.$route.params.amount, // 总金额
            _dataMapKey: res._dataMapKey,
            _Data2Sign: res._Data2Sign,
            _authenticateType: res._authenticateType
          }
        })
      })
    },
    onReturn (data) {
      this.$router.push({
        name: 'EndorsementTransferApplyInquire',
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
