<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </div>
</template>

<script type="text/javascript">
import util from '@/libs/util'
export default {
  name: 'multiLevelLedgerBalanceRes',
  data: function () {
    return {
      titleData: ['现金管理', '多级账簿', '多级账簿余额调整结果'],
      formModel: {
        acNo: '',
        currencyCode: '',
        acName: '',
        inAsAcNo: '',
        inAsAcName: '',
        outAsAcNo: '',
        outAsAcName: '',
        amount: '',
        bigNum: '',
        purpose: '',
        postScript: ''
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        _JnlStatus: '',
        stepsActive: 2,
        resData: {
          title: '交易已提交',
          group: [
            { label: '调出账簿号', key: 'outAsAcNo' },
            { label: '调出账簿名', key: 'outAsAcName' },
            { label: '调入账簿号', key: 'inAsAcNo' },
            { label: '调入账簿名', key: 'inAsAcName' },
            { label: '调整金额', key: 'amount', formatter: (value) => util.formatCurrency(value) },
            { label: '金额大写', key: 'bigNum' },
            { label: '用途', key: 'purpose' },
            { label: '附言', key: 'postScript' }
          ]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push('/multiLevelLedgerBalanceSet')
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
    // },

  },
  created () {
    this.formModel.acNo = this.$route.params.acNo
    this.formModel.currencyCode = this.$route.params.currencyCode
    this.formModel.acName = this.$route.params.acName
    this.formModel.inAsAcNo = this.$route.params.inAsAcNo
    this.formModel.inAsAcName = this.$route.params.inAsAcName
    this.formModel.outAsAcNo = this.$route.params.outAsAcNo
    this.formModel.outAsAcName = this.$route.params.outAsAcName
    this.formModel.amount = this.$route.params.amount
    this.formModel.bigNum = util.getMoneyHanzi(this.$route.params.amount)
    this.formModel.purpose = this.$route.params.purpose
    this.formModel.postScript = this.$route.params.postScript
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.formModel.transTime = this.$route.params.res._transTime
    this.data.resData._jnlNo = this.$route.params.res._jnlNo
    this.data._JnlStatus = this.$route.params.res._processState
  },
  components: {}
}
</script>
