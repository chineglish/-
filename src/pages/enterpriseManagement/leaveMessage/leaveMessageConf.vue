<template>
    <d2-container class="leave-message-conf">
        <m-breadcrumb :data="breadcrumb"></m-breadcrumb>
        <m-new-form :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @submit="onSubmit"
                    @back="onBack">
<!--            <el-input slot="radioRemark" disabled v-model="remark" style="margin-left: 12px; width: 350px;"></el-input>-->
        </m-new-form>
    </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'

export default {
  name: 'leave-message-conf',
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
        stepsActive: 1,
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
                'disabled': true,
                'label': '手机号码',
                'type': 'text',
                'key': 'telNo'
              },
              {
                'disabled': true,
                'label': '电子信箱',
                'type': 'text',
                'key': 'email'
              },
              {
                'disabled': true,
                'label': 'QQ号码',
                'type': 'text',
                'key': 'qqNo'
              },
              {
                'disabled': false,
                'label': '微信',
                'type': 'text',
                'key': 'wechatNo'
              },
              {
                'disabled': true,
                'label': '留言主题',
                'type': 'text',
                'key': 'msgTitle'
              },
              {
                'disabled': true,
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
                'disabled': true,
                'formWidth': '100%',
                'labelWidth': '200px',
                'label': '留言内容',
                'type': 'textarea',
                'key': 'msgContent'
              }
            ]
          }
        ]
      },
      btnData: [{ btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }]
    }
  },
  methods: {
    onSubmit (params) {
      // TODO 新增留言接口
      // params._dataMapKey = this.$route.params.res._dataMapKey
      httpPost('eweb-common.GenToken.do').then(token => {
        params._tokenName = token._tokenName
        httpPost('eweb-setting.MessageApplication.do', params).then(res => {
          this.$router.push({ name: 'leaveMessageRes', params: { res } })
        })
      })
    },
    onBack () {
      this.$router.push({ name: 'leaveMessagePre', params: this.formModel })
    }
  },
  created () {
    this.formModel = this.$route.params
  }
}
</script>
