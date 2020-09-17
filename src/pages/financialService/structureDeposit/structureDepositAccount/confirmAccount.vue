<template>
  <d2-container>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack" @submit="OnSubmit"></m-form-res>
  </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, acc_type, limit_type, handleChannel, payerRate, chaohui_flag, acc_status } from '@/assets/js/entity'
export default {
  name: 'structureQueryDetials',
  data () {
    return {
      formModel: {
        serial: '',
        acName: '',
        kehuzhlx: '',
        lDAcNo: '',
        subAcNo: '',
        currencyCode: '',
        openAmount: '',
        zhxililv: '',
        openChannel: '',
        lxzffans: '',
        qixiriqi: '',
        matureDate: '',
        zhuanczh: '',
        // bjlxzrzh: '',
        payeeAccNo: '',
        cashFlag: '',
        actStatus: '',
        limitType: ''
      },
      breadData: ['理财服务', '结构性存款', '结构性存款销户'],
      routeParams: {},
      btnData: [
        { btnText: '销户', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _RejMessage: '',
        itemWidth: '4',
        resData: {
          group: [
            { label: '证实书（存单）编号', key: 'serial' },
            { label: '账户名称', key: 'acName' },
            {
              label: '账户类型',
              key: 'acType',
              formatter: (cellValue) => {
                return util.handleEnums(acc_type, cellValue)
              }
            },
            { label: '账号', key: 'accNo' },
            { label: '子账户序号', key: 'subAcNo' },
            {
              label: '币种',
              key: 'currencyCode',
              formatter: (cellValue) => {
                return util.handleEnums(currency_type, cellValue)
              }
            },
            {
              label: '开户金额',
              key: 'openAmount',
              formatter: (cellValue) => util.formatCurrency(cellValue)
            },
            {
              label: '年利率（%）',
              key: 'zhxililv',
              formatter: (cellValue) => {
                return cellValue + '%'
              }
            },
            {
              label: '开通渠道',
              key: 'openChannel',
              formatter: (cellValue) => {
                return util.handleEnums(handleChannel, cellValue)
              }
            },
            {
              label: '付息方式',
              key: 'lxzffans',
              formatter: (cellValue) => {
                return util.handleEnums(payerRate, cellValue)
              }
            },
            {
              label: '开户日期',
              key: 'openDate',
              formatter: (value) => util.separationDate(value)
            },
            {
              label: '到期日期',
              key: 'matureDate',
              formatter: (value) => util.separationDate(value)
            },
            {
              label: '转出账户',
              key: 'payeeAccNo'
            },
            {
              label: '收本收息账户',
              // key: 'bjlxzrzh',
              key: 'duifkhzh'
            },
            {
              label: '钞汇标志',
              key: 'cashFlag',
              formatter: (cellValue) => {
                return util.handleEnums(chaohui_flag, cellValue)
              }
            },
            {
              label: '账户状态',
              key: 'actStatus',
              formatter: (cellValue) => {
                return util.handleEnums(acc_status, cellValue)
              }
            },
            {
              label: '限制类型',
              key: 'limitType',
              formatter: (cellValue) => {
                const target = limit_type.find(item => item.value === cellValue)
                return target ? target.label : '正常'
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    onBack (data) {
      this.$router.push({
        name: 'account'
        // params: this.routeParams
      })
    },
    // getAccountMesg (data) {
    //   const params = {
    //     acName: data.acName,
    //     acNo: data.lDAcNo,
    //     serial: data.serial,
    //     acType: data.kehuzhlx,
    //     subAcNo: data.subAcNo,
    //     currency: data.currencyCode,
    //     struRates: data.zhxililv,
    //     openChannel: data.openChannel,
    //     amount: data.openAmount,
    //     fxType: data.lxzffans,
    //     openDate: data.qixiriqi,
    //     matureDate: data.matureDate,
    //     payerAcNo: data.duifkhzh,
    //     bjlxzrzh: data.payeeAccNo,
    //     cashFlag: data.cashFlag,
    //     actStatus: data.actStatus,
    //     limitType: data.limitType
    //   }
    //   httpPost('/eweb-invest.StructuredDepositCloseConfirm.do', params).then(res => {
    //     // this.formModel = res
    //   }).catch(() => {
    //     this.onBack()
    //   })
    // },
    OnSubmit () {
      let data = this.$route.params.data
      const params = {
        acName: data.acName,
        acNo: data.accNo,
        payerAcNo: data.accNo,
        serial: data.serial,
        acType: data.accType,
        subAcNo: data.subAcNo,
        currency: data.currencyCode,
        struRates: data.zhxililv,
        openChannel: data.openChannel,
        amount: data.openAmount,
        fxType: data.lxzffans,
        openDate: data.openDate,
        matureDate: data.matureDate,
        bjlxzrzh: data.bjlxzrzh,
        duifkhzh: data.duifkhzh,
        cashFlag: data.cashFlag,
        actStatus: data.actStatus,
        limitType: data.limitType
      }
      const _params = data
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params.res._Data2Sign, _authenticateType: this.$route.params.res._authenticateType })
        httpPost('/eweb-invest.StructuredDepositClose.do', {
          ...params,
          _dataMapKey: this.$route.params.res._dataMapKey,
          _authenticateTypeChoose: this.$route.params.res._authenticateType ? this.$route.params.res._authenticateType[0] : '',
          CSIISignature: singMsg,
          _tokenName: token._tokenName
        }).then(res => {
          this.$router.push({
            name: 'resultAccount',
            params: { data, _data: _params, res }
          })
        })
      })
    }
  },
  created () {
    this.formModel = this.$route.params.data
    // this.getAccountMesg(this.$route.params)
    // this.formModel.acNo = this.$route.params.kehuzhao
    // this.formModel.acName = this.$route.params.acName
    // this.formModel.acType = this.$route.params.acType
    // this.formModel.subAcNo = this.$route.params.zhhaoxuh
    // this.formModel.currency = this.$route.params.currencyCode
    // this.formModel.amount = this.$route.params.zhanghye
    // this.formModel.struRates = this.$route.params.zhxililv
    // this.formModel.cashFlag = this.$route.params.chaohubz
    // this.formModel.actStatus = this.$route.params.zhhuztai
    // this.formModel.openDate = this.$route.params.kaihriqi
    // this.formModel.matureDate = this.$route.params.doqiriqi
    // this.formModel.limitType = this.$route.params.limitType
    // this.formModel.openChannel = this.$route.params.openChannel
    // this.formModel.lxzffans = this.$route.params.lxzffans
    // this.formModel.payeeAccNo = this.$route.params.payeeAccNo
    // this.formModel.duifkhzh = this.$route.params.duifkhzh
  }
}
</script>
