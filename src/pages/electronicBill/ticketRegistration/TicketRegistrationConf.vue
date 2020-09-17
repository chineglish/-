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
            >
            </m-new-form>
        </div>
    </div>
</template>
<script>
/**
*@name: 出票登记-确认
*/
import { httpPost } from '@/api/sys/http'
import { bill_Type, endorse_Type } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'TicketRegistrationConf',
  data () {
    return {
      titleData: ['电子商业汇票', '出票登记', '出票登记确认'],
      showSelectPayeeBank: false,
      showBankSelection: false,
      bankList: [], // 银行列表
      formModel: {
        ticketType: '',
        billType: '',
        bankChoose: '',
        payeeBankChoose: '',
        endorse: '',
        entrust: '是', // CC00
        drawerType: '企业'
      },
      formConfigJson: {
        stepsActive: 1,
        formWidth: '50%',
        labelWidth: '40%',
        rules: {
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
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
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
                'type': 'text',
                'key': 'stdAccpNam',
                'show': false
              },
              {
                'disabled': false,
                'label': '承兑人账号',
                'type': 'text',
                'key': 'stdAccpAcc',
                'show': false
              },
              {
                'disabled': false,
                'label': '银行选择',
                'type': 'text',
                'key': 'stdAccpBnam'
              },
              {
                'disabled': false,
                'label': '票面金额',
                'type': 'text',
                'key': 'stdAccpAmt'
              },
              {
                'disabled': false,
                'label': '允许背书',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(endorse_Type, value),
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
                'type': 'text',
                'key': 'stdPyeeBnam'
              },
              {
                'disabled': false,
                'label': '收款户名',
                'type': 'text',
                maxlength: 70,
                'key': 'stdPyeeNam'
              },
              {
                'disabled': false,
                'label': '收款账户',
                'type': 'text',
                maxlength: 50,
                'key': 'stdPyeeAcc'
              },
              {
                'disabled': false,
                'label': '出票登记备注',
                'type': 'text',
                'key': 'stdDrwrMem'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'goBack' }]
    }
  },
  methods: {
    submit (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
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
          stdDrwrMem: data.stdDrwrMem,
          _tokenName: token._tokenName,
          stdDrwrSgn: singMsg, // 数字签名 后加
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('eweb-edraft.IssueRegister.do', params).then(res => {
          this.$router.push({
            name: 'TicketRegistrationRes',
            params: { res, formModel: data }
          })
        })
      }).catch(err => {
        console.error(err)
      })
    },
    goBack () {
      this.$router.push({
        name: 'TicketRegistrationInner',
        params: { data: this.$route.params.formModel }
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
    }
    if (this.$route.params.formModel.stdBillTyp === 'AC02') {
      this.formConfigJson.formItems[2].group[0].show = true
      this.formConfigJson.formItems[2].group[1].show = true
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
