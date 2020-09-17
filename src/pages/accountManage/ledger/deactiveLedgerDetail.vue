<template>
  <d2-container class="deactive-ledger-detail">
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>

    <d2-container>
      <d-form-previewer
        :config="formPreviewerConfig"
        :form-struction="formStruction"
        :form-model="formModel"
        :action-data="actionData"></d-form-previewer>
    </d2-container>
  </d2-container>
</template>

<script>
import util from '@/libs/util'
import { currency_type_entity1, map_withdrawalType, assignFlag_entity, accrualMode_entity, accrualCyc_entity } from '@/assets/js/entity.js'
export default {
  name: 'deactive-ledger-detail',

  data () {
    return {
      breadcrumb: ['账户管理', '账户已注销账簿信息详情'],
      formPreviewerConfig: {
        columns: 2
      },
      formStruction: {
        groups: [
          {
            formItems: [
              {
                label: '账户名称',
                fieldName: 'acName'
              },
              {
                label: '账号',
                fieldName: 'acNo'
              },
              {
                label: '账簿名',
                fieldName: 'asAcName'
              },
              {
                label: '账簿号',
                fieldName: 'asAcNo'
              },
              {
                label: '币种',
                fieldName: 'currency',
                formatter: (key, val) => currency_type_entity1[val]
              },
              {
                label: '产品号',
                fieldName: 'productNo'
              },
              {
                label: '支取方式',
                fieldName: 'payMode',
                formatter: (key, val) => map_withdrawalType[val]
              },
              {
                label: '内部计息',
                fieldName: 'accrualFlag',
                formatter: (key, val) => accrualMode_entity[val]
              },
              {
                label: '自动分配利息',
                fieldName: 'assignFlag',
                formatter: (key, val) => assignFlag_entity[val]
              },
              {
                label: '自身余额',
                fieldName: 'selfBal',
                formatter: (key, val) => util.formatCurrency(val)
              },
              {
                label: '上存余额',
                fieldName: 'uppBal',
                formatter: (key, val) => util.formatCurrency(val)
              },
              {
                label: '可用余额',
                fieldName: 'useBal',
                formatter: (key, val) => util.formatCurrency(val)
              },
              {
                label: '上日余额',
                fieldName: 'lastBal',
                formatter: (key, val) => util.formatCurrency(val)
              },
              {
                label: '上日可用余额',
                fieldName: 'lastUseBal',
                formatter: (key, val) => util.formatCurrency(val)
              },
              {
                label: '冻结金额',
                fieldName: 'freezeBal',
                formatter: (key, val) => util.formatCurrency(val)
              },
              {
                label: '计息方式',
                fieldName: 'accrualMode',
                formatter: (key, val) => accrualMode_entity[val]
              },
              {
                label: '计息周期',
                fieldName: 'accrualCyc',
                formatter: (key, val) => accrualCyc_entity[val]
              },
              {
                label: '借方积数',
                fieldName: 'drPile'
              },
              {
                label: '借方利率',
                fieldName: 'drRate'
              },
              {
                label: '贷方积数',
                fieldName: 'crPile'
              },
              {
                label: '贷方利率',
                fieldName: 'crRate'
              },
              {
                label: '协定积数',
                fieldName: 'miPile'
              },
              {
                label: '协定利率',
                fieldName: 'miRate'
              },
              {
                label: '协定额度',
                fieldName: 'miAmt',
                formatter: (key, val) => util.formatCurrency(val)
              },
              {
                label: '上次动账日期',
                fieldName: 'lastChgdate'
              },
              {
                label: '上次计息日期',
                fieldName: 'lastAccrual'
              },
              {
                label: '开通日期',
                fieldName: 'openDate',
                formatter: (name, value) => {
                  return util.separationDate(value)
                }
              },
              {
                label: '注销日期',
                fieldName: 'closeDate',
                formatter: (name, value) => {
                  return util.separationDate(value)
                }
              },
              {
                label: '开通柜员',
                fieldName: 'userNo'
              },
              {
                label: '附言',
                fieldName: 'postscript'
              }
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
      // this.$router.back()
      this.$router.push({
        name: 'deactiveLedgerQry',
        params: {
          formModel: this.$route.params.formModel
        }
      })
    }
  },

  created () {
    this.formModel = this.$route.params.detail
    // console.log(this.formModel)
  }
}
</script>

<style lang="scss" scoped>
  // .deactive-ledger-detail {}
</style>
