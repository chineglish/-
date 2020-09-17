<template>
    <d2-container>
        <m-breadcrumb :data="data"></m-breadcrumb>
        <div class="form-box">
           <m-new-form
             :componentJson="formConfigJson"
             :btnData="btnData"
             :formModel="formModel"
             :msgs="msgs"
             @submit="onSubmit"
             @draw="draw"
             @changeUp="changeUp"
             @reset="reset">
            </m-new-form>
        </div>
    </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { deposit_flag, payerRate, saveDate, currency_type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'innerRegularDraw',
  data () {
    return {
      formModel: {
        lDAcNo: '',
        actBal: '',
        currency: '',
        openDate: '',
        depositTerm: '',
        interestType: '',
        // autoDated: '',
        transferType: '',
        drawType: '1',
        amount: ''
      },
      data: ['理财服务', '定活互转', '定期支取'],
      // 以下为动态数据
      formConfigJson: {
        formWidth: '100%',
        stepsActive: 0,
        // labelWidth: '100%',
        rules: {
          lDAcNo: [{ required: true, message: '定期账号', trigger: 'submit' }],
          actBal: [{ required: true, message: '账户余额', trigger: 'submit' }],
          currency: [{ required: true, message: '币种', trigger: 'submit' }],
          openDate: [{ required: true, message: '开户日期', trigger: 'submit' }],
          depositTerm: [{ required: true, message: '存期', trigger: 'submit' }],
          interestType: [{ required: true, message: '付息方式', trigger: 'submit' }],
          transferType: [{ required: true, message: '到期是否自动转存', trigger: 'submit' }],
          drawType: [{ required: true, message: '支取方式', trigger: 'submit' }],
          amount: [{ required: true, message: '支取金额', trigger: 'submit' }, {
            validator: (rule, value, callback) => {
              if (Number(value) > Number(this.formModel.actBal)) {
                callback(new Error('金额需要小于余额'))
              } else {
                callback()
              }
            },
            trigger: 'submit'
          }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '定期账号',
                'type': 'text',
                'changeEventName': 'changeRegularAccount',
                'key': 'lDAcNo'
              },
              {
                'disabled': false,
                'label': '币种',
                'type': 'text',
                'key': 'currency'
              },
              {
                'disabled': false,
                'label': '账户余额',
                'type': 'text',
                textType: 'shy',
                'key': 'actBal',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '开户日期',
                'type': 'text',
                'key': 'openDate'
              },
              {
                'disabled': false,
                'label': '存期',
                'type': 'text',
                'key': 'depositTerm'
              },
              {
                'disabled': false,
                'label': '付息方式',
                'type': 'text',
                'key': 'interestType'
              },
              {
                'disabled': false,
                'label': '到期是否自动转存',
                'type': 'text',
                'key': 'transferType'
              },
              {
                'disabled': false,
                'label': '支取方式',
                'type': 'radio',
                'options': [{ 'value': '部分支取', 'key': '1' }, { 'value': '全部支取', 'key': '0' }],
                'key': 'drawType',
                changeEventName: 'draw'
              },
              {
                'disabled': false,
                'label': '支取金额',
                'type': 'input',
                'key': 'amount',
                // maxlength: 13,
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
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: ['1.最低留存金额1万，仅能提前支取一次。']
    }
  },
  methods: {
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.amount = util.limitInputMoney(res.amount)
      console.log(res, 111)
    },
    onSubmit (data) {
      const params = {
        acNo: data.lDAcNo,
        subAcNo: data.zhhaoxuh,
        currency: data.currencyCode,
        balance: data.actBal,
        openDate: data.kaihriqi,
        saveDate: data.cunqiiii,
        extendFlg: data.zhcunfsh,
        drawType: data.drawType,
        amount: data.amount
      }
      httpPost('/eweb-invest.PeriodicWithdrawalConfirm.do', params).then(res => {
        Object.assign(res, data)
        this.$router.push({
          name: 'confirmRegularDraw',
          params: res
        })
      })
    },
    reset () {
      // this.formConfigJson.formItems[0].group[this.formConfigJson.formItems[0].group.length - 1].disabled = false
      // this.formModel.amount = ''
      this.$router.push({
        name: 'regularDraw',
        params: this.$route.params
      })
    },
    draw (res) {
      if (res.drawType === '0') {
        this.formConfigJson.formItems[0].group[8].disabled = true
        res.amount = res.actBal
        res.amountcopy = res.actBal
      } else {
        this.formConfigJson.formItems[0].group[8].disabled = false
        res.amount = ''
        res.amountcopy = ''
      }
      this.formModel = res
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
      this.formModel.openDate = util.separationDate(this.formModel.kaihriqi)
      this.formModel.interestType = this.formatter(payerRate, this.formModel.zhcunfsh)
      this.formModel.transferType = this.formatter(deposit_flag, this.formModel.lxzffans)
      this.formModel.currency = this.formatter(currency_type, this.$route.params.currencyCode)
      this.formModel.depositTerm = this.formatter(saveDate, this.$route.params.depositTerm)
    }
  }
}
</script>

<style  scoped>
    .form-box{
        width :1120px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    }
</style>
