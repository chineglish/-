
<template>
  <div class="main">
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </div>
</template>

<script>
import util from '@/libs/util'
import { querycashdetails_Type, currency_type, inherit_Type, assigncashFlag_Type, accrualMode_Type, accrualCyc_Type, payMode_Type, asLevel_Type } from '@/assets/js/entity'
export default {
  name: 'subledgerDetails',
  data () {
    return {
      formModel: {
      },
      breadData: ['账户管理', '多级账簿', '多级账簿查询'],
      routeParams: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _RejMessage: '',
        itemWidth: '4',
        resData: {
          group: [
            { label: '状态', key: 'stat', formatter: (value) => util.handleEnums(querycashdetails_Type, value) },
            { label: '账户', key: 'acNo' },
            { label: '货币码', key: 'currencyCode', formatter: (value) => util.handleEnums(currency_type, value) },
            { label: '辅助账簿号', key: 'asAcNo' },
            { label: '辅助账簿户名', key: 'asAcName' },
            { label: '上级辅助账簿号', key: 'supAsAcNo' },
            { label: '上级辅助账簿名称', key: 'supAsAcName' },
            { label: '超额定支额度', key: 'exceedLimit' },
            { label: '是否遵从主账簿计息规则', key: 'inherit', formatter: (value) => util.handleEnums(inherit_Type, value) },
            { label: '自动利息分配标志', key: 'assignFlag', formatter: (value) => util.handleEnums(assigncashFlag_Type, value) },
            { label: '自身余额', key: 'selfBal' },
            { label: '内部计息标志', key: 'accrualFlag', formatter: (value) => util.handleEnums(accrualMode_Type, value) },
            { label: '计息方式', key: 'accrualMode', formatter: (value) => util.handleEnums(accrualMode_Type, value) },
            { label: '计息周期', key: 'accrualCyc', formatter: (value) => util.handleEnums(accrualCyc_Type, value) },
            { label: '借方利率', key: 'drRate' },
            { label: '贷方利率', key: 'crRate' },
            { label: '开户日期', key: 'openDate', formatter: (value) => util.separationDate(value) },
            { label: '销户日期', key: 'closeDate', formatter: (value) => util.separationDate(value) },
            { label: '户名', key: 'acName' },
            { label: '辅助账簿级别', key: 'asLevel', formatter: (value) => util.handleEnums(asLevel_Type, value) },
            { label: '支取方式', key: 'payMode', formatter: (value) => util.handleEnums(payMode_Type, value) },
            { label: '贷方利率类型', key: 'crRateType' },
            { label: '贷方浮动比例/值', key: 'crRatePrefer' },
            { label: '贷方分段金额1N', key: 'crAmountOne' },
            { label: '贷方分段金额2N', key: 'crAmountTwo' },
            { label: '贷方分段金额3N', key: 'crAmountThree' },
            { label: '贷方分段金额4N', key: 'crAmountFour' },
            { label: '贷方分段金额5N', key: 'crAmountFive' },
            { label: '贷方浮动基准利率类型', key: 'crRateBaseType' },
            { label: '贷方分段利率1N', key: 'crRateOne' },
            { label: '贷方分段利率2N', key: 'crRateTwo' },
            { label: '贷方分段利率3N', key: 'crRateThree' },
            { label: '贷方分段利率4N', key: 'crRateFour' },
            { label: '贷方分段利率5N', key: 'crRateFive' },
            { label: '借方利率类型', key: 'drRateType' },
            { label: '借方浮动比例/值', key: 'drRatePrefer' },
            { label: '借方分段金额1N', key: 'drAmountOne' },
            { label: '借方分段金额2N', key: 'drAmountTwo' },
            { label: '借方分段金额3N', key: 'drAmountThree' },
            { label: '借方分段金额4N', key: 'drAmountFour' },
            { label: '借方分段金额5N', key: 'drAmountFive' },
            { label: '借方浮动基准利率类型', key: 'drRateBaseType' },
            { label: '借方分段利率1N', key: 'drRateOne' },
            { label: '借方分段利率2N', key: 'drRateTwo' },
            { label: '借方分段利率3N', key: 'drRateThree' },
            { label: '借方分段利率4N', key: 'drRateFour' },
            { label: '借方分段利率5N', key: 'drRateFive' }
          ]
        }
      },
      struRatesFlag: {
        '1QA21E': '按季付息',
        '1YA1221': '按年付息',
        '3M': '满季付息',
        '6M': '满半年付息',
        '1Y': '满年付息',
        '1MA21': '按月付息',
        '1M': '满月付息',
        '6MA21': '按半年付息',
        '': '利随本清'
      }
    }
  },
  methods: {
    onBack (data) {
      this.$router.push('./multiLevelLedgerQuery')
    }
  },
  created () {
    this.formModel = this.$route.params
  }
}
</script>

<style scoped>
.main >>> .m-info-body {
  width: 90% !important;
  margin-right: 5% !important;
  margin-left: 5% !important;
}
</style>
