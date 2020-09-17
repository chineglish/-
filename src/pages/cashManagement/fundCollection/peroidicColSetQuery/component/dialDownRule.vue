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
import { downMode_Type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'dialDownRule',
  props: {
    data: {
      default: () => {},
      type: Object
    }
  },
  data () {
    return {
      formModel: {
        fundDirect: '',
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
            formatter: (key, value) => value === '2' ? '是' : value === '1' ? '否' : `未知状态${value},请联系银行人员`
          }, {
            'disabled': false,
            'label': '下拨方式',
            'type': 'text',
            'key': 'downMode',
            formatter: (key, value) => util.handleEnums(downMode_Type, value)
          }, {
            'disabled': false,
            'label': '下拨最低留存金额',
            'type': 'text',
            'key': 'downLowAmt',
            formatter: (key, value) => util.formatCurrency(value)
          }, {
            'disabled': false,
            'label': '下拨定额金额',
            'type': 'text',
            'key': 'downAmt',
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
