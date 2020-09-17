import log from './util.log.js'
import cookies from './util.cookies.js'
import { httpPost } from '@/api/sys/http'
import { getUser } from './getUser'

let util = {
  cookies,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || '大连银行'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}
/**
 * @name 获取当前url
 */
util.getUrl = function () {
  return window.location.protocol + '//' + window.location.host + window.location.pathname
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-menu-link')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-menu-link'))
}

/**
 * @description 获取金额格式化工具类实例
 * @param {Number} decimal 保留小数位数
 * @param {String} decimalPoint 小数点符号
 * @param {String} thousandsSeparator 千分位分割符
 * @returns {MoneyFormatter}
 */
util.getMoneyFormatterInstance = function (decimal = 0, decimalPoint = '.', thousandsSeparator = ',') {
  return new MoneyFormatter(decimal, decimalPoint, thousandsSeparator)
}
/**
 * 传入年份和月份 获取该年对应月份的天数
 */
util.getMonthDays = function (year, month) {
  // 当天数为0 js自动处理为上一月的最后一天
  let thisDate = new Date(year, month, 0)
  return thisDate.getDate()
}
/**
 * 格式化日期
 * @param {Date} date 需要格式化的日期
 */
util.formatDate = function (date) {
  let newDate = new Date(date)
  return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate()
}

/**
 * 格式化时间
 * @param {Date} date 需要格式化的时间
 */

util.formatTime = function (date) {
  let newDate = new Date(date)
  return newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds()
}
/**
 * 分隔时间,用于处理后台传来的时间字符串
 * @param {String} time 需要格式化的时间 例如: '120000'
 */
util.separationTime = function (time) {
  time = time || ''
  return time.substring(0, 2) + ':' + time.substring(2, 4) + ':' + time.substring(4, 6)
}
/**
 * 分隔时间,用于处理后台传来的时间字符串
 * @param {String} date 需要格式化的时间 例如: '20191005'
 */
util.separationDate = function (date) {
  if (date && date.indexOf('-') > 0) {
    return date
  } else {
    return date ? date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8) : ''
  }
}
/**
 * 分隔时间段,用于处理后台传来的时间段字符串
 * @param {String} date 需要格式化的时间段 例如: '201806-201806'
 */
util.separationTimeSlot = function (date) {
  date = date || ''
  return date.substring(0, 4) + '.' + date.substring(4, 11) + '.' + date.substring(11, 13)
}
/**
 * 分隔时间,用于处理后台传来的时间字符串
 * @param {String} date 需要格式化的时间 例如: '20191005'
 */
util.sepDate = function (date) {
  date = date || ''
  return date.substring(0, 4) + '.' + date.substring(4, 6) + '.' + date.substring(6, 8)
}
/**
 *
 * @param date 时间格式，年 月 日
 */
util.DepositDate = function (date) {
  date = date || ''
  return date.substring(0, 4) + '年' + date.substring(4, 6) + '月' + date.substring(6, 8) + '日'
}
/**
 * 分隔时间,用于处理后台传来的时间字符串
 * @param {String} date 需要格式化的时间 例如: '2019-10-05'
 */
util.separationStr = function (date) {
  date = date || ''
  return date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10)
}
/**
 * 分隔时间,用于处理后台传来的时间字符串
 * @param {String} date 需要格式化的时间 例如: '2019-10-05'
 */
util.separationStrDateWithLine = function (date) {
  date = date || ''
  return date.substring(0, 10)
}
/**
 * 分隔时间,用于处理后台传来的时间字符串
 * @param {String} date 需要格式化的时间 例如: '2019-10-05'
 */
util.separationStrTimeWithLine = function (date) {
  date = date || ''
  return date.substring(11, date.length)
}
/**
 * 分隔时间,用于处理后台传来的时间字符串
 * @param {String} time 需要格式化的时间 例如: '140208'
 */
util.separationTime = function (time) {
  return time ? time.substring(0, 2) + ':' + time.substring(2, 4) + ':' + time.substring(4, 6) : ''
}

/**
 * 分隔时间,用于处理后台传来的时间字符串
 * @param {String} time 需要格式化的时间 例如: '140208'
 */
