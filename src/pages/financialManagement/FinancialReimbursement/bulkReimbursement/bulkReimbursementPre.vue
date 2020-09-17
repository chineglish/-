<template>
    <d2-container>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <div class="form-box">
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          @changePayerAccNo="changePayerAccNo"
          @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
          @changeUp="changeUp"
          @submit="onSubmit"
        ></m-new-form>
        </div>
        <div class="m-tips">
          <p class="hint-title fs16">
            <img class="hint-title-img" src="../../../../components/m-hint-box/prompt.png">
            温馨提示</p>
          <ul class="hint-box">
            <li class="m-pclass fs14">
              1.<a ref="template" href='/resources/bulkReimbursement.xls' download="大连银行财务报销模板.xls">财务报销模板下载</a>。
            </li>
            <li class="m-pclass fs14">
              2.下载并打开模板，所选择显示顺序从左至右依次为：固定项(序号、账号、户名、报销金额)。
            </li>
          </ul>
        </div>
    </d2-container>
</template>
<script>
/**
 * @name 财务报销
 * @date 2019-12-14
 * @auther 邓焕
 */

import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'bulkReimbursementPre',
  data () {
    return {
      payment: '',
      paymentSalaryInfo: [],
      // payment: [],
      formModel: {
        fileType: 'excel',
        uploadFile: [],
        payerAccNo: '',
        contractNo: '',
        availBal: '',
        totalAmount: '',
        totalNum: '',
        templateName: ''
      },
      breadData: ['财务管理', '财务报销', '批量报销'],
      // 以下为动态数据
      formConfigJson: {
        stepsActive: 0,
        rules: {
          uploadFile: [{ required: true, message: '请选择要上传的文件', trigger: 'submit' }],
          payerAccNo: [{ required: true, message: '请输入付款账户', trigger: 'submit' }],
          balance: [{ required: false, message: '可用余额', trigger: 'submit' }],
          totalAmount: [{ required: true, message: '请输入总金额', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              if (Number(value) > Number(this.formModel.availBal)) {
                callback(new Error('输入金额大于可用余额'))
              } else { callback() }
            },
            trigger: 'blur' }],
          totalNum: [{ required: true, message: '请输入总笔数', trigger: 'submit' }, { validator: (rule, value, callback) => {
            if (Number(value) > 2000) {
              callback(new Error('输入总笔数不能大于2000条'))
            } else { callback() }
          },
          trigger: 'blur' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '付款账户',
                'type': 'select',
                'changeEventName': 'changePayerAccNo',
                options: [],
                trans: { value: 'payerAccNoValue', key: 'Dfzh' },
                'key': 'payerAccNo'
              },
              {
                'disabled': false,
                'label': '可用余额(元)',
                'type': 'text',
                'key': 'availBal',
                textType: 'shy',
                mousedown: false,
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '合同号',
                'type': 'text',
                'key': 'contractNo'
              },
              {
                'disabled': false,
                'label': '上传文件类型',
                'type': 'text',
                'key': 'fileType'
              },
              {
                'disabled': false,
                'label': '报销总笔数',
                'type': 'input',
                'key': 'totalNum',
                maxlength: 4
              },
              {
                'disabled': false,
                'label': '报销总金额',
                'type': 'input',
                inputType: 'money',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                'inputEventName': 'changeUp',
                'key': 'totalAmount'
              },
              {
                'disabled': false,
                'label': '模板名称',
                'type': 'text',
                'key': 'templateName'
              },
              {
                'disabled': false,
                'label': '上传附件',
                'type': 'upload',
                'key': 'uploadFile',
                width: '100%',
                inputWidth: '65%',
                fileType: ['xls', 'xlsx']
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      msgs: []
    }
  },
  methods: {
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.totalAmount = util.limitInputMoney(res.totalAmount)
    },
    onSubmit (params) {
      httpPost('/eweb-transfer.FinanceReimburseUploadFile.do', {
        totalAmount: params.totalAmount,
        totalNum: params.totalNum,
        fileType: 'xls',
        uploadFile: params.uploadFile[0],
        templateContent: '1_序号|2_账号|3_姓名|4_报销金额|'
      }, { formData: true }).then(res => {
        httpPost('/eweb-transfer.FinanceReimburseConfirm.do', {
          amount: params.totalAmount,
          fileType: 'xls',
          totalNum: params.totalNum,
          contractNo: params.contractNo,
          summaryCode: 'IB0320',
          templateName: params.templateName,
          templateContent: '1_序号|2_账号|3_姓名|4_报销金额|',
          acNo: params.payerAccNo,
          payerSubAcNo: this.payment.subAcNo
        }).then(result => {
          result.availBal = params.availBal
          result.uploadFile = params.uploadFile[0].name
          result.payerAccName = params.payerAccName
          result.payerAccNo = params.payerAccNo
          result.payerSubAcNo = this.payment.subAcNo
          this.$router.push({
            name: 'bulkReimbursementConf',
            params: result
          })
        })
      })
    },
    getPaymentSalaryInfo () {
      httpPost('/eweb-transfer.FinanceReimburseInfoQuery.do').then(res => {
        this.paymentSalaryInfo = res.infoList
        res.infoList.forEach(item => {
          item.payerAccNoValue = item.Dfzh + '/' + item.subAcNo + '/' + item.Dwmc
        })
        if (res.infoList.length > 0) {
          // this.payment.subAcNo = res.infoList[0].subAcNo
          this.changePayerAccNo(this.formModel, res.infoList[0])
        }
        this.formConfigJson.formItems[0].group[0].options = res.infoList
      })
    },
    changePayerAccNo (res, obj) {
      this.payment = obj
      //  修改balance的值
      this.$set(this.formModel, 'payerAccNo', obj.Dfzh)
      this.$set(this.formModel, 'payerAccName', obj.Dwmc)
      this.$set(this.formModel, 'contractNo', obj.Ywbh)
      httpPost('/eweb-acmgmt.AccountInfoQuery.do', {
        payerAcNo: obj.Dfzh,
        payerSubAcNo: obj.subAcNo
      }).then(result => {
        this.$set(this.formModel, 'availBal', result.availBal)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.template.href = `${util.getUrl()}resources/bulkReimbursement.xls`
    })
  },
  created () {
    this.formModel.templateName = '批量报销'
    this.getPaymentSalaryInfo()
  }
}
</script>
