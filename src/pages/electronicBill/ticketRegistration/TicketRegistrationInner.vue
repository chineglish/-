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
                    @change="change"
                    @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
                    @selectBank="selectBank"
                    @selectPayeeBank="selectPayeeBank "
            >
            </m-new-form>
        </div>
        <el-dialog
          title="选择承兑人网点"
          :visible.sync="showBankSelection"
          width="80%"
          center>
          <bank-query eventName="bankSelect"  @bankSelect="bankSelect"/>
        </el-dialog>
        <el-dialog
          title="选择收款人网点"
          :visible.sync="showSelectPayeeBank"
          width="80%"
          center>
          <bank-query eventName="payeeBankselect"  @payeeBankselect="payeeBankselect"/>
        </el-dialog>
    </div>
</template>
<script>
/**
*@name: 出票登记-确认
*/
import { httpPost } from '@/api/sys/http'
import { bill_Type } from '@/assets/js/entity'
import util from '@/libs/util'
import BankQuery from '../module/bankQuery'

export default {
  name: 'TicketRegistrationInner',
  components: {
    BankQuery
  },
  data () {
    return {
      titleData: ['电子商业汇票', '出票登记', '出票登记录入'],
      showSelectPayeeBank: false,
      showBankSelection: false,
      bankList: [], // 银行列表
      formModel: {
        ticketType: '',
        stdBillTyp: '',
        stdAccpBnam: '',
        stdPyeeBnam: '',
        stdEndOrmk: 'EM00',
        stdUncnPay: '是', // CC00
        stdDrwrTyp: '企业',
        stdDrwrAcc: '',
        stdDueDate: '',
        stdDrwrCod: '',
        stdDrwrBnm: '',
        stdDrwrBnam: ''
      },
      formConfigJson: {
        stepsActive: 0,
        formWidth: '50%',
        labelWidth: '40%',
        rules: {
          stdAccpAmt: [{ required: true, message: '票面金额', trigger: 'submit' }],
          stdDueDate: [{ required: true, message: '到期日', trigger: 'submit' }],
          stdAccpNam: [{ required: false, message: '承兑人名称', trigger: 'submit' }],
          stdAccpAcc: [{ required: false, message: '承兑人账号', trigger: 'submit' }],
          stdAccpBnam: [{ required: true, message: '请选择承兑人网点', trigger: 'submit' }],
          stdEndOrmk: [{ required: true, message: '允许背书', trigger: 'submit' }],
          stdPyeeBnam: [{ required: true, message: '请选择收款人网点', trigger: 'submit' }],
          stdPyeeNam: [{ required: true, message: '收款户名', trigger: 'submit' }],
          stdPyeeAcc: [{ required: true, message: '收款账户', trigger: 'submit' }]
        },
        formItems: [
          {
            title: '票据信息',
            // formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'text',
                'key': 'stdBillTyp',
                formatter: (key, value) => util.handleEnums(bill_Type, value)
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
                'label': '到期日',
                'type': 'date',
                valueFormat: 'yyyyMMdd',
                'key': 'stdDueDate'
              }
            ]
          },
          {
            title: '出票人信息',
            // formWidth: '50%',
            // labelWidth: '40%',
            group: [
              {
                'disabled': false,
                'label': '出票人类型',
                'type': 'text',
                'key': 'stdDrwrTyp'
              },
              {
                'disabled': false,
                'label': '出票人名称',
                'type': 'text',
                'key': 'stdDrwrNam'
              },
              {
                'disabled': false,
                'label': '出票人组织机构代码证',
                'type': 'text',
                'key': 'stdDrwrCod'
              },
              {
                'disabled': false,
                'label': '出票人开户账号',
                'type': 'text',
                'key': 'stdDrwrAcc'
              },
              {
                'disabled': false,
                'label': '出票人开户行名称',
                'type': 'text',
                'key': 'stdDrwrBnam'
              },
              {
                'disabled': true,
                'label': '到期无条件支付委托',
                'type': 'text',
                'key': 'stdUncnPay'
              }
            ]
          },
          {
            title: '承兑人信息',
            // formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '承兑人名称',
                'type': 'input',
                'key': 'stdAccpNam',
                'show': false
              },
              {
                'disabled': false,
                'label': '承兑人账号',
                'type': 'input',
                'key': 'stdAccpAcc',
                'show': false
              },
              {
                'disabled': false,
                'label': '银行选择',
                'type': 'link',
                formatter: value => value || '请选择承兑人网点',
                'clickEventName': 'selectBank',
                'key': 'stdAccpBnam'
              },
              {
                'disabled': false,
                'label': '票面金额',
                'type': 'input',
                maxlength: 13,
                inputType: 'money',
                keydownEventName: 'limitMoneyInputKeyDown',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                'inputEventName': 'change',
                'key': 'stdAccpAmt'
              },
              {
                'disabled': false,
                'label': '允许背书',
                'type': 'select',
                'options': [
                  { 'value': '可转让', 'key': 'EM00' },
                  { 'value': '不可转让', 'key': 'EM01' }
                ],
                'key': 'stdEndOrmk'
              }
            ]
          },
          {
            title: '收款人信息',
            // formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '银行选择',
                'clickEventName': 'selectPayeeBank',
                'type': 'link',
                formatter: value => value || '请选择收款人网点',
                'key': 'stdPyeeBnam'
              },
              {
                'disabled': false,
                'label': '收款户名',
                'type': 'input',
                maxlength: 70,
                'key': 'stdPyeeNam'
              },
              {
                'disabled': false,
                'label': '收款账户',
                'type': 'input',
                maxlength: 50,
                'key': 'stdPyeeAcc'
              },
              {
                'disabled': false,
                'label': '出票登记备注',
                'type': 'input',
                'key': 'stdDrwrMem'
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
    selectBank (res) {
      this.formModel = res
      this.showBankSelection = true
    },
    selectPayeeBank (res) {
      this.formModel = res
      this.showSelectPayeeBank = true
    },
    bankSelect (data) {
      this.showBankSelection = false
      this.formModel.stdAccpBnam = data.lName
      this.formModel.stdAccpBnm = data.bankCode
    },
    payeeBankselect (data) {
      this.showSelectPayeeBank = false
      this.formModel.stdPyeeBnam = data.lName
      this.formModel.stdPyeeBnm = data.bankCode
    },
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    // Organization () {
    //   let params = {
    //     custAcc: this.$route.params.formModel.stdDrwrAcc
    //   }
    //   httpPost('eweb-edraft.OrganizationCode.do', params).then(res => {
    //     this.formModel.stdDrwrCod = res.custCod
    //     this.formModel.stdDrwrBnm = res.stdDrwrbNm
    //     this.formModel.stdDrwrBnam = res.stdDrwrbNam
    //   }).catch(err => {
    //     console.error(err)
    //   })
    // },
    change (res) {
      res.stdAccpAmt = util.limitInputMoney(res.stdAccpAmt)
    },
    submit (data) {
      let params = {
        stdBillTyp: data.stdBillTyp,
        stdIssDate: data.stdIssDate,
        stdDueDate: data.stdDueDate,
        stdDrwrNam: data.stdDrwrNam,
        stdDrwrCod: data.stdDrwrCod,
        stdDrwrAcc: data.stdDrwrAcc,
        stdDrwrBnm: data.stdDrwrBnm,
        stdDrwrBnam: data.stdDrwrBnam,
        stdAccpNam: data.stdAccpNam ? data.stdAccpNam : data.stdAccpBnam,
        stdAccpAcc: data.stdAccpAcc ? data.stdAccpAcc : '0',
        stdAccpBnm: data.stdAccpBnm,
        stdAccpBnam: data.stdAccpBnam,
        stdAccpAmt: data.stdAccpAmt,
        stdEndOrmk: data.stdEndOrmk,
        stdPyeeNam: data.stdPyeeNam,
        stdPyeeAcc: data.stdPyeeAcc,
        stdPyeeBnm: data.stdPyeeBnm,
        stdPyeeBnam: data.stdPyeeBnam,
        stdDrwrMem: data.stdDrwrMem
      }
      httpPost('eweb-edraft.IssueRegisterConfirm.do', params).then(res => {
        this.$router.push({
          name: 'TicketRegistrationConf',
          params: { formModel: data,
            _Data2Sign: res._Data2Sign,
            _dataMapKey: res._dataMapKey,
            _authenticateType: res._authenticateType
          }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    goBack () {
      this.$router.push({
        name: 'TicketRegistrationPre',
        params: { formModel: this.$route.params.formModel }
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel.stdIssDate = this.$route.params.formModel.stdIssDate
      this.formModel.stdDrwrAcc = this.$route.params.formModel.stdDrwrAcc
      this.formModel.stdDrwrNam = this.$route.params.formModel.stdDrwrNam
      this.formModel.ticketMethod = this.$route.params.formModel.ticketMethod
      this.formModel.stdBillTyp = this.$route.params.formModel.stdBillTyp
      this.formModel.stdDrwrCod = this.$route.params.stdDrwrCod
      this.formModel.stdDrwrBnm = this.$route.params.stdDrwrBnm
      this.formModel.stdDrwrBnam = this.$route.params.stdDrwrBnam
    }
    if (this.$route.params.data) {
      Object.assign(this.formModel, this.$route.params.data)
    }

    if (this.formModel.stdBillTyp === 'AC02') {
      this.formConfigJson.formItems[2].group[0].show = true
      this.formConfigJson.formItems[2].group[1].show = true
      this.formConfigJson.rules.stdAccpNam[0].required = true
      this.formConfigJson.rules.stdAccpAcc[0].required = true
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
