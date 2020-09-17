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
import util from '@/libs/util'
export default {
  name: 'PromptPaymentApplySolo',
  data () {
    return {
      titleData: ['电子商业汇票', '提示付款', '提示付款申请'],
      formModel: {
        stdSttlFlg: 'SM00',
        stdApplDat: util.standardDate(new Date())
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          stdOduersn: [{ required: false, message: '逾期原因', trigger: 'submit' }]
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
                'type': 'select',
                'options': [
                  { 'value': '线上清算', 'key': 'SM00' },
                  { 'value': '线下清算', 'key': 'SM01' }
                ],
                'key': 'stdSttlFlg'
              },
              {
                'disabled': false,
                'label': '逾期原因',
                'type': 'input',
                maxlength: 60,
                show: false,
                'key': 'stdOduersn'
              },
              {
                'disabled': false,
                'label': '备注',
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
    submit (data) {
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
        stdPrsnBnm: data.stdRcvBnm, // 提示付款人开户行行号
        stdApplDat: data.stdApplDat, // 提示付款申请日期
        stdPpayAmt: data.stdPmMoney, // 提示付款金额
        stdOduersn: data.stdOduersn, // 逾期原因
        std400Memo: data.std400Mem,
        stdSttlFlg: data.stdSttlFlg // 线上清算标志
      }
      httpPost('/eweb-edraft.PaymentReminderConfirm.do', params).then(res => {
        this.$router.push({
          name: 'PromptPaymentApplySoloConf',
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
        name: 'PromptPaymentApplyInquire',
        params: {
          pageNation: this.$route.params.pageNation, // 分页信息
          params: this.$route.params.params // 查询条件
        }
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
      this.formModel.stdCustAcc = this.$route.params.params.stdCustAcc
    }
    if (this.$route.params.params.stdQryCont === '17') {
      this.formModel.stdBussTyp = '01'
    }
    if (this.$route.params.params.stdQryCont === '18') {
      this.formModel.stdBussTyp = '02'
      this.formConfigJson.formItems[0].group[7].show = true
      this.formConfigJson.rules.stdOduersn[0].required = true
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
