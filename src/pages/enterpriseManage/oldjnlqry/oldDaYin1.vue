<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>             
    <div id="detailPrint">
      <div class="boxWrap"> 
        <div class="table">
          <div class="topLogo clearfix">
            <img class="fll" src="../../home/image/headerLogo.jpg" />
            <div class="fll title">网上银行电子回单</div>
          </div>
          <div class="receiptId">电子回单号：{{tableData.jnlNo}}</div>
          <div class="contentWrap">
            <div class="content">
              <div class="payer">
                <div>付款人</div>
                <p>金额（小写）</p>
                <p>业务种类</p>
                <p>手续费</p>
              </div>
              <ul>
                <div class="itemWrap">
                  <div class="item">
                    <div class="left">户名</div>
                    <div class="right rtitle leftLine overFont">{{tableData._JnlData.AcName ? tableData._JnlData.AcName.data : ''}}</div>
                  </div>
                  <div class="item">
                    <div class="left">账号</div>
                    <div class="right leftLine">{{ tableData.acNo}}</div>
                  </div>
                  <div class="item">
                    <div class="left">开户银行</div>
                    <div class="right leftLine overFont">大连银行</div>
                  </div>
                </div>
                <p>{{tableData.amount | amountFilter}}</p>
                <p>{{tableData._TransName | transNameFilter}}</p>
                <p>0.00</p>
              </ul>
            </div>
            <div class="content leftLine">
              <div class="payer">
                <div>收款人</div>
                <p>金额（大写）</p>
                <p>币种</p>
                <p>交易时间</p>
              </div>
              <ul>
                <div class="itemWrap">
                  <div class="item">
                    <div class="left">户名</div>
                    <div class="right rtitle leftLine overFont">{{tableData._JnlData.AcName2 ? tableData._JnlData.AcName2.data : ''}}</div>
                  </div>
                  <div class="item">
                    <div class="left">账号</div>
                    <div class="right leftLine">{{tableData.acNo2}}</div>
                  </div>
                  <div class="item">
                    <div class="left">开户银行</div>
                    <div class="right leftLine overFont">大连银行</div>
                  </div>
                </div>
                <p>{{tableData.capital}}</p>
                <!-- <p>{{ tableData.currency}}</p> -->
                <p>人民币</p>
                <p>{{tableData.dateTime}}</p>
              </ul>
            </div>
          </div>
          <!-- <div class="tipWrap">
            <div class="tipTitle">验证码</div>
            <div class="tip leftLine">{{tableData.identifyCode}}</div>
          </div> -->
          <div class="Imgdesc">
            <div class="imgContent">
              <ul>
                <div class="imgWrap">
                  <div class="itemTitle">
                    <div class="itemLeft">附言</div>
                    <div class="itemRight leftLine">{{tableData._JnlData.Purpose ? tableData._JnlData.Purpose.data : tableData._JnlData.InputAbstract ? tableData._JnlData.InputAbstract.data : ''}}</div>
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
        <div class="prompt" v-if="msgShow">
          <!-- <span class="text">此交易回单信息真实有效，请核对回单信息！</span> -->
        </div>
      </div>
    </div>
    <div class="boxWrap no-print"> 
      <div class="bottomWrap">
        <div>
          <el-button class="m-submit-btn" @click="printPage">打印</el-button>
          <!-- <el-button class="m-submit-btn" :style="{ display: downShow }" @click="goDownload">下载</el-button> -->
          <!-- <el-button class="m-submit-btn" :style="{ display: feeShow }" @click="getHandFee">手续费回单</el-button> -->
          <el-button class="m-cancel-btn" @click="back">返回</el-button>
        </div>
      </div>
    </div>
    <m-hint-box :msgs="promptList"></m-hint-box>
  </div>
</template>

<script>
import util from '@/libs/util'
import { trsEntity } from '@/assets/js/entity'
// import { httpPost, downloadFile } from '@/api/sys/http'

