<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
/**
 *@name: 大额存单支取-结果
 * @author: 梁文彬
 * @date: 2019-12-19
 */
import util from '@/libs/util'

export default {
  name: 'withdrawRes',
  data () {
    return {
      formModel: {
        transName: '单位大额存单支取',
        transDate: '',
        transTime: '',
        transMoney: '',
        operatorName: '',
        operatorId: ''
      },
      titleData: ['理财服务 ', '大额存单', '单位大额存单支取'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        stepsActive: 2,
        _JnlStatus: '',
        itemWidth: '4',
        resData: {
          title: '交易已提交，请等待审核员审查！',
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
      this.$router.push('/withdrawInquiry')
    }
  },
  created () {
    if (this.$route.params) {
      this.formModel.operatorName = this.getUser().userName
      this.formModel.operatorId = this.getUser().userId
      const res = this.$route.params.res
      this.formModel.transMoney = this.$route.params.msg.transMoney
      this.data._JnlStatus = res ? res._processState : ''
      this.data.resData._jnlNo = res ? res._jnlNo : ''
      this.formModel.transDate = res ? res._transTime.substring(0, 10) : ''
      this.formModel.transTime = res ? res._transTime.substring(11, res._transTime.length) : ''
    }
  }
}
</script>
