<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :firstColIndex = "firstColIndex"
              :pagesize="20"
              @account="account">
      </d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, chaohui_flag, acc_type, acc_status, saveDate } from '@/assets/js/entity'
export default {
  name: 'bigDepositQuery',
  data () {
    return {
      breadData: ['账户管理', '大额存单查询'],
      msgs: [
        '1.请按照银行人员提供的产品期次编号购买。',
        '2.每笔业务发起前须与客户经理联系，由客户经理逐笔上报总行审批后方能办理。',
        '3.单位大额存单申购业务须在银行工作日办理，办理时间为8:30-17:30。',
        '4.每笔业务均须总行产品经理在系统中审批通过后方能开户成功。'
      ],
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      tableHeadData: [
        { label: '账户名称', prop: 'zhhuzwmc' },
        {
          label: '账户种类',
          prop: 'kehuzhlx',
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_type, cellValue)
        },
        { label: '账户', prop: 'kehuzhao', width: '150px', clickEventName: 'account' },
        { label: '子账户序号', prop: 'zhhaoxuh', width: '100' },
        {
          label: '币种',
          prop: 'currencyCode',
          width: '80',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '开户金额',
          prop: 'zhanghye',
          width: '150px',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '可用余额',
          prop: 'keyongye',
          width: '150px',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '钞汇标志',
          prop: 'chaohubz',
          formatter: (row, column, cellValue, index) => util.handleEnums(chaohui_flag, cellValue)
        },
        {
          label: '存期',
          prop: 'cunqiiii',
          formatter: (row, column, cellValue, index) => util.handleEnums(saveDate, cellValue)
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
        subAcNo: data.subAcNo,
        openChannel: data.openChannel
      }
      // 大额存单详情查询
      httpPost('/eweb-acmgmt.LargeDepositDetailQry.do', params).then(res => {
        let bigQurDetails = res.map
        // 剩余渠道
        bigQurDetails.kaihuqud = data.kaihuqud
        // 剩余额度
        bigQurDetails.keyonedu = data.keyonedu
        // 钞汇标志
        bigQurDetails.chaohubz = data.chaohubz
        // 限制类型
        bigQurDetails.xzhileix = data.xzhileix
        this.$router.push({
          name: 'bigDepositQueryDetails',
          params: { ...bigQurDetails, openChannel: data.openChannel }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    getBigQuery () {
      // 大额存单查询
      httpPost('/eweb-acmgmt.LargeDepositQry.do').then(res => {
        this.tableData = res.list
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.getBigQuery()
  }
}
</script>
