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
import util from '@/libs/util'
export default {
  name: 'uploadCy',
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
        gatherFlag: '',
        tertianStart: '',
        tertianDays: '',
        weeksCode: [],
        // monthEndFlag: '',
        month: {}
      },
      formConfigJson: {
        formItems: [{
          formWidth: '100%',
          labelWidth: '23%',
          group: [{
            'disabled': true,
            'label': '上存类型',
            'type': 'select',
            'options': [
              { 'value': '每天上存', 'key': '0' },
              { 'value': '隔天上存', 'key': '1' },
              { 'value': '每周上存', 'key': '2' },
              { 'value': '每月上存', 'key': '3' },
              { 'value': '月末上存', 'key': '4' },
              { 'value': '取消上存', 'key': '9' }
            ],
            placeholder: ' ',
            'key': 'gatherFlag'
          }]
        }, {
          formWidth: '50%',
          labelWidth: '60%',
          group: [ {
            'disabled': true,
            'label': '每月起始日',
            'type': 'input',
            placeholder: ' ',
            'key': 'tertianStart'
          }, {
            'disabled': true,
            'label': '隔天上存天数',
            'type': 'input',
            placeholder: ' ',
            'key': 'tertianDays'
          }]
        }, {
          formWidth: '100%',
          labelWidth: '23%',
          group: [
            {
              'disabled': true,
              'label': '每周上存标志',
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
              'key': 'weeksCode'
            },
            {
              'disabled': true,
              'label': '每月上存',
              'type': 'blank',
              'key': 'month',
              'blankSlotName': 'day'
            // },
            // {
            //   'disabled': true,
            //   'label': '月末上存标志',
            //   'type': 'select',
            //   'options': [
            //     { 'value': '不月末上存', 'key': '0' },
            //     { 'value': '月末上存', 'key': '1' }
            //   ],
            //   'key': 'monthEndFlag'
            },
            {
              disabled: true,
              label: '下次上存时间',
              type: 'text',
              key: 'nextTime',
              formatter: (key, value) => util.formatTransTime(value)
            }
          ]
        }]
      },
      monthList: ['janCode', 'febCode', 'marCode', 'aprCode', 'mayCode', 'junCode', 'julCode', 'augCode', 'sepCode', 'octCode', 'novCode', 'decCode'],
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },
  methods: {},
  created () {
    this.formModel.gatherFlag = this.data.gatherFlag
    this.formModel.tertianStart = this.formModel.gatherFlag === '1' ? this.data.tertianStart : ''
    this.formModel.tertianDays = this.formModel.gatherFlag === '1' ? this.data.tertianDays : ''
    this.formModel.nextTime = this.data.nextTime
    // this.formModel.monthEndFlag = this.data.monthEndFlag
    const week = this.data.weeksCode
    for (let i = 0; i < week.length; i++) {
      week[i] > 0 && this.formModel.weeksCode.push(this.weeks[i])
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
