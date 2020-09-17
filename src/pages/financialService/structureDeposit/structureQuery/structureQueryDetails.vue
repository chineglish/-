<template>
  <d2-container>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @back="onBack">
      </m-new-form>
    </div>
  </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, acc_type, limit_type, handleChannel, payerRate, chaohui_flag, acc_status } from '@/assets/js/entity'
export default {
  name: 'structureQueryDetials',
  data () {
    return {
      formModel: {},
      breadData: ['理财服务', '结构性存款', '结构性存款查询'],
      routeParams: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      formConfigJson: {
        rules: {},
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '证实书（存单）编号',
                'key': 'serial'
              }
            ]
          },
          {
            formWidth: '50%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '账户名称',
                'key': 'accName'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '账号',
                'key': 'accNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '子账户序号',
                'key': 'subAcNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '币种',
                'key': 'currencyCode',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '账户类型',
                'key': 'kehuzhlx',
                formatter: (key, value) => util.handleEnums(acc_type, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '开户金额',
                'key': 'openAmount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '年利率（%）',
                'key': 'actualRate',
                formatter: (key, value) => util.formatInterestRate(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '开通渠道',
                'key': 'kaihuqud',
                formatter: (key, value) => util.handleEnums(handleChannel, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '付息方式',
                'key': 'lxzffans',
                formatter: (key, value) => util.handleEnums(payerRate, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '开户日期',
                'key': 'openDate',
                formatter: (key, value) => util.separationDate(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '到期日期',
                'key': 'matureDate',
                formatter: (key, value) => util.separationDate(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '转出账户',
                'key': 'duifkhzh'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '收本收息账户',
                'key': 'payeeAccNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '钞汇标志',
                'key': 'cashFlag',
                formatter: (key, value) => util.handleEnums(chaohui_flag, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '账户状态',
                'key': 'accStatus',
                formatter: (key, value) => util.handleEnums(acc_status, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '限制类型',
                'key': 'limitType',
                formatter: (row) => {
                  const target = limit_type.find(item => item.value === row)
                  return target ? target.label : '正常'
                }
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    onBack (data) {
      this.$router.push({
        name: 'structureQuery'
        // params: this.routeParams
      })
    },
    getAccountList () {
      let _this = this
      httpPost('/eweb-invest.StructuredDepositQuery.do', { acNo: _this.$route.params.lDAcNo, subAcNo: _this.$route.params.subAcNo }).then(res => {
        _this.formModel = res
        // 账户类型
        this.formModel.kehuzhlx = this.$route.params.kehuzhlx
        // 开通渠道
        this.formModel.kaihuqud = this.$route.params.kaihuqud
        // 付息方式
        this.formModel.lxzffans = this.$route.params.lxzffans
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.getAccountList()
  }
}
</script>
