<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack" @submit="confirm" :msgs="msgs"></m-form-res>
  </d2-container>
</template>
<script>
/**
 *@name: 预约交易撤销
 * @date: 2019-12-13
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { timer_state, process_state } from '@/assets/js/entity'

export default {
  name: 'transCancel',
  data () {
    return {
      transDate: '',
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
      titleData: ['转账汇款', '预约交易查询', '预约交易撤销'],
      btnData: [
        { btnText: '确认撤销', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      msgs: [
        '1.用户可以点击单笔交易查看明细和进行撤销操作。',
        '2.点击查看链接查看预约交易明细信息；点击撤销链接进入预约交易撤销确认页，确认后完成预约交易撤销。'
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
            { label: '执行时间', key: 'transDate' },
            { label: '交易结果', key: 'processState', formatter: (value) => util.handleEnums(process_state, value) },
            { label: '账簿号', fieldName: 'asAcNo', show: this.$route.params.msg ? this.$route.params.msg.data.asFlag === '1' : false },
            { label: '账簿名', fieldName: 'asAcName', show: this.$route.params.msg ? this.$route.params.msg.data.asFlag === '1' : false }
          ]
        }
      }
    }
  },
  methods: {
    confirm () {
      this.feeAmount = util.formatCurrency(this.formModel.feeAmount)
      this.transDate = new Date()
      this.$confirm('确定要撤销该交易?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        httpPost('/eweb-transfer.RepealAppointTransConfirm.do', {
          globalJnlNo: this.formModel.globalJnlNo,
          amount: this.formModel.amount,
          payerAcNo: this.formModel.payerAcNo,
          payerAcName: this.formModel.payerAcName
        }).then(conf => {
          httpPost('/eweb-common.GenToken.do').then(token => {
            const singMsg = this.isSign({ _Data2Sign: conf._Data2Sign, _authenticateType: conf._authenticateType })
            httpPost('/eweb-transfer.RepealAppointTrans.do', {
              _authenticateTypeChoose: conf._authenticateType ? conf._authenticateType[0] : '',
              _dataMapKey: conf._dataMapKey,
              CSIISignature: singMsg,
              _tokenName: token._tokenName,
              payerAccount: conf.account,
              globalJnlNo: this.formModel.globalJnlNo,
              amount: this.formModel.amount,
              payerAcNo: this.formModel.payerAcNo,
              payerAcName: this.formModel.payerAcName,
              payeeAcName: this.formModel.payeeAcName,
              payeeAcNo: this.formModel.payeeAcNo,
              payerBankName: this.formModel.payerBankName,
              payeeBankDeptName: this.formModel.payeeBankDeptName,
              // feeAmount: this.formModel.feeAmount,
              feeAmount: this.feeAmount,
              process: this.formModel.process,
              remark: this.formModel.remark,
              timerState: this.formModel.timerState,
              transDate: this.formModel.transDate,
              processState: this.formModel.processState,
              asAcNo: this.formModel.asAcNo,
              asAcName: this.formModel.asAcName
            }).then(res => {
              this.$router.push({
                name: 'transCancelRes',
                params: {
                  formModel: this.$route.params.formModel,
                  res
                }
              })
            })
          })
        })
      }).catch(() => {})
    },
    onBack () {
      this.$router.push({
        name: 'scheduledTransInquiry'
      })
    }
  },
  created () {
    if (this.$route.params.msg) {
      Object.assign(this.formModel, this.$route.params.msg.data)
    }
  }
}
</script>
