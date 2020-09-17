<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <d-vertical-table
                    :tabledata="topTableData"
                    :showOne="false"
                    :tableStyle="{
                        width: '100%'
                    }"
                    @handleBack="handleBack"
            >
            </d-vertical-table>
            <d-table
                    :table-data="buttomTableData"
                    :isPagination="true"
                    :tableHeadData="tableHeadData"
                    :actionData="actionData"
                    @downloadDetails="downloadDetails"
                    @handleBack="handleBack"
            >
            </d-table>
        </div>
        <m-hint-box :msgs="promptList"></m-hint-box>
    </div>
</template>

<script>
/**
     * @name: 历史代发工资记录详细
     * @author: 邓焕
     * @date: 2019-12-10
     */
import { httpPost, downloadFile } from '@/api/sys/http'
import util from '../../../../libs/util'
export default {
  name: 'payrollRecordsDetails',
  data () {
    return {
      promptList: ['1.通过该交易可查询上传文件处理状态和员工工资发放结果明细。', '2.“处理状态”分为处理失败、处理成功。如果处理 状态”显示为“处理失败”，可能由于核心系统繁忙，请稍后再重新进行文件上传，如果“处理状态”显示为“处理成功”，并不表示上传文件中所有员工工资发放成功，您可通过点击“代发状态”下的“全部”、“成功”、“失败”按钮查询相应代发状态的笔数和金额，并下载相应明细。'],
      filename: __filename,
      breadData: ['财务管理', '代发工资', '历史代发记录查询'],
      topTableData: [],
      options: { // table属性
        border: true,
        stripe: true
      },
      tableHeadData: [
        { label: '员工编号', prop: 'detailNo' },
        { label: '账号', prop: 'detailAcNo' },
        { label: '账户名称', prop: 'detailName' },
        { label: '发放金额', prop: 'detailAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '处理状态', prop: 'status', formatter: (row, column, cellValue, index) => cellValue === 'AAAAAAAAAA' ? '成功' : '失败' },
        { label: '失败原因', prop: 'failCause' }
      ],
      buttomTableData: [],
      actionData: [
        {
          btnText: '下载明细',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'downloadDetails'
        },
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
    downloadDetails () {
      // 下载明细
      let params = {
        _Download: 'xls',
        mandateNum: this.$route.params.data.salaryNo,
        queryFlag: '0'
      }
      downloadFile('/eweb-transfer.PaySalaryHisDetailsDownload.do', params)
    },
    handleBack (res) {
      // 返回
      let formModel = this.$route.params.formModel
      let tableData = this.$route.params.tableData
      this.$router.push({
        name: 'queryHistoricalPayrollRecords',
        params: {
          formModel: formModel,
          tableData: tableData
        }
      })
    },
    initData () {
      httpPost('/eweb-transfer.PaySalaryHisDetailsQuery.do', {
        mandateNum: this.$route.params.data.salaryNo
      }).then(result => {
        this.topTableData = [
          { key: '', label: '付款账号', value: this.$route.params.data.payAccount },
          { key: '', label: '发放工资总金额', value: util.formatCurrency(result.amount) },
          { key: '', label: '成功总笔数', value: result.successNumber },
          { key: '', label: '失败总笔数', value: result.failNumber },
          { key: '', label: '发放日期', value: util.separationDate(result.date) },
          { key: '', label: '发放工资总笔数', value: result.number },
          { key: '', label: '成功总金额', value: util.formatCurrency(result.successAmount) },
          { key: '', label: '失败总金额', value: util.formatCurrency(result.failAmount) }
        ]
        this.buttomTableData = result.list
      })
    }
  },
  created () {
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
    .d-table{
        box-shadow: 0 0 0 #ddd;
    }
</style>
