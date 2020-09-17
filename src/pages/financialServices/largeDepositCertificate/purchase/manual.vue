<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <div class="title">
        <h2>大连银行单位大额存单</h2>
        <h3>{{this.formModel.issueAnnual}}年第{{this.formModel.periods}}期产品说明书</h3>
      </div>
      <div style="padding: 0px 10px">
        <div>
          <h4 style="text-indent:2em;">一、产品信息</h4>
          <table class="table">
            <tbody>
              <tr class="line">
                <td class="label">产品名称</td>
                <td class="content">{{this.formModel.prdBatchName}}</td>
              </tr>
              <tr class="line">
                <td class="label">产品编号</td>
                <td class="content">{{this.formModel.prdBatchCode}}</td>
              </tr>
              <tr class="line">
                <td class="label">发售对象</td>
                <td class="content">非金融企业、机关团体以及中国人民银行认可的其他单位</td>
              </tr>
              <tr class="line">
                <td class="label">币种</td>
                <td class="content">人民币</td>
              </tr>
              <tr class="line">
                <td class="label">发行额度</td>
                <td class="content">{{this.formModel.totalAmount/10000}}万元</td>
              </tr>
              <tr class="line">
                <td class="label">认购起点金额</td>
                <td class="content">{{this.formModel.startBuyAmount/10000}}万元</td>
              </tr>
              <tr class="line">
                <td class="label">最小递增单位</td>
                <td class="content">{{this.formModel.addAmount/10000}}万元</td>
              </tr>
              <tr class="line">
                <td class="label">发行起止日</td>
                <td class="content">{{this.formModel.prdCrateDate}}至{{this.formModel.prdExpireDate}}</td>
              </tr>
              <tr class="line">
                <td class="label">产品期限</td>
                <td class="content">{{this.formModel.depositTerm}}</td>
              </tr>
              <tr class="line">
                <td class="label">计息类型</td>
                <td class="content">固定利率</td>
              </tr>
              <tr class="line">
                <td class="label">年化利率</td>
                <td class="content">{{this.formModel.annualRate}}%</td>
              </tr>
              <tr class="line">
                <td class="label">计息方式</td>
                <td class="content">利息收益=支取金额×实际持有天数×年利率/365.<br/>实际持有天数包含认购当日，但不包含到期日或支取日当日</td>
              </tr>
              <tr class="line">
                <td class="label">付息方式</td>
                <td class="content">{{this.formModel.interestPayWay}}</td>
              </tr>
              <tr class="line">
                <td class="label">付息周期</td>
                <td class="content">{{this.formModel.interestFrequency}}</td>
              </tr>
              <tr class="line">
                <td class="label">转让</td>
                <td class="content">{{this.formModel.isAllowMakeOver}}</td>
              </tr>
              <tr class="line">
                <td class="label">赎回</td>
                <td class="content">可赎回</td>
              </tr>
              <tr class="line">
                <td class="label">起息日</td>
                <td class="content">认购成功当日</td>
              </tr>
              <tr class="line">
                <td class="label">到期日</td>
                <td class="content">对年对月对日</td>
              </tr>
              <tr class="line">
                <td class="label">提前支取</td>
                <td class="content">{{this.formModel.isAllowAdvancedDraw}}</td>
              </tr>
              <tr class="line">
                <td class="label">提前支取利率</td>
                <td class="content">{{this.formModel.interestRateCode}}</td>
              </tr>
              <tr class="line">
                <td class="label">提前兑付开始日期</td>
                <td class="content">{{this.formModel.advancePayStartDate}}</td>
              </tr>
              <tr class="line">
                <td class="label">逾期利率</td>
                <td class="content">支取日我行挂牌活期存款利率</td>
              </tr>

            </tbody>
          </table>
        </div>
        <h4 style="text-indent:2em;">二、业务办理渠道</h4>
        <p style="text-indent:2em;">单位大额存单的申购、查询、和提前支取等业务可以通过大连银行柜面或者企业网银办理；通过柜面或网银办理申购，其后续的查询和支取也只能通过同一渠道办理；网银申购的单位大额存单一旦到柜面补打开户证实书后，其他后续业务也只能转到柜面办理。</p>
        <p style="text-indent:2em;">单位大额存单转让和补打开户证实书只能通过大连银行柜面办理。</p>
        <h4 style="text-indent:2em;">三、投资方向范围及比例</h4>
        <p style="text-indent:2em;">本产品是银行存款类金融产品，大连银行保证本金兑付并按产品发行约定利率支付利息。利息计算方式：利息收益＝支取金额×实际持有天数×约定利率/365。实际持有天数包含认购日当日，但不含到期日或支取日当日。</p>
        <h4 style="text-indent:2em;">四、申购</h4>
        <p style="text-indent:2em;">投资人向大连银行提交《单位大额存单认购申请书》，即表示已全部知晓并充分理解、同意本产品说明书的全部条款。</p>
        <p style="text-indent:2em;">投资人须在产品发售期内申购单位大额存单，发售期结束后将无法申购。每期单位大额存单产品额度有限，售完即止。</p>
        <h4 style="text-indent:2em;">五、付息方式</h4>
        <p style="text-indent:2em;">单位大额存单付息方式分为一次还本付息和定期付息、到期还本。定期付息分为满月/季/半年/年付息和按月/季/年付息7种，定期支付的利息=本金×约定利率/365×计息期实际天数。</p>
        <p style="text-indent:2em;">一次还本付息：投资人支取时一次性支付本金和利息；</p>
        <p style="text-indent:2em;">满月付息：自起息日起每满一个月付息一次，即起息日对应的一个月后的同日为付息日，若无对应日则为一个月后的最后一日；</p>
        <p style="text-indent:2em;">满季付息：自起息日起每满一个季度付息一次，即起息日对应的三个月后的同日为付息日，若无对应日则为三个月后的最后一日；</p>
        <p style="text-indent:2em;">满半年付息：即自起息日起每满半年付息一次，起息日对应的六个月后的同日为付息日，若无对应日则为六个月后的最后一日；</p>
        <p style="text-indent:2em;">按月付息：即每月的21日为付息日；</p>
        <p style="text-indent:2em;">按季付息：即每个季度最后一个月的21日为付息日；</p>
        <p style="text-indent:2em;">按年付息：即每年最后一个月的21日为付息日。</p>
        <h4 style="text-indent:2em;">六、补打开户证实书</h4>
        <p style="text-indent:2em;">投资人开立单位大额存单账户时未打印开户证实书，之后需要补打开户证实书的，须按照大连银行要求提交补打证实书申请，到大连银行柜面办理补打。</p>
        <h4 style="text-indent:2em;">七、转让</h4>
        <p style="text-indent:2em;">单位大额存单的转让范围仅限于非金融机构投资人,且只能全额转让。</p>
        <p style="text-indent:2em;">转让时，出让人和受让人须协商确认转让金额，受让人将转让金额转入出让人指定账户；自转让当日起，出让人的单位大额存单及其项下的利息收益权一并转让给受让人。</p>
        <h4 style="text-indent:2em;">八、提前支取</h4>
        <p style="text-indent:2em;">若允许提前支取，提前支取按照活期存款计息的，提前支取部分按支取日大连银行挂牌活期存款利率计息；提前支取靠档计息的，提前支取部分按支取日实际存续期靠档对应期限的大连银行挂牌定期存款利率计息，靠档利率分为3个月、6个月、一年、二年和三年定期存款利率。</p>
        <p style="text-indent:2em;">投资人通过柜面或网银申购后，提前支取也只能通过同一渠道办理。到柜面办理提前支取的，投资人还须按照大连银行要求提交提前支取申请。</p>
        <h4 style="text-indent:2em;">九、到期兑付</h4>
        <p style="text-indent:2em;">单位大额存单到期日当日，若投资人未打印开户证实书，则大连银行将存单本金及利息划转至投资人认购本期大额存单的关联账户中；若投资人已打印开户证实书，则投资人须持开户证实书到大连银行柜面办理到期兑付，到期日如遇节假日，在节假日前最后一个营业日支取的，按存入日约定利率根据实际存续天数计息，节假日后支取的，超过原定产品期限部分按逾期利率计息，逾期利率执行支取日大连银行活期存款挂牌利率。</p>
        <h4 style="text-indent:2em;">十、其他</h4>
        <p style="text-indent:2em;">大连银行依法保障投资人的资金安全，对投资人的业务信息严格保密，不得泄密、出售或非法向他人提供，但法律法规、监管部门有规定的除外。投资人涉嫌从事洗钱、欺诈等违反法律法规、监管规定的行为，或提供的资料、信息存在部分或全部不真实的违约行为的，大连银行有权单方面中止或终止交易并保留追究投资人责任的权利。</p>
        <p style="text-indent:2em;">大连银行可根据发行情况调整本期产品发行计划。</p>
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
// import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { saveDate_entity, interestFrequency_entity } from '@/assets/js/entity'
export default {
  name: 'manual',
  data () {
    return {
      titleData: ['理财服务 ', '大额存单', '大额存单产品说明书'],
      formModel: {},
      dataForm: {},
      btnData: [
        { btnText: '同意', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '拒绝', class: 'm-cancel-btn', clickEventName: 'refuse' }
      ]
    }
  },
  methods: {
    submit () {
      this.$router.push({
        name: 'purchasePre',
        params: this.formModel
      })
    },
    refuse () {
      this.$router.push({
        name: 'purchaseInquiry',
        params: this.dataForm
      })
    }
  },
  created () {
    this.dataForm = this.$route.params
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
      this.formModel.annualRate = Number(this.formModel.annualRate).toFixed(4)
      if (this.formModel.isAllowMakeOver === '0') {
        this.formModel.isAllowMakeOver = '可转让'
      } else if (this.formModel.isAllowMakeOver === '1') {
        this.formModel.isAllowMakeOver = '不可转让'
      }
      // 0=定期付息到期还本，1=到期一次还本付息
      if (this.formModel.interestPayWay === '0') {
        this.formModel.interestPayWay = '定期付息到期还本'
      } else if (this.formModel.interestPayWay === '1') {
        this.formModel.interestPayWay = '到期一次还本付息'
      }
      // 0=不可提前支取，1=可提前支取
      if (this.formModel.isAllowAdvancedDraw === '0') {
        this.formModel.isAllowAdvancedDraw = '不可提前支取'
      } else if (this.formModel.isAllowAdvancedDraw === '1') {
        this.formModel.isAllowAdvancedDraw = '可提前支取'
      }
      // KD102=支取日我行挂牌活期存款利率 ,KD112=靠档利率
      if (this.formModel.interestRateCode === 'KD102') {
        this.formModel.interestRateCode = '支取日我行挂牌活期存款利率'
      } else if (this.formModel.interestRateCode === 'KD112') {
        this.formModel.interestRateCode = '靠档利率'
      }
      this.formModel.prdCrateDate = util.DepositDate(this.formModel.prdCrateDate)
      this.formModel.prdExpireDate = util.DepositDate(this.formModel.prdExpireDate)
      if (this.formModel.advancePayStartDate === '') {
        this.formModel.advancePayStartDate = '--'
      } else {
        this.formModel.advancePayStartDate = util.DepositDate(this.formModel.advancePayStartDate)
      }
      this.formModel.depositTerm = saveDate_entity[this.formModel.depositTerm]
      this.formModel.interestFrequency = interestFrequency_entity[this.formModel.interestFrequency]
    }
  }
}
</script>

<style scoped>
.form-box{
  /* box-shadow: 0 0 10px 0 rgba(0,0,0,0.20); */
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
