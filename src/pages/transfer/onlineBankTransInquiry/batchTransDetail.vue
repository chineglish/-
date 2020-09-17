<template>
  <div>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel">
      </m-new-form>
      <div class="form-box">
        <d-table
          :table-data="tableData"
          :tableHeadData="tableHeadData"
          :actionData="actionData"
          :firstColIndex="firstColIndex"
          :pagesize="20"
          @handleBack="handleBack">
        </d-table>
      </div>
    </div>
  </div>
</template>
<script>
/**
 *@name: 批量转账详情
 * @author: 梁文彬
 * @date: 2019-12-16
 */
import util from '@/libs/util'
import { currency_type } from '@/assets/js/entity'
export default {
  name: 'batchTransDetail',
  data () {
    return {
      formModel: {
        payerAcNo: '',
        totalFee: '',
        totalCount: '',
        amount: '',
        transDate: '',
        batchTableData: []
      },
      formConfigJson: {
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '35%',
            group: [
              {
                'disabled': false,
                'label': '付款账号',
                'type': 'text',
                'key': 'payerAcNo'
              },
              {
                'disabled': false,
                'label': '手续费总额',
                'type': 'text',
                'key': 'feeAmount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '总条数',
                'type': 'text',
                'key': 'totalCount'
              },
              {
                'disabled': false,
                'label': '总金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '交易时间',
                'type': 'text',
                'key': 'transDate'
              }
            ]
          }
        ]
      },
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      tableHeadData: [
        { label: '收款账号', prop: 'payeeacc' },
        { label: '收款账户名称', prop: 'payeeaccbankname' },
        { label: '币种', prop: 'currency', formatter: (row, column, value, index) => util.handleEnums(currency_type, value) },
        { label: '付款金额', prop: 'amount', formatter: (row, column, value, index) => util.formatCurrency(value) },
        { label: '单笔手续费', prop: 'feeamount', formatter: (row, column, value, index) => util.formatCurrency(value) },
        { label: '交易状态',
          prop: 'chstatus',
          formatter: (row, column, value, index) => {
            return value === '0' ? '失败' : value === '1' ? '成功' : value === '2' ? '已处理' : '未知'
          }
        },
        { label: '失败原因', prop: 'centerdealmsg' },
        { label: '附言', prop: 'postscript' }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'handleBack'
        }
      ]
    }
  },
  methods: {
    handleBack () {
      this.$router.push(
        {
          name: 'onlineBankTransInquiry'
          // params: this.formModel
        })
    }
  },
  created () {
    Object.assign(this.formModel, this.$route.params)
    this.tableData = this.formModel.result
    this.formModel.batchTableData = this.formModel.batchTableData
    this.formModel.payerAcNo = this.formModel.objData.payerAcNo
    this.formModel.totalCount = this.formModel.objData.totalCount
    this.formModel.amount = this.formModel.objData.amount
    this.formModel.transDate = this.formModel.objData.transTime
    this.formModel.feeAmount = this.formModel.objData.feeAmount
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
