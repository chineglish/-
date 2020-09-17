const path = require('path')

// 拼接路径
function resolve (dir) {
  return path.join(__dirname, dir)
}

// 基础路径 注意发布之前要先修改这里
const baseUrl = '/EBankFrontEnd/'

module.exports = {
  publicPath: baseUrl, // 根据你的实际情况更改这里
  lintOnSave: true,
  devServer: {
    publicPath: baseUrl, // 和 baseUrl 保持一致,
    proxy: {
      '/eecseweb': {
        target: 'http://218.25.172.248:8088/', // 外网后台服务ip
        // target: 'http://10.155.21.243:8081/', // 外网后台服务ip
        changeOrigin: true,
        pathRewrite: {
          '^/eecseweb': '/eecseweb'
        }
      }
      // '/eweb': {
      //   target: 'http://218.25.172.248:8088/', // 外网后台服务ip
      //   changeOrigin: true,
      //   pathRewrite: {
      //     // '^/eweb': '/eweb' // sit
      //     '^/eweb': '/eweb'
      //     // '^/eweb': '/uat_eweb/eweb' // uat
      //   }
      // }
    }
  },
  // webpack 设置
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    // markdown
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end()
    // i18n
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
    // 重新设置 alias
    config.resolve.alias
      .set('@', resolve('src'))
    // babel-polyfill 加入 entry
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
  }
}
