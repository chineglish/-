<template>
    <div class="assets-debt">
      <el-checkbox v-model="checked" disabled>遵从最高级账户计息规则</el-checkbox>
        <m-new-form
                :componentJson="formConfigJson"
                :formModel="data"
        >
        </m-new-form>
    </div>
</template>

<script>
// import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { accrualMode_entity } from '@/assets/js/entity'
export default {
  name: '',
  props: {
    data: {
      default: () => {},
      type: Object
    }
  },
  data () {
    return {
      checked: false,
      formModel: {
        // inherit: ''
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '上存计息',
                'type': 'text',
                'key': 'accrualFlag',
                formatter: (key, value) => accrualMode_entity[value]
              },
              {
                'disabled': false,
                'label': '上存利率',
                'type': 'text',
                'key': 'crRate',
                formatter: (key, value) => util.collatedDecimalsFormat(value)
              },
              {
                'disabled': false,
                'label': '透支计息',
                'type': 'text',
                'key': 'accrualMode',
                formatter: (key, value) => accrualMode_entity[value]
              },
              {
                'disabled': false,
                'label': '透支利率',
                'type': 'text',
                'key': 'drRate',
                formatter: (key, value) => util.collatedDecimalsFormat(value)
              }
            ]
          }
        ]
      }
    }
  },
  methods: {},
  created () {
    if (this.data.inherit === '0') {
      this.checked = false
    } else {
      this.checked = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
