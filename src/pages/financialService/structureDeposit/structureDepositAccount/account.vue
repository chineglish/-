<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <d-table
      :table-data="tableData"
      :firstColIndex="firstColIndex"
      :tableHeadData="tableHeadData"
      :pagesize="pagesize"
      @account = "account"
    ></d-table>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, chaohui_flag, acc_type, acc_status } from '@/assets/js/entity'
export default {
  name: 'account',
  data () {
    return {
      msgs: [
        '1.已开户成功的结构性存款，未经银行允许无法提前支取；',
        '2.若要办理结构性存单质押业务，需到柜面补打开户证实书并换成存单后方能办理；'
      ],
      filename: __filename,
      breadData: ['理财服务', '结构性存款', '结构性存款销户'],
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      pagesize: 20,
      tableHeadData: [
        { label: '账户名称', prop: 'zhhuzwmc', width: '250' },
        {
          label: '账户类型',
          prop: 'kehuzhlx',
          width: '120',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_type, cellValue)
        },
        { label: '账号', prop: 'kehuzhao', width: '150', clickEventName: 'account' },
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
        { label: '年利率(%)', prop: 'zhxililv', width: '100' },
        {
          label: '钞汇标志',
          prop: 'chaohubz',
          formatter: (row, column, cellValue, index) => util.handleEnums(chaohui_flag, cellValue)
        },
        {
          label: '开户日期',
          prop: 'kaihriqi',
          width: '120',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '到期日期',
          prop: 'doqiriqi',
          width: '120',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '账户状态',
          prop: 'zhhuztai',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_status, cellValue)
        }
      ],
      operateData: {
        btnData: []
      },
      tableData: []
    }
  },
  // mounted () {
  //   this.getAccountList()
  // },
  methods: {
    account (data) {
      const params = {
        acNo: data.lDAcNo,
        subAcNo: data.subAcNo
      }
      httpPost('/eweb-invest.StructuredDepositQuery.do', params).then(res => {
        const _mesgData = {
          ...data,
          ...res
        }
        this.getAccountMesg(_mesgData)
        // this.$router.push({
        //   name: 'confirmAccount',
        //   params: {
        //     ...data,
        //     ...res
        //   }
        // })
      })
    },
    getAccountList () {
      httpPost('/eweb-invest.StructuredDepositList.do', {
        withdrawFlg: '1'
      }).then(res => {
        this.tableData = res.acctInfoList
      })
    },
    getAccountMesg (data) {
      const params = {
        acName: data.acName,
        acNo: data.lDAcNo,
        serial: data.serial,
        acType: data.kehuzhlx,
        subAcNo: data.subAcNo,
        currency: data.currencyCode,
        struRates: data.zhxililv,
        openChannel: data.openChannel,
        amount: data.openAmount,
        fxType: data.lxzffans,
        openDate: data.qixiriqi,
        matureDate: data.matureDate,
        payerAcNo: data.lDAcNo,
        bjlxzrzh: data.payeeAccNo,
        cashFlag: data.cashFlag,
        actStatus: data.actStatus,
        limitType: data.limitType
      }
      httpPost('/eweb-invest.StructuredDepositCloseConfirm.do', params).then(res => {
        this.$router.push({
          name: 'confirmAccount',
          params: { data, res }
        })
      })
    }
  },
  created () {
    this.getAccountList()
  }
}
</script>
