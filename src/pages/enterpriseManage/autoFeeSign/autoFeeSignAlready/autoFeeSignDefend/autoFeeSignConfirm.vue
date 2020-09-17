<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @back="back"
        @submit="submit"
        >
        <div style="width:100%" slot="function">
          <ul class="newFormUl">
              <li class="newFormLi">{{formModel.userId}}&nbsp;&nbsp;&nbsp;{{formModel.userName}}&nbsp;&nbsp;&nbsp;{{formModel.usbKeySn}}&nbsp;&nbsp;&nbsp;</li>
          </ul>
        </div>
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
export default {
  name: 'autoFeeSignConfirm',
  data () {
    return {
      newFormUl: [],
      titleData: ['企业管理台', '证书管理', '证书自动扣费签约'],
      formModel: {
        signAccount: '',
        opera: '',
        feeAmount: '',
        mobilePhone: ''
      },
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '23%',
            group: [
              {
                'disabled': true,
                'label': '签约缴费账号',
                'type': 'text',
                'key': 'signAccount'
              },
              {
                'disabled': true,
                'label': '操作员及证书',
                'type': 'text',
                'key': 'opera',
                'slotName': 'function'
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '60%',
            group: [
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
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    submit (data) {
      const [accNo, subAccNo, acName] = (this.formModel.signAccount || '').split('/')
      httpPost('/eweb-common.GenToken.do').then(token => {
        const singMsg = this.isSign({ _Data2Sign: data._Data2Sign, _authenticateType: data._authenticateType })
        httpPost('/eweb-enterprise.UpdateAutDedFeeSign.do', {
          payerAcNo: accNo,
          payerAcName: acName,
          payerSubAcNo: subAccNo,
          feeAmount: data.feeAmount,
          mobilePhone: data.mobilePhone,
          updateFeeList: data.updateFeeList,
          smsCode: data.smsCode,
          _dataMapKey: data._dataMapKey,
          _authenticateTypeChoose: data._authenticateType ? data._authenticateType[0] : '',
          CSIISignature: singMsg,
          _tokenName: token._tokenName
        }).then(res => {
          Object.assign(data, res)
          this.$router.push({
            name: 'autoFeeSignRes',
            params: data
          })
        })
      })
    },
    back (res) {
      this.$router.push({
        name: 'autoFeeSignDefend',
        params: res
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

<style scoped>
  .form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
  }
  .newFormLi{
      width: 50%;
      float: left;
  }
</style>
