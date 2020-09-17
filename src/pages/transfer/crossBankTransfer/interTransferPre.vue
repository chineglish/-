<template>
    <d2-container>
        <m-breadcrumb :data="data"></m-breadcrumb>
        <div>
            <m-form :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    :msgs="msgs"
                    @selectCity="selectCity"
                    @submit="onSubmit">
                <div slot="bankBanlens">
                    51515155
                </div>
                <div slot="testBlank">
                    151515151
                </div>
            </m-form>
        </div>
    </d2-container>
</template>
<script>
export default {
  name: 'InterTransferPre',
  data () {
    return {
      formModel: {
        payerAccNo: '',
        payerAmt: '0',
        payeeAccNo: '0',
        payeeName: '0',
        payeeBankNo: '0',
        transfType: '0',
        transferRemark: '0',
        smsMessage: '0',
        smsMessageNum: '0',
        savepayeeInfo: '0',
        startDate: '',
        endDate: '',
        testBlank: '',
        city: '',
        province: ''
      },
      data: ['跨行转账'],
      // 以下为动态数据
      formConfigJson: {
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
          uploadAttachment: [ { required: false, message: '上传附件', trigger: 'change' } ],
          selectCity: [{ required: true, message: '选择城市', trigger: 'change' }]
        },
        formItems: [{
          title: '付款人信息',
          // formWidth: '100%',
          group: [{
            'disabled': false,
            'label': '付款人账号',
            'type': 'select',
            'options': [{ 'value': '45454', 'key': '0' }, { 'value': '545545', 'key': '1' }],
            'slotName': 'bankBanlens',
            'key': 'payerAccNo'
          }, { 'disabled': false, 'label': '转账金额', 'type': 'input', 'key': 'payerAmt' }, {
            'disabled': false,
            'label': '转账方式',
            'type': 'select',
            'options': [ { 'value': '实时', 'key': '01' }, { 'value': '普通', 'key': '02' }, { 'value': '次日', 'key': '03' } ],
            'key': 'transfType'
          },
          { 'disabled': false, 'label': '测试空白组件', 'type': 'blank', 'slotName': 'testBlank', 'key': 'testBlank' },
          {
            'disabled': false,
            'label': '城市',
            'type': 'multipleSelection',
            'changeEventName': 'selectCity',
            'options': [
              {
                'key': 'province',
                'options': [{ 'value': '辽宁省', 'key': '0' }, { 'value': '广东省', 'key': '1' }]
              },
              {
                'key': 'city',
                'options': [{ 'value': '大连市', 'key': '0' }, { 'value': '沈阳市', 'key': '1' }]
              }
            ]
          },
          // {
          //   'disabled': false,
          //   'label': '城市',
          //   'type': 'selectCity',
          //   'options': [{ 'value': '辽宁省', 'key': '0', 'list': [{ 'value': '大连市', 'key': '0' }, { 'value': '沈阳市', 'key': '1' }] }, { 'value': '广东省', 'key': '1', 'list': [{ 'value': '深圳市', 'key': '0' }, { 'value': '广州市', 'key': '1' }] }],
          //   'key': 'selectCity'
          // },
          {
            'disabled': false,
            'label': '转账备注',
            'type': 'input',
            'key': 'transferRemark',
            'content': 'kjfbdffu',
            'style': 'background: #ffffff'
          },
          {
            'disabled': false,
            'label': '时间区间',
            type: 'dateArea',
            firstKey: 'startDate',
            secondKey: 'endDate'
          }
          ]
        }, {
          title: '收款人信息',
          group: [ {
            'disabled': false,
            'label': '收款人账号',
            'type': 'date',
            'dateType': 'daterange',
            'key': 'payeeAccNo'
          }, {
            'disabled': false,
            'label': '收款人姓名',
            'type': 'input',
            'key': 'payeeName'
          }, {
            'disabled': false,
            'label': '收款人银行编号',
            'type': 'input',
            'key': 'payeeBankNo'
          }]
        },
        {
          title: '通知信息',
          group: [
            {
              'disabled': false,
              'label': '是否短信通知',
              'type': 'radio',
              'options': [ { 'value': '否', 'key': '0' }, { 'value': '是', 'key': '1' } ],
              'key': 'smsMessage'
            },
            {
              'disabled': false,
              'label': '短信通知手机号',
              'type': 'input',
              'key': 'smsMessageNum'
            },
            { 'disabled': false, 'label': '是否保存常用收款人信息', 'type': 'radio', 'options': [ { 'value': '否', 'key': '0' }, { 'value': '是', 'key': '1' } ], 'key': 'savepayeeInfo' }]
        },
        {
          title: '上传附件',
          group: [
            { 'disabled': false, 'label': '上传附件', 'type': 'upload', 'key': 'uploadAttachment', 'action': 'https://jsonplaceholder.typicode.com/posts/' }]
        }]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: []
    }
  },
  methods: {
    onSubmit (params) {
      let _params = params
      this.$router.push({
        name: 'interTransferConf',
        params: _params
      })
    },
    selectCity (res) {
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
    }
  }
}
</script>
