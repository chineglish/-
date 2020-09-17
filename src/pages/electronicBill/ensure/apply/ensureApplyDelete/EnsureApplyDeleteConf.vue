<template>
    <div>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @submit="submit"
                    @goBack="goBack"
            >
            </m-new-form>
        </div>
    </div>
</template>
<script>
/**
     *@name: 删除保证信息-确认
     */
export default {
  name: 'EnsureApplyDeleteConf',
  data () {
    return {
      titleData: ['电子商业汇票', '保证', '提示保证申请', '删除保证信息'],
      formModel: {},
      formConfigJson: {
        rules: {},
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '票据号码',
                'type': 'text',
                'key': 'ticketNum'
              },
              {
                'disabled': true,
                'label': '保证申请日期',
                'type': 'text',
                'key': 'applyDate'
              }
            ]
          },
          {
            title: '被保证人信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '被保证人客户名称',
                'type': 'text',
                'key': 'assuredName'
              },
              {
                'disabled': true,
                'label': '被保证人账号',
                'type': 'text',
                'key': 'assuredOrganizationCode'
              }
            ]
          },
          {
            title: '保证人信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '保证人名称',
                'type': 'text',
                'key': 'assurerName'
              },
              {
                'disabled': true,
                'label': '保证人账号',
                'type': 'text',
                'key': 'assurerAcc'
              },
              {
                'disabled': true,
                'label': '保证人行号',
                'type': 'text',
                'key': 'assurerBank'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'goBack' }
      ]
    }
  },
  methods: {
    submit (params) {
      let newDate = new Date()
      this.$router.push({
        name: 'EnsureApplyDeleteRes',
        params: {
          formModel: {
            accountNum: params.ticketNum,
            amount: '1551',
            tradeDate: newDate.getFullYear() + '-' + newDate.getMonth() + '-' + newDate.getDate(),
            tradeTime: newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds()
          },
          _JnlStatus: '1'
        }
      })
    },
    goBack () {
      this.$router.push({
        name: 'EnsureApplyQueryDetail'
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
    } else {
      this.goBack()
    }
  }
}
</script>

<style scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
</style>
