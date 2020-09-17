<template>
  <div>
    <ul class="listBox">
      <li v-for="(item,index) in list" :key="index">
        <div class="listHead">
          <span class="fs24">{{item.PrdName}}</span>
        </div>
        <el-row class="detailItem">
          <el-col :span="4">
            <p class="detailTitle">{{item.prdTemplate==='1300' ? '七日年化收益率' : '业绩比较基准'}}</p>
            <p class="col3">{{item.prdTemplate==='1300' ? item.weekRate : item.modelComment}}</p>
          </el-col>
          <el-col :span="6">
            <p class="detailTitle">协议编号</p>
            <p class="col1">{{item.serialNo}}</p>
          </el-col>
          <el-col :span="4" v-if="item.vol !== '0.00'">
            <p class="detailTitle">持有份额</p>
            <p class="col4">{{item.vol | formatCurrency}}<span class="fs10"> 份</span></p>
          </el-col>
          <el-col :span="4" v-if="item.amt !== '0.00'">
            <p class="detailTitle">持有金额</p>
            <p class="col4">{{item.amt | formatCurrency}}<span class="fs10"> 元</span></p>
          </el-col>
          <el-col :span="4">
            <p class="detailTitle">交易类型</p>
            <p class="col4">{{item.transName}}</p>
          </el-col>
          <el-col :span="3">
            <p class="detailTitle">交易状态</p>
            <p class="col4">{{item.status | formatStatus}}</p>
          </el-col>
          <el-col :span="3" style="text-align:right;">
            <button class="detailBtn" @click="toDetailPage(item)">详情</button>
            <button class="detailBtn" @click="addPurchase(item)" v-if="isFromPrdSearch">再次购买</button>
            <button class="detailBtn" @click="redeemOrder(item)" v-if="isFromPrdSearch && (item.status === '0' || item.status === '1')">撤单</button>
            <!-- <button class="detailBtn" @click="redeemOrder(item)">撤单</button> -->
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
import { finanStatus_Type } from '@/assets/js/entity'

