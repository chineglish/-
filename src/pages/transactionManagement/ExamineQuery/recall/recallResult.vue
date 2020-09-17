<template>
  <d2-container>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState: mapStateOfCommon } = createNamespacedHelpers('common')

export default {
  name: 'recallResult',
  computed: {
    ...mapStateOfCommon([
      'user'
    ])
  },
  data () {
    return {
      formModel: {
        payerWater: '',
        transDate: '',
        operatorName: '',
        operatorId: ''
      },
      breadData: ['交易管理', '审核记录查询'],
      routeParams: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _RejMessage: '',
        _JnlStatus: '1',
        itemWidth: '4',
        resData: {
          title: '交易撤销成功！',
          group: [
            { label: '交易流水', key: 'payerWater' },
            { label: '交易日期', key: 'transDate' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }]
        }
      }
      // status: {
      //   '0': '失败',
      //   '1': '待审核'
      // }
    }
  },
  methods: {
    onBack (data) {
      this.$router.back()
    }
  },
  created () {
    if (this.user && this.user.Cif) {
      const { cifName, coreCifNo } = this.user.Cif
      this.formModel.operatorName = cifName
      this.formModel.operatorId = coreCifNo
    }
  }
}
</script>
