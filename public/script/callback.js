
var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE浏览器
if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    var fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion < 9) {
        document.getElementById('down-ie9').style.display = 'block'
    }
}

// 密码控件输入按下事件响应方法
function KeyPressSuccess (ObjectID) {
    var _SecEditBox = document.getElementById(ObjectID)
    var strength = _SecEditBox.GetPasswordStrength()
    if (strength === 1) {
      strength = '弱'
    } else if (strength === 2) {
      strength = '中'
    } else if (strength === 3) {
      strength = '强'
    }
    var safetyDom = document.getElementById('safetyStrength')
    if (safetyDom) {
      safetyDom.innerText = '密码安全强度:' + strength
    }
  }
  // 密码控件键盘enter键按下事件响应方法
  function PressEnter () {
    var login = document.getElementById('loginBtn')
    if (login) {
      login.click()
    }
  }
