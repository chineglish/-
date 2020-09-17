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
import { batchUpColMethod_Type, highestMark_Type, uppDownFlag_Type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'uploadRule',
  props: {
    propData: {
      default: () => {},
      type: Object
    }
  },
  data () {
    return {
      formModel: {
        batchUpColMethod: '0',
        batchUpCeiling: '',
        percentage: '',
        collectUnits: '',
        highestMark: '',
        highestBal: '',
        dialDown: '',
        miniRetAmt: ''
      },
      formConfigJson: {
        formItems: [{
          formWidth: '50%',
          labelWidth: '50%',
          group: [{
            'disabled': false,
            'label': '上存方式',
            'type': 'text',
            'key': 'batchUpColMethod',
            formatter: (key, value) => util.handleEnums(batchUpColMethod_Type, value)
          }, {
            'disabled': false,
            'label': '最高限额',
            'type': 'text',
            'key': 'batchUpCeiling',
            formatter: (key, value) => util.formatCurrency(value)
          },
          {
            'disabled': false,
            'label': '上存比例',
            'type': 'text',
            'key': 'percentage'
          }, {
            'disabled': false,
            'label': '取整单位',
            'type': 'text',
            'key': 'collectUnits'
          }, {
            'disabled': false,
            'label': '最高累计上存标志',
            'type': 'text',
            'key': 'highestMark',
            formatter: (key, value) => util.handleEnums(highestMark_Type, value)
          }, {
            'disabled': false,
            'label': '最高累计上存余额',
            'type': 'text',
            'key': 'highestBal',
            formatter: (key, value) => util.formatCurrency(value)
          }, {
            'disabled': false,
            'label': '上存保留最低留存',
            'type': 'text',
            'key': 'dialDown',
            formatter: (key, value) => util.handleEnums(uppDownFlag_Type, value)
          }, {
            'disabled': false,
            'label': '最低留存金额',
            'type': 'text',
            'key': 'miniRetAmt',
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
