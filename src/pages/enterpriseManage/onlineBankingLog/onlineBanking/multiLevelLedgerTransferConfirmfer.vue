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
import util from '@/libs/util'
import { asFlag_Type, bankSigns_Type, currency_type } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'multiLevelLedgerTransferConfirmfer',
  data () {
    return {
      // data: ['理财服务', '通知存款', '多级账簿转账']
      formConfigJson: {
        formItems: [
          {
            title: '多级账户转账',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'type': 'text',
                'label': '付款账户',
                'key': 'payerAcNo'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '付款币种',
                'key': 'payerCurrencyCode',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '付款户名',
                'key': 'payerAcName'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '是否使用账簿',
                'key': 'asFlag',
                formatter: (key, value) => util.handleEnums(asFlag_Type, value)
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '账簿号',
                'key': 'asAcNo'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '账簿名',
                'key': 'asAcName'
              },
              // { label: '子账簿名', fieldName: 'subLedgerNum' },
              {
                'disabled': true,
                'type': 'text',
                'label': '付款地址',
                'key': 'payerAcAddr'
              },
              // { label: '凭证号', fieldName: 'voucherNum' }
              {
                'disabled': true,
                'type': 'text',
                'label': '行内外标志',
                'key': 'bankFlag',
                formatter: (key, value) => util.handleEnums(bankSigns_Type, value)
              },
              // {
              //   'disabled': true,
              //   'type': 'text',
              //   'label': '同城异地标志',
              //   'key': 'areaFlag',
              //   formatter: (key, value) => util.handleEnums(bankFlag_Type, value)
              // },
              // {
              //   'disabled': true,
              //   'type': 'text',
              //   'label': '加急标志',
              //   'key': 'urgencyFlag',
              //   formatter: (key, value) => util.handleEnums(urgentFlag_Type, value)
              // },
              {
                'disabled': true,
                'type': 'text',
                'label': '收款账户',
                'key': 'payeeAcNo'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '收款账户名称',
                'key': 'payeeAcName'
              },
              // { label: '收款账户开户行', fieldName: 'incomeAccBankName' },
              {
                'disabled': true,
                'type': 'text',
                'label': '开户行网点',
                'key': 'rcvBankName'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '收款人手机',
                'key': 'mobiles'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '交易金额',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '处理方式',
                'key': 'bookingFlag',
                formatter: (key, value) => {
                  switch (value) {
                    case '0':
                      return '实时'
                    case '3':
                      return '次日'
                    case '1':
                      return '预约'
                  }
                }
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '预约日期',
                'key': 'bookingDate',
                formatter: (key, value) => util.separationDate(value)
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '预约时间',
                'key': 'bookingtime',
                formatter: (key, value) => util.separationDate(value)
              },
              // { label: '用途', fieldName: 'purpose' },
              {
                'disabled': true,
                'type': 'text',
                'label': '附言',
                'key': 'postscript'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '虚拟款项账号',
                'key': 'virAcNo'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '虚拟款项户名',
                'key': 'virAcName'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style  scoped>
</style>
