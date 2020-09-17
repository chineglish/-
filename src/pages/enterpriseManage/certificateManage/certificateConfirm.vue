<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-steps :data="stepData"></m-steps>
    <d-form-previewer
      :form-struction="formStruction"
      :form-model="formModel"
      :action-data="actionData"
      :config="config">
    </d-form-previewer>
  </d2-container>
</template>

<script type="text/javascript">
import { httpPost } from '../../../api/sys/http'
export default {
  name: 'certificateConfirm',
  data: function () {
    return {
      data: ['企业管理', '证书管理', '缴费确认'],
      config: {
        columns: 2
      },
      stepData: {
        stepsActive: 1
      },
      formStruction: {
        groups: [
          {
            formItems: [
              {
                label: '缴费账号',
                fieldName: 'payerAcNo'
              },
              {
                label: '账户名称',
                fieldName: 'payerAcName'
              },
              {
                label: '缴费操作员号',
                fieldName: 'feesUserId'
              },
              {
                label: '缴费金额',
                fieldName: 'amount'
              },
              {
                label: '证书编号',
                fieldName: 'payCertNo'
              },
              {
                label: '摘要',
                fieldName: 'fundUsage'
              }
            ]
          }
        ]
      },
      formModel: {
        payerAcNo: '',
        payerAcName: '',
        feesUserId: '',
        amount: '',
        payCertNo: '',
        fundUsage: ''
      },
      actionData: [
        { btnText: '确定', class: 'm-submit-btn', handler: this.printHandler },
        { btnText: '返回', class: 'm-cancel-btn', handler: this.backHandler }
      ]
    }
  },
  methods: {
    printHandler (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        const signInfo = this.getSignInfo()
        const singMsg = this.isSign({ _Data2Sign: data._Data2Sign, _authenticateType: data._authenticateType }, signInfo)
        httpPost('/eweb-enterprise.CertFees.do', {
          _dataMapKey: data._dataMapKey,
          _authenticateTypeChoose: data._authenticateType ? data._authenticateType[0] : '',
          CSIISignature: singMsg,
          payerAcNo: this.formModel.payerAcNo,
          payerSubAcNo: this.formModel.payerSubAcNo,
          payerAcName: this.formModel.payerAcName,
          feesUserId: this.formModel.feesUserId,
          amount: this.formModel.amount,
          payCertNo: this.formModel.payCertNo,
          fundUsage: this.formModel.fundUsage,
          feesUserName: this.formModel.feesUserName,
          feesUserSeq: this.formModel.feesUserSeq,
          _tokenName: token._tokenName
        }).then(res => {
          this.$router.push({
            name: 'certificateResolve',
            params: {
              formModel: {
                transName: '证书缴费',
                payerAcNo: this.formModel.payerAcNo,
                payerAcName: this.formModel.payerAcName,
                feesUserId: this.formModel.feesUserId,
                amount: this.formModel.amount,
                payCertNo: this.formModel.payCertNo,
                feesUserName: this.formModel.feesUserName,
                feesUserSeq: this.formModel.feesUserSeq,
                fundUsage: this.formModel.fundUsage,
                res
              }
            }
          })
        }).catch(res => {
        })
      })
    },
    backHandler () {
      this.$router.push({
        name: 'certificateRenewal',
        params: {
          formModel: this.$route.params.formModel
        }
      })
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params.formModel)
    }
  },
  components: {}
}
</script>
