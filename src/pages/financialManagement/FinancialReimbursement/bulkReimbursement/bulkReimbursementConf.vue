<template>
  <d2-container>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
        :btnData="btnData"
        :isDisabled="doSubmit"
        @submit="onSubmit"
        @back="onBack">
      </m-new-form>
    </div>
  </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
// import { Sign } from '@/assets/js/SignMsg'
export default {
  name: 'fileUploadConf',
  data () {
    return {
      uploadFile: [],
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
        stepsActive: 1,
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '付款账户',
                'type': 'text',
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
                'disabled': true,
                'label': '合同号',
                'type': 'text',
                'key': 'contractNo'
              },
              {
                'disabled': true,
                'label': '上传文件类型',
                'type': 'text',
                'key': 'fileType'
              },
              {
                'disabled': false,
                'label': '报销总笔数',
                'type': 'text',
                'key': 'totalNum'
              },
              {
                'disabled': false,
                'label': '报销总金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '模板名称',
                'type': 'text',
                'key': 'templateName'
              },
              {
                'disabled': true,
                'label': '上传附件',
                'type': 'text',
                'key': 'uploadFile'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      doSubmit: true
    }
  },
  methods: {
    onSubmit (res) {
      let params = this.$route.params
      params.payerAccName = params.payerAccName
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: params._Data2Sign, _authenticateType: params._authenticateType })
        httpPost('/eweb-transfer.FinanceReimburse.do', {
          _dataMapKey: params._dataMapKey,
          _authenticateTypeChoose: params._authenticateType ? params._authenticateType[0] : '',
          CSIISignature: singMsg,
          amount: params.amount,
          // totalAmount: params.totalAmount,
          totalNum: params.totalNum,
          fileType: 'xls',
          contractNo: params.contractNo,
          filePath: params.filePath,
          fileName: params.fileName,
          sourceFilePath: params.sourceFilePath,
          templateName: params.templateName,
          templateContent: '1_序号|2_账号|3_姓名|4_报销金额|',
          summaryCode: 'IB0320',
          acNo: params.acNo,
          payerSubAcNo: params.payerSubAcNo,
          _tokenName: token._tokenName
        }).then(res => {
          this.$router.push({
            name: 'bulkReimbursementResult',
            params: {
              ...params,
              res
            }
          })
        })
      })
    },
    onBack (data) {
      this.$router.push({
        name: 'bulkReimbursementPre'
      })
    }
  },
  created () {
    // console.log(this.$route.params.uploadFile)
    this.formModel = this.$route.params
    // this.formModel.uploadFile = this.$route.params.uploadFile[0].name
  }
}
</script>
