<template>
  <div>
    <div class="form-box">
      <img class="logo" src="./../image/logo.jpg" alt/>
      <div style="border: 0.1px solid;margin: 0 40px">
        <p style="margin-left: 10px">尊敬的投资者：</p>
        <p style="margin-left: 10px;text-indent:2em;">本理财产品不保证本金和收益，您的本金可能会因市场变动而蒙受重大损失，您应充分认识投资风险，谨慎投资。</p>
      </div>
      <div class="title">
        <h2>大连银行鲲鹏理财臻萃封闭净值型理财产品说明书</h2>
        <h3>{{formData.prdName}}</h3>
      </div>
      <div style="padding: 0px 40px">
        <p>尊敬的投资者：</p>
        <p style="text-indent:2em;">感谢您选择大连银行人民币理财产品。根据中国银行保险监督管理委员会相关监管规定的要求，在您购买本理财产品前，请仔细阅读以下内容：</p>
        <h4 style="text-indent:2em;">一、重要须知</h4>
        <p style="text-indent:2em;">1、本理财产品说明书与《大连银行鲲鹏理财产品协议书》、《风险揭示书》、《客户权益须知》共同构成完整的不可分割的理财合同。</p>
        <p style="text-indent:2em;">2、本理财产品仅向依据中华人民共和国有关法律法规及本产品说明书规定可以购买本理财产品的合格投资者发售。</p>
        <p style="text-indent:2em;">3、本理财产品不等同于银行存款。</p>
        <p style="text-indent:2em;">4、在购买本理财产品前，请投资者确保完全明白本理财产品的性质、资金投资方向、涉及的风险以及投资者的自身情况。请投资者独立、自主、谨慎做出投资决策，购买与自身风险承受能力和资产管理需求匹配的理财产品。投资者若对本产品说明书的内容有任何疑问，请向大连银行各营业网点咨询。</p>
        <p style="text-indent:2em;">5、除本产品说明书中明确规定的收益及收益分配方式外，任何业绩比较基准、测算收益或类似表述均属不具有法律约束力的用语，不代表投资者可能获得的实际收益，亦不构成大连银行对本理财产品的任何收益承诺。</p>
        <p style="text-indent:2em;">6、本理财产品只根据本产品说明书所载的资料操作。</p>
        <p style="text-indent:2em;">7、本理财产品为非保本浮动收益型产品，您的本金可能会因市场变动而蒙受重大损失，您应充分认识投资风险，谨慎投资。</p>
        <p style="text-indent:2em;">8、投资者在与我行签订理财产品协议时，我行仅获取投资者授权的个人金融信息，同时我行将严格保护投资者相关金融信息，确保信息安全，防止投资者信息泄露和滥用。</p>
        <p style="text-indent:2em;">9、在购买理财产品后，请投资者及时关注该理财产品的信息披露情况，及时获取相关信息。</p>
				<p style="text-indent:2em;">10、大连银行有权依法对本产品说明书进行解释。在本产品存续期内，如因国家法律法规、监管规定发生变化，或是出于维持本产品正常运营的需要，在不损害投资者利益的前提下，大连银行有权单方对本产品说明书进行修订。大连银行决定对产品说明书进行修订的，将提前3个工作日在我行网站（www.bankofdl.com.）上以公告的方式通知投资者。</p>
				<p style="text-indent:2em;">11、本产品在“全国银行业理财信息登记系统”的登记编码详见“理财产品基本要素”中“理财登记系统编码”栏，投资者可依据该登记编码在“中国理财网（www.chinawealth.com.cn）”查询该产品信息。</p>
        <h4 style="text-indent:2em;">二、风险评级</h4>
        <p style="text-indent:2em;">我行内部风险评级：R2（本评级为大连银行内部评级，仅供参考）。</p>
				<p style="text-indent:2em;text-align: center">大连银行理财产品风险分级及适合的投资者类型</p>
				<div>
          <table class="table3">
            <tbody>
							<tr class="line">
                <th class="label3">产品风险分级)</th>
                <th class="label3">投资者风险承受程度</th>
								<th class="content3">适合投资者</th>
              </tr>
              <tr class="line">
                <td class="label3">R1（谨慎型）</td>
                <td class="label3">A1（谨慎型）</td>
								<td class="content3">谨慎型、稳健型、平衡型、进取型、激进型</td>
              </tr>
              <tr class="line">
                <td class="label3">R2（稳健型）</td>
                <td class="label3">A2（稳健型）</td>
								<td class="content3">稳健型、平衡型、进取型、激进型</td>
              </tr>
              <tr class="line">
                <td class="label3">R3（平衡型）</td>
                <td class="label3">A3（平衡型）</td>
								<td class="content3">平衡型、进取型、激进型</td>
              </tr>
              <tr class="line">
                <td class="label3">R4（进取型）</td>
                <td class="label3">A4（进取型）</td>
								<td class="content3">进取型、激进型</td>
              </tr>
							<tr class="line">
                <td class="label3">R5（激进型）</td>
                <td class="label3">A5（激进型）</td>
								<td class="content3">激进型</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 style="text-indent:2em;">三、投资方向范围及比例</h4>
        <p style="text-indent:2em;">本理财产品由大连银行负责管理，产品募集的资金主要投资于：</p>
        <p style="text-indent:2em;">第一类资产：货币市场金融工具类资产、债券类资产、资产支持证券和其他符合监管要求的债权类资产等，包括但不限于现金、银行存款、回购、同业存单、国债、央行票据、金融债、债务融资工具（包括不限于超短期融资券、短期融资券、中期票据等）、企业（公司）债、次级债以及包含前述资产的产品及基金等。</p>
        <p style="text-indent:2em;">第二类资产：证券市场挂牌交易的优先股、普通股、存托凭证、可转债、定向增发股票、可转换债申购、股票型证券投资基金、股票型证券投资信托计划、包含前述资产的产品及基金以及法律法规允许或监管部门批准的其他具备权益特征的资产和资产组合等。</p>
				<p style="text-indent:2em;">第三类资产：其他资产或资产组合。包括但不限于信托计划、证券公司及其资产管理公司资产管理计划、基金公司资产管理计划和保险资产管理公司投资计划以及法律法规允许或监管部门批准的其他具备固定收益特征的资产及资产组合等非标准化债权资产。</p>
        <p style="text-indent:2em;">本产品的杠杆比率不超过140%。</p>
        <p style="text-indent:2em;">投资比例区间（理财产品存续期内可能因市场的重大变化导致投资比例暂时超出如下规定区间。）</p>
        <div>
          <table class="table1">
            <tbody>
							<tr class="line">
                <th class="label1">投资种类</th>
                <th class="content1">第一类资产</th>
								<th class="content1">第二类资产</th>
								<th class="content1">第三类资产</th>
              </tr>
              <tr class="line">
                <td class="label1">投资比例</td>
								<td class="content1">80%-100%</td>
                <td class="content1">0-20%</td>
								<td class="content1">0%-20%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style="text-indent:2em;">如遇市场变化导致各类投资品投资比例暂时超出以上范围，为保证投资者利益，大连银行将在【15】个工作日调整至上述比例范围。</p>
        <h4 style="text-indent:2em;">四、理财产品基本要素</h4>
        <div>
          <table class="table2">
            <tbody>
              <tr class="line">
                <td class="label2">产品名称</td>
                <td class="content2">{{formData.prdName}}</td>
              </tr>
							<tr class="line">
                <td class="label2">产品代码</td>
                <td class="content2">{{formData.prdCode}}</td>
              </tr>
              <tr class="line">
                <td class="label2">理财登记系统编码</td>
                <td class="content2">{{formData.prdRegisterCode}}<br>投资者可依据该编码在"中国理财网（www.chinawealth.com.cn）"查询产品信息。</td>
              </tr>
							<tr class="line">
                <td class="label2">理财币种</td>
                <td class="content2">人民币</td>
              </tr>
              <tr class="line">
                <td class="label2">产品类型</td>
                <td class="content2">固定收益类私募产品</td>
              </tr>
              <tr class="line">
                <td class="label2">收益类型</td>
                <td class="content2">非保本浮动收益型</td>
              </tr>
              <tr class="line">
                <td class="label2">销售对象</td>
                <td class="content2">个人投资者、机构投资者</td>
              </tr>
              <tr class="line">
                <td class="label2">认购起点</td>
                <td class="content2">1元人民币为1份，认购起点份额为30万份，以1万份的整数倍递增。</td>
              </tr>
              <tr class="line">
                <td class="label2">发行规模</td>
                <td class="content2">本理财产品发行规模上限为{{formData.totLimit / 10000}}万元人民币</td>
              </tr>
              <tr class="line">
                <td class="label2">产品期限</td>
                <td class="content2">{{formData.interestDays}}天【理财产品起息日（含）至到期日（不含）期间，在发生提前终止条款约定的情况下，实际产品期限截止至大连银行确定的提前终止日】</td>
              </tr>
              <tr class="line">
                <td class="label2">认购期</td>
                <td class="content2">{{ipoStartYear}}年{{ipoStartMonth}}月{{ipoStartDay}}日9:00至{{ipoEndYear}}年{{ipoEndMonth}}月{{ipoEndDay}}日17:00，其中{{ipoEndYear}}年{{ipoEndMonth}}月{{ipoEndDay}}为投资冷静期，投资冷静期内本产品不再接受认购申请，如投资者改变投资决策，可进行撤单操作</td>
              </tr>
              <tr class="line">
                <td class="label2">产品成立日</td>
                <td class="content2">{{incomeYear}}年{{incomeMonth}}月{{incomeDay}}日</td>
              </tr>
							<tr class="line">
                <td class="label2">产品到期日</td>
                <td class="content2">{{incomeEndYear}}年{{incomeEndMonth}}月{{incomeEndDay}}日（在发生本理财产品说明书中大连银行提前终止权条款约定的情况下，实际产品期限截止至大连银行确定的提前终止日）</td>
              </tr>
              <tr class="line">
                <td class="label2">产品成立</td>
                <td class="content2">为保护投资者利益，大连银行可根据市场变化情况缩短或延长募集期并提前或推迟成立，产品提前或推迟成立时大连银行将调整相关日期并进行信息披露。产品最终规模以实际募集规模为准。如产品募集规模低于1000万元，则大连银行可宣布本产品不成立，并在原定起始日后3个工作日内通过网站或相关营业网点发布产品不成立信息，投资者本金和利息（如有）将在原定起始日后3个工作日内划转至投资者账号，原定起始日至资金到账日之间投资者资金不计利息。</td>
              </tr>
              <tr class="line">
                <td class="label2">产品到期及收益支付</td>
                <td class="content2">大连银行在产品到期日后3个工作日内将投资者资金及收益（如有）划转到投资者指定账号，逢中国（除港澳台地区）法定节假日顺延 ，产品到期日至资金到账日之间投资者资金不计利息。</td>
              </tr>
							<tr class="line">
                <td class="label2">提前终止或提前赎回</td>
                <td class="content2">为保护投资者利益，如出现以下情形，大连银行有权但无义务提前终止本理财产品：本产品存续期内如遇不可抗力因素，导致本产品无法运作；理财资金所投资的资产提前终止或其他影响到本理财产品的正常运作情形（如突发性事件等）。大连银行提前终止本理财产品，将提前至少2个工作日以公告形式通知客户。<br>除不可抗力因素和本说明书第七条约定的可提前赎回的情形外，投资者不得提前终止本产品。</td>
              </tr>
              <tr class="line">
                <td class="label2">工作日</td>
                <td class="content2">除法定节假日和休息日（以国务院公布为准）以外的中国的银行工作日。</td>
              </tr>
              <tr class="line">
                <td class="label2">业绩比较基准</td>
                <td class="content2">本产品为净值型理财产品，没有预期收益率，其业绩表现将随市场波动，具有不确定性，我行提醒投资者关注。<br>本产品业绩比较基准为{{formData.modelComment}}（年化），该业绩比较基准仅作为产品投资管理的业绩比较基础。<span style="font-weight: 900">理财产品业绩比较基准和过往业绩不代表其未来表现，不等于理财产品实际收益，投资须谨慎。</span>投资者的实际收益由产品到期或提前终止时的净值决定。</td>
              </tr>
              <tr class="line">
                <td class="label2">产品净值</td>
                <td class="content2">每份产品初始单位净值为1，产品成立后我行将通过大连银行网站至少每季度披露产品净值，并于到期公告披露产品最终净值。（如遇节假日，则进行顺延）</td>
              </tr>
              <tr class="line">
                <td class="label2">理财产品管理人</td>
                <td class="content2">大连银行股份有限公司</td>
              </tr>
              <tr class="line">
                <td class="label2">理财产品托管人</td>
                <td class="content2">中国工商银行股份有限公司广州分行</td>
              </tr>
							<tr class="line">
                <td class="label2">产品费用</td>
                <td class="content2">认购费：本产品不收取认购费。<br>赎回费：本产品不收取赎回费。<br>销售服务费：本产品按前一日产品资产净值的0.1%（年化）收取销售服务费，按日计提。<br>托管费：本产品按前一日产品资产净值的0.01%（年化）收取托管费，按日计提。<br>管理费：本产品按前一日产品资产净值的0.3%（年化）收取固定管理费，按日计提。<br>浮动业绩报酬：本产品扣除销售服务费、托管费和管理费，年化收益率低于业绩比较基准（含），不收取浮动业绩报酬；年化收益率超过业绩比较基准的部分，全部作为大连银行的浮动业绩报酬。<br>注：公布的产品净值中已扣除销售服务费、托管费、管理费和浮动业绩报酬等相关费用，计费周期基准为365天。</td>
              </tr>
              <tr class="line">
                <td class="label2">存款证明</td>
                <td class="content2">本产品不能开立存款证明。</td>
              </tr>
              <tr class="line">
                <td class="label2">税款</td>
                <td class="content2">本产品中银行不承担代投资人扣缴相关税费的义务，但法律法规另有规定的除外。</td>
              </tr>
							<tr class="line">
                <td class="label2">购买方式</td>
                <td class="content2">在理财产品认购期，投资者可携带相关材料到大连银行具有销售资格的营业网点进行购买。认购期内，投资者可以撤单。</td>
              </tr>
							<tr class="line">
                <td class="label2">其他约定</td>
                <td class="content2">理财产品认购期间，资金按人民币活期存款利率计付利息。<br>理财产品到期日或提前终止日当天不计息</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 style="text-indent:2em;">五、本金及理财收益</h4>
        <p style="text-indent:2em;">（一）本金及理财收益风险</p>
        <p style="text-indent:2em;"> 1、本理财产品类型为非保本浮动收益型，不保障本金及理财收益。</p>
        <p style="text-indent:2em;"> 2、风险提示</p>
        <h4 style="text-indent:2em;">本理财产品业绩比较基准不构成对投资收益的承诺或担保。在投资组合可能发生损失，在最不利的情况下，本理财产品的本金及收益可能全部损失。</h4>
        <p style="text-indent:2em;">（二）业绩比较基准</p>
				<p style="text-indent:2em;">根据近期市场上各类资产的投资收益情况，按照本产品投资方向，以大连银行投资理念、配置策略等为准则，确定本产品业绩比较基准为{{formData.modelComment}}。</p>
				<p style="text-indent:2em;">（三）投资者所得收益</p>
				<p style="text-indent:2em;">1、计算公式</p>
				<p style="text-indent:2em;">投资者所得收益=投资份额×（到期或提前终止单位净值-初始单位净值）</p>
				<p style="text-indent:2em;">投资者获得的人民币理财收益金额保留到小数点后2位（小数点2位以后舍位）。</p>
				<p style="text-indent:2em;">2、计算示例</p>
				<p style="text-indent:2em;">计算示例一：</p>
				<p style="text-indent:2em;">假设投资者理财本金为52000元，初始单位净值为1元，投资者认购52000份本理财产品，产品期限98天，产品正常到期后，到期公布的单位净值为1.012711（已扣除销售服务费、托管费、管理费、浮动业绩报酬及理财产品累计终止、赎回和分红总金额 （如有）等），投资者理财收益为：</p>
				<p style="text-indent:2em;">投资者理财收益＝52000×（1.012711-1）＝660.97元</p>
				<p style="text-indent:2em;">经换算后投资者实际年化收益率约为660.97÷98×365÷52000=4.73%。</p>
				<p style="text-indent:2em;">计算示例二：</p>
				<p style="text-indent:2em;">假设投资者理财本金为52000元，初始单位净值为1元，投资者认购52000份本理财产品，产品期限98天，产品正常到期后，到期公布的单位净值为0.997500（已扣除销售服务费、托管费、管理费、浮动业绩报酬及理财产品累计终止、赎回和分红总金额 （如有）等），投资者理财收益为：</p>
				<p style="text-indent:2em;">投资者理财收益＝52000×（0.997515-1）＝-129.22元。</p>
				<p style="text-indent:2em;">提示：（1）上述示例采用假设数据计算，仅供参考，并不代表投资者到期实际可获得的理财收益。</p>
				<p style="text-indent:2em;">（2）实际理财产品到期日遇法定节假日顺延至下一个工作日。</p>
				<p style="text-indent:2em;">（3）最不利投资情形下的投资结果是本金和收益为零。</p>
				<h4 style="text-indent:2em;">（测算收益不等于实际收益，投资须谨慎）</h4>
				<p style="text-indent:2em;">3、理财收益支付</p>
				<p style="text-indent:2em;">（1）到期收益支付：投资者持有本理财产品至到期日，大连银行在到期日后3个工作日内将投资者资金和收益（如有）转至投资者指定账号。产品到期日至资金到账日之间投资者资金不计利息。</p>
				<p style="text-indent:2em;">（2）提前终止和提前赎回时，大连银行在提前终止日或提起赎回日后3个工作日内将投资者资金和收益（如有）划转至投资人指定账号。产品提前终止和提前赎回日至资金到账日之间投资者资金不计利息。</p>
				<h4 style="text-indent:2em;">六、理财产品估值</h4>
				<p style="text-indent:2em;">（一）估值日</p>
				<p style="text-indent:2em;">本理财产品T日对T-1日持有资产进行估值，T日、T-1日均为工作日，非工作日不进行估值。</p>
				<p style="text-indent:2em;">（二）估值对象</p>
				<p style="text-indent:2em;">本理财产品所拥有的所有金融资产及金融负债。</p>
				<p style="text-indent:2em;">（三）估值方法</p>
				<p style="text-indent:2em;">理财产品所投资各类资产原则上按照公允价值估值，具体估值方法如下：</p>
				<p style="text-indent:2em;">1、货币市场工具类的估值</p>
				<p style="text-indent:3em;">（1）银行存款以本金列示，逐日计提利息；</p>
				<p style="text-indent:3em;">（2）货币基金以当日基金净值估值；</p>
				<p style="text-indent:3em;">（3）一年内同业存单或债券以摊余成本法估值。</p>
				<p style="text-indent:2em;">2、债券类的估值</p>
				<p style="text-indent:3em;">（1）以持有到期为目的持有的债券按摊余成本法估值；</p>
				<p style="text-indent:3em;">（2）以交易为目的持有的债券按市价法估值。</p>
				<p style="text-indent:2em;">3、债权类项目的估值</p>
        <p style="text-indent:3em;">（1）非标债权类项目以摊余成本法估值；</p>
				<p style="text-indent:3em;">（2）标准化债权项目中，以持有到期为目的持有的债权按摊余成本法估值，以交易为目的持有的债权按市价法估值</p>
				<p style="text-indent:2em;">4、其他资产类估值</p>
				<p style="text-indent:2em;">其他资产存在并可以确定公允价值的，以公允价值计算，公允价值不能确定的按取得时的成本按摊余成本法计算。</p>
				<p style="text-indent:2em;">5、国家有最新规定的，按其规定进行估值。</p>
				<p style="text-indent:2em;">6、在任何情况下，产品管理人与托管人所共同认可的估值方式均视为客观、公允的估值方法。该产品估值均以产品公布的估值结果为准。</p>
				<p style="text-indent:2em;">7、估值错误处理：产品管理人将采取必要、适当合理的措施确保产品资产估值的准确性、及时性。当产品净值出现错误时，理财产品管理人（或其授权人）应当立即予以纠正，并采取合理的措施防止损失进一步扩大。由于本产品估值所用的价格来源出现错误，或由于其他不可抗力原因，理财产品管理人（或授权人）和托管人虽然已经采取必要、适当、合理的措施进行检查，但是未能发现该错误的，由此造成的产品资产估值错误，理财产品管理人（或其授权人）和托管人可以免除赔偿责任。但理财产品管理人（或其授权人）和托管人应当积极采取必要的措施消除由此造成的影响。</p>
				<p style="text-indent:2em;">8、暂停估值：当产品资产的估值因不可抗力或其它情形致使理财产品管理人（或其授权人）、托管人无法准确评估产品资产价值或存在中国银行保险监督管理委员会认定的其它情形，理财产品管理人（或其授权人）可暂停产品的估值直至另行通知，由此造成的暂停申赎，理财产品管理人（或其授权人）和托管人可以免除赔偿责任。</p>
				<p style="text-indent:2em;">9、该产品估值由产品管理人授权中国工商银行股份有限公司广州分行负责完成。</p>
				<h4 style="text-indent:2em;">七、理财产品信息披露</h4>
				<p style="text-indent:2em;">1、根据本产品运作特点，大连银行与投资人特别约定，我行不向投资人另行寄送产品账单。</p>
				<p style="text-indent:2em;">2、本产品成立后5个工作日内，将在大连银行网站（www.bankofdl.com）发布产品成立相关公告。</p>
				<p style="text-indent:2em;">3、本产品成立后，将在每个季度结束之日起15个工作日内、上半年结束之日起60个工作日内、每年结束之日起90个工作日内，编制完成产品的季度、半年和年度等定期报告，向投资人披露相关产品投资比例等信息，并通过大连银行网站（www.bankofdl.com）或网上银行和手机银行等渠道进行发布。</p>
				<p style="text-indent:2em;">4、在产品存续期内，若发生大连银行认为可能影响本产品投资运作的重大影响事件时，大连银行可视情况选择以下一种或多种方式告知投资者：大连银行网站（www.bankofdl.com）、相关营业网点发布、电子邮件、电话、以信函形式邮寄、手机短信等。 </p>
				<p style="text-indent:2em;">5、在产品存续期内，大连银行对原约定的投资范围、投资品种或投资比例进行调整的，将提前5个工作日在大连银行网站（www.bankofdl.com）以公告的方式通知投资者。投资者如不同意前述修订，可根据大连银行的公告在修订生效前赎回本产品，投资者理财资金和收益（如有）将在赎回确认日后3个工作日内划转至投资者账号，如遇巨额赎回情况，按巨额赎回的约定执行。</p>
				<p style="text-indent:2em;">6、本产品在终止日后5个工作日内在大连银行网站（www.bankofdl.com）发布相关信息公告。</p>
				<h4 style="text-indent:2em;">八、相关事项说明 </h4>
				<p style="text-indent:2em;">1、本理财产品说明书中示例均采用假设数据，并不代表投资者实际可获得的收益。 </p>
				<p style="text-indent:2em;">2、如投资者对本理财产品有任何异议或意见，请联系大连银行的理财经理或反馈至大连银行各营业网点，也可致电大连银行全国统一客户服务热线（4006640099）。 </p>
        <p style="text-indent:2em;text-align: right;margin-right: 50px;padding: 50px 0">大连银行股份有限公司</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'zhencui',
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
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
  padding: 20px 0;
  background: #ffffff;
}
.title{
  text-align: center;
}
.logo {
  margin-left: 40px;
}
.line{
  height: 35px
}
.table1{
  margin-left: 150px;
  width: 500px;
  border-collapse: collapse;
}
.label1{
  border: 0.1px solid;
  width: 100px;
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
.table3{
  margin-left: 150px;
  width: 800px;
  border-collapse: collapse;
}
.label3{
  border: 0.1px solid;
  width: 200px;
  text-align: center;
}
.content3{
	border: 0.1px solid;
  text-align: center;
}
</style>
