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
     *@name: 被背书应答
     */
import { httpPost } from '@/api/sys/http'
import { bill_Type, response_Type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'EndorsementTransferReplySoloConf',
  data () {
    return {
      titleData: ['电子商业汇票', '背书转让', '被背书应答确认'],
      formModel: {
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
                'label': '承兑人名称',
                'type': 'text',
                'key': 'stdAccpNam'
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
                'label': '应答人账号',
                'type': 'text',
                'key': 'stdCustAcc'
              },
              {
                'disabled': false,
                'label': '应答意见',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(response_Type, value),
                'key': 'stdSgnrRes'
              },
              {
                'disabled': false,
                'label': '备注',
                'type': 'text',
                'key': 'std400Memob'
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
          stdBussTyp: '05', // 业务类型
          stdBillNum: data.stdBillNum, // 票号
          stdBillTyp: data.stdBillTyp, // 票据类型
          stdIssDate: data.stdIssDate, // 出票日期
          stdDueDate: data.stdDueDate, // 到票日
          stdBussQno: data.stdBussQno, // 业务流水标识
          stdUncnPay: 'CC00', // 到期无条件委托
          std400Memob: data.std400Memob, // 备注
          stdSgnrRes: data.stdSgnrRes, // 签收结果SU00同意签收 SU01拒绝签收
          stdSgnrTyp: data.stdRcvType, // 签收人类型
          stdSgnrNam: data.stdRcvName, // 签收人名称
          stdSgnrCod: data.stdRcvCode, // 签收人组织机构代码证
          stdSgnrAcc: data.stdRcvAcct, // 签收人开户账户
          stdSgnrBnm: data.stdRcvBnm, // 签收人开户行行号
          stdAccpAmt: data.stdPmMoney, // 金额 注意转义
          stdDrwrNam: data.stdDrwrNam, // 出票人名称
          stdAccpNam: data.stdAccpNam, // 承兑人名称
          _tokenName: token._tokenName,
          stdDrwrSgn: singMsg, // 电子签名
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('eweb-edraft.BsCurrentSign.do', params).then(res => {
          this.$router.push({
            name: 'EndorsementTransferReplyRes',
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
        name: 'EndorsementTransferReplySolo',
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
