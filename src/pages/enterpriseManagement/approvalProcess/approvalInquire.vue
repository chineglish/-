<template>
    <div class="approval-process">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="财务相关交易查询" name="first">
              <finance-inquire v-if="activeName === 'first'"></finance-inquire>
            </el-tab-pane>
            <el-tab-pane label="非财务相关交易查询" name="second">
              <non-financial-inquire v-if="activeName === 'second'"></non-financial-inquire>
            </el-tab-pane>
          </el-tabs>
        </template>
        <m-hint-box :msgs="msgs"></m-hint-box>
    </div>
</template>

<script>
import financeInquire from './component/financeInquire'
import nonFinancialInquire from './component/nonFinancialInquire'
export default {
  name: 'approvalInquire',
  components: {
    financeInquire,
    nonFinancialInquire
  },
  data () {
    return {
      activeName: 'first',
      breadData: ['企业管理台', '审批流程设置', '财务相关交易设置'],
      msgs: [
        '1.具有管理类交易审核权限的企业用户使用该功能进行查询需要审核的记录，并进入审核流程。'
      ]
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
