<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack" @confirm="confirm"></m-form-res>
  </div>
</template>

<script type="text/javascript">
import util from '@/libs/util'

export default {
  name: 'financialPurchRes',
  data: function () {
    return {
      titleData: ['理财服务', '理财产品', '产品购买结果'],
      formModel: {},
      btnData: [
        { btnText: '继续购买', class: 'm-submit-btn', clickEventName: 'confirm' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        stepsActive: 3,
        itemWidth: '4',
        _JnlStatus: '',
        _RejMessage: '',
        resData: {
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transDate' },
            { label: '产品名称', key: 'prdName' },
            { label: '产品代码', key: 'prdCode' },
            { label: '购买金额(元)',
              key: 'amount',
              formatter: (value) => util.formatCurrency(value) },
            { label: '七日年化收益率', key: 'weekRate', show: false },
            { label: '业绩比较基准', key: 'modelComment', show: false },
            { label: '起息日', key: 'incomeDate', show: false },
            { label: '到期日', key: 'incomeEndDate', show: false },
            { label: '转出账号', key: 'payerAcNo' },
            { label: '转出账户名称', key: 'acName' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }
          ]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push('/index')
    },
    confirm () {
      this.$router.push({ name: 'productSearch' })
    }
  },
  created () {
    this.formModel = this.$route.params.data
    const res = this.$route.params.res
    this.formModel.transName = '理财购买'
    this.formModel.transDate = res.transDate
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.data._JnlStatus = res._JnlStatus ? res._JnlStatus : ''
    this.data.resData._jnlNo = res._jnlNo ? res._jnlNo : ''
    user.acList.forEach(element => {
      if (element.acNo === this.formModel.payerAcNo) {
        this.formModel.acName = element.acName
      }
    })
    if (this.formModel.prdTemplate === '1300') {
      this.data.resData.group[5].show = true
    } else {
      this.data.resData.group[6].show = true
      this.data.resData.group[7].show = true
      this.data.resData.group[8].show = true
    }
  }
}
</script>
