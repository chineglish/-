<template>
	<div id="transactionManagementDetails">
		<m-breadcrumb :data="breadData"></m-breadcrumb>
		<div class="form-box">
      <m-steps :data="stepsData"></m-steps>
      <d-table
          :table-data="dataDetail"
          :tableHeadData="titleHeadData">
      </d-table>
      <div v-show="show" class="fs22" style="padding: 5px 15px;background: #fff;font-weight: 700">录入详情</div>
			<m-new-form
					:componentJson="formConfigJson"
					:btnData="btnData"
					:formModel="formModel"
					@on-idea-change="ideaChangeHandler"
					@back="back"
					@submit="submit"
          @cancel="cancel"
			>
				<div style="width:100%; margin-top: 30px; margin-left: 120px;" slot="formTable">
					<d-table
							:table-data="tableData"
							:tableHeadData="tableHeadData">
						<div slot-scope="data">
							<template v-if="data.scope.userId.split(',').length > 2">
								<el-tooltip class="item" effect="dark" :content="data.scope.userId" placement="top">
									<p style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{ data.scope.userId }}</p>
								</el-tooltip>
							</template>
							<template v-else>
								<p>{{ data.scope.userId }}</p>
							</template>
						</div>
					</d-table>
				</div>
        <div style="width:100%; margin: 15px 0;" slot="cifRoleProductAcList" class="aaa">
					<d-table
							:table-data="formModel.cifRoleProductAcList"
							:tableHeadData="cifRoleHeadData"
              :pagesize="'20'"
          >
					</d-table>
				</div>
			</m-new-form>
		</div>
	</div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import details from './details'
