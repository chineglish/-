<template>
  <d2-container>
    <div class="form-box">
      <m-new-form ref="mNewForm"
                  :componentJson="formConfigJson"
                  :formModel="formModel"
                  @changeTransName="changeTransName"
      ></m-new-form>

      <div style="width:100%;">
        <el-table :data="tableData" border style="width: 100%;">
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
        </el-table>
      </div>

      <!-- 审批级别设置 -->
      <div class="approval-level-settins">
        <h2 class="title">审批级别设置</h2>
        <div class="table-container">
          <h2 class="title">操作员信息</h2>
          <el-table :data="tableData1" border style="width: 100%;">
            <el-table-column label="复核级别" align="center">
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
import { httpPost } from '../../../../api/sys/http'
import util from '@/libs/util'
import { prd_id } from '@/assets/js/entity'

export default {
  name: 'non-financial',
  data () {
    return {
      baseModel: {
        authCountList: []
      },
      transferList: [],
      formModel: {
        prdId: '',
        prdName: ''
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '审批流程设置',
            group: [
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
    changeTransName (obj) {
      this.formModel.prdId = obj.prdId
      this.formModel.prdName = util.handleEnums(prd_id, obj.prdId)
      this.operatorListQry(this.formModel)
    },
    transType () {
      httpPost('eweb-setting.ApproveProcessQueryPro.do').then(res => {
        this.transferList = res.bankProductList
        this.formConfigJson.formItems[0].group[0].options = this.transferList
        if (this.$route.params.activeName !== 'second') {
          this.formModel.prdId = res.bankProductList[0].prdId
          this.formModel.prdName = res.bankProductList[0].prdName
          this.operatorListQry(this.formModel)
        } else {
          this.operatorListQry(this.formModel)
        }
      })
    },
    // TODO 需要从服务端获取操作员列表数据
    operatorListQry (obj) {
      httpPost('eweb-setting.ProductRightQuery.do', obj).then(res => {
        res.userList.forEach(e => {
          e.level = Number(e.level) + 1
        })
        this.tableData1 = res.userList
        if (res.authConfigList) {
          this.tableData = res.authConfigList
        } else {
          let obj = { ...JSON.parse(JSON.stringify(this.baseModel)) }
          obj.authCountList[0] = 1
          this.tableData = [obj]
        }
      })
    },
    conFirm () {
      let maxNum = Math.max(...this.tableData[0].authCountList)
      if (maxNum > this.transferList.length) {
        this.$msg('审批人数不够，请重新设置')
      } else {
        const { form } = this.$refs.mNewForm.$data
        this.$refs.mNewForm.$data.form.prdName = util.handleEnums(prd_id, form.prdId)
        let flag = false
        for (let i = 0; i < this.tableData[0].authCountList.length; i++) {
          if (this.tableData[0].authCountList[i] && this.tableData[0].authCountList[i] > 0) {
            if (flag) {
              this.$msg('不允许跨级设置审核人数')
              flag = true
              return
            }
          } else {
            flag = true
          }
        }
        let list = []
        for (let i = 0; i < this.tableData[0].authCountList.length; i++) {
          if (this.tableData[0].authCountList[i] && this.tableData[0].authCountList[i] > 0) {
            list.push(Number(this.tableData[0].authCountList[i]))
          } else {
            break
          }
        }
        this.tableData[0].authCountList = list
        let obj = {}
        this.tableData1.forEach(item => {
          obj[item.level] = obj.hasOwnProperty(item.level) ? obj[item.level] + 1 : 1
        })
        for (let n = 0; n < list.length; n++) {
          if (list[n]) {
            if (!obj[n + 1] || obj[n + 1] < list[n]) {
              this.$msg('审批级别人数不足，请重新设置')
              return
            }
          }
        }
        httpPost('/eweb-setting.ApproveProcessSetConfirm.do', {}).then(conf => {
          Object.assign(conf, form)
          this.$router.push({
            name: 'notAccountSetUpConfirm',
            params: {
              prdId: form.prdId,
              list: [...this.tableData],
              userList: this.tableData1,
              payerAccNoList: this.payerAccNoList,
              transferList: this.transferList,
              formModel: conf
            }
          })
        })
      }
    },
    backHandler () {
      this.$router.push({
        name: 'approvalInquire',
        params: {
          activeName: 'second'
        }
      })
    }
  },
  created () {
    if (this.$route.params.activeName === 'second') {
      this.formModel.prdId = this.$route.params.prdId
      this.formModel.prdName = util.handleEnums(prd_id, this.$route.params.prdId)
      this.transType()
    } else {
      this.transType()
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
</style>
