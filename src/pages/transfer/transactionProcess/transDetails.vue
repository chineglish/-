<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
import { timer_state, process_state } from '@/assets/js/entity'
/**
 *@name: 预约查询详情页
 * @author: 梁文彬
 * @date: 2019-12-13
 */
export default {
  name: 'transDetails',
  data () {
    return {
      formModel: {
        payerAcNo: '',
        payerAcName: '',
        payeeAcNo: '',
        payeeAcName: '',
        payerBankName: '',
        payeeBankDeptName: '',
        amount: '',
        capital: '',
        feeAmount: '',
        remark: '',
        scheduleType: '',
        trsState: '',
        transDate: '',
        respMessage: ''
      },
      titleData: ['转账汇款', '预约交易查询', '预约交易详情'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        resData: {
          group: [
            { label: '付款账户名称', key: 'payerAcName' },
            { label: '收款账户名称', key: 'payeeAcName' },
            { label: '付款账号', key: 'payerAcNo' },
            { label: '收款账号', key: 'payeeAcNo' },
            { label: '付款行', key: 'payerBankName' },
            { label: '收款行', key: 'payeeBankDeptName' },
            { label: '交易金额',
              key: 'amount',
              formatter: (value) => util.formatCurrency(value) + '元' },
            { label: '金额大写', key: 'amount', formatter: (value) => util.getMoneyHanzi(value) },
            { label: '手续费',
              key: 'feeAmount',
              formatter: (value) => util.formatCurrency(value) + '元' },
            { label: '处理方式', key: 'process', formatter: () => '预约转账' },
            { label: '附言', key: 'remark' },
            {
              label: '交易状态',
              key: 'timerState',
              formatter: (cellValue) => util.handleEnums(timer_state, cellValue)
            },
            { label: '执行时间', key: 'transTime' },
            { label: '交易结果', key: 'processState', formatter: (value) => util.handleEnums(process_state, value) },
            { label: '账簿号', fieldName: 'asAcNo', show: this.$route.params.msg ? this.$route.params.msg.data.asFlag === '1' : false },
            { label: '账簿名', fieldName: 'asAcName', show: this.$route.params.msg ? this.$route.params.msg.data.asFlag === '1' : false }
          ]
        }
      }
    }
  },
  methods: {
    onBack () {
      let _params = this.$route.params
      this.$router.push({
        name: 'scheduledTransInquiry',
        params: {
          _params
        }
      })
    }
  },
  created () {
    let res = this.$route.params
    if (res.msg) {
      Object.assign(this.formModel, res.msg.data)
    }
  }
}
</script>
