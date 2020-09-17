<template>
  <d2-container>
    <m-breadcrumb :data="tdata"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
import { process_state } from '@/assets/js/entity'
export default {
  name: 'resultRegularDraw',
  data () {
    return {
      tdata: ['理财服务', '定活互转', '定期支取'],
      formModel: {
        transName: '定期支取',
        transDate: '',
        transTime: '',
        amount: '',
        operatorName: '',
        operatorId: ''
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _RejMessage: '',
        _JnlStatus: '',
        itemWidth: '4',
        stepsActive: 2,
        resData: {
          title: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transDate' },
            { label: '交易状态', key: 'status', formatter: (value) => util.handleEnums(process_state, value) },
            { label: '金额', key: 'amount' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }]
        }
      }
    }
  },
  methods: {
    onSubmit () {},
    onBack (data) {
      this.$router.push({
        name: 'regularDraw',
        params: this.routeParams
      })
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
      this.formModel.amount = this.$route.params.data.amount
      this.formModel.transDate = this.$route.params.data._transTime
      const user = this.getUser()
      this.formModel.operatorName = user ? user.userName : ''
      this.formModel.operatorId = user ? user.userId : ''
      this.formModel.status = this.$route.params.data._processState
      this.data._JnlStatus = this.$route.params.data._processState
      this.data.resData._jnlNo = this.$route.params.data._jnlNo
    }
  }
}
</script>
