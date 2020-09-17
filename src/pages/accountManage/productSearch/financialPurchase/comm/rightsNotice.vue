<template>
  <div>
    <div class="form-box">
      <yueyue v-if="formData.prdTemplate === '1102'"></yueyue>
      <lianlitian v-if="formData.prdTemplate === '1300'"></lianlitian>
      <huixiang v-if="formData.prdTemplate === '1303' && (formData.prdName.indexOf('汇享')) > -1"></huixiang>
      <zhencui v-if="formData.prdTemplate === '1303' && (formData.prdName.indexOf('臻萃')) > -1"></zhencui>
    </div>
  </div>
</template>
<script>
import yueyue from './rightsNotice/yueyue'
import lianlitian from './rightsNotice/lianlitian'
import huixiang from './rightsNotice/huixiang'
import zhencui from './rightsNotice/zhencui'
export default {
  name: 'rightsNotice',
  components: {
    yueyue,
    lianlitian,
    huixiang,
    zhencui
  },
  data () {
    return {}
  },
  methods: {},
  created () {
    this.formData = this.$route.params.data
  }
}
</script>
