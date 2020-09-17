<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <d-vertical-table
          :tabledata="topTableData"
          :showOne="showOne"
          :tableStyle="{
              width: '100%'
          }"
          @handleBack="handleBack"
        >
        </d-vertical-table>
        <d-table
          :table-data="buttomTableData"
          :isPagination="true"
          :pagesize="20"
          :tableHeadData="tableHeadData"
          :actionData="actionData"
          @handleSelectionChange="tableSelectChange"
          @downloadDetails="downloadDetails"
          @handleBack="handleBack"
        >
        </d-table>
    </div>
</template>

<script>
/**
 * @name: 报销记录查询,页面废弃
 * @author: 邓焕
 * @date: 2019-12-10
 */

import { downloadFile } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: 'reimbursementRecordsDetails',
  data () {
    return {
      filename: __filename,
      breadData: ['财务管理', '财务报销', '报销记录查询'],
      showOne: false,
      // showOne: true,
      topTableData: [
        { key: '', label: '总笔数', value: this.$route.params.reimbursementTimes },
        { key: '', label: '合同号', value: this.$route.params.contractNo },
        { key: '', label: '总金额', value: this.$route.params.reimbursementAmt },
        { key: '', label: '付款账号', value: this.$route.params.payerAccNo }
      ],
      firstColIndex: {
        type: 'selection',
        eventName: ''
      },
      tableHeadData: [
        { label: '批次号', prop: 'batchNum' },
        { label: '发放日期', prop: 'releaseDate' },
        { label: '收款账号', prop: 'payeeAccNo' },
        { label: '收款人', prop: 'payee' },
        { label: '总金额(元)',
          prop: 'totalAmt',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '失败金额',
          prop: 'failureAmt',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '处理状态', prop: 'processStatus' }
      ],
      buttomTableData: [
        {
          // batchNum: '001',
          // failureAmt: 50,
          // payeeAccNo: '15151515151',
          // payee: '王五',
          // processStatus: '成功',
          // releaseDate: '1941-10-24',
          // totalAmt: 500
        }
      ],
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
    tableSelectChange (selection) {
      // 监听表格选择事件触发
      this.selectedList = selection
    },
    downloadDetails () {
      // 下载明细
      let params = {
        _Download: 'xls',
        MandateNum: this.$route.params.salaryNo,
        QueryFlag: '0'
      }
      downloadFile('/eweb-transfer.PaySalaryHisDetailsQuery.do', params).catch(() => {
        this.$msg('下载失败')
      })
    },
    handleBack (res) {
      // 返回
      this.$router.push({
        name: 'queryReimbursementRecords'
      })
    }
  }
}
</script>
