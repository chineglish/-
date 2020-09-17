<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <el-steps :active="stepsActive" align-center>
      <el-step title="交易确认"></el-step>
      <el-step title="提交结果"></el-step>
    </el-steps>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack" @confirm="confirm"></m-form-res>
  </div>
</template>

<script type="text/javascript">
import util from '@/libs/util'

export default {
  name: 'financialRedeemCancelRes',
  data: function () {
    // let vm = this
    return {
      stepsActive: 2,
      titleData: ['理财服务', '理财产品', '赎回撤销结果'],
      formModel: {},
      btnData: [
        { btnText: '继续撤单', class: 'm-submit-btn', clickEventName: 'confirm' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        _JnlStatus: '',
        _RejMessage: '',
        resData: {
          title: '',
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transDate' },
            { label: '产品名称', key: 'prdName' },
            { label: '撤销份额（份）',
              key: 'portion',
              formatter: (value) => util.formatCurrency(value) },
            { label: '交易账户', key: 'payeeAcNo' },
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
      // this.$router.push('myFinancial/true')
      this.$router.push({
        name: 'myFinancial',
        params: {
          activeName: 'agencyTransaction',
          isFromPrdSearch: true
        }
      })
    }
  },
  created () {
    this.formModel = this.$route.params.data
    const res = this.$route.params.res
    this.formModel.transName = '理财赎回撤销'
    this.formModel.transDate = res.transDate
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.data._JnlStatus = res._JnlStatus ? res._JnlStatus : ''
    this.data.resData._jnlNo = res._jnlNo ? res._jnlNo : ''
    user.acList.forEach(element => {
      if (element.acNo === this.formModel.payeeAcNo) {
        this.formModel.acName = element.acName
      }
    })
  }
}
</script>
