<template>
  <div class="page">
    <p class="page_title fs20">page not found</p>
    <el-button class="d2-mt" @click="gotoLogin">
      返回登录页面
    </el-button>
  </div>
</template>
<script>
import util from '@/libs/util'
export default {
  name: '路由错误页面',
  methods: {
    gotoLogin () {
      this.$router.replace(util.getLoginRouter())
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.page {
  background-color: #989898;
  background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
  background-blend-mode: multiply,multiply;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  .page_title {
    margin: 0;
    padding-top: 214px;
    color: #FFF;
  }
}
</style>
