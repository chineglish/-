<template>
  <div class="form-box">
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
      :btnData="btnData"
      @onBack="onBack">
    </m-new-form>
  </div>
</template>
<script>
import { operator_state } from '@/assets/js/entity.js'
import util from '@/libs/util'
export default {
  name: 'logInAndLogOut',
  data () {
    return {
      formModel: {
        transTime: '',
        jnlNo: '',
        prdName: '',
        userName: '',
        jnlState: '',
        returnMsg: ''
      },
      titleData: ['企业管理台', '网银日志查询', '登录/登出'],
      formConfigJson: {
        formWidth: '100%',
        formItems: [
          {
            title: '登录/登出',
            group: [
              {
                'disabled': true,
                'label': '交易时间',
                'type': 'text',
                'key': 'transTime'
              },
              {
                'disabled': true,
                'label': '交易流水号',
                'type': 'text',
                'key': 'jnlNo'
              },
              {
                'disabled': true,
                'label': '业务类型',
                'type': 'text',
                'key': 'prdName'
              },
              {
                'disabled': true,
                'label': '操作员',
                'type': 'text',
                'key': 'userName'
              },
              {
                'disabled': true,
                'label': '操作状态',
                'type': 'text',
                'key': 'jnlState',
                formatter: (key, value) => util.handleEnums(operator_state, value)
              },
              {
                'disabled': true,
                'label': 'IP地址',
                'type': 'text',
                'key': 'ip'
              },
              {
                'disabled': true,
                'label': 'MAC地址',
                'type': 'text',
                'key': 'mac'
              },
              {
                'disabled': true,
                'label': '失败原因',
                'type': 'text',
                'key': 'returnMsg'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'onBack' }
      ]
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'onlineBankingLog',
        params: this.$route.params
      })
    }
  },
  created () {
    this.formModel.transTime = this.$route.params.formModel.transTime
    this.formModel.jnlNo = this.$route.params.formModel.jnlNo
    this.formModel.prdName = this.$route.params.formModel.prdName
    this.formModel.userName = this.$route.params.formModel.userName
    this.formModel.returnMsg = this.$route.params.formModel.returnMsg
    this.formModel.jnlState = this.$route.params.formModel.jnlState
    this.formModel.ip = this.$route.params.formModel.ip
    this.formModel.mac = this.$route.params.formModel.mac
  }
}
</script>

<style scoped>
  .form-box{
    width :1120px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  }
</style>
