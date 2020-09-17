<template>
  <d2-container>
    <m-new-form :componentJson="formConfigJson"
                :formModel="formModel"
               >
    </m-new-form>
  </d2-container>
</template>

<script type="text/javascript">
// import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, trans_type_code } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'quotaUpdateConfirmfer',
  data: function () {
    return {
      fromWhere: '',
      // data: ['企业管理台', '限额管理', '限额设置']
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '限额设置',
            // labelWidth: '40%',
            group: [
              {
                'disabled': true,
                'label': '账号',
                'type': 'text',
                'key': 'acNo'
              },
              {
                'disabled': true,
                'label': '账户名称',
                'type': 'text',
                'key': 'acName'
              },
              {
                'disabled': true,
                'label': '币种',
                'type': 'text',
                'key': 'currency',
                formatter: (name, value) => util.handleEnums(currency_type, value)
              },
              {
                'disabled': true,
                'label': '认证方式',
                'type': 'text',
                'key': 'authentication'
              },
              {
                'disabled': true,
                'label': '限额名称',
                'type': 'text',
                'key': 'transTypeCode',
                formatter: (name, value) => util.handleEnums(trans_type_code, value)
              },
              {
                'disabled': true,
                'label': '单笔限额（元）',
                'type': 'input',
                'key': 'limitTrs',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '日累计限额（元）',
                'type': 'input',
                'key': 'limitDay',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '月累计限额（元）',
                'type': 'input',
                'key': 'limitMon',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '年累计限额（元）',
                'type': 'input',
                'key': 'limitYear',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '日累计笔数',
                'type': 'input',
                'key': 'limitDayCount'
              }, {
                'disabled': true,
                'label': '月累计笔数',
                'type': 'input',
                'key': 'limitMonCount'
              }, {
                'disabled': true,
                'label': '年累计笔数',
                'type': 'input',
                'key': 'limitYearCount'
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
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
    }
  }
}
</script>
