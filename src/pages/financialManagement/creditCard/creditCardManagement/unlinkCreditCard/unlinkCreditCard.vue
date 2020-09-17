<template>
    <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
            <m-new-form
              :componentJson="formConfigJson"
              :formModel="formModel"
              :btnData="btnData"
              :isDisabled="doSubmit"
              @submit="onSubmit"
              @back="onBack">
            </m-new-form>
    </d2-container>
</template>
<script>

import { httpPost } from '@/api/sys/http'

export default {
  name: 'unlinkCreditCardResult',
  data () {
    return {
      formModel: {
        acNo: '',
        acName: ''
      },
      breadData: ['财务管理', '信用卡', '信用卡解挂'],
      // 以下为动态数据
      formConfigJson: {
        // formWidth: '100%',
        stepsActive: 0,
        stepsData: [
          '解挂信息录入 ',
          '解挂结果'
        ],
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '信用卡号',
                'type': 'text',
                'key': 'acNo'
              },
              {
                'disabled': false,
                'label': '持卡人姓名',
                'type': 'text',
                'key': 'acName'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      doSubmit: true
    }
  },
  methods: {
    onSubmit (data) {
      let _params = { ...data }
      httpPost('/eweb-transfer.CreditCardDelConfirm.do', {
        acNo: _params.acNo
      }).then(conf => {
        httpPost('/eweb-common.GenToken.do').then(token => {
          httpPost('/eweb-transfer.CreditCardDel.do', {
            acNo: this.$route.params.acNo,
            _tokenName: token._tokenName,
            _dataMapKey: conf._dataMapKey
          }).then(del => {
            _params.tradeName = '信用卡解挂'
            _params.creditCardNum = this.$route.params.acNo
            _params.cardHolderName = this.$route.params.acName
            _params._JnlStatus = del._processState
            _params._jnlNo = del._jnlNo
            _params.transDate = del._transTime
            this.$router.push({
              name: 'unlinkCreditCardResult',
              params: _params
            })
          })
        })
      })
    },
    onBack (data) {
      this.$router.push({
        name: 'creditCardManagement'
      })
    }
  },
  created () {
    this.formModel = this.$route.params
  }
}
</script>
