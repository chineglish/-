<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
    >
    </m-new-form>
  </div>
</template>
<script>
// import { httpPost } from '@/api/sys/http'
// import { Sign } from '@/assets/js/SignMsg'
import util from '@/libs/util'
import { interest_type } from '@/assets/js/entity.js'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'openAccountConfer',
  data () {
    return {
      // data: ['理财服务', '结构性存款', '结构性存款开户确认'],
      // 以下为动态数据
      formConfigJson: {
        // formWidth: '100%',
        // stepsActive: 1,
        // labelWidth: '100%',
        formItems: [
          {
            title: '结构性存款开户',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '转出账号',
                'type': 'text',
                'key': 'payerAcNo'
              },
              {
                'disabled': true,
                'label': '转出账户名称',
                'type': 'text',
                'key': 'payerAcName'
              },
              {
                'disabled': true,
                'label': '余额',
                'type': 'text',
                'key': 'balance',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'label': '收付息账号',
                'key': 'payeeAcNo',
                'disabled': true,
                'type': 'text'
              },
              {
                'label': '收付息账户名称',
                'key': 'payeeAcName',
                'disabled': true,
                'type': 'text'
              },
              {
                'label': '到期日期',
                'key': 'endDate',
                'disabled': true,
                'type': 'text',
                formatter: (key, value) => util.separationStrDateWithLine(value)
              },
              {
                'label': '转存金额',
                'key': 'amount',
                'disabled': true,
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'label': '年利率（%）',
                'key': 'struRates',
                'disabled': true,
                'type': 'text',
                formatter: (key, value) => util.formatInterestRate(value)
              },
              {
                'label': '付息方式',
                'key': 'fxType',
                'disabled': true,
                'type': 'text',
                formatter: (key, value) => util.handleEnums(interest_type, value)
              },
              {
                'label': '对账联系人',
                'key': 'contactName',
                'disabled': true,
                'type': 'text'
              },
              {
                'label': '联系人电话',
                'key': 'contactTel',
                'disabled': true,
                'type': 'text'
              },
              {
                'label': '联系人手机',
                'key': 'contactPhone',
                'disabled': true,
                'type': 'text'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
  },
  created () {
    // this.formModel.acNoName = this.$route.params.payerAccNoList[this.$route.params.formModel.acNo].acName
    // this.formModel.acNo = this.$route.params.payerAccNoList[this.$route.params.formModel.acNo].acNo
    // this.formModel.acNoInterestName = this.$route.params.payerAccNoList[this.$route.params.formModel.payeeAcNo].acName
    // this.formModel.payeeAcNo = this.$route.params.payerAccNoList[this.$route.params.formModel.payeeAcNo].acNo
    // this.formModel.interestType = this.$route.params.formModel.interestType
    // this.formModel.balance = this.$route.params.formModel.balance
    // this.formModel.endDate = this.$route.params.formModel.endDate
    // this.formModel.amount = this.$route.params.formModel.amount
    // this.formModel.struRates = this.$route.params.formModel.struRates
    // this.formModel.contactName = this.$route.params.formModel.contactName
    // this.formModel.contactTel = this.$route.params.formModel.contactTel
    // this.formModel.contactPhone = this.$route.params.formModel.contactPhone
  }
}
</script>
<style  scoped>
</style>
