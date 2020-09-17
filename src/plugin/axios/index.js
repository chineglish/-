import store from '@/store'
import axios from 'axios'
import { MessageBox } from 'element-ui'
import util from '@/libs/util'
import router from '@/router'

// 创建一个错误
function errorCreat (msg) {
  const err = new Error(msg)
  store.commit('d2admin/page/errorMessage', err.message)
  // console.log(document.getElementById('error-box'))
  // const errMsgDom = document.createTextNode
  // let errorBox = document.getElementById('error-box')
  // 显示提示
  // if (errorBox) {
  //   // 在error-box里面显示错误信息
  //   errorBox.innerHTML = `<li class="error-title fs16 el-icon-warning-outline">错误信息：</li><li class="warn-message fs16">${err.message}</li>`
  // } else {
  //   MessageBox(err.message, '错误信息', {
  //     confirmButtonText: '确定',
  //     center: true
  //   })
  // }

  // Message({
  //   showClose: true,
  //   message: err.message,
  //   type: 'error',
  //   duration: 3 * 1000
  // })
  errorLog(err)
  // throw err
}

// 记录和显示错误
function errorLog (err) {
  // 添加到日志
  store.dispatch('d2admin/log/add', {
    type: 'error',
    err,
    info: '数据请求异常'
  })
  // 打印到控制台````
  // if (process.env.NODE_ENV === 'development') {
  //   util.log.danger('>>>>>> Error >>>>>>')
  // }
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 60000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 清空错误信息
    if (document.getElementById('error-box')) {
      document.getElementById('error-box').innerHTML = ''
    }

    // 在请求发送之前做一些处理
    if (!(/^https:\/\/|http:\/\//.test(config.url))) {
      const token = util.cookies.get('token')
      if (token && token !== 'undefined') {
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        config.headers['X-Token'] = token
      }
    }
    return config
  },
  error => {
    // 发送失败
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const jsonError = dataAxios.jsonError
    // 根据 响应数据是否有 jsonError 这个错误标志 判断请求是否抛错
    if (!jsonError || (Array.isArray(jsonError) && jsonError.length === 0)) {
      // 如果没有 jsonError 或者 jsonError是个空数组
      return dataAxios
    } else {
      const { _exceptionMessageCode: code, _exceptionMessage: errMsg } = jsonError[0]
      if (code) {
        switch (code) {
          case 'role.invalid_user': // 会话超时
            const path = util.getLoginRouter()
            if (!localStorage.getItem('logout')) {
              MessageBox.alert('您的登录状态已更改,请重新登录', '提示:', {
                type: 'warning',
                confirmButtonText: '确定',
                showClose: false,
                showCancelButton: false,
                closeOnPressEscape: false,
                closeOnClickModal: false,
                center: true
              }).then(() => {
                store.commit('common/user', null)
                localStorage.setItem('logout', '1')
                util.ReLogin(() => {
                  router.push(path)
                })
              })
            }
            break
          default:
            // [ 示例 ] 其它和后台约定的 code
            setTimeout(errorCreat(`${errMsg}`), 1000)
            break
        }
        // errorCreat(`${errMsg}`)
        return Promise.reject(jsonError[0])
      } else {
        // 不是正确的 code
        setTimeout(errorCreat(`${errMsg}`), 1000)
        return Promise.reject(jsonError[0])
      }
    }
  },
  error => {
    // 超时处理
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      error.message = '请求超时'
      errorCreat(error.message)
    }
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: 资源找不到了`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
      errorCreat(error.message)
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
