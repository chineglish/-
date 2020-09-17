<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box" style="min-height: 200px;max-height: 400px; padding 20px 50px">
      <el-tree :data="data" :props="defaultProps" default-expand-all :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="form-box" v-if="showTable">
      <d-table
        :table-data="tableData"
        :tableHeadData="tableHeadData"
        :pagesize="pagesize">
      </d-table>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
export default {
  name: 'groupQuery',
  data () {
    return {
      breadData: ['现金管理', '集团服务', '集团关系查询'],
      pagesize: 20,
      showTable: false,
      data: [],
      defaultProps: {
        children: 'subLevel',
        label: 'relCorpCnName'
      },
      tableHeadData: [
        { label: '关系类型',
          prop: 'relFlag',
          width: '150',
          formatter: (row, column, cellValue, index) => {
            if (cellValue === '0') {
              return '上下级关系'
            } else if (cellValue === '1') {
              return '关联关系'
            }
          } },
        { label: '企业代码', width: '150', prop: 'cmsCorpNo' },
        { label: '企业名称', prop: 'corpCnName' },
        { label: '关系企业代码', width: '150', prop: 'relCmsCorpNo' },
        { label: '关系企业名称', prop: 'relCorpCnName' }
      ],
      tableData: []
    }
  },
  methods: {
    handleNodeClick (data) {
      if (data.relationList.length > 0) {
        this.showTable = true
        this.tableData = data.relationList
      } else {
        this.showTable = false
      }
    },
    getGroupQueryList (res) {
      httpPost('/eweb-cash.GroupRelationQry.do', { cmsCorpNo: this.getUser().cif.cmsCorpNo }).then(res => {
        this.data = [res.levelTree]
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.getGroupQueryList()
  }
}
</script>
