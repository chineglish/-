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
 *@name: 定期通支取-确认
 * @author: 梁文彬
 * @date: 2019-12-20
 */
// import { httpPost } from '@/api/sys/http'
import { draw_interest_freqcy, usualDate, draw_type } from '@/assets/js/entity'
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
  name: 'rpWithdrawConffer',
  data () {
    return {
      // titleData: ['理财服务 ', '定期通', '定期通支取'],
      formConfigJson: {
        formItems: [
          {
            title: '定期通支取',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '定期通账号',
                'type': 'text',
                'key': 'regularAcNo'
              }, {
                'disabled': true,
                'label': '定期通账户序号',
                'type': 'text',
                'key': 'regularSubAcNo'
              }, {
                'disabled': true,
                'label': '账户名称',
                'type': 'text',
                'key': 'regularAcName'
              }, {
                'disabled': true,
                'label': '开户日期',
                'type': 'text',
                'key': 'openDate',
                formatter: (key, value) => util.separationStrDateWithLine(value)
              }, {
                'disabled': true,
                'label': '到期日期',
                'type': 'text',
                'key': 'matureDate',
                formatter: (key, value) => util.separationStrDateWithLine(value)
              }, {
                'disabled': true,
                'label': '名义期限',
                'type': 'text',
                'key': 'nomExpire',
                formatter: (key, value) => {
                  return util.handleEnums(usualDate, value)
                }
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
                'label': '账户余额',
                'type': 'text',
                'key': 'acNoBalance',
                formatter: (key, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '付息方式',
                'type': 'text',
                'key': 'interestType',
                formatter: (key, value) => {
                  return util.handleEnums(draw_interest_freqcy, value)
                }
              }, {
                'disabled': true,
                'label': '支取方式',
                'type': 'text',
                'key': 'drawType',
                formatter: (key, value) => {
                  return util.handleEnums(draw_type, value)
                }
              }, {
                'disabled': true,
                'label': '支取金额',
                'type': 'text',
                'key': 'drawAmount',
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
  }
}
</script>

<style scoped>
</style>
