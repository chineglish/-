// 设置文件
import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // 顶栏菜单
    header: [],
    // 侧栏菜单
    aside: [],
    billMenu: [],
    // 侧边栏收缩
    asideCollapse: true, // true:收缩, false: 伸展
    showAsideCollapse: true,
    showElectronicBill: false
  },
  mutations: {
    /**
     * @description 设置顶栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    headerSet (state, menu) {
      // store 赋值
      state.header = menu
    },
    /**
     * @description 是否显示电子票据菜单
     * @param {Object} state vuex state
     * @param {Boolean} bool
     * */
    setShowElectronicBill (state, bool) {
      state.showElectronicBill = bool
    },
    /**
     * @description 是否显示电子票据菜单
     * @param {Object} state vuex state
     * @param {Array} menu
     * */
    setBillMenu (state, menu) {
      state.billMenu = menu
      localStorage.setItem('billMenu', JSON.stringify(menu))
    },
    /**
     * @description 初始化侧边栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    asideInit (state, menu) {
      // store 赋值
      if (localStorage.aside) {
        state.aside = JSON.parse(localStorage.aside)
      } else { state.aside = menu }
    },
    /**
     * @description 初始化电子票据菜单
     * @param {Object} state vuex state
     */
    billMenuInit (state) {
      if (localStorage.billMenu) {
        state.billMenu = JSON.parse(localStorage.billMenu)
      } else {
        state.billMenu = []
      }
    },
    /**
     * @description 设置侧边栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    asideSet (state, menu) {
      // store 赋值
      state.aside = menu
      const asideJson = JSON.stringify(menu)
      localStorage.setItem('aside', asideJson)
    },
    /**
     * 设置侧边栏展开或者收缩
     * @param {Object} state vuex state
     * @param {Boolean} collapse is collapse
     */
    asideCollapseSet (state, collapse) {
      // store 赋值
      state.asideCollapse = collapse
      // 持久化
      this.dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'menu.asideCollapse',
        value: state.asideCollapse,
        user: true
      })
    },
    /**
     * 设置侧边栏显示或者隐藏
     * @param {Object} state vuex state
     * @param {Boolean} show 显影
     */
    showAsideCollapseSet (state, show) {
      // store 赋值
      state.showAsideCollapse = show
    },
    /**
     * 切换侧边栏展开和收缩
     * @param {Object} state vuex state
     */
    asideCollapseToggle (state) {
      // store 赋值
      state.asideCollapse = !state.asideCollapse
      // 持久化
      this.dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'menu.asideCollapse',
        value: state.asideCollapse,
        user: true
      })
    },
    /**
     * 从持久化数据读取侧边栏展开或者收缩
     * @param {Object} state vuex state
     */
    async asideCollapseLoad (state) {
      // store 赋值
      state.asideCollapse = await this.dispatch('d2admin/db/get', {
        dbName: 'sys',
        path: 'menu.asideCollapse',
        defaultValue: setting.menu.asideCollapse,
        user: true
      })
    }
  }
}
