<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
     <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @continue="OnContinue" @transDetail="transDetail"></m-form-res>
  </div>
</template>

<script type="text/javascript">
import util from '@/libs/util'
import { process_state } from '@/assets/js/entity'
export default {
  name: 'multiLevelTransferRes',
  data: function () {
    // let vm = this
    return {
      titleData: ['现金管理', '多级账簿', '多级账簿转账结果'],
      formModel: {
        summary: '多级账户转账',
        // transDate: vm.dateFtt('yyyy-MM-dd hh:mm', new Date()),
        transDate: '',
        amount: '',
        status: '',
        payerAcNo: '',
        payeeAcNo: '',
        operatorName: '',
        operatorId: ''
      },
      routeParams: {},
      btnData: [
        { btnText: '继续转账', class: 'm-cancel-btn', clickEventName: 'continue' },
        { btnText: '查看交易明细', class: 'm-submit-btn', clickEventName: 'transDetail' }
      ],
      data: {
        _RejMessage: '',
        itemWidth: '4',
        stepsActive: 3,
        _JnlStatus: '',
        resData: {
          title: '转账申请已提交，请等待审核员审查！',
          group: [
            { label: '交易名称', key: 'summary' },
            { label: '交易日期', key: 'transDate' },
            { label: '交易金额', key: 'amount', formatter: (value) => util.formatCurrency(value) },
            { label: '交易状态', key: 'status', formatter: (value) => util.handleEnums(process_state, value) },
            { label: '付款账户', key: 'payerAcNo' },
            { label: '收款账户', key: 'payeeAcNo' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }
          ]
        }
      }
    }
  },
  // mounted: function () {
  //   let data = this.$route.params
  //   for (let i in this.formModel) {
  //     if (i !== 'transDate') {
  //       this.$set(this.formModel, i, data[i])
  //     }
  //   }
  // },
  beforeRouteLeave (to, from, next) {
    sessionStorage.removeItem('cached_page_data')
    next()
  },
  methods: {
    // onBack () {
    //   this.$router.back()
    // },
    // confirm () {
    //   this.$router.push('/index')
    // },
    transDetail () {
      this.$router.push('/accountDetailQry')
    },
    OnContinue (data) {
      this.$router.push({
        name: 'transferQuery',
        params: this.routeParams
      })
    }
    // dateFtt (fmt, date) { // author: meizz
    //   let o = {
    //     'M+': date.getMonth() + 1, // 月份
    //     'd+': date.getDate(), // 日
    //     'h+': date.getHours(), // 小时
    //     'm+': date.getMinutes(), // 分
    //     's+': date.getSeconds(), // 秒
    //     'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    //     'S': date.getMilliseconds() // 毫秒
    //   }
    //   if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    //   for (let k in o) {
    //     if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    //   }
    //   return fmt
    // }
  },
  created () {
    const user = this.getUser()
    this.formModel = this.$route.params.msg
    // this.formModel.operatorName = this.user ? this.user.cif.cifName : ''
    // this.formModel.operatorId = this.user ? this.user.cif.coreCifNo : ''
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.formModel.summary = '多级账户转账'
    this.formModel.transDate = this.$route.params.res._transTime
    this.formModel.status = this.$route.params.res._processState ? this.$route.params.res._processState : ''
    this.data._JnlStatus = this.$route.params.res._processState ? this.$route.params.res._processState : ''
    this.data.resData._jnlNo = this.$route.params.res._jnlNo ? this.$route.params.res._jnlNo : ''
  },
  components: {}
}
</script>
