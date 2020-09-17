<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @submit="submit"
              @cancel="cancel">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 *@name: 大额存单支取-确认
 * @author: 梁文彬
 * @date: 2019-12-19
 */
import util from '@/libs/util'
import { httpPost } from '@/api/sys/http'
import { handleChannel, acc_type, acc_status, payerRate } from '@/assets/js/entity'
export default {
  name: 'withdrawConf',
  data () {
    return {
      titleData: ['理财服务', '大额存单', '单位大额存单支取'],
      formModel: {
        acName: '',
        acType: '',
        lDAcNo: '',
        subAcNo: '',
        openAmount: '',
        actBal: '',
        prdBatchCode: '',
        actualRate: '',
        openChannel: '',
        interestFrequency: '',
        openDates: '',
        expiryDate: '',
        payerAcNo: '',
        actStatus: '',
        transMoney: ''
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
                'label': '账户名称',
                'type': 'text',
                'key': 'acName'
              }, {
                'disabled': true,
                'label': '账户类型',
                'type': 'text',
                'key': 'acType',
                formatter: (key, value) => util.handleEnums(acc_type, value)
              }, {
                'disabled': true,
                'label': '账号',
                'type': 'text',
                'key': 'lDAcNo'
              }, {
                'disabled': true,
                'label': '子账户序号',
                'type': 'text',
                'key': 'subAcNo'
              }, {
                'disabled': true,
                'label': '开户金额',
                'type': 'text',
                'key': 'openAmount',
                formatter: (name, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '账户余额',
                'type': 'text',
                'key': 'actBal',
                textType: 'shy',
                formatter: (name, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '大额存单产品期次编号',
                'type': 'text',
                'key': 'prdBatchCode'
              }, {
                'disabled': true,
                'label': '年利率（%）',
                'type': 'text',
                'key': 'actualRate',
                formatter: (key, value) => {
                  return Number(value) + '%'
                }
              }, {
                'disabled': true,
                'label': '办理渠道',
                'type': 'text',
                'key': 'openChannel',
                formatter: (key, value) => util.handleEnums(handleChannel, value)
              }, {
                'disabled': true,
                'label': '付息方式',
                'type': 'text',
                'key': 'lxzffans',
                formatter: (key, value) => util.handleEnums(payerRate, value)
              }, {
                'disabled': true,
                'label': '开户日期',
                'type': 'text',
                'key': 'openDates'
              }, {
                'disabled': true,
                'label': '到期日期',
                'type': 'text',
                'key': 'expiryDate'
              }, {
                'disabled': true,
                'label': '收付款账户',
                'type': 'text',
                'key': 'payerAcNo'
              }, {
                'disabled': true,
                'label': '账户状态',
                'type': 'text',
                'key': 'actStatus',
                formatter: (key, value) => util.handleEnums(acc_status, value)
              }, {
                'disabled': true,
                'label': '交易金额(元)',
                'type': 'text',
                'key': 'transMoney',
                formatter: (name, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '取消', class: 'm-cancel-btn', clickEventName: 'cancel' }
      ],
      formData: {}
    }
  },
  methods: {
    submit (data) {
      /**
       * 发送接口数据
       */
      let _params = data
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: data._Data2Sign, _authenticateType: data._authenticateType })
        httpPost('/eweb-largeDeposit.LargeProductDraw.do', {
          _dataMapKey: data._dataMapKey,
          _authenticateTypeChoose: data._authenticateType ? data._authenticateType[0] : '',
          CSIISignature: singMsg,
          subscribe: data.subscribe,
          cifName: data.acName,
          depositTerm: data.depositTerm,
          actBal: data.actBal,
          matureDate: data.matureDate,
          amount: data.transMoney,
          ldAccountNo: data.lDAcNo,
          ldSubAccNo: data.subAcNo,
          openAmount: data.openAmount,
          acNo: data.payerAcNo,
          ldAcStatus: data.actStatus,
          openDate: data.openDate,
          interestFrequency: data.lxzffans,
          prdBatchCode: data.prdBatchCode,
          actualRate: data.actualRate,
          openChannel: data.openChannel,
          ldActStatus: data.actStatus,
          payeeAcType: data.acType,
          _tokenName: token._tokenName
        }).then(res => {
          Object.assign(_params, res)
          this.$router.push({
            name: 'withdrawRes',
            params: {
              msg: _params,
              res
            }
          })
        })
      })
    },
    cancel (data) {
      this.$router.push({
        name: 'withdrawPre',
        params: {
          data: this.formData
        }
      })
    }
  },
  created () {
    this.formData = this.$route.params
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
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
