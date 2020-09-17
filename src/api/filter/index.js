import Vue from 'vue'
import util from '../../libs/util'

// 过滤时间 格式 xxxx-xx-xx xx:xx:xx
Vue.filter('formatDate', function (val) {
  const date = new Date(val)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
})

// formatTransTime
// 过滤时间 格式 xxxx-xx-xx xx:xx:xx
Vue.filter('formatTransTime', function (val) {
  return util.formatTransTime(val)
})

// 过滤时间 格式 xxxx-xx-xx
Vue.filter('formatDay', function (val) {
  const date = new Date(val)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  return `${year}-${month}-${day}`
})

// 过滤时间 格式 xx:xx:xx
Vue.filter('formatTime', function (val) {
  const date = new Date(val)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${hours}:${minutes}:${seconds}`
})

// 过滤金额 三位一逗号隔开，保留两位小数
Vue.filter('Money', (value, str) => {
  return util.formatCurrency(value)
})

// 过滤手机号
Vue.filter('telFormat', (value, str) => {
  // 参数 str 规定电话之间拼接的符号
  if (!value) return ''
  str = str || ' '
  value = value.toString().split('')
  value.splice(3, 0, str)
  value.splice(8, 0, str)
  return value.join('')
})

// 保留 N 位小数
Vue.filter('fixed', (value, n) => {
  if (!value) return ''
  n = n || 1
  return value.toFixed(n)
})

// Vue.filter('jump', (num) => {
//   let endNum = num
//   let startNum = 0
//   let endTime = 70
//   // let stepNum = 0;
//   let newInterval = setInterval(() => {
//     if (num <= endNum) {
//       endTime -= 0.01
//       let strNum = num.toString()
//       if (strNum.length < 6) {
//         let Range = endNum * 1 - startNum
//         let Rand = Math.random()
//         num = startNum + Math.round(Rand * Range)
//         startNum = num
//         return num
//       } else if (strNum.length >= 6 && strNum.length < 14) {
//         let Range = endNum * 1 - startNum
//         let Rand = Math.random()
//         num = startNum + Math.round(Rand * Range)
//         startNum = num
//         return num
//       } else {
//         let Range = endNum * 1 - startNum
//         let Rand = Math.random()
//         num = startNum + Math.round(Rand * Range)
//         startNum = num
//         return num
//       }
//     } else {
//       num = endNum
//       clearInterval(newInterval)
//       return num
//     }
//   }, endTime)
// })
