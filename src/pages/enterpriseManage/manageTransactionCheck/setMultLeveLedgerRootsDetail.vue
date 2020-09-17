<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-steps :data="stepsData" v-if="step"></m-steps>
    <d-table
        :table-data="dataDetail"
        :tableHeadData="titleHeadData">
    </d-table>
    <div class="fs22" style="padding: 5px 15px;background: #fff;font-weight: 700">录入详情</div>
    <el-table
      :data="setTableData"
      style="width: 100%"
      :border="true"
      row-key="ledgerNo">
      <el-table-column
              label="操作员编号"
              prop="userNo">
      </el-table-column>
      <!-- <el-table-column>
        <template slot-scope="scope">
          <el-checkbox true-label="1" false-label="0" v-model="scope.row.queryPermission" :disabled="true"></el-checkbox>
        </template>
      </el-table-column> -->
      <el-table-column
            label="账簿名"
            prop="asAcName">
      </el-table-column>
      <el-table-column
            label="账簿号"
            prop="asAcNo">
      </el-table-column>
      <el-table-column
            label="币种"
            prop="currencyCode">
       <template slot-scope="scope">{{getcurrencyCode(scope.row.currencyCode)}}</template>
      </el-table-column>
      <el-table-column
            label="权限"
            prop="power">
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px">
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
<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import { currency_type, approvalStatusList, process_state } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'setMultLeveLedgerRootsDetail',
  data: function () {
    return {
      breadData: [],
      stepsData: {
        stepsActive: 0
      },
      step: true,
      setTableData: [],
      dataDetail: [],
      titleHeadData: [
        { label: '流水号', prop: 'taskSeq' },
        { label: '制单人', prop: 'userName' },
        { label: '交易状态', prop: 'trsProcessState', formatter: (row, column, cellValue, index) => util.handleEnums(process_state, cellValue) }
      ],
      activeName: '',
      formModel: {
        idea: '',
        refuseBecause: ''
      },
      formConfigJson: {
        rules: {
          idea: [{ required: true, message: '请选择审核意见', trigger: 'submit' }],
          refuseBecause: [{ required: true, message: '请输入拒绝原因', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '100%',
            slotName: 'formTable',
            group: [
              { disabled: false, label: '审核意见', type: 'radio', options: [{ value: '通过', key: '0' }, { value: '拒绝', key: '1' }], key: 'idea', changeEventName: 'on-idea-change' },
              { show: false, disabled: false, label: '拒绝原因', type: 'input', key: 'refuseBecause' }
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
    getcurrencyCode (currencyCode) {
      return util.handleEnums(currency_type, currencyCode)
    },
    ideaChangeHandler (formModel) {
      console.log(formModel, 1111)
      const { idea, refuseBecause } = formModel
      this.formModel.refuseBecause = idea === '1' ? refuseBecause : ''
      this.formConfigJson.rules.refuseBecause[0].required = idea === '1'
      this.formConfigJson.formItems[0].group[1].show = idea === '1'
    },
    submit (data) {
      if (data.idea === '0') {
        httpPost('/eweb-setting.CheckPassOrRejConfirm.do').then(res => {
          this.$router.push({
            name: 'waitCheckConfirm',
            params: {
              data: this.dataDetail,
              formModel: res
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
              formModel: res
            }
          })
        })
      }
    },
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
    back () {
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
    let { type, jnlNo, detail } = this.$route.params
    if (this.$route.params.detail) {
      this.dataDetail.push(this.$route.params.detail)
    }
    let params = {
      jnlNo: jnlNo,
      productId: detail.productId,
      acSeq: detail.acSeq ? detail.acSeq : '',
      mgmtFlag: '2'
    }
    if (type === '1') {
      this.avtiveName = 'first'
      this.btnData[1].show = false
      httpPost('eweb-query.WaitAuthQryJnl.do', params).then(res => {
        this.setTableData = res.bodyMap.list
        this.dataDetail[0].trsProcessState = res.trsProcessState
        this.handleTableData(res)
      })
    } else if (type === '2') {
      this.activeName = 'second'
      this.titleHeadData[0].prop = 'jnlno'
      this.btnData[0].show = false
      this.btnData[1].show = false
      this.formConfigJson.formItems[0].group[0].disabled = true
      this.formConfigJson.formItems[0].group[1].disabled = true
      this.step = false
      httpPost('eweb-query.WaitAuthedQryJnl.do', params).then(res => {
        this.setTableData = res.bodyMap.list
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
              this.formModel.refuseBecause = res.taskInfo[i].remark
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
        this.step = false
      }
      httpPost('eweb-query.SelfAuthDetailQuery.do', params).then(res => {
        this.setTableData = res.bodyMap.list
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
