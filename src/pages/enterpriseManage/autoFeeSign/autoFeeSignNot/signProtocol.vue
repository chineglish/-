<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <div class="title">
        <h2>企业网银证书费自动扣划服务协议</h2>
      </div>
      <div>
        <p style="text-indent:2em;">第一条 甲方（客户）和乙方（大连银行股份有限公司）本着自愿、平等原则，根据国家有关法律、法规，经过平等友好协商，就甲方同意乙方对甲方进行企业网银证书费自动扣划相关事宜，达成如下协议：</p>
        <p style="text-indent:3em;">1、企业网银证书费自动扣划服务是指乙方通过自动扣划清算从甲方客户指定的账户扣划收取乙方企业网银证书费的服务。</p>
        <p style="text-indent:3em;">2、企业网银证书费收费标准：160元/张/年。</p>
        <p style="text-indent:2em;">第二条 甲乙双方认可乙方对甲方的企业网银证书费自动扣划服务的有效性、合法性、安全性。</p>
        <p style="text-indent:2em;">第三条 企业网银证书费为预收制，自客户首次购买证书后，每年的同一日期为企业网银证书应缴费日期，如过了应缴费日期，客户未缴纳证书费，则客户将无法登录证书版企业网银。</p>
        <p style="text-indent:2em;">第四条 企业网银证书费自动扣划日期为乙方企业网银证书费应缴费日期前30天，如扣划当日进行自动扣划证书费失败，失败之日起七天之后将再次进行扣划，如依然失败，将再过七天以后进行扣划，直到扣划成功或应缴费日期已过为止。</p>
        <p style="text-indent:2em;">第五条 甲方权利和义务</p>
        <p style="text-indent:3em;">（一）甲方须为乙方的企业网银签约客户，绑定并使用乙方提供的企业网银证书。甲方签约并开启企业网银证书费自动扣划服务后，无论甲方在一年中是否实际登录并使用乙方企业网银系统，乙方均会按照甲方的自动扣划设置以及企业网银证书费收费标准，对甲方的企业网银证书费进行自动扣划。</p>
        <p style="text-indent:3em;">（二）甲方可以选择设置名下的任意人民币结算账户作为企业网银证书年费自动扣费账户。</p>
        <p style="text-indent:3em;">（三）甲方签订本协议后，可在系统中自行设置打开/关闭企业网银证书费自动扣划服务，可自行选择设置需要自动扣划的证书，未选择的证书乙方将不进行自动扣划，造成的后果由乙方负责。</p>
        <p style="text-indent:3em;">（四）甲方有义务确保企业网银证书费自动扣划当日，账户内有足够资金且设置的扣划账户状态正常，保证乙方扣划成功，如因资金不足或账户状态异常致使乙方扣划失败，造成甲方未成功缴纳下一周期企业网银证书费并在应缴费日期后无法使用网银，由甲方负责。如在乙方扣划成功后，甲方账户内余额不足以达到其他业务的账户留存余额要求，造成的相关后果由甲方负责。</p>
        <p style="text-indent:2em;">第六条 乙方权利和义务</p>
        <p style="text-indent:3em;">（一）在甲方签约并开启企业网银证书费自动扣划服务后，按照协议约定自动扣划时间，扣划甲方已设置选择证书的下一周期企业网银证书费。</p>
        <p style="text-indent:3em;">（二）乙方对由于以下原因造成的证书费扣划失败不承担责任：</p>
        <p style="text-indent:4em;">1.甲方账户属于异常账户，无法扣划；</p>
        <p style="text-indent:4em;">2.甲方账户内余额不足，扣划失败；</p>
        <p style="text-indent:4em;">3.不可抗力或其他不可归因于乙方的原因。</p>
        <p style="text-indent:2em;">第七条 收费条款</p>
        <p style="text-indent:3em;">企业网银证书费自动扣划服务属于免费服务，不额外收取客户费用。</p>
        <p style="text-indent:2em;">第八条 争议解决</p>
        <p style="text-indent:3em;">有关本协议的一切争议，应首先由甲乙双方协商解决，如协商不成，任何一方均可向乙方所在地法院提起诉讼。</p>
        <p style="text-indent:2em;">第九条 协议生效与到期</p>
        <p style="text-indent:3em;">本协议自甲方在乙方企业网银系统中提交之日起生效，不可解约。乙方可按照第五条第（四）项权利，自行选择是否启用企业网银证书费自动扣划服务。</p>
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
import { mapMutations } from 'vuex'
export default {
  name: 'signProtocol',
  data () {
    return {
      waitTime: '',
      titleData: ['企业管理台', '证书管理', '证书自动扣费签约'],
      btnData: [
        { btnText: '同意', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '拒绝', class: 'm-cancel-btn', clickEventName: 'refuse' }
      ]
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    // protocol 同意 0 拒绝 1
    submit () {
      this.removeKeepAliveList() // 清除页面缓存
      this.$router.push({
        name: 'innerSign',
        params: {
          protocol: '0',
          data: this.$route.params.data,
          checked: true,
          waitTime: this.waitTime
        }
      })
    },
    refuse () {
      this.removeKeepAliveList() // 清除页面缓存
      this.$router.push({
        name: 'innerSign',
        params: {
          protocol: '1',
          data: this.$route.params.data,
          checked: false,
          waitTime: this.waitTime
        }
      })
    },
    time () {
      if (this.waitTime) {
        let timer = setInterval(() => {
          if (this.waitTime > 1 && this.waitTime < 60) {
            this.waitTime--
          } else {
            clearInterval(timer)
            this.waitTime = 60
          }
        }, 1000)
      }
    }
  },
  created () {
    if (this.$route.params) {
      this.waitTime = this.$route.params.waitTime
      this.time()
    }
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
  background: #ffffff;
  height: 500px;
  overflow-y: scroll;
}
.title{
  text-align: center;
}
</style>
