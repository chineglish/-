<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <div class="form-box">
    <m-form :componentJson="formConfigJson"
            :formModel="formModel"
            :btnData="btnData"
            :isDisabled="doSubmit"
            @submit="onSubmit"
            @back="onBack">
    </m-form></div>
  </d2-container>
</template>
<script>
import axios from 'axios'
export default {
  name: 'interTransferConf',
  data () {
    return {
      formModel: { payerAccNo: '', payerAmt: '', payeeAccNo: '', payeeName: '', payeeBankNo: '', transfType: '', transferRemark: '', smsMessage: '', smsMessageNum: '', savepayeeInfo: '', uploadAttachment: '', selectCity: '', city: '' },
      data: ['转账交易确认'],
      // 以下为动态数据
      formConfigJson: {
        formItems: [
          {
            title: '填写付款信息',
            group: [
              { 'label': '付款人账号', 'type': 'select', 'options': [{ 'value': '45454', 'key': '0' }, { 'value': '545545', 'key': '1' }], 'key': 'payerAccNo', 'disabled': true },
              { 'label': '转账金额', 'type': 'input', 'key': 'payerAmt', 'disabled': true },
              { 'label': '转账方式', 'type': 'select', 'key': 'transfType', 'options': [ { 'value': '实时', 'key': '01' }, { 'value': '普通', 'key': '02' }, { 'value': '次日', 'key': '03' } ], 'disabled': true },
              {
                'disabled': true,
                'label': '城市',
                'type': 'selectCity',
                'options': [{ 'value': '辽宁省', 'key': '0', 'list': [{ 'value': '大连市', 'key': '0' }, { 'value': '沈阳市', 'key': '1' }] }, { 'value': '广东省', 'key': '1', 'list': [{ 'value': '深圳市', 'key': '0' }, { 'value': '广州市', 'key': '1' }] }],
                'key': 'selectCity'
              }, { 'label': '转账备注', 'type': 'input', 'key': 'transferRemark', 'disabled': true }
            ]
          },
          {
            title: '填写收款信息',
            group: [
              { 'label': '收款人账号', 'type': 'input', 'key': 'payeeAccNo', 'disabled': true },
              { 'label': '收款人姓名', 'type': 'input', 'key': 'payeeName', 'disabled': true },
              { 'label': '收款人银行编号', 'type': 'input', 'key': 'payeeBankNo', 'disabled': true }
            ]
          },
          {
            title: '提示信息',
            group: [
              { 'label': '是否短信通知', 'type': 'radio', 'key': 'smsMessage', 'options': [ { 'value': '否', 'key': '0' }, { 'value': '是', 'key': '1' } ], 'disabled': true },
              { 'label': '是否保存常用收款人信息', 'type': 'radio', 'key': 'savepayeeInfo', 'options': [ { 'value': '否', 'key': '0' }, { 'value': '是', 'key': '1' } ], 'disabled': true },
              { 'label': '短信通知手机号', 'type': 'input', 'key': 'smsMessageNum', 'disabled': true }
            ]
          },
          {
            title: '上传附件',
            group: [
              { 'disabled': true, 'label': '上传附件', 'type': 'upload', 'key': 'uploadAttachment', 'action': 'https://jsonplaceholder.typicode.com/posts/' }]
          }
        ]
      },
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      doSubmit: true
    }
  },
  methods: {
    onSubmit () {
      let _params = { ...this.formModel }
      axios({
        method: 'POST',
        url: '/transfer.action',
        params: _params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        if (res.data.returnCode === '000000') {
          this.$router.push({
            name: 'interTransferResult',
            params: _params
          })
        } else {
          this.$router.push({
            name: 'interTransferResult',
            params: _params
          })
        }
      }).catch(e => {
        this.$router.push({
          name: 'interTransferResult',
          params: _params
        })
      }
      )
    },
    onBack (data) {
      this.$router.push({
        name: 'interTransferPre',
        params: this.formModel
      })
    }
  },
  created () {
    this.formModel = this.$route.params
  }
}
</script>
<style scoped>
  .form-box{
    width :1120px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  }
</style>
