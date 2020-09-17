<template>
    <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-form-res
                :data="data"
                :form-model="formModel"
                :btnData="btnData"
                @back="onBack"
        ></m-form-res>
    </d2-container>
</template>
<script>
export default {
  name: 'resultPage',
  data () {
    return {
      formModel: {},
      routeParams: {},
      breadData: ['财务管理', '信用卡', '信用卡解挂'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        _jnlNo: '',
        _RejMessage: '',
        stepsActive: 1,
        stepsData: [
          '解挂信息录入 ',
          '提交结果'
        ],
        itemWidth: '4',
        resData: {
          title: '信用卡解挂挂成功',
          group: [
            { label: '交易名称', key: 'tradeName' },
            { label: '交易日期', key: 'transDate' },
            { label: '解挂信用卡卡号', key: 'creditCardNum' },
            { label: '持卡人姓名', key: 'cardHolderName' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorNo' }
          ]
        }
      }
    }
  },
  methods: {
    _formatList (data) {
      for (let key in data) {
        if (key === 'transfType') {
          data[key] = this.transTypeList[data[key]]
        } else if (key === 'smsMessage' || key === 'savepayeeInfo') {
          data[key] = this.isTrue[data[key]]
        }
      }
      this.formModel = data
    },
    onBack (data) {
      this.$router.push({
        name: 'creditCardManagement'
      })
    }
  },
  created () {
    this.routeParams = this.$route.params
    this.data._JnlStatus = this.routeParams._JnlStatus ? this.routeParams._JnlStatus : ''
    this.data.resData._jnlNo = this.routeParams._jnlNo ? this.routeParams._jnlNo : ''
    this._formatList(this.routeParams)
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorNo = user ? user.userId : ''
  }
}
</script>
