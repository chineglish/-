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
     *@name: 提示承兑应答确定
     */
import { httpPost } from '@/api/sys/http'
import { bill_Type, response_Type } from '@/assets/js/entity.js'
import util from '@/libs/util'
export default {
  name: 'PromptAcceptanceReplySoloConf',
  data () {
    return {
      titleData: ['电子商业汇票', '提示承兑应答', '提示承兑应答录入'],
      formModel: {
        stdBillTyp: '',
        ticketIssuingDay: '',
        stdDrwrNam: '',
        stdPyeeNam: ''
      },
      formConfigJson: {
        stepsActive: 1,
        rules: {},
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
                'label': '收款人名称',
                'type': 'text',
                'key': 'stdPyeeNam'
              },
              {
                'disabled': false,
                'label': '承兑人名称',
                'type': 'text',
                'key': 'stdAccpNam'
              },
              {
                'disabled': false,
                'label': '应答意见',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(response_Type, value),
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
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '取消', class: 'm-cancel-btn', clickEventName: 'goBack' }]
    }
  },
  methods: {
    submit (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        let params = {
          stdBussTyp: '02', // 业务类型
          stdBillNum: data.stdBillNum, // 票号
          stdBillTyp: data.stdBillTyp, // 票据类型
          stdIssDate: data.stdIssDate, // 出票日期
          stdDueDate: data.stdDueDate, // 到票日
          stdBussQno: data.stdBussQno, // 业务流水标识
          stdUncnPay: 'CC00', // 到期无条件委托
          stdSgnrRes: data.stdSgnrRes, // 签收结果SU00同意签收 SU01拒绝签收
          stdSgnrTyp: data.stdRcvType, // 签收人类型
          stdSgnrNam: data.stdRcvName, // 签收人名称
          stdSgnrCod: data.stdRcvCode, // 签收人组织机构代码证
          stdSgnrAcc: data.stdRcvAcct, // 签收人开户账户
          stdSgnrBnm: data.stdRcvBnm, // 签收人开户行行号
          // stdSgnrAdr: data.stdSgnrAdr, // 签收人地址
          // std400Memob: data.std400Mem, // 备注 注意转义
          stdAccpAmt: data.stdPmMoney, // 金额 注意转义
          // stdDrwrBnam: data.stdDrwrBnam, // 出票人行名
          // stdDrwrTyp: data.stdDrwrTyp, // 出票人类型
          // stdDrwrAcc: data.stdDrwrAcc, // 出票人账户
          stdAccpNam: data.stdAccpNam, // 承兑人名称
          // stdAccpAcc: data.stdAccpAcc, // 承兑人账号
          // stdAccpBnm: data.stdAccpBnm, // 承兑人行号
          // stdAccpBnam: data.stdAccpBnam, // 承兑人行名
          stdPyeeNam: data.stdPyeeNam, // 收款人名称
          // stdPyeeAcc: data.stdPyeeAcc, // 收款人账号
          // stdPyeeBnm: data.stdPyeeBnm, // 收款人行号
          // stdPyeeBnam: data.stdPyeeBnam, // 收款人行名
          stdDrwrSgn: singMsg, // 电子签名
          _tokenName: token._tokenName,
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('eweb-edraft.CdCurrentSign.do', params).then(res => {
          this.$router.push({
            name: 'PromptAcceptanceReplyRes',
            params: {
              data: data, res
            }
          })
        })
      }).catch(err => {
        console.error(err)
      })
    },
    goBack () {
      this.$router.push({
        name: 'PromptAcceptanceReplySolo',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
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
