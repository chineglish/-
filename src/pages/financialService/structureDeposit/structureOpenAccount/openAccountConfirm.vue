<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @submit="onSubmit"
        @back = "onBack"
      ></m-new-form>
    </div>
  </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { interest_type } from '@/assets/js/entity.js'
export default {
  name: 'openAccountConfirm',
  data () {
    return {
      transTime: '',
      formModel: {
        acNo: '',
        acName: '',
        turnAccName: '',
        balance: '',
        payeeAcNo: '',
        endDate: '',
        amount: '',
        struRates: '',
        interestType: '',
        contactName: '',
        // contactTel: '',
        contactPhone: ''
      },
      data: ['理财服务', '结构性存款', '结构性存款开户确认'],
      // 以下为动态数据
      formConfigJson: {
        formWidth: '50%',
        stepsActive: 1,
        // labelWidth: '100%',
        rules: {
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
              {
                'disabled': true,
                'label': '转出账户名称',
                'type': 'text',
                'key': 'acNoName'
              },
              {
                'disabled': true,
                'label': '余额',
                'type': 'text',
                textType: 'shy',
                'key': 'balance',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'label': '收付息账号',
                'key': 'payeeAcNo',
                'disabled': true,
                'type': 'text'
              },
              {
                'label': '收付息账户名称',
                'key': 'acNoInterestName',
                'disabled': true,
                'type': 'text'
              },
              {
                'label': '到期日期',
                'key': 'endDate',
                'disabled': true,
                'type': 'text',
                formatter: (key, value) => util.separationDate(value)
              },
              {
                'label': '购买金额',
                'key': 'amount',
                'disabled': true,
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'label': '年利率（%）',
                'key': 'struRates',
                'disabled': true,
                'type': 'text'
              },
              {
                'label': '付息方式',
                'key': 'interestType',
                'disabled': true,
                'type': 'text',
                formatter: (key, value) => util.handleEnums(interest_type, value)
              },
              {
                'label': '对账联系人',
                'key': 'contactName',
                'disabled': true,
                'type': 'text'
              },
              // {
              //   'label': '联系人电话',
              //   'key': 'contactTel',
              //   'disabled': true,
              //   'type': 'text'
              // },
              {
                'label': '联系人手机',
                'key': 'contactPhone',
                'disabled': true,
                'type': 'text'
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
      // 日期格式转换
      data.endDate = data.endDate.split('-').join('')
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params.formModel._Data2Sign,
          _authenticateType: this.$route.params.formModel._authenticateType })
        httpPost('/eweb-invest.StructuredDepositOpen.do', {
          ...data,
          _dataMapKey: this.$route.params.formModel._dataMapKey,
          _authenticateTypeChoose: this.$route.params.formModel._authenticateType ? this.$route.params.formModel._authenticateType[0] : '',
          CSIISignature: singMsg,
          balance: this.$route.params.formModel.balance,
          amount: this.$route.params.formModel.amount,
          _tokenName: token._tokenName }).then(res => {
          this.$router.push({
            name: 'openAccountRes',
            params: { ...data, ...res }
          })
        })
      })
    },
    onBack () {
      this.$router.push({
        name: 'openAccountInner',
        params: { formModel: this.$route.params.formModel }
      })
    }
  },
  created () {
    this.formModel.acNoName = this.$route.params.payerAccNoList[this.$route.params.formModel.acNo].acName
    this.formModel.acNo = this.$route.params.payerAccNoList[this.$route.params.formModel.acNo].acNo
    this.formModel.acNoInterestName = this.$route.params.payerAccNoList[this.$route.params.formModel.payeeAcNo].acName
    this.formModel.payeeAcNo = this.$route.params.payerAccNoList[this.$route.params.formModel.payeeAcNo].acNo
    this.formModel.interestType = this.$route.params.formModel.interestType
    this.formModel.balance = this.$route.params.formModel.balance
    this.formModel.endDate = this.$route.params.formModel.endDate
    this.formModel.amount = this.$route.params.formModel.amount
    this.formModel.struRates = this.$route.params.formModel.struRates
    this.formModel.contactName = this.$route.params.formModel.contactName
    // this.formModel.contactTel = this.$route.params.formModel.contactTel
    this.formModel.contactPhone = this.$route.params.formModel.contactPhone
  }
}
</script>

<style  scoped>
    .form-box{
        width :1120px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    }
</style>