export default {
  name: 'agencyTrans',
  filters: {
    formatCurrency (value) {
      return util.formatCurrency(value)
    },
    formatStatus (value) {
      return util.handleEnums(finanStatus_Type, value)
    }
  },
  computed: {
    list: function () {
      return this.transList.slice((this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize)
    }
  },
  data: function () {
    return {
      transList: [],
      pageNo: 1,
      pageSize: 20,
      totNum: null
    }
  },
  props: {
    isFromPrdSearch: {
      type: Boolean
    }
  },
  created: function () {
    this.getTransList()
  },
  methods: {
    getTransList () {
      let params = {
        finStewardFlag: '1',
        channel: String(Number(this.isFromPrdSearch))
      }
      httpPost('/eweb-invest.FinaceProductEntrustQry.do', params).then(res => {
        this.transList = res.result
        for (let i = 0; i < this.transList.length; i++) {
          this.transList[i].nav = Number(this.transList[i].nav).toFixed(6)
          this.transList[i].isCalm = this.isCalm(this.transList[i].incomeEndDate)
        }
        this.totNum = Number(res.totNum)
      })
    },
    // 查看详情
    toDetailPage (item) {
      let params = {
        type: 'buyPro',
        ...item,
        activeName: 'agencyTransaction',
        isFromPrdSearch: this.isFromPrdSearch
      }
      this.$router.push({
        name: 'financialDetailTrans',
        params: params
      })
    },
    // 当前页面发生改变时监听方法
    pageChangeHandler (val) {
      this.pageNo = val
      this.getTransList()
    },
    // 追加购买
    addPurchase (item) {
      let params = {
        prdCode: item.prdCode,
        prdAttr: '5',
        pageNo: 1,
        pageSize: 20
      }
      httpPost('/eweb-invest.InvestProductListQuery.do', params).then(res => {
        if (item.prdTemplate === '1300') {
          this.$router.push({
            name: 'indexTOne',
            params: ({
              data: res.result[0],
              flag: 1,
              activeName: 'agencyTransaction',
              isFromPrdSearch: this.isFromPrdSearch
            })
          })
        } else {
          this.$router.push({
            name: 'financialPurchase',
            params: ({
              data: res.result[0],
              flag: 1,
              activeName: 'agencyTransaction',
              isFromPrdSearch: this.isFromPrdSearch
            })
          })
        }
      })
    },
    // 撤单操作
    redeemOrder (item) {
      if (item.vol !== '0.00') { // 赎回撤销
        let params = {
          payeeAcNo: item.bankAcc,
          coreJnlNo: item.serialNo,
          prdCode: item.prdCode,
          portion: item.vol,
          vol: item.vol,
          prdTemplate: item.prdTemplate,
          prdName: item.prdName,
          weekRate: item.weekRate,
          netWorth: item.netWorth,
          apNavDate: item.apNavDate
        }
        httpPost('/eweb-invest.InvestProductRedCancleConfirm.do', {
          ...params
        }).then(conf => {
          Object.assign(conf, params)
          this.$router.push({
            name: 'financialRedeemCancelConfirm',
            params: conf
          })
        })
      } else { // 购买撤销
        let params = {
          prdTemplate: item.prdTemplate,
          weekRate: item.weekRate,
          modelComment: item.modelComment,
          payeeAcNo: item.bankAcc,
          coreJnlNo: item.serialNo,
          prdCode: item.prdCode,
          amount: item.amt,
          prdName: item.prdName,
          ofirstAmt: item.ofirstAmt,
          apNavDate: item.apNavDate,
          netWorth: item.netWorth,
          mutiRecommender: item.mutiRecommender,
          incomeDate: item.incomeDate,
          incomeEndDate: item.incomeEndDate
        }
        httpPost('/eweb-invest.InvestProductCancleConfirm.do', {
          ...params
        }).then(conf => {
          Object.assign(conf, params)
          this.$router.push({
            name: 'financialCancelConfirm',
            params: conf
          })
        })
      }
    },
    // 判断当前时间是否在某个时间段内
    isCalm (date) {
      let nowTime = new Date().getTime()
      let time = date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
      let startTime = new Date(time + ' 00:00:00').getTime()
      let endTime = new Date(time + ' 23:59:59').getTime()
      return nowTime > startTime && nowTime < endTime
    }
  }
}
</script>
<style lang="scss" scoped>
  *{margin:0;padding:0;}
  .listBox{
    padding:0 1.6%;
    >li{
      height:180px;
      border-bottom:1px solid rgba(0,0,0,0.12);
      .listHead{
        height:45px;
        position:relative;
        margin-top:33px;
        margin-bottom:20px;
        >span{
          display:inline-block;
        }
        >span:nth-of-type(1){
          color:#0D155B;
        }
        >span:nth-of-type(2){
          color:#3F3F3F;
          margin-left:20px;
        }
      }
    }
  }
  .paginationStyle{
    padding:15px 0;
  }
  .detailTitle{
    color:#666;
    line-height:30px;
  }
  .col1,.col2,.col3,.col4,.col5,.col6{
    line-height:50px;
  }
  .col1{
    color:#333;
  }
  .col4{
    color:#D41618;
    font-weight:bold;
  }
  .col4 span{
    color: #333;
  }
  .col3,.col5,.col6{
    color:#D41618;
    font-weight:bold;
  }
  .detailBtn,.redBackBtn{
    width:110px;
    border-radius:4px;
    margin-top:2px;
  }
  .redBackBtn{
    margin-left:15px;
    color:#fff;
    border:none;
    height:38px;
    line-height:38px;
    background: linear-gradient(0deg, #710A0B 0%, #C21D1F 17%, #E72E32 86%, #FFA1A3 100%);
    // background: -moz-linear-gradient(top, #FFA1A3 0%,#E72E32 15%,#C21D1F 88%, #000000 100%);
    // background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#FFA1A3),color-stop(15%,#E72E32),color-stop(88%,#C21D1F), color-stop(100%,#000000));
    // background: -webkit-linear-gradient(top, #FFA1A3 0%,#E72E32 15%,#C21D1F 88%,#000000 100%);
    // background: -o-linear-gradient(top, #FFA1A3 0%,#E72E32 15%,#C21D1F 88%,#000000 100%);
    // background: -ms-linear-gradient(top, #FFA1A3 0%,#E72E32 15%,#C21D1F 88%,#000000 100%);
    // background: linear-gradient(to bottom, #FFA1A3 0%,#E72E32 15%,#C21D1F 88%,#000000 100%);
  }
  .detailBtn{
    // background: -moz-linear-gradient(top, #C5C5C5 0%, #ffffff 100%);
    // background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#C5C5C5), color-stop(100%,#ffffff));
    // background: -webkit-linear-gradient(top, #C5C5C5 0%,#ffffff 100%);
    // background: -o-linear-gradient(top, #C5C5C5 0%,#ffffff 100%);
    // background: -ms-linear-gradient(top, #C5C5C5 0%,#ffffff 100%);
    // background: linear-gradient(to bottom, #C5C5C5 0%,#ffffff 100%);
    background: linear-gradient(0deg, #710A0B 0%, #C21D1F 17%, #E72E32 86%, #FFA1A3 100%);
    color:#fff;
    height:38px;
    position:relative;
    top:-15px;
    line-height:38px;
    border:1px solid #D22427;
  }
</style>
