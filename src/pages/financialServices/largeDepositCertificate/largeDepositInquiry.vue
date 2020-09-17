<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <d-table
      :table-data="tableData"
      :tableHeadData="tableHeadData"
      :operate-data="operateData"
      :pagesize="20"
      :firstColIndex = "firstColIndex"
      @clickTableLink="clickTableLink"
      :actionData="actionData"
      @back="onBack"
      @downLoad="downLoad">
    </d-table>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>
<script>
/**
 *@name: 大额存单查询
 * @author: 梁文彬
 * @date: 2019-12-18
 */
import { httpPost, downloadFile } from '@/api/sys/http'
import { acc_type, currency_type, acc_status, chaohui_flag } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'largeDepositInquiry',
  data () {
    return {
      breadData: ['理财服务', '大额存单', '单位大额存单查询'],
      msgs: ['可用于对单位大额存单的查询功能'],
      firstColIndex: {
        type: 'index',
        label: '序号',
        width: '50'
      },
      tableHeadData: [
        { label: '账户名称', prop: 'zhhuzwmc' },
        {
          label: '账户类型',
          prop: 'kehuzhlx',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_type, cellValue)
        },
        { label: '账号', prop: 'kehuzhao', clickEventName: 'clickTableLink' },
        { label: '子账户序号', prop: 'zhhaoxuh', width: '95' },
        {
          label: '币种',
          prop: 'currencyCode',
          width: '70',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '开户金额',
          prop: 'zhanghye',
          width: '145',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '年利率(%)', prop: 'zhxililv', width: '90', formatter: (row, column, cellValue, index) => util.formatInterestRate(cellValue) },
        {
          label: '钞汇标志',
          prop: 'chaohubz',
          width: '80',
          formatter: (row, column, cellValue, index) => util.handleEnums(chaohui_flag, cellValue)
        },
        {
          label: '开户日期',
          prop: 'kaihriqi',
          width: '110',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '到期日期',
          prop: 'doqiriqi',
          width: '110',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '账户状态',
          prop: 'zhhuztai',
          width: '80',
          style: (value) => value === 'A' ? 'color: #03AF3A;' : '',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_status, cellValue)
        }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          // type: 'info',
          eventName: 'back'
        }
      ],
      operateData: {
        label: '产品说明书',
        width: '95px',
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '下载',
            eventName: 'downLoad'
          }
        ]
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        // name: 'childAccountQuery'
        name: 'index'
      })
    },
    /**
     * 查看详情
     */
    clickTableLink (data) {
      httpPost('/eweb-largeDeposit.EntLargeDepositDetailQry.do', {
        lDAcNo: data.lDAcNo,
        subAcNo: data.subAcNo
      }).then(res => {
        Object.assign(res, data)
        this.$router.push({
          name: 'largeDepositDatail',
          params: res
        })
      })
    },
    downLoad (downData) {
      const data = {
        _Download: 'pdf',
        lDAcNo: downData.data.lDAcNo,
        subAcNo: downData.data.subAcNo,
        openBranchNm: downData.data.openBranchNm,
        openBranch: downData.data.openBranch,
        openTeller: downData.data.openTeller
      }
      downloadFile('/eweb-largeDeposit.LargeProductBatchQryDown.do', data)
    },
    getLargeDeposit () {
      httpPost('/eweb-largeDeposit.EntLargeDepositQry.do', { qryType: '0' }).then(res => {
        this.tableData = res.list
      })
    }
  },
  created () {
    this.getLargeDeposit()
  }
}
</script>
