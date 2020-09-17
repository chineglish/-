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
            <div class="search-result-acc">
              <span class="title">账户</span>
              <span class="data">{{formModel.topAcc}}</span>
            </div>
			<div class="search-result-content">
				<div>
					<table class="queryDate">
						<tr>
							<th><i class="el-icon-folder-opened"></i></th>
							<th>账户</th>
							<th>币种</th>
							<th>账户名</th>
							<th>归集方式</th>
						</tr>
						<tr v-for="(item, index) in tableDate" :key="index">
							<td class="icon"><i class="el-icon-document"></i></td>
							<td @click="getDetail(index)" class="accColor">{{item.acNo}}</td>
							<td>{{item.currencyCodeVal}}</td>
							<td>{{item.acName}}</td>
							<td>{{item.gatherModeVal}}</td>
						</tr>
					</table>
				</div>
            </div>
        </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, gatherMode_entity, currency_type_entity } from '@/assets/js/entity'
export default {
  name: 'collectRetQuery',
  data () {
    return {
      payerAccNoList: [], // 付款账户信息列表
      // 面包屑导航
      breadData: ['现金管理', '资金归集', '归集关系查询'],
      showResult: false,
      formModel: {
        topAcc: 0,
        currency: '',
        topAccName: ''
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
            title: '归集关系查询',
            showSeparate: true,
            group: [
              {
                'disabled': false,
                'label': '最高级账户',
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
                'label': '最高级账户名',
                'type': 'text',
                'key': 'topAccName'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      tableDate: [
      ]
    }
  },
  methods: {
    /**
     * 交易账户获取
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.PayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.selectAcc(this.formModel)
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 显示选择账户的余额与账户名称
     */
    selectAcc (data) {
      const currentPayerAccNo = this.payerAccNoList[data.topAcc]
      // 回显账户名
      // this.formModel.topAccName = currentPayerAccNo.acName
      // this.formModel.currency = util.handleEnums(currency_type, currentPayerAccNo.currency)
      data.topAccName = currentPayerAccNo.acName
      data.currency = currentPayerAccNo.currency
    },
    reset (res) {
      this.showResult = false
      res.currency = this.payerAccNoList[res.topAcc].currency
      res.topAccName = this.payerAccNoList[res.topAcc].acName
    },
    inquire (data) {
      // this.acNo = this.payerAccNoList[this.formModel.topAcc].acNo
      // this.CurrencyCode = this.payerAccNoList[this.formModel.currency].currency
      const params = {
        acNo: this.payerAccNoList[data.topAcc].acNo,
        currencyCode: this.payerAccNoList[data.topAcc].currency
      }
      httpPost('/eweb-cash.CollectRelationQry.do', params).then(res => {
        this.tableDate = res.list
        const currentPayerAccNo = this.payerAccNoList[data.topAcc]
        this.formModel.topAcc = currentPayerAccNo.acNo
        // 归集方式
        this.tableDate.forEach(item => {
          item.gatherModeVal = gatherMode_entity[item.gatherMode]
          item.currencyCodeVal = currency_type_entity[item.currencyCode]
        })
        this.showResult = true
      })
    },
    // Reconciliation () {},
    getDetail (index) {
      this.$router.push({
        name: 'collectRetQueryDetail',
        params: this.tableDate[index]
      })
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
    .search-result-acc{
      width: 100%;
      height: 40px;
      line-height: 40px;
      .title{
        display: inline-block;
        width: 30%;
        text-align: center;
        background: #EFF3F6;
      }
      .data{
        display: inline-block;
        width: 70%;
        text-align: center;
      }
    }
		.search-result-content{
			.queryDate{
				width: 100%;
				tr{
					text-align: center;
					td{
						height: 50px;
					}
					.icon{
						text-align: right
					}
				}
			}
		}
	}
  .accColor{
    color:blue;
  }
</style>
