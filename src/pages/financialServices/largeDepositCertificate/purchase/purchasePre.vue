<template>
    <d2-container>
        <m-breadcrumb :data="data"></m-breadcrumb>
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          @changeUp="changeUp"
          @submit="onSubmit"
          @cancel="cancel"
          @selectAcc='selectAcc'>
        </m-new-form>
    </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { saveDate, payerRate, drawType } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'purchasePre',
  data () {
    return {
      payerAccNoList: [], // 付款账户信息列表
      formModel: {
        depositCode: '',
        prdBatchName: '',
        annualRate: '',
        productTerm: '',
        interestPay: '',
        withdrawal: '',
        unUserLimitAmount: '',
        payeeAccNo: '',
        balance: '',
        payerAccName: '',
        transMoney: '',
        reconciliationMan: '',
        telephone: ''
      },
      data: ['理财服务 ', '大额存单', '单位大额存单申购'],
      formConfigJson: {
        stepsActive: 0,
        rules: {
          payeeAccNo: [{ required: true, message: '转出账户', trigger: 'submit' }],
          transMoney: [{ required: true, message: '交易金额', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
              if (reg.test(value) === true) {
                if (parseFloat(value) < 10000000) {
                  callback(new Error('金额不能小于10000000'))
                } else if (parseFloat(value) > parseFloat(this.formModel.unUserLimitAmount)) {
                  callback(new Error('剩余额度不足'))
                } else if (parseFloat(value) > parseFloat(this.formModel.balance)) {
                  callback(new Error('可用余额不足'))
                } else { callback() }
              } else {
                callback(new Error('金额输入错误'))
              }
            },
            trigger: 'submit' }],
          reconciliationMan: [{ required: true, message: '对账联系人', trigger: 'submit' }],
          telephone: [
            { required: true, message: '联系人电话', trigger: 'submit' },
            { validator: (rule, value, callback) => util.verifyMobile(value, callback), trigger: 'submit' }
          ]
        },
        formItems: [{
          formWidth: '50%',
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
            'label': '年利率(%)',
            'type': 'text',
            'key': 'annualRate'
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
            'label': '认购起点金额',
            'type': 'text',
            'key': 'startBuyAmount',
            formatter: (key, value) => util.formatCurrency(value)
          }, {
            'disabled': true,
            'label': '金额增量',
            'type': 'text',
            'key': 'addAmount',
            formatter: (key, value) => util.formatCurrency(value)
          }, {
            'disabled': true,
            'label': '剩余额度',
            'type': 'text',
            // textType: 'shy',
            'key': 'unUserLimitAmount',
            formatter: (key, value) => util.formatCurrency(value)
          }]
        }, {
          formWidth: '50%',
          labelWidth: '25%',
          title: '交易信息',
          group: [{
            'disabled': false,
            'label': '转出账户',
            'type': 'select',
            'options': [],
            'key': 'payeeAccNo',
            'changeEventName': 'selectAcc'
          }, {
            'disabled': true,
            'label': '可用余额',
            'type': 'text',
            textType: 'shy',
            'key': 'balance',
            formatter: (name, value) => util.formatCurrency(value)
          }, {
            'disabled': true,
            'label': '转出账户名称',
            'type': 'text',
            'key': 'payerAccName'
          }, {
            'disabled': false,
            'label': '交易金额',
            'type': 'input',
            'key': 'transMoney',
            // maxlength: 13,
            inputType: 'money',
            keydownEventName: 'limitMoneyInputKeyDown',
            // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
            'inputEventName': 'changeUp'
          }, {
            'disabled': false,
            'label': '对账联系人',
            'type': 'input',
            maxlength: 10,
            'key': 'reconciliationMan'
          }, {
            'disabled': false,
            'label': '联系人手机号',
            'type': 'input',
            'key': 'telephone'
          }]
        }]
      },
      btnData: [
        { btnText: '购买', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '取消', class: 'm-cancel-btn', clickEventName: 'cancel' }
      ]
    }
  },
  methods: {
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.transMoney = util.limitInputMoney(res.transMoney)
    },
    onSubmit (data) {
      const params = {
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
        unUserLimitAmount: data.unUserLimitAmount
      }
      httpPost('/eweb-largeDeposit.LargeProductBuyConfirm.do', params).then(res => {
        Object.assign(data, res)
        let Numoney = Number(data.transMoney / this.formModel.addAmount)
        if ((/(^[1-9]\d*$)/.test(Numoney))) {
          this.$router.push({
            name: 'purchaseConf',
            params: data
          })
        } else {
          this.$msg('交易金额必须是增量金额的整数倍')
        }
      }).catch(err => {
        console.error(err)
      })
    },
    cancel () {
      this.$router.push('/purchaseInquiry')
    },
    /**
     * 交易账户获取
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { transCode: 'LargeProductBuy' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[1].group[0].options = this.payerAccNoList
          .map(item => ({ value: util.getPayerAccount(item), key: item.acNo }))
        this.formModel.payeeAccNo = this.payerAccNoList[0].acNo
        this.selectAcc(this.formModel)
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 显示选择账户的余额与账户名称
     */
    selectAcc (data) {
      const currentPayerAccNo = this.payerAccNoList.find(item => item.acNo === data.payeeAccNo)
      data.payerAccName = currentPayerAccNo.acName
      const params = {
        payerAcNo: currentPayerAccNo.acNo,
        payerSubAcNo: currentPayerAccNo.subAcNo
      }
      httpPost('/eweb-acmgmt.AccountInfoQuery.do', params).then(res => {
        this.formModel.balance = res.availBal
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 产品信息
     */
    productMsg () {
      httpPost('/eweb-largeDeposit.LargeProductBatchQry.do', {
        prdBatchCode: this.formModel.depositCode
      }).then(res => {
        Object.assign(this.formModel, res)
        this.formModel.productTerm = util.handleEnums(saveDate, res.depositTerm)
        this.formModel.interestPay = util.handleEnums(payerRate, res.interestPayWay)
        this.formModel.withdrawal = util.handleEnums(drawType, res.isAllowAdvancedDraw)
      }).catch(err => {
        console.error(err)
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
    this.productMsg()
    this.accNoListQry()
  }
}
</script>
