<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
    </div>
  </d2-container>
</template>
<script>
/**
 *@name: 大额存单详情
 * @author: 梁文彬
 * @date: 2019-12-19
 */
import { acc_type, acc_status, chaohui_flag, limit_type, drawType, handleChannel, currency_type, payerRate } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'largeDepositDatail',
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
      titleData: ['理财服务 ', '大额存单', '单位大额存单查询详情'],
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
            { label: '账号', key: 'lDAcNo' },
            { label: '子账户序号', key: 'subAcNo' },
            { label: '币种', key: 'currencyCode', formatter: (row) => util.handleEnums(currency_type, row) },
            { label: '开户金额',
              key: 'openAmount',
              formatter: (value) => util.formatCurrency(value)
            },
            { label: '余额',
              key: 'actBal',
              formatter: (value) => util.formatCurrency(value)
            },
            { label: '办理渠道',
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
      this.$router.push('largeDepositInquiry')
    },
    formatter (object, key) {
      if (Array.isArray(object)) {
        let arr = object.find(item => item.value === key)
        return arr.label
      } else {
        return object[key]
      }
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
    }
  }
}
</script>
