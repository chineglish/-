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
// import { httpPost } from '@/api/sys/http'
// import { Sign } from '@/assets/js/SignMsg'
import util from '@/libs/util'
// import { notification_Type } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'certificateConfirmfer',
  data () {
    return {
      transTime: '',
      // data: ['企业管理', '证书管理', '缴费确认']],
      // 以下为动态数据
      formConfigJson: {
        formWidth: '100%',
        formItems: [
          {
            title: '证书缴费',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '缴费账号',
                'type': 'text',
                'key': 'payerAcNo'
              },
              {
                'disabled': true,
                'label': '账户名称',
                'type': 'text',
                'key': 'payerAcName'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '操作员号',
                'key': 'feesUserId'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '缴费金额',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '证书编号',
                'key': 'payCertNo'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '摘要',
                'key': 'fundUsage'
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
    // if (this.$route.params) {
    //   Object.assign(this.formModel, this.$route.params)
    // }
  }
}
</script>

<style  scoped>
</style>
