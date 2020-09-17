<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <div class="boxWrap">
        <div class="table">
            <div class="topLogo clearfix">
                <img class="fll" src="../image/headerLogo.jpg">
                <div class="fll title fs20">电子回单样式</div>
            </div>
            <div class="receiptId">电子回单号：{{tableData.receiptNo}}</div>
            <div class="contentWrap">
                <div class="content">
                  <div class="payer">
                    <div>付款人</div>
                    <p>金额（小写）</p>
                    <p>业务种类</p>
                    <p>交易时间</p>
                  </div>
                  <ul>
                      <div class="itemWrap">
                        <div class="item">
                          <div class="left">户名</div>
                          <div class="right rtitle leftLine overFont">{{tableData.payerName}}</div>
                        </div>
                        <div class="item">
                          <div class="left">账号</div>
                          <div class="right leftLine">{{tableData.payerAcNo}}</div>
                        </div>
                        <div class="item">
                          <div class="left">开户银行</div>
                          <div class="right leftLine overFont">{{tableData.payerBankName}}</div>
                        </div>
                      </div>
                    <p>{{tableData.amount|Money}}</p>
                    <p>{{tableData.transCode}}</p>
                    <p>{{tableData.receiptDatetime}}</p>
                  </ul>
                </div>
                <div class="content leftLine">
                  <div class="payer">
                    <div>收款人</div>
                    <p>金额（大写）</p>
                    <p>手续费</p>
                    <p>验证码</p>
                  </div>
                  <ul>
                    <div class="itemWrap">
                        <div class="item">
                          <div class="left">户名</div>
                          <div class="right rtitle leftLine overFont">{{tableData.payeeName}}</div>
                        </div>
                        <div class="item">
                          <div class="left">账号</div>
                          <div class="right leftLine">{{tableData.payeeAcNo}}</div>
                        </div>
                        <div class="item">
                          <div class="left">开户银行</div>
                          <div class="right leftLine overFont">{{tableData.payeeBankName}}</div>
                        </div>
                    </div>
                    <p>{{tableData.capAmount}}</p>
                    <p>{{tableData.fees}}</p>
                    <p>{{identifyCode}}</p>
                  </ul>
                </div>
            </div>
            <div class="Imgdesc">
              <div class="imgWrap">
                <img src="@/assets/image/chapter.png">
              </div>
              <div class="descWrap leftLine">
                  {{tableData.purpose}}
              </div>
            </div>
            <div class="tipWrap">
              <div class="tipTitle">重要提示</div>
              <div class="tip leftLine">我行提供的电子回单仅作为客户记账或发货的参考，不作为客户入账的依据。</div>
            </div>
        </div>
          <!-- <div v-if="btnWrap === true" class="bottomWrap">
              <div>
                  <button @click="goDownload('xls')">下载xls</button>
                  <button @click="goDownload('pdf')">下载pdf</button>
                  <button @click="goDownload('txt')">下载txt</button>
                  <button @click="changeBtnWrap">返回打印</button>
              </div>
          </div> -->
        <!-- <div v-else class="bottomWrap">
          <span class="fs18" v-if="recMode === 1">该回单是真实可靠的！</span>
          <div v-else>
            <button @click="goPrint">打印回单</button>
            <button @click="changeBtnWrap">下载回单</button>
          </div>
        </div> -->

      </div>
    </div>
</template>

<script>
// import { downloadFile } from '@/api/sys/http'
// import { currency_type } from '@/assets/js/entity'

export default {
  data () {
    return {
      recMode: 0, // 2--查询打印 1--验证
      identifyCode: '',
      tableData: [],
      btnWrap: false
    }
  },
  methods: {
    goPrint () {
      window.print()
    },
    changeBtnWrap () {
      this.btnWrap = !this.btnWrap
    },
    goDownload (str) {
      // let currency = currency_type.find(item => item.value === this.tableData.currency)
      // let params = {
      //   receiptNo: this.tableData.receiptNo,
      //   identifyCode: this.identifyCode,
      //   payerAcNo: this.tableData.payerAcNo,
      //   payeeAcNo: this.tableData.payeeAcNo,
      //   amount: this.tableData.amount,
      //   capAmount: this.tableData.capAmount,
      //   fees: this.tableData.fees,
      //   currency: currency.label,
      //   payeeName: this.tableData.payeeName,
      //   payeeBankName: this.tableData.payeeBankName,
      //   purpose: this.tableData.purpose,
      //   receiptDatetime: this.tableData.receiptDatetime,
      //   transCode: this.tableData.transCode,
      //   capamount: this.tableData.capamount,
      //   payerName: this.tableData.payerName,
      //   recTmpFlag: this.tableData.recTmpFlag,
      //   _Download: str
      // }
      // downloadFile('/eweb-query.DownLoadEleRecpt.do', params)
    }
  },
  created () {
    // this.identifyCode = this.$route.params.identifyCode
    // if (this.$route.params.recMode === 2) {
    //   this.breadData = ['回单验证', '回单详情']
    //   this.tableData = this.$route.params.tableData
    //   this.recMode = this.$route.params.recMode
    //   this.tableData.time = this.$route.params.tableData
    // } else if (this.$route.params.recMode === 1) {
    //   this.breadData = ['回单验证', '回单验证']
    //   this.tableData = this.$route.params.tableData
    //   this.recMode = this.$route.params.recMode
    //   this.tableData.time = this.$route.params.tableData
    // }
  },
  mounted () {}
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
    width: 1000px;
    border: 1px solid #ccc;
    .topLogo {
      margin: 0 auto;
      width: 405px;
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
      border-top: 1px solid #ccc;
      padding-left: 30px;
      height: 40px;
      line-height: 40px;
    }
    .contentWrap {
      border-top: 1px solid #ccc;
      display: flex;
      height: 240px;
      .content {
        text-align: center;
        flex: 1;
        display: flex;
        .payer {
            flex: 1;
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
                border-top: 1px solid #ccc;
            }
        }
        ul {
            border-left: 1px solid #ccc;
            flex: 2;
            display: flex;
            flex-direction: column;
            .itemWrap {
                flex: 3;
                .item {
                    flex: 1;
                    height: 40px;
                    line-height: 40px;
                    border-top: 1px solid #ccc;
                    display: flex;
                    .left {
                        flex: 1;
                    }
                    .right {
                        flex: 2;
                    }
                    .rtitle {
                        line-height: 20px;
                    }
                }
            }
            .itemWrap .item:nth-child(1) {
                border-top: none;
            }
            p {
                flex: 1;
                line-height: 40px;
                border-top: 1px solid #ccc;
            }
        }
      }
    }
    .Imgdesc {
      border-top: 1px solid #ccc;
      height: 120px;
      display: flex;
      .imgWrap {
        flex: 1;
        text-align: center;
        padding-top: 10px;
        img {
          width: 120px;
          height: 100px;
        }
      }
      .descWrap {
        flex: 5;
        padding-top: 10px;
        padding-left: 2px;
      }
    }
    .tipWrap {
        border-top: 1px solid #ccc;
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
  .bottomWrap {
    padding-top: 20px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    span {
      color: red;
      font-weight: 600;
    }
    button {
      width: 80px;
      height: 30px;
      margin: 0 60px;
      cursor: pointer;
      line-height: 0px;
    }
  }
  .leftLine {
    border-left: 1px solid #ccc;
  }
  .overFont {
    text-align: left;
    line-height: 20px;
  }
}
p {
    margin: 0;
    padding: 0;
}
</style>
