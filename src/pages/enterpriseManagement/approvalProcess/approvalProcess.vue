<template>
    <div class="approval-process">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <template>
          <m-steps :data="formConfigJson"></m-steps>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="财务相关交易设置" name="first">
              <finance v-if="activeName === 'first'"></finance>
            </el-tab-pane>
            <el-tab-pane label="非财务相关交易设置" name="second">
              <non-financial v-if="activeName === 'second'"></non-financial>
            </el-tab-pane>
          </el-tabs>
        </template>
    </div>
</template>

<script>
import finance from './components/finance'
import nonFinancial from './components/nonFinancial'
export default {
  name: 'approvalProcess',
  components: {
    finance,
    nonFinancial
  },
  data () {
    return {
      activeName: 'first',
      breadData: ['企业管理台', '审批流程设置', '财务相关交易设置'],
      formConfigJson: {
        stepsActive: 0
      }
    }
  },
  watch: {
    activeName (val) {
      this.breadData = val === 'first' ? ['企业管理台', '审批流程设置', '财务相关交易设置'] : ['企业管理台', '审批流程设置', '非财务相关交易设置']
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

<style lang="scss">
.approval-process {
  .el-input {
    width: 100% !important;
    height: 34px !important;
  }

  .el-table {
    th {
      background: rgb(248, 248, 248) !important;
    }
  }
}
</style>
