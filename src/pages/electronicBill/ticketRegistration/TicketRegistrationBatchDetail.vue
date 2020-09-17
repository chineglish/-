<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <el-steps :active="stepsActive" align-center>
        <el-step title="信息录入"></el-step>
        <el-step title="交易确认"></el-step>
        <el-step title="提交结果"></el-step>
        </el-steps>
        <div class="form-box">
            <d-table
                    :table-data="tableData"
                    :tableHeadData="tableHeadData"
                    :tableTitle="tableTitle"
                    :actionData="actionData"
                    :pagesize="pagesize"
                    @add="add"
            >
            </d-table>
        </div>
    </div>
</template>
<script>
/**
     *@name:
     */
import util from '@/libs/util'
import { bill_Type, endorse_Type } from '@/assets/js/entity'
import { httpPost } from '@/api/sys/http'
export default {
  name: 'TicketRegistrationBatchDetail',
  data () {
    return {
      breadData: ['电子商业汇票 ', '出票登记', '出票登记录入'],
      pagesize: 20,
      stepsActive: 0,
      tableTitle: {
        rightInfo: {
          tip: '总金额:' + util.formatCurrency(this.$route.params.formModel.amount) + ',  总笔数:' + this.$route.params.formModel.list.length
        }
      },
      tableHeadData: [
        { label: '票据类型',
          prop: 'stdBillTyp',
          formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, cellValue) },
        { label: '出票日期', prop: 'stdIssDate', width: '120px', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '到期日', prop: 'stdDueDate', width: '120px', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '票面金额', prop: 'stdPmMoney', width: '100px', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '允许背书', prop: 'stdEndOrmk', formatter: (row, column, cellValue, index) => util.handleEnums(endorse_Type, cellValue) },
        { label: '出票人名称', prop: 'stdDrwrNam', width: '150px' },
        { label: '出票人账号', prop: 'stdDrwrAcc', width: '150px' },
        { label: '出票人行号', prop: 'stdDrwrBnm', width: '150px' },
        { label: '出票人行名', prop: 'stdDrwrBnam', width: '150px' },
        { label: '承兑人名称', prop: 'stdAccpNam', width: '150px' },
        { label: '承兑人账号', prop: 'stdAccpAcc', width: '150px' },
        { label: '承兑人行号', prop: 'stdAccpBnm', width: '150px' },
        { label: '承兑人行名', prop: 'stdAccpBnam', width: '150px' },
        { label: '收款人名称', prop: 'stdPyeeNam', width: '150px' },
        { label: '收款人账号', prop: 'stdPyeeAcc', width: '150px' },
        { label: '收款人行号', prop: 'stdPyeeBnm', width: '150px' },
        { label: '收款人行名', prop: 'stdPyeeBnam', width: '150px' }
      ],
      tableData: [
      ],
      actionData: [
        { btnText: '出票', class: 'm-submit-btn', type: 'info', eventName: 'add' }
      ]
    }
  },
  methods: {
    add (data) {
      let params = {
        list: data.data,
        stdDrwrAcc: data.data[0].stdDrwrAcc,
        amount: this.$route.params.formModel.amount.toString(),
        sum: data.data.length
      }
      httpPost('eweb-edraft.IssueRegisterBatchConfirm.do', params).then(res => {
        this.$router.push({
          name: 'TicketRegistrationBatchConf',
          params: {
            formModel: data.data,
            amount: this.$route.params.formModel.amount.toString(),
            _dataMapKey: res._dataMapKey,
            _Data2Sign: res._Data2Sign,
            _authenticateType: res._authenticateType
          }
        })
      })
    }
    // onReturn (data) {
    //   this.$router.push({
    //     name: '',
    //     params: {
    //       formModel: data
    //     }
    //   })
    // }
  },
  created () {
    if (this.$route.params.formModel) {
      this.tableData = this.$route.params.formModel.list
    }
  }
}
</script>
