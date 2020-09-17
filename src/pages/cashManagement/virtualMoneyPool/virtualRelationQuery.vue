<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @selectAcc="selectAcc"
              @downLoadBtn="downLoadBtn"
              @inquire="inquire"
            >
            </m-new-form>
            <d-table
              v-if="showTable"
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :isPagination="true"
              :pagesize="8"
            >
            </d-table>
        </div>
    </div>
</template>
<script>
import { httpPost, downloadFile } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, inherit_Ttype, accrualFlag_Ttype, accrualMode_Type } from '@/assets/js/entity'
export default {
  name: 'virtualRelationQuery',
  data () {
    return {
      breadData: ['现金管理 ', '虚拟资金池', '虚拟资金池关系查询'],
      formModel: {
        acNo: '',
        currency: '',
        accName: ''
      },
      showTable: false,
      formConfigJson: {
        rules: {},
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '最高级账户',
                'type': 'select',
                'key': 'acNo',
                'options': [],
                trans: { value: 'payerAcNoShow' },
                'changeEventName': 'selectAcc'
              },
              {
                'disabled': false,
                'label': '币种',
                'type': 'text',
                // 'options': currency_type,
                // trans: { value: 'label', key: 'value' },
                'key': 'currencyCode',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disabled': false,
                'label': '户名',
                'type': 'text',
                'key': 'accName'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' },
        { btnText: '下载', class: 'm-cancel-btn', clickEventName: 'downLoadBtn' }
      ],
      tableHeadData: [
        {
          label: '成员账户',
          prop: 'childAcNo',
          width: '180px'
        },
        {
          label: '币种',
          prop: 'childCurrencyCode',
          formatter: (row, column, cellValue, index) => {
            const target = currency_type.find(item => item.value === cellValue)
            return target ? target.label : '---'
          }
        },
        {
          label: '户名',
          prop: 'childAcName',
          width: '220px'
        },
        {
          // 1 是 0 否
          label: '遵从主账户计息规则',
          prop: 'inherit',
          formatter: (row, column, cellValue, index) => {
            const target = inherit_Ttype.find(item => item.value === cellValue)
            return target ? target.label : '---'
          }
        },
        {
          // 0 不计息 1 计息
          label: '上存计息',
          prop: 'accrualFlag',
          formatter: (row, column, cellValue, index) => {
            const target = accrualFlag_Ttype.find(item => item.value === cellValue)
            return target ? target.label : '---'
          }
        },
        {
          label: '上存利率',
          prop: 'crRate'
        },
        {
          // 0 不计息 1 计息
          label: '透支计息',
          prop: 'accrualMode',
          formatter: (row, column, cellValue, index) => {
            const target = accrualMode_Type.find(item => item.value === cellValue)
            return target ? target.label : '---'
          }
        },
        {
          label: '透支利率',
          prop: 'drRate'
        },
        {
          label: '加入日期',
          prop: 'childStartDate'
        }
      ],
      tableData: []
    }
  },
  methods: {
    getAccount () {
      httpPost('/eweb-cash.MultistageBookActListQry.do', { productType: '04' }).then(res => {
        this.payerAccNoList = res.list || []
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        if (this.payerAccNoList.length > 0) {
          this.formModel.acNo = 0
          this.formModel.currencyCode = this.payerAccNoList[0].currencyCode
          this.formModel.accName = this.payerAccNoList[0].acName
        }
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.selectAcc(this.formModel)
      }).catch(err => {
        console.error(err)
      })
    },
    // 下载按钮
    downLoadBtn (data) {
      const params = {
        acNo: this.payerAccNoList[data.acNo].acNo,
        currencyCode: this.payerAccNoList[data.acNo].currencyCode,
        // currencyCode: '01',
        Download: '1'
      }
      downloadFile('/eweb-cash.VitualMoneyInfoQueryDown.do', params)
    },
    // 查询按钮
    inquire (data) {
      const params = {
        acNo: this.payerAccNoList[data.acNo].acNo,
        currencyCode: this.payerAccNoList[data.acNo].currencyCode
        // currencyCode: '01'
      }
      httpPost('/eweb-cash.VitualMoneyInfoQuery.do', params).then(res => {
        this.tableData = res.list
        this.showTable = true
      }).catch(err => {
        console.error(err)
      })
    },
    selectAcc (data) {
      const currentPayerAccNo = this.payerAccNoList[data.acNo]
      // 回显账户名
      data.accName = currentPayerAccNo.acName
      data.currencyCode = currentPayerAccNo.currencyCode
    }
  },
  created () {
    this.getAccount()
  }
}
</script>

<style scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
</style>
