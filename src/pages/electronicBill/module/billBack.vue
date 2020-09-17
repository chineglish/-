<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="boxWrap" id="printID">
      <h2>{{this.stdBillTyp}}</h2>
      <div class="box-header-two-Num">票据号码: {{this.stdBillNum}}</div>
      <div class="table">
        <template v-for="(item, index) in tableData">
         <div :key="index">
            <div class="t-ticket-top">{{item.infoType}}</div>
            <div class="t-ticket-out">
              <div class="t-ticket-out-name">{{item.appName}}</div>
              <div class="t-ticket-out-cpy">&nbsp;&nbsp;{{item.stdAppName}}</div>
            </div>
            <div class="t-ticket-in" v-if="item.rcvName">
              <div class="t-ticket-in-name">{{item.rcvName}}</div>
              <div class="t-ticket-in-cpy">&nbsp;&nbsp;{{item.stdRcvName}}</div>
            </div>
            <!-- 以下为判断显示 -->
            <!-- 日期 -->
            <div class="t-ticket-date" v-if="item.appdate">
              <div class="t-ticket-date-name">{{item.appdate}}</div>
              <div class="t-ticket-date-time">&nbsp;&nbsp;{{item.stdAppDate}}</div>
            </div>
            <!-- 不得转让标识 -->
            <div class="t-ticket-date" v-if="item.endromk">
              <div class="t-ticket-date-name">{{item.endromk}}</div>
              <div class="t-ticket-date-time">&nbsp;&nbsp;{{item.stdTransFerFlag}}</div>
            </div>
            <!-- 保证人地址 -->
            <div class="t-ticket-date" v-if="item.grtadd">
              <div class="t-ticket-date-name">{{item.grtadd}}</div>
              <div class="t-ticket-date-time">&nbsp;&nbsp;{{item.stdGrtAdd}}</div>
            </div>
            <!-- 付款或拒付 -->
            <div class="t-ticket-date" v-if="item.dshnrsu">
              <div class="t-ticket-date-name">{{item.dshnrsu}}</div>
              <div class="t-ticket-date-time">&nbsp;&nbsp;{{item.stdDshnrsu}}</div>
            </div>
            <!-- 付款或拒付日期， 清偿日期 -->
            <div class="t-ticket-date" v-if="item.enddate">
              <div class="t-ticket-date-name">{{item.enddate}}</div>
              <div class="t-ticket-date-time">&nbsp;&nbsp;{{item.stdSignDate}}</div>
            </div>
            <!-- 拒付理由 -->
            <div class="t-ticket-date" v-if="item.dshnrcd">
              <div class="t-ticket-date-name">{{item.dshnrcd}}</div>
              <div class="t-ticket-date-time">&nbsp;&nbsp;{{item.stdDshnrCd}}</div>
            </div>
            <!-- 追索类型 -->
            <div class="t-ticket-date" v-if="item.rcrstyp">
              <div class="t-ticket-date-name">{{item.rcrstyp}}</div>
              <div class="t-ticket-date-time">&nbsp;&nbsp;{{item.stdRcrsTyp}}</div>
            </div>
         </div>
        </template>
      </div>
    </div>
    <div class="bottomWrap">
      <div>
        <button class="el-button m-submit-btn" v-print="{ id: 'printID' }">打印</button>
        <button class="el-button m-cancel-btn" @click="back">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util'
import { rcdCode_Type } from '@/assets/js/entity'
export default {
  name: 'billBack',
  data () {
    return {
      stdBillNum: '',
      breadData: ['电子商业汇票 ', '票据信息查询', '票据信息查询'],
      tableData: []
    }
  },
  methods: {
    goDownload () {
      window.print()
    },
    back () {
      this.$router.push({
        name: 'billFace',
        params: this.$route.params
      })
    }
  },
  created () {
    // 表格信息
    this.tableData = this.$route.params.resList.list
    if (this.$route.params.stdBillTyp === 'AC01') {
      this.stdBillTyp = '电子银行承兑汇票'
    }
    if (this.$route.params.stdBillTyp === 'AC02') {
      this.stdBillTyp = '电子商业承兑汇票'
    }
    // 票据号码
    this.stdBillNum = this.$route.params.stdBillNum
    for (let i = 0; i < this.tableData.length; i++) {
      this.tableData[i].stdDshnrCd = util.handleEnums(rcdCode_Type, this.tableData[i].stdDshnrCd)
      if (this.tableData[i].stdTransFerFlag === 'EM00') {
        this.tableData[i].stdTransFerFlag = '可再转让'
      } else if (this.tableData[i].stdTransFerFlag === 'EM01') {
        this.tableData[i].stdTransFerFlag = '不得转让'
      }
      if (this.tableData[i].stdDshnrsu === 'SU00') {
        this.tableData[i].stdDshnrsu = '同意'
      } else if (this.tableData[i].stdDshnrsu === 'SU01') {
        this.tableData[i].stdDshnrsu = '拒付'
      }
      if (this.tableData[i].stdRcrsTyp === 'RT00') {
        this.tableData[i].stdRcrsTyp = '拒付追索'
      } else if (this.tableData[i].stdRcrsTyp === 'RT01') {
        this.tableData[i].stdRcrsTyp = '非拒付追索'
      }      
    }
  }
}
</script>

<style lang="scss" scoped>
.boxWrap {
  padding: 20px 0;
  background: #fff;
  box-shadow: 0 0 10px #ccc;
  margin-bottom: 20px;
  .box-header-two-Num {
    margin: 0px auto;
    width: 1000px;
    height: 40px;
  }
  .table {
    margin: 0px auto;
    width: 1000px;
    border: 1px solid #ccc;
    .t-ticket-top {
      width: 1000px;
      height: 40px;
      text-align: center;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
    }
    .t-ticket-out {
      width: 1000px;
      height: 40px;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
      .t-ticket-out-name {
        width: 300px;
        text-align: center;
        border-right: 1px solid #ccc;
        float: left;
      }
      .t-ticket-out-cpy {
        width: 699px;
      }
    }
    .t-ticket-in {
      width: 1000px;
      height: 40px;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
      .t-ticket-in-name {
        width: 300px;
        text-align: center;
        border-right: 1px solid #ccc;
        float: left;
      }
      .t-ticket-in-cpy {
        width: 699px;
      }
    }
    .t-ticket-date {
      width: 1000px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      .t-ticket-date-name {
        width: 300px;
        text-align: center;
        border-right: 1px solid #ccc;
        float: left;
      }
      .t-ticket-date-time {
        width: 699px;
      }
    }
  }
  h2{
    margin: 0px auto;
    text-align: center;
  }
}
.bottomWrap {
  padding-top: 20px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
</style>
