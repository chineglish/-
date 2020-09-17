// layout
import transfer from './modules/transfer'
import accountManage from './modules/accountManage'
import HomeSetRouter from './modules/HomeSetRouter'
import rateSearchRouter from './modules/rateSearch'
import calculatorRouter from './modules/calculator'
import tableTestRouter from './modules/tableTest'
import tradResRouter from './modules/tradingRes'
import cashManagement from './modules/cashManagement'
// import financialServices from './modules/financialServices'
import financialManagementRouter from './modules/financialManagement'
import layoutHeaderAside from '@/layout/header-aside'
import financialServiceRouter from './modules/financialService'
import transactionManagementRouter from './modules/transactionManagement'
// import cashManagementRouter from './modules/cashManagement'
import accountManagmentRouter from './modules/accountManagement'
import enterpriseManage from './modules/enterpriseManage'
import loanManageRouter from './modules/loanManage'
import enterpriseManagementRouter from './modules/enterpriseManagement'
import electronicBillRouter from './modules/electronicBill'
import financialServicesRouter from './modules/financialServices'
import encryptionRouter from './modules/encryption'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
// const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: false }

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'login' },
    component: layoutHeaderAside,
    children: [
      {
        path: 'index',
        name: 'index',
        meta,
        component: () => import('@/pages/home')
      },
      /*
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      },
      */
      ...accountManage,
      ...transfer,
      ...financialManagementRouter,
      ...enterpriseManagementRouter,
      ...electronicBillRouter,
      ...financialServicesRouter,
      ...tableTestRouter,
      ...tradResRouter,
      ...rateSearchRouter,
      ...calculatorRouter,
      ...loanManageRouter,
      // ...accountRankRouter,
      ...financialServiceRouter,
      ...transactionManagementRouter,
      // ...cashManagementRouter,
      ...accountManagmentRouter,
      ...HomeSetRouter,
      ...cashManagement,
      ...enterpriseManage,
      ...encryptionRouter
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login'),
    meta: {
      noLogin: true
    }
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/error-page-404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
