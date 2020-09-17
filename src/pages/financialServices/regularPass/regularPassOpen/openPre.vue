<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        ref="mNewForm"
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        :msgs="msgs"
        @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
        @selectAcc="selectAcc"
        @changeUp="changeUp"
        @changeStruRates="changeStruRates"
        @reset="onReset"
        @submit="submit">
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { interest_type, usualDate } from '@/assets/js/entity'
import util from '@/libs/util'
/**
 *@name: 定期通开户-录入
 * @author: 梁文彬
 * @date: 2019-12-20
 */
export default {
  name: 'openPre',
  data () {
    return {
      titleData: ['理财服务 ', '定期通', '定期通开户'],
      msgs: ['1.可实现企业用户将活期账户中的资金转移至定期通中进行投资理财。'],
      payerAccNoList: [], // 付款账户信息列表
      formModel: {
        availBal: '',
        payerAcNo: '',
        nomExpire: '',
        preDrawStartDate: '',
        openAcNoAmount: '',
        depositRate: '',
        interestType: '',
        contactName: '',
        // contactTel: '',
        contactMobile: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          payerAcNo: [{ required: true, message: '转出账户不能为空', trigger: 'submit' }],
          nomExpire: [{ required: true, message: '名义期限不能为空', trigger: 'submit' }],
          preDrawStartDate: [
            { required: true, message: '提前支取开始日期不能为空', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              this.formModel.preDrawStartDate = value
              if (value <= util.formatDate(Date.now())) {
                callback(new Error('提前支取开始日期应大于当前日期'))
              } else {
                callback()
              }
            },
            trigger: 'blur' }
          ],
          openAcNoAmount: [
            { required: true, message: '开户金额不能为空', trigger: 'change' },
            { validator: (rule, value, callback) => util.verifyAmount(value, callback), trigger: 'submit' },
            { validator: (rule, value, callback) => {
              if (Number(value) < Number(1000000)) {
                callback(new Error('开户金额应大于100万'))
              } else {
                callback()
              }
            },
            trigger: 'submit' },
            { validator: (rule, value, callback) => {
              if (Number(value) > Number(this.formModel.availBal)) {
                callback(new Error('可用余额不足'))
              } else {
                callback()
              }
            },
            trigger: 'change' }
          ],
          depositRate: [{ required: true, message: '存入利率（%）', trigger: 'submit' }],
          interestType: [{ required: true, message: '付息方式', trigger: 'submit' }],
          contactName: [{ required: true, message: '对账联系人', trigger: 'submit' }],
          // contactTel: [
          //   { required: true, message: '联系人电话不能为空', trigger: 'submit' },
          //   { cvalidator: (rule, value, callback) => util.verifyTelePhone(value, callback), trigger: 'submit' }
          // ],
          contactMobile: [
            { required: true, message: '联系人手机不能为空', trigger: 'submit' },
            { validator: (rule, value, callback) => util.verifyMobile(value, callback), trigger: 'submit' }
          ]
        },
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '40%',
            group: [
              {
                'disabled': false,
                'label': '转出账户',
                'type': 'select',
                'key': 'payerAcNo',
                'options': [],
                'changeEventName': 'selectAcc'
              },
              {
                'disabled': false,
                'label': '可用余额',
                'type': 'text',
                textType: 'shy',
                'key': 'availBal',
                formatter: (key, value) => util.formatCurrency(value)
              }, {
                'disabled': false,
                'label': '名义期限',
                'type': 'select',
                'key': 'nomExpire',
                'options': usualDate,
                trans: { value: 'label', key: 'value' }
              }, {
                'disabled': false,
                'label': '提前支取开始日期',
                'type': 'date',
                'key': 'preDrawStartDate',
                formatter: (key, value) => util.formatTime(value)
              }, {
                'disabled': false,
                'label': '开户金额',
                'type': 'input',
                // maxlength: 17,
                inputType: 'money',
                keydownEventName: 'limitMoneyInputKeyDown',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                'inputEventName': 'changeUp',
                'key': 'openAcNoAmount'
              }, {
                'disabled': false,
                'label': '存入利率',
                'type': 'input',
                maxlength: 8,
                'key': 'depositRate',
                oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,4}|[1-9][0-9]*.d{1,4})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                'inputEventName': 'changeStruRates'
              }, {
                'disabled': false,
                'label': '付息方式',
                'type': 'select',
                'key': 'interestType',
                'options': interest_type,
                trans: { value: 'label', key: 'value' }
              }, {
                'disabled': false,
                'label': '对账联系人',
                'type': 'input',
                maxlength: 15,
                'key': 'contactName'
              // }, {
              //   'disabled': false,
              //   'label': '联系人电话',
              //   'type': 'input',
              //   maxlength: 13,
              //   'key': 'contactTel'
              }, {
                'disabled': false,
                'label': '联系人手机',
                'type': 'input',
                maxlength: 11,
                'key': 'contactMobile',
                validator: (rule, value, callback) => util.verifyMobile(value, callback),
                trigger: 'submit'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      payerAccountList: []
    }
  },
  methods: {
    // 初始化数据
    dataPrep () {
      // 初始化查询账户列表及余额
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'OpenRegularAcNo' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
          .map(item => ({ value: util.getPayerAccount(item), key: item.acNo + '/' + item.subAcNo + '/' + item.acName }))
        this.formModel.payerAcNo = res.AcList[0].acNo + '/' + res.AcList[0].subAcNo + '/' + res.AcList[0].acName
        httpPost('eweb-acmgmt.AccountInfoQuery.do', {
          payerAcNo: res.AcList[0].acNo,
          payerSubAcNo: res.AcList[0].subAcNo
        }).then(bal => {
          this.formModel.availBal = bal.availBal
        }).catch(e => {
          console.error(e)
        })
      }).catch(err => {
        console.error(err)
      })
      // 初始化显示名义期限及付息方式
      this.formModel.nomExpire = '3M'
      this.formModel.interestType = '07'
      // 初始化提前支取开始日期(当前日期加一天)
      this.formModel.preDrawStartDate = util.formatDate(Date.now() + 1 * 24 * 60 * 60 * 1000)
      this.formModel.openAcNoAmount = ''
      this.formModel.depositRate = ''
      this.formModel.contactName = ''
      // this.formModel.contactTel = ''
      this.formModel.contactMobile = ''
    },
    changeStruRates (res) {
      if (res.depositRate > 100) {
        this.$message.warning('年利率不能大于100%')
        res.depositRate = ''
      } else {
        res.depositRate = util.limitInputInterestRate(res.depositRate)
      }
    },
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    // 校验小数点
    changeUp (res) {
      res.openAcNoAmount = util.limitInputMoney(res.openAcNoAmount)
    },
    selectAcc (data) {
      const [accNo, subAccNo] = (data.payerAcNo || '').split('/')
      const params = {
        payerAcNo: accNo,
        payerSubAcNo: subAccNo
      }
      httpPost('/eweb-acmgmt.AccountInfoQuery.do', params).then(res => {
        this.formModel.availBal = res.availBal
      }).catch(e => {
        this.formModel.availBal = '0.00'
        console.error(e)
      })
    },
    onReset (res) {
      res.openAcNoAmountcopy = ''
      this.formModel = res
      this.dataPrep()
    },
    submit (data) {
      const [accNo, subAccNo, acName] = (data.payerAcNo || '').split('/')
      const params = {
        ...data,
        payerAcNo: accNo,
        payerSubAcNo: subAccNo,
        payerAcName: acName,
        amount: data.openAcNoAmount
      }
      httpPost('/eweb-invest.OpenRegularAcNoConfirm.do', params).then(conf => {
        data._Data2Sign = conf._Data2Sign
        data._authenticateType = conf._authenticateType
        data._dataMapKey = conf._dataMapKey
        this.$router.push({
          name: 'openConf',
          params: {
            data,
            amount: data.openAcNoAmount
          }
        })
      })
    }
  },
  created () {
    if (this.$route.params.data) {
      Object.assign(this.formModel, this.$route.params.data)
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'OpenRegularAcNo' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
          .map(item => ({ value: util.getPayerAccount(item), key: item.acNo + '/' + item.subAcNo + '/' + item.acName }))
        this.formModel.payerAcNo = this.formModel.payerAcNo + '/' + this.formModel.payerSubAcNo + '/' + this.formModel.payerAcName
        httpPost('eweb-acmgmt.AccountInfoQuery.do', {
          payerAcNo: this.$route.params.data.payerAcNo,
          payerSubAcNo: this.$route.params.data.payerSubAcNo
        }).then(bal => {
          this.formModel.availBal = bal.availBal
        }).catch(e => {
          console.error(e)
        })
      }).catch(err => {
        console.error(err)
      })
    } else {
      this.dataPrep()
    }
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
</style>
