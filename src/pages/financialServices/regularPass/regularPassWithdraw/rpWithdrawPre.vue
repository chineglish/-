<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @selectWay="selectWay"
        @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
        @submit="submit"
        @changeUp="changeUp"
        @reset="reset">
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { draw_interest_freqcy, usualDate } from '@/assets/js/entity'
import util from '@/libs/util'
/**
 *@name: 定期通支取-录入
 * @author: 梁文彬
 * @date: 2019-12-20
 */
export default {
  name: 'rpWithdrawPre',
  data () {
    return {
      titleData: ['理财服务 ', '定期通', '定期通支取'],
      formModel: {
        regularAcNo: '',
        regularSubAcNo: '',
        regularAcName: '',
        openDate: '',
        matureDate: '',
        nomExpire: '',
        preDrawStartDate: '',
        openAcNoAmount: '',
        acNoBalance: '',
        interestType: '',
        drawType: '',
        drawAmount: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          drawAmount: [
            { required: true, message: '支付金额不能为空', trigger: 'change' },
            { validator: (rule, value, callback) => util.verifyAmount(value, callback), trigger: 'submit' }
          ]
        },
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '40%',
            group: [
              {
                'disabled': true,
                'label': '定期通账号',
                'type': 'text',
                'key': 'regularAcNo'
              }, {
                'disabled': true,
                'label': '定期通账户序号',
                'type': 'text',
                'key': 'regularSubAcNo'
              }, {
                'disabled': true,
                'label': '账户名称',
                'type': 'text',
                'key': 'regularAcName'
              }, {
                'disabled': true,
                'label': '开户日期',
                'type': 'text',
                'key': 'openDate',
                formatter: (key, value) => util.separationDate(value)
              }, {
                'disabled': true,
                'label': '到期日期',
                'type': 'text',
                'key': 'matureDate',
                formatter: (key, value) => util.separationDate(value)
              }, {
                'disabled': true,
                'label': '名义期限',
                'type': 'text',
                'key': 'nomExpire',
                formatter: (key, value) => {
                  return util.handleEnums(usualDate, value)
                }
              }, {
                'disabled': true,
                'label': '提前支取开始日期',
                'type': 'text',
                'key': 'preDrawStartDate',
                formatter: (key, value) => util.separationDate(value)
              }, {
                'disabled': true,
                'label': '开户金额',
                'type': 'text',
                'key': 'openAcNoAmount',
                formatter: (key, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '账户余额',
                'type': 'text',
                textType: 'shy',
                'key': 'acNoBalance',
                formatter: (key, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '付息方式',
                'type': 'text',
                'key': 'interestType',
                formatter: (key, value) => {
                  return util.handleEnums(draw_interest_freqcy, value)
                }
              }, {
                'disabled': false,
                'label': '支取方式',
                'type': 'radio',
                'key': 'drawType',
                'options': [ { 'value': '全部支取', 'key': '0' }, { 'value': '部分支取', 'key': '1' } ],
                'changeEventName': 'selectWay'
              }, {
                'disabled': false,
                'label': '支取金额',
                'type': 'input',
                // maxlength: 13,
                inputType: 'money',
                keydownEventName: 'limitMoneyInputKeyDown',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                'inputEventName': 'changeUp',
                'key': 'drawAmount',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  methods: {
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.drawAmount = util.limitInputMoney(res.drawAmount)
    },
    submit (params) {
      // 校验支取金额
      if (this.formModel.drawType === '1') {
        if (Number(this.formModel.drawAmount) === 0) {
          this.$msg('支取金额必须大于0')
        }
        if (Number(this.formModel.acNoBalance) === Number(1000000)) {
          this.$msg('可用余额不足,定期通起存金额100万起,部分支取最大额度为0元')
        }
        if (Number(this.formModel.drawAmount) > (Number(this.formModel.acNoBalance) - Number(1000000))) {
          this.$msg('可用余额不足,定期通起存金额100万起,部分支取最大额度为' + util.formatCurrency((Number(this.formModel.acNoBalance) - Number(1000000))) + '元')
        }
      }
      this.amount = params.drawAmount
      this.payeeAcNo = params.payeeAccNo
      this.payeeSubAcNo = params.payeeSubAccNo
      httpPost('/eweb-invest.DrawRegularConfirm.do', {
        ...params,
        amount: this.amount,
        payeeAcNo: this.payeeAcNo,
        payeeSubAcNo: this.payeeSubAcNo
      }).then(conf => {
        let _params = params
        _params._Data2Sign = conf._Data2Sign
        _params._dataMapKey = conf._dataMapKey
        _params._authenticateType = conf._authenticateType
        this.$router.push({
          name: 'rpWithdrawConf',
          params: { _params, amount: this.amount, payeeAcNo: this.payeeAcNo, payeeSubAcNo: this.payeeSubAcNo }
        })
      })
    },
    reset (res) {
      this.$router.push({
        name: 'regularPassWithdraw',
        params: this.$route.params
      })
    },
    selectWay (res) {
      switch (res.drawType) {
        case '0':
          res.drawAmount = res.acNoBalance
          this.formConfigJson.formItems[0].group[this.formConfigJson.formItems[0].group.length - 1].type = 'text'
          break
        case '1':
          res.drawAmount = ''
          this.formConfigJson.formItems[0].group[this.formConfigJson.formItems[0].group.length - 1].type = 'input'
          break
      }
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
    }
    // 详情需要展示付息频率内容
    this.formModel.interestType = this.formModel.interestPayFrequency

    // 初始化默认支付方式及支付金额
    if (this.$route.params.interestType === '0') {
      this.formConfigJson.formItems[0].group[this.formConfigJson.formItems[0].group.length - 2].disabled = true
    }
    // if ((Number(this.formModel.acNoBalance) - Number(1000000)) === 0) {
    //   this.formConfigJson.formItems[0].group[this.formConfigJson.formItems[0].group.length - 2].disabled = true
    // }
    this.formModel.drawType = '0'
    this.formModel.drawAmount = this.$route.params.acNoBalance
    this.formConfigJson.formItems[0].group[this.formConfigJson.formItems[0].group.length - 1].type = 'text'
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
</style>
