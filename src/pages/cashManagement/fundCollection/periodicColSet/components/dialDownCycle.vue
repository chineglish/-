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
        dGatherFlag: '0',
        dTerTianStart: '',
        dTerTianDays: '',
        dWeeksCode: [],
        // dMonthEndFlag: '',
        dTimeCode: [],
        dtime1: '',
        dtime2: '',
        dtime3: '',
        dtime4: '',
        dtime5: ''
      },
      month: {},
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disabled': false,
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
                'key': 'dGatherFlag',
                'changeEventName': 'collectionType'
              }
            ]
          },
          {
            formWidth: '50%',
            group: [ {
              'disabled': true,
              'label': '每月起始日',
              'type': 'input',
              'key': 'dTerTianStart',
              inputType: 'number',
              inputEventName: 'inputValueLimit1'
            }, {
              'disabled': true,
              'label': '隔天下拨天数',
              'type': 'input',
              'key': 'dTerTianDays',
              'changeEventName': 'dTerTianDays',
              inputType: 'number',
              inputEventName: 'inputValueLimit2'
            }]
          },
          {
            formWidth: '100%',
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
                'changeEvent': 'dWeeksCode'
              },
              {
                // 'disabled': true,
                'label': '每月下拨',
                'type': 'blank',
                // 'key': 'month',
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
              //   'key': 'dMonthEndFlag',
              //   'changeEventName': 'dMonthEndFlag'
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
                'pickerOptions': {
                  start: '08:00',
                  step: '00:30',
                  end: '17:30'
                },
                'key': 'dtime1',
                'changeEventName': 'dtimeOne'
              },
              {
                'disabled': false,
                'label': '时间2',
                'type': 'time',
                'pickerOptions': {
                  start: '08:00',
                  step: '00:30',
                  end: '17:30'
                },
                'key': 'dtime2',
                'changeEventName': 'dtimeTwo'
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
                'key': 'dtime3',
                'changeEventName': 'dtimeThree'
              },
              {
                'disabled': false,
                'label': '时间4',
                'type': 'time',
                'pickerOptions': {
                  start: '08:00',
                  step: '00:30',
                  end: '17:30'
                },
                'key': 'dtime4',
                'changeEventName': 'dtimeFour'
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
                'pickerOptions': {
                  start: '08:00',
                  step: '00:30',
                  end: '17:30'
                },
                'key': 'dtime5',
                'changeEventName': 'dtimeFive'
              }
            ]
          }
        ]
      },
      monthList: ['dJanCode', 'dFebCode', 'dMarCode', 'dAprCode', 'dMayCode', 'dJunCode', 'dJulCode', 'dAugCode', 'dSepCode', 'dOctCode', 'dNovCode', 'dDecCode'],
      backupData: {},
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      weeksCode: '0000000'
    }
  },
  methods: {
    collectionType (res, val) {
      this.formModel = res
      this.$set(this.formModel, 'dTerTianStart', '1')
      this.$set(this.formModel, 'dTerTianDays', '1')
      // this.$set(this.formModel, 'dMonthEndFlag', '')
      this.formModel.dWeeksCode = []
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
        arr[i] = objData.dWeeksCode.includes(this.weeks[i]) ? '1' : '0'
      }
      objData.dWeeksCode = arr.join('')
      for (let key of this.monthList) {
        objData[key] = objData[key].join('')
      }
      objData.dtime1 = objData.dtime1 ? objData.dtime1.split(':').join('') + '00' : ''
      objData.dtime2 = objData.dtime2 ? objData.dtime2.split(':').join('') + '00' : ''
      objData.dtime3 = objData.dtime3 ? objData.dtime3.split(':').join('') + '00' : ''
      objData.dtime4 = objData.dtime4 ? objData.dtime4.split(':').join('') + '00' : ''
      objData.dtime5 = objData.dtime5 ? objData.dtime5.split(':').join('') + '00' : ''
      objData.dTimeCode = [objData.dtime1, objData.dtime2, objData.dtime3, objData.dtime4, objData.dtime5]
      delete objData.dtime1
      delete objData.dtime2
      delete objData.dtime3
      delete objData.dtime4
      delete objData.dtime5
      return objData
    },
    reset () {
      this.$refs.form.form.dtime1 = ''
      this.$refs.form.form.dtime2 = ''
      this.$refs.form.form.dtime3 = ''
      this.$refs.form.form.dtime4 = ''
      this.$refs.form.form.dtime5 = ''
      this.formModel = this.$refs.form.form
      this.backupData = _.cloneDeep(this.propData)
      this.initData(this.backupData)
    },
    initData (obj) {
      this.formModel.dGatherFlag = obj.dGatherFlag
      this.formModel.dTerTianStart = obj.dTerTianStart === '0' || !obj.dTerTianStart ? '1' : obj.dTerTianStart
      this.formModel.dTerTianDays = obj.dTerTianDays === '0' || !obj.dTerTianDays ? '1' : obj.dTerTianDays
      // this.formModel.dMonthEndFlag = obj.dMonthEndFlag
      let list = []
      for (let i = 0; i < obj.dWeeksCode.length; i++) {
        obj.dWeeksCode[i] > 0 && list.push(this.weeks[i])
      }
      this.$set(this.formModel, 'dWeeksCode', list)
      this.monthList.forEach(item => {
        // this.formModel.month[item] = obj[item].split('')
        this.$set(this.month, item, obj[item].split(''))
      })
      this.initOperating(this.formConfigJson.formItems[0].group[0].options[Number(this.formModel.dGatherFlag)])
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
            this.propData.disabled = true
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
    this.propData.dWeeksCode = this.propData.dWeeksCode || this.weeksCode
    this.months = util.getMonthCode(this.propData, this.monthList)
    this.propData.dGatherFlag = this.propData.dGatherFlag || '0'
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