util.formatTransTime = function (time) {
  return time ? util.separationDate(time) + ' ' + util.separationTime(time.substring(8, 14)) : ''
}
/**
 * @name: 处理枚举
 * @param {Array} array 待遍历的数组
 * @param {String} value 需要的键值
 */
util.handleEnums = function (array, value) {
  const target = array.find(item => item.value === value)
  return target ? target.label : value ? `未知状态${value},请联系银行人员` : ''
}
/**
 * @name 校验手机号
 * @param {String} value 校验数据
 * @param {function} callback 回调函数
 */
util.verifyMobile = function (value, callback) {
  const reg = /^1\d{10}$/
  if (value && reg.test(value) === false) {
    callback(new Error('手机号输入格式错误'))
  } else {
    callback()
  }
}
/**
 * @name 校验电话号
 * @param {String} value 校验数据
 * @param {function} callback 回调函数
 */
util.verifyTelePhone = function (value, callback) {
  const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
  // /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
  if (value && reg.test(value) === false) {
    callback(new Error('电话号码输入错误, 例如: 0xxx-xxxxxxx'))
  } else {
    callback()
  }
}
/**
 * @name 校验邮箱
 * @param {String} value 校验数据
 * @param {function} callback 回调函数
 */
util.verifyEmail = function (value, callback) {
  // const reg = /^[0-9a-zA-Z@.]\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
  if (value && reg.test(value) === false) {
    callback(new Error('邮箱输入错误,支持内容：xxxx@xx.com,不支持汉字'))
  } else {
    callback()
  }
}
/**
 * @name 校验昵称
 * @param {String} value 校验数据
 * @param {function} callback 回调函数
 */
util.verifyNickName = function (value, callback) {
  const reg = /[a-zA-Z]|[\u4e00-\u9fa5]|[0-9]/g
  if (!value) {
  } else if (value.indexOf(' ') !== -1) {
    callback(new Error('昵称输入错误,不支持空格, 昵称规则：数字、汉字和大小写字母的任意组合，不能为纯数字，不能输入特殊字符，长度不能超过20个汉字'))
  } else if (value.length > 20) {
    callback(new Error('昵称输入错误,输入超过20个字符, 昵称规则：数字、汉字和大小写字母的任意组合，不能为纯数字，不能输入特殊字符，长度不能超过20个汉字'))
  } else if (/[\uFF00-\uFFFF]/g.test(value)) {
    callback(new Error('昵称输入错误,不支持全角字符, 昵称规则：数字、汉字和大小写字母的任意组合，不能为纯数字，不能输入特殊字符，长度不能超过20个汉字'))
  } else if (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
    callback()
  } else if (reg.test(value) === false) {
    callback(new Error('昵称输入错误,不支持特殊字符, 昵称规则：数字、汉字和大小写字母的任意组合，不能为纯数字，不能输入特殊字符，长度不能超过20个汉字'))
  } else if (/^[0-9]*$/g.test(value)) {
    callback(new Error('昵称输入错误,不支持纯数字, 昵称规则：数字、汉字和大小写字母的任意组合，不能为纯数字，不能输入特殊字符，长度不能超过20个汉字'))
  } else {
    callback()
  }
}
/**
 * @name 校验邮编
 * @param {String} value 校验数据
 * @param {function} callback 回调函数
 */
util.verifyPostcode = function (value, callback) {
  const reg = /^[0-9]\d{5}$/
  if (value && reg.test(value) === false) {
    callback(new Error('邮编输入错误'))
  } else {
    callback()
  }
}
/**
 * @name 校验金额
 * @param {String} value 校验数据
 * @param {function} callback 回调函数
 */
util.verifyAmount = function (value, callback) {
  const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  if (value && reg.test(value) === false) {
    callback(new Error('金额输入错误'))
  } else {
    callback()
  }
}

/**
 * @name 限制纯数字输入
 * @param {String} value 值
 * @returns {String} 处理后的值
 */

util.limitInputInt = function (value) {
  // 先把非数字的都替换掉，除了数字和.
  value = value.replace(/[^\d]/g, '')
  return value
}

