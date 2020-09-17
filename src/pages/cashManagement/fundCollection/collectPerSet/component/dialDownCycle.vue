<template>
    <d2-container>
        <m-new-form
          :componentJson="formConfigJson"
          :formModel="formModel">
          <template slot="day" slot-scope="obj">
            <mon-table :monthData="obj.data" :monthList="monthList"></mon-table>
          </template>
        </m-new-form>
    </d2-container>
</template>
<script>
import MonTable from '@/pages/cashManagement/fundCollection/collectPerSet/components/monTable.vue'
export default {
  name: 'dialDownCycle',
  props: {
    propData: {
      default: () => {},
      type: Object
    }
  },
  components: {
    MonTable
  },
  data () {
    return {
      // btnData: [
      //   { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
      //   { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'reset' }
      // ],
      months: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' }
      ],
      month: '',
      days: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' }
      ],
      day: '',
      formModel: {
        dGatherFlag: '',
        dTertianStart: '',
        dTertianDays: '',
        dWeeksCode: [],
        // dMonthEndFlag: '',
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
            'key': 'dGatherFlag',
            'options': [
              { 'value': '每天下拨', 'key': '0' },
              { 'value': '隔天下拨', 'key': '1' },
              { 'value': '每周下拨', 'key': '2' },
              { 'value': '每月下拨', 'key': '3' },
              { 'value': '月末下拨', 'key': '4' },
              { 'value': '取消下拨', 'key': '9' }
            ]
          }]
        }, {
          formWidth: '50%',
          labelWidth: '60%',
          group: [ {
            'disabled': true,
            'label': '每月起始日',
            'type': 'input',
            'key': 'dTertianStart'
          }, {
            'disabled': true,
            'label': '隔天下拨天数',
            'type': 'input',
            'key': 'dTertianDays'
          }]
        }, {
          formWidth: '100%',
          labelWidth: '23%',
          group: [{
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
          }, {
            'disabled': true,
            'label': '每月下拨',
            'type': 'blank',
            'blankSlotName': 'day',
            'key': 'month'
          // }, {
          //   'disabled': true,
          //   'label': '月末下拨标志',
          //   'type': 'select',
          //   'key': 'dMonthEndFlag',
          //   'options': [
          //     { 'value': '不月末下拨', 'key': '0' },
          //     { 'value': '月末下拨', 'key': '1' }
          //   ]
          }]
        }]
      },
      monthList: ['dJanCode', 'dFebCode', 'dMarCode', 'dAprCode', 'dMayCode', 'dJunCode', 'dJulCode', 'dAugCode', 'dSepCode', 'dOctCode', 'dNovCode', 'dDecCode'],
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },
  methods: {},
  created () {
    console.log(this.propData)
    this.formModel.dGatherFlag = this.propData.dGatherFlag
    this.formModel.dTertianStart = this.propData.dTerTianStart
    this.formModel.dTertianDays = this.propData.dTerTianDays
    // this.formModel.dMonthEndFlag = this.propData.dMonthEndFlag
    let str = this.propData.dWeeksCode
    for (let i = 0; i < str.length; i++) {
      str[i] > 0 && this.formModel.dWeeksCode.push(this.weeks[i])
    }
    this.monthList.forEach(item => {
      this.formModel.month[item] = this.propData[item].split('')
    })
  }
}
</script>
<style lang="scss" scoped>
#m-form .m-el-form .el-range-editor.el-input__inner {
  width: 70%;
}
.month{
  display: inline-block;
  width: 300px;
  text-align: center;
}
.day{
  display: inline-block;
  width: 300px;
  text-align: center;
}
</style>
