<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </div>
</template>

<script type="text/javascript">
import util from '@/libs/util'
import { interest_type, process_state } from '@/assets/js/entity'
export default {
  name: 'openAccountRes',
  data: function () {
    return {
      titleData: ['理财服务', '结构性存款', '结构性存款开户结果'],
      formModel: {
        transName: '',
        transDate: '',
        acNo: '',
        acName: '',
        payeeAcNo: '',
        acNoInterestName: '',
        endDate: '',
        amount: '',
        struRates: '',
        interestType: '',
        contactName: '',
        // contactTel: '',
        contactPhone: '',
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
            {
              label: '交易名称',
              key: 'transName'
            },
            {
              label: '交易日期',
              key: 'transDate'
            },
            { label: '交易状态', key: 'status', formatter: (value) => util.handleEnums(process_state, value) },
            {
              label: '转出账号',
              key: 'acNo'
            },
            {
              label: '转出账户名称',
              key: 'acNoName'
            },
            {
              label: '收付息账号',
              key: 'payeeAcNo'
            },
            {
              label: '收付息账户名称',
              key: 'acNoInterestName'
            },
            {
              label: '到期日期',
              key: 'endDate',
              formatter: (cellValue) => util.separationDate(cellValue)
            },
            {
              label: '购买金额',
              key: 'amount',
              formatter: (value) => util.formatCurrency(value)
            },
            {
              label: '年利率',
              key: 'struRates',
              formatter: (value) => util.formatInterestRate(value)
            },
            {
              label: '付息方式',
              key: 'interestType',
              formatter: (cellValue) => {
                return util.handleEnums(interest_type, cellValue)
              }
            },
            {
              label: '对账联系人',
              key: 'contactName'
            },
            // {
            //   label: '联系电话',
            //   key: 'contactTel'
            // },
            {
              label: '联系人手机',
              key: 'contactPhone'
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
    onBack () {
      this.$router.push({ name: 'openAccountInner' })
    }
  },
  created () {
    this.formModel.transName = '结构性存款开户'
    this.formModel.acNo = this.$route.params.acNo
    this.formModel.acNoName = this.$route.params.acNoName
    this.formModel.payeeAcNo = this.$route.params.payeeAcNo
    this.formModel.acNoInterestName = this.$route.params.acNoInterestName
    this.formModel.endDate = this.$route.params.endDate
    this.formModel.amount = this.$route.params.amount
    this.formModel.struRates = this.$route.params.struRates
    this.formModel.interestType = this.$route.params.interestType
    this.formModel.contactName = this.$route.params.contactName
    // this.formModel.contactTel = this.$route.params.contactTel
    this.formModel.contactPhone = this.$route.params.contactPhone
    this.formModel.status = this.$route.params._processState
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.data._JnlStatus = this.$route.params._processState
    this.data.resData._jnlNo = this.$route.params._jnlNo
    this.formModel.transDate = this.$route.params._transTime
  },
  components: {}
}
</script>
