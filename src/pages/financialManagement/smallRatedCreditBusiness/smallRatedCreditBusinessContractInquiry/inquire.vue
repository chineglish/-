<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
              ref="mNewForm"
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @submit="inquire"
              @changeAct="changeAct"
            >
            </m-new-form>
        </div>
        <div v-if="showResult" class="form-box">
            <d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :firstColIndex="firstColIndex"
              :pagesize="20"
              @gotoPre="gotoPre"
            >
            </d-table>
        </div>
    </div>
</template>

<script>
/**
 * @name: 小额定期贷记业务查询
 * @author: 邓焕
 * @date: 2019-12-21
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { busi_kind, busi_type } from '@/assets/js/entity'
export default {
  name: 'smallRatedCreditBusinessContractInquiry',
  data () {
    return {
      showResult: false,
      smallLimitLeadSignInfo: [],
      filename: __filename,
      payerAccNoList: [], // 付款账户信息列表
      breadData: ['财务管理', '小额定期贷记业务'],
      formModel: {
        paymentAct: 0,
        balance: ''
      },
      formConfigJson: {
        rules: {
          paymentAct: [{ required: true, message: '付款账户', trigger: 'change' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '付款账户',
                'type': 'select',
                'options': [],
                trans: { value: 'paymentActShow' },
                'key': 'paymentAct',
                changeEventName: 'changeAct'
              },
              {
                disabled: false,
                label: '可用余额',
                textType: 'shy',
                type: 'text',
                key: 'balance',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      tableHeadData: [
        { label: '合同(协议)号', prop: 'outprotocalno', clickEventName: 'gotoPre' },
        { label: '业务类型', prop: 'busitype', formatter: (row, column, cellValue, index) => util.handleEnums(busi_type, cellValue) },
        { label: '业务种类', prop: 'busikind', formatter: (row, column, cellValue, index) => util.handleEnums(busi_kind, cellValue) },
        { label: '单笔手续费金额', prop: 'feeamount', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '签约日期/生效日期', prop: 'effectdate', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '解约日期/失效日期', prop: 'expireddate', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) }
      ],
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      tableData: []
    }
  },
  methods: {
    changeAct (res) {
      const params = {
        payerAcNo: this.payerAccNoList[res.paymentAct].acNo,
        payerSubAcNo: this.payerAccNoList[res.paymentAct].subAcNo
      }
      httpPost('eweb-acmgmt.AccountInfoQuery.do', params).then(balance => {
        res.balance = balance.availBal
      })
    },
    tableSelectChange (selection) {
      // 监听表格选择事件触发
    },
    inquire (data) {
      this.tableData = []
      this.showResult = false
      this.formModel = data
      httpPost('/eweb-transfer.SmallLimitLeadSignInfoQuery.do', {
        payerAcNo: this.payerAccNoList[data.paymentAct].acNo,
        subAcNo: this.payerAccNoList[data.paymentAct].subAcNo
        }).then(res => {
        this.tableData = res.result
        this.showResult = true
      })
    },
    gotoPre (data) {
      // 点击批次号
      data.businessType = util.handleEnums(busi_type, data.busitype)
      data.businessKind = util.handleEnums(busi_kind, data.busikind)
      data.balance = this.formModel.balance
      this.$router.push({
        name: 'smallRatedCreditBusinessContractPre',
        params: {
          data: data
        }
      })
    },
    getAccountList () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'SmallLimitLead' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => {
          item.paymentActShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.changeAct(this.formModel)
      })
    }
  },
  created () {
    this.getAccountList()
  }
}
</script>
