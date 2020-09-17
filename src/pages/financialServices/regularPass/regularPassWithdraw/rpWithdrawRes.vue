<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
/**
 *@name: 定期通支取-结果页
 * @author: 梁文彬
 * @date: 2019-12-20
 */
export default {
  name: 'rpWithdrawRes',
  data () {
    return {
      formModel: {
        transName: '',
        transDate: '',
        regularAcNo: '',
        regularAcName: '',
        drawType: '',
        drawAmount: '',
        operatorName: '',
        operatorNo: ''
      },
      titleData: ['理财服务 ', '定期通', '定期通支取'],
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
            { label: '交易日期', key: 'transTime' },
            { label: '定期通账号', key: 'regularAcNo' },
            { label: '账户名称', key: 'regularAcName' },
            { label: '支取方式', key: 'drawType' },
            { label: '支取金额', key: 'drawAmount' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }]
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
      this.$router.push('/regularPassWithdraw')
    }
  },
  created () {
    let res = this.$route.params
    this.data._JnlStatus = this.$route.params.res ? this.$route.params.res._processState : ''
    this.data.resData._jnlNo = this.$route.params.res ? this.$route.params.res._jnlNo : ''
    this.formModel.transName = '定期通支取'
    this.formModel.regularAcNo = res.regularAcNo
    this.formModel.regularAcName = res.regularAcName
    if (res.drawType === '0') {
      this.formModel.drawType = '全部支取'
    }
    if (res.drawType === '1') {
      this.formModel.drawType = '部分支取'
    }
    this.formModel.drawAmount = res.drawAmount
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.formModel.transTime = this.$route.params.res._transTime
  }
}
</script>
