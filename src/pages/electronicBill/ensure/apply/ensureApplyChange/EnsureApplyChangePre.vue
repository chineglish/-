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
     *@name: 修改保证信息-录入
     */
export default {
  name: 'EnsureApplyChangePre',
  data () {
    return {
      titleData: ['电子商业汇票', '保证', '提示保证申请', '修改保证信息'],
      formModel: {},
      formConfigJson: {
        rules: {},
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '票据号码',
                'type': 'text',
                'key': 'ticketNum'
              },
              {
                'disabled': false,
                'label': '保证类型',
                'type': 'text',
                'key': 'applyType'
              },
              {
                'disabled': false,
                'label': '保证申请日期',
                'type': 'text',
                'key': 'applyDate'
              }
            ]
          },
          {
            title: '被保证人信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '被保证人客户名称',
                'type': 'input',
                'key': 'assuredName'
              },
              {
                'disabled': false,
                'label': '被保证人组织机构代码',
                'type': 'input',
                'key': 'assuredOrganizationCode'
              },
              {
                'disabled': false,
                'label': '被保证人银行',
                'type': 'select',
                'options': [
                  { 'value': '中国工商银行', 'key': '5151515' },
                  { 'value': '中国银行', 'key': '1511' }
                ],
                'key': 'assuredBank'
              },
              {
                'disabled': false,
                'label': '被保证人省份',
                'type': 'select',
                'options': [
                  { 'value': '辽宁省', 'key': '辽宁省' },
                  { 'value': '北京市', 'key': '北京市' }
                ],
                'key': 'assuredProvince'
              },
              {
                'disabled': false,
                'label': '被保证人所在市',
                'type': 'select',
                'options': [
                  { 'value': '大连市', 'key': '大连市' },
                  { 'value': '北京市', 'key': '北京市' }
                ],
                'key': 'assuredCity'
              },
              {
                'disabled': false,
                'label': '被保证人网点',
                'type': 'select',
                filterable: true,
                'options': [
                  { 'value': '中国工商银行长安支行', 'key': '中国工商银行长安支行' },
                  { 'value': '中国银行三里屯支行', 'key': '中国银行三里屯支行' }
                ],
                'key': 'assuredBankBranch'
              }
            ]
          },
          {
            title: '保证人信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '保证人名称',
                'type': 'input',
                'key': 'assurerName'
              },
              {
                'disabled': false,
                'label': '保证人账号',
                'type': 'input',
                'key': 'assurerAcc'
              },
              {
                'disabled': false,
                'label': '保证人所在银行',
                'type': 'select',
                'options': [
                  { 'value': '中国工商银行', 'key': '515' },
                  { 'value': '中国银行', 'key': '4848' }
                ],
                'key': 'assurerBank'
              },
              {
                'disabled': false,
                'label': '保证人省份',
                'type': 'select',
                'options': [
                  { 'value': '辽宁省', 'key': '辽宁省' },
                  { 'value': '北京市', 'key': '北京市' }
                ],
                'key': 'assurerProvince'
              },
              {
                'disabled': false,
                'label': '保证人所在市',
                'type': 'select',
                'options': [
                  { 'value': '大连市', 'key': '大连市' },
                  { 'value': '北京市', 'key': '北京市' }
                ],
                'key': 'assurerCity'
              },
              {
                'disabled': false,
                'label': '保证人开户网点',
                'type': 'select',
                filterable: true,
                'options': [
                  { 'value': '中国工商银行长安支行', 'key': '中国工商银行长安支行' },
                  { 'value': '中国银行三里屯支行', 'key': '中国银行三里屯支行' }
                ],
                'key': 'assurerBankBranch'
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
        name: 'EnsureApplyChangeConf',
        params: { formModel: params }
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
    } else {
      this.$router.push({
        name: 'EnsureApplyQueryDetail'
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
