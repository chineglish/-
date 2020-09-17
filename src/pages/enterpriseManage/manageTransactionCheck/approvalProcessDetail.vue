<template>
  <d2-container class="account-setup-confirm">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-steps :data="stepsData" v-if="step"></m-steps>
      <d-table
          :table-data="dataDetail"
          :tableHeadData="titleHeadData">
      </d-table>
      <div class="fs22" style="padding: 5px 15px;background: #fff;font-weight: 700">录入详情</div>
      <m-new-form ref="mNewForm"
                  :componentJson="setFormConfigJson"
                  :formModel="formModel">
      </m-new-form>
      <div style="width:100%;">
        <el-table :data="setTableData" border style="width: 100%;">
          <el-table-column prop="minAmount" label="额度范围(下限)" width="130" v-if="show"></el-table-column>
          <el-table-column prop="maxAmount" label="额度范围(含)(上限)" width="155" v-if="show"> </el-table-column>
          <el-table-column prop="authCountList[0]" label="一级审批人数" :width="width"></el-table-column>
          <el-table-column prop="authCountList[1]" label="二级审批人数" :width="width"></el-table-column>
          <el-table-column prop="authCountList[2]" label="三级审批人数" :width="width"></el-table-column>
          <el-table-column prop="authCountList[3]" label="四级审批人数" :width="width"></el-table-column>
          <el-table-column prop="authCountList[4]" label="五级审批人数" :width="width"></el-table-column>
          <el-table-column prop="authCountList[5]" label="六级审批人数" :width="width"></el-table-column>
          <el-table-column prop="authCountList[6]" label="七级审批人数" :width="width"></el-table-column>
          <el-table-column prop="authCountList[7]" label="八级审批人数" :width="width"></el-table-column>
          <el-table-column prop="authCountList[8]" label="九级审批人数" :width="width"></el-table-column>
        </el-table>
      </div>
      <!-- 审批级别设置 -->
      <div class="approval-level-settins">
        <div class="table-container">
          <h2 class="title fs14">操作员信息</h2>
          <el-table :data="tableData1" border style="width: 100%;">
            <el-table-column prop="level" label="审批级别" align="center"></el-table-column>
            <el-table-column prop="userId" label="操作员号" align="center"></el-table-column>
            <el-table-column prop="userName" label="操作员姓名" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
      <m-new-form
          :componentJson="formConfigJson"
          :formModel="formModel"
          :btnData="btnData"
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
  </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { prd_id, approvalStatusList, process_state } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'approvalProcessDetail',
  data () {
    return {
      stepsData: {
        stepsActive: 0
      },
      step: true,
      activeName: '',
      payerAccNoList: [],
      transferList: [],
      dataDetail: [],
      titleHeadData: [
        { label: '流水号', prop: 'taskSeq' },
        { label: '制单人', prop: 'userName' },
        { label: '交易状态', prop: 'trsProcessState', formatter: (row, column, cellValue, index) => util.handleEnums(process_state, cellValue) }
      ],
      show: true,
      width: '99',
      breadData: [],
      formModel: {
        acNo: '',
        prdId: '',
        idea: '',
        refuseBecause: ''
      },
      setFormConfigJson: {
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'label': '账号',
                'key': 'acNo',
                'type': 'text',
                'disabled': true
              },
              {
                'label': '交易名称',
                'key': 'prdId',
                'type': 'text',
                'disabled': true
              }
            ]
          }
        ]
      },
      setTableData: [],
      tableData1: [],
      paramsData: {},
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
              { show: true, disabled: false, label: '审核意见', type: 'radio', options: [{ value: '通过', key: '0' }, { value: '拒绝', key: '1' }], key: 'idea', changeEventName: 'on-idea-change' },
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
    ideaChangeHandler (formModel) {
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
      this.btnData[1].show = false
      this.activeName = 'first'
      httpPost('eweb-query.WaitAuthQryJnl.do', params).then(res => {
        this.formModel.acNo = res.bodyMap.acNo
        this.formModel.prdId = util.handleEnums(prd_id, res.bodyMap.productId) // 交易名称转换
        // 判断是财务审批，还是非财务审批
        res.bodyMap.configs.forEach(item => {
          if (item.minAmount) {
            this.show = true
          } else {
            this.show = false
            this.width = '131'
          }
        })
        this.setTableData = res.bodyMap.configs
        res.bodyMap.userList.forEach(item => {
          item.level = item.level + '级'
        })
        this.tableData1 = res.bodyMap.userList // 审批级别
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
        this.formModel.acNo = res.bodyMap.acNo
        this.formModel.prdId = util.handleEnums(prd_id, res.bodyMap.productId) // 交易名称转换
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
        // 判断是财务审批，还是非财务审批
        res.bodyMap.configs.forEach(item => {
          if (item.minAmount) {
            this.show = true
          } else {
            this.show = false
            this.width = '131'
          }
        })
        this.setTableData = res.bodyMap.configs
        res.bodyMap.userList.forEach(item => {
          item.level = item.level + '级'
        })
        this.tableData1 = res.bodyMap.userList // 审批级别
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
        this.formModel.acNo = res.bodyMap.acNo
        this.formModel.prdId = util.handleEnums(prd_id, res.bodyMap.productId) // 交易名称转换
        // 判断是财务审批，还是非财务审批
        res.bodyMap.configs.forEach(item => {
          if (item.minAmount) {
            this.show = true
          } else {
            this.show = false
            this.width = '131'
          }
        })
        this.setTableData = res.bodyMap.configs
        res.bodyMap.userList.forEach(item => {
          item.level = item.level + '级'
        })
        this.tableData1 = res.bodyMap.userList // 审批级别
        this.dataDetail[0].trsProcessState = res.trsProcessState
        this.handleTableData(res)
      })
    }
    switch (this.activeName) {
      case 'first':
        this.breadData = ['交易管理', '管理类交易查询', '待审核记录查询']
        break
      case 'second':
        this.breadData = ['交易管理', '管理类交易查询', '审核记录查询']
        break
      case 'third':
        this.breadData = ['交易管理', '管理类交易查询', '我的制单']
        break
    }
  }
}
</script>
<style lang="scss" scope>
  .form-box {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.20);
    background: #fff;

    &:before,
    &:after {
      content: "";
      display: table;
      clear: both;
    }
  }

  .approval-level-settins {
    .title {
      margin: 0;
      padding-left: 30px;
      line-height: 60px;
      color: #333;
      background: #fff;
    }

    .table-container {
      .title {
        height: 47.2px;
        line-height: 47.2px;
        text-align: center;
        color: #909399;
        background: rgb(248, 248, 248);
      }
    }
  }

  .account-setup-confirm {
    .el-input {
      width: 100% !important;
      height: 34px !important;
    }

    .el-table {
      th {
        background: rgb(253, 242, 243);
      }
    }
  }
</style>
