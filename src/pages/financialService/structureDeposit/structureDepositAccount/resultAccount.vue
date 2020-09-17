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
  name: 'resultAccount',
  data () {
    return {
      tdata: ['理财服务', '结构性存款', '结构性存款销户'],
      formModel: {
        transName: '结构性存款销户',
        transDate: '',
        transDateTime: '',
        openAmount: '',
        operatorName: '',
        operatorNo: ''
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
            {
              label: '金额',
              key: 'openAmount',
              formatter: (cellValue) => util.formatCurrency(cellValue)
            },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }]
        }
      }
    }
  },
  methods: {
    onSubmit () {
      this.$router.push('/index')
    },
    onBack () {
      this.$router.push({
        name: 'account'
      })
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
      this.formModel.openAmount = this.$route.params.data.openAmount
      this.formModel.transDate = this.$route.params.res._transTime
      this.formModel.status = this.$route.params.res._processState
      const user = this.getUser()
      this.formModel.operatorName = user ? user.userName : ''
      this.formModel.operatorId = user ? user.userId : ''
      this.data._JnlStatus = this.$route.params.res._processState
      this.data.resData._jnlNo = this.$route.params.res._jnlNo
    }
  }
}
</script>
