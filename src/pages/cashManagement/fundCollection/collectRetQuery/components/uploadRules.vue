<template>
    <div class="assets-debt">
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
import { pileAmtFlag_entity, returnFlag_entity, uppDownFlag_entity, gatherMode_entity } from '@/assets/js/entity'

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
      formConfigJson: {
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '上存方式',
                'type': 'text',
                'key': 'gatherMode',
                formatter: (key, value) => gatherMode_entity[value]
              },
              {
                'disabled': false,
                'label': '最高限额',
                'type': 'text',
                'key': 'hightAmt',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '上存比例',
                'type': 'text',
                'key': 'upPercent',
                formatter: (key, value) => util.collatedDecimalsFormat(value)
              },
              {
                'disabled': false,
                'label': '取整单位',
                'type': 'text',
                'key': 'fullUnit'
              },
              {
                'disabled': false,
                'label': '最高累计上存标志',
                'type': 'text',
                'key': 'pileAmtFlag',
                formatter: (key, value) => pileAmtFlag_entity[value]
              },
              {
                'disabled': false,
                'label': '最高累计上存余额',
                // textType: 'shy',
                'type': 'text',
                'key': 'objectAmt',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '上存保留最低留存',
                'type': 'text',
                'key': 'uppDownFlag',
                formatter: (key, value) => uppDownFlag_entity[value]
              },
              {
                'disabled': false,
                'label': '最低留存金额',
                'type': 'text',
                'key': 'lowAmt',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '使用上级资金归还隔夜透支',
                'type': 'text',
                'key': 'returnFalg',
                formatter: (key, value) => this.data.acNoLevel === '1' ? returnFlag_entity[value] : value === '0' ? '不用' : '用'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
