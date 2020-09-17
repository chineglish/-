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
     *@name: 背书申请确定
     */
import { httpPost } from '@/api/sys/http'
import { bill_Type, endorse_Type } from '@/assets/js/entity.js'
import util from '@/libs/util'
export default {
  name: 'EndorsementTransferApplySolo',
  data () {
    return {
      titleData: ['电子商业汇票', '背书申请', '背书申请确定'],
      showUserQuery: false,
      formModel: {
        ticketType: '',
        ticketIssuingDay: '',
        facedate: '',
        faceValue: '',
        drawerName: '',
        beneficiaryName: '',
        accountNum: '',
        customerAccount: '',
        UserChoose: '',
        endorse: ''
      },
      formConfigJson: {
        stepsActive: 1,
        rules: {
          stdEndeNam: [{ required: true, message: '被背书人名称', trigger: 'submit' }],
          stdEndeAcc: [{ required: true, message: '被背书人账号', trigger: 'submit' }],
          stdEndeBnm: [{ required: true, message: '被背书人开户行行号', trigger: 'submit' }],
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
                'type': 'text',
                'key': 'stdEndeNam'
              },
              {
                'disabled': false,
                'label': '被背书人账号',
                'type': 'text',
                'key': 'stdEndeAcc'
              },
              {
                'disabled': false,
                'label': '被背书人开户行号',
                'type': 'text',
                'key': 'stdEndeBnm'
              },
              {
                'disabled': false,
                'label': '转让标记',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(endorse_Type, value),
                'key': 'stdBanmFlg'
              },
              {
                'disabled': false,
                'label': '被背书人备注',
                'type': 'text',
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
    submit (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
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
          stdApplDat: util.standardDate(new Date()),
          _tokenName: token._tokenName,
          stdEndrSgn: singMsg, // 电子签名
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('eweb-edraft.EndorsedTransfer.do', params).then(res => {
          this.$router.push({
            name: 'EndorsementTransferApplyRes',
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
        name: 'EndorsementTransferApplySolo',
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
