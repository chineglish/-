<template>
  <div>
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      :msgs="msgs"
      @wechatNoInput="wechatNoInput"
      @emailInput="emailInput"
      @qqInput="qqInput"
      @telNoInput="telNoInput"
      @qqKeydown="qqKeydown"
      @submit="onSubmit">
    </m-new-form>
  </div>
</template>
<script>
import util from '@/libs/util'

export default {
  name: 'leave-message-pre',
  data () {
    return {
      remark: '',
      formModel: {
        userName: '',
        telNo: '',
        email: '',
        qqNo: '',
        wechatNo: '',
        msgTitle: '',
        msgType: '',
        msgContent: ''
      },
      breadcrumb: ['企业管理台', '留言服务'],
      formConfigJson: {
        stepsActive: 0,
        rules: {
          telNo: [{ required: true, message: '请输入手机号码', trigger: 'submit' }, { validator: (rule, value, callback) => util.verifyMobile(value, callback), trigger: 'submit' }],
          email: [{ required: false, message: '请输入电子信箱', trigger: 'submit' }, { validator: (rule, value, callback) => util.verifyEmail(value, callback), trigger: 'submit' }],
          qqNo: [{ required: false, message: '请输入qq号码', trigger: 'submit' }, { validator: (rule, value, callback) => {
            if (value && (value.length < 5 || value.length > 10)) {
              callback(new Error('QQ号长度不符合标准'))
            } else {
              callback()
            }
          },
          trigger: 'submit' }],
          msgTitle: [{ required: true, message: '请输入留言主题', trigger: 'submit' }],
          msgType: [{ required: true, message: '请勾选留言类型', trigger: 'submit' }],
          msgContent: [{ required: true, message: '请输入留言内容', trigger: 'submit' }],
          wechatNo: [{ required: false, message: '请输入微信号', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '留言人',
                'type': 'text',
                'key': 'cifName'
              },
              {
                'disabled': false,
                'label': '手机号码',
                'type': 'input',
                keydownEventName: 'qqKeydown',
                inputEventName: 'telNoInput',
                'key': 'telNo'
              },
              {
                'disabled': false,
                'label': '电子信箱',
                'type': 'input',
                inputEventName: 'emailInput',
                'key': 'email'
              },
              {
                'disabled': false,
                'label': 'QQ号码',
                'type': 'input',
                maxlength: '10',
                keydownEventName: 'qqKeydown',
                inputEventName: 'qqInput',
                'key': 'qqNo'
              },
              {
                'disabled': false,
                'label': '微信',
                'type': 'input',
                maxlength: '32',
                inputEventName: 'wechatNoInput',
                'key': 'wechatNo'
              },
              {
                'disabled': false,
                'label': '留言主题',
                'type': 'input',
                maxlength: '10',
                'key': 'msgTitle'
              },
              {
                'disabled': false,
                'formWidth': '100%',
                'label': '留言类型',
                'type': 'radio',
                'key': 'msgType',
                'rightSlotName': 'radioRemark',
                'options': [
                  { 'value': '建议', 'key': '1' },
                  { 'value': '表扬', 'key': '2' },
                  { 'value': '投诉', 'key': '3' },
                  { 'value': '预约', 'key': '4' }
                ]
              },
              {
                'disabled': false,
                'formWidth': '100%',
                'label': '留言内容',
                'type': 'textarea',
                'len': true,
                'rows': 3,
                'maxlength': 200,
                'key': 'msgContent'
              }
            ]
          }
        ]
      },
      btnData: [{ btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }],
      msgs: []
    }
  },
  methods: {
    onSubmit (params) {
      // httpPost('/eweb-setting.MessageApplicationConfirm.do', params).then(res => {
      this.$router.push({ name: 'leaveMessageConf', params })
      // })
    },
    qqKeydown (e) {
      const keyCode = e.keyCode
      if (
        !util.isBackspace(keyCode) &&
        !util.isNumber(keyCode) &&
        !util.isPinYin(keyCode)
      ) {
        // 其他按键
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    },
    qqInput (form) {
      form.qqNo = util.limitInputInt(form.qqNo)
    },
    telNoInput (form) {
      form.telNo = util.limitInputInt(form.telNo)
    },
    emailInput (form) {
      form.email = form.email.replace(/[^A-Za-z\d@.]/g, '')
    },
    wechatNoInput (form) {
      form.wechatNo = form.wechatNo.replace(/[^A-Za-z\d]/g, '')
    }
  },
  created () {
    this.formModel.cifName = this.getUser().cif.cifName
  }
}
</script>

<style lang="scss">
.leave-message-pre {
  .el-textarea__inner {
    height: auto!important;
    margin: 10px 0
  }
}
</style>