/**
 * @name 限制金额输入
 * @param {String} value 金额
 * @returns {String} 处理后的金额
 */

util.limitInputMoney = function (value, length) {
  length = length || 2
  // 先把非数字的都替换掉，除了数字和.
  value = value.replace(/[^\d.]/g, '')
  // value = value.replace(/[^\d.]/g, '')
  // 必须保证第一个为数字而不是.
  value = value.replace(/^\./g, '')
  // 保证只有出现一个.而没有多个.
  value = value.replace(/\.{2,}/g, '.')
  // 保证.只出现一次，而不能出现两次以上
  value = value.replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
  if (length === 2) {
    value = value.replace(
      /^(-)*(\d+)\.(\d{2}).*$/,
      '$1$2.$3'
    ) // 只能输入两个小数
  } else if (length === 4) {
    value = value.replace(
      /^(-)*(\d+)\.(\d{4}).*$/,
      '$1$2.$3'
    ) // 只能输入两个小数
  }

  var t = value.charAt(0)
  var n = value.charAt(1)
  if (t === '0' && n !== '.') {
    value = '0'
  }
  if (value.indexOf('.') === -1 && value.length > 12) {
    value = value.substring(0, 12)
  }
  return value
}
/**
 * @name 限制利率输入
 * @param {String} value 金额
 * @returns {String} 处理后的金额
 */

util.limitInputInterestRate = function (value) {
  // 先把非数字的都替换掉，除了数字和.
  value = value.replace(/[^\d.]/g, '')
  // value = value.replace(/[^\d.]/g, '')
  // 必须保证第一个为数字而不是.
  value = value.replace(/^\./g, '')
  // 保证只有出现一个.而没有多个.
  value = value.replace(/\.{2,}/g, '.')
  // 保证.只出现一次，而不能出现两次以上
  value = value.replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
  value = value.replace(
    /^(-)*(\d+)\.(\d\d\d\d).*$/,
    '$1$2.$3'
  ) // 只能输入四个小数
  var t = value.charAt(0)
  var n = value.charAt(1)
  if (t === '0' && n !== '.') {
    value = '0'
  }
  if (value.indexOf('.') === -3 && value.length > 10) {
    value = value.substring(0, 10)
  }
  return value
}

util.isBackspace = function (keyCode) {
  return keyCode === 8 || keyCode === 9
}
util.isDot = function (keyCode) {
  return keyCode === 46 || keyCode === 190 || keyCode === 110 || keyCode === 229
}
util.isNumber = function (keyCode) {
  return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)
}
util.isPinYin = function (keyCode) {
  // todo 存在bug: 拼音打字输入字母然后会出现输入不了的情况,需要鼠标重新点击输入框获取操作焦点
  return (keyCode === 229)
}
/**
 * @name 限制金额按键输入
 * @param {Object} e 按键事件返回数据
 */
util.limitMoneyInputKeyDown = function (e) {
  const keyCode = e.keyCode
  if (
    !util.isBackspace(keyCode) &&
    !util.isDot(keyCode) &&
    !util.isNumber(keyCode) &&
    !util.isPinYin(keyCode)
  ) {
    // 其他按键
    e.preventDefault()
    e.stopPropagation()
    return false
  }
}
// /**
//  * @name 获取余额
//  * @param {Object} param { payerAcNo: '账号', payerSubAcNo: '子账户序号'} 账号信息
//  * @returns 返回余额
//  */
// util.getAvailBal = function (params) {
//   httpPost('eweb-acmgmt.AccountInfoQuery.do', params).then(res => {
//     return res
//   }).catch(() => {
//     return {
//       availBal: '',
//       balance: ''
//     }
//   })
// }
/**
 * 将付款账号格式化
 * @param {Object} item 付款账户信息
 * @returns {String} 格式化后的字符串
 */
