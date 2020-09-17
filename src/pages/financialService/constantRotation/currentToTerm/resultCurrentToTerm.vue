<template>
  <d2-container>
    <m-breadcrumb :data="tdata"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
import { process_state, usualDate, extendFlg_Type } from '@/assets/js/entity'
export default {
  name: 'resultCurrentToTerm',
  data () {
    return {
      tdata: ['理财服务', '定活互转', '活期转定期'],
      formModel: {
        transName: '活期转定期',
        transDate: '',
        transTime: '',
        amt: '',
        operatorName: '',
        operatorId: '',
        acNo: '',
        interestId: '',
        extendFlg: '',
        interestName: ''
      },
      routeParams: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _RejMessage: '',
        _JnlStatus: '',
        _jnlNo: '',
        stepsActive: 2,
        itemWidth: '4',
        resData: {
          title: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易时间', key: 'transTime' },
            { label: '交易状态', key: 'status', formatter: (value) => util.handleEnums(process_state, value) },
            { label: '金额', key: 'amt', formatter: (value) => util.formatCurrency(value) },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' },
            { label: '账号', key: 'acNo' },
            { label: '存期', key: 'interestId', formatter: (value) => util.handleEnums(usualDate, value) },
            { label: '到期是否自动转存', key: 'extendFlg', formatter: (value) => util.handleEnums(extendFlg_Type, value) },
            { label: '付息方式', key: 'interestName' }
          ]
        }
      },
      status: {
      }
    }
  },
  methods: {
    onBack (data) {
      this.$router.push({
        name: 'innerCurrentToTerm'
      })
    }
  },
  created () {
    if (this.$route.params) {
      this.formModel.transTime = this.$route.params.data._transTime
      this.formModel.amt = this.$route.params.data.amount
      this.formModel.acNo = this.$route.params.data.acNo
      this.formModel.interestId = this.$route.params.data.interestId
      this.formModel.extendFlg = this.$route.params.data.extendFlg
      this.formModel.interestName = this.$route.params.data.interestName
      const user = this.getUser()
      this.formModel.operatorName = user ? user.userName : ''
      this.formModel.operatorId = user ? user.userId : ''
      this.data._JnlStatus = this.$route.params.data._processState ? this.$route.params.data._processState : ''
      this.formModel.status = this.$route.params.data._processState ? this.$route.params.data._processState : ''
      this.data.resData._jnlNo = this.$route.params.data._jnlNo
    }
  }
}
</script>
