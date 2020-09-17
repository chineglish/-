<template>
    <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
              ref="mNewForm"
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
              @changeUp="changeUp"
              @submit="onSubmit"
              @reset="reset"
            >
            </m-new-form>
        </div>
        <div class="m-tips">
          <p class="hint-title fs16">
            <img class="hint-title-img" src="../../../../components/m-hint-box/prompt.png">
            温馨提示</p>
          <ul class="hint-box">
            <li class="m-pclass fs14">
              <span class="p-span"></span>1.为了保护企业账户和资金安全，请勿向陌生人汇款，谨防电信网络新型违法犯罪。
            </li>
            <li class="m-pclass fs14">
              <span class="p-span"></span>2.小额定期贷记业务指付款账户开户行依据当事各方签订的合同(协议)，定期向指定的收款账户开户银行发起的批量付款业务。
            </li>
            <li class="m-pclass fs14">
              <span class="p-span"></span>3.上传的批量文件，我们为您提供模板下载，点击<a ref="template" href='/resources/creditTemplate.xls' download="大连银行小额定期贷记模板.xls">模板下载</a>请按照模板样式编辑。一 个批量文件可录入2000笔收费指令。
            </li>
            <li class="m-pclass fs14">
              <span class="p-span"></span>4.交易结果可通过“小额定期贷记查询”。
            </li>
            <li class="m-pclass fs14">
              <span class="p-span"></span>5.批量付款文件包中单笔转账金额应小于50000.00元，若超过渠道单笔限额将导致整个文件包失败。
            </li>
          </ul>
        </div>
    </d2-container>
</template>
<script>
/**
 * @name 小额定期贷记业务
 * @date 2019-12-21
 * @auther 邓焕
 */

import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

// import axios from 'axios'
export default {
  name: 'smallRatedCreditBusinessContractPre',
  data () {
    return {
      formModel: {
        paymentAct: '',
        paymentActShow: '',
        businessType: '',
        businessKind: '',
        contractNo: '',
        singleFeeAmt: '',
        balance: '',
        payerAmt: '',
        detailsNum: '',
        uploadFile: []
      },
      breadData: ['财务管理', '小额定期贷记业务'],
      // 以下为动态数据
      formConfigJson: {
        stepsActive: 0,
        rules: {
          payerAmt: [{ required: true, message: '请输入支付金额', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              if (Number(value) > Number(this.formModel.balance)) {
                callback(new Error('输入金额大于可用余额'))
              } else { callback() }
            },
            trigger: 'blur' }],
          uploadFile: [{ required: true, message: '请选择要上传的文件', trigger: 'submit' }],
          detailsNum: [{ required: true, message: '请输入明细笔数', trigger: 'submit' }, { validator: (rule, value, callback) => {
            if (Number(value) > 2000) {
              this.$refs.mNewForm.$data.form.detailsNum = 2000
              callback(new Error('明细笔数需小于2000笔'))
            } else if (Number(value) < 0) {
              this.$refs.mNewForm.$data.form.detailsNum = 0
              callback(new Error('明细笔数需大于0笔'))
            } else { callback() }
          },
          trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '付款账户',
                'type': 'text',
                'key': 'payeracc'
              },
              {
                'disabled': false,
                'label': '业务类型',
                'type': 'text',
                'key': 'businessType'
              },
              {
                'disabled': false,
                'label': '业务种类',
                'type': 'text',
                'key': 'businessKind'
              },
              {
                'disabled': false,
                'label': '合同(协议)号',
                'type': 'text',
                'key': 'outprotocalno'
              },
              {
                'disabled': false,
                'label': '单笔手续费',
                'type': 'text',
                'key': 'singleFee',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '账户余额',
                'type': 'text',
                'key': 'balance',
                textType: 'shy',
                mousedown: false,
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '支付金额',
                'type': 'input',
                inputType: 'money',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                'inputEventName': 'changeUp',
                'key': 'payerAmt'
              },
              {
                'disabled': false,
                'label': '明细笔数',
                'type': 'input',
                oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                'inputEventName': 'changeUp',
                maxlength: 4,
                'key': 'detailsNum'
              },
              {
                'disabled': false,
                'label': '上传附件',
                'type': 'upload',
                'key': 'uploadFile',
                width: '100%',
                inputWidth: '65%'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  methods: {
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.payerAmt = util.limitInputMoney(res.payerAmt)
    },
    onSubmit (params) {
      let _params = params
      httpPost('/eweb-transfer.SmallLimitLeadUploadFile.do', {
        type: 'lead',
        acNo: _params.payeracc,
        subScNo: _params.subAcNo,
        amount: _params.payerAmt,
        count: _params.detailsNum,
        fee: _params.feeamount,
        uploadFile: params.uploadFile[0]
      }, { formData: true }).then(res => {
        _params.filePath = res.bodyMap.filePath
        _params.fee = res.bodyMap.fee
        _params.feeShow = util.formatCurrency(res.bodyMap.fee)
        httpPost('/eweb-transfer.SmallLimitLeadConfirm.do', {
          filePath: res.bodyMap.filePath,
          type: 'lead',
          protocalNo: this.formModel.outprotocalno,
          acNo: _params.payeracc,
          payerSubAcNo: _params.subAcNo,
          amount: params.payerAmt,
          count: params.detailsNum,
          singleFee: params.feeamount,
          fee: res.bodyMap.fee,
          businessType: params.busitype,
          businessKind: params.busikind
        }).then(confirm => {
          Object.assign(confirm, _params)
          this.$router.push({
            name: 'smallRatedCreditBusinessContractConf',
            params: {
              formModel: confirm
            }
          })
        })
      })
    },
    reset (res) {
      res.payerAmtcopy = ''
      this.formModel = res
    }
  },
  mounted () {
    this.$refs.template.href = util.getUrl() + 'resources/creditTemplate.xls'
  },
  created () {
    if (this.$route.params.data) {
      Object.assign(this.formModel, this.$route.params.data)
      this.formModel.singleFee = this.formModel.feeamount // 单笔手续费
    }
    if (this.$route.params.formModeluu) {
      Object.assign(this.formModel, this.$route.params.formModeluu)
    }
  }
}
</script>
