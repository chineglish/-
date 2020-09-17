<template>
    <div class="assets-debt">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div style="clear: both"></div>
        <m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @inquire="inquire"
                @selectAcc="selectAcc"
                @reset="reset"
        >
        </m-new-form>
        <div class="search-result" v-if="showResult">
            <div class="search-result-title fs20">
                <span>查询结果</span>
            </div>
						<d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :operate-data="operateData"
              :pagesize="20"
							@Reconciliation="Reconciliation">
            </d-table>
        </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { trans_TType, currency_type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'collectionAccDeIquery',
  data () {
    return {
      // 面包屑导航
      payerAccNoList: [], // 付款账户信息列表
      breadData: ['现金管理', '资金归集', '归集账户明细查询'],
      showResult: false,
      formModel: {
        accountNo: 0,
        currency: '',
        topAccName: '',
        transType: '',
        startDate: '',
        endDate: ''
      },
      formConfigJson: {
        rules: {
          accountNo: [{ required: false, message: '', trigger: 'change' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            labelWidth: '30%',
            title: '归集账户明细查询',
            showSeparate: true,
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                'options': [],
                trans: { value: 'payerAcNoShow' },
                'key': 'accountNo',
                'changeEventName': 'selectAcc'
              },
              {
                'disabled': false,
                'label': '币种',
                'type': 'text',
                'key': 'currency',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disabled': false,
                'label': '户名',
                'type': 'text',
                'key': 'topAccName'
              },
              {
                'disabled': false,
                'label': '交易类别',
                'type': 'select',
                'options': [
                  { 'value': '全部', 'key': '' },
                  { 'value': '自身收付款', 'key': '1' },
                  { 'value': '资金归集', 'key': '2' },
                  { 'value': '结息', 'key': '3' },
                  { 'value': '收费', 'key': '4' },
                  // { 'value': '虚户间调账', 'key': '5' },
                  // { 'value': '虚户间转账', 'key': '6' },
                  { 'value': '其他', 'key': '7' }
                  // { 'value': '活转定活定转活明细', 'key': '8' }
                ],
                'key': 'transType'
              },
              {
                label: '查询日期',
                formWidth: '100%',
                type: 'dateArea',
                firstKey: 'startDate',
                secondKey: 'endDate',
                changeEventName: 'changeDate',
                startRestrictionStart: this.getStartRestrictionStart(),
                endRestrictionStart: Date.now()
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      tableHeadData: [
        { label: '交易流水号', prop: 'serialNo' },
        {
          label: '发生日期',
          prop: 'trAcDt',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '收入金额',
          prop: 'rcvAmt',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '支付金额',
          prop: 'payAmt',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '自身余额',
          prop: 'selfBal',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '上存余额',
          prop: 'uppBal',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '摘要',
          prop: 'purpose'
        },
        {
          label: '附言',
          prop: 'postScript'
        },
        {
          label: '对方账户',
          prop: 'oppAcNo'
        },
        {
          label: '对方账户户名',
          prop: 'oppAcName'
        },
        {
          label: '交易类别',
          prop: 'trType',
          formatter: (row, column, cellValue, index) => {
            const target = trans_TType.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          }
        }
      ],
      tableData: [],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '调账',
            eventName: 'Reconciliation'
          }
        ]
      }
    }
  },
  methods: {
    getStartRestrictionStart () {
      const now = new Date()
      const year = now.getFullYear()
      let month = now.getMonth() + 1
      month = month > 9 ? month : `0${month}`
      let day = now.getDate()
      day = day > 9 ? day : `0${day}`
      // ie new Date(str)不能转化'yyyy-m-d'类型,必须是'yyyy-mm-dd'
      const start = (year - 10) + '-' + month + '-' + day
      return (new Date(start).getTime())
    },
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.selectAcc(this.formModel)
      }).catch(err => {
        console.error(err)
      })
    },
    // 查询
    inquire (data) {
      let startDate = data.startDate.split('-').join('')
      let endDate = data.endDate.split('-').join('')
      const params = {
        acNo: this.payerAccNoList[data.accountNo].acNo,
        currencyCode: this.payerAccNoList[data.accountNo].currency,
        startDate: startDate,
        endDate: endDate,
        trType: data.transType
      }
      let s = new Date(data.startDate).getTime()
      let e = new Date(data.endDate).getTime()
      let result = (e - s) / 1000 / 60 / 60 / 24
      if (result > 91) {
        this.$msg('查询时间不能跨度3个月，请重新选择')
      } else {
        httpPost('/eweb-cash.CollectAccDetailQry.do', params).then(res => {
          this.tableData = res.list
          this.showResult = true
        }).catch(err => {
          console.error(err)
        })
      }
    },
    // 重置
    reset (res) {
      res.currency = this.payerAccNoList[res.accountNo].currency
      res.topAccName = this.payerAccNoList[res.accountNo].acName
      res.startDate = this.formModel.startDate
      res.endDate = this.formModel.endDate
      this.showResult = false
    },
    Reconciliation () {
      this.$router.push({
        name: 'pooledFundsTransferPre'
      })
    },
    selectAcc (data) {
      const currentPayerAccNo = this.payerAccNoList[data.accountNo]
      data.topAccName = currentPayerAccNo.acName
      data.currency = currentPayerAccNo.currency
    }
  },
  created () {
    this.accNoListQry()
    let filterDate = util.filterDate('1')
    this.formModel.startDate = filterDate.startDate
    this.formModel.endDate = filterDate.endDate
  }
}
</script>

<style lang="scss" scoped>
	.search-result{
		width: 100%;
		height: auto;
		background: #FFFFFF;
		box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
		margin: 20px 0px;
		.search-result-title{
			padding-left: 30px;
			line-height: 60px;
			font-weight: bold;
			color: #333333;
			span{
				margin-left: 10px;
				padding-left: 5px;
				border-left: #d41618 8px solid;
			}
		}
		.search-result-content{
			p{
				position: relative;
				margin: 0;
				padding-left: 65px;
				font-weight: bold;
				background: #FDF2F3;
				line-height: 40px;
				z-index: 99;
			}
			.authorized-account{
				position: relative;
				width: 100%;
				line-height: 54px;
				display: flex;
				justify-content: flex-start;
				z-index: 1;

				.dotted-line{
					padding-left: 100px;
					margin-left: 100px;
					margin-top: -25px;
					height: 50px;
					border-left: 1px dashed #979797;
					border-bottom: 1px dashed #979797;
				}

				.authorized-account-div{
					width: 60%;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>
