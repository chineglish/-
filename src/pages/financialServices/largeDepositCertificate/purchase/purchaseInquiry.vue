<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        :msgs="promptList"
        @submit="submit"
        @reset="reset">
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
export default {
  name: 'purchaseInquiry',
  data () {
    return {
      titleData: ['理财服务 ', '大额存单', '单位大额存单申购'],
      promptList: [
        '1.请按照银行人员提供的产品期次编号购买。',
        '2.每笔业务发起前须与客户经理联系，由客户经理逐笔上报总行审批后方能办理。',
        '3.单位大额存单申购业务须在银行工作日办理，办理时间为8:30-17:30。',
        '4.每笔业务均须总行产品经理在系统中审批通过后方能开户成功。'
      ],
      formModel: {
        depositCode: ''
      },
      formConfigJson: {
        rules: {
          depositCode: [{ required: true, message: '大额存单期次编号', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '40%',
            group: [
              {
                'disabled': false,
                'label': '大额存单产品期次编号',
                'type': 'input',
                'key': 'depositCode'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  methods: {
    submit (params) {
      let _params = params
      httpPost('/eweb-largeDeposit.LargeProductBatchQry.do', {
        prdBatchCode: _params.depositCode
      }).then(res => {
        if (res) {
          Object.assign(res, _params)
          this.$router.push({
            name: 'manual',
            params: res
          })
        }
      })
    },
    reset (res) {
      res = this.formModel
    }
  },
  created () {
    this.formModel = this.$route.params
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
</style>
