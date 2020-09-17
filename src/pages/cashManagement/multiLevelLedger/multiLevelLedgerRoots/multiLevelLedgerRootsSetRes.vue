<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack" @confirm="confirm"></m-form-res>
  </div>
</template>

<script>
export default {
  name: 'multiLevelLedgerRootsSetRes',
  data: function () {
    return {
      titleData: ['现金管理', '多级账簿', '多级账簿权限设置结果'],
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
        resData: {
          title: '交易已提交',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transTime' },
            { label: '账户', key: 'acNo' },
            { label: '户名', key: 'accountName' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }
          ]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push('/setMultiLevelLedgerRoots')
    }
  },
  created () {
    this.formModel.transName = '多级账簿权限设置'
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.formModel.transTime = this.$route.params.res._transTime
    this.data.resData._jnlNo = this.$route.params.res._jnlNo
    this.data._JnlStatus = this.$route.params.res._processState
    this.formModel.accountName = this.$route.params.formModel.accountName
    this.formModel.acNo = this.$route.params.formModel.acNo
  }
}
</script>
