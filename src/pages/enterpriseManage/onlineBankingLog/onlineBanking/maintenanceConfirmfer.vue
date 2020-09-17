<template>
  <div>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
        >
      </m-new-form>
    </div>
  </div>
</template>
<script>

// import { httpPost } from '../../../api/sys/http'
import { id_type } from '@/assets/js/entity'
import util from '@/libs/util'
// import _ from 'lodash'

export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'maintenanceConfirmfer',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '企业信息维护',
            group: [
            ]
          },
          {
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '详细地址',
                'type': 'text',
                'key': 'addr'
              },
              {
                'disabled': true,
                'label': '邮编',
                'type': 'text',
                'key': 'postCode'
              },
              {
                'disabled': true,
                'label': '联系人姓名',
                'type': 'text',
                'key': 'name'
              },
              {
                'disabled': true,
                'label': '联系人证件类型',
                'type': 'text',
                'key': 'idType',
                formatter: (key, value) => util.handleEnums(id_type, value)
              },
              {
                'disabled': true,
                'label': '联系人证件号码 ',
                'type': 'text',
                'key': 'idNo'
              },
              {
                'disabled': true,
                'label': '联系人电话',
                'type': 'text',
                'key': 'telePhone'
              },
              {
                'disabled': true,
                'label': '联系人手机 ',
                'type': 'text',
                'key': 'mobile'
              },
              {
                'disabled': true,
                'label': '联系人Email地址',
                'type': 'text',
                'key': 'email'
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
    // if (this.$route.params.formModel) {
    //   this.formModel = _.cloneDeepWith(this.$route.params.formModel)
    //   this.formModel.idType = util.handleEnums(id_type, this.$route.params.formModel.idType)
    // }
  }
}
</script>

<style scoped>
</style>
