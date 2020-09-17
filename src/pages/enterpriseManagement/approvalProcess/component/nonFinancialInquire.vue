<template>
  <d2-container>
    <div class="form-box">
      <m-new-form ref="mNewForm"
                  :componentJson="formConfigJson"
                  :formModel="formModel"
      ></m-new-form>

      <div style="width:100%;margin-top: 20px;padding: 5px 0;" v-for="(item, index) in setList.slice((pageNo-1)*pageSize,pageNo*pageSize)" :key="index">
        <div style="background: #fdf2f3 !important;">
          <span class="transType fs20">交易类型：</span>
          <span class="fs18" style="cursor: pointer;">{{item.prdId | filterPrdId}}</span>
          <p class="set fs20" @click="set(index)">设置</p>
        </div>
        <el-table :data="item.list" border style="width: 100%;">
          <el-table-column v-for="(item, index) in labelList" :key="index" :label="item">
            <template slot-scope="scope">
              <el-input
                :disabled="true"
                v-model="scope.row.authCountList[index]"
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
import { mapMutations } from 'vuex'
import { prd_id } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'nonFinancialInquire',
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
      setList: [],
      transferList: [],
      formModel: {},
      formConfigJson: {
        formItems: []
      },
      tableData: [],
      labelList: ['一级审核人数', '二级审核人数', '三级审核人数', '四级审核人数', '五级审核人数', '六级审核人数', '七级审核人数', '八级审核人数', '九级审核人数']
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    inquire () {
      httpPost('eweb-setting.ProductRightQuery.do', {
        queryFlag: '1',
        bankProductList: this.transferList
      }).then(res => {
        for (let i = 0; i < Object.keys(res.authConfigMap).length; i++) {
          let singleSet = {
            prdId: Object.keys(res.authConfigMap)[i],
            list: res.authConfigMap[Object.keys(res.authConfigMap)[i]]
          }
          this.setList.push(singleSet)
        }
        this.totNum = this.setList.length
      })
    },
    set (index) {
      const params = {
        activeName: 'second',
        prdId: this.setList[(this.pageNo - 1) * this.pageSize + index].prdId
      }
      this.removeKeepAliveList() // 清除页面缓存
      this.$router.push({
        name: 'approvalProcess',
        params: params
      })
    },
    // 当前页面发生改变时监听方法
    pageChangeHandler (val) {
      this.pageNo = val
    }
  },
  created () {
    httpPost('eweb-setting.ApproveProcessQueryPro.do').then(res => {
      this.transferList = res.bankProductList
      this.inquire()
    })
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
