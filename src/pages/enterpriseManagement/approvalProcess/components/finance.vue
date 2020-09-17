<template>
  <d2-container>
    <div class="form-box">
      <m-new-form
        ref="mNewForm"
        :componentJson="formConfigJson"
        :formModel="formModel"
        @changeTransName="changeTransName"
        @changeAc="changeAc"
      ></m-new-form>

      <div style="width:100%;">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column label="额度范围(下限)" width="185">
            <template slot-scope="scope">
              <el-input
                disabled
                v-model="scope.row.minAmount"
                type="input"
                @change="val => scope.row.minAmount = val"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="额度范围(含)(上限)" width="188">
            <template slot-scope="scope">
              <el-input
                :disabled="scope.$index === tableData.length - 1"
                v-model="scope.row.maxAmount"
                type="input"
                @change="val => {
                  scope.row.maxAmount = val
                  formatAmount(scope)
                }"
              >
              </el-input>
            </template>
          </el-table-column>
			<el-table-column v-for="(item, index) in labelList" :key="index" :label="item">
				<template slot-scope="scope">
					<el-input
            v-model="scope.row.authCountList[index]"
            @change="val => scope.row.authCountList[index] = val"
            type="input"
					>
					</el-input>
				</template>
			</el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click.native="deleteRow(scope)" type="text">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div style="margin: 8px 0; padding-left: 12px;">
          <span @click="addMoney" class="addMoney">+添加金额段</span>
        </div>
      </div>

      <!-- 审批级别设置 -->
      <div class="approval-level-settins">
        <h2 class="title fs20">审批级别设置</h2>
        <div class="table-container">
          <h2 class="title fs14">操作员信息</h2>
          <el-table :data="tableData1" border style="width: 100%;">
            <el-table-column label="审批级别" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.level">
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
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { prd_id } from '@/assets/js/entity'

