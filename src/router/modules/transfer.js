// 转账汇款 路由
const interTransferPre = () => import('@/pages/transfer/crossBankTransfer/interTransferPre')
const interTransferConf = () => import('@/pages/transfer/crossBankTransfer/interTransferConf')
const interTransferResult = () => import('@/pages/transfer/crossBankTransfer/interTransferResult')
const testNewFormInput = () => import('@/pages/transfer/testNewForm/TestNewFormInput')
const testNewFormConf = () => import('@/pages/transfer/testNewForm/TestNewFormConf')
const innerCompanyTransPre = () => import('@/pages/transfer/innerCompanyTransfer/innerCompanyTransPre')
const innerCompanyTransConf = () => import('@/pages/transfer/innerCompanyTransfer/innerCompanyTransConf')
const innerCompanyTransResult = () => import('@/pages/transfer/innerCompanyTransfer/innerCompanyTransResult')
const singleTransConf = () => import('@/pages/transfer/singleTransfer/singleTransConf')
const singleTransResult = () => import('@/pages/transfer/singleTransfer/singleTransResult')
const accountSelection = () => import('@/pages/transfer/singleTransfer/accountSelection')
const bankSelection = () => import('@/pages/transfer/singleTransfer/bankSelection')
const scheduledTransInquiry = () => import('@/pages/transfer/transactionProcess/scheduledTransInquiry')
const timedTransInquiry = () => import('@/pages/transfer/transactionProcess/timedTransInquiry')
const transDetails = () => import('@/pages/transfer/transactionProcess/transDetails')
const transCancel = () => import('@/pages/transfer/transactionProcess/transCancel')
const transCancelRes = () => import('@/pages/transfer/transactionProcess/transCancelRes')
const timedDetails = () => import('@/pages/transfer/transactionProcess/timedDetails')
const timedCancel = () => import('@/pages/transfer/transactionProcess/timedCancel')
const timedCancelRes = () => import('@/pages/transfer/transactionProcess/timedCancelRes')
const batchTransfer = () => import('@/pages/transfer/batchTransfer/batchTransfer')
const batchTransferConf = () => import('@/pages/transfer/batchTransfer/batchTransferConf')
const addBatch = () => import('@/pages/transfer/batchTransfer/addBatch')
const batchTransferRes = () => import('@/pages/transfer/batchTransfer/batchTransferRes')
const currentAccInquiry = () => import('@/pages/transfer/CurrentAccount/currentAccInquiry')
const add = () => import('@/pages/transfer/CurrentAccount/add')
const maintainRes = () => import('@/pages/transfer/CurrentAccount/maintainRes')
const onlineBankTransInquiry = () => import('@/pages/transfer/onlineBankTransInquiry/onlineBankTransInquiry')
const batchTransDetail = () => import('@/pages/transfer/onlineBankTransInquiry/batchTransDetail')
const noTaxPay = () => import('@/pages/transfer/notaxPay/noTaxPay')
const noTaxPayPre = () => import('@/pages/transfer/notaxPay/noTaxPayPre')
const noTaxPayConf = () => import('@/pages/transfer/notaxPay/noTaxPayConf')
const noTaxPayRes = () => import('@/pages/transfer/notaxPay/noTaxPayRes')
const historyInquiry = () => import('@/pages/transfer/notaxPay/historyInquiry')
const notaxPayDetail = () => import('@/pages/transfer/notaxPay/notaxPayDetail')
const sportsPayPre = () => import('@/pages/transfer/sportsPay/sportsPayPre')
const sportsPayConf = () => import('@/pages/transfer/sportsPay/sportsPayConf')
const sportsPayRes = () => import('@/pages/transfer/sportsPay/sportsPayRes')
const shipTrans = () => import('@/pages/transfer/seaShip/transfer/shipTrans')
const depositPre = () => import('@/pages/transfer/seaShip/transfer/depositPre')
const depositConf = () => import('@/pages/transfer/seaShip/transfer/depositConf')
const depositRes = () => import('@/pages/transfer/seaShip/transfer/depositRes')
const withdrawalPre = () => import('@/pages/transfer/seaShip/transfer/withdrawalPre')
const withdrawalConf = () => import('@/pages/transfer/seaShip/transfer/withdrawalConf')
const withdrawalRes = () => import('@/pages/transfer/seaShip/transfer/withdrawalRes')
const dwInquiry = () => import('@/pages/transfer/seaShip/inquiry/dwInquiry')
const socialSecurityPayment = () => import('@/pages/transfer/socialSecurityPayment/socialSecurityPayment')
const socialSecurityPaymentPer = () => import('@/pages/transfer/socialSecurityPayment/socialSecurityPaymentPer')
const socialSecurityPaymentConf = () => import('@/pages/transfer/socialSecurityPayment/socialSecurityPaymentConf')
const socialSecurityPaymentRes = () => import('@/pages/transfer/socialSecurityPayment/socialSecurityPaymentRes')
const SuperEntSign = () => import('@/pages/transfer/superEnt/superEntSign/SuperEntSign')

