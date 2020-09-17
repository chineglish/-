<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              :msgs="msgs"
              @changeCondition="changeCondition"
              @submit="submit">
      </m-new-form>
    </div>
    <div class="search-result" v-show="showResult">
        <d-table
          :table-data="tableData"
          :tableHeadData="tableHeadData"
          :pagesize="pagesize"
          @clickAccountDetails="clickAccountDetails"
          >
        </d-table>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { price_type, zr_type } from '@/assets/js/entity'
export default {
  name: 'largeDepositTransferQuery',
  data () {
    return {
      payerAccNoList: [],
      showResult: false,
      pagesize: 20,
      formModel: {
        account: 0,
        takeType: '0'
      },
      formConfigJson: {
        rules: {
          // account: [{ required: true, message: '选择账号', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '业务类型',
                'type': 'select',
                'options': [
                  { 'value': '大额存单转让查询', 'key': '0' },
                  { 'value': '大额存单受让查询', 'key': '1' }
                ],
                changeEventName: 'changeCondition',
                'key': 'takeType'
              },
              {
                'disabled': false,
                'label': '选择账号',
                'type': 'select',
                'options': [],
                changeEventName: 'changeCondition',
                trans: { value: 'payerAcNoShow' },
                'key': 'account'
              }
            ]
          },
          {
            formWidth: '100%',
            group: [
              {
                type: 'dateArea',
                label: '查询日期',
                changeEventName: 'changeCondition',
                firstKey: 'startDate',
                secondKey: 'endDate'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
        // { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      breadData: ['账户管理', '其他账户查询', '单位大额存单转让受让查询'],
      tableHeadData: [
        // 选择转让查询 字段未确定-------------------------------------
        {
          label: '产品期次编号',
          prop: 'prdBatchCode',
          clickEventName: 'clickAccountDetails',
          show: false
        },
        {
          label: '大额存单账号',
          prop: 'entAssAcNo',
          show: false
        },
        {
          label: '出让人名称',
          prop: 'assignAcName',
          show: false
        },
        {
          label: '出让人客户账号',
          prop: 'assignAcNo',
          show: false
        },
        {
          label: '转让日期',
          prop: 'assignDate',
          show: false,
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '转让方式',
          prop: 'assignMode',
          formatter: (row, column, cellValue, index) => util.handleEnums(zr_type, cellValue),
          show: false
        },
        {
          label: '转让定价方式',
          prop: 'priceType',
          formatter: (row, column, cellValue, index) => util.handleEnums(price_type, cellValue),
          show: false
        },
        {
          label: '大额存单余额',
          prop: 'actBal',
          show: false,
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '转让份额',
          prop: 'assEveAmt',
          show: false,
          width: '150',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '出让应计利息(%)',
          prop: 'interest',
          show: false,
          formatter: (row, column, cellValue, index) => util.formatInterestRate(cellValue)
        },
        { label: '转让金额',
          prop: 'assignAmount',
          show: false,
          width: '150',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        // 选择受让查询---------------------------
        // {
        //   label: '产品期次编号',
        //   prop: 'prdBatchCode1',
        //   show: false
        // },
        {
          label: '大额存单账号',
          prop: 'entAssAcNo',
          show: false
        },
        {
          label: '受让人名称',
          prop: 'transAcName',
          show: false
        },
        {
          label: '受让人付款人账号',
          prop: 'payerAcNo',
          show: false
        },
        {
          label: '转让日期',
          prop: 'assignDate',
          show: false,
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '转让方式',
          prop: 'assignMode',
          formatter: (row, column, cellValue, index) => util.handleEnums(zr_type, cellValue),
          show: false
        },
        {
          label: '受让应计利息(%)',
          prop: 'interest',
          show: false,
          formatter: (row, column, cellValue, index) => util.formatInterestRate(cellValue)
        },
        {
          label: '转让份额',
          prop: 'assEveAmt',
          show: false,
          width: '150',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '转让金额',
          prop: 'assignAmount',
          width: '150',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue),
          show: false
        }
      ],
      tableData: [],
      msgs: []
    }
  },
  methods: {
    clickAccountDetails (data) {
      console.log(data)
      this.$router.push({
        name: 'largeDepositTransferQueryDetails',
        params: { data: data }
      })
    },
    changeCondition (data) {
      this.$msg()
      this.showResult = false
      this.tableData = []
      this.tableHeadData[0].show = false
      this.tableHeadData[1].show = false
      this.tableHeadData[2].show = false
      this.tableHeadData[3].show = false
      this.tableHeadData[4].show = false
      this.tableHeadData[5].show = false
      this.tableHeadData[6].show = false
      this.tableHeadData[7].show = false
      this.tableHeadData[8].show = false
      this.tableHeadData[9].show = false
      this.tableHeadData[10].show = false
      this.tableHeadData[11].show = false
      this.tableHeadData[12].show = false
      this.tableHeadData[13].show = false
      this.tableHeadData[14].show = false
      this.tableHeadData[15].show = false
      this.tableHeadData[16].show = false
      this.tableHeadData[17].show = false
      this.tableHeadData[18].show = false
      // this.tableHeadData[19].show = false
    },
    submit (data) {
      console.log('data==', data.takeType)
      this.showResult = true
      // 受让
      if (data.takeType === '0') {
        this.tableHeadData[0].show = true
        this.tableHeadData[1].show = true
        this.tableHeadData[2].show = true
        this.tableHeadData[3].show = true
        this.tableHeadData[4].show = true
        this.tableHeadData[5].show = true
        this.tableHeadData[6].show = true
        this.tableHeadData[7].show = true
        this.tableHeadData[8].show = true
        this.tableHeadData[9].show = true
        this.tableHeadData[10].show = true
      } else if (data.takeType === '1') { // 转让
        this.tableHeadData[11].show = true
        this.tableHeadData[12].show = true
        this.tableHeadData[13].show = true
        this.tableHeadData[14].show = true
        this.tableHeadData[15].show = true
        this.tableHeadData[16].show = true
        this.tableHeadData[17].show = true
        this.tableHeadData[18].show = true
        // this.tableHeadData[19].show = true
      }
      const params = {
        acNo: this.payerAccNoList[data.account].acNo,
        // acNo: '1023210000000003',
        subAcNo: this.payerAccNoList[data.account].subAcNo,
        assignOrAffirm: data.takeType,
        startDate: util.standardDate(this.formModel.startDate),
        endDate: util.standardDate(this.formModel.endDate),
        pageSize: 20,
        pageIndex: 1
      }
      httpPost('/eweb-largeDeposit.EntLarDepAssInfoQry.do', params).then(res => {
        this.tableData = res.assignInfoList
      })
    },
    // 账号查询
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[1].options = this.payerAccNoList
      })
    }
  },
  created () {
    // this.formModel.theDay = util.standardDate(new Date())
    this.accNoListQry()
    let dateArea = util.filterDate('2')
    this.formModel.startDate = dateArea.startDate
    this.formModel.endDate = dateArea.endDate
  }
}
</script>
