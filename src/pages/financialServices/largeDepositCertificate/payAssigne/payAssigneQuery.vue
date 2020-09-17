<template>
  <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <div class="form-box">
        <m-new-form
            :componentJson="formConfigJson"
            :btnData="btnData"
            :formModel="formModel"
            @submit="submit">
        </m-new-form>
        <d-table
            v-if="showTable"
            :table-data="tableData"
            :firstColIndex="firstColIndex"
            :tableHeadData="tableHeadData"
            @handleCurrentChange="tableSelectChange"
            :actionData="actionData"
            :pagesize="20"
            @payFor="payFor"
            @refuse="refuse"
            >
        </d-table>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, chaohui_flag, acc_type, acc_status } from '@/assets/js/entity'
export default {
  name: 'payAssigneQuery',
  data () {
    return {
      showTable: false,
      breadData: ['理财服务', '大额存单', '单位大额存单受让查询'],
      formModel: {
        account: 0
      },
      formConfigJson: {
        rules: {
          account: [{ required: true, message: '请选择账户', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                label: '账户',
                key: 'account',
                type: 'select',
                formWidth: '100%',
                options: [],
                trans: { value: 'payerAcNoShow' },
                changeEventName: 'optionChange'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      firstColIndex: {
        type: 'radio',
        label: '操作'
      },
      tableHeadData: [
        { label: '账户名称', prop: 'acName', width: '250' },
        {
          label: '账户类型',
          prop: 'acType',
          width: '120',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_type, cellValue)
        },
        // { label: '账号', prop: 'kehuzhao', width: '160', clickEventName: 'clickAccount' },
        { label: '账号', prop: 'kehuzhao', width: '160' },
        { label: '子账户序号', prop: 'zhhaoxuh', width: '100' },
        {
          label: '币种',
          prop: 'currencyCode',
          width: '80',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '转让份额',
          prop: 'shareAmount',
          width: '140',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '转让价格',
          prop: 'zhuanrje',
          width: '140',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '年利率(%)',
          prop: 'zhxililv',
          width: '100' },
        {
          label: '钞汇标志',
          prop: 'cashFlag',
          formatter: (row, column, cellValue, index) => util.handleEnums(chaohui_flag, cellValue)
        },
        {
          label: '账户状态',
          prop: 'actStatus',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_status, cellValue)
        }
      ],
      tableData: [],
      actionData: [
        { btnText: '受让', class: 'm-submit-btn', eventName: 'payFor' },
        { btnText: '拒绝', class: 'm-cancel-btn', eventName: 'refuse' }
      ]
    }
  },
  methods: {
    tableSelectChange (selection) {
      // 监听表格选择事件触发
      this.selected = selection
    },
    // 查询按钮
    submit (data) {
      this.showTable = true
      const params = {
        acNo: this.payerAccNoList[data.account].acNo,
        subAcNo: this.payerAccNoList[data.account].subAcNo
      }
      httpPost('/eweb-largeDeposit.EntLargeDepositAssignQry.do', params).then(res => {
        this.tableData = res.acList
      })
    },
    // 受让
    payFor () {
      const params = {
        prdBatchCode: this.selected.chpnqcbh
      }
      httpPost('/eweb-largeDeposit.LargeProductBatchQry.do', params).then(res => {
        Object.assign(res, this.selected)
        this.$router.push({
          name: 'payDealBook',
          params: res
        })
      })
    },
    // 拒绝
    refuse () {
      const params = {
        prdBatchCode: this.selected.chpnqcbh
      }
      httpPost('/eweb-largeDeposit.LargeProductBatchQry.do', params).then(res => {
        Object.assign(res, this.selected)
        this.$router.push({
          name: 'payRefuseDealBook',
          params: res
        })
      })
    },
    // 获取账号列表
    getAccountList () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
      })
    }
  },
  created () {
    this.getAccountList()
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
</style>
