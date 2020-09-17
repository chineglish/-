import { httpPost } from '@/api/sys/http'
import { MessageBox } from 'element-ui'
import util from '../../libs/util'

/**
 * U盾工具类
 * 用于 创建UKey实例，获取UKey输入的安全密码，清楚输入密码
 */
class UKey {
  // u-key 容器
  _element
  // u-key 控件
  _SecEditBox
  // u-key 控件ID
  _objectId
  // U盾配置
  _config = [
    // 控件的ID，在控件回调javascript函数的时候用来确认是哪个控件调用了javascript函数
    { name: 'ObjectID', value: '' },
    // 密码的最小长度限制数
    { name: 'MinLength', value: '0' },
    // 密码的最大长度限制数
    { name: 'MaxLength', value: '16' },
    // 算法类型，0：RSA， 1：SM2
    { name: 'CipherType', value: '1' },
    // 检测到大写锁定按键按下时是否使用气泡提示。默认提示。0：提示大写锁定，1：不提示
    { name: 'CapsLockTip', value: '0' },
    // 控件边框宽度，默认值为1，设置为0则没有边框
    { name: 'BorderWidth', value: '0' },
    // 控件边框颜色设置参数，需要同时设置控件边框默认颜色与焦点在控件之上（即控件被选中时的颜色）。格式如下：“#CCEEFF|#FF0”。两个颜色均为标准CSS颜色格式，中间使用“|”分隔。前面的颜色为普通显示的颜色，后面的颜色为控件被选中时的颜色。不设置此参数时边框正常状态默认颜色为#D9D9D9，默认焦点在边框之上时颜色为#4D90FE
    { name: 'BorderColor', value: '#DCDFE6|#CE5C65' },
    // 控件背景色设置参数，需要同时设置控件默认颜色与焦点在控件之上（即控件被选中时的颜色）。格式如下：“#CF9|#BBFF66”。两个颜色均为标准CSS颜色格式，中间使用“|”分隔。前面的颜色为普通显示的颜色，后面的颜色为控件被选中时的颜色
    { name: 'BackgroundColor', value: '|#FFF' },
    // 输入密码复杂度判断正则表达式
    // { name: 'IntensityRegExp', value: '(^[!-~]*[A-Za-z]+[!-~]*[0-9]+[!-~]*$)|(^[!-~]*[0-9]+[!-~]*[A-Za-z]+[!-~]*$)' },
    { name: 'IntensityRegExp', value: '(^[!-~]*[A-Za-z]+[!-~]*[0-9]+[!-~]*$)|(^[!-~]*[0-9]+[!-~]*[A-Za-z]+[!-~]*$)' },
    // 允许输入字符集正则表达式
    // { name: 'RestrictRegExp', value: '([!-~]+)' },
    { name: 'RestrictRegExp', value: '([0-9A-Za-z]$)' },
    // 服务器端产生的随机数，BASE64编码格式
    // { name: 'ServerRandom', value: 'MDEyMzQ1Njc4OWFiY2RlZg==' }
    { name: 'ServerRandom', value: '' }
  ]

  constructor (element, objectId, config) {
    const chromeVersion = util.getChromeVersion()
    if (chromeVersion && chromeVersion > 43) {
      MessageBox.alert('当前使用谷歌版本超过chrome43,密码安全控件只适用与chrome43以下版本！')
      throw new Error('当前使用谷歌版本超过chrome43')
    } else
    if (!(element instanceof HTMLElement)) {
      console.log(element)
      MessageBox.alert('CFCA安全控件实例创建失败，没有指定DOM元素！')
      throw new Error('CFCA安全控件实例创建失败，没有指定DOM元素！')
    } else if (!(typeof objectId === 'string' && objectId.length > 0)) {
      MessageBox.alert('CFCA安全控件实例创建失败，没有指定UKey控件ID！')
      throw new Error('CFCA安全控件实例创建失败，没有指定UKey控件ID！')
    }
    this._element = element
    this._objectId = objectId
    this._config = config || this._config
    this._config[0].value = objectId
    this.loadObject()
  }

