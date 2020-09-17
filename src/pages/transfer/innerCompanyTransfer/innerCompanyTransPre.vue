<template>
    <d2-container>
        <m-breadcrumb :data="data"></m-breadcrumb>
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          :msgs="msgs"
          ref="newForm"
          @reset="onReset"
          @payerAccNoChange="payerAccNoChange"
          @payeeAccNoChange="payeeAccNoChange"
          @changeUp="changeUp"
          @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
          @submit="onSubmit">
        </m-new-form>
    </d2-container>
</template>
<script>
/**
 *@name: 公司内部转账录入页
 * @date: 2019-12-9
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'innerCompanyTransPre',
  data () {
    return {
      fuyan: [], // 附言
      payerAccNoList: [],
      payeeAccNoList: [],
      formModel: {
        payerAcNo: '',
        payerSubAcNo: '',
        payerAcName: '',
        payeeAcNo: '',
        payeeAcName: '',
        payeeBankDeptName: '',
        payeeBankDeptId: '',
        amount: '',
        remitModel: '0',
        postscript: '',
        balance: '',
        capitalMoney: '',
        trsType: '0'
      },
      data: ['转账汇款', '公司内部转账'],
      formConfigJson: {
        stepsActive: 0,
        formWidth: '50%',
        rules: {
          payerAcNo: [{ required: true, message: '付款账户', trigger: 'change' }],
          payerAcName: [{ required: true, message: '付款账户名称', trigger: 'change' }],
          payeeAcNo: [{ required: true, message: '收款账户', trigger: 'change' }],
          // payeeAcName: [{ required: true, message: '收款账户名称', trigger: 'change' }],
          payeeBankDeptName: [{ required: true, message: '收款账户开户行', trigger: 'change' }],
          amount: [{ required: true, message: '转账金额', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              if (Number(value) <= 0) {
                callback(new Error('输入金额应大于0'))
              } else if (Number(value) > Number(this.$refs.newForm.$data.form.balance)) {
                callback(new Error('输入金额大于可用余额'))
              } else {
                callback()
              }
            },
            trigger: 'submit' }],
          postscript: [{ required: false, message: '附言', trigger: 'submit' }]
        },
        formItems: [{
          title: '付款信息',
          group: [{
            'disabled': false,
            'label': '付款账户',
            'slotName': 'bankBanlens',
            'type': 'select',
            'options': [],
            'key': 'payerAcNo',
            'changeEventName': 'payerAccNoChange'
          },
          {
            'disabled': false,
            'label': '可用余额',
            'type': 'text',
            textType: 'shy',
            'key': 'balance',
            formatter: (key, value) => util.formatCurrency(value)
          },
          {
            'disabled': false,
            'label': '付款账户开户行',
            'type': 'text',
            'key': 'payerBankAcc'
          }, {
            'disabled': false,
            'label': '账户余额',
            'type': 'text',
            textType: 'shy',
            'key': 'zhanghye',
            formatter: (key, value) => util.formatCurrency(value)
          } ]
        }, {
          title: '收款信息',
          group: [ {
            'disabled': false,
            'label': '收款账户',
            'type': 'select',
            'options': [],
            'key': 'payeeAcNo',
            'changeEventName': 'payeeAccNoChange'
          },
          // {
          //   'disabled': true,
          //   'label': '收款账户名称',
          //   'type': 'text',
          //   'key': 'payeeAcName'
          // },
          {
            'disabled': true,
            'label': '收款账户开户行',
            'type': 'text',
            'key': 'payeeBankDeptName'
          }]
        }, {
          title: '交易信息',
          group: [{
            'disabled': false,
            'label': '转账金额',
            'type': 'input',
            inputType: 'money',
            // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
            keydownEventName: 'limitMoneyInputKeyDown',
            blurEventName: 'formatCurrency',
            'inputEventName': 'changeUp',
            'key': 'amount',
            'content': '(元)'
          }, {
            'disabled': false,
            'label': '金额大写',
            'type': 'text',
            'key': 'capitalMoney'
          }, {
            'disabled': false,
            'label': '附言',
            'type': 'input',
            maxlength: 70,
            'options': [],
            'key': 'postscript'
          }]
        }]
      },
      btnData: [{ btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }],
      msgs: [
        '1. 进行转账操作的账户，只限于客户支付平台操作员权限范围内的账户。',
        '2. 公司内部转账是指在大连银行开户的同一公司客户号项下各账户之间的资金划转。'
      ]
    }
  },
  // computed: {
  //   balance () {
  //     return util.formatCurrency(this.formModel.balance)
  //   }
  // },
  methods: {
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    formatCurrency (value) {
      // this.formModel.amount = util.formatCurrency(value)
    },
    /**
     * 将金额数据转换成大写
     */
    changeUp (res) {
      res.amount = util.limitInputMoney(res.amount)
      res.capitalMoney = util.getMoneyHanzi(res.amount)
    },
    payerAccNoChange (formModel) {
      const [accNo, subAccNo] = (formModel.payerAcNo || '').split('-')
      const accObj = this.payerAccNoList.find(item => item.acNo === accNo)
      if (accObj) {
        this.formModel.payerAcName = accObj.acName
        this.formModel.payerBankAcc = accObj.openBank
      }
      const params = {
        payerAcNo: accNo,
        payerSubAcNo: subAccNo
      }
      httpPost('eweb-acmgmt.AccountInfoQuery.do', params).then(res => {
        this.formModel.balance = res.availBal
        this.formModel.zhanghye = res.balance
      }).catch(e => {
        console.error(e)
      })
    },
    payeeAccNoChange (data) {
      const [pareeAccNo] = (data.payeeAcNo || '').split('-')
      const accObj = this.payeeAccNoList.find(item => item.acNo === pareeAccNo)
      if (accObj) {
        data.payeeAcName = accObj.acName
        data.payeeBankDeptName = accObj.openBank
        data.payeeBankDeptId = accObj.deptId
      }
    },
    /**
     * 付款，收款账号列表查询
     */
    accNoListQry () {
      // 付款
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'InnerTransfer' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
          .map(item => ({ value: util.getPayerAccount(item), key: item.acNo + '-' + item.subAcNo }))
        this.$refs.newForm.$data.form.payerAcNo = res.AcList[0].acNo + '-' + res.AcList[0].subAcNo
        this.$refs.newForm.$data.form.payerAcName = res.AcList[0].acName
        this.$refs.newForm.$data.form.payerBankAcc = res.AcList[0].openBank
        httpPost('eweb-acmgmt.AccountInfoQuery.do', {
          payerAcNo: res.AcList[0].acNo,
          payerSubAcNo: res.AcList[0].subAcNo
        }).then(bal => {
          this.$refs.newForm.$data.form.balance = bal.availBal
          this.$refs.newForm.$data.form.zhanghye = bal.balance
        }).catch(e => {
          console.error(e)
        })
        // 收款
        this.payeeAccNoList = res.AcList || []
        this.formConfigJson.formItems[1].group[0].options = this.payeeAccNoList
          .map(item => ({ value: util.getPayerAccount(item), key: item.acNo + '-' + item.subAcNo }))
        this.$refs.newForm.$data.form.payeeAcNo = res.AcList[0].acNo + '-' + res.AcList[0].subAcNo
        this.$refs.newForm.$data.form.payeeAcName = res.AcList[0].acName
        this.$refs.newForm.$data.form.payeeBankDeptId = res.AcList[0].deptId
        this.$refs.newForm.$data.form.payeeBankDeptName = res.AcList[0].openBank
      }).catch(err => {
        console.error(err)
      })
    },
    msgManage () {
      this.$router.push({
        name: 'msgManage'
      })
    },
    onSubmit (data) {
      const [pareeAccNo, pareeSubAccNo] = (data.payeeAcNo || '').split('-')
      const [accNo, subAccNo] = (data.payerAcNo || '').split('-')
      const params = {
        payerAcNo: accNo,
        payerAcName: data.payerAcName,
        payerAcNoName: data.payerAcName,
        payerSubAcNo: subAccNo,
        // payeeAcNo: data.payeeAcNo,
        payeeAcNo: pareeSubAccNo !== '000156' ? pareeAccNo + pareeSubAccNo : pareeAccNo,
        pareeSubAcNo: pareeSubAccNo,
        payeeAcName: data.payeeAcName,
        payeeAcNoName: data.payeeAcName,
        amount: data.amount,
        postscript: data.postscript,
        remitModel: '0',
        payeeBankDeptId: data.payeeBankDeptId,
        payeeBankDeptName: data.payeeBankDeptName,
        trsType: data.trsType
      }
      httpPost('eweb-transfer.InnerTransferConfirm.do', params).then(res => {
        let _params = { ...data, ...params, fuyan: this.fuyan, ...res }
        if (res._Data2Sign !== undefined) {
          _params._Data2Sign = res._Data2Sign
          _params._authenticateTypeChoose = res._authenticateType ? res._authenticateType[0] : ''
        }
        this.$router.push({
          name: 'innerCompanyTransConf',
          params: _params
        })
      }).catch(err => {
        console.error(err)
      })
    },
    getPostscript () {
      // httpPost('/eweb-transfer.TransferRemarkManage.do', {
      //   trsFlag: '0',
      //   remarkName: ''
      // }).then(res => {
      //   // this.fuyan = res.remrkNameList
      //   // this.formConfigJson.formItems[2].group[1].options = this.fuyan.map((item, index) => ({ value: item.remarkName, key: index }))
      //   const post = res.remrkNameList.map((item, index) => ({ value: item.remarkName, key: index }))
      //   for (let i = 0; i < post.length; i++) {
      //     this.formConfigJson.formItems[2].group[2].options.push(post[i])
      //   }
      //   this.fuyan = this.formConfigJson.formItems[2].group[2].options
      // }).catch(err => {
      //   console.error(err)
      // })
      this.formConfigJson.formItems[2].group[2].options = util.getPostscript()
    },
    onReset (res) {
      // this.formModel = null
      // this.formModel.remitModel = 0
      // this.formModel.trsType = 0
      res.amountcopy = ''
      this.accNoListQry()
      this.getPostscript()
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
    }
    this.accNoListQry()
    this.getPostscript()
  }
}
</script>
