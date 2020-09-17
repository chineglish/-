<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <d-table
          :table-data="tableData"
          :tableHeadData="tableHeadData"
          :firstColIndex = "firstColIndex"
          :pagesize="20"
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
  name: 'strucQuery',
  data () {
    return {
      msgs: [
        '1.每笔业务发起前须与客户经理联系，由客户经理逐笔上报总行审批后方能办理。',
        '2.结构性存款开户业务须在银行工作日办理，办理时间为8:30-17:30。',
        '3.每笔业务均须总行产品经理在系统中审批通过后方能开户成功。',
        '4.已开户成功的结构性存款，未经银行允许无法提前支取。',
        '5.若要办理结构性存单质押业务，需到柜面补打开户证实书并换成存单后方能办理。'
      ],
      filename: __filename,
      breadData: ['账户管理', '结构性存款查询'],
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      tableHeadData: [
        { label: '账户名称', prop: 'zhhuzwmc' },
        {
          label: '账户类型',
          prop: 'kehuzhlx',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_type, cellValue)
        },
        { label: '账户', prop: 'kehuzhao', clickEventName: 'account' },
        { label: '子账户序号', prop: 'zhhaoxuh', width: 100 },
        {
          label: '币种',
          prop: 'currencyCode',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '开户金额',
          prop: 'zhanghye',
          width: '150px',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '年利率(%)', prop: 'zhxililv', width: '110' },
        {
          label: '钞汇标志',
          prop: 'chaohubz',
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
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_status, cellValue)
        }
      ],
      tableData: [
      ]
    }
  },
  methods: {
    account (data) {
      let params = {
        acNo: data.kehuzhao,
        subAcNo: data.subAcNo
      }
      // 结构性存款查询详情
      httpPost('/eweb-acmgmt.StructureDepositDetailQry.do', params).then(res => {
        let strQurDetails = {
          ...data,
          ...res.map
        }
        // 开户渠道
        // strQurDetails.kaihuqud = res.map.kaihuqud
        // 证书编号
        // strQurDetails.pngzphao = res.map.pngzphao
        // strQurDetails.pngzxhao = res.map.pngzxhao
        // 开户渠道
        // strQurDetails.openChannel = res.map.openChannel
        // 限制类型
        // strQurDetails.xzhileix = res.map.xzhileix
        this.$router.push({
          name: 'strucQueryDetails',
          params: strQurDetails
        })
      }).catch(err => {
        console.error(err)
      })
    },
    // 结构性存款查询
    getStrQuery () {
      httpPost('/eweb-acmgmt.StructureDepositQry.do').then(res => {
        this.tableData = res.list
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.getStrQuery()
  }
}
</script>

<style lang="scss" scoped>
</style>
