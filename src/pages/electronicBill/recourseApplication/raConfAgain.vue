<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :formModel="formModel"
              :btnData="btnData"
              @goBack="goBack"
              @submit="submit">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 *@name: 追索申请-录入
 * @date: 2019-12-23
 */
import { httpPost } from '@/api/sys/http'
import { bill_Type, recourseTyp_Type, recourseReason_Type } from '@/assets/js/entity.js'
import util from '@/libs/util'
export default {
  name: 'raConfAgain',
  data () {
    return {
      titleData: ['电子商业汇票 ', '追索', '追索通知申请'],
      formModel: {
        stdBillNum: '',
        stdBillTyp: '',
        stdIssDate: '',
        stdDueDate: '',
        stdPmMoney: '',
        stdDrwrNam: '',
        stdAccpNam: '',
        recourseTyp: '',
        recourseReason: 'RC00',
        recourseMoney: '',
        recourseDate: '',
        stdRcvAcct: '',
        stdRcvBnm: '',
        stdRcvName: '',
        stdRcvCode: '',
        stdRcvgNme: '',
        stdRcvgBnm: '',
        stdRcvgAcc: '',
        stdRecrCod: ''
      },
      formConfigJson: {
        stepsActive: 1,
        rules: {},
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
                'disabled': true,
                'label': '票面出票人名称',
                'type': 'text',
                'key': 'stdDrwrNam'
              }, {
                'disabled': true,
                'label': '票面承兑人名称',
                'type': 'text',
                'key': 'stdAccpNam'
              },
              {
                'disabled': false,
                'label': '追索类型',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(recourseTyp_Type, value),
                'key': 'recourseTyp'
              },
              { 'show': true,
                'disabled': false,
                'label': '追索理由',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(recourseReason_Type, value),
                'key': 'recourseReason'
              }, {
                'disabled': false,
                'label': '追索金额',
                'type': 'text',
                'key': 'recourseMoney'
              }, {
                'disabled': true,
                'label': '追索申请日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'recourseDate'
              }
            ]
          },
          {
            formTitle: '追索人信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '追索人账号',
                'type': 'text',
                'key': 'stdRcvAcct'
              }, {
                'disabled': false,
                'label': '追索人名称',
                'type': 'text',
                'key': 'stdRcvName'
              },
              {
                'disabled': true,
                'label': '追索人行号',
                'type': 'text',
                'key': 'stdRcvBnm'
              },
              {
                'disabled': false,
                'label': '追索人组织机构代码',
                'type': 'text',
                'key': 'stdRcvCode'
              }
            ]
          },
          {
            formTitle: '被追索人信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '被追索人名称',
                'type': 'text',
                'key': 'stdRcvgNme'
              },
              {
                'disabled': false,
                'label': '被追索人行号',
                'type': 'text',
                'key': 'stdRcvgBnm'
              },
              {
                'disabled': false,
                'label': '被追索人账号',
                'type': 'text',
                'key': 'stdRcvgAcc'
              },
              {
                'disabled': false,
                'label': '被追索人组织机构代码',
                'type': 'text',
                'key': 'stdRecrCod'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'goBack' }
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.push({
        name: 'raConf',
        params: this.$route.params
      })
    },
    submit (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params.res._Data2Sign, _authenticateType: this.$route.params.res._authenticateType })
        let params = {
          stdBillNum: data.stdBillNum, // 票号
          stdBillTyp: data.stdBillTyp, // 票据类型
          stdIssDate: data.stdIssDate, // 出票日期
          stdDueDate: data.stdDueDate, // 到期日期
          stdPmMoney: data.stdPmMoney, // 票面金额
          stdBussTyp: this.formModel.recourseTyp, // 追索类型
          stdApplDte: this.formModel.recourseDate, // 追索日期
          stdPpayAmt: data.recourseMoney, // 追索金额
          stdRcrsNme: data.stdrcvname, // 追索人全称
          stdRcrsTyp: data.stdRcvType, // 追索人类型
          stdRcrsCod: data.stdrcvcode, // 追索人组织机构代码
          stdRcrsAcc: data.stdrcvacct, // 追索人账号
          stdAperSgn: singMsg,
          stdRcrsBnm: data.stdRcvBnm, // 追索人开户行行号
          // stdAperSgn: data.stdColtSgn, // 追索人电子签名
          stdRcvgNme: data.stdRcvgNme, // 被追索人全称
          stdRcrsBcd: this.formModel.recourseReason, // 追索理由代码
          stdRecrCod: data.stdRecrCod, // 被追索人组织机构代码
          stdRcvgAcc: data.stdRcvgAcc, // 被追索人账号
          stdRcvgBnm: data.stdRcvgBnm, // 被追索人开户行行号
          stdAccpNam: data.stdAccpNam, // 承兑人名称
          stdDrwrNam: data.stdDrwrNam, // 出票人名称
          _tokenName: token._tokenName,
          _dataMapKey: this.$route.params.res._dataMapKey,
          _authenticateTypeChoose: this.$route.params.res._authenticateType ? this.$route.params.res._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('eweb-edraft.RecourseNotice.do', params).then(res => {
          this.$router.push({
            name: 'raRes',
            params: {
              data: data, res
            }
          })
        })
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
    }
    if (this.formModel.recourseTyp === 'RT00') {
      this.formConfigJson.formItems[0].group[8].show = false
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
</style>
