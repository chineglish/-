<template>
    <d2-container>
       <m-breadcrumb :data="data"></m-breadcrumb>
       <div class="box">
         <p class="box-title">电子票据示意图</p>
         <div class="drawBill">
           <div class="drawBill-title"><p>出票人</p></div>
           <div class="title-man"></div>
           <div class="hrOne"></div>
           <div class="drawBill-content">
             <div class="rowOne">
               <div class="item-content" style="background: #F18416;" @click="takeApply"><img class="content-img" src="./image/drawBill.png"><span>出票登记</span></div>
               <div><img src="./image/right.png"></div>
               <div @click="ensureApply" class="item-content" style="background: #03C755; text-align: center; line-height: 42px; color: #FFFFFF; font-size: 14px">出票保证申请</div>
               <div><img src="./image/right.png"></div>
               <div @click="acceptApply" class="item-content" style="background: #FFC60B;"><img class="content-img" src="./image/tscd.png"><span >提示承兑申请</span></div>
               <div><img src="./image/right.png"></div>
               <div @click="receiptApply" class="item-content" style="background: #03C755;"><img class="content-img" src="./image/drawBill.png" ><span>提示收票申请</span></div>
             </div>
             <div class="arrowImg">
               <div class="arrow"><img class="arrowimage" style="margin-left: 68px" src="./image/arrow.png"></div>
               <div class="arrow"><img class="arrowimage" style="margin-left: 218px" src="./image/arrow.png"></div>
               <div class="arrow"><img class="arrowimage" style="margin-left: 220px" src="./image/arrow.png"></div>
               <div class="arrow"><img class="arrowimage" style="margin-left: 220px" src="./image/arrow.png"></div>
             </div>
             <div class="rowThree">
               <div @click="removeBill" class="rowItem" style="background: #F44138;"><img class="rowImg" src="./image/revoke.png"><span>撤票</span></div>
               <div @click="ensureApplyCancel" class="rowItem" style="background: #03C755; margin-left: 96px;"><span>出票保证撤销</span></div>
               <div @click="acceptApplyCancel" class="rowItem" style="background: #FFC60B; margin-left: 96px;"><span>提示承兑撤销</span></div>
               <div @click="receiptApplyCancel" class="rowItem" style="background: #03C755; margin-left: 96px;"><span>提示收票撤销</span></div>
             </div>
             <div class="rowFour">
               <div class="arrow"><img class="arrowimage" style="margin-left: 296px" src="./image/arrow.png"></div>
               <div class="arrow"><img class="arrowimage" style="margin-left: 220px" src="./image/arrow.png"></div>
               <div class="arrow"><img class="arrowimage" style="margin-left: 220px" src="./image/arrow.png"></div>
             </div>
             <div class="rowFive">
               <div @click="ensureApplyReply" class="rowItem" style="background: #F44138; margin-left: 230px"><img class="rowImg" src="./image/revoke.png"><span>撤票</span></div>
               <div @click="acceptApplyReply" class="rowItem" style="background: #F44138; margin-left: 96px"><img class="rowImg" src="./image/revoke.png"><span>撤票</span></div>
               <div @click="receiptApplyReply" class="rowItem" style="background: #F44138; margin-left: 96px"><img class="rowImg" src="./image/revoke.png"><span>撤票</span></div>
             </div>
           </div>
         </div>
         <div class="takeBill">
           <div class="takeBill-title"><p>持票人</p></div>
           <div class="takeBill-man"></div>
           <div class="hrTwo"></div>
           <div class="takeBill-content">
             <div class="takeOne">
               <div class="beishu"><span class="beishuOne">背书:&nbsp;&nbsp;</span><span @click="reciteApply">背书申请&nbsp;&nbsp;|</span>&nbsp;&nbsp;<span @click="reciteApplyCancel">背书转让撤销&nbsp;&nbsp;</span></div>
               <div class="baozheng"><span class="baozhengOne">保证:&nbsp;&nbsp;</span>&nbsp;&nbsp;<span @click="reciteApplyReply">背书保证申请</span></div>
               <div class="tiexian"><span class="tiexianOne">贴现:&nbsp;&nbsp;</span><span @click="discountApply">贴现申请&nbsp;&nbsp;|</span>&nbsp;&nbsp;<span @click="discountApplyCancel">贴现申请撤销</span></div>
             </div>
             <div class="takeTwo">
               <div class="imgOne"><img src="./image/lineOne.png"></div>
               <div class="imgbaozheng"><img src="./image/lineTwo.png" style="width: 47px"></div>
               <div class="imgTwo"><img src="./image/lineTwo.png"></div>
             </div>
             <div class="takeThree">
               <div class="threeCircle">
                 <div class="circleItem">
                   <p style="font-weight: bold">票据签收</p>
                   <p class="circleItemP" @click="tishiReply">提示收票应答</p>
                   <p class="circleItemP" @click="beishuReply">背书应答</p>
                   <p class="circleItemP" @click="zhiyaReply">质押应答</p>
                   <p class="circleItemP" @click="jiezhiyaReply">解质押应答</p>
                   <p class="circleItemP" @click="baozhengReply">保证应答</p>
                   <p class="circleItemP" @click="agreePayReply">同意清偿应答</p>
                 </div>
               </div>
             </div>
             <div class="takeFour">
               <div class="imgThree"><img src="./image/lineThree.png"></div>
               <div class="imgFour"><img src="./image/lineFive.png"></div>
               <div class="imgFive"><img src="./image/lineFive.png"></div>
             </div>
             <div class="takeFive">
               <div class="zhiya"><span class="zhiyaColor">质押:&nbsp;&nbsp;</span><span @click="pledgeApply">质押申请&nbsp;&nbsp;|</span>&nbsp;&nbsp;<span @click="pledgeApplyCancel">质押申请撤销</span></div>
               <div class="weituo"><span class="weituoColor">提示付款:&nbsp;&nbsp;</span><span @click="paymentApply">提示付款申请&nbsp;&nbsp;|</span>&nbsp;&nbsp;<span @click="paymentApplyCancel">提示付款申请撤销</span></div>
               <div class="zhuisuo"><span class="zhuisuoColor">追索通知:&nbsp;&nbsp;</span><span @click="recourseApply">追索通知</span></div>
             </div>
           </div>
         </div>
         <div class="acceptBill">
           <div class="acceptBill-title"><p>承兑人</p></div>
           <div class="acceptBill-man"></div>
           <div class="hrThree"></div>
           <div class="acceptBill-content">
             <div @click="tscdReply" class="acceptBill-Item" style="background: #F18416; margin-left: 100px"><img class="imgItem" src="./image/acceptOne.png"><span>提示承兑签收</span></div>
             <div @click="cdbzApply" class="acceptBill-Item" style="background: #21B8FF;margin-left: 70px"><img class="imgItem" src="./image/acceptThree.png"><span>承兑保证申请</span></div>
             <div @click="tsfkReply" class="acceptBill-Item" style="background: #01C755; width: 191px; margin-left: 70px"><img class="imgItem" src="./image/acceptTwo.png"><span>提示付款申请签收</span></div>
           </div>
         </div>
         <div class="acceptBill">
           <div class="acceptBill-title"><p>票据各关系人</p></div>
           <div class="acceptBill-man"></div>
           <div class="hrThree"></div>
           <div class="acceptBill-content">
             <div @click="agreePayApply" class="acceptBill-Item" style="background: #F18416; margin-left: 100px"><img class="imgItem" src="./image/agree.png"><span>同意清偿申请</span></div>
           </div>
         </div>
         <div class="acceptBill">
           <div class="acceptBill-title"><p>质权人</p></div>
           <div class="acceptBill-man"></div>
           <div class="hrThree"></div>
           <div class="acceptBill-content">
             <div @click="zyApplyReply" class="acceptBill-Item" style="background: #F18416; margin-left: 100px"><img class="imgItem" src="./image/zhiyaOne.png"><span>质押申请签收</span></div>
             <div @click="jiezhiyaApply" class="acceptBill-Item" style="background: #01C755; width: 191px; margin-left: 70px"><img class="imgItem" src="./image/zhiyaTwo.png"><span>解质押申请</span></div>
             <div @click="tsfkApply" class="acceptBill-Item" style="background: #21B8FF;margin-left: 70px"><img class="imgItem" src="./image/weituoOne.png"><span>提示付款申请</span></div>
           </div>
         </div>
       </div>
    </d2-container>
