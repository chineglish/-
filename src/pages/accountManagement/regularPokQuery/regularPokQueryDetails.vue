<template>
  <d2-container>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
import { currency_type, chaohui_flag, acc_type, acc_status, limit_type, usualDate } from '@/assets/js/entity'

export default {
  name: 'regularPokQueryDetails',
  data () {
    return {
      formModel: {
        pngzphaoPngzxhao: ''
      },
      breadData: ['账户管理', '定期通查询', '详情页'],
      routeParams: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        resData: {
          group: [
            // 首字母大写已改成小写
            { label: '证实书（存单）编号', key: 'depNum' },
            { label: '账户名称', key: 'accName' },
            {
              label: '账户种类',
              key: 'accType',
              formatter: (row) => {
                const target = acc_type.find(item => item.value === row)
                return target ? target.label : '未知'
              }
            },
            { label: '账户', key: 'accNo' },
            { label: '子账户序号', key: 'subAcNo' },
            {
              label: '币种',
              key: 'currencyCode',
              formatter: (row) => {
                const target = currency_type.find(item => item.value === row)
                return target ? target.label : '未知'
              }
            },
            {
              label: '开户金额',
              key: 'openAmount',
              formatter: (row) => util.formatCurrency(row)
            },
            {
              label: '可用余额',
              key: 'availBal',
              formatter: (row) => util.formatCurrency(row)
            },
            {
              label: '账户余额',
              key: 'balance',
              formatter: (row) => util.formatCurrency(row)
            },
            { label: '存入利率（%）', key: 'zhixlilv' },
            // {
            //   label: '开通渠道',
            //   key: 'kaihuqud',
            //   formatter: (row) => {
            //     const target = handleChannel.find(item => item.value === row)
            //     return target ? target.label : '其他'
            //   }
            // },
            {
              label: '付息方式',
              key: 'interestPayFrequency',
              formatter: (row) => this.struRatesFlag[row]
            },
            {
              label: '开户日期',
              key: 'openDate',
              formatter: (cellValue) => util.separationDate(cellValue)
            },
            {
              label: '到期日期',
              key: 'matureDate',
              formatter: (cellValue) => util.separationDate(cellValue)
            },
            {
              label: '名义期限',
              key: 'depositTerm',
              formatter: (row) => {
                const target = usualDate.find(item => item.value === row)
                return target ? target.label : '其他'
              }
            },
            {
              label: '提前支取开始日期',
              key: 'weiyriqi',
              formatter: (cellValue) => util.separationDate(cellValue)
            },
            { label: '转出账户', key: 'duifkhzh' },
            {
              label: '钞汇标志',
              key: 'cashFlag',
              formatter: (row) => {
                const target = chaohui_flag.find(item => item.value === row)
                return target ? target.label : '未知'
              }
            },
            {
              label: '账户状态',
              key: 'accStatus',
              formatter: (row) => {
                const target = acc_status.find(item => item.value === row)
                return target ? target.label : '未知'
              }
            },
            {
              label: '限制类型',
              key: 'xzhileix',
              formatter: (row) => {
                const target = limit_type.find(item => item.value === row)
                return target ? target.label : '正常'
              }
            }
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
      this.$router.push({
        name: 'regularPokQuery'
        // params: this.routeParams
      })
    }
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
