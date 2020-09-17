<template>
  <div>
    <div class="form-box">
      <img class="logo" src="./../image/logo.jpg" alt/>
      <div style="border: 0.1px solid;margin: 0 40px">
        <p style="margin-left: 10px">尊敬的投资者：</p>
        <p style="margin-left: 10px;text-indent:2em;">本理财产品不保证本金和收益，您的本金可能会因市场变动而蒙受重大损失，您应充分认识投资风险，谨慎投资。</p>
      </div>
      <div class="title">
        <h2>大连银行明珠理财月月赢系列人民币公司理财产品说明书</h2>
        <h3>{{formData.prdName}}</h3>
      </div>
      <div style="padding: 0px 40px">
        <p>尊敬的投资者：</p>
        <p style="text-indent:2em;">感谢您选择大连银行人民币理财产品。根据中国银行保险监督管理委员会相关监管规定的要求，在您购买本理财产品前，请仔细阅读以下内容：</p>
        <h4 style="text-indent:2em;">一、重要须知</h4>
        <p style="text-indent:2em;">1.本理财产品说明书与《大连银行公司理财产品客户协议书》、《风险揭示书》、《客户权益须知》共同构成完整的不可分割的理财合同。</p>
        <p style="text-indent:2em;">2.本理财产品仅向依据中华人民共和国有关法律法规合法经营且依据本产品说明书规定可以购买本理财产品的合格机构投资者发售。</p>
        <p style="text-indent:2em;">3.本理财产品不等同于银行存款。</p>
        <p style="text-indent:2em;">4.在购买本理财产品前，请投资者确保完全明白本理财产品的性质、其中涉及的风险以及投资者的自身情况。请投资者独立、自主、谨慎做出投资决策，购买与自身风险承受能力和资产管理需求匹配的理财产品。投资者若对本产品说明书的内容有任何疑问，请向大连银行各营业网点咨询。</p>
        <p style="text-indent:2em;">5.除本产品说明书中明确规定的收益及收益分配方式外，任何预期收益、预计收益、测算收益或类似表述均属不具有法律约束力的用语，不代表投资者可能获得的实际收益，亦不构成大连银行对本理财产品的任何收益承诺。</p>
        <p style="text-indent:2em;">6.本理财产品只根据本产品说明书所载的资料操作。</p>
        <p style="text-indent:2em;">7.本理财产品为非保本浮动收益型产品，您的本金可能会因市场变动而蒙受重大损失，您应充分认识投资风险，谨慎投资。</p>
        <p style="text-indent:2em;">8.在购买理财产品后，请投资者及时关注该理财产品的信息披露情况，及时获取相关信息。</p>
        <p style="text-indent:2em;">9.大连银行有权依法对本产品说明书进行解释。</p>
        <h4 style="text-indent:2em;">二、风险评级</h4>
        <h4 style="text-indent:2em;">大连银行内部风险评级： R2 （稳健型，本评级为大连银行内部，仅供参考）。</h4>
        <h4 style="text-indent:2em;">三、投资方向范围及比例</h4>
        <p style="text-indent:2em;">本理财产品由大连银行负责管理，产品募集的资金主要投资于：</p>
        <p style="text-indent:2em;">1.银行间市场和交易所市场中市场信用级别较高、流动性较好的金融工具，包括但不限于国债、地方政府债、金融债、央行票据、债券远期以及高信用级别的企业债、公司债、资产支持证券、银行间市场交易商协会注册发行的各类债务融资工具（如短期融资券、中期票据、非公开定向债务融资工具)、票据、中小企业私募债、债券基金等。</p>
        <p style="text-indent:2em;">2.现金、拆借、逆回购、同业存款、同业借款、大额存单、货币市场基金等货币市场工具。</p>
        <p style="text-indent:2em;">3.符合法律法规及监管政策要求的其他投资范围，包括资产管理计划、信托计划等非标类投资。</p>
        <p style="text-indent:2em;">投资比例区间如下（理财产品存续期内可能因市场的重大变化导致投资比例暂时超出如下规定区间）:</p>
        <div>
          <table class="table1">
            <tbody>
              <tr class="line">
                <td class="label1">固定收益类（债券类)</td>
                <td class="content1">0—100%</td>
              </tr>
              <tr class="line">
                <td class="label1">固定收益产品（货币类）</td>
                <td class="content1">0-90%</td>
              </tr>
              <tr class="line">
                <td class="label1">资金存放、拆借</td>
                <td class="content1">0-90%</td>
              </tr>
              <tr class="line">
                <td class="label1">其他投资范围</td>
                <td class="content1">0-100%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style="text-indent:2em;">银行有权根据市场情况，在不损害投资者利益且根据约定提前公告的情况下，对本理财产品的投资范围、投资品种和投资比例在(-10%,10%)的区间内浮动。投资者对此无异议且同意在上述情况下继续持有本理财产品。</p>
        <h4 style="text-indent:2em;">四、理财产品基本要素</h4>
        <div>
          <table class="table2">
            <tbody>
              <tr class="line">
                <td class="label2">产品名称</td>
                <td class="content2">{{formData.prdName}}</td>
              </tr>
              <tr class="line">
                <td class="label2">理财登记系统编码</td>
                <td class="content2">该产品在理财登记系统编码是{{formData.prdRegisterCode}}，可依据该编码在“中国理财网（www.chinawealth.com.cn）”查询该产品信息。</td>
              </tr>
              <tr class="line">
                <td class="label2">产品类型</td>
                <td class="content2">非保本浮动收益型</td>
              </tr>
              <tr class="line">
                <td class="label2">理财币种</td>
                <td class="content2">人民币</td>
              </tr>
              <tr class="line">
                <td class="label2">理财期限</td>
                <td class="content2">{{formData.interestDays}}天</td>
              </tr>
              <tr class="line">
                <td class="label2">理财业绩比较基准</td>
                <td class="content2">{{formData.modelComment}}</td>
              </tr>
              <tr class="line">
                <td class="label2">计息基础</td>
                <td class="content2">实际理财天数/365</td>
              </tr>
              <tr class="line">
                <td class="label2">认购起点</td>
                <td class="content2">认购起点为100万元，以10万元的整数倍递增</td>
              </tr>
              <tr class="line">
                <td class="label2">认购期</td>
                <td class="content2">{{ipoStartYear}}年{{ipoStartMonth}}月{{ipoStartDay}}日至{{ipoEndYear}}年{{ipoEndMonth}}月{{ipoEndDay}}日(08:30至17:00)</td>
              </tr>
              <tr class="line">
                <td class="label2">成立日</td>
                <td class="content2">{{incomeYear}}年{{incomeMonth}}月{{incomeDay}}日</td>
              </tr>
              <tr class="line">
                <td class="label2">到期日</td>
                <td class="content2">{{incomeEndYear}}年{{incomeEndMonth}}月{{incomeEndDay}}日(到期日当天不计息，适逢节假日顺延)</td>
              </tr>
              <tr class="line">
                <td class="label2">产品到期及收益支付</td>
                <td class="content2">产品到期后一次性支付投资本金及收益</td>
              </tr>
              <tr class="line">
                <td class="label2">提前终止</td>
                <td class="content2">如本理财产品所投资标的遇重大政策调整等不利于实现产品业绩比较基准的情形出现时，银行有权视实际情况，在充分履行告知义务后，行使提前终止权。</td>
              </tr>
              <tr class="line">
                <td class="label2">产品费用</td>
                <td class="content2">本理财产品的销售费用、托管费用、投资管理费用及资金划转费用等均在产品投资总收益中扣除，不另向投资者收取。<br>本产品托管费率为0.01%，资金划转费用按实际发生额在投资总收益中扣除。扣除上述固定费用后，销售费用依据产品实际投资收益情况确定，销售费率不超出[0.01-1.00%]区间：若产品实际年化收益率超过本说明书中所载的业绩比较基准利率，则超过的部分方可作为大连银行销售本理财产品的销售及管理费用；若实际年化收益率未达到业绩比较基准利率的，大连银行将不收取任何销售费用。</td>
              </tr>
              <tr class="line">
                <td class="label2">发行规模</td>
                <td class="content2">本理财产品发行规模上限为{{formData.totLimit / 10000}}万元人民币</td>
              </tr>
              <tr class="line">
                <td class="label2">质押</td>
                <td class="content2">本理财产品不可以申请办理质押</td>
              </tr>
              <tr class="line">
                <td class="label2">对账单</td>
                <td class="content2">本理财产品不提供对账单</td>
              </tr>
              <tr class="line">
                <td class="label2">存款证明</td>
                <td class="content2">本理财产品不可开立存款证明</td>
              </tr>
              <tr class="line">
                <td class="label2">税款</td>
                <td class="content2">银行不承担代投资者扣缴相关税费的义务，但法律法规另有规定的除外。</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 style="text-indent:2em;">五、理财产品信息披露</h4>
        <p style="text-indent:2em;">1.大连银行与投资者特别约定，本行不向投资者另行寄送产品账单。</p>
        <p style="text-indent:2em;">2.本产品在成立后不另行发布产品投资比例信息公告。如本产品投资者需了解相关产品投资比例信息，详询本产品销售网点。</p>
        <p style="text-indent:2em;">3.本产品到期时一次还本付息，大连银行不另行发布相关信息公告。</p>
        <p style="text-indent:2em;">4.若发生大连银行获知并经大连银行合理判断认为对理财产品本金及收益有重大影响的事件，大连银行将在官方网站http://www.bankofdl.com上发布相关信息公告。</p>
        <p style="text-indent:2em;">5.如遇本产品须提前终止事件，大连银行将在官方网站http://www.bankofdl.com上发布相关信息公告，并根据投资者预留在大连银行的有效联系方式主动联系投资者之后，行使提前终止权。</p>
        <p style="text-indent:2em;">6.如本产品到期后未能获得业绩比较基准利率，大连银行将在本产品到期日后2个工作日内，在官方网站http://www.bankofdl.com上以公告的方式通知投资者。</p>
        <h4 style="text-indent:2em;">六、相关事项说明</h4>
        <p style="text-indent:2em;">如投资者对本理财产品有任何异议或意见，请联系大连银行的理财经理或反馈至大连银行各营业网点，也可致电大连银行全国统一客户服务热线4006640099。</p>
        <h4 style="text-indent:2em;text-align: right;margin-right: 200px">投资者公章：</h4>
        <p style="text-indent:2em;text-align: right;margin-right: 50px;margin-top: 50px">&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'yueyue',
  props: {
    formData: {
      default: () => {},
      type: Object
    }
  },
  data () {
    return {
      ipoStartYear: '',
      ipoStartMonth: '',
      ipoStartDay: '',
      ipoEndYear: '',
      ipoEndMonth: '',
      ipoEndDay: '',
      incomeYear: '',
      incomeMonth: '',
      incomeDay: '',
      incomeEndYear: '',
      incomeEndMonth: '',
      incomeEndDay: ''
    }
  },
  methods: {},
  created () {
    this.ipoStartYear = this.formData.ipoStartDate.split('.')[0]
    this.ipoStartMonth = this.formData.ipoStartDate.split('.')[1]
    this.ipoStartDay = this.formData.ipoStartDate.split('.')[2]
    this.ipoEndYear = this.formData.ipoEndDate.split('.')[0]
    this.ipoEndMonth = this.formData.ipoEndDate.split('.')[1]
    this.ipoEndDay = this.formData.ipoEndDate.split('.')[2]
    this.incomeYear = this.formData.estabDate.split('.')[0]
    this.incomeMonth = this.formData.estabDate.split('.')[1]
    this.incomeDay = this.formData.estabDate.split('.')[2]
    this.incomeEndYear = this.formData.endDate.split('.')[0]
    this.incomeEndMonth = this.formData.endDate.split('.')[1]
    this.incomeEndDay = this.formData.endDate.split('.')[2]
  }
}
</script>

<style scoped>
.form-box{
  padding-top: 20px;
}
.title{
  text-align: center;
}
.logo {
  margin-left: 40px;
}
.table1{
  margin-left: 150px;
  width: 500px;
  border-collapse: collapse;
}
.line{
  height: 35px
}
.label1{
  border: 0.1px solid;
  width: 250px;
  text-align: center;
}
.content1{
  border: 0.1px solid;
  text-align: center;
}
.table2{
  margin-left: 150px;
  width: 700px;
  border-collapse: collapse;
}
.label2{
  border: 0.1px solid;
  width: 200px;
  text-align: center;
}
.content2{
  border: 0.1px solid;
  text-align: left;
}
</style>
