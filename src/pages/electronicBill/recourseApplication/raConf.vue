<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :formModel="formModel"
              :btnData="btnData"
              @changeReason="changeReason"
              @changeMoney="changeMoney"
              @goBack="goBack"
              @submit="submit">
              <div style="width:50%;color:#C21D1F;text-align:center" slot="inquiry">
                <el-button class="set" size="mini" @click="inquiry">查询</el-button>
              </div>
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
import { bill_Type, recourseTyp_Type } from '@/assets/js/entity.js'
import util from '@/libs/util'
export default {
  name: 'raConf',
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
        stepsActive: 0,
        rules: {
          recourseMoney: [{ required: true, message: '请输入追索金额 ', trigger: 'submit' },
            { validator: (rule, value, callback) => util.verifyAmount(value, callback), trigger: 'submit' },
            { validator: (rule, value, callback) => {
              if (Number(value) > Number(this.formModel.stdPmMoney)) {
                callback(new Error('追索金额应小于票面金额'))
              } else {
                callback()
              }
            },
            trigger: 'submit' }
          ],
            recourseReason: [{ required: true, message: '请输入追索理由 ', trigger: 'submit' }]
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
                'type': 'select',
                'options': [
                  { 'value': '承兑人被依法宣告破产', 'key': 'RC00' },
                  { 'value': '承兑人因违法被责令终止活动', 'key': 'RC01' }
                ],
                'changeEventName': 'changeReason',
                'key': 'recourseReason'
              }, {
                'disabled': false,
                'label': '追索金额',
                'type': 'input',
                inputEventName: 'changeMoney',
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
              },
              {
                'disabled': false,
                'label': '选择被追索人',
                'type': 'blank',
                'slotName': 'inquiry'
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
    changeReason (data) {
      this.formModel.recourseReason = data.recourseReason
    },
    changeMoney (data) {
      this.formModel.recourseMoney = data.recourseMoney
    },
    inquiry () {
      let params = {
        stdBillNum: this.formModel.stdBillNum,
        stdStartNm: '1',
        stdQueryNm: '20'
      }
      httpPost('eweb-edraft.RecourseQry.do', params).then(res => {
        this.$router.push({
          name: 'queryReseller',
          params: {
            formModel: this.formModel,
            res,
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params // 查询条件
          }
        })
      })
    },
    goBack (data) {
      if (this.$route.params.pageNation) {
        this.$router.push({
          name: 'raInquiry',
          params: {
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params, // 查询条件
            data: { stdBussTyp: data.recourseTyp }
          }
        })
      }
    },
    submit (data) {
      let params = {
        stdBillNum: data.stdBillNum, // 票号
        stdBillTyp: data.stdBillTyp, // 票据类型
        stdIssDate: data.stdIssDate, // 出票日期
        stdDueDate: data.stdDueDate, // 到期日期
        stdPmMoney: data.stdPmMoney, // 票面金额
        stdBussTyp: this.formModel.recourseTyp, // 追索类型
        stdApplDte: this.formModel.recourseDate, // 追索日期
        stdPpayAmt: data.recourseMoney, // 追索金额
        stdRcrsNme: data.stdRcvName, // 追索人全称
        stdRcrsTyp: data.stdRcvType, // 追索人类型
        stdRcrsCod: data.stdRcvCode, // 追索人组织机构代码
        stdRcrsAcc: data.stdRcvAcct, // 追索人账号
        stdRcrsBnm: data.stdRcvBnm, // 追索人开户行行号
        // stdRcrsSgn: data.stdColtSgn, // 追索人电子签名
        stdRcvgNme: data.stdRcvgNme, // 被追索人全称
        stdRcrsBcd: this.formModel.recourseReason, // 追索理由代码
        stdRecrCod: data.stdRecrCod, // 被追索人组织机构代码
        stdRcvgAcc: data.stdRcvgAcc, // 被追索人账号
        stdRcvgBnm: data.stdRcvgBnm, // 被追索人开户行行号
        stdAccpNam: data.stdAccpNam, // 承兑人名称
        stdDrwrNam: data.stdDrwrNam // 出票人名称
      }
      httpPost('eweb-edraft.RecourseNoticeConfirm.do', params).then(res => {
        this.$router.push({
          name: 'raConfAgain',
          params: {
            formModel: this.formModel,
            res,
            params
          }
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
    if (this.$route.params.form) {
      this.formModel = this.$route.params.form
      this.formModel.recourseTyp = this.$route.params.data.stdBussTyp
    }
    this.formModel.recourseDate = util.standardDate(new Date())
    if (this.$route.params.flag) {
      this.formModel = this.$route.params.data
      this.formModel.stdRcvgNme = this.$route.params.selectedReseller.stdRcvgNme
      this.formModel.stdRecrCod = this.$route.params.selectedReseller.stdRecrCod
      this.formModel.stdRcvgAcc = this.$route.params.selectedReseller.stdRcvgAcc
      this.formModel.stdRcvgBnm = this.$route.params.selectedReseller.stdRcvgBnm
    }
    if (this.formModel.recourseTyp === 'RT00') {
        this.formConfigJson.formItems[0].group[8].show = false
        this.formConfigJson.rules.recourseReason[0].required = false
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
