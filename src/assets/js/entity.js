// 账户状态
const acc_status = [
  { label: '正常', value: 'A' },
  { label: '销户', value: 'C' },
  { label: '不动户', value: 'B' },
  { label: '不动户', value: 'D' },
  { label: '转营业外收入', value: 'I' },
  { label: '金额冻结', value: 'F' },
  { label: '封闭冻结', value: 'E' },
  { label: '待启用', value: 'H' },
  { label: '未启用', value: 'G' },
  { label: '预销户', value: 'Y' }
]
const acc_status_entity = getEntity(acc_status)

// 操作员状态
const user_state = [
  { label: '正常', value: 'N' },
  { label: '销户', value: 'C' },
  { label: '锁定', value: 'L' },
  { label: '待激活', value: 'U' },
  { label: '冻结', value: 'F' },
  { label: '停用', value: 'S' },
  { label: '手机银行首次登录', value: 'T' }
]

// 贷款账号状态
const loan_acc_status = [
  { label: '正常', value: '0' },
  { label: '销户', value: '1' },
  { label: '已核销', value: '2' },
  { label: '准销户', value: '3' },
  { label: '录入', value: '4' },
  { label: '已减免 ', value: '5' }
]
const loan_acc_status_entity = getEntity(loan_acc_status)

// 账号类型
const acc_type = [
  { label: '对公一般账户', value: '0' },
  { label: '卡', value: '1' },
  { label: '活期一本通', value: '2' },
  { label: '定期一本通', value: '3' },
  { label: '活期存折', value: '4' },
  { label: '存单', value: '5' },
  { label: '股金账户', value: '7' },
  { label: '贷款账户', value: '8' },
  { label: '内部账', value: '9' },
  { label: '组合账号', value: 'A' },
  { label: '一号通', value: 'B' },
  { label: '个人一本通存折', value: 'F' },
  { label: '国债', value: 'G' },
  { label: '电子储蓄国债', value: 'N' },
  { label: '待销账', value: 'X' },
  { label: '会计账号', value: 'K' },
  { label: '电子账号', value: 'D' },
  { label: '快捷账号', value: 'J' },
  { label: '基本存款账号', value: '0001' },
  { label: '一般存款账号', value: '0002' },
  { label: '临时存款账号', value: '0003' },
  { label: '专用存款账号', value: '0004' },
  { label: '经常项目外汇账号', value: '0008' },
  { label: '资本项目外汇账号', value: '0009' },
  { label: '其他项目外汇账号', value: '0010' },
  { label: 'NRA账号', value: '0006' },
  { label: '单位普通定期账号', value: '0101' },
  { label: '财政定期账号', value: '0102' },
  { label: '一般单位定期存款(自定义期限)', value: '0201' },
  { label: '机关团体事业单位定期存款(自定义期限)', value: '0202' },
  { label: '部队定期存款(自定义期限)', value: '0203' },
  { label: '代理财政预算外资金定期存款(自定义期限)', value: '0204' },
  { label: '一年以内国库定期存款', value: '0701' },
  { label: '一年以上国库定期存款', value: '0702' },
  { label: '单位通知存款', value: '0301' },
  { label: '机关团体事业单位通知存款', value: '0302' },
  { label: '部队通知存款', value: '0303' },
  { label: '财政通知存款', value: '0304' },
  { label: '承兑保证金(活期)', value: '0501' },
  { label: '担保保证金(活期)', value: '0502' },
  { label: '信用证保证金(活期)', value: '0503' },
  { label: '其他保证金(活期)', value: '0504' },
  { label: '保函保证金(活期)', value: '0506' },
  { label: '信用卡保证金', value: '0507' },
  { label: '债券结算代理业务保证金', value: '0508' },
  { label: '提货担保保证金', value: '0509' },
  { label: '对内保函保证金', value: '0510' },
  { label: '备用信用证保证金', value: '0511' },
  { label: '承兑保证金(定期)', value: '0601' },
  { label: '担保保证金(定期)', value: '0602' },
  { label: '信用证保证金(定期)', value: '0603' },
  { label: '其他保证金(定期)', value: '0604' },
  { label: '保函保证金(定期)', value: '0606' },
  { label: '信用卡保证金', value: '0607' },
  { label: '债券结算代理业务保证金', value: '0608' },
  { label: '提货担保保证金', value: '0609' },
  { label: '对内保函保证金', value: '0610' },
  { label: '备用信用证保证金', value: '0611' },
  { label: '默认值', value: 'XXX' },
  { label: '保险公司协议存款', value: '0401' },
  { label: '社保基金协议存款', value: '0402' },
  { label: '其他协议存款', value: '0404' },
  { label: '一年以内结构性存款(对公)', value: '1001' },
  { label: '一年以上结构性存款(对公)', value: '1002' },
  { label: '外币账号', value: '0007' },
  { label: '境内存款类金融机构存放(定期)', value: '0901' },
  { label: '境外存款类金融机构存放(定期)', value: '0902' },
  { label: '境内其他金融机构存放(定期)', value: '0903' },
  { label: '境外其他金融机构存放(定期)', value: '0904' },
  { label: '衍生品保证金(定期)', value: '0605' },
  { label: '一年以内社保定期存款', value: '0103' },
  { label: '一年以上社保定期存款', value: '0104' }
]
// const acc_type = [
//   { label: '对公一般账号', value: '0' },
//   { label: '卡', value: '1' },
//   { label: '活期一本通', value: '2' },
//   { label: '定期一本通', value: '3' },
//   { label: '活期存折', value: '4' },
//   { label: '存单', value: '5' },
//   { label: '股金账号', value: '7' },
//   { label: '贷款账号', value: '8' },
//   { label: '内部账', value: '9' },
//   { label: '组合账号', value: 'A' },
//   { label: '一号通', value: 'B' },
//   { label: '个人一本通存折', value: 'F' },
//   { label: '国债', value: 'G' },
//   { label: '电子储蓄国债', value: 'N' },
//   { label: '待销账', value: 'X' },
//   { label: '会计账号', value: 'K' },
//   { label: '电子账号', value: 'D' },
//   { label: '快捷账号', value: 'J' }
// ]
const acc_type_entity = getEntity(acc_type)

// 通知类型
const notify_type = [
  { label: '一天', value: '1D' },
  { label: '七天', value: '7D' }
]
const notify_type_entity = getEntity(notify_type)

// 定时交易状态
const trans_type = [
  { label: '待处理', value: '1H' },
  { label: '已撤销', value: '1B' },
  { label: '发送失败', value: 'S0' },
  { label: '发送成功', value: 'S1' },
  { label: '预约中', value: '0' },
  { label: '预约已提交', value: '1' },
  { label: '预约已撤销', value: '2' }
]
const trans_type_entity = getEntity(trans_type)

// 期限
const loan_term = [
  { label: '无', value: '0M' },
  { label: '一个月', value: '1M' },
  { label: '二个月', value: '2M' },
  { label: '三个月', value: '3M' },
  { label: '四个月', value: '4M' },
  { label: '五个月', value: '5M' },
  { label: '六个月', value: '6M' },
  { label: '七个月', value: '7M' },
  { label: '八个月', value: '8M' },
  { label: '九个月', value: '9M' },
  { label: '十个月', value: '10M' },
  { label: '十一个月', value: '11M' },
  { label: '一年', value: '12M' },
  { label: '十八个月', value: '18M' },
  { label: '二年', value: '24M' },
  { label: '三年', value: '36M' },
  { label: '五年', value: '60M' },
  { label: '六年', value: '72M' },
  { label: '八年', value: '96M' },
  { label: '十年', value: '120M' },
  { label: '二十年', value: '240M' },
  { label: '三十年', value: '360M' },
  { label: '自定义', value: '000M' }
]

// 钞汇标志
const chaohui_flag = [
  { label: '现汇', value: '1' },
  { label: '现钞', value: '0' },
  { label: '无', value: 'N' }
]
const chaohui_flag_entity = getEntity(chaohui_flag)

// 币种
const currencyMath_type = [
  { label: '人民币', value: '156' },
  { label: '英镑', value: '826' },
  { label: '香港元', value: '344' },
  { label: '美元', value: '840' },
  { label: '瑞士法郎', value: '756' },
  { label: '日元', value: '392' },
  { label: '加元', value: '124' },
  { label: '澳大利亚元', value: '036' },
  { label: '新加坡元', value: '702' },
  { label: '欧元', value: '978' },
  { label: '澳门元', value: '446' },
  { label: '新台币', value: '901' },
  { label: '津巴布韦元', value: '716' },
  { label: '所有币种', value: '999' },
  { label: '所有外币', value: '998' },
  { label: '安道尔比赛塔', value: '020' },
  { label: 'UAE迪拉姆', value: '784' },
  { label: '阿富汗尼', value: '004' },
  { label: '列克', value: '008' },
  { label: '亚美尼亚达姆', value: '051' },
  { label: '荷属安的列斯盾', value: '532' },
  { label: '宽扎', value: '973' },
  { label: '阿根廷比索', value: '032' },
  { label: '先令', value: '040' },
  { label: '阿鲁巴盾', value: '533' },
  { label: '阿塞拜疆马纳特', value: '031' },
  { label: '可自由兑换标记', value: '977' },
  { label: '巴巴多斯元', value: '052' },
  { label: '塔卡', value: '050' },
  { label: '比利时法郎', value: '056' },
  { label: '列弗', value: '100' },
  { label: '保加利亚列弗', value: '975' },
  { label: '巴林第纳尔', value: '048' },
  { label: '布隆迪法郎', value: '108' },
  { label: '百慕大元', value: '060' },
  { label: '文莱元', value: '096' },
  { label: '玻利瓦诺', value: '068' },
  { label: 'Mvdol', value: '984' },
  { label: '巴西瑞尔', value: '986' },
  { label: '巴哈马元', value: '044' },
  { label: '努尔特鲁姆', value: '064' },
  { label: '普拉', value: '072' },
  { label: '白俄罗斯卢布', value: '974' },
  { label: '伯利兹元', value: '084' },
  { label: '刚果法郎', value: '976' },
  { label: '发展单位', value: '990' },
  { label: '智利比索', value: '152' },
  { label: '哥伦比亚比索', value: '170' },
  { label: '哥斯达黎加科郎', value: '188' },
  { label: '古巴比索', value: '192' },
  { label: '佛得角埃斯库多', value: '132' },
  { label: '塞浦路斯镑', value: '196' },
  { label: '捷克克郎', value: '203' },
  { label: '德国马克', value: '276' },
  { label: '吉布提法郎', value: '262' },
  { label: '丹麦克郎', value: '208' },
  { label: '多米尼加比索', value: '214' },
  { label: '阿尔及利亚第纳尔', value: '012' },
  { label: '克罗姆', value: '233' },
  { label: '埃及镑', value: '818' },
  { label: '纳克法', value: '232' },
  { label: '西班牙比赛塔', value: '724' },
  { label: '埃塞俄比亚比尔', value: '230' },
  { label: '马克', value: '246' },
  { label: '斐济元', value: '242' },
  { label: '福克兰群岛镑', value: '238' },
  { label: '法国法郎', value: '250' },
  { label: '拉里', value: '981' },
  { label: '塞地', value: '288' },
  { label: '直布罗陀镑', value: '292' },
  { label: '达拉西', value: '270' },
  { label: '几内亚法郎', value: '324' },
  { label: '德拉克马', value: '300' },
  { label: '格查尔', value: '320' },
  { label: '几内亚比绍比索', value: '624' },
  { label: '圭亚那元', value: '328' },
  { label: '伦皮拉', value: '340' },
  { label: '克罗地亚库纳', value: '191' },
  { label: '古德', value: '332' },
  { label: '福林', value: '348' },
  { label: '卢比', value: '360' },
  { label: '爱尔兰镑', value: '372' },
  { label: '新谢客尔', value: '376' },
  { label: '印度卢比', value: '356' },
  { label: '伊拉克第纳尔', value: '368' },
  { label: '伊郎里亚尔', value: '364' },
  { label: '冰岛克郎', value: '352' },
  { label: '意大利里拉', value: '380' },
  { label: '牙买加元', value: '388' },
  { label: '约旦第纳尔', value: '400' },
  { label: '肯尼亚先令', value: '404' },
  { label: '索姆', value: '417' },
  { label: '瑞尔', value: '116' },
  { label: '科摩罗法郎', value: '174' },
  { label: '北朝鲜圆', value: '408' },
  { label: '韩元', value: '410' },
  { label: '科威特第纳尔', value: '414' },
  { label: '开曼群岛元', value: '136' },
  { label: '坚戈', value: '398' },
  { label: '基普', value: '418' },
  { label: '黎巴嫩镑', value: '422' },
  { label: '斯里兰卡卢比', value: '144' },
  { label: '利比里亚元', value: '430' },
  { label: '罗提', value: '426' },
  { label: '立陶宛', value: '440' },
  { label: '卢森堡法郎', value: '442' },
  { label: '拉脱维亚拉特', value: '428' },
  { label: '利比亚第纳尔', value: '434' },
  { label: '摩洛哥迪拉姆', value: '504' },
  { label: '摩尔瓦多列伊', value: '498' },
  { label: '马尔加什法郎', value: '450' },
  { label: '第纳尔', value: '807' },
  { label: '缅元', value: '104' },
  { label: '图格里克', value: '496' },
  { label: '乌吉亚', value: '478' },
  { label: '马尔他里拉', value: '470' },
  { label: '毛里求斯卢比', value: '480' },
  { label: '卢菲亚', value: '462' },
  { label: '克瓦查', value: '454' },
  { label: '墨西哥比索', value: '484' },
  { label: '黄金(克)', value: '490' },
  { label: '白银(克)', value: '491' },
  { label: '墨西哥发展单位', value: '979' },
  { label: '马来西亚林吉特', value: '458' },
  { label: '麦梯卡尔', value: '508' },
  { label: '纳米比亚元', value: '516' },
  { label: '奈拉', value: '566' },
  { label: '金科多巴', value: '558' },
  { label: '荷兰盾', value: '528' },
  { label: '挪威克郎', value: '578' },
  { label: '尼泊尔卢比', value: '524' },
  { label: '新西兰元', value: '554' },
  { label: '阿曼里亚尔', value: '512' },
  { label: '巴波亚', value: '590' },
  { label: '索尔', value: '604' },
  { label: '基那', value: '598' },
  { label: '菲律宾比索', value: '608' },
  { label: '巴基斯坦卢比', value: '586' },
  { label: '兹罗提', value: '985' },
  { label: '葡萄牙埃斯库多', value: '620' },
  { label: '瓜拉尼', value: '600' },
  { label: '卡塔尔里亚尔', value: '634' },
  { label: '列伊', value: '642' },
  { label: '俄罗斯卢布', value: '643' },
  { label: '卢旺达法郎', value: '646' },
  { label: '沙特里亚尔', value: '682' },
  { label: '所罗门群岛元', value: '090' },
  { label: '塞舌尔卢比', value: '690' },
  { label: '苏丹第纳尔', value: '736' },
  { label: '瑞典克郎', value: '752' },
  { label: '圣赫勒拿镑', value: '654' },
  { label: '托拉尔', value: '705' },
  { label: '斯洛伐克克郎', value: '703' },
  { label: '利昂', value: '694' },
  { label: '索马里先令', value: '706' },
  { label: '苏里南盾', value: '740' },
  { label: '多布拉', value: '678' },
  { label: '萨尔瓦多科郎', value: '222' },
  { label: '叙利亚镑', value: '760' },
  { label: '里兰吉尼', value: '748' },
  { label: '铢', value: '764' },
  { label: '索莫尼', value: '972' },
  { label: '马纳特', value: '795' },
  { label: '突尼斯第纳尔', value: '788' },
  { label: '邦加', value: '776' },
  { label: '东帝汶埃斯库多', value: '626' },
  { label: '土耳其里拉', value: '792' },
  { label: '特立尼达和多巴哥元', value: '780' },
  { label: '坦桑尼亚先令', value: '834' },
  { label: '格里夫纳', value: '980' },
  { label: '乌干达先令', value: '800' },
  { label: '次日', value: '997' },
  { label: '同日', value: '998' },
  { label: '乌拉圭比索', value: '858' },
  { label: '乌兹别克斯坦苏姆', value: '860' },
  { label: '盾', value: '704' },
  { label: '瓦图', value: '548' },
  { label: '塔拉', value: '882' },
  { label: 'CFA法郎BEAC', value: '950' },
  { label: '银', value: '961' },
  { label: '黄金', value: '959' },
  { label: '欧洲货币合成单位', value: '955' },
  { label: '欧洲货币单位(E.M.U.-6)', value: '956' },
  { label: '欧洲账号9单位(E.U.A.-9)', value: '957' },
  { label: '欧洲账号17单位(E.U.A.-17)', value: '958' },
  { label: '东加勒比元', value: '951' },
  { label: '特别提款权', value: '960' },
  { label: '黄金法郎', value: 'Ni1' },
  { label: 'UIC法郎', value: 'Ni2' },
  { label: 'CFA法郎BCEAO', value: '952' },
  { label: '钯', value: '964' },
  { label: 'CFP法郎', value: '953' },
  { label: '铂白金', value: '962' },
  { label: '为测试特别保留的代码', value: '963' },
  { label: '也门里亚尔', value: '886' },
  { label: '南斯拉夫第纳尔', value: '891' },
  { label: '兰特', value: '710' },
  { label: '克瓦查', value: '894' }
]
const currencyMath_type_entity = getEntity(currencyMath_type)

// 币种字典
const currency_type = [
  { label: '澳大利亚元', value: 'AUD' },
  { label: '加拿大元', value: 'CAD' },
  { label: '瑞士法郎', value: 'CHF' },
  { label: '人民币', value: 'CNY' },
  { label: '欧元', value: 'EUR' },
  { label: '英镑', value: 'GBP' },
  { label: '港币', value: 'HKD' },
  { label: '日元', value: 'JPY' },
  { label: '新西兰元', value: 'NZD' },
  { label: '瑞典克郎', value: 'SEK' },
  { label: '新加坡元', value: 'SGD' },
  { label: '美元', value: 'USD' },
  { label: '德国马克', value: 'DEM' },
  { label: '法国法郎', value: 'FRF' },
  { label: '荷兰盾', value: 'NLG' },
  { label: '挪威克朗', value: 'NOK' },
  { label: '丹麦法朗', value: 'DKK' },
  { label: '奥地利先令', value: 'ATS' },
  { label: '比利时法朗', value: 'BEF' },
  { label: '意大利里拉', value: 'ITL' },
  { label: '马来西亚林吉特', value: 'MYR' },
  { label: '芬兰马克', value: 'FIM' },
  { label: '澳门元', value: 'MOP' },
  { label: '人民币', value: 'RMB' }
]
const currency_type_entity = getEntity(currency_type)
// 多级账簿专用人民币代码
const currency_type1 = [
  { label: '人民币', value: '01' }]
const currency_type_entity1 = getEntity(currency_type1)
// 证件类型
const id_type = [
  { value: 'P01', label: '第一代居民身份证' },
  { value: 'P02', label: '第二代居民身份证' },
  { value: 'P03', label: '临时居民身份证' },
  { value: 'P04', label: '(中国)护照' },
  { value: 'P05', label: '户口簿' },
  { value: 'P06', label: '民办非企业登记证书' },
  { value: 'P07', label: '学生证' },
  { value: 'P08', label: '军官证' },
  { value: 'P09', label: '武警文职干部证' },
  { value: 'P10', label: '武警士兵证' },
  { value: 'P11', label: '解放军文职干部证' },
  { value: 'P12', label: '港澳台居民居住证' },
  { value: 'P13', label: '警官证' },
  { value: 'P14', label: '解放军士兵证' },
  { value: 'P15', label: '港澳居民来往内地通行证' },
  { value: 'P16', label: '港澳同胞回乡证' },
  { value: 'P17', label: '(台)通行证/有效旅行证' },
  { value: 'P18', label: '外国人永久居留证' },
  { value: 'P19', label: '边民出入境通行证' },
  { value: 'P20', label: '(外国)护照' },
  { value: 'P21', label: '其他批文或证明' },
  { value: 'P22', label: '港、澳、台居民有效身份证' },
  { value: 'P23', label: '社会保障号' },
  { value: 'P24', label: '离休干部荣誉证' },
  { value: 'P25', label: '军官退休证' },
  { value: 'P26', label: '文职干部退休证' },
  { value: 'P27', label: '武警证' },
  { value: 'P28', label: '村民委员证明' },
  { value: 'P29', label: '军事学员学员证' },
  { value: 'P30', label: '工作证' },
  { value: 'P31', label: '执法证' },
  { value: 'P32', label: '士兵证' },
  { value: 'P98', label: '对私其他证件2' },
  { value: 'P99', label: '对私其他证件' },
  { value: 'E25', label: '全国组织机构代码证' },
  { value: 'E26', label: '贷款卡号' },
  { value: 'E27', label: '营业执照' },
  { value: 'E28', label: '政府批文' },
  { value: 'E29', label: '金融许可证' },
  { value: 'E30', label: '境外企业证书' },
  { value: 'E32', label: '预先核准通知书' },
  { value: 'E33', label: '税务登记证（国税）' },
  { value: 'E34', label: '税务登记证（地税）' },
  { value: 'E35', label: '机构信用代码证' },
  { value: 'E36', label: '事业单位法人证书' },
  { value: 'E41', label: '社会团体法人登记证书' },
  { value: 'E42', label: '工会法人资格证书' },
  { value: 'E43', label: '统一社会信用代码（三证合一）' },
  { value: 'E44', label: '商事与非商事登记证号' },
  { value: 'E45', label: '基本账号开户许可证核准号' },
  { value: 'E46', label: '登记证书' },
  { value: 'E47', label: '开户证明' },
  { value: 'E48', label: '企业名称预先核准通知书或批文' },
  { value: 'E49', label: '特殊机构代码' },
  { value: 'E50', label: '政府部门文件' },
  { value: 'E99', label: '其他' }
]
const id_type_entity = getEntity(id_type)

