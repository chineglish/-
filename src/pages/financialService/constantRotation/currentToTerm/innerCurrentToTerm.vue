<template>
    <d2-container>
        <m-breadcrumb :data="data"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :formModel="formModel"
              :btnData="btnData"
              :msgs="msgs"
              @submit="onSubmit"
              @changeUp="changeUp"
              @reset="reset"
              @changePayerAccNo="changePayerAccNo">
            </m-new-form>
        </div>
    </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { usualDate, extendFlg_Type } from '@/assets/js/entity.js'
import util from '@/libs/util'
export default {
  name: 'innerCurrentToTerm',
  data () {
    return {
      // accountBalance: '0',
      formModel: {
        acNo: '',
        acNoName: '',
        balance: '',
        interestId: '3M',
        amount: '',
        interestType: '1',
        extendFlg: '0',
        contactName: '',
        contactTel: '',
        contactPhone: '',
        interestName: '利随本清'
      },
      payerAccNoList: [], // 付款账户信息列表
      data: ['理财服务', '定活互转', '活期转定期'],
      // 以下为动态数据
      formConfigJson: {
        formWidth: '50%',
        stepsActive: 0,
        // showRightCheck: true,
        // labelWidth: '100%',
        rules: {
          acNo: [{ required: true, message: '请选择转出账号', trigger: 'submit' }],
          balance: [{ required: true, message: '账户余额为空', trigger: 'submit' }],
          interestId: [{ required: true, message: '请选择存期', trigger: 'submit' }],
          amount: [{ required: true, message: '请输入开户金额', trigger: 'submit' }, {
            validator: (rule, value, callback) => {
              if (value >= 10000) {
                if (Number(value) <= Number(this.formModel.balance)) {
                  callback()
                } else {
                  callback(new Error('金额需要小于账户余额'))
                }
              } else {
                callback(new Error('金额需要大于1万'))
              }
            },
            trigger: 'submit'
          }],
          interestType: [{ required: true, message: '请选择付息方式', trigger: 'submit' }],
          extendFlg: [{ required: true, message: '请选择到期是否自动转存', trigger: 'submit' }],
          contactName: [{ required: true, message: '请输入对账联系人', trigger: 'submit' }],
          // contactTel: [
          //   { required: true, message: '联系人电话', trigger: 'submit' },
          //   { validator: (rule, value, callback) => util.verifyTelePhone(value, callback), trigger: 'submit' }
          // ],
          contactPhone: [
            { required: true, message: '请输入联系人手机', trigger: 'submit' },
            { validator: (rule, value, callback) => util.verifyMobile(value, callback), trigger: 'submit' }
          ]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '转出账号',
                'type': 'select',
                'changeEventName': 'changePayerAccNo',
                'options': [],
                'key': 'acNo'
              },
              {
                'disabled': false,
                'label': '可用余额',
                'type': 'text',
                textType: 'shy',
                'key': 'balance',
                formatter: (key, value) => util.formatCurrency(value)
              },
              { 'disabled': false,
                'label': '存期',
                'type': 'select',
                'key': 'interestId',
                trans: { value: 'label', key: 'value' },
                'options': usualDate
              },
              {
                'disabled': false,
                'label': '开户金额(元)',
                'type': 'input',
                'key': 'amount',
                // maxlength: 13,
                inputType: 'money',
                keydownEventName: 'limitMoneyInputKeyDown',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                'inputEventName': 'changeUp'
              },
              {
                'disabled': true,
                'label': '付息方式',
                'type': 'input',
                'key': 'interestName' },

              {
                'disabled': false,
                'label': '到期是否自动转存',
                'type': 'select',
                'key': 'extendFlg',
                trans: { value: 'label', key: 'value' },
                'options': extendFlg_Type
              },
              {
                'disabled': false,
                'label': '对账联系人',
                'type': 'input',
                'key': 'contactName'
              },
              // {
              //   'disabled': false,
              //   'label': '联系电话',
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
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: [
        '1.定期起存金额10000.00元。',
        '2.本息自动转存是指定期到期后利息金额自动计入定期账户中并开始下一个计息周期;本金自动转存是指定期到期后利息金额自动计入收息账户后并开始下一个计息周期:不自动转存是指在系统不自动付息，只在定转活时将存期内按定期计算利息，超期按照活期记付利息。']
    }
  },
  methods: {
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.amount = util.limitInputMoney(res.amount)
    },
    reset (res) {
      res.amountcopy = ''
      this.formModel = res
      this.getAccountList()
    },
    onSubmit (data) {
      httpPost('/eweb-invest.CurrentRegularConfirm.do', {
        acNo: data.acNo,
        acNoName: data.acNoName,
        balance: data.balance,
        interestId: data.interestId,
        amount: data.amount,
        interestType: data.interestType,
        extendFlg: data.extendFlg,
        contactName: data.contactName,
        contactTel: data.contactTel,
        contactPhone: data.contactPhone
      }).then(res => {
        let _params = data
        Object.assign(res, _params)
        if (Number(res.limitDayAmount) > 1000000) {
          this.$confirm('您的日累计转账金额已经超过100万元, 是否继续转账?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              name: 'confirmCurrentToTerm',
              params: res
            })
          }).catch(() => {
            this.$msg('已取消转账')
          })
        } else {
          this.$router.push({
            name: 'confirmCurrentToTerm',
            params: res
          })
        }
      }).catch(err => {
        console.error(err)
      })
    },
    getAccountList () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'CurrentRegular' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
          .map(item => ({ value: util.getPayerAccount(item), key: item.acNo }))
        this.formModel.acNo = this.payerAccNoList[0].acNo
        if (this.$route.params.formModel) {
          Object.assign(this.formModel, this.$route.params.formModel)
        }
        this.changePayerAccNo(this.formModel)
      })
    },
    changePayerAccNo (data) {
      const currentPayerAccNo = this.payerAccNoList.find(item => item.acNo === data.acNo)
      this.formModel.acNoName = currentPayerAccNo.acName
      const params = {
        payerAcNo: currentPayerAccNo.acNo,
        payerSubAcNo: currentPayerAccNo.subAcNo
      }
      httpPost('/eweb-acmgmt.AccountInfoQuery.do', params).then(res => {
        this.formModel.balance = res.availBal
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.getAccountList()
  }
}
</script>

<style  scoped>
    .form-box{
        width :1120px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    }
</style>
