<template>
  <d2-container class="comprehensive-bill-qry">
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>
    <d2-container>
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        :msgs="msgs"
        @submit="submit"
        @changeNodeName="changeNodeName"
        @changeBankNo="changeBankNo"
        @changeBankName="changeBankName"
        @reset="reset"
      >
      </m-new-form>
    </d2-container>

    <d2-container>
      <d-table
        v-if="showTable"
        :pagesize="20"
        :tableData="tableData"
        :tableHeadData="tableHeadData"
        :actionData="actionData">
      </d-table>
    </d2-container>
  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'
export default {
  name: 'bankInfoQuery',
  data () {
    return {
      showTable: false,
      bankList: [], // 银行列表
      breadcrumb: ['更多', '银行信息查询'],
      formModel: {
        bankCode: '',
        nodeName: ''
      },
      formConfigJson: {
        rules: {
          bankNo: [{ required: true, message: '请输入联行号', trigger: 'submit' }],
          bankCode: [{ required: false, message: '请输入联行号或者网点名称', trigger: 'submit' }],
          nodeName: [{ required: true, message: '请输入网点名称', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                label: '银行名称',
                key: 'bankCode',
                type: 'select',
                'options': [],
                'changeEventName': 'changeBankName',
                defaultVal: ''
              },
              {
                label: '网点名称',
                key: 'nodeName',
                type: 'input',
                'inputEventName': 'changeNodeName'
              },
              {
                label: '联行号',
                key: 'bankNo',
                type: 'input',
                'inputEventName': 'changeBankNo'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: [
        '1.请尽量填写详细的银行信息',
        '2.请务必填写银行名称、网点名称、联行号其中一项'
      ],
      // 信息提示
      infoTips: [],
      tableHeadData: [
        {
          label: '联行号',
          prop: 'bankCode'
        },
        {
          label: '网点名称',
          prop: 'lName',
          formatter: (row, column, cellValue, index) => cellValue
        }
      ],
      tableData: [
      ],
      actionData: []
    }
  },
  methods: {
    bankListQry () {
      httpPost('eweb-common.BankQry.do').then(res => {
        if (res && Array.isArray(res.bankList)) {
          this.bankList = res.bankList
          this.formConfigJson.formItems[0].group[0].options = res.bankList
            .map(item => ({ value: item.bankName, key: item.bankNo }))
        }
      })
    },
    changeBankNo (res) {
      if (res.bankNo) {
        this.formConfigJson.rules.nodeName[0].required = false
      } else {
        this.formConfigJson.rules.nodeName[0].required = true
      }
    },
    reset (res) {
      this.formModel = res
      this.formConfigJson.rules.nodeName[0].required = true
      this.formConfigJson.rules.bankNo[0].required = true
    },
    changeBankName (res, name) {
      // if (res.bankName) {
      //   this.formConfigJson.rules.bankNo[0].required = false
      // } else {
      //   this.formConfigJson.rules.bankNo[0].required = true
      // }
    },
    changeNodeName (res) {
      if (res.nodeName) {
        this.formConfigJson.rules.bankNo[0].required = false
      } else {
        this.formConfigJson.rules.bankNo[0].required = true
      }
    },
    submit (data) {
      let params = {
        bankNo: data.bankNo, // 联行号
        bankCode: data.bankCode, // 银行名字
        nodeName: data.nodeName // 网点名称
      }
      httpPost('/eweb-common.ApsNodeQry.do', params).then(res => {
        this.tableData = res.list
        this.showTable = true
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.bankListQry()
  }
}
</script>
