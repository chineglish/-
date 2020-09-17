<template>
    <d2-container>
        <m-new-form
          ref="form"
          :componentJson="formConfigJson"
          :formModel="formModel"
          @collectionType="collectionType"
          @onSubmit="onSubmit"
          @reset="reset"
          @inputValueLimit1="inputValueLimit1"
          @inputValueLimit2="inputValueLimit2"
        >
          <!--<template slot="day" slot-scope="obj">
            <mon-table ref="monTable" :monthData.sync="obj.data" :monthList="monthList" @change="changeMonth"></mon-table>
          </template>-->
			<template slot="day">
				<mon-table ref="monTable" :monthData.sync="month" :monthList="monthList" @change="changeMonth"></mon-table>
			</template>
        </m-new-form>
    </d2-container>
</template>

<script>
import util from '@/libs/util'
import MonTable from './monTable'
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
      formModel: {
        gatherFlag: '',
        tertianStart: '',
        tertianDays: '',
        weeksCode: []
        // monthEndFlag: ''
        // month: {}
      },
      month: {},
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '23%',
            group: [{
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
            }]
          },
          {
            formWidth: '50%',
            labelWidth: '60%',
            group: [
              {
                'disabled': true,
                'label': '每月起始日',
                'type': 'input',
                'key': 'tertianStart',
                'changeEventName': 'onSubmit',
                inputType: 'number',
                inputEventName: 'inputValueLimit1'
              },
              {
                'disabled': true,
                'label': '隔天上存天数',
                'type': 'input',
                'key': 'tertianDays',
                'changeEventName': 'onSubmit',
                inputType: 'number',
                inputEventName: 'inputValueLimit2'
              }
            ]
          },
          {
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
                'key': 'weeksCode',
                'changeEvent': 'onSubmit'
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
              //   'key': 'monthEndFlag',
              //   'changeEventName': 'onSubmit'
              }
            ]
          }
        ]
      },
      monthList: ['janCode', 'febCode', 'marCode', 'aprCode', 'mayCode', 'junCode', 'julCode', 'augCode', 'sepCode', 'octCode', 'novCode', 'decCode'],
      backupData: {},
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },
  methods: {
    changeMonth () {
      this.onSubmit(this.$refs.form.form)
    },
    collectionType (res, val) {
      this.formModel = res
      this.$set(this.formModel, 'tertianStart', '1')
      this.$set(this.formModel, 'tertianDays', '1')
      // this.$set(this.formModel, 'monthEndFlag', '')
      this.formModel.weeksCode = []
      this.monthList.forEach(item => {
        let list = []
        for (let i = 0; i < this.month[item].length; i++) {
          list.push('0')
        }
        this.$set(this.month, item, list)
      })
      this.onSubmit(this.formModel)
      this.initOperating(val)
    },
    onSubmit (obj) {
      let objData = _.cloneDeep(obj)
      objData = Object.assign(objData, this.month)
      let arr = []
      for (let i = 0; i < this.weeks.length; i++) {
        arr[i] = objData.weeksCode.includes(this.weeks[i]) ? '1' : '0'
      }
      objData.weeksCode = arr.join('')
      for (let key of this.monthList) {
        objData[key] = objData[key].join('')
      }
      this.$emit('submit', objData)
    },
    reset () {
      this.backupData = _.cloneDeep(this.propData)
      this.initData(this.backupData)
      this.onSubmit(this.formModel)
    },
    initData (obj) {
      this.formModel.gatherFlag = obj.gatherFlag
      this.formModel.tertianStart = obj.tertianStart === '0' || !obj.tertianStart ? '1' : obj.tertianStart
      this.formModel.tertianDays = obj.tertianDays === '0' || !obj.tertianDays ? '1' : obj.tertianDays
      // this.formModel.monthEndFlag = obj.monthEndFlag
      let str = obj.weeksCode
      for (let i = 0; i < str.length; i++) {
        str[i] > 0 && this.formModel.weeksCode.push(this.weeks[i])
      }
      this.monthList.forEach(item => {
        this.$set(this.month, item, obj[item].split(''))
      })
      this.initOperating({ key: this.formModel.gatherFlag })
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
    /* acNoFormatExt (acno, beginIndex = 4, endIndex = 4, replace = '*') {
      let sb = ''
      let acNochars = acno.split('')
      let lg = acno.length
      let mm = beginIndex + endIndex - lg
      if (mm > 0) {
        beginIndex = beginIndex - mm > 0 ? beginIndex - mm : 0
      }
      for (let i = 0; i < acNochars.length; i++) {
        if (i >= beginIndex && i <= (acNochars.length - endIndex)) {
          sb = sb + replace
        } else {
          sb = sb + acNochars[i]
        }
      }
      return sb.toString()
    } */
  },
  created () {
    this.months = util.getMonthCode(this.propData, this.monthList)
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
