<template>
    <d2-container>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
    </d2-container>
</template>
<script>
/**
     *@name: 修改保证信息-结果页
     */
export default {
  name: 'EnsureApplyChangeRes',
  data () {
    return {
      formModel: {},
      titleData: ['电子商业汇票', '保证', '提示保证申请', '修改保证信息'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '4',
        resData: {
          title: '交易已提交，请等待审核员审查！',
          group: [
            { label: '票据号码', key: 'accountNum' },
            { label: '金额', key: 'amount' },
            { label: '交易日期', key: 'tradeDate' },
            { label: '交易时间', key: 'tradeTime' }
          ]
        }
      },
      status: {
        '0': '失败',
        '1': '待审核'
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'EnsureApplyQuery'
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      this.data._JnlStatus = this.$route.params._JnlStatus
    }
  }
}
</script>
