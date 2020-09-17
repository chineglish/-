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
<script>
/**
 * @name 小额定期借记业务签约确认
 * @date 2019-12-23
 * @auther 邓焕
 */
import { borrow_busi_type, borrow_busi_kind } from '@/assets/js/entity'
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'smallPeriodicDebitsContractConf',
  data () {
    return {
      formModel: {
        payerAccNoList: [], // 付款账户信息列表
        paymentActShow: '',
        collectionAct: '',
        businesstype: '',
        businesstind: '',
        feeAmt: '',
        receiptDays: '',
        payerAmt: '',
        detailsNum: '',
        uploadFile: []
      },
      breadData: ['财务管理', '小额定期借记业务签约'],
      // 以下为动态数据
      formConfigJson: {
        stepsActive: 1,
        formWidth: '50%',
        formItems: [
          {
            group: [
              {
                'disabled': true,
                'label': '收款账户',
                'type': 'text',
                'key': 'paymentActShow'
              },
              {
                'disabled': true,
                'label': '业务类型',
                'type': 'text',
                'key': 'businesstype'
              },
              {
                'disabled': true,
                'label': '业务种类',
                'type': 'text',
                'key': 'businesstind'
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
              },
              {
                'disabled': true,
                'label': '回执天数',
                'type': 'text',
                'key': 'receiptDays'
              },
              {
                'disabled': true,
                'label': '手续费',
                'type': 'text',
                'key': 'fee',
                formatter: (name, value) => util.formatCurrency(value)
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
      let _params = data
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        httpPost('/eweb-transfer.SmallLimitBorrow.do', {
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg,
          type: 'borrow',
          acNo: data.payerAccNoList[data.collectionAct].acNo,
          subAcNo: data.payerAccNoList[data.collectionAct].subAcNo,
          amount: data.payerAmt,
          count: data.detailsNum,
          fee: data.fee,
          receiptLimit: data.receiptDays,
          businessType: data.businessType,
          businessKind: data.businessKind,
          _tokenName: token._tokenName,
          filePath: data.filePath
        }).then(res => {
          Object.assign(_params, res)
          _params.JnlStatus = '1'
          this.$router.push({
            name: 'smallPeriodicDebitsContractResult',
            params: {
              msg: _params,
              res: res
            }
          })
        })
      })
    },
    gotoBack (data) {
      let _params = data
      this.$router.push({
        name: 'smallPeriodicDebitsContractPre',
        params: _params
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
      this.formModel.businesstype = util.handleEnums(borrow_busi_type, this.formModel.businessType)
      this.formModel.businesstind = util.handleEnums(borrow_busi_kind, this.formModel.businessKind)
    }
  }
}
</script>
