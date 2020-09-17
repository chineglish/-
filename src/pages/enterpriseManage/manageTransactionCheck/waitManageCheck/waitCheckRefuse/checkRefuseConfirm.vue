<template>
    <div class="waitQueryPage">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
          <div class="form-box">
            <m-steps :data="{stepsActive: 1}"></m-steps>
            <d-table
              :table-data="tableData"
              :options = "options"
              :tableHeadData="tableHeadData"
            >
            </d-table>
            <m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @submit="submit"
                @bank="onBack"
            >
            </m-new-form>
          </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { business_Type } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'checkRefuseInner',
  data () {
    return {
      breadData: ['交易管理', '管理类交易审核', '待审核记录查询'],
      formModel: {
        refuseBecause: ''
      },
      msgs: [],
      options: { // table属性
        border: true,
        stripe: true
      },
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'bank' }
      ],
      formConfigJson: {
        rules: {
          refuseBecause: [{ required: true, message: '请输入', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '拒绝原因',
                'type': 'text',
                'key': 'refuseBecause'
              }
            ]
          }
        ]
      },
      tableHeadData: [
        { label: '交易流水', prop: 'taskSeq', width: '240px' },
        { label: '交易类型', prop: 'transCode', formatter: (row, column, cellValue, index) => util.handleEnums(business_Type, cellValue) },
        { label: '制单人', prop: 'userName' },
        { label: '制单时间', prop: 'createTime' },
        { label: '审核状态', prop: 'examineStastus' }
      ],
      tableData: []
    }
  },
  methods: {
    // 确认按钮
    async submit () {
      let list = []
      this.tableData.forEach(item => {
        let obj = {
          taskProcessType: 'RJ',
          taskSeq: item.taskSeq,
          remark: this.formModel.refuseBecause
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
          data: this.tableData,
          _transTime: res._transTime
        }
        this.$router.push({
          name: 'checkRefuseResult',
          params
        })
      })
    },
    onBack () {
      this.$router.back()
    }
  },
  created () {
    this.formModel.refuseBecause = this.$route.params.res.refuseBecause
    this.tableData = this.$route.params.tableData
  }
}
</script>

<style lang="scss"  scoped>
.d-table{
  box-shadow: none !important;
}
</style>
