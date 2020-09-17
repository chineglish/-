<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
    >
    </m-new-form>
  </div>
</template>
<script>/**
     * @name 挡板账户资金回退确认
     * @date 2019-12-24
     * @auther 邓焕
     */
// import { httpPost } from '@/api/sys/http'
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
  name: 'baffleAccountConffer',
  data () {
    return {
      // breadData: ['财务管理', '', '挡板账户资金回退'],
      // 以下为动态数据
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '票据信息',
            // labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '挡板账户账号',
                'type': 'text',
                'key': 'baffleAcNo'
              },
              {
                'disabled': true,
                'label': '挡板账户户名',
                'type': 'text',
                'key': 'baffleAcName'
              },
              {
                'disabled': true,
                'label': '基本户账号',
                'type': 'text',
                'key': 'baseAcNo'
              },
              {
                'disabled': true,
                'label': '基本户户名',
                'type': 'text',
                'key': 'baseAcName'
              },
              {
                'disabled': true,
                'label': '挡板账户余额',
                'type': 'text',
                'key': 'balanceShow'
              },
              {
                'disabled': false,
                'label': '退回金额',
                'type': 'text',
                'key': 'amountShow',
                formatter: (key, value) => util.formatCurrency(value)
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
