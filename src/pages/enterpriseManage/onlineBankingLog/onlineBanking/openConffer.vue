<template>
  <div>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 *@name: 定期通开户-确认
 * @author: 梁文彬
 * @date: 2019-12-20
 */
// import { httpPost } from '@/api/sys/http'
import { interest_type, usualDate } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'openConffer',
  data () {
    return {
      // titleData: ['理财服务 ', '定期通', '定期通开户'],
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '定期通开户',
            group: [
              {
                'disabled': true,
                'label': '转出账号',
                'type': 'text',
                'key': 'payerAcNo'
              }, {
                'disabled': true,
                'label': '转出账户名称',
                'type': 'text',
                'key': 'payerAcName'
              }, {
                'disabled': true,
                'label': '名义期限',
                'type': 'text',
                'key': 'nomExpire',
                formatter: (key, value) => util.handleEnums(usualDate, value)
              }, {
                'disabled': true,
                'label': '提前支取开始日期',
                'type': 'text',
                'key': 'preDrawStartDate',
                formatter: (key, value) => util.separationStrDateWithLine(value)
              }, {
                'disabled': true,
                'label': '开户金额',
                'type': 'text',
                'key': 'openAcNoAmount',
                formatter: (key, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '存入利率',
                'type': 'text',
                'key': 'depositRate',
                formatter: (key, value) => util.formatInterestRate(value)
              }, {
                'disabled': true,
                'label': '付息方式',
                'type': 'text',
                'key': 'interestType',
                formatter: (key, value) => util.handleEnums(interest_type, value)
              }, {
                'disabled': true,
                'label': '对账联系人',
                'type': 'text',
                'key': 'contactName'
              }, {
                'disabled': true,
                'label': '联系人手机',
                'type': 'text',
                'key': 'contactMobile'
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
    // if (this.$route.params) {
    //   Object.assign(this.formModel, this.$route.params.data)
    //   const [payerAcNo, payerSubAcNo, payerAcName] = (this.$route.params.data.payerAcNo || '').split('/')
    //   this.formModel.payerAcNo = payerAcNo
    //   this.formModel.payerSubAcNo = payerSubAcNo
    //   this.formModel.payerAcName = payerAcName
    //   this.formModel.amount = this.$route.params.amount
    // }
  }
}
</script>

<style scoped>
</style>
