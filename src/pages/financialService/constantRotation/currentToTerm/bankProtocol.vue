<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <div class="title">
        <h2>大连银行单位定期存款网上银行电子管理协议</h2>
      </div>
      <div style="padding: 0px 10px">
        <p>甲方：</p>
        <p>乙方：大连银行股份有限公司</p>
        <br/>
        <p style="text-indent:2em;">根据有关法律、法规和规章，经甲乙双方共同友好协商，就甲方在乙方开展单位定期存款业务达成如下协议，以兹共同遵守。</p>
        <h4 style="text-indent:2em;">第一条 定义</h4>
        <p style="text-indent:2em;">单位定期存款是由存款单位约定期限，到期支取本息的一种存款，按期限不同分为三个月、半年、一年、二年、三年、五年六个档次。</p>
        <h4 style="text-indent:2em;">第二条 计息方式</h4>
        <p style="text-indent:2em;">到期利息=本金×期限×存入日定期存款利率/365，单位定期存款的付息方式为利随本清，提前或到期支取时，乙方将利息和本金一起支付给甲方。</p>
        <h4 style="text-indent:2em;">第三条 起存金额</h4>
        <p style="text-indent:2em;">单位定期存款的起存金额为1万元，可以部分支取，但未支取部分不得小于起存金额。</p>
        <h4 style="text-indent:2em;">第四条 提前支取</h4>
        <p style="text-indent:2em;">甲方若未到期提前支取，则按照乙方公布的挂牌活期存款利率计息，提前支取存款利息=本金×实际天数×提前支取日活期存款利率/365。</p>
        <h4 style="text-indent:2em;">第五条 到期转存和逾期支取</h4>
        <p style="text-indent:2em;">到期转存分为不自转、本金转存和本息转存，自动转存无次数限制。不自转是指单位定期存款到期后不转存，逾期未支取则本金部分按照乙方公布的挂牌活期存款利率计息，逾期利息=本金×逾期天数×逾期支取日活期存款利率/365；本金转存是指单位定期存款到期后本金按照原存入期限自动转存，利息支付至甲方的关联活期账户；本息转存是指单位定期存款到期后本金和利息一起按照原存入期限自动转存。</p>
        <h4 style="text-indent:2em;">第六条 存款要素</h4>
        <p style="text-indent:2em;">甲方开户金额:</p>
        <p style="text-indent:2em;">期限:</p>
        <p style="text-indent:2em;">开户日:</p>
        <p style="text-indent:2em;">到期日:</p>
        <p style="text-indent:2em;">利率:</p>
        <p style="text-indent:2em;">付息方式:利随本清</p>
        <p style="text-indent:2em;">转存方式:</p>
        <h4 style="text-indent:2em;">第七条 甲方保证向开户银行提供的开户资料真实、完整、合法，开户资料及账户信息资料变更应在五日内书面通知乙方开户银行，并提供相关证明办理变更手续。</h4>
        <h4 style="text-indent:2em;">第八条 甲方应按《人民币银行结算账户管理办法》及《人民币银行结算账户管理办法实施细则》等支付结算相关规定使用银行结算账户和支付结算工具，保证按规定提供真实、合法有效的收付款依据不得从事违法犯罪活动。</h4>
        <h4 style="text-indent:2em;">第九条 甲方应定期通过网上银行进行余额对账并及时反馈对账结果。</h4>
        <h4 style="text-indent:2em;">第十条 甲方应按规定向乙方开户银行支付服务费用。</h4>
        <h4 style="text-indent:2em;">第十一条 甲方不得出租、出借银行账户，不得利用银行结算账户套取银行信用，不得利用开立银行结算账户逃废银行债务。</h4>
        <h4 style="text-indent:2em;">第十二条 甲方提供的开户资料及收、付款依据虚假有误或变更事项未及时通知乙方开户银行造成的损失，甲方自行承担责任。</h4>
        <h4 style="text-indent:2em;">第十三条 甲方因被撤并、解散、宣告破产或关闭、注销及被吊销营业执照的，应于5个工作日内向乙方开户银行提出撤销银行结算账户的申请。甲方撤销银行结算账户时，必须与乙方开户银行核对银行结算账户余额，交回各种重要空白票据、结算凭证及开户许可证。甲方如未按规定交回各种重要空白票据、结算凭证及开户许可证的，应出具相关证明，造成资金损失的存款人自行承担责任。</h4>
        <h4 style="text-indent:2em;">第十四条 乙方应及时、准确地办理存款人的资金收付业务，定期与甲方核对账务，依法保障存款人的资金安全，依法为存款人的银行结算账户信息保密。对单位银行结算账户的存款和有关资料，除国家法律、行政法规另有规定外，开户银行有权拒绝任何单位或个人查询。</h4>
        <h4 style="text-indent:2em;">第十五条 本协议未尽事宜按中国人民银行的《人民币银行结算账户管理办法》及《人民币银行结算账户管理办法实施细则》等支付结算相关规定执行。</h4>
        <h4 style="text-indent:2em;">第十六条 免责条款</h4>
        <p style="text-indent:2em;">1、由于地震、火灾、战争等不可抗力因素导致的交易中断、延误等风险，乙方将不承担责任，但应在条件允许的情况下通知甲方，并采取一切必要措施以减少不可抗力造成的损失。</p>
        <p style="text-indent:2em;">2、由于国家法律、法规及监管政策的改变和应急措施的出台导致的交易中断、终止、延误等风险由甲方承担，乙方不承担责任。</p>
        <p style="text-indent:2em;">3、由于甲方的原因，本协议项下甲方活期存款账户和单位定期存款账户被司法等有权机关冻结、扣划，乙方不承担责任。</p>
        <h4 style="text-indent:2em;">第十七条  争议处理</h4>
        <p style="text-indent:2em;">本协议履行过程中所发生的一切争议，双方应本着诚实守信的原则，友好协商解决；如协商未果，可向乙方所在地人民法院提起诉讼。</p>
        <h4 style="text-indent:2em;">第十八条 其他</h4>
        <p style="text-indent:2em;">1、本协议由甲方在乙方企业网银同意确认，且甲方将本协议项下全额存款本金划转至乙方机构开立单位定期存款账户之后生效。</p>
        <p style="text-indent:2em;">2、本协议的终止日期为甲方支取全部存款本金及利息的日期。</p>
      </div>
    </div>
    <m-new-form
            :btnData="btnData"
            @submit="submit"
            @refuse="refuse">
    </m-new-form>
  </div>
</template>
<script>
export default {
  name: 'bankProtocol',
  data () {
    return {
      titleData: ['理财服务', '定活互转', '活期转定期'],
      btnData: [
        { btnText: '同意', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '拒绝', class: 'm-cancel-btn', clickEventName: 'refuse' }
      ]
    }
  },
  methods: {
    submit () {
      this.$router.push('/innerCurrentToTerm')
    },
    refuse () {
      this.$router.push('/index')
    }
  },
  created () {}
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
  background: #ffffff;
  height: 600px;
  overflow-y: scroll;
}
.title{
  text-align: center;
}
</style>
