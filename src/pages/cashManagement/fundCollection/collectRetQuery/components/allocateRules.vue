<template>
  <div class="assets-debt">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="data"
    ></m-new-form>
  </div>
</template>

<script>
// import { httpPost } from '@/api/sys/http'
import { downMode_entity } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'allocateRules',
  props: {
    data: {
      default: () => {},
      type: Object
    }
  },
  data () {
    return {
      formModel: {},
      formConfigJson: {
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '是否下拨',
                'type': 'text',
                'key': 'fundDirect',
                formatter: (key, value) => value === '2' ? '是' : value === '1' ? '否' : `未知状态${value},请联系银行人员`
              },
              {
                'disabled': false,
                'label': '下拨方式',
                'type': 'text',
                'key': 'downMode',
                formatter: (key, value) => downMode_entity[value]
              },
              {
                'disabled': false,
                'label': '留存金额',
                'type': 'text',
                'key': 'downLowAmt',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '下拨金额',
                'type': 'text',
                'key': 'downAmt',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
