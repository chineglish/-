<template>
  <d2-container>
    <div class="form-box">
      <m-new-form ref="mNewForm"
                  :componentJson="formConfigJson"
                  :formModel="formModel"
                  :btnData="btnData"
                  @submit="inquire"
                  @changeAc="changeAc"
      ></m-new-form>

      <div style="width:100%;margin-top: 20px;padding: 5px 0;" v-for="(item, index) in setList.slice((pageNo-1)*pageSize,pageNo*pageSize)" :key="index">
        <div style="background: #fdf2f3 !important; padding: 10px 0;">
          <span class="transType fs16">交易类型：</span>
          <span class="fs16" style="cursor: pointer;">{{item.prdId | filterPrdId}}</span>
          <p class="set fs16" @click="set(index)">设置</p>
        </div>
        <el-table
          :data="item.list"
          border style="width: 100%;">
          <el-table-column label="额度范围(下限)" width="185">
            <template slot-scope="scope">
              <el-input
                :disabled="true"
                v-model="scope.row.minAmount"
                type="input"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="额度范围(含)(上限)" width="188">
            <template slot-scope="scope">
              <el-input
                :disabled="true"
                v-model="scope.row.maxAmount"
                type="input"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column v-for="(item, index) in labelList" :key="index" :label="item">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.authCountList[index]"
                :disabled="true"
                type="input"
              >
              </el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationStyle">
        <el-pagination
          :page-size="pageSize"
          :current-page.sync="pageNo"
          :page-count="totNum / pageSize + 1"
          @current-change="pageChangeHandler"
          background
          layout="->, prev, pager, next, total, jumper"
          :total="totNum">
        </el-pagination>
      </div>
    </div>
  </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { mapMutations } from 'vuex'
import { prd_id } from '@/assets/js/entity'

export default {
  name: 'financeInquire',
  filters: {
    filterPrdId (value) {
      return util.handleEnums(prd_id, value)
    }
  },
  data () {
    return {
      pageNo: 1,
      pageSize: 20,
      totNum: 0,
      baseModel: {
        minAmount: '',
        maxAmount: '',
        authCountList: []
      },
      setList: [],
      payerAccNoList: [],
      transferList: [],
      formModel: {
        acSeq: ''
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'label': '账户',
                'key': 'acSeq',
                'type': 'select',
                'options': [],
                'trans': { 'value': 'label', 'key': 'value' },
                'disabled': false,
                'changeEventName': 'changeAc'
              }
            ]
          }
        ]
      },
      tableData: [],
      // tableData1: [],
      labelList: ['一级审核人数', '二级审核人数', '三级审核人数', '四级审核人数', '五级审核人数', '六级审核人数', '七级审核人数', '八级审核人数', '九级审核人数'],
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ]
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    inquire (obj) {
      this.setList = []
      httpPost('eweb-setting.ProductRightQuery.do', {
        acSeq: obj.acSeq,
        queryFlag: '1',
        bankProductList: this.transferList
      }).then(res => {
        for (let i = 0; i < Object.keys(res.authConfigMap).length; i++) {
          let valueList = res.authConfigMap[Object.keys(res.authConfigMap)[i]]
          if (Array.isArray(valueList)) {
            valueList.forEach(item => {
              if (!item.minAmount) {
                item.minAmount = 0
              }
              if (!item.maxAmount) {
                item.maxAmount = 9999999999999.99
              }
            })
          }
          let singleSet = {
            prdId: Object.keys(res.authConfigMap)[i],
            list: valueList
          }
          this.setList.push(singleSet)
        }
        this.totNum = this.setList.length
      })
    },
    set (index) {
      const params = {
        activeName: 'first',
        acSeq: this.formModel.acSeq,
        prdId: this.setList[(this.pageNo - 1) * this.pageSize + index].prdId
      }
      this.removeKeepAliveList() // 清除页面缓存
      this.$router.push({
        name: 'approvalProcess',
        params: params
      })
    },
    changeAc (obj) {
      this.formModel.acSeq = obj.acSeq
      httpPost('eweb-setting.ApproveProcessQueryPro.do', { acSeq: String(obj.acSeq) }).then(res => {
        this.transferList = res.bankProductList
        this.inquire(obj)
      })
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
          this.formModel.acSeq = this.formConfigJson.formItems[0].group[0].options[0].value
          this.changeAc(this.formModel)
        }
      })
    },
    // 当前页面发生改变时监听方法
    pageChangeHandler (val) {
      this.pageNo = val
    }
  },
  created () {
    this.accountListQry()
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
  .transType {
    margin: 0  0 0 30px;
    cursor: pointer;
  }
  .set{
    color: #3397DB!important;
    float: right;
    margin: 0 30px 0 0;
    cursor: pointer;
  }
  .paginationStyle {
    padding-bottom: 15px;
    padding-right: 15px;
  }
</style>
