<template>
  <d2-container>
    <div class="form-box">
      <m-steps :data="stepData"></m-steps>
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
        :btnData="btnData"
        @returnres="returnres"
        @onSubmit="onSubmit"
        @onSub="onSub">
      </m-new-form>
    </div>
  </d2-container>
</template>

<script>
import { httpPost } from '../../api/sys/http'

export default {
  name: 'ThreeUpload',
  data () {
    return {
      stepData: {
        stepsActive: 2,
        stepsData: ['录入信息', '验证信息', '上传文件', '完成加解密']
      },
      acLsit: [],
      data: [],
      formModel: {
        transType: '',
        uploadFile: []
      },
      formConfigJson: {
        rules: {
          transType: [{ required: true, message: '业务类型', trigger: 'change' }],
          uploadFile: [{ required: true, message: '请选择要上传的文件', trigger: 'change' }]
        },
        formItems: [{
          formWidth: '100%',
          labelWidth: '50%',
          group: [
            {
              label: '业务类型',
              key: 'transType',
              type: 'select',
              options: [
                { label: '开户业务', value: '0' },
                { label: '代收业务', value: '1' },
                { label: '代发业务', value: '2' }
              ],
              trans: { value: 'label', key: 'value' },
              changeEventName: ''
            },
            {
              'disabled': false,
              label: '上传附件',
              type: 'upload',
              key: 'uploadFile',
              fileType: ['txt', 'xls', 'xlsx', 'des3']
            }
          ]
        }]
      },
      btnData: [
        { btnText: '加密', class: 'm-submit-btn', clickEventName: 'onSubmit' },
        { btnText: '解密', class: 'm-submit-btn', clickEventName: 'onSub' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'returnres' }
      ]
    }
  },
  methods: {
    onSubmit (data) {
      console.log(222, data)

      let uploadData = new window.FormData()
      uploadData.append('telPhone', data.telephone)
      uploadData.append('contNo', data.contNo)
      uploadData.append('operateFlag', '0')
      uploadData.append('uploadFile', data.uploadFile[0])
      uploadData.append('transType', data.transType)
      httpPost('/eweb-transfer.SalaryFileFormat.do', uploadData).then(res => {
        if (data.transType != null && data.uploadFile != null) {
          this.$router.push({
            name: 'fourResult',
            params: {
              fileName: res.fileName,
              operateFlag: res.operateFlag
            }
          })
        }
      })
    },
    onSub (data) {
      let uploadData = new window.FormData()
      uploadData.append('telPhone', data.telephone)
      uploadData.append('contNo', data.contNo)
      uploadData.append('operateFlag', '1')
      uploadData.append('uploadFile', data.uploadFile[0])
      uploadData.append('transType', data.transType)
      httpPost('/eweb-transfer.SalaryFileJiemi.do', uploadData).then(res => {
        if (data.transType != null && data.uploadFile != null) {
          this.$router.push({
            name: 'fourResult',
            params: {
              fileName: res.fileName,
              operateFlag: res.operateFlag
            }
          })
        }
      })
    },
    returnres () {
      this.$router.push({
        name: 'twoErification',
        params: {
          telPhone: this.$route.params.telPhone,
          contNo: this.$route.params.contNo
        }
      })
    }
  },
  created () {
    this.formModel.telPhone = this.$route.params.telPhone
    this.formModel.contNo = this.$route.params.contNo
    this.formModel.telephone = this.$route.params.telephone
  }
}
</script>
