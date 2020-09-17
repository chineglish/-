import util from '@/libs/util'
import {
  zr_type,
  price_type,
  process_state,
  timerState_entity,
  currency_type_entity,
  draw_type_entity,
  bankSigns_Entity,
  remit_model_entity,
  saveDate_entity,
  deposit_flag_entity,
  acc_type_entity,
  handleChannel_entity,
  busi_kind,
  busi_type,
  borrow_busi_type,
  interest_type,
  chaohui_flag_entity,
  acc_status_entity,
  payerRate_entity,
  trans_Entity,
  asFlag_Entity,
  // bankFlag_Entity,
  // urgentFlag_Entity,
  disposal_Entity,
  extendFlg_Type,
  // currencyMath_type_entity,
  huabo_Entity,
  drawType_entity,
  draw_interest_freqcy,
  bill_Type,
  recourseTyp_Type,
  payment_Type,
  clearing_Type,
  endorse_Type,
  endorse_entity,
  ensure_Type,
  response_Type,
  rcdCode_Type,
  trans_type_entity,
  stdsgn_Type,
  recourseReason_Type,
  lxzffans_type,
  pdeal_msg,
  financialRisk_entity,
  limit_type_entity
} from '@/assets/js/entity'

export default (transCode, type) => {
  let list = []
  switch (transCode) {
    // 公司内部转账
    case 'eweb-transfer.InnerTransfer':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '付款账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '收款账号', type: 'text', key: 'payeeAcNo' },
            { disabled: true, label: '收款账户名称', type: 'text', key: 'payeeAcName' },
            { disabled: true, label: '收款账户开户行', type: 'text', key: 'payeeBankDeptName' },
            { disabled: true, label: '交易金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '金额大写', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.getMoneyHanzi(String(column)) },
            { disabled: true, label: '处理方式', type: 'text', key: 'remitModel', formatter: (row, column, cellValue, index) => remit_model_entity[column] },
            { disabled: true, label: '附言', type: 'text', key: 'remark' }
          ]
        }
      ]
      break
    // 批量转账
    case 'eweb-transfer.BatchTransfer':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '付款账户', type: 'text', key: 'payerAccNo' },
            { disabled: true, label: '手续费', type: 'text', key: 'feeAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'totalCount' },
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '下载文件链接', type: 'link', key: 'sourceFilePath', formWidth: '100%', labelWidth: '20%', clickEventName: 'downFile', show: false }
          ]
        }
      ]
      break
    // 通知存款支取
    case 'eweb-invest.DepositWithdraw':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '币种/钞汇', type: 'text', key: 'currency', formatter: (row, column, cellValue, index) => currency_type_entity[column] },
            { disabled: true, label: '通知类型', type: 'text', key: 'saveDate', formatter: (row, column, cellValue, index) => saveDate_entity[column] },
            { disabled: true, label: '开户日期', type: 'text', key: 'openDate', formatter: (roe, column, cellValue, index) => util.separationStrDateWithLine(column) },
            { disabled: true, label: '支取方式', type: 'text', key: 'drawType', formatter: (row, column, cellValue, index) => draw_type_entity[column] },
            { disabled: true, label: '支取金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        }
      ]
      break
    // 单笔转账
    case 'eweb-transfer.Transfer':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '付款账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '行内外标志', type: 'text', key: 'trsType', formatter: (row, column, celValue, index) => bankSigns_Entity[column] },
            { disabled: true, label: '收款账号', type: 'text', key: 'payeeAcNo' },
            { disabled: true, label: '收款账户名称', type: 'text', key: 'payeeAcName' },
            { disabled: true, label: '收款账户开户行', type: 'text', key: 'payeeBankDeptName' },
            { disabled: true, label: '是否使用账簿', type: 'text', key: 'asFlag', formatter: (row, column, celValue, index) => asFlag_Entity[column] },
            { disabled: true, label: '账簿号', type: 'text', key: 'asAcNo', show: false },
            { disabled: true, label: '账簿名', type: 'text', key: 'asAcName', show: false },
            { disabled: true, label: '交易金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '金额大写', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.getMoneyHanzi(String(column)) },
            { disabled: true, label: '手续费', type: 'text', key: 'feeAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '处理方式', type: 'text', key: 'remitModel', formatter: (row, column, cellValue, index) => remit_model_entity[column] },
            { disabled: true, label: '附言', type: 'text', key: 'postscript' },
            { disabled: true, label: '预约日期', type: 'text', key: 'scheduleBeginDate', show: false },
            { disabled: true, label: '预约时间', type: 'text', key: 'scheduleBeginTime', show: false }
          ]
        }
      ]
      break
    // 活期转定期
    case 'eweb-invest.CurrentRegular':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '转出账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '转出账户名称', type: 'text', key: 'payerAcName' },
            { disabled: true, label: '存期', type: 'text', key: 'saveDate', formatter: (row, column, cellValue, index) => saveDate_entity[column] },
            { disabled: true, label: '转存金额（元）', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '到期是否自动转存', type: 'text', key: 'extendflg', formatter: (row, column, cellValue, index) => deposit_flag_entity[column] },
            { disabled: true, label: '付息方式', type: 'text', key: 'ratesType', formatter: (row, column, cellValue, index) => payerRate_entity[column] },
            { disabled: true, label: '对账联系人', type: 'text', key: 'contactName' },
            { disabled: true, label: '联系人手机', type: 'text', key: 'contactPhone' }
          ]
        }
      ]
      break
    // 活期转通知存款
    case 'eweb-invest.DemandNotification':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '转出账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '金额', type: 'text', key: 'amount' },
            { disabled: true, label: '通知类型', type: 'text', key: 'saveDate', formatter: (row, column, cellValue, index) => saveDate_entity[column] },
            { disabled: true, label: '对账联系人', type: 'text', key: 'contactName' },
            { disabled: true, label: '联系人手机', type: 'text', key: 'contactTel' }
          ]
        }
      ]
      break
    // 多级账簿余额调整
    case 'eweb-cash.MultistageBookBalUpdate':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '账号', type: 'text', key: 'acNo' },
            { disabled: true, label: '币种', type: 'text', key: 'currencyCode', formatter: (row, column, cellValue, index) => currency_type_entity[column] },
            { disabled: true, label: '户名', type: 'text', key: 'acName' },
            { disabled: true, label: '调出账簿号', type: 'text', key: 'outAsAcNo' },
            { disabled: true, label: '调出账簿名', type: 'text', key: 'outAsAcName' },
            { disabled: true, label: '调入账簿号', type: 'text', key: 'inAsAcNo' },
            { disabled: true, label: '调入账簿名', type: 'text', key: 'inAsAcName' },
            { disabled: true, label: '调整金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '金额大写', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.getMoneyHanzi(String(column)) },
            { disabled: true, label: '用途', type: 'text', key: 'purpose' },
            { disabled: true, label: '附言', type: 'text', key: 'postScript' }
          ]
        }
      ]
      break
    // 多级账簿明细调账
    case 'eweb-cash.MultistageBookDetailAdjust':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '流水号', type: 'text', key: 'serialNo' },
            { disabled: true, label: '交易日期', type: 'text', key: 'trsDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '账号', type: 'text', key: 'acNo' },
            { disabled: true, label: '户名', type: 'text', key: 'acName' },
            { disabled: true, label: '币种', type: 'text', key: 'currencyCode', formatter: (row, column, cellValue, index) => currency_type_entity[column] },
            { disabled: true, label: '调出账簿号', type: 'text', key: 'outAsAcNo' },
            { disabled: true, label: '调出账簿名', type: 'text', key: 'asAcName' },
            { disabled: true, label: '金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '大写金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.getMoneyHanzi(String(column)) },
            { disabled: true, label: '手续费', type: 'text', key: 'feeAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '调入账簿号', type: 'text', key: 'inAsAcNo' },
            { disabled: true, label: '调入账簿名', type: 'text', key: 'asInAcName' },
            { disabled: true, label: '调账原因', type: 'text', key: 'purpose' },
            { disabled: true, label: '交易类型', type: 'text', key: 'trsType', formatter: (row, column, cellValue, index) => trans_Entity[column] }
          ]
        }
      ]
      break
    // 多级账簿转账
    case 'eweb-cash.MultistageBookTransfer':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '付款账户', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '付款币种', type: 'text', key: 'payerCurrencyCode', formatter: (row, column, cellValue, index) => currency_type_entity[column] },
            { disabled: true, label: '付款户名', type: 'text', key: 'payerAcName' },
            { disabled: true, label: '是否使用账簿', type: 'text', key: 'asFlag', formatter: (row, column, celValue, index) => asFlag_Entity[column] },
            { disabled: true, label: '账簿号', type: 'text', key: 'asAcNo', show: false },
            { disabled: true, label: '账簿名', type: 'text', key: 'asAcName', show: false },
            { disabled: true, label: '付款地址', type: 'text', key: 'payerAcAddr' },
            { disabled: true, label: '行内外标志', type: 'text', key: 'bankFlag', formatter: (row, column, celValue, index) => bankSigns_Entity[column] },
            // { disabled: true, label: '同城异地标志', type: 'text', key: 'areaFlag', formatter: (row, column, celValue, index) => bankFlag_Entity[column] },
            // { disabled: true, label: '加急标志', type: 'text', key: 'urgencyFlag', formatter: (row, column, celValue, index) => urgentFlag_Entity[column] },
            { disabled: true, label: '收款账户', type: 'text', key: 'payeeAcNo' },
            { disabled: true, label: '收款账户名称', type: 'text', key: 'payeeAcName' },
            { disabled: true, label: '收款账户开户行', type: 'text', key: 'rcvBankName' },
            { disabled: true, label: '收款人手机', type: 'text', key: 'mobiles' },
            { disabled: true, label: '交易金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '金额大写', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.getMoneyHanzi(String(column)) },
            { disabled: true, label: '处理方式', type: 'text', key: 'bookingFlag', formatter: (row, column, celValue, index) => disposal_Entity[column] },
            { disabled: true, label: '预约日期', type: 'text', key: 'bookingDate', show: false, formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '预约时间', type: 'text', key: 'bookingtime', show: false },
            // { disabled: true, label: '用途', type: 'text', key: 'purpose' },
            { disabled: true, label: '附言', type: 'text', key: 'postscript' },
            { disabled: true, label: '虚拟款项账号', type: 'text', key: 'virAcNo' },
            { disabled: true, label: '虚拟款项户名', type: 'text', key: 'virAcName' }
          ]
        }
      ]
      break
    // 定期支取
    case 'eweb-invest.PeriodicWithdrawal': // 存在疑虑
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '定期账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '开户日期', type: 'text', key: 'openDate', formatter: (roe, column, cellValue, index) => util.separationStrDateWithLine(column) },
            { disabled: true, label: '存期', type: 'text', key: 'saveDate', formatter: (row, column, cellValue, index) => saveDate_entity[column] },
            { disabled: true, label: '币种', type: 'text', key: 'currency', formatter: (row, column, cellValue, index) => currency_type_entity[column] },
            { disabled: true, label: '账户余额', type: 'text', key: 'balance', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '到期是否自动转存', type: 'text', key: 'extendflg', formatter: (row, column, cellValue, index) => util.handleEnums(extendFlg_Type, column) },
            { disabled: true, label: '付息方式', type: 'text', key: 'drawInterestType', formatter: (row, column, cellValue, index) => payerRate_entity[column] },
            { disabled: true, label: '支取方式', type: 'text', key: 'drawType', formatter: (row, column, cellValue, index) => draw_type_entity[column] },
            { disabled: true, label: '支取金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        }
      ]
      break
    // 自动扣费签约-签约
    case 'eweb-enterprise.AutDedFeeSign':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '签约缴费账号', type: 'text', key: 'payerAcNo', formWidth: '100%', labelWidth: '20%' },
            {
              disabled: true,
              label: '操作员及证书',
              type: 'text',
              key: 'signFeeList',
              formWidth: '100%',
              labelWidth: '20%',
              isConcatHtml: true,
              style: {
                width: '100%',
                overflow: 'hidden'
              },
              formatter: (row, column, cellValue, index) => {
                let str = ''
                for (let i = 0; i < column.length; i++) {
                  str = str + `<p style="margin: 0; width: 50%; float: left;">${column[i].userId} &nbsp;${column[i].userName} &nbsp;${column[i].keyId}</p>`
                }
                return str
              }
            },
            { disabled: true, label: '收费标准（张/年）', type: 'text', key: 'feeAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '扣费提前通知手机号', type: 'text', key: 'mobilePhone' }
          ]
        }
      ]
      break
    // 自动扣费签约-维护
    case 'eweb-enterprise.UpdateAutDedFeeSign':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '签约缴费账号', type: 'text', key: 'payerAcNo', formWidth: '100%', labelWidth: '20%' },
            {
              disabled: true,
              label: '操作员及证书',
              type: 'text',
              key: 'updateFeeList',
              formWidth: '100%',
              labelWidth: '20%',
              isConcatHtml: true,
              style: {
                width: '100%',
                overflow: 'hidden'
              },
              formatter: (row, column, cellValue, index) => {
                let str = ''
                for (let i = 0; i < column.length; i++) {
                  str = str + `<p style="margin: 0; width: 50%; float: left;">${column[i].userId} &nbsp;${column[i].userName} &nbsp;${column[i].keyId}</p>`
                }
                return str
              }
            },
            { disabled: true, label: '收费标准（张/年）', type: 'text', key: 'feeAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '扣费提前通知手机号', type: 'text', key: 'mobilePhone' }
          ]
        }
      ]
      break
    // 单位大额存单申购
    case 'eweb-largeDeposit.LargeProductBuy':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '产品编号', type: 'text', key: 'prdBatchCode' },
            { disabled: true, label: '产品名称', type: 'text', key: 'prdBatchName' },
            { disabled: true, label: '年利率(%)', type: 'text', key: 'actualRate', formatter: (row, column, cellValue, index) => util.formatInterestRate(column) },
            { disabled: true, label: '产品期限', type: 'text', key: 'depositTerm', formatter: (row, column, cellValue, index) => saveDate_entity[column] },
            { disabled: true, label: '利息支付方式', type: 'text', key: 'interestPayWay', formatter: (row, column, cellValue, index) => payerRate_entity[column] },
            { disabled: true, label: '转出账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '转出账户名称', type: 'text', key: 'payerAcName' },
            { disabled: true, label: '交易金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '对账联系人', type: 'text', key: 'linkman' },
            { disabled: true, label: '联系电话', type: 'text', key: 'linkmanPhone' },
            { disabled: true, label: '剩余额度', type: 'text', key: 'unUserLimitAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '支取标识', type: 'text', key: 'isAllowAdvancedDraw', formatter: (row, column, cellValue, index) => drawType_entity[column] }
          ]
        }
      ]
      break
    // 单位大额存单支取
    case 'eweb-largeDeposit.LargeProductDraw':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '账户名称', type: 'text', key: 'payeeAcName' },
            { disabled: true, label: '账户类型', type: 'text', key: 'payeeAcType', formatter: (row, column, cellValue, index) => acc_type_entity[column] },
            { disabled: true, label: '账号', type: 'text', key: 'ldAccountNo' },
            { disabled: true, label: '子账户序号', type: 'text', key: 'ldSubAccNo' },
            { disabled: true, label: '开户金额', type: 'text', key: 'openAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '账户余额', type: 'text', key: 'actBal', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '产品期次编号', type: 'text', key: 'prdBatchCode' },
            { disabled: true, label: '年利率（%）', type: 'text', key: 'actualRate', formatter: (row, column, cellValue, index) => util.formatInterestRate(column) },
            { disabled: true, label: '办理渠道', type: 'text', key: 'openChannel', formatter: (row, column, cellValue, index) => handleChannel_entity[column] },
            { disabled: true, label: '付息方式', type: 'text', key: 'interestPayWay', formatter: (row, column, cellValue, index) => payerRate_entity[column] },
            { disabled: true, label: '开户日期', type: 'text', key: 'openDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '到期日期', type: 'text', key: 'matureDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '收付款账户', type: 'text', key: 'payeeAcNo' },
            { disabled: true, label: '账户状态', type: 'text', key: 'ldAcStatus', formatter: (row, column, cellValue, index) => acc_status_entity[column] },
            { disabled: true, label: '交易金额（元）', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        }
      ]
      break
    // 单位大额存单转让
    case 'eweb-largeDeposit.LargeDepositAssignApply':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '产品期次编号', type: 'text', key: 'prdBatchCode' },
            { disabled: true, label: '产品名称', type: 'text', key: 'chanpshm' },
            { disabled: true, label: '年利率(%)', type: 'text', key: 'actualRate', formatter: (row, column, cellValue, index) => util.formatInterestRate(column) },
            { disabled: true, label: '产品期限', type: 'text', key: 'depositTerm', formatter: (row, column, cellValue, index) => saveDate_entity[column] },
            { disabled: true, label: '支付利息方式', type: 'text', key: 'lxzffans', formatter: (row, column, cellValue, index) => util.handleEnums(lxzffans_type, column) },
            { disabled: true, label: '支取标识', type: 'text', key: 'isAllowAdvancedDraw', formatter: (row, column, cellValue, index) => drawType_entity[column] },
            { disabled: true, label: '转让账号', type: 'text', key: 'ldAcNo' },
            { disabled: true, label: '转让账户名称', type: 'text', key: 'crrmingc' },
            { disabled: true, label: '开户金额', type: 'text', key: 'openAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '可用余额', type: 'text', key: 'actBal', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '转让类型', type: 'text', key: 'drawType', formatter: (row, column, cellValue, index) => util.handleEnums(zr_type, column) },
            { disabled: true, label: '转让份额', type: 'text', key: 'shareAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '定价方式', type: 'text', key: 'priceType', formatter: (row, column, cellValue, index) => util.handleEnums(price_type, column) },
            { disabled: true, label: '转让价格', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '已计提利息', type: 'text', key: 'accruedInterestUnpaid', show: false, formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        }
      ]
      break
    // 单位大额存单受让
    case 'eweb-largeDeposit.LargeDepositAssignAffirm':
      list = [
        {
          formWidth: '50%',
          title: '单位大额存单受让',
          group: [
            { disabled: true, label: '产品期次编号', type: 'text', key: 'prdBatchCode' },
            { disabled: true, label: '产品名称', type: 'text', key: 'chanpshm' },
            { disabled: true, label: '年利率(%)', type: 'text', key: 'actualRate', formatter: (row, column, cellValue, index) => util.formatInterestRate(column) },
            { disabled: true, label: '产品期限', type: 'text', key: 'depositTerm', formatter: (row, column, cellValue, index) => saveDate_entity[column] },
            { disabled: true, label: '支付利息方式', type: 'text', key: 'lxzffans', formatter: (row, column, cellValue, index) => util.handleEnums(lxzffans_type, column) },
            { disabled: true, label: '支取标识', type: 'text', key: 'isAllowAdvancedDraw', formatter: (row, column, cellValue, index) => drawType_entity[column] },
            { disabled: true, label: '受让账号', type: 'text', key: 'srrkehzh' },
            { disabled: true, label: '受让账户名称', type: 'text', key: 'srrmingc' },
            { disabled: true, label: '转让类型', type: 'text', key: 'drawType', formatter: (row, column, cellValue, index) => util.handleEnums(zr_type, column) },
            { disabled: true, label: '受让份额', type: 'text', key: 'shareAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '定价方式', type: 'text', key: 'priceType', formatter: (row, column, cellValue, index) => util.handleEnums(price_type, column) },
            { disabled: true, label: '受让价格', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '已计提利息', type: 'text', key: 'accruedInterestUnpaid', show: false, formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        }
      ]
      break
    // 定期通开户
    case 'eweb-invest.OpenRegularAcNo':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '转出账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '转出账户名称', type: 'text', key: 'payerAcName' },
            { disabled: true, label: '名义期限', type: 'text', key: 'nomExpire', formatter: (row, column, cellValue, index) => saveDate_entity[column] },
            { disabled: true, label: '提前支取开始日期', type: 'text', key: 'preDrawStartDate', formatter: (roe, column, cellValue, index) => util.separationStrDateWithLine(column) },
            { disabled: true, label: '开户金额', type: 'text', key: 'openAcNoAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '存入利率（%）', type: 'text', key: 'depositRate' },
            { disabled: true, label: '付息方式', type: 'text', key: 'interestType', formatter: (row, column, cellValue, index) => util.handleEnums(interest_type, column) },
            { disabled: true, label: '对账联系人', type: 'text', key: 'contactName' },
            { disabled: true, label: '联系人手机', type: 'text', key: 'contactMobile' }
          ]
        }
      ]
      break
    // 定期通支取
    case 'eweb-invest.DrawRegular':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '定期通账号', type: 'text', key: 'regularAcNo' },
            { disabled: true, label: '定期通账户序号', type: 'text', key: 'regularSubAcNo' },
            { disbaled: true, label: '账户名称', type: 'text', key: 'regularAcName' },
            { disabled: true, label: '开户日期', type: 'text', key: 'openDate', formatter: (roe, column, cellValue, index) => util.separationStrDateWithLine(column) },
            { disabled: true, label: '到期日期', type: 'text', key: 'matureDate', formatter: (roe, column, cellValue, index) => util.separationStrDateWithLine(column) },
            { disabled: true, label: '名义期限', type: 'text', key: 'nomExpire', formatter: (row, column, cellValue, index) => saveDate_entity[column] },
            { disabled: true, label: '提前支取开始日期', type: 'text', key: 'preDrawStartDate', formatter: (roe, column, cellValue, index) => util.separationStrDateWithLine(column) },
            { disabled: true, label: '开户金额', type: 'text', key: 'openAcNoAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '账户余额', type: 'text', key: 'acNoBalance', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '付息方式', type: 'text', key: 'interestType', formatter: (row, column, cellValue, index) => util.handleEnums(draw_interest_freqcy, column) },
            { disabled: true, label: '支取方式', type: 'text', key: 'drawType', formatter: (row, column, cellValue, index) => draw_type_entity[column] },
            { disabled: true, label: '支取金额', type: 'text', key: 'drawAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        }
      ]
      break
    // 财务报销
    case 'eweb-transfer.FinanceReimburse':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '上传文件类型', type: 'text', key: 'fileType' },
            { disabled: true, label: '付款账户', type: 'text', key: 'payerAccNo' },
            { disabled: true, label: '合同号', type: 'text', key: 'contractNo' },
            { disabled: true, label: '报销总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '报销总笔数', type: 'text', key: 'totalCount' },
            { disabled: true, label: '模板名称', type: 'text', key: 'templateName' },
            { disabled: true, label: '上传文件', type: 'link', key: 'fileName', clickEventName: 'downFile', show: false }
          ]
        }
      ]
      break
    // 小额定期借记业务
    case 'eweb-transfer.SmallLimitBorrow':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '收款账号', type: 'text', key: 'payeeAcNo' },
            { disabled: true, label: '业务类型', type: 'text', key: 'businessType', formatter: (row, column, cellValue, index) => util.handleEnums(borrow_busi_type, column) },
            { disabled: true, label: '业务种类', type: 'text', key: 'businessKind', formatter: (row, column, cellValue, index) => util.handleEnums(busi_kind, column) },
            { disabled: true, label: '单笔手续费', type: 'text', key: 'singleFee', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '明细笔数', type: 'text', key: 'totalCount' },
            { disabled: true, label: '手续费', type: 'text', key: 'feeAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '支付金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '回执天数', type: 'text', key: 'receiptLimit' },
            { disabled: true, label: '上传文件', type: 'link', key: 'fileName', clickEventName: 'downFile', show: false }
          ]
        }
      ]
      break
    // 小额定期贷记业务
    case 'eweb-transfer.SmallLimitLead':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '付款账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '合同协议号', type: 'text', key: 'protocalNo' },
            { disabled: true, label: '业务类型', type: 'text', key: 'businessType', formatter: (row, column, cellValue, index) => util.handleEnums(busi_type, column) },
            { disabled: true, label: '业务种类', type: 'text', key: 'businessKind', formatter: (row, column, cellValue, index) => util.handleEnums(busi_kind, column) },
            { disabled: true, label: '支付金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '明细笔数', type: 'text', key: 'totalCount' },
            { disabled: true, label: '手续费', type: 'text', key: 'feeAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '单笔手续费', type: 'text', key: 'singleFee', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        }
      ]
      break
    // 代发工资
    case 'eweb-transfer.PaySalaryUpload':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '上传文件类型', type: 'text', key: 'fileType' },
            { disabled: true, label: '付款账号', type: 'text', key: 'payerAccNo' },
            { disabled: true, label: '合同号', type: 'text', key: 'contractNo' },
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'totalCount' },
            { disabled: true, label: '模板名称', type: 'text', key: 'templateName' },
            { disabled: true, label: '上传文件', type: 'link', key: 'fileName', clickEventName: 'downFile', show: false }
          ]
        }
      ]
      break
    // 信用卡
    case 'eweb-transfer.CreditCardRepay':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '还款账户', type: 'text', key: 'payerAcName' },
            { disabled: true, label: '还款金额(元)', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '信用卡号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '还款账号', type: 'text', key: 'payeeAcNo' },
            { disabled: true, label: '持卡人姓名', type: 'text', key: 'payeeAcName' }
          ]
        }
      ]
      break
    // 结构性存款账户开户
    case 'eweb-invest.StructuredDepositOpen':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '转出账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '转出账户名称', type: 'text', key: 'payerAcName' },
            { disabled: true, label: '收付息账号', type: 'text', key: 'payeeAcNo' },
            { disabled: true, label: '收付息账户名称', type: 'text', key: 'payeeAcName' },
            { disabled: true, label: '到期日期', type: 'text', key: 'endDate' },
            { disabled: true, label: '转存金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '年利率（%）', type: 'text', key: 'struRates', formatter: (row, column, cellValue, index) => util.formatInterestRate(column) },
            { disabled: true, label: '付息方式', type: 'text', key: 'fxType', formatter: (row, column, cellValue, index) => util.handleEnums(interest_type, column) },
            { disabled: true, label: '对账联系人', type: 'text', key: 'contactName' },
            { disabled: true, label: '联系电话', type: 'text', key: 'contactTel' },
            { disabled: true, label: '联系人手机', type: 'text', key: 'contactPhone' }
          ]
        }
      ]
      break
    // 结构性存款销户
    case 'eweb-invest.StructuredDepositClose':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '账户名称', type: 'text', key: 'payerAcName' },
            { disabled: true, label: '账户类型', type: 'text', key: 'payerAcType', formatter: (row, column, cellValue, index) => acc_type_entity[column] },
            { disabled: true, label: '账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '子账户序号', type: 'text', key: 'payerSubAcNo' },
            { disabled: true, label: '币种', type: 'text', key: 'currency', formatter: (row, column, cellValue, index) => currency_type_entity[column] },
            { disabled: true, label: '开户金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '年利率（％）', type: 'text', key: 'struRates', formatter: (row, column, cellValue, index) => util.formatInterestRate(column) },
            { disabled: true, label: '开通渠道', type: 'text', key: 'openChannel', formatter: (row, column, cellValue, index) => handleChannel_entity[column] },
            { disabled: true, label: '付息方式', type: 'text', key: 'fxType', formatter: (row, column, cellValue, index) => payerRate_entity[column] },
            { disabled: true, label: '开户日期', type: 'text', key: 'openDate' },
            { disabled: true, label: '到期日期', type: 'text', key: 'endDate' },
            { disabled: true, label: '转出账户', type: 'text', key: 'payeeAcNo' },
            { disabled: true, label: '收本收息账户', type: 'text', key: 'bjlxzrzh' },
            { disabled: true, label: '钞汇标志', type: 'text', key: 'cashFlag', formatter: (row, column, cellValue, index) => chaohui_flag_entity[column] },
            { disabled: true, label: '账户状态', type: 'text', key: 'actStatus', formatter: (row, column, cellValue, index) => acc_status_entity[column] },
            { disabled: true, label: '限制类型', type: 'text', key: 'limitType', formatter: (row, column, cellValue, index) => limit_type_entity[column] }
          ]
        }
      ]
      break
    // 体彩缴费
    case 'eweb-transfer.LotteryPayFee':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '缴费地区', type: 'text', key: 'payArea' },
            { disabled: true, label: '缴款项目', type: 'text', key: 'payItem' },
            { disabled: true, label: '收费单位', type: 'text', key: 'chargeUnit' },
            { disabled: true, label: '彩票类型', type: 'text', key: 'lotteryType' },
            { disabled: true, label: '投注站编号', type: 'text', key: 'lotteryCenterNumber' },
            { disabled: true, label: '客户姓名', type: 'text', key: 'cifName' },
            { disabled: true, label: '客户地址', type: 'text', key: 'cifAddrs' },
            { disabled: true, label: '缴费金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        }
      ]
      break
    // 证书续费
    case 'eweb-enterprise.CertFees':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '缴费账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '账户名称', type: 'text', key: 'payerAcName' },
            { disabled: true, label: '操作员号', type: 'text', key: 'feesUserId' },
            { disabled: true, label: '缴费金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '证书编号', type: 'text', key: 'payCertNo' }
          ]
        }
      ]
      break
    // 非税缴费
    case 'eweb-transfer.PaymentPayInfo':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '付款账户', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '可用余额', type: 'text', key: 'balance' },
            { disabled: true, label: '缴款项目', type: 'text', key: 'payItem' },
            { disabled: true, label: '缴款码', type: 'text', key: 'payCode' },
            { disabled: true, label: '执收单位名称', type: 'text', key: 'chgAgenName' },
            { disabled: true, label: '执收单位编码', type: 'text', key: 'chgAgenCode' },
            { disabled: true, label: '缴款人名称', type: 'text', key: 'payerAcName' },
            { disabled: true, label: '收款人名称', type: 'text', key: 'payeeAcName' },
            { disabled: true, label: '缴款金额', type: 'text', key: 'amount' },
            { disabled: true, label: '缴款状态', type: 'text', key: 'payStats' }
          ]
        }
      ]
      break
    // 定时交易处理
    case 'eweb-transfer.TimeTransferTrsRepeal':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '付款账户名称', type: 'text', key: 'payerAcName' },
            { disabled: true, label: '收款账户名称', type: 'text', key: 'payeeAcName' },
            { disabled: true, label: '付款账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '收款账号', type: 'text', key: 'payeeAcNo' },
            { disabled: true, label: '付款行', type: 'text', key: 'payerBankName' },
            { disabled: true, label: '收款行', type: 'text', key: 'payeeBankName' },
            { disabled: true, label: '交易金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '金额大写', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.getMoneyHanzi(String(column)) },
            { disabled: true, label: '处理方式', type: 'text', key: 'remitModel', formatter: (row, column, cellValue, index) => remit_model_entity[column] },
            { disabled: true, label: '手续费', type: 'text', key: 'initfeeTotalamt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '附言', type: 'text', key: 'postScript' },
            { disabled: true, label: '执行时间', type: 'text', key: 'bankDate', formatter: (row, column, cellValue, index) => util.formatTransTime(column) },
            { disabled: true, label: '交易状态', type: 'text', key: 'tradeBusistep', formatter: (row, column, cellValue, index) => trans_type_entity[column] },
            { disabled: true, label: '交易结果', type: 'text', key: 'pdealMsg', formatter: (row, column, cellValue, index) => util.handleEnums(pdeal_msg, column) },
            { disabled: true, label: '账簿号', type: 'text', key: 'asAcNo', show: false },
            { disabled: true, label: '账簿名', type: 'text', key: 'asAcName', show: false }
          ]
        }
      ]
      break
    // 预约交易撤销
    case 'eweb-transfer.RepealAppointTrans':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '付款账户名称', type: 'text', key: 'payerAcName' },
            { disabled: true, label: '收款账户名称', type: 'text', key: 'payeeAcName' },
            { disabled: true, label: '付款账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '收款账号', type: 'text', key: 'payeeAcNo' },
            { disabled: true, label: '付款行', type: 'text', key: 'payerBankName' },
            { disabled: true, label: '收款行', type: 'text', key: 'payeeBankDeptName' },
            { disabled: true, label: '交易金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '金额大写', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.getMoneyHanzi(String(column)) },
            { disabled: true, label: '处理方式', type: 'text', key: 'process', formatter: (row, column, cellValue, index) => (column = '预约转账') },
            { disabled: true, label: '手续费', type: 'text', key: 'feeAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '附言', type: 'text', key: 'remark' },
            { disabled: true, label: '交易状态', type: 'text', key: 'timerState', formatter: (row, column, cellValue, index) => timerState_entity[column] },
            { disabled: true, label: '执行时间', type: 'text', key: 'transDate' },
            { disabled: true, label: '交易结果', type: 'text', key: 'processState', formatter: (row, column, cellValue, index) => util.handleEnums(process_state, column) },
            { disabled: true, label: '账簿号', type: 'text', key: 'asAcNo', show: false },
            { disabled: true, label: '账簿名', type: 'text', key: 'asAcName', show: false }
          ]
        }
      ]
      break
    // 理财产品购买
    case 'eweb-invest.InvestProductBuy':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '产品名称', type: 'text', key: 'prdName' },
            { disabled: true, label: '产品代码', type: 'text', key: 'prdCode' },
            { disabled: true, label: '理财产品登记编码', type: 'text', key: 'prdRegisterCode' },
            { disabled: true, label: '风险等级', type: 'text', key: 'riskLevel', formatter: (row, column, cellValue, index) => financialRisk_entity[column] },
            { disabled: true, label: '购买金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '金额大写', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.getMoneyHanzi(String(column)) },
            { disabled: true, label: '投资期限(天)', type: 'text', key: 'interestDays' },
            { disabled: true, label: '币种', type: 'text', key: 'currency', formatter: (row, column, cellValue, index) => column ? currency_type_entity[column] : '人民币' },
            { disabled: true, label: '转出账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '推荐人编号', type: 'text', key: 'mutiRecommender' }
          ]
        }
      ]
      break
    // 理财产品购买撤销
    case 'eweb-invest.InvestProductCancle':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '产品名称', type: 'text', key: 'prdName' },
            { disabled: true, label: '产品代码', type: 'text', key: 'prdCode' },
            { disabled: true, label: '交易金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '撤销金额(元)', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '金额大写', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.getMoneyHanzi(String(column)) },
            { disabled: true, label: '业绩比较基准', type: 'text', key: 'modelComment', show: false },
            { disabled: true, label: '起息日', type: 'text', key: 'incomeDate', show: false, formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '到期日', type: 'text', key: 'incomeEndDate', show: false, formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '单位净值', type: 'text', key: 'netWorth', show: false },
            { disabled: true, label: '七日年化收益率', type: 'text', key: 'weekRate', show: false },
            { disabled: true, label: '交易账户', type: 'text', key: 'payeeAcNo' },
            { disabled: true, label: '推荐人编号', type: 'text', key: 'mutiRecommender' }
          ]
        }
      ]
      break
    // 理财产品赎回撤销
    case 'eweb-invest.InvestProductRedCancle':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '产品名称', type: 'text', key: 'prdName' },
            { disabled: true, label: '产品代码', type: 'text', key: 'prdCode' },
            { disabled: true, label: '交易份额（份）', type: 'text', key: 'vol', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '撤销份额（份）', type: 'text', key: 'portion', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '单位净值', type: 'text', key: 'netWorth' },
            { disabled: true, label: '七日年化收益率', type: 'text', key: 'weekRate' },
            { disabled: true, label: '转出账户', type: 'text', key: 'payeeAcNo' }
          ]
        }
      ]
      break
    // 理财产品赎回
    case 'eweb-invest.InvestProductRedeem':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '产品名称', type: 'text', key: 'prdName' },
            { disabled: true, label: '产品代码', type: 'text', key: 'prdCode' },
            { disabled: true, label: '可用份额（份）', type: 'text', key: 'vol', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '转出账户', type: 'text', key: 'payeeAcNo' },
            { disabled: true, label: '赎回份额（份）', type: 'text', key: 'portion', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        }
      ]
      break
    // 上海航运-入金
    case 'eweb-transfer.SHShipIncome':
      list = [
        {
          // title: '上海航运-入金',
          formWidth: '50%',
          group: [
            { disabled: true, label: '交易商银行账号', type: 'text', key: 'acNo' },
            { disabled: true, label: '交易商户名', type: 'text', key: 'dealerName' },
            { disabled: true, label: '交易市场名称', type: 'text', key: 'marketOrgName' },
            { disabled: true, label: '交易商交易资金账号', type: 'text', key: 'voucherNo' },
            { disabled: true, label: '币种', type: 'text', key: 'currencyCode', formatter: (row, column, cellValue, index) => currency_type_entity[column] },
            { disabled: true, label: '入金金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        }
      ]
      break
    // 上海航运-出金
    case 'eweb-transfer.SHShipPayments':
      list = [
        {
          // title: '上海航运-出金',
          formWidth: '50%',
          group: [
            { disabled: true, label: '交易商银行账号', type: 'text', key: 'acNo' },
            { disabled: true, label: '交易商商户名', type: 'text', key: 'dealerName' },
            { disabled: true, label: '交易市场名称', type: 'text', key: 'marketOrgName' },
            { disabled: true, label: '交易商交易资金账号', type: 'text', key: 'voucherNo' },
            { disabled: true, label: '币种', type: 'text', key: 'currencyCode', formatter: (row, column, cellValue, index) => currency_type_entity[column] },
            { disabled: true, label: '出金金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        }
      ]
      break
    // 归集资金划拨
    case 'eweb-cash.CollectCashPooling':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '付款账号', type: 'text', key: 'payerAcNo' },
            { disabled: true, label: '付款户名', type: 'text', key: 'payerAcName' },
            { disabled: true, label: '划拨类型', type: 'text', key: 'transType', formatter: (row, column, cellValue, index) => huabo_Entity[column] },
            { disabled: true, label: '收款账号', type: 'text', key: 'payeeAcNo' },
            { disabled: true, label: '收款户名', type: 'text', key: 'payeeAcName' },
            { disabled: true, label: '金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '金额大写', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.getMoneyHanzi(String(column)) },
            { disabled: true, label: '用途', type: 'text', key: 'purpose' },
            { disabled: true, label: '附言', type: 'text', key: 'postscript' }
          ]
        }
      ]
      break
    // 质押申请（单笔）
    case 'eweb-edraft.PledgeReq':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        },
        {
          formWidth: '50%',
          title: '质权人信息',
          group: [
            { disabled: true, label: '质权人名称', type: 'text', key: 'stdCobkNam' },
            { disabled: true, label: '质权人账号', type: 'text', key: 'stdCobkAcc' },
            { disabled: true, label: '质权人开户行号', type: 'text', key: 'stdCobkBnm' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdColtAcc' }
          ]
        }
      ]
      break
    // 质押申请（批量）
    case 'eweb-edraft.PledgeReqBatch':
      list = [
        {
          formWidth: '50%',
          'slotName': 'billTable',
          group: [
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'total' }
          ]
        },
        {
          formWidth: '50%',
          title: '质权人信息',
          group: [
            { disabled: true, label: '质权人名称', type: 'text', key: 'pledgeeName' },
            { disabled: true, label: '质权人账号', type: 'text', key: 'pledgeeAcc' },
            { disabled: true, label: '质权人开户行号', type: 'text', key: 'pledgeeBank' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdColtAcc' }
          ]
        }
      ]
      break
    // 质押撤回
    case 'eweb-edraft.ZyRevokeReq':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdRvkrAcc' }
          ]
        }
      ]
      break
    // 质押应答（单笔）
    case 'eweb-edraft.ZyCurrentSign':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdAccpAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdSgnrAcc' },
            { disabled: true, label: '应答意见', type: 'text', key: 'stdSgnrRes', formatter: (row, column, cellValue, index) => util.handleEnums(response_Type, column) }
          ]
        }
      ]
      break
    // 质押应答(批量)
    case 'eweb-edraft.ZyCurrentSignBatch':
      list = [
        {
          formWidth: '50%',
          'slotName': 'billTable',
          group: [
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'total' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdSgnrAcc' },
            { disabled: true, label: '应答意见', type: 'text', key: 'stdSgnrRes', formatter: (row, column, cellValue, index) => util.handleEnums(response_Type, column) }
          ]
        }
      ]
      break
    // 解质押申请
    case 'eweb-edraft.RelievePledgeReq':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdCobkAcc' }
          ]
        }
      ]
      break
    // 解质押撤回
    case 'eweb-edraft.JzyRevokeReq':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdRvkrAcc' }
          ]
        }
      ]
      break
    // 解质押应答
    case 'eweb-edraft.JzyCurrentSign':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdAccpAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '应答意见', type: 'text', key: 'stdSgnrRes', formatter: (row, column, cellValue, index) => util.handleEnums(response_Type, column) }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdSgnrAcc' }
          ]
        }
      ]
      break
    // 通用应答(单笔)
    case 'eweb-edraft.CurrentSign':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdAccpAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '应答意见', type: 'text', key: 'stdSgnrRes', formatter: (row, column, cellValue, index) => util.handleEnums(response_Type, column) },
            { disabled: true, label: '客户账号', type: 'text', key: 'stdSgnrAcc' }
          ]
        }
      ]
      break
    // 通用应答(批量)
    case 'eweb-edraft.CurrentSignBatch':
      list = [
        {
          formWidth: '50%',
          'slotName': 'billTable',
          group: [
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'total' }
          ]
        }
      ]
      break
    // 追索通知申请
    case 'eweb-edraft.RecourseNotice':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '出票人名称', type: 'text', key: 'stdDrwrNam' },
            { disabled: true, label: '承兑人名称', type: 'text', key: 'stdAccpNam' },
            { disabled: true, label: '追索类型', type: 'text', key: 'stdBussTyp', formatter: (row, column, cellValue, index) => util.handleEnums(recourseTyp_Type, column) },
            { disabled: true, label: '追索理由', type: 'text', key: 'stdRcrsBcd', formatter: (row, column, cellValue, index) => util.handleEnums(recourseReason_Type, column) },
            { disabled: true, label: '追索金额', type: 'text', key: 'stdPpayAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '追索申请日期', type: 'text', key: 'stdApplDte', formatter: (row, column, cellValue, index) => util.separationDate(column) }
          ]
        },
        {
          formWidth: '50%',
          title: '追索人信息',
          group: [
            { disabled: true, label: '追索人账号', type: 'text', key: 'stdRcrsAcc' },
            { disabled: true, label: '追索人名称', type: 'text', key: 'stdRcrsNme' },
            { disabled: true, label: '追索人行号', type: 'text', key: 'stdRcrsBnm' },
            { disabled: true, label: '追索人组织机构代码', type: 'text', key: 'stdRcrsCod' }
          ]
        },
        {
          formWidth: '50%',
          title: '被追索人信息',
          group: [
            { disabled: true, label: '被追索人账号', type: 'text', key: 'stdRcvgAcc' },
            { disabled: true, label: '被追索人名称', type: 'text', key: 'stdRcvgNme' },
            { disabled: true, label: '被追索人开户行行号', type: 'text', key: 'stdRcrsBnm' },
            { disabled: true, label: '可被追索人组织机构代码', type: 'text', key: 'stdRecrCod' }
          ]
        }
      ]
      break
    // 追索申请撤回
    case 'eweb-edraft.RevokeReq':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '票面出票人名称', type: 'text', key: 'stdDrwrNam' },
            { disabled: true, label: '票面承兑人名称', type: 'text', key: 'stdAccpNam' },
            { disabled: true, label: '追索金额', type: 'text', key: 'stdPpayAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '追索申请日期', type: 'text', key: 'stdApplDte', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '追索撤回的原因', type: 'text', key: 'recourseRecallReason' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdRvkrAcc' }
          ]
        }
      ]
      break
    // 贴现申请(单笔)
    case 'eweb-edraft.Discount':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '贴现方式', type: 'text', key: 'stdDrwrNam', formatter: (row, column, cellValue, index) => (column = '买断式') },
            { disabled: true, label: '付息方式', type: 'text', key: 'stdInteMtd', formatter: (row, column, cellValue, index) => util.handleEnums(payment_Type, column) },
            { disabled: true, label: '协议付息比例(%)', type: 'text', key: 'stdIntRate', show: false },
            { disabled: true, label: '贴现利率(%)', type: 'text', key: 'stdDscntRt' },
            { disabled: true, label: '实付金额', type: 'text', key: 'stdRealAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '贴现日期', type: 'text', key: 'stdDscntDt', formatter: (row, column, cellValue, index) => util.separationDate(column) }
          ]
        },
        {
          formWidth: '50%',
          title: '贴入人信息',
          group: [
            { disabled: true, label: '贴入人名称', type: 'text', key: 'stdDsbkNme' },
            { disabled: true, label: '贴入人开户行', type: 'text', key: 'stdDsbkBnm' },
            { disabled: true, label: '银行选择', type: 'text', key: 'stdDsbkBnam' },
            { disabled: true, label: '清算方式', type: 'text', key: 'stdStlMthd', formatter: (row, column, cellValue, index) => util.handleEnums(clearing_Type, column) }
          ]
        },
        {
          formWidth: '50%',
          title: '入账信息',
          group: [
            { disabled: true, label: '入账账号', type: 'text', key: 'stdAoaiAcc' },
            { disabled: true, label: '银行选择', type: 'text', key: 'stdAoaiBnam' },
            { disabled: true, label: '允许背书', type: 'text', key: 'stdBnedRmt', formatter: (row, column, cellValue, index) => util.handleEnums(endorse_Type, column) }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdAoaiAcc' }
          ]
        }
      ]
      break
    // 贴现申请(批量)
    case 'eweb-edraft.DiscountBatch':
      list = [
        {
          formWidth: '50%',
          'slotName': 'billTable',
          group: [
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'total' }
          ]
        },
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '贴现方式', type: 'text', key: 'stdDsntTyp', formatter: (row, column, cellValue, index) => (column = '买断式') },
            { disabled: true, label: '付息方式', type: 'text', key: 'stdInteMtd', formatter: (row, column, cellValue, index) => util.handleEnums(payment_Type, column) },
            { disabled: true, label: '协议付息比例(%)', type: 'text', key: 'stdIntRate', show: false },
            { disabled: true, label: '贴现利率(%)', type: 'text', key: 'stdDscntRt' }
          ]
        },
        {
          formWidth: '50%',
          title: '贴入人信息',
          group: [
            { disabled: true, label: '贴入人名称', type: 'text', key: 'stdDsbkNme' },
            { disabled: true, label: '贴入人开户行', type: 'text', key: 'stdDsbkBnm' },
            { disabled: true, label: '银行选择', type: 'text', key: 'stdDsbkBnam' },
            { disabled: true, label: '清算方式', type: 'text', key: 'stdStlMthd', formatter: (row, column, cellValue, index) => util.handleEnums(clearing_Type, column) }
          ]
        },
        {
          formWidth: '50%',
          title: '入账信息',
          group: [
            { disabled: true, label: '入账账号', type: 'text', key: 'stdAoaiAcc' },
            { disabled: true, label: '银行选择', type: 'text', key: 'stdAoaiBnam' },
            { disabled: true, label: '允许背书', type: 'text', key: 'stdBnedRmt', formatter: (row, column, cellValue, index) => util.handleEnums(endorse_Type, column) }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdCustAcc' }
          ]
        }
      ]
      break
    // 贴现撤回
    case 'eweb-edraft.TxRevokeReq':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        },
        {
          formWidth: '50%',
          title: '撤销人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdRvkrAcc' }
          ]
        }
      ]
      break
    // 背书申请(单笔)
    case 'eweb-edraft.EndorsedTransfer':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '出票人名称', type: 'text', key: 'stdDrwrNam' },
            { disabled: true, label: '承兑人名称', type: 'text', key: 'stdAccpNam' }
          ]
        },
        {
          formWidth: '50%',
          title: '被背书人信息',
          group: [
            { disabled: true, label: '被背书人名称', type: 'text', key: 'stdEndeNam' },
            { disabled: true, label: '被背书人账号', type: 'text', key: 'stdEndeAcc' },
            { disabled: true, label: '被背书人开户行号', type: 'text', key: 'stdEndeBnm' },
            { disabled: true, label: '转让标记', type: 'text', key: 'stdBanmFlg', formatter: (row, column, cellValue, index) => util.handleEnums(endorse_Type, column) },
            { disabled: true, label: '被背书人备注', type: 'text', key: 'std400Memo' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdEndrAcc' }
          ]
        }
      ]
      break
    // 背书申请(批量)
    case 'eweb-edraft.EndorsedTransferBatch':
      list = [
        {
          formWidth: '50%',
          slotName: 'billTable',
          group: [
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'total' }
          ]
        },
        {
          formWidth: '50%',
          title: '被背书人信息',
          group: [
            { disabled: true, label: '被背书人名称', type: 'text', key: 'stdEndeNam' },
            { disabled: true, label: '被背书人账号', type: 'text', key: 'stdEndeAcc' },
            { disabled: true, label: '被背书人开户行号', type: 'text', key: 'stdEndeBnm' },
            { disabled: true, label: '转让标记', type: 'text', key: 'stdBanmFlg', formatter: (row, column, cellValue, index) => util.handleEnums(endorse_Type, column) },
            { disabled: true, label: '被背书人备注', type: 'text', key: 'std400Memo' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdCustAcc' }
          ]
        }
      ]
      break
    // 背书撤回
    case 'eweb-edraft.BsRevokeReq':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '出票人名称', type: 'text', key: 'stdDrwrNam' },
            { disabled: true, label: '承兑人名称', type: 'text', key: 'stdAccpNam' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdRvkrAcc' }
          ]
        }
      ]
      break
    // 背书应答（单笔）
    case 'eweb-edraft.BsCurrentSign':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdAccpAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '出票人名称', type: 'text', key: 'stdDrwrNam' },
            { disabled: true, label: '承兑人名称', type: 'text', key: 'stdAccpNam' }
          ]
        },
        {
          formWidth: '50%',
          title: '应答人信息',
          group: [
            { disabled: true, label: '应答人账号', type: 'text', key: 'stdSgnrAcc' },
            { disabled: true, label: '应答意见', type: 'text', key: 'stdSgnrRes', formatter: (row, column, cellValue, index) => util.handleEnums(response_Type, column) },
            { disabled: true, label: '备注', type: 'text', key: 'std400Memob' }
          ]
        }
      ]
      break
    // 背书应答(批量)
    case 'eweb-edraft.BsCurrentSignBatch':
      list = [
        {
          formWidth: '50%',
          'slotName': 'billTable',
          group: [
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'total' }
          ]
        },
        {
          formWidth: '50%',
          title: '应答人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdSgnrAcc' },
            { disabled: true, label: '应答意见', type: 'text', key: 'stdSgnrRes', formatter: (row, column, cellValue, index) => util.handleEnums(response_Type, column) },
            { disabled: true, label: '备注', type: 'text', key: 'std400Memob' }
          ]
        }
      ]
      break
    // 提示收票申请(单笔)
    case 'eweb-edraft.PromptChargeTicket':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdAccpAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '出票人名称', type: 'text', key: 'stdDrwrNam' },
            { disabled: true, label: '收款人名称', type: 'text', key: 'stdPyeeNam' },
            { disabled: true, label: '承兑人名称', type: 'text', key: 'stdAccpNam' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdDrwrAcc' }
          ]
        }
      ]
      break
    // 提示收票申请(批量)
    case 'eweb-edraft.PromptChargeTicketBatch':
      list = [
        {
          formWidth: '50%',
          'slotName': 'billTable',
          group: [
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'total' }
          ]
        }
      ]
      break
    // 提示收票撤销
    case 'eweb-edraft.SpRevokeReq':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '收款人名称', type: 'text', key: 'stdPyeeNam' },
            { disabled: true, label: '承兑人名称', type: 'text', key: 'stdAccpNam' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdRvkrAcc' }
          ]
        }
      ]
      break
    // 提示收票应答(单笔)
    case 'eweb-edraft.SpCurrentSign':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdAccpAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '收款人名称', type: 'text', key: 'stdPyeeNam' },
            { disabled: true, label: '承兑人名称', type: 'text', key: 'stdAccpNam' }
          ]
        },
        {
          formWidth: '50%',
          title: '应答人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdSgnrAcc' },
            { disabled: true, label: '应答意见', type: 'text', key: 'stdSgnrRes', formatter: (row, column, cellValue, index) => util.handleEnums(response_Type, column) }
          ]
        }
      ]
      break
    // 提示收票应答(批量)
    case 'eweb-edraft.SpCurrentSignBatch':
      list = [
        {
          formWidth: '50%',
          'slotName': 'billTable',
          group: [
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'total' }
          ]
        },
        {
          formWidth: '50%',
          title: '应答人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdSgnrAcc' },
            { disabled: true, label: '应答意见', type: 'text', key: 'stdSgnrRes', formatter: (row, column, cellValue, index) => util.handleEnums(response_Type, column) }
          ]
        }
      ]
      break
    // 提示承兑申请(单笔)
    case 'eweb-edraft.AcceptApplication':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdAccpAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '出票人名称', type: 'text', key: 'stdDrwrNam' },
            { disabled: true, label: '收款人名称', type: 'text', key: 'stdPyeeNam' },
            { disabled: true, label: '承兑人名称', type: 'text', key: 'stdAccpNam' }
          ]
        },
        {
          formWidth: '50%',
          title: '其他信息',
          group: [
            { disabled: true, label: '合同编号', type: 'text', key: 'stdContRnm' },
            { disabled: true, label: '发票编号', type: 'text', key: 'stdInvcNum' },
            { disabled: true, label: '批次号', type: 'text', key: 'stdBatchNm' },
            { disabled: true, label: '备注', type: 'text', key: 'std400Memo' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdDrwrAcc' }
          ]
        }
      ]
      break
    // 提示承兑申请(批量)
    case 'eweb-edraft.AcceptApplicationBatch':
      list = [
        {
          formWidth: '50%',
          'slotName': 'billTable',
          group: [
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'total' }
          ]
        },
        {
          formWidth: '50%',
          title: '其他信息',
          group: [
            { disabled: true, label: '合同编号', type: 'text', key: 'stdContRnm' },
            { disabled: true, label: '发票编号', type: 'text', key: 'stdInvcNum' },
            { disabled: true, label: '批次号', type: 'text', key: 'stdBatchNm' },
            { disabled: true, label: '备注', type: 'text', key: 'std400Memo' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            {
              disabled: true,
              label: '客户账号',
              type: 'text',
              key: 'stdDrwrAcc'
            }
          ]
        }
      ]
      break
    // 提示承兑撤销
    case 'eweb-edraft.CdRevokeReq':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '出票人名称', type: 'text', key: 'stdDrwrNam' },
            { disabled: true, label: '收款人名称', type: 'text', key: 'stdPyeeNam' },
            { disabled: true, label: '承兑行开户行号', type: 'text', key: 'stdAccpBnm' },
            { disabled: true, label: '承兑人名称', type: 'text', key: 'stdAccpNam' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdRvkrAcc' }
          ]
        }
      ]
      break
    // 提示承兑应答(单笔)
    case 'eweb-edraft.CdCurrentSign':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdAccpAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '收款人名称', type: 'text', key: 'stdPyeeNam' },
            { disabled: true, label: '承兑人名称', type: 'text', key: 'stdAccpNam' },
            { disabled: true, label: '应答意见', type: 'text', key: 'stdSgnrRes', formatter: (row, column, cellValue, index) => util.handleEnums(response_Type, column) }
          ]
        },
        {
          formWidth: '50%',
          title: '应答人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdSgnrAcc' }
          ]
        }
      ]
      break
    // 提示承兑应答(批量)
    case 'eweb-edraft.CdCurrentSignBatch':
      list = [
        {
          formWidth: '50%',
          'slotName': 'billTable',
          group: [
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'total' }
          ]
        },
        {
          formWidth: '50%',
          title: '应答人消息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdSgnrAcc' },
            { disabled: true, label: '应答意见', type: 'text', key: 'stdSgnrRes', formatter: (row, column, cellValue, index) => util.handleEnums(response_Type, column) }
          ]
        }
      ]
      break
    // 出票登记(单笔)
    case 'eweb-edraft.IssueRegister':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) }
          ]
        },
        {
          formWidth: '50%',
          title: '出票人信息',
          group: [
            { disabled: true, label: '出票人类型', type: 'text', key: 'stdDrwrTyp', formatter: (row, column, cellValue, index) => util.handleEnums(stdsgn_Type, column) },
            { disabled: true, label: '出票人名称', type: 'text', key: 'stdDrwrNam' },
            { disabled: true, label: '出票人组织机构代码证', type: 'text', key: 'stdDrwrCod' },
            { disabled: true, label: '出票人开户账号', type: 'text', key: 'stdDrwrAcc' },
            { disabled: true, label: '出票人开户行名称', type: 'text', key: 'stdDrwrBnam' },
            { disabled: true, label: '到期无条件支付委托', type: 'text', key: 'stdUncnPay', formatter: (row, column, cellValue, index) => (column = '是') }
          ]
        },
        {
          formWidth: '50%',
          title: '承兑人信息',
          group: [
            { disabled: true, label: '承兑人名称', type: 'text', key: 'stdAccpNam', 'show': false },
            { disabled: true, label: '承兑人账号', type: 'text', key: 'stdAccpAcc', 'show': false },
            { disabled: true, label: '银行选择', type: 'text', key: 'stdAccpBnam' },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdAccpAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '允许背书', type: 'text', key: 'stdEndOrmk', formatter: (row, column, cellValue, index) => endorse_entity[column] }
          ]
        },
        {
          formWidth: '50%',
          title: '收款人信息',
          group: [
            { disabled: true, label: '银行选择', type: 'text', key: 'stdPyeeBnam' },
            { disabled: true, label: '收款户名', type: 'text', key: 'stdPyeeNam' },
            { disabled: true, label: '收款账户', type: 'text', key: 'stdPyeeAcc' },
            { disabled: true, label: '出票登记备注', type: 'text', key: 'stdDrwrMem' }
          ]
        }
      ]
      break
    // 出票登记(批量)
    case 'eweb-edraft.IssueRegisterBatch':
      list = [
        {
          formWidth: '50%',
          'slotName': 'ticketBill',
          group: [
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'total' }
          ]
        }
      ]
      break
    // 保证申请(单笔)
    case 'eweb-edraft.GuaranteeApply':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '保证类型', type: 'text', key: 'stdGuarTyp', formatter: (row, column, cellValue, index) => util.handleEnums(ensure_Type, column) },
            { disabled: true, label: '保证申请日期', type: 'text', key: 'stdApplDat', formatter: (row, column, cellValue, index) => util.separationDate(column) }
          ]
        },
        {
          formWidth: '50%',
          title: '被保证人信息',
          group: [
            { disabled: true, label: '被保证人账户', type: 'text', key: 'stdGteeAcc' },
            { disabled: true, label: '被保证人账户名称', type: 'text', key: 'stdGteeNam' },
            { disabled: true, label: '被保证人组织机构代码', type: 'text', key: 'stdGteeCod' },
            { disabled: true, label: '被保证人开户行号', type: 'text', key: 'stdGteeBnm' }
          ]
        },
        {
          formWidth: '50%',
          title: '保证人信息',
          group: [
            { disabled: true, label: '保证人名称', type: 'text', key: 'stdWareNam' },
            { disabled: true, label: '保证人账号', type: 'text', key: 'stdWareAcc' },
            { disabled: true, label: '保证人开户行号', type: 'text', key: 'stdWareBnm' }
          ]
        }
      ]
      break
    // 保证申请(批量)
    case 'eweb-edraft.GuaranteeApplyBatch':
      list = [
        {
          formWidth: '50%',
          'slotName': 'billTable',
          group: [
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'total' }
          ]
        },
        {
          formWidth: '50%',
          title: '被保证人信息',
          group: [
            { disabled: true, label: '被保证人账户', type: 'text', key: 'stdGteeAcc' },
            { disabled: true, label: '被保证人账户名称', type: 'text', key: 'stdGteeNam' },
            { disabled: true, label: '被保证人组织机构代码', type: 'text', key: 'stdGteeCod' },
            { disabled: true, label: '被保证人开户行号', type: 'text', key: 'stdGteeBnm' }
          ]
        },
        {
          formWidth: '50%',
          title: '保证人信息',
          group: [
            { disabled: true, label: '保证人名称', type: 'text', key: 'stdWareNam' },
            { disabled: true, label: '保证人账号', type: 'text', key: 'stdWareAcc' },
            { disabled: true, label: '保证人开户行号', type: 'text', key: 'stdWareBnm' }
          ]
        }
      ]
      break
    // 保证撤销
    case 'eweb-edraft.BzRevokeReq':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '票面收款人名称', type: 'text', key: 'stdPyeeNam' },
            { disabled: true, label: '票面付款人名称', type: 'text', key: 'stdDrwrNam' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdRvkrAcc' }
          ]
        }
      ]
      break
    // 保证应答（单笔）
    case 'eweb-edraft.BzCurrentSign':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdAccpAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '票面收款人名称', type: 'text', key: 'stdPyeeNam' },
            { disabled: true, label: '票面付款人名称', type: 'text', key: 'stdSgnrNam' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdSgnrAcc' },
            { disabled: true, label: '签收人地址', type: 'text', key: 'stdSgnrAdr' },
            { disabled: true, label: '应答意见', type: 'text', key: 'stdSgnrRes', formatter: (row, column, cellValue, index) => util.handleEnums(response_Type, column) }
          ]
        }
      ]
      break
    // 保证应答(批量)
    case 'eweb-edraft.BzCurrentSignBatch':
      list = [
        {
          formWidth: '50%',
          'slotName': 'billTable',
          group: [
            { disabled: true, label: '总金额', type: 'text', key: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '总笔数', type: 'text', key: 'total' }
          ]
        },
        {
          formWidth: '50%',
          title: '应答人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdSgnrAcc' },
            { disabled: true, label: '签收人地址', type: 'text', key: 'stdSgnrAdr' },
            { disabled: true, label: '应答意见', type: 'text', key: 'stdSgnrRes', formatter: (row, column, cellValue, index) => util.handleEnums(response_Type, column) }
          ]
        }
      ]
      break
    // 提示付款申请(单笔)
    case 'eweb-edraft.PaymentReminder':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '提示付款申请日期', type: 'text', key: 'stdApplDat', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '线上清算标志', type: 'text', key: 'stdSttlFlg', formatter: (row, column, cellValue, index) => util.handleEnums(clearing_Type, column) },
            { disabled: true, label: '逾期原因', type: 'text', key: 'stdOduersn', show: false },
            { disabled: true, label: '备注', type: 'text', key: 'std400Memo' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdPrsnAcc' }
          ]
        }
      ]
      break
    // 提示付款撤回
    case 'eweb-edraft.FkRevokeReq':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdRvkrAcc' }
          ]
        }
      ]
      break
    // 提示付款-付款签收
    case 'eweb-edraft.FkCurrentSign':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdAccpAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '收款人名称', type: 'text', key: 'stdPyeeNam' },
            { disabled: true, label: '承兑人名称', type: 'text', key: 'stdAccpNam' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdSgnrAcc' }
          ]
        }
      ]
      break
    // 提示付款-拒付
    case 'eweb-edraft.JfCurrentSign':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdAccpAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '收款人名称', type: 'text', key: 'stdPyeeNam' },
            { disabled: true, label: '承兑人名称', type: 'text', key: 'stdAccpNam' },
            { disabled: true, label: '拒付代码', type: 'text', key: 'stdDshnRcd', formatter: (key, value) => util.handleEnums(rcdCode_Type, value) },
            { disabled: true, label: '拒付备注', type: 'text', key: 'stdDshnRsn', show: false }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdSgnrAcc' }
          ]
        }
      ]
      break
    // 撤票申请
    case 'eweb-edraft.VacatePcle':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '出票人名称', type: 'text', key: 'stdAccpNam' },
            { disabled: true, label: '收款人名称', type: 'text', key: 'stdPyeeNam' },
            { disabled: true, label: '承兑行开户行号', type: 'text', key: 'stdDrwrBnm' }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdDrwrAcc' }
          ]
        }
      ]
      break
    // 同意清偿申请
    case 'eweb-edraft.AgreePayOff':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '追索人账号', type: 'text', key: 'stdAppAcct' },
            { disabled: true, label: '被追索人账号', type: 'text', key: 'stdRcvAcct' },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '追索金额', type: 'text', key: 'stdPpayAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '同意清偿金额', type: 'text', key: 'stdApayAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '同意清偿日期', type: 'text', key: 'stdApplDte', formatter: (row, column, cellValue, index) => util.separationDate(column) }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdRcvAcct' }
          ]
        }
      ]
      break
    // 同意清偿撤回
    case 'eweb-edraft.QcRevokeReq':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '追索人账号', type: 'text', key: 'stdPyeeAcc' },
            { disabled: true, label: '被追索人账号', type: 'text', key: 'stdRvkrAcc' },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '同意清偿金额', type: 'text', key: 'stdAccpAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '同意清偿日期', type: 'text', key: 'stdPyeeBnm', formatter: (row, column, cellValue, index) => util.separationDate(column) }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdRvkrAcc' }
          ]
        }
      ]
      break
      // 同意清偿应答
    case 'eweb-edraft.QcCurrentSign':
      list = [
        {
          formWidth: '50%',
          title: '票据信息',
          group: [
            { disabled: true, label: '票据号码', type: 'text', key: 'stdBillNum' },
            { disabled: true, label: '票据类型', type: 'text', key: 'stdBillTyp', formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, column) },
            { disabled: true, label: '出票日期', type: 'text', key: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面到期日', type: 'text', key: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(column) },
            { disabled: true, label: '票面金额', type: 'text', key: 'stdAccpAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '追索人账号', type: 'text', key: 'stdSgnrAcc' },
            { disabled: true, label: '被追索人账号', type: 'text', key: 'stdAppAcct' },
            { disabled: true, label: '应答意见', type: 'text', key: 'stdSgnrRes', formatter: (row, column, cellValue, index) => util.handleEnums(response_Type, column) }
          ]
        },
        {
          formWidth: '50%',
          title: '申请人信息',
          group: [
            { disabled: true, label: '客户账号', type: 'text', key: 'stdSgnrAcc' }
          ]
        }
      ]
      break
  }

  if (type === '1') {
    list[list.length] = {
      formWidth: '100%',
      slotName: 'formTable',
      group: [
        { disabled: false, label: '审核意见', type: 'radio', options: [{ value: '通过', key: '0' }, { value: '拒绝', key: '1' }], key: 'idea', changeEventName: 'on-idea-change' },
        { show: false, disabled: false, label: '拒绝原因', type: 'input', key: 'refuse' }
      ]
    }
  } else if (type === '2') {
    list[list.length] = {
      formWidth: '100%',
      slotName: 'formTable',
      group: [
        { disabled: true, label: '审核意见', type: 'radio', options: [{ value: '通过', key: '0' }, { value: '拒绝', key: '1' }], key: 'idea', changeEventName: 'on-idea-change' },
        { show: true, disabled: true, label: '拒绝原因', type: 'input', key: 'refuse' }
      ]
    }
  } else {
    list[list.length] = {
      formWidth: '100%',
      slotName: 'formTable',
      group: []
    }
  }

  return list
}
