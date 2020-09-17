<template>
  <div id="moneyProPage">
    <ul class="listBox">
      <li class="listStyle" v-for="(item,index) in productList" :key="index">
        <div class="header">
          <span class="title fs20">{{item.prdName}}</span>
          <span class="productState fs16">{{item.statusName}}</span>
          <span class="risk fs14">{{item.riskName}}</span>
          <p class="offerPeriod">{{item.status==='0' ? '开放期：无固定期限' : item.status==='1' ? '募集期: '+item.ipoStartDate+'-'+item.ipoEndDate : item.status}}</p>
          <!-- <p class="offerPeriod">{{item.status==='2' ? '开放期：无固定期限' : item.status==='0' ? '募集期: '+item.incomeDate+'-'+item.incomeEndDate : item.status}}</p> -->
        </div>
        <el-row class="details">
          <el-col :span="4">
            <p>{{item.prdTemplate==='1300' ? '七日年化收益率' : '业绩比较基准'}}</p>
            <span class="num">{{item.prdTemplate==='1300' ? item.weekRate : item.modelComment}}</span>
          </el-col>
          <el-col :span="4" v-if="item.prdTemplate==='1300'">
            <p>单位净值({{item.apNavDate}})</p>
            <span class="num">{{item.netWorth}}</span>
          </el-col>
          <el-col :span="3">
            <p>起购金额</p>
            <!-- <span class="text"><span class="num">{{Number(item.ofirstAmt) / 10000}}</span>万元</span> -->
            <span class="text"><span class="num">{{item.ofirstAmt}}</span>万元</span>
          </el-col>
          <el-col :span="4">
            <p>投资周期期限</p>
            <span class="text">{{item.prdTemplate==='1300' ? '无固定期限' : item.interestDays+'天'}}</span>
          </el-col>

        <el-col :span="4" v-if="item.prdTemplate!=='1300'">
            <p>总额度</p>
            <span class="text">{{item.totLimit | formatCurrency }}</span>
          </el-col>
          <el-col :span="6">
            <p>剩余额度</p>
            <span class="text">
              <el-progress :percentage="(item.orgTotUseLimit/item.totLimit)*100" status="exception" :show-text="false"></el-progress><br>{{item.orgTotUseLimit | money}}元
            </span>
          </el-col>
          <el-col :span="3">
            <button class="btn" @click="toBuyPage(item)">购买</button>
          </el-col>
        </el-row>
      </li>
    </ul>
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
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: '',
  data: function () {
    return {
      pageNo: 1,
      pageSize: 20,
      totNum: 0,
      productList: []
    }
  },
  filters: {
    formatCurrency (value) {
      // console.log(value)
      return util.formatCurrency(value)
    }
  },
  mounted: function () {
    this.getNormalList(this.formModel)
  },
  methods: {
    toBuyPage (item) {
      if (item.prdTemplate === '1300') {
        this.$router.push({
          name: 'indexTOne',
          params: ({
            data: item,
            active: 'normal'
          })
        })
      } else {
        this.$router.push({
          name: 'financialPurchase',
          params: ({
            data: item,
            active: 'normal'
          })
        })
      }
    },
    getNormalList (obj) {
      this.formModel = obj
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        orderFlag: '0',
        // prdAttr: '5'
        ipoType: '0'
      }
      httpPost('eweb-invest.InvestProductListQuery.do', params).then(res => {
        this.productList = res.result
        for (let i = 0; i < this.productList.length; i++) {
          this.productList[i].apNavDate = util.sepDate(this.productList[i].apNavDate)
          this.productList[i].ipoStartDate = util.sepDate(this.productList[i].ipoStartDate)
          this.productList[i].ipoEndDate = util.sepDate(this.productList[i].ipoEndDate)
          this.productList[i].incomeDate = util.sepDate(this.productList[i].incomeDate)
          this.productList[i].incomeEndDate = util.sepDate(this.productList[i].incomeEndDate)
          this.productList[i].estabDate = util.sepDate(this.productList[i].estabDate)
          this.productList[i].endDate = util.sepDate(this.productList[i].endDate)
          this.productList[i].netWorth = Number(this.productList[i].netWorth).toFixed(6)
          this.productList[i].ofirstAmt = Number(this.productList[i].ofirstAmt) / 10000
          this.productList[i].oappAmt = Number(this.productList[i].oappAmt) / 10000
        }
        this.totNum = Number(res.totNum)
      })
    },
    // 当前页面发生改变时监听方法
    pageChangeHandler (val) {
      this.pageNo = val
      this.getNormalList(this.formModel)
    }
  }
}
</script>
<style lang="scss">
  #moneyProPage{
    .el-button--primary{
      background-color:#D41618;
      border-color:#D41618
    }
    .el-button--primary:hover{
      background-color:#D41618;
      border-color:#D41618
    }
    .el-button--default:hover{
      color:#D41618;
      background-color:#fff;
      border-color:#D41618
    }
    .el-form-item{
      justify-content: left !important;
    }
    .el-pagination__rightwrapper {
      float: none;
      text-align: center;
    }
  }
</style>
<style lang="scss" scoped>
  #moneyProPage {
    ul {
      padding: 20px;
      .header {
        .title {
          color: #0D155B;
        }
        span  {
          margin-right: 15px;
        }
        .productState {
          color: #D41618;
          border: 1px solid #D41618;
          border-radius: 17px;
          padding: 0px 10px;
          vertical-align: text-bottom;
        }
        .risk {
          padding: 2px 10px;
          background: #03AF3A;
          color: #fff;
        }
        .offerPeriod {
          float: right;
          margin: 0;
          // line-height: 1;
        }
      }
      .details {
        p {
          color: #666;
        }
        .num {
          color: #D41618;
        }
        .text {
          color: #333;
        }
        .el-progress {
          display: inline-block;
          width: 150px;
          margin-right: 10px;
          position: relative;
          top: -5px;
        }
        .btn {
          width: 80px;
          height: 30px;
          background-color: #cc444d;
          background-image: linear-gradient(0deg, #710A0B 0%, #C21D1F 17%, #E72E32 86%, #FFA1A3 100%);
          border-radius: 6px;
          border: 0;
          color: #fff;
          outline: none;
          cursor: pointer;
          position: relative;
          margin-left: 30px;
          top: 40px;
        }
        .btn:active {
          border: none;
        }
      }
      li {
        position: relative;
        padding-bottom: 20px;
        margin-bottom: 20px;
      }
      li:after {
        content: '';
        width: 100%;
        height: 1px;
        background: rgba(0,0,0,0.12);
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
    .paginationStyle {
      padding-bottom: 15px;
      padding-right: 15px;
    }
  }
</style>
