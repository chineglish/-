<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="boxWrap">
      <div class="table">
        <div class="topLogo clearfix">
          <img class="fll" src="../image/headerLogo.jpg">
          <div class="fll title fs20">网上银行电子回单</div>
        </div>
        <div class="receiptId">电子回单号：{{tableData.commonRequestHead.globalJnlNo}}</div>
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
                  <div class="right rtitle leftLine overFont">{{tableData.payerAccount.acName}}</div>
                </div>
                <div class="item">
                  <div class="left">账号</div>
                  <div class="right leftLine">{{tableData.payerAccount.acNo}}</div>
                </div>
                <div class="item">
                  <div class="left">开户银行</div>
                  <div class="right leftLine overFont">大连银行</div>
                </div>
              </div>
              <p>{{tableData.amount}}</p>
              <p>{{tableData.transCode}}</p>
              <p>{{tableData.feeAmount}}</p>
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
              <p>{{tableData.payerAccount.currency}}</p>
              <p>{{tableData.transTime}}</p>
            </ul>
          </div>
        </div>
        <div class="tipWrap">
          <div class="tipTitle">验证码</div>
          <div class="tip leftLine">{{tableData.identifyCode}}</div>
        </div>
        <div class="Imgdesc">
          <div class="imgContent">
            <ul>
              <div class="imgWrap">
                <div class="itemTitle">
                  <div class="itemLeft">附言</div>
                  <div class="itemRight leftLine">{{tableData.postscript}}</div>
                </div>
                <div class="itemTip">
                  <div class="tipLeft">重要提示</div>
                  <div class="tipRight leftLine">我行提供的电子回单仅作为客户记账或发货的参考，不作为客户入账的依据。</div>
                </div>
              </div>
            </ul>
            <div class="img leftLine">
              <div>
                <img src="@/assets/image/chapter.png">
              </div>
            </div>
          </div>
        </div>
      </div>
			<div class="prompt" v-if="msgShow">
				<span class="text">此交易回单信息真实有效，请核对回单信息！</span>
			</div>
      <div class="bottomWrap">
        <div>
          <el-button class="m-submit-btn" :style="{ display: downShow }" @click="goDownload">下载</el-button>
          <el-button class="m-cancel-btn" @click="back">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { downloadFile } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type } from '@/assets/js/entity'

export default {
  name: 'receiptPlaDetail',
  data () {
    return {
      breadData: ['回单验证', '网银电子回单', '回单详情'],
      downShow: '',
      msgShow: false,
      tableData: {}
    }
  },
  methods: {
    goDownload () {
      const params = {
        jnlNo: this.tableData.commonRequestHead.globalJnlNo,
        serviceId: this.tableData.commonRequestHead.serviceId,
        prdId: this.tableData.prdId,
        _Download: 'pdf'
      }
      downloadFile('/eweb-query.DownLoadEleRecpt.do', params)
    },
    back () {
      this.$router.push({
        name: 'recQryOrCheck',
        params: {
          formModel: this.$route.params.formModel,
          routerPath: this.$route.params.routerPath
        }
      })
    }
  },
  created () {
    this.tableData = this.$route.params.data.bodyMap
    // 验证方式(recMode)：1-验证 2-查询
    if (this.tableData.recMode === '1') {
      this.downShow = 'none'
      this.msgShow = true
    }
    this.tableData = this.tableData || {}
    if (typeof (this.tableData.feeAmount) === 'undefined') {
      this.tableData.feeAmount = 0
    }
    if (typeof (this.tableData.postscript) === 'undefined') {
      this.tableData.postscript = '--'
    }
    if (this.tableData.payeeAcNo === '') {
      this.tableData.payeeAcNo = '--'
    }
    this.tableData.capital = util.getMoneyHanzi(this.tableData.amount)
    if (this.tableData.payerAccount.currency === null) {
      this.tableData.payerAccount.currency = '人民币'
    } else {
      this.tableData.payerAccount.currency = util.handleEnums(currency_type, this.tableData.payerAccount.currency)
    }
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
          flex: 0.6;
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
                flex: 0.7;
              }
              .right {
                flex: 2;
              }
              .rtitle {
                line-height: 40px;
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
              // border-top: 1px solid #ccc;
              display: flex;
              .itemLeft {
                text-align: center;
                flex: 0.515;
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
              border-top: 1px solid #ccc;
              display: flex;
              .tipLeft {
                text-align: center;
                flex: 0.515;
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
      border-top: 1px solid #ccc;
      height: 40px;
      line-height: 40px;
      display: flex;
      .tipTitle {
        text-align: center;
        flex: 0.655;
      }
      .tip {
        flex: 5;
        padding-left: 2px;
      }
    }
  }
  .leftLine {
    border-left: 1px solid #ccc;
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
