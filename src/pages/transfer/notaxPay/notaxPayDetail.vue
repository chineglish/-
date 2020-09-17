<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
/**
 *@name: 非税缴费历史查询详情页
 * @author: 梁文彬
 * @date: 2019-12-17
 */
export default {
  name: 'notaxPayDetail',
  data () {
    return {
      tableDate: [],
      formModel: {
        payerAcc: '',
        balance: '',
        payItem: '地方财政非税收入缴款',
        payCode: '',
        chgAgenName: '',
        chgAgenCode: '',
        payerName: '',
        recName: '',
        detail: '',
        amt: '',
        payStats: ''
      },
      titleData: ['转账汇款', '非税缴费历史查询', '详情页'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        resData: {
          group: [
            { label: '付款账户', key: 'payerAcc' },
            // { label: '可用余额', key: 'balance' },
            { label: '缴款项目', key: 'payItem' },
            { label: '缴款码', key: 'payCode' },
            { label: '执行单位名称', key: 'chgAgenName' },
            { label: '执行单位编码', key: 'chgAgenCode' },
            { label: '缴款人名称', key: 'payerName' },
            { label: '收款人名称', key: 'recName' },
            // { label: '摘要', key: 'detail' },
            { label: '缴款金额', key: 'amt' },
            { label: '缴款状态', key: 'payStats' }]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'historyInquiry',
        params: {
          tableData: this.tableDate
        }
      })
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params.msg, this.$route.params.query)
      this.tableDate = this.$route.params.tableData
      const [accNo] = (this.formModel.payerAcc || '').split('-')
      this.formModel.payerAcc = accNo
      switch (this.formModel.payStats) {
        case '0':
          this.formModel.payStats = '未缴费'
          break
        case '1':
          this.formModel.payStats = '已缴费'
          break
        case '-1':
          this.formModel.payStats = '已退付'
          break
      }
    }
  }
}
</script>
