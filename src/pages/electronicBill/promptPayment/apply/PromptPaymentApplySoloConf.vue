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
     *@name: 提示付款申请
     */
import { httpPost } from '@/api/sys/http'
import { bill_Type } from '@/assets/js/entity.js'
import { clearing_Type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'PromptPaymentApplySoloConf',
  data () {
    return {
      titleData: ['电子商业汇票', '提示付款', '提示付款申请确定'],
      formModel: {},
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
                'key': 'stdIssDate',
                formatter: (key, value) => util.separationDate(value)
              },
              {
                'disabled': false,
                'label': '票面到期日',
                'type': 'text',
                'key': 'stdDueDate',
                formatter: (key, value) => util.separationDate(value)
              },
              {
                'disabled': false,
                'label': '票面金额',
                'type': 'text',
                'key': 'stdPmMoney',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '提示付款申请日期',
                'type': 'text',
                'key': 'stdApplDat',
                formatter: (key, value) => util.separationDate(value)
              },
              {
                'disabled': false,
                'label': '线上清算标志',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(clearing_Type, value),
                'key': 'stdSttlFlg'
              },
              {
                'disabled': false,
                'label': '逾期原因',
                'type': 'text',
                show: false,
                'key': 'stdOduersn'
              },
              {
                'disabled': false,
                'label': '备注',
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
      let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
      let params = {
        stdBillNum: data.stdBillNum, // 票号
        stdBillTyp: data.stdBillTyp, // 票据类型
        stdIssDate: data.stdIssDate, // 出票日期
        stdDueDate: data.stdDueDate, // 到期日期
        stdPmMoney: data.stdPmMoney, // 票面金额
        stdBussTyp: data.stdBussTyp, // 提示付款类型
        stdPrsnNam: data.stdRcvName, // 提示付款人全称
        stdPrsnTyp: data.stdRcvType, // 提示付款人类型
        stdPrsnCod: data.stdRcvCode, // 提示付款人组织机构代码证
        stdPrsnAcc: data.stdRcvAcct, // 提示付款人账号
        stdPrsnBnm: data.stdRcvBnm, // 提示付款账户开户行行号
        stdApplDat: data.stdApplDat, // 提示付款申请日期
        stdPpayAmt: data.stdRealAmt, // 提示付款金额
        stdOduersn: data.stdOduersn, // 逾期原因
        std400Memo: data.std400Mem,
        stdSttlFlg: data.stdSttlFlg // 线上清算标志
      }
      httpPost('/eweb-common.GenToken.do').then(token => {
        httpPost('/eweb-edraft.PaymentReminder.do', {
          ...params,
          _tokenName: token._tokenName,
          stdEndrSgn: singMsg, // 电子签名
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }).then(res => {
          this.$router.push({
            name: 'PromptPaymentApplyRes',
            params: {
              data: data, res
            }
          })
        }).catch(err => {
          console.error(err)
        })
      })
    },
    goBack () {
      this.$router.push({
        name: 'PromptPaymentApplySolo',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
    }
    if (this.formModel.stdBussTyp === '02') {
      this.formConfigJson.formItems[0].group[7].show = true
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
