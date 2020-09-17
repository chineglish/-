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
import { ensure_Type } from '@/assets/js/entity'
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
  name: 'EnsureApplySoloConffer',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '票据号码',
                'type': 'text',
                'key': 'stdBillNum'
              },
              {
                'disabled': false,
                'label': '保证类型',
                'type': 'text',
                'key': 'stdGuarTyp',
                formatter: (key, value) => util.handleEnums(ensure_Type, value)
              },
              {
                'disabled': false,
                'label': '保证申请日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdApplDat'
              }
            ]
          },
          {
            title: '被保证人信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '被保证人账户',
                'type': 'text',
                'key': 'stdGteeAcc'
              },
              {
                'disabled': false,
                'label': '被保证人账户名称',
                'type': 'text',
                'key': 'stdGteeNam'
              },
              {
                'disabled': false,
                'label': '被保证人组织机构代码',
                'type': 'text',
                'key': 'stdGteeCod'
              },
              {
                'disabled': false,
                'label': '被保证人开户行号',
                'type': 'text',
                'key': 'stdGteeBnm'
              }
            ]
          },
          {
            title: '保证人信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '保证人名称',
                'type': 'text',
                'key': 'stdWareNam'
              },
              {
                'disabled': false,
                'label': '保证人账号',
                'type': 'text',
                'key': 'stdWareAcc'
              },
              {
                'disabled': false,
                'label': '保证人开户行号',
                'type': 'text',
                'key': 'stdWareBnm'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {},
  created () {}
}
</script>
