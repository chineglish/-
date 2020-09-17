<template>
  <m-new-form
    :componentJson="formConfigJson"
    :formModel="formModel"
  >
  </m-new-form>
</template>

<script>
// import { httpPost } from '@/api/sys/http'
// import util from '@/libs/util'
// import { huabo_Type } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'unlinkCreditCardfer',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            // labelWidth: '30%',
            title: '信用卡解挂',
            group: [
              {
                'disabled': false,
                'label': '信用卡号',
                'type': 'text',
                'key': 'acNo'
              },
              {
                'disabled': false,
                'label': '持卡人姓名',
                'type': 'text',
                'key': 'acName'
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

<style lang="scss" scoped>
</style>
