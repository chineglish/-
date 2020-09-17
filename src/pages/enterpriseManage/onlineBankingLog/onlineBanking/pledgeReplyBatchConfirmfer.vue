<template>
  <div>
    <div class="form-box">
      <d-table
        :tableData="tableData"
        :tableHeadData="tableHeadData"
      >
      </d-table>
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
      >
    </m-new-form>
    </div>
  </div>
</template>
<script>
// import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { bill_Type, response_Type } from '@/assets/js/entity'
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'pledgeReplyBatchConfirmfer',
  data () {
    return {
      // titleData: ['企业管理台', '网银日志查询', '证书自动扣费解约']
      tableHeadData: [
        { label: '票据号码', prop: 'stdBillNum' },
        { label: '票据类型',
          prop: 'stdBillTyp',
          formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, cellValue) },
        { label: '出票日期', prop: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '到期日', prop: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '票面金额', prop: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '出票人名称', prop: 'stdDrwrNam' },
        { label: '收款人名称', prop: 'stdPyeeNam' },
        { label: '承兑人名称', prop: 'stdAccpNam' }
      ],
      formConfigJson: {
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '客户账号',
                'type': 'text',
                'key': 'stdDrwrAcc'
              },
              {
                'disabled': false,
                'label': '应答意见',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(response_Type, value),
                'key': 'stdSgnrRes'
              },
              {
                'disabled': false,
                'label': '总笔数',
                'type': 'text',
                'key': 'total'
              },
              {
                'disabled': false,
                'label': '总金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'amount'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    // 修改签约信息
    // 解约
    // 弹框取消按钮
    // 弹框确认按钮
  },
  created () {
    this.formModel.stdDrwrAcc = this.formModel.list[0].stdDrwrAcc
    this.formModel.stdSgnrRes = this.formModel.list[0].stdSgnrRes
  }
  // created () {
  //   this.AutDedFeeSignQry()
  // }
}
</script>

<style lang="scss">
</style>
