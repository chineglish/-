<template>
  <d2-container>
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
      >
    </m-new-form>
  </d2-container>
</template>
<script>
export default {
  name: 'slotwait',
  data () {
    return {
      formConfigJson: {
        formWidth: '100%',
        rules: {
          idea: [{ required: true, message: '请选择审核意见', trigger: 'submit' }],
          refuseReason: [{ required: true, message: '请输入拒绝原因', trigger: 'submit' }]
        },
        formItems: [
          {
            group: [
              {
                'disabled': false,
                'label': '审核意见',
                'type': 'radio',
                'options': [{ 'value': '同意', 'key': '0' }, { 'value': '拒绝', 'key': '1' }],
                'key': 'idea'
              },
              {
                'disabled': false,
                'label': '拒绝原因',
                'type': 'input',
                'key': 'refuseReason'
              }
            ]
          }
        ]
      },
      routeParams: {}
    }
  },
  methods: {
    onSubmit () {},
    onBack (data) {
      this.$router.push({
        name: 'innerDraw',
        params: this.routeParams
      })
    }
  },
  created () {}
}
</script>

<style>
  d2-container{
    margin: 0 auto;
    padding: 0;
  }
</style>
