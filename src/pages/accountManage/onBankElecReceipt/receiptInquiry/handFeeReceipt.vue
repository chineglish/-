<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="boxWrap">
      <div class="table">
        <div class="topLogo clearfix">
          <img class="fll" src="../../../home/image/headerLogo.jpg" />
          <div class="fll title">网上银行电子回单</div>
        </div>
        <div class="receiptId">电子回单号：{{tableData.commonRequestHead.globalJnlNo}}</div>
        <div class="contentWrap">
          <div class="content">
            <div class="payer">
              <div>付款人</div>
              <p>手续费(小写)</p>
              <p>业务种类</p>
              <!-- <p></p> -->
            </div>
            <ul>
              <div class="itemWrap">
                <div class="item">
                  <div class="left">户名</div>
                  <div class="right rtitle leftLine overFont">{{tableData.payerAccount.acName}}</div>
                </div>
                <div class="item">
                  <div class="left">账号</div>
                  <div class="right leftLine">{{tableData.payerAccount.acNo}}</div>
                </div>
                <div class="item">
                  <div class="left">开户银行</div>
                  <div class="right leftLine overFont">{{tableData.payerAccount.openBank}}</div>
                </div>
              </div>
              <p>{{tableData.feeAmount | amountFilter}}</p>
              <p>{{tableData.transCode}}</p>
              <!-- <p></p> -->
            </ul>
          </div>
          <div class="content leftLine">
            <div class="payer">
              <div>收款人</div>
              <p>手续费(大写)</p>
              <p>交易时间</p>
              <!-- <p></p> -->
            </div>
            <ul>
              <div class="itemWrap">
                <div class="item">
                  <div class="left">户名</div>
                  <div class="right rtitle leftLine overFont">{{tableData.payeeAcName}}</div>
                </div>
                <div class="item">
                  <div class="left">账号</div>
                  <div class="right leftLine">{{tableData.payeeAcNo}}</div>
                </div>
                <div class="item">
                  <div class="left">开户银行</div>
                  <div class="right leftLine overFont">{{tableData.payeeBankDeptName}}</div>
                </div>
              </div>
              <p>{{tableData.capital}}</p>
              <p>{{tableData.transTime}}</p>
            </ul>
          </div>
        </div>
        <div class="Imgdesc">
          <div class="imgContent">
            <ul>
              <div class="imgWrap">
                <div class="itemTitle">
                  <div class="itemLeft">附言</div>
                  <div class="itemRight leftLine">&nbsp;{{tableData.postscript}}</div>
                </div>
                <div class="itemTip">
                  <div class="tipLeft">重要提示</div>
                  <div class="tipRight leftLine">我行提供的电子回单仅作为客户记账或发货的参考，不作为客户入账的依据。</div>
                </div>
              </div>
            </ul>
            <div class="img leftLine">
              <div>
                <img src="@/assets/image/bankofdl.jpg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="boxWrap no-print">
      <div class="bottomWrap">
        <div>
          <el-button class="m-submit-btn" @click="printPage">打印</el-button>
          <el-button class="m-submit-btn" @click="goDownload">下载</el-button>
          <el-button class="m-cancel-btn" @click="back">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util'
import { downloadFile } from '@/api/sys/http'

export default {
  name: 'handFeeReceipt',
  data () {
    return {
      breadData: ['账户管理', '网银电子回单查询', '详情页'],
      tableData: {}
    }
  },
  filters: {
    amountFilter (item) {
      return util.formatCurrency(item)
    }
  },
  methods: {
    printPage () {
      util.handerPrint()
    },
    goDownload () {
      const params = {
        jnlNo: this.tableData.commonRequestHead.globalJnlNo,
        serviceId: this.tableData.commonRequestHead.serviceId,
        feesFlag: '1',
        _Download: 'pdf',
        prdId: this.tableData.prdId
      }
      downloadFile('/eweb-query.IBPSeleReceiptDetDown.do', params)
    },
    // getTrans () {
    //   this.$router.push('/receiptDetail')
    // },
    back () {
      if (this.$route.params.data.transCode === '体彩缴费') {
        this.$router.push({
          name: 'receiptDetail',
          params: {
            data: this.$route.params.data
          }
        })
      } else {
        this.$router.push({
          name: 'verifyRes',
          params: {
            data: this.$route.params.data
          }
        })
      }
    }
  },
  created () {
    this.tableData = this.$route.params.tableData
    if (typeof (this.tableData.postscript) === 'undefined') {
      this.tableData.postscript = '-'
    }
    this.tableData.capital = util.getMoneyHanzi(this.tableData.feeAmount)
    this.tableData.transDate = util.separationDate(this.tableData.transDate)
  }
}
</script>

