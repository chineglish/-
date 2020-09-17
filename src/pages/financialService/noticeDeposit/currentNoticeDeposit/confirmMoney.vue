<template>
    <d2-container>
        <m-breadcrumb :data="data"></m-breadcrumb>
        <div class="form-box">
            <m-new-form :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @submit="onSubmit"
                @back = "onBack">
            </m-new-form>
        </div>
    </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
// import { Sign } from '@/assets/js/SignMsg'
import util from '@/libs/util'

export default {
  name: 'confirmMoney',
  data () {
    return {
      transTime: '',
      formModel: {
        acNo: '',
        accountMoney: '',
        payMoney: '',
        notificationType: '',
        contactName: '',
        contactTel: ''
      },
      data: ['理财服务', '通知存款', '活期转通知存款'],
      // 以下为动态数据
      formConfigJson: {
        formWidth: '50%',
        stepsActive: 1,
        // labelWidth: '100%',
        rules: {
          acNo: [{ required: true, message: '转出账号', trigger: 'change' }],
          accountMoney: [{ required: true, message: '可用余额', trigger: 'change' }],
          amount: [{ required: true, message: '金额', trigger: 'change' }],
          notificationType: [{ required: true, message: '通知类型', trigger: 'change' }],
          contactName: [{ required: true, message: '对账联系人', trigger: 'change' }],
          contactTel: [{ required: true, message: '联系人电话', trigger: 'change' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '转出账号',
                'type': 'text',
                'key': 'acNo'
              },
              { 'disabled': true,
                'label': '金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '通知类型',
                'type': 'radio',
                'options': [{ 'value': '一天', 'key': '1D' }, { 'value': '七天', 'key': '7D' }],
                'key': 'notificationType'
              },
              {
                'disabled': true,
                'label': '对账联系人',
                'type': 'text',
                'key': 'contactName'
              },
              {
                'disabled': true,
                'label': '联系人电话',
                'type': 'text',
                'key': 'contactTel'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ] }
  },
  methods: {
    onSubmit (data) {
      const _params = {
        acNo: data.acNo,
        amount: data.amount,
        balance: data.accountMoney,
        notificationType: data.notificationType,
        contactName: data.contactName,
        contactTel: data.contactTel,
        _Data2Sign: data._Data2Sign,
        _authenticateType: data._authenticateType
      }
      _params._transTime = data._transTime
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: data._Data2Sign, _authenticateType: data._authenticateType })
        httpPost('/eweb-invest.DemandNotification.do', {
          _dataMapKey: data._dataMapKey,
          _authenticateTypeChoose: data._authenticateType ? data._authenticateType[0] : '',
          CSIISignature: singMsg,
          acNo: data.acNo,
          amount: data.amount,
          balance: data.accountMoney,
          notificationType: data.notificationType,
          contactName: data.contactName,
          contactTel: data.contactTel,
          _tokenName: token._tokenName
        }).then(res => {
          _params._JnlStatus = res._processState
          _params._jnlNo = res._jnlNo
          _params.transDate = res._transTimes
          this.$router.push({
            name: 'resultMoney',
            params: {
              data: _params,
              res: res
            }
          })
        }).catch(() => {
          // _params._JnlStatus = '0'
          // this.$router.push({
          //   name: 'resultMoney',
          //   params: {
          //     data: _params,
          //     res: err
          //   }
          // })
        })
      })
    },
    onBack () {
      this.$router.push({
        name: 'innerMoney',
        params: this.$route.params
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

<style  scoped>
    .form-box{
        width :1120px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    }
</style>
