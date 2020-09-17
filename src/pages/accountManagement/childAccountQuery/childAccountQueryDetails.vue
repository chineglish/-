<template>
  <d2-container class="child-account-query-details">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel"></m-form-res>
    <d-table
      :table-data="tableData"
      :tableHeadData="tableHeadData"
      :firstColIndex="firstColIndex"
      :pagesize="pagesize"
      :actionData="actionData"
      @back="onBack"
      @childBatNum="childBatNum"
      >
    </d-table>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, chaohui_flag, acc_status, acc_type } from '@/assets/js/entity'
export default {
  name: 'childAccountQueryDetails',
  data () {
    const kzState = [
      { value: '0000', label: '正常' },
      { value: '1000', label: '金额冻结' },
      { value: '0100', label: '封闭冻结' },
      { value: '0010', label: '只收不付' },
      { value: '0001', label: '只付不收' },
      { value: '1001', label: '金额冻结/只付不收' },
      { value: '1010', label: '金额冻结/只收不付' },
      { value: '1100', label: '金额冻结/封闭冻结' },
      { value: '1011', label: '金额冻结/只收不付/只付不收' },
      { value: '1101', label: '金额冻结/封闭冻结/只付不收' },
      { value: '1110', label: '金额冻结/封闭冻结/只收不付' },
      { value: '1111', label: '金额冻结/封闭冻结/只收不付/只付不收' },
      { value: '0101', label: '封闭冻结/只付不收' },
      { value: '0110', label: '封闭冻结/只收不付' },
      { value: '0111', label: '封闭冻结/只收不付/只付不收' },
      { value: '0011', label: '只收不付/只付不收' }
    ]
    return {
      formModel: {
        acName: '',
        acNo: ''
      },
      breadData: ['账户管理', '子账户查询', '详情页'],
      msgs: ['1.系统默认显示最近六个月交易明细'],
      routeParams: {},
      data: {
        itemWidth: '4',
        resData: {
          group: [
            { label: '账户名称', key: 'acName' },
            { label: '账户', key: 'acNo' }
          ]
        }
      },
      pagesize: 20,
      firstColIndex: {
        type: 'index',
        label: '序号',
        eventName: ''
      },
      tableHeadData: [
        // 首字母大写已改成小写
        { label: '子账户名称', prop: 'acName', width: 100 },
        {
          label: '子账户类型',
          prop: 'acType',
          formatter: (row, column, cellValue, index) => {
            const target = acc_type.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          },
          width: 100
        },
        { label: '子账户序号', prop: 'subAcNo', clickEventName: 'childBatNum', width: 100 },
        {
          label: '币种',
          prop: 'currency',
          formatter: (row, column, cellValue, index) => {
            const target = currency_type.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          }
        },
        {
          label: '账户余额',
          prop: 'balance',
          width: 150,
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '可用余额',
          prop: 'availBal',
          width: 150,
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '钞汇标志',
          prop: 'currType',
          formatter: (row, column, cellValue, index) => {
            const target = chaohui_flag.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          }
        },
        {
          label: '账户状态',
          prop: 'acStatus',
          formatter: (row, column, cellValue, index) => {
            const target = acc_status.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          }
        },
        {
          label: '限制类型',
          prop: 'kzState',
          formatter: (row, column, cellValue, index) => util.handleEnums(kzState, cellValue)
        },
        { label: '开户网点', prop: 'openOrgName' }
      ],
      tableData: [],
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
    // 子账户序号
    childBatNum () {
      this.$router.push({
        name: 'accountDetailQry'
      })
    },
    onBack () {
      this.$router.push({
        name: 'childAccountQuery'
      })
    },
    getChildAccQuery () {
      const params = {
        acNo: this.formModel.acNo,
        subAcNo: this.formModel.subAcNo
      }
      httpPost('/eweb-acmgmt.SubAccountDetailQry.do', params).then(res => {
        // this.tableData = [{ ...res }]
        this.tableData = res.list
      })
    }
  },
  created () {
    this.formModel = this.$route.params
    this.getChildAccQuery()
  }
}
</script>

<style lang="scss" scope>
    .child-account-query-details #m-form-res {
      width: auto !important;
      .m-info-body {
        width: 100%!important;
        margin: 0!important;
      }
    }
</style>
