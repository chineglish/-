<template>
  <div>
    <div class='form-box'>
      <m-new-form
        :componentJson='formConfigJson'
        :btnData='btnData'
        :formModel='formModel'
        @screenAccounts='screenAccounts'
        @accountInquire='accountInquire'
      ></m-new-form>
    </div>
    <div class='form-box'>
      <d-table
        :table-data='tableData'
        :options='options'
        :isPagination='true'
        :tableHeadData='tableHeadData'
        :operate-data='operateData'
        @handleSelect='handleSelect'
      ></d-table>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
export default {
  props: {
    eventName: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      formModel: {
        payeeAccont: '',
        payeeName: '',
        payeeBank: '',
        payeeBankDeptName: ''
      },
      formConfigJson: {
        formWidth: '50%',
        formItems: [
          {
            // title: '到账通知单',
            group: [
              {
                disabled: false,
                label: '联系人账户',
                type: 'input',
                key: 'payeeAccont',
                inputEventName: 'screenAccounts'
              },
              {
                disabled: false,
                label: '联系人账户名称',
                type: 'input',
                key: 'payeeName',
                inputEventName: 'screenAccounts'
              },
              {
                disabled: false,
                label: '联系人银行',
                type: 'input',
                key: 'payeeBank',
                inputEventName: 'screenAccounts'
              },
              {
                disabled: false,
                label: '开户网点',
                type: 'input',
                key: 'payeeBankDeptName',
                inputEventName: 'screenAccounts'
              }
            ]
          }
        ]
      },
      btnData: [
        {
          btnText: '查询',
          class: 'm-submit-btn',
          clickEventName: 'accountInquire'
        },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      options: {
        // table属性
        border: true,
        stripe: true
      },
      firstColIndex: {
        type: 'selection',
        eventName: ''
      },
      tableHeadData: [
        {
          label: '行内外标志',
          prop: 'lastTrsType',
          formatter: (row, column, cellValue, index) => {
            return cellValue === '0' ? '行内' : '行外'
          }
        },
        { label: '联系人账户', prop: 'payeeAccountNo' },
        { label: '联系人账户名称', prop: 'payeeAccountName' },
        // { label: '收款账户开户行', prop: 'payeeBankName' },
        { label: '开户网点', prop: 'payeeBankDeptName' }
      ],
      tableData: [],
      allData: [],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '选择',
            eventName: 'handleSelect'
          }
        ]
      }
    }
  },
  methods: {
    screenAccounts (res) {
      setTimeout(() => {
        this.tableData = []
        this.allData.forEach(item => {
          if (
            (item.payeeBankName && item.payeeBankName.indexOf(res.payeeBank) !== -1) &&
            (item.payeeAccountNo && item.payeeAccountNo.indexOf(res.payeeAccont) !== -1) &&
            (item.payeeAccountName && item.payeeAccountName.indexOf(res.payeeName) !== -1) &&
            (item.payeeBankDeptName && item.payeeBankDeptName.indexOf(res.payeeBankDeptName) !== -1)
          ) {
            this.tableData.push(item)
          }
        })
      }, 50)
    },
    accountInquire (res) {
      this.accountListQry(res)
    },
    accountListQry (data) {
      const params = {
        payeeAcNo: '',
        payeeAcName: '',
        payeeBankId: ''
      }
      httpPost('eweb-transfer.PayeeBookQry.do', params).then(res => {
        this.tableData = res.list
        this.allData = res.list
      })
    },
    handleSelect (data) {
      this.$emit(this.eventName, data.data)
    }
  }
}
</script>
