<template>
  <d2-container class="enterprise-bank-check-bill-res">
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>

    <d2-container>
      <m-form-res :data="resData" :formModel="formModel" :btnData="btnData" @on-back="backHandler"></m-form-res>
    </d2-container>
  </d2-container>
</template>

<script>
export default {
  name: 'enterprise-bank-check-bill-res',
  data () {
    // let vm = this
    return {
      breadcrumb: ['账户管理', '银企对账'],
      formModel: {
        // docDate: vm.dateFtt('yyyy-MM-dd hh:mm', new Date())
        docDate: ''
      },
      resData: {
        _JnlStatus: '',
        _RejMessage: '',
        stepsActive: 2,
        itemWidth: '4',
        resData: {
          title: '交易已提交',
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'docDate' },
            { label: '操作员姓名', key: 'userName' },
            { label: '操作员号', key: 'userId' }
          ]
        }
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'on-back' }
      ]
    }
  },
  methods: {
    backHandler () {
      this.$router.push('/enterpriseBankBill')
    },
    dateFtt (fmt, date) { // author: meizz
      let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
      }
      return fmt
    }
  },
  created () {
    // console.log('aaa===', this.$store.state.common.user.userName)
    // console.log('bbb===', this.$store.state.common.user.userId)
    // const params = { 'voucherNo': '191231011010199207', 'Credit': '200000000.00', 'Docdate': '20191231', 'docDate': '2019-12-31', 'credit': '200000000.00', 'Voucherno': '191231011010199207', 'acNo': '117825000000060', 'radio': 1, 'ebillResult': '1', '_jnlNo': '202003091703008000068506' }
    // const params = this.$route.params
    // params.userName = this.$store.state.common.user.userName
    // params.userId = this.$store.state.common.user.userId
    // params.transName = '银企对账'
    // console.log('params===', params)
    // this.formModel = Object.keys(params).reduce((acc, cur) => {
    //   if (cur !== '_jnlNo') {
    //     acc = { ...acc, [cur]: params[cur] }
    //   }
    //   return acc
    // }, {})
    // console.log(333333, this.$route.params)
    // this.resData.resData.title = `交易已提交，交易流水号 ${this.$route.params.jnl}`
    // this.resData.resData.title = `交易已提交，交易流水号 ${this.$route.params._jnlNo}`
    if (this.$route.params._JnlStatus) {
      this.resData._JnlStatus = this.$route.params._JnlStatus
    }
    if (this.$route.params._jnlNo) {
      this.resData.resData._jnlNo = this.$route.params._jnlNo
    }
    this.formModel.transName = `银企对账`
    // this.formModel.userName = this.$store.state.common.user.userName
    // this.formModel.userId = this.$store.state.common.user.userId
    const user = this.getUser()
    this.formModel.userName = user ? user.userName : ''
    this.formModel.userId = user ? user.userId : ''
    this.formModel.docDate = this.$route.params._transTime
  }
}
</script>

<style lang="scss" scoped>
// .enterprise-bank-check-bill-res {}
</style>
