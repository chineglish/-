
<template>
  <d2-container>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>

<script>
import util from '../../../../libs/util'
import { currency_type, trans_TType } from '@/assets/js/entity'
export default {
  name: 'subledgerDetails',
  data () {
    return {
      formModel: {
      },
      breadData: ['现金管理', '多级账簿', '多级账簿明细查询'],
      routeParams: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '2',
        resData: {
          group: [
            { label: '交易日期', key: 'trsAcDate', formatter: (trsAcDate) => util.separationDate(trsAcDate) },
            { label: '交易时间', key: 'trsTime', formatter: (trsAcDate) => util.separationTime(trsAcDate) },
            { label: '收入金额', key: 'rcvAmt' },
            { label: '支出金额', key: 'payAmt' },
            { label: '手续费', key: 'reserved2' },
            { label: '自身余额', key: 'selfBal' },
            { label: '摘要', key: 'purpose' },
            { label: '附言', key: 'postScript' },
            { label: '对方账户', key: 'oppAcNo' },
            { label: '对方户名', key: 'oppAcName' },
            { label: '对方币种', key: 'oppCurrencyCode', formatter: (value) => util.handleEnums(currency_type, value) },
            { label: '对方账簿号', key: 'oppAsAcNo' },
            { label: '对方账簿名', key: 'oppAsAcName' },
            { label: '交易类型',
              key: 'trsType',
              // formatter: (trsType, value) => util.handleEnums(trans_TType, value)
              formatter: (cellValue) => util.handleEnums(trans_TType, cellValue)
            }
          ]
        }
      }
    }
  },
  methods: {
    onBack (data) {
      this.$router.push('./multiLevelLedgerDetailsQuery')
    }
  },
  created () {
    this.formModel = this.$route.params.data
  }
}
</script>

<style lang="scss" scoped>

</style>
