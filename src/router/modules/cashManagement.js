// 现金管理路由
const authQuery = () => import('@/pages/cashManagement/groupService/authQuery')
const groupQuery = () => import('@/pages/cashManagement/groupService/groupQuery')
// 现金管理 路由
const subledgerDetails = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerQuery/subledgerDetails')
const multiLevelLedgerBalanceSetConfirm = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerBalanceSet/multiLevelLedgerBalanceConfirm')
const multiLevelLedgerBalanceSetRes = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerBalanceSet/multiLevelLedgerBalanceRes')
const adjustmentForm = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerDetailAdjustment/adjustmentForm')
const adjustmentConfirm = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerDetailAdjustment/adjustmentConfirm')
const adjustmentRes = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerDetailAdjustment/adjustmentRes')
const adjustmentQuery = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerDetailAdjustment/index')
const adjustmentDetail = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerDetailAdjustment/detailPage')
const ledgerDetailsQuery = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerDetailsQuery/index')
const ledgerDetailsPage = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerDetailsQuery/ledgerDetailsPage')
const transferQuery = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerTransfer/index')
const multiLevelLedgerTransferConfirm = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerTransfer/multiLevelLedgerTransferConfirm')
const multiLevelTransferRes = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerTransfer/multiLevelTransferRes')
const rootsQuery = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerRoots/rootsQuery')
const multiLevelLedgerRootsSetRes = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerRoots/multiLevelLedgerRootsSetRes')
const setMultLeveLedgerRootsConfirm = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerRoots/setMultLeveLedgerRootsConfirm')
const setMultiLevelLedgerRoots = () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerRoots/setMultiLevelLedgerRoots')
const AccountBalanceTrend = () => import('@/pages/cashManagement/statisticsAnalysis/AccountBalanceTrend')
const AccountTransferDetail = () => import('@/pages/cashManagement/statisticsAnalysis/AccountTransferDetail')
const FundREInSummary = () => import('@/pages/cashManagement/statisticsAnalysis/FundREInSummary')
const AccountGroupDetail = () => import('@/pages/cashManagement/statisticsAnalysis/AccountGroupDetail')
const EnterpriseAccountInnerInterest = () => import('@/pages/cashManagement/statisticsAnalysis/EnterpriseAccountInnerInterest')
const MultiLedgerTransferDetail = () => import('@/pages/cashManagement/statisticsAnalysis/MultiLedgerTransferDetail')
const virtualFundPoolBuildPre = () => import('@/pages/cashManagement/virtualFundPool/build/virtualFundPoolBuildPre')
const virtualFundPoolBuildConf = () => import('@/pages/cashManagement/virtualFundPool/build/virtualFundPoolBuildConf')
const virtualFundPoolBuildRes = () => import('@/pages/cashManagement/virtualFundPool/build/virtualFundPoolBuildRes')
const VirtualFundPoolListInquire = () => import('@/pages/cashManagement/virtualFundPool/aDC/ListInquire')
const AddVirtualFundPoolRelationPre = () => import('@/pages/cashManagement/virtualFundPool/aDC/add/AddVirtualFundPoolRelationPre')
const AddVirtualFundPoolRelationConf = () => import('@/pages/cashManagement/virtualFundPool/aDC/add/AddVirtualFundPoolRelationConf')
const AddVirtualFundPoolRelationRes = () => import('@/pages/cashManagement/virtualFundPool/aDC/add/AddVirtualFundPoolRelationRes')
const ChangeVirtualFundPoolRelationPre = () => import('@/pages/cashManagement/virtualFundPool/aDC/change/ChangeVirtualFundPoolRelationPre')
const ChangeVirtualFundPoolRelationConf = () => import('@/pages/cashManagement/virtualFundPool/aDC/change/ChangeVirtualFundPoolRelationConf')
const ChangeVirtualFundPoolRelationRes = () => import('@/pages/cashManagement/virtualFundPool/aDC/change/ChangeVirtualFundPoolRelationRes')
const DeletionVirtualFundPoolRelationConf = () => import('@/pages/cashManagement/virtualFundPool/aDC/deletion/DeletionVirtualFundPoolRelationConf')
const VirtualFundPoolRelationshipQuery = () => import('@/pages/cashManagement/virtualFundPool/virtualFundPoolRelationshipQuery/VirtualFundPoolRelationshipQuery')
const VirtualFundPoolRelationshipDetail = () => import('@/pages/cashManagement/virtualFundPool/virtualFundPoolRelationshipQuery/VirtualFundPoolRelationshipDetail')
const virtualFundPoolBalanceInquiry = () => import('@/pages/cashManagement/virtualFundPool/balanceInquiry/virtualFundPoolBalanceInquiry')

