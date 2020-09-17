<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @submit="onSubmit"
      @cancel="cancel">
    </m-new-form>
  </d2-container>
</template>
<script>
/**
 *@name: 大额存单申购-确认页
 * @author: 梁文彬
 * @date: 2019-12-19
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'purchaseConf',
  data () {
    return {
      formModel: {
        depositCode: '',
        prdBatchName: '',
        annualRate: '',
        productTerm: '',
        interestPay: '',
        withdrawal: '',
        unUserLimitAmount: '',
        payeeAccNo: '',
        payerAccName: '',
        transMoney: '',
        reconciliationMan: '',
        telephone: ''
      },
      data: ['理财服务 ', '大额存单', '单位大额存单申购'],
      formConfigJson: {
        stepsActive: 1,
        formItems: [{
          formWidth: '50%',
          labelWidth: '25%',
          title: '产品信息',
          group: [{
            'disabled': true,
            'label': '大额存单产品期次编号',
            'type': 'text',
            'key': 'depositCode'
          }, {
            'disabled': true,
            'label': '产品名称',
            'type': 'text',
            'key': 'prdBatchName'
          }, {
            'disabled': true,
            'label': '年利率',
            'type': 'text',
            'key': 'annualRate',
            formatter: (key, value) => {
              return Number(value) + '%'
            }
          }, {
            'disabled': true,
            'label': '产品期限',
            'type': 'text',
            'key': 'productTerm'
          }, {
            'disabled': true,
            'label': '利息支付方式',
            'type': 'text',
            'key': 'interestPay'
          }, {
            'disabled': true,
            'label': '支取标识',
            'type': 'text',
            'key': 'withdrawal'
          }, {
            'disabled': true,
            'label': '剩余额度',
            'type': 'text',
            textType: 'shy',
            'key': 'unUserLimitAmount',
            formatter: (key, value) => util.formatCurrency(value)
          }]
        }, {
          formWidth: '50%',
          labelWidth: '25%',
          title: '交易信息',
          group: [{
            'disabled': true,
            'label': '转出账号',
            'type': 'text',
            'key': 'payeeAccNo'
          }, {
            'disabled': true,
            'label': '转出账户名称',
            'type': 'text',
            'key': 'payerAccName'
          }, {
            'disabled': true,
            'label': '交易金额',
            'type': 'text',
            'key': 'transMoney',
            formatter: (name, value) => util.formatCurrency(value)
          }, {
            'disabled': true,
            'label': '对账联系人',
            'type': 'text',
            'key': 'reconciliationMan'
          }, {
            'disabled': true,
            'label': '联系人电话',
            'type': 'text',
            'key': 'telephone'
          }]
        }]
      },
      btnData: [{ btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'cancel' }]
    }
  },
  methods: {
    onSubmit (data) {
      /**
       * 发送接口数据
       */
      let _params = data
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: data._Data2Sign, _authenticateType: data._authenticateType })
        httpPost('/eweb-largeDeposit.LargeProductBuy.do', {
          _dataMapKey: data._dataMapKey,
          _authenticateTypeChoose: data._authenticateType ? data._authenticateType[0] : '',
          CSIISignature: singMsg,
          acNo: data.payeeAccNo,
          accName: data.payerAccName,
          prdBatchName: data.prdBatchName,
          prdBatchCode: data.depositCode,
          amount: data.transMoney,
          actualRate: data.annualRate,
          interestCode: data.interestCode,
          miangeee: data.addAmount,
          linkman: data.reconciliationMan,
          linkmanPhone: data.telephone,
          depositTerm: data.depositTerm,
          interestFrequency: data.interestFrequency,
          accountClassify: data.accountClassify,
          accountProperty: data.accountProperty,
          interestPayWay: data.interestPayWay,
          isAllowAdvancedDraw: data.isAllowAdvancedDraw,
          unUserLimitAmount: data.unUserLimitAmount,
          _tokenName: token._tokenName
        }).then(res => {
          Object.assign(_params, res)
          _params._JnlStatus = res._processState // (_JnlStatus是跳转页面路由传值给_JnlStatus的值)
          _params._jnlNo = res._jnlNo // 流水号
          this.$router.push({
            name: 'purchaseRes',
            params: {
              msg: _params
            }
          })
        }).catch(e => {
          // _params.JnlStatus = '0'
          // this.$router.push({
          //   name: 'purchaseRes',
          //   params: {
          //     msg: _params
          //   }
          // })
        })
      })
    },
    cancel (data) {
      this.$router.push({
        name: 'purchasePre',
        params: this.formModel
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