const transferRouter = [
  {
    path: 'interTransferPre',
    name: 'interTransferPre',
    component: interTransferPre,
    meta: {
      auth: true,
      title: '跨行转账'
    }
  }, {
    path: 'interTransferConf',
    name: 'interTransferConf',
    component: interTransferConf,
    meta: {
      auth: true,
      title: '跨行转账'
    }
  }, {
    path: 'interTransferResult',
    name: 'interTransferResult',
    component: interTransferResult,
    meta: {
      auth: true,
      title: '跨行转账'
    }
  }, {
    path: 'testNewFormInput',
    name: 'testNewFormInput',
    component: testNewFormInput,
    meta: {
      auth: true,
      title: '测试模板'
    }
  }, {
    path: 'testNewFormConf',
    name: 'testNewFormConf',
    component: testNewFormConf,
    meta: {
      auth: true,
      title: '测试模板'
    }
  },
  {
    path: 'innerCompanyTransPre',
    name: 'innerCompanyTransPre',
    component: innerCompanyTransPre,
    meta: {
      auth: true,
      title: '公司内部转账录入'
    }
  },
  {
    path: 'innerCompanyTransConf',
    name: 'innerCompanyTransConf',
    component: innerCompanyTransConf,
    meta: {
      auth: true,
      title: '公司内部转账确认'
    }
  },
  {
    path: 'innerCompanyTransResult',
    name: 'innerCompanyTransResult',
    component: innerCompanyTransResult,
    meta: {
      auth: true,
      title: '公司内部转账结果'
    }
  },
  {
    path: 'singleTransPre',
    name: 'singleTransPre',
    component: () => import('@/pages/transfer/singleTransfer/singleTransPre'),
    meta: {
      auth: true,
      title: '单笔转账录入',
      notCache: true
    }
  },
  {
    path: 'singleTransConf',
    name: 'singleTransConf',
    component: singleTransConf,
    meta: {
      auth: true,
      title: '单笔转账确认页'
    }
  },
  {
    path: 'singleTransResult',
    name: 'singleTransResult',
    component: singleTransResult,
    meta: {
      auth: true,
      title: '单笔转账结果页'
    }
  },
  {
    path: 'accountSelection',
    name: 'accountSelection',
    component: accountSelection,
    meta: {
      auth: true,
      title: '常用往来账户选择'
    }
  },
  {
    path: 'msgManage',
    name: 'msgManage',
    component: () => import('@/pages/transfer/singleTransfer/msgManage'),
    meta: {
      auth: true,
      title: '转账附言管理'
    }
  },
  {
    path: 'bankSelection',
    name: 'bankSelection',
    component: bankSelection,
    meta: {
      auth: true,
      title: '开户网点查询'
    }
  },
  {
    path: 'scheduledTransInquiry',
    name: 'scheduledTransInquiry',
    component: scheduledTransInquiry,
    meta: {
      auth: true,
      title: '预约交易查询',
      notCache: true
    }
  },
  {
    path: 'timedTransInquiry',
    name: 'timedTransInquiry',
    component: timedTransInquiry,
    meta: {
      auth: true,
      title: '定时交易查询',
      notCache: true
    }
  },
  {
    path: 'transDetails',
    name: 'transDetails',
    component: transDetails,
    meta: {
      auth: true,
      title: '预约交易查询详情'
    }
  },
  {
    path: 'transCancel',
    name: 'transCancel',
    component: transCancel,
    meta: {
      auth: true,
      title: '预约交易撤销'
    }
  },
  {
    path: 'transCancelRes',
    name: 'transCancelRes',
    component: transCancelRes,
    meta: {
      auth: true,
      title: '预约交易撤销结果'
    }
  },
  {
    path: 'timedDetails',
    name: 'timedDetails',
    component: timedDetails,
    meta: {
      auth: true,
      title: '定时交易详情'
    }
  },
  {
    path: 'timedCancel',
    name: 'timedCancel',
    component: timedCancel,
    meta: {
      auth: true,
      title: '定时交易撤销'
    }
  },
  {
    path: 'timedCancelRes',
    name: 'timedCancelRes',
    component: timedCancelRes,
    meta: {
      auth: true,
      title: '定时交易撤销结果'
    }
  },
  {
    path: 'batchTransfer',
    name: 'batchTransfer',
    component: batchTransfer,
    meta: {
      auth: true,
      title: '批量交易',
      notCache: true
    }
  },
  {
    path: 'batchTransferConf',
    name: 'batchTransferConf',
    component: batchTransferConf,
    meta: {
      auth: true,
      title: '批量交易确认页'
    }
  },
  {
    path: 'addBatch',
    name: 'addBatch',
    component: addBatch,
    meta: {
      auth: true,
      title: '新增批量'
    }
  },
  {
    path: 'batchTransferRes',
    name: 'batchTransferRes',
    component: batchTransferRes,
    meta: {
      auth: true,
      title: '新增批量'
    }
  },
  {
    path: 'currentAccInquiry',
    name: 'currentAccInquiry',
    component: currentAccInquiry,
    meta: {
      auth: true,
      title: '常用往来账户查询'
    }
  },
  {
    path: 'add',
    name: 'add',
    component: add,
    meta: {
      auth: true,
      title: '常用往来账户新增/修改'
    }
  },
  {
    path: 'maintainRes',
    name: 'maintainRes',
    component: maintainRes,
    meta: {
      auth: true,
      title: '常用往来账户维护结果页'
    }
  },
  {
    path: 'onlineBankTransInquiry',
    name: 'onlineBankTransInquiry',
    component: onlineBankTransInquiry,
    meta: {
      auth: true,
      title: '网银转账结果查询',
      notCache: true
    }
  },
  {
    path: 'batchTransDetail',
    name: 'batchTransDetail',
    component: batchTransDetail,
    meta: {
      auth: true,
      title: '批量转账详情'
    }
  },
  {
    path: 'noTaxPay',
    name: 'noTaxPay',
    component: noTaxPay,
    meta: {
      auth: true,
      title: '非税缴费'
    }
  },
  {
    path: 'noTaxPayPre',
    name: 'noTaxPayPre',
    component: noTaxPayPre,
    meta: {
      auth: true,
      title: '非税缴费录入'
    }
  },
  {
    path: 'noTaxPayConf',
    name: 'noTaxPayConf',
    component: noTaxPayConf,
    meta: {
      auth: true,
      title: '非税缴费确认'
    }
  },
  {
    path: 'noTaxPayRes',
    name: 'noTaxPayRes',
    component: noTaxPayRes,
    meta: {
      auth: true,
      title: '非税缴费结果'
    }
  },
  {
    path: 'historyInquiry',
    name: 'historyInquiry',
    component: historyInquiry,
    meta: {
      auth: true,
      title: '非税缴费历史查询'
    }
  },
  {
    path: 'notaxPayDetail',
    name: 'notaxPayDetail',
    component: notaxPayDetail,
    meta: {
      auth: true,
      title: '非税缴费历史查询详情页'
    }
  },
  {
    path: 'sportsPayPre',
    name: 'sportsPayPre',
    component: sportsPayPre,
    meta: {
      auth: true,
      title: '体彩缴费录入'
    }
  },
  {
    path: 'sportsPayConf',
    name: 'sportsPayConf',
    component: sportsPayConf,
    meta: {
      auth: true,
      title: '体彩缴费确认'
    }
  },
  {
    path: 'sportsPayRes',
    name: 'sportsPayRes',
    component: sportsPayRes,
    meta: {
      auth: true,
      title: '体彩缴费结果'
    }
  },
  {
    path: 'shipTrans',
    name: 'shipTrans',
    component: shipTrans,
    meta: {
      auth: true,
      title: '上海航运-出入金交易'
    }
  },
  {
    path: 'depositPre',
    name: 'depositPre',
    component: depositPre,
    meta: {
      auth: true,
      title: '上海航运-入金交易录入'
    }
  },
  {
    path: 'depositConf',
    name: 'depositConf',
    component: depositConf,
    meta: {
      auth: true,
      title: '上海航运-入金交易确认'
    }
  },
  {
    path: 'depositRes',
    name: 'depositRes',
    component: depositRes,
    meta: {
      auth: true,
      title: '上海航运-入金交易结果'
    }
  },
  {
    path: 'withdrawalPre',
    name: 'withdrawalPre',
    component: withdrawalPre,
    meta: {
      auth: true,
      title: '上海航运-出金交易录入'
    }
  },
  {
    path: 'withdrawalConf',
    name: 'withdrawalConf',
    component: withdrawalConf,
    meta: {
      auth: true,
      title: '上海航运-出金交易确认'
    }
  },
  {
    path: 'withdrawalRes',
    name: 'withdrawalRes',
    component: withdrawalRes,
    meta: {
      auth: true,
      title: '上海航运-出金交易结果'
    }
  },
  {
    path: 'dwInquiry',
    name: 'dwInquiry',
    component: dwInquiry,
    meta: {
      auth: true,
      title: '出入金交易明细查询'
    }
  },
  {
    path: 'socialSecurityPayment',
    name: 'socialSecurityPayment',
    component: socialSecurityPayment,
    meta: {
      auth: true,
      title: '社保缴费'
    }
  },
  {
    path: 'socialSecurityPaymentPer',
    name: 'socialSecurityPaymentPer',
    component: socialSecurityPaymentPer,
    meta: {
      auth: true,
      title: '社保缴费录入'
    }
  },
  {
    path: 'socialSecurityPaymentConf',
    name: 'socialSecurityPaymentConf',
    component: socialSecurityPaymentConf,
    meta: {
      auth: true,
      title: '社保缴费确认'
    }
  },
  {
    path: 'socialSecurityPaymentRes',
    name: 'socialSecurityPaymentRes',
    component: socialSecurityPaymentRes,
    meta: {
      auth: true,
      title: '社保缴费结果'
    }
  },
  {
    path: 'SuperEntSign',
    name: 'SuperEntSign',
    component: SuperEntSign,
    meta: {
      auth: true,
      title: '他行账户签约'
    }
  }
]
export default transferRouter
