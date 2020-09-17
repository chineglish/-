<template>
    <d2-container>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
    </d2-container>
</template>
<script>
/**
 *@name: 撤销提示保证-结果页
 */
import { billStatus } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'billInfoQueryResult',
  data () {
    return {
      formModel: {
        transName: '',
        returnMsg: ''
      },
      titleData: ['电子商业汇票 ', '票据信息查询', '票据信息查询'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        stepsActive: 2,
        _JnlStatus: '',
        resData: {
          _jnlNo: '',
          group: [
            { label: '票据号码', key: 'stdBillNum' },
            { label: '交易状态',
              key: 'transName',
              formatter: (cellValue) => {
                console.log(cellValue)
                return util.handleEnums(billStatus, cellValue)
              }
            },
            { label: '返回信息', key: 'returnMsg' }
          ]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'billInfoQueryList',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.res) {
      this.formModel.stdBillNum = this.$route.params.res.stdBillNum
      this.formModel.transName = this.$route.params.res.transName
      this.formModel.returnMsg = this.$route.params.res.returnMsg
    }
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    if (this.$route.params.data) {
      Object.assign(this.formModel, this.$route.params)
      this.formModel.status = this.$route.params.res._processState
      // this.formModel.transTime = this.$route.params.res._transTime
      this.data.resData._jnlNo = this.$route.params.res._jnlNo
      this.data._JnlStatus = this.$route.params.res._processState
    }
  }
}
</script>
