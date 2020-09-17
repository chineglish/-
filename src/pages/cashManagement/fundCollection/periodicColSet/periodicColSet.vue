<template>
  <div class="assets-debt">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div style="clear: both"></div>
    <m-new-form :componentJson="formConfigJson" :btnData="btnData" :formModel="formModel" @inquire="inquire"
      @reset="reset" @selectAcc="selectAcc">
    </m-new-form>
    <div class="search-result" v-if="showResult">
      <div class="search-result-title fs20">
        <span>设置</span>
      </div>
      <template>
        <el-tabs v-model="activeName">
          <el-tab-pane label="上存规则" name="0">
            <upload-rule ref="uploadRule" :propData="propData"></upload-rule>
          </el-tab-pane>
          <el-tab-pane label="上存周期" name="1">
            <upload-cycle ref="uploadCycle" :propData="propData"></upload-cycle>
          </el-tab-pane>
          <el-tab-pane label="下拨规则" name="2">
            <dial-down-rule ref="dialDownRule" :propData="propData"></dial-down-rule>
          </el-tab-pane>
          <el-tab-pane label="下拨周期" name="3">
            <dial-down-cycle ref="dialDownCycle" :propData="propData"></dial-down-cycle>
          </el-tab-pane>
        </el-tabs>
      </template>
      <m-new-form :btnData="btnData1" @onSubmit="onSubmit" @onReset="onReset"></m-new-form>
    </div>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import uploadRule from './components/uploadRule'
