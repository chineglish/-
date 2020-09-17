<template>
    <d2-container>
        <m-breadcrumb :data="data"></m-breadcrumb>
        <m-new-form
                :componentJson="formConfigJson"
                :formModel="formModel"
                :btnData="btnData"
                :isDisabled="doSubmit"
                @submit="onSubmit"
                @back="onBack"
        >
        </m-new-form>
    </d2-container>
</template>
<script>
import axios from 'axios'
export default {
  name: 'interTransferConf',
  data () {
    return {
      uploadAttachment: [],
      formModel: { payerAccNo: '', payerAmt: '', payeeAccNo: '', payeeName: '', payeeBankNo: '', transfType: '', transferRemark: '', smsMessage: '', smsMessageNum: '', savepayeeInfo: '' },
      data: ['转账交易确认'],
      // 以下为动态数据
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            labelWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '付款人账号',
                'type': 'text',
                'changeEventName': 'changePayerAccNo',
                'options': [{ 'value': '45454', 'key': '0' }, { 'value': '545545', 'key': '1' }],
                'key': 'payerAccNo'
              },
              {
                'disabled': false,
                'label': '账户余额',
                'type': 'text',
                textType: 'shy',
                'key': 'accountBalance'
              },
              { 'disabled': false, 'label': '上传附件', 'type': 'text', 'key': 'uploadAttachment', 'action': 'https://jsonplaceholder.typicode.com/posts/' },
              { 'disabled': false, 'label': '转账金额', 'type': 'text', 'key': 'payerAmt' },
              {
                'disabled': false,
                'label': '转账方式',
                'type': 'text',
                'options': [ { 'value': '实时', 'key': '0' }, { 'value': '普通', 'key': '1' }, { 'value': '次日', 'key': '2' } ],
                'key': 'transfType'
              },
              {
                'disabled': false,
                'label': '转账备注',
                'type': 'text',
                'key': 'transferRemark'
              },
              {
                'disabled': false,
                'label': '收款人账号',
                'type': 'text',
                'key': 'payeeAccNo'
              },
              {
                'disabled': false,
                'label': '收款人姓名',
                'type': 'text',
                'key': 'payeeName'
              },
              {
                'disabled': false,
                'label': '收款人银行编号',
                'type': 'text',
                'key': 'payeeBankNo'
              },
              {
                'disabled': false,
                'label': '是否短信通知',
                'type': 'text',
                'options': [{ 'value': '否', 'key': '0' }, { 'value': '是', 'key': '1' }],
                'key': 'smsMessage'
              },
              {
                'disabled': false,
                'label': '短信通知手机号',
                'type': 'text',
                'key': 'smsMessageNum'
              },
              { 'disabled': false, 'label': '是否保存常用收款人信息', 'type': 'text', 'options': [ { 'value': '否', 'key': '0' }, { 'value': '是', 'key': '1' } ], 'key': 'savepayeeInfo' }
            ]
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
          _params.JnlStatus = '0'
          this.$router.push({
            name: 'interTransferResult',
            params: _params
          })
        } else {
          _params.JnlStatus = '1'
          this.$router.push({
            name: 'interTransferResult',
            params: _params
          })
        }
      }).catch(e => {
        // _params.JnlStatus = '1'
        // this.$router.push({
        //   name: 'interTransferResult',
        //   params: _params
        // })
      }
      )
    },
    onBack (data) {
      this.formModel.uploadAttachment = this.uploadAttachment
      this.$router.push({
        name: 'testNewFormInput',
        params: this.formModel
      })
    }
  },
  created () {
    this.formModel = this.$route.params
    this.uploadAttachment = this.formModel.uploadAttachment
    this.formModel.uploadAttachment = this.formModel.uploadAttachment[0].url
  }
}
</script>
