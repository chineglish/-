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
     *@name: 承兑应答-确认
     */
export default {
  name: 'AcceptanceReplyConf',
  data () {
    return {
      titleData: ['电子商业汇票', '承兑应答'],
      formModel: {
        ticketType: '',
        ticketIssuingDay: '',
        facedate: '',
        faceValue: '',
        drawerName: '',
        beneficiaryName: '',
        accountNum: '',
        customerAccount: ''
      },
      formConfigJson: {
        rules: {},
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'text',
                'key': 'ticketType'
              },
              {
                'disabled': false,
                'label': '出票日期',
                'type': 'text',
                'key': 'ticketIssuingDay'
              },
              {
                'disabled': false,
                'label': '票面到期日',
                'type': 'text',
                'key': 'facedate'
              },
              {
                'disabled': false,
                'label': '票面金额',
                'type': 'text',
                'key': 'faceValue'
              },
              {
                'disabled': false,
                'label': '票面出票人名称',
                'type': 'text',
                'key': 'drawerName'
              },
              {
                'disabled': false,
                'label': '票面收款人名称',
                'type': 'text',
                'key': 'beneficiaryName'
              },
              {
                'disabled': false,
                'label': '票面承兑行行号',
                'type': 'text',
                'key': 'accountNum'
              }
            ]
          },
          {
            title: '申请人信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '客户账号',
                'type': 'text',
                'key': 'customerAccount'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '取消', class: 'm-cancel-btn', clickEventName: 'goBack' }]
    }
  },
  methods: {
    submit (params) {
      let newDate = new Date()
      this.$router.push({
        name: 'AcceptanceReplyRes',
        params: { formModel: {
          accountNum: params.accountNum,
          amount: params.faceValue,
          tradeDate: newDate.getFullYear() + '-' + newDate.getMonth() + '-' + newDate.getDate(),
          tradeTime: newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds()
        },
        _JnlStatus: '1' }
      })
    },
    goBack () {
      this.$router.push({
        name: 'AcceptanceReplyPre',
        params: { formModel: this.$route.params.formModel }
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      this.formModel.ticketType = '银票'
      this.formModel.faceValue = '1,500.00'
      this.formModel.customerAccount = this.getUser().Cif.cifSeq
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
