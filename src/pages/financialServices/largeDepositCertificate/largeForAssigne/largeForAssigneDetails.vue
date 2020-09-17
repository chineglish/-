<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </div>
</template>
<script>
import { zr_status, zr_type, newCertificateTypes, price_type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'largeForAssigneDetails',
  data () {
    return {
      formModel: {},
      titleData: ['理财服务 ', '大额存单', '单位大额存单转让受让查询详情'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        resData: {
          group: [
            { label: '签约协议号', key: 'contractNo' },
            { label: '认购编号', key: 'subscribe' },
            { label: '大额存单账号', key: 'entAssAcNo' },
            { label: '原存单账号', key: 'oldAcNo' },
            { label: '客户账号', key: 'acNo' },
            { label: '负债账号', key: 'debtAcNo' },
            { label: '转让日期', key: 'assignDate', formatter: (cellValue) => util.separationDate(cellValue) },
            { label: '转让流水号', key: 'assignJnlNo' },
            { label: '转让状态', key: 'assignType', formatter: (cellValue) => util.handleEnums(zr_status, cellValue) },
            { label: '转让方式', key: 'assignMode', formatter: (cellValue) => util.handleEnums(zr_type, cellValue) },
            { label: '本金', key: 'actBal', formatter: (cellValue) => util.formatCurrency(cellValue) },
            { label: '利息(%)', key: 'interest', formatter: (cellValue) => util.formatInterestRate(cellValue) },
            { label: '转让每份价格', key: 'assignEveryAmount', formatter: (cellValue) => util.formatCurrency(cellValue) },
            { label: '转让金额', key: 'assignAmount', formatter: (cellValue) => util.formatCurrency(cellValue) },
            { label: '出让人客户账号', key: 'assignAcNo' },
            { label: '出让人子账户序号', key: 'assignSubAcNo' },
            { label: '出让人负债账号', key: 'assignDebtAcNo' },
            { label: '出让人名称', key: 'assignAcName' },
            { label: '出让人开户行', key: 'assignBank' },
            { label: '受让人客户账号', key: 'transAcNo' },
            { label: '受让人子账户序号', key: 'transSubAcNo' },
            { label: '受让人负债账号', key: 'transDebtAcNo' },
            { label: '受让人名称', key: 'transAcName' },
            { label: '受让人开户行', key: 'transBank' },
            { label: '受让人客户号', key: 'transCifNo' },
            { label: '付款人客户账号', key: 'payerAcNo' },
            { label: '付款人负债账号', key: 'payerDebtAcNo' },
            { label: '转让份额', key: 'assEveAmt', formatter: (cellValue) => util.formatCurrency(cellValue) },
            { label: '产品期次编号', key: 'prdBatchCode' },
            { label: '新凭证种类', key: 'newVoucherType', formatter: (cellValue) => util.handleEnums(newCertificateTypes, cellValue) },
            { label: '新凭证批号', key: 'newVoucherBatNum' },
            { label: '新凭证序号', key: 'newVoucherSeqNum' },
            { label: '新客户账号', key: 'newAcNo' },
            { label: '转让定价方式', key: 'priceType', formatter: (cellValue) => util.handleEnums(price_type, cellValue) }
          ]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push('/largeForAssigneQuery')
    }
  },
  created () {
    if (this.$route.params.data) {
      Object.assign(this.formModel, this.$route.params.data)
    } else {
      this.onBack()
    }
  }
}
</script>
