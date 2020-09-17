<template>
    <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-form-res
          :data="data"
          :form-model="formModel"
          :btnData="btnData"
          @back="onBack"
          @download="download"
          @fileUpload="fileUpload"
        ></m-form-res>
    </d2-container>
</template>
<script>
import { downloadFile } from '@/api/sys/http'
export default {
  name: 'resultPage',
  data () {
    return {
      formModel: {},
      routeParams: {},
      breadData: ['财务管理', '代发工资', '模板设置'],
      btnData: [
        { btnText: '模板下载', class: 'm-submit-btn', clickEventName: 'download' },
        { btnText: '工资发放', class: 'm-submit-btn', clickEventName: 'fileUpload' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '0',
        _RejMessage: '',
        itemWidth: '4',
        resData: {
          title: '模板修改成功',
          _jnlNo: '',
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
        name: 'templateSettings'
      })
    },
    fileUpload () {
      this.$router.push({
        name: 'fileUpload',
        params: {
          templateNo: this.$route.params.templateNo
        }
      })
    },
    download () {
      const data = {
        templateNo: this.$route.params.templateNo,
        Download: 'xls'
      }
      downloadFile('/eweb-transfer.PaySalaryTemplateDownload.do', data)
    }
  },
  created () {
    this.routeParams = this.$route.params
    if (this.routeParams._processState) {
      this.data._JnlStatus = this.routeParams._processState
    }
    this.data.resData._jnlNo = this.routeParams._jnlNo
    const user = this.getUser()
    this.routeParams.operatorName = user ? user.userName : ''
    this.routeParams.operatorNo = user ? user.userId : ''
    this._formatList({ ...this.routeParams })
  }
}
</script>
