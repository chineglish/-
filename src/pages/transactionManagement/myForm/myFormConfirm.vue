<template>
  <div class="waitQueryPage">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-steps :data="formConfigJson"></m-steps>
      <d-table
        :table-data="tableData"
        :options="options"
        :tableHeadData="tableHeadData"
        :actionData="actionData"
        @agree="agree"
        @back="onBack"
      >
      </d-table>
    </div>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { business_Type } from '../../../assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'myFormConFirm',
  data () {
    return {
      breadData: ['交易管理', '业务类交易审核', '我的制单'],
      formModel: {},
      msgs: [],
      options: { // table属性
        border: true,
        stripe: true
      },
      formConfigJson: {
        stepsActive: 1
      },
      tableHeadData: [
        { label: '交易流水', prop: 'taskSeq', width: '240px' },
        { label: '交易类型', prop: 'transCode', formatter: (row, column, cellValue, index) => util.handleEnums(business_Type, cellValue) },
        { label: '制单人', prop: 'userName' },
        { label: '制单时间', prop: 'createTime' }
      ],
      tableData: [],
      actionData: [
        { btnText: '确认', class: 'm-submit-btn', eventName: 'agree' },
        { btnText: '返回', class: 'm-cancel-btn', eventName: 'back' }
      ]

    }
  },
  methods: {
    async agree () {
      let list = []
      this.tableData.forEach(item => {
        let obj = {
          taskProcessType: 'CC',
          taskSeq: item.taskSeq
        }
        list.push(obj)
      })
      let token = await httpPost('eweb-common.GenToken.do')
      const singMsg = this.isSign({ _Data2Sign: this.$route.params.formModel._Data2Sign, _authenticateType: this.$route.params.formModel._authenticateType })
      httpPost('eweb-setting.CheckPassOrRejForCcNMan.do', {
        _dataMapKey: this.$route.params.formModel._dataMapKey,
        _authenticateTypeChoose: this.$route.params.formModel._authenticateType ? this.$route.params.formModel._authenticateType[0] : '',
        CSIISignature: singMsg,
        _tokenName: token._tokenName,
        authList: list
      }).then(res => {
        let params = {
          _jnlNo: res._jnlNo,
          list: res.list,
          _transTime: res._transTime,
          data: this.tableData
        }
        this.$router.push({
          name: 'myFormResult',
          params
        })
      })
    },
    onBack () {
      // if (this.$route.params.type) {
      //   this.$router.push({
      //     name: 'transactionManagementDetails',
      //     params: {
      //       detail: this.tableData[0],
      //       jnlNo: this.tableData[0].taskSeq,
      //       transCode: this.tableData[0].transCode,
      //       type: '3'
      //     }
      //   })
      // } else {
      //   this.$router.push({
      //     name: 'waitQPage',
      //     activeName: 'third'
      //   })
      // }
      this.$router.back()
    }
  },
  mounted () {
    const { data } = this.$route.params
    if (data && Array.isArray(data)) {
      this.tableData = data
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-box {
    width: 90%;
    margin-left: 5%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.20);
    margin-top: 20px;
  }
</style>
