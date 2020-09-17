<template>
    <d2-container>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
    </d2-container>
</template>
<script>
/**
 *@name: 出票登记-结果页
*/
import util from '@/libs/util'
// import { process_state } from '@/assets/js/entity'
export default {
  name: 'TicketRegistrationRes',
  data () {
    return {
      formModel: {
        transName: '出票登记'
      },
      titleData: ['电子商业汇票', '出票登记', '出票登记结果'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '4',
        stepsActive: 2,
        resData: {
          title: '',
          group: [
            { label: '交易名称', key: 'transName' },
            // { label: '交易状态', key: 'status', formatter: (value) => util.handleEnums(process_state, value) },
            { label: '金额', key: 'stdAccpAmt', formatter: (value) => util.formatCurrency(value) },
            { label: '交易日期', key: 'transTime' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }
          ]
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
      this.$router.push({
        name: 'TicketRegistrationPre'
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
      const user = this.getUser()
      this.formModel.operatorName = user ? user.userName : ''
      this.formModel.operatorId = user ? user.userId : ''
      this.formModel.transTime = this.$route.params.res._transTime
      this.data.resData._jnlNo = this.$route.params.res._jnlNo
      this.data._JnlStatus = this.$route.params.res._processState
      this.formModel.status = this.$route.params.res._processState
    }
    if (this.$route.params.data) {
      Object.assign(this.formModel, this.$route.params.data)
      const user = this.getUser()
      this.formModel.operatorName = user ? user.userName : ''
      this.formModel.operatorId = user ? user.userId : ''
      this.data.resData.group.push({ key: 'sum', label: '总笔数' })
      this.formModel.stdAccpAmt = this.formModel.amount
      this.formModel.transTime = this.$route.params.res._transTime
      this.data.resData._jnlNo = this.$route.params.res._jnlNo
      this.data._JnlStatus = this.$route.params.res._processState
      this.formModel.status = this.$route.params.res._processState
    }
  }
}
</script>