import uploadCycle from './components/uploadCycle'
import dialDownRule from './components/dialDownRule'
import dialDownCycle from './components/dialDownCycle'
import util from '@/libs/util'
import {
  currency_type
} from '@/assets/js/entity'
export default {
  name: 'periodicColSet',
  components: {
    uploadRule,
    uploadCycle,
    dialDownRule,
    dialDownCycle
  },
  data () {
    return {
      propData: {},
      diaRules: {},
      payerAccNoList: [], // 付款账户信息列表
      activeName: '0',
      // 面包屑导航
      breadData: ['现金管理', '资金归集', '定时归集设置'],
      showResult: false,
      formModel: {
        acNo: '',
        currency: '',
        acName: '',
        payerAcNoShow: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          accountNo: [{
            required: false,
            message: '',
            trigger: 'change'
          }]
        },
        formItems: [{
          // title: '到账通知单',
          formWidth: '50%',
          labelWidth: '30%',
          title: '定时归集查询',
          showSeparate: true,
          group: [{
            'disabled': false,
            'label': '账户',
            'type': 'select',
            'options': [],
            'trans': {
              'value': 'payerAcNoShow',
              'key': 'acNo'
            },
            'key': 'acNo',
            'changeEventName': 'selectAcc'
          },
          {
            'disabled': false,
            'label': '币种',
            'type': 'text',
            'key': 'currency',
            formatter: (key, value) => util.handleEnums(currency_type, value)
          },
          {
            'disabled': false,
            'label': '户名',
            'type': 'text',
            'key': 'acName'
          }
          ]
        }]
      },
      btnData: [{
        btnText: '查询',
        class: 'm-submit-btn',
        clickEventName: 'inquire'
      },
      {
        btnText: '重置',
        class: 'm-cancel-btn',
        clickEventName: 'reset'
      }
      ],
      btnData1: [{
        btnText: '提交',
        class: 'm-submit-btn',
        clickEventName: 'onSubmit'
      },
      {
        btnText: '重置',
        class: 'm-cancel-btn',
        clickEventName: 'onReset'
      }
      ]
    }
  },
  methods: {
    onSubmit () {
      let uploadRuleObj = this.$refs.uploadRule.formModel
      let dialDownRuleObj = this.$refs.dialDownRule.formModel
      let uploadCycleObj = this.$refs.uploadCycle.onSubmit()
      let dialDownCycleObj = this.$refs.dialDownCycle.onSubmit()
      let params = {
        ...this.propData,
        ...uploadRuleObj,
        ...dialDownRuleObj,
        ...dialDownCycleObj,
        ...uploadCycleObj
      }
      params = Object.assign(
        params, {
          currencyCode: this.formModel.currency,
          acNo: this.formModel.acNo
        }
      )
      // 上存周期时间验证
      let flag1 = null
      for (let i = 0; i < params.timeCode.length; i++) {
        if (!params.timeCode[i]) {
          flag1 = false
        } else if (flag1 !== null && !flag1 && params.timeCode[i]) {
          flag1 = true
          break
        }
      }
      if (flag1) {
        this.$msg('请按顺序设置上存周期时间')
        return
      }
      if (!params.timeCode[0]) {
        this.$msg('请选择上存周期时间')
        return
      }
      for (let i = 1; i < params.timeCode.length; i++) {
        if (params.timeCode[i] && params.timeCode[i - 1] > params.timeCode[i]) {
          this.$msg(`上存周期，时间${i + 1}必须大于时间${i}`)
          return
        }
      }
      // 下拨周期时间验证
      let flag2 = null
      for (let i = 0; i < params.dTimeCode.length; i++) {
        if (!params.dTimeCode[i]) {
          flag2 = false
        } else if (flag2 !== null && !flag2 && params.dTimeCode[i]) {
          flag2 = true
          break
        }
      }
      if (flag2) {
        this.$msg('请按顺序设置下拨周期时间')
        return
      }
      if (!params.dTimeCode[0]) {
        this.$msg('请选择下拨周期时间')
        return
      }
      for (let i = 1; i < params.dTimeCode.length; i++) {
        if (params.dTimeCode[i] && params.dTimeCode[i - 1] > params.dTimeCode[i]) {
          this.$msg(`下拨周期，时间${i + 1}必须大于时间${i}`)
          return
        }
      }
      // params.timeCode.forEach((item, index) => {
      //   params.timeCode[index] = item || '000000'
      // })
      // params.dTimeCode.forEach((item, index) => {
      //   params.dTimeCode[index] = item || '000000'
      // })
      const params1 = JSON.parse(JSON.stringify(params))
      let percent = params.upPercent.substr(0, params.upPercent.length - 1)
      percent = (parseFloat(percent) / 100).toString()
      let decimal = percent.split('.')
      console.log(decimal)
      if (decimal.length > 0) {
        decimal = decimal[1] || ''
        for (let i = decimal.length; i < 5; i++) {
          percent = percent + '0'
        }
      } else {
        percent = 0.00000
      }
      params.upPercent = percent
      params.objectAmt = '0.00'
      params.upAmt = '0.00'
      httpPost('/eweb-cash.TimingCollectSetConfirm.do', params).then(res => {
        this.$router.push({
          name: 'periodicColSetConf',
          params: {
            _Data2Sign: res._Data2Sign,
            _authenticateType: res._authenticateType,
            _dataMapKey: res._dataMapKey,
            currencyCode: this.formModel.currency,
            acNo: this.formModel.acNo,
            acName: this.formModel.acName,
            data: params,
            ...params1
          }
        })
      })
    },
    onReset () {
      let arr = ['uploadRule', 'uploadCycle', 'dialDownRule', 'dialDownCycle']
      this.$refs[arr[this.activeName]].reset()
    },
    /**
       * 交易账户获取
       */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', {
        TransCode: 'TimingCollectSet'
      }).then(res => {
        let list = res.AcList.length > 0 ? res.AcList : []
        if (list.length > 0) {
          list.forEach(item => {
            item.payerAcNoShow = util.getPayerAccount(item)
          })
        }
        this.formConfigJson.formItems[0].group[0].options = list
        this.payerAccNoList = list
        this.selectAcc(this.formModel, this.payerAccNoList[0])
        // this.formModel = this.payerAccNoList[0]
      })
    },
    /**
       * 显示选择账户的余额与账户名称
       */
    selectAcc (data, obj) {
      this.$set(data, 'acNo', obj.acNo)
      this.$set(data, 'currency', obj.currency)
      this.$set(data, 'acName', obj.acName)
    },
    reset (res) {
      this.formModel = res
      this.selectAcc(res, this.payerAccNoList[0])
      this.showResult = false
    },
    // 查询
    inquire (data) {
      const params = {
        acNo: data.acNo,
        currencyCode: data.currency
      }
      httpPost('/eweb-cash.TimingCollectQry.do', params).then(res => {
        this.propData = res.list[0]
        this.showResult = true
      })
    }
  },
  created () {
    this.accNoListQry()
  }
}
</script>

<style lang="scss" scoped>
  .search-result {
    width: 100%;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.20);
    margin: 20px 0px;
    .search-result-title {
      padding-left: 30px;
      line-height: 60px;
      font-weight: bold;
      color: #333333;
      span {
        margin-left: 10px;
        padding-left: 5px;
        border-left: #d41618 8px solid;
      }
    }
    .search-result-content {
      .queryDate {
        width: 100%;
        tr {
          text-align: center;
          td {
            height: 50px;
          }
          .icon {
            text-align: right
          }
        }
      }
    }
  }
</style>
