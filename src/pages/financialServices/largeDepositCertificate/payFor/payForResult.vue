<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </div>
</template>

<script type="text/javascript">
import util from '@/libs/util'
// import { interest_type, process_state } from '@/assets/js/entity'
export default {
  name: 'payForResult',
  data: function () {
    return {
      titleData: ['理财服务', '大额存单', '单位大额存单转让结果'],
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
          _jnlNo: '',
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
              label: '转出账号',
              key: 'lDAcNo'
            },
            {
              label: '转出账户名称',
              key: 'crrmingc'
            },
            {
              label: '产品期次编号',
              key: 'prdBatchCode'
            },
            {
              label: '产品名称',
              key: 'chanpshm'
            },
            {
              label: '转让类型',
              key: 'drawType'
            },
            {
              label: '转让份额',
              key: 'share',
              formatter: (value) => util.formatCurrency(value)
            },
            {
              label: '定价方式',
              key: 'priceType'
            },
            {
              label: '转让价格',
              key: 'amount',
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
        name: 'payForQuery'
        // params: this.$route.params.data
      })
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params.data)
    }
    // 1:全部转让, 0: 部分转让
    this.formModel.drawType = this.formModel.drawType === '0' ? '全部转让' : '部分转让'
    // 0: '系统定价', 1: '客户定价'
    this.formModel.priceType = this.formModel.priceType === '0' ? '系统定价' : '客户定价'
    this.formModel.transName = '单位大额存单转让'
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    this.data._JnlStatus = this.$route.params.res._processState
    this.data.resData._jnlNo = this.$route.params.res._jnlNo
    this.formModel.transDate = this.$route.params.res._transTime.substring(0, 10)
  }
}
</script>