/**
 * @name 证书状态
 * @type {({label: string, value: string}|{label: string, value: string}|{label: string, value: string}|{label: string, value: string}|{label: string, value: string})[]}
 */
const cert_state = [
  { value: 'U', label: '未下载' },
  { value: 'Z', label: '申请未下载' },
  { value: 'X', label: '恢复未下载' },
  { value: 'M', label: '更新未下载' },
  { value: 'A', label: '激活' },
  { value: 'F', label: '冻结' },
  { value: 'C', label: '已注销' },
  { value: 'N', label: '正常' },
  { value: 'G', label: '过期' },
  { value: 'W', label: '超期未下载' },
  { value: 'I', label: '下载成功未安装' },
  { value: 'B', label: '绑定' }
]

// 限制类型
const limit_type = [
  { label: '冻结金额', value: '1' },
  { label: '只收不付', value: '2' },
  { label: '不收不付', value: '3' },
  { label: '只付不收', value: '4' }
]
const limit_type_entity = getEntity(limit_type)

// 办理渠道
const handleChannel = [
  { label: '网银', value: '202' },
  { label: '网银', value: '229' },
  { label: '网银', value: '239' },
  { label: '柜台', value: '205' }
]
const handleChannel_entity = getEntity(handleChannel)

// 付息方式
const payerRate = [
  { label: '定期付息', value: '0' },
  { label: '利随本清', value: '1' },
  { label: '一次还本付息', value: '2' },
  { label: '按季付息', value: '1QA21E' },
  { label: '按年付息', value: '1YA1221' },
  { label: '满季付息', value: '3M' },
  { label: '满半年付息', value: '6M' },
  { label: '满年付息', value: '1Y' },
  { label: '按月付息', value: '1MA21' },
  { label: '满月付息', value: '1M' },
  { label: '按半年付息', value: '6MA21' }
]
const payerRate_entity = getEntity(payerRate)

// 存期 大额受让协议，产品期限
const saveDate = [
  { label: '活期', value: '0D' },
  { label: '一天', value: '1D' },
  { label: '七天', value: '7D' },
  { label: '一个月', value: '1M' },
  { label: '三个月', value: '3M' },
  { label: '六个月', value: '6M' },
  { label: '一年', value: '1Y' },
  { label: '两年', value: '2Y' },
  { label: '三年', value: '3Y' },
  { label: '五年', value: '5Y' },
  { label: '默认值', value: 'XXX' }
]
const saveDate_entity = getEntity(saveDate)

const usualDate = [
  { label: '三个月', value: '3M' },
  { label: '六个月', value: '6M' },
  { label: '一年', value: '1Y' },
  { label: '两年', value: '2Y' },
  { label: '三年', value: '3Y' },
  { label: '五年', value: '5Y' }
]
const usualDate_entity = getEntity(usualDate)

// 此顺序不可变，影响页面默认参数展示
const interest_type = [
  { label: '按月付息', value: '07' },
  { label: '按季付息', value: '01' },
  // { label: '按半年付息', value: '09' },
  { label: '按年付息', value: '02' },
  { label: '满月付息', value: '08' },
  { label: '满季付息', value: '03' },
  { label: '满半年付息', value: '04' },
  { label: '满年付息', value: '05' },
  { label: '利随本清', value: '06' }
]

// 单位大额存单受让协议
const interestFrequency_Type = [
  { label: '按季付息', value: '01' },
  { label: '按年付息', value: '02' },
  { label: '满季付息', value: '03' },
  { label: '满半年付息', value: '04' },
  { label: '满年付息', value: '05' },
  { label: '利随本清', value: '06' },
  { label: '按月付息', value: '07' },
  { label: '满月付息', value: '08' },
  { label: '按半年付息', value: '09' },
  { label: '利随本清', value: '' }
]
const interestFrequency_entity = getEntity(interestFrequency_Type)
// 定期通支取付息方式/ 大额受让协议，付息周期
const draw_interest_type = [
  { label: '定期付息', value: '0' },
  { label: '利随本清', value: '1' },
  { label: '一次还本付息', value: '2' }
]
// 定期通支取付息频率
const draw_interest_freqcy = [
  { label: '按月付息', value: '1MA21' },
  { label: '按季付息', value: '1QA21E' },
  { label: '按半年付息', value: '6MA21' },
  { label: '按年付息', value: '1YA1221' },
  { label: '满月付息', value: '1M' },
  { label: '满季付息', value: '3M' },
  { label: '满半年付息', value: '6M' },
  { label: '满年付息', value: '1Y' },
  { label: '利随本清', value: '' }
]

// 自动转存标志
const deposit_flag = [
  { label: '不转存', value: '0' },
  { label: '本金转存', value: '1' },
  { label: '本息转存', value: '2' },
  { label: '部分金额转存', value: '3' },
  { label: '转入其他账号', value: '4' }
]
const deposit_flag_entity = getEntity(deposit_flag)
// 自动转存标示
const extendFlg_Type = [
  { label: '不自动转存', value: '0' },
  { label: '本金自动转存', value: '1' },
  { label: '本息自动转存', value: '2' }
]
// 支取标志
const drawType = [
  { label: '不可提前支取', value: '0' },
  { label: '可提前支取', value: '1' }
]
const drawType_entity = getEntity(drawType)

// 处理状态
const process_status = [
  { value: '0', label: '处理成功' },
  { value: '1', label: '正在处理' },
  { value: '2', label: '处理失败' }
]
const process_status_entity = getEntity(process_status)

/**
 * @name 交易状态
 * @type {({label: string, value: string}|{label: string, value: string}|{label: string, value: string}|{label: string, value: string})[]}
 */
const trade_busistep = [
  { value: '1H', label: '待处理' },
  { value: '1B', label: '已撤销' },
  { value: 'S0', label: '发送失败' },
  { value: 'S1', label: '发送成功' }
]

/**
 * @name 到账方式
 * @type {({label: string, value: string}|{label: string, value: string}|{label: string, value: string}|{label: string, value: string}|{label: string, value: string})[]}
 */
const remit_model = [
  { value: '0', label: '实时到账' },
  { value: '1', label: '普通到账' },
  { value: '2', label: '次日到账' },
  { value: '3', label: '预约转账' }
]
const remit_model_entity = getEntity(remit_model)

// 业务类型

const business_type = [
  { value: 'FE080101', label: '工资文件上传' },
  { value: 'FE080201', label: '网上录入' },
  { value: 'FE080301', label: '发放结果查询' },
  { value: 'FE080103', label: '代发工资文件上传' },
  { value: 'FE080207', label: '代发工资网上录入' },
  { value: 'FE480403', label: '财务报销' },
  { value: 'FE080410', label: '新代发工资文件上传' }
]
const business_type_entity = getEntity(business_type)

// 支取方式
const draw_type = [
  { value: '0', label: '全部支取' },
  { value: '1', label: '部分支取' }
]
const draw_type_entity = getEntity(draw_type)

// 交易状态-代扣业务
const Transaction_status = [
  { value: '0', label: '成功' },
  { value: '1', label: '失败' },
  { value: '2', label: '正在处理' },
  { value: '3', label: '处理完成，结果文件不可取' },
  { value: '4', label: '处理完成，结果文件可取' },
  { value: '5', label: '等待提交' },
  { value: '6', label: '正在查证' },
  { value: '8', label: '结果未知' }
]
const Transaction_status_entity = getEntity(Transaction_status)
// 贷款形态
const eloan_shape = [
  { label: '正常', value: '0' },
  { label: '逾期', value: '1' },
  { label: '呆滞', value: '2' },
  { label: '呆账', value: '3' },
  { label: '核销', value: '4' },
  { label: '结清', value: '5' },
  { label: '不还', value: '6' },
  { label: '减免', value: '7' }
]

// 业务类型
const busi_type = [
  { value: 'E101', label: '定期代付(批量代付)' },
  { value: 'C211', label: '薪金报酬' },
  { value: 'A101', label: '公益性资金汇划' }
]
// 结构性存款，付息方式
const payType = [
  { value: '0', label: '按季付息' },
  { value: '1', label: '按年付息' },
  { value: '2', label: '满季付息' },
  { value: '3', label: '满半年付息' },
  { value: '4', label: '满年付息' },
  { value: '5', label: '利随本清' },
  { value: '6', label: '按月付息' },
  { value: '7', label: '满月付息' }
]
const payType_entity = getEntity(payType)

// 授权关系查询 授权权限
const authType = [
  { value: 'Q', label: '查询' },
  { value: 'FT', label: '任意转出' }
]
const authType_entity = getEntity(authType)

const rightFlag = [
  { value: '0', label: '现金管理查询与转账权限' },
  { value: '1', label: '现金管理查询权限' },
  { value: '2', label: '现金管理转账权限' }
]
const rightFlag_entity = getEntity(authType)
// 详情确认页
// const resultType = [
//   { value: 'rpcPaymentTransferService', label: 'SingleTransfer' },
//   { value: '1', label: '活期转定期' }
// ]
// const resultType_entity = getEntity(resultType)

// 冻结种类
const frozenType = [
  { value: '11', label: '金额冻结' },
  { value: '12', label: '只收不付' },
  { value: '13', label: '封闭冻结' },
  { value: '21', label: '验资止付' },
  { value: '22', label: '保证控制' },
  { value: '23', label: '只付不收控制' },
  { value: '24', label: '差错临控' },
  { value: '25', label: '止付控制' },
  { value: '26', label: '其他金额控制' },
  { value: '27', label: '封闭控制' },
  { value: '28', label: '理财申购控制' },
  { value: '29', label: '电子国债申购控制' },
  { value: '30', label: '证明控制' },
  { value: '31', label: '预授权' },
  { value: '32', label: '金额控制(不可超额)' },
  { value: '33', label: '启用控制' },
  { value: '34', label: '只收不付控制' },
  { value: '35', label: '质押控制(金额控制)' },
  { value: '36', label: '放贷控制' },
  { value: '37', label: '受托控制' },
  { value: '38', label: '贴现控制' },
  { value: '39', label: '额度控制' },
  { value: '41', label: '认购控制' },
  { value: '42', label: '廉政账号控制' },
  { value: '43', label: '金额控制(可超额)' },
  { value: '44', label: '身份未核查控制' },
  { value: '45', label: '电信诈骗紧急止付' },
  { value: '46', label: '资金监管控制' },
  { value: '47', label: '资金圈存控制' },
  { value: '48', label: '支付系统专用资金圈存' },
  { value: '49', label: '挂失控制(只收不付)' },
  { value: '50', label: '挂失控制(不收不付)' },
  { value: '51', label: '睡眠户封闭控制' },
  { value: '52', label: '其他只收不付控制' },
  { value: '53', label: '其他不收不付控制' },
  { value: '54', label: '账号生效日控制' },
  { value: '55', label: '质押控制(只收不付)' },
  { value: '56', label: '质押控制(不收不付)' }
]
const frozenType_entity = getEntity(frozenType)

// 交易状态
const process_state = [
  { value: 'WCK', label: '待审核' },
  { value: 'WAP', label: '待银行审核' },
  { value: 'FL', label: '交易失败' },
  { value: 'OK', label: '交易成功' },
  { value: 'UC', label: '交易状态未明' },
  { value: 'RJ', label: '交易拒绝' },
  { value: 'DL', label: '交易失效' },
  { value: 'POK', label: '交易部分成功' },
  { value: 'RJ', label: '拒绝' },
  { value: 'CC', label: '交易取消' },
  { value: 'CL', label: '交易撤销' },
  { value: 'RC', label: '交易退回' },
  { value: 'BH', label: '业务已受理' },
  { value: 'HRJ', label: '银行复核拒绝' },
  { value: 'MD', label: '交易正在处理' },
  { value: 'NW', label: '交易成功' },
  { value: 'TMR', label: '预约成功' },
  { value: 'CK', label: '待审核' }
]

// 计息方式
const jixiType = [
  { value: '0D', label: '活期' },
  { value: '3M', label: '三个月' },
  { value: '6M', label: '6个月' },
  { value: '1Y', label: '一年' },
  { value: '2Y', label: '两年' },
  { value: '3Y', label: '三年' },
  { value: 'XXX', label: '默认值' },
  { value: '1M', label: '一个月' },
  { value: '9M', label: '九个月' },
  { value: '18M', label: '十八个月' }
]
const jixiType_entity = getEntity(jixiType)
const busi_kind = [
  { value: '00100', label: '电费' },
  { value: '00101', label: '家用电费' },
  { value: '00102', label: '生产用电费' },
  { value: '00200', label: '水暖费' },
  { value: '00201', label: '用水费' },
  { value: '00202', label: '排水费' },
  { value: '00203', label: '直饮水费' },
  { value: '00204', label: '污水处理费' },
  { value: '00205', label: '暖气费' },
  { value: '00300', label: '煤气费' },
  { value: '00301', label: '管道煤气费' },
  { value: '00400', label: '电话费' },
  { value: '00401', label: '市内电话费' },
  { value: '00402', label: '长途电话费' },
  { value: '00403', label: '移动电话费' },
  { value: '00404', label: '电话初装费' },
  { value: '00405', label: 'IP电话费' },
  { value: '00500', label: '通讯费' },
  { value: '00501', label: '数据通讯费' },
  { value: '00502', label: '线路月租费' },
  { value: '00503', label: '代维费' },
  { value: '00504', label: '网络使用费' },
  { value: '00505', label: '信息服务费' },
  { value: '00506', label: '移动电子商务费' },
  { value: '00507', label: '网关业务费' },
  { value: '00508', label: '手机话费' },
  { value: '00600', label: '保险费' },
  { value: '00601', label: '续期寿险费' },
  { value: '00602', label: '社会保险费' },
  { value: '00603', label: '养老保险费' },
  { value: '00604', label: '医疗保险费' },
  { value: '00605', label: '车辆保险费' },
  { value: '00700', label: '房屋管理费' },
  { value: '00701', label: '房屋租赁费' },
  { value: '00702', label: '租赁服务费' },
  { value: '00703', label: '物业管理费' },
  { value: '00704', label: '清洁费' },
  { value: '00705', label: '保安服务费' },
  { value: '00706', label: '电梯维护保养费' },
  { value: '00707', label: '绿化费' },
  { value: '00708', label: '停车费' },
  { value: '00800', label: '代理服务费' },
  { value: '00801', label: '押运服务费' },
  { value: '00802', label: '票据传递费' },
  { value: '00803', label: '代理记账服务费' },
  { value: '00900', label: '学教费' },
  { value: '00901', label: '报考费' },
  { value: '00902', label: '学杂费' },
  { value: '00903', label: '保教费' },
  { value: '01000', label: '有线电视费' },
  { value: '01001', label: '有线电视租赁费' },
  { value: '01002', label: '移动电视费' },
  { value: '01100', label: '企业管理费用' },
  { value: '01101', label: '工商行政管理费' },
  { value: '01102', label: '商检费' },
  { value: '01201', label: '土地使用费' },
  { value: '04900', label: '其他费用' },
  { value: '04902', label: '加油卡费' },
  { value: '04903', label: '消费贷款' },
  { value: '09900', label: '其他代付费用' },
  { value: '05100', label: '薪金报酬' },
  { value: '05103', label: '养老金' },
  { value: '05104', label: '工资' },
  { value: '05105', label: '奖金' },
  { value: '05106', label: '企业年金' },
  { value: '09001', label: '其它费用' },
  { value: '01300', label: '慈善捐款' },
  { value: '09901', label: '付福利彩票奖金' }
]

// 小额定期借记业务-业务类型
const borrow_busi_type = [
  { value: 'E102', label: '普通定期借记' },
  { value: 'F100', label: '定期代收' }
]
// 小额定期借记业务-业务种类
const borrow_busi_kind = [
  { value: '00100', label: '电费' },
  { value: '00101', label: '家用电费' },
  { value: '00102', label: '生产用电费' },
  { value: '00200', label: '水暖费' },
  { value: '00201', label: '用水费' },
  { value: '00202', label: '排水费' },
  { value: '00203', label: '直饮水费' },
  { value: '00204', label: '污水处理费' },
  { value: '00205', label: '暖气费' },
  { value: '00300', label: '煤气费' },
  { value: '00301', label: '管道煤气费' },
  { value: '00400', label: '电话费' },
  { value: '00401', label: '市内电话费' },
  { value: '00402', label: '长途电话费' },
  { value: '00403', label: '移动电话费' },
  { value: '00404', label: '电话初装费' },
  { value: '00405', label: 'IP电话费' },
  { value: '00500', label: '通讯费' },
  { value: '00501', label: '数据通讯费' },
  { value: '00502', label: '线路月租费' },
  { value: '00503', label: '代维费' },
  { value: '00504', label: '网络使用费' },
  { value: '00505', label: '信息服务费' },
  { value: '00506', label: '移动电子商务费' },
  { value: '00507', label: '网关业务费' },
  { value: '00508', label: '手机话费' },
  { value: '00600', label: '保险费' },
  { value: '00601', label: '续期寿险费' },
  { value: '00602', label: '社会保险费' },
  { value: '00603', label: '养老保险费' },
  { value: '00604', label: '医疗保险费' },
  { value: '00605', label: '车辆保险费' },
  { value: '00700', label: '房屋管理费' },
  { value: '00701', label: '房屋租赁费' },
  { value: '00702', label: '租赁服务费' },
  { value: '00703', label: '物业管理费' },
  { value: '00704', label: '清洁费' },
  { value: '00705', label: '保安服务费' },
  { value: '00706', label: '电梯维护保养费' },
  { value: '00707', label: '绿化费' },
  { value: '00708', label: '停车费' },
  { value: '00800', label: '代理服务费' },
  { value: '00801', label: '押运服务费' },
  { value: '00802', label: '票据传递费' },
  { value: '00803', label: '代理记账服务费' },
  { value: '00900', label: '学教费' },
  { value: '00901', label: '报考费' },
  { value: '00902', label: '学杂费' },
  { value: '00903', label: '保教费' },
  { value: '01000', label: '有线电视费' },
  { value: '01001', label: '有线电视租赁费' },
  { value: '01002', label: '移动电视费' },
  { value: '01100', label: '企业管理费用' },
  { value: '01101', label: '工商行政管理费' },
  { value: '01102', label: '商检费' },
  { value: '01201', label: '土地使用费' },
  { value: '04900', label: '其他费用' },
  { value: '04902', label: '加油卡费' },
  { value: '04903', label: '消费贷款' },
  { value: '05100', label: '薪金报酬' },
  { value: '05103', label: '养老金' },
  { value: '05104', label: '工资' },
  { value: '05105', label: '奖金' },
  { value: '05106', label: '企业年金' },
  { value: '09900', label: '其他代付费用' },
  { value: '09901', label: '付福利彩票奖金' },
  { value: '01600', label: '公积金' }
]

// 操作状态
const operator_state = [
  { value: 'C', label: '成功' },
  { value: 'F', label: '失败' },
  { value: 'I', label: '待审核' },
  { value: 'U', label: '不确定状态' },
  { value: 'D', label: '待处理' }
]

