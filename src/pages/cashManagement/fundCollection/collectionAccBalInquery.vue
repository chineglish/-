<template>
    <div class="assets-debt">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div style="clear: both"></div>
        <m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @inquire="inquire"
                @reset="reset"
                @selectAcc="selectAcc"
        >
        </m-new-form>
        <div class="search-result" v-if="showResult">
            <div class="search-result-title fs20">
                <span>查询结果</span>
            </div>
						<d-table
              :table-data="tableData"
              :options="options"
              :isPagination="true"
              :tableHeadData="tableHeadData"
              :pagesize="6">
            </d-table>
        </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { currency_type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'collectionAccBalInquery',
  data () {
    return {
      // 面包屑导航
      breadData: ['现金管理', '资金归集', '归集账户余额查询'],
      showResult: false,
      formModel: {
        topAcc: 0,
        topAccName: ''
      },
      formConfigJson: {
        rules: {
          topAcc: [{ required: false, message: '', trigger: 'change' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            labelWidth: '30%',
            title: '归集账户余额查询',
            showSeparate: true,
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                'options': [],
                trans: { value: 'payerAcNoShow' },
                'key': 'topAcc',
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
                'label': '账户名',
                'type': 'text',
                'key': 'topAccName'
              },
              {
                'disabled': false,
                'label': '自身余额',
                'type': 'text',
                'key': 'selfBal',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '可用余额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'useBal'
              },
              {
                'disabled': false,
                'label': '上存余额',
                'type': 'text',
                'key': 'uppBal',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '下级汇总余额',
                'type': 'text',
                'key': 'gatherBal',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      options: { // table属性
        border: true,
        stripe: true
      },
      tableHeadData: [
        { label: '下级账户', prop: 'acNo' },
        {
          label: '下级币种',
          prop: 'currencyCode',
          formatter: (row, column, cellValue, index) => {
            const target = currency_type.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          }
        },
        {
          label: '下级户名', prop: 'acName' },
        {
          label: '上存余额',
          prop: 'uppBal',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '自身余额',
          prop: 'selfBal',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '借方积数', prop: 'drPile' },
        { label: '贷方积数', prop: 'crPile' },
        {
          label: '余额',
          prop: 'bal',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        }
      ],
      tableData: [],
      operateData: {
        btnData: []
      }
    }
  },
  methods: {
    // 选择显示账户
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.selectAcc(this.formModel)
      }).catch(err => {
        console.error(err)
      })
    },
    // 查询
    inquire (data) {
      const params = {
        acNo: this.payerAccNoList[data.topAcc].acNo,
        currencyCode: this.payerAccNoList[data.topAcc].currency
      }
      httpPost('/eweb-cash.CollectAccBalQry.do', params).then(res => {
        this.formModel = res
        this.tableData = res.list
        this.showResult = true
      }).catch(err => {
        console.error(err)
      })
    },
    // 重置
    reset (res) {
      res.currency = this.payerAccNoList[res.topAcc].currency
      res.topAccName = this.payerAccNoList[res.topAcc].acName
      this.formModel.gatherBal = ''
      this.formModel.selfBal = ''
      this.formModel.useBal = ''
      this.formModel.uppBal = ''
      this.showResult = false
    },
    selectAcc (data) {
      const currentPayerAccNo = this.payerAccNoList[data.topAcc]
      // 回显账户名
      // this.formModel.topAccName = currentPayerAccNo.acName
      // this.formModel.currency = currentPayerAccNo.currency
      data.topAccName = currentPayerAccNo.acName
      data.currency = currentPayerAccNo.currency
    }
  },
  created () {
    this.accNoListQry()
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