export default {
  name: 'oldDaYin',
  data () {
    return {
      breadData: ['企业管理台', '老网银日志查询', '回单详情页'],
      promptList: [
        '1.用于企业用户验证回单的有效性。'
      ],
      feeShow: 'none',
      // downShow: '',
      msgShow: false,
      tableData: {}
    }
  },
  filters: {
    amountFilter (item) {
      return util.formatCurrency(item)
    },
    transNameFilter (item) {
      return util.handleEnums(trsEntity, item)
    }
  },
  methods: {
    // goDownload () {
    //   const params = {
    //     jnlNo: this.tableData.commonRequestHead.globalJnlNo,
    //     serviceId: this.tableData.commonRequestHead.serviceId,
    //     feesFlag: '',
    //     _Download: 'pdf',
    //     prdId: this.tableData.prdId
    //   }
    //   downloadFile('/eweb-query.IBPSeleReceiptDetDown.do', params)
    // },
    // getHandFee () {
    //   this.$router.push({
    //     name: 'handFeeReceipt',
    //     params: {
    //       tableData: this.tableData,
    //       data: this.$route.params.data
    //     }
    //   })
    // },
    printPage () {
      util.handerPrint()
    },
    back () {
      this.$router.push({
          name: 'oldjnlqry',
          params: {
            formModel: this.$route.params.formModel
          }
      })
      // if (this.$route.params.flag === 1) {
      //   this.$router.push({
      //     name: 'receiptVerify',
      //     params: {
      //       formModel: this.$route.params.formModel
      //     }
      //   })
      // } else {
      //   this.$router.push({
      //     name: 'receiptInquiry',
      //     params: {
      //       formModel: this.$route.params.formModel
      //     }
      //   })
      // }
    }
  },
  created () {
    // this.downShow = 'none'
    // this.msgShow = true
    this.tableData = this.$route.params.data || {}
    console.log(333333333, this.tableData)
    // if (typeof (this.tableData.feeAmount) === 'undefined') {
    //   this.tableData.feeAmount = 0
    // }
    // if (typeof (this.tableData.postscript) === 'undefined') {
    //   this.tableData.postscript = '-'
    // }
    // if (this.tableData.payeeAcNo === '') {
    //   this.tableData.payeeAcNo = '-'
    // }
    this.tableData.capital = util.getMoneyHanzi(this.tableData.amount)
    // if (!this.tableData.currency) {
    //   this.tableData.currency = '人民币'
    // } else {
    //   this.tableData.currency = util.handleEnums(currency_type, this.tableData.currency)
    // }
    // if (this.$route.params.flag === 1) {
    //   this.downShow = 'none'
    //   this.msgShow = true
    //   this.tableData = this.$route.params.res || {}
    //   if (typeof (this.tableData.feeAmount) === 'undefined') {
    //     this.tableData.feeAmount = 0
    //   }
    //   if (typeof (this.tableData.postscript) === 'undefined') {
    //     this.tableData.postscript = '-'
    //   }
    //   if (this.tableData.payeeAcNo === '') {
    //     this.tableData.payeeAcNo = '-'
    //   }
    //   this.tableData.capital = util.getMoneyHanzi(this.tableData.amount)
    //   if (this.tableData.payerAccount.currency === null) {
    //     this.tableData.payerAccount.currency = '人民币'
    //   } else {
    //     this.tableData.payerAccount.currency = util.handleEnums(currency_type, this.tableData.payerAccount.currency)
    //   }
    // } else {
    //   let obj = this.$route.params.data
    //   httpPost('eweb-query.IBPSeleReceiptDetQry.do', { serviceId: obj.serviceId, jnlNo: obj.jnlNo, prdId: obj.prdId }).then(res => {
    //     this.tableData = res.bodyMap
    //     // console.log('this.tableData====', this.tableData)
    //     if (typeof (this.tableData.feeAmount) === 'undefined') {
    //       this.tableData.feeAmount = 0
    //     }
    //     if (typeof (this.tableData.postscript) === 'undefined') {
    //       this.tableData.postscript = '-'
    //     }
    //     if (this.tableData.payeeAcNo === '') {
    //       this.tableData.payeeAcNo = '-'
    //     }
    //     if (this.tableData.feeAmount !== 0 && this.tableData.feeAmount !== '0') {
    //       // this.isDisabled = false
    //       this.feeShow = ''
    //     }
    //     this.tableData.capital = util.getMoneyHanzi(this.tableData.amount)
    //     // this.tableData.transDate = util.separationDate(this.tableData.transDate)
    //     if (this.tableData.payerAccount.currency === null) {
    //       this.tableData.payerAccount.currency = '人民币'
    //     } else {
    //       this.tableData.payerAccount.currency = util.handleEnums(currency_type, this.tableData.payerAccount.currency)
    //     }
    //  })
    // }
  }
}
</script>

<style lang="scss" scoped>
.boxWrap {
  padding: 20px;
  background: #fff;
  box-shadow: 0 0 10px #ccc;
  margin-bottom: 20px;
  .table {
    margin: 0px auto;
    width: 100%;
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
      height: 240px;
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
                flex: 0.5;
              }
              .right {
                flex: 2;
              }
              .rtitle {
                line-height: 40px;
                width: 370.44px;
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
                flex: 0.435;
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
                flex: 0.435;
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
        flex: 0.56;
      }
      .tip {
        flex: 5;
        padding-left: 10px;
      }
    }
  }
  .leftLine {
    border-left: 1px solid #333333;
    width: 370.44px;
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
.prompt {
	margin: 5px auto;
  width: 1000px;
	.text {
		color: #ff0000
	}
}
.bottomWrap {
  padding-top: 20px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
</style>
