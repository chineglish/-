<template>
    <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          :msgs="promptList"
          @reset="onreset"
          @submit="onSubmit"
          @gotoBack="gotoBack"
        >
        </m-new-form>
    </d2-container>
</template>
<script>
/**
   * @name 文件上传
   * @date 2019-12-09
   * @auther 邓焕
   */
import { httpPost } from '@/api/sys/http'

export default {
  name: 'linkCreditCard',
  data () {
    return {
      formModel: {
        creditCardNum: ''
      },
      breadData: ['财务管理', '信用卡', '信用卡加挂'],
      // 以下为动态数据
      formConfigJson: {
        stepsActive: 0,
        stepsData: [
          '信息录入 ',
          '提交结果'
        ],
        rules: {
          creditCardNum: [{ required: true, message: '请输入信用卡号', trigger: 'change' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '信用卡号',
                'type': 'input',
                'key': 'creditCardNum'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-submit-btn', clickEventName: 'reset' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'gotoBack' }
      ],
      promptList: [
        '1.信用卡加挂仅支持绑定本公司名下的公司信用卡；',
        '2.请不要加挂非对公信用卡、非本公司信用卡；'
      ]
    }
  },
  methods: {
    onSubmit (params) {
      httpPost('/eweb-transfer.CreditCardAddConfirm.do', { acNo: params.creditCardNum }).then(res => {
        this.acName = res.acName
        this.companyNo = res.companyNo
        let _params = params
        _params.tradeName = '信用卡加挂'
        _params.cardHolderName = res.acName
        httpPost('/eweb-common.GenToken.do').then(token => {
          httpPost('/eweb-transfer.CreditCardAdd.do', {
            acNo: params.creditCardNum,
            _tokenName: token._tokenName,
            _dataMapKey: res._dataMapKey
          }).then(sub => {
            _params._JnlStatus = sub._processState
            _params._jnlNo = sub._jnlNo
            _params.transDate = sub._transTime
            this.$router.push({
              name: 'linkCreditCardResult',
              params: _params
            })
          }).catch(sub => {})
        })
      })
    },
    onreset (res) {
      res = this.formModel
    },
    gotoBack () {
      this.$router.push('./creditCardManagement')
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
    }
    this.formModel.contractNo = '1555515'
  }
}
</script>

<style scoped>

    .main {
        width: 52%;
        margin-left: 24%;
    }

    .form-box {
        width: 90%;
        margin-left: 5%;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.20);
    }
</style>
