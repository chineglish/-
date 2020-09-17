<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
      >
    </m-new-form>
  </div>
</template>

<script type="text/javascript">
// import { httpPost } from '../../../api/sys/http'
import { cert_state } from '@/assets/js/entity'
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
  name: 'certificateUpdatefer',
  data: function () {
    return {
      formConfigJson: {
        formWidth: '100%',
        formItems: [
          {
            title: '证书缴费',
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
                'type': 'text',
                'label': 'USBKeyID',
                'key': 'keyId'
              },
              // {
              //   'disabled': true,
              //   'type': 'text',
              //   'label': '起始日期',
              //   'key': 'amount',
              //   formatter: (key, value) => util.formatCurrency(value)
              // },
              // {
              //   'disabled': true,
              //   'type': 'text',
              //   'label': '到期日期',
              //   'key': 'expireDate'
              // },
              {
                'disabled': true,
                'type': 'text',
                'label': '证书状态',
                'key': 'certState',
                formatter: (key, value) => {
                  const target = cert_state.find(item => item.value === value)
                  return target ? target.label : '未知'
                }
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
