import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  namespaced: true,

  state: {
    // 用户信息
    user: null,
    // 菜单
    menuList: null,
    // 防重提交码
    pTokenName: '',
    // 显示新手引导
    showGuide: false
  },

  getters: {},

  mutations: {
    /**
     * 更新用户信息
     * @param state
     * @param data
     */
    updateUser (state, data) {
      state.user = data
      const user = JSON.stringify(data)
      localStorage.setItem('user', user)
    },

    setShowGuide (state, bool) {
      state.showGuide = bool
    },

    /**
     * 更新菜单信息
     * @param state
     * @param data
     */
    updateMenuList (state, data) {
      state.menuList = data
      const menuList = JSON.stringify(data)
      localStorage.setItem('menuList', menuList)
    },
    /**
     * 更新防重提交码
     * @param state
     * @param data
     */
    updatePTokenName (state, data) {
      state.pTokenName = data
    }
  },

  actions: {
    /**
     * 登录
     * @param commit
     * @param user 登录用户信息
     * @param successCallback 登录成功后的回调方法
     * @param errCallback 登录失败后的回调方法
     */
    async login ({ commit }, { user, successCallback, errCallback } = {}) {
      try {
        const user_ = await httpPost('eweb-common.Login.do', user)
        commit('updateUser', user_)
        if (typeof successCallback === 'function') {
          successCallback(user_)
        }
      } catch (e) {
        if (typeof errCallback === 'function') {
          errCallback(e)
        }
      }
    },

    /**
     * 登出
     * @param commit
     * @param successCallback 登出成功后的回调方法
     * @param errCallback 登出失败的回调方法
     */
    async logout ({ commit }, { successCallback, errCallback } = {}) {
      try {
        await httpPost('eweb-common.Logout.do')
        commit('updateUser', null)
        localStorage.clear()
        util.ReLogin(() => {
          if (typeof successCallback === 'function') {
            successCallback()
          }
        })
      } catch (e) {
        if (typeof errCallback === 'function') {
          errCallback(e)
        }
      }
    },

    /**
     * 查询菜单
     * @param commit
     * @param successCallback
     * @param errCallback
     * @returns {Promise<void>}
     */
    async findMenuList ({ commit }, { successCallback, errCallback } = {}) {
      try {
        httpPost('eweb-common.GetAuthMenuData.do').then(res => {
          const menuList = res.menus || []
          commit('updateMenuList', menuList)
          if (typeof successCallback === 'function') {
            successCallback()
          }
        })
      } catch (e) {
        if (typeof errCallback === 'function') {
          errCallback(e)
        }
      }
    },
    /**
     * 获取防重提交码
     * @param commit
     * @returns {Promise<void>}
     */
    async findPTokenName ({ commit }) {
      try {
        const res = await httpPost('eweb-common.GenToken.do')
        commit('updatePTokenName', res._tokenName)
      } catch (e) {

      }
    }
  }
}
