const getUser = function () {
  const user = JSON.parse(localStorage.getItem('user'))
  return user
}
const getSignInfo = function () {
  const user = getUser()
  const signInfo = {
    subjectDN: user.userCert ? user.userCert.certDn : '',
    serialNumber: user.userCert ? user.userCert.certSerialNo : ''
  }
  return signInfo
}
export { getUser, getSignInfo }
