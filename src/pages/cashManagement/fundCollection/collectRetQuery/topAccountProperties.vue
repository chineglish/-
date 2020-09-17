<template>
	<div class="topAccountProperties">
		<m-breadcrumb :data="breadData"></m-breadcrumb>
		<m-new-form
				:componentJson="formConfigJson"
				:btnData="btnData"
				:formModel="formModel"
				@back="back"
		>
		</m-new-form>
	</div>
</template>

<script>
import { currency_type_entity, neCashMode_entity, accrualFlag_entity, assignFlag_entity } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'topAccountProperties',
  data () {
    return {
      breadData: ['现金管理', '资金归集', '归集关系查询'],
      formModel: {},
      formConfigJson: {
        formItems: [
          {
            formWidth: '50%',
            title: '归集关系查询',
            showSeparate: true,
            group: [
              { label: '账户', type: 'text', key: 'acNo' },
              { label: '币种', type: 'text', key: 'currencyCode', formatter: (key, value) => currency_type_entity[value] },
              { label: '户名', type: 'text', key: 'acName' },
              { label: '使用透支归还下级透支', type: 'text', key: 'returnFalg', formatter: (key, value) => value === '0' ? '用' : '不用' },
              { label: '上级余额不足处理方式', type: 'text', key: 'neCashMode', formatter: (key, value) => neCashMode_entity[value] },
              { label: '反向归集', type: 'text', key: 'reverseFlag', formatter: (key, value) => value === '0' ? '开通' : '不开通' },
              { label: '营业税率', type: 'text', key: 'salesRat', formatter: (key, value) => util.collatedDecimalsFormat(value) },
              { label: '营业附加税率', type: 'text', key: 'restRat', formatter: (key, value) => util.collatedDecimalsFormat(value) },
              { label: '印花税率', type: 'text', key: 'stampRat', formatter: (key, value) => util.collatedDecimalsFormat(value) },
              { label: '计息周期', type: 'text', key: 'accrualCyc', formatter: (key, value) => accrualFlag_entity[value] },
              { label: '利息分配', type: 'text', key: 'assignFlag', formatter: (key, value) => assignFlag_entity[value] },
              { label: '上存计息', type: 'text', key: 'accrualFlag' },
              { label: '上存利率', type: 'text', key: 'crRate', formatter: (key, value) => util.collatedDecimalsFormat(value) },
              { label: '透支计息', type: 'text', key: 'accrualMode' },
              { label: '透支利率', type: 'text', key: 'drRate', formatter: (key, value) => util.collatedDecimalsFormat(value) }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  },
  created () {
    let data = this.$route.params
    this.formModel.acNo = data.acNo
    this.formModel.currencyCode = data.currencyCode
    this.formModel.acName = data.acName
    this.formModel.returnFalg = data.returnFalg
    this.formModel.neCashMode = data.neCashMode
    this.formModel.reverseFlag = data.reverseFlag
    this.formModel.salesRat = data.salesRat
    this.formModel.restRat = data.restRat
    this.formModel.stampRat = data.stampRat
    this.formModel.accrualCyc = data.accrualCyc
    this.formModel.assignFlag = data.assignFlag
    this.formModel.crRate = data.crRate
    this.formModel.accrualFlag = data.accrualFlag
    this.formModel.accrualMode = data.accrualMode
    this.formModel.drRate = data.drRate
  }
}
</script>

<style scoped>

</style>
