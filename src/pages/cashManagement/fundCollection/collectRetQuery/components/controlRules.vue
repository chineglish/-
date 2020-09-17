<template>
  <div class="assets-debt">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="data"
    ></m-new-form>
  </div>
</template>

<script>
import { payMode_entity } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'controlRules',
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
            group: [
              {
                'label': '支控方式',
                'type': 'text',
                'key': 'payMode',
                formatter: (key, value) => payMode_entity[value]
              },
              {
                'label': '超限额度',
                'type': 'text',
                'key': 'exPayAmt',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
