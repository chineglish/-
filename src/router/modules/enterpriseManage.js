// 账户管理路由
const enterpriseManage = () => import('@/pages/enterpriseManage/certificateManage/index')
const certificateRenewal = () => import('@/pages/enterpriseManage/certificateManage/certificateRenewal')
const certificateConfirm = () => import('@/pages/enterpriseManage/certificateManage/certificateConfirm')
const certificateResolve = () => import('@/pages/enterpriseManage/certificateManage/certificateResolve')
const certificateUpdate = () => import('@/pages/enterpriseManage/certificateManage/certificateUpdate')
const certificateUpdateRes = () => import('@/pages/enterpriseManage/certificateManage/certificateUpdateRes')
const quotaManageIndex = () => import('@/pages/enterpriseManage/quotaManage/index')
const quotaManageDetail = () => import('@/pages/enterpriseManage/quotaManage/quotaManageDetail')
const quotaUpdateInput = () => import('@/pages/enterpriseManage/quotaManage/quotaUpdateInput')
const quotaUpdateConfirm = () => import('@/pages/enterpriseManage/quotaManage/quotaUpdateConfirm')
const quotaUpdateRes = () => import('@/pages/enterpriseManage/quotaManage/quotaUpdateRes')
const onlineBankingLog = () => import('@/pages/enterpriseManage/onlineBankingLog/index')
const oldjnlqry = () => import('@/pages/enterpriseManage/oldjnlqry/index')
const oldEnterprise0nlineBanking = () => import('@/pages/enterpriseManage/oldjnlqry/detail')
const oldDaYin = () => import('@/pages/enterpriseManage/oldjnlqry/oldDaYin')
const oldDaYin1 = () => import('@/pages/enterpriseManage/oldjnlqry/oldDaYin1')
const oldDaYinXiao = () => import('@/pages/enterpriseManage/oldjnlqry/oldDaYinXiao')
const oldDaYinXiao1 = () => import('@/pages/enterpriseManage/oldjnlqry/oldDaYinXiao1')
const smallBusinessOnlineBanking = () => import('@/pages/enterpriseManage/oldjnlqry/smallBusinessOnlineBanking')
const enterpriseInfoMaintenance = () => import('@/pages/enterpriseManage/enterpriseInfoMaintenance/index')
const maintenancePage = () => import('@/pages/enterpriseManage/enterpriseInfoMaintenance/maintenancePage')
const maintenanceConfirm = () => import('@/pages/enterpriseManage/enterpriseInfoMaintenance/maintenanceConfirm')
const maintenanceRes = () => import('@/pages/enterpriseManage/enterpriseInfoMaintenance/maintenanceRes')
const onlineBankingLogDetail = () => import('../../pages/enterpriseManage/onlineBankingLog/detail')
const autoFeeSignAlready = () => import('@/pages/enterpriseManage/autoFeeSign/autoFeeSignAlready/autoFeeSignAlready')
const autoFeeSignDefend = () => import('@/pages/enterpriseManage/autoFeeSign/autoFeeSignAlready/autoFeeSignDefend/autoFeeSignDefend')
const autoFeeSignConfirm = () => import('@/pages/enterpriseManage/autoFeeSign/autoFeeSignAlready/autoFeeSignDefend/autoFeeSignConfirm')
const autoFeeSignRes = () => import('@/pages/enterpriseManage/autoFeeSign/autoFeeSignAlready/autoFeeSignDefend/autoFeeSignRes')
const autoFeeSignCancelConfirm = () => import('@/pages/enterpriseManage/autoFeeSign/autoFeeSignAlready/autoFeeSignCancel/autoFeeSignCancelConfirm')
const autoFeeRefuseConf = () => import('@/pages/enterpriseManage/autoFeeSign/autoFeeSignAlready/autoFeeSignCancel/autoFeeRefuseConf')
const notSign = () => import('@/pages/enterpriseManage/autoFeeSign/autoFeeSignNot/notSign')
const innerSign = () => import('@/pages/enterpriseManage/autoFeeSign/autoFeeSignNot/innerSign')
const signProtocol = () => import('@/pages/enterpriseManage/autoFeeSign/autoFeeSignNot/signProtocol')
const confirmSign = () => import('@/pages/enterpriseManage/autoFeeSign/autoFeeSignNot/confirmSign')
const resultSign = () => import('@/pages/enterpriseManage/autoFeeSign/autoFeeSignNot/resultSign')
// 管理类交易审核
const checkQuery = () => import('@/pages/enterpriseManage/manageTransactionCheck/components/checkQuery')
const approvalProcessDetail = () => import('@/pages/enterpriseManage/manageTransactionCheck/approvalProcessDetail')
const checkQueryDetails = () => import('@/pages/enterpriseManage/manageTransactionCheck/checkQuery/checkQueryDetails')
const checkQueryResult = () => import('@/pages/enterpriseManage/manageTransactionCheck/checkQuery/checkQueryResult')
const logInAndLogOut = () => import('@/pages/enterpriseManage/onlineBankingLog/onlineBanking/logInAndLogOut')
const enterpriseManageRouter = [
  {
    path: 'approvalProcessDetail',
    name: 'approvalProcessDetail',
    component: approvalProcessDetail,
    meta: {
      auth: true,
      title: '审批流程设置审核详情',
      notCache: true
    }
  },
  {
    path: 'enterpriseManage',
    name: 'enterpriseManage',
    component: enterpriseManage,
    meta: {
      auth: true,
      title: '证书管理'
    }
  },
  {
    path: 'certificateRenewal',
    name: 'certificateRenewal',
    component: certificateRenewal,
    meta: {
      auth: true,
      title: '证书续费'
    }
  },
  {
    path: 'certificateConfirm',
    name: 'certificateConfirm',
    component: certificateConfirm,
    meta: {
      auth: true,
      title: '续费确认'
    }
  },
  {
    path: 'certificateResolve',
    name: 'certificateResolve',
    component: certificateResolve,
    meta: {
      auth: true,
      title: '缴费结果'
    }
  },
  {
    path: 'certificateUpdate',
    name: 'certificateUpdate',
    component: certificateUpdate,
    meta: {
      auth: true,
      title: '证书更新'
    }
  },
  {
    path: 'certificateUpdateRes',
    name: 'certificateUpdateRes',
    component: certificateUpdateRes,
    meta: {
      auth: true,
      title: '更新结果'
    }
  },
  {
    path: 'quotaManage',
    name: 'quotaManage',
    component: quotaManageIndex,
    meta: {
      auth: true,
      title: '限额管理',
      notCache: true
    }
  },
  {
    path: 'quotaManageDetail',
    name: 'quotaManageDetail',
    component: quotaManageDetail,
    meta: {
      auth: true,
      title: '限额管理详情'
    }
  },
  {
    path: 'quotaUpdateInput',
    name: 'quotaUpdateInput',
    component: quotaUpdateInput,
    meta: {
      auth: true,
      title: '限额修改'
    }
  },
  {
    path: 'quotaUpdateConfirm',
    name: 'quotaUpdateConfirm',
    component: quotaUpdateConfirm,
    meta: {
      auth: true,
      title: '限额修改确认'
    }
  },
  {
    path: 'quotaUpdateRes',
    name: 'quotaUpdateRes',
    component: quotaUpdateRes,
    meta: {
      auth: true,
      title: '限额修改结果'
    }
  },
  {
    path: 'onlineBankingLog',
    name: 'onlineBankingLog',
    component: onlineBankingLog,
    meta: {
      auth: true,
      title: '网银日志查询',
      notCache: true
    }
  },
  {
    path: 'oldjnlqry',
    name: 'oldjnlqry',
    component: oldjnlqry,
    meta: {
      auth: true,
      title: '老网银日志查询',
      notCache: true
    }
  },
  {
    path: 'oldEnterprise0nlineBanking',
    name: 'oldEnterprise0nlineBanking',
    component: oldEnterprise0nlineBanking,
    meta: {
      auth: true,
      title: '老网银日志查询详情'
    }
  },
  {
    path: 'oldDaYin',
    name: 'oldDaYin',
    component: oldDaYin,
    meta: {
      auth: true,
      title: '老网银回单打印'
    }
  },
  {
    path: 'oldDaYin1',
    name: 'oldDaYin1',
    component: oldDaYin1,
    meta: {
      auth: true,
      title: '老网银回单行内打印'
    }
  },
  {
    path: 'oldDaYinXiao',
    name: 'oldDaYinXiao',
    component: oldDaYinXiao,
    meta: {
      auth: true,
      title: '老网银小企业回单打印'
    }
  },
  {
    path: 'oldDaYinXiao1',
    name: 'oldDaYinXiao1',
    component: oldDaYinXiao1,
    meta: {
      auth: true,
      title: '老网银小企业行内回单打印'
    }
  },
  {
    path: 'smallBusinessOnlineBanking',
    name: 'smallBusinessOnlineBanking',
    component: smallBusinessOnlineBanking,
    meta: {
      auth: true,
      title: '小网银日志查询详情'
    }
  },
  {
    path: 'enterpriseInfoMaintenance',
    name: 'enterpriseInfoMaintenance',
    component: enterpriseInfoMaintenance,
    meta: {
      auth: true,
      title: '企业信息维护'
    }
  },
  {
    path: 'maintenancePage',
    name: 'maintenancePage',
    component: maintenancePage,
    meta: {
      auth: true,
      title: '企业信息维护操作',
      notCache: true
    }
  },
  {
    path: 'maintenanceConfirm',
    name: 'maintenanceConfirm',
    component: maintenanceConfirm,
    meta: {
      auth: true,
      title: '企业信息维护确认'
    }
  },
  {
    path: 'maintenanceRes',
    name: 'maintenanceRes',
    component: maintenanceRes,
    meta: {
      auth: true,
      title: '企业信息维护结果'
    }
  },
  {
    path: 'onlineBankingLogDetail',
    name: 'onlineBankingLogDetail',
    component: onlineBankingLogDetail,
    meta: {
      auth: true,
      title: '网银日志查询详情'
    }
  },
  {
    path: 'autoFeeSignAlready',
    name: 'autoFeeSignAlready',
    component: autoFeeSignAlready,
    meta: {
      auth: true,
      title: '自动扣费已签约'
    }
  },
  {
    path: 'autoFeeSignDefend',
    name: 'autoFeeSignDefend',
    component: autoFeeSignDefend,
    meta: {
      auth: true,
      title: '自动扣费签约',
      notCache: true
    }
  },
  {
    path: 'autoFeeSignConfirm',
    name: 'autoFeeSignConfirm',
    component: autoFeeSignConfirm,
    meta: {
      auth: true,
      title: '自动扣费签约'
    }
  },
  {
    path: 'autoFeeSignRes',
    name: 'autoFeeSignRes',
    component: autoFeeSignRes,
    meta: {
      auth: true,
      title: '自动扣费签约'
    }
  },
  {
    path: 'autoFeeRefuseConf',
    name: 'autoFeeRefuseConf',
    component: autoFeeRefuseConf,
    meta: {
      auth: true,
      title: '自动扣费签约解约确认页'
    }
  },
  {
    path: 'autoFeeSignCancelConfirm',
    name: 'autoFeeSignCancelConfirm',
    component: autoFeeSignCancelConfirm,
    meta: {
      auth: true,
      title: '自动扣费签约'
    }
  },
  {
    path: 'notSign',
    name: 'notSign',
    component: notSign,
    meta: {
      auth: true,
      title: '自动扣费签约'
    }
  },
  {
    path: 'innerSign',
    name: 'innerSign',
    component: innerSign,
    meta: {
      auth: true,
      title: '自动扣费签约',
      notCache: true
    }
  },
  {
    path: 'signProtocol',
    name: 'signProtocol',
    component: signProtocol,
    meta: {
      auth: true,
      title: '自动扣费签约'
    }
  },
  {
    path: 'confirmSign',
    name: 'confirmSign',
    component: confirmSign,
    meta: {
      auth: true,
      title: '自动扣费签约'
    }
  },
  {
    path: 'resultSign',
    name: 'resultSign',
    component: resultSign,
    meta: {
      auth: true,
      title: '自动扣费签约'
    }
  },
  {
    path: 'manageTransactionCheck',
    name: 'manageTransactionCheck',
    component: () => import('@/pages/enterpriseManage/manageTransactionCheck/manageTransactionCheck'),
    meta: {
      auth: true,
      title: '管理类交易审核'
    }
  },
  {
    path: 'waitCheckQuery',
    name: 'waitCheckQuery',
    component: () => import('@/pages/enterpriseManage/manageTransactionCheck/components/waitCheckQuery'),
    meta: {
      auth: true,
      title: '待审核记录查询',
      notCache: true
    }
  },
  {
    path: 'checkQuery',
    name: 'checkQuery',
    component: checkQuery,
    meta: {
      auth: true,
      title: '审核记录查询'
    }
  },
  {
    path: 'waitCheckDetails',
    name: 'waitCheckDetails',
    component: () => import('@/pages/enterpriseManage/manageTransactionCheck/waitManageCheck/waitCheckDetails'),
    meta: {
      auth: true,
      title: '待审核记录查询详情'
    }
  },
  {
    path: 'managementTransDetails',
    name: 'managementTransDetails',
    component: () => import('@/pages/enterpriseManage/manageTransactionCheck/managementTransDetails'),
    meta: {
      auth: true,
      title: '待审核记录查询详情',
      notCache: true
    }
  },
  {
    path: 'setMultLeveLedgerRootsDetail',
    name: 'setMultLeveLedgerRootsDetail',
    component: () => import('@/pages/enterpriseManage/manageTransactionCheck/setMultLeveLedgerRootsDetail'),
    meta: {
      auth: true,
      title: '多级账簿权限设置审核详情',
      notCache: true
    }
  },
  {
    path: 'waitCheckConfirm',
    name: 'waitCheckConfirm',
    component: () => import('@/pages/enterpriseManage/manageTransactionCheck/waitManageCheck/waitCheckConfirm/waitCheckConfirm'),
    meta: {
      auth: true,
      title: '待审核记录查询'
    }
  },
  {
    path: 'waitCheckResult',
    name: 'waitCheckResult',
    component: () => import('@/pages/enterpriseManage/manageTransactionCheck/waitManageCheck/waitCheckConfirm/waitCheckResult'),
    meta: {
      auth: true,
      title: '待审核记录查询'
    }
  },
  {
    path: 'checkRefuseInner',
    name: 'checkRefuseInner',
    component: () => import('@/pages/enterpriseManage/manageTransactionCheck/waitManageCheck/waitCheckRefuse/checkRefuseInner'),
    meta: {
      auth: true,
      title: '待审核记录查询-拒绝录入',
      notCache: true
    }
  },
  {
    path: 'checkRefuseConfirm',
    name: 'checkRefuseConfirm',
    component: () => import('@/pages/enterpriseManage/manageTransactionCheck/waitManageCheck/waitCheckRefuse/checkRefuseConfirm'),
    meta: {
      auth: true,
      title: '待审核记录查询-拒绝确认'
    }
  },
  {
    path: 'checkRefuseResult',
    name: 'checkRefuseResult',
    component: () => import('@/pages/enterpriseManage/manageTransactionCheck/waitManageCheck/waitCheckRefuse/checkRefuseResult'),
    meta: {
      auth: true,
      title: '待审核记录查询-拒绝结果'
    }
  },
  {
    path: 'checkQueryDetails',
    name: 'checkQueryDetails',
    component: checkQueryDetails,
    meta: {
      auth: true,
      title: '审核记录查询-详情页'
    }
  },
  {
    path: 'checkQueryResult',
    name: 'checkQueryResult',
    component: checkQueryResult,
    meta: {
      auth: true,
      title: '审核记录查询-结果页'
    }
  },
  {
    path: 'myTicketConf',
    name: 'myTicketConf',
    component: () => import('@/pages/enterpriseManage/manageTransactionCheck/waitManageCheck/myTicketConfirm/myTicketConf'),
    meta: {
      auth: true,
      title: '我的制单-确认页'
    }
  },
  {
    path: 'myTicketRes',
    name: 'myTicketRes',
    component: () => import('@/pages/enterpriseManage/manageTransactionCheck/waitManageCheck/myTicketConfirm/myTicketRes'),
    meta: {
      auth: true,
      title: '我的制单-结果页'
    }
  },
  {
    path: 'logInAndLogOut',
    name: 'logInAndLogOut',
    component: logInAndLogOut,
    meta: {
      auth: true,
      title: '登录登出详情页'
    }
  }
]

export default enterpriseManageRouter
