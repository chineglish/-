// 结果页路由
const tradingRes = () => import('@/pages/tradingRes/index')
const tradingResRouter = [
  {
    path: 'tradingRes',
    name: 'tradingRes',
    component: tradingRes,
    meta: {
      auth: true,
      title: '交易结果页'
    }
  }
]

export default tradingResRouter
