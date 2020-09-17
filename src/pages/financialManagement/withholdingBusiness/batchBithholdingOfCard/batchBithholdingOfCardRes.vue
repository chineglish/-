<template>
  <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <div class="form-box">
        <m-form-res
          :data = "data"
          :form-model="formModel"
          :btnData="btnData"
          @back="onBack"
          >
        </m-form-res>
      </div>
  </div>
</template>
<script>
import util from '@/libs/util'
export default {
  name: 'batchBithholdingOfCardRes',
  data () {
    return {
      breadData: ['财务管理', '代扣业务', '信用卡批量代扣业务结果页'],
      formModel: {
        payName: '',
        transName: '',
        transDate: '',
        operatorName: '',
        operatorId: '',
        jnlNo: ''
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        _RejMessage: '',
        _jnlNo: '',
        itemWidth: '4',
        stepsActive: 2,
        resData: {
          group: [
            {
              label: '交易名称',
              key: 'payName'
            },
            {
              label: '交易日期',
              key: 'transDate'
            },
            {
              label: '收款账号',
              key: 'rcvAcNo'
            },
            {
              label: '收款户名',
              key: 'rcvAcName'
            },
            {
              label: '交易金额',
              key: 'amount',
              formatter: (row) => util.formatCurrency(row)
            },
            {
              label: '交易笔数',
              key: 'totalCount'
            },
            {
              label: '操作员姓名',
              key: 'operatorName'
            },
            {
              label: '操作员号',
              key: 'operatorId'
            }
          ]
        }
      }
    }
  },
  methods: {
    onBack (data) {
      this.$router.push({
        name: 'batchBithholdingOfCard',
        params: this.$route.params.formModel
      })
    }
  },
  created () {
    this.formModel = this.$route.params
    this.formModel.amount = util.formatCurrency(this.formModel.amount)
    this.formModel.payName = '信用卡批量代扣'
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.data._JnlStatus = this.$route.params.JnlStatus ? this.$route.params.JnlStatus : ''
    this.data.resData._jnlNo = this.$route.params._jnlNo ? this.$route.params._jnlNo : ''
  }
}
</script>
