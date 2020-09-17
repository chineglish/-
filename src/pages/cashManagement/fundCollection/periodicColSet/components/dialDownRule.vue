<template>
    <d2-container>
        <m-new-form
          :componentJson="formConfigJson"
          :formModel="formModel"
          @dialDownSave="dialDownSave"
          @dialDownMethod="dialDownMethod"
          @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
          @changeLowMoney="changeLowMoney"
          @changeFixedAmt="changeFixedAmt"
        >
        </m-new-form>
    </d2-container>
</template>
<script>
import util from '@/libs/util'
import _ from 'lodash'

export default {
  name: 'dialDownRule',
  props: {
    propData: {
      default: () => {},
      type: Object
    }
  },
  data () {
    return {
      formModel: {
        fundDirect: '2',
        downMode: '01',
        downLowAmt: '0.00',
        downAmt: '0.00'
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '是否下拨',
                'type': 'select',
                'options': [
                  { 'value': '否', 'key': '1' },
                  { 'value': '是', 'key': '2' }
                ],
                'key': 'fundDirect',
                'changeEventName': 'dialDownSave'
              },
              {
                'disabled': true,
                'label': '下拨方式',
                'type': 'select',
                'options': [
                  { 'value': '留存下拨', 'key': '01' },
                  { 'value': '定额下拨', 'key': '02' }
                ],
                'key': 'downMode',
                'changeEventName': 'dialDownMethod'
              },
              {
                'disabled': true,
                'label': '留存金额',
                'type': 'input',
                'key': 'downLowAmt',
                inputType: 'money',
                keydownEventName: 'limitMoneyInputKeyDown',
                'inputEventName': 'changeLowMoney'
              },
              {
                'disabled': true,
                'label': '下拨金额',
                'type': 'input',
                'key': 'downAmt',
                // maxlength: 13,
                inputType: 'money',
                keydownEventName: 'limitMoneyInputKeyDown',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                'inputEventName': 'changeFixedAmt'
              }
            ]
          }
        ]
      },
      backupFormModel: {}
    }
  },
  methods: {
    reset () {
      this.dialDownSave(this.backupFormModel)
    },
    dialDownSave (res) {
      // this.formModel = _.cloneDeep(this.backupFormModel)
      Object.assign(this.formModel, res)
      if (this.formModel.downAmtcopy) {
        this.formModel.downAmtcopy = this.backupFormModel.downAmt
      }
      if (this.formModel.downLowAmtcopy) {
        this.formModel.downLowAmtcopy = this.backupFormModel.downLowAmt
      }
      this.formModel.fundDirect = res.fundDirect
      switch (res.fundDirect) {
        case '1':
          this.formConfigJson.formItems[0].group[1].disabled = true // 下拨方式
          this.formConfigJson.formItems[0].group[2].disabled = true // 下拨最低留存金额
          this.formConfigJson.formItems[0].group[3].disabled = true // 拨定额金额
          break
        case '2':
          this.formConfigJson.formItems[0].group[1].disabled = false // 下拨方式
          this.dialDownMethod(this.formModel)
          break
      }
    },
    dialDownMethod (res) {
      this.formModel = res
      this.formModel.downAmt = '0.00'
      this.formModel.downLowAmt = '0.00'
      switch (res.downMode) {
        case '01':
          this.formConfigJson.formItems[0].group[2].disabled = false // 下拨最低留存金额
          this.formConfigJson.formItems[0].group[3].disabled = true // 拨定额金额
          break
        case '02':
          this.formConfigJson.formItems[0].group[2].disabled = true // 下拨最低留存金额
          this.formConfigJson.formItems[0].group[3].disabled = false // 拨定额金额
          break
      }
    },
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeLowMoney (res) {
      this.formModel = res
      res.downLowAmt = util.limitInputMoney(res.downLowAmt)
    },
    changeFixedAmt (res) {
      this.formModel = res
      res.downAmt = util.limitInputMoney(res.downAmt)
    }
  },
  created () {
    if (this.propData['fundDirect']) {
      this.$set(this.formModel, 'fundDirect', this.propData.fundDirect || '2')
      this.$set(this.formModel, 'downMode', this.propData.downMode || '01')
      this.$set(this.formModel, 'downLowAmt', this.propData.downLowAmt || '0.00')
      this.$set(this.formModel, 'downAmt', this.propData.downAmt || '0.00')
    } else {
      this.$set(this.formModel, 'fundDirect', '2')
      this.$set(this.formModel, 'downMode', '01')
      this.$set(this.formModel, 'downLowAmt', '0.00')
      this.$set(this.formModel, 'downAmt', '0.00')
    }
    switch (this.formModel.fundDirect) {
      case '1':
        this.formConfigJson.formItems[0].group[1].disabled = true // 下拨方式
        this.formConfigJson.formItems[0].group[2].disabled = true // 下拨最低留存金额
        this.formConfigJson.formItems[0].group[3].disabled = true // 拨定额金额
        break
      case '2':
        this.formConfigJson.formItems[0].group[1].disabled = false // 下拨方式
        this.formConfigJson.formItems[0].group[2].disabled = true // 下拨最低留存金额
        this.formConfigJson.formItems[0].group[3].disabled = true // 拨定额金额
        break
    }
    switch (this.formModel.downMode) {
      case '01':
        this.formConfigJson.formItems[0].group[2].disabled = false // 下拨最低留存金额
        this.formConfigJson.formItems[0].group[3].disabled = true // 拨定额金额
        break
      case '02':
        this.formConfigJson.formItems[0].group[2].disabled = true // 下拨最低留存金额
        this.formConfigJson.formItems[0].group[3].disabled = false // 拨定额金额
        break
    }
    this.backupFormModel = _.cloneDeep(this.formModel)
  }
}
</script>
