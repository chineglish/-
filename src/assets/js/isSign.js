import { Sign } from './SignMsg'
import { MessageBox } from 'element-ui'
import store from '../../store'

export const isSign = (signdData) => {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user && !user.userCert) {
    // 用户未绑定证书
    MessageBox('用户未绑定证书!', '错误提示', {
      confirmButtonText: '确定',
      callback: action => {
        return ''
      }
    })
  } else {
    let signInfo = {
      subjectDN: user.userCert ? user.userCert.certDn : '',
      serialNumber: user.userCert ? user.userCert.certSerialNo : ''
    }
    if (signdData && signdData._Data2Sign && signdData._authenticateType) {
      return Sign(signdData._Data2Sign, signInfo)
    } else {
      return ''
    }
  }
}

export const _message = (data) => {
  store.commit('d2admin/page/errorMessage', data)
}
