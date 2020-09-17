<template>
  <div>
    <div class="form-box">
      <yueyue v-if="formData && formData.prdTemplate === '1102'" :formData="formData"></yueyue>
      <lianlitian v-if="formData.prdTemplate === '1300'"></lianlitian>
      <huixiang v-if="formData.prdTemplate === '1303' && (formData.prdName.indexOf('汇享')) > -1"></huixiang>
      <zhencui v-if="formData.prdTemplate === '1303' && (formData.prdName.indexOf('臻萃')) > -1"></zhencui>
    </div>
  </div>
</template>
<script>
import yueyue from './protocol/yueyue'
import lianlitian from './protocol/lianlitian'
import huixiang from './protocol/huixiang'
import zhencui from './protocol/zhencui'
export default {
  name: 'protocol',
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
    console.log(this.$route.params)
    this.formData = this.$route.params.data
    console.log(1111, this.formData)
  }
}
</script>
