<template>
  <div class="waitQueryPage">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="main">
      <div class="form-box">
        <m-steps :data="stepsData"></m-steps>
        <d-table
          :table-data="tableData"
          :options = "options"
          :tableHeadData="tableHeadData"
        >
        </d-table>
        <m-new-form
          :componentJson="formConfigJson"
          :formModel="formModel"
          :btnData="btnData"
          @refuse = "refuse"
          @back = "onBack"
        >
        </m-new-form>
      </div>
    </div>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { business_Type } from '../../../../assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'refuseConfirmPage',
  data () {
    return {
      breadData: ['交易管理', '业务类交易审核', '待审核记录查询'],
      stepsData: {
        stepsActive: 1
      },
      formModel: {
        refuse: ''
      },
      msgs: [],
      options: { // table属性
        border: true,
        stripe: true
      },
      btnData: [
        { btnText: '拒绝', class: 'm-submit-btn', clickEventName: 'refuse' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      formConfigJson: {
        formWidth: '100%',
        rules: {
          refuse: [{ required: true, message: '拒绝原因', trigger: 'submit' }]
        },
        formItems: [{
          group: [
            {
              'disabled': true,
              'label': '拒绝原因',
              'type': 'input',
              'key': 'refuse'
            }
          ]
        }]
      },
      tableHeadData: [
        { label: '交易流水', prop: 'taskSeq', width: '240px' },
        { label: '交易类型', prop: 'transCode', formatter: (row, column, cellValue, index) => util.handleEnums(business_Type, cellValue) },
        {
          label: '交易账户',
          prop: 'payerAcNo',
          formatter: (row, column, cellValue, index) => {
            let val = ''
            val = cellValue || row.payeeAcNo
            return val
          }
        },
        { label: '交易金额', prop: 'actAmount', formatter: (row, column, cellValue, index) => cellValue > 0 ? util.formatCurrency(cellValue) : '' },
        { label: '制单人', prop: 'userName' },
        { label: '制单时间', prop: 'createTime' },
        { label: '审核状态', prop: 'examineStastus' }
      ],
      tableData: []
    }
  },
  methods: {
    async refuse () {
      let list = []
      this.tableData.forEach(item => {
        let obj = {
          taskProcessType: 'RJ',
          taskSeq: item.taskSeq,
          remark: this.formModel.refuse
        }
        list.push(obj)
      })
      let token = await httpPost('eweb-common.GenToken.do')
      const singMsg = this.isSign({ _Data2Sign: this.$route.params.formModel._Data2Sign, _authenticateType: this.$route.params.formModel._authenticateType })
      httpPost('eweb-setting.CheckPassOrRejForNMan.do', {
        _dataMapKey: this.$route.params.formModel._dataMapKey,
        _authenticateTypeChoose: this.$route.params.formModel._authenticateType ? this.$route.params.formModel._authenticateType[0] : '',
        CSIISignature: singMsg,
        _tokenName: token._tokenName,
        authList: list
      }).then(res => {
        let params = {
          _jnlNo: res._jnlNo,
          _transTime: res._transTime,
          list: res.list,
          data: this.tableData
        }
        this.$router.push({
          name: 'refuseResultPage',
          params
        })
      })
    },
    onBack () {
      this.$router.back()
    }
  },
  created () {
    const { refuse, data } = this.$route.params
    this.formModel.refuse = refuse
    if (data && Array.isArray(data)) {
      this.tableData = data
    }
  }
}
</script>
