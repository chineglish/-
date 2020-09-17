import Vue from 'vue'
import VueRouter from 'vue-router'

// import store from '@/store/index'

import util from '@/libs/util.js'

// 路由数据
import routes from './routes'

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  // mode: 'history',
  // base: '/EBankFrontEnd/',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      x: 0,
      y: 0
    }
  }
})

/**
 * 路由拦截
 * 权限验证
 */
// router.beforeEach((to, from, next) => {
//   // 关闭搜索面板
//   store.commit('d2admin/search/set', false)
//   // 验证当前路由所有的匹配中是否需要有登录验证的
//   if (to.matched.some(r => r.meta.requiresAuth)) {
//     // 这里暂时将cookie里是否存有token作为验证是否登录的条件
//     // 请根据自身业务需要修改
//     const token = util.cookies.get('token')
//     if (token && token !== 'undefined') {
//       next()
//     } else {
//       // 将当前预计打开的页面完整地址临时存储 登录后继续跳转
//       // 这个 cookie(redirect) 会在登录后自动删除
//       util.cookies.set('redirect', to.fullPath)
//       // 没有登录的时候跳转到登录界面
//       next({
//         name: 'login'
//       })
//     }
//   } else {
//     // 不需要身份校验 直接通过
//     next()
//   }
// })

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(r => r.meta.auth)) {
//     if (store.state.common.user) {
//       next()
//     } else {
//       next({ name: 'login' })
//     }
//   } else {
//     next()
//   }
// })

router.afterEach(to => {
  // 需要的信息
  const app = router.app
  const { name, params, query } = to
  // 多页控制 打开新的页面
  app.$store.commit('d2admin/page/open', { name, params, query })
  app.$nextTick(() => {
    if (!app.$store.state.d2admin.page.keepAliveList.includes(name) && to.meta.notCache) {
      app.$store.commit('d2admin/page/updateKeepAliveList', name)
    }
    if (to.meta.rmCache) {
      app.$store.commit('d2admin/page/removeKeepAliveList')
    }
    if (to.meta.noLogin || to.name === 'index') {
      app.$store.commit('d2admin/menu/showAsideCollapseSet', false)
      app.$store.commit('d2admin/menu/setShowElectronicBill', false)
    } else if (to.meta.isTicket) {
      app.$store.commit('d2admin/menu/setShowElectronicBill', true)
      app.$store.commit('d2admin/menu/showAsideCollapseSet', false)
    } else {
      app.$store.commit('d2admin/menu/setShowElectronicBill', false)
      app.$store.commit('d2admin/menu/showAsideCollapseSet', true)
    }
  })
  // 更改标题
  util.title(to.meta.title)
})

export default router
