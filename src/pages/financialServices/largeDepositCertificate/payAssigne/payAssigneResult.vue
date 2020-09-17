<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </div>
</template>

<script type="text/javascript">
import util from '@/libs/util'
import { zr_type, price_type } from '@/assets/js/entity'
export default {
  name: 'payAssigneResult',
  data: function () {
    return {
      titleData: ['理财服务', '大额存单', '单位大额存单受让结果'],
      formModel: {
        transName: '',
        transDate: ''
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        _JnlStatus: '',
        stepsActive: 2,
        resData: {
          group: [
            {
              label: '交易名称',
              key: 'transName'
            },
            {
              label: '交易日期',
              key: 'transDate'
            },
            {
              label: '受让账号',
              key: 'srrkehzh'
            },
            {
              label: '受让账户名称',
              key: 'srrmingc'
            },
            {
              label: '产品期次账号',
              key: 'chpnqcbh'
            },
            {
              label: '产品名称',
              key: 'chanpshm'
            },
            {
              label: '转让类型',
              key: 'zhraleix',
              formatter: (value) => util.handleEnums(zr_type, value)
            },
            {
              label: '受让金额',
              key: 'shareAmount',
              formatter: (value) => util.formatCurrency(value)
            },
            {
              label: '定价方式',
              key: 'djiafshi',
              formatter: (value) => util.handleEnums(price_type, value)
            },
            {
              label: '受让价格',
              key: 'zhuanrje',
              formatter: (value) => util.formatCurrency(value)
            },
            {
              label: '操作员姓名',
              key: 'operatorName'
            },
            {
              label: '操作员号',
              key: 'operatorId'
            }
          ]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'payAssigneQuery'
      })
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params.data)
    }
    this.formModel.transName = '单位大额存单受让'
    this.formModel.status = this.$route.params._processState
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.data._JnlStatus = this.$route.params.res._processState
    this.data.resData._jnlNo = this.$route.params.res._jnlNo
    this.formModel.transDate = this.$route.params.res._transTime.substring(0, 10)
  }
}
</script>