</template>
<script>
export default {
  name: 'billIndex',
  data () {
    return {
      data: ['电子票据', '电子票据示意图'],
      menuIdList: [] // 权限菜单
    }
  },
  methods: {
    // 出票人
    // 出票申请
    takeApply () {
      if (this.beforeRouter('IssueRegisterA')) {
        this.$router.push({
          name: 'TicketRegistrationPre'
        })
      }
    },
    // 撤票
    removeBill () {
      if (this.beforeRouter('VacatePcleA')) {
        this.$router.push({
          name: 'CancelTicketPre'
        })
      }
    },
    // 出票保证申请
    ensureApply () {
      if (this.beforeRouter('GuaranteeApplyA')) {
        this.$router.push({
          name: 'EnsureApplyPre'
        })
      }
    },
    // 出票保证撤销
    ensureApplyCancel () {
      if (this.beforeRouter('GuaranteeApplyB')) {
        this.$router.push({
          name: 'EnsureRevokePre'
        })
      }
    },
    // 撤票
    ensureApplyReply () {
      if (this.beforeRouter('VacatePcleA')) {
        this.$router.push({
          name: 'CancelTicketPre'
        })
      }
    },
    // 提示承兑
    acceptApply () {
      if (this.beforeRouter('AcceptApplicationA')) {
        this.$router.push({
          name: 'PromptAcceptanceApplyPre'
        })
      }
    },
    // 提示承兑撤销
    acceptApplyCancel () {
      if (this.beforeRouter('AcceptApplicationB')) {
        this.$router.push({
          name: 'PromptAcceptanceRevokePre'
        })
      }
    },
    // 撤票
    acceptApplyReply () {
      if (this.beforeRouter('VacatePcleA')) {
        this.$router.push({
          name: 'CancelTicketPre'
        })
      }
    },
    // 提示收票申请
    receiptApply () {
      if (this.beforeRouter('PromptChargeTicketA')) {
        this.$router.push({
          name: 'PromptReceiptApplyPre'
        })
      }
    },
    // 提示收票撤销
    receiptApplyCancel () {
      if (this.beforeRouter('PromptChargeTicketB')) {
        this.$router.push({
          name: 'PromptReceiptRevokePre'
        })
      }
    },
    // 撤票
    receiptApplyReply () {
      if (this.beforeRouter('VacatePcleA')) {
        this.$router.push({
          name: 'CancelTicketPre'
        })
      }
    },

    // 持票人---------
    // 背书申请
    reciteApply () {
      if (this.beforeRouter('EndorsedTransferA')) {
        this.$router.push({
          name: 'EndorsementTransferApplyPre'
        })
      }
    },
    // 背书申请撤销
    reciteApplyCancel () {
      if (this.beforeRouter('EndorsedTransferB')) {
        this.$router.push({
          name: 'EndorsementTransferRevokePre'
        })
      }
    },
    // 背书保证申请
    reciteApplyReply () {
      if (this.beforeRouter('GuaranteeApplyA')) {
        this.$router.push({
          name: 'EnsureApplyPre'
        })
      }
    },
    // 贴现申请
    discountApply () {
      if (this.beforeRouter('DiscountA')) {
        this.$router.push({
          name: 'DiscountApplyPre'
        })
      }
    },
    // 贴现申请撤销
    discountApplyCancel () {
      if (this.beforeRouter('DiscountB')) {
        this.$router.push({
          name: 'DiscountRevokePre'
        })
      }
    },
    // 质押申请
    pledgeApply () {
      if (this.beforeRouter('PledgeReqA')) {
        this.$router.push({
          name: 'pledgeApplyInput'
        })
      }
    },
    // 质押申请撤销
    pledgeApplyCancel () {
      if (this.beforeRouter('PledgeReqB')) {
        this.$router.push({
          name: 'pledgeRecallInput'
        })
      }
    },
    // 提示付款申请
    paymentApply () {
      if (this.beforeRouter('PaymentReminderA')) {
        this.$router.push({
          name: 'PromptPaymentApplyPre'
        })
      }
    },
    // 提示付款撤销
    paymentApplyCancel () {
      if (this.beforeRouter('PaymentReminderB')) {
        this.$router.push({
          name: 'PromptPaymentRevokePre'
        })
      }
    },
    // 追索通知
    recourseApply () {
      if (this.beforeRouter('RecourseNoticeA')) {
        this.$router.push({
          name: 'raPre'
        })
      }
    },
    // 提示收票签收
    tishiReply () {
      if (this.beforeRouter('PromptChargeTicketC')) {
        this.$router.push({
          name: 'PromptReceiptReplyPre'
        })
      }
    },
    // 背书转让签收
    beishuReply () {
      if (this.beforeRouter('EndorsedTransferC')) {
        this.$router.push({
          name: 'EndorsementTransferReplyPre'
        })
      }
    },
    // 质押解除签收
    jiezhiyaReply () {
      if (this.beforeRouter('PledgeReqF')) {
        this.$router.push({
          name: 'jiePledgeReplyInput'
        })
      }
    },
    // 保证签收
    baozhengReply () {
      if (this.beforeRouter('GuaranteeApplyC')) {
        this.$router.push({
          name: 'EnsureReplyPre'
        })
      }
    },
    // 同意清偿申请签收
    agreePayReply () {
      if (this.beforeRouter('RecourseNoticeE')) {
        this.$router.push({
          name: 'agreePayReplyInput'
        })
      }
    },
    // 质押申请签收
    zhiyaReply () {
      if (this.beforeRouter('PledgeReqC')) {
        this.$router.push({
          name: 'pledgeReplyInput'
        })
      }
    },

    // 票据各关系人------------
    // 同意清偿申请
    agreePayApply () {
      if (this.beforeRouter('RecourseNoticeC')) {
        this.$router.push({
          name: 'agreePayApplyInput'
        })
      }
    },

    //  承兑人------------
    // 提示承兑签收
    tscdReply () {
      if (this.beforeRouter('AcceptApplicationC')) {
        this.$router.push({
          name: 'PromptAcceptanceReplyPre'
        })
      }
    },
    // 提示付款申请签收
    tsfkReply () {
      if (this.beforeRouter('PaymentReminderC')) {
        this.$router.push({
          name: 'PromptPaymentSignforPre'
        })
      }
    },
    // 承兑保证申请
    cdbzApply () {
      if (this.beforeRouter('GuaranteeApplyA')) {
        this.$router.push({
          name: 'EnsureApplyPre'
        })
      }
    },

    // 质权人-------------
    // 质押申请签收
    zyApplyReply () {
      if (this.beforeRouter('PledgeReqC')) {
        this.$router.push({
          name: 'pledgeReplyInput'
        })
      }
    },
    // 质押解除申请
    jiezhiyaApply () {
      if (this.beforeRouter('PledgeReqD')) {
        this.$router.push({
          name: 'jiePledgeApplyInput'
        })
      }
    },
    // 提示付款申请
    tsfkApply () {
      if (this.beforeRouter('PaymentReminderA')) {
        this.$router.push({
          name: 'PromptPaymentApplyPre'
        })
      }
    },
    // 获取权限菜单
    getmenuIdList () {
      JSON.parse(localStorage.billMenu).forEach(item => {
        if (item.children) {
          item.children.forEach(menu => {
            this.menuIdList.push(menu.menuId)
          })
        }
      })
    },
    beforeRouter (menuName) {
      const menu = this.menuIdList.find(item => item === menuName)
      if (menu) {
        return menu
      } else {
        this.$confirm('没有操作该功能的权限', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        })
        return false
      }
    }
  },
  created () {
    this.getmenuIdList()
  }
}
</script>

