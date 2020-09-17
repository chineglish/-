/*
 * @Author: your name
 * @Date: 2020-04-12 15:30:11
 * @LastEditTime: 2020-04-23 21:37:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ebank\src\router\modules\loanManage.js
 */
const loanManage = () => import('@/pages/loanTransaction/loanInfoSearch')
const bankInfoQuery = () => import('@/pages/more/bankInfoQuery')
const foreignCurrencyDeposit = () => import('@/pages/more/foreignCurrencyDeposit')
const loanDetail = () => import('@/pages/loanTransaction/loanDetail')
const enterpriseFinancingApplication = () => import('@/pages/loanTransaction/enterpriseFinancingApplication')
const enterpriseFinancingConfirm = () => import('@/pages/loanTransaction/enterpriseFinancingConfirm')
const enterpriseFinancingRes = () => import('@/pages/loanTransaction/enterpriseFinancingRes')
const documentTrade = () => import('@/pages/loanTransaction/documentTrade')
const supplyChain = () => import('@/pages/loanTransaction/supplyChain')

const loanManageRouter = [
  {
    path: 'loanManage',
    name: 'loanManage',
    component: loanManage,
    meta: {
      auth: true,
      title: '贷款信息查询'
    }
  },
  {
    path: 'loanDetail',
    name: 'loanDetail',
    component: loanDetail,
    meta: {
      auth: true,
      title: '贷款详情'
    }
  },
  {
    path: 'enterpriseFinancingApplication',
    name: 'enterpriseFinancingApplication',
    component: enterpriseFinancingApplication,
    meta: {
      auth: true,
      title: '企业融资申请',
      notCache: true
    }
  },
  {
    path: 'enterpriseFinancingConfirm',
    name: 'enterpriseFinancingConfirm',
    component: enterpriseFinancingConfirm,
    meta: {
      auth: true,
      title: '企业融资申请确认'
    }
  },
  {
    path: 'enterpriseFinancingRes',
    name: 'enterpriseFinancingRes',
    component: enterpriseFinancingRes,
    meta: {
      auth: true,
      title: '企业融资申请结果'
    }
  },
  {
    path: 'documentTrade',
    name: 'documentTrade',
    component: documentTrade,
    meta: {
      auth: true,
      title: '单证通'
    }
  },
  {
    path: 'supplyChain',
    name: 'supplyChain',
    component: supplyChain,
    meta: {
      auth: true,
      title: '供应链'
    }
  },
  {
    path: 'bankInfoQuery',
    name: 'bankInfoQuery',
    component: bankInfoQuery,
    meta: {
      auth: true,
      title: '银行网点信息查询'
    }
  },
  {
    path: 'foreignCurrencyDeposit',
    name: 'foreignCurrencyDeposit',
    component: foreignCurrencyDeposit,
    meta: {
      auth: true,
      title: '外币保证金存入'
    }
  }
]

export default loanManageRouter
