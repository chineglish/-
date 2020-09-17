<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <d-form-previewer
      :form-struction="formStruction"
      :form-model="formModel"
      :action-data="actionData">
    </d-form-previewer>
  </d2-container>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
// import { Sign } from '@/assets/js/SignMsg'
import util from '@/libs/util'
import { currency_type, asFlag_Type, bankSigns_Type, disposal_Type } from '@/assets/js/entity.js'
export default {
  name: 'multiLevelLedgerTransferConfirm',
  data: function () {
    return {
      data: ['现金管理', '多级账簿', '多级账簿转账确认'],
      formStruction: {
        stepsActive: 1,
        groups: [
          {
            title: '付款人信息',
            formItems: [
              { label: '付款账户', fieldName: 'payerAcNo' },
              // { label: '当日可用余额', fieldName: 'balance' },
              { label: '付款币种', fieldName: 'currencyShow' },
              { label: '付款户名', fieldName: 'payerAcName' },
              {
                label: '是否使用账簿',
                fieldName: 'asFlag',
                formatter: (key, value) => util.handleEnums(asFlag_Type, value)
              },
              { label: '账簿号', fieldName: 'asAcNo' },
              { label: '账簿名', fieldName: 'asAcName' },
              // { label: '子账簿名', fieldName: 'subLedgerNum' },
              { label: '付款地址', fieldName: 'payerAcAddr' }
              // { label: '凭证号', fieldName: 'voucherNum' }
            ]
          },
          {
            title: '收款人信息',
            formItems: [
              {
                label: '行内外标志',
                fieldName: 'bankFlag',
                formatter: (key, value) => util.handleEnums(bankSigns_Type, value)
              },
              // {
              //   label: '同城异地标志',
              //   fieldName: 'areaFlag',
              //   formatter: (key, value) => util.handleEnums(bankFlag_Type, value)
              // },
              // {
              //   label: '加急标志',
              //   fieldName: 'urgencyFlag',
              //   formatter: (key, value) => util.handleEnums(urgentFlag_Type, value)
              // },
              { label: '收款账户', fieldName: 'payeeAcNo' },
              { label: '收款账户名称', fieldName: 'payeeAcName' },
              // { label: '收款账户开户行', fieldName: 'incomeAccBankName' },
              { label: '开户行网点', fieldName: 'rcvBankName' },
              { label: '收款人手机', fieldName: 'mobiles' }
            ]
          },
          {
            title: '交易金额',
            formItems: [
              { label: '交易金额', fieldName: 'amount' },
              { label: '金额大写', fieldName: 'bigNum' },
              { label: '手续费', fieldName: 'feeAmount' }
            ]
          },
          {
            title: '附加信息',
            formItems: [
              {
                label: '处理方式',
                fieldName: 'bookingFlag',
                formatter: (key, value) => util.handleEnums(disposal_Type, value)
              },
              { label: '预约日期', fieldName: 'bookingDate' },
              { label: '预约时间', fieldName: 'bookingtime' },
              // { label: '用途', fieldName: 'purpose' },
              { label: '附言', fieldName: 'postscript' },
              { label: '虚拟款项账户', fieldName: 'virAcNo' },
              { label: '虚拟款项户名', fieldName: 'virAcName' }
            ]
          }
        ]
      },
      formModel: {},
      actionData: [
        { btnText: '确定', class: 'm-submit-btn', handler: this.printHandler },
        { btnText: '返回', class: 'm-cancel-btn', handler: this.backHandler }
      ]
    }
  },
  mounted: function () {

  },
  created () {
    this.formModel = this.$route.params
    this.formModel.payerCurrencyCode = this.$route.params.currencyCode
    this.formStruction.groups[0].formItems[this.$route.params.currencyCode] = util.handleEnums(currency_type, this.$route.params.currencyCode)
  },
  methods: {
    printHandler (res) {
      const dateObj = new Date()
      const yearStr = dateObj.getFullYear()
      const monthStr = (dateObj.getMonth() + 1 + '').padStart(2, '0')
      const dateStr = (dateObj.getDate() + '').padStart(2, '0')
      const hourStr = (dateObj.getHours() + '').padStart(2, '0')
      const minuteStr = (dateObj.getMinutes() + '').padStart(2, '0')
      const secondStr = (dateObj.getSeconds() + '').padStart(2, '0')
      this.transTime = `${yearStr}-${monthStr}-${dateStr}  ${hourStr}:${minuteStr}:${secondStr}`
      this.$route.params.bankList.forEach(item => {
        if (item.bankNo === res.payeeBankCode) {
          res.payeeBankName = item.bankName
        }
      })
      /**
       * 发送接口数据
       */
      httpPost('/eweb-common.GenToken.do').then(token => {
        const _tokenName = token._tokenName
        let singMsg = this.isSign({ _Data2Sign: res._Data2Sign, _authenticateType: res._authenticateType })
        const params = {
          ...this.formModel,
          appointmentTime: res.appointmentDate + ' ' + res.appointmentTime + ':00',
          _tokenName: _tokenName,
          _dataMapKey: res._dataMapKey,
          _authenticateTypeChoose: res._authenticateType ? res._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('/eweb-cash.MultistageBookTransfer.do', params).then(res => {
          // 保存为常用联系人
          if (this.formModel.savePayee) {
            let params = {
              payeeAcNo: this.formModel.payeeAcNo,
              payeeAcName: this.formModel.payeeAcName,
              payeeBankCode: '313',
              payeeBankId: '313',
              payeeBankName: '大连银行',
              payeeBankDeptId: '313222080002',
              payeeBankDeptName: '大连银行第一中心支行',
              transferType: this.formModel.bankFlag
            }
            if (this.formModel.bankFlag === '1') {
              params = {
                ...params,
                payeeBankCode: this.formModel.incomeAccBankName,
                payeeBankId: this.formModel.incomeAccBankName,
                payeeBankName: this.formModel.payeeBankName,
                payeeBankDeptId: this.formModel.payeeBankNo,
                payeeBankDeptName: this.formModel.rcvBankName,
                payeeBankProvinceNo: '',
                payeeBankCityNo: ''
              }
            }
            httpPost('/eweb-transfer.PayeeBookAdd.do', params).catch(e => {
              console.error(e)
            })
          }
          const routeParams = {
            msg: params,
            res: res
          }
          this.$router.push({ name: 'multiLevelTransferRes', params: routeParams })
        }).catch(e => {
          /* params.JnlStatus = '0'
          const routeParams = {
            msg: params,
            transTime: this.transTime
          }
          this.$router.push({ name: 'singleTransResult', params: routeParams }) */
        })
      })
    },
    backHandler () {
      this.$router.push({
        name: 'transferQuery',
        params: this.formModel
      })
    }
  },
  components: {}
}
</script>