util.getPayerAccount = function (item) {
  const subAcNo = item.subAcNo ? item.subAcNo === '000156' ? '' : ('/' + item.subAcNo) : ''
  const acName = item.acName ? '/' + item.acName : ''
  const acAlias = item.acAlias ? '/' + item.acAlias : ''
  return item.acNo + subAcNo + acName + acAlias
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type StringqueryIndex
 */
util.formatCurrency = function (value, str) {
  if (!str) str = ''
  // str 规定货币类型
  if (value !== 0 && !value) return '--'
  let val = value // 提前保留两位小数
  let intPart = parseInt(val) // 获取整数部分
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断 ？？？
  let floatPart = '.00' // 预定义小数部分
  val = val.toString() // 将number类型转为字符串类型，方便操作
  let value2Array = val.split('.')
  if (value2Array.length === 2) { // =2表示数据有小数位
    floatPart = value2Array[1].substr(0, 2) // 拿到小数部分
    if (floatPart.length === 1) { // 补0,实际上用不着
      return str + intPartFormat + '.' + floatPart + '0'
    } else {
      return str + intPartFormat + '.' + floatPart
    }
  } else {
    return str + intPartFormat + floatPart
  }
  // num = num || ''
  // let flag = false
  // if (num * 1 < 0) {
  //   flag = true
  //   num = num.slice(1)
  // }
  // num = num.toString().replace(/\$|,/g, '')
  // if (isNaN(num)) { num = '0' }
  // let sign = (Number(num) === Math.abs(num))
  // num = Math.floor(num * 100 + 0.50000000001)
  // let cents = num % 100
  // num = Math.floor(num / 100).toString()
  // if (cents < 10) { cents = '0' + cents }
  // for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
  //   num = num.substring(0, num.length - (4 * i + 3)) + ',' +
  //       num.substring(num.length - (4 * i + 3))
  // }
  // if (flag) {
  //   return '-' + (((sign) ? '' : '') + num + '.' + cents)
  // } else {
  //   return (((sign) ? '' : '') + num + '.' + cents)
  // }
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式 (网银日志)
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type StringqueryIndex
 */
util.formatCurrencyForm = function (value, str) {
  if (!str) str = ''
  // str 规定货币类型
  if (!value) return '---'
  let val = Number(value).toFixed(2) // 提前保留两位小数
  let intPart = parseInt(val) // 获取整数部分
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断 ？？？
  let floatPart = '.00' // 预定义小数部分
  val = val.toString() // 将number类型转为字符串类型，方便操作
  let value2Array = val.split('.')
  if (value2Array.length === 2) { // =2表示数据有小数位
    floatPart = value2Array[1].toString() // 拿到小数部分
    if (floatPart.length === 1) { // 补0,实际上用不着
      return str + intPartFormat + '.' + floatPart + '0'
    } else {
      return str + intPartFormat + '.' + floatPart
    }
  } else {
    return str + intPartFormat + floatPart
  }
}

/**
 * 格式化成利率形式
 * 关键词: 利率、利息
 * @param num 数值(Number或者String)
 * @return 利率格式的字符串,如'3.456'
 * @type StringqueryIndex
 */
util.formatInterestRate = function (num) {
  num = parseFloat(num) || ''
  const items = num.toString().split('.')
  const intPart = items[0] || '0'
  let floatPart = items.length >= 2 ? items[1] : '00'
  if (floatPart.length < 2) {
    floatPart += '0'
  }
  // num = Math.floor(num * 1000)
  // let cents = num % 1000
  // num = Math.floor(num / 1000).toString()

  // if (cents < 100) {
  //   cents = '0' + cents
  // }
  // if (cents < 10) {
  //   cents = '0' + cents
  // }
  // num = num.substring(0, num.indexOf('.') + 4)
  return (intPart + '.' + floatPart)
}

/**
 * @name hideMsg
 * 隐藏字段
 * @param { String } value 进行处理的字符串
 * @param {Number} start 头部显示长度
 * @param {Number} end 结尾显示长度
 * @return 隐藏的信息,如'112*****45'
 */

util.hideMsg = function (value, start, end) {
  start = start || 4
  end = end || 4
  return value ? value.substr(0, start) + '****' + value.substr(-end) : ''
}

/**
 * 证件号码脱敏处理
 */
util.acNoFormatExt = (acno, beginIndex = 4, endIndex = 4, replace = '*') => {
  let sb = ''
  let acNochars = acno.split('')
  let lg = acno.length
  let mm = beginIndex + endIndex - lg
  if (mm > 0) {
    beginIndex = beginIndex - mm > 0 ? beginIndex - mm : 0
  }
  for (let i = 0; i < acNochars.length; i++) {
    if (i >= beginIndex && i <= (acNochars.length - endIndex)) {
      sb = sb + replace
    } else {
      sb = sb + acNochars[i]
    }
  }
  return sb.toString()
}

/**
 * 定时归集每月修改
 */
util.getMonthCode = (obj, list) => {
  let y = new Date().getFullYear()
  list.forEach((item, index) => {
    if (!obj[item] || obj[item].length === 0) {
      let len = new Date(y, index + 1, 0).getDate()
      for (let i = 0; i < len; i++) {
        obj[item] += '0'
      }
    }
  })
  return obj
}

/**
 * @name hideMoney
 * 隐藏字段
 * @param { String } value 进行处理的字符串
 * @return 隐藏的信息,如'*****'
 */

util.hideMoney = function (value) {
  return '*********'
}

/**
 * 金额转大写金额
 * @param n
 * @returns {string}
 */
util.getMoneyHanzi = function (n) {
  let str = 0
  n = typeof n === 'number' ? n + '' : n
  str = n.substring(n.indexOf('.') + 1, n.indexOf('.') + 3)
  let fraction = ['角', '分']
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    if (i === 0) {
      s += (digit[parseInt(n * 10 * Math.pow(10, i) % 10)] + fraction[i]).replace(/零./, '')
    } else if (i === 1) {
      if (str.length === 2) {
        if (str.substring(0, 1) === '0') {
          s = '零角'
        }
        if (str.substring(0, 2) === '00') {
          s = '整'
        }
      }
      s += (digit[(n * 10 * Math.pow(10, i) % 10).toFixed(0)] + fraction[i]).replace(/零./, '')
    }
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  let sum = s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
  return sum
}

/*
* 深拷贝
* */
util.deepClone = (obj) => {
  if (typeof obj !== 'object') {
    return obj
  }

  const copy = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      if (typeof value === 'object') {
        copy[key] = this.deepClone(value)
      } else {
        copy[key] = value
      }
    }
  }

  return copy
}
/**
 * 日期选择器 yyyy-mm-dd
 * 获取明天日期
 */
