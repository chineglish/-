// 理财服务 路由
const purchaseInquiry = () => import('@/pages/financialServices/largeDepositCertificate/purchase/purchaseInquiry')
const manual = () => import('@/pages/financialServices/largeDepositCertificate/purchase/manual')
const purchasePre = () => import('@/pages/financialServices/largeDepositCertificate/purchase/purchasePre')
const purchaseConf = () => import('@/pages/financialServices/largeDepositCertificate/purchase/purchaseConf')
const purchaseRes = () => import('@/pages/financialServices/largeDepositCertificate/purchase/purchaseRes')
const withdrawInquiry = () => import('@/pages/financialServices/largeDepositCertificate/withdraw/withdrawInquiry')
const withdrawPre = () => import('@/pages/financialServices/largeDepositCertificate/withdraw/withdrawPre')
const withdrawConf = () => import('@/pages/financialServices/largeDepositCertificate/withdraw/withdrawConf')
const withdrawRes = () => import('@/pages/financialServices/largeDepositCertificate/withdraw/withdrawRes')
const largeDepositInquiry = () => import('@/pages/financialServices/largeDepositCertificate/largeDepositInquiry')
const largeDepositDatail = () => import('@/pages/financialServices/largeDepositCertificate/largeDepositDatail')
const openProtocol = () => import('@/pages/financialServices/regularPass/regularPassOpen/openProtocol')
const openPre = () => import('@/pages/financialServices/regularPass/regularPassOpen/openPre')
const openConf = () => import('@/pages/financialServices/regularPass/regularPassOpen/openConf')
const openRes = () => import('@/pages/financialServices/regularPass/regularPassOpen/openRes')
const regularPassWithdraw = () => import('@/pages/financialServices/regularPass/regularPassWithdraw/regularPassWithdraw')
const rpWithdrawPre = () => import('@/pages/financialServices/regularPass/regularPassWithdraw/rpWithdrawPre')
const rpWithdrawConf = () => import('@/pages/financialServices/regularPass/regularPassWithdraw/rpWithdrawConf')
const rpWithdrawRes = () => import('@/pages/financialServices/regularPass/regularPassWithdraw/rpWithdrawRes')
const regularInquiry = () => import('@/pages/financialServices/regularPass/regularInquiry/regularInquiry')
const regularInquiryDetail = () => import('@/pages/financialServices/regularPass/regularInquiry/inquiryDetail')

// 单位大额存单转让
const payForQuery = () => import('@/pages/financialServices/largeDepositCertificate/payFor/payForQuery')
const payForQueryDetail = () => import('@/pages/financialServices/largeDepositCertificate/payFor/payForQueryDetail')
const payForInner = () => import('@/pages/financialServices/largeDepositCertificate/payFor/payForInner')
const payForComfirm = () => import('@/pages/financialServices/largeDepositCertificate/payFor/payForComfirm')
const payForResult = () => import('@/pages/financialServices/largeDepositCertificate/payFor/payForResult')

// 单位大额存单受让
const payAssigneQuery = () => import('@/pages/financialServices/largeDepositCertificate/payAssigne/payAssigneQuery')
const payAssigneConfirm = () => import('@/pages/financialServices/largeDepositCertificate/payAssigne/payAssigneConfirm')
const payDealBook = () => import('@/pages/financialServices/largeDepositCertificate/payAssigne/payDealBook')
const payRefuseDealBook = () => import('@/pages/financialServices/largeDepositCertificate/payAssigne/payRefuseDealBook')
const payAssigneResult = () => import('@/pages/financialServices/largeDepositCertificate/payAssigne/payAssigneResult')
const payRefuseComfirm = () => import('@/pages/financialServices/largeDepositCertificate/payAssigne/payRefuseComfirm')

// 单位大额存单转让受让查询
const largeForAssigneQuery = () => import('@/pages/financialServices/largeDepositCertificate/largeForAssigne/largeForAssigneQuery')
const largeForAssigneDetails = () => import('@/pages/financialServices/largeDepositCertificate/largeForAssigne/largeForAssigneDetails')

