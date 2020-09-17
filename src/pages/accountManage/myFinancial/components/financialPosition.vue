<template>
  <div>
    <ul class="listBox">
      <li v-for="(item,index) in list" :key="index">
        <div class="listHead">
          <span class="fs24">{{item.prdName}}</span>
          <span class="agreement fs16" @click="agreeDownload(index)">协议下载</span>
          <a id="agreeDownload" href="" download="" style="display: none"></a>
        </div>
        <el-row class="detailItem">
          <el-col :span="4">
            <p class="detailTitle">{{item.prdTemplate==='1300' ? '七日年化收益率' : '业绩比较基准'}}</p>
            <p class="col3">{{item.prdTemplate==='1300' ? item.weekRate : item.modelComment}}</p>
          </el-col>
          <el-col :span="4" v-if="item.prdTemplate==='1300'">
            <p class="detailTitle">单位净值({{item.apNavDate | formatDate}})</p>
            <p class="col3">{{item.nav}}</p>
          </el-col>
          <el-col :span="4" v-if="item.prdTemplate==='1303' || item.prdTemplate==='1102'">
            <p class="detailTitle">持有金额</p>
            <p class="col4">{{item.vol | formatCurrency}}<span class="fs10"> 元</span></p>
          </el-col>
          <el-col :span="4" v-if="item.prdTemplate==='1300'">
            <p class="detailTitle">持有份额</p>
            <p class="col4">{{item.vol | formatCurrency}}<span class="fs10"> 份</span></p>
          </el-col>
          <el-col :span="4" v-if="item.prdTemplate==='1303' || item.prdTemplate==='1102'">
            <p class="detailTitle">起息日</p>
            <p class="col2">{{item.interestDate}}</p>
          </el-col>
          <el-col :span="4">
            <p class="detailTitle">到期日</p>
            <p class="col2">{{item.prdTemplate==='1300' ? '无固定期限' : item.endDate}}</p>
          </el-col>
          <el-col :span="4">
            <p class="detailTitle">投资周期期限</p>
            <p class="col2">{{item.prdTemplate==='1300' ? '开放型:无固定期限' : item.interestDays}}<span v-if="item.prdTemplate !== '1300'" class="fs18" style="color: #333;">天</span></p>
          </el-col>
          <el-col :span="4" style="text-align:right;">
            <button class="detailBtn" @click="toDetailPage(item)">详情</button>
            <button class="detailBtn" @click="addPurchase(item)" v-if="isFromPrdSearch && item.prdTemplate === '1300'">再次购买</button>
            <button class="detailBtn" @click="redeemOrder(item)" v-if="isFromPrdSearch && item.prdTemplate === '1300'">赎回</button>
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
import { httpPost, downloadFile } from '@/api/sys/http'
import util from '@/libs/util'

