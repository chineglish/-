<template>
  <d2-container>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
export default {
  name: 'resultPage',
  data () {
    return {
      formModel: {},
      routeParams: {},
      btnData: [
        { btnText: '详情信息', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '0',
        _RejMessage: '',
        itemWidth: '50%',
        labelWidth: '50%',
        valueWidth: '50%',
        resData: {
          title: '转账申请已提交，请等待审核员审查！',
          group: [
            { label: '付款人账号', key: 'payerAccNo' },
            { label: '转账金额', key: 'payerAmt' },
            { label: '收款人账号', key: 'payeeAccNo' },
            { label: '收款人姓名', key: 'payeeName' },
            { label: '收款人银行编号', key: 'payeeBankNo' },
            { label: '转账方式', key: 'transfType' },
            { label: '转账备注', key: 'transferRemark' },
            { label: '是否短信通知', key: 'smsMessage' },
            { label: '短信通知手机号（当选择短信通知时必输）', key: 'smsMessageNum' },
            { label: '是否保存常用收款人信息', key: 'savepayeeInfo' }]
        }
      },
      transTypeList: {
        '01': '实时',
        '02': '普通',
        '03': '次日'
      },
      isTrue: {
        '0': '否',
        '1': '是'
      }
    }
  },
  methods: {
    _formatList (data) {
      for (let key in data) {
        if (key === 'transfType') {
          data[key] = this.transTypeList[data[key]]
        } else if (key === 'smsMessage' || key === 'savepayeeInfo') {
          data[key] = this.isTrue[data[key]]
        }
      }
      this.formModel = data
    },
    onSubmit () {},
    onBack (data) {
      this.$router.push({
        name: 'interTransferConf',
        params: this.routeParams
      })
    }
  },
  created () {
    this.routeParams = this.$route.params
    if (this.routeParams.JnlStatus) {
      this.data._JnlStatus = this.routeParams.JnlStatus
    }
    this._formatList({ ...this.routeParams })
  }
}
</script>
