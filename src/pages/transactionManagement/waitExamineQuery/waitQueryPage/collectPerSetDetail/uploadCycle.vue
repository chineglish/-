<template>
    <d2-container>
        <m-new-form :componentJson="formConfigJson"
                :formModel="formModel">
          <template slot="day" slot-scope="obj">
            <div style="margin: 15px 0px;">
              <mon-table :monthData="obj.data" :monthList="monthList"></mon-table>
            </div>
          </template>
        </m-new-form>
    </d2-container>
</template>
<script>
import MonTable from './monTable'
export default {
  name: 'uploadCycle',
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
      month: '',
      day: '',
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
            'key': 'gatherFlag',
            'options': [
              { 'value': '每天上存', 'key': '0' },
              { 'value': '隔天上存', 'key': '1' },
              { 'value': '每周上存', 'key': '2' },
              { 'value': '每月上存', 'key': '3' },
              { 'value': '月末上存', 'key': '4' },
              { 'value': '取消上存', 'key': '9' }
            ]
          }]
        }, {
          formWidth: '50%',
          labelWidth: '60%',
          group: [ {
            'disabled': true,
            'label': '隔天归集起始日',
            'type': 'input',
            'key': 'tertianStart',
            'show': false
          }, {
            'disabled': true,
            'label': '隔天归集天数',
            'type': 'input',
            'key': 'tertianDays',
            'show': false
          }]
        }, {
          formWidth: '100%',
          labelWidth: '23%',
          group: [{
            'disabled': true,
            'label': '每周归集标志',
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
            'key': 'weeksCode',
            'show': false
          }, {
            'disabled': true,
            'label': '每月归集标志',
            'type': 'blank',
            'blankSlotName': 'day',
            'key': 'month',
            'show': false
          // }, {
          //   'disabled': true,
          //   'label': '月末归集标志',
          //   'type': 'select',
          //   'key': 'monthEndFlag',
          //   'options': [
          //     { 'value': '不月末上存', 'key': '0' },
          //     { 'value': '月末上存', 'key': '1' }
          //   ],
          //   'show': false
          }]
        }]
      },
      monthList: ['janCode', 'febCode', 'marCode', 'aprCode', 'mayCode', 'junCode', 'julCode', 'augCode', 'sepCode', 'octCode', 'novCode', 'decCode'],
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },
  created () {
    this.formModel.gatherFlag = this.propData.gatherFlag
    this.formModel.tertianStart = this.propData.tertianStart
    this.formModel.tertianDays = this.propData.tertianDays
    // this.formModel.monthEndFlag = this.propData.monthEndFlag
    let str = this.propData.weeksCode
    for (let i = 0; i < this.propData.weeksCode.length; i++) {
      str[i] > 0 && this.formModel.weeksCode.push(this.weeks[i])
    }
    this.monthList.forEach(item => {
      this.formModel.month[item] = this.propData[item].split('')
    })
    switch (this.formModel.gatherFlag) {
      case '1':
        this.formConfigJson.formItems[1].group[0].show = true
        this.formConfigJson.formItems[1].group[1].show = true
        break
      case '2':
        this.formConfigJson.formItems[2].group[0].show = true
        break
      case '3':
        this.formConfigJson.formItems[2].group[1].show = true
        break
      // case '4':
      //   this.formConfigJson.formItems[2].group[2].show = true
      //   break
    }
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
