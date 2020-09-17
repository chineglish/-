<!--
 * @Author: your name
 * @Date: 2020-04-23 21:18:38
 * @LastEditTime: 2020-04-26 14:33:37
 * @LastEditors: Please set LastEditors
 * @Description: 供应链
 * @FilePath: \ebank\src\pages\loanTransaction\supplyChain.vue
 -->
<template>
  <div>
    <form method="post" ref="form" target="_blank">
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
  name: 'supplyChain',
  data () {
    return {
      titleData: ['供应链']
    }
  },
  methods: {
    // 获取供应链链接、请求参数
    getUrlParams () {
      httpPost('/eweb-special.GoGYL.do').then(res => {
        this.$refs.form.action = res.url
        this.$refs.plain.value = res.plain
        this.$refs.sign.value = res.sign
        this.$refs.form.submit()
      })
    }
  },
  created () {
    this.getUrlParams()
  }
}
</script>
