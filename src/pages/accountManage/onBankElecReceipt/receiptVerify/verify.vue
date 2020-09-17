<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form ref="mNewForm"
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              :msgs="msgs"
              @submit="submit">
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'

export default {
  name: 'receiptVerify',
  data () {
    return {
      breadData: ['账户管理', '网银电子回单验证'],
      formModel: {
        receiptNo: '',
        identifyCode: ''
      },
      formConfigJson: {
        rules: {
          receiptNo: [{ required: true, message: '请输入电子回单号', trigger: 'change' }],
          identifyCode: [{ required: true, message: '请输入回单校验码', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '电子回单号',
                'type': 'input',
                'key': 'receiptNo',
                maxlength: 24
              },
              {
                'disabled': false,
                'label': '回单校验码',
                'type': 'input',
                'key': 'identifyCode',
                maxlength: 32
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '回单校验', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      msgs: [
        '1.用于企业用户查询所有交易的电子回单。'
      ]
    }
  },
  methods: {
    // submit () {
    //   this.$router.push('/verifyRes')
    // }
    submit (res) {
      // console.log('oooooo', res)
      // 查询
      this.listQry(res)
    },
    listQry (data) {
      // const params = {
      //   receiptNo: data ? data.receiptNo : '',
      //   identifyCode: data ? data.identifyCode : ''
      // }
      httpPost('eweb-query.IBPSeleReceiptValidate.do', data).then(res => {
        // console.log(res)
        if (res.bodyMap.transCode === '体彩缴费') {
          this.$router.push({
            name: 'receiptDetail',
            params: {
              res: res.bodyMap,
              formModel: data,
              flag: 1
            }
          })
        } else {
          this.$router.push({
            name: 'verifyRes',
            params: {
              res: res.bodyMap,
              formModel: data,
              flag: 1
            }
          })
        }
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
    }
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
