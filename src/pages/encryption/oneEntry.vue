<template>
  <d2-container>
      <m-steps :data="stepData"></m-steps>
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
        :btnData="btnData"
        @submit="onSubmit">
        <div slot="imgCode" class="verification-code">
          <el-input class="verification-code-input" v-model="formModel.imgToken" @change="val => formModel.imgToken = val" placeholder="请输入验证码" clearable>
          </el-input>
          <span @click="getTokenImg" class="verification-code-img" >
            <img :src="imgPath">
          </span>
        </div>
      </m-new-form>
      <div class="template-donload">
        <span>柜面批量代收代付业务excel模板：</span>
        <a href="http://www.bankofdl.com/netbank/download/柜面批量代收代付业务模板.xls" download="柜面批量代收代付业务模板.xls">柜面批量代收代付业务模板</a>、
        <a href="http://www.bankofdl.com/netbank/download/柜面批量开户业务模板.xls" download="柜面批量开户业务模板.xls">柜面批量开户业务模板</a>
        <!-- <a href="http://www.bankofdl.com/netbank/download/关于柜面批量业务来盘文件的编辑说明.doc" download="关于柜面批量业务来盘文件的编辑说明.doc">关于柜面批量业务来盘文件的编辑说明.doc</a> -->
      </div>
      <m-hint-box :msgs="msgs"></m-hint-box>
  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'

export default {
  name: 'oneEntry',
  data () {
    return {
      stepData: {
        stepsActive: 0,
        stepsData: ['录入信息', '验证信息', '上传文件', '完成加解密']
      },
      msgs: ['1.请您不要在网吧等公共场所使用本系统。', '2.如果您在网上银行的使用过程中遇到任何问题，请致电我行客户服务中心4006640099。'],
      imgPath: '',
      acLsit: [],
      data: [],
      formModel: {
        contNo: '',
        ctMobilePhone: '',
        imgToken: ''
      },
      formConfigJson: {
        rules: {
          contNo: [{ required: true, message: '合同号', trigger: 'change' }],
          ctMobilePhone: [{ required: true, message: '手机号', trigger: 'change' }]
        },
        formItems: [{
          formWidth: '100%',
          labelWidth: '50%',
          group: [
            {
              label: '合同号',
              type: 'input',
              key: 'contNo',
              value: ''
            },
            {
              label: '签约手机号',
              type: 'input',
              key: 'ctMobilePhone',
              value: ''
            },
            {
              label: '验证码',
              type: 'blank',
              blankSlotName: 'imgCode'
            }
          ]
        }]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  methods: {
    getTokenImg () {
      httpPost('eweb-common.GenTokenImg.do').then(res => {
        this.imgPath = 'data:image/jpeg;base64,' + res._vTokenName
      })
    },
    onSubmit (data) {
      let params = {
        contNo: data.contNo,
        ctMobilePhone: data.ctMobilePhone,
        _vTokenName: this.imgToken
      }
      httpPost('/eweb-transfer.SalaryFileContNo.do', params).then(res => {
        this.$router.push({
          name: 'twoErification',
          params: {
            ctMobilePhone: data.ctMobilePhone,
            contNo: data.contNo,
            telephone: res.telPhone
          }
        })
      }).catch(e => {
        console.error(e)
      })
    }
  },
  created () {
    this.formModel.contNo = this.$route.params.contNo
    this.formModel.ctMobilePhone = this.$route.params.ctMobilePhone
    this.getTokenImg()
  }
}
</script>
<style lang="scss" scoped>
.template-donload{
  padding: 20px;
}
.verification-code {
  width: 62%;
  height: 40px;
  display: flex;

  .verification-code-input {
    width: 100%;
  }
  .verification-code-img {
    width: 10%;
    text-align: center;
    padding-top: 7px;
    padding-left: 20px;
    cursor: pointer;
  }
}
</style>
