// 理财计算器路由
const calculator = () => import('@/pages/home/Finance/calculator')
const calculatorRouter = [
  {
    path: 'calculator',
    name: 'calculator',
    component: calculator,
    meta: {
      auth: true,
      title: '理财计算器'
    }
  }
]

export default calculatorRouter
