<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
/**
 *@name: 常用往来账户维护结果页
 * @date: 2019-12-16
 */
import { createNamespacedHelpers } from 'vuex'

const { mapState: mapStateOfCommon } = createNamespacedHelpers('common')

export default {
  name: 'maintainRes',
  computed: {
    ...mapStateOfCommon([
      'user'
    ])
  },
  data () {
    return {
      formModel: {
        summary: '常用往来账户管理',
        transDate: '',
        operatorName: '',
        operatorId: ''
      },
      titleData: ['转账汇款', ' 常用往来账户'],
      routeParams: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _RejMessage: '',
        _JnlStatus: '',
        itemWidth: '4',
        resData: {
          title: '交易申请成功',
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'summary' },
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
    onSubmit () {},
    onBack () {
      this.$router.push({
        name: 'currentAccInquiry'
      })
    }
  },
  created () {
    this.formModel.transDate = this.$route.params._transTime
    this.data.resData._jnlNo = this.$route.params._jnlNo
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
  }
}
</script>
