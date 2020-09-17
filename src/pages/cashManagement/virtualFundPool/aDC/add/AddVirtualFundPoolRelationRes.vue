<template>
    <d2-container>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
    </d2-container>
</template>
<script>
/**
     *@name: 虚拟资金池关系加入-结果页
     * @date: 2020-2-4
     */
export default {
  name: 'virtualFundPoolBuildRes',
  data () {
    return {
      formModel: {},
      titleData: ['现金管理', '虚拟资金池', '虚拟资金池关系加入'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '4',
        stepsActive: 2,
        resData: {
          title: '交易已提交，请等待审核员审查！',
          group: [
            { label: '交易名称', key: 'tradeName' },
            { label: '交易日期', key: 'tradeDate' },
            { label: '池账户', key: 'poolAcc' },
            { label: '子账户', key: 'subAcc' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorNum' }
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
        name: 'VirtualFundPoolListInquire'
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
