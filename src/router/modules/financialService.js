//  理财服务路由
const dealBook = () => import('@/pages/financialService/noticeDeposit/currentNoticeDeposit/dealBook')
const innerMoney = () => import('@/pages/financialService/noticeDeposit/currentNoticeDeposit/innerMoney')
const confirmMoney = () => import('@/pages/financialService/noticeDeposit/currentNoticeDeposit/confirmMoney')
const resultMoney = () => import('@/pages/financialService/noticeDeposit/currentNoticeDeposit/resultMoney')

const innerDraw = () => import('@/pages/financialService/noticeDeposit/forwardDraw/innerDraw')
const confirmDraw = () => import('@/pages/financialService/noticeDeposit/forwardDraw/confirmDraw')
const resultDraw = () => import('@/pages/financialService/noticeDeposit/forwardDraw/resultDraw')
const forwardDrawList = () => import('@/pages/financialService/noticeDeposit/forwardDraw/forwardDrawList')

const noticeFinding = () => import('@/pages/financialService/noticeDeposit/noticeFind/noticeFinding')
const noticeFindDetails = () => import('@/pages/financialService/noticeDeposit/noticeFind/noticeFindDetails')

const bankProtocol = () => import('@/pages/financialService/constantRotation/currentToTerm/bankProtocol')
const innerCurrentToTerm = () => import('@/pages/financialService/constantRotation/currentToTerm/innerCurrentToTerm')
const confirmCurrentToTerm = () => import('@/pages/financialService/constantRotation/currentToTerm/confirmCurrentToTerm')
const resultCurrentToTerm = () => import('@/pages/financialService/constantRotation/currentToTerm/resultCurrentToTerm')

const regularDraw = () => import('@/pages/financialService/constantRotation/regularDraw/regularDraw')
const innerRegularDraw = () => import('@/pages/financialService/constantRotation/regularDraw/innerRegularDraw')
const confirmRegularDraw = () => import('@/pages/financialService/constantRotation/regularDraw/confirmRegularDraw')
const resultRegularDraw = () => import('@/pages/financialService/constantRotation/regularDraw/resultRegularDraw')

const regularQuery = () => import('@/pages/financialService/constantRotation/regularQuery/regularQuery')
const regularQueryDetails = () => import('@/pages/financialService/constantRotation/regularQuery/regularQueryDetails')

const account = () => import('@/pages/financialService/structureDeposit/structureDepositAccount/account')
const confirmAccount = () => import('@/pages/financialService/structureDeposit/structureDepositAccount/confirmAccount')
const resultAccount = () => import('@/pages/financialService/structureDeposit/structureDepositAccount/resultAccount')

const structureQuery = () => import('@/pages/financialService/structureDeposit/structureQuery/structureQuery')
const structureQueryDetails = () => import('@/pages/financialService/structureDeposit/structureQuery/structureQueryDetails')
// const openAccountAgreement = () => import('@/pages/financialService/structureDeposit/structureOpenAccount/openAccountAgreement')
const openAccountInner = () => import('@/pages/financialService/structureDeposit/structureOpenAccount/openAccountInner')
const openAccountConfirm = () => import('@/pages/financialService/structureDeposit/structureOpenAccount/openAccountConfirm')
const openAccountRes = () => import('@/pages/financialService/structureDeposit/structureOpenAccount/openAccountRes')

const financialRedeemForm = () => import('@/pages/financialManagement/financialOperate/financialRedeemForm')
const financialRedeemConfirm = () => import('@/pages/financialManagement/financialOperate/financialRedeemConfirm')
const financialRedeemRes = () => import('@/pages/financialManagement/financialOperate/financialRedeemRes')
const financialCancelConfirm = () => import('@/pages/financialManagement/financialOperate/financialCancelConfirm')
const financialCancelRes = () => import('@/pages/financialManagement/financialOperate/financialCancelRes')
const financialRedeemCancelConfirm = () => import('@/pages/financialManagement/financialOperate/financialRedeemCancelConfirm')
const financialRedeemCancelRes = () => import('@/pages/financialManagement/financialOperate/financialRedeemCancelRes')