// 业务类型
const prd_id = [
  { value: 'log.in', label: '登录' },
  { value: 'log.out', label: '签退' },
  { value: 'ent.MCAcceptApplication', label: '提示承兑' },
  { value: 'ent.DebitCardBulkWithholding', label: '借记卡批量代扣' },
  { value: 'ent.MCVitualMoneyInfoQry', label: '虚拟资金池关系查询' },
  { value: 'ent.MCVitualMoneyBalQry', label: '虚拟资金池余额查询' },
  { value: 'per.MCBankInnerTransfer', label: '个人行内转账' },
  { value: 'ent.MCMyFinancialQuery', label: '我的理财查询' },
  { value: 'ent.MCOpenRegularAcNo', label: '定期通开户' },
  { value: 'ent.MCOperatorInfoAdmin', label: '操作员信息管理' },
  { value: 'ent.MCOperatorInfoQry', label: '操作员信息查询' },
  { value: 'ent.MCOperatorPasswordResert', label: '操作员密码重置' },
  { value: 'ent.MCPayeeBookManage', label: '常用往来账号管理' },
  { value: 'ent.MCPaymentPayInfo', label: '非税缴费' },
  { value: 'ent.MCPeriodicQuery', label: '定期账号查询' },
  { value: 'ent.MCPeriodicWithdrawal', label: '定期支取' },
  { value: 'ent.MCQryEcorgInfo', label: '企业详情查询' },
  { value: 'ent.MCQueryIntBankJnl', label: '网银日志查询' },
  { value: 'ent.MCRegularDrawDetailQry', label: '定期通支取列表详情查询' },
  { value: 'ent.MCRegularDrawQry', label: '定期通支取查询' },
  { value: 'ent.MCRoleAdd', label: '角色添加' },
  { value: 'ent.MCRoleDelete', label: '角色删除' },
  { value: 'ent.MCRoleInit', label: '角色初始化' },
  { value: 'ent.MCRoleListQuery', label: '角色列表查询' },
  { value: 'ent.MCRoleMaintenance', label: '角色维护' },
  { value: 'ent.MCRoleUpdate', label: '角色修改' },
  { value: 'ent.MCSHShip', label: '上海航运' },
  { value: 'ent.MCSavAccountDetailQry', label: '定期账号详情查询' },
  { value: 'ent.MCSavAccountQry', label: '定期账号查询' },
  { value: 'ent.MCSavProductAcctDetailQry', label: '定期通详情查询' },
  { value: 'ent.MCSavProductAcctQry', label: '定期通查询' },
  { value: 'ent.MCSpeedMenuAdd', label: '快捷菜单新增' },
  { value: 'ent.MCStructureDepositDetailQry', label: '结构性存款详情查询' },
  { value: 'ent.MCStructureDepositQry', label: '结构性存款查询' },
  { value: 'ent.MCStructuredDepositClose', label: '结构性存款账号销户' },
  { value: 'ent.MCStructuredDepositOpen', label: '结构性存款账号开户' },
  { value: 'ent.MCStructuredDepositQuery', label: '结构性存款账号查询' },
  { value: 'ent.MCSubAccountDetailQry', label: '子账号详情查询' },
  { value: 'ent.MCSubAccountQry', label: '子账号查询' },
  { value: 'ent.MCSuperBankNet', label: '超级网银' },
  { value: 'ent.MCTelephoneBankApplication', label: '电话银行开通' },
  { value: 'ent.MCTimAccountQry', label: '活期账号查询' },
  { value: 'ent.MCTimeTransferTrs', label: '定时交易处理' },
  { value: 'ent.MCTransfer', label: '单笔转账' },
  { value: 'ent.MCTransferRemarkManage', label: '转账附言管理' },
  { value: 'ent.MCTransferResultQry', label: '网银转账结果查询' },
  { value: 'ent.MCUpdateAutDedFeeSign', label: '自动扣费签约维护' },
  { value: 'ent.MCWaitAuthQuery', label: '待审核记录列表查询' },
  { value: 'ent.MCWaitAuthedQuery', label: '审核记录列表查询' },
  { value: 'ent.ManagerTypeCheck', label: '管理类审核' },
  { value: 'ent.MessageService', label: '留言服务' },
  { value: 'ent.MessageServiceAdd', label: '留言新增' },
  { value: 'ent.MultistageBookActListQry', label: '多级账簿账号列表查询' },
  { value: 'ent.MultistageBookBalQry', label: '多级账簿余额查询' },
  { value: 'ent.MultistageBookBalSet', label: '多级账簿余额调整' },
  { value: 'ent.MultistageBookDetailAdjust', label: '多级账簿明细调账' },
  { value: 'ent.MultistageBookDetailAdjustAccQry', label: '多级账簿明细调账查询' },
  { value: 'ent.MultistageBookDetailQry', label: '多级账簿明细查询' },
  { value: 'ent.MultistageBookInfoQry', label: '多级账簿查询' },
  { value: 'ent.MultistageBookRightQry', label: '多级账簿权限查询' },
  { value: 'ent.MultistageBookRightSet', label: '多级账簿权限设置' },
  { value: 'ent.MultistageBookTransfer', label: '多级账簿转账' },
  { value: 'ent.MultistageBookTrsDetailQry', label: '多级账簿成员单位交易明细查询' },
  { value: 'ent.MultistageBookUnitBalQry', label: '多级账簿成员单位余额分布' },
  { value: 'ent.NoManagerTypeCheck', label: '交易管理审核' },
  { value: 'ent.OperatorInfoModify', label: '操作员信息修改' },
  { value: 'ent.OperatorPswModify', label: '操作员密码修改' },
  { value: 'ent.PaySalary', label: '代发工资' },
  { value: 'ent.PaySalaryTemplateManage', label: '模板设置' },
  { value: 'ent.RecorderQuery', label: '审核记录查询' },
  { value: 'ent.SmallLimitBorrow', label: '小额定期借记业务' },
  { value: 'ent.SmallLimitLead', label: '小额定期贷记业务' },
  { value: 'ent.TimingCollectQry', label: '定时归集查询' },
  { value: 'ent.TimingCollectSet', label: '定时归集设置' },
  { value: 'ent.UserInfoHold', label: '个人信息维护' },
  { value: 'ent.WaitRecorderQuery', label: '待审核记录查询' },
  { value: 'ent.MCBillQry', label: '票据查询交易' },
  { value: 'ent.MCIssueRegister', label: '出票登记' },
  { value: 'ent.MCRegularQryDown', label: '定期通查询明细查询下载' },
  { value: 'ent.AcNoInfoQry', label: '现管账号信息查询' },
  { value: 'ent.AccAuthRelationQry', label: '授权关系查询' },
  { value: 'ent.AcctBalanceMalQry', label: '账号余额分布统计' },
  { value: 'ent.AcctBalanceTrendQry', label: '账号余额趋势分析' },
  { value: 'ent.AcctCollectionDetailQry', label: '账号归集明细分析' },
  { value: 'ent.AcctInnerInterestQry', label: '账号内部利息汇总分许' },
  { value: 'ent.AcctTrsDetailQry', label: '账号交易明细分析' },
  { value: 'ent.ApproveProcessProductQuery', label: '审批流程产品查询' },
  { value: 'ent.ApproveProcessSet', label: '审批流程设置' },
  { value: 'ent.ApproveProcessSetQuery', label: '审批流程查询' },
  { value: 'ent.CapitalCollect', label: '现金管理-资金归集' },
  { value: 'ent.CashCollectionBalQry', label: '资金归集余额分析' },
  { value: 'ent.CashInoutCollectQry', label: '资金收支汇总分析' },
  { value: 'ent.CheckPassOrRej', label: '审核设置' },
  { value: 'ent.CollectAcNoQry', label: '归集上下级账号查询' },
  { value: 'ent.CollectAccBalQry', label: '归集账号余额查询' },
  { value: 'ent.CollectAccDetailQry', label: '归集账号明细查询' },
  { value: 'ent.CollectCashPooling', label: '归集资金划拨' },
  { value: 'ent.CollectDateQry', label: '归集周期查询' },
  { value: 'ent.CollectDateSet', label: '归集周期设置' },
  { value: 'ent.CollectRelationQry', label: '归集关系查询' },
  { value: 'ent.CreditCard', label: '信用卡' },
  { value: 'ent.CreditCardManage', label: '信用卡管理' },
  { value: 'ent.Ecommon', label: '企业网银公共交易' },
  { value: 'ent.FinanceReimburse', label: '财务报销' },
  { value: 'ent.GroupRelationQry', label: '集团关系查询' },
  { value: 'ent.MCAEDefiniteLifeBuy', label: '定活通购买' },
  { value: 'ent.MCAEInvestAccountListQry', label: '理财客户账号签约列表查询' },
  { value: 'ent.MCAEInvestCifQry', label: '理财客户签约详情查询' },
  { value: 'ent.MCAEInvestProductBuy', label: '理财认购' },
  { value: 'ent.MCAEInvestProductCancle', label: '理财撤单' },
  { value: 'ent.MCAEInvestProductListQry', label: '理财产品列表查询' },
  { value: 'ent.MCAEInvestProductRedeem', label: '理财赎回' },
  { value: 'ent.MCAHomeSpeedMenuAdd', label: '常用功能查询' },
  { value: 'ent.MCAHomeSpeedMenuQry', label: '常用功能新增' },
  { value: 'ent.MCAHomeTransferListQry', label: '转账记录查询' },
  { value: 'ent.MCALargeDepositBatchQry', label: '单位大额存单产品期次查询' },
  { value: 'ent.MCALargeDepositBuy', label: '单位大额存单申购' },
  { value: 'ent.MCALargeDepositDetailQry', label: '单位大额存单详情查询' },
  { value: 'ent.MCALargeDepositDraw', label: '单位大额存单支取' },
  { value: 'ent.MCALargeDepositQry', label: '单位大额存单查询' },
  { value: 'ent.MCAccountAfterCancelBookQry', label: '账号已注销账簿信息查询' },
  { value: 'ent.MCAcctDetailQry', label: '账号明细查询' },
  { value: 'ent.MCAddEcorgInfo', label: '企业信息维护' },
  { value: 'ent.MCAgreementSavQry', label: '协定存款查询' },
  { value: 'ent.MCAssertDebtQry', label: '资产负债总额查询' },
  { value: 'ent.MCAutDedFeeRel', label: '证书自动扣费解约' },
  { value: 'ent.MCAutDedFeeSign', label: '证书自动扣费签约' },
  { value: 'ent.MCAutDedFeeSignQry', label: '证书自动扣费签约查询' },
  { value: 'ent.MCBankCheck', label: '银企对账' },
  { value: 'ent.MCBankInnerTransfer', label: '行内转账' },
  { value: 'ent.MCBatchTransfer', label: '批量转账' },
  { value: 'ent.MCCallDepositQuery', label: '通知存款账号查询' },
  { value: 'ent.MCCertDownLoad', label: '证书下载' },
  { value: 'ent.MCCertFees', label: '证书续费' },
  { value: 'ent.MCCertFeesQry', label: '证书续费查询' },
  { value: 'ent.MCCertInfoQry', label: '证书查询' },
  { value: 'ent.MCCertUpdate', label: '证书更新' },
  { value: 'ent.MCCifRoleDetailQry', label: '企业角色详情查询' },
  { value: 'ent.MCComprehensiveBillQry', label: '综合票据查询' },
  { value: 'ent.MCCurrentRegular', label: '活期转定期' },
  { value: 'ent.MCDemandNotification', label: '活期转通知存款' },
  { value: 'ent.MCDepositAmountDetailQry', label: '保证金详情查询' },
  { value: 'ent.MCDepositAmountQry', label: '保证金查询' },
  { value: 'ent.MCDepositWithdraw', label: '通知存款支取' },
  { value: 'ent.MCDrawRegular', label: '定期通支取' },
  { value: 'ent.MCEleReceipt', label: '电子回单' },
  { value: 'ent.MCEleRecptVerifQry', label: '回单验证查询（首页外网）' },
  { value: 'ent.MCEloanInfoQuery', label: '贷款信息查询' },
  { value: 'ent.MCEntFinApply', label: '企业融资申请' },
  { value: 'ent.MCGuaranteeQry', label: '保函查询' },
  { value: 'ent.MCIBPSEleReceipt', label: '网银电子回单' },
  { value: 'ent.MCInnerTransfer', label: '公司内部转账' },
  { value: 'ent.MCLargeDepositDetailQry', label: '大额存单详情查询' },
  { value: 'ent.MCLargeDepositQry', label: '大额存单查询' },
  { value: 'ent.MCLimitManage', label: '限额管理' },
  { value: 'ent.MCLogin', label: '用户登录' },
  { value: 'ent.MCLogout', label: '用户签退' },
  { value: 'ent.MCLotteryPayFee', label: '体彩缴费' },
  { value: 'ent.MCMigrantWorkerDeposit', label: '农民工保证金查询' },
  { value: 'ent.MCMobilPhoneAppication', label: '手机银行开通' },
  { value: 'ent.MCMobilPhoneAppicationQuery', label: '手机银行开通状态查询' },
  { value: 'ent.BaffleAcctMoneyBack', label: '挡板账号资金回退' },
  { value: 'ent.MCRevokeReq', label: '撤销交易' },
  { value: 'ent.MCAccrptApplication', label: '提示承兑' },
  { value: 'ent.MCOrganizationCode', label: '票据机构号查询' },
  { value: 'ent.MCSocialSecurityContribution', label: '社保缴费' },
  { value: 'ent.MCPromptChargeTicket', label: '提示收票' },
  { value: 'ent.MCCurrentSign', label: '提示付款签收' },
  { value: 'ent.MCRecourseNotice', label: '追索' },
  { value: 'ent.MCDiscount', label: '贴现申请' },
  { value: 'ent.MCGuaranteeApply', label: '保证' },
  { value: 'ent.NoManagerTypeCheck', label: '通用撤销' },
  { value: 'ent.MCEndorsedTransfer', label: '背书申请' },
  { value: 'ent.NoManagerTypeCheck', label: '贴现申请' },
  { value: 'ent.MCVacatePcle', label: '撤票' },
  { value: 'ent.MCPaymentReminder', label: '提示付款申请' },
  { value: 'ent.MCPledgeReq', label: '质押申请' },
  { value: 'ent.MCRelievePledgeReq', label: '质押解除' },
  { value: 'ent.ForeignCurrencyFixedDeposit', label: '外币保证金存入' },
  { value: 'ent.ForeignCurrencyDeposit', label: '外币定期存入' },
  { value: 'ent.MCAgreePayOff', label: '清偿' },
  { value: 'ent.CreditCardBulkWithholding', label: '信用卡批量代扣' },
  { value: 'ent.FinanceReimburse', label: '批量报销' }
]

const prd_id_entity = getEntity(prd_id)

/**
 * @name 转账权限
 * @type {({label: string, value: string}|{label: string, value: string}|{label: string, value: string}|{label: string, value: string}|{label: string, value: string})[]}
 */
const right_flag = [
  { value: 'FT', label: '任意转出' },
  { value: 'EIT', label: '只划至本企业' },
  { value: 'Q', label: '仅开通查询' },
  { value: 'SPT', label: '指定收款人' },
  { value: 'FTE', label: '任意转出 + 现金管理' },
  { value: 'AT', label: '只划至被授权人' }
]
// 资金归集
// 上级余额不足处理方式
const neCashMode_Type = [
  { value: '0', label: '随机' },
  { value: '1', label: '先大后小' },
  { value: '2', label: '先小后大' },
  { value: '3', label: '账号优先' },
  { value: '4', label: '加权平均' }
]
const neCashMode_entity = getEntity(neCashMode_Type)

// 操作员信息管理业务开通
const opBusiness_Type = [
  { value: true, label: '网上银行，手机银行' },
  { value: false, label: '网上银行' }
]
const opBusiness_entity = getEntity(opBusiness_Type)

// 资金归集
// 反向归集
const reverseFlag_Type = [
  { value: '0', label: '开通' },
  { value: '1', label: '不开通' }
]
const reverseFlag_entity = getEntity(reverseFlag_Type)

// 资金归集
// 使用透支归还下级透支
const returnFalg_Type = [
  { value: '0', label: '用' },
  { value: '1', label: '不用' }
]
const returnFalg_entity = getEntity(returnFalg_Type)

// 资金归集
// 计息周期
const accrualCyc_Type = [
  { value: '1', label: '按月' },
  { value: '2', label: '按季' }
]
const accrualCyc_entity = getEntity(accrualCyc_Type)

// 资金归集
// 上存计息
const accrualFlag_Type = [
  { value: '0', label: '内部计息' },
  { value: '1', label: '不内部计息' }
]
const accrualFlag_entity = getEntity(accrualFlag_Type)

// 资金归集
// 利息分配
const assignFlag_Type = [
  { value: '0', label: '不自动分配利息' },
  { value: '1', label: '自动分配利息' }
]
const assignFlag_entity = getEntity(assignFlag_Type)

// 资金归集
// 透支计息
const accrualMode_Type = [
  { value: '0', label: '不计息' },
  { value: '1', label: '计息' }
]
const accrualMode_entity = getEntity(accrualMode_Type)

// 资金归集
// 交易类别
const trans_TType = [
  { value: '1', label: '自身收付款' },
  { value: '2', label: '资金归集' },
  { value: '3', label: '结息' },
  { value: '4', label: '收费' },
  { value: '5', label: '虚户间调账' },
  { value: '6', label: '虚户间转账' },
  { value: '7', label: '其他' },
  { value: '8', label: '活转定或定转活明细' }
]
const trans_Entity = getEntity(trans_TType)

// 资金归集
// 归集周期查询
// 归集标志
const gatherFlag_Type = [
  { value: '0', label: '每天归集标志' },
  { value: '1', label: '隔天归集标志' },
  { value: '2', label: '每周归集标志' },
  { value: '3', label: '每月归集标志' },
  { value: '4', label: '月末归集标志' },
  { value: '9', label: '取消归集' }
]
const gatherFlag_entity = getEntity(gatherFlag_Type)
// 月末归集标志
const monthEndFlag_Type = [
  { value: '0', label: '不月末归集' },
  { value: '1', label: '月末归集' }
]
const monthEndFlag_entity = getEntity(monthEndFlag_Type)
// 下拨标志
const dGatherFlag_Type = [
  { value: '0', label: '每天下拨标志' },
  { value: '1', label: '隔天下拨标志' },
  { value: '2', label: '每周下拨标志' },
  { value: '3', label: '每月下拨标志' },
  { value: '4', label: '月末下拨标志' },
  { value: '9', label: '取消下拨' }
]
const dGatherFlag_entity = getEntity(dGatherFlag_Type)
// 月末下拨标志
const dMonthEndFlag_Type = [
  { value: '0', label: '不月末归集' },
  { value: '1', label: '月末归集' }
]
const dMonthEndFlag_entity = getEntity(dMonthEndFlag_Type)
const account = [
  { value: 'ent.MCAEInvestProductBuy', label: '理财认购' },
  { value: 'ent.MCInnerTransfer', label: '公司内部转账' },
  { value: 'ent.MCALargeDepositBuy', label: '单位大额存单申购' },
  { value: 'ent.MCDemandNotification', label: '活期转通知存款' },
  { value: 'ent.MCCurrentRegular', label: '活期转定期' },
  { value: 'ent.MCAEInvestProductRedeem', label: '理财赎回' },
  { value: 'ent.MCBatchTransfer', label: '批量转账' },
  { value: 'ent.MCStructuredDepositOpen', label: '结构性存款账号开户' },
  { value: 'ent.MCAEDefiniteLifeBuy', label: '定活通购买' },
  { value: 'ent.MCLotteryPayFee', label: '体彩缴费' },
  { value: 'ent.CapitalCollect', label: '现金管理-资金归集' },
  { value: 'ent.MCPaymentPayInfo', label: '非税缴费' },
  { value: 'ent.MCTransfer', label: '单笔转账' },
  { value: 'ent.MCAEInvestProductCancle', label: '理财撤单' },
  { value: 'ent.MCCertFees', label: '证书续费' },
  { value: 'ent.MCOpenRegularAcNo', label: '定期通开户' },
  { value: 'ent.MCAutDedFeeRel', label: '自动扣费解约' },
  { value: 'ent.CollectCashPooling', label: '归集资金划拨' },
  { value: 'ent.SmallLimitBorrow', label: '小额定期借记业务' },
  { value: 'ent.SmallLimitLead', label: '小额定期贷记业务' },
  { value: 'ent.MultistageBookBalSet', label: '多级账簿余额调整' },
  { value: 'ent.FinanceReimburse', label: '财务报销' },
  { value: 'ent.MultistageBookDetailAdjust', label: '多级账簿明细调账' },
  { value: 'ent.MultistageBookTransfer', label: '多级账簿转账' },
  { value: 'ent.TimingCollectSet', label: '定时归集设置' }
]

const map_account = getEntity(account)

const non_account = [
  { value: 'ent.MCStructuredDepositClose', label: '结构性存款账号销户' },
  { value: 'ent.MCPeriodicWithdrawal', label: '定期支取' },
  { value: 'ent.PaySalary', label: '代发工资' },
  { value: 'ent.CollectDateSet', label: '归集周期设置' },
  { value: 'ent.CreditCard', label: '信用卡' },
  { value: 'ent.MCDepositWithdraw', label: '通知存款支取' },
  { value: 'ent.MCOperatorInfoAdmin', label: '操作员信息管理' },
  { value: 'ent.MCMobilPhoneAppication', label: '手机银行开通' },
  { value: 'ent.MCAddEcorgInfo', label: '企业信息维护' },
  { value: 'ent.ApproveProcessSet', label: '审批流程设置' },
  { value: 'ent.MCTimeTransferTrs', label: '定时交易处理' },
  { value: 'ent.MCRoleMaintenance', label: '角色维护' },
  { value: 'ent.MCOperatorPasswordResert', label: '操作员密码重置' },
  { value: 'ent.MCLimitManage', label: '限额管理' },
  { value: 'ent.MCSHShip', label: '上海航运' },
  { value: 'ent.MCALargeDepositDraw', label: '单位大额存单支取' },
  { value: 'ent.MCDrawRegular', label: '定期通支取' }
]

const map_non_account = getEntity(non_account)

