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
// import { httpPost } from '@/api/sys/http'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'autoFeeSignConfirmfer',
  data () {
    return {
      newFormUl: [],
      delMember: [],
      // titleData: ['企业管理台', '证书管理', '自动扣费签约'],
      formConfigJson: {
        // stepsActive: 1,
        formItems: [
          {
            title: '证书自动扣费签约',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '签约缴费账户',
                'type': 'text',
                'key': 'payerAcNo'
              },
              {
                'disabled': true,
                'label': '签约缴费账户名',
                'type': 'text',
                'key': 'payerAcName'
              },
              {
                'disabled': true,
                'label': '已选择的操作员',
                'type': 'text',
                'key': 'opera'
              },
              {
                'disabled': true,
                'label': '收费标准（张/年）',
                'type': 'text',
                'key': 'feeAmount'
              },
              {
                'disabled': true,
                'label': '扣费提前通知手机号',
                'type': 'text',
                'key': 'mobilePhone'
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
    this.formModel.opera = []
    for (var i = 0; i < this.formModel.signFeeList.length; i++) {
      this.formModel.opera.push(this.formModel.signFeeList[i].userId + '  ' + this.formModel.signFeeList[i].userName + '  ' + this.formModel.signFeeList[i].keyId)
    }
    // this.formModel.signFeeList.forEach(item => {
    //   let selectedOperators = ''
    //   selectedOperators = item.userId + '  ' + item.userName + '  ' + item.keyId
    //   this.formModel.opera = selectedOperators
    // })
  }
}
</script>
