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
import { id_type, gender_type, asFlag_Type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'opUpdateConffer',
  data () {
    return {
      // breadData: ['企业管理台', '操作员管理'],
      formConfigJson: {
        formItems: [
          {
            title: '操作员管理',
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
              },
              {
                'disabled': true,
                'label': '证件类型',
                'type': 'text',
                'key': 'idType',
                formatter: (key, value) => util.handleEnums(id_type, value)
              },
              {
                'disabled': true,
                'label': '证件号码',
                'type': 'text',
                'key': 'idNo'
              },
              {
                'disabled': true,
                'label': '性别',
                'type': 'text',
                'key': 'gender',
                formatter: (key, value) => util.handleEnums(gender_type, value)
              },
              {
                'disabled': true,
                'label': '手机号码',
                'type': 'text',
                'key': 'mobilephone'
              },
              {
                'disabled': true,
                'label': 'Email地址',
                'type': 'text',
                'key': 'email'
              },
              {
                'disabled': true,
                'label': '是否管理员',
                'type': 'text',
                'key': 'adminUser',
                formatter: (key, value) => util.handleEnums(asFlag_Type, value)
              },
              {
                'disabled': true,
                'label': '操作员角色',
                'type': 'text',
                'key': 'roleName'
              },
              {
                'disabled': true,
                'label': '业务开通',
                'type': 'text',
                'key': 'openFlag'
              },
              {
                'disabled': true,
                'label': '可操作账户',
                'type': 'text',
                'key': 'opaAccount'
              },
              {
                'disabled': true,
                'label': '企业授权账号',
                'type': 'text',
                'key': 'authorizedAcc'
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
    if (this.formModel.openFlag === true) {
      this.formModel.openFlag = '开通手机银行和企业网银'
    } else {
      this.formModel.openFlag = '开通企业网银'
    }
  }
}
</script>

<style scoped>
</style>
