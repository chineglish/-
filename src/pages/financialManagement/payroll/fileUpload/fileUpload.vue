<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-new-form
            :componentJson="formConfigJson"
            :btnData="btnData"
            :formModel="formModel"
            :msgs="promptList"
            @changeFileType="changeFileType"
            @changePayerAccNo="changePayerAccNo"
            @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
            @changeTemplateNo="changeTemplateNo"
            @changeUp="changeUp"
            @reset="reset"
            @submit="onSubmit">
    </m-new-form>
  </div>
</template>
<script>
  /**
   * @name 文件上传
   * @date 2019-12-09
   * @auther 邓焕
   */
  import { httpPost } from '@/api/sys/http'
  import util from '@/libs/util'
  export default {
    name: 'fileUpload',
    data () {
      return {
        fileList: [],
        payment: '',
        paymentList: '',
        templateList: [],
        template: '',
        // 为了传给确认页,别删
        fileTypeList: [{ 'value': 'txt记事本', 'key': '0' }, { 'value': 'excel', 'key': '1' }],
        formModel: {
          fileType: '0',
          uploadFile: [],
          payerAccNo: '',
          contractNo: '',
          totalAmt: '',
          totalNum: '',
          templateName: '默认模板'
        },
        breadData: ['财务管理', '代发工资', '文件上传'],
        // 以下为动态数据
        formConfigJson: {
          stepsActive: 0,
          rules: {
            fileType: [{ required: false, message: '上传文件类型', trigger: 'submit' }],
            uploadFile: [{ required: true, message: '请选择要上传的文件', trigger: 'submit' }],
            payerAccNo: [{ required: true, message: '请选择付款账户', trigger: 'submit' }],
            contractNo: [{ required: false, message: '合同号', trigger: 'submit' }],
            totalAmt: [{ required: true, message: '请输入总金额', trigger: 'submit' }],
            totalNum: [{ required: true, message: '请输入总笔数', trigger: 'submit' }],
            templateName: [{ required: false, message: '模板名称', trigger: 'submit' }]
          },
          formItems: [
            {
              formWidth: '50%',
              // labelWidth: '50%',
              group: [
                {
                  'disabled': false,
                  'label': '付款账户',
                  'type': 'select',
                  'changeEventName': 'changePayerAccNo',
                  'options': [],
                  trans: { value: 'payerAccNoValue', key: 'Dfzh' },
                  'key': 'payerAccNo'
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
                  'disabled': false,
                  'label': '合同号',
                  'type': 'text',
                  'key': 'contractNo'
                },
                {
                  'disabled': false,
                  'label': '总笔数',
                  'type': 'input',
                  'key': 'totalNum'
                },
                {
                  'disabled': false,
                  'label': '总金额',
                  'type': 'input',
                  inputType: 'money',
                  // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                  keydownEventName: 'limitMoneyInputKeyDown',
                  'inputEventName': 'changeUp',
                  'key': 'totalAmt'
                },
                {
                  'disabled': false,
                  'label': '上传文件类型',
                  'type': 'radio',
                  'changeEventName': 'changeFileType',
                  'options': [{ 'value': 'txt记事本', 'key': '0' }, { 'value': 'excel表格', 'key': '1' }],
                  'key': 'fileType'
                },
                {
                  'disabled': false,
                  'label': '上传附件',
                  'type': 'upload',
                  'key': 'uploadFile',
                  width: '100%',
                  inputWidth: '65%',
                  fileType: ['txt']
                },
                {
                  disabled: false,
                  'label': '模板名称',
                  'type': 'text',
                  'key': 'templateName'
                }
              ]
            }
          ]
        },
        btnData: [
          { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
          { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
        ],
        promptList: [
          '1.代发工资文件中“账号”填写的账户类型为借记卡时卡号必须为全账号即需填写银行卡卡bin (银联标识60”、“62”打头)。',
          '2.代发工资文件中数据格式尽量按照模板格式进行配置:“实发金额”以及后面的金额列为数值格式且最多保留小数点后两位;下载的模板所有列均不允许删除。',
          '3.通过“文件上传”交易完成代发工资后，并不表示上传文件中所有员工工资发放成功。您需要通过“发放结果查询”交易查询代发工资成功和失败交易明细。',
          '4.如果由于账户状态不正常或户名不符等原因，代发工资没有全部成功。可通过“发放结果查询”交易下载实际代发失败的交易明细，对数据进行修改后可重新进行文件上传。注意:修改完失败交易明细后删除第1列“处理结果”列，将所有金额项格式修改为数值格式才能进行重新上传。',
          '5.上传代发工资文件后，系统会根据代发笔数进行实时或非实时处理: 2000笔以下实时处理; 2000笔以上系统会根据笔数和系统状况选择相应时间段进行处理，请通过“发放结果查询”交易查询处理状态。原则上，当日上传代发工资系统会当日处理完毕。',
          '6.柜面开通网银代发工资功能时需要设置月累计限额、月累计次数，代发工资金额和次数受月累计限额、月累计次数控制。',
          { text: '7.txt模板下载', link: `${util.getUrl()}resources/payrollTemplate.txt`, download: '代发工资txt模板.txt' }
        ]
      }
    },
    methods: {
      limitMoneyInputKeyDown (e) {
        util.limitMoneyInputKeyDown(e)
      },
      changeUp (res) {
        res.totalAmt = util.limitInputMoney(res.totalAmt)
      },
      onSubmit (res) {
        console.log(this.payment)
        if (res.fileType === '0' || (res.fileType === '1' && this.templateList.length > 0)) {
          let _params = res
          httpPost('/eweb-transfer.PaySalaryUploadFile.do', {
            uploadFile: res.uploadFile[0],
            fileType: res.fileType === '0' ? 'txt' : 'xls',
            totalAmount: res.totalAmt,
            totalNum: res.totalNum,
            templateContent: res.fileType === '0' ? '1_序号|2_账号|3_姓名|4_实发工资|' : this.template.templateContent
          }, { formData: true }).then(result => {
            httpPost('/eweb-transfer.PaySalaryUploadConfirm.do', {
              fileType: res.fileType === '0' ? 'txt' : 'xls',
              totalNum: res.totalNum,
              contractNo: res.contractNo,
              summaryCode: '327',
              templateName: res.fileType === '0' ? '默认模板' : this.template.templateName,
              templateContent: res.fileType === '0' ? '1_序号|2_账号|3_姓名|4_实发工资|' : this.template.templateContent,
              amount: res.totalAmt,
              acNo: this.payment.Dfzh,
              payerSubAcNo: this.payment.subAcNo
            }).then(result => {
              _params.Qszh = this.payment.Qszh
              _params.acName = this.payment.Dwmc
              _params.fileName = res.uploadFile[0].name
              _params.templateName = res.fileType === '0' ? '默认模板' : this.template.templateName
              Object.assign(result, _params)
              this.$router.push({
                name: 'fileUploadConf',
                params: { formModel: result }
              })
            })
          })
        } else {
          this.$msg('无可用模板')
        }
      },
      // 重置
      reset (res) {
        res.totalAmtcopy = ''
        this.formModel = res
        this.getpaymentSalaryInfoQuery()
      },
      //  改变传入文件类型,修改模板名称
      changeFileType (res) {
        this.formModel.fileType = res.fileType
        res.uploadFile = []
        if (res.fileType === '1') {
          this.formConfigJson.formItems[0].group.splice(7, 1, {
            disabled: false,
            'label': '模板名称',
            'type': 'select',
            options: this.templateList,
            'changeEventName': 'changeTemplateNo',
            trans: { value: 'templateName', key: 'templateNo' },
            'key': 'templateNo'
          })
          if (this.templateList.length > 0) {
            if (this.$route.params.templateNo) {
              this.template = this.templateList.find(item => item.templateNo === this.$route.params.templateNo)
            } else {
              this.template = this.templateList[0]
            }
            res.templateNo = this.template.templateNo
          } else {
            res.templateName = '无可用模板!!!'
          }
          this.formConfigJson.formItems[0].group[6].fileType = ['xls', 'xlsx']
        } else {
          this.formConfigJson.formItems[0].group.splice(7, 1, {
            disabled: false,
            'label': '模板名称',
            'type': 'text',
            'key': 'templateName'
          })
          res.templateName = '默认模板'
          this.formConfigJson.formItems[0].group[6].fileType = ['txt']
        }
      },
      changeTemplateNo (res, obj) {
        this.template = obj
      },
      //  获取合同号
      changePayerAccNo (res, obj) {
        this.payment = obj
        this.$set(this.formModel, 'payerAccNo', obj.Dfzh)
        this.$set(this.formModel, 'contractNo', obj.Ywbh)
        // res.payerAcNo = obj.Dfzh
        // res.contractNo = obj.Ywbh
        httpPost('/eweb-acmgmt.AccountInfoQuery.do', {
          payerAcNo: obj.Dfzh,
          payerSubAcNo: obj.subAcNo
        }).then(result => {
          this.$set(this.formModel, 'availBal', result.availBal)
          console.log(this.formModel)
          // res.availBal = result.availBal
          // res.availBal = result.availBal
        })
      },
      //  获取合同号信息
      getpaymentSalaryInfoQuery () {
        httpPost('/eweb-transfer.PaymentSalaryInfoQuery.do').then(result => {
          this.paymentList = result.infoList
          this.paymentList.forEach(item => {
            item.payerAccNoValue = item.Dfzh + '/' + item.subAcNo + '/' + item.Dwmc
          })
          this.formConfigJson.formItems[0].group[0].options = this.paymentList
          if (this.paymentList.length > 0) {
            this.changePayerAccNo(this.formModel, this.paymentList[0])
          }
        })
      },
      //  获取模板信息
      getPaySalaryTemplateQuery () {
        httpPost('/eweb-transfer.PaySalaryTemplateQuery.do').then(result => {
          this.templateList = result.templateList
          if (this.$route.params.templateNo) {
            this.formModel.fileType = 1
            this.changeFileType(this.formModel)
          }
        })
      }
    },
    created () {
      this.getpaymentSalaryInfoQuery()
      this.getPaySalaryTemplateQuery()
    }
  }
</script>

<!--<template>-->
<!--  <div>-->
<!--    <m-breadcrumb :data="breadData"></m-breadcrumb>-->
<!--    <m-new-form-->
<!--      ref="form"-->
<!--      :componentJson="formConfigJson"-->
<!--      :btnData="btnData"-->
<!--      :formModel="formModel"-->
<!--      :msgs="promptList"-->
<!--      @changeFileType="changeFileType"-->
<!--      @changePayerAccNo="changePayerAccNo"-->
<!--      @limitMoneyInputKeyDown="limitMoneyInputKeyDown"-->
<!--      @changeTemplateNo="changeTemplateNo"-->
<!--      @changeUp="changeUp"-->
<!--      @reset="reset"-->
<!--      @submit="onSubmit">-->
<!--    </m-new-form>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--/**-->
<!-- * @name 文件上传-->
<!-- * @date 2019-12-09-->
<!-- * @auther 邓焕-->
<!-- */-->
<!--import { httpPost } from '@/api/sys/http'-->
<!--import util from '@/libs/util'-->
<!--export default {-->
<!--  name: 'fileUpload',-->
<!--  data () {-->
<!--    return {-->
<!--      fileList: [],-->
<!--      payment: '',-->
<!--      paymentList: '',-->
<!--      templateList: [],-->
<!--      template: '',-->
<!--      // 为了传给确认页,别删-->
<!--      fileTypeList: [{ 'value': 'txt记事本', 'key': '0' }, { 'value': 'excel', 'key': '1' }],-->
<!--      formModel: {-->
<!--        fileType: '0',-->
<!--        uploadFile: '',-->
<!--        payerAccNo: '',-->
<!--        contractNo: '',-->
<!--        totalAmt: '',-->
<!--        totalNum: '',-->
<!--        templateName: '默认模板'-->
<!--      },-->
<!--      breadData: ['财务管理', '代发工资', '文件上传'],-->
<!--      // 以下为动态数据-->
<!--      formConfigJson: {-->
<!--        stepsActive: 0,-->
<!--        rules: {-->
<!--          fileType: [{ required: false, message: '上传文件类型', trigger: 'submit' }],-->
<!--          uploadFile: [{ required: true, message: '请选择要上传的文件', trigger: 'submit' }],-->
<!--          payerAccNo: [{ required: true, message: '请选择付款账户', trigger: 'submit' }],-->
<!--          contractNo: [{ required: false, message: '合同号', trigger: 'submit' }],-->
<!--          totalAmt: [{ required: true, message: '请输入总金额', trigger: 'submit' }],-->
<!--          totalNum: [{ required: true, message: '请输入总笔数', trigger: 'submit' }],-->
<!--          templateName: [{ required: false, message: '模板名称', trigger: 'submit' }]-->
<!--        },-->
<!--        formItems: [-->
<!--          {-->
<!--            formWidth: '50%',-->
<!--            // labelWidth: '50%',-->
<!--            group: [-->
<!--              {-->
<!--                'disabled': false,-->
<!--                'label': '付款账户',-->
<!--                'type': 'select',-->
<!--                'changeEventName': 'changePayerAccNo',-->
<!--                'options': [],-->
<!--                trans: { value: 'payerAccNoValue', key: 'Dfzh' },-->
<!--                'key': 'payerAccNo'-->
<!--              },-->
<!--              {-->
<!--                'disabled': false,-->
<!--                'label': '可用余额',-->
<!--                'type': 'text',-->
<!--                'key': 'availBal',-->
<!--                textType: 'shy',-->
<!--                mousedown: false,-->
<!--                formatter: (name, value) => util.formatCurrency(value)-->
<!--              },-->
<!--              {-->
<!--                'disabled': false,-->
<!--                'label': '合同号',-->
<!--                'type': 'text',-->
<!--                'key': 'contractNo'-->
<!--              },-->
<!--              {-->
<!--                'disabled': false,-->
<!--                'label': '总笔数',-->
<!--                'type': 'input',-->
<!--                'key': 'totalNum'-->
<!--              },-->
<!--              {-->
<!--                'disabled': false,-->
<!--                'label': '总金额',-->
<!--                'type': 'input',-->
<!--                inputType: 'money',-->
<!--                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',-->
<!--                keydownEventName: 'limitMoneyInputKeyDown',-->
<!--                'inputEventName': 'changeUp',-->
<!--                'key': 'totalAmt'-->
<!--              },-->
<!--              {-->
<!--                'disabled': false,-->
<!--                'label': '上传文件类型',-->
<!--                'type': 'radio',-->
<!--                'changeEventName': 'changeFileType',-->
<!--                'options': [{ 'value': 'txt记事本', 'key': '0' }, { 'value': 'excel表格', 'key': '1' }],-->
<!--                'key': 'fileType'-->
<!--              },-->
<!--              {-->
<!--                'disabled': false,-->
<!--                'label': '上传附件',-->
<!--                'type': 'uploadFile',-->
<!--                'key': 'uploadFile',-->
<!--                formData: {},-->
<!--                url: `${process.env.VUE_APP_API}/eweb-transfer.PaySalaryUploadFile.do`,-->
<!--                successFun: this.PaySalaryUploadConfirm,-->
<!--                fileType: ['text/plain', 'file/txt']-->
<!--              },-->
<!--              // {-->
<!--              //   'disabled': false,-->
<!--              //   'label': '上传附件',-->
<!--              //   'type': 'upload',-->
<!--              //   'key': 'uploadFile',-->
<!--              //   width: '100%',-->
<!--              //   inputWidth: '65%',-->
<!--              //   fileType: ['txt']-->
<!--              // },-->
<!--              {-->
<!--                disabled: false,-->
<!--                'label': '模板名称',-->
<!--                'type': 'text',-->
<!--                'key': 'templateName'-->
<!--              }-->
<!--            ]-->
<!--          }-->
<!--        ]-->
<!--      },-->
<!--      btnData: [-->
<!--        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },-->
<!--        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }-->
<!--      ],-->
<!--      promptList: [-->
<!--        '1.代发工资文件中“账号”填写的账户类型为借记卡时卡号必须为全账号即需填写银行卡卡bin (银联标识60”、“62”打头)。',-->
<!--        '2.代发工资文件中数据格式尽量按照模板格式进行配置:“实发金额”以及后面的金额列为数值格式且最多保留小数点后两位;下载的模板所有列均不允许删除。',-->
<!--        '3.通过“文件上传”交易完成代发工资后，并不表示上传文件中所有员工工资发放成功。您需要通过“发放结果查询”交易查询代发工资成功和失败交易明细。',-->
<!--        '4.如果由于账户状态不正常或户名不符等原因，代发工资没有全部成功。可通过“发放结果查询”交易下载实际代发失败的交易明细，对数据进行修改后可重新进行文件上传。注意:修改完失败交易明细后删除第1列“处理结果”列，将所有金额项格式修改为数值格式才能进行重新上传。',-->
<!--        '5.上传代发工资文件后，系统会根据代发笔数进行实时或非实时处理: 2000笔以下实时处理; 2000笔以上系统会根据笔数和系统状况选择相应时间段进行处理，请通过“发放结果查询”交易查询处理状态。原则上，当日上传代发工资系统会当日处理完毕。',-->
<!--        '6.柜面开通网银代发工资功能时需要设置月累计限额、月累计次数，代发工资金额和次数受月累计限额、月累计次数控制。',-->
<!--        { text: '7.txt模板下载', link: `${util.getUrl()}resources/payrollTemplate.txt`, download: '代发工资txt模板.txt' }-->
<!--      ]-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    limitMoneyInputKeyDown (e) {-->
<!--      util.limitMoneyInputKeyDown(e)-->
<!--    },-->
<!--    changeUp (res) {-->
<!--      res.totalAmt = util.limitInputMoney(res.totalAmt)-->
<!--    },-->
<!--    PaySalaryUploadConfirm (file, response, status, headers, res) {-->
<!--      debugger-->
<!--      // console.log(file, response, status, headers, res)-->
<!--      httpPost('/eweb-transfer.PaySalaryUploadConfirm.do', {-->
<!--        fileType: res.fileType === '0' ? 'txt' : 'xls',-->
<!--        totalNum: res.totalNum,-->
<!--        contractNo: res.contractNo,-->
<!--        summaryCode: '327',-->
<!--        templateName: res.fileType === '0' ? '默认模板' : this.template.templateName,-->
<!--        templateContent: res.fileType === '0' ? '1_序号|2_账号|3_姓名|4_实发工资|' : this.template.templateContent,-->
<!--        amount: res.totalAmt,-->
<!--        acNo: this.payment.Dfzh-->
<!--      }).then(result => {-->
<!--        res.acName = this.payment.Dwmc-->
<!--        res.fileName = file.name-->
<!--        res.templateName = res.fileType === '0' ? '默认模板' : this.template.templateName-->
<!--        Object.assign(result, res)-->
<!--        this.$router.push({-->
<!--          name: 'fileUploadConf',-->
<!--          params: { formModel: result }-->
<!--        })-->
<!--      })-->
<!--    },-->
<!--    onSubmit (res) {-->
<!--      if (res.fileType === '0' || (res.fileType === '1' && this.templateList.length > 0)) {-->
<!--        // let _params = res-->
<!--        this.$refs.form.$refs.fileUpload[0].fileUploader.formData = {-->
<!--          fileType: res.fileType === '0' ? 'txt' : 'xls',-->
<!--          totalAmount: res.totalAmt,-->
<!--          totalNum: res.totalNum,-->
<!--          templateContent: res.fileType === '0' ? '1_序号|2_账号|3_姓名|4_实发工资|' : this.template.templateContent-->
<!--        }-->
<!--        this.$refs.form.$refs.fileUpload[0].uploadAll()-->
<!--        const ieVersion = util.getIEVersion()-->
<!--        if (ieVersion && ieVersion <= 9) {-->
<!--           window.setTimeout(() => {-->
<!--            httpPost('/eweb-transfer.PaySalaryUploadConfirm.do', {-->
<!--              fileType: res.fileType === '0' ? 'txt' : 'xls',-->
<!--              totalNum: res.totalNum,-->
<!--              contractNo: res.contractNo,-->
<!--              summaryCode: '327',-->
<!--              templateName: res.fileType === '0' ? '默认模板' : this.template.templateName,-->
<!--              templateContent: res.fileType === '0' ? '1_序号|2_账号|3_姓名|4_实发工资|' : this.template.templateContent,-->
<!--              amount: res.totalAmt,-->
<!--              acNo: this.payment.Dfzh-->
<!--            }).then(result => {-->
<!--              res.acName = this.payment.Dwmc-->
<!--              res.fileName = res.uploadFile-->
<!--              res.templateName = res.fileType === '0' ? '默认模板' : this.template.templateName-->
<!--              Object.assign(result, res)-->
<!--              this.$router.push({-->
<!--                name: 'fileUploadConf',-->
<!--                params: { formModel: result }-->
<!--              })-->
<!--            })-->
<!--          }, 2000)-->
<!--        }-->
<!--        // httpPost('/eweb-transfer.PaySalaryUploadFile.do', {-->
<!--        //   uploadFile: res.uploadFile[0],-->
<!--        //   fileType: res.fileType === '0' ? 'txt' : 'xls',-->
<!--        //   totalAmount: res.totalAmt,-->
<!--        //   totalNum: res.totalNum,-->
<!--        //   templateContent: res.fileType === '0' ? '1_序号|2_账号|3_姓名|4_实发工资|' : this.template.templateContent-->
<!--        // }, { formData: true }).then(result => {-->
<!--        //   httpPost('/eweb-transfer.PaySalaryUploadConfirm.do', {-->
<!--        //     fileType: res.fileType === '0' ? 'txt' : 'xls',-->
<!--        //     totalNum: res.totalNum,-->
<!--        //     contractNo: res.contractNo,-->
<!--        //     summaryCode: '327',-->
<!--        //     templateName: res.fileType === '0' ? '默认模板' : this.template.templateName,-->
<!--        //     templateContent: res.fileType === '0' ? '1_序号|2_账号|3_姓名|4_实发工资|' : this.template.templateContent,-->
<!--        //     amount: res.totalAmt,-->
<!--        //     acNo: this.payment.Dfzh-->
<!--        //   }).then(result => {-->
<!--        //     _params.acName = this.payment.Dwmc-->
<!--        //     _params.fileName = res.uploadFile[0].name-->
<!--        //     _params.templateName = res.fileType === '0' ? '默认模板' : this.template.templateName-->
<!--        //     Object.assign(result, _params)-->
<!--        //     this.$router.push({-->
<!--        //       name: 'fileUploadConf',-->
<!--        //       params: { formModel: result }-->
<!--        //     })-->
<!--        //   })-->
<!--        // })-->
<!--      } else {-->
<!--        this.$msg('无可用模板')-->
<!--      }-->
<!--    },-->
<!--    // 重置-->
<!--    reset (res) {-->
<!--      res.totalAmtcopy = ''-->
<!--      this.formModel = res-->
<!--      this.getpaymentSalaryInfoQuery()-->
<!--    },-->
<!--    //  改变传入文件类型,修改模板名称-->
<!--    changeFileType (res) {-->
<!--      this.formModel.fileType = res.fileType-->
<!--      res.uploadFile = ''-->
<!--      this.$refs.form.$refs.fileUpload[0].clearAll()-->
<!--      if (res.fileType === '1') {-->
<!--        this.formConfigJson.formItems[0].group.splice(7, 1, {-->
<!--          disabled: false,-->
<!--          'label': '模板名称',-->
<!--          'type': 'select',-->
<!--          options: this.templateList,-->
<!--          'changeEventName': 'changeTemplateNo',-->
<!--          trans: { value: 'templateName', key: 'templateNo' },-->
<!--          'key': 'templateNo'-->
<!--        })-->
<!--        if (this.templateList.length > 0) {-->
<!--          if (this.$route.params.templateNo) {-->
<!--            this.template = this.templateList.find(item => item.templateNo === this.$route.params.templateNo)-->
<!--          } else {-->
<!--            this.template = this.templateList[0]-->
<!--          }-->
<!--          res.templateNo = this.template.templateNo-->
<!--        } else {-->
<!--          res.templateName = '无可用模板!!!'-->
<!--        }-->
<!--        this.formConfigJson.formItems[0].group[6].fileType = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']-->
<!--      } else {-->
<!--        this.formConfigJson.formItems[0].group.splice(7, 1, {-->
<!--          disabled: false,-->
<!--          'label': '模板名称',-->
<!--          'type': 'text',-->
<!--          'key': 'templateName'-->
<!--        })-->
<!--        res.templateName = '默认模板'-->
<!--        this.formConfigJson.formItems[0].group[6].fileType = ['text/plain', 'file/txt']-->
<!--      }-->
<!--    },-->
<!--    changeTemplateNo (res, obj) {-->
<!--      this.template = obj-->
<!--    },-->
<!--    //  获取合同号-->
<!--    changePayerAccNo (res, obj) {-->
<!--      this.payment = obj-->
<!--      this.$set(this.formModel, 'payerAccNo', obj.Dfzh)-->
<!--      this.$set(this.formModel, 'contractNo', obj.Ywbh)-->
<!--      // res.payerAcNo = obj.Dfzh-->
<!--      // res.contractNo = obj.Ywbh-->
<!--      httpPost('/eweb-acmgmt.AccountInfoQuery.do', {-->
<!--        payerAcNo: obj.Dfzh,-->
<!--        payerSubAcNo: obj.subAcNo-->
<!--      }).then(result => {-->
<!--        this.$set(this.formModel, 'availBal', result.availBal)-->
<!--        console.log(this.formModel)-->
<!--        // res.availBal = result.availBal-->
<!--        // res.availBal = result.availBal-->
<!--      })-->
<!--    },-->
<!--    //  获取合同号信息-->
<!--    getpaymentSalaryInfoQuery () {-->
<!--      httpPost('/eweb-transfer.PaymentSalaryInfoQuery.do').then(result => {-->
<!--        this.paymentList = result.infoList-->
<!--        this.paymentList.forEach(item => {-->
<!--          item.payerAccNoValue = item.Dfzh + '/' + item.Dwmc-->
<!--        })-->
<!--        this.formConfigJson.formItems[0].group[0].options = this.paymentList-->
<!--        if (this.paymentList.length > 0) {-->
<!--          this.changePayerAccNo(this.formModel, this.paymentList[0])-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    //  获取模板信息-->
<!--    getPaySalaryTemplateQuery () {-->
<!--      httpPost('/eweb-transfer.PaySalaryTemplateQuery.do').then(result => {-->
<!--        this.templateList = result.templateList-->
<!--        if (this.$route.params.templateNo) {-->
<!--          this.formModel.fileType = 1-->
<!--          this.changeFileType(this.formModel)-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  },-->
<!--  created () {-->
<!--    this.getpaymentSalaryInfoQuery()-->
<!--    this.getPaySalaryTemplateQuery()-->
<!--  }-->
<!--}-->
<!--</script>-->
