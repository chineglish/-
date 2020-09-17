<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
@import '~@/assets/style/usualStyle.scss';
// 解决elment-ui table表头错位
body .el-table th.gutter{
  display: table-cell!important;
}
</style>
