<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <!-- <div class="form-box"> -->
      <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @submit="submit">
      </m-new-form>
    <!-- </div>
    <div class="form-box" > -->
      <d-table
      v-if="showTable"
              :table-data="tableData"
              :firstColIndex = "firstColIndex"
              :isPagination="true"
              :tableHeadData="tableHeadData"
              :pagesize="20"
              @batChildNum="batChildNum">
      </d-table>
    <!-- </div> -->
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, acc_status, saveDate, chaohui_flag, acc_type } from '@/assets/js/entity'
export default {
  name: 'regularAccountQuery',
  data () {
    return {
      showTable: false,
      formModel: {
        acState: 'ALL'
      },
      breadData: ['账户管理', '定期存款查询'],
      msgs: ['1.用于企业用户查询定期账户明细。', '2.凡是已经显示证实书（存单）编号的定期账户，只能在柜面做定期转活期交易，不能在网银上做此项交易。'],
      formConfigJson: {
        rules: {
          acState: [{ required: true, message: '账户状态', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '40%',
            group: [
              {
                'disabled': false,
                'label': '账户状态',
                'type': 'select',
                'options': [{ 'value': '全部', 'key': 'ALL' }, { 'value': '正常', 'key': 'A' }, { 'value': '销户', 'key': 'C' }],
                'key': 'acState'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      tableHeadData: [
        { label: '账户名称', prop: 'zhhuzwmc' },
        {
          label: '账户类型',
          prop: 'kehuzhlx',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_type, cellValue)
        },
        { label: '账户', prop: 'kehuzhao', clickEventName: 'batChildNum' },
        { label: '子账户序号', prop: 'zhhaoxuh' },
        {
          label: '币种',
          prop: 'currencyCode',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '开户金额',
          prop: 'kaihjine',
          width: '150px',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '可用余额',
          prop: 'keyongye',
          width: '150px',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '钞汇标志',
          prop: 'chaohubz',
          formatter: (row, column, cellValue, index) => util.handleEnums(chaohui_flag, cellValue)
        },
        {
          label: '存期',
          prop: 'cunqiiii',
          formatter: (row, column, cellValue, index) => util.handleEnums(saveDate, cellValue)
        },
        {
          label: '账户状态',
          prop: 'zhhuztai',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_status, cellValue)
        }
      ],
      tableData: []
    }
  },
  methods: {
    submit (res) {
      this.formModel = res
      const params = {
        acState: res.acState
      }
      // 定期账户查询
      httpPost('/eweb-acmgmt.SavAccountQry.do', params).then(res => {
        this.tableData = res.acctInfoList
        this.showTable = true
      }).catch(err => {
        console.error(err)
      })
    },
    batChildNum (res) {
      const params = {
        acNo: res.kehuzhao
      }
      // 定期账户详情查询
      httpPost('/eweb-acmgmt.SavAccountDeatilQry.do', params).then(res => {
        this.reAccQuery = res.map
        this.$router.push({
          name: 'resultAccountQuery',
          params: { ...this.reAccQuery, formModel: this.formModel }
        })
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      this.submit(this.formModel)
    } else {
      this.formModel.acState = 'ALL'
    }
  }
}
</script>