util.filterNextDate = (data) => {
  // 获取当前日期
  var endDate = new Date()
  // 格式化日期
  var date = endDate.getTime()
  // 定义返回明天日期
  var start = ''
  var startDate = ''
  var startYear = ''
  var startMonth = ''
  var startDay = ''
  // 定义今天日期
  var endYear = endDate.getFullYear()
  var endMonth = endDate.getMonth() + 1
  var endDay = endDate.getDate()
  endMonth = endMonth > 9 ? endMonth : `0${endMonth}`
  endDay = endDay > 9 ? endDay : `0${endDay}`
  endDate = `${endYear}-${endMonth}-${endDay}`
  switch (data) {
    case '0':
      start = date + 24 * 60 * 60 * 1000
      startDate = new Date(start)
      startYear = startDate.getFullYear()
      startMonth = startDate.getMonth() + 1
      startDay = startDate.getDate()
      startMonth = startMonth > 9 ? startMonth : `0${startMonth}`
      startDay = startDay > 9 ? startDay : `0${startDay}`
      startDate = `${startYear}-${startMonth}-${startDay}`
      return { startDate, endDate }
  }
}
/**
 * 日期选择器 yyyy-mm-dd
 */
util.filterDate = (data) => {
  // 获取当前日期
  var endDate = new Date()
  // 格式化日期
  var date = endDate.getTime()
  // 定义返回开始日期
  var start = ''
  var startDate = ''
  var startYear = ''
  var startMonth = ''
  var startDay = ''
  // 定义返回结束日期
  var endYear = endDate.getFullYear()
  var endMonth = endDate.getMonth() + 1
  var endDay = endDate.getDate()
  endMonth = endMonth > 9 ? endMonth : `0${endMonth}`
  endDay = endDay > 9 ? endDay : `0${endDay}`
  endDate = `${endYear}-${endMonth}-${endDay}`
  switch (data) {
    case '0':
      start = date - 24 * 60 * 60 * 1000 * 7
      startDate = new Date(start)
      startYear = startDate.getFullYear()
      startMonth = startDate.getMonth() + 1
      startDay = startDate.getDate()
      startMonth = startMonth > 9 ? startMonth : `0${startMonth}`
      startDay = startDay > 9 ? startDay : `0${startDay}`
      startDate = `${startYear}-${startMonth}-${startDay}`
      return { startDate, endDate }
    case '1':
      start = date - 24 * 60 * 60 * 1000 * 30
      startDate = new Date(start)
      startYear = startDate.getFullYear()
      startMonth = startDate.getMonth() + 1
      startDay = startDate.getDate()
      startMonth = startMonth > 9 ? startMonth : `0${startMonth}`
      startDay = startDay > 9 ? startDay : `0${startDay}`
      startDate = `${startYear}-${startMonth}-${startDay}`
      return { startDate, endDate }
    case '2':
      start = date - 24 * 60 * 60 * 1000 * 30 * 3
      startDate = new Date(start)
      startYear = startDate.getFullYear()
      startMonth = startDate.getMonth() + 1
      startDay = startDate.getDate()
      startMonth = startMonth > 9 ? startMonth : `0${startMonth}`
      startDay = startDay > 9 ? startDay : `0${startDay}`
      startDate = `${startYear}-${startMonth}-${startDay}`
      return { startDate, endDate }
    case '3':
      start = date - 24 * 60 * 60 * 1000 * 30 * 6
      startDate = new Date(start)
      startYear = startDate.getFullYear()
      startMonth = startDate.getMonth() + 1
      startDay = startDate.getDate()
      startMonth = startMonth > 9 ? startMonth : `0${startMonth}`
      startDay = startDay > 9 ? startDay : `0${startDay}`
      startDate = `${startYear}-${startMonth}-${startDay}`
      return { startDate, endDate }
  }
}
/**
 * 日期选择器 yyyymmdd
 */
