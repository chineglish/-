<template>
    <div>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @submit="submit"
                    @back="onBack"
            >
            </m-new-form>
        </div>
    </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { bill_Type } from '@/assets/js/entity.js'
import util from '@/libs/util'
export default {
  name: 'jiePledgeRecallComfirm',
  components: {
  },
  data () {
    return {
      input: '',
      titleData: ['电子商业汇票 ', '票据质押', '解质押撤销'],
      formModel: {
        stdBillNum: '',
        stdBillTyp: '',
        ticketIssuingDay: '',
        stdIssDate: '',
        stdDueDate: '',
        stdPmMoney: '',
        stdDrwrNam: '',
        stdPyeeNam: '',
        replyIdea: '',
        stdDrwrAcc: ''
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      formConfigJson: {
        stepsActive: 1,
        rules: {
        },
        formItems: [
          {
            formTitle: '票据信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': true,
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
              }
            ]
          },
          {
            formTitle: '申请人信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '客户账号',
                'type': 'text',
                'key': 'stdAppAcct'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    submit (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params.res._Data2Sign, _authenticateType: this.$route.params.res._authenticateType })
        let params = {
          stdBillNum: data.stdBillNum, // 票号
          stdPmMoney: data.stdPmMoney, // 票面金额
          stdTranDat: data.stdTranDat, // 交易日期
          stdTranNum: data.stdTranNum, // 交易流水号
          stdRvkrTyp: data.stdAppType, // 撤销人类型
          stdRvkrCod: data.stdAppCode, // 撤销人组织机构代码
          stdRvkrAcc: data.stdAppAcct, // 撤销人账户
          stdBillTyp: data.stdBillTyp, // 票据类型
          stdIssDate: data.stdIssDate, // 出票日期
          stdDueDate: data.stdDueDate, // 到期日期
          stdDrwrSgn: singMsg,
          stdRvkrBnm: data.stdAppBnm, // 撤销人开户行行号
          _tokenName: token._tokenName,
          _dataMapKey: this.$route.params.res._dataMapKey,
          _authenticateTypeChoose: this.$route.params.res._authenticateType ? this.$route.params.res._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('eweb-edraft.JzyRevokeReq.do', params).then(res => {
          this.$router.push({
            name: 'jiePledgeRecallResult',
            params: {
              data: data, res
            }
          })
        })
      }).catch(err => {
        console.error(err)
      })
    },
    onBack () {
      this.$router.push({
        name: 'jiePledgeRecallInfoInput',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
    }
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
.set{
    background-color: #cc444d;
    color: #fff;
    border-radius: 3px;
  }
  .divBtn{
    margin-left: 3%;
  }
</style>
