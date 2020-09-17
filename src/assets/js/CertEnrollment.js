import { message } from 'element-ui'
var CryptoAgent = ''
// Create ActiveX object according to the platform
function OnLoad () {
  try {
    var eDiv = document.createElement('div')
    if (navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0) {
      if (window.navigator.cpuClass === 'x86') {
        eDiv.innerHTML = '<object id="CertEnrollment" codebase="setup/CryptoKit.CertEnrollment.DLBank.x86.cab" classid="clsid:A733D23E-7367-47C0-AFC2-64C158A202AE" ></object>'
      } else {
        eDiv.innerHTML = '<object id="CertEnrollment" codebase="setup/CryptoKit.CertEnrollment.DLBank.x64.cab" classid="clsid:3A9F1E73-76DC-407B-BFBC-3CCA9EFF5A41" ></object>'
      }
    } else {
      eDiv.innerHTML = '<embed id="CertEnrollment" type="application/npCryptoKit.CertEnrollment.DLBank.x86" style="height: 0px; width: 0px">'
    }
    document.body.appendChild(eDiv)
  } catch (e) {
    message({
      showClose: true,
      message: 'CAFCA证书下载控件加载过程出现错误',
      type: 'error'
    })
    return false
  }

  CryptoAgent = document.getElementById('CertEnrollment')
  return CryptoAgent
}

function isLoadSuccess () {
  try {
    OnLoad()
    CryptoAgent.CFCA_GetVersion()
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export { OnLoad, isLoadSuccess }
