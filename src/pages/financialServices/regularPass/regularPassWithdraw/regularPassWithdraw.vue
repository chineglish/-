<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <d-table
        :table-data="tableData"
        :firstColIndex="firstColIndex"
        :tableHeadData="tableHeadData"
        :pagesize="20"
        @clickTableLink="clickTableLink">
      </d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { acc_status, draw_interest_type, handleChannel } from '@/assets/js/entity'
/**
 *@name: 定期通支取
 * @author: 梁文彬
 * @date: 2019-12-20
 */
export default {
  name: 'regularPassWithdraw',
  data () {
    return {
      breadData: ['理财服务 ', '定期通', '定期通支取'],
      msgs: [
        '1.可实现企业用户将定期通中的资金支取至活期账户中。',
        '2.若要办理定期通支取质押业务，需到柜面补打开户证实书并换成存单后方能办理。'
      ],
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      tableHeadData: [
        { label: '定期通账号', prop: 'regularAcNo', clickEventName: 'clickTableLink', width: '200px' },
        {
          label: '账户状态',
          prop: 'actStatus',
          formatter: (row, column, cellValue, index) => {
            const target = acc_status.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          },
          width: '100px'
        },
        {
          label: '开户金额',
          prop: 'openAcNoAmount',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '存入利率（%）', prop: 'depositRate', width: '100', formatter: (row, column, cellValue, index) => util.formatInterestRate(cellValue) },
        {
          label: '开通渠道',
          prop: 'openChannel',
          formatter: (row, column, cellValue, index) => {
            const target = handleChannel.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          }
        },
        {
          label: '开户日期',
          prop: 'openDate',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '到期日期',
          prop: 'matureDate',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '付息方式',
          prop: 'interestType',
          formatter: (row, column, cellValue, index) => {
            const target = draw_interest_type.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    clickTableLink (data) {
      const params = {
        regularAcNo: data.regularAcNo,
        regularSubAcNo: data.regularSubAcNo
      }
      httpPost('/eweb-invest.RegularDrawDetailQry.do', params).then(res => {
        this.tableData = res.list
        this.$router.push({
          name: 'rpWithdrawPre',
          params: { ...data, ...res }
        })
      })
    },
    getList () {
      httpPost('/eweb-invest.RegularDrawQry.do').then(res => {
        this.tableData = res.list
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