const asFlag_Type = [
  { value: '0', label: '否' },
  { value: '1', label: '是' }
]
const asFlag_Entity = getEntity(asFlag_Type)
const bankSigns_Type = [
  { value: '0', label: '行内' },
  { value: '1', label: '跨行' }
]
const bankSigns_Entity = getEntity(bankSigns_Type)
const bankFlag_Type = [
  { value: '0', label: '同城' },
  { value: '1', label: '异地' }
]
const bankFlag_Entity = getEntity(bankFlag_Type)
const urgentFlag_Type = [
  { value: '0', label: '不加急' },
  { value: '1', label: '加急' }
]
const urgentFlag_Entity = getEntity(urgentFlag_Type)
const disposal_Type = [
  { value: '0', label: '实时' },
  { value: '3', label: '次日' },
  { value: '1', label: '预约' }
]
const disposal_Entity = getEntity(disposal_Type)
const transbook_Type = [
  { value: '1', label: '自身收付款' },
  { value: '2', label: '资金归集' },
  { value: '3', label: '结息' },
  { value: '4', label: '收费' },
  { value: '5', label: '虚账号间调账' },
  { value: '6', label: '虚账号间转账' },
  { value: '7', label: '其他' }
]
const transbook_Entity = getEntity(transbook_Type)
const querycashdetails_Type = [
  { value: '0', label: '有效' },
  { value: '1', label: '无效' }
]
const querycashdetails_Entity = getEntity(querycashdetails_Type)
const inherit_Type = [
  { value: '0', label: '不遵从' },
  { value: '1', label: '遵从' }
]
const inherit_Entity = getEntity(inherit_Type)
const assigncashFlag_Type = [
  { value: '0', label: '不自动分配利息' },
  { value: '1', label: '自动分配利息' }
]
const assigncashFlag_Entity = getEntity(assigncashFlag_Type)
const payMode_Type = [
  { value: '0', label: '统收统支' },
  { value: '1', label: '以收定支' },
  { value: '2', label: '超额定支' },
  { value: '3', label: '手动下拨,实时上收' },
  { value: '4', label: '按资金池支取' }
]
const payMode_Entity = getEntity(payMode_Type)
const asLevel_Type = [
  { value: '1', label: '一级账簿级别' },
  { value: '2', label: '二级账簿级别' },
  { value: '3', label: '三级账簿级别' },
  { value: '4', label: '四级账簿级别' },
  { value: '5', label: '五级账簿级别' },
  { value: '6', label: '六级账簿级别' },
  { value: '7', label: '七级账簿级别' },
  { value: '8', label: '八级账簿级别' },
  { value: '9', label: '九级账簿级别' },
  { value: '10', label: '十级账簿级别' },
  { value: '11', label: '十一级账簿级别' },
  { value: '12', label: '十二级账簿级别' }
]
const asLevel_Entity = getEntity(asLevel_Type)

// 理财交易状态
const finanStatus_Type = [
  { value: '0', label: '预受理' },
  { value: '1', label: '受理' },
  { value: '2', label: '已撤单' },
  { value: '3', label: '已抹账' },
  { value: '4', label: '失败' },
  { value: '5', label: '确认中' },
  { value: '6', label: '部分确认未全部返回' },
  { value: '7', label: '部分确认已全部返回' },
  { value: '8', label: '确认成功' },
  { value: '9', label: '确认失败' },
  { value: 'A', label: '认购确认' },
  { value: 'B', label: '份额调账' },
  { value: 'C', label: '待撤' },
  { value: 'D', label: '分红数据' },
  { value: 'E', label: '已重发' },
  { value: 'F', label: '重发失败' },
  { value: 'S', label: '成功' },
  { value: 'Y', label: '预约' },
  { value: 'Z', label: '处理中）' }
]
const finanStatus_Entity = getEntity(finanStatus_Type)

// 理财产品状态
const finStewardStatus_Type = [
  { value: '0', label: '开放期' },
  { value: '1', label: '募集期' },
  { value: '2', label: '发行成功' },
  { value: '3', label: '发行失败' },
  { value: '4', label: '停止交易' },
  { value: '5', label: '停止申购' },
  { value: '6', label: '停止赎回' },
  { value: '7', label: '权益登记' },
  { value: '8', label: '红利发放' },
  { value: '9', label: '产品封闭期' },
  { value: 'a', label: '产品终止' },
  { value: 'b', label: '预约认购期' }
]
const finStewardStatus_Entity = getEntity(finStewardStatus_Type)

const huabo_Type = [
  { value: '0', label: '资金上划' },
  { value: '1', label: '资金下拨' }
]
const huabo_Entity = getEntity(huabo_Type)

const withdrawalType = [
  { value: '0', label: '统收统支' },
  { value: '1', label: '以收定支' },
  { value: '2', label: '超额定支' },
  { value: '3', label: '手动下拔,实时上收' },
  { value: '4', label: '按资金池支取' }
]

const map_withdrawalType = getEntity(withdrawalType)

// 资金归集
// 关系查询
// 归集类型
const gather_Type = [
  { value: 'V', label: '最高级账号' },
  { value: '1', label: '实时归集' },
  { value: '2', label: '批量归集' },
  { value: '3', label: '批归资金池' }
]
const gather_entity = getEntity(gather_Type)
// 归集关系查询 支控方式
const pay_mode = [
  { value: '0', label: '统收统支' },
  { value: '1', label: '以收定支' },
  { value: '2', label: '超额定支' },
  { value: '3', label: '下拨支付' }
]
const payMode_entity = getEntity(pay_mode)

// 资金归集
// 关系查询
// 委托贷款
const consignFlag_Type = [
  { value: '0', label: '是' },
  { value: '1', label: '否' }
]
const consignFlag_entity = getEntity(consignFlag_Type)
// 资金归集
// 关系查询
// 上级余额不足账号优先级
const acNoPri_Type = [
  { value: '000', label: '级别最高' },
  { value: '999', label: '级别最低' }
]
const acNoPri_entity = getEntity(acNoPri_Type)

// 资金归集
// 关系查询
// 上存方式
const gatherMode_Type = [
  { value: '01', label: '比例上存(账户余额)' },
  { value: '02', label: '取整上存' },
  { value: '03', label: '限额上存' },
  { value: '04', label: '全额上存' },
  { value: '05', label: '超限额全部上存' },
  { value: '06', label: '定额上存' }, // 没用到
  { value: '07', label: '比例上存(自身余额)' }
]
const gatherMode_entity = getEntity(gatherMode_Type)

// 资金归集
// 关系查询
// 最高累计上存方式
const pileAmtFlag_Type = [
  { value: '1', label: '是' },
  { value: '0', label: '否' }
]
const pileAmtFlag_entity = getEntity(pileAmtFlag_Type)

// 资金归集
// 关系查询
// 上存保留最低留存
const uppDownFlag_Type = [
  { value: '0', label: '否' },
  { value: '1', label: '是' }
]
const uppDownFlag_entity = getEntity(uppDownFlag_Type)
// 资金归集
// 关系查询
// 使用上级资金归还隔夜透支
const returnFlag_Type = [
  { value: '0', label: '归还' },
  { value: '1', label: '不归还' }
]
const returnFlag_entity = getEntity(returnFlag_Type)
// 资金归集
// 关系查询
// 下拨方式
const downMode_Type = [
  { value: '01', label: '留存下拨' },
  { value: '02', label: '定额下拨' }
]
const downMode_entity = getEntity(downMode_Type)
function getEntity (list = [], labelKey = 'label', valueKey = 'value') {
  let entity = {}
  if (Array.isArray(list)) {
    entity = list.reduce((acc, cur) => ({ ...acc, [cur[valueKey]]: cur[labelKey] }), entity)
    return entity
  }
  return entity
}

// 理财产品类别
const financialPrd_Type = [
  { value: 0, label: '基金' },
  { value: 8, label: '信托' },
  { value: 1, label: '行内理财' }
]
const financialPrd_entity = getEntity(financialPrd_Type)

// 理财风险等级
const financialRisk_Type = [
  { value: '0', label: '未评定' },
  { value: '1', label: '谨慎型' },
  { value: '2', label: '稳健型' },
  { value: '3', label: '平衡型' },
  { value: '4', label: '进取型' },
  { value: '5', label: '激进型' }
]
const financialRisk_entity = getEntity(financialRisk_Type)

const fundDirect_Type = [
  { value: '1', label: '向上' },
  { value: '2', label: '双向' }
]
const fundDirect_entity = getEntity(fundDirect_Type)

// 票据类型
const bill_Type = [
  { value: '', label: '全部' },
  { value: 'AC01', label: '银票' },
  { value: 'AC02', label: '商票' }
]
const bill_entity = getEntity(bill_Type)

const resBill_Type = [
  { value: 'SU00', label: '同意' },
  { value: 'SU01', label: '拒绝' }
]
const resBill_entity = getEntity(resBill_Type)

// 允许背书
const endorse_Type = [
  { value: 'EM00', label: '可转让' },
  { value: 'EM01', label: '不可转让' }
]
const endorse_entity = getEntity(endorse_Type)

// 保证类型
const ensure_Type = [
  { value: '01', label: '出票人提示保证' },
  { value: '02', label: '承兑人提示保证' },
  { value: '03', label: '背书提示保证' }
]
const ensure_entity = getEntity(ensure_Type)

// 限额管理-限额名称
const trans_type_code = [
  { 'value': 'E2E', label: '公转公' },
  { 'value': 'E2P', label: '公转私' }
]
const trans_type_code_entity = getEntity(trans_type_code)

// 允许背书
const opinion_Type = [
  { value: '0', label: '同意' },
  { value: '1', label: '驳回' }
]
const opinion_entity = getEntity(opinion_Type)
// 通知类型
const notification_Type = [
  { value: '1D', label: '一天' },
  { value: '7D', label: '七天' }
]
const notification_entity = getEntity(notification_Type)

// 定时归集设置
// 上存方式
const batchUpColMethod_Type = [
  { 'value': '0', label: '比例上存(账户余额)' },
  { 'value': '1', label: '取整上存' },
  { 'value': '2', label: '限额上存' },
  { 'value': '3', label: '全额上存' },
  { 'value': '4', label: '超限额全额上存' },
  { 'value': '5', label: '比例上存(自身余额)' }
]
const batchUpColMethod_entity = getEntity(batchUpColMethod_Type)

// 定时归集设置
// 最高累计上存标志
const highestMark_Type = [
  { value: '0', label: '否' },
  { value: '1', label: '是' }
]
const highestMark_entity = getEntity(highestMark_Type)

// 定时归集设置
// 是否下拨
const dialDownSave_Type = [
  { value: '1', label: '否' },
  { value: '2', label: '是' }
]
const dialDownSave_entity = getEntity(dialDownSave_Type)

// 定时归集设置
// 下拨方式
const dialDownMethod_Type = [
  { value: '01', label: '留存下拨' },
  { value: '02', label: '定额下拨' }
]
const dialDownMethod_entity = getEntity(dialDownMethod_Type)
// 线上清算标志
const clearing_Type = [
  { value: 'SM00', label: '线上清算' },
  { value: 'SM01', label: '线下清算' }
]
const clearing_entity = getEntity(clearing_Type)
// 预约交易查询
// 交易状态
const trsState_Type = [
  { value: 'C', label: '成功' },
  { value: 'F', label: '失败' },
  { value: 'I', label: '待处理' },
  { value: 'R', label: '已撤销' }
]
const trsState_entity = getEntity(trsState_Type)
// 预约交易查询
const timer_state = [
  { value: 'C', label: '撤销' },
  { value: 'U', label: '待处理' },
  { value: 'S', label: '完成' },
  { value: 'F', label: '错误' },
  { value: 'H', label: '锁定执行' }
]
const timerState_entity = getEntity(timer_state)
// 定时交易结果
const pdeal_msg = [
  { value: '0', label: '等待复核' },
  { value: '1', label: '已作废' },
  { value: '2', label: '等待审批' },
  { value: '3', label: '等待落地处理' },
  { value: '4', label: '等待提交' },
  { value: '5', label: '已提交,等待响应' },
  { value: '6', label: '交易失败' },
  { value: '7', label: '已撤销' },
  { value: '8', label: '结果未知,待查询' },
  { value: '9', label: '交易成功' },
  { value: 'A', label: '等待银行审批' },
  { value: 'B', label: '交易异常' },
  { value: 'C', label: '交易预约' }
]
// 到账模式
const schedule_Type = [
  { value: '0', label: '实时到账' },
  { value: '1', label: '普通到账' },
  { value: '2', label: '次日到账' },
  { value: '3', label: '预约' }
]
const schedule_entity = getEntity(schedule_Type)
// 线上清算标志
const response_Type = [
  { value: 'SU00', label: '同意' },
  { value: 'SU01', label: '拒绝' }
]
const response_entity = getEntity(response_Type)
const inherit_Ttype = [
  { value: '0', label: '否' },
  { value: '1', label: '是' }
]
const inherit_Tentity = getEntity(inherit_Ttype)
const accrualFlag_Ttype = [
  { value: '0', label: '不计息' },
  { value: '1', label: '计息' }
]
const accrualFlag_Tentity = getEntity(accrualFlag_Ttype)

const payment_Type = [
  { value: '01', label: '买方付息' },
  { value: '02', label: '卖方付息' },
  { value: '03', label: '协议付息' }
]
const payment_entity = getEntity(payment_Type)
const recourseTyp_Type = [
  { value: 'RT00', label: '拒付追索' },
  { value: 'RT01', label: '非拒付追索' }
]
const recourseTyp_entity = getEntity(recourseTyp_Type)
const recourseReason_Type = [
  { value: 'RC00', label: '承兑人被依法宣告破产' },
  { value: 'RC01', label: '承兑人因违法被责令终止活动' }
]
const recourseReason_entity = getEntity(recourseReason_Type)

const stdsgn_Type = [
  { value: 'RC00', label: '银行' },
  { value: 'RC01', label: '企业' },
  { value: 'RC02', label: '央行' },
  { value: 'RC03', label: '被代理行' },
  { value: 'RC04', label: '财务公司' }
]
const stdsgn_entity = getEntity(stdsgn_Type)

