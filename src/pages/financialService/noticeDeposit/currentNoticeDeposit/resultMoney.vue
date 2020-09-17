<template>
  <d2-container>
    <m-breadcrumb :data="tdata"></m-breadcrumb>
    <div class="form-box">
      <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
    </div>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
export default {
  name: 'resultMoney',
  data () {
    return {
      tdata: ['理财服务', '通知存款', '活期转通知存款'],
      formModel: {
        transName: '活期转通知存款',
        accountMoney: '',
        noticeClass: '',
        userName: '',
        userId: '',
        transDate: ''
      },
      routeParams: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        _RejMessage: '',
        itemWidth: '4',
        resData: {
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transDate' },
            { label: '金额',
              key: 'accountMoney',
              formatter: (value) => util.formatCurrency(value)
            },
            { label: '通知类型', key: 'noticeClass' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }]
        }
      },
      status: {
        '0': '失败',
        '1': '待审核'
      },
      msgType: {
        '1D': '一天',
        '7D': '七天'
      }
    }
  },
  methods: {
    onSubmit () {},
    onBack (data) {
      this.$router.push({
        name: 'innerMoney'
        // params: this.routeParams
      })
    }
  },
  mounted () {},
  created () {
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.formModel.accountMoney = this.$route.params.data.amount
    this.formModel.transDate = this.$route.params.data._transTime
    this.formModel.noticeClass = this.msgType[this.$route.params.data.notificationType]
    this.data._JnlStatus = this.$route.params.data._JnlStatus
    this.data.resData._jnlNo = this.$route.params.data._jnlNo
  }
}
</script>

<style  scoped>
    .form-box{
        width :1120px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    }
</style>
