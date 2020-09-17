<template>
  <div class="waitQPage">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <el-tabs v-model="activeName">
      <el-tab-pane label="待审核记录查询" name="first">
        <waitQueryPage v-if="activeName === 'first'"></waitQueryPage>
      </el-tab-pane>
      <el-tab-pane label="审核记录查询" name="second">
        <queryPage v-if="activeName === 'second'"></queryPage>
      </el-tab-pane>
      <!-- <el-tab-pane label="我的制单" name="third">
        <myForm v-if="activeName === 'third'"></myForm>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import waitQueryPage from './waitQueryPage'
import queryPage from './queryPage'
import myForm from './myForm'
export default {
  name: 'waitQPage',
  components: {
    waitQueryPage,
    queryPage,
    myForm
  },
  data () {
    return {
      breadData: ['交易管理', '业务类交易审核', '待审核记录查询'],
      activeName: 'first'
    }
  },
  watch: {
    activeName (val) {
      switch (val) {
        case 'first':
          this.breadData = ['交易管理', '业务类交易审核', '待审核记录查询']
          break
        case 'second':
          this.breadData = ['交易管理', '业务类交易审核', '审核记录查询']
          break
        case 'third':
          this.breadData = ['交易管理', '业务类交易审核', '我的制单']
          break
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
