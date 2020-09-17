<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <div class="form-box">
        <m-new-form :componentJson="formConfigJson"
                :formModel="formModel"
                :btnData="btnData"
                :isDisabled="doSubmit"
                @submit="onSubmit"
                @back="onBack">
        </m-new-form>
    </div>
  </d2-container>
</template>
<script>
/**
 *@name: 公司内部转账确认页
 * @author: 梁文彬
 * @date: 2019-12-9
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'innerCompanyTransConf',
  data () {
    return {
      formModel: {
        payerAcNo: '',
        payerAcName: '',
        payerBankAcc: '',
        payeeAcNo: '',
        payeeAcName: '',
        payeeBankDeptName: '',
        amount: '',
        remitModel: '0',
        postscript: ''
      },
      data: ['转账汇款', '公司内部转账'],
      // 以下为动态数据
      transTime: '',
      formConfigJson: {
        stepsActive: 1,
        formWidth: '50%',
        formItems: [{
          title: '付款信息',
          group: [
            {
              'disabled': true,
              'label': '付款账号',
              'type': 'text',
              'key': 'payerAcNo'
            },
            {
              'disabled': false,
              'label': '可用余额',
              'type': 'text',
              'key': 'balance',
              textType: 'shy',
              formatter: (key, value) => util.formatCurrency(value)
            },
            {
              'disabled': true,
              'label': '付款账户名称',
              'type': 'text',
              'key': 'payerAcName'
            },
            {
              'disabled': false,
              'label': '付款账户开户行',
              'type': 'text',
              'key': 'payerBankAcc'
            }
          ]
        }, {
          title: '收款信息',
          group: [
            {
              'disabled': true,
              'label': '收款账号',
              'type': 'text',
              'key': 'payeeAcNo'
            }, {
              'disabled': true,
              'label': '收款账户名称',
              'type': 'text',
              'key': 'payeeAcName'
            }, {
              'disabled': true,
              'label': '收款账号开户行',
              'type': 'text',
              'key': 'payeeBankDeptName'
            }
          ]
        }, {
          title: '交易信息',
          group: [
            {
              'showCapital': true,
              'disabled': true,
              'label': '转账金额',
              'type': 'text',
              'key': 'amount',
              formatter: (name, value) => util.formatCurrency(value)
            },
            {
              'disabled': false,
              'label': '金额大写',
              'type': 'text',
              'key': 'capitalMoney'
            },
            {
              'disabled': true,
              'label': '附言',
              'type': 'text',
              'key': 'postscript'
            }
          ]
        }]
      },
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      doSubmit: true
    }
  },
  methods: {
    onSubmit (formModel) {
      let _params = { ...this.formModel, ...formModel }
      /**
       * 发送接口数据
       */
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: formModel._Data2Sign, _authenticateType: formModel._authenticateTypeChoose })
      // if (this.$route.params.pareeSubAcNo !== '000156') {
      //   formModel.payeeAcNo = formModel.payeeAcNo + this.$route.params.pareeSubAcNo
      // }
        httpPost('eweb-transfer.InnerTransfer.do', {
          _dataMapKey: formModel._dataMapKey,
          _authenticateTypeChoose: formModel._authenticateTypeChoose,
          CSIISignature: singMsg,
          payerAcNo: formModel.payerAcNo,
          payerAcName: formModel.payerAcName,
          payerSubAcNo: formModel.payerSubAcNo,
          payeeAcNo: formModel.payeeAcNo,
          payeeAcName: formModel.payeeAcName,
          payeeSubAcNo: this.$route.params.pareeSubAcNo,
          amount: formModel.amount,
          remark: '公司内部转账',
          postscript: formModel.postscript,
          processFlag: '1',
          remitModel: '0',
          payeeBankDeptId: formModel.payeeBankDeptId,
          payeeBankDeptName: formModel.payeeBankDeptName,
          trsType: formModel.trsType,
          _tokenName: token._tokenName
        }).then(res => {
          console.log('111111', res)
          // _params.JnlStatus = '1'
          _params.JnlStatus = res._processState
          _params._jnlNo = res._jnlNo
          _params.transTime = res._transTime
          this.$router.push({
            name: 'innerCompanyTransResult',
            params: {
              ...res,
              msg: _params
            }
          })
        }).catch(e => {
          /* _params.JnlStatus = '0'
          this.$router.push({
            name: 'innerCompanyTransResult',
            params: {
              msg: _params,
              transTime: this.transTime
            }
          }) */
        })
      })
    },
    onBack (data) {
      this.$router.push({
        name: 'innerCompanyTransPre',
        params: data
      })
    }
  },
  created () {
    this.formModel = this.$route.params
    console.log(this.formModel.amount, this.formModel.capitalMoney)
  }
}
</script>
<style scoped>
  .form-box{
    width :1120px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  }
</style>