util.filterDate1 = (data) => {
  // 获取当前日期
  var endDate = new Date()
  // 格式化日期
  var date = endDate.getTime()
  // 定义返回开始日期
  var start = ''
  var startDate = ''
  var startYear = ''
  var startMonth = ''
  var startDay = ''
  // 定义返回结束日期
  var endYear = endDate.getFullYear()
  var endMonth = endDate.getMonth() + 1
  var endDay = endDate.getDate()
  endMonth = endMonth > 9 ? endMonth : `0${endMonth}`
  endDay = endDay > 9 ? endDay : `0${endDay}`
  endDate = `${endYear}${endMonth}${endDay}`
  switch (data) {
    case '0':
      start = date - 24 * 60 * 60 * 1000 * 7
      startDate = new Date(start)
      startYear = startDate.getFullYear()
      startMonth = startDate.getMonth() + 1
      startDay = startDate.getDate()
      startMonth = startMonth > 9 ? startMonth : `0${startMonth}`
      startDay = startDay > 9 ? startDay : `0${startDay}`
      startDate = `${startYear}${startMonth}${startDay}`
      return { startDate, endDate }
    case '1':
      start = date - 24 * 60 * 60 * 1000 * 30
      startDate = new Date(start)
      startYear = startDate.getFullYear()
      startMonth = startDate.getMonth() + 1
      startDay = startDate.getDate()
      startMonth = startMonth > 9 ? startMonth : `0${startMonth}`
      startDay = startDay > 9 ? startDay : `0${startDay}`
      startDate = `${startYear}${startMonth}${startDay}`
      return { startDate, endDate }
    case '2':
      start = date - 24 * 60 * 60 * 1000 * 30 * 3
      startDate = new Date(start)
      startYear = startDate.getFullYear()
      startMonth = startDate.getMonth() + 1
      startDay = startDate.getDate()
      startMonth = startMonth > 9 ? startMonth : `0${startMonth}`
      startDay = startDay > 9 ? startDay : `0${startDay}`
      startDate = `${startYear}${startMonth}${startDay}`
      return { startDate, endDate }
    case '3':
      start = date - 24 * 60 * 60 * 1000 * 30 * 6
      startDate = new Date(start)
      startYear = startDate.getFullYear()
      startMonth = startDate.getMonth() + 1
      startDay = startDate.getDate()
      startMonth = startMonth > 9 ? startMonth : `0${startMonth}`
      startDay = startDay > 9 ? startDay : `0${startDay}`
      startDate = `${startYear}${startMonth}${startDay}`
      return { startDate, endDate }
  }
}
/**
 * @name: 格式化时间
 * @param: date Date 日期
 */
