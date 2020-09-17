// polyfill
import 'babel-polyfill'
// Vue
import Vue from 'vue'
import App from './App'
// store
import store from '@/store/index'
// 模拟数据
// import '@/mock'
// 多国语
import i18n from './i18n'
// 核心插件
import d2Admin from '@/plugin/d2admin'

// echarts
import echart from 'echarts'

// v-charts
// import VCharts from 'v-charts'

// 过滤器
import * as filter from '@/api/filter'

// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
// import VueFileUpload from 'vue-file-upload'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'

import '@/assets/style/custom.scss'
import Print from './components/print-js/index'

// 引入高德地图
import VueAMap from 'vue-amap'

import { isSign, _message } from './assets/js/isSign'
import getMenuList from '@/libs/getMenuList.js'
import { getUser, getSignInfo } from '@/libs/getUser.js'

import 'ie-placeholder'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
// Vue.use(VueAwesomeSwiper)
Vue.use(VueAMap)
// Vue.use(VueFileUpload)
Vue.use(Print)

// 初始化地图
VueAMap.initAMapApiLoader({
  key: 'be42c2b0b5115db811ae2fb4568e8f97',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})

Vue.config.productionTip = false

// 全局注册过滤器
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

Vue.prototype.$echarts = echart
Vue.prototype.isSign = isSign
Vue.prototype.$msg = _message
Vue.prototype.getMenuList = getMenuList
Vue.prototype.getUser = getUser
Vue.prototype.getSignInfo = getSignInfo
// 核心插件
Vue.use(d2Admin)
// Vue.use(VCharts)

new Vue({
  router,
  store,
  i18n,
  template: '<App/>',
  components: {
    App
  },
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 初始化侧边栏菜单
    this.$store.commit('d2admin/menu/asideInit', menuAside)
    // 初始化电子票据菜单
    this.$store.commit('d2admin/menu/billMenuInit')
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    // this.$store.commit('d2admin/releases/versionShow')
    // // 检查最新版本
    // this.$store.dispatch('d2admin/releases/checkUpdate')
    // 用户登录后从数据库加载一系列的设置
    this.$store.commit('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.commit('d2admin/fullscreen/listen')
  }
}).$mount('#app')
