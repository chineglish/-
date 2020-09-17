<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res
            :data="data"
            :form-model="formModel"
            :btnData="btnData"
            @back="onBack"
    ></m-form-res>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
import { process_state } from '@/assets/js/entity'
export default {
  name: 'informationRes',
  data () {
    return {
      formModel: {
        transName: '个人信息修改',
        submitTime: '',
        operatorName: '',
        operatorNum: ''
      },
      titleData: ['企业管理台', '个人信息维护'],
      btnData: [
        { btnText: '返回首页', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '0',
        itemWidth: '4',
        stepsActive: 2,
        resData: {
          title: '',
          group: [
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' },
            { label: '交易状态', key: 'status', formatter: (value) => util.handleEnums(process_state, value) },
            { label: '昵称', key: 'userAlias' },
            { label: '性别', key: 'gender', formatter: (value) => value === '0' ? '男' : value === '1' ? '女' : '未知' },
            { label: '手机号', key: 'mobilephone' },
            { label: 'E-mail', key: 'email' },
            { label: '交易日期', key: 'transTime' }
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
        name: 'index'
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
      const user = this.getUser()
      this.formModel.operatorName = user ? user.userName : ''
      this.formModel.operatorId = user ? user.userId : ''
      this.formModel.status = this.$route.params.res._processState
      this.formModel.transTime = this.$route.params.res._transTime
      this.data.resData._jnlNo = this.$route.params.res._jnlNo
      this.data._JnlStatus = this.$route.params.res._processState
    }
  }
}
</script>