util.standardDate = function (date) {
  // 获取当前日期
  var theDate = date ? new Date(date) : new Date()
  // 格式化日期
  // 定义返回结束日期
  let theYear = theDate.getFullYear()
  let theMonth = theDate.getMonth() + 1
  let theDay = theDate.getDate()
  theMonth = theMonth > 9 ? theMonth : `0${theMonth}`
  theDay = theDay > 9 ? theDay : `0${theDay}`
  theDate = `${theYear}${theMonth}${theDay}`
  return theDate
}
/**
 * @name: 格式化时间
 * @param: date Date 日期 YYYY-MM-DD
 */
util.formatDate = function (date) {
  // 获取当前日期
  var theDate = date ? new Date(date) : new Date()
  // 格式化日期
  // 定义返回结束日期
  let theYear = theDate.getFullYear()
  let theMonth = theDate.getMonth() + 1
  let theDay = theDate.getDate()
  theMonth = theMonth > 9 ? theMonth : `0${theMonth}`
  theDay = theDay > 9 ? theDay : `0${theDay}`
  theDate = `${theYear}-${theMonth}-${theDay}`
  return theDate
}
/**
 * 数组扁平化
 * @param nodes 节点数组
 * @param field 子节点键名
 * @returns {unknown[]}
 */
util.flatMap = function (nodes = [], field = 'children') {
  return nodes.map(node => {
    let childNodes = node[field]
    if (Array.isArray(childNodes) && childNodes.length > 0) {
      childNodes = flatMapHandler(node, field)
      return { ...node, [field]: childNodes }
    } else {
      return node
    }
  })
}

util.collatedDecimalsFormat = (val) => {
  if (val) {
    let n = String(val * 100)
    if (n === '0') {
      return '0.00%'
    } else {
      let reg = /\./
      let flag = reg.test(n)
      if (flag) {
        if (n.split('.')[1].length >= 2) {
          return `${n}%`
        } else {
          return `${n}0%`
        }
      } else {
        return `${n}.00%`
      }
    }
  }
}

const flatMapHandler = (node, field) => {
  let _childNodes = []
  const childNodes = node[field]

  if (Array.isArray(childNodes) && childNodes.length > 0) {
    childNodes.forEach(subNode => {
      _childNodes = [..._childNodes, ...flatMapHandler(subNode, field)]
    })
  } else {
    _childNodes = [..._childNodes, node]
  }

  return _childNodes
}

/**
 * 金额格式化工具类
 */
class MoneyFormatter {
  // 保留小数位数
  decimal
  // 小数点符号
  decimalPoint
  // 千分位分割符号
  thousandsSeparator

  constructor (decimal = 0, decimalPoint = '.', thousandsSeparator = ',') {
    this.decimal = decimal
    this.decimalPoint = decimalPoint
    this.thousandsSeparator = thousandsSeparator
  }

  parse (value) {
    if (typeof value !== 'string') {
      return value
    }

    return Number.parseFloat(value.replace(new RegExp(this.thousandsSeparator, 'g'), ''))
  }

  format (value) {
    const numberStr = (value + '').replace(/[^0-9+-Ee.]/g, '')
    const n = !Number.isFinite(+numberStr) ? 0 : +numberStr
    const prec = !Number.isFinite(+this.decimal) ? 0 : Math.abs(this.decimal)
    let s = ''
    const toFixedFix = function (n, prec) {
      const k = Math.pow(10, prec)
      return '' + Math.ceil(n * k) / k
    }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    const re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + this.thousandsSeparator + '$2')
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(this.decimalPoint)
  }
}