<style  scoped lang="scss">
.box {
  width: 100%;
  box-shadow: 1px 1px 1px rgb(0, 0, 0, 0.12);
  height: 1494px;
  .box-title{
    background-color: #FDF2F3;
    margin: 0 auto;
    padding: 0;
    height: 60px;
    line-height: 60px;
    text-indent: 2em;
    font-size: 18px;
    color: #333333;
  }
  .drawBill {
    // width: 100%;
    border: 1px solid rgba(0,0,0,0.12);
    margin: 8px;
    height: 461px;
    .drawBill-title{
      font-size: 20px;
      color: #333333;
      text-indent: 2em;
    }
    .title-man {
      width: 60px;
      height: 3px;
      background: #000000;
      position: relative;
      left: 40px;
      z-index: 1;
    }
    .hrOne{
      margin: 0 auto;
      text-align: center;
      width: 92%;
      height: 3px;
      background: #EAECED;
      position: relative;
      top: -3px;
    }
    .drawBill-content{
      width: 90%;
      height: 440px;
      margin: 0 auto;
      text-align: center;
      padding-top: 45px;
      .rowOne{
        width: 100%;
        height: 46px;
        .item-content{
          cursor: pointer;
          width: 135px;
          height: 46px;
          box-shadow: 0 12px 10px 0 rgba(241,132,22,0.30);
          border-radius: 4px;
          float: left;
          span {
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            line-height: 44px
          }
          .content-img {
            width: 31px;
            height: 28px;
            padding: 10px 2px 0 5px;
            float: left;
          }
        }
      img{
        float: left;
        width: 76px;
        height: 10px;
        padding: 20px 10px 0 10px;
      }
      }
      .arrowImg {
        width: 100%;
        height: 50px;
        margin-top: 10px;
        .arrow {
          height: 50px;
          float: left;
          .arrowimage {
            width: 10px;
            height: 40px;
          }
        }
      }
      .rowThree {
        width: 100%;
        height: 46px;
        .rowItem {
          cursor: pointer;
          width: 135px;
          height: 46px;
          float: left;
          box-shadow: 0 12px 10px 0 rgba(244,65,56,0.30);
          border-radius: 4px;
          text-align: center;
          span {
          font-size: 14px;
          color: #FFFFFF;
          line-height: 44px
        }
          .rowImg {
            width: 30px;
            height: 30px;
            padding: 8px 2px 0 7px;
            float: left;
          }
        }
      }
      .rowFour {
        width: 100%;
        height: 50px;
        margin-top: 10px;
        .arrow {
          height: 50px;
          float: left;
          .arrowimage {
            width: 10px;
            height: 40px;
          }
        }
      }
      .rowFive {
        width: 100%;
        height: 46px;
        .rowItem {
          cursor: pointer;
          width: 135px;
          height: 46px;
          float: left;
          box-shadow: 0 12px 10px 0 rgba(244,65,56,0.30);
          border-radius: 4px;
          text-align: center;
          span {
          font-size: 14px;
          color: #FFFFFF;
          line-height: 44px
        }
          .rowImg {
            width: 30px;
            height: 30px;
            padding: 8px 2px 0 7px;
            float: left;
          }
        }
      }
    }
  }
  .takeBill {
    border: 1px solid rgba(0,0,0,0.12);
    margin: 8px;
    height: 357px;
    .takeBill-title {
      font-size: 20px;
      color: #333333;
      text-indent: 2em;
    }
    .takeBill-man {
        width: 60px;
        height: 3px;
        background: #000000;
        position: relative;
        left: 40px;
        z-index: 1;
      }
    .hrTwo{
      margin: 0 auto;
      text-align: center;
      width: 92%;
      height: 3px;
      background: #EAECED;
      position: relative;
      top: -3px;
    }
    .takeBill-content {
      margin: 0 auto;
      text-align: center;
      width: 99%;
      .takeOne {
        width: 320px;
        height: 236px;
        margin-top: 20px;
        float: left;
        margin-left: -30px;
        .beishu {
          width: 236px;
          height: 46px;
          border-radius: 4px;
          background: rgb(252,255,173);
          font-size: 14px;
          line-height: 46px;
          color: rgb(112, 113, 86);
          margin-top: 4px;
          margin-left: 84px;
          .beishuOne {
            color: rgb(127,132,32)
          }
          span:nth-child(n+2) {
            cursor: pointer;
          }
        }
        .baozheng {
          width: 160px;
          height: 46px;
          border-radius: 4px;
          background: rgb(224, 138, 8);
          font-size: 14px;
          line-height: 46px;
          color: rgb(71, 79, 67);
          margin-top: 28px;
          margin-left: 160px;
          .baozhengOne {
            color: rgb(71, 79, 67)
          }
          span:nth-child(n+2) {
            cursor: pointer;
          }
        }
        .tiexian {
          width: 236px;
          height: 46px;
          border-radius: 4px;
          background: rgb(206,256,187);
          font-size: 14px;
          line-height: 46px;
          color: rgb(71, 79, 67);
          margin-top: 28px;
          margin-left: 84px;
          .tiexianOne {
            color: rgb(70, 134, 48)
          }
          span:nth-child(n+2) {
            cursor: pointer;
          }
        }
      }
      .takeTwo {
        width: 40px;
        height: 236px;
        float: left;
        margin-top: 43px;
        .imgTwo {
          margin-top: 52px;
        }
        .imgbaozheng {
          margin-top: 35px;
        }
        img {
          width: 55px;
        }
      }
      .takeThree {
        width: 200px;
        height: 200px;
        margin-top: 20px;
        float: left;
        .threeCircle {
          width: 200px;
          height: 200px;
          border: 5px solid rgb(235, 112, 20);
          border-radius: 50%;
          .circleItem {
            width: 170px;
            height: 170px;
            border: 5px solid rgb(239, 40, 43);
            border-radius: 50%;
            margin: 10px;
            p {
              margin: 0;
              padding: 3px;
              font-size: 12px;
            }
            .circleItemP {
              cursor: pointer;
            }
          }
        }
      }
      .takeFour {
        width: 58px;
        height: 236px;
        float: left;
        margin-top: 43px;
        .imgThree {
          width: 50px;
        }
        .imgFour {
          margin-top: 36px;
          width: 70px;
        }
        .imgFive {
          margin-top: 45px;
          width: 62px;
        }
        img {
          width: 55px;
        }
      }
      .takeFive {
        width: 310px;
        height: 236px;
        float: left;
        margin-top: 20px;
        .zhiya {
          width: 236px;
          height: 46px;
          border-radius: 4px;
          background: rgb(209,241,255);
          font-size: 14px;
          line-height: 46px;
          color: rgb(90, 99, 103);
          margin-top: 6px;
          .zhiyaColor {
            color: rgb(30, 83, 110);
          }
          span:nth-child(n+2) {
            cursor: pointer;
          }
        }
        .weituo {
          width: 305px;
          height: 46px;
          border-radius: 4px;
          background: rgb(250,222,226);
          font-size: 14px;
          line-height: 46px;
          color: rgb(71, 67, 68);
          margin-top: 20px;
          .weituoColor {
            color: rgb(111, 37, 50);
          }
          span:nth-child(n+2) {
            cursor: pointer;
          }
        }
        .zhuisuo {
          width: 160px;
          height: 46px;
          border-radius: 4px;
          background: rgb(246,216,252);
          font-size: 14px;
          line-height: 46px;
          color: rgb(81, 75, 82);
          margin-top: 20px;
          .zhuisuoColor {
            color: rgb(66, 12, 79);
          }
          span:nth-child(n+2) {
            cursor: pointer;
          }
        }
      }
    }
  }
  .acceptBill {
    border: 1px solid rgba(0,0,0,0.12);
    margin: 8px;
    height: 189px;
    .acceptBill-title {
      font-size: 20px;
      color: #333333;
      text-indent: 2em;
    }
    .acceptBill-man {
        width: 60px;
        height: 3px;
        background: #000000;
        position: relative;
        left: 40px;
        z-index: 1;
      }
    .hrThree{
      margin: 0 auto;
      text-align: center;
      width: 92%;
      height: 3px;
      background: #EAECED;
      position: relative;
      top: -3px;
    }
    .acceptBill-content {
      width: 100%;
      height: 84px;
      margin: 0 auto;
      text-align: center;
      padding-top: 30px;
      .acceptBill-Item {
        cursor: pointer;
        float: left;
        width: 163px;
        height: 46px;
        font-size: 14px;
        color: #FFFFFF;
        box-shadow: 0 12px 10px 0 rgba(241,132,22,0.30);
        border-radius: 4px;
        line-height: 46px;
        .imgItem {
          width: 27px;
          height: 32px;
          float: left;
          padding: 7px;
        }
      }
    }
  }
}
</style>
