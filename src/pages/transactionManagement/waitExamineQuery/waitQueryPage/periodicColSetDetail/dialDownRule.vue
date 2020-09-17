<template>
    <d2-container>
        <m-new-form
				:componentJson="formConfigJson"
                :formModel="formModel"
		>
        </m-new-form>
    </d2-container>
</template>
<script>
import { dialDownSave_Type, dialDownMethod_Type } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'dialDownRule',
  props: {
    propData: {
      default: () => {},
      type: Object
    }
  },
  data () {
    return {
      formModel: {
        fundDirect: '0',
        downMode: '',
        downLowAmt: '',
        downAmt: ''
      },
      formConfigJson: {
        formItems: [{
          formWidth: '50%',
          labelWidth: '50%',
          group: [{
            'disabled': false,
            'label': '是否下拨',
            'type': 'text',
            'key': 'fundDirect',
            formatter: (key, value) => util.handleEnums(dialDownSave_Type, value)
          }, {
            'disabled': false,
            'label': '下拨方式',
            'type': 'text',
            'key': 'downMode',
            formatter: (key, value) => util.handleEnums(dialDownMethod_Type, value)
          }, {
            'disabled': false,
            'label': '留存金额',
            'type': 'text',
            'key': 'downLowAmt',
            formatter: (key, value) => util.formatCurrency(value)
          }, {
            'disabled': false,
            'label': '下拨金额',
            'type': 'text',
            'key': 'downAmt',
            formatter: (key, value) => util.formatCurrency(value)
          }]
        }]
      }
    }
  },

  methods: {},
  created () {
    let arr = Object.keys(this.formModel)
    arr.forEach(key => {
      this.formModel[key] = this.propData[key]
    })
  }
}
</script>
