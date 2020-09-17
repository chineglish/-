<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </div>
</template>

<script type="text/javascript">
import util from '@/libs/util'
import { process_state } from '@/assets/js/entity'
export default {
  name: 'adjustmentRes',
  data: function () {
    return {
      titleData: ['现金管理', '多级账簿', '多级账簿明细调账结果'],
      formModel: {
        transName: '',
        transDate: '',
        tacode: '',
        prdName: '',
        payerAcNo: '',
        amt: '',
        managerName: '',
        clientManager: ''
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        _JnlStatus: '',
        stepsActive: 2,
        resData: {
          title: '',
          group: [
            { label: '调出账簿号', key: 'outAsAcNo' },
            { label: '调出账簿名', key: 'asAcName' },
            { label: '调入账簿号', key: 'inAsAcNo' },
            { label: '调入账簿名', key: 'asInAcName' },
            { label: '调整金额', key: 'amount' },
            { label: '金额大写', key: 'bigNum' },
            { label: '用途', key: 'purpose' },
            { label: '交易状态', key: 'status', formatter: (value) => util.handleEnums(process_state, value) }
          ]
        }
      }
    }
  },
  mounted: function () {
    this.formModel = this.$route.params
    this.formModel.status = this.$route.params._processState
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.formModel.transTime = this.$route.params._transTime
    this.data.resData._jnlNo = this.$route.params._jnlNo
    this.data._JnlStatus = this.$route.params._processState
  },
  methods: {
    onBack () {
      this.$router.push('/multiLevelLedgerDetailAdjustment')
    }
  },
  components: {}
}
</script>
