<template>
  <div id="detailPage">
    <m-breadcrumb :data="data"></m-breadcrumb>
    <d-form-previewer
      :form-struction="formStruction"
      :form-model="formData"
      :action-data="actionData"
      :config="config">
    </d-form-previewer>
  </div>
</template>

<script type="text/javascript">
import dVerticalTable from '@/components/d-vertical-table'
import util from '@/libs/util'
import { currencyMath_type } from '@/assets/js/entity'

export default {
  name: 'detailPosition',
  data: function () {
    return {
      data: ['账户管理', '我的理财', '已持有详情'],
      formData: {},
      config: {
        columns: 2
      },
      formStruction: {
        groups: [
          {
            formItems: [
              { label: '产品编号', fieldName: 'prdCode' },
              { label: '产品名称', fieldName: 'prdName' },
              { label: '交易金额(元)',
                fieldName: 'vol',
                formatter: (key, value) => util.formatCurrency(value),
                show: false },
              { label: '交易份额(份)',
                fieldName: 'vol',
                formatter: (key, value) => util.formatCurrency(value),
                show: false },
              { label: '交易币种',
                fieldName: 'currType',
                formatter: (key, value) => util.handleEnums(currencyMath_type, value) },
              { label: '交易账号', fieldName: 'bankAcc' },
              { label: '理财账号', fieldName: 'assetAcc' },
              { label: '起息日', fieldName: 'interestDate', show: false },
              { label: '到期日', fieldName: 'endDate', show: false },
              { label: '投资周期期限', fieldName: 'interestDays', content: '天', show: false },
              { label: '业绩比较基准', fieldName: 'modelComment', show: false },
              { label: '单位净值', fieldName: 'netWorth', show: false },
              { label: '七日年化收益率', fieldName: 'weekRate', show: false },
              { label: '参考市值(元)',
                fieldName: 'curValue',
                formatter: (key, value) => util.formatCurrency(value),
                show: false },
              { label: '浮动盈亏(元)',
                fieldName: 'profitLoss',
                formatter: (key, value) => util.formatCurrency(value),
                show: false }
              // { label: '分红方式', fieldName: 'divModeName' },
              // { label: '盈亏率',
              //   fieldName: 'profitLossRate',
              //   content: '%' }
            ]
          }
        ]
      },
      actionData: [
        { btnText: '返回', class: 'm-cancel-btn', handler: this.backHandler }
      ]
    }
  },
  // mounted: function () {
  //   this.formData = this.$route.params
  //   this.formData.cfmDate = util.sepDate(this.formData.cfmDate)
  //   this.formData.transDate = util.sepDate(this.formData.transDate)
  //   this.formData.interestDate = util.sepDate(this.formData.interestDate)
  //   if (this.formData.type !== 'buyPro') {
  //     this.data[2] = '理财赎回详情'
  //   }
  // },
  methods: {
    backHandler () {
      this.$router.push({
        name: 'myFinancial',
        params: {
          activeName: this.$route.params.activeName,
          formModel: this.$route.params.formModel,
          isFromPrdSearch: this.$route.params.isFromPrdSearch
        }
      })
    }
  },
  created () {
    this.formData = this.$route.params
    this.formData.netWorth = Number(this.formData.netWorth).toFixed(6)
    this.formData.cfmDate = util.sepDate(this.formData.cfmDate)
    this.formData.transDate = util.sepDate(this.formData.transDate)
    // this.formData.interestDate = util.sepDate(this.formData.interestDate)
    if (this.formData.type !== 'buyPro') {
      this.data[2] = '理财赎回详情'
    }
    if (this.formData.prdTemplate === '1303' || this.formData.prdTemplate === '1102') {
      this.formStruction.groups[0].formItems[2].show = true
      this.formStruction.groups[0].formItems[7].show = true
      this.formStruction.groups[0].formItems[8].show = true
      this.formStruction.groups[0].formItems[9].show = true
      this.formStruction.groups[0].formItems[10].show = true
    }
    if (this.formData.prdTemplate === '1300') {
      this.formStruction.groups[0].formItems[3].show = true
      this.formStruction.groups[0].formItems[11].show = true
      this.formStruction.groups[0].formItems[12].show = true
      this.formStruction.groups[0].formItems[13].show = true
      this.formStruction.groups[0].formItems[14].show = true
    }
    if (this.$route.params.isFromPrdSearch === true || this.$route.params.isFromPrdSearch === 'true') {
      this.data[0] = '理财服务'
      this.data[1] = '理财产品'
      this.data[2] = '已持有详情'
    }
  },
  components: { dVerticalTable }
}
</script>
<style lang="scss" scoped>
  #detailPage{
    width:1200px;
    margin:0 auto;
  }
</style>
