<template>
    <d2-container>
       <m-breadcrumb :data="data"></m-breadcrumb>
       <div class="form-box">
            <m-new-form :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                :msgs="msgs"
                @submit="onSubmit"
                @back="onBack"
                @changeUp="changeUp"
                @draw="draw">
            </m-new-form>
        </div>
    </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { currency_type, notify_type } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'innerDraw',
  data () {
    return {
      accountBalance: '0',
      formModel: {
        lDAcNo: '',
        actBal: '',
        currencyCode: '',
        depositTerm: '',
        openDate: '',
        drawType: '1',
        amount: ''
      },
      payerAccNoList: [], // 付款账户信息列表
      data: ['理财服务', '通知存款', '通知存款支取'],
      // 以下为动态数据
      formConfigJson: {
        formWidth: '50%',
        stepsActive: 0,
        // labelWidth: '100%',
        rules: {
          lDAcNo: [{ required: false, message: '账号', trigger: 'change' }],
          actBal: [{ required: false, message: '可用余额', trigger: 'change' }],
          currencyCode: [{ required: false, message: '币种/钞汇', trigger: 'change' }],
          depositTerm: [{ required: false, message: '通知类型', trigger: 'change' }],
          openDate: [{ required: false, message: '开户日期', trigger: 'change' }],
          drawType: [{ required: true, message: '支取方式', trigger: 'change' }],
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
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '账号',
                'type': 'text',
                'key': 'lDAcNo'
              },
              {
                'disabled': false,
                'label': '可用余额',
                'type': 'text',
                textType: 'shy',
                'key': 'actBal',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '币种/钞汇',
                'type': 'text',
                'key': 'currencyCode',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disabled': false,
                'label': '通知类型',
                'type': 'text',
                'key': 'depositTerm',
                formatter: (key, value) => util.handleEnums(notify_type, value)
              },
              {
                'disabled': false,
                'label': '开户日期',
                'type': 'text',
                'key': 'openDate'
              },
              {
                'disabled': false,
                'label': '支取方式',
                'type': 'radio',
                'options': [{ 'value': '部分支取', 'key': '1' }, { 'value': '全部支取', 'key': '0' }],
                'key': 'drawType',
                'changeEventName': 'draw'
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
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      msgs: ['1.最低留存金额50万，仅能提前支取一次。']
    }
  },
  methods: {
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.amount = util.limitInputMoney(res.amount)
    },

    onSubmit (data) {
      const params = {
        acNo: data.lDAcNo,
        subAcNo: data.zhhaoxuh,
        currency: data.currencyCode,
        balance: data.actBal,
        notifyType: data.depositTerm,
        openDate: data.kaihriqi,
        amount: data.amount,
        drawType: data.drawType
      }
      httpPost('/eweb-invest.DepositWithdrawConfirm.do', params).then(res => {
        Object.assign(res, data)
        this.$router.push({
          name: 'confirmDraw',
          params: res
        })
      })
    },
    onBack () {
      this.$router.push({
        name: 'forwardDrawList',
        params: this.$route.params
      })
    },
    draw (res) {
      if (res.drawType === '0') {
        res.amount = res.actBal
        res.amountcopy = res.actBal
        this.formConfigJson.formItems[0].group[6].disabled = true
      } else {
        this.formConfigJson.formItems[0].group[6].disabled = false
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
      Object.assign(this.formModel, this.$route.params.item)
      this.formModel.openDate = util.separationDate(this.formModel.kaihriqi)
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
