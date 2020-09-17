<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <div class="title">
        <h2>小额定期借记业务</h2>
      </div>
      <div style="padding: 0px 10px">
        <h4 style="text-indent:2em;">定期借记业务</h4>
        <p style="text-indent:2em;">定期借记业务适用于收款人委托收款行定期向指定付款人收取款项的情形，包括收取水费、电费、煤气费等。</p>
        <p style="text-indent:2em;">定期借记业务处理分为收款（清算）行发起业务阶段和付款（清算）行发出借记回执阶段。</p>
        <p style="text-indent:2em;">在我行发起定期借记业务的客户必须为网银客户。</p>
        <p style="text-indent:2em;">付款人应与开户行签订付款授权协议。</p>
        <p style="text-indent:2em;">办理定期借记业务前，付款人需依据事先与收款人签订的协议，与开户行签订协议，授权开户行收到指定收款人的收款指令时从其账户支付款项。=本金×实际天数×提前支取日通知存款利率/365。</p>
        <p style="text-indent:2em;">收款（清算）行发起定期借记业务阶段。</p>
        <p style="text-indent:2em;">（一）我行网银客户在网银端发起定期借记业务。</p>
        <p style="text-indent:2em;">（二）小额定期借记业务代理手续费根据人行小额支付系统收费标准，由收款（清算）行与客户签订扣款协议，收费标准详见我行官网收费公示。</p>
        <p style="text-indent:2em;">（三）对公客户通过回单系统、对私客户通过“代收付定期借贷记凭证打印”交易打印收款凭证及清单。</p>
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
  name: 'contract',
  data () {
    return {
      titleData: ['财务管理', '小额定期借记业务签约'],
      btnData: [
        { btnText: '同意', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '拒绝', class: 'm-cancel-btn', clickEventName: 'refuse' }
      ]
    }
  },
  methods: {
    submit () {
      this.$router.push({
        name: 'smallPeriodicDebitsContractPre',
        params: this.$route.params
      })
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
.table{
  margin-left: 50px;
  width: 700px;
  border-collapse: collapse;
}
.line{
  height: 35px
}
.label{
  border: 0.1px solid;
  width: 450px;
  text-align: center;
}
.content{
  border: 0.1px solid;
  text-align: center;
}
</style>