const financialServiceRouter = [

  {
    path: 'dealBook',
    name: 'dealBook',
    component: dealBook,
    meta: {
      auth: true,
      title: '协议书'
    }
  }, {
    path: 'innerMoney',
    name: 'innerMoney',
    component: innerMoney,
    meta: {
      auth: true,
      title: '存款录入'
    }
  },
  {
    path: 'confirmMoney',
    name: 'confirmMoney',
    component: confirmMoney,
    meta: {
      auth: true,
      title: '存款确认'
    }
  },
  {
    path: 'resultMoney',
    name: 'resultMoney',
    component: resultMoney,
    meta: {
      auth: true,
      title: '确认结果'
    }
  },
  {
    path: 'forwardDrawList',
    name: 'forwardDrawList',
    component: forwardDrawList,
    meta: {
      auth: true,
      title: '提前支取列表'
    }
  },
  {
    path: 'innerDraw',
    name: 'innerDraw',
    component: innerDraw,
    meta: {
      auth: true,
      title: '支取录入'
    }
  },
  {
    path: 'confirmDraw',
    name: 'confirmDraw',
    component: confirmDraw,
    meta: {
      auth: true,
      title: '支取确认'
    }
  },
  {
    path: 'resultDraw',
    name: 'resultDraw',
    component: resultDraw,
    meta: {
      auth: true,
      title: '支取结果'
    }
  },
  {
    path: 'noticeFinding',
    name: 'noticeFinding',
    component: noticeFinding,
    meta: {
      auth: true,
      title: '通知存款账户查询'
    }
  },
  {
    path: 'noticeFindDetails',
    name: 'noticeFindDetails',
    component: noticeFindDetails,
    meta: {
      auth: true,
      title: '通知存款账户查询结果'
    }
  },
  {
    path: 'bankProtocol',
    name: 'bankProtocol',
    component: bankProtocol,
    meta: {
      auth: true,
      title: '银行协议'
    }
  },
  {
    path: 'innerCurrentToTerm',
    name: 'innerCurrentToTerm',
    component: innerCurrentToTerm,
    meta: {
      auth: true,
      title: '活期转定期录入'
    }
  },
  {
    path: 'confirmCurrentToTerm',
    name: 'confirmCurrentToTerm',
    component: confirmCurrentToTerm,
    meta: {
      auth: true,
      title: '活期转定期确认'
    }
  },
  {
    path: 'resultCurrentToTerm',
    name: 'resultCurrentToTerm',
    component: resultCurrentToTerm,
    meta: {
      auth: true,
      title: '活期转定期结果'
    }
  },
  {
    path: 'regularDraw',
    name: 'regularDraw',
    component: regularDraw,
    meta: {
      auth: true,
      title: '定期支取'
    }
  },
  {
    path: 'innerRegularDraw',
    name: 'innerRegularDraw',
    component: innerRegularDraw,
    meta: {
      auth: true,
      title: '定期支取录入'
    }
  },
  {
    path: 'confirmRegularDraw',
    name: 'confirmRegularDraw',
    component: confirmRegularDraw,
    meta: {
      auth: true,
      title: '定期支取确认'
    }
  },
  {
    path: 'resultRegularDraw',
    name: 'resultRegularDraw',
    component: resultRegularDraw,
    meta: {
      auth: true,
      title: '定期支取结果'
    }
  },
  {
    path: 'regularQuery',
    name: 'regularQuery',
    component: regularQuery,
    meta: {
      auth: true,
      title: '定期账户查询'
    }
  },
  {
    path: 'regularQueryDetails',
    name: 'regularQueryDetails',
    component: regularQueryDetails,
    meta: {
      auth: true,
      title: '定期查询详情'
    }
  },
  {
    path: 'account',
    name: 'account',
    component: account,
    meta: {
      auth: true,
      title: '结构性存款销户'
    }
  },
  {
    path: 'confirmAccount',
    name: 'confirmAccount',
    component: confirmAccount,
    meta: {
      auth: true,
      title: '结构性存款销户确认'
    }
  },
  {
    path: 'resultAccount',
    name: 'resultAccount',
    component: resultAccount,
    meta: {
      auth: true,
      title: '结构性存款销户结果'
    }
  },
  {
    path: 'structureQuery',
    name: 'structureQuery',
    component: structureQuery,
    meta: {
      auth: true,
      title: '结构性存款查询账户查询'
    }
  },
  {
    path: 'structureQueryDetails',
    name: 'structureQueryDetails',
    component: structureQueryDetails,
    meta: {
      auth: true,
      title: '结构性存款查询详情'
    }
  },
  {
    path: 'financialRedeemForm',
    name: 'financialRedeemForm',
    component: financialRedeemForm,
    meta: {
      auth: true,
      title: '理财委托赎回'
    }
  },
  {
    path: 'financialRedeemConfirm',
    name: 'financialRedeemConfirm',
    component: financialRedeemConfirm,
    meta: {
      auth: true,
      title: '委托赎回确认'
    }
  },
  {
    path: 'financialRedeemRes',
    name: 'financialRedeemRes',
    component: financialRedeemRes,
    meta: {
      auth: true,
      title: '委托赎回结果'
    }
  },
  {
    path: 'financialCancelConfirm',
    name: 'financialCancelConfirm',
    component: financialCancelConfirm,
    meta: {
      auth: true,
      title: '撤单确认'
    }
  },
  {
    path: 'financialCancelRes',
    name: 'financialCancelRes',
    component: financialCancelRes,
    meta: {
      auth: true,
      title: '撤单结果'
    }
  },
  {
    path: 'financialRedeemCancelConfirm',
    name: 'financialRedeemCancelConfirm',
    component: financialRedeemCancelConfirm,
    meta: {
      auth: true,
      title: '赎回撤单'
    }
  },
  {
    path: 'financialRedeemCancelRes',
    name: 'financialRedeemCancelRes',
    component: financialRedeemCancelRes,
    meta: {
      auth: true,
      title: '赎回撤单结果'
    }
  },
  // {
  //   path: 'openAccountAgreement',
  //   name: 'openAccountAgreement',
  //   component: openAccountAgreement,
  //   meta: {
  //     auth: true,
  //     title: '结构性存款开户协议'
  //   }
  // },
  {
    path: 'openAccountInner',
    name: 'openAccountInner',
    component: openAccountInner,
    meta: {
      auth: true,
      title: '结构性存款开户'
    }
  },
  {
    path: 'openAccountConfirm',
    name: 'openAccountConfirm',
    component: openAccountConfirm,
    meta: {
      auth: true,
      title: '结构性存款开户确认'
    }
  },
  {
    path: 'openAccountRes',
    name: 'openAccountRes',
    component: openAccountRes,
    meta: {
      auth: true,
      title: '结构性存款开户结果'
    }
  }
]

export default financialServiceRouter
