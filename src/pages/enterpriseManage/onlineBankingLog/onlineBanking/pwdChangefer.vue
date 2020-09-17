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
  name: 'pwdChangefer',
  data () {
    return {
      // breadData: ['企业管理台', '操作员管理'],
      formConfigJson: {
        formItems: [
          {
            title: '操作员密码修改',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '操作员号',
                'type': 'text',
                'key': 'userId'
              },
              {
                'disabled': true,
                'label': '操作员姓名',
                'type': 'text',
                'key': 'userName'
              }
              // {
              //   'disabled': true,
              //   'label': '证件类型',
              //   'type': 'text',
              //   'key': 'idType',
              //   formatter: (key, value) => util.handleEnums(id_type, value)
              // },
              // {
              //   'disabled': true,
              //   'label': '证件号码',
              //   'type': 'text',
              //   'key': 'idNo'
              // },
              // {
              //   'disabled': true,
              //   'label': '性别',
              //   'type': 'text',
              //   'key': 'gender',
              //   formatter: (key, value) => util.handleEnums(gender_type, value)
              // },
              // {
              //   'disabled': true,
              //   'label': '手机号码',
              //   'type': 'text',
              //   'key': 'mobilephone'
              // },
              // {
              //   'disabled': true,
              //   'label': 'Email地址',
              //   'type': 'text',
              //   'key': 'email'
              // }
            ]
          }
        ]
      }
    }
  },
  created () {
    this.formModel.userId = this.formModel.commonRequestHead.userId
    this.formModel.userName = this.formModel.commonRequestHead.userName
  }
}
</script>