const business_Type = [
  { value: 'eweb-setting.CheckPassOrRej', label: '管理类审核' },
  { value: 'eweb-enterprise.RoleAdd', label: '角色添加' },
  { value: 'eweb-operator.OperatorModify', label: '操作员管理-修改' },
  { value: 'eweb-enterprise.RoleDelete', label: '角色删除' },
  { value: 'eweb-enterprise.UpdEcorgInfo', label: '企业信息维护' },
  { value: 'eweb-cash.MultistageBookAuthSet', label: '多级账簿权限设置' },
  { value: 'eweb-enterprise.RoleUpdate', label: '角色修改' },
  { value: 'eweb-operator.OperatorPasswordReset', label: '操作员密码重置' },
  { value: 'eweb-setting.CifAcLimitSet', label: '限额管理' },
  { value: 'eweb-setting.MobilphoneBankApplication', label: '手机银行开通' },
  { value: 'eweb-setting.ApproveProcessSet', label: '审批流程设置' },
  { value: 'eweb-invest.InvestProductRedeem', label: '理财赎回' },
  { value: 'eweb-largeDeposit.LargeProductDraw', label: '单位大额存单支取' },
  { value: 'eweb-invest.DemandNotification', label: '活期转通知存款' },
  { value: 'eweb-invest.InvestProductBuy', label: '理财认购' },
  { value: 'eweb-enterprise.CertFees', label: '证书续费' },
  { value: 'eweb-transfer.PaymentPayInfo', label: '非税缴费' },
  { value: 'eweb-transfer.BatchTransfer', label: '批量转账' },
  { value: 'eweb-transfer.BatchTransferAdd', label: '批量转账' },
  { value: 'eweb-cash.MultistageBookTransfer', label: '多级账簿转账' },
  { value: 'eweb-enterprise.AutDedFeeSign', label: '证书自动扣费签约' },
  { value: 'eweb-invest.OpenRegularAcNo', label: '定期通开户' },
  { value: 'eweb-invest.CurrentRegular', label: '活期转定期' },
  { value: 'eweb-cash.CollectCashPooling', label: '归集资金划拨' },
  { value: 'eweb-transfer.FinanceReimburse', label: '财务报销' },
  { value: 'eweb-transfer.InnerTransfer', label: '公司内部转账' },
  { value: 'eweb-invest.PeriodicWithdrawal', label: '定期支取' },
  { value: 'eweb-invest.InvestProductCancle', label: '理财撤单' },
  { value: 'eweb-invest.InvestProductRedCancle', label: '理财赎回撤单' },
  { value: 'eweb-transfer.PaySalaryUpload', label: '代发工资' },
  { value: 'eweb-invest.StructuredDepositOpen', label: '结构性存款开户' },
  { value: 'eweb-cash.MultistageBookBalUpdate', label: '多级账簿余额调整' },
  // { value: 'eweb-cash.MultistageBookAuthSet', label: '多级账簿权限设置' },
  { value: 'eweb-invest.StructuredDepositClose', label: '结构性存款销户' },
  { value: 'eweb-invest.DepositWithdraw', label: '通知存款支取' },
  // { value: 'eweb-cash.MultistageBookAuthSet', label: '小额定期贷记业务' },
  { value: 'eweb-largeDeposit.LargeProductBuy', label: '单位大额存单申购' },
  { value: 'eweb-largeDeposit.LargeDepositAssignApply', label: '单位大额存单转让' },
  { value: 'eweb-largeDeposit.LargeDepositAssignAffirm', label: '单位大额存单受让' },
  { value: 'eweb-transfer.Transfer', label: '单笔转账' },
  { value: 'eweb-invest.DrawRegular', label: '定期通支取' },
  { value: 'eweb-transfer.SocialSecurityContribution', label: '社保缴费' },
  { value: 'eweb-setting.CheckPassOrRejForNMan', label: '交易管理审核' },
  { value: 'eweb-transfer.SHShipPayments', label: '上海航运-出金' },
  { value: 'eweb-transfer.SHShipIncome', label: '上海航运-入金' },
  { value: 'eweb-cash.TimingCollectSet', label: '定时归集设置' },
  // { value: 'eweb-transfer.TimeTransferTrsRepeal', label: '预约转账撤销' },
  { value: 'eweb-transfer.CreditCardRepay', label: '信用卡还款' },
  { value: 'eweb-transfer.SmallLimitBorrow', label: '小额定期借记业务' },
  { value: 'eweb-cash.MultistageBookDetailAdjust', label: '多级账簿明细调账' },
  // { value: 'eweb-invest.InvestProductBuy', label: '归集周期设置' },
  { value: 'eweb-enterprise.CifAcLimitSet', label: '限额设置' },
  { value: 'eweb-enterprise.UpdateAutDedFeeSign', label: '证书自动扣费维护' },
  { value: 'eweb-transfer.SmallLimitLead', label: '小额定期贷记业务' },
  { value: 'eweb-enterprise.AutDedFeeRel', label: '证书自动扣费解约' },
  { value: 'eweb-transfer.LotteryPayFee', label: '体彩缴费' },
  { value: 'eweb-cash.CollectDateSet', label: '归集周期设置' },
  { value: 'eweb-transfer.PayeeBookUpdate', label: '常用往来账号修改' },
  { value: 'eweb-transfer.PayeeBookAdd', label: '常用往来账号添加' },
  { value: 'eweb-transfer.PayeeBookDelete', label: '常用往来账号删除' },
  { value: 'eweb-edraft.CurrentSign', label: '提示付款签收' },
  { value: 'eweb-edraft.PromptChargeTicket', label: '提示收票' },
  // { value: 'eweb-edraft.SpRevokeReq', label: '提示收票撤销' },
  { value: 'eweb-edraft.AcceptApplication', label: '提示承兑' },
  { value: 'eweb-edraft.CdRevokeReq', label: '提示承兑撤销' },
  { value: 'eweb-edraft.IssueRegister', label: '出票登记' },
  { value: 'eweb-edraft.GuaranteeApply', label: '保证申请' },
  { value: 'eweb-edraft.RevokeReq', label: '追索申请撤回' },
  { value: 'eweb-edraft.EndorsedTransfer', label: '背书申请' },
  { value: 'eweb-edraft.BsRevokeReq', label: '背书撤回' },
  { value: 'eweb-edraft.Discount', label: '贴现申请' },
  { value: 'eweb-edraft.RelievePledgeReq', label: '解质押申请' },
  { value: 'eweb-edraft.PaymentReminder', label: '提示付款申请' },
  { value: 'eweb-edraft.PledgeReq', label: '质押申请' },
  { value: 'eweb-transfer.RepealAppointTrans', label: '预约转账撤销' },
  { value: 'eweb-edraft.AgreePayOff', label: '同意清偿申请' },
  { value: 'eweb-edraft.BzCurrentSign', label: '保证应答' },
  { value: 'eweb-edraft.JzyRevokeReq', label: '解质押撤回' },
  { value: 'eweb-edraft.PromptChargeTicketBatch', label: '批量提示收票' },
  { value: 'eweb-edraft.SpCurrentSignBatch', label: '批量提示收票应答' },
  { value: 'eweb-edraft.QcCurrentSign', label: '同意清偿应答' },
  { value: 'eweb-edraft.RecourseNotice', label: '追索通知申请' },
  { value: 'eweb-edraft.JzyCurrentSign', label: '解质押应答' },
  { value: 'eweb-operator.OperatorInfoModify', label: '操作员信息修改' },
  { value: 'eweb-operator.OperatorPswModify', label: '操作员密码修改' },
  { value: 'eweb-edraft.PledgeReqBatch', label: '批量质押申请' },
  { value: 'eweb-edraft.DiscountBatch', label: '批量贴现申请' },
  { value: 'eweb-edraft.TxRevokeReq', label: '贴现撤销' },
  { value: 'eweb-edraft.FkRevokeReq', label: '提示付款撤销' },
  { value: 'eweb-transfer.TimeTransferTrsRepeal', label: '定时交易撤销' },
  { value: 'eweb-query.BankCheckOutcome', label: '银企对账' },
  { value: 'eweb-enterprise.CertUpdate', label: '证书缴费' },
  { value: 'eweb-edraft.CdCurrentSignBatch', label: '批量提示承兑签收' },
  { value: 'eweb-edraft.AcceptApplicationBatch', label: '批量提示承兑' },
  { value: 'eweb-edraft.GuaranteeApplyBatch', label: '批量保证申请' },
  { value: 'eweb-edraft.BzRevokeReq', label: '保证撤销' },
  { value: 'eweb-edraft.IssueRegisterBatch', label: '批量出票登记' },
  { value: 'eweb-edraft.FkCurrentSign', label: '付款签收' },
  { value: 'eweb-edraft.JfCurrentSign', label: '拒付应答' },
  { value: 'eweb-edraft.VacatePcle', label: '撤票申请' },
  { value: 'eweb-edraft.CdCurrentSign', label: '提示付款签收' },
  { value: 'eweb-edraft.QcRevokeReq', label: '同意清偿撤回' },
  { value: 'eweb-edraft.BzCurrentSignBatch', label: '批量保证应答' },
  { value: 'eweb-edraft.BsCurrentSign', label: '背书应答' },
  { value: 'eweb-edraft.ZyCurrentSign', label: '质押应答' },
  { value: 'eweb-edraft.BsCurrentSignBatch', label: '批量背书应答' },
  { value: 'eweb-edraft.ZyCurrentSignBatch', label: '批量质押应答' },
  { value: 'eweb-edraft.CurrentSignBatch', label: '批量通用应答' },
  { value: 'eweb-edraft.ZyRevokeReq', label: '质押撤销' },
  { value: 'eweb-edraft.SpCurrentSign', label: '提示收票应答' },
  { value: 'eweb-edraft.EndorsedTransferBatch', label: '批量背书申请' },
  // { value: 'eweb-edraft.BsRevokeReq', label: '背书撤回' },
  // { value: 'eweb-edraft.JzyRevokeReq', label: '解质押撤销' },
  { value: 'eweb-edraft.SpRevokeReq', label: '提示收票撤销' },
  { value: 'eweb-transfer.DebitCardBulkWithholding', label: '批量借记卡代扣' },
  { value: 'eweb-transfer.CreditCardBulkWithholding', label: '批量信用卡代扣' },
  // { value: 'eweb-largeDeposit.LargeDepositAssignApply', label: '大额存单转让' },
  // { value: 'eweb-largeDeposit.LargeDepositAssignAffirm', label: '大额存单受让' },
  { value: 'eweb-setting.MessageApplication', label: '留言新增' },
  { value: 'eweb-transfer.CreditCardDel', label: '信用卡解挂' },
  { value: 'eweb-transfer.CreditCardAdd', label: '信用卡加挂' },
  { value: 'eweb-setting.TelephoneBankApplication', label: '电话银行开通' },
  { value: 'eweb-setting.TelephonePswReset', label: '电话银行密码重置' }
  // { value: 'eweb-edraft.VacatePcle', label: '撤票申请' }
]
const business_Entity = getEntity(business_Type)
const jnlTrsStatus = [
  { value: '0', label: '交易成功' },
  { value: '1', label: '通讯失败，交易是否成功，请查询账号信息' },
  { value: '2', label: '主机拒绝，交易失败' },
  { value: '3', label: '交易未明，交易是否成功，请查询账号信息' },
  { value: '4', label: '交易冲正' },
  { value: '5', label: '主机拒绝，交易是否成功，请查询账号信息' },
  { value: '9', label: '定时待处理' },
  { value: '00', label: '已录入,待审核' },
  { value: '01', label: '已完成一次审核' },
  { value: '02', label: '已完成二次审核' },
  { value: '03', label: '已完成三次审核' },
  { value: '04', label: '已完成四次审核' },
  { value: '99', label: '处理结束' },
  { value: 'TR', label: '交易退回' },
  { value: 'MS', label: '交易已修改' },
  { value: 'Wt', label: '等待发送主机' },
  { value: 'CF', label: '通讯失败' },
  { value: 'TF', label: '主机拒绝' },
  { value: 'AT', label: '定时待处理' },
  { value: 'CT', label: '定时已撤销' },
  { value: 'CX', label: '交易拒绝' },
  { value: 'NU', label: '待审核' },
  { value: 'TS', label: '审核成功' },
  { value: 'C', label: '定时交易已撤销' },
  { value: '', label: '' }
]
const trsEntity = [
  { value: 'login', label: '登录' },
  { value: 'logout', label: '退出' },
  { value: 'EE0112', label: '行内转账' },
  { value: 'EE011201', label: '行内定时转账' },
  { value: 'EE0122', label: '跨行转账' },
  { value: 'EE015003', label: '大连非税缴费' },
  { value: 'EE0162', label: '上海同城转账' },
  { value: 'EE0172', label: '上海支票圈存' },
  { value: 'EE021003', label: '活期转定期' },
  { value: 'EE022003', label: '定期转活期' },
  { value: 'EE023002', label: '活期转通知存款' },
  { value: 'EP012002', label: '行内转账' },
  { value: 'EP013002', label: '跨行转账' },
  { value: 'EP011002', label: '活期互转' },
  { value: 'EP021003', label: '活期转定期' },
  { value: 'EP022004', label: '定期转活期' },
  { value: 'EP023003', label: '活期转通知存款' },
  { value: 'EP012005', label: '行内定时转账' },
  { value: 'EP013004', label: '跨行定时转账' },
  { value: 'EP170303', label: '小额实时转账' },
  { value: 'EP018003', label: '定时交易撤销' },
  { value: 'EP0250104', label: '通知存款支取' },
  { value: 'EE040203', label: '跨行定时转账' },
  { value: 'EE100203', label: '通知存款预约' },
  { value: 'EE100303', label: '通知存款取消预约' },
  { value: 'EE100403', label: '通知存款支取' },
  { value: 'EE0343', label: '挡板账号资金回退' },
  { value: 'FE130803', label: '基金账号开户' },
  { value: 'FE130903', label: '基金账号销户' },
  { value: 'FE131003', label: '登记基金账号' },
  { value: 'FE131103', label: '取消登记基金账号' },
  { value: 'EntInnerTransfer', label: '内部转账' },
  { value: 'FP110803', label: '委托买入' },
  { value: 'FP110903', label: '委托卖出' },
  { value: 'FP111302', label: '修改股东密码' },
  { value: 'FP111003', label: '委托撤单' },
  { value: 'FP111103', label: '配股认购' },
  { value: 'FP111203', label: '新股申购' },
  { value: 'FP138804', label: '手机银行开通' },
  { value: 'FP139903', label: '手机银行关闭' },
  { value: 'FP130411', label: '转账限额设置' },
  { value: 'FP120402', label: '网页风格选择' },
  { value: 'FP120702', label: '账号别名设置' },
  { value: 'FP120602', label: '账号顺序排序' },
  { value: 'FP120502', label: '修改登录名称' },
  { value: 'FP120202', label: '普通账号删除' },
  { value: 'FP120203', label: '普通账号追加' },
  { value: 'FP120302', label: '信用卡删除' },
  { value: 'FP120303', label: '信用卡追加' },
  { value: 'FP120102', label: '快捷选单设置' },
  { value: 'FP130412', label: '转账限额设置' },
  { value: 'FP160401', label: '分行特色' },
  { value: 'FP090204', label: '自助贷款' },
  { value: 'FP090304', label: '提前还款' },
  { value: 'FP100203', label: '认购国债' },
  { value: 'FP100304', label: '国债兑付' },
  { value: 'EP021003', label: '卡内活期转定期' },
  { value: 'FP030403', label: '活期转定期' },
  { value: 'EP022004', label: '卡内定期转活期' },
  { value: 'FP030503', label: '定期转活期' },
  { value: 'EP023003', label: '活期转通知存款' },
  { value: 'FP030803', label: '通知存款预约' },
  { value: 'FP030806', label: '通知存款取消预约' },
  { value: 'FP030705', label: '通知存款支取' },
  { value: 'FP121203', label: '慈善捐款' },
  { value: 'FP020402', label: '查询密码修改' },
  { value: 'FP020602', label: '交易密码修改' },
  { value: 'FP070403', label: '外汇买卖' },
  { value: 'FP070405', label: '外汇买卖' },
  { value: 'FP030103', label: '活期转活期' },
  { value: 'FP040103', label: '行内转账' },
  { value: 'FP040603', label: '信用卡存款' },
  { value: 'FP040203', label: '本行批量转账' },
  { value: 'FP050101', label: '银联卡转账' },
  { value: 'FP050102', label: '银联卡转账' },
  { value: 'FP050103', label: '银联卡转账' },
  { value: 'FP050203', label: '跨行转账' },
  { value: 'FP050303', label: '跨行批量汇款' },
  { value: 'EE040203', label: '跨行定时转账' },
  { value: 'FP080103', label: '基金账号开户' },
  { value: 'FP080203', label: '基金账号销户' },
  { value: 'FP080303', label: '登记基金账号' },
  { value: 'FP080403', label: '取消登记基金账号' },
  { value: 'FP081203', label: '基金认购' },
  { value: 'FP081303', label: '基金申购' },
  { value: 'FP081404', label: '基金赎回' },
  { value: 'FP081504', label: '基金预约赎回' },
  { value: 'FP081604', label: '基金转换' },
  { value: 'FP081703', label: '基金撤单' },
  { value: 'FP081803', label: '变更基金分红方式' },
  { value: 'FP081903', label: '基金定时定额申购申请/修改' },
  { value: 'FP080007', label: '变更基金分红方式' },
  { value: 'FP081403', label: '基金赎回' },
  { value: 'FP081511', label: '基金定投' },
  { value: 'FP081503', label: '基金预约赎回' },
  { value: 'FP081506', label: '基金定投修改' },
  { value: 'FP081508', label: '基金定投关闭' },
  { value: 'FP081603', label: '基金转换' },
  { value: 'FP082403', label: '基金撤单' },
  { value: 'FP080105', label: '基金账号开户' },
  { value: 'FP080108', label: '基金账号签约' },
  { value: 'FP083003', label: '基金客户信息修改' },
  { value: 'FP081206', label: '基金购买' },
  { value: 'FP060503', label: '信用卡还款' },
  { value: 'FP060603', label: '自动还款设置' },
  { value: 'FP060703', label: '购汇还款设置' },
  { value: 'FP060508', label: '信用卡还款' },
  { value: 'FP060509', label: '信用卡还款' },
  { value: 'FP060510', label: '信用卡还款' },
  { value: 'FP06060103', label: '信用卡还款' },
  { value: 'FP06080103', label: '信用卡转账' },
  { value: 'FP06010204', label: '自由分期申请' },
  { value: 'FP06060203', label: '信用卡查询密码申请' },
  { value: 'FP06060303', label: '信用卡查询密码重置' },
  { value: 'FP06070107', label: '信用卡特殊业务申请' },
  { value: 'FP06030303', label: '白金卡转账申请' },
  { value: 'FP110105', label: '卡通签约服务' },
  { value: 'FP110203', label: '卡通解约服务' },
  { value: 'FP110304', label: '卡通限额修改' },
  { value: 'FP130103', label: '网银服务终止' },
  { value: 'FP130202', label: '口头挂失/解挂' },
  { value: 'FP130203', label: '口头挂失/解挂' },
  { value: 'FP130303', label: '信用卡挂失' },
  { value: 'FP130402', label: '修改登录密码' },
  { value: 'FP130502', label: '防伪信息验证' },
  { value: 'FP130601', label: '查询客户信息' },
  { value: 'FP130702', label: '证书更新' },
  { value: 'FP131002', label: '增加友好账号' },
  { value: 'FP131101', label: '修改友好账号' },
  { value: 'FP131201', label: '删除友好账号' },
  { value: 'FP131302', label: '利息计算' },
  { value: 'FP131403', label: '对外转账终止' },
  { value: 'FP120902', label: '手机支付绑定删除' },
  { value: 'FP120903', label: '手机支付绑定' },
  { value: 'FP121007', label: '明珠信使设置' },
  { value: 'FP120802', label: 'IC卡绑定取消' },
  { value: 'FP120803', label: 'IC卡绑定开通' },
  { value: 'FP121102', label: '银联卡转账设置' },
  { value: 'FP121103', label: '银联卡转账设置' },
  { value: 'FP121104', label: '银联卡转账设置' },
  { value: 'FP121105', label: '银联卡转账设置' },
  { value: 'FP121304', label: '福彩电话投注注册' },
  { value: 'FP121307', label: '福彩电话投注取消' },
  { value: 'EE130702', label: '证书更新' },
  { value: 'FP160105', label: '公益捐款' },
  { value: 'FP160207', label: '自助缴费' },
  { value: 'FP160103', label: '电信手机缴费' },
  { value: 'FP160214', label: '联通手机缴费' },
  { value: 'FP160217', label: '移动手机缴费' },
  { value: 'FP160220', label: '体彩投注站缴费' },
  { value: 'FP160223', label: '联通固话、宽带缴费' },
  { value: 'FP040303', label: '单笔定时转账' },
  { value: 'FP040403', label: '定时转账委托' },
  { value: 'FP050403', label: '单笔定时汇款' },
  { value: 'FP050503', label: '批量定时汇款' },
  { value: 'FP050604', label: '定时汇款撤消' },
  { value: 'FP040504', label: '定时转账撤消' },
  { value: 'QuotScan', label: '定时交易触发' },
  { value: 'LoginMP', label: '登录修改密码' },
  { value: 'FP150103', label: '银行转证券' },
  { value: 'FP150203', label: '证券转银行' },
  { value: 'FP150302', label: '查询当日转账明细' },
  { value: 'FP150402', label: '查询历史转账明细' },
  { value: 'FP150502', label: '查询当日证券资金' },
  { value: 'FP150602', label: '查询资金对账单' },
  { value: 'FP150602', label: '查询资金对账单' },
  { value: 'FP150802', label: '托管账号密码修改' },
  { value: 'FP150903', label: '查询密码挂失' },
  { value: 'FP180106', label: '理财产品预约/购买' },
  { value: 'FP180108', label: '理财产品预约/购买' },
  { value: 'FP180204', label: '理财产品预约查询及变更金额' },
  { value: 'FP180403', label: '理财产品募集期撤销' },
  { value: 'FP180503', label: '理财产品终止' },
  { value: 'FP180703', label: '风险偏好评估' },
  { value: 'FP180803', label: '理财产品需求登记' },
  { value: 'FE011301', label: '别名设置' },
  { value: 'FE011201', label: '快捷菜单设置' },
  { value: 'FE010301', label: '网银日志查询' },
  { value: 'FE040301', label: '转账信息查询' },
  { value: 'FE030103', label: '公司内部转账' },
  { value: 'FE380503', label: '行内转账' },
  { value: 'FE380003', label: '体彩缴费' },
  { value: 'FE600104', label: '资金上划' },
  { value: 'FE700103', label: '资金下拨' },
  { value: 'FE040103', label: '跨行转账' },
  { value: 'FE040113', label: '备付金转账' },
  { value: 'FE040403', label: '上海同城转账' },
  { value: 'FE040503', label: '上海支票圈存' },
  { value: 'FE040203', label: '跨行定时转账' },
  { value: 'FE050103', label: '行内批量转账' },
  { value: 'FE050204', label: '批量转账查询' },
  { value: 'FE011101', label: '常用往来账号' },
  { value: 'FE650108', label: '出金交易' },
  { value: 'FE650105', label: '入金交易' },
  { value: 'FE040609', label: '小额定期贷记业务' },
  { value: 'FE040603', label: '小额定期借记业务' },
  { value: 'FE380603', label: '行内次日转账' },
  { value: 'FE380103', label: '证书缴费' },
  { value: 'FE380107', label: '代处理证书缴费' },
  { value: 'FE380110', label: '证书缴费申请' },
  { value: 'FE380108', label: '证书缴费拒绝' },
  { value: 'FE380904', label: '证书费用自动扣划签约' },
  { value: 'FE380908', label: '证书费用自动扣划维护' },
  { value: 'FE060103', label: '交易审核' },
  { value: 'FE060201', label: '常用往来账号' },
  { value: 'FE070103', label: '集团服务单笔上划' },
  { value: 'FE070105', label: '定时单笔上划' },
  { value: 'FE470202', label: '集团服务批量上划' },
  { value: 'FE370303', label: '集团服务单笔下拨' },
  { value: 'FE070305', label: '定时单笔下拨' },
  { value: 'FE130404', label: '集团服务额度录入' },
  { value: 'FE130406', label: '集团服务额度撤销' },
  { value: 'FE130504', label: '集团服务授权账号' },
  { value: 'FE130603', label: '集团服务解除授权' },
  { value: 'FE080101', label: '工资文件上传' },
  { value: 'FE080201', label: '网上录入' },
  { value: 'FE080301', label: '发放结果查询' },
  { value: 'FE080103', label: '代发工资文件上传' },
  { value: 'FE080207', label: '代发工资网上录入' },
  { value: 'FE480403', label: '财务报销' },
  { value: 'FE080410', label: '新代发工资文件上传' },
  { value: 'FE040703', label: '批量跨行转账' },
  { value: 'FE100102', label: '活期转通知存款' },
  { value: 'FE100203', label: '通知存款预约' },
  { value: 'FE100303', label: '通知存款预约取消' },
  { value: 'FE100403', label: '通知存款支取' },
  { value: 'FE20current2Fixed3', label: '活期转定期' },
  { value: 'FE20fixed2Current3', label: '定期转活期' },
  { value: 'FE400005', label: '银企对账' },
  { value: '306000021', label: '银票出票登记退回' },
  { value: '306000022', label: '银票出票登记删除' },
  { value: '306000023', label: '银票出票登记' },
  { value: '30600006', label: '提示承兑申请' },
  { value: '30600010', label: '提示承兑撤销' },
  { value: '30600016', label: '提示收票申请' },
  { value: '30600020', label: '提示收票撤销' },
  { value: 'FE590315', label: '提示付款应答' },
  { value: '30600026', label: '撤票申请' },
  { value: '30600029', label: '承兑签收' },
  { value: '30600031', label: '付款签收' },
  { value: '30600032', label: '拒付' },
  { value: '30600034', label: '背书申请' },
  { value: '30600037', label: '背书撤回' },
  { value: '30600039', label: '被背书签收' },
  { value: '30600045', label: '删除保证信息' },
  { value: '30600047', label: '提示保证申请' },
  { value: '30600050', label: '撤销提示保证' },
  { value: 'FE590722', label: '保证应答' },
  { value: '30600059', label: '提示付款申请' },
  { value: '30600062', label: '提示付款撤回' },
  { value: '30600064', label: '贴现申请' },
  { value: '30600067', label: '贴现撤回' },
  { value: '30600069', label: '赎回签收' },
  { value: '30600071', label: '质押申请' },
  { value: '30600073', label: '质押撤销' },
  { value: '30600078', label: '质押签收' },
  { value: '30600080', label: '解质押申请' },
  { value: '30600082', label: '解质押撤销' },
  { value: '30600075', label: '解质签收' },
  { value: '30600085', label: '追索申请' },
  { value: '30600089', label: '追索申请撤回' },
  { value: '30600091', label: '同意清偿申请' },
  { value: '30600093', label: '清偿申请撤回' },
  { value: '30600087', label: '同意清偿回复' },
  { value: 'FE130704', label: '利率新增' },
  { value: 'FE130707', label: '利率修改' },
  { value: 'FE380404', label: '非税缴费' },
  { value: 'FE200304', label: '单位大额存单申购' },
  { value: 'FE200310', label: '单位大额存单支取' },
  { value: '30600114', label: '商票出票申请' },
  { value: '30600119', label: '扣款反馈' },
  { value: 'FE381109', label: '信用卡还款' },
  { value: 'FE080419', label: '挡板账号资金回退' },
  { value: 'FE200404', label: '定期通开户' },
  { value: 'FE200410', label: '定期通支取' }
]
const filedsName = [
  { value: '_AuthJnlNo', label: '流水号' },
  { value: '_Accept', label: '复核结果' },
  { value: 'AddAcDate', label: '挂入日期' },
  { value: 'AcBaseFlag', label: '基本账号标志' },
  { value: 'AcLevel', label: '账号级别' },
  { value: 'AcName', label: '付款人名称' },
  { value: 'AcNo', label: '付款账号' },
  { value: 'AcNo2', label: '收款账号' },
  { value: 'AcOpen', label: '账号开通标志' },
  { value: 'AcOpenbank', label: '账户开户行' },
  { value: 'AcStatus', label: '账户状态' },
  { value: 'AcTransferType', label: '账号转账类型' },
  { value: 'AcType', label: '账号类型' },
  { value: 'AcField', label: '账号范围' },
  { value: 'AcSalaryFlag', label: '代发工资标志' },
  { value: 'Addr', label: '转入省市' },
  { value: 'Address', label: '联系地址' },
  { value: 'BankTypeList', label: '转入银行' },
  { value: 'ProvinceList', label: '转入省' },
  { value: 'CityList', label: '转入市' },
  { value: 'PayeeBankList', label: '收款账户开户行' },
  { value: 'PayeeBankName', label: '转入银行' },
  { value: 'PayeeHDirBank', label: '联行行号' },
  { value: 'AuthAmt', label: ' 授权等级对应的金额' },
  { value: 'AuthLevel', label: '授权等级' },
  { value: 'AuthAcNoType', label: '授权账号类别' },
  { value: 'AcSourceCifNo', label: '账号来源客户号' },
  { value: 'AcAppendChannel', label: '子公司账号加挂渠道' },
  { value: 'AuthCode', label: '证书授权码' },
  { value: 'ApplyName', label: '申请人姓名' },
  { value: 'AcProvince2', label: '转入省市' },
  { value: 'AcBank2', label: '转入银行' },
  { value: 'AuthType', label: '权限类型' },
  { value: 'BankType', label: '是否大连银行账号' },
  { value: 'Mobile', label: '联系电话' },
  { value: 'Bank', label: '转入银行' },
  { value: 'BankUserId', label: '银行操作员ID' },
  { value: 'BankChecker', label: '银行复核员ID' },
  { value: 'BankOpenUserId', label: '开通经办员ID' },
  { value: 'BatchCounter', label: '总交易笔数' },
  { value: 'BatchAmount', label: '总交易金额' },
  { value: 'BatchAcNo', label: '账号组' },
  { value: 'BranchId', label: '分行号' },
  { value: 'BranchName', label: '分行名称' },
  { value: 'BossName', label: '法人代表姓名' },
  { value: 'BossIdType', label: '法人证件类型' },
  { value: 'BossIdNo', label: '法人证件号码' },
  { value: 'BeginDate', label: '开始日期' },
  { value: 'BeginTime', label: '开始时间' },
  { value: 'BeginAmount', label: '起始金额' },
  { value: 'CertDN', label: '证书DN' },
  { value: 'CertNo', label: '证书序号' },
  { value: 'CertNum', label: '已发放证书数量' },
  { value: 'CertType', label: '证书类型' },
  { value: 'CertId', label: '证书ID' },
  { value: 'CertDate', label: '证书申请日期' },
  { value: 'CertStatus', label: '证书状态' },
  { value: 'Cellphone', label: '手机号码' },
  { value: 'CheckJnlNo', label: '复核交易流水号' },
  { value: 'CifEnglishName', label: '企业英文名' },
  { value: 'CifShortName', label: '企业简称' },
  { value: 'CifManageFlag', label: '是否银行代理' },
  { value: 'CifName', label: '企业名称' },
  { value: 'CifName2', label: '转入企业名称' },
  { value: 'CifNo', label: '企业客户号' },
  { value: 'CifNo2', label: '转入企业客户号' },
  { value: 'CifStatus', label: '网银客户状态' },
  { value: 'CifType', label: '客户类型' },
  { value: 'CifLinkMan', label: '客户联系人' },
  { value: 'CifAuthFlag', label: '客户审核是否有序' },
  { value: 'CifAuthLevel', label: '客户审核级别' },
  { value: 'CifIdType', label: '客户证件类型' },
  { value: 'CifIdNo', label: '客户证件编号' },
  { value: 'CifLicenseNo', label: '营业执照号码' },
  { value: 'CifLicenseDate', label: '营业执照有效日期' },
  { value: 'CifForeignNo', label: '企业外管代码' },
  { value: 'CifFELicenseNo', label: '外汇许可证号' },
  { value: 'CifIsGroupPartner', label: '是否光大集团股东客户' },
  { value: 'CifIsGroupRelate', label: '是否光大集团关联单位' },
  { value: 'CifCode', label: '企业代码' },
  { value: 'CloseDate', label: '销户日期' },
  { value: 'CurrType', label: '钞/汇标志' },
  { value: 'Currency', label: '货币代号' },
  { value: 'Data', label: '交易相关数据' },
  { value: 'Date', label: '日期' },
  { value: 'Dept', label: '部门' },
  { value: 'DeptId', label: '机构号' },
  { value: 'DelAcDate', label: '解挂日期' },
  { value: 'Email', label: '电子邮件地址' },
  { value: 'EndDate', label: '结束日期' },
  { value: 'BespeakDate', label: '通知日期' },
  { value: 'BespeakDrawDate', label: '支取日期' },
  { value: 'EndTime', label: '交易结束时间' },
  { value: 'EndAmount', label: '结束金额' },
  { value: 'Fax', label: '传真' },
  { value: 'FileName', label: '文件名称' },
  { value: 'FilePath', label: '服务器文件名称' },
  { value: 'FriendAcNo', label: '友好账号' },
  { value: 'Fund', label: '基金' },
  { value: 'FundCode', label: '基金代号' },
  { value: 'FundName', label: '基金名称' },
  { value: 'FundShare', label: '基金份额' },
  { value: 'OtherFundCode', label: '其他基金代号' },
  { value: 'IsCheck', label: '是否需要银行复核' },
  { value: 'IdNo', label: '证件号码' },
  { value: 'IdType', label: '证件类型' },
  { value: 'IpAddr', label: '来源IP' },
  { value: 'JnlAcNo2', label: '转入账号' },
  { value: 'JnlAcNo', label: '转出账号' },
  { value: 'JnlDateTime', label: '交易发生时间' },
  { value: 'JnlNo', label: '交易流水号' },
  { value: 'JnlStatus', label: '交易状态' },
  { value: 'LastLogin', label: '最近一次登录时间' },
  { value: 'List', label: '交易列表' },
  { value: 'LmtDate', label: '每日交易限额最后更新日' },
  { value: 'LmtPerDay', label: '单日支付限额' },
  { value: 'LoginIp', label: '来源IP' },
  { value: 'Level1', label: '一级审核' },
  { value: 'Level2', label: '二级审核' },
  { value: 'Level3', label: '三级审核' },
  { value: 'Level4', label: '四级审核' },
  { value: 'Name', label: '姓名' },
  { value: 'NewPassword', label: '新密码' },
  { value: 'NewRepeatPassword', label: '新密码(重复)' },
  { value: 'NewPasswordRepeat', label: '新密码(重复)' },
  { value: 'NotaxCifCode', label: '执收单位系统编码' },
  { value: 'NotaxCifName', label: '执收单位名称' },
  { value: 'Number', label: '笔数' },
  { value: 'NoteTypeStr', label: '通知类型' },
  { value: 'OpenDate', label: '开通日期' },
  { value: 'OrganId', label: '机构号' },
  { value: 'OrganName', label: '机构名称' },
  { value: 'OrganLevel', label: '机构级别' },
  { value: 'OperType', label: '操作类型' },
  { value: 'OperType1', label: '操作类型' },
  { value: 'OperType2', label: '操作类型' },
  { value: 'OperType3', label: '操作类型' },
  { value: 'Password', label: '登录密码' },
  { value: 'ParentCifNo', label: '母公司客户号' },
  { value: 'Remark', label: '备注' },
  { value: 'Purpose', label: '付款用途' },
  { value: 'RegisterDate', label: '开户日期' },
  { value: 'RejCode', label: '交易拒绝码' },
  { value: 'ResetPassword', label: '密码重置开关' },
  { value: 'RoleId', label: '角色代号' },
  { value: 'RoleList', label: '角色列表' },
  { value: 'RoleAppearFlag', label: '角色功能隐藏标志' },
  { value: 'RootFlag', label: '超级管理员标志' },
  { value: 'RefNo', label: '证书参考号' },
  { value: 'Sex', label: '性别' },
  { value: 'SelfAcNo', label: '个人账号' },
  { value: 'SelfAmount', label: '工资金额' },
  { value: 'SeqNo', label: '交易流水号' },
  { value: 'SeqType', label: '计数器类型' },
  { value: 'StartDate', label: '起始日期' },
  { value: 'SumPerDay', label: '单日支付限额计数器' },
  { value: 'SettleFlag', label: '对账标志' },
  { value: 'SubCifNo', label: '子公司客户号' },
  { value: 'SubAcNo', label: '子公司账号' },
  { value: 'SubAcType', label: '子公司账号类型' },
  { value: 'SubAcName', label: '子公司账号名称' },
  { value: 'SubAcTransferType', label: '子公司账号转账类型' },
  { value: 'SubDeptId', label: '子公司账号机构号' },
  { value: 'SubIdType', label: '子公司证件类型' },
  { value: 'SubIdNo', label: '子公司证件号码' },
  { value: 'SubAcBaseFlag', label: '子公司基本账号标志' },
  { value: 'SubCurrency', label: '子账号币种' },
  { value: 'TransMode', label: '交易类别' },
  { value: 'TransCode', label: '交易码' },
  { value: 'TelNo', label: '联系电话' },
  { value: 'Telephone', label: '电话号码' },
  { value: 'TellerId', label: '柜员号' },
  { value: 'TellerCloseDate', label: '注销日期' },
  { value: 'TransCtrl', label: '转账控制' },
  { value: 'TransName', label: '交易名称' },
  { value: 'TransNo', label: '流水号' },
  { value: 'TransDate', label: '交易时间' },
  { value: 'TransferLmt', label: '单笔支付限额' },
  { value: 'TrsStatus', label: '交易状态' },
  { value: 'TrsDateTime', label: '交易发生时间' },
  { value: 'UploadFile', label: '上传文件' },
  { value: 'UserAcRight', label: '账号权限' },
  { value: 'UserId', label: '用户号' },
  { value: 'UserId2', label: '管理员2号码' },
  { value: 'UserLevel', label: '用户级别' },
  { value: 'UserGroupId', label: '用户组别' },
  { value: 'UserStatus', label: '操作员状态' },
  { value: 'UserType', label: '用户类型' },
  { value: 'UserName2', label: '管理员2姓名' },
  { value: 'UserApplyName', label: '申请人姓名' },
  { value: 'UserApplyUnit', label: '申请人单位' },
  { value: 'UserApplyIdType', label: '申请人证件类型' },
  { value: 'UserApplyIdNo', label: '申请人证件号码' },
  { value: 'UserApplyDate', label: '申请日期' },
  { value: 'ZipCode', label: '邮政编码' },
  { value: 'OccurAmount', label: '发生额' },
  { value: 'BusinessNo', label: '流水号' },
  { value: 'BusinessDate', label: '交易日期' },
  { value: 'AuthqueueAcno', label: '付款账号' },
  { value: 'TellerRole', label: '柜员权限' },
  { value: 'CellPhoneNo', label: '手机号码' },
  { value: 'ProfitShareMode', label: '分红方式' },
  { value: 'preAmount', label: '单笔转账金额' },
  { value: 'totalCount', label: '批量转账总笔数' },
  { value: 'LevelGroup', label: '审核流程组' },
  { value: 'level', label: '审核级别' },
  { value: 'MsgTitle', label: '留言主题' },
  { value: 'MsgContent', label: '留言内容' },
  { value: 'NewUserAlias', label: '新用户别名' },
  { value: 'NewCifAlias', label: '新企业别名' },
  { value: 'ConfirmNo', label: '原认购/申购合同号' },
  { value: 'UserPhone', label: '用户联系电话' },
  { value: 'AccNoList', label: '单笔支付限额' },
  { value: 'AcLimit', label: '支付限额' },
  { value: '_ReentryJnlNo', label: '退回交易流水号' },
  { value: '_ReentryJnlDate', label: '退回交易录入日期' },
  { value: 'DrawDate', label: '预约支取日期' },
  { value: 'AuthAcName ', label: '授权账号名称' },
  { value: 'AuthCifName', label: '被授权客户名称' },
  { value: 'AuthCifNo', label: '被授权客户号' },
  { value: 'AuthAcNo', label: '授权账号' },
  { value: 'ActypeNo', label: '账号业务代号' },
  { value: 'ActypeName', label: '账号业务说明' },
  { value: 'OldAcNo2', label: '收款账号' },
  { value: 'mylist', label: '大额设置列表' },
  { value: 'LargeAmount', label: '大额额度域' },
  { value: 'FuncCode', label: '功能代码' },
  { value: 'FuncName', label: '功能名称' },
  { value: 'TACode', label: '注册登记机构代码' },
  { value: 'TimerDate', label: '定时日期' },
  { value: 'AUTHQUEUE_NO', label: '被解除定时流水号' },
  { value: 'AUTHQUEUE_DATE', label: '被解除定时交易录入日期' },
  { value: 'CreditNo', label: '凭证号' },
  { value: 'TransType', label: '转账类型' },
  { value: 'ExtendFlg', label: '到期是否自动转存' },
  { value: 'FixedDateLen', label: '定期存款存期' },
  { value: 'InterestId', label: '定期存款存期' },
  { value: 'InterestStr', label: '存期' },
  { value: 'BeginInterDate', label: '开户日期' },
  { value: 'AcBalance', label: '账户余额' },
  { value: 'TranPwd', label: '账号取款密码' },
  { value: 'TimerStatus', label: '定时业务状态' },
  { value: 'JnlTrsStatus1', label: '交易状态' },
  { value: 'RUNTIME', label: '执行时间' },
  { value: 'VtacSeqNo', label: '虚账号顺序号' },
  { value: 'VtacNo', label: '虚账号' },
  { value: 'VtacName', label: '虚账号名称' },
  { value: 'LinkMan', label: '联系人' },
  { value: 'VtacNo1', label: '付款账号' },
  { value: 'VtacNo2', label: '收款账号' },
  { value: 'StockMerchantNo', label: '券商编号' },
  { value: 'StockMerchantName', label: '券商名称' },
  { value: 'BusinessType', label: '业务类别' },
  { value: 'MerchantAcNo', label: '证券资金账号' },
  { value: 'BookAcNo', label: '转账预约号' },
  { value: 'VerifierId', label: '审核员' },
  { value: 'InputAbstract', label: '摘要' },
  { value: 'ChargeAmount', label: '手续费' },
  { value: 'SndBranchId', label: '账号机构' },
  { value: 'CollOrgNo', label: '征收机关代码' },
  { value: 'AgreeNo', label: '协议编号' },
  { value: 'EntNo', label: '企业代码' },
  { value: 'PayNo', label: '纳税人计算机代码' },
  { value: 'OldCollOrgNo', label: '征收机关代码' },
  { value: 'OldEntNo', label: '企业代码' },
  { value: 'OldPayNo', label: '纳税人计算机代码' },
  { value: 'DeclareNo', label: '申报序号' },
  { value: 'TaxPayerName', label: '纳税人名称' },
  { value: 'AcOrganName', label: '付款人开户行名称' },
  { value: 'TaxKindNo', label: '税种代码' },
  { value: 'TaxItem', label: '税目代码' },
  { value: 'TaxNum', label: '课税数量' },
  { value: 'TotalAmount', label: '税种总金额' },
  { value: 'AmountCN', label: '交易金额（大写）' },
  { value: 'BeginDateTax', label: '税款所属日期起' },
  { value: 'EndDateTax', label: '税款所属日期止' },
  { value: 'CountAmount', label: '计税金额' },
  { value: 'PayAmount', label: '实缴金额' },
  { value: 'TaxFundType', label: '税款类型' },
  { value: 'checked', label: '是否缴税' },
  { value: 'TaxKindSequence', label: '税种序号' },
  { value: 'TaxKindName', label: '税种名称' },
  { value: 'USR', label: '用户号' },
  { value: 'NAM', label: '用户名' },
  { value: 'TEL', label: '电话号码' },
  { value: 'ELM', label: '电子邮件' },
  { value: 'MANEXT', label: '客户号' },
  { value: 'PRIFLG', label: '授权级别' },
  { value: 'RELAMT', label: '授权金额' },
  { value: 'RELCUR', label: '授权币种' },
  { value: 'PRF', label: '用户权限角色' },
  { value: 'SECLIF', label: '进口信用证' },
  { value: 'SECLEF', label: '出口信用证' },
  { value: 'SECCIF', label: '进口代收' },
  { value: 'SECCEF', label: '出口托收' },
  { value: 'SECGAF', label: '进口保函' },
  { value: 'SECLTF', label: '转让信用证' },
  { value: 'SECGEF', label: '出口保函' },
  { value: 'SECOTF', label: '其他交易' },
  { value: 'UIL', label: '所用语言' },
  { value: 'HLPUIL', label: '在线帮助语言' },
  { value: 'EXTKEY', label: '机构号' },
  { value: 'DonRegAmount', label: '冠名限制金额' },
  { value: 'DonRecptAmount', label: '收据限制金额' },
  { value: 'AgentfeeCityNo', label: '缴费城市代码' },
  { value: 'AgentfeeCityName', label: '缴费城市名称' },
  { value: 'AgentfeeCityCode', label: '缴费城市前置代码' },
  { value: 'AgentfeeBusinessNo', label: '缴费业务代码' },
  { value: 'AgentfeeBusinessName', label: '缴费业务名称' },
  { value: 'ItemNo', label: '缴费项目编号' },
  { value: 'ItemName', label: '缴费项目名称' },
  { value: 'ItemTips', label: '缴费项目说明' },
  { value: 'ItemUnit', label: '收费单位' },
  { value: 'ItemType', label: '缴费方式' },
  { value: 'ItemTrancode1', label: '查询交易码' },
  { value: 'ItemTrancode2', label: '缴费交易码' },
  { value: 'ItemRules', label: '缴费规则说明' },
  { value: 'ItemProceeNo', label: '流程编号' },
  { value: 'ItemInputsNo', label: '输入域个数' },
  { value: 'ItemInput1', label: '输入域1名称' },
  { value: 'ItemInput2', label: '输入域2名称' },
  { value: 'ItemInput3', label: '输入域3名称' },
  { value: 'ItemLimitFlag', label: '是否限制输入标志' },
  { value: 'ItemLimitRules', label: '输入控制规则' },
  { value: 'ItemPreserve1', label: '预留字段1' },
  { value: 'ItemPreserve2', label: '预留字段2' },
  { value: 'ItemPreserve3', label: '预留字段3' },
  { value: 'cryptProv', label: 'CSP' },
  { value: 'selectReurnFeeNo', label: '退货交易' },
  { value: 'MerchantCert', label: '商户证书' },
  { value: 'MaxAmount', label: '最大金额' },
  { value: 'MinAmount', label: '最小金额' },
  { value: 'TransSeqNo', label: '订单号' },
  { value: 'MerchantReturnFee', label: '退货金额' },
  { value: 'Voucher_NO', label: '电子回单号' },
  { value: 'confirm', label: '验证码' },
  { value: 'NoticePhone', label: '手机号码' },
  { value: 'Voucherno', label: '对账单编号' },
  { value: 'EbillResult', label: '对账结果' },
  { value: 'Ifnotaccount', label: '是否达账' },
  { value: 'EbillType', label: '未达账类型' },
  { value: 'Credit', label: '当期余额' },
  { value: 'Docdate', label: '对账日期' },
  { value: 'Vchno', label: '凭证号' },
  { value: 'Charge', label: '手续费' },
  { value: 'Postage', label: '邮电费' },
  { value: 'EbillCifName', label: '对账联系人' },
  { value: 'EbillCifPhone', label: '联系电话' },
  { value: 'EbillMobPhone', label: '联系人手机' },
  { value: 'cust_no', label: '客户号' },
  { value: 'cust_account', label: '客户账号' },
  { value: 'remitter', label: '出票人名称' },
  { value: 'payee', label: '收款人名称' },
  { value: 'draweeBankName', label: '承兑人名称' },
  { value: 'dueDt', label: '票面到期日' },
  { value: 'billNo', label: '票据号码' },
  { value: 'billClass', label: '票据类型' },
  { value: 'billType', label: '票据种类' },
  { value: 'acptDt', label: '出票日期' },
  { value: 'billMoney', label: '票面金额' },
  { value: 'acceptorBankNo', label: '票面承兑行行号' },
  { value: 'warteeSign', label: '网银电子签名' },
  { value: 'responseValue', label: '签收意见(1表示签收，其它为拒绝)' },
  { value: 'signCase', label: '拒付代码' },
  { value: 'rejectReason', label: '拒付原因' },
  { value: 'loanNo', label: '客户账号' },
  { value: 'maxAcptDt', label: '出票日期上限' },
  { value: 'minAcptDt', label: '出票日期下限' },
  { value: 'maxDueDt', label: '到期日上限' },
  { value: 'minDueDt', label: '到期日下限' },
  { value: 'maxBillMoney', label: '金额上限' },
  { value: 'minBillMoney', label: '金额下限' },
  { value: 'outBillPerson', label: '出票人' },
  { value: 'acceptor', label: '承兑人' },
  { value: 'status', label: '状态' },
  { value: 'endorseeName', label: '被背书人名称' },
  { value: 'endorseeAcctNo', label: '被背书人账号' },
  { value: 'endorseeBankNo', label: '被背书人开户行号' },
  { value: 'cessionFlag', label: '转让标记' },
  { value: 'electronUnderwrite', label: '电子签名' },
  { value: 'fromRemark', label: '背书人备注' },
  { value: 'endoresee', label: '被背书人' },
  { value: 'netBankCustNo', label: '网银客户号' },
  { value: 'endoreser', label: '背书人' },
  { value: 'toRemark', label: '被背书人备注' },
  { value: 'ensureType', label: '保证类型' },
  { value: 'ensureId', label: '登记中心保证ID' },
  { value: 'warteeDt', label: '保证申请日期' },
  { value: 'WarteeCode', label: '被保证人组织机构代码' },
  { value: 'WarteeName', label: '被保证人名称' },
  { value: 'warteeAcctNo', label: '被保证人账号' },
  { value: 'warteeBankNo', label: '被保证人开户行' },
  { value: 'guarntrCustName', label: '保证人名称' },
  { value: 'guarntrAcctNo', label: '保证人账号' },
  { value: 'guarntrBankNo', label: '保证人行号' },
  { value: 'ensureApplyDt', label: '保证申请日期' },
  { value: 'warteeOrgCode', label: '被保证人组织机构代码' },
  { value: 'warteeName', label: '被保证人客户名称' },
  { value: 'guarntrCustNo', label: '保证人客户号' },
  { value: 'overDueFlag', label: '是否已逾期' },
  { value: 'promptPaymentDate', label: '提示付款申请日期' },
  { value: 'overdueReason', label: '逾期原因说明' },
  { value: 'settlementFlag', label: '线上清算标记' },
  { value: 'protestCode', label: '拒付代码' },
  { value: 'protestFlag', label: '拒付标志' },
  { value: 'recallReason', label: '撤回原因' },
  { value: 'holdAcctNo', label: '账户' },
  { value: 'OperNo', label: '网银操作员号' },
  { value: 'orderFiled', label: '排序选项' },
  { value: 'toderType', label: '排序类型' },
  { value: 'custNo', label: '客户号' },
  { value: 'custNO', label: '客户号' },
  { value: 'minBillAmount', label: '票面金额下限' },
  { value: 'maxBillAmount', label: '票面金额上限' },
  { value: 'orderType', label: '排序类型' },
  { value: 'outBillDate', label: '出票日期' },
  { value: 'endBillDate', label: '到期日' },
  { value: 'billAmount', label: '票面金额' },
  { value: 'operStatus', label: '状态' },
  { value: 'OperNo', label: '网银操作员' },
  { value: 'custAcctNo', label: '客户账号' },
  { value: 'elecSign', label: '电子签名' },
  { value: 'holdCustNo', label: '客户号' },
  { value: 'holdAcctNo', label: '客户账号' },
  { value: 'toCustNo', label: '客户号' },
  { value: 'toAcctNo', label: '客户账号' },
  { value: 'pawneeName', label: '质权人名称' },
  { value: 'pawneeAccount', label: '质权人账号' },
  { value: 'pawneeBankNo', label: '质权人开户行行号' },
  { value: 'custAccount', label: '客户账号' },
  { value: 'responseFlag', label: '签收意见' },
  { value: 'recourserAcctNo', label: '追索人账号' },
  { value: 'name', label: '客户名称' },
  { value: 'bankNo', label: '行号' },
  { value: 'acctNo', label: '账号' },
  { value: 'recourseeType', label: '可被追索人类型' },
  { value: 'orgCode', label: '可被追索人组织机构代码' },
  { value: 'recourseDate', label: '追索日期' },
  { value: 'recourserAcctNo', label: '追索人账号' },
  { value: 'recourserName', label: '追索人名称' },
  { value: 'reBankNo', label: '追索人行号' },
  { value: 'recourseMoney', label: '追索金额' },
  { value: 'recourseAcctNo', label: '被追索人账号' },
  { value: 'recourseBankNo', label: '被追索人开户行行号' },
  { value: 'recourseReasonCode', label: '追索理由代码' },
  { value: 'recourseeName', label: '被追索人名称' },
  { value: 'recourseRemark', label: '追索备注' },
  { value: 'acptOrgCode', label: '追索人组织机构代码' },
  { value: 'rcvgOrgCode', label: '被追索人组织机构代码' },
  { value: 'recourseId', label: '追索id' },
  { value: 'recourseType', label: '追索类型' },
  { value: 'recourseDt', label: '追索通知日期' },
  { value: 'recourseCustNo', label: '追索人客户号' },
  { value: 'recourseSign', label: '追索人电子签名' },
  { value: 'recourseBankNo', label: '追索人开户行行号' },
  { value: 'recourseAcptBankNo', label: '追索人承接行行号' },
  { value: 'recourseOrgCode', label: '追索人组织机构代码' },
  { value: 'recourseReason', label: '追索理由代码' },
  { value: 'recourseRemark', label: '追索通知备注' },
  { value: 'rcvgCustNo', label: '被追索人客户号' },
  { value: 'rcvgAcctNo', label: '被追索人账号' },
  { value: 'rcvgBankNo', label: '被追索人开户行行号' },
  { value: 'rcvgName', label: '被追索人全称' },
  { value: 'rcvgAcptBankNo', label: '被追索人承接行行号' },
  { value: 'agreeDt', label: '同意清偿日期' },
  { value: 'agreeMoney', label: '同意清偿金额' },
  { value: 'agreeSign', label: '同意清偿人电子签名' },
  { value: 'agreeRemark', label: '同意清偿备注' },
  { value: 'disVARCHAR2geDate', label: '同意清偿日期' },
  { value: 'dischargeMoney', label: '同意清偿金额' },
  { value: 'disgeDate', label: '同意清偿日期' },
  { value: 'rgct_id', label: '登记中心票据ID' },
  { value: 'rgct_ids', label: '登记中心票据ID' },
  { value: 'source', label: '发起来源' },
  { value: 'ids', label: '登记中心票据ID' },
  { value: 'inAcctNo', label: '入账账号' },
  { value: 'discRate', label: '贴现利率' },
  { value: 'flag', label: '处理标识' },
  { value: 'rgctIds', label: '登记中心票据ID' },
  { value: 'Ids', label: '登记中心票据ID' },
  { value: 'Id', label: '登记中心票据ID' },
  { value: 'id', label: '登记中心票据ID' },
  { value: 'rgctId', label: '登记中心票据ID' },
  { value: 'Sysid', label: '系统编号' },
  { value: 'DiscType', label: '贴现方式' },
  { value: 'discDate', label: '贴现日期' },
  { value: 'redeemOpenDate', label: '赎回开放日' },
  { value: 'redeemEndDate', label: '赎回截止日' },
  { value: 'redeemRate', label: '赎回利率' },
  { value: 'toCustName', label: '贴入行' },
  { value: 'toCustAcct', label: '贴入行账号' },
  { value: 'batch_no', label: '批次号' },
  { value: 'inBankNo', label: '入账行号' },
  { value: 'answerFlag', label: '应答意见（1同意、2拒绝）' },
  { value: 'billId', label: '登记中心票据ID' },
  { value: 'Plywbh', label: '合同号' },
  { value: 'Ywbh', label: '合同号' },
  { value: 'Jyje', label: '总金额' },
  { value: 'Zbs', label: '总笔数' },
  { value: 'TemplateNo', label: '模板名称' },
  { value: 'TemplateName', label: '模板名称' },
  { value: 'ParAcNo', label: '主公司账号' },
  { value: 'ParAcName', label: '主公司账号名称' },
  { value: 'SonAcNo', label: '子公司账号' },
  { value: 'SonAcName', label: '子公司账号名称' },
  { value: 'UpRate', label: '上划利率' },
  { value: 'DownRate', label: '下拨利率' },
  { value: 'Khmc', label: '交易商户名' },
  { value: 'Apex2', label: '交易市场名称' },
  { value: 'Khbh', label: '交易商交易资金账号' },
  { value: 'Yhbh', label: '签约协议编号' },
  { value: 'AcNo01', label: '交易商银行账号' },
  { value: 'FE650105', label: '上海航运入金交易' },
  { value: 'FE650107', label: '上海航运出金交易' },
  { value: 'FeeAuthJnlNo', label: '流水号' },
  { value: 'newName', label: '新姓名' },
  { value: 'CleanBankNo', label: '接收清算行' },
  { value: 'RecvorigbrNo', label: '接收开户行' },
  { value: 'PayerAcc', label: '付款账号' },
  { value: 'VotesDate', label: '出票日期' },
  { value: 'Billno', label: '票据号码' },
  { value: 'Desc', label: '付款用途' },
  { value: 'rsplimit', label: '回执天数' },
  { value: 'userNo', label: '操作员' },
  { value: 'payCode', label: '缴款码' },
  { value: 'chgAgenName', label: '执收单位名称' },
  { value: 'chgAgenCode', label: '执收单位编码' },
  { value: 'info', label: '摘要' },
  { value: 'StruRates', label: '年利率（%）' },
  { value: 'StruRatesFlag', label: '付息方式' },
  { value: 'StruBeginDate', label: '开户日期' },
  { value: 'StruEndDate', label: '到期日期' },
  { value: 'RateSsuan', label: '利息总额' },
  { value: 'TestCode', label: '随机码' },
  { value: 'TelPhone', label: '手机号' },
  { value: 'ContNo', label: '合同号' },
  { value: 'MsgCode', label: '验证码' },
  { value: 'TransType', label: '业务类型' },
  { value: 'CancelJnlDate', label: '定时转账录入日期' },
  { value: 'CancelJnlNo', label: '定时转账录入流水号' },
  { value: 'CancelTimer3', label: '定时转账待处理时间' },
  { value: 'FinStewardFlag', label: '查询类型' },
  { value: 'SubAcNo2', label: '收款账号序号' },
  { value: 'SubAcNo1', label: '付款账号序号' },
  { value: 'rate', label: '年利率（%）' },
  { value: 'cunqiiii', label: '存期' },
  { value: 'chapqcmc', label: '产品名称' },
  { value: 'remitterAcctNo', label: '出票人开户账号' },
  { value: 'remitterBankNo', label: '出票人开户行行号' },
  { value: 'remitterBankName', label: '出票人开户行行名' },
  { value: 'remitterorgCode', label: '出票人组织机构代码证' },
  { value: 'payeeAcctNo', label: '收款人开户账号' },
  { value: 'PayeeBankName2', label: '收款账户开户行行名' },
  { value: 'PayeeHDirBank2', label: '收款账户开户行行号' },
  { value: 'acceptorAcctNo', label: '承兑人账号' },
  { value: 'acceptorBankName', label: '承兑人开户行名称' },
  { value: 'billMoney2', label: '申请承兑金额' },
  { value: 'remark2', label: '出票登记备注' },
  { value: 'ForbidFlagForSpRegis', label: '允许背书' },
  { value: 'UserKeyId', label: '证书Id' },
  { value: 'AutoSign', label: '自动扣划标志' },
  { value: 'signUpMark', label: '反馈意见(1同意、2拒绝)' },
  { value: 'EmerGenFlag', label: '加急标识' },
  { value: 'DepositPeriod', label: '存期' },
  { value: 'BreakBeginDate', label: '提前支取开始日期' },
  { value: 'TimeBeginDate', label: '定期通开户日期' },
  { value: 'TimeEndDate', label: '定期通到期日期' },
  { value: 'AC_NAME', label: '付款人名称' },
  { value: 'AC_ORGANNAME', label: '账户开户行' },
  { value: 'AcName2', label: '收款人名称' },
  { value: 'Amount', label: '交易金额' },
  { value: 'FriendAcNo', label: '账号' },
  { value: 'JnlTrsStatus', label: '交易状态' },
  { value: 'draweeBank', label: '付款行名称' },
  { value: 'endAcptDt', label: '出票日期上限' },
  { value: 'beginAcptDt', label: '出票日期下限' },
  { value: 'recourseeAcctNo', label: '被追索人账号' },
  { value: 'recourseeBankNo', label: '被追索人开户行行号' },
  { value: 'recourseAcctNo', label: '追索人账号' },
  { value: 'NotifyType', label: '通知类型' },
  { value: 'PINPWD', label: '交易密码' },
  { value: 'EE0112', label: '行内转账' },
  { value: 'EE0122', label: '跨行转账' },
  { value: 'EE015003', label: '大连非税缴费' },
  { value: 'EE021003', label: '活期转定期' },
  { value: 'EE022003', label: '定期转活期' },
  { value: 'EE023002', label: '活期转通知存款' },
  { value: 'EP012002', label: '行内转账' },
  { value: 'EP012005', label: '行内次日转账' },
  { value: 'EP013002', label: '跨行转账' },
  { value: 'EP013004', label: '跨行定时转账' },
  { value: 'EP011002', label: '活期互转' },
  { value: 'EP021003', label: '活期转定期' },
  { value: 'EP022004', label: '定期转活期' },
  { value: 'EP023003', label: '活期转通知存款' },
  { value: 'FE100203', label: '通知存款预约' },
  { value: 'FE100303', label: '通知存款取消预约' },
  { value: 'FE100403', label: '通知存款支取' },
  { value: 'EP0250104', label: '通知存款支取' },
  { value: 'EP0250203', label: '通知存款预约' },
  { value: 'EE040203', label: '跨行定时转账' },
  { value: 'EE011201', label: '行内定时转账' },
  { value: 'EE100203', label: '通知存款预约' },
  { value: 'EE100303', label: '通知存款取消预约' },
  { value: 'EE100403', label: '通知存款支取' },
  { value: 'EP170303', label: '小额实时转账' },
  { value: 'EE0322', label: '代发工资' },
  { value: 'EE0134', label: '修改往来账号' },
  { value: 'EE0135', label: '删除往来账号' },
  { value: 'ContactName', label: '联系人' },
  { value: 'ApplyAmt', label: '申请授信金额' },
  { value: 'CellPhone', label: '联系手机' },
  { value: 'Phone', label: '联系电话' },
  { value: 'AcNo2Name', label: '转入账号户名' },
  { value: 'AC_NO', label: '付款账号' },
  { value: 'AC_TYPE', label: '付款账号类型' },
  { value: 'AC_NO2', label: '收款账号' },
  { value: 'EE0162', label: '上海同城转账' },
  { value: 'EE0172', label: '上海支票圈存' },
  { value: 'EE018003', label: '定时交易撤销' },
  { value: 'EP018003', label: '定时交易撤销' },
  { value: 'EE0343', label: '挡板账号资金回退' },
  { value: 'refNo', label: '证书参考号' },
  { value: 'authcode', label: '证书授权码' },
  { value: 'EmerGenFlag', label: '加急标识' }
]
const trsCh_Entity = getEntity(trsEntity)
const stdinfotyp_Type = [
  { value: '01', label: '提示承兑' },
  { value: '02', label: '提示收票' },
  { value: '03', label: '背书' },
  { value: '04', label: '贴现' },
  { value: '05', label: '回购式贴现赎回' },
  { value: '06', label: '转贴现' },
  { value: '07', label: '回购式转贴现赎回' },
  { value: '08', label: '再贴现' },
  { value: '09', label: '回购式再贴现赎回' },
  { value: '10', label: '央行卖出商业汇票' },
  { value: '11', label: '保证' },
  { value: '12', label: '质押' },
  { value: '13', label: '质押解除' },
  { value: '14', label: '提示付款' },
  { value: '15', label: '逾期提示付款' },
  { value: '16', label: '追索通知' }
]
const stdinfotyp_entity = getEntity(stdinfotyp_Type)
const AcType = [
  { value: '0', label: '其他存款账号' },
  { value: '1', label: '基本存款账号' },
  { value: '2', label: '一般存款账号' },
  { value: '3', label: '专用存款账号' },
  { value: '4', label: '临时存款账号' },
  { value: '6', label: '经常项目' },
  { value: '7', label: '资本项目' },
  { value: '8', label: '贷款存款账号' },
  { value: '9', label: '内部存款账号' },
  { value: 'a', label: '对公定期户' },
  { value: 'b', label: '对公定期户' }
]
const AcType_Entity = getEntity(AcType)
const AcStatus = [
  { value: '0', label: '正常' },
  { value: '1', label: '隐藏' },
  { value: '2', label: '销户' },
  { value: '3', label: '未开通' }
]
const AcStatus_Entity = getEntity(AcStatus)
const UserStatus = [
  { value: '0', label: '正常' },
  { value: '1', label: '注销' },
  { value: '9', label: '需要重置密码' }
]
const UserStatus_Entity = getEntity(UserStatus)
const TransactionType = [
  { value: '0000', label: '全部' },
  { value: '8509', label: '基金认购' },
  { value: '8510', label: '基金申购' },
  { value: '8512', label: '基金赎回' },
  { value: '8513', label: '基金预约赎回' },
  { value: '8514', label: '基金转换' }
]
const TransactionType_Entity = getEntity(TransactionType)
const MintRedeemDealFlag = [
  { value: '0', label: '取消' },
  { value: '1', label: '顺延' }
]
const MintRedeemDealFlag_Entity = getEntity(MintRedeemDealFlag)
const ProfitShareMode = [
  { value: '0', label: '自动再投资' },
  { value: '1', label: '现金红利' }
]
const ProfitShareMode_Entity = getEntity(ProfitShareMode)
const MsgType = [
  { value: '1', label: '投诉' },
  { value: '2', label: '表扬' },
  { value: '3', label: '建议' },
  { value: '4', label: '预约' }
]
const MsgType_Entity = getEntity(MsgType)
const EbillResult = [
  { value: '1', label: '相符' },
  { value: '0', label: '不相符' }
]
const EbillResult_Entity = getEntity(EbillResult)
const EbillType = [
  { value: '1', label: '企业已收，银行未收' },
  { value: '2', label: '企业已付，银行未付' },
  { value: '3', label: '银行已收，企业未收' },
  { value: '4', label: '银行已付，企业未付' }
]
const EbillType_Entity = getEntity(EbillType)
const NoteType = [
  { value: '201', label: '一天' },
  { value: '207', label: '七天' },
  { value: '2020101', label: '一天' },
  { value: '2020107', label: '七天' }
]
const NoteType_Entity = getEntity(NoteType)
const AuthGroupType = [
  { value: 'FE00', label: '全部审核流程' },
  { value: 'FE03', label: '内部转账' },
  { value: 'FE04', label: '对外转账' },
  { value: 'FE05', label: '批量转账' },
  { value: 'FE07', label: '集团单笔上划' },
  { value: 'FE37', label: '集团单笔下划' },
  { value: 'FE47', label: '集团批量上划' },
  { value: 'FE08', label: '代发工资' },
  { value: 'FE10', label: '通知存款' },
  { value: 'FE20', label: '定活互转' },
  { value: 'FE25', label: '证券资金第三方存管' },
  { value: 'FE27', label: '财库银税通' },
  { value: 'FE28', label: '其他代发' }
]
const AuthGroupType_Entity = getEntity(AuthGroupType)
const Times = [
  { value: '1', label: '第一次' },
  { value: '2', label: '第二次' },
  { value: '0', label: '全年' }
]
const Times_Entity = getEntity(Times)
const RoleIds = [
  { value: 'FE01', label: '基本查询服务' },
  { value: 'FE02', label: '资产负债总额查询' },
  { value: 'FE03', label: '转账服务' },
  { value: 'FE06', label: '交易审核' },
  { value: 'FE07', label: '集团服务' },
  { value: 'FE08', label: '代发工资' },
  { value: 'FE10', label: '通知存款' },
  { value: 'FE11', label: '非税收入' },
  { value: 'FE12', label: '财政部监控' },
  { value: 'FE13', label: '系统管理' },
  { value: 'FE14', label: '管理类交易审核' },
  { value: 'FE17', label: '留言服务' },
  { value: 'FE15', label: '大额取现预约' },
  { value: 'FE14', label: '定活互转' },
  { value: 'FE20', label: '管理类交易审核' },
  { value: 'FE23', label: '虚账号' },
  { value: 'BE01', label: '银企通' },
  { value: 'FE25', label: '证券资金第三方存管' },
  { value: 'FE27', label: '财库银税通' },
  { value: 'FE28', label: '其他代发' }
]
const RoleIds_Entity = getEntity(RoleIds)

