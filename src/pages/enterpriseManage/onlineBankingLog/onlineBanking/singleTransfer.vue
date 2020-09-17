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
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'singleTransfer',
  data () {
    return {
      // breadData: ['企业管理台', '网银日志查询', '单笔转账']
      formConfigJson: {
        formWidth: '100%',
        formItems: [
          {
            title: '单笔转账',
            group: [
              {
                'disabled': true,
                'label': '付款账号',
                'type': 'text',
                'key': 'payerAcNo'
              },
              { 'disabled': true, 'label': '账户名', 'type': 'text', 'key': 'payerAcName' },
              {
                'disabled': true,
                'label': '付款账户开户行',
                'type': 'text',
                'key': 'payerBankDeptName'
                // formatter: (key, value) => (this.formModel.payerAccount.openBank ? this.formModel.payerAccount.openBank : '')
              },
              {
                'disabled': true,
                'label': '是否使用账簿',
                'type': 'text',
                'key': 'asFlag',
                formatter: (key, value) => value === '1' ? '是' : '否'
              },
              {
                'disabled': false,
                'label': '账簿号',
                'type': 'text',
                'key': 'asAcNo',
                'show': false
              },
              {
                'disabled': true,
                'label': '账簿名',
                'type': 'text',
                'key': 'asAcName',
                'show': false
              },
              {
                'disabled': true,
                'label': '收款账号',
                'type': 'text',
                'key': 'payeeAcNo',
                'show': false
              },
              {
                'disabled': true,
                'label': '收款户名',
                'type': 'text',
                'key': 'payeeAcName'
              },
              {
                'disabled': true,
                'label': '行内行外标志',
                'type': 'text',
                formatter: (key, value) => value === '0' ? '行内' : '跨行',
                'key': 'trsType'
              },
              {
                'disabled': true,
                'label': '开户网点',
                'type': 'text',
                'key': 'payeeBankDeptName',
                'show': true
              },
              {
                'disabled': true,
                'label': '开户网点号',
                'type': 'text',
                'key': 'payeeBankDeptId',
                'show': false
              },
              {
                'disabled': true,
                'label': '交易金额',
                'type': 'text',
                'key': 'amount',
                'content': '(元)',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '到账模式',
                'type': 'text',
                formatter: (key, value) => {
                  switch (value) {
                    case '1':
                      return '普通'
                    case '0':
                      return '实时'
                    case '2':
                      return '次日'
                    case '3':
                      return '预约'
                  }
                },
                'key': 'remitModel'
              },
              //
              {
                'disabled': true,
                'label': '预约日期',
                'type': 'text',
                'key': 'scheduleBeginDate',
                'show': false
              },
              {
                'disabled': true,
                'label': '预约时间',
                'type': 'text',
                'key': 'scheduleBeginTime',
                formatter: (key, value) => util.separationStrTimeWithLine(value),
                'show': false
              },
              {
                'disabled': true,
                'label': '附言',
                'type': 'text',
                'key': 'postscript',
                formatter: (key, value) => {
                  let postscript = value
                  return postscript
                }
              },
              {
                'disabled': true,
                'label': '手续费',
                'type': 'text',
                'key': 'feeAmount',
                formatter: (key, value) => util.formatCurrency(value)
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
    // if (!this.formModel.payerBankDeptName) {
    //   this.formModel.payerBankDeptName = this.formModel.payerAccount.openBank
    // }
    if (this.formModel.asFlag === '1') {
      this.formConfigJson.formItems[0].group[4].show = true
      this.formConfigJson.formItems[0].group[5].show = true
    }
    if (this.formModel.scheduleFlag === 'Y') {
      this.formModel.remitModel = '3'
      this.formConfigJson.formItems[0].group[13].show = true
      this.formConfigJson.formItems[0].group[14].show = true
    }
  }
}
</script>
<style scoped>
</style>
