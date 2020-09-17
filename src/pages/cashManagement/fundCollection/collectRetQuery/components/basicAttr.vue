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
import { gather_Type, consignFlag_Type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'basicAttr',
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
                'label': '归集类型',
                'type': 'text',
                'key': 'gatherType',
                formatter: (key, value) => util.handleEnums(gather_Type, value)
              },
              {
                'disabled': false,
                'label': '委托贷款',
                'type': 'text',
                'key': 'consignFlag',
                formatter: (key, value) => util.handleEnums(consignFlag_Type, value)
              },
              {
                'disabled': false,
                'label': '营业税率',
                'type': 'text',
                'key': 'salesRat',
                formatter: (key, value) => util.collatedDecimalsFormat(value)
              },
              {
                'disabled': false,
                'label': '营业附加税',
                'type': 'text',
                'key': 'restRat',
                formatter: (key, value) => util.collatedDecimalsFormat(value)
              },
              {
                'disabled': false,
                'label': '印花税',
                'type': 'text',
                'key': 'stampRat',
                formatter: (key, value) => util.collatedDecimalsFormat(value)
              },
              {
                'disabled': false,
                'label': '上级余额不足账户优先级',
                'type': 'text',
                'key': 'acNoPri'
                // 不需要枚举
                // formatter: (key, value) => util.handleEnums(acNoPri_Type, value)
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
