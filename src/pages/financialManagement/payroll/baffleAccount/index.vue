<!--
 * @Author: your name
 * @Date: 2020-04-12 15:30:11
 * @LastEditTime: 2020-04-27 20:52:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ebank\src\pages\financialManagement\payroll\baffleAccount\index.vue
 -->
<template>
    <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @submit="onSubmit"
                    @reset="reset"
            >
            </m-new-form>
        </div>
    </d2-container>
</template>
<script>
/**
 * @name 挡板账户资金回退
 * @date 2019-12-24
 * @auther 邓焕
 */

import { httpPost } from '@/api/sys/http'

export default {
  name: 'fileUpload',
  data () {
    return {
      formModel: {
        payment: [], // 账户信息
        contractNo: ''
      },
      breadData: ['财务管理', '代发工资', '挡板账户资金回退'],
      formConfigJson: {
        rules: {
          contractNo: [{ required: true, message: '合同号', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '合同号',
                'type': 'select',
                options: [],
                trans: { value: 'Ywbh' },
                'key': 'contractNo'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  methods: {
    onSubmit (res) {
      this.$router.push({
        name: 'baffleAccountPre',
        params: {
          contractNo: this.formModel.payment[res.contractNo].Ywbh,
          indexFormModel: this.formModel
        }
      })
    },
    // 重置
    reset (res) {
      this.formModel = res
      this.getpaymentSalaryInfoQuery()
    },
    //  获取合同号
    getpaymentSalaryInfoQuery () {
      httpPost('/eweb-transfer.PaymentSalaryInfoQuery.do').then(result => {
        this.formModel.payment = result.result
        this.formConfigJson.formItems[0].group[0].options = this.formModel.payment
        if (this.formModel.payment.length > 0) {
          this.formModel.contractNo = 0
        }
      })
    }
  },
  created () {
    if (this.$route.params.indexFormModel) {
      this.formConfigJson.formItems[0].group[0].options = this.$route.params.indexFormModel.payment
      this.formModel = this.$route.params.indexFormModel
    } else {
      this.getpaymentSalaryInfoQuery()
    }
  }
}
</script>
