<template>
  <div id="history">
    <div class="form-box">
    </div>
    <ul class="listBox">
      <li v-for="(item,index) in list" :key="index">
        <div class="listHead">
          <span class="fs24">{{item.prdName}}</span>
        </div>
        <el-row class="detailItem">
          <el-col :span="4">
            <p class="detailTitle">{{item.prdTemplate==='1300' ? '七日年化收益率' : '业绩比较基准'}}</p>
            <p class="col3">{{item.prdTemplate==='1300' ? item.weekRate : item.modelComment}}</p>
          </el-col>
          <!-- <el-col :span="4">
            <p class="detailTitle">单位净值({{item.apNavDate}})</p>
            <p class="col3">{{item.nav ? item.nav : '-'}}</p>
            <p class="col3">{{item.nav}}</p>
          </el-col> -->
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
          <!-- <el-col :span="4">
            <p class="detailTitle">到期日</p>
            <p class="col4">{{item.endDate}}</p>
          </el-col>
          <el-col :span="3">
            <p class="detailTitle">投资期限</p>
            <p class="col4">{{item.prdTemplate==='1300' ? '开放型：无固定期限' : item.interestDays}}<span v-if="item.prdTemplate !== '1300'" style="color: #333">天</span></p>
          </el-col> -->
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
  name: 'history',
  props: {
    isFromPrdSearch: {},
    formModel: {}
  },
  filters: {
    formatCurrency (value) {
      return util.formatCurrency(value)
    },
    formatStatus (value) {
      return util.handleEnums(finanStatus_Type, value)
    }
  },
  data: function () {
    return {
      historyList: [],
      pageInfo: {
      },
      pageNo: 1,
      pageSize: 20,
      totNum: 0,
      data: []
    }
  },
  computed: {
    list: function () {
      return this.historyList.slice((this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize)
    }
  },
  created () {
    this.getHistoryList(this.formModel)
  },
  methods: {
    // 当前页面发生改变时监听方法
    pageChangeHandler (val) {
      this.pageNo = val
      this.getHistoryList(this.formModel)
    },
    getHistoryList (obj) {
      let params = {
        finStewardFlag: '2',
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        startDate: util.standardDate(obj.startDate),
        endDate: util.standardDate(obj.endDate),
        channel: String(Number(this.isFromPrdSearch))
      }
      httpPost('/eweb-invest.FinaceProductHistRecordQry.do', params).then(res => {
        this.historyList = res.result
        this.totNum = Number(res.totNum)
        for (let i = 0; i < this.historyList.length; i++) {
          this.historyList[i].endDate = util.sepDate(this.historyList[i].endDate)
          this.historyList[i].nav = Number(this.historyList[i].nav).toFixed(6)
        }
        this.$forceUpdate()
      }).catch(() => {
        this.historyList = []
        this.totNum = 0
      })
    },
    // 查看详情
    toDetailPage (item) {
      let params = {
        type: 'buyPro',
        ...item,
        activeName: 'history',
        formModel: this.formModel,
        isFromPrdSearch: this.isFromPrdSearch
      }
      this.$router.push({
        name: 'financialDetail',
        params: params
      })
    }
  }
}
</script>
<style lang="scss">
  body #history{
    .el-input__inner{
      height:40px;
      line-height:40px;
    }
  }
</style>
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
      }
    }
  }
  #history{
    .searchBtn{
      height:40px;
      line-height:40px;
      margin-left:15px;
    }
    .searchBox{
      margin-top:-5px;
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
  .searchDate{
    line-height:60px;
    background-color:#FDF2F3;
    padding:0 1.6%;
  }
  .form-box{
    float:right;
    position: relative;
    top: -10px;
    z-index: 2;
  }
</style>
