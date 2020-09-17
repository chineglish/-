<template>
    <d2-container>
        <m-new-form
          ref="form"
          :componentJson="formConfigJson"
          :formModel="formModel"
          @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
          @changeUp="changeUp"
          @changeMiniRetAmt="changeMiniRetAmt"
          @batchUpColMethod="batchUpColMethod"
          @changeHighestBal="changeHighestBal"
          @getData="getData"
          @changeUpPercent="changeUpPercent"
        ></m-new-form>
    </d2-container>
</template>
<script>
import util from '@/libs/util'
import _ from 'lodash'

export default {
  name: 'uploadRule',
  props: {
    propData: {
      default: () => {},
      type: Object
    }
  },
  data () {
    return {
      formModel: {
        gatherMode: '',
        hightAmt: '0.00',
        upPercent: '',
        fullUnit: '',
        pileAmtFlag: '',
        maxBal: '0.00',
        uppDownFlag: '',
        lowAmt: '0.00'
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '上存方式',
                'type': 'select',
                'options': [
                  { 'value': '比例上存(账户余额)', 'key': '01' },
                  // { 'value': '比例上存()', 'key': '01' },
                  { 'value': '取整上存', 'key': '02' },
                  { 'value': '限额上存', 'key': '03' },
                  { 'value': '全额上存', 'key': '04' },
                  { 'value': '超限额全额上存', 'key': '05' },
                  { 'value': '比例上存(自身余额)', 'key': '07' }
                ],
                'key': 'gatherMode',
                'changeEventName': 'batchUpColMethod'
              },
              {
                'disabled': false,
                'label': '最高限额',
                'type': 'input',
                'key': 'hightAmt',
                'changeEventName': 'batchUpCeiling',
                // maxlength: 13,
                inputType: 'money',
                keydownEventName: 'limitMoneyInputKeyDown',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                'inputEventName': 'changeUp'
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '上存比例',
                'type': 'input',
                'key': 'upPercent',
                'inputEventName': 'getData',
                changeEventName: 'changeUpPercent'
              },
              {
                'disabled': true,
                'label': '取整单位',
                'type': 'input',
                'key': 'fullUnit',
                'inputEventName': 'getData'
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '最高累计上存标志',
                'type': 'select',
                'key': 'pileAmtFlag',
                'options': [
                  { 'value': '否', 'key': '0' },
                  { 'value': '是', 'key': '1' }
                ],
                'changeEventName': 'getData'
              },
              {
                'disabled': true,
                'label': '最高累计上存余额',
                'type': 'input',
                'key': 'maxBal',
                // maxlength: 13,
                inputType: 'money',
                keydownEventName: 'limitMoneyInputKeyDown',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                'inputEventName': 'changeHighestBal'
              },
              {
                'disabled': false,
                'label': '上存保留最低留存',
                'type': 'select',
                'key': 'uppDownFlag',
                'options': [
                  { 'value': '否', 'key': '0' },
                  { 'value': '是', 'key': '1' }
                ],
                'changeEventName': 'getData'
              },
              {
                'disabled': true,
                'label': '最低留存金额',
                'type': 'input',
                'key': 'lowAmt',
                // maxlength: 13,
                inputType: 'money',
                keydownEventName: 'limitMoneyInputKeyDown',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                'inputEventName': 'changeMiniRetAmt'
              }
            ]
          }
        ]
      },
      backupFormModel: {},
      backupData: {}
    }
  },
  methods: {
    reset () {
      this.batchUpColMethod(this.backupFormModel)
    },
    batchUpColMethod (res) {
      Object.assign(this.formModel, res)
      if (this.formModel.hightAmtcopy) {
        this.formModel.hightAmtcopy = this.backupFormModel.hightAmt
      }
      if (this.formModel.lowAmtcopy) {
        this.formModel.lowAmtcopy = this.backupFormModel.lowAmt
      }
      if (this.formModel.maxBalcopy) {
        this.formModel.maxBalcopy = this.backupFormModel.maxBal
      }
      this.$set(this.formModel, 'gatherMode', res.gatherMode)
      this.$set(this.formModel, 'uppDownFlag', ['04', '05'].includes(res.gatherMode) ? '' : '0')
      this.$set(this.formModel, 'pileAmtFlag', res.gatherMode === '03' ? '0' : '')
      this.initOperating(res.gatherMode)
    },
    getData (res, val) {
      this.formModel = res
      this.$set(this.formModel, 'upPercent', res.upPercent.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^0{1,}./, '0.'))
      // this.$set(this.formModel, 'upPercent', this.formModel.upPercent + '%')
      this.formConfigJson.formItems[2].group[1].disabled = !Number(res.pileAmtFlag)
      this.formConfigJson.formItems[2].group[3].disabled = !Number(res.uppDownFlag)
    },
    changeUpPercent (res) {
      this.$set(this.formModel, 'upPercent', util.formatCurrency(res.upPercent) + '%')
    },
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      this.getData(res)
      res.hightAmt = util.limitInputMoney(res.hightAmt)
    },
    changeHighestBal (res) {
      this.getData(res)
      res.maxBal = util.limitInputMoney(res.maxBal)
    },
    changeMiniRetAmt (res) {
      this.getData(res)
      res.lowAmt = util.limitInputMoney(res.lowAmt)
    },
    initOperating (val) {
      this.$nextTick(() => {
        switch (val) {
          case '01': // 比例上存(账户余额)
            this.formConfigJson.formItems[0].group[1].disabled = false // 最高限额
            this.formConfigJson.formItems[1].group[0].disabled = false // 上存比例
            this.formConfigJson.formItems[2].group[2].disabled = false // 上存保留最低留存
            this.formConfigJson.formItems[1].group[1].disabled = true // 取整单位
            this.$set(this.formModel, 'fullUnit', '0')
            this.formConfigJson.formItems[2].group[0].disabled = true // 最高累计上存标志
            this.$set(this.formModel, 'pileAmtFlag', '0')
            this.formConfigJson.formItems[2].group[1].disabled = true // 最高累计上存余额
            this.$set(this.formModel, 'maxBal', '0.00')
            this.formConfigJson.formItems[2].group[3].disabled = true // 最低留存金额
            this.$set(this.formModel, 'lowAmt', '0.00')
            break
          case '02': // 取整上存
            this.formConfigJson.formItems[0].group[1].disabled = false // 最高限额
            this.formConfigJson.formItems[1].group[1].disabled = false // 取整单位
            this.formConfigJson.formItems[2].group[2].disabled = false // 上存保留最低留存
            this.formConfigJson.formItems[1].group[0].disabled = true // 上存比例
            this.$set(this.formModel, 'upPercent', '0.00%')
            this.formConfigJson.formItems[2].group[0].disabled = true // 最高累计上存标志
            this.$set(this.formModel, 'pileAmtFlag', '0')
            this.formConfigJson.formItems[2].group[1].disabled = true // 最高累计上存余额
            this.$set(this.formModel, 'maxBal', '0.00')
            this.formConfigJson.formItems[2].group[3].disabled = true // 最低留存金额
            this.$set(this.formModel, 'lowAmt', '0.00')
            break
          case '03': // 限额上存
            this.formConfigJson.formItems[0].group[1].disabled = false // 最高限额
            this.formConfigJson.formItems[2].group[0].disabled = false // 最高累计上存标志
            this.formConfigJson.formItems[2].group[2].disabled = false // 上存保留最低留存
            // this.formConfigJson.formItems[0].group[1].disabled = true // 最高限额
            this.formConfigJson.formItems[1].group[0].disabled = true // 上存比例
            this.$set(this.formModel, 'upPercent', '0.00%')
            this.formConfigJson.formItems[1].group[1].disabled = true // 取整单位
            this.$set(this.formModel, 'fullUnit', '0')
            this.formConfigJson.formItems[2].group[1].disabled = true // 最高累计上存余额
            this.$set(this.formModel, 'maxBal', '0.00')
            this.formConfigJson.formItems[2].group[3].disabled = true // 最低留存金额
            this.$set(this.formModel, 'lowAmt', '0.00')
            break
          case '04': // 全额上存
            this.formConfigJson.formItems[0].group[1].disabled = true // 最高限额
            this.$set(this.formModel, 'hightAmt', '0.00')
            this.formConfigJson.formItems[1].group[0].disabled = true // 上存比例
            this.$set(this.formModel, 'upPercent', '0.00%')
            this.formConfigJson.formItems[1].group[1].disabled = true // 取整单位
            this.$set(this.formModel, 'fullUnit', '0')
            this.formConfigJson.formItems[2].group[0].disabled = true // 最高累计上存标志
            this.$set(this.formModel, 'pileAmtFlag', '0')
            this.formConfigJson.formItems[2].group[1].disabled = true // 最高累计上存余额
            this.$set(this.formModel, 'maxBal', '0.00')
            this.formConfigJson.formItems[2].group[2].disabled = true // 上存保留最低留存
            this.$set(this.formModel, 'uppDownFlag', '0')
            this.formConfigJson.formItems[2].group[3].disabled = true // 上存保留最低留存
            this.$set(this.formModel, 'lowAmt', '0.00')
            break
          case '05': // 超限额全额上存
            this.formConfigJson.formItems[0].group[1].disabled = false // 最高限额
            this.formConfigJson.formItems[1].group[0].disabled = true // 上存比例
            this.$set(this.formModel, 'upPercent', '0.00%')
            this.formConfigJson.formItems[2].group[2].disabled = true // 上存保留最低留存
            this.$set(this.formModel, 'uppDownFlag', '0')
            this.formConfigJson.formItems[1].group[1].disabled = true // 取整单位
            this.$set(this.formModel, 'fullUnit', '0')
            this.formConfigJson.formItems[2].group[0].disabled = true // 最高累计上存标志
            this.$set(this.formModel, 'pileAmtFlag', '0')
            this.formConfigJson.formItems[2].group[1].disabled = true // 最高累计上存余额
            this.$set(this.formModel, 'maxBal', '0.00')
            this.formConfigJson.formItems[2].group[3].disabled = true // 最低留存金额
            this.$set(this.formModel, 'lowAmt', '0.00')
            break
          case '07': // 比例上存(自身余额)
            this.formConfigJson.formItems[0].group[1].disabled = false // 最高限额
            this.formConfigJson.formItems[1].group[0].disabled = false // 上存比例
            this.formConfigJson.formItems[2].group[2].disabled = false // 上存保留最低留存
            this.formConfigJson.formItems[1].group[1].disabled = true // 取整单位
            this.$set(this.formModel, 'fullUnit', '0')
            this.formConfigJson.formItems[2].group[0].disabled = true // 最高累计上存标志
            this.$set(this.formModel, 'pileAmtFlag', '0')
            this.formConfigJson.formItems[2].group[1].disabled = true // 最高累计上存余额
            this.$set(this.formModel, 'maxBal', '0.00')
            this.formConfigJson.formItems[2].group[3].disabled = true // 最低留存金额
            this.$set(this.formModel, 'lowAmt', '0.00')
            break
        }
      })
    }
  },
  created () {
    this.backupData = _.cloneDeep(this.propData)
    for (let key in this.formModel) {
      if (this.backupData['gatherMode']) {
        this.$set(this.formModel, key, this.backupData[key])
        if (this.formModel.upPercent) {
          this.$set(this.formModel, 'upPercent', this.backupData.upPercent * 100 + '%')
        } else {
          this.$set(this.formModel, 'upPercent', '0.00%')
        }
      } else {
        this.$set(this.formModel, 'gatherMode', '04')
        this.$set(this.formModel, 'upPercent', '0.00%')
        this.$set(this.formModel, 'pileAmtFlag', '0')
        this.$set(this.formModel, 'hightAmt', '0.00')
        this.$set(this.formModel, 'fullUnit', '0')
        this.$set(this.formModel, 'maxBal', '0.00')
        this.$set(this.formModel, 'lowAmt', '0.00')
        this.$set(this.formModel, 'uppDownFlag', '0')
      }
    }
    this.backupFormModel = _.cloneDeep(this.formModel)
    this.initOperating(this.backupFormModel.gatherMode)
  }
}
</script>
