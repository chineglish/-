<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
      <!-- <div class="boxWrap" v-for='(tableData, index) in tableListData' :key='tableData'> -->
      <div class="boxWrap" v-for='tableData in tableListData' :key='tableData'>
        <div v-if="tableData.transCode === '体彩缴费'">
          <div class="table">
            <div class="topLogo clearfix">
              <img class="fll" src="../../../home/image/headerLogo.jpg" />
              <div class="fll title">网上银行电子回单</div>
            </div>
            <div class="receiptId">电子回单号：{{tableData.commonRequestHead ? tableData.commonRequestHead.globalJnlNo : ''}}</div>
            <div class="contentWrap">
              <div class="content">
                <div class="payer">
                  <div>缴费人</div>
                  <p>金额（小写）</p>
                  <p>缴费类型</p>
                  <p>手续费</p>
                  <p>缴费编号</p>
                </div>
                <ul>
                  <div class="itemWrap">
                    <div class="item">
                      <div class="left">对公户名</div>
                      <div class="right rtitle leftLine overFont">{{tableData.payerAccount ? tableData.payerAccount.acName : ''}}</div>
                    </div>
                    <div class="item">
                      <div class="left">对公账号</div>
                      <div class="right leftLine">{{tableData.payerAccount ? tableData.payerAccount.acNo : ''}}</div>
                    </div>
                    <div class="item">
                      <div class="left">开户银行</div>
                      <div class="right leftLine overFont">大连银行</div>
                    </div>
                  </div>
                  <p>{{tableData.amount | amountFilter}}</p>
                  <p>{{tableData.transCode}}</p>
                  <p>{{tableData.feeAmount ? tableData.feeAmount : 0 | amountFilter}}</p>
                  <p>{{tableData.qrySerialNum}}</p>
                </ul>
              </div>
              <div class="content leftLine">
                <div class="payer">
                  <div>缴费信息</div>
                  <p>金额（大写）</p>
                  <p>币种</p>
                  <p>交易时间</p>
                  <p>验证码</p>
                </div>
                <ul>
                  <div class="itemWrap">
                    <div class="item">
                      <div class="left">缴费城市</div>
                      <div class="right rtitle leftLine overFont">大连</div>
                    </div>
                    <div class="item">
                      <div class="left">缴费项目</div>
                      <div class="right leftLine">体彩</div>
                    </div>
                    <div class="item">
                      <div class="left">缴费单位</div>
                      <div class="right leftLine overFont">大连体彩中心</div>
                    </div>
                  </div>
                  <p>{{tableData.amount | capitalFilter}}</p>
                  <p>{{tableData.payerAccount.currency ? tableData.payerAccount.currency : 'CNY' | currencyFilter}}</p>
                  <p>{{tableData.transTime}}</p>
                  <p>{{tableData.identifyCode}}</p>
                </ul>
              </div>
            </div>
            <!-- <div class="tipWrap">
              <div class="tipTitle"></div>
              <div class="tip leftLine"></div>
            </div> -->
            <div class="Imgdesc">
              <div class="imgContent">
                <ul>
                  <div class="imgWrap">
                    <div class="itemTitle">
                      <div class="itemLeft">附言</div>
                      <div class="itemRight leftLine">缴费</div>
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
        </div>
        <div v-if="tableData.transCode !== '体彩缴费'">
          <div class="table">
            <div class="topLogo clearfix">
              <img class="fll" src="../../../home/image/headerLogo.jpg" />
              <div class="fll title">网上银行电子回单</div>
            </div>
            <div class="receiptId">电子回单号：{{tableData.commonRequestHead ? tableData.commonRequestHead.globalJnlNo : ''}}</div>
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
                      <div class="right rtitle leftLine overFont">{{tableData.payerAccount ? tableData.payerAccount.acName : ''}}</div>
                    </div>
                    <div class="item">
                      <div class="left">账号</div>
                      <div class="right leftLine">{{ tableData.payerAccount ? tableData.payerAccount.acNo : ''}}</div>
                    </div>
                    <div class="item">
                      <div class="left">开户银行</div>
                      <div class="right leftLine overFont">大连银行</div>
                    </div>
                  </div>
                  <p>{{tableData.amount | amountFilter}}</p>
                  <p>{{tableData.transCode}}</p>
                  <p>{{tableData.feeAmount ? tableData.feeAmount : 0 | amountFilter}}</p>
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
                  <p>{{tableData.amount | capitalFilter}}</p>
                  <p>{{tableData.payerAccount.currency ? tableData.payerAccount.currency : 'CNY' | currencyFilter}}</p>
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
                    <img src="@/assets/image/bankofdl.jpg">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="prompt" v-if="msgShow">
            <span class="text">此交易回单信息真实有效，请核对回单信息！</span>
          </div>
        </div>
        <!-- <div v-if="(index+1)%3 === 0" class="pageNoWrap">
          {{(index+1)/3}}
        </div> -->
        <!-- <div v-if="(index+1)%2 === 0">
          <span><br clear=all style = 'page-break-before:always' >强制分页span</span>
          <div STYLE="page-break-after: always;">强制分页div</div>
        </div> -->
      </div>
      <div class="boxWrap no-print"> 
        <div class="bottomWrap">
          <div>
            <el-button class="m-submit-btn"  @click="printPage">打印</el-button>
            <!-- <el-button class="m-submit-btn" :style="{ display: downShow }" @click="goDownload">下载</el-button>
            <el-button class="m-submit-btn" :style="{ display: feeShow }" @click="getHandFee">手续费回单</el-button> -->
            <el-button class="m-cancel-btn" @click="back">返回</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type } from '@/assets/js/entity'

