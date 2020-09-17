<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <d-form-previewer
      :form-struction="formStruction"
      :form-model="formModel"
      :action-data="actionData"
      :config="config">
    </d-form-previewer>
  </d2-container>
</template>

<script type="text/javascript">
import util from '@/libs/util'
import { currency_type, trans_type_code } from '@/assets/js/entity'
export default {
  name: '',
  data: function () {
    return {
      config: {
        columns: 2
      },
      data: ['企业管理台', '限额管理', '限额设置查询'],
      formModel: {
        payerAcNoList: [],
        acNo: '', // 银行账号
        acName: '', // 账户名称
        currency: '', // 币种
        transTypeCode: '', // 限额名称

        limitTrs: '',
        limitDay: '',
        limitMon: '',
        limitYear: '',
        limitDayCount: '',
        limitMonCount: '',
        limitYearCount: '',

        runtimeLimitTrs: '', // 已用单笔
        runtimeLimitDay: '', // 已用日累计
        runtimeLimitMon: '', // 已用月累计
        runtimeLimitYear: '', // 已用年累计
        runtimeLimitDayCount: '',
        runtimeLimitMonCount: '',
        runtimeLimitYearCount: '' // 已用年累计必输
      },
      formStruction: {
        labelWidth: '24%',
        groups: [
          {
            formItems: [
              { label: '账号', fieldName: 'acNo' },
              { label: '户名', fieldName: 'acName' },
              { label: '币种', fieldName: 'currency', formatter: (key, value) => util.handleEnums(currency_type, value) },
              { label: '限额名称', fieldName: 'transTypeCode', formatter: (key, value) => util.handleEnums(trans_type_code, value) }
            ]
          },
          {
            title: '限额信息',
            formItems: [
              { label: '日累计限额(元)', fieldName: 'limitDay', formatter: (key, value) => util.formatCurrency(value) },
              { label: '日累计支出额(元)', fieldName: 'runtimeLimitDay', formatter: (key, value) => util.formatCurrency(value) },
              { label: '月累计限额(元)', fieldName: 'limitMon', formatter: (key, value) => util.formatCurrency(value) },
              { label: '月累计支出额(元)', fieldName: 'runtimeLimitMon', formatter: (key, value) => util.formatCurrency(value) },
              { label: '年累计限额(元)', fieldName: 'limitYear', formatter: (key, value) => util.formatCurrency(value) },
              { label: '年累计支出额(元)', fieldName: 'runtimeLimitYear', formatter: (key, value) => util.formatCurrency(value) },
              { label: '单笔限额(元)', fieldName: 'limitTrs', formatter: (key, value) => util.formatCurrency(value) }
            ]
          },
          {
            title: '笔数信息',
            formItems: [
              { label: '日累计笔数', fieldName: 'limitDayCount' },
              { label: '日累计支出笔数', fieldName: 'runtimeLimitDayCount' },
              { label: '月累计笔数', fieldName: 'limitMonCount' },
              { label: '月累计支出笔数', fieldName: 'runtimeLimitMonCount' },
              { label: '年累计笔数', fieldName: 'limitYearCount' },
              { label: '年累计支出笔数', fieldName: 'runtimeLimitYearCount' }
            ]
          }
        ]
      },
      actionData: [
        { btnText: '修改', class: 'm-submit-btn', handler: this.submitHandler },
        { btnText: '返回', class: 'm-cancel-btn', handler: this.backHandler }
      ]
    }
  },
  methods: {
    // 修改
    submitHandler () {
      let data = this.$route.params.data
      let formModel = this.$route.params.formModel
      let tableData = this.$route.params.tableData
      this.$router.push({
        name: 'quotaUpdateInput',
        params: {
          fromWhere: 'quotaManageDetail',
          data: data,
          formModel: formModel,
          tableData: tableData
        }
      })
    },
    // 返回
    backHandler () {
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
    if (this.getUser().adminUser) {
      this.actionData = [
        { btnText: '修改', class: 'm-submit-btn', handler: this.submitHandler },
        { btnText: '返回', class: 'm-cancel-btn', handler: this.backHandler }
      ]
    } else {
      this.actionData = [
        { btnText: '返回', class: 'm-cancel-btn', handler: this.backHandler }
      ]
    }
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      this.formModel.limitTrs = this.$route.params.data.limitTrs
      this.formModel.limitDay = this.$route.params.data.limitDay
      this.formModel.limitMon = this.$route.params.data.limitMon
      this.formModel.limitYear = this.$route.params.data.limitYear
      this.formModel.limitDayCount = this.$route.params.data.limitDayCount
      this.formModel.limitMonCount = this.$route.params.data.limitMonCount
      this.formModel.limitYearCount = this.$route.params.data.limitYearCount
      this.formModel.acNo = this.$route.params.data.acNo
      this.formModel.acName = this.formModel.payerAcNoList[this.formModel.accountNo].acName
      this.formModel.transTypeCode = this.$route.params.data.transTypeCode
      this.formModel.productId = this.$route.params.data.productId
    }
  }
}
</script>
