<template>
    <div>
      <div class="boxWrap">
        <div class="topLogo clearfix">
            <img class="fll" src="../image/headerLogo.jpg">
            <div class="fll title fs20">回单查询验证</div>
        </div>
        <div class="box">
            <div class="imgWrap">
                <img src="../image/bg-3.jpg">
            </div>
            <div class="inputWrap">
                <div class="clearfix">
                    <span class="fll">电子回单号</span>
                    <span class="flagStar">*</span>
                    <input class="flr fs16" type="text" v-model="receiptNo">
                </div>
                <div class="clearfix">
                    <span class="fll">验证码</span>
                    <span class="flagStar">*</span>
                    <input class="flr fs16" type="text" v-model="identifyCode">
                </div>
                <div class="clearfix">
                    <span class="fll">付款账户</span>
                    <span class="flagStar">*</span>
                    <input class="flr fs16" type="text" v-model="payerAcNo">
                </div>
                <div class="clearfix">
                    <span class="fll">收款账户（缴费号）</span>
                    <input class="flr fs16" type="text" v-model="payeeAcNo">
                </div>
                <div class="clearfix">
                    <span class="fll">付款金额</span>
                    <span class="flagStar">*</span>
                    <input class="flr fs16" type="text" v-model="amount">
                </div>
                <div class="btnWrap">
                    <button class="m-cancel-btn" @click="back">返回</button>
                    <button class="m-submit-btn" @click="goSearch">查询</button>
                    <button class="m-submit-btn" @click="goCheck">验证</button>
                </div>
                <div>
                  <ul id="error-box"></ul>
                </div>
            </div>
        </div>
        <ul>
            <li>1、我行提供的网上银行电子回单仅作为客户记账和发货的参考，不作为客户入账依据。</li>
            <li>2、收款方如果非我行客户，也可通过访问我行网站验证付款方提供回单的真实性。</li>
        </ul>
      </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  data () {
    return {
      receiptNo: '', // 电子回单号
      identifyCode: '', // 验证码
      payerAcNo: '', // 付款账号
      payeeAcNo: '', // 收款账号（缴费号）
      amount: '', // 付款金额
      error: false
    }
  },
  methods: {

    //  查询打印 recMode 2
    goSearch () {
      this.error = false
      var params = {
        receiptNo: this.receiptNo,
        identifyCode: this.identifyCode,
        payerAcNo: this.payerAcNo,
        payeeAcNo: this.payeeAcNo,
        amount: this.amount,
        recMode: '2',
        receiptMChannel: '1'
      }
      httpPost('eweb-query.EleRecptVerifQry.do', params).then(res => {
        this.bodyMap = res.bodyMap
        if (this.bodyMap.transCode === '体彩缴费') {
          this.$router.push({
            name: 'receiptPayDetail',
            params: {
              data: res,
              formModel: this.formModel,
              routerPath: this.$route.params.routerPath
            }
          })
        } else {
          this.$router.push({
            name: 'receiptPlaDetail',
            params: {
              data: res,
              formModel: this.formModel,
              routerPath: this.$route.params.routerPath
            }
          })
        }
      })
    },
    // 验证 recMode 1
    goCheck () {
      this.error = false
      var params = {
        receiptNo: this.receiptNo,
        identifyCode: this.identifyCode,
        payerAcNo: this.payerAcNo,
        payeeAcNo: this.payeeAcNo,
        amount: this.amount,
        recMode: '1',
        receiptMChannel: '1'
      }
      httpPost('eweb-query.EleRecptVerifQry.do', params).then(res => {
        this.bodyMap = res.bodyMap
        if (this.bodyMap.transCode === '体彩缴费') {
          this.$router.push({
            name: 'receiptPayDetail',
            params: {
              data: res,
              formModel: this.formModel,
              routerPath: this.$route.params.routerPath
            }
          })
        } else {
          this.$router.push({
            name: 'receiptPlaDetail',
            params: {
              data: res,
              formModel: this.formModel,
              routerPath: this.$route.params.routerPath
            }
          })
        }
      })
    },
    back () {
      util.ReLogin(() => {
        this.$router.push(this.$route.params.routerPath)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.boxWrap {
  margin-bottom: 20px;
  padding: 20px 0;
  background: #fff;
  box-shadow: 0 0 10px #ccc;
  .topLogo {
    margin: 0 auto;
    width: 500px;
    img {
        width: 215px;
        height: 100px;
    }
    .title {
        margin-top: 50px;
        margin-left: 50px;
        font-weight: 600;
    }
  }
  .box {
    margin: 0 auto;
    width: 700px;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: #f8f8f8;
    display: flex;
    .imgWrap {
        flex: 1;
        img {
            margin: 20px 10px;
            width: 200px;
            height: 360px;
        }
    }
    .inputWrap {
        flex: 2;
        padding: 20px 10px;
        div {
            height: 50px;
            line-height: 50px;
            span {
                margin-left: 26px;
                width: 150px;
                text-align: center;
            }
            .flagStar{
              color: red;
            }
            input {
                width: 180px;
                height: 26px;
                padding: 2px 4px;
                outline: none;
                margin-top: 8px;
                margin-right: 40px;
            }
        }
        .btnWrap {
            text-align: center;
            button {
                margin: 0 30px;
                width: 80px;
                height: 32px;
                cursor: pointer;
                line-height: 0px;
            }
        }
        .warning {
            margin-top: 14px;
            padding-left: 70px;
            img {
                margin-top: 15px;
                width: 22px;
                height: 20px;
            }
            p {
                padding: 0;
                margin: 0;
                margin-left: 12px;
            }
        }
    }
  }
  ul {
    width: 700px;
    margin: 20px auto 0;
    li {
      height: 32px;
      line-height: 32px;
    }
  }
}
</style>

<style lang="scss">
#error-box{
    width: 100%;
    box-sizing: border-box;
    font-size: 12px;
    margin: 15px 0;
    overflow: hidden;
    background: #fdf2f3;
    .error-title{
      float: left;
      margin: 0 15px 0 0;
    }
    .error-li{
      float: left;
      color: #cc444d;
    }
  }
</style>
