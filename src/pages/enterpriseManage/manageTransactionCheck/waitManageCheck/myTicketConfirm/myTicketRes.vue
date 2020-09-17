<template>
	<div class="transResultPage">
		<m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-steps :data="stepData"></m-steps>
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
      breadData: ['交易管理', '管理类交易审核', '我的制单', '审核结果'],
      stepData: {
        stepsActive: 2
      },
      tableHeadData: [
        { label: '交易流水', prop: 'taskSeq' },
        { label: '交易名称', prop: 'transCode', formatter: (row, column, cellValue, index) => util.handleEnums(business_Type, cellValue) },
        { label: '交易日期', prop: '_transTime' },
        { label: '制单员号', prop: 'userName' },
        { label: '制单员姓名', prop: 'userId' },
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
        name: 'manageTransactionCheck'
      })
    }
  },
  created () {
    let { _jnlNo, list, data, _transTime } = this.$route.params
    this.jnlNo = _jnlNo
    let flag = false
    for (let i = 0; i < list.length; i++) {
      if (list[i].split(',').length === 4) {
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
      if (arr.length === 3) {
        obj.examineStastus = arr[2]
      } else {
        obj.examineStastus = '失败'
        obj.failureCause = arr[2]
      }
      for (let i = 0; i < data.length; i++) {
        if (arr[0] === data[i].taskSeq) {
          obj.transCode = data[i].transCode
          obj.userId = data[i].userId
          obj.userName = data[i].userName
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
