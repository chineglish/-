<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <d-table
        :table-data="tableData"
        :tableHeadData="tableHeadData"
        :pagesize="20"
        :firstColIndex = "firstColIndex"
        @account="account"
      >
      </d-table>
      <m-hint-box :msgs="msgs"></m-hint-box>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, chaohui_flag, acc_type, acc_status } from '@/assets/js/entity'
export default {
  name: 'regularPokQuery',
  data () {
    return {
      filename: __filename,
      breadData: ['账户管理', '定期通查询'],
      msgs: [
        '1.每笔业务发起前须与客户经理联系，由客户经理逐笔上报总行审批后方能办理。',
        '2.定期通存款开户业务须在银行工作日办理，办理时间为8:30-17:30。',
        '3.每笔业务均须总行产品经理在系统中审批通过后方能开户成功。'
      ],
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      tableHeadData: [
        { label: '账户名称', prop: 'zhhuzwmc', width: '250' },
        {
          label: '账户种类',
          prop: 'kehuzhlx',
          width: '120',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_type, cellValue)
        },
        { label: '账户', prop: 'kehuzhao', width: '150px', clickEventName: 'account' },
        { label: '子账户序号', prop: 'zhhaoxuh', width: '110' },
        {
          label: '币种',
          prop: 'currencyCode',
          width: '80',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '开户金额',
          prop: 'zhanghye',
          width: '180px',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '账户余额',
          prop: 'actBal',
          width: '180px',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '年利率(%)', prop: 'zhxililv', width: '120' },
        {
          label: '钞汇标志',
          prop: 'chaohubz',
          formatter: (row, column, cellValue, index) => util.handleEnums(chaohui_flag, cellValue)
        },
        {
          label: '开户日期',
          prop: 'kaihriqi',
          width: '130',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '到期日期',
          prop: 'doqiriqi',
          width: '130',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
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
    account (data) {
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
          name: 'regularPokQueryDetails',
          params: rePokQurDetails
        })
      }).catch(err => {
        console.error(err)
      })
    },
    getRePokQuery () {
      // 定期通查询
      httpPost('/eweb-acmgmt.SavProductAcctQry.do').then(res => {
        this.tableData = res.list
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.getRePokQuery()
  }
}
</script>

<style lang="scss" scoped>
</style>
