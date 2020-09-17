<template>
    <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @submit="onSubmit"
                    @gotoBack="gotoBack"
            >
            </m-new-form>
        </div>
    </d2-container>
</template>
<script>/**
     * @name 小额定期贷记业务
     * @date 2019-12-21
     * @auther 邓焕
     */

import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: 'smallRatedCreditBusinessContractConf',
  data () {
    return {
      formModel: {
        paymentAct: '',
        businessType: '',
        businessKind: '',
        outprotocalno: '',
        feeAmt: '',
        feeamount: '',
        payerAmt: '',
        detailsNum: '',
        uploadFile: []
      },
      breadData: ['财务管理', '小额定期贷记业务'],
      // 以下为动态数据
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '付款账户',
                'type': 'text',
                'key': 'payeracc'
              },
              {
                'disabled': true,
                'label': '业务类型',
                'type': 'text',
                'key': 'businessType'
              },
              {
                'disabled': true,
                'label': '业务种类',
                'type': 'text',
                'key': 'businessKind'
              },
              {
                'disabled': true,
                'label': '合同(协议)号',
                'type': 'text',
                'key': 'outprotocalno'
              },
              {
                'disabled': true,
                'label': '单笔手续费',
                'type': 'text',
                'key': 'singleFee',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '手续费',
                'type': 'text',
                'key': 'fee',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '支付金额',
                'type': 'text',
                'key': 'payerAmt',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '明细笔数',
                'type': 'text',
                'key': 'detailsNum'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'gotoBack' }
      ]
    }
  },
  methods: {
    onSubmit (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: data._Data2Sign, _authenticateType: data._authenticateType })
        httpPost('/eweb-transfer.SmallLimitLead.do', {
          _dataMapKey: data._dataMapKey,
          _authenticateTypeChoose: data._authenticateType ? data._authenticateType[0] : '',
          CSIISignature: singMsg,
          type: 'lead',
          protocalNo: data.outprotocalno,
          acNo: data.payeracc,
          payerSubAcNo: data.subAcNo,
          amount: data.payerAmt,
          count: data.detailsNum,
          singleFee: data.singleFee,
          fee: data.fee,
          businessType: data.busitype,
          businessKind: data.busikind,
          _tokenName: token._tokenName,
          filePath: data.filePath
        }).then(res => {
          this.$router.push({
            name: 'smallRatedCreditBusinessContractResult',
            params: {
              msg: data,
              res: res
            }
          })
        }).catch(e => {})
      })
    },
    gotoBack () {
      this.$router.push({
        name: 'smallRatedCreditBusinessContractPre',
        params: { data: this.$route.params.formModel }
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
      // this.formModel.feeAmt = util.formatCurrency(this.formModel.feeamount)
      // this.formModel.payerAmtShow = util.formatCurrency(this.formModel.payerAmt)
    }
  }
}
</script>
