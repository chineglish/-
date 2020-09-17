<template>
    <d2-container>
      <div class="form-box">
        <m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @changeAcount="changeAcount"
                @submit="onSubmit"
                @download="download"
                @changeUp="changeUp"
                @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
                @reset="reset">
        </m-new-form>
      </div>
      <a ref="downloadCryptoKit" href="" download="批量转账模板.xls" style="display: none"></a>
    </d2-container>
</template>
<script>
/**
 * @name 文件导入
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'fileImport',
  data () {
    return {
      payerAccNoList: [], // 付款账号信息列表
      formModel: {
        payerAccont: 0,
        transNum: '',
        amount: '',
        payerSubAcNo: '',
        availBal: '',
        batchFile: []
      },
      // 以下为动态数据
      formConfigJson: {
        rules: {
          payerAccont: [{ required: true, message: '请选择付款账户', trigger: 'submit' }],
          transNum: [{ required: true, message: '请输入总笔数', trigger: 'submit' }],
          amount: [
            { required: true, message: '请输入总金额', trigger: 'submit' },
            { validator: (rule, value, callback) => util.verifyAmount(value, callback), trigger: 'submit' }
          ],
          batchFile: [{ required: true, message: '请输入批量文件名称', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '付款账户',
                'type': 'select',
                'changeEventName': 'changeAcount',
                'options': [],
                trans: { value: 'payerAccontShow' },
                'key': 'payerAccont'
              },
              {
                'disabled': false,
                'label': '可用余额',
                'type': 'text',
                textType: 'shy',
                'key': 'availBal',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '总笔数',
                'type': 'input',
                inputType: 'int',
                'key': 'transNum'
              },
              {
                'disabled': false,
                'label': '总金额',
                'type': 'input',
                'key': 'amount',
                inputType: 'money',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                blurEventName: 'formatCurrency',
                'inputEventName': 'changeUp'
              },
              {
                'disabled': false,
                'label': '批量文件名称',
                'type': 'upload',
                width: '100%',
                inputWidth: '65%',
                'key': 'batchFile',
                'action': ''
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' },
        { btnText: '模板下载', class: 'm-submit-btn', clickEventName: 'download' }
      ]
    }
  },
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
    onSubmit (data) {
      let _params = data
      // 控制返回时，显示哪个标签
      _params.activeName = 'first'
      // let uploadData = new window.FormData()
      // const [accNo, subAccNo] = (data.payerAccont || '').split('-')
      let acNo = this.payerAccNoList[data.payerAccont].acNo
      let subAcNo = this.payerAccNoList[data.payerAccont].subAcNo
      let acName = this.payerAccNoList[data.payerAccont].acName
      // uploadData.append('fileType', 'xls')
      // uploadData.append('amount', data.amount)
      // uploadData.append('totalCount', data.transNum)
      // uploadData.append('payerAcNo', acNo)
      // uploadData.append('payerSubAcNo', subAcNo)
      // uploadData.append('uploadFile', data.batchFile[0])
      httpPost('/eweb-transfer.BatchTransferConfirm.do', {
        fileType: 'xls',
        amount: data.amount,
        totalCount: data.transNum,
        payerAcNo: acNo,
        payerSubAcNo: subAcNo,
        uploadFile: data.batchFile[0]
      }, { formData: true }).then(res => {
        Object.assign(_params, res)
        _params.payerAcName = acName
        _params.acNo = acNo
        _params.payerAcNo = acNo
        _params.payerSubAcNo = subAcNo
        _params.payerAccontShow = this.payerAccNoList[data.payerAccont].payerAccontShow
        if (Number(res.limitDayAmount) > 1000000) {
          this.$confirm('您的日累计转账金额已经超过100万元, 是否继续转账?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              name: 'batchTransferConf',
              params: _params
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消转账'
            })
          })
        } else {
          this.$router.push({
            name: 'batchTransferConf',
            params: _params
          })
        }
      })
    },
    reset (res) {
      res.amountcopy = ''
      res.transNumcopy = ''
      this.formModel = res
      this.accNoListQry()
    },
    download () {
      this.$refs.downloadCryptoKit.href = util.getUrl() + 'resources/batchTemplate.xls'
      this.$refs.downloadCryptoKit.click()
    },
    changeAcount (data) {
      const accNo = this.payerAccNoList[data.payerAccont].acNo
      const subAccNo = this.payerAccNoList[data.payerAccont].subAcNo
      const params = {
        payerAcNo: accNo,
        payerSubAcNo: subAccNo
      }
      httpPost('eweb-acmgmt.AccountInfoQuery.do', params).then(res => {
        this.formModel.availBal = res.availBal || '0'
      })
    },
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'BatchTransfer' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => {
          item.payerAccontShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        if (this.payerAccNoList.length > 0) {
          this.formModel.payerAccont = 0
          this.changeAcount(this.formModel)
        }
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.accNoListQry()
  }
}
</script>
