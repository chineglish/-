<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <d-form-previewer
      :form-struction="formStruction"
      :form-model="formModel"
      :action-data="actionData"
      :config="config"
      >
    </d-form-previewer>
  </div>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: '',
  data: function () {
    return {
      data: ['贷款业务', '企业融资申请确认'],
      stepsActive: 1,
      config: {
        columns: 2
      },
      formStruction: {
        groups: [
          {
            formItems: [
              { label: '企业名称', fieldName: 'enterpriseName' },
              { label: '联系人', fieldName: 'accountName' },
              { label: '联系人手机', fieldName: 'phoneNumber' },
              { label: '联系电话', fieldName: 'telNumber' },
              { label: '申请授信金额', fieldName: 'applicationAmount', formatter: (name, value) => util.formatCurrency(value) + '万' },
              { label: '期限', fieldName: 'timeLimit', formatter: (name, value) => value + '月' },
              { label: '用途', fieldName: 'useMode' },
              { label: '意向申办机构', fieldName: 'intendedSponsor' }
            ]
          }
        ]
      },
      formModel: {
        enterpriseName: '',
        accountName: '',
        phoneNumber: '',
        telNumber: '',
        applicationAmount: '',
        timeLimit: '',
        useMode: '',
        intendedSponsor: ''
      },
      actionData: [
        { btnText: '确定', class: 'm-submit-btn', handler: this.printHandler },
        { btnText: '返回', class: 'm-cancel-btn', handler: this.backHandler }
      ]
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
    }
  },
  methods: {
    printHandler (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        const params = {
          _tokenName: token._tokenName,
          entName: data.enterpriseName,
          contactName: data.accountName,
          cellMobile: data.phoneNumber,
          telephone: data.telNumber,
          applyAmt: data.applicationAmount,
          expire: data.timeLimit,
          purpose: data.useMode,
          appdept: data.intendedSponsor,
          _dataMapKey: this.$route.params.res._dataMapKey
        }
        httpPost('/eweb-query.EntFinApply.do', params).then(res => {
          data.JnlStatus = '1'
          this.$router.push({
            name: 'enterpriseFinancingRes',
            params: { formModel: data, res: res }
          })
        })
      })
    },
    backHandler (data) {
      this.$router.push({
        name: 'enterpriseFinancingApplication',
        params: data
      })
    }
  }
}
</script>
