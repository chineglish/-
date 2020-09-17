<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="back" @confirm="confirm"></m-form-res>
  </div>
</template>

<script type="text/javascript">
import util from '@/libs/util'

export default {
  name: 'enterpriseFinancingRes',
  data () {
    return {
      titleData: ['贷款业务', '企业融资申请结果'],
      formModel: {
        enterpriseName: '',
        accountName: '',
        phoneNumber: '',
        telNumber: '',
        applicationAmount: '',
        timeLimit: '',
        useMode: '',
        intendedSponsor: ''
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        stepsActive: 2,
        itemWidth: '4',
        _JnlStatus: '0',
        resData: {
          title: '交易已提交',
          group: [
            { label: '企业名称', key: 'enterpriseName' },
            { label: '联系人', key: 'accountName' },
            { label: '联系人手机', key: 'phoneNumber' },
            { label: '联系电话', key: 'telNumber' },
            { label: '申请授信金额',
              key: 'applicationAmount',
              formatter: value => util.formatCurrency(value) + '万'
            },
            { label: '期限',
              key: 'timeLimit',
              formatter: value => value + '月'
            },
            { label: '用途', key: 'useMode' },
            { label: '意向申办机构', key: 'intendedSponsor' }
          ]
        }
      }
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
    }
    this.data._JnlStatus = this.$route.params.res._processState ? this.$route.params.res._processState : ''
    this.data.resData._jnlNo = this.$route.params.res._jnlNo ? this.$route.params.res._jnlNo : ''
  },
  methods: {
    back () {
      this.$router.push({
        name: 'enterpriseFinancingApplication'
      })
    }
  },
  components: {}
}
</script>
