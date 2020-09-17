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
import { bill_Type, resBill_Type } from '@/assets/js/entity.js'
import util from '@/libs/util'
export default {
  name: 'agreePayReplyComfirm',
  components: {
  },
  data () {
    return {
      input: '',
      titleData: ['电子商业汇票 ', '票据追索', '同意清偿应答'],
      formModel: {
        stdBillNum: '',
        stdBillTyp: '',
        ticketIssuingDay: '',
        stdIssDate: '',
        stdDueDate: '',
        stdPmMoney: '',
        stdDrwrNam: '',
        stdPyeeNam: '',
        stdSgnrRes: '',
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
              },
              {
                'disabled': false,
                'label': '追索金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stdRcrsAmt'
              },
              {
                'disabled': false,
                'label': '同意清偿金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stdAgrrAmt'
              },
              {
                'disabled': false,
                'label': '追索人账号',
                'type': 'text',
                'key': 'stdRcvAcct'
              },
              {
                'disabled': false,
                'label': '被追索人账号',
                'type': 'text',
                'key': 'stdAppAcct'
              },
              {
                'disabled': false,
                'label': '应答意见',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(resBill_Type, value),
                'key': 'stdSgnrRes'
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
                'key': 'stdRcvAcct'
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
          stdBussTyp: '20', // 业务类型
          stdBillNum: data.stdBillNum, // 票号
          stdBillTyp: data.stdBillTyp, // 票据类型
          stdBussQno: data.stdbussqno, // 业务流水标识
          stdUncnPay: 'CC00', // 到期无条件支付委托
          stdSgnrRes: data.stdSgnrRes, // 签收意见
          stdAccpAmt: data.stdPmMoney, // 票面金额
          stdRcrsAmt: data.stdRcrsAmt, // 追索金额
          stdAgrrAmt: data.stdAgrrAmt, // 同意清偿金额
          stdSgnrNam: data.stdrcvname, // 签收人全称
          stdSgnrTyp: data.stdrcvtype, // 签收人类型
          stdSgnrCod: data.stdrcvcode, // 签收人组织机构代码
          stdSgnrAcc: data.stdrcvacct, // 签收人账号
          stdIssDate: data.stdIssDate, // 出票日期
          stdDueDate: data.stdDueDate, // 到期日期
          stdAppAcct: data.stdAppAcct, // 被追索人账号
          stdAgrrDat: data.stdAgrrDat, // 同意清偿日期
          stdDrwrSgn: singMsg,
          stdSgnrBnm: data.stdRcvBnm, // 签收人开户行行号
          // stdColtSgn: data.stdColtSgn, // 出质人电子签名
          _tokenName: token._tokenName,
          _dataMapKey: this.$route.params.res._dataMapKey,
          _authenticateTypeChoose: this.$route.params.res._authenticateType ? this.$route.params.res._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('eweb-edraft.QcCurrentSign.do', params).then(res => {
          this.$router.push({
            name: 'agreePayReplyResult',
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
        name: 'agreePayReplyComfirmPre',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      this.formModel.stdSgnrRes = this.$route.params.param.stdSgnrRes
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
