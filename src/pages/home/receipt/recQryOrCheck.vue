<template>
  <div class="recQryOrCheck">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <el-tabs v-model="activeName">
      <el-tab-pane label="网银电子回单" name="first">
        <receiptPre></receiptPre>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import receiptPre from './receiptPre' // 网银电子回单
import receiptRes from './receiptRes' // 电子回单
export default {
  name: 'recQryOrCheck',
  components: {
    receiptPre,
    receiptRes
  },
  data () {
    return {
      breadData: ['回单验证', '网银电子回单'],
      activeName: 'first'
    }
  },
  watch: {
    activeName (val) {
      switch (val) {
        case 'first':
          this.breadData = ['回单验证', '网银电子回单']
          break
        // case 'second':
        //   this.breadData = ['回单验证', '电子回单']
        //   break
      }
    }
  },
  created () {
    if (this.$route.params.activeName) {
      this.activeName = this.$route.params.activeName
    }
  }
}
</script>
<style lang="scss" scoped>
  .waitQPage .el-breadcrumb {
    margin-top: 0 !important
  }
</style>
