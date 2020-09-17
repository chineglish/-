<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      :msgs="msgs"
      @changeTurnAccount="changeTurnAccount"
      @submit="onSubmit"
      @changeUp="changeUp"
      @changeStruRates="changeStruRates"
      @reset="reset"
    ></m-new-form>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { interest_type } from '@/assets/js/entity.js'
export default {
  name: '',
  data: function () {
    return {
      mainAcNo: '',
      subAcNo: '',
      data: ['理财服务', '结构性存款', '结构性存款开户'],
      formModel: {
        acNo: 0,
        balance: '',
        payeeAcNo: '',
        endDate: '',
        amount: '',
        struRates: '',
        interestType: '',
        contactName: '',
        // contactTel: '',
        contactPhone: ''
      },
      payerAccNoList: [],
      formConfigJson: {
        stepsActive: 0,
        rules: {
          acNo: [{ required: true, message: '转出账户', trigger: 'submit' }],
          payeeAcNo: [{ required: true, message: '收付息账户', trigger: 'submit' }],
          endDate: [{ required: true, message: '到期日期', trigger: 'submit' }],
          amount: [{ required: true, message: '购买金额', trigger: 'submit' }, {
            validator: (rule, value, callback) => {
              if (parseFloat(value) >= 1000000) {
                if (Number(value) <= Number(this.formModel.balance)) {
                  callback()
                } else {
                  callback(new Error('金额需要小于账户余额'))
                }
              } else {
                callback(new Error('金额需要大于等于100万'))
              }
            },
            trigger: 'submit'
          }],
          struRates: [{ required: true, message: '年利率（%）', trigger: 'submit' }],
          interestType: [{ required: true, message: '付息方式', trigger: 'submit' }],
          contactName: [{ required: true, message: '对账联系人', trigger: 'submit' }],
          // contactTel: [{ required: true, message: '联系人电话', trigger: 'submit' }, {
          //   validator: (rule, value, callback) => util.verifyTelePhone(value, callback),
          //   trigger: 'submit'
          // }],
          contactPhone: [{ required: true, message: '联系人手机', trigger: 'submit' }, {
            validator: (rule, value, callback) => util.verifyMobile(value, callback),
            trigger: 'submit'
          }]
        },
        formItems: [{
          formWidth: '50%',
          // labelWidth: '30%',
          group: [
            {
              'disabled': false,
              'label': '转出账户',
              'type': 'select',
              'key': 'acNo',
              'options': [],
              trans: { value: 'payerAcNoShow' },
              'changeEventName': 'changeTurnAccount'
            },
            {
              'disabled': true,
              'label': '可用余额',
              'type': 'text',
              textType: 'shy',
              'key': 'balance',
              formatter: (key, value) => util.formatCurrency(value)
            },
            {
              'disabled': false,
              'label': '收付息账户',
              'type': 'select',
              // 'key': 'acNoInterest',
              'key': 'payeeAcNo',
              trans: { value: 'payerAcNoShow' },
              'options': []
            },
            {
              'disabled': false,
              'label': '到期日期',
              'type': 'date',
              pickerOptions: {
                disabledDate: time => {
                  let flag = false
                  const now = new Date().getTime() - 24 * 60 * 60 * 1000
                  if (time < now) {
                    flag = true
                  }
                  return flag
                }
              },
              valueFormat: 'yyyyMMdd',
              'key': 'endDate'
            },
            {
              'disabled': false,
              'label': '购买金额',
              'type': 'input',
              'key': 'amount',
              // maxlength: 13,
              inputType: 'money',
              keydownEventName: 'limitMoneyInputKeyDown',
              // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
              'inputEventName': 'changeUp'

            },
            {
              'disabled': false,
              'label': '年利率（%）',
              'type': 'input',
              // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
              keydownEventName: 'limitMoneyInputKeyDown',
              'inputEventName': 'changeStruRates',
              'key': 'struRates'
            },
            {
              'disabled': false,
              'label': '付息方式',
              'type': 'select',
              'key': 'interestType',
              trans: { value: 'label', key: 'value' },
              'options': interest_type
            },
            {
              'disabled': false,
              'label': '对账联系人',
              'type': 'input',
              maxlength: 10,
              'key': 'contactName'
            },
            // {
            //   'disabled': false,
            //   'label': '联系人电话',
            //   'type': 'input',
            //   'key': 'contactTel'
            // },
            {
              'disabled': false,
              'label': '联系人手机',
              'type': 'input',
              'key': 'contactPhone'
            }
          ]
        }]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }],
      msgs: [
        '1.请按照银行人员提供的产品期次编号购买。',
        '2.每笔业务发起前须与客户经理联系，由客户经理逐笔上报总行审批后方能办理。',
        '3.结构性存款业务须在银行工作日办理，办理时间为8:30-17:30。',
        '4.每笔业务均须总行产品经理在系统中审批通过后方能开户成功。'
      ]
    }
  },
  methods: {
    reset (res) {
      res.amountcopy = ''
      this.formModel = res
      this.changeTurnAccount(res)
    },
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.amount = util.limitInputMoney(res.amount)
    },
    changeStruRates (res) {
      if (res.struRates > 100) {
        this.$message.warning('年利率不能大于100%')
        res.struRates = ''
      } else {
        res.struRates = util.limitInputMoney(res.struRates, 4)
      }
    },
    onSubmit (data) {
      // 日期格式转换
      data.endDate = data.endDate.split('-').join('')
      httpPost('/eweb-invest.StructuredDepositOpenConfirm.do', {
        ...data,
        acNo: this.payerAccNoList[data.acNo].acNo,
        payeeAcNo: this.payerAccNoList[data.payeeAcNo].acNo
      }).then(res => {
        Object.assign(res, data)
        this.$router.push({
          name: 'openAccountConfirm',
          params: { formModel: res, payerAccNoList: this.payerAccNoList }
        })
      })
    },

    // 获取账户列表
    getPayAccList (res) {
      httpPost('/eweb-query.PayerAccountListQry.do', { TransCode: 'StructuredDepositOpen' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => { item.payerAcNoShow = util.getPayerAccount(item) })
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.formConfigJson.formItems[0].group[2].options = this.payerAccNoList
        this.changeTurnAccount(this.formModel)
      })
    },

    // 获取可用余额
    changeTurnAccount (data) {
      const currentPayerAccNo = this.payerAccNoList[data.acNo]
      const params = {
        payerAcNo: currentPayerAccNo.acNo,
        payerSubAcNo: currentPayerAccNo.subAcNo
      }
      httpPost('/eweb-acmgmt.AccountInfoQuery.do', params).then(res => {
        this.formModel.balance = data.balance = res.availBal
      })
    }
  },
  created () {
    this.getPayAccList()
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      // this.formModel.endDate = util.separationDate(this.formModel.endDate)
    }
  },
  components: {}
}
</script>
