<template>
    <d2-container>
      <a href="http://218.25.172.248:8088/1.txt" download="">1.txt</a>
      <m-breadcrumb :data="data"></m-breadcrumb>
      <div class="form-box" id="print">
          <m-new-form
            :componentJson="formConfigJson"
            :btnData="btnData"
            :formModel="formModel"
            :msgs="msgs"
            @changeDate="changeDate"
            @submit="onSubmit">
          </m-new-form>
      </div>
    </d2-container>
</template>
<script>
export default {
  name: 'TestNewFormInput',
  data () {
    return {
      formModel: {
        payerAccNo: '',
        payerAmt: '',
        payeeAccNo: '',
        payeeName: '',
        payeeBankNo: '',
        transfType: '',
        transferRemark: '',
        smsMessage: '1',
        smsMessageNum: '',
        savepayeeInfo: '1',
        accountBalance: '0',
        uploadAttachment: [],
        dateArea: {}
      },
      data: ['跨行转账'],
      // 以下为动态数据
      formConfigJson: {
        showRightCheck: true,
        stepsActive: 1,
        rules: {
          payerAccNo: [{ required: true, message: '付款人账号', trigger: 'change' }],
          payerAmt: [{ required: true, message: '转账金额', trigger: 'change' }],
          payeeAccNo: [{ required: true, message: '收款人账号', trigger: 'change' }],
          payeeName: [{ required: true, message: '收款人姓名', trigger: 'change' }],
          payeeBankNo: [{ required: true, message: '收款人银行编号', trigger: 'change' }],
          transfType: [{ required: true, message: '转账方式', trigger: 'change' }],
          transferRemark: [{ required: false, message: '转账备注', trigger: 'change' }],
          smsMessage: [{ required: true, message: '是否短信通知', trigger: 'change' }],
          smsMessageNum: [{ required: true, message: '短信通知手机号', trigger: 'change' }],
          savepayeeInfo: [{ required: true, message: '是否保存常用收款人信息', trigger: 'change' }],
          uploadAttachment: [{ required: false, message: '是否保存常用收款人信息', trigger: 'change' }],
          dateArea: [{ required: false, message: '是否保存常用收款人信息', trigger: 'change' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                type: 'dateArea',
                label: '查询日期',
                changeEventName: 'changeDate',
                dateType: 'quarter',
                valueFormat: 'yyyyMMdd',
                firstKey: 'startDate',
                secondKey: 'endDate'
              },
              {
                'disabled': false,
                'label': '付款人账号',
                'type': 'select',
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
              { 'disabled': false, 'label': '上传附件', 'type': 'upload', 'key': 'uploadAttachment', 'action': 'https://jsonplaceholder.typicode.com/posts/' },
              { 'disabled': false, 'label': '转账金额', 'type': 'input', 'key': 'payerAmt' },
              {
                'disabled': false,
                'label': '转账方式',
                'type': 'select',
                'options': [ { 'value': '实时', 'key': '0' }, { 'value': '普通', 'key': '1' }, { 'value': '次日', 'key': '2' } ],
                'key': 'transfType'
              },
              {
                'disabled': false,
                'label': '转账备注',
                'type': 'telePhone',
                'key': 'transferRemark'
              },
              {
                'disabled': false,
                'label': '收款人账号',
                'type': 'input',
                'key': 'payeeAccNo'
              },
              {
                'disabled': false,
                'label': '收款人姓名',
                'type': 'input',
                'key': 'payeeName'
              },
              {
                'disabled': false,
                'label': '收款人银行编号',
                'type': 'input',
                'key': 'payeeBankNo'
              },
              {
                'disabled': false,
                'label': '是否短信通知',
                'type': 'radio',
                'options': [{ 'value': '否', 'key': '0' }, { 'value': '是', 'key': '1' }],
                'key': 'smsMessage'
              },
              {
                'disabled': false,
                'label': '短信通知手机号',
                'type': 'input',
                'key': 'smsMessageNum'
              },
              { 'disabled': false, 'label': '是否保存常用收款人信息', 'type': 'radio', 'options': [ { 'value': '否', 'key': '0' }, { 'value': '是', 'key': '1' } ], 'key': 'savepayeeInfo' }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定',
          class: 'm-submit-btn',
          clickEventName: 'submit',
          printObj: {
            id: 'print'
          } },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: ['保密承诺：我行郑重声明：您所提交的任何信息、资料，仅供申请审核时']
    }
  },
  methods: {
    changeDate (params) {
      console.log(params)
    },
    onSubmit (params) {
      let _params = params
      this.$router.push({
        name: 'testNewFormConf',
        params: _params
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

<style  scoped>
    .form-box{
        width :1120px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    }
</style>