// 理财持仓
export default {
  name: 'financialPosition',
  filters: {
    formatCurrency (value) {
      return util.formatCurrency(value)
    },
    formatDate (value) {
      return util.sepDate(value)
    }
  },
  data: function () {
    return {
      positionList: [],
      pageNo: 1,
      pageSize: 20,
      totNum: 0
    }
  },
  computed: {
    list: function () {
      return this.positionList.slice((this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize)
    }
  },
  props: {
    isFromPrdSearch: {
      type: Boolean
    }
  },
  created: function () {
    this.getPosList()
  },
  methods: {
    getPosList () {
      let params = {
        finStewardFlag: '0'
      }
      httpPost('/eweb-invest.FinaceProductHeldQry.do', params).then(res => {
        this.positionList = res.result
        this.totNum = Number(res.totNum)
        for (let i = 0; i < this.positionList.length; i++) {
          this.positionList[i].endDate = util.sepDate(this.positionList[i].endDate)
          this.positionList[i].interestDate = util.sepDate(this.positionList[i].interestDate)
          this.positionList[i].nav = Number(this.positionList[i].nav).toFixed(6)
        }
      })
    },
    // 追加购买
    addPurchase (item) {
      let params = {
        prdCode: item.prdCode,
        prdAttr: '5',
        pageNo: 1,
        pageSize: 10
      }
      httpPost('/eweb-invest.InvestProductListQuery.do', params).then(res => {
        if (item.prdTemplate === '1300') {
          this.$router.push({
            name: 'indexTOne',
            params: ({
              data: res.result[0],
              flag: 1,
              activeName: 'financialPosition',
              isFromPrdSearch: this.isFromPrdSearch
            })
          })
        } else {
          this.$router.push({
            name: 'financialPurchase',
            params: ({
              data: res.result[0],
              flag: 1,
              activeName: 'financialPosition',
              isFromPrdSearch: this.isFromPrdSearch
            })
          })
        }
      })
    },
    // 赎回
    redeemOrder (item) {
      item.payeeAcNo = item.bankAcc
      item.netWorth = item.nav
      this.$router.push({
        name: 'financialRedeemForm',
        params: ({
          data: item
        })
      })
    },
    // 查看详情
    toDetailPage (item) {
      let params = {
        type: 'buyPro',
        ...item,
        activeName: 'financialPosition',
        isFromPrdSearch: this.isFromPrdSearch
      }
      this.$router.push({
        name: 'financialDetailPosition',
        params: params
      })
    },
    // 协议下载
    agreeDownload (index) {
      console.log(this.positionList[index], 123)
      if (this.positionList[index].prdTemplate === '1300') {
        let agreeDownload = document.getElementById('agreeDownload')
        agreeDownload.href = util.getUrl() + 'resources/lianlitian.doc'
        agreeDownload.download = '大连银行鲲鹏理财“连添利”净值型理财产品说明书.doc'
        agreeDownload.click()
      } else {
        if (this.positionList[index].prdTemplate === '1102') {
          const params = {
            _Download: 'pdf',
            prdFlag: '0',
            prdName: this.positionList[index].prdName,
            prdRegisterCode: this.positionList[index].prdRegisterCode,
            interestDays: this.positionList[index].interestDays,
            modelComment: this.positionList[index].modelComment,
            ipoStartYear: this.positionList[index].ipoStartDate.substring(0, 4),
            ipoStartMonth: this.positionList[index].ipoStartDate.substring(4, 6),
            ipoStartDay: this.positionList[index].ipoStartDate.substring(6, 8),
            ipoEndYear: this.positionList[index].ipoEndDate.substring(0, 4),
            ipoEndMonth: this.positionList[index].ipoEndDate.substring(4, 6),
            ipoEndDay: this.positionList[index].ipoEndDate.substring(6, 8),
            estabYear: this.positionList[index].estabDate.substring(0, 4),
            estabMonth: this.positionList[index].estabDate.substring(4, 6),
            estabDay: this.positionList[index].estabDate.substring(6, 8),
            endYear: this.positionList[index].endDate.split('.')[0],
            endMonth: this.positionList[index].endDate.split('.')[1],
            endDay: this.positionList[index].endDate.split('.')[2],
            totLimit: Number(this.positionList[index].totLimit)
          }
          downloadFile('/eweb-invest.InvestExplanationDown.do', params)
        } else if (this.positionList[index].prdTemplate === '1303' && (this.positionList[index].prdName.indexOf('汇享')) > -1) {
          const params = {
            _Download: 'pdf',
            prdFlag: '1',
            prdCode: this.positionList[index].prdCode,
            prdName: this.positionList[index].prdName,
            prdRegisterCode: this.positionList[index].prdRegisterCode,
            interestDays: this.positionList[index].interestDays,
            modelComment: this.positionList[index].modelComment,
            ipoStartYear: this.positionList[index].ipoStartDate.substring(0, 4),
            ipoStartMonth: this.positionList[index].ipoStartDate.substring(4, 6),
            ipoStartDay: this.positionList[index].ipoStartDate.substring(6, 8),
            ipoEndYear: this.positionList[index].ipoEndDate.substring(0, 4),
            ipoEndMonth: this.positionList[index].ipoEndDate.substring(4, 6),
            ipoEndDay: this.positionList[index].ipoEndDate.substring(6, 8),
            estabYear: this.positionList[index].estabDate.substring(0, 4),
            estabMonth: this.positionList[index].estabDate.substring(4, 6),
            estabDay: this.positionList[index].estabDate.substring(6, 8),
            endYear: this.positionList[index].endDate.split('.')[0],
            endMonth: this.positionList[index].endDate.split('.')[1],
            endDay: this.positionList[index].endDate.split('.')[2],
            totLimit: Number(this.positionList[index].totLimit)
          }
          downloadFile('/eweb-invest.InvestExplanationDown.do', params)
        } else if (this.positionList[index].prdTemplate === '1303' && (this.positionList[index].prdName.indexOf('臻萃')) > -1) {
          const params = {
            _Download: 'pdf',
            prdFlag: '2',
            prdCode: this.positionList[index].prdCode,
            prdName: this.positionList[index].prdName,
            prdRegisterCode: this.positionList[index].prdRegisterCode,
            interestDays: this.positionList[index].interestDays,
            modelComment: this.positionList[index].modelComment,
            ipoStartYear: this.positionList[index].ipoStartDate.substring(0, 4),
            ipoStartMonth: this.positionList[index].ipoStartDate.substring(4, 6),
            ipoStartDay: this.positionList[index].ipoStartDate.substring(6, 8),
            ipoEndYear: this.positionList[index].ipoEndDate.substring(0, 4),
            ipoEndMonth: this.positionList[index].ipoEndDate.substring(4, 6),
            ipoEndDay: this.positionList[index].ipoEndDate.substring(6, 8),
            estabYear: this.positionList[index].estabDate.substring(0, 4),
            estabMonth: this.positionList[index].estabDate.substring(4, 6),
            estabDay: this.positionList[index].estabDate.substring(6, 8),
            endYear: this.positionList[index].endDate.split('.')[0],
            endMonth: this.positionList[index].endDate.split('.')[1],
            endDay: this.positionList[index].endDate.split('.')[2],
            totLimit: Number(this.positionList[index].totLimit)
          }
          downloadFile('/eweb-invest.InvestExplanationDown.do', params)
        }
      }
    },
    // 当前页面发生改变时监听方法
    pageChangeHandler (val) {
      this.pageNo = val
      this.getPosList()
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
          // font-weight:bold;
        }
        >span:nth-of-type(2){
          color:#3F3F3F;
          margin-left:20px;
        }
        >span.productendDate{
          position:absolute;
          width:auto;
          right:0;
          top:25%;
          color:#333;
          >span{
            color:#D41618
          }
        }
      }
    }
  }
  .agreement{
    color: #3397DB!important;
    float: right;
    margin-right: 20px;
    cursor: pointer;
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
