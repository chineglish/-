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
import util from '@/libs/util'
import { process_state } from '@/assets/js/entity'

export default {
  name: 'resultPage',
  data () {
    return {
      formModel: {},
      breadData: ['财务管理', '代发工资', '文件上传'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        _RejMessage: '',
        stepsActive: 2,
        itemWidth: '4',
        resData: {
          title: '交易已提交，请等待审核员审查！',
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'transName' },
            { label: '交易日期', key: 'transDate' },
            { label: '总金额', key: 'totalAmt', formatter: (value) => util.formatCurrency(value) + '元' },
            { label: '交易状态', key: 'processState', formatter: (value) => util.handleEnums(process_state, value) },
            { label: '总笔数', key: 'totalNum', formatter: (value) => value + '笔' },
            { label: '合同号', key: 'contractNo' },
            { label: '付款账号', key: 'acNo' },
            { label: '付款账户名称', key: 'acName' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }
          ]
        }
      }
    }
  },
  methods: {
    onBack (data) {
      this.$router.push({
        name: 'fileUpload'
      })
    }
  },
  created () {
    this.formModel = this.$route.params
    this.formModel.transName = '代发工资'
    const res = this.$route.params.res
    this.data._JnlStatus = res ? res._processState : ''
    this.formModel.processState = res ? res._processState : ''
    this.data.resData._jnlNo = res ? res._jnlNo : ''
    this.formModel.transDate = res ? res._transTime : ''
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : '' // (操作员名 )
    this.formModel.operatorId = user ? user.userId : '' // (操作员名)
  }
}
</script>
