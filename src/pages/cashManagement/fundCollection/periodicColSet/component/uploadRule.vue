<template>
    <d2-container>
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
      ></m-new-form>
    </d2-container>
</template>
<script>
import { gatherMode_Type, highestMark_Type, uppDownFlag_Type } from '@/assets/js/entity'
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
        gatherMode: '',
        hightAmt: '',
        upPercent: '',
        fullUnit: '',
        pileAmtFlag: '',
        maxBal: '',
        uppDownFlag: '',
        lowAmt: ''
      },
      formConfigJson: {
        formItems: [{
          formWidth: '50%',
          labelWidth: '50%',
          group: [{
            'disabled': false,
            'label': '上存方式',
            'type': 'text',
            'key': 'gatherMode',
            formatter: (key, value) => util.handleEnums(gatherMode_Type, value)
          }, {
            'disabled': false,
            'label': '最高限额',
            'type': 'text',
            'key': 'hightAmt',
            formatter: (key, value) => value ? util.formatCurrency(value) : ''
          },
          {
            'disabled': false,
            'label': '上存比例',
            'type': 'text',
            'key': 'upPercent',
            formatter: (key, value) => value ? value.indexOf('%') > 0 ? value : `${value}%` : ''
          }, {
            'disabled': false,
            'label': '取整单位',
            'type': 'text',
            'key': 'fullUnit'
          }, {
            'disabled': false,
            'label': '最高累计上存标志',
            'type': 'text',
            'key': 'pileAmtFlag',
            formatter: (key, value) => util.handleEnums(highestMark_Type, value)
          }, {
            'disabled': false,
            'label': '最高累计上存余额',
            'type': 'text',
            'key': 'maxBal',
            formatter: (key, value) => value ? util.formatCurrency(value) : ''
          }, {
            'disabled': false,
            'label': '上存保留最低留存',
            'type': 'text',
            'key': 'uppDownFlag',
            formatter: (key, value) => util.handleEnums(uppDownFlag_Type, value)
          }, {
            'disabled': false,
            'label': '最低留存金额',
            'type': 'text',
            'key': 'lowAmt',
            formatter: (key, value) => value ? util.formatCurrency(value) : ''
          }]
        }]
      }
    }
  },
  methods: {},
  created () {
    console.log(this.propData)
    let arr = Object.keys(this.formModel)
    arr.forEach(key => {
      this.formModel[key] = this.propData[key]
    })
  }
}
</script>
