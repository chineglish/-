<template>
    <d2-container>
        <m-new-form
          :componentJson="formConfigJson"
          :formModel="formModel"
        >
        <template slot="day" slot-scope="obj">
          <div>
            <mon-table :monthData.sync="obj.data" :monthList="monthList"></mon-table>
          </div>
        </template>
        </m-new-form>
    </d2-container>
</template>
<script>
import MonTable from './monTable'
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
      formModel: {
        dGatherFlag: '',
        dTerTianStart: '',
        dTerTianDays: '',
        dWeeksCode: [],
        dMonthEndFlag: '',
        month: {},
        dTimeCode: []
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '23%',
            group: [
              {
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
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '60%',
            group: [
              {
                'disabled': true,
                'label': '每月起始日',
                'type': 'input',
                'key': 'dTerTianStart',
                'show': false
              },
              {
                'disabled': true,
                'label': '隔天下拨天数',
                'type': 'input',
                'key': 'dTerTianDays',
                'show': false
              }
            ]
          },
          {
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
                'key': 'dWeeksCode',
                'show': false
              },
              {
                'disabled': true,
                'label': '每月下拨',
                'type': 'blank',
                'key': 'month',
                'blankSlotName': 'day',
                'show': false
              // },
              // {
              //   'disabled': true,
              //   'label': '月末下拨标志',
              //   'type': 'input',
              //   'key': 'monthMark',
              //   'show': false
              }
            ]
          },
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '时间1',
                'type': 'time',
                'pickerOptions': 'pickerOptions',
                'key': 'dtime1',
                'show': false
              }, {
                'disabled': true,
                'label': '时间2',
                'type': 'time',
                'pickerOptions': 'pickerOptions',
                'key': 'dtime2',
                'show': false
              }, {
                'disabled': true,
                'label': '时间3',
                'type': 'time',
                'pickerOptions': 'pickerOptions',
                'key': 'dtime3',
                'show': false
              }, {
                'disabled': true,
                'label': '时间4',
                'type': 'time',
                'pickerOptions': 'pickerOptions',
                'key': 'dtime4',
                'show': false
              }, {
                'disabled': true,
                'label': '时间5',
                'type': 'time',
                'pickerOptions': 'pickerOptions',
                'key': 'dtime5',
                'show': false
              }
            ]
          }
        ]
      },
      monthList: ['dJanCode', 'dFebCode', 'dMarCode', 'dAprCode', 'dMayCode', 'dJunCode', 'dJulCode', 'dAugCode', 'dSepCode', 'dOctCode', 'dNovCode', 'dDecCode'],
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },
  methods: {},
  created () {
    let arr = Object.keys(this.formModel)
    arr.forEach(key => {
      if (key === 'dWeeksCode') {
        let arr = this.propData[key].split('')
        arr.forEach((item, index) => {
          Number(item) > 0 && this.formModel[key].push(this.weeks[index])
        })
      } else if (key === 'month') {
        this.monthList.forEach(item => {
          this.formModel[key][item] = this.propData[item].split('')
        })
      } else if (key === 'dTimeCode') {
        let arr = []
        // this.propData[key].split(',').forEach(e => {
        //   let str = e.slice(0, 4)
        //   arr.push(str.slice(0, 2) + ':' + str.slice(2))
        // })
        for (let i = 0; i < 5; i++) {
          let str = this.propData.dTimeCode.slice(i * 6, (i + 1) * 6)
          arr.push(str.slice(0, 2) + ':' + str.slice(2, 4))
        }
        this.formModel.dtime1 = arr[0]
        this.formModel.dtime2 = arr[1]
        this.formModel.dtime3 = arr[2]
        this.formModel.dtime4 = arr[3]
        this.formModel.dtime5 = arr[4]
        for (let i = 0; i < arr.length; i++) {
          let reg = /^(([0-2][0-3])|([0-1][0-9])):[0-5][0-9]$/
          if (reg.test(arr[i])) {
            this.formConfigJson.formItems[3].group[i].show = true
          }
        }
      } else {
        this.formModel[key] = this.propData[key]
      }
    })
    switch (this.formModel.dGatherFlag) {
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
