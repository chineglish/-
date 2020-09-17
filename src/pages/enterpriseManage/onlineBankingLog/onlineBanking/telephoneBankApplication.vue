<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
    ></m-new-form>
  </div>
</template>

<script>
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'telephoneBankApplication',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '电话银行开通',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '开通账号',
                'key': 'accNo'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
