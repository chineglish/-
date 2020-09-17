<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack" @confirm="confirm"></m-form-res>
  </div>
</template>

<script type="text/javascript">
import util from '@/libs/util'
import { id_type } from '@/assets/js/entity'
export default {
  name: 'maintenanceRes',
  data: function () {
    return {
      titleData: ['企业管理台', '企业信息维护'],
      formModel: {
        transName: '',
        _transTime: '',
        userId: '',
        userName: '',
        detailAddress: '',
        postCode: '',
        name: '',
        idType: '',
        idNo: '',
        telphone: '',
        mobile: '',
        email: ''
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        _JnlStatus: '0',
        stepsActive: 2,
        resData: {
          title: '交易已提交，等待审核员审核！',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: '_transTime' },
            { label: '操作员姓名', key: 'userName' },
            { label: '操作员号', key: 'userId' },
            { label: '通讯地址', key: 'detailAddress' },
            { label: '邮编', key: 'postCode' },
            { label: '联系人姓名', key: 'name' },
            { label: '联系人证件类型', key: 'idType', formatter: (value) => util.handleEnums(id_type, value) },
            { label: '联系人证件号码', key: 'idNo' },
            { label: '联系人电话', key: 'telphone' },
            { label: '联系人手机', key: 'mobile' },
            { label: '联系人Email地址', key: 'email' }
          ]
        }
      }
    }
  },
  mounted () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
    }
    const user = this.getUser()
    this.formModel.userName = user ? user.userName : '' // (操作员名 )
    this.formModel.userId = user ? user.userId : '' // (操作员名)
    this.formModel.transName = this.$route.params.result.transName ? this.$route.params.result.transName : ''
    this.formModel._transTime = this.$route.params.result._transTime ? this.$route.params.result._transTime : ''
    this.data._JnlStatus = this.$route.params.result._processState ? this.$route.params.result._processState : ''
    this.data.resData._jnlNo = this.$route.params.result._jnlNo ? this.$route.params.result._jnlNo : ''
  },
  methods: {
    onBack () {
      this.$router.push('/enterpriseInfoMaintenance')
    },
    confirm () {
      this.$router.push('/enterpriseInfoMaintenance')
    }
  },
  components: {}
}
</script>
