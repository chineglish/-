<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel">
      </m-new-form>
    </div>
    <div class="form-box">
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
import { authType, currency_type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'authQuery',
  data () {
    return {
      breadData: ['现金管理', '集团服务', '授权关系查询'],
      formModel: {
        cifName: '',
        userId: ''
      },
      formConfigJson: {
        formWidth: '50%',
        formItems: [
          {
            showSeparate: true,
            group: [
              {
                'disabled': true,
                'label': '企业',
                'type': 'text',
                'key': 'cifName'
              },
              {
                'disabled': true,
                'label': '操作员号',
                'type': 'text',
                'key': 'userId'
              }
            ]
          }
        ]
      },
      pagesize: 20,
      tableHeadData: [
        { label: '账户', prop: 'acNo' },
        { label: '账户名称', prop: 'acName' },
        { label: '币种', prop: 'currency', formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue) },
        { label: '机构号', prop: 'deptSeq' },
        { label: '开户行名', prop: 'openBank' },
        {
          label: '操作权限',
          prop: 'rightFlag',
          formatter: (row, column, cellValue, index) => util.handleEnums(authType, cellValue)
        }
      ],
      tableData: [],
      tableDataOne: []
    }
  },
  methods: {
    getAccountList () {
      httpPost('/eweb-cash.AccAuthRelationQry.do').then(res => {
        this.tableData = res.authAccountList
        this.tableDataOne = res.authOutAccountList
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.getAccountList()
    this.formModel.cifName = this.getUser().cif.cifName
    this.formModel.userId = this.getUser().userId
  }
}
</script>
