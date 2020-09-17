<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-new-form
      ref="mNewForm"
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @submit="onSubmit"
      @reset="onreset"
    >
    </m-new-form>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
export default {
  name: 'foreignCurrencyDeposit',
  data: function () {
    return {
      data: ['更多', '外币保证金', '外币保证金存入'],
      formModel: {
      },
      acList: [],
      formConfigJson: {
        rules: {
          payerAccount: [{ required: true, message: '付款账号', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '30%',
            title: '基本信息',
            group: [
              {
                'disabled': false,
                'label': '是否新建客户账号',
                'type': 'select',
                'options': [
                  { value: '否', key: '0' },
                  { value: '是', key: '1' }
                ],
                'key': 'newOpenAcNoFlag'
              },
              {
                'disabled': false,
                'label': '关联活期账户',
                'type': 'input',
                'key': 'contCurAccount'
              },
              {
                'disabled': true,
                'label': '客户账号',
                'type': 'text',
                'key': 'acNo'
              },
              {
                'disabled': false,
                'label': '基础产品编号',
                'type': 'select',
                'options': [
                  { value: '是', key: '1' },
                  { value: '否', key: '0' }
                ],
                'key': 'prdId'
              },
              {
                'disabled': false,
                'label': '账户名称',
                'type': 'input',
                'key': 'acName'
              },
              {
                'disabled': false,
                'label': '货币代号',
                'type': 'select',
                'options': [
                  { value: '156', key: '人民币' },
                  { value: '826', key: '英镑' },
                  { value: '344', key: '港币' },
                  { value: '840', key: '美元' },
                  { value: '756', key: '瑞士法郎' },
                  { value: '392', key: '日元' },
                  { value: '124', key: '加元' },
                  { value: '036', key: '澳元' },
                  { value: '702', key: '新加坡元' },
                  { value: '978', key: '欧元' },
                  { value: '446', key: '澳门元' },
                  { value: '901', key: '新台币' },
                  { value: '716', key: '津巴布韦元' },
                  { value: '999', key: '所有币种' },
                  { value: '998', key: '所有外币' },
                  { value: '020', key: '安道尔比赛塔' },
                  { value: '784', key: 'UAE迪拉姆' },
                  { value: '004', key: '阿富汗尼' },
                  { value: '008', key: '列克' },
                  { value: '051', key: '亚美尼亚达姆' },
                  { value: '532', key: '荷属安的列斯盾' },
                  { value: '973', key: '宽扎' },
                  { value: '032', key: '阿根廷比索' },
                  { value: '040', key: '先令' },
                  { value: '533', key: '阿鲁巴盾' },
                  { value: '031', key: '阿塞拜疆马纳特' },
                  { value: '977', key: '可自由兑换标记' },
                  { value: '052', key: '巴巴多斯元' },
                  { value: '050', key: '塔卡' },
                  { value: '056', key: '比利时法郎' },
                  { value: '100', key: '列弗' },
                  { value: '975', key: '保加利亚列弗' },
                  { value: '048', key: '巴林第纳尔' },
                  { value: '108', key: '布隆迪法郎' },
                  { value: '060', key: '百慕大元' },
                  { value: '096', key: '文莱元' },
                  { value: '068', key: '玻利瓦诺' },
                  { value: '984', key: 'Mvdol' },
                  { value: '986', key: '巴西瑞尔' },
                  { value: '044', key: '巴哈马元' },
                  { value: '064', key: '努尔特鲁姆' },
                  { value: '072', key: '普拉' },
                  { value: '974', key: '白俄罗斯卢布' },
                  { value: '084', key: '伯利兹元' },
                  { value: '976', key: '刚果法郎' },
                  { value: '990', key: '发展单位' },
                  { value: '152', key: '智利比索' },
                  { value: '170', key: '哥伦比亚比索' },
                  { value: '188', key: '哥斯达黎加科郎' },
                  { value: '192', key: '古巴比索' },
                  { value: '132', key: '佛得角埃斯库多' },
                  { value: '196', key: '塞浦路斯镑' },
                  { value: '203', key: '捷克克郎' },
                  { value: '276', key: '德国马克' },
                  { value: '262', key: '吉布提法郎' },
                  { value: '208', key: '丹麦克郎' },
                  { value: '214', key: '多米尼加比索' },
                  { value: '012', key: '阿尔及利亚第纳尔' },
                  { value: '233', key: '克罗姆' },
                  { value: '818', key: '埃及镑' },
                  { value: '232', key: '纳克法' },
                  { value: '724', key: '西班牙比赛塔' },
                  { value: '230', key: '埃塞俄比亚比尔' },
                  { value: '246', key: '马克' },
                  { value: '242', key: '斐济元' },
                  { value: '238', key: '福克兰群岛镑' },
                  { value: '250', key: '法国法郎' },
                  { value: '981', key: '拉里' },
                  { value: '288', key: '塞地' },
                  { value: '292', key: '直布罗陀镑' },
                  { value: '270', key: '达拉西' },
                  { value: '324', key: '几内亚法郎' },
                  { value: '300', key: '德拉克马' },
                  { value: '320', key: '格查尔' },
                  { value: '624', key: '几内亚比绍比索' },
                  { value: '328', key: '圭亚那元' },
                  { value: '340', key: '伦皮拉' },
                  { value: '191', key: '克罗地亚库纳' },
                  { value: '332', key: '古德' },
                  { value: '348', key: '福林' },
                  { value: '360', key: '卢比' },
                  { value: '372', key: '爱尔兰镑' },
                  { value: '376', key: '新谢客尔' },
                  { value: '356', key: '印度卢比' },
                  { value: '368', key: '伊拉克第纳尔' },
                  { value: '364', key: '伊郎里亚尔' },
                  { value: '352', key: '冰岛克郎' },
                  { value: '380', key: '意大利里拉' },
                  { value: '388', key: '牙买加元' },
                  { value: '400', key: '约旦第纳尔' },
                  { value: '404', key: '肯尼亚先令' },
                  { value: '417', key: '索姆' },
                  { value: '116', key: '瑞尔' },
                  { value: '174', key: '科摩罗法郎' },
                  { value: '408', key: '北朝鲜圆' },
                  { value: '410', key: '韩元' },
                  { value: '414', key: '科威特第纳尔' },
                  { value: '136', key: '开曼群岛元' },
                  { value: '398', key: '坚戈' },
                  { value: '418', key: '基普' },
                  { value: '422', key: '黎巴嫩镑' },
                  { value: '144', key: '斯里兰卡卢比' },
                  { value: '430', key: '利比里亚元' },
                  { value: '426', key: '罗提' },
                  { value: '440', key: '立陶宛' },
                  { value: '442', key: '卢森堡法郎' },
                  { value: '428', key: '拉脱维亚拉特' },
                  { value: '434', key: '利比亚第纳尔' },
                  { value: '504', key: '摩洛哥迪拉姆' },
                  { value: '498', key: '摩尔瓦多列伊' },
                  { value: '450', key: '马尔加什法郎' },
                  { value: '807', key: '第纳尔' },
                  { value: '104', key: '缅元' },
                  { value: '496', key: '图格里克' },
                  { value: '478', key: '乌吉亚' },
                  { value: '470', key: '马尔他里拉' },
                  { value: '480', key: '毛里求斯卢比' },
                  { value: '462', key: '卢菲亚' },
                  { value: '454', key: '克瓦查' },
                  { value: '484', key: '墨西哥比索' },
                  { value: '490', key: '黄金(克)' },
                  { value: '491', key: '白银(克)' },
                  { value: '979', key: '墨西哥发展单位' },
                  { value: '458', key: '马来西亚林吉特' },
                  { value: '508', key: '麦梯卡尔' },
                  { value: '516', key: '纳米比亚元' },
                  { value: '566', key: '奈拉' },
                  { value: '558', key: '金科多巴' },
                  { value: '528', key: '荷兰盾' },
                  { value: '578', key: '挪威克郎' },
                  { value: '524', key: '尼泊尔卢比' },
                  { value: '554', key: '新西兰元' },
                  { value: '512', key: '阿曼里亚尔' },
                  { value: '590', key: '巴波亚' },
                  { value: '604', key: '索尔' },
                  { value: '598', key: '基那' },
                  { value: '608', key: '菲律宾比索' },
                  { value: '586', key: '巴基斯坦卢比' },
                  { value: '985', key: '兹罗提' },
                  { value: '620', key: '葡萄牙埃斯库多' },
                  { value: '600', key: '瓜拉尼' },
                  { value: '634', key: '卡塔尔里亚尔' },
                  { value: '642', key: '列伊' },
                  { value: '643', key: '俄罗斯卢布' },
                  { value: '646', key: '卢旺达法郎' },
                  { value: '682', key: '沙特里亚尔' },
                  { value: '090', key: '所罗门群岛元' },
                  { value: '690', key: '塞舌尔卢比' },
                  { value: '736', key: '苏丹第纳尔' },
                  { value: '752', key: '瑞典克郎' },
                  { value: '654', key: '圣赫勒拿镑' },
                  { value: '705', key: '托拉尔' },
                  { value: '703', key: '斯洛伐克克郎' },
                  { value: '694', key: '利昂' },
                  { value: '706', key: '索马里先令' },
                  { value: '740', key: '苏里南盾' },
                  { value: '678', key: '多布拉' },
                  { value: '222', key: '萨尔瓦多科郎' },
                  { value: '760', key: '叙利亚镑' },
                  { value: '748', key: '里兰吉尼' },
                  { value: '764', key: '铢' },
                  { value: '972', key: '索莫尼' },
                  { value: '795', key: '马纳特' },
                  { value: '788', key: '突尼斯第纳尔' },
                  { value: '776', key: '邦加' },
                  { value: '626', key: '东帝汶埃斯库多' },
                  { value: '792', key: '土耳其里拉' },
                  { value: '780', key: '特立尼达和多巴哥元' },
                  { value: '834', key: '坦桑尼亚先令' },
                  { value: '980', key: '格里夫纳' },
                  { value: '800', key: '乌干达先令' },
                  { value: '997', key: '次日' },
                  { value: '998', key: '同日' },
                  { value: '858', key: '乌拉圭比索' },
                  { value: '860', key: '乌兹别克斯坦苏姆' },
                  { value: '704', key: '盾' },
                  { value: '548', key: '瓦图' },
                  { value: '882', key: '塔拉' },
                  { value: '950', key: 'CFA法郎BEAC' },
                  { value: '961', key: '银' },
                  { value: '959', key: '黄金' },
                  { value: '955', key: '欧洲货币合成单位' },
                  { value: '956', key: '欧洲货币单位(E.M.U.-6)' },
                  { value: '957', key: '欧洲账户9单位(E.U.A.-9)' },
                  { value: '958', key: '欧洲账户17单位(E.U.A.-17)' },
                  { value: '951', key: '东加勒比元' },
                  { value: '960', key: '特别提款权' },
                  { value: 'Ni1', key: '黄金法郎' },
                  { value: 'Ni2', key: 'UIC法郎' },
                  { value: '952', key: 'CFA法郎BCEAO' },
                  { value: '964', key: '钯' },
                  { value: '953', key: 'CFP法郎' },
                  { value: '962', key: '铂白金' },
                  { value: '963', key: '为测试特别保留的代码' },
                  { value: '886', key: '也门里亚尔' },
                  { value: '891', key: '南斯拉夫第纳尔' },
                  { value: '710', key: '兰特' },
                  { value: '894', key: '克瓦查' }
                ],
                'key': 'currency',
                'show': true
              },
              {
                'disabled': false,
                'label': '基础产品名称',
                'type': 'text',
                'key': 'prdName'
              },
              {
                'disabled': false,
                'label': '钞汇标志',
                'type': 'select',
                'options': [
                  { value: '无', key: 'N' },
                  { value: '现钞', key: '0' },
                  { value: '现汇', key: '1' }
                ],
                'key': 'cashFlag'
              },
              {
                'disabled': false,
                'label': '账户分类',
                'type': 'select',
                'options': [
                  { value: '是', key: '1' },
                  { value: '否', key: '0' }
                ],
                'key': 'accType'
              },
              {
                'disabled': false,
                'label': '账户属性',
                'type': 'select',
                'options': [

                ],
                'key': 'accAttr'
              },
              {
                'disabled': false,
                'label': '外管账户性质',
                'type': 'select',
                'options': [
                  { value: '1000', key: '经常项目-外汇结算账户' },
                  { value: '1101', key: '经常项目-待核查账户' },
                  { value: '1102', key: '经常项目-边境贸易结算账户' },
                  { value: '1103', key: '经常项目-外汇资金集中管理账户' },
                  { value: '1104', key: '经常项目-国际贸易结算中心专用外汇账户' },
                  { value: '1202', key: '经常项目-捐赠账户' },
                  { value: '1300', key: '经常项目-定期存款及理财外汇账户' },
                  { value: '1400', key: '经常项目-驻华机构经费账户' },
                  { value: '1500', key: '经常项目-个人结算账户' },
                  { value: '1601', key: '保险机构外汇经营账户' },
                  { value: '1602', key: '保险机构资金运用外汇账户' },
                  { value: '1603', key: '支付机构外汇备付金账户' },
                  { value: '1604', key: '经常项目外汇专用账户（服务外包）' },
                  { value: '2001', key: '金融机构存放同业资金' },
                  { value: '2002', key: '单位内部设立的党团工会经费' },
                  { value: '2101', key: '资本项目-前期费用外汇账户' },
                  { value: '2102', key: '资本项目-外汇资本金账户' },
                  { value: '2103', key: '资本项目-资产变现账户' },
                  { value: '2104', key: '资本项目-保证金专用账户' },
                  { value: '2107', key: '资本项目-环境权益交易外汇账户' },
                  { value: '2108', key: '资本项目-人民币前期费用专用存款账户' },
                  { value: '2109', key: '资本项目-人民币资本金专用存款账户' },
                  { value: '2110', key: '资本项目-人民币并购专用存款账户' },
                  { value: '2111', key: '资本项目-人民币股权转让专用存款账户' },
                  { value: '2112', key: '资本项目-人民币再投资专用存款账户' },
                  { value: '2113', key: '资本项目-结汇待支付账户（无核准号）' },
                  { value: '2202', key: '资本项目-境外放款专用账户' },
                  { value: '2301', key: '资本项目-外债专户' },
                  { value: '2302', key: '资本项目-外债转贷款专户' },
                  { value: '2303', key: '资本项目-国内外汇贷款专户' },
                  { value: '2304', key: '资本项目-外债转贷款还贷专户' },
                  { value: '2305', key: '资本项目-外债还贷专户' },
                  { value: '2401', key: '资本项目-国有企业境外商品期货套期保值项下境' },
                  { value: '2403', key: '资本项目-居民境外证券与衍生品账户' },
                  { value: '2404', key: '资本项目-境内公司境外上市专用外汇账户' },
                  { value: '2405', key: '资本项目-境外上市回购境内专户' },
                  { value: '2406', key: '资本项目-境外上市股东增持境内专户' },
                  { value: '2407', key: '资本项目-境外上市股东减持境内专户' },
                  { value: '2410', key: '资本项目-合格境外投资者账户' },
                  { value: '2412', key: '资本项目-QDII境内托管账户' },
                  { value: '2414', key: '资本项目-QDII外汇清算账户' },
                  { value: '2415', key: '资本项目-QDII直销和代销外汇账户' },
                  { value: '2416', key: '资本项目-境内外投资者B股交易结算资金账户' },
                  { value: '2417', key: '资本项目-非银行金融机构客户资金账户' },
                  { value: '2418', key: '资本项目-非银行金融机构自有外汇资金账户' },
                  { value: '2419', key: '资本项目-境内划转暂存户' },
                  { value: '2420', key: '资本项目-结售汇专用账户' },
                  { value: '2421', key: '资本项目-定期存款户' },
                  { value: '2499', key: '资本项目-其他资本项目专用外汇账户' },
                  { value: '2901', key: '资本项目-外国投资者专用外汇账户（投资类）' },
                  { value: '2902', key: '资本项目-外国投资者专用外汇账户（收购类）' },
                  { value: '2903', key: '资本项目-外国投资者专用外汇账户（保证类）' },
                  { value: '3102', key: '特殊外汇账户-钻石交易专用外汇账户' },
                  { value: '3300', key: '离岸外汇账户' },
                  { value: '3400', key: '境外机构/个人境内外汇账户' },
                  { value: '3601', key: '国内资金主账户' },
                  { value: '3603', key: '自贸区内机构自由贸易账户（FTE）' },
                  { value: '3604', key: '境外机构自由贸易账户（FTN）' },
                  { value: '3605', key: '自贸区内个人自由贸易账户（FTI）' },
                  { value: '3606', key: '自贸区内境外个人自由贸易账户（FTF）' },
                  { value: '4200', key: '暂存户-开证、付汇保证金账户' },
                  { value: '4600', key: '暂存户-其他暂存户' }
                ],
                'key': 'outerTubeAcNoType'
              },
              {
                'disabled': false,
                'label': '金额',
                'type': 'input',
                'key': 'openAmount'
              },
              {
                'disabled': false,
                'label': '控制标志',
                'type': 'select',
                'options': [
                  { value: '是', key: '1' },
                  { value: '否', key: '0' }
                ],
                'key': 'controlFlag'
              },
              {
                'disabled': false,
                'label': '存期',
                'type': 'select',
                'options': [
                  { value: '是', key: '1' },
                  { value: '否', key: '0' }
                ],
                'key': 'depositTerm'
              },
              {
                'disabled': false,
                'label': '起息方式',
                'type': 'select',
                'options': [
                  { value: '开户日起息', key: '0' },
                  { value: '早起息', key: '1' },
                  { value: '晚起息', key: '2' }
                ],
                'key': 'interestPayType'
              },
              {
                'disabled': false,
                'label': '起息日期',
                'type': 'date',
                'key': 'incomeDate',
                pickerOptions: {
                  disabledDate: time => time.getTime() < new Date().getTime()
                }
              },
              {
                'disabled': false,
                'label': '到期日期',
                'type': 'date',
                'key': 'matureDate',
                pickerOptions: {
                  disabledDate: time => time.getTime() < new Date().getTime()
                }
              },
              {
                'disabled': false,
                'label': '通存范围',
                'type': 'select',
                'options': [
                  { value: '开户机构通存', key: '0' },
                  { value: '分行通存', key: '1' },
                  { value: '全行通存', key: '2' },
                  { value: '核算机构通存', key: '3' }
                ],
                'key': 'depositRange'
              },
              {
                'disabled': false,
                'label': '通兑范围',
                'type': 'select',
                'options': [
                  { value: '开户机构通兑', key: '0' },
                  { value: '分行通兑', key: '1' },
                  { value: '全行通兑', key: '2' },
                  { value: '核算机构通兑', key: '3' }
                ],
                'key': 'withDrawalRange'
              },
              {
                'disabled': false,
                'label': '自贸区账户标志',
                'type': 'select',
                'options': [
                  { value: '否', key: '0' },
                  { value: '是', key: '1' }
                ],
                'key': 'freeTradeAcctFlag'
              },
              {
                'disabled': false,
                'label': '自贸区账户类型',
                'type': 'select',
                'options': [
                  { value: '居民机构自由贸易账户', key: '0' },
                  { value: '居民个人自由贸易账户', key: '1' },
                  { value: '非居民机构自由贸易账户', key: '2' },
                  { value: '外籍个人自由贸易账户', key: '3' },
                  { value: '银行同业往来账户', key: '4' },
                  { value: '其他自贸区账户', key: '5' },
                  { value: '非自贸区账户', key: '6' }
                ],
                'key': 'freeTradeAcctType'
              },
              {
                'disabled': false,
                'label': '领用支票标志',
                'type': 'select',
                'options': [
                  { value: '不限', key: '0' },
                  { value: '可领用现金支票', key: '1' },
                  { value: '可领用转账支票', key: '2' },
                  { value: '不可领支票', key: '3' }
                ],
                'key': 'recCheckFlag'
              },
              {
                'disabled': false,
                'label': '支付条件',
                'type': 'select',
                'options': [
                  { value: '无', key: '0' },
                  { value: '凭密码', key: '1' },
                  { value: '凭证件', key: '2' },
                  { value: '凭密码+证件', key: '3' },
                  { value: '凭密码+印签', key: '4' },
                  { value: '凭印签/签名', key: '5' },
                  { value: '凭支付密码', key: '6' },
                  { value: '凭协议+印签', key: '7' },
                  { value: '凭协议', key: '8' },
                  { value: '不校验支付条件', key: '9' }
                ],
                'key': 'payerPayCondition'
              },
              {
                'disabled': false,
                'label': '代理人信息',
                'type': 'select',
                'options': [
                  { value: '是', key: '1' },
                  { value: '否', key: '0' }
                ],
                'key': ''
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '30%',
            title: '账户资金来源信息',
            group: [
              {
                'disabled': false,
                'label': '付款方式',
                'type': 'select',
                'key': 'bankSigns',
                'options': [
                  { value: '行内', key: '0' },
                  { value: '跨行', key: '1' }
                ]
              },
              {
                'disabled': false,
                'label': '付款账户账号',
                'type': 'input',
                'key': 'payerAcNo'
              },
              {
                'disabled': true,
                'label': '子账户序号',
                'type': 'input',
                'key': 'payerSubAcNo'
              },
              {
                'disabled': true,
                'label': '付款账户名称',
                'type': 'text',
                'key': 'payerActName'
              },
              {
                'disabled': false,
                'label': '付款支付条件',
                'type': 'select',
                'options': [
                  { value: '无', key: '0' },
                  { value: '凭密码', key: '1' },
                  { value: '凭证件', key: '2' },
                  { value: '凭密码+证件', key: '3' },
                  { value: '凭密码+印签', key: '4' },
                  { value: '凭印签/签名', key: '5' },
                  { value: '凭支付密码', key: '6' },
                  { value: '凭协议+印签', key: '7' },
                  { value: '凭协议', key: '8' },
                  { value: '不校验支付条件', key: '9' }
                ],
                'key': 'payerPayCondition'
              },
              {
                'disabled': true,
                'label': '付款凭证种类',
                'type': 'select',
                'options': [
                  { value: '3B', key: '现代化支付系统专用凭' },
                  { value: '3C', key: '国税' },
                  { value: '3D', key: '地税' },
                  { value: '3E', key: '国债托管本' },
                  { value: '3F', key: '卷式国税' },
                  { value: '3G', key: '卷式地税' },
                  { value: '3H', key: '投资时点证明（理财专用）' },
                  { value: '3I', key: '实物金代保管凭证' },
                  { value: '3J', key: '他行汇票委托书' },
                  { value: '3K', key: '华东三省一市汇票委托' },
                  { value: '3L', key: '特约汇款证' },
                  { value: '4A', key: '全国汇票' },
                  { value: '4B', key: '信汇' },
                  { value: '4C', key: '贴现凭证' },
                  { value: '4D', key: '一般电汇' },
                  { value: '4E', key: '借款凭证' },
                  { value: '4F', key: '还款凭证' },
                  { value: '4G', key: '现金解款单' },
                  { value: '4H', key: '专用解款单' },
                  { value: '4I', key: '托收承付凭证（邮）' },
                  { value: '4J', key: '托收承付凭证（电）' },
                  { value: '4K', key: '委托收款(委邮)' },
                  { value: '4L', key: '委托收款(委电)' },
                  { value: '4M', key: '外币划款凭证' },
                  { value: '5A', key: '外币汇款凭证 ' },
                  { value: '5B', key: '转账借方' },
                  { value: '5C', key: '转账贷方' },
                  { value: '5D', key: '支取凭条' },
                  { value: '5E', key: '外币普通支票' },
                  { value: '5F', key: '外币付款凭证' },
                  { value: '5G', key: '其他' },
                  { value: '5H', key: '对账折' },
                  { value: '5I', key: '对公存折' },
                  { value: '5J', key: '华东三省一市汇票' },
                  { value: '5K', key: '结算专用章' },
                  { value: '9X', key: '虚拟凭证' },
                  { value: '00', key: '印鉴卡(安码)' },
                  { value: '99', key: '印鉴卡(易码)' },
                  { value: 'HD', key: '自助回单' },
                  { value: 'TC', key: '信用卡' },
                  { value: 'ZK', key: '外汇业务支款凭证' },
                  { value: 'WT', key: '同城委托收款' }
                ],
                show: true,
                'key': 'payerVoucherType'
              },
              {
                'disabled': false,
                'label': '付款凭证批号',
                'type': 'input',
                'key': 'payVoucherBatchNum'
              },
              {
                'disabled': false,
                'label': '付款凭证序号',
                'type': 'input',
                'key': 'payVoucherSeq'
              },
              {
                'disabled': false,
                'label': '签发日期',
                'type': 'date',
                'key': 'signDate',
                pickerOptions: {
                  disabledDate: time => time.getTime() < new Date().getTime()
                }
              },
              {
                'disabled': false,
                'label': '支付密码',
                'type': 'input',
                'key': 'payPassword'
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '30%',
            title: '利率信息',
            group: [
              {
                'disabled': false,
                'label': '利率编号',
                'type': 'input',
                'inputEventName': 'changeUp',
                'key': 'rateNo'
              },
              {
                'disabled': true,
                'label': '利率浮动标志',
                'type': 'select',
                'options': [
                  { value: '不浮动', key: '0' },
                  { value: '按系统利率浮动', key: '1' },
                  { value: '手工浮动', key: '2' }
                ],
                'key': 'floatRateFlag'
              },
              {
                'disabled': false,
                'label': '利率定价编号',
                'type': 'input',
                'inputEventName': 'changeUp',
                'key': ''
              },
              {
                'disabled': false,
                'label': '利率浮动比例',
                'type': 'input',
                'key': 'floatRateRadio'
              },
              {
                'disabled': false,
                'label': '利率浮动点数',
                'type': 'input',
                'key': 'floatRateValue'
              },
              {
                'disabled': false,
                'label': '基准利率',
                'type': 'input',
                'key': 'baseRate'
              },
              {
                'disabled': false,
                'label': '实际利率',
                'type': 'input',
                'key': 'actualRate'
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '30%',
            title: '保证金开户',
            group: [
              {
                'disabled': false,
                'label': '账户类型',
                'type': 'select',
                'key': 'disposal',
                'options': [
                  { value: '虚户', key: '0' },
                  { value: '预约', key: '1' }
                ],
                changeEventName: ''
              },
              {
                'disabled': false,
                'label': '对账方式',
                'type': 'select',
                'options': [
                  { value: '网银', key: '0' },
                  { value: '柜面', key: '1' },
                  { value: '邮寄', key: '3' },
                  { value: '电子邮件', key: '4' },
                  { value: '现金管理', key: '5' },
                  { value: '不对账', key: '6' }
                ],
                'key': 'checkMode'
              },
              {
                'disabled': false,
                'label': '通讯地址',
                'type': 'text',
                'key': 'mailAddress'
              },
              {
                'disabled': false,
                'label': '联系人邮编',
                'type': 'input',
                'key': 'contactEmail'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  created () {
  },
  methods: {
    onSubmit (res) {
      let params = {
        payerAcNo: this.acList[res.payerAccount].acNo,
        payerCurrencyCode: res.currencyCode,
        payerAcName: res.payerAccName,
        asFlag: res.useLedger,
        asAcName: res.ledgerName,
        payerAcAddr: res.payerAddress,
        payeeAcNo: res.incomeAcc,
        payeeAcName: res.incomeAccName,
        payeeBankNo: res.payeeBankDeptId,
        rcvBankName: res.openBankNetwork,
        bankFlag: res.bankSigns,
        urgencyFlag: res.urgentFlag,
        areaFlag: res.bankFlag,
        amount: res.transAmt,
        bigNum: res.bigNum,
        payeeCurrencyCode: 'CNY',
        mobiles: res.incomePhoneNum,
        purpose: res.postScript,
        postscript: res.postScript,
        bookingFlag: res.disposal,
        bookingDate: res.appointmentDate,
        bookingtime: res.appointmentTime,
        virAcNo: res.virAcno,
        virAcName: res.virAcName
      }
      httpPost('eweb-cash.MultistageBookTransferConfirm.do', params).then(subRes => {

      }).catch(err => {
        console.error(err)
      })
    },
    onreset (res) {
      this.getAccountList()
      this.selectTrsType(res)
    }
  },
  components: {}
}
</script>
