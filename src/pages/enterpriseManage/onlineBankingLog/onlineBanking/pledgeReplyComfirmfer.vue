<template>
  <div>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
        >
      </m-new-form>
    </div>
  </div>
</template>
<script>

// import { httpPost } from '../../../api/sys/http'
import { bill_Type, resBill_Type } from '@/assets/js/entity'
import util from '@/libs/util'
// import _ from 'lodash'

export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'pledgeReplyComfirmfer',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '票据号码',
                'type': 'text',
                'key': 'stdBillNum'
              },
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(bill_Type, value),
                'key': 'stdBillTyp'
              },
              {
                'disabled': false,
                'label': '出票日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdIssDate'
              },
              {
                'disabled': false,
                'label': '票面到期日',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdDueDate'
              },
              {
                'disabled': false,
                'label': '票面金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stdAccpAmt'
              }
            ]
          },
          {
            title: '申请人信息',
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '客户账号',
                'type': 'text',
                'key': 'stdSgnrAcc'
              },
              {
                'disabled': false,
                'label': '应答意见',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(resBill_Type, value),
                'key': 'stdSgnrRes'
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
    // if (this.$route.params.formModel) {
    //   this.formModel = _.cloneDeepWith(this.$route.params.formModel)
    //   this.formModel.idType = util.handleEnums(id_type, this.$route.params.formModel.idType)
    // }
  }
}
</script>

<style scoped>
</style>