export default {
  name: 'receiptDaYin',
  data () {
    return {
      breadData: ['账户管理', '网银电子回单查询', '批量打印'],
      // tableData: {},
      tableListData: [],
      // feeShow: 'none',
      // downShow: '',
      msgShow: false
    }
  },
  filters: {
    amountFilter (item) {
      return util.formatCurrency(item)
    },
    capitalFilter (item) {
      return util.getMoneyHanzi(item)
    },
    currencyFilter (item) {
      return util.handleEnums(currency_type, item)
    }
  },
  methods: {
    printPage () {
      util.handerPrint()
    },
    back () {
      this.$router.push({
        name: 'receiptInquiry',
        params: {
          formModel: this.$route.params.formModel
        }
      })
    }
  },
  created () {
    let obj = this.$route.params.data
    httpPost('eweb-query.IBPSeleReceiptListDetQry.do', { recDetListQry: obj }).then(res => {
      this.tableListData = res.recDetList
      // console.log(22222222, res)
    })
  }
}
</script>

<style lang="scss" scoped>
.boxWrap {
  padding: 10px;
  background: #fff;
  box-shadow: 0 0 10px #333333;
  margin-bottom: 5px;
  .table {
    margin: 0px auto;
    width: 1060px;
    border: 1px solid #333333;
    .topLogo {
      margin: 3px 300px;
      // width: 405px;
      img {
        width: 215px;
        height: 73px;
      }
      .title {
        margin-top: 33px;
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
      display: inline-block\9;
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
                flex: 0.8;
              }
              .right {
                flex: 2.2;
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
            border-top: 1px solid #333333;
          }
        }
      }
    }
    .Imgdesc {
      border-top: 1px solid #333333;
      display: flex;
      height: 100px;
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
              height: 60px;
              line-height: 60px;
              /*border-top: 1px solid #ccc;*/
              display: flex;
              .itemLeft {
                text-align: center;
                flex: 0.51;
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
                flex: 0.51;
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
            line-height: 10px;
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
        flex: 7.7;
        padding-left: 2px;
      }
    }
  }
  .leftLine {
    border-left: 1px solid #333333;
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
// .pageNoWrap {
//   padding-top: 15px;
//   height: 20px;
//   line-height: 20px;
//   text-align: center;
// }
</style>
