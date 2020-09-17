<template>
  <d2-container>
    <div class="form-box">
      <m-steps :data="stepData"></m-steps>
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @returnres="returnres"
        @submit="onSubmit">
      </m-new-form>
    </div>
  </d2-container>
</template>

<script>
import { httpPost } from '../../api/sys/http'

export default {
  name: 'twoErification',
  data () {
    return {
      stepData: {
        stepsActive: 1,
        stepsData: ['录入信息', '验证信息', '上传文件', '完成加解密']
      },
      formModel: {
        msgCode: '',
        ctMobilePhone: '',
        telephone: '',
        contNo: '',
        codeFlag: ''
      },
      // breadcrunb: ['柜面', '柜面批量代收付业务加密'],
      // 以下为动态数据
      formConfigJson: {
        rules: {
          msgCode: [{ required: true, message: '验证码', trigger: 'change' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '验证码',
                'type': 'input',
                'key': 'msgCode'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'returnres' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: ['保密承诺：我行郑重声明：您所提交的任何信息、资料，仅供申请审核时']
    }
  },
  methods: {
    onSubmit (data) {
      let params = {
        msgCode: data.msgCode,
        telPhone: data.ctMobilePhone
      }
      httpPost('/eweb-transfer.SalaryFilePhoneInfo.do', params).then(res => {
        this.$router.push({
          name: 'ThreeUpload',
          params: {
            telPhone: data.ctMobilePhone,
            contNo: data.contNo,
            telephone: data.telephone
          }
        })
      }).catch(e => {
        console.error(e)
      })
    },
    returnres () {
      this.$router.push({
        name: 'oneEntry',
        params: {
          ctMobilePhone: this.$route.params.ctMobilePhone,
          contNo: this.$route.params.contNo
        }
      })
    }
  },
  created () {
    if (this.$route.params.telPhone) {
      this.formModel.ctMobilePhone = this.$route.params.telPhone
    }
    this.formModel.ctMobilePhone = this.$route.params.ctMobilePhone
    this.formModel.telephone = this.$route.params.telephone
    // this.formModel.codeFlag = this.$route.params.codeFlag
    this.formModel.contNo = this.$route.params.contNo
  }
}
</script>

<style  scoped>
    .form-box{
        width :1120px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    }
</style>
