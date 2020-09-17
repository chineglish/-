<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <d-table
      :table-data="tableData"
      :tableHeadData="tableHeadData"
      :operate-data="operateData"
      :pagesize="pagesize"
      :firstColIndex = "firstColIndex"
      :actionData="actionData"
      @back="onBack"
      @clickTableLink="clickTableLink"
      @downLoad="downLoad">
    </d-table>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>
<script>
import util from '@/libs/util'
import { httpPost, downloadFile } from '@/api/sys/http'
import { currency_type, chaohui_flag, acc_type, acc_status } from '@/assets/js/entity'
export default {
  name: 'regularInquiry',
  data () {
    return {
      filename: __filename,
      breadData: ['理财服务', '定期通', '定期通查询'],
      msgs: ['可实现企业用户对定期通存款业务的查询功能。'],
      pagesize: 20,
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      tableHeadData: [
        { label: '账户名称', prop: 'zhhuzwmc', width: '250' },
        {
          label: '账户类型',
          prop: 'kehuzhlx',
          width: '120',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_type, cellValue)
        },
        { label: '账号', prop: 'kehuzhao', width: '150', clickEventName: 'clickTableLink' },
        { label: '子账户序号', prop: 'zhhaoxuh', width: '120' },
        {
          label: '币种',
          prop: 'currencyCode',
          width: '80',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '开户金额',
          prop: 'zhanghye',
          width: '140',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '账户余额',
          prop: 'actBal',
          width: '140px',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '年利率(%)', prop: 'zhxililv', width: '100', formatter: (row, column, cellValue, index) => util.formatInterestRate(cellValue) },
        {
          label: '钞汇标志',
          prop: 'chaohubz',
          formatter: (row, column, cellValue, index) => util.handleEnums(chaohui_flag, cellValue)
        },
        {
          label: '开户日期',
          prop: 'kaihriqi',
          width: '100',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '到期日期',
          prop: 'doqiriqi',
          width: '100',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '账户状态',
          prop: 'zhhuztai',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_status, cellValue)
        }
      ],
      tableData: [],
      operateData: {
        label: '协议',
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '下载',
            eventName: 'downLoad'
          }
        ]
      },
      actionData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          // type: 'info',
          eventName: 'back'
        }
      ]
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
      const params = {
        acNo: data.kehuzhao,
        subAcNo: data.zhhaoxuh
      }
      // 定期通明细查询
      httpPost('/eweb-acmgmt.SavProductAcctDetailQry.do', params).then(res => {
        let rePokQurDetails = res.map
        // 证书编号
        rePokQurDetails.pngzphao = data.pngzphao
        rePokQurDetails.pngzxhao = data.pngzxhao
        // 开户渠道
        rePokQurDetails.kaihuqud = data.kaihuqud
        // 限制状态
        rePokQurDetails.xzhileix = data.xzhileix
        this.$router.push({
          name: 'regularInquiryDetail',
          params: rePokQurDetails
        })
      }).catch(err => {
        console.error(err)
      })
    },
    downLoad (downData) {
      const data = {
        _Download: 'pdf',
        regularAcNo: downData.data.kehuzhao,
        regularSubAcNo: downData.data.zhhaoxuh,
        openBranch: downData.data.openBranch,
        openBranchNm: downData.data.openBranchNm
      }
      downloadFile('/eweb-acmgmt.RegularQryDown.do', data)
    },
    getLargeDeposit () {
      httpPost('/eweb-acmgmt.SavProductAcctQry.do').then(res => {
        this.tableData = res.list
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.getLargeDeposit()
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
