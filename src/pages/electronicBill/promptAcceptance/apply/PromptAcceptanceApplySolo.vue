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
     *@name: 提示承兑撤销-确认
     */
import { httpPost } from '@/api/sys/http'
import { bill_Type } from '@/assets/js/entity.js'
import util from '@/libs/util'
export default {
  name: 'PromptAcceptanceApplySolo',
  data () {
    return {
      titleData: ['电子商业汇票', '出票登记', '提示承兑录入'],
      formModel: {
        stdBillTyp: '',
        ticketIssuingDay: '',
        stdDrwrNam: '',
        stdPyeeNam: ''
      },
      formConfigJson: {
        stepsActive: 0,
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
                'label': '出票人名称',
                'type': 'text',
                'key': 'stdDrwrNam'
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
              }
            ]
          },
          {
            title: '其他信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '合同编号',
                'type': 'input',
                'key': 'stdContRnm'
              },
              {
                'disabled': false,
                'label': '发票编号',
                'type': 'input',
                'key': 'stdInvcNum'
              },
              {
                'disabled': false,
                'label': '批次号',
                'type': 'input',
                'key': 'stdBatchNm'
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
        stdDueDate: data.stdDueDate, // 到期日
        stdDrwrNam: data.stdDrwrNam, // 出票人名
        stdDrwrCod: data.stdDrwrCod, // 出票人机构号
        stdDrwrAcc: data.stdDrwrAcc, // 出票人账号
        stdDrwrBnm: data.stdDrwrBnm, // 出票人行号
        // stdDrwrBnam: data.stdDrwrBnam, // 出票人行名
        stdDrwrTyp: data.stdDrwrTyp, // 出票人类型
        stdAccpNam: data.stdAccpNam, // 承兑人名称
        stdAccpAcc: data.stdAccpAcc, // 承兑人账号
        stdAccpBnm: data.stdAccpBnm, // 承兑人行号
        // stdAccpBnam: data.stdAccpBnam, // 承兑人行名
        stdAccpAmt: data.stdPmMoney, // 金额 注意转义
        stdEndOrmk: data.stdEndOrmk, // 允许背书
        stdUncnPay: 'CC00', // 到期无条件委托
        stdPyeeNam: data.stdPyeeNam, // 收款人名称
        stdPyeeAcc: data.stdPyeeAcc, // 收款人账号
        stdPyeeBnm: data.stdPyeeBnm, // 收款人行号
        // stdPyeeBnam: data.stdPyeeBnam, // 收款人行名
        stdContRnm: data.stdContRnm, // 合同编号
        stdInvcNum: data.stdInvcNum, // 发票编号
        stdBatchNm: data.stdBatchNm, // 批次号
        std400Memo: data.std400Mem // 备注 注意转义
      }
      httpPost('eweb-edraft.AcceptApplicationConfirm.do', params).then(res => {
        this.$router.push({
          name: 'PromptAcceptanceApplySoloConf',
          params: {
            formModel: data, // 列表信息
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params, // 查询条件
            _Data2Sign: res._Data2Sign,
            _authenticateType: res._authenticateType,
            _dataMapKey: res._dataMapKey
          }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    goBack () {
      this.$router.push({
        name: 'promptAcceptanceInquire',
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
  }
}
</script>

<style scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
</style>
