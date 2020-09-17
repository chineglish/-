<template>
	<div class="transResultPage">
		<m-breadcrumb :data="breadData"></m-breadcrumb>
		<h3 class="title fs30">交易结果</h3>
		<p class="trans_jnlNo">交易流水号：{{ jnlNo }}</p>
		<d-table
				:tableHeadData="tableHeadData"
				:table-data="tableData"
				:actionData="actionData"
				@back="onBack"
		>
		</d-table>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import { business_Type } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'transResultPage',
  data () {
    return {
      jnlNo: '',
      breadData: ['交易管理', '业务类交易审核', '待审核记录查询', '审核结果'],
      tableHeadData: [
        { label: '交易流水', prop: 'taskSeq', width: '240px' },
        { label: '交易类型', prop: 'transCode', formatter: (row, column, cellValue, index) => util.handleEnums(business_Type, cellValue) },
        {
          label: '交易账户',
          prop: 'payerAcNo',
          formatter: (row, column, cellValue, index) => {
            let val = ''
            val = cellValue || row.payeeAcNo
            return val
          }
        },
        { label: '交易金额', prop: 'actAmount', formatter: (row, column, cellValue, index) => cellValue > 0 ? util.formatCurrency(cellValue) : '' },
        { label: '交易日期', prop: '_transTime' },
        { label: '制单员号', prop: 'userId' },
        { label: '制单员姓名', prop: 'userName' },
        { label: '交易状态', prop: 'transStatus' },
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
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    onBack () {
      this.removeKeepAliveList()
      this.$router.push({
        name: 'waitQPage'
      })
    }
  },
  created () {
    let { _jnlNo, list, data, _transTime } = this.$route.params
    this.jnlNo = _jnlNo
    let flag = false
    for (let i = 0; i < list.length; i++) {
      if (list[i].split(',').length === 5) {
        flag = true
        break
      }
    }
    flag && this.tableHeadData.push({ label: '失败原因', prop: 'failureCause' })
    list.forEach(str => {
      let obj = {
        _transTime
      }
      let arr = str.split(',')
      obj.taskSeq = arr[1]
      if (arr.length === 4) {
        obj.transStatus = arr[2]
        obj.examineStastus = arr[3]
      } else {
        obj.transStatus = arr[2]
        obj.examineStastus = arr[4]
        obj.failureCause = arr[3]
      }
      for (let i = 0; i < data.length; i++) {
        if (arr[0] === data[i].taskSeq) {
          obj.transCode = data[i].transCode
          obj.userId = data[i].userId
          obj.userName = data[i].userName
          obj.payerAcNo = data[i].payerAcNo
          obj.payeeAcNo = data[i].payeeAcNo
          obj.actAmount = data[i].actAmount
          break
        }
      }
      this.tableData.push(obj)
    })
  }
}
</script>

<style lang="scss" scoped>
	.title {
		text-align: center;
		line-height: 50px;
	}
</style>
