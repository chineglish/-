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
          <ul class="newFormUl" v-for="item in newFormUl" :key="item.userId">
            <li class="newFormLi">{{item.userId}}&nbsp;&nbsp;&nbsp;{{item.userName}}&nbsp;&nbsp;&nbsp;{{item.keyId}}</li>
          </ul>
        </div>
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
export default {
  name: 'confirmSign',
  data () {
    return {
      newFormUl: [],
      titleData: ['企业管理台', '证书管理', '证书自动扣费签约'],
      formModel: {
        signAccount: '',
        operator: '',
        payStanderd: '',
        phone: ''
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
                'label': '签约缴费账户',
                'type': 'text',
                'key': 'signAccount'
              },
              {
                'disabled': true,
                'label': '已选择的操作员',
                'type': 'text',
                'key': 'operator',
                // 'options': []
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
                'key': 'payStanderd'
              },
              {
                'disabled': true,
                'label': '扣费提前通知手机号',
                'type': 'text',
                'key': 'phone'
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
    submit (res) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        const signInfo = this.getSignInfo()
        const singMsg = this.isSign({ _Data2Sign: res._Data2Sign, _authenticateType: res._authenticateType }, signInfo)
        httpPost('/eweb-enterprise.AutDedFeeSign.do', {
          ...res,
          _authenticateTypeChoose: res._authenticateType ? res._authenticateType[0] : '',
          _dataMapKey: res._dataMapKey,
          CSIISignature: singMsg,
          _tokenName: token._tokenName
        }).then(resSub => {
          this.objectCon = resSub
          let theDate = new Date()
          this.$router.push({
            name: 'resultSign',
            params: {
              formModel: res,
              resSub: this.objectCon,
              transDate: theDate
            }
          })
        }).catch(sub => {
        })
      })
    },
    back (res) {
      this.$router.push({
        name: 'innerSign',
        params: { data: this.$route.params }
      })
    }
  },
  created () {
    this.formModel = this.$route.params
    this.formModel.signAccount = this.formModel.payerAcNo + '/' + this.formModel.payerAcName
    this.formModel.payStanderd = this.formModel.feeAmount
    this.formModel.phone = this.formModel.mobilePhone
    this.newFormUl = this.formModel.signFeeList
  }
}
</script>

<style scoped>
  .form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
  }
  .newFormLi{
      margin-left: 15px;
      width: 45%;
      float: left;
  }
</style>
