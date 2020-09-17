<template>
  <d2-container>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
import { currency_type, chaohui_flag, acc_type, acc_status, limit_type, handleChannel, payerRate } from '@/assets/js/entity'
export default {
  name: 'strucQueryDetails',
  data () {
    return {
      formModel: {},
      breadData: ['账户管理', '结构性存款查询', '详情页'],
      routeParams: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '2',
        resData: {
          group: [
            // 首字母大写已改成小写
            { label: '证实书（存单）编号', key: 'pngzphaoPngzxhao' },
            { label: '账户名称', key: 'accName' },
            {
              label: '账户类型',
              key: 'accType',
              // key: 'kehuzhlx',
              formatter: (row) => {
                const target = acc_type.find(item => item.value === row)
                return row === 'xxx' ? this.$route.params.kehuzhlx : target ? target.label : '未知'
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
            { label: '年利率（%）', key: 'zhixlilv' },
            {
              label: '开通渠道',
              key: 'openChannel',
              formatter: (row) => {
                const target = handleChannel.find(item => item.value === row)
                return target ? target.label : '其他'
              }
            },
            {
              label: '付息方式',
              key: 'interestPayFrequency',
              formatter: (row) => {
                const target = payerRate.find(item => item.value === row)
                return target ? target.label : '利随本清'
              }
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
            { label: '转出账户', key: 'duifkhzh' },
            { label: '收本收息账户', key: 'payeeSubAccNo' },
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
      }
    }
  },
  methods: {
    onBack (data) {
      this.$router.push({
        name: 'strucQuery'
        // params: this.routeParams
      })
    }
  },
  created () {
    this.formModel = this.$route.params
    // 证书编号
    if (this.$route.params.pngzzlei === '51' || this.$route.params.pngzzlei === '52') {
      this.formModel.pngzphaoPngzxhao = this.formModel.pngzphao + this.formModel.pngzxhao
    }
    // 开户渠道
    // this.formModel.kaihuqud = this.formModel.kaihuqud
    // 转出账户
    if (this.formModel.dfzhhxuh === '000156') {
      this.formModel.duifkhzh = this.formModel.duifkhzh
    } else {
      this.formModel.duifkhzh = this.formModel.duifkhzh + this.formModel.dfzhhxuh
    }
    // 付款收息账户
    if (this.formModel.payeeSubAccNo === '000156') {
      this.formModel.payeeSubAccNo = this.formModel.payeeAccNo
    } else {
      this.formModel.payeeSubAccNo = this.formModel.payeeAccNo + this.formModel.payeeSubAccNo
    }
    // 限制类型
    this.formModel.xzhileix = this.$route.params.xzhileix
    // 账户类型
    this.formModel.accType = this.$route.params.kehuzhlx
  }
}
</script>