// 资金归集
const collectionAccDeIquery = () => import('@/pages/cashManagement/fundCollection/collectionAccDeIquery')

const pooledFundsTransferPre = () => import('@/pages/cashManagement/fundCollection/pooledFundsTransfer/transPre')
const pooledFundsTransferConf = () => import('@/pages/cashManagement/fundCollection/pooledFundsTransfer/transConf')
const pooledFundsTransferRes = () => import('@/pages/cashManagement/fundCollection/pooledFundsTransfer/transRes')

const periodicColSetRes = () => import('@/pages/cashManagement/fundCollection/periodicColSet/periodicColSetRes')

const collectPerSetConf = () => import('@/pages/cashManagement/fundCollection/collectPerSet/collectPerSetConf')
const collectPerSetRes = () => import('@/pages/cashManagement/fundCollection/collectPerSet/collectPerSetRes')

// 虚拟资金池
const virtualRelationQuery = () => import('@/pages/cashManagement/virtualMoneyPool/virtualRelationQuery')
const virtualMoneyQuery = () => import('@/pages/cashManagement/virtualMoneyPool/virtualMoneyQuery')
const cashManagement = [
  {
    path: 'collectRetQuery',
    name: 'collectRetQuery',
    component: () => import('@/pages/cashManagement/fundCollection/collectRetQuery/inquiry'),
    meta: {
      auth: true,
      title: '归集关系查询',
      notCache: true
    }
  },
  {
    path: 'collectRetQueryDetail',
    name: 'collectRetQueryDetail',
    component: () => import('@/pages/cashManagement/fundCollection/collectRetQuery/detail'),
    meta: {
      auth: true,
      title: '归集关系查询-详情'
    }
  },
  {
    path: 'topAccountProperties',
    name: 'topAccountProperties',
    component: () => import('@/pages/cashManagement/fundCollection/collectRetQuery/topAccountProperties'),
    meta: {
      auth: true,
      title: '最高级账户-属性'
    }
  },
  {
    path: 'pooledFundsTransferPre',
    name: 'pooledFundsTransferPre',
    component: pooledFundsTransferPre,
    meta: {
      auth: true,
      title: '归集资金划拨-录入'
    }
  },
  {
    path: 'pooledFundsTransferConf',
    name: 'pooledFundsTransferConf',
    component: pooledFundsTransferConf,
    meta: {
      auth: true,
      title: '归集资金划拨-确认'
    }
  },
  {
    path: 'pooledFundsTransferRes',
    name: 'pooledFundsTransferRes',
    component: pooledFundsTransferRes,
    meta: {
      auth: true,
      title: '归集资金划拨-结果'
    }
  },
  {
    path: 'periodicColSet',
    name: 'periodicColSet',
    component: () => import('@/pages/cashManagement/fundCollection/periodicColSet/periodicColSet'),
    meta: {
      auth: true,
      title: '定时归集设置',
      notCache: true
    }
  },
  {
    path: 'periodicColSetConf',
    name: 'periodicColSetConf',
    component: () => import('@/pages/cashManagement/fundCollection/periodicColSet/periodicColSetConf'),
    meta: {
      auth: true,
      title: '定时归集设置-确认'
    }
  },
  {
    path: 'periodicColSetRes',
    name: 'periodicColSetRes',
    component: periodicColSetRes,
    meta: {
      auth: true,
      title: '定时归集设置-结果'
    }
  },
  {
    path: 'peroidicColSetQuery',
    name: 'peroidicColSetQuery',
    component: () => import('@/pages/cashManagement/fundCollection/peroidicColSetQuery/peroidicColSetQuery'),
    meta: {
      auth: true,
      title: '定时归集查询'
    }
  },
  {
    path: 'collectPerSetQuery',
    name: 'collectPerSetQuery',
    component: () => import('@/pages/cashManagement/fundCollection/collectPerSetQuery/collectPerSetQuery'),
    meta: {
      auth: true,
      title: '归集周期查询'
    }
  },
  {
    path: 'collectPerSet',
    name: 'collectPerSet',
    component: () => import('@/pages/cashManagement/fundCollection/collectPerSet/collectPerSet'),
    meta: {
      auth: true,
      title: '归集周期设置',
      notCache: true
    }
  },
  {
    path: 'collectPerSetConf',
    name: 'collectPerSetConf',
    component: collectPerSetConf,
    meta: {
      auth: true,
      title: '归集周期设置-确认'
    }
  },
  {
    path: 'collectPerSetRes',
    name: 'collectPerSetRes',
    component: collectPerSetRes,
    meta: {
      auth: true,
      title: '归集周期设置-结果'
    }
  },
  {
    path: 'collectionAccBalInquery',
    name: 'collectionAccBalInquery',
    component: () => import('@/pages/cashManagement/fundCollection/collectionAccBalInquery'),
    meta: {
      auth: true,
      title: '归集账户余额查询'
    }
  },
  {
    path: 'collectionAccDeIquery',
    name: 'collectionAccDeIquery',
    component: collectionAccDeIquery,
    meta: {
      auth: true,
      title: '归集账户明细查询'
    }
  },
  {
    path: 'multiLevelLedgerQuery',
    name: 'multiLevelLedgerQuery',
    component: () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerQuery/index'),
    meta: {
      auth: true,
      title: '多级账簿查询'
    }
  },
  {
    path: 'subledgerDetails',
    name: 'subledgerDetails',
    component: subledgerDetails,
    meta: {
      auth: true,
      title: '子账簿详情'
    }
  },
  {
    path: 'multiLevelLedgerBalanceQuery',
    name: 'multiLevelLedgerBalanceQuery',
    component: () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerBalanceQuery/index'),
    meta: {
      auth: true,
      title: '多级账簿余额查询'
    }
  },
  {
    path: 'authQuery',
    name: 'authQuery',
    component: authQuery,
    meta: {
      auth: true,
      title: '授权关系查询'
    }
  },
  {
    path: 'groupQuery',
    name: 'groupQuery',
    component: groupQuery,
    meta: {
      auth: true,
      title: '集团关系查询'
    }
  },
  {
    path: 'multiLevelLedgerDetailAdjustment',
    name: 'multiLevelLedgerDetailAdjustment',
    component: () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerDetailAdjustment/index'),
    meta: {
      auth: true,
      title: '多级账簿明细调账',
      notCache: true
    }
  },
  {
    path: 'multiLevelLedgerDetailsQuery',
    name: 'multiLevelLedgerDetailsQuery',
    component: () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerDetailsQuery/index'),
    meta: {
      auth: true,
      title: '多级账户明细查询'
    }
  },
  {
    path: 'multiLevelLedgerBalanceSet',
    name: 'multiLevelLedgerBalanceSet',
    component: () => import('@/pages/cashManagement/multiLevelLedger/multiLevelLedgerBalanceSet/multiLevelLedgerBalanceForm'),
    meta: {
      auth: true,
      title: '多级账户余额设置',
      notCache: true
    }
  },
  {
    path: 'multiLevelLedgerBalanceSetConfirm',
    name: 'multiLevelLedgerBalanceSetConfirm',
    component: multiLevelLedgerBalanceSetConfirm,
    meta: {
      auth: true,
      title: '多级账户余额设置确认'
    }
  },
  {
    path: 'multiLevelLedgerBalanceSetRes',
    name: 'multiLevelLedgerBalanceSetRes',
    component: multiLevelLedgerBalanceSetRes,
    meta: {
      auth: true,
      title: '多级账户余额设置结果'
    }
  },
  {
    path: 'adjustmentForm',
    name: 'adjustmentForm',
    component: adjustmentForm,
    meta: {
      auth: true,
      title: '多级账户明细调账',
      notCache: true
    }
  },
  {
    path: 'adjustmentConfirm',
    name: 'adjustmentConfirm',
    component: adjustmentConfirm,
    meta: {
      auth: true,
      title: '多级账户明细调账确认'
    }
  },
  {
    path: 'adjustmentRes',
    name: 'adjustmentRes',
    component: adjustmentRes,
    meta: {
      auth: true,
      title: '多级账户明细调账结果'
    }
  },
  {
    path: 'adjustmentQuery',
    name: 'adjustmentQuery',
    component: adjustmentQuery,
    meta: {
      auth: true,
      title: '多级账户明细调账查询'
    }
  },
  {
    path: 'adjustmentDetail',
    name: 'adjustmentDetail',
    component: adjustmentDetail,
    meta: {
      auth: true,
      title: '多级账户明细调账详情'
    }
  },
  {
    path: 'ledgerDetailsQuery',
    name: 'ledgerDetailsQuery',
    component: ledgerDetailsQuery,
    meta: {
      auth: true,
      title: '多级账户明细查询'
    }
  },
  {
    path: 'ledgerDetailsPage',
    name: 'ledgerDetailsPage',
    component: ledgerDetailsPage,
    meta: {
      auth: true,
      title: '多级账户明细查询详情'
    }
  },
  {
    path: 'transferQuery',
    name: 'transferQuery',
    component: transferQuery,
    meta: {
      auth: true,
      title: '多级账户转账查询',
      notCache: true
    }
  },
  {
    path: 'multiLevelLedgerTransferConfirm',
    name: 'multiLevelLedgerTransferConfirm',
    component: multiLevelLedgerTransferConfirm,
    meta: {
      auth: true,
      title: '多级账户转账确认'
    }
  },
  {
    path: 'multiLevelTransferRes',
    name: 'multiLevelTransferRes',
    component: multiLevelTransferRes,
    meta: {
      auth: true,
      title: '多级账户转账结果'
    }
  },
  {
    path: 'rootsQuery',
    name: 'rootsQuery',
    component: rootsQuery,
    meta: {
      auth: true,
      title: '多级账户权限查询'
    }
  },
  {
    path: 'multiLevelLedgerRootsSetRes',
    name: 'multiLevelLedgerRootsSetRes',
    component: multiLevelLedgerRootsSetRes,
    meta: {
      auth: true,
      title: '多级账户权限设置结果'
    }
  },
  {
    path: 'setMultLeveLedgerRootsConfirm',
    name: 'setMultLeveLedgerRootsConfirm',
    component: setMultLeveLedgerRootsConfirm,
    meta: {
      auth: true,
      title: '多级账户权限设置结果确认'
    }
  },
  {
    path: 'setMultiLevelLedgerRoots',
    name: 'setMultiLevelLedgerRoots',
    component: setMultiLevelLedgerRoots,
    meta: {
      auth: true,
      title: '多级账户权限设置查询',
      notCache: true
    }
  },
  {
    path: 'accountBalanceTrend',
    name: 'accountBalanceTrend',
    component: AccountBalanceTrend,
    meta: {
      auth: true,
      title: '账户余额趋势分析'
    }
  },
  {
    path: 'accountBalanceDistribution',
    name: 'accountBalanceDistribution',
    component: () => import('@/pages/cashManagement/statisticsAnalysis/AccountBalanceDistribution'),
    meta: {
      auth: true,
      title: '账户余额分布统计'
    }
  },
  {
    path: 'accountTransferDetail',
    name: 'accountTransferDetail',
    component: AccountTransferDetail,
    meta: {
      auth: true,
      title: '账户交易明细分析'
    }
  },
  {
    path: 'fundREInSummary',
    name: 'fundREInSummary',
    component: FundREInSummary,
    meta: {
      auth: true,
      title: '资金收支汇总分析'
    }
  },
  {
    path: 'accountGroupDetail',
    name: 'accountGroupDetail',
    component: AccountGroupDetail,
    meta: {
      auth: true,
      title: '账户归集明细分析'
    }
  },
  {
    path: 'accountGroupBalance',
    name: 'accountGroupBalance',
    component: () => import('@/pages/cashManagement/statisticsAnalysis/AccountGroupBalance'),
    meta: {
      auth: true,
      title: '账户归集余额分析'
    }
  },
  {
    path: 'enterpriseAccountInnerInterest',
    name: 'enterpriseAccountInnerInterest',
    component: EnterpriseAccountInnerInterest,
    meta: {
      auth: true,
      title: '企业账户内部利息汇总'
    }
  },
  {
    path: 'multiLedgerBalance',
    name: 'multiLedgerBalance',
    component: () => import('@/pages/cashManagement/statisticsAnalysis/MultiLedgerBalance'),
    meta: {
      auth: true,
      title: '多级账簿成员单位余额分布'
    }
  },
  {
    path: 'multiLedgerTransferDetail',
    name: 'multiLedgerTransferDetail',
    component: MultiLedgerTransferDetail,
    meta: {
      auth: true,
      title: '多级账簿成员单位交易查询'
    }
  },
  {
    path: 'virtualFundPoolBuildPre',
    name: 'virtualFundPoolBuildPre',
    component: virtualFundPoolBuildPre,
    meta: {
      auth: true,
      title: '虚拟资金池-建立-录入'
    }
  },
  {
    path: 'virtualFundPoolBuildConf',
    name: 'virtualFundPoolBuildConf',
    component: virtualFundPoolBuildConf,
    meta: {
      auth: true,
      title: '虚拟资金池-建立-确认'
    }
  },
  {
    path: 'virtualFundPoolBuildRes',
    name: 'virtualFundPoolBuildRes',
    component: virtualFundPoolBuildRes,
    meta: {
      auth: true,
      title: '虚拟资金池-建立-结果'
    }
  },
  {
    path: 'VirtualFundPoolListInquire',
    name: 'VirtualFundPoolListInquire',
    component: VirtualFundPoolListInquire,
    meta: {
      auth: true,
      title: '虚拟资金池-虚拟资金池关系加入/修改/删除-列表查询'
    }
  },
  {
    path: 'AddVirtualFundPoolRelationPre',
    name: 'AddVirtualFundPoolRelationPre',
    component: AddVirtualFundPoolRelationPre,
    meta: {
      auth: true,
      title: '虚拟资金池-虚拟资金池关系加入-录入'
    }
  },
  {
    path: 'AddVirtualFundPoolRelationConf',
    name: 'AddVirtualFundPoolRelationConf',
    component: AddVirtualFundPoolRelationConf,
    meta: {
      auth: true,
      title: '虚拟资金池-虚拟资金池关系加入-确认'
    }
  },
  {
    path: 'AddVirtualFundPoolRelationRes',
    name: 'AddVirtualFundPoolRelationRes',
    component: AddVirtualFundPoolRelationRes,
    meta: {
      auth: true,
      title: '虚拟资金池-虚拟资金池关系加入-结果'
    }
  },
  {
    path: 'ChangeVirtualFundPoolRelationPre',
    name: 'ChangeVirtualFundPoolRelationPre',
    component: ChangeVirtualFundPoolRelationPre,
    meta: {
      auth: true,
      title: '虚拟资金池-虚拟资金池关系修改-录入'
    }
  },
  {
    path: 'ChangeVirtualFundPoolRelationConf',
    name: 'ChangeVirtualFundPoolRelationConf',
    component: ChangeVirtualFundPoolRelationConf,
    meta: {
      auth: true,
      title: '虚拟资金池-虚拟资金池关系修改-确认'
    }
  },
  {
    path: 'ChangeVirtualFundPoolRelationRes',
    name: 'ChangeVirtualFundPoolRelationRes',
    component: ChangeVirtualFundPoolRelationRes,
    meta: {
      auth: true,
      title: '虚拟资金池-虚拟资金池关系修改-结果'
    }
  },
  {
    path: 'DeletionVirtualFundPoolRelationConf',
    name: 'DeletionVirtualFundPoolRelationConf',
    component: DeletionVirtualFundPoolRelationConf,
    meta: {
      auth: true,
      title: '虚拟资金池-虚拟资金池关系删除-确认'
    }
  },
  {
    path: 'VirtualFundPoolRelationshipQuery',
    name: 'VirtualFundPoolRelationshipQuery',
    component: VirtualFundPoolRelationshipQuery,
    meta: {
      auth: true,
      title: '虚拟资金池-虚拟资金池关系查询'
    }
  },
  {
    path: 'VirtualFundPoolRelationshipDetail',
    name: 'VirtualFundPoolRelationshipDetail',
    component: VirtualFundPoolRelationshipDetail,
    meta: {
      auth: true,
      title: '虚拟资金池-虚拟资金池关系详情'
    }
  },
  {
    path: 'virtualFundPoolBalanceInquiry',
    name: 'virtualFundPoolBalanceInquiry',
    component: virtualFundPoolBalanceInquiry,
    meta: {
      auth: true,
      title: '虚拟资金池-虚拟资金池余额查询'
    }
  },
  {
    path: 'virtualRelationQuery',
    name: 'virtualRelationQuery',
    component: virtualRelationQuery,
    meta: {
      auth: true,
      title: '虚拟资金池关系查询'
    }
  },
  {
    path: 'virtualMoneyQuery',
    name: 'virtualMoneyQuery',
    component: virtualMoneyQuery,
    meta: {
      auth: true,
      title: '虚拟资金池余额查询'
    }
  }
]
export default cashManagement
