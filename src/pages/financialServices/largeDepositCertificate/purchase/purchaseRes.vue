<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
/**
 *@name: 大额存单申购-结果页
 * @author: 梁文彬
 * @date: 2019-12-19
 */
import util from '@/libs/util'
export default {
  name: 'purchaseRes',
  data () {
    return {
      formModel: {
        transName: '单位大额存单申购',
        transDate: '',
        transTime: '',
        transMoney: '',
        operatorName: '',
        operatorId: ''
      },
      titleData: ['理财服务 ', '大额存单', '单位大额存单申购'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '4',
        resData: {
          // title: '交易已提交，请等待审核员审查！',
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transDate' },
            { label: '交易时间', key: 'transTime' },
            { label: '金额',
              key: 'transMoney',
              formatter: (value) => util.formatCurrency(value) },
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
    onBack () {
      this.$router.push('/purchaseInquiry')
    }
  },
  created () {
    if (this.$route.params) {
      this.formModel.transDate = this.$route.params.msg._transTime.substring(0, 10)
      this.formModel.transTime = this.$route.params.msg._transTime.substring(11, this.$route.params.msg._transTime.length)
      this.formModel.transMoney = this.$route.params.msg.transMoney
      this.data._JnlStatus = this.$route.params.msg._JnlStatus
      this.data.resData._jnlNo = this.$route.params.msg._jnlNo
    }
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
  }
}
</script>