<style lang="scss" scoped>
.boxWrap {
  padding: 20px 0;
  background: #fff;
  box-shadow: 0 0 10px #ccc;
  margin-bottom: 20px;
  .table {
    margin: 0px auto;
    width: 1150px;
    border: 1px solid #333333;
    .topLogo {
      margin: 0 auto;
      width: 425px;
      img {
        width: 215px;
        height: 100px;
      }
      .title {
        margin-top: 50px;
        margin-left: 30px;
        font-weight: 600;
      }
    }
    .receiptId {
      border-top: 1px solid #333333;
      padding-left: 30px;
      height: 40px;
      line-height: 40px;
    }
    .contentWrap {
      border-top: 1px solid #333333;
      display: flex;
      height: 200px;
      .content {
        text-align: center;
        flex: 1;
        display: flex;
        .payer {
          flex: 0.5;
          display: flex;
          flex-direction: column;
          div {
            flex: 3;
            padding: 1px 0;
            line-height: 120px;
          }
          p {
            flex: 1;
            line-height: 40px;
            border-top: 1px solid #333333;
          }
        }
        ul {
          border-left: 1px solid #333333;
          flex: 2;
          display: flex;
          flex-direction: column;
          .itemWrap {
            flex: 3;
            .item {
              flex: 1;
              height: 40px;
              line-height: 40px;
              border-top: 1px solid #333333;
              display: flex;
              .left {
                flex: 1;
              }
              .right {
                flex: 4;
              }
              .rtitle {
                line-height: 40px;
                width: 367.23px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
          .itemWrap .item:nth-child(1) {
            border-top: none;
          }
          p {
            flex: 1;
            line-height: 40px;
            border-top: 1px solid #333333;
          }
        }
      }
    }
    .Imgdesc {
      border-top: 1px solid #333333;
      display: flex;
      height: 120px;
      .imgContent {
        flex: 1;
        display: flex;
        ul {
          // border-left: 1px solid #333333;
          flex: 2;
          display: flex;
          flex-direction: column;
          .imgWrap {
            flex: 2;
            .itemTitle {
              flex: 1;
              height: 80px;
              line-height: 80px;
              // border-top: 1px solid #333333;
              display: flex;
              .itemLeft {
                text-align: center;
                // flex: 0.5;
                width: 114.7px;
              }
              .itemRight {
                padding-left: 10px;
                flex: 3;
              }
            }
            .itemTip {
              flex: 1;
              height: 40px;
              line-height: 40px;
              border-top: 1px solid #333333;
              display: flex;
              .tipLeft {
                text-align: center;
                // flex: 0.8;
                width: 114.7px;
              }
              .tipRight {
                padding-left: 10px;
                flex: 3;
              }
            }
          }
        }
        .img {
          flex-direction: column;
          flex: 0.5;
          display: flex;
          div {
            flex: 2;
            padding: 1px 0;
            text-align: center;
            line-height: 120px;
          }
        }
      }
    }
    .tipWrap {
      border-top: 1px solid #333333;
      height: 40px;
      line-height: 40px;
      display: flex;
      .tipTitle {
        text-align: center;
        flex: 1;
      }
      .tip {
        flex: 5;
        padding-left: 2px;
      }
    }
  }
  .leftLine {
    border-left: 1px solid #333333;
    width: 367.23px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .overFont {
    text-align: center;
    line-height: 40px;
  }
}
p {
  margin: 0;
  padding: 0;
}
.bottomWrap {
  padding-top: 20px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
</style>
