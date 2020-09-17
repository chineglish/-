<template>
  <d2-container>
    <m-breadcrumb :data="tdata"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
import { notify_type } from '@/assets/js/entity'

export default {
  name: 'resultDraw',
  data () {
    return {
      tdata: ['理财服务', '通知存款', '通知存款支取'],
      formModel: {
        transName: '通知存款支取',
        transDate: '',
        accountMoney: '',
        noticeClass: '',
        operatorName: '',
        operatorId: ''
      },
      routeParams: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _RejMessage: '',
        _JnlStatus: '',
        itemWidth: '4',
        resData: {
          title: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transDate' },
            { label: '金额',
              key: 'accountMoney',
              formatter: (value) => util.formatCurrency(value)
            },
            { label: '通知类型', key: 'noticeClass', formatter: (value) => util.handleEnums(notify_type, value) },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'forwardDrawList'
      })
    }
  },
  created () {
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    let res = this.$route.params.res
    this.data._JnlStatus = res ? res._processState : ''
    this.data.resData._jnlNo = res ? res._jnlNo : ''
    this.formModel.transDate = res ? res._transTime : ''
    if (this.$route.params.data) {
      this.formModel.accountMoney = this.$route.params.data.amount
      this.formModel.noticeClass = this.$route.params.data.depositTerm
    }
  }
}
</script>
