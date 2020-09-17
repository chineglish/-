<template>
    <d2-container>
        <m-breadcrumb :data="data"></m-breadcrumb>
        <div class="form-box">
            <m-new-form :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                :msgs="msgs"
                @changeTurnAccount="changeTurnAccount"
                @changeUp="changeUp"
                @reset="reset"
                @submit="onSubmit">
            </m-new-form>
        </div>
    </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: 'innerMoney',
  data () {
    return {
      formModel: {
        acNo: '',
        accountMoney: '',
        amount: '',
        notificationType: '1D',
        contactName: '',
        contactTel: ''
      },
      payerAccNoList: [], // 付款账户信息列表
      data: ['理财服务', '通知存款', '活期转通知存款'],
      // 以下为动态数据
      formConfigJson: {
        formWidth: '50%',
        stepsActive: 0,
        // labelWidth: '100%',
        rules: {
          acNo: [{ required: true, message: '转出账号', trigger: 'submit' }],
          accountMoney: [{ required: false, message: '可用余额', trigger: 'submit' }],
          amount: [{ required: true, message: '金额', trigger: 'submit' }, {
            validator: (rule, value, callback) => {
              if (value >= 500000) {
                if (Number(value) <= Number(this.formModel.accountMoney)) {
                  callback()
                } else {
                  callback(new Error('金额需要小于账户余额'))
                }
              } else {
                callback(new Error('金额需要大于50万'))
              }
            },
            trigger: 'submit'
          }],
          contactName: [{ required: true, message: '对账联系人', trigger: 'submit' }],
          notificationType: [{ required: true, message: '通知类型', trigger: 'submit' }],
          contactTel: [{ required: true, message: '联系人手机', trigger: 'submit' }, {
            validator: (rule, value, callback) => util.verifyMobile(value, callback), trigger: 'submit' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '转出账号',
                'type': 'select',
                'options': [],
                'key': 'acNo',
                'changeEventName': 'changeTurnAccount'
              },
              {
                'disabled': false,
                'label': '可用余额',
                'type': 'text',
                textType: 'shy',
                'key': 'accountMoney',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '金额',
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
                'label': '通知类型',
                'type': 'radio',
                'options': [{ 'value': '一天', 'key': '1D' }, { 'value': '七天', 'key': '7D' }],
                'key': 'notificationType'
              },
              {
                'disabled': false,
                'label': '对账联系人',
                'type': 'input',
                'key': 'contactName'
              },
              {
                'disabled': false,
                'label': '联系人手机',
                'type': 'input',
                'key': 'contactTel'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: [
        '1.本交易提供客户通过网上银行办理本公司的活期账户资金转存通知存款。',
        '2.单位通知存款是在存款时不约定存期，支取时需提前通知银行，根据通知存款类型约定支取存款日期。',
        '3.人民币账户通知存款开户，最低起存金额为五十万元。',
        '4.网上办理活期存款转通知款成功后，如需要单位通知存款证实书，到转出活期存款账户的开户网点办理领取单位通知存款证实书手续。取得单位通知存款证实书的网上活期存款转存的通知存款，不能再通过网上银行办理通知存款转活期存款，只能到开户网点办理相关支取手续。'
      ]
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
        acNo: data.acNo,
        amount: data.amount,
        balance: data.accountMoney,
        notificationType: data.notificationType,
        contactName: data.contactName,
        contactTel: data.contactTel
      }
      httpPost('/eweb-invest.DemandNotificationConfirm.do', params).then(res => {
        Object.assign(data, res)
        this.$router.push({
          name: 'confirmMoney',
          params: data
        })
      }).catch(err => {
        console.error(err)
      })
    },
    getData () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'DemandNotification' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
          .map(item => ({ value: `${item.acNo}/${item.subAcNo}/${item.acName}/${item.acAlias}`, key: item.acNo }))
        this.formModel.acNo = this.payerAccNoList[0].acNo
        if (this.$route.params) {
          Object.assign(this.formModel, this.$route.params)
        }
        this.changeTurnAccount(this.formModel)
      })
    },
    changeTurnAccount (data) {
      const currentPayerAccNo = this.payerAccNoList.find(item => item.acNo === data.acNo)
      const params = {
        payerAcNo: currentPayerAccNo.acNo,
        payerSubAcNo: currentPayerAccNo.subAcNo
      }
      httpPost('/eweb-acmgmt.AccountInfoQuery.do', params).then(res => {
        this.formModel.accountMoney = res.availBal
      }).catch(err => {
        console.error(err)
      })
    },
    reset (res) {
      res.amountcopy = ''
      this.formModel = res
      this.getData()
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style  scoped>
    .form-box{
        width: 1120px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    }
</style>
