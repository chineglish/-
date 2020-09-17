<template>
    <div>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @submit="submit">
            </m-new-form>
        </div>
    </div>
</template>
<script>
/**
     *@name: 承兑应答-录入
     */
export default {
  name: 'AcceptanceReplyPre',
  data () {
    return {
      titleData: ['电子商业汇票', '承兑应答'],
      formModel: {
        theDay: '',
        accountNum: '',
        drawerName: '',
        beneficiaryName: '',
        payingBankName: '',
        ticketIssuingDay: '',
        facedate: ''
      },
      formConfigJson: {
        rules: {},
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '当日日期',
                'type': 'text',
                'key': 'theDay'
              },
              {
                'disabled': false,
                'label': '选择账户',
                'type': 'select',
                'options': [
                  { 'value': '1892948398439493/测试公司1', 'key': '1892948398439493' },
                  { 'value': '1934548398439673/测试公司2', 'key': '1934548398439673' }
                ],
                'key': 'accountNum'
              },
              {
                'disabled': false,
                'label': '出票人名称',
                'type': 'input',
                'key': 'drawerName'
              },
              {
                'disabled': false,
                'label': '收款人名称',
                'type': 'input',
                'key': 'beneficiaryName'
              },
              {
                'disabled': false,
                'label': '付款行名称',
                'type': 'input',
                'key': 'payingBankName'
              },
              {
                'disabled': false,
                'label': '出票日期',
                'type': 'input',
                'key': 'ticketIssuingDay'
              },
              {
                'disabled': false,
                'label': '票面到期日',
                'type': 'input',
                'key': 'facedate'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' }
      ]
    }
  },
  methods: {
    submit (params) {
      this.$router.push({
        name: 'AcceptanceReplyConf',
        params: { formModel: params }
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
    } else {
      let theDay = new Date()
      this.formModel.theDay = theDay.getFullYear() + '-' + theDay.getMonth() + '-' + theDay.getDate()
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
