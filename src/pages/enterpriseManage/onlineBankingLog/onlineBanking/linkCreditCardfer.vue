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
   * @name 文件上传
   * @date 2019-12-09
   * @auther 陈天浩
   */
// import ComPrompt from '../../../components/comPrompt'
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
  name: 'linkCreditCardfer',
  // components: {
  //   ComPrompt
  // },
  data () {
    return {
    //   breadData: ['财务管理', '信用卡', '信用卡加挂'],
      // 以下为动态数据
      formConfigJson: {
        // stepsActive: 0,
        // stepsData: [
        //   '信息录入 ',
        //   '提交结果'
        // ],
        // rules: {
        //   creditCardNum: [{ required: true, message: '请输入信用卡号', trigger: 'change' }]
        // },
        formItems: [
          {
            title: '信用卡加挂',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '信用卡号',
                'type': 'text',
                'key': 'creditCardNum'
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
    this.formModel.creditCardNum = this.formModel.account.acNo
    // if (this.$route.params) {
    //   Object.assign(this.formModel, this.$route.params)
    // }
  }
}
</script>

<style scoped>
</style>
