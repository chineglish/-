<template>
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
</template>

<script>
import util from '@/libs/util'
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
  name: 'socialSecurityPaymentConffer',
  data () {
    return {
      tableHeadData: [
        {
          label: '费款所属期',
          prop: 'fkssq',
          formatter: (row, column, cellValue, index) => util.separationTimeSlot(cellValue)
        },
        {
          label: '实缴金额',
          prop: 'yhsjje',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '社保实缴序号',
          prop: 'sbsjxh'
        },
        {
          label: '业务流水号',
          prop: 'sbywlsh'
        },
        {
          label: '纳税人流水号',
          prop: 'nsrlsh'
        },
        {
          label: '单位缴费类型',
          prop: 'dwjflx'
        }
      ],
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '社保信息',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '社保单位名称',
                'key': 'socSecurUnitName'
              }
            ]
          },
          {
            formWidth: '100%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '付款账号',
                'key': 'acNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '付款账户名称',
                'key': 'acName'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '总金额',
                'key': 'amount',
                formatter: (key, value) => {
                  return util.formatCurrency(value)
                }
              }
            ]
          },
          {
            formWidth: '50%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '社保单位编号',
                'key': 'socSecurUnitCode'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '纳税人识别号',
                'key': 'taxPayerId'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '征收账号',
                'key': 'collectAcNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '开户机构名称',
                'key': 'operBranchName'
              }
            ]
          }
        ]
      }
    }
  },
  created () {
    this.formModel.acNo = this.formModel.payerAccount.acNo
    this.formModel.acName = this.formModel.payerAccount.acName
  }
}
</script>
