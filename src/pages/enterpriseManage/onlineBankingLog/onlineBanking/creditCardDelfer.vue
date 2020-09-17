<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel">
    </m-new-form>
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
  name: 'creditCardDelfer',
  data () {
    return {
      // data: [信用卡解挂],
      formConfigJson: {
        formItems: [
          {
            title: '信用卡解卦',
            formWidth: '100%',
            group: [
              {
                'disable': 'false',
                'type': 'text',
                'label': '信用卡账号',
                'key': 'acNo'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '客户号',
                'key': 'cifNo'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
  },
  created () {
    // this.formModel = this.$route.params.formModel
  }
}
</script>
<style  scoped>
</style>
