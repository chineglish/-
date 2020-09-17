<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <d-form-previewer
      :form-struction="formStruction"
      :form-model="formModel"
      :action-data="actionData"
      :config="config">
    </d-form-previewer>
  </div>
</template>

<script type="text/javascript">
import util from '@/libs/util'
import { currency_type, eloan_shape, loan_term } from '@/assets/js/entity'

export default {
  name: 'loanInquiry',
  data: function () {
    return {
      data: ['账户管理', '资产负债查询', '贷款详情页'],
      config: {
        columns: 2
      },
      formStruction: {
        labelWidth: 30,
        groups: [
          {
            formItems: [
              { label: '贷款账号', fieldName: 'loanAcNo' },
              { label: '贷款借据号', fieldName: 'loanTermSerialNum' },
              { label: '贷款户名', fieldName: 'loanAcNm' },
              { label: '开户行', fieldName: 'acOrganNm' },
              { label: '本金合计', fieldName: 'loanAmt', formatter: (name, value) => util.formatCurrency(value) },
              { label: '币种', fieldName: 'currency', formatter: (name, value) => util.handleEnums(currency_type, value) },
              { label: '年利率', fieldName: 'yearRate' },
              { label: '利率浮动方式',
                fieldName: 'rateFloatWay',
                formatter: (name, value) => {
                  if (value === '0') return '不浮动'; else if (value === '1') return '按值浮动'; else if (value === '2') return '按比例浮动'
                } },
              { label: '计息方式',
                fieldName: 'interestType',
                formatter: (name, value) => {
                  if (value === '0') return '不计息'
                  else if (value === '1') return '分段计息'
                  else if (value === '2') return '不分段计息'
                  else if (value === '3') return '就高分段计息'
                  else if (value === '4') return '就低分段计息'
                } },
              { label: '贷款账户状态',
                fieldName: 'type',
                formatter: (name, value) => {
                  if (value === '0') return '正常'; else if (value === '1') return '销户'
                } },
              { label: '逾期利率（%）', fieldName: 'oduerRate' },
              { label: '欠息金额', fieldName: 'debitAmt', formatter: (name, value) => util.formatCurrency(value) },
              { label: '发放日期', fieldName: 'releaseDate', formatter: (name, value) => util.separationDate(value) },
              { label: '到期日期', fieldName: 'endDate', formatter: (name, value) => util.separationDate(value) },
              { label: '贷款期限',
                fieldName: 'loanTerm',
                formatter: (name, value) => util.handleEnums(loan_term, value) },
              { label: '贷款入账账户', fieldName: 'loanEntryAcNo' },
              { label: '贷款还款账户', fieldName: 'loanRepayAcNo' },
              { label: '还款账户余额（元）', fieldName: 'repayAcNoBalance', formatter: (name, value) => util.formatCurrency(value) },
              { label: '贷款形态', fieldName: 'eloanShape', formatter: (name, value) => util.handleEnums(eloan_shape, value) }
            ]
          }
        ]
      },
      formModel: {},
      actionData: [
        { btnText: '返回', class: 'm-cancel-btn', handler: this.backHandler }
      ]
    }
  },
  methods: {
    backHandler () {
      this.$router.back()
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
    } else {
      this.$router.push('/loanManage')
    }
  }
}
</script>
