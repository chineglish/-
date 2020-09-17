<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
/**
 *@name: 定期通开户-结果页
 * @author: 梁文彬
 * @date: 2019-12-19
 */
import util from '@/libs/util'

export default {
  name: 'openRes',
  data () {
    return {
      formModel: {
        transName: '',
        transDate: '',
        payerAcNo: '',
        payerAcName: '',
        nominalTerm: '',
        transMoney: '',
        depositRate: '',
        interestType: '',
        operatorName: '',
        operatorNo: ''
      },
      titleData: ['理财服务', '定期通', '定期通开户'],
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
            { label: '转出账号', key: 'payerAcNo' },
            { label: '转出账户名称', key: 'payerAcName' },
            { label: '名义期限', key: 'nomExpire' },
            { label: '开户金额', key: 'transMoney', formatter: (value) => util.formatCurrency(value) },
            { label: '存入利率(%)', key: 'depositRate' },
            { label: '付息方式', key: 'interestType' },
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
      this.$router.push('/openPre')
    }
  },
  created () {
    this.data._JnlStatus = this.$route.params.res ? this.$route.params.res._processState : ''
    this.data.resData._jnlNo = this.$route.params.res ? this.$route.params.res._jnlNo : ''
    this.formModel = this.$route.params
    this.formModel.transTime = this.$route.params.res ? this.$route.params.res._transTime : ''
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
  }
}
</script>
