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
import { currencyMath_type, finanStatus_Type } from '@/assets/js/entity'

export default {
  name: 'detailTrans',
  data: function () {
    return {
      data: ['账户管理', '我的理财', '已委托详情'],
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
                fieldName: 'amt',
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
              { label: '起息日', fieldName: 'incomeDate', show: false },
              { label: '到期日', fieldName: 'incomeEndDate', show: false },
              { label: '投资期限', fieldName: 'interestDays', content: '天', show: false },
              { label: '业绩比较基准', fieldName: 'modelComment', show: false },
              // { label: '交易份额(份)',
              //   fieldName: 'vol',
              //   formatter: (key, value) => util.formatCurrency(value) },
              { label: '七日年化收益率', fieldName: 'weekRate', show: false },
              { label: '交易类型', fieldName: 'transName' },
              { label: '交易状态', fieldName: 'status', formatter: (key, value) => util.handleEnums(finanStatus_Type, value) },
              { label: '交易日期', fieldName: 'transDate' }
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
  //   console.log('formData', this.formData)
  //   this.formData.cfmDate = util.sepDate(this.formData.cfmDate)
  //   this.formData.transDate = util.sepDate(this.formData.transDate)
  //   if (this.formData.type !== 'buyPro') {
  //     this.data[2] = '理财赎回详情'
  //   }
  //   console.log('his.formData.prdTemplate===', his.formData.prdTemplate)
  //   if (this.formData.prdTemplate === '1300') {
  //     this.formConfigJson.groups[0].formItems[6].show = true
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
    this.formData.cfmDate = util.sepDate(this.formData.cfmDate)
    this.formData.transDate = util.sepDate(this.formData.transDate)
    if (this.formData.type !== 'buyPro') {
      this.data[2] = '理财赎回详情'
    }
    if (this.formData.prdTemplate === '1300') {
      this.formStruction.groups[0].formItems[11].show = true
    }
    if (this.formData.prdTemplate === '1303' || this.formData.prdTemplate === '1102') {
      this.formStruction.groups[0].formItems[7].show = true
      this.formStruction.groups[0].formItems[8].show = true
      this.formStruction.groups[0].formItems[10].show = true
    }
    if (this.formData.vol !== '0.00') {
      this.formStruction.groups[0].formItems[3].show = true
    }
    if (this.formData.amt !== '0.00') {
      this.formStruction.groups[0].formItems[2].show = true
    }
    if (this.$route.params.isFromPrdSearch === true || this.$route.params.isFromPrdSearch === 'true') {
      this.data[0] = '理财服务'
      this.data[1] = '理财产品'
      this.data[2] = '已委托详情'
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
