<template>
  <d2-container class="deactive-ledger-qry">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <d2-container>
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        :msgs="msgs"
        @submit="submit"
      >
      </m-new-form>
    </d2-container>

    <d2-container>
      <d-table
        :table-data="tableData"
        :options="options"
        :pagesize="20"
        :tableHeadData="tableHeadData"
        :infoTips="infoTips"
        @clickTableLink="clickTableLink"
      >
      </d-table>
    </d2-container>
  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util.js'

export default {
  name: 'deactive-ledger-qry',
  data () {
    return {
      breadData: ['账户管理', '账户已注销账簿信息查询'],
      formModel: {
        acNo: '',
        productType: '',
        currencyType: ''
      },
      formConfigJson: {
        rules: {
          acNo: [
            { required: true, message: '请选择账户', trigger: 'blur' }
          ]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                label: '账户',
                key: 'acNo',
                type: 'select',
                value: '',
                options: [],
                trans: { value: 'acNoLabel', key: 'acNo' }
              },
              {
                label: '产品类型',
                key: 'productType',
                type: 'select',
                value: '',
                options: [
                  { value: '全部', key: '' },
                  { value: '多级账簿', key: '02' },
                  { value: '资金归集', key: '03' }
                ]
              },
              {
                label: '币种',
                key: 'currencyType',
                type: 'select',
                value: '',
                options: [
                  { value: '人民币', key: '01' }
                ]
              },
              {
                label: ' ',
                key: ' '
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      msgs: [],
      options: { // table属性
        border: true,
        stripe: true
      },
      infoTips: [ // 信息提示
      ],
      tableHeadData: [
        {
          label: '账户名称',
          prop: 'acName'
        },
        {
          label: '账号',
          prop: 'acNo'
        },
        {
          label: '账簿名',
          prop: 'asAcName'
        },
        {
          label: '账簿号',
          prop: 'asAcNo',
          clickEventName: 'clickTableLink'
        },
        {
          label: '自身余额',
          prop: 'selfBal',
          formatter: (row, cell, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '开通日期',
          prop: 'openDate',
          width: '120px',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '注销日期',
          prop: 'closeDate',
          width: '120px',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '附言',
          prop: 'postscript'
        }
      ],
      tableData: []
    }
  },
  methods: {
    submit (res) {
      // 查询
      this.formModel = res
      this.listQry(res)
    },
    /**
     * 付款账户列表查询
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do').then(res => {
        res.AcList.forEach(item => {
          item.acNoLabel = util.getPayerAccount(item)
        })
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        if (this.$route.params.formModel) {
          this.formModel = this.$route.params.formModel
        } else {
          this.formModel.acNo = this.payerAccNoList[0].acNo
          this.formModel.productType = ''
          this.formModel.currencyType = '01'
        }
        console.log('111', this.formModel)
        this.listQry(this.formModel)
      })
    },
    // accNoListQry () {
    //   httpPost('eweb-cash.AcNoInfoQry.do').then(res => {
    //     res.list.forEach(item => {
    //       item.acNoLabel = item.acNo + '/' + item.acName
    //     })
    //     this.payerAccNoList = res.list || []
    //     this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
    //     if (this.$route.params.formModel) {
    //       this.formModel = this.$route.params.formModel
    //     } else {
    //       this.formModel.acNo = this.payerAccNoList[0].acNo
    //       this.formModel.productType = ''
    //       this.formModel.currencyType = '01'
    //     }
    //     console.log('111', this.formModel)
    //     this.listQry(this.formModel)
    //   })
    // },
    listQry (data) {
      const params = {
        acNo: data.acNo,
        productType: data.productType,
        currencyCode: data.currencyType
      }
      httpPost('/eweb-acmgmt.AccountAfterCancelBookQry.do', params).then(res => {
        this.tableData = res.list
        console.log('222', res.list)
      })
    },
    clickTableLink (obj = {}) {
      this.$router.push({
        name: 'deactiveLedgerDetail',
        params: {
          detail: obj,
          formModel: this.formModel
        }
      })
    }
  },
  created () {
    this.accNoListQry()
  }
}
</script>
