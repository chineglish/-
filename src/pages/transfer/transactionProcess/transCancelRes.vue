<template>
  <d2-container>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
/**
 *@name: 预约交易撤销结果
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
      titleData: ['转账汇款', '预约交易查询', '预约交易撤销'],
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
    let res = this.$route.params.res
    this.data._JnlStatus = res ? res._processState : ''
    this.data.resData._jnlNo = res ? res._jnlNo : ''
    this.formModel.transDate = res ? res._transTime : ''
    this.formModel.transName = '预约转账撤销'
    this.formModel.operatorId = this.getUser().userId
    this.formModel.operatorName = this.getUser().userName
  }
}
</script>
