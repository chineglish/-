<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <div class="title">非税缴费</div>
      <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              :msgs="msgs"
              @back="back"
              @submit="submit">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 *@name: 非税缴费确认
 */
import { httpPost } from '@/api/sys/http'
export default {
  name: 'noTaxPayConf',
  data () {
    return {
      titleData: ['转账汇款', '非税缴费'],
      formModel: {
        payerAcNo: '',
        balance: '',
        payItem: '',
        payCode: '',
        chgAgenName: '',
        chgAgenCode: '',
        payerAcName: '',
        payeeAcName: '',
        remark: '',
        amount: '',
        payStats: '',
        payerSubAcNo: ''
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '40%',
            group: [
              {
                'disabled': true,
                'label': '付款账户',
                'type': 'text',
                'key': 'payerAcNo'
              }, {
                'disabled': true,
                'label': '可用余额',
                'type': 'text',
                textType: 'shy',
                'key': 'balance'
              }, {
                'disabled': true,
                'label': '缴款项目',
                'type': 'text',
                'key': 'payItem'
              }, {
                'disabled': true,
                'label': '缴款码',
                'type': 'text',
                'key': 'payCode'
              }, {
                'disabled': true,
                'label': '执行单位名称',
                'type': 'text',
                'key': 'chgAgenName'
              }, {
                'disabled': true,
                'label': '执行单位编码',
                'type': 'text',
                'key': 'chgAgenCode'
              }, {
                'disabled': true,
                'label': '缴款人名称',
                'type': 'text',
                'key': 'payerAcName'
              }, {
                'disabled': true,
                'label': '收款人名称',
                'type': 'text',
                'key': 'payeeAcName'
              }, {
                'disabled': true,
                'label': '摘要',
                'type': 'text',
                'key': 'remark'
              }, {
                'disabled': true,
                'label': '缴款金额',
                'type': 'text',
                'key': 'amount'
              }, {
                'disabled': true,
                'label': '缴款状态',
                'type': 'text',
                'key': 'payStats'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      msgs: []
    }
  },
  methods: {
    submit (params) {
      // this.transTime = new Date()
      let _params = params
      /**
       * 发送接口数据
       */
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: params._Data2Sign, _authenticateType: params._authenticateType })
        httpPost('/eweb-transfer.PaymentPayInfo.do', {
          _dataMapKey: params._dataMapKey,
          _authenticateTypeChoose: params._authenticateType ? params._authenticateType[0] : '',
          CSIISignature: singMsg,
          remark: params.remark,
          payerAcName: params.payerAcName,
          payCode: params.payCode,
          amount: params.amount,
          payeeAcName: params.payeeAcName,
          chgAgenName: params.chgAgenName,
          chgAgenCode: params.chgAgenCode,
          _tokenName: token._tokenName,
          payerAcNo: params.payerAcNo
        }).then(res => {
          Object.assign(_params, res)
          _params.JnlStatus = res._processState
          this.$router.push({
            name: 'noTaxPayRes',
            params: {
              msg: _params
              // transTime: this.transTime
            }
          })
        }).catch(e => {
          console.error(e)
          // _params.JnlStatus = '0'
          // this.$router.push({
          //   name: 'noTaxPayRes',
          //   params: {
          //     msg: _params
          //     // transTime: this.transTime
          //   }
          // })
        })
      })
    },
    back (data) {
      this.$router.push({
        name: 'noTaxPayPre',
        params: data
      })
    }
  },
  created () {
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
.title{
  height: 0;
  line-height: 30px;
  width: 150px;
  border-bottom: 30px solid #D41618;
  border-right: 37px solid transparent;
  border-top-left-radius: 5px;
  text-align: center;
  color: #ffffff;
}
</style>
