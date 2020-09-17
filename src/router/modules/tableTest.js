// 账户管理路由
const tableTest = () => import('@/pages/tableTest')
const tableDemo = () => import('@/pages/tableTest/tableDemo')
const resDemo = () => import('../../../src/pages/transfer/testNewForm/res.vue')
const tableTestRouter = [
  {
    path: 'tableTest',
    name: 'tableTest',
    component: tableTest,
    meta: {
      auth: true,
      title: 'table测试'
    }
  },
  {
    path: 'tableDemo',
    name: 'tableDemo',
    component: tableDemo,
    meta: {
      auth: true,
      title: 'table测试'
    }
  },
  {
    path: 'resDemo',
    name: 'resDemo',
    component: resDemo,
    meta: {
      auth: true,
      title: 'res测试'
    }
  }
]

export default tableTestRouter
