<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <d-form-previewer
      :form-struction="formStruction"
      :form-model="formModel"
      :action-data="actionData"
      :config="config"
      @back="onBack"
      @submit="submit"
    >
    </d-form-previewer>
    <m-hint-box :msgs="msgs"></m-hint-box>
    <!-- <m-form-res
      :data="data"
      :form-model="formModel"
      :btnData="btnData"
      @back="onBack"
      @submit="submit"
    ></m-form-res> -->
  </d2-container>
</template>
<script>
/**
 *@name: 定时交易撤销
 */
import util from '@/libs/util'
import { httpPost } from '@/api/sys/http'
import { trans_type, remit_model, pdeal_msg } from '@/assets/js/entity'
export default {
  name: 'timedCancel',
  data () {
    return {
      quiryMsg: {}, // 传来的查询的条件
      tableData: [], // 传来的全部数据
      formModel: {
        payerName: '',
        payeeName: '',
        payerAcc: '',
        payeeAcc: '',
        payerAccBank: '',
        payeeAccBank: '',
        amount: '',
        capital: '',
        remitmodel: '',
        initfeetotalamt: '',
        postScript: '',
        bankDate: '',
        tradeBusistep: '',
        pdealmsg: '',
        asAcNo: '',
        asAcName: ''
      },
      titleData: ['转账汇款', '次日交易查询', '次日交易撤销'],
      msgs: [
        '1.用户可以点击单笔交易查看明细和进行撤销操作',
        '2.点击查看链接查看定时交易明细信息；点击撤销链接进入定时交易撤销确认页，确认后完成定时交易撤销。'
      ],
      formStruction: {
        title: '产品信息',
        groups: [ {
          formItems: [
            { label: '付款账户名称', fieldName: 'payerName' },
            { label: '收款账户名称', fieldName: 'payeeName' },
            { label: '付款账号', fieldName: 'payerAcc' },
            { label: '收款账号', fieldName: 'payeeAcc' },
            { label: '付款行', fieldName: 'payerAccBank' },
            { label: '收款行', fieldName: 'payeeAccBank' },
            { label: '交易金额', fieldName: 'amount' },
            { label: '金额大写', fieldName: 'capital' },
            { label: '处理方式',
              fieldName: 'remitmodel',
              formatter: (key, value) => util.handleEnums(remit_model, value)
            },
            { label: '手续费',
              fieldName: 'initfeetotalamt',
              formatter: (name, value) => util.formatCurrency(value) },
            { label: '附言', fieldName: 'postScript' },
            { label: '执行时间', fieldName: 'bankDate', formatter: (key, value) => util.formatTransTime(value) },
            { label: '交易状态', fieldName: 'tradeBusistep', formatter: (key, value) => util.handleEnums(trans_type, value) },
            { label: '交易结果',
              fieldName: 'pdealmsg',
              formatter: (key, cellValue) => {
                let value = pdeal_msg.find(item => {
                  return item.value === cellValue
                })
                return value ? value.label : cellValue
              } },
            { label: '账簿号', fieldName: 'asAcNo', show: this.$route.params.msg ? this.$route.params.msg.data.asFlag === '1' : false },
            { label: '账簿名', fieldName: 'asAcName', show: this.$route.params.msg ? this.$route.params.msg.data.asFlag === '1' : false }
          ]
        }]
      },
      actionData: [
        { btnText: '确认撤销', class: 'm-submit-btn', handler: this.submit },
        { btnText: '返回', class: 'm-cancel-btn', handler: this.onBack }
      ],
      config: {
        columns: 2
      }
      // data: {
      //   itemWidth: '4',
      //   resData: {
      //     group: [
      //       { label: '付款账户名称', key: 'payername' },
      //       { label: '收款账户名称', key: 'payeename' },
      //       { label: '付款账号', key: 'payeracc' },
      //       { label: '收款账号', key: 'payeeacc' },
      //       { label: '付款行', key: 'payeraccbank' },
      //       { label: '收款行', key: 'payeeaccbank' },
      //       { label: '交易金额', key: 'amount' },
      //       { label: '金额大写', key: 'capital' },
      //       { label: '处理方式',
      //         key: 'remitmodel',
      //         formatter: (value) => util.handleEnums(remit_model, value)
      //       },
      //       { label: '手续费',
      //         key: 'initfeetotalamt',
      //         formatter: (name, value) => util.formatCurrency(value) },
      //       { label: '附言', key: 'postscript' },
      //       { label: '预约时间', key: 'bankdate' },
      //       { label: '交易状态', key: 'tradebusistep' },
      //       { label: '交易结果', key: 'pdealmsg' }]
      //   }
      // }
    }
  },
  methods: {
    submit () {
      const routeParams = {}
      const params = {
        amount: this.formModel.amount,
        origChannelSerNo: this.formModel.origchannelserno,
        origChannelDate: this.formModel.origchanneldate,
        payerAcName: this.formModel.payerName,
        payeeAcName: this.formModel.payeeName,
        payerAcNo: this.formModel.payerAcc,
        payeeAcNo: this.formModel.payeeAcc,
        payerBankName: this.formModel.payerAccBank,
        payeeBankName: this.formModel.payeeAccBank,
        remitModel: this.formModel.remitmodel,
        initfeeTotalamt: this.formModel.initfeetotalamt,
        postScript: this.formModel.postScript,
        bankDate: this.formModel.bankDate,
        tradeBusistep: this.formModel.tradeBusistep,
        pdealMsg: this.formModel.pdealmsg,
        asFlag: this.$route.params.formModel.asFlag,
        asAcNo: this.formModel.log_acno,
        asAcName: this.formModel.log_acname,
        serial_no: this.formModel.serial_no
      }
      const _params = {
        asFlag: this.$route.params.formModel.asFlag,
        payerAcName: this.$route.params.msg.data.payername,
        payerAcNo: this.$route.params.msg.data.payeracc,
        payeeAcName: this.$route.params.msg.data.payeename,
        payeeAcNo: this.$route.params.msg.data.payeeacc,
        payerBankName: this.formModel.payerAccBank,
        payeeBankName: this.formModel.payeeAccBank,
        amount: this.$route.params.msg.data.amount,
        tradeBusistep: this.formModel.tradeBusistep,
        initfeeTotalamt: this.$route.params.msg.data.initfeetotalamt,
        remitModel: this.$route.params.msg.data.remitmodel,
        postScript: this.$route.params.msg.data.postscript,
        bankDate: this.formModel.bankDate,
        pdealMsg: this.$route.params.msg.data.pdealmsg,
        asAcName: this.$route.params.msg.data.log_acname,
        asAcNo: this.$route.params.msg.data.log_acno,
        origChannelSerNo: this.formModel.origchannelserno,
        origChannelDate: this.formModel.origchanneldate,
        serial_no: this.formModel.serial_no
      }
      this.$confirm('确定要撤销该交易?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        httpPost('/eweb-transfer.TimeTransferTrsRepealConfirm.do', _params).then(conf => {
          httpPost('/eweb-common.GenToken.do').then(token => {
            const singMsg = this.isSign({ _Data2Sign: conf._Data2Sign, _authenticateType: conf._authenticateType })
            params._authenticateTypeChoose = conf._authenticateType ? conf._authenticateType[0] : ''
            params._dataMapKey = conf._dataMapKey
            params.CSIISignature = singMsg
            params._tokenName = token._tokenName
            params.payerAccount = conf.account
            // this.$router.push({
            //   name: 'timedCancelRes',
            //   params: {
            //     msg: routeParams
            //   }
            // })
            httpPost('/eweb-transfer.TimeTransferTrsRepeal.do', params).then(res => {
              routeParams.JnlStatus = '1' // ‘1’ 代表成功，‘0’ 代表失败
              this.$router.push({
                name: 'timedCancelRes',
                params: {
                  formModel: this.$route.params.formModel,
                  msg: routeParams,
                  res: res
                }
              })
            })
          })
        })
      }).catch(() => {})
    },
    onBack () {
      this.$router.push({
        name: 'scheduledTransInquiry'
      })
    }
  },
  created () {
    console.log(this.$route.params)
    if (this.$route.params.msg) {
      this.formModel.payerName = this.$route.params.msg.data.payername
      this.formModel.payeeName = this.$route.params.msg.data.payeename
      this.formModel.payerAcc = this.$route.params.msg.data.payeracc
      this.formModel.payeeAcc = this.$route.params.msg.data.payeeacc
      this.formModel.payerAccBank = this.$route.params.msg.data.payerbankname
      this.formModel.payeeAccBank = this.$route.params.msg.data.payeebankname
      this.formModel.remitmodel = this.$route.params.msg.data.remitmodel
      this.formModel.initfeetotalamt = this.$route.params.msg.data.initfeetotalamt
      this.formModel.postScript = this.$route.params.msg.data.postscript
      this.formModel.bankDate = this.$route.params.msg.data.presendtime
      this.formModel.tradeBusistep = this.$route.params.msg.data.tradebusistep
      this.formModel.pdealmsg = this.$route.params.msg.data.pdealmsg
      if (this.$route.params.formModel.asFlag === '1') {
        if (this.$route.params.msg.data.payerbankname === '') {
          this.formModel.payerAccBank = '大连银行'
        }
      }
      Object.assign(this.formModel, this.$route.params.msg.data) // 接收选择的查询数据
      if (this.formModel.initfeetotalamt === '') {
        this.formModel.initfeetotalamt = '0'
      }
      if (this.formModel.remitmodel === '') {
        this.formModel.remitmodel = '2'
      }
      if (!this.formModel.initfeetotalamt) {
        this.formModel.initfeetotalamt = '0'
      }
      if (!this.formModel.remitmodel) {
        this.formModel.remitmodel = '2'
      }
    }
    this.formModel.capital = util.getMoneyHanzi(this.formModel.amount)
    // this.formModel.tradebusistep = util.handleEnums(trans_type, this.formModel.tradebusistep)
    // this.formModel.bankdate = util.separationDate(this.formModel.bankdate)
  }
}
</script>
