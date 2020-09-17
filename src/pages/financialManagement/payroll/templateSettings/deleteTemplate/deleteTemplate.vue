<!--
 * @Author: your name
 * @Date: 2020-03-21 10:09:17
 * @LastEditTime: 2020-03-26 18:39:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ebank\src\pages\financialManagement\payroll\templateSettings\deleteTemplate\deleteTemplate.vue
 -->
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
      breadData: ['财务管理', '代发工资', '模板设置'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '0',
        itemWidth: '4',
        resData: {
          title: '模板删除成功',
          _jnlNo: '',
          group: [
            { label: '交易名称', key: 'tradeName' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '交易日期', key: 'transactionDate' },
            { label: '操作员号', key: 'operatorNo' }
          ]
        }
      }
    }
  },
  methods: {
    onBack (data) {
      this.$router.push({
        name: 'templateSettings'
      })
    }
  },
  created () {
    this.formModel = this.$route.params
    if (this.formModel.JnlStatus) {
      this.data._JnlStatus = this.formModel.JnlStatus
    }
    this.data.resData._jnlNo = this.formModel._jnlNo
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorNo = user ? user.userId : ''
  }
}
</script>
