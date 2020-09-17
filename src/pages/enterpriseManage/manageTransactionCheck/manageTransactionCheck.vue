<template>
  <div class="manageTransactionCheck">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待审核记录查询" name="first">
        <wait-CheckQuery v-if="activeName === 'first'"></wait-CheckQuery>
      </el-tab-pane>
      <el-tab-pane label="审核记录查询" name="second">
        <check-Query v-if="activeName === 'second'"></check-Query>
      </el-tab-pane>
      <!-- <el-tab-pane label="我的制单" name="third">
        <my-ticket v-if="activeName === 'third'"></my-ticket>
      </el-tab-pane> -->
    </el-tabs>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>
<script>
import checkQuery from './components/checkQuery'
import waitCheckQuery from './components/waitCheckQuery'
import myTicket from './components/myTicket'
export default {
  name: 'manageTransactionCheck',
  components: {
    checkQuery,
    waitCheckQuery,
    myTicket
  },
  data () {
    return {
      breadData: ['交易管理', '管理类交易审核', '待审核记录查询'],
      activeName: 'first',
      msgs: [
        '1.具有管理类交易权限的企业管理用户使用该功能进行交易审批流程的设置和修改，设置完成后，录入员提交的待审核的交易将按照该功能配置的内容进入审核流程队列。'
      ]
    }
  },
  watch: {
    activeName (val) {
      switch (val) {
        case 'first':
          this.breadData = ['交易管理', '管理类交易审核', '待审核记录查询']
          break
        case 'second':
          this.breadData = ['交易管理', '管理类交易审核', '审核记录查询']
          break
        case 'third':
          this.breadData = ['交易管理', '管理类交易审核', '我的制单']
          break
      }
    }
  },
  methods: {
    handleClick (tab, event) {}
  },
  created () {
    if (this.$route.params.activeName) {
      this.activeName = this.$route.params.activeName
    }
  }
}
</script>
<style lang="scss" scoped>
  .manageTransactionCheck .el-breadcrumb {
    margin-top: 0 !important
  }
</style>
