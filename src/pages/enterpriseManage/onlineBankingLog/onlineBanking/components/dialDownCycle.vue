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
      showtable: true,
      formModel: {
        dGatherFlag: '',
        dTerTianStart: '',
        dTerTianDays: '',
        dWeeksCode: []
        // dMonthEndFlag: ''
      },
      month: {},
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '23%',
            group: [
              {
                'disabled': false,
                'label': '下拨类型',
                'type': 'text',
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
            labelWidth: '60%',
            group: [
              {
                'disabled': true,
                'label': '每月起始日',
                'type': 'text',
                'key': 'dTerTianStart',
                'changeEventName': 'onSubmit',
                inputType: 'number',
                inputEventName: 'inputValueLimit1'
              },
              {
                'disabled': true,
                'label': '隔天下拨天数',
                'type': 'text',
                'key': 'dTerTianDays',
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
                'changeEvent': 'onSubmit'
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
              //   'changeEventName': 'onSubmit'
              }
            ]
          }
        ]
      },
      monthList: ['dJanCode', 'dFebCode', 'dMarCode', 'dAprCode', 'dMayCode', 'dJunCode', 'dJulCode', 'dAugCode', 'dSepCode', 'dOctCode', 'dNovCode', 'dDecCode'],
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
      this.$set(this.formModel, 'dTerTianStart', '')
      this.$set(this.formModel, 'dTerTianDays', '')
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
      this.onSubmit(this.formModel)
      this.initOperating(val)
    },
    onSubmit (obj, key) {
      let objData = _.cloneDeep(obj)
      objData = Object.assign(objData, this.month)
      let arr = []
      for (let i = 0; i < this.weeks.length; i++) {
        arr[i] = objData.dWeeksCode.includes(this.weeks[i]) ? '1' : '0'
      }
      objData.dWeeksCode = arr.join('')
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
      this.formModel.dGatherFlag = obj.dGatherFlag
      this.formModel.dTerTianStart = obj.dTerTianStart
      this.formModel.dTerTianDays = obj.dTerTianDays
      // this.formModel.dMonthEndFlag = obj.dMonthEndFlag
      let str = obj.dWeeksCode
      for (let i = 0; i < str.length; i++) {
        str[i] > 0 && this.formModel.dWeeksCode.push(this.weeks[i])
      }
      this.monthList.forEach(item => {
        // this.formModel.month[item] = obj[item].split('')
        this.$set(this.month, item, obj[item].split(''))
      })
      this.initOperating(this.formModel.dGatherFlag)
    },
    initOperating (val) {
      this.$nextTick(() => {
        switch (val) {
          case '0':
            this.formConfigJson.formItems[1].group[0].disabled = true
            this.formConfigJson.formItems[1].group[1].disabled = true
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.$refs.monTable.disabled = true
            // this.formConfigJson.formItems[2].group[2].disabled = true
            break
          case '1':
            this.formConfigJson.formItems[1].group[0].disabled = true
            this.formConfigJson.formItems[1].group[1].disabled = false
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.propData.disabled = true
            // this.formConfigJson.formItems[2].group[2].disabled = true
            this.$refs.monTable.disabled = true
            break
          case '2':
            this.formConfigJson.formItems[1].group[0].disabled = true
            this.formConfigJson.formItems[1].group[1].disabled = true
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.$refs.monTable.disabled = true
            // this.formConfigJson.formItems[2].group[2].disabled = true
            break
          case '3':
            this.formConfigJson.formItems[1].group[0].disabled = true
            this.formConfigJson.formItems[1].group[1].disabled = true
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.$refs.monTable.disabled = true
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
      obj.tertianStart = Number(obj.tertianStart) <= 0 ? 0 : Number(obj.tertianStart) >= 30 ? 30 : obj.tertianStart
    },
    inputValueLimit2 (obj) {
      obj.tertianDays = Number(obj.tertianDays) <= 0 ? 0 : Number(obj.tertianDays) >= 30 ? 30 : obj.tertianDays
    }
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
