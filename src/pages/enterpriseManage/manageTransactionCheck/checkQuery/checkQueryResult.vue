<template>
  <d2-container>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
export default {
  name: 'checkQueryResult',
  data () {
    return {
      formModel: {
        payerName: '管理类交易审核',
        transDate: '2019-11-11',
        operatorName: '张三',
        operatorId: '001'
      },
      breadData: ['交易管理', '待审核记录查询'],
      routeParams: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _RejMessage: '',
        _JnlStatus: '1',
        itemWidth: '4',
        resData: {
          title: '转账申请已提交，请等待审核员审查！',
          group: [
            { label: '交易名称', key: 'payerName' },
            { label: '交易日期', key: 'transDate' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }]
        }
      }
      // status: {
      //   '0': '失败',
      //   '1': '待审核'
      // }
    }
  },
  methods: {
    onBack (data) {
      this.$router.push({
        name: 'manageTransactionCheck'
        // params: this.routeParams
      })
    }
  },
  created () {
  }
}
</script>