  async loadObject () {
    // 模拟 请求服务端获取公钥，重新配置U盾参数
    let publicKey = ''
    try {
      publicKey = await this.getPublicKey()
    } catch (e) {
      console.error(e)
      MessageBox.alert('CFCA安全控件初始化失败，获取服务端随机数值出错！请刷新再试试！', {
        confirmButtonText: '刷新',
        callback: action => {
          location.reload()
        }
      })
      throw new Error('CFCA安全控件初始化失败，获取服务端随机数值出错！')
    }
    this._config[this._config.length - 1].value = publicKey
    const paramTagList = this.getParamTagList()

    if (window.navigator.appName.indexOf('Internet') >= 0 || window.navigator.appVersion.indexOf('Trident') >= 0) {
      if (window.navigator.cpuClass === 'x86') {
        this._element.innerHTML = `<object id="${this._objectId}" codebase="SecEditCtl.BankOfDL.x86.cab" classid="clsid:3F2B06D6-2AF8-44A7-93D3-0368BB05851C" @PressTab="intPassword" width="100%" height="29">${paramTagList}</object>`
      } else {
        this._element.innerHTML = `<object id="${this._objectId}" codebase="SecEditCtl.BankOfDL.x64.cab" classid="clsid:BF9DA1C2-5B75-4732-B0ED-87A845F3E2D3" @PressTab="intPassword" width="100%" height="29">${paramTagList}</object>`
      }
    } else {
      this._element.innerHTML = `<object id="${this._objectId}" type="application/npSecEditCtl.BankOfDL.x86" width="100%" height="29" @PressTab="intPassword">${paramTagList}</object>`
    }

    window.setTimeout(() => {
      this._SecEditBox = this._element.querySelector('#' + this._objectId)
      try { this._SecEditBox.GetVersion() } catch (e) {
        MessageBox.alert('未安装安全控件,请先安装!!!').then(() => {
          let dom = document.getElementById('a-download')
          dom.href = `${util.getUrl()}resources/passwordControl.exe`
          dom.download = '密码控件.exe'
          dom.click()
        })
      }
    }, 0)
  }

  getData () {
    // 获取安全控件数据
    try {
      // 控件id
      const objectId = this._objectId
      // 获取安全控件版本信息
      const version = this._SecEditBox.GetVersion()
      // 判断输入的密码长度是否复合要求
      const passwordLengthIntensity = this._SecEditBox.GetLengthIntensity()
      // 判断输入的密码复杂度是否符合要求
      const passwordComplexIntensity = this._SecEditBox.GetComplexIntensity()
      // 获得安全控件输入密码加密结果
      const encryptedPassword = this._SecEditBox.GetValue()
      // 获得客户端随机数值
      const clientRandom = this._SecEditBox.GetClientRandom()
      // 获取服务端随机数值
      const serverRandom = this._config[this._config.length - 1].value
      // 获得输入密码强度信息
      const passwordStrength = this._SecEditBox.GetPasswordStrength()
      // 获得输入密码是否为弱密码库中的密码
      const isWeakPassword = this._SecEditBox.IsWeakPassword()
      // 获得本地网卡信息
      const mac = this._SecEditBox.GetNetInfo()
      /**
       * 针对服务端解密规则拼接密文
       * 拼接解密用参数  pwdCtlFlg 1：新密码控件，id:控件id,clientRandom:客户端随机码,serverRandom：服务端随机码
       * @type {(string|*|string)[]}
       */
      const passwordArr = ['1', objectId, clientRandom, encryptedPassword, serverRandom]
      const password = passwordArr.join(',')

      return {
        objectId,
        version,
        passwordLengthIntensity,
        passwordComplexIntensity,
        encryptedPassword,
        clientRandom,
        serverRandom,
        passwordStrength,
        isWeakPassword,
        mac,
        password
      }
    } catch (e) {
      // _message(this._objectId + '输入错误')
      throw new Error(e)
    }
  }

  clearData () {
    try {
      // 清除安全控件存储密码信息
      this._SecEditBox.Clear()
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }

  getParamTagList () {
    return this._config.map(item => `<param name="${item.name}" value="${item.value}"/>`)
      .join('')
  }

  /**
   * 模拟从服务端获取公钥的方法
   * @returns {Promise<unknown>}
   */
  getPublicKey () {
    return new Promise((resolve, reject) => {
      httpPost(`eweb-common.serverRandom.do?ran=${Math.random()}`).then(res => {
        let serverRandomStr = res && typeof res === 'string' ? res.substr(3) : ''
        resolve(serverRandomStr)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
export default UKey
