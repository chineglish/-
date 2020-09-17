import { MessageBox } from 'element-ui'
import util from '../../libs/util'

var CryptoAgent = ''
var bResult = false
var _SignInfo = {
  subjectDN: '',
  sm2CspList: 'EnterSafe Interpass3000 CSP For Bank of Dalian V1.0',
  issuerDN: '',
  serialNumber: '',
  signType: 'Detach',
  signAlg: 'SHA-1'
}
// Create ActiveX object according to the platform
function OnLoad () {
  try {
    var eDiv = document.createElement('div')
    if (navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0) {
      if (window.navigator.cpuClass === 'x86') {
        eDiv.innerHTML = '<object id="CryptoAgent" codebase="CryptoKit.DLBank.x86.cab" classid="clsid:3AFF5A31-D874-4FCC-BD2E-F86B886C1975" ></object>'
      } else {
        eDiv.innerHTML = '<object id="CryptoAgent" codebase="CryptoKit.DLBank.x64.cab" classid="clsid:5587EC57-E342-4D90-869A-612FB8717B21" ></object>'
      }
    } else {
      eDiv.innerHTML = '<embed id="CryptoAgent" type="application/npCryptoKit.DLBank.x86" style="height: 0px; width: 0px">'
    }
    document.body.appendChild(eDiv)
  } catch (e) {
    return false
  }
  CryptoAgent = document.getElementById('CryptoAgent')
}

function SetSM2CSPList () {
  try {
    const cspList = _SignInfo.sm2CspList
    bResult = CryptoAgent.SetSM2CSPList(cspList)
    return bResult
  } catch (e) {
    return false
  }
  // alert('SetSM2CSPList: ' + bResult)
}

// Select certificate
function SelectCertificate () {
  try {
    let subjectDNFilter = ''
    let issuerDNFilter = ''
    let serialNumFilter = _SignInfo.serialNumber || ''
    let bSelectCertResult = ''
    bSelectCertResult = CryptoAgent.SelectCertificate(subjectDNFilter, issuerDNFilter, serialNumFilter)
    // Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
    if (!bSelectCertResult) {
      return false
    } else {
      return bSelectCertResult
    }
  } catch (e) {
    return false
  }
}

function isLoadSuccess () {
  try {
    OnLoad()
    CryptoAgent.GetLastErrorDesc()
    return true
  } catch (e) {
    return false
  }
}

function getSignCertInfo (bstrInfoType) {
  bstrInfoType = bstrInfoType || ''
  try {
    if (isLoadSuccess()) {
      if (SetSM2CSPList()) {
        if (SelectCertificate()) {
          //
          let SignCertInfo = CryptoAgent.GetSignCertInfo(bstrInfoType)
          // Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
          if (!SignCertInfo) {
            console.log('未获取到证书信息!')
            return ''
          }
          return SignCertInfo
        } else {
          console.log('选择证书失败!')
          return ''
        }
      } else {
        console.log('设置SM2证书过程出现错误')
        return ''
      }
    } else {
      MessageBox.alert('未安装签名控件,请先安装!!!').then(() => {
        let dom = document.getElementById('a-download')
        if (navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0) {
          if (window.navigator.cpuClass === 'x86') {
            dom.href = `${util.getUrl()}resources/CryptoKit.DLBank.x86.exe`
          } else {
            dom.href = `${util.getUrl()}resources/CryptoKit.DLBank.x64.exe`
          }
        } else {
          dom.href = `${util.getUrl()}resources/npCryptoKit.DLBank.x86.exe`
        }
        dom.download = '签名控件.exe'
        dom.click()
        MessageBox.alert('安装完签名控件后,请刷新页面!!!').then(() => {
          location.reload()
        })
      })
      return 'uninstall'
    }
  } catch (e) {
    MessageBox.alert('证书信息获取过程出现错误!')
    return ''
  }
}
// Sign message
function Sign (source, signInfo) {
  if (!signInfo.serialNumber || signInfo.serialNumber === '' || signInfo.serialNumber.isNull || signInfo.serialNumber === undefined) {
    MessageBox.alert('未找到用户绑定证书编号!')
    return
  }
  Object.assign(_SignInfo, signInfo)
  if (isLoadSuccess()) {
    if (SetSM2CSPList()) {
      if (SelectCertificate()) {
        try {
          let signature = ''
          const signAlg = _SignInfo.signAlg
          // PKCS#7 Attach
          if (_SignInfo.signType === 'Attach') {
            signature = CryptoAgent.SignMsgPKCS7(source, signAlg, true)
          } else if (_SignInfo.signType === 'Detach') {
            signature = CryptoAgent.SignMsgPKCS7(source, signAlg, false)
          } else {
            signature = CryptoAgent.SignMsgPKCS1(source, signAlg)
          }
          if (!signature) {
            MessageBox.alert('验签失败!')
            return false
          }
          return source + _SignInfo.signType + ':' + signature
        } catch (e) {
          MessageBox.alert('验签过程出现错误!')
        }
      } else {
        MessageBox.alert(`选择证书失败,请使用证书DN为${_SignInfo.subjectDN},证书编号为${_SignInfo.serialNumber}的证书签名!`)
      }
    } else {
      MessageBox.alert('设置SM2证书过程出现错误')
    }
  } else {
    MessageBox.alert('未安装签名控件,请先安装!!!').then(() => {
      let dom = document.getElementById('a-download')
      if (navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0) {
        if (window.navigator.cpuClass === 'x86') {
          dom.href = `${util.getUrl()}resources/CryptoKit.DLBank.x86.exe`
        } else {
          dom.href = `${util.getUrl()}resources/CryptoKit.DLBank.x64.exe`
        }
      } else {
        dom.href = `${util.getUrl()}resources/npCryptoKit.DLBank.x86.exe`
      }
      dom.download = '签名控件.exe'
      dom.click()
      MessageBox.alert('安装完签名控件后,请允许签名控件运行!!!').then(() => {
        // location.reload()
      })
    })
  }
}

export { OnLoad, isLoadSuccess, Sign, getSignCertInfo, SelectCertificate }
