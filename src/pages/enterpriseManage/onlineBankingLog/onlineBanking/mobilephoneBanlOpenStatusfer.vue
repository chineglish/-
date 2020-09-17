<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
      >
    </m-new-form>
  </div>
</template>
<script>
// import { httpPost } from '../../../api/sys/http'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'mobilephoneBanlOpenStatusfer',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            title: '手机银行开通',
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '操作结果',
                'type': 'text',
                'key': 'mchannel',
                formatter: (key, value) => {
                  return value === 'EMBS' ? '成功' : '失败'
                }
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
