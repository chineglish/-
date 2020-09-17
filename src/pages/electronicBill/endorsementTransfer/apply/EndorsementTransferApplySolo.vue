<template>
    <div>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @submit="submit"
                    @goBack="goBack"
                    @selectBank="selectBank"
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
</template>
<script>
/**
     *@name: 背书申请确定
     */
import { httpPost } from '@/api/sys/http'
import { bill_Type } from '@/assets/js/entity.js'
import util from '@/libs/util'
import userQuery from '../../module/userQuery'
import BankQuery from '../../module/bankQuery'
export default {
  name: 'EndorsementTransferApplySolo',
  components: {
    userQuery, BankQuery
  },
  data () {
    return {
      titleData: ['电子商业汇票', '背书申请', '背书申请录入'],
      showUserQuery: false,
      showBankSelection: false,
      formModel: {
        stdEndeNam: '',
        stdEndeAcc: '',
        stdEndeBnm: '',
        stdEndeBnam: '',
        stdBanmFlg: 'EM00'
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          stdEndeNam: [{ required: true, message: '被背书人名称', trigger: 'submit' }],
          stdEndeAcc: [{ required: true, message: '被背书人账号', trigger: 'submit' }],
          stdEndeBnm: [{ required: true, message: '被背书人开户行行号', trigger: 'submit' }],
          stdEndeBnam: [{ required: true, message: '被背书人开户行行名', trigger: 'submit' }],
          stdBanmFlg: [{ required: true, message: '转让标记', trigger: 'submit' }]
        },
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '票据号码',
                'type': 'text',
                'key': 'stdBillNum'
              },
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(bill_Type, value),
                'key': 'stdBillTyp'
              },
              {
                'disabled': false,
                'label': '出票日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdIssDate'
              },
              {
                'disabled': false,
                'label': '票面到期日',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdDueDate'
              },
              {
                'disabled': false,
                'label': '票面金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stdPmMoney'
              },
              {
                'disabled': false,
                'label': '出票人名称',
                'type': 'text',
                'key': 'stdDrwrNam'
              },
              {
                'disabled': false,
                'label': '承兑行名称',
                'type': 'text',
                'key': 'stdAccpNam'
              }
            ]
          },
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
                formatter: value => value || '请选择被背书人开户行名',
                'clickEventName': 'selectBank',
                'key': 'stdEndeBnam'
              },
              // {
              //   'disabled': false,
              //   'label': '银行网点',
              //   'type': 'input',
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
                'key': 'std400Mem'
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
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '取消', class: 'm-cancel-btn', clickEventName: 'goBack' }]
    }
  },
  methods: {
    userQuery (data) {
      this.showUserQuery = false
      if (data !== '' && data !== null) {
        // this.formConfigJson.formItems[1].group[0].disabled = true
        // this.formConfigJson.formItems[1].group[1].disabled = true
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
    submit (data) {
      let params = {
        stdBillNum: data.stdBillNum, // 票号
        stdBillTyp: data.stdBillTyp, // 票据类型
        stdIssDate: data.stdIssDate, // 出票日期
        stdDueDate: data.stdDueDate, // 到期日
        stdDrwrNam: data.stdDrwrNam, // 出票人名
        stdAccpNam: data.stdAccpNam, // 承兑人名称
        stdPmMoney: data.stdPmMoney, // 金额 注意转义
        stdBanmFlg: data.stdBanmFlg, // 转让标记
        stdEndrNam: data.stdRcvName, // 背书人全称
        stdEndrTyp: data.stdRcvType, // 背书人类型
        stdEndrCod: data.stdRcvCode, // 背书人组织机构代码证
        stdEndrAcc: data.stdRcvAcct, // 背书人账号
        stdEndrBnm: data.stdRcvBnm, // 背书人开户行行号
        stdEndeNam: data.stdEndeNam, // 被背书人名称
        stdEndeAcc: data.stdEndeAcc, // 被背书人账号
        stdEndeBnm: data.stdEndeBnm, // 被背书人开户行行号
        stdEndeBnam: data.stdEndeBnam, // 被背书人开户行行名
        std400Memo: data.std400Mem, // 备注 注意转义
        stdApplDat: util.standardDate(new Date())
      }
      httpPost('eweb-edraft.EndorsedTransferConfirm.do', params).then(res => {
        this.$router.push({
          name: 'EndorsementTransferApplySoloConf',
          params: {
            _Data2Sign: res._Data2Sign,
            _authenticateType: res._authenticateType,
            _dataMapKey: res._dataMapKey,
            formModel: data, // 列表信息
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params // 查询条件
          }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    goBack () {
      if (this.$route.params.pageNation) {
        this.$router.push({
          name: 'EndorsementTransferApplyInquire',
          params: {
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params // 查询条件
          }
        })
      }
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
      this.formModel.stdCustAcc = this.$route.params.params.stdCustAcc
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