// 票据状态
const billStatus = [
  { value: '010004', label: '出票已登记' },
  { value: '020001', label: '提示承兑待签收' },
  { value: '020006', label: '提示承兑已签收' },
  { value: '030001', label: '提示收票待签收' },
  { value: '030006', label: '提示收票已签收' },
  { value: '000002', label: '票据已作废' },
  { value: '100001', label: '背书待签收' },
  { value: '100006', label: '背书已签收' },
  { value: '110101', label: '买断式贴现待签收' },
  { value: '110103', label: '买断式贴现已签收待清算' },
  { value: '110105', label: '买断式贴现已签收已排队' },
  { value: '110106', label: '买断式贴现已签收' },
  { value: '110201', label: '回购式贴现待签收' },
  { value: '110203', label: '回购式贴现已签收待清算' },
  { value: '110205', label: '回购式贴现已签收已排队' },
  { value: '110206', label: '回购式贴现已签收' },
  { value: '110216', label: '回购式贴现已签收' },
  { value: '110218', label: '回购式贴现已逾赎回截止日' },
  { value: '120001', label: '回购式贴现赎回待签收' },
  { value: '120003', label: '回购式贴现赎回已签收待清算' },
  { value: '120005', label: '回购式贴现赎回已签收已排队' },
  { value: '120006', label: '回购式贴现赎回已签收' },
  { value: '130101', label: '买断式转贴现待签收' },
  { value: '130103', label: '买断式转贴现已签收待清算' },
  { value: '130105', label: '买断式转贴现已签收已排队' },
  { value: '130106', label: '买断式转贴现已签收' },
  { value: '130201', label: '回购式转贴现待签收' },
  { value: '130203', label: '回购式转贴现已签收待清算' },
  { value: '130205', label: '回购式转贴现已签收已排队' },
  { value: '130206', label: '回购式转贴现已签收' },
  { value: '130216', label: '回购式转贴现已至赎回开放日' },
  { value: '130218', label: '回购式转贴现已逾赎回截止日' },
  { value: '140001', label: '回购式转贴现赎回待签收' },
  { value: '140003', label: '回购式转贴现赎回已签收待清算' },
  { value: '140005', label: '回购式转贴现赎回已签收已排队' },
  { value: '140006', label: '回购式转贴现赎回已签收' },
  { value: '150101', label: '买断式再贴现待签收' },
  { value: '150103', label: '买断式再贴现已签收待清算' },
  { value: '150105', label: '买断式再贴现已签收已排队' },
  { value: '150106', label: '买断式再贴现已签收' },
  { value: '150201', label: '回购式再贴现待签收' },
  { value: '150203', label: '回购式再贴现已签收待清算' },
  { value: '150205', label: '回购式再贴现已签收已排队' },
  { value: '150206', label: '回购式再贴现已签收' },
  { value: '150216', label: '回购式再贴现已至赎回开放日' },
  { value: '150218', label: '回购式再贴现已逾赎回截止日' },
  { value: '160001', label: '回购式再贴现赎回待签收' },
  { value: '160003', label: '回购式再贴现赎回已签收待清算' },
  { value: '160005', label: '回购式再贴现赎回已签收已排队' },
  { value: '160006', label: '回购式再贴现赎回已签收已排队' },
  { value: '180001', label: '质押待签收' },
  { value: '180006', label: '质押已签收' },
  { value: '180020', label: '质押已至票据到期日' },
  { value: '190001', label: '质押解除待签收' },
  { value: '190006', label: '质押解除已签收' },
  { value: '170001', label: '保证待签收' },
  { value: '200001', label: '提示付款待签收' },
  { value: '-', label: '' },
  { value: '200003', label: '提示付款已签收待清算' },
  { value: '200005', label: '提示付款已签收已排队' },
  { value: '000000', label: '票据已结清' },
  { value: '200312', label: '提示付款已拒付（可拒付追索，只能追出票人，承兑人及其保证人）' },
  { value: '200412', label: '提示付款已拒付（可拒付追索，可以追所有人' },
  { value: '200512', label: '提示付款已拒付（不可进行拒付追索）' },
  { value: '210001', label: '逾期提示付款待签收' },
  { value: '210003', label: '逾期提示付款已签收待清算' },
  { value: '210005', label: '逾期提示付款已签收已排队' },
  { value: '210312', label: '逾期提示付款已拒付（可拒付追索，只能追出票人，承兑人及其保证人）' },
  { value: '210412', label: '逾期提示付款已拒付（可拒付追索，可以追所有人）' },
  { value: '220607', label: '拒付追索待清偿' },
  { value: '230601', label: '拒付追索同意清偿待签收' },
  { value: '230606', label: '拒付追索同意清偿已签收' },
  { value: '220707', label: '非拒付追索待清偿' },
  { value: '220710', label: '非拒付追索已撤销' },
  { value: '230701', label: '非拒付追索同意清偿待签收' },
  { value: '230706', label: '非拒付追索同意清偿已签收' },
  { value: '250001', label: '央行卖票待签收' },
  { value: '250003', label: '央行卖票已签收待清算' },
  { value: '250005', label: '央行卖票已签收已排队' },
  { value: '250006', label: '央行卖票已签收' },
  { value: '000026', label: '已逾票据权利失效日' }
]
const billStatus_Entity = getEntity(billStatus)
const gender_type = [
  { value: '0', label: '男' },
  { value: '1', label: '女' }
]
const gender_Entity = getEntity(gender_type)
const serviceFulfillment = [
  { value: 'true', label: '开通手机银行和企业网银' },
  { value: 'false', label: '开通企业网银' }
]
const serviceFulfillment_Entity = getEntity(serviceFulfillment)
// 票据批量查询，业务类型
const productName_Type = [
  { value: '011', label: '出票登记' },
  { value: '021', label: '提示承兑' },
  { value: '031', label: '提示收票' },
  { value: '051', label: '背书申请' },
  { value: '061', label: '贴现申请' },
  { value: '121', label: '保证申请' },
  { value: '151', label: '质押申请' },
  { value: '02', label: '提示付款应答' },
  { value: '03', label: '提示付款应答' },
  { value: '05', label: '背书应答' },
  { value: '12', label: '保证应答' },
  { value: '13', label: '保证应答' },
  { value: '14', label: '保证应答' },
  { value: '15', label: '质押应答' }
]
const productName_entity = getEntity(productName_Type)

