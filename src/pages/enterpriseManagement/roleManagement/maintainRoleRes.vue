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
/**
 * @author 邓焕
 * @date 2019-12-18
 * @name 角色信息结果页
 */
export default {
  name: 'maintainRoleRes',
  data () {
    return {
      formModel: {},
      routeParams: {},
      breadData: ['企业管理台', '角色管理 ', '角色添加/修改'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '0',
        _RejMessage: '',
        stepsActive: 2,
        itemWidth: '4',
        resData: {
          title: '交易已提交,请等待复核员审核',
          group: [
            { label: '交易名称', key: 'tradeName' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '交易日期', key: 'transactionDate' },
            { label: '操作员号', key: 'operatorNo' }
          ]
        }
      },
      transTypeList: {
        '01': '实时',
        '02': '普通',
        '03': '次日'
      },
      isTrue: {
        '0': '否',
        '1': '是'
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
        name: 'roleList'
      })
    }
  },
  created () {
    this.routeParams = this.$route.params
    this.formModel = this.routeParams
    if (this.routeParams.JnlStatus) {
      this.data._JnlStatus = this.routeParams.JnlStatus
    }
    if (this.routeParams._jnlNo) {
      this.data.resData._jnlNo = this.routeParams._jnlNo
    }
    // this._formatList({ ...this.routeParams })
  }
}
</script>
