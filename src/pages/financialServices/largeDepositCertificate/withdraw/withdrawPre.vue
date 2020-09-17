<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @changeUp="changeUp"
        @submit="submit"
        @cancel="cancel">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 *@name: 大额存单支取-录入
 * @author: 梁文彬
 * @date: 2019-12-19
 */
import { acc_type, acc_status, handleChannel, payerRate } from '@/assets/js/entity'
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'withdrawPre',
  data () {
    return {
      titleData: ['理财服务', '大额存单', '单位大额存单支取'],
      formModel: {
        acName: '',
        acType: '',
        lDAcNo: '',
        subAcNo: '',
        openAmount: '',
        actBal: '',
        prdBatchCode: '',
        actualRate: '',
        openChannel: '',
        interestFrequency: '',
        openDates: '',
        expiryDate: '',
        payerAcNo: '',
        actStatus: '',
        transMoney: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          transMoney: [{ required: true, message: '交易金额(元)', trigger: 'submit' },
            {
              validator: (rule, value, callback) => {
                if (parseFloat(value) === parseFloat(this.formModel.actBal)) {
                  callback()
                }
                if (parseFloat(value) < parseFloat(this.formModel.actBal)) {
                  if (parseFloat(value) >= 10000) {
                    if (parseFloat(this.formModel.actBal) - parseFloat(value) >= 10000000) {
                      callback()
                    } else { callback(new Error('剩余余额要大于10000000')) }
                  } else { callback(new Error('交易金额要大于10000')) }
                } else {
                  callback(new Error('金额需要小于账户余额'))
                }
              },
              trigger: 'submit'
            }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '账户名称',
                'type': 'text',
                'key': 'acName'
              }, {
                'disabled': true,
                'label': '账户类型',
                'type': 'text',
                'key': 'acType',
                formatter: (key, value) => util.handleEnums(acc_type, value)
              }, {
                'disabled': true,
                'label': '账号',
                'type': 'text',
                'key': 'lDAcNo'
              }, {
                'disabled': true,
                'label': '子账户序号',
                'type': 'text',
                'key': 'subAcNo'
              }, {
                'disabled': true,
                'label': '开户金额',
                'type': 'text',
                'key': 'openAmount',
                formatter: (name, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '账户余额',
                'type': 'text',
                textType: 'shy',
                'key': 'actBal',
                formatter: (name, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '大额存单产品期次编号',
                'type': 'text',
                'key': 'prdBatchCode'
              }, {
                'disabled': true,
                'label': '年利率（%）',
                'type': 'text',
                'key': 'actualRate',
                formatter: (key, value) => {
                  return Number(value) + '%'
                }
              }, {
                'disabled': true,
                'label': '办理渠道',
                'type': 'text',
                'key': 'openChannel',
                formatter: (key, value) => util.handleEnums(handleChannel, value)
              }, {
                'disabled': true,
                'label': '付息方式',
                'type': 'text',
                'key': 'lxzffans',
                formatter: (key, value) => util.handleEnums(payerRate, value)
              }, {
                'disabled': true,
                'label': '开户日期',
                'type': 'text',
                'key': 'openDates'
              }, {
                'disabled': true,
                'label': '到期日期',
                'type': 'text',
                'key': 'expiryDate'
              }, {
                'disabled': true,
                'label': '收付款账户',
                'type': 'text',
                'key': 'payerAcNo'
              }, {
                'disabled': true,
                'label': '账户状态',
                'type': 'text',
                'key': 'actStatus',
                formatter: (key, value) => util.handleEnums(acc_status, value)
              }, {
                'disabled': false,
                'label': '交易金额(元)',
                'type': 'input',
                'key': 'transMoney',
                inputType: 'money',
                keydownEventName: 'limitMoneyInputKeyDown',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                'inputEventName': 'changeUp'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'cancel' }
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
    submit (data) {
      httpPost('/eweb-largeDeposit.LargeProductDrawConfirm.do', {
        subscribe: data.subscribe,
        cifName: data.acName,
        depositTerm: data.depositTerm,
        actBal: data.actBal,
        openDate: data.openDate,
        interestFrequency: data.lxzffans,
        openAmount: data.openAmount,
        prdBatchCode: data.prdBatchCode,
        actualRate: data.actualRate,
        openChannel: data.openChannel,
        ldActStatus: data.actStatus,
        payeeAcType: data.acType,
        matureDate: data.matureDate,
        amount: data.transMoney,
        ldAccountNo: data.lDAcNo,
        ldSubAccNo: data.subAcNo,
        acNo: data.payerAcNo
      }).then(res => {
        Object.assign(data, res)
        this.$router.push({
          name: 'withdrawConf',
          params: data
        })
      }).catch(err => {
        console.error(err)
      })
    },
    cancel () {
      this.$router.push('withdrawInquiry')
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
    if (this.$route.params.data) {
      Object.assign(this.formModel, this.$route.params.data)
    }
    this.formModel.openDates = util.separationDate(this.formModel.openDate)
    this.formModel.expiryDate = util.separationDate(this.formModel.matureDate)
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
</style>
