// 利率查询路由
import netQuery from '@/pages/home/Finance/netQuery'
const rateSearch = () => import('@/pages/home/Finance/rateSearch')
const foreignEx = () => import('@/pages/home/Finance/foreignEx')
// const netQuery = () => import('@/pages/home/Finance/netQuery')

const rateSearchRouter = [
  {
    path: 'rateSearch',
    name: 'rateSearch',
    component: rateSearch,
    meta: {
      auth: true,
      title: '利率查询'
    }
  },
  {
    path: 'foreignEx',
    name: 'foreignEx',
    component: foreignEx,
    meta: {
      auth: true,
      title: '外汇牌价'
    }
  },
  {
    path: 'netQuery',
    name: 'netQuery',
    component: netQuery,
    meta: {
      auth: true,
      title: '网点查询'
    }
  }
]

export default rateSearchRouter
