<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form ref="mNewForm"
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              :msgs="msgs"
              @submit="submit">
      </m-new-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'elecReceiptCheck',
  data () {
    return {
      breadData: ['账户管理', '电子回单验证'],
      formModel: {
        eleReceiptTime: '',
        verifyCode: ''
      },
      formConfigJson: {
        rules: {
          eleReceiptTime: [{ required: true, message: '查询日期不能为空', trigger: 'change' }],
          verifyCode: [{ required: true, message: '回单校验码不能为空', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '回单校验码',
                'type': 'input',
                'key': 'verifyCode'
              },
              {
                'disabled': false,
                'label': '查询日期',
                'type': 'date',
                'key': 'eleReceiptTime'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '回单校验', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      msgs: []
    }
  },
  methods: {
    submit () {
      this.$router.push('/elecReceiptCheckResult')
    }
  },
  created () {}
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
