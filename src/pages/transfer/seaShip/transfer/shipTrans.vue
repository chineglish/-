<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @selectAcc="selectAcc"
              @submit="inquiry"
              @reset="reset">
      </m-new-form>
    </div>
    <div class="form-box" v-if="showtable">
      <d-table
              :table-data="tableData"
              :options="options"
              :isPagination="true"
              :tableHeadData="tableHeadData"
              :actionData="actionData"
              @deposit="deposit"
              @withdrawal="withdrawal">
      </d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'shipTrans',
  data () {
    return {
      showtable: false,
      payerAccNoList: [], // 付款账户信息列表
      titleData: ['转账汇款', '上海航运', '出入金交易'],
      msgs: [
        '1.用户可以用此功能进行上海航运出入金交易操作。'
      ],
      formModel: {
        payerAccont: 0,
        Balance: ''
      },
      formConfigJson: {
        rules: {
          payerAccont: [{ required: true, message: '请选择交易银行账户', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '交易银行账户',
                'type': 'select',
                'changeEventName': 'selectAcc',
                trans: { value: 'showAcNo' },
                'options': [],
                'key': 'payerAccont'
              },
              {
                'disabled': true,
                'label': '可用余额',
                'type': 'text',
                textType: 'shy',
                'key': 'Balance',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      options: { // table属性
        border: true,
        stripe: true
      },
      tableHeadData: [
        { label: '交易市场名称', prop: 'marketOrgName' },
        { label: '交易商交易资金账号', prop: 'Yhbh' },
        { label: '交易商银行账号', prop: 'Yhzh' }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '入金',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'deposit'
        },
        {
          btnText: '出金',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'withdrawal'
        }
      ]
    }
  },
  methods: {
    /**
     * 交易账户获取
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { transCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.payerAccNoList.forEach(item => {
          item.showAcNo = util.getPayerAccount(item)
        })
        this.selectAcc(this.formModel)
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 显示选择账户的余额
     */
    selectAcc (data) {
      this.formModel = data
      const params = {
        payerAcNo: this.payerAccNoList[this.formModel.payerAccont].acNo,
        payerSubAcNo: this.payerAccNoList[this.formModel.payerAccont].subAcNo
      }
      httpPost('/eweb-acmgmt.AccountInfoQuery.do', params).then(res => {
        this.formModel.Balance = res.availBal
      }).catch(err => {
        console.error(err)
      })
    },
    inquiry (data) {
      const params = {
        acNo: this.payerAccNoList[this.formModel.payerAccont].acNo
      }
      httpPost('/eweb-transfer.SHShipSignManage.do', params).then(res => {
        this.tableData = res.result
        this.tableData.forEach(item => {
          item.marketOrgName = res.marketOrgName
        })
        this.showtable = true
      })
    },
    reset (res) {
      this.formModel = res
      this.accNoListQry()
    },
    deposit () {
      this.$router.push({
        name: 'depositPre',
        params: {
          acNo: this.payerAccNoList[this.formModel.payerAccont].acNo,
          Balance: this.formModel.Balance,
          ...this.tableData[0]
        }
      })
    },
    withdrawal () {
      this.$router.push({
        name: 'withdrawalPre',
        params: {
          acNo: this.payerAccNoList[this.formModel.payerAccont].acNo,
          Balance: this.formModel.Balance,
          ...this.tableData[0]
        }
      })
    }
  },
  created () {
    this.accNoListQry()
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
    }
    // this.inquiry(this.formModel)
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
