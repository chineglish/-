<template>
    <d2-container>
        <m-new-form
          :componentJson="formConfigJson"
          :formModel="formModel"
        >
          <template slot="day" slot-scope="obj">
            <mon-table :monthData.sync="obj.data" :monthList="monthList"></mon-table>
          </template>
        </m-new-form>
    </d2-container>
</template>
<script>
import monTable from '@/pages/cashManagement/fundCollection/collectPerSet/components/monTable.vue'
// import { gatherFlag_Type } from '@/assets/js/entity'
import util from '@/libs/util'
// import _ from 'lodash'
export default {
  name: 'dialDownCycle',
  props: {
    data: {
      default: () => {},
      type: Object
    }
  },
  components: {
    monTable
  },
  data () {
    return {
      formModel: {
        dGatherFlag: '',
        dTerTianStart: '',
        dTerTianDays: '',
        dWeeksCode: [],
        monthEndFalg: '',
        month: {}
      },
      formConfigJson: {
        formItems: [{
          formWidth: '100%',
          labelWidth: '23%',
          group: [{
            'disabled': true,
            'label': '下拨类型',
            'type': 'select',
            'options': [
              { 'value': '每天下拨', 'key': '0' },
              { 'value': '隔天下拨', 'key': '1' },
              { 'value': '每周下拨', 'key': '2' },
              { 'value': '每月下拨', 'key': '3' },
              { 'value': '月末下拨', 'key': '4' },
              { 'value': '取消下拨', 'key': '9' }
            ],
            'key': 'dGatherFlag'
          }]
        }, {
          formWidth: '50%',
          labelWidth: '60%',
          group: [ {
            'disabled': true,
            'label': '每月起始日',
            'type': 'input',
            placeholder: ' ',
            'key': 'dTerTianStart'
          }, {
            'disabled': true,
            'label': '隔天下拨天数',
            'type': 'input',
            placeholder: ' ',
            'key': 'dTerTianDays'
          }]
        }, {
          formWidth: '100%',
          labelWidth: '23%',
          group: [
            {
              'disabled': true,
              'label': '每周下拨标志',
              'type': 'checkbox',
              'options': [
                { 'value': '周一', 'key': '0' },
                { 'value': '周二', 'key': '1' },
                { 'value': '周三', 'key': '2' },
                { 'value': '周四', 'key': '3' },
                { 'value': '周五', 'key': '4' },
                { 'value': '周六', 'key': '5' },
                { 'value': '周日', 'key': '6' }
              ],
              'key': 'dWeeksCode'
            },
            {
              'disabled': true,
              'label': '每月下拨',
              'type': 'blank',
              'key': 'month',
              'blankSlotName': 'day'
            // },
            // {
            //   'disabled': true,
            //   'label': '月末下拨标志',
            //   'type': 'select',
            //   'options': [
            //     { 'value': '不月末下拨', 'key': '0' },
            //     { 'value': '月末下拨', 'key': '1' }
            //   ],
            //   'key': 'dMonthEndFlag'
            },
            {
              label: '下次下拨时间',
              type: 'text',
              key: 'dNextTime',
              formatter: (key, value) => util.formatTransTime(value)
            }
          ]
        }]
      },
      monthList: ['dJanCode', 'dFebCode', 'dMarCode', 'dAprCode', 'dMayCode', 'dJunCode', 'dJulCode', 'dAugCode', 'dSepCode', 'dOctCode', 'dNovCode', 'dDecCode'],
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },
  methods: {},
  created () {
    this.formModel.dGatherFlag = this.data.dGatherFlag
    this.formModel.dTerTianStart = this.formModel.dGatherFlag === '1' ? this.data.dTerTianStart : ''
    this.formModel.dTerTianDays = this.formModel.dGatherFlag === '1' ? this.data.dTerTianDays : ''
    this.formModel.dNextTime = this.data.dNextTime
    // this.formModel.dMonthEndFlag = this.data.dMonthEndFlag
    const week = this.data.dWeeksCode
    for (let i = 0; i < week.length; i++) {
      week[i] > 0 && this.formModel.dWeeksCode.push(this.weeks[i])
    }
    this.monthList.forEach(item => {
      this.formModel.month[item] = this.data[item].split('')
    })
  }
}
</script>
<style lang="scss" scoped>
#m-form .m-el-form .el-range-editor.el-input__inner {
  width: 70%;
}
</style>
