// 账户管理路由
const regularAccountQuery = () => import('@/pages/accountManagement/regularAccountQuery/regularAccountQuery')
const childAccountQuery = () => import('@/pages/accountManagement/childAccountQuery/childAccountQuery')
const childAccountQueryDetails = () => import('@/pages/accountManagement/childAccountQuery/childAccountQueryDetails')
const noticeFindingQuery = () => import('@/pages/accountManagement/noticeFindQuery/noticeFindingQuery')
const noticeFindDetailsQuery = () => import('@/pages/accountManagement/noticeFindQuery/noticeFindDetailsQuery')
const dealDepositQuery = () => import('@/pages/accountManagement/dealDepositQuery/')
const bigDepositQuery = () => import('@/pages/accountManagement/bigDepositQuery/bigDepositQuery')
const bigDepositQueryDetails = () => import('@/pages/accountManagement/bigDepositQuery/bigDepositQueryDetails')
const strucQuery = () => import('@/pages/accountManagement/strucQuery/strucQuery')
const strucQueryDetails = () => import('@/pages/accountManagement/strucQuery/strucQueryDetails')
const regularPokQuery = () => import('@/pages/accountManagement/regularPokQuery/regularPokQuery')
const regularPokQueryDetails = () => import('@/pages/accountManagement/regularPokQuery/regularPokQueryDetails')
const largeDepositTransferQuery = () => import('@/pages/accountManagement/largeDepositTransferQuery/largeDepositTransferQuery.vue')
const largeDepositTransferQueryDetails = () => import('@/pages/accountManagement/largeDepositTransferQuery/largeDepositTransferQueryDetails.vue')

const accountManagmentRouter = [
  {
    path: 'regularAccountQuery',
    name: 'regularAccountQuery',
    component: regularAccountQuery,
    meta: {
      auth: true,
      title: '定期账户查询'
    }
  },
  {
    path: 'resultAccountQuery',
    name: 'resultAccountQuery',
    component: () => import('@/pages/accountManagement/regularAccountQuery/resultAccountQuery'),
    meta: {
      auth: true,
      title: '定期账户查询结果'
    }
  },
  {
    path: 'childAccountQuery',
    name: 'childAccountQuery',
    component: childAccountQuery,
    meta: {
      auth: true,
      title: '子账户查询'
    }
  },
  {
    path: 'noticeFindingQuery',
    name: 'noticeFindingQuery',
    component: noticeFindingQuery,
    meta: {
      auth: true,
      title: '通知存款账户查询'
    }
  },
  {
    path: 'noticeFindDetailsQuery',
    name: 'noticeFindDetailsQuery',
    component: noticeFindDetailsQuery,
    meta: {
      auth: true,
      title: '通知存款账户查询结果'
    }
  },
  {
    path: 'childAccountQueryDetails',
    name: 'childAccountQueryDetails',
    component: childAccountQueryDetails,
    meta: {
      auth: true,
      title: '子账户查询详情'
    }
  },
  {
    path: 'dealDepositQuery',
    name: 'dealDepositQuery',
    component: dealDepositQuery,
    meta: {
      auth: true,
      title: '协定存款查询'
    }
  },
  {
    path: 'bigDepositQuery',
    name: 'bigDepositQuery',
    component: bigDepositQuery,
    meta: {
      auth: true,
      title: '大额存单查询'
    }
  },
  {
    path: 'bigDepositQueryDetails',
    name: 'bigDepositQueryDetails',
    component: bigDepositQueryDetails,
    meta: {
      auth: true,
      title: '大额存单查询详情'
    }
  },
  {
    path: 'largeDepositTransferQuery',
    name: 'largeDepositTransferQuery',
    component: largeDepositTransferQuery,
    meta: {
      auth: true,
      title: '大额存单转让受让查询',
      notCache: true
    }
  },
  {
    path: 'largeDepositTransferQueryDetails',
    name: 'largeDepositTransferQueryDetails',
    component: largeDepositTransferQueryDetails,
    meta: {
      auth: true,
      title: '大额存单转让受让查询详情'
    }
  },
  {
    path: 'strucQuery',
    name: 'strucQuery',
    component: strucQuery,
    meta: {
      auth: true,
      title: '结构性存款查询'
    }
  },
  {
    path: 'strucQueryDetails',
    name: 'strucQueryDetails',
    component: strucQueryDetails,
    meta: {
      auth: true,
      title: '结构性存款查询详情'
    }
  },
  {
    path: 'regularPokQuery',
    name: 'regularPokQuery',
    component: regularPokQuery,
    meta: {
      auth: true,
      title: '定期通查询'
    }
  },
  {
    path: 'regularPokQueryDetails',
    name: 'regularPokQueryDetails',
    component: regularPokQueryDetails,
    meta: {
      auth: true,
      title: '定期通查询详情'
    }
  }
]

export default accountManagmentRouter
