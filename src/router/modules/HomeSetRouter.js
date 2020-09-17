// 账户排序
const accountRank = () => import('@/pages/home/accountRank')
const commonFun = () => import('@/pages/home/commonFun')
const todoBusiness = () => import('@/pages/home/todoBusiness')
const newsList = () => import('@/pages/home/news/newsList')
const newsDetail = () => import('@/pages/home/news/newsDetail')
const receiptPre = () => import('@/pages/home/receipt/receiptPre')
const receiptRes = () => import('@/pages/home/receipt/receiptRes')
const recQryOrCheck = () => import('@/pages/home/receipt/recQryOrCheck')
const receiptPayDetail = () => import('@/pages/home/receipt/receiptPayDetail')
const receiptPlaDetail = () => import('@/pages/home/receipt/receiptPlaDetail')
const lookProblem = () => import('@/pages/home/news/lookProblem')

const HomeSetRouter = [
  {
    path: 'accountRank',
    name: 'accountRank',
    component: accountRank,
    meta: {
      auth: true,
      title: '账户排序'
    }
  },
  {
    path: 'commonFun',
    name: 'commonFun',
    component: commonFun,
    meta: {
      auth: true,
      title: '常用功能'
    }
  },
  {
    path: 'todoBusiness',
    name: 'todoBusiness',
    component: todoBusiness,
    meta: {
      auth: true,
      title: '待办业务'
    }
  },
  {
    path: 'newsList',
    name: 'newsList',
    component: newsList,
    meta: {
      auth: true,
      title: '公告列表'
    }
  },
  {
    path: 'newsDetail',
    name: 'newsDetail',
    component: newsDetail,
    meta: {
      auth: true,
      title: '公告详情'
    }
  },
  {
    path: 'receiptPre',
    name: 'receiptPre',
    component: receiptPre,
    meta: {
      auth: false,
      title: '回单查询',
      noLogin: true
    }
  },
  {
    path: 'receiptRes',
    name: 'receiptRes',
    component: receiptRes,
    meta: {
      auth: false,
      title: '回单打印和验证',
      noLogin: true
    }
  },
  {
    path: 'recQryOrCheck',
    name: 'recQryOrCheck',
    component: recQryOrCheck,
    meta: {
      auth: false,
      title: '回单验证',
      noLogin: true
    }
  },
  {
    path: 'receiptPayDetail',
    name: 'receiptPayDetail',
    component: receiptPayDetail,
    meta: {
      auth: false,
      title: '网银缴费回单详情',
      noLogin: true
    }
  },
  {
    path: 'receiptPlaDetail',
    name: 'receiptPlaDetail',
    component: receiptPlaDetail,
    meta: {
      auth: false,
      title: '网银回单详情',
      noLogin: true
    }
  },
  {
    path: 'lookProblem',
    name: 'lookProblem',
    component: lookProblem,
    meta: {
      auth: false,
      title: '常见问题',
      noLogin: true
    }
  }
]

export default HomeSetRouter
