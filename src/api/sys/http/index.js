import request from '@/plugin/axios'
import { Loading } from 'element-ui'
import axios from 'axios'
import { _message } from '@/assets/js/isSign'
import util from '@/libs/util'

export function httpGet (url, params = {}) {
  return request({
    url,
    method: 'get',
    params
  })
}

export function httpPost (url, data = {}, config = {}) {
  const defaultConfig = { loading: true, formData: false, headers: {} }
  config = { ...defaultConfig, ...config }

  return new Promise((resolve, reject) => {
    let loadingInstance = null
    if (config.loading) {
      loadingInstance = Loading.service({})
    }

    // FormData
    if (config.formData) {
      const ieVersion = util.getIEVersion()
      if (!ieVersion || ieVersion > 9) {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        const formData = new FormData()
        Object.keys(data).forEach(key => {
          if (data.hasOwnProperty(key)) {
            formData.append(key, data[key])
          }
        })
        data = formData
      } else {
        _message('您当前的ie版本不支持此功能')
      }
      
      // const newForm = document.createElement('form')
      // newForm.id = 'newForm'
      // document.body.appendChild(newForm)
      // Object.keys(data).forEach(key => {
      //   console.log(typeof data[key], data[key])
      //   console.log(Object.prototype.toString.call(data[key]))
      //   const newInput = document.createElement('input')
      //   if (Object.prototype.toString.call(data[key]) === '[object File]') {
      //     newInput.type = 'file'
      //   } else if (typeof data[key] === 'string') {
      //     newInput.type = 'text'
      //   }
      //   newInput.name = key
      //   newInput.value = data[key]
      //   newForm.appendChild(newInput)
      //   console.log(newForm)
      // })
      // newForm.method = 'POST'
      // newForm.action = url
      // newForm.submit()
      // document.body.removeChild(newForm)
    }
    // else {
    request({ url, method: 'post', data: data, headers: config.headers }).then(res => {
      if (config.loading) {
        loadingInstance.close()
      }
      resolve(res)
    }).catch(err => {
      if (config.loading) {
        loadingInstance.close()
      }
      reject(err)
    })
    // }
  })
}

export function fileUpload (url, params) {
  const newForm = document.createElement('form')
  newForm.id = 'newForm'
  newForm.target = 'targetIframe'
  newForm.method = 'POST'
  newForm.action = `${process.env.VUE_APP_API}/${url}`
  document.body.appendChild(newForm)
  const newIfram = document.createElement('iframe')
  newIfram.name = 'targetIframe'
  newIfram.style.display = 'none'
  document.body.appendChild(newIfram)
  Object.keys(data).forEach(key => {
    const newInput = document.createElement('input')
    newInput.name = key
    if (typeof data[key] === 'string') {
      newInput.type = 'text'
      newInput.value = data[key]
      newForm.appendChild(newInput)
    } else if (typeof data[key] === 'object' && data[key].type === 'upload') {
      newForm.enctype = 'multipart/form-data'
      const upload = document.getElementById(data[key].uploadID)
      upload.name = key
      newForm.appendChild(upload)
    }
  })
  newForm.submit(function () {
    debugger
    return false
  }).then(() => {
    debugger
  })
  debugger
  if (config.loading) {
    loadingInstance.close()
  }
  debugger
  let ifWin = newIfram.contentWindow
  console.log(ifWin)
}

/* export function downloadFile (url, params = {}) {
  const form = document.createElement('form')
  form.style.display = 'none'
  form.action = `${process.env.VUE_APP_API}/${url}`
  form.method = 'post'
  form.target = 'blank'

  Object.keys(params).forEach(item => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = item
    input.value = params[item]
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
  form.remove()
} */

export function downloadFile (url, params = {}, then) {
  const ieVersion = util.getIEVersion()
  if (!ieVersion || ieVersion > 9) {
    axios.post(`${process.env.VUE_APP_API}${url}`, params, { responseType: 'blob' }).then(msg => {
      if (typeof then === 'function') {
        then()
      }
      if (msg.headers['content-type'] === 'application/json;charset=UTF-8') {
        const reader = new FileReader()
        reader.readAsText(msg.data)
        reader.onload = function () {
          const { jsonError } = JSON.parse(this.result) // 此处的msg就是后端返回的msg内容
          _message(jsonError[0]._exceptionMessage)
        }
      } else {
        let blob = new Blob([msg.data])
        let fileName = msg.headers['content-disposition'] ? msg.headers['content-disposition'].split('=')[1] : ''

        if ('msSaveOrOpenBlob' in navigator) {
          window.navigator.msSaveOrOpenBlob(blob, fileName)
        } else {
          let url = window.URL.createObjectURL(blob)
          let a = document.createElement('a')
          document.body.appendChild(a)
          a.href = url
          a.download = fileName
          a.click()
          window.URL.revokeObjectURL(url)
        }
      }

      /* let blob = new Blob([msg.data])
      let fileName = msg.headers['content-disposition'] ? msg.headers['content-disposition'].split('=')[1] : ''

      if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(blob, fileName)
      } else {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = fileName
        a.click()
        window.URL.revokeObjectURL(url)
      } */

      /* let blob = new Blob([msg.data])
      let url = window.URL.createObjectURL(blob)
      let a = document.createElement('a')
      document.body.appendChild(a)
      let fileName = msg.headers['content-disposition'] ? msg.headers['content-disposition'].split('=')[1] : ''
      a.href = url
      a.download = fileName
      a.click()
      window.URL.revokeObjectURL(url) */
    })
  } else {
    _message('您当前的ie版本不支持下载功能')
  }
}
