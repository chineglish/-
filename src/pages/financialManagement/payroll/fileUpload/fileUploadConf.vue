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
export default {
  name: 'fileUploadConf',
  data () {
    return {
      uploadFile: [],
      templateName: '',
      formModel: {
        fileType: '0',
        uploadFile: [],
        payerAccNo: '',
        contractNo: '',
        totalAmt: '',
        totalNum: '',
        Qszh: '',
        templateName: ''
      },
      breadData: ['财务管理', '代发工资', '文件上传'],
      // 以下为动态数据
      formConfigJson: {
        formWidth: '100%',
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
                'key': 'payerAccNo',
                formatter: (key, value) => {
                  return this.$route.params.formModel.acNo + this.$route.params.formModel.acName
                }
              },
              {
                'disabled': true,
                'label': '代发账号',
                'type': 'text',
                'key': 'Qszh',
                'show': true
              },
              {
                'disabled': false,
                'label': '可用余额',
                'type': 'text',
                'key': 'availBal',
                textType: 'shy',
                mousedown: false,
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '总金额',
                'type': 'text',
                'key': 'totalAmt',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'label': '总笔数',
                'type': 'text',
                'key': 'totalNum'
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
                'key': 'fileType',
                formatter: (key, value) => value === '0' ? 'text' : value === '1' ? 'excel' : '其他类型'
              },
              {
                'disabled': true,
                'label': '上传附件',
                'type': 'text',
                'key': 'fileName'
              },
              {
                disabled: true,
                'label': '模板名称',
                'type': 'text',
                'key': 'templateName'
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
    // 查询挡板账户
    // getCompanyDeductAcNo () {
    //   httpPost('/eweb-transfer.CompanyDeductAcNoQuery.do', {
    //     serviceNum: this.formModel.contractNo
    //   }).then(res => {
    //     this.formModel.dbzh = res.baffleAcNo + res.baffleAcName
    //   }).catch(() => {
    //     this.formConfigJson.formItems[0].group[1].show = false
    //   })
    // },
    onSubmit () {
      let _params = this.$route.params.formModel
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: _params._Data2Sign, _authenticateType: _params._authenticateType })
        httpPost('/eweb-transfer.PaySalaryUpload.do', {
          _authenticateTypeChoose: _params._authenticateType ? _params._authenticateType[0] : '',
          CSIISignature: singMsg,
          amount: _params.totalAmt,
          totalNum: _params.totalNum,
          fileType: _params.fileType === '0' ? 'txt' : 'xls',
          contractNo: _params.contractNo,
          _tokenName: token._tokenName,
          summaryCode: '327',
          _dataMapKey: _params._dataMapKey,
          acNo: this.$route.params.formModel.acNo,
          payerSubAcNo: this.$route.params.formModel.payerSubAcNo,
          templateName: _params.fileType === '0' ? '默认模板' : _params.templateName,
          templateContent: _params.fileType === '0' ? '1_序号|2_账号|3_姓名|4_实发工资|' : _params.templateContent
        }).then(res => {
          _params.acNo = this.$route.params.formModel.acNo
          _params.acName = this.$route.params.formModel.acName
          this.$router.push({
            name: 'uploadResults',
            params: { ..._params, res }
          })
        })
      })
    },
    onBack () {
      this.$router.push({
        name: 'fileUpload'
      })
    }
  },
  created () {
    console.log(this.$route.params.formModel)
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      // this.getCompanyDeductAcNo()
      // this.formModel.uploadFile = this.$route.params.formModel.uploadFile
      // this.formModel.templateNameShow = this.$route.params.formModel.templateName
    } else {
      this.onBack()
    }
  }
}
</script>
