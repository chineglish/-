<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <el-tabs>
          <el-tab-pane label="可操作汇总票据统计">
            <com-Bill-Query></com-Bill-Query>
          </el-tab-pane>
          <el-tab-pane label="票据信息查询">
            <com-Bill-Info-Query></com-Bill-Info-Query>
          </el-tab-pane>
        </el-tabs>
        <m-hint-box :msgs="msgs"></m-hint-box>
    </div>
</template>

<script>
import comBillQuery from './components/comBillQuery'
import comBillInfoQuery from './components/comBillInfoQuery'
export default {
  name: 'comprehensiveBillQry',
  components: {
    comBillQuery,
    comBillInfoQuery
  },
  data () {
    return {
      breadData: ['账户管理', '综合票据查询'],
      msgs: [
        '1.用于企业用户查询票据信息。',
        '2.用户点击“账户管理-综合票据查询”功能，显示票据信息查询页，输入查询条件，点击查询按钮，显示票据信息查询结果页。'
      ]
    }
  }
}
</script>
