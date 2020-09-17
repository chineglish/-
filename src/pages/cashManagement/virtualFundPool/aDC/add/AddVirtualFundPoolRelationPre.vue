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
     *@name: 虚拟资金池关系加入-录入
     * @date: 2020-2-4
     */
export default {
  name: 'AddVirtualFundPoolRelationPre',
  data () {
    return {
      titleData: ['现金管理 ', '虚拟资金池', '虚拟资金池关系加入'],
      formModel: {
        poolAcc: '',
        poolAccCurrency: '',
        subAcc: '',
        subAccCurrency: '',
        lenderInterestRate: '',
        debitRate: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {},
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '池账户',
                'type': 'input',
                'key': 'poolAcc'
              },
              {
                'disabled': false,
                'label': '池账户币种',
                'type': 'select',
                'options': [
                  { 'value': '1892948398439493/测试公司1', 'key': '1892948398439493' },
                  { 'value': '1934548398439673/测试公司2', 'key': '1934548398439673' }
                ],
                'key': 'poolAccCurrency'
              },
              {
                'disabled': false,
                'label': '子账户',
                'type': 'input',
                'key': 'subAcc'
              },
              {
                'disabled': false,
                'label': '子账户币种',
                'type': 'select',
                'options': [
                  { 'value': '1892948398439493/测试公司1', 'key': '1892948398439493' },
                  { 'value': '1934548398439673/测试公司2', 'key': '1934548398439673' }
                ],
                'key': 'subAccCurrency'
              },
              {
                'disabled': false,
                'label': '借方利率（%）',
                'type': 'input',
                'key': 'debitRate'
              },
              {
                'disabled': false,
                'label': '贷方利率（%）',
                'type': 'input',
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
      this.$router.push({
        name: 'AddVirtualFundPoolRelationConf',
        params: { formModel: params }
      })
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