// 综合票据查询 票据类型
const transName_type = [
  { value: '02', label: '提示承兑' },
  { value: '03', label: '提示收票' },
  { value: '05', label: '背书' },
  { value: '07', label: '回购式贴现赎回' },
  { value: '12', label: '背书保证' },
  { value: '13', label: '承兑保证' },
  { value: '14', label: '出票保证' },
  { value: '15', label: '质押' },
  { value: '16', label: '质押解除' },
  { value: '17', label: '提示付款' },
  { value: '18', label: '逾期提示付款' },
  { value: '19', label: '拒付追索通知' },
  { value: '20', label: '非拒付追索' },
  { value: '21', label: '追索同意清偿请求' },
  { value: '22', label: '网银端照票申请查询' },
  { value: '40', label: '背书转让' },
  { value: '41', label: '质押申请' },
  { value: '42', label: '贴现申请' },
  { value: '43', label: '提示付款申请' },
  { value: '44', label: '逾期提示付款' }
]
const transName_entity = getEntity(transName_type)
const transName_typeTwo = [
  { value: '00', label: '提示付款、背书、贴现等' },
  { value: '03', label: '提示收票' },
  { value: '02', label: '提示承兑' },
  { value: '40', label: '背书转让' },
  { value: '41', label: '质押申请' },
  { value: '42', label: '贴现申请' },
  { value: '43', label: '提示付款申请' },
  { value: '44', label: '逾期提示付款' }
]
const transName_typeTwoentity = getEntity(transName_typeTwo)

