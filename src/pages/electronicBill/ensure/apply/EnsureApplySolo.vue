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
     *@name: 提示保证申请录入
     */
import { httpPost } from '@/api/sys/http'
import userQuery from '../../module/userQuery'
import BankQuery from '../../module/bankQuery'
import { ensure_Type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'EnsureApplySolo',
  components: {
    userQuery, BankQuery
  },
  data () {
    return {
      titleData: ['电子商业汇票', '保证', '提示保证申请录入'],
      showUserQuery: false,
      showBankSelection: false,
      formModel: {
        stdWareBnm: '',
        stdWareNam: '',
        stdWareAcc: '',
        account: '',
        name: '',
        code: '',
        bankNumber: '',
        stdWareBnam: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          stdWareNam: [{ required: true, message: '保证人名称', trigger: 'submit' }],
          stdWareAcc: [{ required: true, message: '保证人账号', trigger: 'submit' }],
          stdWareBnam: [{ required: true, message: '请选择保证人开户行名', trigger: 'submit' }]
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
                'label': '保证类型',
                'type': 'text',
                'key': 'stdGuarTyp',
                formatter: (key, value) => util.handleEnums(ensure_Type, value)
              },
              {
                'disabled': false,
                'label': '保证申请日期', // 获取当前时间
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdApplDat'
              }
            ]
          },
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
                'label': '保证人开户行名',
                'type': 'link',
                formatter: value => value || '请选择保证人开户行名',
                'clickEventName': 'selectBank',
                'key': 'stdWareBnam'
              }
              // {
              //   'disabled': false,
              //   'label': '银行网点',
              //   'type': 'link',
              //   'key': 'stdWareBnm'
              // }
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
        // this.formConfigJson.formItems[2].group[0].disabled = true
        // this.formConfigJson.formItems[2].group[1].disabled = true
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
    submit (data) {
      let params = {}
      if (this.formModel.stdGuarTyp === '01') {
        params = {
          stdBillNum: data.stdBillNum, // 票号
          stdBillTyp: data.stdBillTyp, // 票据类型
          // stdAccpAmt: data.stdPmMoney, // 金额 注意转义
          stdGteeTyp: data.stdDrwrTyp, // 被保证人类型
          stdGteeNam: data.name, // 被保证人名称
          stdGteeCod: data.code, // 被保证人组织机构代码
          stdGteeAcc: data.account, // 被保证人账号
          stdGteeBnm: data.bankNumber, // 被保证人行号
          stdPmMoney: data.stdPmMoney, // 票面金额
          stdGuarTyp: data.stdGuarTyp, // 保证类型
          stdApplDat: data.stdApplDat, // 保证申请日期
          stdWareNam: data.stdWareNam, // 保证人名称
          stdWareAcc: data.stdWareAcc, // 保证人账号
          stdWareBnm: data.stdWareBnm // 保证人行号
        }
      }
      if (this.formModel.stdGuarTyp === '02') {
        params = {
          stdBillNum: data.stdBillNum, // 票号
          stdBillTyp: data.stdBillTyp, // 票据类型
          // stdAccpAmt: data.stdPmMoney, // 金额 注意转义
          stdGteeTyp: data.stdRcvType, // 被保证人类型
          stdGteeNam: data.name, // 被保证人名称
          stdGteeCod: data.code, // 被保证人组织机构代码
          stdGteeAcc: data.account, // 被保证人账号
          stdGteeBnm: data.bankNumber, // 被保证人行号
          stdPmMoney: data.stdPmMoney, // 票面金额
          stdGuarTyp: data.stdGuarTyp, // 保证类型
          stdApplDat: data.stdApplDat, // 保证申请日期
          stdWareNam: data.stdWareNam, // 保证人名称
          stdWareAcc: data.stdWareAcc, // 保证人账号
          stdWareBnm: data.stdWareBnm // 保证人行号
        }
      }
      if (this.formModel.stdGuarTyp === '03') {
        params = {
          stdBillNum: data.stdBillNum, // 票号
          stdBillTyp: data.stdBillTyp, // 票据类型
          // stdAccpAmt: data.stdPmMoney, // 金额 注意转义
          stdGteeTyp: data.stdAppType, // 被保证人类型
          stdGteeNam: data.name, // 被保证人名称
          stdGteeCod: data.code, // 被保证人组织机构代码
          stdGteeAcc: data.account, // 被保证人账号
          stdGteeBnm: data.bankNumber, // 被保证人行号
          stdPmMoney: data.stdPmMoney, // 票面金额
          stdGuarTyp: data.stdGuarTyp, // 保证类型
          stdApplDat: data.stdApplDat, // 保证申请日期
          stdWareNam: data.stdWareNam, // 保证人名称
          stdWareAcc: data.stdWareAcc, // 保证人账号
          stdWareBnm: data.stdWareBnm // 保证人行号
        }
      }
      httpPost('/eweb-edraft.GuaranteeApplyConfirm.do', params).then(res => {
        this.$router.push({
          name: 'EnsureApplySoloConf',
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
    this.formModel.stdApplDat = util.standardDate(new Date())
    if (this.$route.params.formModel) {
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
  }
}
</script>

<style scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
</style>
