<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
/**
 *@name: 体彩缴费结果页
 * @author: 梁文彬
 * @date: 2019-12-17
 */
import { createNamespacedHelpers } from 'vuex'

const { mapState: mapStateOfCommon } = createNamespacedHelpers('common')

export default {
  name: 'sportsPayRes',
  computed: {
    ...mapStateOfCommon([
      'user'
    ])
  },
  data () {
    return {
      formModel: {
        payItem: '',
        amount: '',
        lotteryType: '',
        betStationNum: '',
        cifName: '',
        transDate: '',
        transTime: '',
        operatorName: ''
      },
      titleData: ['转账汇款', '体彩缴费'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '4',
        stepsActive: 2,
        resData: {
          title: '交易已提交，请等待审核员审查！',
          group: [
            { label: '缴款项目', key: 'payItem' },
            { label: '缴费金额', key: 'amount' },
            { label: '彩票类型', key: 'lotteryType' },
            { label: '投注站编号', key: 'betStationNum' },
            { label: '客户姓名', key: 'cifName' },
            { label: '交易日期', key: 'transDate' },
            { label: '交易时间', key: 'transTime' },
            { label: '操作员', key: 'operatorName' }]
        }
      },
      status: {
        '0': '失败',
        '1': '待审核'
      }
    }
  },
  methods: {
    onBack () {
      this.$router.go(-2)
    }
  },
  created () {
    let msg = this.$route.params.msg
    const res = this.$route.params.res
    this.data._JnlStatus = res ? res._processState : ''
    this.data.resData._jnlNo = res ? res._jnlNo : ''
    this.transDate = res ? res._transTime : ''
    this.formModel.payItem = msg.payItem
    this.formModel.amount = msg.amount
    this.formModel.lotteryType = msg.lotterytype
    this.formModel.betStationNum = msg.betStationNum
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : '' // (操作员名 )
    this.formModel.cifName = msg.cifName

    // const transDateObj = this.$route.params.transDateObj
    // const monthStr = (transDateObj.getMonth() + 1 + '').padStart(2, '0')
    // const dateStr = (transDateObj.getDate() + '').padStart(2, '0')
    // const hourStr = (transDateObj.getHours() + '').padStart(2, '0')
    // const minuteStr = (transDateObj.getMinutes() + '').padStart(2, '0')
    // const secondStr = (transDateObj.getSeconds() + '').padStart(2, '0')
    this.formModel.transDate = res._transTime.substring(0, 10)
    this.formModel.transTime = res._transTime.substring(11, res._transTime.length)
  }
}
</script>