// 返回客户端核心标识："CSII-ClientEBank"
function GetCoreBrowser () {
  var u
  try {
    u = csii_get_corebrowser()
    return u
  } catch (e) {
    u = navigator.userAgent
    return u
  }
}

// 返回登录页面，一般在未登录时使用
util.ReLogin = (fun) => {
  localStorage.clear()
  if (GetCoreBrowser() === 'CSII-ClientEBank') {
    csii_cef_gologin()
  } else {
    // 原有返回到登录页逻辑
    fun()
  }
}
util.getlogininfo = () => {
  if (GetCoreBrowser() === 'CSII-ClientEBank') {
    var info = csii_cef_get_logininfo()
    return info
  } else {
  }
}

export default util

// 获取页面元素绝对定位的left

util.getElementLeft = (element) => {
  var actualLeft = element.offsetLeft
  var current = element.offsetParent
  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }

  return actualLeft
}

// 获取页面元素绝对定位的top

util.getElementTop = (element) => {
  var actualTop = element.offsetTop
  var current = element.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  const height = document.body.clientHeight || 0// 可见高度
  return actualTop - height / 2
}

util.getPostscript = () => {
  let post = [
    { value: '货款', key: 0 },
    { value: '劳务费', key: 1 },
    { value: '往来', key: 2 }
  ]
  httpPost('/eweb-transfer.TransferRemarkManage.do', {
    trsFlag: '0',
    remarkName: ''
  }).then(res => {
    res.remrkNameList.forEach((item, index) => post.push({ value: item.remarkName, key: (index + 3) }))
  })
  return post
}

/**
 * @name 获取谷歌浏览器版本
 */
util.getChromeVersion = () => {
  var arr = navigator.userAgent.split(' ')
  var chromeVersion = ''
  for (var i = 0; i < arr.length; i++) {
    if (/chrome/i.test(arr[i])) { chromeVersion = arr[i] }
  }
  if (chromeVersion) {
    return Number(chromeVersion.split('/')[1].split('.')[0])
  } else {
    return false
  }
}

util.getIEVersion = () => {
  const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE浏览器
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    var fIEVersion = parseFloat(RegExp['$1'])
    return fIEVersion
  } else {
    return false
  }
}

/**
 * @name 获取loginType
 */

util.getLoginType = () => {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'production') {
    return location.port === '444' ? 'C' : 'R'
  } else {
    const userLoginType = getUser() ? getUser().loginType : 'R'
    return localStorage.loginType === 'C' ? 'C' : userLoginType === 'C' ? 'C' : 'R'
  }
}

/**
 * @name 获取跳转login页的路由
 */

util.getLoginRouter = () => {
  if (process.env.NODE_ENV === 'production') {
    return '/login'
  } else {
    return '/login?loginType=' + util.getLoginType()
  }
}

// 隐藏浏览器自动添加的页眉页签

util.pagesetup_null = () => {
  var hkey_root, hkey_path, hkey_key
  hkey_root = 'HKEY_CURRENT_USER'
  hkey_path = '\\Software\\Microsoft\\Internet Explorer\\PageSetup\\'
  try {
    var RegWsh = new ActiveXObject('WScript.Shell')
    hkey_key = 'header'
    RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, '')
    hkey_key = 'footer'
    RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, '')
  } catch (e) { }
}
// 打印页面, 需要将不需要打印的元素的class加一个no-print的样式名
util.handerPrint = () => {
  const notPrintDoms = document.getElementsByClassName('no-print')
  for (let i = 0; i < notPrintDoms.length; i++) {
    notPrintDoms[i].style.display = 'none'
  }
  document.getElementById('router-view').style.width = '1080px'
  util.pagesetup_null()
  window.print()
  document.getElementById('router-view').style.width = ''
  for (let i = 0; i < notPrintDoms.length; i++) {
    notPrintDoms[i].style.display = 'block'
  }
}
