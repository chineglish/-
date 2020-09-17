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
     *@name: 保证应答
     */
import { httpPost } from '@/api/sys/http'
import { response_Type, bill_Type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'EnsureReplySoloConf',
  data () {
    return {
      titleData: ['电子商业汇票', '保证', '保证应答确认'],
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
                'label': '票面收款人名称',
                'type': 'text',
                'key': 'stdPyeeNam'
              },
              {
                'disabled': false,
                'label': '票面付款人名称',
                'type': 'text',
                'key': 'stdDrwrNam'
              },
              {
                'disabled': false,
                'label': '被保证人名称',
                'type': 'text',
                'key': 'stdAppName'
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
              },
              {
                'disabled': false,
                'label': '签收人地址',
                'type': 'text',
                'key': 'stdSgnrAdr'
              },
              {
                'disabled': false,
                'label': '应答意见',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(response_Type, value),
                'key': 'stdSgnrRes'
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
          stdBussTyp: this.$route.params.params.stdQryCont, // 业务类型
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
          stdSgnrAdr: data.stdSgnrAdr, // 签收人地址
          stdAccpAmt: data.stdPmMoney, // 金额 注意转义
          stdPyeeNam: data.stdPyeeNam, // 收款人名称
          stdAppName: data.stdAppName, // 被保证人名称
          _tokenName: token._tokenName,
          stdDrwrSgn: singMsg, // 电子签名
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('eweb-edraft.BzCurrentSign.do', params).then(res => {
          this.$router.push({
            name: 'EnsureReplyRes',
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
        name: 'EnsureReplySolo',
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
