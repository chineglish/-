<template>
  <div>
    <yueyue v-if="formData && formData.prdTemplate === '1102'" :formData="formData"></yueyue>
    <lianlitian v-if="formData.prdTemplate === '1300'"></lianlitian>
    <huixiang v-if="formData && formData.prdTemplate === '1303' && (formData.prdName.indexOf('汇享')) > -1" :formData="formData"></huixiang>
    <zhencui v-if="formData && formData.prdTemplate === '1303' && (formData.prdName.indexOf('臻萃')) > -1" :formData="formData"></zhencui>
  </div>
</template>
<script>
import yueyue from './explanation/yueyue'
import lianlitian from './explanation/lianlitian'
import huixiang from './explanation/huixiang'
import zhencui from './explanation/zhencui'
export default {
  name: 'explanation',
  components: {
    yueyue,
    lianlitian,
    huixiang,
    zhencui
  },
  data () {
    return {
      formData: {}
    }
  },
  methods: {},
  created () {
    this.formData = this.$route.params.data
  }
}
</script>

<style scoped>
</style>
