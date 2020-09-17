<template>
  <div class="waitQueryPage">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form :componentJson="formConfigJson"></m-new-form>
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
import { business_Type } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'waitCheckConfirm',
  data () {
    return {
      breadData: ['交易管理', '管理类交易审核', '待审核记录查询'],
      formModel: {},
      msgs: [],
      options: { // table属性
        border: true,
        stripe: true
      },
      formConfigJson: {
        stepsActive: 1,
        formItems: []
      },
      tableHeadData: [
        { label: '交易流水', prop: 'taskSeq' },
        { label: '交易类型', prop: 'transCode', formatter: (row, column, cellValue, index) => util.handleEnums(business_Type, cellValue) },
        { label: '制单人', prop: 'userName' },
        { label: '制单时间', prop: 'createTime' },
        { label: '审核状态', prop: 'examineStastus' }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '确认',
          class: 'm-submit-btn',
          eventName: 'agree'
        },
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          eventName: 'back'
        }
      ]
    }
  },
  methods: {
    async agree () {
      let list = []
      this.tableData.forEach(item => {
        let obj = {
          taskProcessType: 'AG',
          taskSeq: item.taskSeq
        }
        list.push(obj)
      })
      let token = await httpPost('eweb-common.GenToken.do')
      const singMsg = this.isSign({ _Data2Sign: this.$route.params.formModel._Data2Sign, _authenticateType: this.$route.params.formModel._authenticateType })
      httpPost('eweb-setting.CheckPassOrRej.do', {
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
          name: 'waitCheckResult',
          params
        })
      })
    },
    onBack () {
      this.$router.back()
    }
  },
  created () {
    const { data } = this.$route.params
    if (data && Array.isArray(data)) {
      this.tableData = data
      this.tableData.forEach(item => {
        item.examineStastus = '待审核'
      })
    }
  }
}
</script>