import { prd_id, approvalStatusList, process_state } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'managementTransDetails',
  data () {
    return {
      show: true,
      stepsData: {
        stepsActive: 0
      },
      breadData: [],
      formModel: {
        // payName: '',
        // makeName: '',
        // payAccount: '',
        // makeAccount: '',
        // payBank: '',
        // makeBank: '',
        // payMoney: '',
        // makeMoneyBig: '',
        // payerWater: '',
        // payerClass: '',
        // useFunction: '',
        // add: '',
        // operaMan: '',
        // submitDate: '',
        idea: '',
        refuseBecause: '',
        limit: [],
        cifRoleProductAcList: []
        // dateArea: {}
      },
      dataDetail: [],
      titleHeadData: [
        { label: '流水号', prop: 'taskSeq' },
        { label: '制单人', prop: 'userName' },
        { label: '交易状态', prop: 'trsProcessState', formatter: (row, column, cellValue, index) => util.handleEnums(process_state, cellValue) }
      ],
      activeName: '',
      formConfigJson: {
        rules: {
          signAccount: [{ required: true, message: '请选择续费签约账户', trigger: 'submit' }],
          idea: [{ required: true, message: '请选择审核意见', trigger: 'submit' }],
          refuseBecause: [{ required: true, message: '请输入拒绝原因', trigger: 'submit' }],
          dateArea: [{ required: true, message: '请选择时间', trigger: 'submit' }]
        },
        formItems: []
      },
      cifRoleHeadData: [
        { label: '使用权(录入)', prop: 'makeRight', formatter: (row, column, cellValue, index) => cellValue === 'true' ? '是' : '否' },
        { label: '验证权(审核)', prop: 'authRight', formatter: (row, column, cellValue, index) => cellValue === 'true' ? '是' : '否' },
        { label: '功能名称', prop: 'prdId', formatter: (row, column, cellValue, index) => util.handleEnums(prd_id, cellValue) }
      ],
      tableHeadData: [
        { label: '审核进度', prop: 'progress' },
        { label: '操作员号', prop: 'userId', width: '370px', soltName: 'userId' },
        { label: '审核时间', prop: 'checkTime', width: '170px' },
        { label: '审核意见', prop: 'opinion' },
        { label: '审核状态', prop: 'authProcessState', formatter: (row, column, cellValue, index) => approvalStatusList[row.processState] }
      ],
      tableData: [],
      btnData: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '撤回', class: 'm-submit-btn', clickEventName: 'cancel' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    ideaChangeHandler (formModel) {
      const { idea, refuseBecause } = formModel
      this.formModel.refuseBecause = idea === '1' ? refuseBecause : ''
      this.formConfigJson.rules.refuseBecause[0].required = idea === '1'
      this.formConfigJson.formItems[this.formConfigJson.formItems.length - 1].group[1].show = idea === '1'
    },
    // 确定
    submit (data) {
      if (data.idea === '0') {
        httpPost('/eweb-setting.CheckPassOrRejConfirm.do').then(res => {
          this.$router.push({
            name: 'waitCheckConfirm',
            params: {
              data: this.dataDetail,
              formModel: res,
              type: '1'
            }
          })
        })
      } else {
        httpPost('/eweb-setting.CheckPassOrRejConfirm.do').then(res => {
          this.$router.push({
            name: 'checkRefuseConfirm',
            params: {
              tableData: this.dataDetail,
              res: data,
              formModel: res,
              type: '1'
            }
          })
        })
      }
    },
    // 撤回
    cancel () {
      httpPost('/eweb-setting.CheckPassOrRejConfirm.do', {}).then(res => {
        this.$router.push({
          name: 'myTicketConf',
          params: {
            data: this.dataDetail,
            formModel: res
          }
        }).catch(e => {
          console.error(e)
        })
      })
    },
    // 返回
    back (res) {
      this.$router.push({
        name: 'manageTransactionCheck',
        params: {
          activeName: this.activeName
        }
      })
    },
    handleTableData (res) {
      this.tableData = res.taskInfo
      let arr = []
      let list1 = []
      let list = []
      for (let i = 0; i < this.tableData.length; i++) {
        arr.push(this.tableData[i].userId)
        this.tableData[i].progress = this.tableData[i].message.split(',')[0]
        this.tableData[i].opinion = this.tableData[i].message.split(',')[1]
      }
      res.authList && res.authList.forEach(item => {
        !arr.includes(item.userId) && list1.push(item)
      })
      list1.forEach(item => {
        if (list[item.level - 1] === undefined) {
          item['progress'] = `${item.level}级审核`
          this.$set(list, item.level - 1, item)
        } else {
          list[item.level - 1].userId += ', ' + item.userId
        }
      })
      list.forEach(item => {
        item.processState = 'WCK'
      })
      this.tableData = [ ...this.tableData, ...list ]
    }
  },
  created () {
    let { type, jnlNo, transCode, detail } = this.$route.params
    if (transCode === 'eweb-setting.MobilphoneBankApplication') {
      this.show = false
    }
    if (this.$route.params.detail) {
      this.dataDetail.push(this.$route.params.detail)
    }
    this.formConfigJson.formItems = details(transCode, type)
    let params = {
      jnlNo: jnlNo,
      productId: detail.productId,
      acSeq: detail.acSeq ? detail.acSeq : '',
      mgmtFlag: '2'
    }
    if (type === '1') {
      this.activeName = 'first'
      this.btnData[1].show = false
      httpPost('eweb-query.WaitAuthQryJnl.do', params).then(res => {
        this.formModel = res.bodyMap
        if (this.formModel.limit) { // 限额管理数据的获取（仅限额管理）
          for (let i = 0; i < this.formModel.limit.length; i++) {
            switch (this.formModel.limit[i].limitType) {
              case 'LimitTrs':
                this.formModel.limitTrs = this.formModel.limit[i].limitAmount
                break
              case 'LimitDay':
                this.formModel.limitDay = this.formModel.limit[i].limitAmount
                break
              case 'LimitMon':
                this.formModel.limitMon = this.formModel.limit[i].limitAmount
                break
              case 'LimitYear':
                this.formModel.limitYear = this.formModel.limit[i].limitAmount
                break
              case 'LimitDayCount':
                this.formModel.limitDayCount = this.formModel.limit[i].limitAmount
                break
              case 'LimitMonCount':
                this.formModel.limitMonCount = this.formModel.limit[i].limitAmount
                break
              case 'LimitYearCount':
                this.formModel.limitYearCount = this.formModel.limit[i].limitAmount
                break
            }
          }
        }
        this.dataDetail[0].trsProcessState = res.trsProcessState
        this.handleTableData(res)
      })
    } else if (type === '2') {
      this.activeName = 'second'
      delete this.stepsData.stepsActive
      this.titleHeadData[0].prop = 'jnlno'
      this.btnData[0].show = false
      this.btnData[1].show = false
      httpPost('eweb-query.WaitAuthedQryJnl.do', params).then(res => {
        this.formModel = res.bodyMap
        switch (this.$route.params.detail.authProcessState) {
          case 'AG':
            this.formModel.idea = '0'
            this.formConfigJson.formItems[this.formConfigJson.formItems.length - 1].group[1].show = false
            break
          case 'RJ':
            this.formModel.idea = '1'
            this.formConfigJson.formItems[this.formConfigJson.formItems.length - 1].group[1].show = true
            break
        }
        if (this.formModel.idea === '1') {
          for (let i = 0; i < res.taskInfo.length; i++) {
            if (res.taskInfo[i].processState === 'RJ') {
              this.formModel.refuseBecause = res.taskInfo[i].remark
              break
            }
          }
        }
        if (this.formModel.limit) { // 限额管理数据的获取（仅限额管理）
          for (let i = 0; i < this.formModel.limit.length; i++) {
            switch (this.formModel.limit[i].limitType) {
              case 'LimitTrs':
                this.formModel.limitTrs = this.formModel.limit[i].limitAmount
                break
              case 'LimitDay':
                this.formModel.limitDay = this.formModel.limit[i].limitAmount
                break
              case 'LimitMon':
                this.formModel.limitMon = this.formModel.limit[i].limitAmount
                break
              case 'LimitYear':
                this.formModel.limitYear = this.formModel.limit[i].limitAmount
                break
              case 'LimitDayCount':
                this.formModel.limitDayCount = this.formModel.limit[i].limitAmount
                break
              case 'LimitMonCount':
                this.formModel.limitMonCount = this.formModel.limit[i].limitAmount
                break
              case 'LimitYearCount':
                this.formModel.limitYearCount = this.formModel.limit[i].limitAmount
                break
            }
          }
        }
        this.dataDetail[0].trsProcessState = res.trsProcessState
        this.handleTableData(res)
      })
    } else {
      this.activeName = 'third'
      this.btnData[0].show = false
      if (!(this.$route.params.detail.processState === 'WCK' || this.$route.params.detail.processState === 'CK')) {
        this.btnData[1].show = false
        delete this.stepsData.stepsActive
      }
      httpPost('eweb-query.SelfAuthDetailQuery.do', params).then(res => {
        this.formModel = res.bodyMap
        if (this.formModel.limit) { // 限额管理数据的获取（仅限额管理）
          for (let i = 0; i < this.formModel.limit.length; i++) {
            switch (this.formModel.limit[i].limitType) {
              case 'LimitTrs':
                this.formModel.limitTrs = this.formModel.limit[i].limitAmount
                break
              case 'LimitDay':
                this.formModel.limitDay = this.formModel.limit[i].limitAmount
                break
              case 'LimitMon':
                this.formModel.limitMon = this.formModel.limit[i].limitAmount
                break
              case 'LimitYear':
                this.formModel.limitYear = this.formModel.limit[i].limitAmount
                break
              case 'LimitDayCount':
                this.formModel.limitDayCount = this.formModel.limit[i].limitAmount
                break
              case 'LimitMonCount':
                this.formModel.limitMonCount = this.formModel.limit[i].limitAmount
                break
              case 'LimitYearCount':
                this.formModel.limitYearCount = this.formModel.limit[i].limitAmount
                break
            }
          }
        }
        this.dataDetail[0].trsProcessState = res.trsProcessState
        this.handleTableData(res)
      })
    }
    switch (this.activeName) {
      case 'first':
        this.breadData = ['交易管理', '管理类交易审核', '待审核记录查询']
        break
      case 'second':
        this.breadData = ['交易管理', '管理类交易审核', '审核记录查询']
        break
      case 'third':
        this.breadData = ['交易管理', '管理类交易审核', '我的制单']
        break
    }
  }
}
</script>
