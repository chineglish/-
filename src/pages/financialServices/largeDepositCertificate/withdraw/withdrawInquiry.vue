<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <d-table
        :table-data="tableData"
        :firstColIndex="firstColIndex"
        :isPagination="true"
        :tableHeadData="tableHeadData"
        :pagesize="20"
        @clickTableLink="clickTableLink">
      </d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>
<script>
/**
 *@name: 大额存单支取-查询
 * @author: 梁文彬
 * @date: 2019-12-18
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, chaohui_flag, acc_type, acc_status } from '@/assets/js/entity'
export default {
  name: 'withdrawInquiry',
  data () {
    return {
      breadData: ['理财服务', '大额存单', '单位大额存单支取'],
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      msgs: [
        '1.可实现企业用户将已申购的单位大额存单支取至活期账户中。',
        '2.若要办理单位大额存单支取质押业务，需到柜面补打开户证实书并换成存单后方能办理。'
      ],
      tableHeadData: [
        { label: '账户名称', prop: 'zhhuzwmc', width: '250' },
        {
          label: '账户类型',
          prop: 'kehuzhlx',
          width: '120',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_type, cellValue)
        },
        { label: '账号', prop: 'kehuzhao', width: '150', clickEventName: 'clickTableLink' },
        { label: '子账户序号', prop: 'zhhaoxuh', width: '100' },
        {
          label: '币种',
          prop: 'currencyCode',
          width: '80',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '开户金额',
          prop: 'openAmount',
          width: '140',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '年利率(%)',
          prop: 'zhxililv',
          width: '100' },
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
      tableData: []
    }
  },
  methods: {
    clickTableLink (data) {
      httpPost('/eweb-largeDeposit.EntLargeDepositDetailQry.do', {
        lDAcNo: data.lDAcNo,
        subAcNo: data.subAcNo
      }).then(res => {
        Object.assign(res, data)
        data.acType = res.acType
        this.$router.push({
          name: 'withdrawPre',
          params: { data: res }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    withdrawInquiry () {
      httpPost('/eweb-largeDeposit.EntLargeDepositQry.do', { qryType: '1' }).then(res => {
        this.tableData = res.list
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.withdrawInquiry()
  }
}
</script>
