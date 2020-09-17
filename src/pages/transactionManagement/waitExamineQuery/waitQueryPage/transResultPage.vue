<template>
	<div class="transResultPage">
		<m-breadcrumb :data="breadData"></m-breadcrumb>
		<h3 class="title fs30">交易结果</h3>
		<p class="trans_jnlNO">交易流水号：2313232333333333333312313</p>
		<d-table
				:tableHeadData="tableHeadData"
				:table-data="tableData"
				:options="options"
				:actionData="actionData"
				@back="onBack"
		>
		</d-table>
	</div>
</template>

<script>
import { prd_id_entity } from '../../../../assets/js/entity'

export default {
  name: 'transResultPage',
  data () {
    return {
      breadData: ['交易管理', '待审核记录查询', '审核结果'],
      options: { // table属性
        border: true,
        stripe: true
      },
      tableHeadData: [
        { label: '交易流水', prop: 'taskSeq' },
        { label: '交易类型', prop: 'productId', formatter: (row, column, cellValue, index) => prd_id_entity[row.productId] },
        { label: '制单人', prop: 'userName' },
        { label: '制单日期', prop: 'createDate' },
        { label: '审核状态', prop: 'examineStastus' }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          eventName: 'back'
        }
      ]
    }
  },
  methods: {
    onBack () {
      this.$router.back()
    }
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
	.title {
		text-align: center;
		line-height: 50px;
	}
</style>
