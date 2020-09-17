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
import util from '@/libs/util'
export default {
  name: 'agreePayApplyComfirm',
  components: {
  },
  data () {
    return {
      input: '',
      titleData: ['电子商业汇票 ', '票据追索', '同意清偿申请'],
      formModel: {
        stdBillNum: '',
        stdAppAcct: '',
        stdRcvAcct: '',
        stdPmMoney: '',
        payAgreeMoney: '',
        stdDrwrAcc: '',
        agreePayDate: ''
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
                'label': '追索人账号',
                'type': 'text',
                'key': 'stdAppAcct'
              },
              {
                'disabled': false,
                'label': '被追索人账号',
                'type': 'text',
                'key': 'stdRcvAcct'
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
                'disabled': true,
                'label': '同意清偿金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'payAgreeMoney'
              }, {
                'disabled': true,
                'label': '同意清偿日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'agreePayDate'
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
      let singMsg = this.isSign({ _Data2Sign: this.$route.params.res._Data2Sign, _authenticateType: this.$route.params.res._authenticateType })
      httpPost('/eweb-common.GenToken.do').then(token => {
        let params = {
          stdAppAcct: data.stdAppAcct, // 申请人账号
          stdBillNum: data.stdBillNum, // 电子票号
          stdPmMoney: data.stdPmMoney, // 票面金额
          stdBussqno: data.stdbussqno, // 业务流水标识
          stdRcvName: data.stdRcvName, // 同意清偿人全称
          stdRcvType: data.stdrcvtype, // 同意清偿人类型
          stdRcvCode: data.stdrcvcode, // 同意清偿人组织机构代码
          stdRcvAcct: data.stdRcvAcct, // 同意清偿人账号
          stdAperSgn: singMsg,
          stdAperBnm: data.stdRcvBnm, // 同意清偿人开户行行号
          stdApplDte: this.formModel.agreePayDate, // 同意清偿日期
          stdApayAmt: this.formModel.payAgreeMoney, // 同意清偿金额
          stdPpayAmt: data.stdRcrsAmt, // 追索金额
          _tokenName: token._tokenName,
          _dataMapKey: this.$route.params.res._dataMapKey,
          _authenticateTypeChoose: this.$route.params.res._authenticateType ? this.$route.params.res._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('eweb-edraft.AgreePayOff.do', params).then(res => {
          this.$router.push({
            name: 'agreePayApplyResult',
            params: {
              formModel: this.formModel,
              res,
              data
            }
          })
        })
      }).catch(err => {
        console.error(err)
      })
    },
    onBack () {
      this.$router.push({
        name: 'agreePayApplyComfirmPre',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
      this.formModel.payAgreeMoney = this.$route.params.param.stdApayAmt
      this.formModel.agreePayDate = this.$route.params.param.stdAgpyDat
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
