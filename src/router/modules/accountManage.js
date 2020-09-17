// 账户管理路由
const accountTransDetail = () => import('@/pages/accountManage/transDetailsQry')

const financialDetailPosition = () => import('@/pages/accountManage/myFinancial/detailPosition')
const financialDetailTrans = () => import('@/pages/accountManage/myFinancial/detailTrans')
const financialDetail = () => import('@/pages/accountManage/myFinancial/detailPage')
const securityDepositQry = () => import('@/pages/accountManage/securityDeposit')
const securityDepositDetails = () => import('@/pages/accountManage/securityDeposit/details')
const migrantWorkersSecurityDepositDownload = () => import('@/pages/accountManage/securityDeposit/migrantWorkers/download')
const regularCommunication = () => import('@/pages/accountManage/productSearch/regularCommunication')
const regularDetail = () => import('@/pages/accountManage/productSearch/regularDetail')
const currentAccountQry = () => import('@/pages/accountManage/currentAccountQry/')
const currentAccountQryDetails = () => import('@/pages/accountManage/currentAccountQry/currentAccountQryDetails')
const comprehensiveBillQry = () => import('@/pages/accountManage/comprehensiveBill/comprehensiveBillQry')
// const loanInquiry = () => import('@/pages/accountManage/assetsDebtQuery')
const enterpriseBankBill = () => import('@/pages/accountManage/enterpriseBankBill')
const enterpriseBankCheckBillRes = () => import('@/pages/accountManage/enterpriseBankBill/checkBillRes')

const financialPurchRes = () => import('@/pages/accountManage/productSearch/financialPurchRes')

// 电子回单
const elecReceiptCheckResult = () => import('@/pages/accountManage/elecReceipt/elecReceiptCheck/elecReceiptCheckResult')
const elecReceiptQueryDetails = () => import('@/pages/accountManage/elecReceipt/elecReceiptQuery/elecReceiptQueryDetails')

const onlineBankHandFeeReceipt = () => import('@/pages/accountManage/onBankElecReceipt/receiptInquiry/handFeeReceipt')

