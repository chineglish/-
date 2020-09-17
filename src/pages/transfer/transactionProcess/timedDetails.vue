<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
/**
 *@name: 定时查询详情页
 */
import util from '@/libs/util'
import { remit_model, pdeal_msg } from '@/assets/js/entity'
export default {
  name: 'timedDetails',
  data () {
    return {
      quiryMsg: {}, // 传来的查询的条件
      tableData: [], // 传来的全部数据
      formModel: {
        capital: ''
      },
      titleData: ['转账汇款', '次日交易查询', '详情'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        resData: {
          group: [
            { label: '付款账户名称', key: 'payername' },
            { label: '收款账户名称', key: 'payeename' },
            { label: '付款账号', key: 'payeracc' },
            { label: '收款账号', key: 'payeeacc' },
            { label: '付款行', key: 'payerbankname' },
            { label: '收款行', key: 'payeebankname' },
            { label: '交易金额',
              key: 'amount',
              formatter: (value) => util.formatCurrency(value) },
            { label: '金额大写',
              key: 'amount',
              formatter: (value) => util.getMoneyHanzi(value)
            },
            { label: '手续费',
              key: 'initfeetotalamt',
              formatter: (value) => util.formatCurrency(value)
            },
            { label: '处理方式',
              key: 'remitmodel',
              formatter: (value) => util.handleEnums(remit_model, value)
            },
            { label: '附言', key: 'postscript' },
            { label: '执行时间', key: 'presendtime', formatter: (value) => util.formatTransTime(value) },
            { label: '交易结果',
              key: 'pdealmsg',
              formatter: (cellValue) => {
                let value = pdeal_msg.find(item => {
                  return item.value === cellValue
                })
                return value ? value.label : cellValue
              } },
            { label: '账簿号', fieldName: 'asAcNo', show: this.$route.params.msg ? this.$route.params.msg.data.asFlag === '1' : false },
            { label: '账簿名', fieldName: 'asAcName', show: this.$route.params.msg ? this.$route.params.msg.data.asFlag === '1' : false }
          ]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'scheduledTransInquiry',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.msg) {
      if (this.$route.params.formModel.asFlag === '1') {
        if (this.$route.params.msg.data.payerbankname === '') {
          this.$route.params.msg.data.payerbankname = '大连银行'
        }
      }
      Object.assign(this.formModel, this.$route.params.msg.data) // 接收选择的查询数据
      if (this.formModel.initfeetotalamt === '') {
        this.formModel.initfeetotalamt = '0'
      }
      if (this.formModel.remitmodel === '') {
        this.formModel.remitmodel = '2'
      }
      if (!this.formModel.initfeetotalamt) {
        this.formModel.initfeetotalamt = '0'
      }
      if (!this.formModel.remitmodel) {
        this.formModel.remitmodel = '2'
      }
    }
  }
}
</script>
