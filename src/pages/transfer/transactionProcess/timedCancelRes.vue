<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
/**
 * @name: 定时交易撤销结果
 * @author: 梁文彬
 * @date: 2019-12-13
 */
import { mapMutations } from 'vuex'

export default {
  name: 'transCancelRes',
  data () {
    return {
      formModel: {
        transName: '',
        transDate: '',
        operatorName: '',
        operatorId: ''
      },
      titleData: ['转账汇款', '次日交易查询', '次日交易撤销'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '0',
        itemWidth: '4',
        resData: {
          title: '交易已提交，请等待审核员审查！',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transDate' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }]
        }
      },
      status: {
        '0': '失败',
        '1': '待审核'
      }
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    onBack (data) {
      this.$router.push({
        name: 'scheduledTransInquiry',
        params: this.$route.params
      })
    }
  },
  created () {
    this.removeKeepAliveList()
    let res = this.$route.params
    this.formModel.transName = '定时转账撤销'
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.data._JnlStatus = res.res._processState
    this.formModel.transDate = res.res._transTime
    this.data.resData._jnlNo = res.res._jnlNo
  }
}
</script>
