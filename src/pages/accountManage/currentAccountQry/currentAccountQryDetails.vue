<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-new-form
      :btnData="btnData"
      :componentJson="formConfigJson"
      :formModel="formModel"
      @back="onBack">
    </m-new-form>
  </div>
</template>

<script>

import util from '@/libs/util'
import { currency_type, acc_status, acc_type } from '@/assets/js/entity'
export default {
  name: 'currentAccountQryDetails',
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
        acNo: '',
        currency: '',
        acName: '',
        balance: '',
        acType: '',
        availBal: '',
        acStatus: '',
        kzState: ''
      },
      titleData: ['账户管理', '活期账户查询', '活期账户查询详情'],
      formConfigJson: {
        rules: {},
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '账号',
                'key': 'acNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '币种',
                'key': 'currency',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '账户名称',
                'key': 'acName'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '账户余额',
                'key': 'balance',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '账户类型',
                'key': 'acType',
                formatter: (key, value) => util.handleEnums(acc_type, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '可用余额',
                'key': 'availBal',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '账户状态',
                'key': 'acStatus',
                formatter: (key, value) => util.handleEnums(acc_status, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '冻结金额',
                'key': 'freezeBalance',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '限制类型',
                'key': 'kzState',
                formatter: (key, value) => util.handleEnums(kzState, value)
              },
              // {
              //   'disable': true,
              //   'type': 'text',
              //   'label': '开户日期',
              //   'key': 'beginDate'
              // },
              {
                'type': 'text',
                'label': '开户网点',
                'key': 'openOrgName'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    onBack () {
      this.$router.push('/currentAccountQry')
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
    }
  }
}
</script>
