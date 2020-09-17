<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-steps :data="stepsData"></m-steps>
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="文件导入" name="first" >
          <file-import v-if="activeName === 'first'"></file-import>
        </el-tab-pane>
        <el-tab-pane label="手工导入" name="second">
          <manual-import v-if="activeName === 'second'"></manual-import>
        </el-tab-pane>
      </el-tabs>
    </template>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>

<script>
import fileImport from './components/fileImport'
import manualImport from './components/manualImport'
export default {
  name: 'batchTransfer',
  components: {
    fileImport,
    manualImport
  },
  data () {
    return {
      activeName: 'first',
      breadData: ['转账汇款', '批量转账提交'],
      msgs: [
        '1.为了保护企业账户和资金安全，请勿向陌生人汇款，谨防电信网络新型违法犯罪。',
        '2.客户通过该功能可同时向多个大连银行账号转账，收款账户可以是本行账户，也可以是他行账户。',
        '3.以规定的文件格式，批量上传转账数据，完成批量录入，批量文件最多支持500条数据。上传的批量文件，我们为您提供模板下载，点击模板下载请按照模板样式编辑。',
        '4.建议文件上传时间选在8:30至16:00之间。'
      ],
      stepsData: {
        stepsActive: 0,
        stepsData: [
          '信息录入',
          '交易确认',
          '提交结果'
        ]
      },
      promptList: [
        '1.为了保护企业账户和资金安全，请勿想陌生人汇款，谨防电信网络新型违法犯罪。',
        '2.上传的批量文件，我们将为您提供模板下载，点击模板下载请按照模板样式编辑，一个批量文件可录入2000笔收费指令',
        '3.建议文件上传时间选在8:30至16:00之间。'
      ]
    }
  },
  methods: {
    handleClick (tab, event) {
    }
  },
  created () {
    if (this.$route.params.activeName) {
      this.activeName = this.$route.params.activeName
    }
  }
}
</script>
