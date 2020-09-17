<template>
  <d2-container class="account-setup-confirm">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form ref="mNewForm"
                  :componentJson="formConfigJson"
                  :formModel="formModel"></m-new-form>

      <div style="width:100%;">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column label="额度范围(下限)" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.minAmount" disabled type="input">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="额度范围(含)(上限)" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.maxAmount" disabled type="input">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="一级审批人数" width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.authCountList[0]" disabled type="input">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="二级审批人数" width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.authCountList[1]" disabled type="input">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="三级审批人数" width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.authCountList[2]" disabled type="input">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="四级审批人数" width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.authCountList[3]" disabled type="input">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="五级审批人数" width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.authCountList[4]" disabled type="input">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="六级审批人数" width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.authCountList[5]" disabled type="input">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="七级审批人数" width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.authCountList[6]" disabled type="input">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="八级审批人数" width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.authCountList[7]" disabled type="select">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="九级审批人数" width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.authCountList[8]" disabled type="input">
              </el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 审批级别设置 -->
      <div class="approval-level-settins">
        <h2 class="title fs20">审批级别设置</h2>
        <div class="table-container">
          <h2 class="title fs14">操作员信息</h2>
          <el-table :data="tableData1" border style="width: 100%;">
            <el-table-column label="审批级别" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.level" disabled>
                  <el-option :key="item" :label="item" :value="item" v-for="item in 9"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="userId" label="操作员号" align="center"></el-table-column>
            <el-table-column prop="userName" label="操作员姓名" align="center"></el-table-column>
          </el-table>
        </div>
      </div>

      <div style="margin: 12px 0;">
        <el-row class="elRow">
          <el-button class="el-button m-submit-btn" @click="conFirm">确认</el-button>
          <el-button class="el-button m-cancel-btn" @click="backHandler">返回</el-button>
        </el-row>
      </div>
    </div>
  </d2-container>
</template>
<script>
import { httpPost } from '../../../../api/sys/http'
import util from '../../../../libs/util'
// import { Sign } from '@/assets/js/SignMsg'

export default {
  name: 'account-setup-confirm',
  data () {
    return {
      payerAccNoList: [],
      transferList: [],
      breadData: ['企业管理台', '审批流程设置'],
      formModel: {},
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            formWidth: '50%',
            title: '审批流程设置',
            group: [
              {
                'label': '账户',
                'key': 'acSeq',
                'type': 'select',
                'options': [],
                'trans': { 'value': 'label', 'key': 'value' },
                'disabled': true
              },
              {
                'label': '交易名称',
                'key': 'prdId',
                'type': 'select',
                'options': [],
                'trans': { 'value': 'prdName', 'key': 'prdId' },
                'disabled': true
              }
            ]
          }
        ]
      },
      tableData: [],
      tableData1: [],
      paramsData: {}
    }
  },
  methods: {
    conFirm () {
      httpPost('eweb-common.GenToken.do').then(e => {
        this.paramsData._tokenName = e._tokenName
        let list = []
        this.tableData1.forEach(e => {
          let obj = {}
          obj.userId = String(e.userId)
          obj.level = e.level
          obj.userSeq = e.userSeq
          obj.userName = e.userName
          list.push(obj)
        })
        const signInfo = this.getSignInfo()
        let singMsg = this.isSign({ _Data2Sign: this.$route.params.formModel._Data2Sign, _authenticateType: this.$route.params.formModel._authenticateType }, signInfo)
        // Sign(this.$route.params.formModel._Data2Sign, signInfo)
        this.paramsData.userList = list
        this.paramsData.acSeq = String(this.paramsData.acSeq)
        this.paramsData.productId = this.paramsData.prdId
        this.paramsData._dataMapKey = this.$route.params.formModel._dataMapKey
        this.paramsData._authenticateTypeChoose = this.$route.params.formModel._authenticateType ? this.$route.params.formModel._authenticateType[0] : ''
        this.paramsData.CSIISignature = singMsg
        this.paramsData.acNo = this.payerAccNoList.find(item => {
          return item.acSeq === this.formModel.acSeq
        }).acNo
        httpPost('eweb-setting.ApproveProcessSet.do', this.paramsData).then(res => {
          let params = {
            payerWater: '审批流程设置',
            transDate: res._transTime,
            _jnlNo: res._jnlNo,
            _JnlStatus: res._processState
            // currentDate, userName, userId, _jnlNo
          }
          this.$router.push({ name: 'accountSetUpResult', params })
        })
      })
    },
    backHandler () {
      this.$router.push({ name: 'approvalProcess' })
    }
  },
  created () {
    const { acSeq, prdId, list, userList, payerAccNoList, transferList } = this.$route.params
    this.paramsData = {
      acSeq, prdId, list, userList
    }
    if (acSeq && prdId) {
      this.formModel = { acSeq, prdId }
    }
    if (list && Array.isArray(list)) {
      this.tableData = [...list]
    }
    if (userList && Array.isArray(userList)) {
      this.tableData1 = [...userList]
    }
    if (payerAccNoList && Array.isArray(payerAccNoList)) {
      this.payerAccNoList = payerAccNoList
      this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        .map(item => ({ label: util.getPayerAccount(item), value: item.acSeq }))
    }
    if (transferList && Array.isArray(transferList)) {
      this.transferList = transferList
      this.formConfigJson.formItems[0].group[1].options = this.transferList
    }
  }
}
</script>
<style lang="scss">
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

  .elRow {
    display: flex;
    justify-content: space-between;
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
        background: rgb(248, 248, 248) !important;
      }
    }
  }
</style>
