<template>
  <d2-container>
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>
    <d-table
      :table-head-data="tableHeadData"
      :table-data="tableData"
      :action-data="actionData"
      :first-col-index="firstColIndex"
      :operateData="operateData"
      @clickTableLink="clickTableLink"
      @accountDetailQry="accountDetailQry"
      @on-submit="onSubmit"
      @on-back="backHandler"></d-table>
  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, acc_status } from '@/assets/js/entity'

const commonFormatter = (entity, value, labelKey = 'label', valueKey = 'value') => {
  let result = ''
  if (Array.isArray(entity)) {
    const target = entity.find(item => item[valueKey] === value)
    result = target ? target[labelKey] : '未知'
  }
  return result
}

export default {
  name: 'current-account-qry',
  data () {
    // const kzState = [
    //   { value: '0000', label: '正常' },
    //   { value: '1000', label: '金额冻结' },
    //   { value: '0100', label: '封闭冻结' },
    //   { value: '0010', label: '只收不付' },
    //   { value: '0001', label: '只付不收' },
    //   { value: '1001', label: '金额冻结/只付不收' },
    //   { value: '1010', label: '金额冻结/只收不付' },
    //   { value: '1100', label: '金额冻结/封闭冻结' },
    //   { value: '1011', label: '金额冻结/只收不付/只付不收' },
    //   { value: '1101', label: '金额冻结/封闭冻结/只付不收' },
    //   { value: '1110', label: '金额冻结/封闭冻结/只收不付' },
    //   { value: '1111', label: '金额冻结/封闭冻结/只收不付/只付不收' },
    //   { value: '0101', label: '封闭冻结/只付不收' },
    //   { value: '0110', label: '封闭冻结/只收不付' },
    //   { value: '0111', label: '封闭冻结/只收不付/只付不收' },
    //   { value: '0011', label: '只收不付/只付不收' }
    // ]
    return {
      breadcrumb: ['账户管理', '活期账户查询'],
      // msgs: ['1.查询起止时间最长为六个月，通常历史明细查询可查询该账户最近六个月内的所有交易明细。'],
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      tableHeadData: [
        {
          width: '180',
          label: '账号',
          prop: 'acNo',
          clickEventName: 'clickTableLink'
        },
        {
          label: '账户名称',
          prop: 'acName',
          width: '180'
        },
        // {
        //   label: '账户类型',
        //   prop: 'acType',
        //   width: 120,
        //   formatter: (row, column, cellValue, index) => commonFormatter(acc_type, cellValue)
        // },
        {
          label: '子账户序号',
          prop: 'subAcNo',
          width: '120'
        },
        {
          label: '币种',
          prop: 'currency',
          formatter: (row, column, cellValue, index) => commonFormatter(currency_type, cellValue)
        },
        // {
        //   width: '180',
        //   label: '账户余额',
        //   prop: 'balance',
        //   formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        // },
        {
          width: '150',
          label: '可用余额',
          prop: 'availBal',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        // {
        //   label: '钞汇标志',
        //   prop: 'currType',
        //   formatter: (row, column, cellValue, index) => commonFormatter(chaohui_flag, cellValue)
        // },
        {
          label: '账户状态',
          prop: 'acStatus',
          formatter: (row, column, cellValue, index) => commonFormatter(acc_status, cellValue)
        },
        // {
        //   label: '限制类型',
        //   prop: 'kzState',
        //   formatter: (row, column, cellValue, index) => util.handleEnums(kzState, cellValue)
        // }
        {
          label: '开户网点',
          prop: 'openOrgName'
        }
      ],
      operateData: {
        btnData: [
          { type: 'text', eventName: 'accountDetailQry', btnText: '交易明细' }
        ]
      },
      tableData: [],
      actionData: [
        {
          btnText: '刷新',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'on-submit'
        },
        {
          btnText: '返回',
          type: 'info',
          class: 'm-cancel-btn',
          eventName: 'on-back'
        }
      ]
    }
  },

  methods: {
    clickTableLink (data) {
      this.$router.push({
        name: 'currentAccountQryDetails',
        params: {
          ...data
        }
      })
    },
    accountDetailQry (data) {
      this.$router.push({
        name: 'accountDetailQry',
        params: { item: data.data }
      })
    },
    onSubmit () {
      this.listQry()
    },
    backHandler () {
      this.$router.push('/index')
    },

    listQry () {
      httpPost('eweb-acmgmt.TimAccountQry.do', {}).then(res => {
        this.tableData = res.list || []
      })
    }
  },
  created () {
    this.listQry()
  }
}
</script>

<style lang="scss" scoped>
</style>
