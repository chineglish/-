<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-new-form
      ref="mNewForm"
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @submit="onSubmit"
      @changeUpTrs="(res) => changeUp(res, 'limitTrs')"
      @changeUpDay="(res) => changeUp(res, 'limitDay')"
      @changeUpMon="(res) => changeUp(res, 'limitMon')"
      @changeUpYear="(res) => changeUp(res, 'limitYear')"
      @changeUpDayCount="(res) => changeUp(res, 'limitDayCount')"
      @changeUpMonCount="(res) => changeUp(res, 'limitMonCount')"
      @changeUpYearCount="(res) => changeUp(res, 'limitYearCount')"
      @back="back">
    </m-new-form>
  </d2-container>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, trans_type_code } from '@/assets/js/entity'
export default {
  name: '',
  data: function () {
    return {
      fromWhere: '',
      data: ['企业管理台', '限额管理', '限额设置'],
      formModel: {
        acNo: '',
        acName: '',
        currency: '',
        transTypeCode: '',
        limitTrs: '',
        limitDay: '',
        limitMon: '',
        limitYear: '',
        limitDayCount: '',
        limitMonCount: '',
        limitYearCount: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          limitTrs: [{ required: true, message: '请填写单笔累计', trigger: 'submit' }],
          limitDay: [{ required: true, message: '请填写日累计限额', trigger: 'submit' }],
          limitMon: [{ required: true, message: '请填写月累计限额', trigger: 'submit' }],
          limitYear: [{ required: true, message: '请填写年累计限额', trigger: 'submit' }],
          limitDayCount: [{ required: true, message: '请填写日累计笔数', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              this.$refs.mNewForm.$data.form.limitDayCount = value.replace(/[^0-9]/g, '')
              callback()
            },
            trigger: 'change' }
          ],
          limitMonCount: [{ required: true, message: '请填写月累计笔数', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              this.$refs.mNewForm.$data.form.limitMonCount = value.replace(/[^0-9]/g, '')
              callback()
            },
            trigger: 'change' }],
          limitYearCount: [{ required: true, message: '请填写年累计笔数', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              this.$refs.mNewForm.$data.form.limitYearCount = value.replace(/[^0-9]/g, '')
              callback()
            },
            trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '40%',
            group: [
              {
                'disabled': true,
                'label': '账号',
                'type': 'text',
                'key': 'acNo'
              },
              {
                'disabled': true,
                'label': '账户名称',
                'type': 'text',
                'key': 'acName'
              },
              {
                'disabled': true,
                'label': '币种',
                'type': 'text',
                'key': 'currency',
                formatter: (name, value) => util.handleEnums(currency_type, value)
              },
              {
                'disabled': true,
                'label': '限额名称',
                'type': 'text',
                'key': 'transTypeCode',
                formatter: (name, value) => util.handleEnums(trans_type_code, value)
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '40%',
            title: '限额信息',
            group: [
              {
                'disabled': false,
                'label': '单笔限额（元）',
                inputType: 'money',
                'inputEventName': 'changeUpTrs',
                'type': 'input',
                'key': 'limitTrs'
              },
              {
                'disabled': false,
                'label': '日累计限额（元）',
                'inputEventName': 'changeUpDay',
                inputType: 'money',
                'type': 'input',
                'key': 'limitDay'
              },
              {
                'disabled': false,
                'label': '月累计限额（元）',
                'inputEventName': 'changeUpMon',
                inputType: 'money',
                'type': 'input',
                'key': 'limitMon'
              },
              {
                'disabled': false,
                inputType: 'money',
                'label': '年累计限额（元）',
                'inputEventName': 'changeUpYear',
                'type': 'input',
                'key': 'limitYear'
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '40%',
            title: '笔数信息',
            group: [
              {
                'disabled': false,
                'label': '日累计笔数',
                inputType: 'int',
                'inputEventName': 'changeUpDayCount',
                'type': 'input',
                'key': 'limitDayCount'
              }, {
                'disabled': false,
                'label': '月累计笔数',
                inputType: 'int',
                'inputEventName': 'changeUpMonCount',
                'type': 'input',
                'key': 'limitMonCount'
              }, {
                'disabled': false,
                'label': '年累计笔数',
                inputType: 'int',
                'inputEventName': 'changeUpYearCount',
                'type': 'input',
                'key': 'limitYearCount'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    changeUp (res, key) {
      res[key] = util.limitInputMoney(res[key])
    },
    // 确认
    onSubmit (formModel) {
      let req = {
        acNo: formModel.payerAcNoList[formModel.accountNo].acNo,
        productId: formModel.productId,
        transTypeCode: formModel.transTypeCode,
        limitTrs: formModel.limitTrs,
        limitDay: formModel.limitDay,
        limitDayCount: formModel.limitDayCount,
        limitMon: formModel.limitMon,
        limitMonCount: formModel.limitMonCount,
        limitYear: formModel.limitYear,
        limitYearCount: formModel.limitYearCount
        // acName: formModel.acName
      }
      httpPost('/eweb-enterprise.CifAcLimitSetConfirm.do', req).then(res => {
        let data = this.$route.params.data
        let tableData = this.$route.params.tableData
        this.$router.push({
          name: 'quotaUpdateConfirm',
          params: {
            ...res,
            fromWhere: this.fromWhere,
            data: data,
            formModel: formModel,
            tableData: tableData
          }
        })
      })
    },
    // 返回
    back () {
      let data = this.$route.params.data
      let formModel = this.$route.params.formModel
      let tableData = this.$route.params.tableData
      this.$router.push({
        name: 'quotaManage',
        params: {
          data: data,
          formModel: formModel,
          tableData: tableData
        }
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.fromWhere = this.$route.params.fromWhere
      this.formModel = this.$route.params.formModel
      this.formModel.acNo = this.formModel.payerAcNoList[this.formModel.accountNo].accountNoShow
      this.formModel.acName = this.formModel.payerAcNoList[this.formModel.accountNo].acName
      this.formModel.currency = this.formModel.currency
      this.formModel.productId = this.$route.params.data.productId
      this.formModel.transTypeCode = this.$route.params.data.transTypeCode
      this.formModel.limitTrs = this.$route.params.data.limitTrs
      this.formModel.limitDay = this.$route.params.data.limitDay
      this.formModel.limitMon = this.$route.params.data.limitMon
      this.formModel.limitYear = this.$route.params.data.limitYear
      this.formModel.limitDayCount = this.$route.params.data.limitDayCount
      this.formModel.limitMonCount = this.$route.params.data.limitMonCount
      this.formModel.limitYearCount = this.$route.params.data.limitYearCount
    }
  }
}
</script>
