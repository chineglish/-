<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <d-form-previewer
      :form-struction="formStruction"
      :form-model="formData"
      :action-data="actionData">
    </d-form-previewer>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'regularDetail',
  data: function () {
    return {
      data: ['账户管理', '定期通查询', '详情页'],
      formData: {
        // openingChannels: '网银',
        // paymentMethod: '利随本清',
        // openAccountDate: '2016-05-19',
        // closeDate: '2017-05-19',
        // nominalLimit: '三年',
        // withDrawalStartDate: '2016-12-19',
        // transferAccount: '58483940932949'
      },
      formStruction: {
        groups: [
          {
            formItems: [
              { label: '账户名称', fieldName: 'accountName' },
              { label: '账户类型', fieldName: 'accountType' },
              { label: '账号', fieldName: 'accountCode' },
              { label: '子账户序号', fieldName: 'accountChildCode' },
              { label: '币种', fieldName: 'currency' },
              { label: '开户金额', fieldName: 'openMoney' },
              { label: '可用余额', fieldName: 'availableBalance' },
              { label: '存入利率（%）', fieldName: 'rate' },
              { label: '钞汇标志', fieldName: 'tip' },
              { label: '账户状态', fieldName: 'accountStatus' },
              { label: '限制类型', fieldName: 'limitType' },
              // { label: '开通渠道', fieldName: 'openingChannels' },
              { label: '付息方式', fieldName: 'paymentMethod' },
              { label: '开户日期', fieldName: 'openAccountDate' },
              { label: '到期日期', fieldName: 'closeDate' },
              { label: '名义期限', fieldName: 'nominalLimit' },
              { label: '提前支取开始日期', fieldName: 'withDrawalStartDate' },
              { label: '转出账号', fieldName: 'transferAccount' }
            ]
          }
        ]
      },
      actionData: [
        { btnText: '返回', class: 'm-cancel-btn', handler: this.backHandler }
      ]
    }
  },
  mounted: function () {
    this.formData = Object.assign(this.formData, this.$route.params)
  },
  methods: {
    backHandler () {
      this.$router.back()
    }
  },
  components: {}
}
</script>
