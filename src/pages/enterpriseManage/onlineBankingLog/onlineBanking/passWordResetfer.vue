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

export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'passWordResetfer',
  data () {
    return {
      // data: [密码重置],
      formConfigJson: {
        formItems: [
          {
            title: '操作员密码重置',
            formWidth: '100%',
            group: [
              // {
              //   'disable': 'false',
              //   'type': 'text',
              //   'label': '渠道类型',
              //   'key': 'mchannelId',
              //   formatter: (row, column, cellValue, index) => cellValue ? '系统默认角色' : '企业网银'
              // },
              {
                'disable': 'false',
                'type': 'text',
                'label': '重置的账号',
                'key': 'userId'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '操作员姓名',
                'key': 'userName'
              },
              {
                'disable': 'false',
                'type': 'text',
                'label': '手机号',
                'key': 'mobilephone'
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
  }
}
</script>
<style  scoped>
</style>
