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
/**
 *@name: 单笔转账确认页
 * @author: 陈天浩
 * @date: 2019-12-10
 */
// import { httpPost } from '@/api/sys/http'
// import { asFlag_Type } from '@/assets/js/entity'
import util from '@/libs/util'
import { bill_Type, response_Type } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'EndorsementTransferReplySoloConffer',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '票据号码',
                'type': 'text',
                'key': 'stdBillNum'
              },
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'text',
                'key': 'stdBillTyp',
                formatter: (key, value) => util.handleEnums(bill_Type, value)
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
                'label': '到期日',
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
              },
              {
                'disabled': false,
                'label': '出票人名称',
                'type': 'text',
                'key': 'stdDrwrNam'
              },
              {
                'disabled': false,
                'label': '承兑人名称',
                'type': 'text',
                'key': 'stdAccpNam'
              }
            ]
          },
          {
            title: '应答人消息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '应答人账号',
                'type': 'text',
                'key': 'stdSgnrAcc'
              },
              {
                'disabled': false,
                'label': '应答意见',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(response_Type, value),
                'key': 'stdSgnrRes'
              },
              {
                'disabled': false,
                'label': '备注',
                'type': 'text',
                'key': 'std400Memob'
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
  }
}
</script>
<style scoped>
</style>
