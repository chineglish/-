<template>
    <d2-container>
        <m-new-form
          :componentJson="formConfigJson"
          :formModel="data"
        >
        </m-new-form>
    </d2-container>
</template>
<script>
import { gatherMode_Type, pileAmtFlag_Type, uppDownFlag_Type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'uploadRule',
  props: {
    data: {
      default: () => {},
      type: Object
    }
  },
  data () {
    return {
      formModel: {
        gatherMode: '',
        objectAmt: '',
        hightAmt: '',
        upPercent: '',
        fullUnit: '',
        upAmt: '',
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
            'label': '上划批量归集方式',
            'type': 'text',
            'key': 'gatherMode',
            formatter: (key, value) => util.handleEnums(gatherMode_Type, value)
          }, {
            'disabled': false,
            'label': '上划最高限额',
            'type': 'text',
            'key': 'objectAmt',
            formatter: (key, value) => util.formatCurrency(value)
          }, {
            'disabled': false,
            'label': '上划触发金额',
            'type': 'text',
            'key': 'hightAmt',
            formatter: (key, value) => util.formatCurrency(value)
          }]
        }, {
          formWidth: '50%',
          labelWidth: '50%',
          group: [ {
            'disabled': false,
            'label': '上划归集百分比',
            'type': 'text',
            'key': 'upPercent'
          }, {
            'disabled': false,
            'label': '上划取整归集单位',
            'type': 'text',
            'key': 'fullUnit'
          }, {
            'disabled': false,
            'label': '上划定额额度',
            'type': 'text',
            'key': 'upAmt',
            formatter: (key, value) => util.formatCurrency(value)
          }]
        }, {
          formWidth: '50%',
          labelWidth: '50%',
          group: [{
            'disabled': false,
            'label': '上划最高累计归集标志',
            'type': 'text',
            'key': 'pileAmtFlag',
            formatter: (key, value) => util.handleEnums(pileAmtFlag_Type, value)
          }, {
            'disabled': false,
            'label': '上划最高累计归集余额',
            // textType: 'shy',
            'type': 'text',
            'key': 'maxBal',
            formatter: (key, value) => util.formatCurrency(value)
          }, {
            'disabled': false,
            'label': '上划留存不足是否同时下拨',
            'type': 'text',
            'key': 'uppDownFlag',
            formatter: (key, value) => util.handleEnums(uppDownFlag_Type, value)
          }, {
            'disabled': false,
            'label': '上划最低留存金额',
            'type': 'text',
            'key': 'lowAmt',
            formatter: (key, value) => util.formatCurrency(value)
          }]
        }]
      }
    }
  },
  methods: {},
  created () {}
}
</script>