export default {
  name: 'finance',
  data () {
    return {
      baseModel: {
        minAmount: '',
        maxAmount: '',
        authCountList: []
      },
      payerAccNoList: [],
      transferList: [],
      formModel: {
        acSeq: '',
        prdId: '',
        prdName: ''
      },
      formConfigJson: {
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
                'disabled': false,
                'changeEventName': 'changeAc'
              },
              {
                'label': '交易名称',
                'key': 'prdName',
                'type': 'input',
                filterOptions: true,
                'options': [],
                'trans': { 'value': 'prdName', 'key': 'prdId' },
                'disabled': false,
                'changeEventName': 'changeTransName'
              }
            ]
          }
        ]
      },
      tableData: [],
      tableData1: [],
      labelList: ['一级审核人数', '二级审核人数', '三级审核人数', '四级审核人数', '五级审核人数', '六级审核人数', '七级审核人数', '八级审核人数', '九级审核人数']
    }
  },
  methods: {
    formatAmount (obj, key) {
      let { $index } = obj
      this.tableData[$index].maxAmount = util.formatCurrency(this.tableData[$index].maxAmount)
      if (this.tableData[$index].minAmount === this.tableData[$index].maxAmount) {
        this.$message.warning('额度范围上限和下限不能相同')
        return
      }
      this.tableData[$index + 1].minAmount = this.tableData[$index].maxAmount
    },
    changeAc (obj) {
      this.formModel.acSeq = obj.acSeq
      httpPost('eweb-setting.ApproveProcessQueryPro.do', { acSeq: String(obj.acSeq) }).then(res => {
        this.transferList = res.bankProductList
        this.formConfigJson.formItems[0].group[1].options = this.transferList
        if (this.$route.params.activeName !== 'first') {
          this.formModel.prdId = this.formConfigJson.formItems[0].group[1].options[0].prdId
          this.formModel.prdName = this.formConfigJson.formItems[0].group[1].options[0].prdName
        }
        this.changeTransName(this.formModel)
      })
    },
    changeTransName (obj) {
      this.formModel.prdId = obj.prdId
      this.operatorListQry(this.formModel)
    },
    accountListQry () {
      // 付款
      httpPost('eweb-query.PayerAccountListQry.do', { transCode: '' }).then(res => {
        if (res && Array.isArray(res.AcList)) {
          this.payerAccNoList = res.AcList
          this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList.map(item => ({
            label: util.getPayerAccount(item),
            value: item.acSeq
          }))
          if (this.$route.params.activeName !== 'first') {
            this.formModel.acSeq = this.formConfigJson.formItems[0].group[0].options[0].value
          }
          this.changeAc(this.formModel)
        }
      })
    },
    // TODO 操作员列表数据 需要从服务端查询
    operatorListQry (obj) {
      httpPost('eweb-setting.ProductRightQuery.do', obj).then(res => {
        res.userList.forEach(e => {
          e.level = Number(e.level) + 1
        })
        this.tableData1 = res.userList
        if (res.authConfigList) {
          res.authConfigList.forEach(item => {
            item.minAmount = item.minAmount ? util.formatCurrency(item.minAmount) : util.formatCurrency(0)
            item.maxAmount = item.maxAmount ? util.formatCurrency(item.maxAmount) : util.formatCurrency(9999999999999.99)
          })
          this.tableData = res.authConfigList
        } else {
          let obj = { ...JSON.parse(JSON.stringify(this.baseModel)) }
          obj.minAmount = util.formatCurrency(0)
          obj.maxAmount = util.formatCurrency(9999999999999.99)
          obj.authCountList[0] = 1
          this.tableData = [obj]
        }
      })
    },
    addMoney () {
      if (this.tableData[this.tableData.length - 1].maxAmount === '9,999,999,999,999.99') {
        this.tableData[this.tableData.length - 1].maxAmount = ''
      }
      this.tableData.splice(this.tableData.length, 0, JSON.parse(JSON.stringify(this.baseModel)))
      // this.tableData = [...this.tableData, { ...JSON.parse(JSON.stringify(this.baseModel)) }]
      this.tableData[this.tableData.length - 1].maxAmount = util.formatCurrency(9999999999999.99)
      for (let i = 1; i < this.tableData.length; i++) {
        if (this.tableData[i - 1].maxAmount && this.tableData[i - 1].maxAmount !== '9,999,999,999,999.99') {
          this.tableData[i].minAmount = this.tableData[i - 1].maxAmount
        } else {
          this.tableData[i].minAmount = ''
        }
      }
    },
    deleteRow (scope) {
      if (this.tableData.length > 1) {
        const { $index } = scope
        this.tableData.splice($index, 1)
        if ($index === 0) {
          this.tableData[0].minAmount = util.formatCurrency(0)
        } else {
          if ($index === this.tableData.length) {
            this.tableData[this.tableData.length - 1].maxAmount = util.formatCurrency(9999999999999.99)
          } else {
            this.tableData[$index].minAmount = this.tableData[$index - 1].maxAmount ? this.tableData[$index - 1].maxAmount : ''
          }
        }
      } else {
        this.$msg('仅一个时，不能删除')
      }
      // if (this.tableData.length === 1) {
      //   this.tableData[0].minAmount = util.formatCurrency(0)
      //   this.tableData[0].maxAmount = util.formatCurrency(9999999999999.99)
      //   return
      // }
      // const { $index } = scope
      // this.tableData = [...this.tableData.slice(0, $index), ...this.tableData.slice($index + 1)]
      // // if (this.tableData[this.tableData.length - 1].maxAmount === '') {
      // this.tableData[this.tableData.length - 1].maxAmount = util.formatCurrency(9999999999999.99)
      // // }
      // for (let i = 1; i < this.tableData.length; i++) {
      //   if (this.tableData[i - 1].maxAmount && this.tableData[i - 1].maxAmount !== '9,999,999,999,999.99') {
      //     this.tableData[i].minAmount = this.tableData[i - 1].maxAmount
      //   } else {
      //     this.tableData[i].minAmount = ''
      //   }
      // }
    },
    conFirm () {
      let flag2 = false
      for (let i = 0; i < this.tableData.length; i++) {
        if (!this.tableData[i].minAmount || !this.tableData[i].maxAmount) {
          this.$msg('金额段不能为空')
          flag2 = true
          break
        }
      }
      if (flag2) return
      this.tableData.forEach(item => {
        flag2 = !(!item.minAmount || !item.maxAmount)
      })
      for (let j = 0; j < this.tableData.length; j++) {
        let flag = false
        let flag1 = false
        for (let i = 0; i < this.tableData[j].authCountList.length; i++) {
          if (this.tableData[j].authCountList[i] && this.tableData[j].authCountList[i] > 0) {
            if (flag) {
              this.$msg('不允许跨级设置审核人数')
              flag1 = true
              break
            }
          } else {
            flag = true
          }
        }
        if (flag1) return false
      }
      this.tableData.forEach(item => {
        if (!item.authCountList[0]) {
          this.$msg('不允许跨级设置审核人数')
        }
      })
      for (let i = 0; i < this.tableData.length; i++) {
        if (!this.tableData[i].authCountList[0]) {
          this.$msg('每个金额段至少设置一位审核人')
          return
        }
      }
      this.tableData.forEach((item, index) => {
        let list = []
        for (let i = 0; i < item.authCountList.length; i++) {
          if (item.authCountList[i] && item.authCountList[i] > 0) {
            list.push(Number(item.authCountList[i]))
          } else {
            break
          }
        }
        item.authCountList = list
        item.id = String(index)
      })
      for (let i = 1; i < this.tableData.length; i++) {
        if (Number(this.tableData[i].minAmount.split(',').join('')) >= Number(this.tableData[i].maxAmount.split(',').join(''))) {
          this.$msg('您输入的金额段存在问题，请重新输入')
          return
        }
      }
      let arr = new Array(9)
      for (let i = 0; i < arr.length; i++) {
        let arr1 = []
        this.tableData.forEach(obj => {
          obj.authCountList[i] && arr1.push(obj.authCountList[i])
        })
        arr[i] = arr1.sort().reverse()[0]
      }
      let obj = {}
      this.tableData1.forEach(item => {
        obj[item.level] = obj.hasOwnProperty(item.level) ? obj[item.level] + 1 : 1
      })
      for (let n = 0; n < arr.length; n++) {
        if (arr[n]) {
          if (!obj[n + 1] || obj[n + 1] < arr[n]) {
            this.$msg('审批级别人数不足，请重新设置')
            return
          }
        }
      }
      const { form } = this.$refs.mNewForm.$data
      this.$refs.mNewForm.$data.form.prdName = util.handleEnums(prd_id, form.prdId)
      httpPost('/eweb-setting.ApproveProcessSetConfirm.do', {}).then(conf => {
        Object.assign(conf, form)
        this.$router.push({
          name: 'accountSetUpConfirm',
          params: {
            acSeq: form.acSeq,
            prdId: form.prdId,
            list: [...this.tableData],
            userList: this.tableData1,
            payerAccNoList: this.payerAccNoList,
            transferList: this.transferList,
            formModel: conf
          }
        })
      })
    },
    backHandler () {
      this.$router.push({
        name: 'approvalInquire',
        params: {
          activeName: 'first'
        }
      })
    }
  },
  created () {
    if (this.$route.params.activeName === 'first') {
      this.formModel.acSeq = this.$route.params.acSeq
      this.formModel.prdId = this.$route.params.prdId
      this.formModel.prdName = util.handleEnums(prd_id, this.$route.params.prdId)
      this.accountListQry()
    } else {
      this.accountListQry()
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

  .addMoney {
    color: blue;
    cursor: pointer;
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
</style>
