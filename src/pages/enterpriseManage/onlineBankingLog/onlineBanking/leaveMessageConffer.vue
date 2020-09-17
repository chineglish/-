<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel">
    </m-new-form>
  </div>
</template>

<script>
// import util from '@/libs/util'

export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'leaveMessageConffer',
  data () {
    return {
      // data: ['理财服务', '理财产品', '产品购买确认']
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '留言人',
                'type': 'text',
                'key': 'cifName'
              },
              {
                'disabled': true,
                'label': '手机号码',
                'type': 'text',
                'key': 'telNo'
              },
              {
                'disabled': true,
                'label': '电子信箱',
                'type': 'text',
                'key': 'email'
              },
              {
                'disabled': true,
                'label': 'QQ号码',
                'type': 'text',
                'key': 'qqNo'
              },
              {
                'disabled': false,
                'label': '微信',
                'type': 'text',
                'key': 'wechatNo'
              },
              {
                'disabled': true,
                'label': '留言主题',
                'type': 'text',
                'key': 'msgTitle'
              },
              {
                'disabled': true,
                'label': '留言类型',
                'type': 'radio',
                'key': 'msgType',
                'options': [
                  { 'value': '建议', 'key': '1' },
                  { 'value': '表扬', 'key': '2' },
                  { 'value': '投诉', 'key': '3' },
                  { 'value': '预约', 'key': '4' }
                ]
              },
              {
                'disabled': true,
                'formWidth': '100%',
                'labelWidth': '200px',
                'label': '留言内容',
                'type': 'textarea',
                'key': 'msgContent'
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
