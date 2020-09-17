const waitQueryPage = () => import('@/pages/transactionManagement/waitExamineQuery/waitQueryPage/waitQueryPage')
const slotWait = () => import('@/pages/transactionManagement/waitExamineQuery/waitQueryPage/slotWait')
const transResultPage = () => import('@/pages/transactionManagement/waitExamineQuery/waitQueryPage/transResultPage')
const recallConfirm = () => import('@/pages/transactionManagement/ExamineQuery/recall/recallConfirm')
const recallResult = () => import('@/pages/transactionManagement/ExamineQuery/recall/recallResult')
const queryPage = () => import('@/pages/transactionManagement/waitExamineQuery/waitQueryPage/queryPage')
const queryDetailPage = () => import('@/pages/transactionManagement/ExamineQuery/queryPage/queryDetailPage')
const myForm = () => import('@/pages/transactionManagement/waitExamineQuery/waitQueryPage/myForm')
const myFormDetails = () => import('@/pages/transactionManagement/myForm/myFormDetails')
const collectPerSetDetail = () => import('@/pages/transactionManagement/waitExamineQuery/waitQueryPage/collectPerSetDetail')

const transactionManagementRouter = [
  {
    path: 'waitQueryPage',
    name: 'waitQueryPage',
    component: waitQueryPage,
    meta: {
      auth: true,
      title: '待审核记录查询-查询页'
    }
  },
  {
    path: 'waitQPage',
    name: 'waitQPage',
    component: () => import('@/pages/transactionManagement/waitExamineQuery/waitQueryPage/waitQPage'),
    meta: {
      auth: true,
      title: '待审核记录查询'
    }
  },
  {
    path: 'myForm',
    name: 'myForm',
    component: () => import('@/pages/transactionManagement/waitExamineQuery/waitQueryPage/myForm'),
    meta: {
      auth: true,
      title: '我的制单'
    }
  },
  {
    path: 'waitQueryDetailPage',
    name: 'waitQueryDetailPage',
    component: () => import('@/pages/transactionManagement/waitExamineQuery/waitQueryPage/waitQueryDetailPage'),
    meta: {
      auth: true,
      title: '待审核记录查询-详情页'
    }
  },
  {
    path: 'transactionManagementDetails',
    name: 'transactionManagementDetails',
    component: () => import('@/pages/transactionManagement/waitExamineQuery/waitQueryPage/transactionManagementDetails'),
    meta: {
      auth: true,
      title: '待审核记录查询-详情页',
      notCache: true
    }
  },
  {
    path: 'socialSecurityPaymentDetail',
    name: 'socialSecurityPaymentDetail',
    component: () => import('@/pages/transactionManagement/waitExamineQuery/waitQueryPage/socialSecurityPaymentDetail'),
    meta: {
      auth: true,
      title: '社保缴费-详情页',
      notCache: true
    }
  },
  {
    path: 'confirmPage',
    name: 'confirmPage',
    component: () => import('@/pages/transactionManagement/waitExamineQuery/confirmPage/confirmPage'),
    meta: {
      auth: true,
      title: '待审核记录查询'
    }
  },
  {
    path: 'resultPage',
    name: 'resultPage',
    component: () => import('@/pages/transactionManagement/waitExamineQuery/confirmPage/resultPage'),
    meta: {
      auth: true,
      title: '待审核记录查询'
    }
  },
  {
    path: 'transResultPage',
    name: 'transResultPage',
    component: transResultPage,
    meta: {
      auth: true,
      title: '交易管理结果页'
    }
  },
  {
    path: 'refusePage',
    name: 'refusePage',
    component: () => import('@/pages/transactionManagement/waitExamineQuery/refusePage/refusePage'),
    meta: {
      auth: true,
      title: '待审核记录查询',
      notCache: true
    }
  },
  {
    path: 'refuseConfirmPage',
    name: 'refuseConfirmPage',
    component: () => import('@/pages/transactionManagement/waitExamineQuery/refusePage/refuseConfirmPage'),
    meta: {
      auth: true,
      title: '待审核记录查询'
    }
  },
  {
    path: 'refuseResultPage',
    name: 'refuseResultPage',
    component: () => import('@/pages/transactionManagement/waitExamineQuery/refusePage/refuseResultPage'),
    meta: {
      auth: true,
      title: '待审核记录查询'
    }
  },
  {
    path: 'recallConfirm',
    name: 'recallConfirm',
    component: recallConfirm,
    meta: {
      auth: true,
      title: '待审核记录查询'
    }
  },
  {
    path: 'recallResult',
    name: 'recallResult',
    component: recallResult,
    meta: {
      auth: true,
      title: '待审核记录查询'
    }
  },
  {
    path: 'slotWait',
    name: 'slotWait',
    component: slotWait,
    meta: {
      auth: true,
      title: '插槽测试'
    }
  },
  {
    path: 'queryPage',
    name: 'queryPage',
    component: queryPage,
    meta: {
      auth: true,
      title: '审核查询页'
    }
  },
  {
    path: 'queryDetailPage',
    name: 'queryDetailPage',
    component: queryDetailPage,
    meta: {
      auth: true,
      title: '审核记录查询详情页'
    }
  },
  {
    path: 'myForm',
    name: 'myForm',
    component: myForm,
    meta: {
      auth: true,
      title: '我的制单'
    }
  },
  {
    path: 'myFormDetails',
    name: 'myFormDetails',
    component: myFormDetails,
    meta: {
      auth: true,
      title: '我的制单详情'
    }
  },
  {
    path: 'myFormConfirm',
    name: 'myFormConfirm',
    component: () => import('@/pages/transactionManagement/myForm/myFormConfirm'),
    meta: {
      auth: true,
      title: '我的制单确认'
    }
  },
  {
    path: 'myFormResult',
    name: 'myFormResult',
    component: () => import('@/pages/transactionManagement/myForm/myFormResult'),
    meta: {
      auth: true,
      title: '我的制单结果'
    }
  },
  {
    path: 'periodicColSetDetail',
    name: 'periodicColSetDetail',
    component: () => import('@/pages/transactionManagement/waitExamineQuery/waitQueryPage/periodicColSetDetail'),
    meta: {
      auth: true,
      title: '定时归集设置详情',
      notCache: true
    }
  },
  {
    path: 'collectPerSetDetail',
    name: 'collectPerSetDetail',
    component: collectPerSetDetail,
    meta: {
      auth: true,
      title: '归集周期设置详情',
      notCache: true
    }
  },
  {
    path: 'autDedFeeRelDetail',
    name: 'autDedFeeRelDetail',
    component: () => import('@/pages/transactionManagement/waitExamineQuery/waitQueryPage/autDedFeeRelDetail'),
    meta: {
      auth: true,
      title: '自动扣费签约解约详情',
      notCache: true
    }
  }
]

export default transactionManagementRouter
