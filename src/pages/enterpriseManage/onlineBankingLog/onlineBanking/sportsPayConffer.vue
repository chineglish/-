<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel">
    </m-new-form>
  </div>
</template>
<script>
/**
 *@name: 体彩缴费
 */
// import { httpPost } from '@/api/sys/http'
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
  name: 'sportsPayConffer',
  data () {
    return {
      // titleData: ['转账汇款', '体彩缴费'],
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '体彩缴费',
            group: [
              {
                'disabled': true,
                'label': '缴费地区',
                'type': 'text',
                'key': 'payArea'
              }, {
                'disabled': true,
                'label': '缴费项目',
                'type': 'text',
                'key': 'payItem'
              }, {
                'disabled': true,
                'label': '收费单位',
                'type': 'text',
                'key': 'chargeUnit'
              }, {
                'disabled': true,
                'label': '彩票类型',
                'type': 'text',
                'key': 'lotteryType'
              }, {
                'disabled': true,
                'label': '投注站编号',
                'type': 'text',
                'key': 'lotteryCenterNumber'
              }, {
                'disabled': true,
                'label': '客户姓名',
                'type': 'text',
                'key': 'cifName'
              }, {
                'disabled': true,
                'label': '客户地址',
                'type': 'text',
                'key': 'cifAddrs'
              }, {
                'disabled': true,
                'label': '缴款金额',
                'type': 'text',
                'key': 'amount',
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
    this.formModel.payArea = '大连'
    this.formModel.payItem = '体彩缴费'
    this.formModel.chargeUnit = '大连体彩中心'
    if (this.formModel.serviceNum === '0120000501') {
      this.formModel.lotteryType = '电脑彩票'
    }
  }
}
</script>

<style scoped>
</style>
