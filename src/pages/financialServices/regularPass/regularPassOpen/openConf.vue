<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @submit="submit"
        @back="back">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 *@name: 定期通开户-确认
 * @author: 梁文彬
 * @date: 2019-12-20
 */
import { httpPost } from '@/api/sys/http'
import { interest_type, usualDate } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'openConf',
  data () {
    return {
      titleData: ['理财服务 ', '定期通', '定期通开户'],
      formModel: {
        availBal: '',
        payerAcNo: '',
        nomExpire: '',
        preDrawStartDate: '',
        openAcNoAmount: '',
        depositRate: '',
        interestType: '',
        contactName: '',
        // contactTel: '',
        contactMobile: '',
        payerAcName: ''
      },
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '40%',
            group: [
              {
                'disabled': true,
                'label': '转出账号',
                'type': 'text',
                'key': 'payerAcNo'
              }, {
                'disabled': true,
                'label': '转出账户名称',
                'type': 'text',
                'key': 'payerAcName'
              }, {
                'disabled': true,
                'label': '名义期限',
                'type': 'text',
                'key': 'nomExpire',
                formatter: (key, value) => util.handleEnums(usualDate, value)
              }, {
                'disabled': true,
                'label': '提前支取开始日期',
                'type': 'text',
                'key': 'preDrawStartDate'
              }, {
                'disabled': true,
                'label': '开户金额',
                'type': 'text',
                'key': 'openAcNoAmount',
                formatter: (key, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '存入利率',
                'type': 'text',
                'key': 'depositRate'
              }, {
                'disabled': true,
                'label': '付息方式',
                'type': 'text',
                'key': 'interestType',
                formatter: (key, value) => util.handleEnums(interest_type, value)
              }, {
                'disabled': true,
                'label': '对账联系人',
                'type': 'text',
                'key': 'contactName'
              // }, {
              //   'disabled': true,
              //   'label': '联系人电话',
              //   'type': 'text',
              //   'key': 'contactTel'
              }, {
                'disabled': true,
                'label': '联系人手机',
                'type': 'text',
                'key': 'contactMobile'
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
    submit (params) {
      let _params = params
      this.amount = _params.openAcNoAmount
      /**
       * 发送接口数据
       */
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.formModel._Data2Sign, _authenticateType: this.formModel._authenticateType })
        httpPost('/eweb-invest.OpenRegularAcNo.do', {
          ...this.formModel,
          amount: this.amount,
          _dataMapKey: this.formModel._dataMapKey,
          _authenticateTypeChoose: this.formModel._authenticateType ? this.formModel._authenticateType[0] : '',
          CSIISignature: singMsg,
          _tokenName: token._tokenName
        }).then(res => {
          this.$router.push({
            name: 'openRes',
            params: {
              transName: '定期通开户',
              nomExpire: util.handleEnums(usualDate, this.$route.params.data.nomExpire),
              payerAcNo: this.formModel.payerAcNo,
              payerAcName: this.formModel.payerAcName,
              transMoney: this.$route.params.data.openAcNoAmount,
              depositRate: this.$route.params.data.depositRate,
              interestType: util.handleEnums(interest_type, this.$route.params.data.interestType),
              res
            }
          })
        })
      })
    },
    back (data) {
      this.$router.push({
        name: 'openPre',
        params: {
          data
        }
      })
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params.data)
      const [payerAcNo, payerSubAcNo, payerAcName] = (this.$route.params.data.payerAcNo || '').split('/')
      this.formModel.payerAcNo = payerAcNo
      this.formModel.payerSubAcNo = payerSubAcNo
      this.formModel.payerAcName = payerAcName
      this.formModel.amount = this.$route.params.amount
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
