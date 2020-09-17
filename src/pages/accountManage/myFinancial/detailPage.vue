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
  name: 'detailPage',
  data: function () {
    return {
      data: ['账户管理', '我的理财', '历史记录详情'],
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
              { label: '交易份额(份)',
                fieldName: 'vol',
                formatter: (key, value) => util.formatCurrency(value) },
              { label: '交易币种',
                fieldName: 'currType',
                formatter: (key, value) => util.handleEnums(currencyMath_type, value) },
              { label: '交易金额(元)',
                fieldName: 'amt',
                formatter: (key, value) => util.formatCurrency(value) },
              { label: '交易账号', fieldName: 'bankAcc' },
              { label: '交易类型', fieldName: 'transName' },
              { label: '交易状态', fieldName: 'status', formatter: (key, value) => util.handleEnums(finanStatus_Type, value) },
              { label: '交易日期', fieldName: 'transDate' },
              { label: '交易确认日期', fieldName: 'cfmDate' }
            ]
          }
        ]
      },
      actionData: [
        { btnText: '返回', class: 'm-cancel-btn', handler: this.backHandler }
      ]
    }
  },
  mounted: function () {
    this.formData = this.$route.params
    this.formData.cfmDate = util.sepDate(this.formData.cfmDate)
    this.formData.transDate = util.sepDate(this.formData.transDate)
    if (this.$route.params.isFromPrdSearch === true || this.$route.params.isFromPrdSearch === 'true') {
      this.data[0] = '理财服务'
      this.data[1] = '理财产品'
      this.data[2] = '历史记录详情'
    }
  },
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
  components: { dVerticalTable }
}
</script>
<style lang="scss" scoped>
  #detailPage{
    width:1200px;
    margin:0 auto;
  }
</style>
