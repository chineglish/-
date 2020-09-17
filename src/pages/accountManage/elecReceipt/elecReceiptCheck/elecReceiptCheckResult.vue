<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="boxWrap">
      <div class="table">
        <div class="topLogo clearfix">
          <img class="fll" src="../../../home/image/headerLogo.jpg" />
          <div class="fll title">网上银行电子回单</div>
        </div>
        <div class="receiptId">电子回单号：{{tableData.eleReceiptNum}}</div>
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
                  <div class="right rtitle leftLine overFont">{{tableData.payerAccName}}</div>
                </div>
                <div class="item">
                  <div class="left">账号</div>
                  <div class="right leftLine">{{tableData.payerAccName}}</div>
                </div>
                <div class="item">
                  <div class="left">开户银行</div>
                  <div class="right leftLine overFont">{{tableData.payerAccBank}}</div>
                </div>
              </div>
              <p>{{tableData.amount | money}}</p>
              <p>{{tableData.businessType}}</p>
              <p>{{tableData.handlingFee}}</p>
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
                  <div class="right rtitle leftLine overFont">{{tableData.paeyeeAccName}}</div>
                </div>
                <div class="item">
                  <div class="left">账号</div>
                  <div class="right leftLine">{{tableData.payeeAcc}}</div>
                </div>
                <div class="item">
                  <div class="left">开户银行</div>
                  <div class="right leftLine overFont">{{tableData.payeeAccBank}}</div>
                </div>
              </div>
              <p>{{tableData.capital}}</p>
              <p>{{tableData.currency}}</p>
              <p>{{tableData.transDate}}</p>
            </ul>
          </div>
        </div>
        <div class="tipWrap">
          <div class="tipTitle">验证码</div>
          <div class="tip leftLine">{{tableData.VerificationCode}}</div>
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
			<div class="prompt">
				<span class="text">此交易回单信息真实有效，请核对回单信息！</span>
			</div>
      <div class="bottomWrap">
        <div>
          <button class="m-cancel-btn" @click="back">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'verifyRes',
  data () {
    return {
      breadData: ['账户管理', '电子回单验证', '详情页'],
      tableData: {
        eleReceiptNum: '123456',
        payerAccName: '付款人',
        payerAcc: '付款人账户',
        payerAccBank: '付款人银行',
        paeyeeAccName: '收款人',
        payeeAcc: '收款人账号',
        payeeAccBank: '收款人银行',
        amount: '1230',
        capital: '壹仟贰佰叄拾元整',
        businessType: '缴费',
        currency: '人民币',
        transDate: '2019-08-15 09:23:05',
        handlingFee: '1.23',
        VerificationCode: '7e818a7aabcf9e6fbfcf979394be30b9',
        postscript: 'XXXXXXXXXX'
      }
    }
  },
  methods: {
    back () {
      this.$router.push('/elecReceiptCheck')
    }
  },
  created () {},
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
              border-top: 1px solid #ccc;
              display: flex;
              .itemLeft {
                text-align: center;
                flex: 0.805;
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
                flex: 0.805;
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
        flex: 1;
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
