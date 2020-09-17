<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
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
import util from '@/libs/util'
import { currency_type, chaohui_flag, acc_type, acc_status, limit_type, usualDate } from '@/assets/js/entity'

export default {
  name: 'regularInquiryDetail',
  data () {
    return {
      formModel: {},
      titleData: ['理财服务 ', '定期通', '定期通查询详情'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      formConfigJson: {
        rules: {},
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '证实书（存单）编号',
                'key': 'depNum'
              },
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
                'key': 'accType',
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
                'label': '可用余额',
                textType: 'shy',
                'key': 'availBal',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '账户余额',
                'key': 'balance',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '存入利率(%)',
                'key': 'zhixlilv',
                formatter: (key, value) => util.formatInterestRate(value)
              },
              // {
              //   'disable': true,
              //   'type': 'text',
              //   'label': '开通渠道',
              //   'key': 'kaihuqud',
              //   formatter: (key, value) => util.handleEnums(handleChannel, value)
              // },
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
                'label': '名义期限',
                'key': 'depositTerm',
                formatter: (key, value) => util.handleEnums(usualDate, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '提前支取开始日期',
                'key': 'weiyriqi',
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
                'key': 'xzhileix',
                formatter: (key, value) => util.handleEnums(limit_type, value)
              }
            ]
          }
        ]
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
    onBack () {
      this.$router.push('/regularInquiry')
    },
    formatter (object, key) {
      if (Array.isArray(object)) {
        let arr = object.find(item => item.value === key)
        return arr.label
      } else {
        return object[key]
      }
    }
    // getStruRates (value) {
    //   return this.struRatesFlag[value] || '--'
    // }
  },
  created () {
    this.formModel = this.$route.params
    // 证书编号
    this.formModel.pngzphaoPngzxhao = this.formModel.pngzphao + '' + this.formModel.pngzxhao
    // 开户渠道
    this.formModel.kaihuqud = this.formModel.kaihuqud
    // 限制类型
    this.formModel.xzhileix = this.formModel.xzhileix
    // Object.assign(this.formModel, this.$route.params.map)
    // this.formModel.pngzphaoPngzxhao = this.$route.params.pngzphao + this.$route.params.pngzxhao
  }
}
</script>
