<!--
 * @Author: your name
 * @Date: 2020-04-23 20:36:48
 * @LastEditTime: 2020-04-26 14:35:04
 * @LastEditors: Please set LastEditors
 * @Description: 单证通
 * @FilePath: \ebank\src\pages\loanTransaction\documentTrade.vue
 -->
<template>
  <div>
    <form method="post" ref="form" target="_blank" accept-charset="GBK">
        <input ref="plain" type="hidden" name="Plain" value=""/>
        <input ref="sign" type="hidden" name="Sign" value=""/>
    </form>
    <iframe frameborder="0" width="100%" height="100%" noresize/>
    <iframe src="refresh.do" width="0" height="0"></iframe>
  </div>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
export default {
  name: 'documentTrade',
  data () {
    return {
      titleData: ['单证通'],
      url: ''
    }
  },
  methods: {
    // 获取单证通链接、请求参数
    getUrlParams () {
      httpPost('/eweb-special.GoDZT.do').then(res => {
        this.$refs.form.action = res.url
        this.$refs.plain.value = res.plain
        this.$refs.sign.value = res.sign
        if (window.ActiveXObject || 'ActiveXObject' in window) {
          document.charset = 'GBK'
        }
        this.$refs.form.submit()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getUrlParams()
    })
  }
}
</script>
