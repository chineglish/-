<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @submit="submit"
        @back="back">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 *@name: 定期通支取-确认
 * @author: 梁文彬
 * @date: 2019-12-20
 */
import { httpPost } from '@/api/sys/http'
import { draw_interest_freqcy, usualDate, draw_type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'rpWithdrawConf',
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
        stepsActive: 1,
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
                'disabled': true,
                'label': '支取方式',
                'type': 'text',
                'key': 'drawType',
                formatter: (key, value) => {
                  return util.handleEnums(draw_type, value)
                }
              }, {
                'disabled': true,
                'label': '支取金额',
                'type': 'text',
                'key': 'drawAmount',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    submit (params) {
      /**
       * 发送接口数据
       */
      httpPost('/eweb-common.GenToken.do').then(token => {
        const singMsg = this.isSign({ _Data2Sign: params._Data2Sign, _authenticateType: params._authenticateType })
        httpPost('/eweb-invest.DrawRegular.do', {
          ...params,
          amount: this.amount,
          payeeAcNo: this.payeeAcNo,
          payeeSubAcNo: this.payeeSubAcNo,
          _dataMapKey: params._dataMapKey,
          _authenticateTypeChoose: params._authenticateType ? params._authenticateType[0] : '',
          CSIISignature: singMsg,
          _tokenName: token._tokenName
        }).then(res => {
          this.$router.push({
            name: 'rpWithdrawRes',
            params: {
              nomExpire: util.handleEnums(usualDate, params.nomExpire),
              regularAcNo: params.regularAcNo,
              regularAcName: params.regularAcName,
              drawType: params.drawType,
              drawAmount: params.drawAmount,
              payeeAcNo: params.payeeAcNo,
              payeeSubAcNo: params.payeeSubAcNo,
              res
            }
          })
        })
      })
    },
    back (data) {
      this.$router.push({
        name: 'rpWithdrawPre',
        params: this.formModel
      })
    }
  },
  created () {
    this.formModel = this.$route.params._params
    this.amount = this.$route.params.amount
    this.payeeAcNo = this.$route.params.payeeAcNo
    this.payeeSubAcNo = this.$route.params.payeeSubAcNo
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
</style>
