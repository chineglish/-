<!--
 * @Author: jinxilu
 * @Date: 2020-04-12 15:30:11
 * @LastEditTime: 2020-04-28 11:18:46
 * @LastEditors: Please set LastEditors
 * @Description: 挡板账户资金回退结果页
 * @FilePath: \ebank\src\pages\financialManagement\payroll\baffleAccount\baffleAccountRes.vue
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
import util from '@/libs/util'
export default {
  name: 'resultPage',
  data () {
    return {
      formModel: {},
      breadData: ['财务管理', '代发工资', '挡板账户资金回退'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '4',
        resData: {
          _jnlNo: '',
          group: [
            {
              'label': '挡板账户账号',
              'key': 'baffleAcNo'
            },
            {
              'label': '基本户账号',
              'key': 'baseAcNo'
            },
            {
              'label': '挡板账户户名',
              'key': 'baffleAcName'
            },
            {
              'label': '基本户户名',
              'key': 'baseAcName'
            },
            {
              label: '退回金额',
              key: 'amount',
              formatter: (value) => util.formatCurrency(value)
            },
            {
              label: '交易日期',
              key: 'transDate'
            },
            {
              label: '操作员姓名',
              key: 'operatorName'
            },
            {
              label: '操作员号',
              key: 'operatorNo'
            }
          ]
        }
      }
    }
  },
  methods: {
    onBack (data) {
      let indexFormModel = this.$route.params.indexFormModel
      this.$router.push({
        name: 'baffleAccount',
        params: {
          indexFormModel: indexFormModel
        }
      })
    }
  },
  created () {
    if (this.$route.params._params._JnlStatus) {
      this.formModel.transDate = this.$route.params._params.transDate
      this.data._JnlStatus = this.$route.params._params._JnlStatus
      this.data.resData._jnlNo = this.$route.params._params._jnlNo
      this.formModel = this.$route.params._params
      const user = this.getUser()
      this.formModel.operatorName = user ? user.userName : ''
      this.formModel.operatorNo = user ? user.userId : ''
    }
  }
}
</script>
