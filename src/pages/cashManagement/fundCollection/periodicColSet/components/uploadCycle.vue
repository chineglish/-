<template>
    <d2-container>
        <m-new-form
          ref="form"
          :componentJson="formConfigJson"
          :formModel="formModel"
          @collectionType="collectionType"
          @inputValueLimit1="inputValueLimit1"
          @inputValueLimit2="inputValueLimit2"
        >
          <!--<template slot="day" slot-scope="obj">
            <mon-table ref="monTable" :monthData.sync="obj.data" :monthList="monthList"></mon-table>
          </template>-->
          <template slot="day">
            <mon-table ref="monTable" :monthData.sync="month" :monthList="monthList"></mon-table>
          </template>
        </m-new-form>
    </d2-container>
</template>
<script>
import util from '@/libs/util'
import MonTable from '@/pages/cashManagement/fundCollection/collectPerSet/components/monTable.vue'
import _ from 'lodash'
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
      showtable: true,
      formModel: {
        gatherFlag: '0',
        tertianStart: '1',
        tertianDays: '1',
        weeksCode: [],
        monthEndFlag: '',
        timeCode: [],
        time1: '',
        time2: '',
        time3: '',
        time4: '',
        time5: ''
      },
      month: {},
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disabled': false,
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
                'key': 'gatherFlag',
                'changeEventName': 'collectionType'
              }
            ]
          },
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '每月起始日',
                'type': 'input',
                'key': 'tertianStart',
                inputType: 'number',
                inputEventName: 'inputValueLimit1'
              },
              {
                'disabled': true,
                'label': '隔天上存天数',
                'type': 'input',
                'key': 'tertianDays',
                inputType: 'number',
                inputEventName: 'inputValueLimit2'
              }
            ]
          },
          {
            formWidth: '100%',
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
                // 'disabled': true,
                'label': '每月上存',
                'type': 'blank',
                // 'key': 'month',
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
              }
            ]
          },
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '时间1',
                'type': 'time',
                'key': 'time1',
                'pickerOptions': {
                  start: '08:00',
                  step: '00:30',
                  end: '17:30'
                }
              },
              {
                'disabled': false,
                'label': '时间2',
                'type': 'time',
                'key': 'time2',
                'pickerOptions': {
                  start: '08:00',
                  step: '00:30',
                  end: '17:30'
                }
              }
            ]
          },
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '时间3',
                'type': 'time',
                'pickerOptions': {
                  start: '08:00',
                  step: '00:30',
                  end: '17:30'
                },
                'key': 'time3'
              },
              {
                'disabled': false,
                'label': '时间4',
                'type': 'time',
                'key': 'time4',
                'pickerOptions': {
                  start: '08:00',
                  step: '00:30',
                  end: '17:30'
                }
              }
            ]
          },
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '时间5',
                'type': 'time',
                'key': 'time5',
                'pickerOptions': {
                  start: '08:00',
                  step: '00:30',
                  end: '17:30'
                }
              }
            ]
          }
        ]
      },
      monthList: ['janCode', 'febCode', 'marCode', 'aprCode', 'mayCode', 'junCode', 'julCode', 'augCode', 'sepCode', 'octCode', 'novCode', 'decCode'],
      backupData: {},
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      weeksCode: '0000000'
    }
  },
  methods: {
    collectionType (res, val) {
      this.formModel = res
      this.$set(this.formModel, 'tertianStart', '1')
      this.$set(this.formModel, 'tertianDays', '1')
      // this.$set(this.formModel, 'monthEndFlag', '')
      this.formModel.weeksCode = []
      // let obj = {}
      this.monthList.forEach(item => {
        let list = []
        for (let i = 0; i < this.month[item].length; i++) {
          list.push('0')
        }
        this.$set(this.month, item, list)
      })
      // this.$set(this.formModel, 'month', obj)
      this.initOperating(val)
    },
    onSubmit () {
      let objData = _.cloneDeep(this.$refs.form.form)
      objData = Object.assign(objData, this.month)
      let arr = []
      for (let i = 0; i < this.weeks.length; i++) {
        arr[i] = objData.weeksCode.includes(this.weeks[i]) ? '1' : '0'
      }
      objData.weeksCode = arr.join('')
      for (let key of this.monthList) {
        objData[key] = objData[key].join('')
      }
      objData.time1 = objData.time1 ? objData.time1.split(':').join('') + '00' : ''
      objData.time2 = objData.time2 ? objData.time2.split(':').join('') + '00' : ''
      objData.time3 = objData.time3 ? objData.time3.split(':').join('') + '00' : ''
      objData.time4 = objData.time4 ? objData.time4.split(':').join('') + '00' : ''
      objData.time5 = objData.time5 ? objData.time5.split(':').join('') + '00' : ''
      objData.timeCode = [objData.time1, objData.time2, objData.time3, objData.time4, objData.time5]
      delete objData.time1
      delete objData.time2
      delete objData.time3
      delete objData.time4
      delete objData.time5
      return objData
    },
    reset () {
      this.$refs.form.form.time1 = ''
      this.$refs.form.form.time2 = ''
      this.$refs.form.form.time3 = ''
      this.$refs.form.form.time4 = ''
      this.$refs.form.form.time5 = ''
      this.formModel = this.$refs.form.form
      this.backupData = _.cloneDeep(this.propData)
      this.initData(this.backupData)
      // this.onSubmit()
    },
    initData (obj) {
      this.formModel.gatherFlag = obj.gatherFlag
      this.formModel.tertianStart = obj.tertianStart === '0' || !obj.tertianStart ? '1' : obj.tertianStart
      this.formModel.tertianDays = obj.tertianDays === '0' || !obj.tertianDays ? '1' : obj.tertianDays
      // this.formModel.monthEndFlag = obj.monthEndFlag
      let list = []
      for (let i = 0; i < obj.weeksCode.length; i++) {
        obj.weeksCode[i] > 0 && list.push(this.weeks[i])
      }
      this.$set(this.formModel, 'weeksCode', list)
      this.monthList.forEach(item => {
        // this.month[item] = obj[item].split('')
        this.$set(this.month, item, obj[item].split(''))
      })
      this.initOperating(this.formConfigJson.formItems[0].group[0].options[Number(this.formModel.gatherFlag)])
    },
    initOperating ({ key }) {
      this.$nextTick(() => {
        switch (key) {
          case '0':
            this.formConfigJson.formItems[1].group[0].disabled = true
            this.formConfigJson.formItems[1].group[1].disabled = true
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.$refs.monTable.disabled = true
            // this.formConfigJson.formItems[2].group[2].disabled = true
            break
          case '1':
            this.formConfigJson.formItems[1].group[0].disabled = false
            this.formConfigJson.formItems[1].group[1].disabled = false
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.$refs.monTable.disabled = true
            // this.formConfigJson.formItems[2].group[2].disabled = true
            break
          case '2':
            this.formConfigJson.formItems[1].group[0].disabled = true
            this.formConfigJson.formItems[1].group[1].disabled = true
            this.formConfigJson.formItems[2].group[0].disabled = false
            this.$refs.monTable.disabled = true
            // this.formConfigJson.formItems[2].group[2].disabled = true
            break
          case '3':
            this.formConfigJson.formItems[1].group[0].disabled = true
            this.formConfigJson.formItems[1].group[1].disabled = true
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.$refs.monTable.disabled = false
            // this.formConfigJson.formItems[2].group[2].disabled = true
            break
          case '4':
            this.formConfigJson.formItems[1].group[0].disabled = true
            this.formConfigJson.formItems[1].group[1].disabled = true
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.$refs.monTable.disabled = true
            // this.formConfigJson.formItems[2].group[2].disabled = false
            break
          case '9':
            this.formConfigJson.formItems[1].group[0].disabled = true
            this.formConfigJson.formItems[1].group[1].disabled = true
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.$refs.monTable.disabled = true
            // this.formConfigJson.formItems[2].group[2].disabled = true
            break
        }
      })
    },
    inputValueLimit1 (obj) {
      obj.tertianStart = Number(obj.tertianStart) <= 1 ? 1 : Number(obj.tertianStart) >= 30 ? 30 : obj.tertianStart
    },
    inputValueLimit2 (obj) {
      obj.tertianDays = Number(obj.tertianDays) <= 1 ? 1 : Number(obj.tertianDays) >= 30 ? 30 : obj.tertianDays
    }
  },
  created () {
    this.propData.weeksCode = this.propData.weeksCode || this.weeksCode
    this.months = util.getMonthCode(this.propData, this.monthList)
    this.propData.gatherFlag = this.propData.gatherFlag || '0'
    this.backupData = _.cloneDeep(this.propData)
    this.initData(this.backupData)
  }
}
</script>
<style lang="scss" scoped>
#m-form .m-el-form .el-range-editor.el-input__inner {
  width: 70%;
}
</style>
