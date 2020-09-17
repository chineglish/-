<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </div>
</template>
<script>
import { acc_type, acc_status, chaohui_flag, limit_type, drawType, handleChannel, currency_type, payerRate, saveDate } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'payForQueryDetail',
  data () {
    return {
      formModel: {
        certificateNum: '',
        acName: '',
        acType: '',
        lDAcNo: '',
        subAcNo: '',
        currencyCode: '',
        openAmount: '',
        actBal: '',
        unUserLimitAmount: '',
        openChannel: '',
        lxzffans: '',
        isAllowAdvancedDraw: '',
        cashFlag: '',
        actStatus: '',
        limitType: ''
      },
      titleData: ['理财服务 ', '大额存单', '单位大额存单转让查询详情'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        resData: {
          group: [
            { label: '证实书（存单）编号', key: 'certificateNum' },
            { label: '账户名称', key: 'acName' },
            { label: '账户类型', key: 'acType', formatter: (value) => util.handleEnums(acc_type, value) },
            { label: '账号', key: 'ldAccountNo' },
            { label: '子账户序号', key: 'ldSubAccNo' },
            { label: '币种', key: 'currencyCode', formatter: (row) => util.handleEnums(currency_type, row) },
            { label: '开户金额',
              key: 'openAmount',
              formatter: (value) => util.formatCurrency(value)
            },
            { label: '账户余额',
              key: 'actBal',
              formatter: (value) => util.formatCurrency(value)
            },
            { label: '存期',
              key: 'depositTerm',
              formatter: (value) => util.handleEnums(saveDate, value)
            },
            { label: '年利率(%)',
              key: 'actualRate',
              formatter: (value) => util.formatInterestRate(value)
            },
            { label: '开通渠道',
              key: 'openChannel',
              formatter: (row) => {
                const target = handleChannel.find(item => item.value === row)
                return target ? target.label : '其他'
              } },
            { label: '付息方式',
              key: 'interestFrequency',
              formatter: (row) => {
                const target = payerRate.find(item => item.value === row)
                return target ? target.label : '其他'
              } },
            { label: '支取标识',
              key: 'isAllowAdvancedDraw',
              formatter: (row) => {
                const target = drawType.find(item => item.value === row)
                return target ? target.label : '其他'
              } },
            { label: '钞汇标志',
              key: 'cashFlag',
              formatter: (row) => {
                const target = chaohui_flag.find(item => item.value === row)
                return target ? target.label : '未知'
              } },
            { label: '开户日期',
              key: 'openDate',
              formatter: (cellValue) => util.separationDate(cellValue)
            },
            { label: '到期日期',
              key: 'matureDate',
              formatter: (cellValue) => util.separationDate(cellValue)
            },
            { label: '账户状态',
              key: 'actStatus',
              formatter: (row) => {
                const target = acc_status.find(item => item.value === row)
                if (target != null) {
                  return target.label
                } else {
                  return '未知'
                }
              } },
            { label: '限制类型',
              key: 'limitType',
              formatter: (row) => {
                const target = limit_type.find(item => item.value === row)
                return target ? target.label : '正常'
              } }]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push('payForQuery')
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
    }
  }
}
</script>
