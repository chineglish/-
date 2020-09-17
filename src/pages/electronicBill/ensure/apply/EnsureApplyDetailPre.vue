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
     *@name
     */
import userQuery from '../../module/userQuery'
import BankQuery from '../../module/bankQuery'
import util from '@/libs/util'
import { bill_Type } from '@/assets/js/entity'
import { httpPost } from '@/api/sys/http'
export default {
  name: 'EnsureApplyDetailPre',
  components: {
    userQuery, BankQuery
  },
  data () {
    return {
      breadData: ['电子商业汇票 ', '保证', '提示保证申请录入'],
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
        stdWareNam: '',
        stdWareAcc: '',
        stdWareBnm: '',
        account: '',
        name: '',
        code: '',
        bankNumber: '',
        stdWareBnam: ''
      },
      formConfigJson: {
        rules: {
          stdWareNam: [{ required: true, message: '保证人名称', trigger: 'submit' }],
          stdWareAcc: [{ required: true, message: '保证人账号', trigger: 'submit' }],
          stdWareBnam: [{ required: true, message: '保证人开户行名', trigger: 'submit' }]
        },
        formItems: [
          {
            title: '被保证人信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '被保证人账户',
                'type': 'text',
                'key': 'account'
              },
              {
                'disabled': false,
                'label': '被保证人账户名称',
                'type': 'text',
                'key': 'name'
              },
              {
                'disabled': false,
                'label': '被保证人组织机构代码',
                'type': 'text',
                'key': 'code'
              },
              {
                'disabled': false,
                'label': '被保证人开户行号',
                'type': 'text',
                'key': 'bankNumber'
              }
            ]
          },
          {
            title: '保证人信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '保证人名称',
                'type': 'input',
                'key': 'stdWareNam'
              },
              {
                'disabled': false,
                'label': '保证人账号',
                'type': 'input',
                'rightSlotName': 'selectUser',
                'key': 'stdWareAcc'
              },
              {
                'disabled': false,
                'label': '保证人开户行',
                'type': 'link',
                formatter: value => value || '请选择保证人开户行',
                'clickEventName': 'selectBank',
                'key': 'stdWareBnam'
              }
              // {
              //   'disabled': false,
              //   'label': '网点查询',
              //   'type': 'link',
              //   'key': 'stdWareBnm'
              // }
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
        // this.formConfigJson.formItems[1].group[0].disabled = true
        // this.formConfigJson.formItems[1].group[1].disabled = true
        // this.formConfigJson.formItems[1].group[2].disabled = true
        this.formModel.stdWareNam = data.payeeAccountName
        this.formModel.stdWareAcc = data.payeeAccountNo
        this.formModel.stdWareBnm = data.payeeBankDeptId
        this.formModel.stdWareBnam = data.payeeBankDeptName
      }
    },
    selectUser () {
      this.showUserQuery = true
    },
    selectBank () {
      this.showBankSelection = true
    },
    bankSelect (data) {
      this.showBankSelection = false
      this.formModel.stdWareBnam = data.lName
      this.formModel.stdWareBnm = data.bankCode
    },
    Organization () {
      let params = {
        custAcc: this.formModel.account
      }
      httpPost('eweb-edraft.OrganizationCode.do', params).then(res => {
        this.formModel.code = res.custCod
        this.formModel.bankNumber = res.stdDrwrbNm
      }).catch(err => {
        console.error(err)
      })
    },
    add (data) {
      let params = {
        list: this.tableData,
        amount: this.$route.params.amount, // 金额 注意转义
        sum: this.tableData.length, // 总笔数
        stdGuarTyp: data.stdGuarTyp, // 保证类型
        stdGteeAcc: data.account,
        stdWareNam: data.stdWareNam,
        stdWareAcc: data.stdWareAcc,
        stdWareBnm: data.stdWareBnm,
        stdWareBnam: data.stdWareBnam
      }
      httpPost('eweb-edraft.GuaranteeApplyBatchConfirm.do', params).then(res => {
        this.$router.push({
          name: 'EnsureApplyConf',
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
        name: 'EnsureApplyInquire',
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
      Object.assign(this.formModel, this.$route.params.formModel)
      this.formModel.account = this.$route.params.params.stdCustAcc
      this.formModel.name = this.$route.params.params.acName
      this.Organization()
    }
    if (this.$route.params.params.stdQryCont === '12') {
      this.formModel.stdGuarTyp = '03'
    }
    if (this.$route.params.params.stdQryCont === '13') {
      this.formModel.stdGuarTyp = '02'
    }
    if (this.$route.params.params.stdQryCont === '14') {
      this.formModel.stdGuarTyp = '01'
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
