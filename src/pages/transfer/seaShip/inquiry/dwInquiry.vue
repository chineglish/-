<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
        :btnData="btnData"
        @selectAcc="selectAcc"
        @reset="reset"
        @submit="inquire">
      </m-new-form>
    </div>
    <div class="form-box">
      <d-table
        :table-data="tableData"
        :tableHeadData="tableHeadData"
        :pagesize="20"
        @handleBack="handleBack">
      </d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>
<script>
/**
 *@name: 出入金交易明细查询
 * @date: 2019-12-17
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'dwInquiry',
  data () {
    return {
      payerAccNoList: [], // 付款账户信息列表
      breadData: ['转账汇款', '上海航运', '出入金交易明细查询'],
      msgs: [
        '1.用户可以用此功能进行上海航运出入金交易操作。'
      ],
      formModel: {
        payerAccont: 0,
        Balance: '',
        transName: '',
        transMoneyAcc: '',
        marketOrgName: '',
        Yhbh: '',
        beginDate: '',
        endDate: ''
      },
      formConfigJson: {
        rules: {
          payerAccont: [{ required: true, message: '请选择交易商银行账户', trigger: 'submit' }],
          beginDate: [{ required: true, message: '请输入开始日期', trigger: 'submit' }],
          endDate: [{ required: true, message: '请输入结束日期', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '交易商银行账户',
                'type': 'select',
                'options': [],
                trans: { value: 'showAcNo' },
                'changeEventName': 'selectAcc',
                'key': 'payerAccont'
              }, {
                'disabled': true,
                'label': '可用余额',
                'type': 'text',
                textType: 'shy',
                'key': 'Balance',
                formatter: (key, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '交易市场名称',
                'type': 'text',
                'key': 'marketOrgName'
              }, {
                'disabled': true,
                'label': '交易商交易资金账号',
                'type': 'text',
                'key': 'Yhbh'
              },
              {
                formWidth: '100%',
                disabled: false,
                label: '查询日期',
                valueFormat: 'yyyy-MM-dd',
                type: 'dateArea',
                firstKey: 'beginDate',
                secondKey: 'endDate'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      tableHeadData: [
        { label: '账号', prop: 'Yhzh' },
        { label: '交易商编码', prop: 'Yhbh' },
        { label: '交易日期', prop: 'Jyrq', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '交易名称', prop: 'Jymc' },
        { label: '交易金额', prop: 'Jyje', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '手续费', prop: 'Sxf', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '交易状态',
          prop: 'Jyzt',
          formatter: (row, column, cellValue, index) =>
            cellValue === '0' ? '成功' : '失败'
        }
      ],
      tableData: [
      ]
    }
  },
  methods: {
    selectAcc (data) {
      this.formModel = data
      const params = {
        payerAcNo: this.payerAccNoList[data.payerAccont].acNo,
        payerSubAcNo: this.payerAccNoList[data.payerAccont].subAcNo
      }
      httpPost('/eweb-acmgmt.AccountInfoQuery.do', params).then(balance => {
        data.Balance = balance.availBal
        httpPost('/eweb-transfer.SHShipSignManage.do', {
          acNo: this.payerAccNoList[data.payerAccont].acNo
        }).then(market => {
          data.marketOrgName = market.marketOrgName
          data.Yhbh = market.result[0].Yhbh
        })
      })
    },
    reset (res) {
      this.formModel = res
      this.formModel.payerAccont = 0
      let filterDate = util.filterDate('1')
      this.formModel.beginDate = filterDate.startDate
      this.formModel.endDate = filterDate.endDate
      this.selectAcc(this.formModel)
    },
    inquire (data) {
      const params = {
        acNo: this.payerAccNoList[data.payerAccont].acNo,
        marketOrgName: data.marketOrgName,
        protocolNo: data.Yhbh,
        dealerNo: data.Khbh,
        beginDate: data.beginDate,
        endDate: data.endDate,
        queryNum: '20'
        // queryFlag: data,
        // firstID: data,
        // lastID: data,
        // totalNum: '20'
      }
      httpPost('/eweb-transfer.SHShipAcsCtsFlowQry.do', params).then(res => {
        this.tableData = res.result
      }).catch(err => {
        console.error(err)
      })
    },
    handleBack () {
      this.$router.push('/index')
    },
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
    }
  },
  created () {
    let filterDate = util.filterDate('1')
    this.formModel.beginDate = filterDate.startDate
    this.formModel.endDate = filterDate.endDate
    this.accNoListQry()
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
.form-box >>> #m-form .m-el-form .el-range-editor.el-input__inner {
    width: 85%;
}
</style>
