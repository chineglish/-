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
     *@name: 付款签收
     */
import { httpPost } from '@/api/sys/http'
import { clearing_Type, bill_Type } from '@/assets/js/entity.js'
import util from '@/libs/util'
export default {
  name: 'PromptPaymentSignforInner',
  data () {
    return {
      titleData: ['电子商业汇票', '提示付款', '付款签收录入'],
      formModel: {},
      formConfigJson: {
        stepsActive: 0,
        rules: {},
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
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
                'label': '线上清算标志',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(clearing_Type, value),
                'key': 'stdStlmThd'
              }
            ]
          },
          {
            title: '申请人信息',
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '客户账号',
                'type': 'text',
                'key': 'stdDrwrAcc'
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
        stdBussTyp: this.$route.params.params.stdQryCont, // 业务类型
        stdBillNum: data.stdBillNum, // 电子票据序列号
        stdBillTyp: data.stdBillTyp, // 票据类型
        stdIssDate: data.stdIssDate, // 出票日期
        stdDueDate: data.stdDueDate, // 到票日
        stdBussQno: data.stdBussQno, // 业务流水标识
        stdUncnPay: 'CC00', // 到期无条件委托
        stdSgnrRes: 'SU00', // 签收结果SU00同意签收 SU01拒绝签收
        stdAccpAmt: data.stdPmMoney, // 金额 注意转义
        stdSgnrTyp: data.stdRcvType, // 签收人类型
        stdSgnrNam: data.stdRcvName, // 签收人名称
        stdSgnrCod: data.stdRcvCode, // 签收人组织机构代码证
        stdSgnrAcc: data.stdRcvAcct, // 签收人开户账户
        stdSgnrBnm: data.stdRcvBnm, // 签收人开户行行号
        stdPyeeNam: data.stdPyeeNam, // 收款人名称
        stdAccpNam: data.stdAccpNam, // 承兑人名称
        stdStlmThd: data.stdStlmThd // 清算方式
      }
      httpPost('/eweb-edraft.FkCurrentSignConfirm.do', params).then(res => {
        this.$router.push({
          name: 'PromptPaymentSignforConf',
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
        name: 'PromptPaymentSignforInquire',
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
