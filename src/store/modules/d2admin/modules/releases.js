import { httpGet } from '@/api/sys/http'
import semver from 'semver'
import util from '@/libs/util.js'
import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // D2Admin 版本
    version: setting.releases.version,
    // 最新版本的信息
    latest: {},
    // 有新版本
    update: false
  },
  actions: {
    /**
     * @description 检查版本更新
     * @param {Object} param context
     */
    checkUpdate ({ state, commit }) {
      httpGet(setting.releases.api)
        .then(res => {
          let versionGet = res.tag_name
          const update = semver.lt(state.version, versionGet)
          if (update) {
            util.log.capsule('D2Admin', `New version ${res.name}`)
            commit('updateSet', true)
          }
          commit('latestSet', res)
        })
    }
  },
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state vuex state
     */
    versionShow (state) {
      util.log.capsule('大连银行', `v${state.version}`)
    },
    /**
     * @description 设置是否有新的 D2Admin 版本
     * @param {Object} state vuex state
     * @param {Boolean} update can update
     */
    updateSet (state, update) {
      // store 赋值
      state.update = update
    },
    /**
     * @description 设置最新版本的信息
     * @param {Object} state vuex state
     * @param {Object}} latest releases value
     */
    latestSet (state, latest) {
      // store 赋值
      state.latest = latest
    }
  }
}
