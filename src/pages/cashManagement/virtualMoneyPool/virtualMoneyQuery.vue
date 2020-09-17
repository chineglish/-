<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @selectAcc="selectAcc"
              @inquire="inquire"
              @downLoadBtn="downLoadBtn"
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
import { currency_type } from '@/assets/js/entity'
export default {
  name: 'virtualMoneyQuery',
  data () {
    return {
      breadData: ['现金管理 ', '虚拟资金池', '虚拟资金池余额查询'],
      formModel: {
        acNo: '',
        currency: '',
        userName: ''
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
        { label: '账户', prop: 'acNo' },
        {
          label: '币种',
          prop: 'currencyCode',
          formatter: (row, column, cellValue, index) => {
            const target = currency_type.find(item => item.value === cellValue)
            return target ? target.label : '---'
          }
        },
        { label: '户名', prop: 'acName' },
        {
          label: '余额',
          prop: 'balance',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '可用余额',
          prop: 'useBalance',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
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
      downloadFile('/eweb-cash.VitualMoneyBalQueryDown.do', params)
    },
    // 查询按钮
    inquire (data) {
      const params = {
        acNo: this.payerAccNoList[data.acNo].acNo,
        currencyCode: this.payerAccNoList[data.acNo].currencyCode
        // currencyCode: '01'
      }
      httpPost('/eweb-cash.VitualMoneyBalQuery.do', params).then(res => {
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