// 票据信息查询 交易状态
const transStatus_type = [
  { value: '00', label: '初始状态' },
  { value: '10', label: '处理中' },
  { value: '20', label: '处理成功' },
  { value: '30', label: '处理失败' }
]
const transStatus_entity = getEntity(transStatus_type)

// 票据余额查询 票据状态status_type
const status_type = [
  { value: '10', label: '待签收' },
  { value: '20', label: '已签收' }
]
const status_entity = getEntity(status_type)
const lxzffans_type = [
  { value: '0', label: '定期付息' },
  { value: '1', label: '利随本清' },
  { value: '2', label: '一次还本付息' }
]

// 审核状态
const approvalStatusList = {
  'CK': '审核通过',
  'WCK': '待审核',
  'OK': '审核通过',
  'FL': '审核失败',
  'WAP': '落地处理',
  'TMR': '定时处理',
  'SB': '审核已提交',
  'UC': '未知',
  'BH': '业务已受理',
  'RJ': '审核拒绝',
  'CC': '审核撤销'
}
const rcdCode_Type = [
  { value: 'DC00', label: '与自己有直接债权债务关系的持票人未履行约定义务' },
  { value: 'DC01', label: '持票人明知有欺诈、偷盗或者胁迫等情形，出于恶意取得票据' },
  { value: 'DC02', label: '持票人明知债务人与出票人或者持票人的前手之间存在抗辩事由而取得票据' },
  { value: 'DC03', label: '持票人因重大过失取得不符合《票据法》规定的票据' },
  { value: 'DC04', label: '超过提示付款期' },
  { value: 'DC05', label: '被法院冻结或收到法院止付通知书' },
  { value: 'DC06', label: '票据未到期' },
  { value: 'DC07', label: '商业承兑汇票承兑人账号余额不足' },
  { value: 'DC08', label: '其他' }
]
const rcdCode_entity = getEntity(rcdCode_Type)
const discount_Method = [
  { value: 'RM00', label: '买断式' },
  { value: 'RM01', label: '回购式' }
]
// 单位大额存单受让-转让类型/转让方式
const zr_type = [
  { value: '0', label: '全部转让' },
  { value: '1', label: '部分转让' }
]

// 单位大额存单受让-转让状态
const zr_status = [
  { value: '0', label: '申请' },
  { value: '1', label: '撤销' },
  { value: '2', label: '签收' }
]
// 单位大额存单受让-定价方式
const price_type = [
  { value: '0', label: '系统定价' },
  { value: '1', label: '客户定价' }
]

const reconciliation_type = [
  { value: '1', label: '核对相符' },
  { value: '0', label: '核对不符' }
]

// 单位大额存单受让-新凭证种类
const newCertificateTypes = [
  { value: '01', label: '现金支票' },
  { value: '02', label: '转帐支票' },
  { value: '03', label: '假币收缴凭证' },
  { value: '10', label: '动态令牌' },
  { value: '12', label: '小企业网银USBKEY' },
  { value: '13', label: '个人网银USBKEY' },
  { value: '14', label: '企业网银USBKEY' },
  { value: '15', label: '支付密码器' },
  { value: '19', label: '手机贴膜卡' },
  { value: '21', label: '企业变更登记出资证明' },
  { value: '22', label: '企业设立登记出资证明' },
  { value: '26', label: '商业银行银行汇票' },
  { value: '31', label: '普通支票' },
  { value: '32', label: '贷记凭证' },
  { value: '33', label: '上海支付综合系统专用凭证' },
  { value: '34', label: '外币兑换水单' },
  { value: '36', label: '业务委托书' },
  { value: '46', label: '银行承兑汇票' },
  { value: '47', label: '商业承兑汇票' },
  { value: '48', label: '清分不定额银行本票' },
  { value: '51', label: '单位存款开户证实书' },
  { value: '52', label: '单位定期存单' },
  { value: 'AE', label: '委托代收现金缴款单' },
  { value: 'AF', label: '进账单' },
  { value: '16', label: '特种转账凭证' },
  { value: '56', label: '银行汇票申请书' },
  { value: '57', label: '银行本票申请书' },
  { value: '58', label: '劳务托收凭证' },
  { value: 'XL', label: '境外汇款申请书' },
  { value: '60', label: '通用记账凭证' },
  { value: '71', label: '储蓄存单' },
  { value: '73', label: '普通存折' },
  { value: '79', label: '一本通存折' },
  { value: '82', label: '财政专用凭证' },
  { value: '83', label: '中华人民共和国储蓄国债（凭证式）收款凭证' },
  { value: '86', label: '存款证明书' },
  { value: '35', label: '电汇' },
  { value: '93', label: '公交IC卡' },
  { value: '96', label: '公司理财' },
  { value: '8A', label: '百年人寿保险股份有限公司保险单' },
  { value: '8B', label: '安邦财产保险股份有限公司保险单' },
  { value: '8C', label: '恒安标准人寿保险有限公司保险单' },
  { value: '8D', label: '中美联泰大都会人寿保险有限公司保险单' },
  { value: '9C', label: '预制卡' },
  { value: '9D', label: '预约卡' },
  { value: '9E', label: '待销毁卡' },
  { value: '9A', label: '空白卡' },
  { value: '9B', label: '作废卡' },
  { value: '9F', label: '吞没卡' },
  { value: 'AA', label: '金融社保IC卡对账簿' },
  { value: 'BB', label: '借记卡对账簿' },
  { value: '1A', label: '本票' },
  { value: '1B', label: '质押存单' },
  { value: '1C', label: '印鉴卡' },
  { value: '1D', label: '柜员卡' },
  { value: '1E', label: '活期一本通' },
  { value: '1F', label: '活期存折' },
  { value: '1G', label: '个人时点存款证明书' },
  { value: '1H', label: '定期一本通' },
  { value: '1I', label: '个人一户通存折' },
  { value: '2A', label: '留学存款证明书' },
  { value: '2B', label: '人民银行现金支票' },
  { value: '2C', label: '他行现金支票' },
  { value: '2D', label: '其他凭证' },
  { value: '2E', label: '保险单' },
  { value: '2F', label: '单位结算业务申请书' },
  { value: '2G', label: '对公银行存款余额证明' },
  { value: '2H', label: '对公存款证明' },
  { value: '2I', label: '个人支票' },
  { value: '2J', label: '个人时段存款证明书' },
  { value: '3A', label: '城市商业银行汇票' },
  { value: '3B', label: '现代化支付系统专用凭' },
  { value: '3C', label: '国税' },
  { value: '3D', label: '地税' },
  { value: '3E', label: '国债托管本' },
  { value: '3F', label: '卷式国税' },
  { value: '3G', label: '卷式地税' },
  { value: '3H', label: '投资时点证明（理财专用）' },
  { value: '3I', label: '实物金代保管凭证' },
  { value: '3J', label: '他行汇票委托书' },
  { value: '3K', label: '华东三省一市汇票委托' },
  { value: '3L', label: '特约汇款证' },
  { value: '4A', label: '全国汇票' },
  { value: '4B', label: '信汇' },
  { value: '4C', label: '贴现凭证' },
  { value: '4D', label: '一般电汇' },
  { value: '4E', label: '借款凭证' },
  { value: '4F', label: '还款凭证' },
  { value: '4G', label: '现金解款单' },
  { value: '4H', label: '专用解款单' },
  { value: '4I', label: '托收承付凭证（邮）' },
  { value: '4J', label: '托收承付凭证（电）' },
  { value: '4K', label: '委托收款(委邮)' },
  { value: '4L', label: '委托收款(委电)' },
  { value: '4M', label: '外币划款凭证' },
  { value: '5A', label: '外币汇款凭证' }, 
  { value: '5B', label: '转帐借方' },
  { value: '5C', label: '转帐贷方' },
  { value: '5D', label: '支取凭条' },
  { value: '5E', label: '外币普通支票' },
  { value: '5F', label: '外币付款凭证' },
  { value: '5G', label: '其他' },
  { value: '5H', label: '对账折' },
  { value: '5I', label: '对公存折' },
  { value: '5J', label: '华东三省一市汇票' },
  { value: '5K', label: '结算专用章' },
  { value: '9X', label: '虚拟凭证' },
  { value: '00', label: '印鉴卡(安码)' },
  { value: '99', label: '印鉴卡(易码)' },
  { value: 'HD', label: '自助回单' },
  { value: 'TC', label: '信用卡' },
  { value: 'ZK', label: '外汇业务支款凭证' },
  { value: 'WT', label: '同城委托收款' }
]
// 银行列表
const bank_type = [
  { value: '325', label: '上海银行' },
  { value: 'AAA', label: '其它银行' },
  { value: '102', label: '中国工商银行' },
  { value: '103', label: '中国农业银行' },
  { value: '104', label: '中国银行' },
  { value: '105', label: '中国建设银行' },
  { value: '201', label: '国家开发银行' },
  { value: '202', label: '中国进出口银行' },
  { value: '203', label: '中国农业发展银行' },
  { value: '301', label: '交通银行' },
  { value: '302', label: '中信实业银行' },
  { value: '303', label: '中国光大银行' },
  { value: '304', label: '华夏银行' },
  { value: '305', label: '中国民生银行' },
  { value: '306', label: '广发银行' },
  { value: '307', label: '平安银行' },
  { value: '308', label: '招商银行' },
  { value: '309', label: '兴业银行' },
  { value: '310', label: '上海浦东发展银行' },
  { value: '313', label: '城市商业银行' },
  { value: '314', label: '农村商业银行' },
  { value: '401', label: '城市信用社' },
  { value: '402', label: '农村信用社' },
  { value: '403', label: '中国邮政储蓄银行' }
]
const bank_entity = getEntity(bank_type)

export {
  // List
  zr_type,
  price_type,
  recourseTyp_Type,
  opBusiness_Type,
  Transaction_status,
  inherit_Type,
  querycashdetails_Type,
  finStewardStatus_Type,
  financialRisk_Type,
  financialPrd_Type,
  transbook_Type,
  disposal_Type,
  urgentFlag_Type,
  bankSigns_Type,
  bankFlag_Type,
  acc_status,
  loan_acc_status,
  acc_type,
  chaohui_flag,
  currency_type,
  currency_type1,
  id_type,
  limit_type,
  handleChannel,
  payerRate,
  saveDate,
  deposit_flag,
  drawType,
  process_status,
  business_type,
  usualDate,
  busi_type,
  busi_kind,
  borrow_busi_type,
  borrow_busi_kind,
  notify_type,
  draw_type,
  payType,
  authType,
  frozenType,
  jixiType,
  neCashMode_Type,
  reverseFlag_Type,
  returnFalg_Type,
  trans_type,
  accrualCyc_Type,
  accrualFlag_Type,
  assignFlag_Type,
  accrualMode_Type,
  trans_TType,
  gatherFlag_Type,
  monthEndFlag_Type,
  dGatherFlag_Type,
  dMonthEndFlag_Type,
  currencyMath_type_entity,
  finanStatus_Type,
  asFlag_Type,
  extendFlg_Type,
  huabo_Type,
  gather_Type,
  consignFlag_Type,
  acNoPri_Type,
  gatherMode_Type,
  pileAmtFlag_Type,
  uppDownFlag_Type,
  returnFlag_Type,
  downMode_Type,
  process_state,
  fundDirect_Type,
  bill_Type,
  endorse_Type,
  ensure_Type,
  assigncashFlag_Type,
  payMode_Type,
  asLevel_Type,
  trans_type_code,
  opinion_Type,
  notification_Type,
  batchUpColMethod_Type,
  highestMark_Type,
  dialDownSave_Type,
  dialDownMethod_Type,
  clearing_Type,
  trsState_Type,
  schedule_Type,
  response_Type,
  resBill_Type,
  inherit_Ttype,
  accrualFlag_Ttype,
  payment_Type,
  business_Type,
  stdinfotyp_Type,
  billStatus,
  productName_Type,
  rightFlag,
  timer_state,
  recourseReason_Type,
  transName_type,
  transName_typeTwo,
  transStatus_type,
  status_type,
  lxzffans_type,
  rcdCode_Type,
  pdeal_msg,
  pay_mode,
  bank_type,
  zr_status,
  newCertificateTypes,
  // 字典
  recourseReason_entity,
  rightFlag_entity,
  timerState_entity,
  recourseTyp_entity,
  trsCh_Entity,
  opBusiness_entity,
  resBill_entity,
  asLevel_Entity,
  payMode_Entity,
  payMode_entity,
  assigncashFlag_Entity,
  inherit_Entity,
  querycashdetails_Entity,
  finStewardStatus_Entity,
  financialRisk_entity,
  financialPrd_entity,
  acc_status_entity,
  loan_acc_status_entity,
  acc_type_entity,
  chaohui_flag_entity,
  currency_type_entity,
  currency_type_entity1,
  id_type_entity,
  limit_type_entity,
  handleChannel_entity,
  payerRate_entity,
  saveDate_entity,
  deposit_flag_entity,
  drawType_entity,
  process_status_entity,
  business_type_entity,
  usualDate_entity,
  notify_type_entity,
  draw_type_entity,
  Transaction_status_entity,
  payType_entity,
  authType_entity,
  frozenType_entity,
  jixiType_entity,
  trans_type_entity,
  AcType_Entity,
  Times_Entity,
  RoleIds_Entity,
  AuthGroupType_Entity,
  NoteType_Entity,
  AcStatus_Entity,
  UserStatus_Entity,
  TransactionType_Entity,
  MintRedeemDealFlag_Entity,
  ProfitShareMode_Entity,
  MsgType_Entity,
  EbillResult_Entity,
  EbillType_Entity,
  gender_Entity,
  loan_term,
  user_state,
  cert_state,
  right_flag,
  eloan_shape,
  neCashMode_entity,
  reverseFlag_entity,
  returnFalg_entity,
  accrualCyc_entity,
  accrualFlag_entity,
  assignFlag_entity,
  accrualMode_entity,
  trade_busistep,
  remit_model_entity,
  remit_model,
  trans_Entity,
  interest_type,
  gatherFlag_entity,
  monthEndFlag_entity,
  dGatherFlag_entity,
  dMonthEndFlag_entity,
  operator_state,
  prd_id,
  prd_id_entity,
  map_account,
  map_non_account,
  draw_interest_type,
  draw_interest_freqcy,
  currencyMath_type,
  finanStatus_Entity,
  asFlag_Entity,
  bankFlag_Entity,
  bankSigns_Entity,
  urgentFlag_Entity,
  disposal_Entity,
  huabo_Entity,
  map_withdrawalType,
  transbook_Entity,
  gather_entity,
  consignFlag_entity,
  acNoPri_entity,
  gatherMode_entity,
  pileAmtFlag_entity,
  uppDownFlag_entity,
  returnFlag_entity,
  downMode_entity,
  fundDirect_entity,
  bill_entity,
  endorse_entity,
  ensure_entity,
  opinion_entity,
  notification_entity,
  trans_type_code_entity,
  clearing_entity,
  interestFrequency_entity,
  // resultType_entity
  batchUpColMethod_entity,
  highestMark_entity,
  dialDownSave_entity,
  dialDownMethod_entity,
  trsState_entity,
  schedule_entity,
  response_entity,
  inherit_Tentity,
  accrualFlag_Tentity,
  trsEntity,
  AcStatus,
  AcType,
  Times,
  gender_type,
  NoteType,
  AuthGroupType,
  RoleIds,
  EbillType,
  UserStatus,
  TransactionType,
  MintRedeemDealFlag,
  ProfitShareMode,
  MsgType,
  EbillResult,
  jnlTrsStatus,
  payment_entity,
  business_Entity,
  filedsName,
  stdinfotyp_entity,
  billStatus_Entity,
  serviceFulfillment,
  serviceFulfillment_Entity,
  productName_entity,
  approvalStatusList,
  transName_entity,
  transName_typeTwoentity,
  transStatus_entity,
  status_entity,
  stdsgn_Type,
  stdsgn_entity,
  discount_Method,
  reconciliation_type,
  interestFrequency_Type,
  bank_entity,
  rcdCode_entity
}
