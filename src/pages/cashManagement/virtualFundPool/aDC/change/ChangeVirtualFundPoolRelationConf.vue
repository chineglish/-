<template>
    <div>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @submit="submit">
            </m-new-form>
        </div>
    </div>
</template>
<script>
/**
     *@name: 虚拟资金池关系修改-确认
     * @date: 2020-2-4
     */
export default {
  name: 'ChangeVirtualFundPoolRelationConf',
  data () {
    return {
      titleData: ['现金管理 ', '虚拟资金池', '虚拟资金池关系修改'],
      formModel: {
        poolAcc: '',
        poolAccCurrency: '',
        subAcc: '',
        subAccCurrency: '',
        lenderInterestRate: '',
        debitRate: ''
      },
      formConfigJson: {
        stepsActive: 1,
        rules: {},
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'label': '池账户',
                'type': 'text',
                'key': 'poolAcc'
              },
              {
                'label': '池账户币种',
                'type': 'text',
                'key': 'poolAccCurrency'
              },
              {
                'label': '子账户',
                'type': 'text',
                'key': 'subAcc'
              },
              {
                'label': '子账户币种',
                'type': 'text',
                'key': 'subAccCurrency'
              },
              {
                'label': '借方利率（%）',
                'type': 'text',
                'key': 'debitRate'
              },
              {
                'label': '贷方利率（%）',
                'type': 'text',
                'key': 'lenderInterestRate'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' }
      ]
    }
  },
  methods: {
    submit (params) {
      params.tradeName = '虚拟资金池关系修改'
      params.tradeDate = '2020-2-4'
      params.operatorName = '张三'
      params.operatorNum = '1234'
      this.$router.push({
        name: 'AddVirtualFundPoolRelationRes',
        params: { formModel: params,
          _JnlStatus: '1' }
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
    }
  }
}
</script>

<style scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
</style>
