<template>
    <d2-container>
        <m-breadcrumb :data="data"></m-breadcrumb>
        <div class="form-box">
            <m-new-form :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @submit="onSubmit"
                @back="onBack">
            </m-new-form>
        </div>
    </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { usualDate, extendFlg_Type } from '@/assets/js/entity.js'
// import { Sign } from '@/assets/js/SignMsg'
import util from '@/libs/util'
export default {
  name: 'confirmCurrentToTerm',
  data () {
    return {
      // accountBalance: '0',
      formModel: {
        acNo: '',
        acNoName: '',
        interestId: '',
        amount: '',
        interestType: '1',
        extendFlg: '',
        contactName: '',
        contactTel: '',
        contactPhone: '',
        interestName: ''
      },
      data: ['理财服务', '定活互转', '活期转定期'],
      // 以下为动态数据
      formConfigJson: {
        formWidth: '50%',
        stepsActive: 1,
        // labelWidth: '100%',
        rules: {},
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '转出账号',
                'type': 'text',
                'key': 'acNo'
              },
              {
                'disabled': true,
                'label': '转出账户名称',
                'type': 'text',
                'key': 'acNoName'
              },
              { 'disabled': true,
                'label': '存期',
                'type': 'text',
                'key': 'interestId',
                formatter: (key, value) => util.handleEnums(usualDate, value)
              },
              {
                'disabled': false,
                'label': '转存金额(元)',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '付息方式',
                'type': 'text',
                'key': 'interestName' },
              {
                'disabled': true,
                'label': '到期是否自动转存',
                'type': 'text',
                'key': 'extendFlg',
                formatter: (key, value) => util.handleEnums(extendFlg_Type, value)
              },
              {
                'disabled': true,
                'label': '对账联系人',
                'type': 'text',
                'key': 'contactName'
              },
              // {
              //   'disabled': true,
              //   'label': '联系人电话',
              //   'type': 'text',
              //   'key': 'contactTel'
              // },
              {
                'disabled': true,
                'label': '联系人手机',
                'type': 'text',
                'key': 'contactPhone'
              }
            ]

          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    onSubmit (data) {
      const _params = data
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: data._Data2Sign, _authenticateType: data._authenticateType })
        // Sign(data._Data2Sign, signInfo)
        httpPost('/eweb-invest.CurrentRegular.do', {
          _dataMapKey: data._dataMapKey,
          _authenticateTypeChoose: data._authenticateType ? data._authenticateType[0] : '',
          CSIISignature: singMsg,
          acNo: data.acNo,
          acNoName: data.acNoName,
          balance: data.balance,
          interestId: data.interestId,
          amount: data.amount,
          interestType: data.interestType,
          extendFlg: data.extendFlg,
          contactName: data.contactName,
          contactTel: data.contactTel,
          contactPhone: data.contactPhone,
          _tokenName: token._tokenName
        }).then(res => {
          Object.assign(_params, res)
          this.$router.push({
            name: 'resultCurrentToTerm',
            params: {
              data: _params,
              res: res,
              ...this.$route.params
            }
          })
        }).catch(() => {
          // _params._JnlStatus = '0'
          // this.$router.push({
          //   name: 'resultCurrentToTerm',
          //   params: {
          //     data: _params,
          //     res: err
          //   }
          // })
        })
      })
    },
    onBack (params) {
      this.$router.push({
        name: 'innerCurrentToTerm',
        params: { formModel: params }
      })
    },
    formatter (object, key) {
      if (Array.isArray(object)) {
        let arr = object.find(item => item.value === key)
        return arr.label
      } else {
        return object[key]
      }
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
