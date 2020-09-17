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
import MonTable from '@/pages/cashManagement/fundCollection/collectPerSet/components/monTable.vue'
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
      day: '',
      formModel: {
        gatherFlag: '',
        tertianStart: '',
        tertianDays: '',
        weeksCode: [],
        // monthEndFlag: '',
        month: {},
        timeCode: []
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
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
          },
          {
            formWidth: '50%',
            group: [ {
              'disabled': true,
              'label': '隔天归集起始日',
              'type': 'input',
              'key': 'tertianStart'
            }, {
              'disabled': true,
              'label': '隔天归集天数',
              'type': 'input',
              'key': 'tertianDays'
            }]
          },
          {
            formWidth: '100%',
            group: [
              {
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
                'key': 'weeksCode'
              },
              {
                'disabled': true,
                'label': '每月归集标志',
                'key': 'month',
                'type': 'blank',
                'blankSlotName': 'day'
              // },
              // {
              //   'disabled': true,
              //   'label': '月末归集标志',
              //   'type': 'input',
              //   'key': 'monthEndFlag'
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
                'key': 'time1'
              },
              {
                'disabled': true,
                'label': '时间2',
                'type': 'time',
                'pickerOptions': 'pickerOptions',
                'key': 'time2'
              }
            ]
          },
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '时间3',
                'type': 'time',
                'pickerOptions': {
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                },
                'key': 'time3'
              },
              {
                'disabled': true,
                'label': '时间4',
                'type': 'time',
                'pickerOptions': 'pickerOptions',
                'key': 'time4'
              }
            ]
          },
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '时间5',
                'type': 'time',
                'pickerOptions': 'pickerOptions',
                'key': 'time5'
              }
            ]
          }
        ]
      },
      monthList: ['janCode', 'febCode', 'marCode', 'aprCode', 'mayCode', 'junCode', 'julCode', 'augCode', 'sepCode', 'octCode', 'novCode', 'decCode'],
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },
  methods: {
    initOperating (val) {
      this.$nextTick(() => {
        switch (val) {
          case '0':
            this.formConfigJson.formItems[1].group[0].disabled = true
            this.formConfigJson.formItems[1].group[1].disabled = true
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.$refs.monTable.disabled = true
            this.formConfigJson.formItems[2].group[2].disabled = true
            break
          case '1':
            this.formConfigJson.formItems[1].group[0].disabled = false
            this.formConfigJson.formItems[1].group[1].disabled = false
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.$refs.monTable.disabled = true
            this.formConfigJson.formItems[2].group[2].disabled = true
            break
          case '2':
            this.formConfigJson.formItems[1].group[0].disabled = true
            this.formConfigJson.formItems[1].group[1].disabled = true
            this.formConfigJson.formItems[2].group[0].disabled = false
            this.$refs.monTable.disabled = true
            this.formConfigJson.formItems[2].group[2].disabled = true
            break
          case '3':
            this.formConfigJson.formItems[1].group[0].disabled = true
            this.formConfigJson.formItems[1].group[1].disabled = true
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.$refs.monTable.disabled = false
            this.formConfigJson.formItems[2].group[2].disabled = true
            break
          case '4':
            this.formConfigJson.formItems[1].group[0].disabled = true
            this.formConfigJson.formItems[1].group[1].disabled = true
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.$refs.monTable.disabled = true
            this.formConfigJson.formItems[2].group[2].disabled = false
            break
          case '9':
            this.formConfigJson.formItems[1].group[0].disabled = true
            this.formConfigJson.formItems[1].group[1].disabled = true
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.$refs.monTable.disabled = true
            this.formConfigJson.formItems[2].group[2].disabled = true
            break
        }
      })
    }
  },
  created () {
    let arr = Object.keys(this.formModel)
    arr.forEach(key => {
      if (key === 'weeksCode') {
        let arr = this.propData[key].split('')
        arr.forEach((item, index) => {
          Number(item) > 0 && this.formModel[key].push(this.weeks[index])
        })
      } else if (key === 'month') {
        this.monthList.forEach(item => {
          this.formModel[key][item] = this.propData[item].split('')
        })
      } else if (key === 'timeCode') {
        let arr = []
        this.propData[key].forEach(e => {
          if (e) {
            let str = e.slice(0, 4)
            arr.push(str.slice(0, 2) + ':' + str.slice(2))
          } else {
            arr.push('')
          }
        })
        this.formModel.time1 = arr[0]
        this.formModel.time2 = arr[1]
        this.formModel.time3 = arr[2]
        this.formModel.time4 = arr[3]
        this.formModel.time5 = arr[4]
      } else {
        this.formModel[key] = this.propData[key]
      }
    })
    // this.initOperating(this.formModel.gatherFlag)
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
