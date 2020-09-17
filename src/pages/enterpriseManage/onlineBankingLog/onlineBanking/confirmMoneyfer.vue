<template>
  <div class="form-box">
    <m-new-form :componentJson="formConfigJson"
      :formModel="formModel"
      >
    </m-new-form>
  </div>
</template>
<script>

import util from '@/libs/util'
import { notification_Type } from '@/assets/js/entity'

export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'confirmMoneyfer',
  data () {
    return {
      transTime: '',
      // data: ['理财服务', '通知存款', '活期转通知存款'],
      formConfigJson: {
        formItems: [
          {
            title: '活期转通知存款',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '转出账号',
                'type': 'text',
                'key': 'payerAcNo'
              },
              { 'disabled': true,
                'label': '金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '通知类型',
                'type': 'text',
                'key': 'saveDate',
                formatter: (key, value) => util.handleEnums(notification_Type, value)
              },
              {
                'disabled': true,
                'label': '对账联系人',
                'type': 'text',
                'key': 'contactName'
              },
              {
                'disabled': true,
                'label': '联系人电话',
                'type': 'text',
                'key': 'contactTel'
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