const payRefuseResult = () => import('@/pages/financialServices/largeDepositCertificate/payAssigne/payRefuseResult')
const financialServicesRouter = [
  {
    path: 'purchaseInquiry',
    name: 'purchaseInquiry',
    component: purchaseInquiry,
    meta: {
      auth: true,
      title: '大额存单申购-查询'
    }
  },
  {
    path: 'manual',
    name: 'manual',
    component: manual,
    meta: {
      auth: true,
      title: '大额存单申购-说明书'
    }
  },
  {
    path: 'purchasePre',
    name: 'purchasePre',
    component: purchasePre,
    meta: {
      auth: true,
      title: '大额存单申购-录入'
    }
  },
  {
    path: 'purchaseConf',
    name: 'purchaseConf',
    component: purchaseConf,
    meta: {
      auth: true,
      title: '大额存单申购-确认'
    }
  },
  {
    path: 'purchaseRes',
    name: 'purchaseRes',
    component: purchaseRes,
    meta: {
      auth: true,
      title: '大额存单申购-结果'
    }
  },
  {
    path: 'withdrawInquiry',
    name: 'withdrawInquiry',
    component: withdrawInquiry,
    meta: {
      auth: true,
      title: '大额存单支取-查询'
    }
  },
  {
    path: 'withdrawPre',
    name: 'withdrawPre',
    component: withdrawPre,
    meta: {
      auth: true,
      title: '大额存单支取-录入页'
    }
  },
  {
    path: 'withdrawConf',
    name: 'withdrawConf',
    component: withdrawConf,
    meta: {
      auth: true,
      title: '大额存单支取-确认页'
    }
  },
  {
    path: 'withdrawRes',
    name: 'withdrawRes',
    component: withdrawRes,
    meta: {
      auth: true,
      title: '大额存单支取-结果页'
    }
  },
  {
    path: 'largeDepositInquiry',
    name: 'largeDepositInquiry',
    component: largeDepositInquiry,
    meta: {
      auth: true,
      title: '单位大额存单查询'
    }
  },
  {
    path: 'largeDepositDatail',
    name: 'largeDepositDatail',
    component: largeDepositDatail,
    meta: {
      auth: true,
      title: '单位大额存单查询详情'
    }
  },
  {
    path: 'openProtocol',
    name: 'openProtocol',
    component: openProtocol,
    meta: {
      auth: true,
      title: '定期通开户-协议'
    }
  },
  {
    path: 'openPre',
    name: 'openPre',
    component: openPre,
    meta: {
      auth: true,
      title: '定期通开户-录入'
    }
  },
  {
    path: 'openConf',
    name: 'openConf',
    component: openConf,
    meta: {
      auth: true,
      title: '定期通开户-确认'
    }
  },
  {
    path: 'openRes',
    name: 'openRes',
    component: openRes,
    meta: {
      auth: true,
      title: '定期通开户-结果'
    }
  },
  {
    path: 'regularPassWithdraw',
    name: 'regularPassWithdraw',
    component: regularPassWithdraw,
    meta: {
      auth: true,
      title: '定期通支取'
    }
  },
  {
    path: 'rpWithdrawPre',
    name: 'rpWithdrawPre',
    component: rpWithdrawPre,
    meta: {
      auth: true,
      title: '定期通支取-录入'
    }
  },
  {
    path: 'rpWithdrawConf',
    name: 'rpWithdrawConf',
    component: rpWithdrawConf,
    meta: {
      auth: true,
      title: '定期通支取-确认'
    }
  },
  {
    path: 'rpWithdrawRes',
    name: 'rpWithdrawRes',
    component: rpWithdrawRes,
    meta: {
      auth: true,
      title: '定期通支取-结果'
    }
  },
  {
    path: 'regularInquiry',
    name: 'regularInquiry',
    component: regularInquiry,
    meta: {
      auth: true,
      title: '定期通查询'
    }
  },
  {
    path: 'regularInquiryDetail',
    name: 'regularInquiryDetail',
    component: regularInquiryDetail,
    meta: {
      auth: true,
      title: '定期通查询详情'
    }
  },
  {
    path: 'payForQuery',
    name: 'payForQuery',
    component: payForQuery,
    meta: {
      auth: true,
      title: '单位大额存单转让查询'
    }
  },
  {
    path: 'payForQueryDetail',
    name: 'payForQueryDetail',
    component: payForQueryDetail,
    meta: {
      auth: true,
      title: '单位大额存单转让查询详情'
    }
  },
  {
    path: 'payForInner',
    name: 'payForInner',
    component: payForInner,
    meta: {
      auth: true,
      title: '单位大额存单转让录入',
      notCache: true
    }
  },
  {
    path: 'payForComfirm',
    name: 'payForComfirm',
    component: payForComfirm,
    meta: {
      auth: true,
      title: '单位大额存单转让确认'
    }
  },
  {
    path: 'payForResult',
    name: 'payForResult',
    component: payForResult,
    meta: {
      auth: true,
      title: '单位大额存单转让结果'
    }
  },
  {
    path: 'payAssigneQuery',
    name: 'payAssigneQuery',
    component: payAssigneQuery,
    meta: {
      auth: true,
      title: '单位大额存单受让查询'
    }
  },
  {
    path: 'payAssigneConfirm',
    name: 'payAssigneConfirm',
    component: payAssigneConfirm,
    meta: {
      auth: true,
      title: '单位大额存单受让确认页'
    }
  },
  {
    path: 'payDealBook',
    name: 'payDealBook',
    component: payDealBook,
    meta: {
      auth: true,
      title: '单位大额存单受让协议'
    }
  },
  // 受让拒绝
  {
    path: 'payRefuseDealBook',
    name: 'payRefuseDealBook',
    component: payRefuseDealBook,
    meta: {
      auth: true,
      title: '单位大额存单受让协议'
    }
  },
  {
    path: 'payAssigneResult',
    name: 'payAssigneResult',
    component: payAssigneResult,
    meta: {
      auth: true,
      title: '单位大额存单受让结果页'
    }
  },
  {
    path: 'payRefuseComfirm',
    name: 'payRefuseComfirm',
    component: payRefuseComfirm,
    meta: {
      auth: true,
      title: '单位大额存单受让拒绝确认页'
    }
  },
  {
    path: 'payRefuseResult',
    name: 'payRefuseResult',
    component: payRefuseResult,
    meta: {
      auth: true,
      title: '单位大额存单受让拒绝结果页'
    }
  },
  {
    path: 'largeForAssigneQuery',
    name: 'largeForAssigneQuery',
    component: largeForAssigneQuery,
    meta: {
      auth: true,
      title: '单位大额存单转让受让查询',
      notCache: true
    }
  },
  {
    path: 'largeForAssigneDetails',
    name: 'largeForAssigneDetails',
    component: largeForAssigneDetails,
    meta: {
      auth: true,
      title: '单位大额存单转让受让详情'
    }
  }
]
export default financialServicesRouter
