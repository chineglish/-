<template>
    <div class="assets-debt">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="search-result">
          <m-steps :data="stepsData"></m-steps>
          <d-table
            :table-data="dataDetail"
            :tableHeadData="titleHeadData">
          </d-table>
          <div class="fs22" style="padding: 5px 15px;background: #fff;font-weight: 700">录入详情</div>
					<template>
            <el-tabs v-model="cActiveName" @tab-click="handleClick">
              <el-tab-pane label="上存周期" name="first">
                <upload-cycle v-if="propData && cActiveName === 'first'" :propData="propData"></upload-cycle>
              </el-tab-pane>
              <el-tab-pane label="下拨周期" name="second">
                <dial-down-cycle  v-if="propData && cActiveName === 'second'" :propData="propData"></dial-down-cycle>
              </el-tab-pane>
            </el-tabs>
          </template>
					<m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @on-idea-change="ideaChangeHandler"
                @back="back"
                @submit="submit"
                @cancel="cancel"
          >
            <div style="width:100%;" slot="formTable">
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
          </m-new-form>
        </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import uploadCycle from './collectPerSetDetail/uploadCycle'
import dialDownCycle from './collectPerSetDetail/dialDownCycle'
import { approvalStatusList, process_state } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'collectPerSetDetail',
  components: {
    uploadCycle,
    dialDownCycle
  },
  data () {
    return {
      stepsData: {
        stepsActive: 0
      },
      cActiveName: 'first',
      activeName: '',
      propData: null,
      dataDetail: [],
      titleHeadData: [
        { label: '流水号', prop: 'taskSeq' },
        { label: '制单人', prop: 'userName' },
        { label: '交易状态', prop: 'trsProcessState', formatter: (row, column, cellValue, index) => util.handleEnums(process_state, cellValue) }
      ],
      // 面包屑导航
      breadData: ['交易管理', '待审核记录查询'],
      formModel: {
        idea: '',
        refuse: ''
      },
      formConfigJson: {
        rules: {
          idea: [{ required: true, message: '请选择审核意见', trigger: 'submit' }],
          refuse: [{ required: true, message: '请输入拒绝原因', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '100%',
            slotName: 'formTable',
            group: [
              { show: true, disabled: false, label: '审核意见', type: 'radio', options: [{ value: '通过', key: '0' }, { value: '拒绝', key: '1' }], key: 'idea', changeEventName: 'on-idea-change' },
              { show: false, disabled: false, label: '拒绝原因', type: 'input', key: 'refuse' }
            ]
          }
        ]
      },
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
    handleClick (tab, event) {},
    ideaChangeHandler (formModel) {
      const { idea, refuse } = formModel
      this.formModel.refuse = idea === '1' ? refuse : ''
      this.formConfigJson.rules.refuse[0].required = idea === '1'
      this.formConfigJson.formItems[0].group[1].show = idea === '1'
    },
    submit (data) {
      if (data.idea === '0') {
        httpPost('/eweb-setting.CheckPassOrRejForNManConfirm.do').then(res => {
          this.$router.push({
            name: 'confirmPage',
            params: {
              data: this.dataDetail,
              formModel: res
            }
          })
        })
      } else {
        httpPost('/eweb-setting.CheckPassOrRejForNManConfirm.do').then(res => {
          this.$router.push({
            name: 'refuseConfirmPage',
            params: {
              data: this.dataDetail,
              refuse: data.refuse,
              formModel: res
            }
          })
        })
      }
    },
    cancel () {
      httpPost('/eweb-setting.CheckPassOrRejForNManConfirm.do', {}).then(res => {
        this.$router.push({
          name: 'myFormConfirm',
          params: {
            data: this.dataDetail,
            formModel: res,
            type: '3'
          }
        })
      })
    },
    back () {
      this.$router.push({
        name: 'waitQPage',
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
    let { type, jnlNo, detail } = this.$route.params
    if (this.$route.params.detail) {
      this.dataDetail.push(this.$route.params.detail)
    }
    let params = {
      jnlNo: jnlNo,
      productId: detail.productId,
      acSeq: detail.acSeq ? detail.acSeq : '',
      mgmtFlag: '0'
    }
    if (type === '1') {
      this.activeName = 'first'
      this.btnData[1].show = false
      httpPost('eweb-query.WaitAuthQryJnl.do', params).then(res => {
        this.propData = res.bodyMap
        this.dataDetail[0].trsProcessState = res.trsProcessState
        this.handleTableData(res)
      })
    } else if (type === '2') {
      this.activeName = 'second'
      delete this.stepsData.stepsActive
      this.titleHeadData[0].prop = 'jnlno'
      this.btnData[0].show = false
      this.btnData[1].show = false
      this.formConfigJson.formItems[0].group[0].disabled = true
      this.formConfigJson.formItems[0].group[1].disabled = true
      httpPost('eweb-query.WaitAuthedQryJnl.do', params).then(res => {
        this.propData = res.bodyMap
        switch (this.$route.params.detail.authProcessState) {
          case 'AG':
            this.formModel.idea = '0'
            this.formConfigJson.formItems[0].group[1].show = false
            break
          case 'RJ':
            this.formModel.idea = '1'
            this.formConfigJson.formItems[0].group[1].show = true
            break
        }
        if (this.formModel.idea === '1') {
          for (let i = 0; i < res.taskInfo.length; i++) {
            if (res.taskInfo[i].processState === 'RJ') {
              this.formModel.refuse = res.taskInfo[i].remark
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
      this.formConfigJson.formItems[0].group[0].show = false
      if (!(this.$route.params.detail.processState === 'WCK' || this.$route.params.detail.processState === 'CK')) {
        this.btnData[1].show = false
        delete this.stepsData.stepsActive
      }
      httpPost('eweb-query.SelfAuthDetailQuery.do', params).then(res => {
        this.propData = res.bodyMap
        this.dataDetail[0].trsProcessState = res.trsProcessState
        this.handleTableData(res)
      })
    }
    switch (this.activeName) {
      case 'first':
        this.breadData = ['交易管理', '业务类交易审核', '待审核记录查询']
        break
      case 'second':
        this.breadData = ['交易管理', '业务类交易审核', '审核记录查询']
        break
      case 'third':
        this.breadData = ['交易管理', '业务类交易审核', '我的制单']
        this.formConfigJson.formItems[0].group[0].show = false
        break
    }
  }
}
</script>

<style lang="scss" scoped>
	.search-result{
		width: 100%;
		height: auto;
		background: #FFFFFF;
		box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
		margin: 20px 0px;
		.search-result-title{
			padding-left: 30px;
			line-height: 60px;
			font-weight: bold;
			color: #333333;
			span{
				margin-left: 10px;
				padding-left: 5px;
				border-left: #d41618 8px solid;
			}
		}
		.search-result-content{
			.queryDate{
				width: 100%;
				tr{
					text-align: center;
					td{
						height: 50px;
					}
					.icon{
						text-align: right
					}
				}
			}
		}
	}
</style>
