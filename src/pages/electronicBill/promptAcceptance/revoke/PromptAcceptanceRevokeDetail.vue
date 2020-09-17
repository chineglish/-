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
import { bill_Type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'PromptAcceptanceRevokeDetail',
  data () {
    return {
      titleData: ['电子商业汇票', '提示承兑', '提示承兑撤销录入'],
      formModel: {
        ticketType: '',
        ticketIssuingDay: '',
        facedate: '',
        faceValue: '',
        drawerName: '',
        beneficiaryName: '',
        accountNum: '',
        customerAccount: ''
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
                'label': '收款人名称',
                'type': 'text',
                'key': 'stdPyeeNam'
              },
              {
                'disabled': false,
                'label': '承兑行开户行号',
                'type': 'text',
                'key': 'stdAccpBnm'
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
        stdDueDate: data.stdDueDate, // 到票日
        stdPmMoney: data.stdPmMoney, // 金额 注意转义
        stdTranDat: data.stdTranDat, // 交易日期
        stdTranNum: data.stdBussQno, // 业务流水标识
        stdRvkrTyp: data.stdAppType, // 撤销人类型
        stdRvkrCod: data.stdAppCode, // 撤销人组织机构代码
        stdRvkrAcc: data.stdappacct, // 撤销人开户账户
        stdRvkrBnm: data.stdAppBnm, // 撤销人行号
        // stdSgnrAdr: data.stdSgnrAdr, // 签收人地址
        // std400Memob: data.std400Mem, // 备注 注意转义
        // stdDrwrSgn: data.stdDrwrSgn, // 电子签名
        stdDrwrNam: data.stdDrwrNam, // 出票人名
        // stdDrwrBnam: data.stdDrwrBnam, // 出票人行名
        // stdDrwrTyp: data.stdDrwrTyp, // 出票人类型
        // stdDrwrAcc: data.stdDrwrAcc, // 出票人账户
        stdAccpNam: data.stdAccpNam, // 承兑人名称
        // stdAccpAcc: data.stdAccpAcc, // 承兑人账号
        stdAccpBnm: data.stdAccpBnm, // 承兑人行号
        // stdAccpBnam: data.stdAccpBnam, // 承兑人行名
        stdPyeeNam: data.stdPyeeNam // 收款人名称
        // stdPyeeAcc: data.stdPyeeAcc, // 收款人账号
        // stdPyeeBnm: data.stdPyeeBnm, // 收款人行号
        // stdPyeeBnam: data.stdPyeeBnam, // 收款人行名
      }
      httpPost('eweb-edraft.CdRevokeReqConfirm.do', params).then(res => {
        this.$router.push({
          name: 'PromptAcceptanceRevokeConf',
          params: {
            formModel: data, // 列表信息
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params, // 查询条件
            _Data2Sign: res._Data2Sign,
            _dataMapKey: res._dataMapKey,
            _authenticateType: res._authenticateType
          }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    goBack () {
      this.$router.push({
        name: 'PromptAcceptanceRevoke',
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