const accountManageRouter = [
  {
    path: 'receiptInquiry',
    name: 'receiptInquiry',
    component: () => import('@/pages/accountManage/onBankElecReceipt/receiptInquiry/inquiry'),
    meta: {
      auth: true,
      title: '网银电子回单'
    }
  },
  {
    path: 'receiptDaYin',
    name: 'receiptDaYin',
    component: () => import('@/pages/accountManage/onBankElecReceipt/receiptInquiry/receiptDaYin'),
    meta: {
      auth: true,
      title: '网银电子回单批量打印'
    }
  },
  {
    path: 'receiptDetail',
    name: 'receiptDetail',
    component: () => import('@/pages/accountManage/onBankElecReceipt/receiptInquiry/receiptDetail'),
    meta: {
      auth: true,
      title: '网银电子回单详情'
    }
  },
  {
    path: 'handFeeReceipt',
    name: 'handFeeReceipt',
    component: onlineBankHandFeeReceipt,
    meta: {
      auth: true,
      title: '网银电子手续费回单'
    }
  },
  {
    path: 'receiptVerify',
    name: 'receiptVerify',
    component: () => import('@/pages/accountManage/onBankElecReceipt/receiptVerify/verify'),
    meta: {
      auth: true,
      title: '网银电子回单验证'
    }
  },
  {
    path: 'verifyRes',
    name: 'verifyRes',
    component: () => import('@/pages/accountManage/onBankElecReceipt/receiptVerify/verifyRes'),
    meta: {
      auth: true,
      title: '网银电子回单验证详情'
    }
  },
  {
    path: 'transDetailsQry',
    name: 'transDetailsQry',
    component: accountTransDetail,
    meta: {
      auth: true,
      title: '账户明细查询'
    }
  },
  {
    path: 'assetsDebtQuery',
    name: 'assetsDebtQuery',
    component: () => import('@/pages/accountManage/assetsDebtQuery'),
    meta: {
      auth: true,
      title: '资产负债查询'
    }
  },
  {
    path: 'loanInquiry',
    name: 'loanInquiry',
    component: () => import('@/pages/accountManage/assetsDebtQuery/loanInquiry'),
    meta: {
      auth: true,
      title: '资产负债查询贷款详情'
    }
  },
  {
    path: 'myFinancial/:isFromPrdSearch',
    name: 'myFinancial',
    component: () => import('@/pages/accountManage/myFinancial'),
    meta: {
      auth: true,
      title: '我的理财查询'
    }
  },
  {
    path: 'financialDetail',
    name: 'financialDetail',
    component: financialDetail,
    meta: {
      auth: true,
      title: '理财历史详情'
    }
  },
  {
    path: 'financialDetailTrans',
    name: 'financialDetailTrans',
    component: financialDetailTrans,
    meta: {
      auth: true,
      title: '理财已委托详情'
    }
  },
  {
    path: 'financialDetailPosition',
    name: 'financialDetailPosition',
    component: financialDetailPosition,
    meta: {
      auth: true,
      title: '理财已持有详情'
    }
  },
  {
    path: 'securityDepositQry',
    name: 'securityDepositQry',
    component: securityDepositQry,
    meta: {
      auth: true,
      title: '保证金明细查询'
    }
  },
  {
    path: 'securityDepositDetails',
    name: 'securityDepositDetails',
    component: securityDepositDetails,
    meta: {
      auth: true,
      title: '保证金明细查询详情页'
    }
  },
  {
    path: 'migrantWorkersSecurityDepositQry',
    name: 'migrantWorkersSecurityDepositQry',
    component: () => import('@/pages/accountManage/securityDeposit/migrantWorkers'),
    meta: {
      auth: true,
      title: '农民工保证金明细查询'
    }
  },
  {
    path: 'migrantWorkersSecurityDepositEditHistoryQry',
    name: 'migrantWorkersSecurityDepositEditHistoryQry',
    component: () => import('@/pages/accountManage/securityDeposit/migrantWorkers/editHistoryQry'),
    meta: {
      auth: true,
      title: '农民工保证金修改历史查询'
    }
  },
  {
    path: 'migrantWorkersSecurityDepositDownload',
    name: 'migrantWorkersSecurityDepositDownload',
    component: migrantWorkersSecurityDepositDownload,
    meta: {
      auth: true,
      title: '到账通知单'
    }
  },
  {
    path: 'migrantWorkersSecurityDepositStatisticalTable',
    name: 'migrantWorkersSecurityDepositStatisticalTable',
    component: () => import('@/pages/accountManage/securityDeposit/migrantWorkers/statisticalTable'),
    meta: {
      auth: true,
      title: '农名工保证金统计表'
    }
  },
  {
    path: 'productSearch',
    name: 'productSearch',
    component: () => import('@/pages/accountManage/productSearch'),
    meta: {
      auth: true,
      title: '理财产品查询'
    }
  },
  {
    path: 'regularCommunication',
    name: 'regularCommunication',
    component: regularCommunication,
    meta: {
      auth: true,
      title: '定期通查询'
    }
  },
  {
    path: 'regularDetail',
    name: 'regularDetail',
    component: regularDetail,
    meta: {
      auth: true,
      title: '定期通查询'
    }
  },
  {
    path: 'currentAccountQry',
    name: 'currentAccountQry',
    component: currentAccountQry,
    meta: {
      auth: true,
      title: '活期账户查询'
    }
  },
  {
    path: 'currentAccountQryDetails',
    name: 'currentAccountQryDetails',
    component: currentAccountQryDetails,
    meta: {
      auth: true,
      title: '活期账户查询'
    }
  },
  {
    path: 'comprehensiveBillQry',
    name: 'comprehensiveBillQry',
    component: comprehensiveBillQry,
    meta: {
      auth: true,
      title: '综合票据查询'
    }
  },
  {
    path: 'accountDetailQry',
    name: 'accountDetailQry',
    component: () => import('@/pages/accountManage/accountDetail'),
    meta: {
      auth: true,
      title: '核心账户明细查询',
      notCache: true
    }
  },
  {
    path: 'accountDetail',
    name: 'accountDetail',
    component: () => import('@/pages/accountManage/accountDetail/detail'),
    meta: {
      auth: true,
      title: '账户明细详情页'
    }
  },
  {
    path: 'deactiveLedgerQry',
    name: 'deactiveLedgerQry',
    component: () => import('@/pages/accountManage/ledger/deactiveLedgerQry'),
    meta: {
      auth: true,
      title: '账户已注销账簿信息查询'
    }
  },
  {
    path: 'deactiveLedgerDetail',
    name: 'deactiveLedgerDetail',
    component: () => import('@/pages/accountManage/ledger/deactiveLedgerDetail'),
    meta: {
      auth: true,
      title: '账户已注销账簿信息详情'
    }
  },
  {
    path: 'enterpriseBankBill',
    name: 'enterpriseBankBill',
    component: enterpriseBankBill,
    meta: {
      auth: true,
      title: '银企对账查询'
    }
  },
  {
    path: 'enterpriseBankCheckBillPre',
    name: 'enterpriseBankCheckBillPre',
    component: () => import('@/pages/accountManage/enterpriseBankBill/checkBillPre'),
    meta: {
      auth: true,
      title: '银企对账信息录入'
    }
  },
  {
    path: 'enterpriseBankCheckBillConf',
    name: 'enterpriseBankCheckBillConf',
    component: () => import('@/pages/accountManage/enterpriseBankBill/checkBillConf'),
    meta: {
      auth: true,
      title: '银企对账交易确认'
    }
  },
  {
    path: 'enterpriseBankCheckBillRes',
    name: 'enterpriseBankCheckBillRes',
    component: enterpriseBankCheckBillRes,
    meta: {
      auth: true,
      title: '银企对账提交结果'
    }
  },
  {
    path: 'checkBillInconsistentPre',
    name: 'checkBillInconsistentPre',
    component: () => import('@/pages/accountManage/enterpriseBankBill/inconsistentPre'),
    meta: {
      auth: true,
      title: '银企对账不符录入'
    }
  },
  {
    path: 'checkBillInconsistentConf',
    name: 'checkBillInconsistentConf',
    component: () => import('@/pages/accountManage/enterpriseBankBill/inconsistentConf'),
    meta: {
      auth: true,
      title: '银企对账不符确认'
    }
  },
  {
    path: 'financialPurchase',
    name: 'financialPurchase',
    component: () => import('@/pages/accountManage/productSearch/financialPurchase/index'),
    meta: {
      auth: true,
      title: '理财产品购买'
    }
  },
  {
    path: 'indexTOne',
    name: 'indexTOne',
    component: () => import('@/pages/accountManage/productSearch/financialPurchase/indexTOne'),
    meta: {
      auth: true,
      title: '理财产品购买'
    }
  },
  {
    path: 'financialPurchForm',
    name: 'financialPurchForm',
    component: () => import('@/pages/accountManage/productSearch/financialPurchForm'),
    meta: {
      auth: true,
      title: '理财产品购买信息填写'
    }
  },
  {
    path: 'financialPurchConfirm',
    name: 'financialPurchConfirm',
    component: () => import('@/pages/accountManage/productSearch/financialPurchConfirm'),
    meta: {
      auth: true,
      title: '产品购买信息确认'
    }
  },
  {
    path: 'financialPurchRes',
    name: 'financialPurchRes',
    component: financialPurchRes,
    meta: {
      auth: true,
      title: '产品购买结果'
    }
  },
  {
    path: 'elecReceiptCheck',
    name: 'elecReceiptCheck',
    component: () => import('@/pages/accountManage/elecReceipt/elecReceiptCheck/elecReceiptCheck'),
    meta: {
      auth: true,
      title: '电子回单验证'
    }
  },
  {
    path: 'elecReceiptCheckResult',
    name: 'elecReceiptCheckResult',
    component: elecReceiptCheckResult,
    meta: {
      auth: true,
      title: '电子回单验证结果'
    }
  },
  {
    path: 'elecReceiptQuery',
    name: 'elecReceiptQuery',
    component: () => import('@/pages/accountManage/elecReceipt/elecReceiptQuery/elecReceiptQuery'),
    meta: {
      auth: true,
      title: '电子回单查询'
    }
  },
  {
    path: 'elecReceiptQueryDetails',
    name: 'elecReceiptQueryDetails',
    component: elecReceiptQueryDetails,
    meta: {
      auth: true,
      title: '电子回单查询详情'
    }
  }
]

export default accountManageRouter
