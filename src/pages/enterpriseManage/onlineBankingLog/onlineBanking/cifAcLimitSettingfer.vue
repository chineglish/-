<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel">
    </m-new-form>
  </div>
</template>

<script>
import util from '@/libs/util'
import { currency_type, trans_type_code } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: (data) => {
        return {}
      }
    }
  },
  name: 'cifAcLimitSettingfer',
  data () {
    return {
      // data: [限额管理]
      formConfigJson: {
        formItems: [
          {
            title: '限额管理',
            formWidth: '100%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '限额账号',
                'key': 'acNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '限额名称',
                'key': 'transTypeCode',
                formatter: (key, value) => util.handleEnums(trans_type_code, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '币种',
                'key': 'currency',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              }
            ]
          },
          {
            title: '限额信息',
            formWidth: '100%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '单笔限额（元）',
                'key': 'LimitTrs',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '日累计限额（元）',
                'key': 'LimitDay',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '月累计限额（元）',
                'key': 'LimitMon',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '年累计限额（元）',
                'key': 'LimitYear',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          },
          {
            title: '笔数信息',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '日累计笔数',
                'type': 'text',
                'key': 'LimitDayCount'
              },
              {
                'disabled': true,
                'label': '月累计笔数',
                'type': 'text',
                'key': 'LimitMonCount'
              },
              {
                'disabled': true,
                'label': '年累计笔数',
                'type': 'text',
                'key': 'LimitYearCount'
              }
            ]
          }
        ]
      }
    }
  },
  created () {
    this.formModel.limit.forEach(item => {
      this.formModel[item.limitType] = item.limitAmount
    })
  }
}
</script>
