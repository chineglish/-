<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <!-- <div class="title">非税缴费</div> -->
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        :msgs="promptList"
        @submit="submit">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 *@name: 非税缴费
 */
import { httpPost } from '@/api/sys/http'
export default {
  name: 'noTaxPay',
  data () {
    return {
      titleData: ['转账汇款', '非税缴费'],
      promptList: [
        '1.该交易支持7×24小时缴费。',
        '2.我行不提供发票，如需发票请联系执收单位。'
      ],
      formModel: {
        payCode: ''
      },
      formConfigJson: {
        rules: {
          payCode: [{ required: true, message: '请输入缴款码', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '40%',
            title: '非税缴费',
            group: [
              {
                'disabled': false,
                'label': '缴款码',
                'type': 'input',
                maxlength: 50,
                'key': 'payCode'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' }
      ]
    }
  },
  methods: {
    submit (params) {
      let _params = params
      httpPost('/eweb-transfer.PaymentDueInfoQry.do', {
        payCode: params.payCode
      }).then(res => {
        Object.assign(_params, res)
        this.$router.push({
          name: 'noTaxPayPre',
          params: _params
        })
      })
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
    }
  }
}
</script>

<style scoped>
/* .title{
  height: 0;
  line-height: 30px;
  width: 150px;
  border-bottom: 30px solid #D41618;
  border-right: 37px solid transparent;
  border-top-left-radius: 5px;
  text-align: center;
  color: #ffffff;
} */
</style>
