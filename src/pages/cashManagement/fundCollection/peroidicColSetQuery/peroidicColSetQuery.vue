<template>
    <div class="assets-debt">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
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
          <template>
            <el-tabs v-model="activeName">
              <el-tab-pane label="上存规则" name="0">
								<upload-rule :data="data"></upload-rule>
              </el-tab-pane>
              <el-tab-pane label="上存周期" name="1">
                <upload-cycle :data="data"></upload-cycle>
              </el-tab-pane>
              <el-tab-pane label="下拨规则" name="2">
                <dial-down-rule :data="data"></dial-down-rule>
              </el-tab-pane>
              <el-tab-pane label="下拨周期" name="3">
                <dial-down-cycle :data="data"></dial-down-cycle>
              </el-tab-pane>
            </el-tabs>
          </template>
        </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import uploadRule from './component/uploadRule'
import uploadCycle from './component/uploadCycle'
import dialDownRule from './component/dialDownRule'
import dialDownCycle from './component/dialDownCycle'
import { currency_type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'peroidicColSetQuery',
  components: {
    uploadRule,
    uploadCycle,
    dialDownRule,
    dialDownCycle
  },
  data () {
    return {
      payerAccNoList: [], // 付款账户信息列表
      activeName: '0',
      // 面包屑导航
      breadData: ['现金管理', '资金归集', '定时归集查询'],
      showResult: false,
      formModel: {
        acc: 0,
        currency: '',
        accName: ''
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
            title: '定时归集查询',
            showSeparate: true,
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                'options': [],
                trans: { value: 'payerAcNoShow' },
                'key': 'acc',
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
                'key': 'accName'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      data: {}
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
          item.payerAcNoShow = util.getPayerAccount(item)
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
      const currentPayerAccNo = this.payerAccNoList[data.acc]
      // this.formModel.accName = currentPayerAccNo.acName
      // this.formModel.currency = currentPayerAccNo.currency
      data.accName = currentPayerAccNo.acName
      data.currency = currentPayerAccNo.currency
    },
    inquire (data) {
      const params = {
        acNo: this.payerAccNoList[data.acc].acNo,
        currencyCode: this.payerAccNoList[data.acc].currency
      }
      httpPost('/eweb-cash.TimingCollectQry.do', params).then(res => {
        this.formModel = res.list[0]
        this.data = res.list[0]
        this.showResult = true
      }).catch(err => {
        console.error(err)
      })
    },
    reset (res) {
      // this.selectAcc(this.formModel)
      res.currency = this.payerAccNoList[res.acc].currency
      res.accName = this.payerAccNoList[res.acc].acName
      this.showResult = false
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
</style>
