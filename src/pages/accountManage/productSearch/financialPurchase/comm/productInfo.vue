<template>
	<div id="productInfo">
		<div class="detail-one">
			<div class="risk-level">
				<span class="fs20">{{formData.riskName}}</span>
			</div>
			<div class="title-detail">
				<h3 class="fs24">{{formData.prdName}}</h3>
				<div class="details">
					<div>
						<p class="fs14">{{formData.prdTemplate==='1300' ? '七日年化收益率' : '业绩比较基准'}}</p>
						<span class="text fs20"><span class="num fs32">{{formData.prdTemplate==='1300' ? formData.weekRate : formData.modelComment}}</span></span>
					</div>
					<div v-if="formData.prdTemplate === '1300'">
						<p class="fs14">最新净值{{formData.apNavDate}}</p>
						<span class="num fs32">{{formData.netWorth}}</span>
					</div>
					<div>
						<p class="fs14">起购金额</p>
						<span class="text fs20"><span class="num fs32">{{formData.ofirstAmt}}</span>万元</span>
					</div>
				</div>
			</div>
			<div class="date" v-if="formData.prdTemplate === '1102'">
				<el-steps :active="2" align-center>
					<el-step title="开始销售" :description="this.ksTime"></el-step>
					<el-step title="起息日" :description="formData.incomeDate"></el-step>
					<el-step title="到期日" :description="formData.incomeEndDate"></el-step>
				</el-steps>
			</div>
			<div class="date" v-if="formData.prdTemplate === '1300'">
				<el-steps :active="2" align-center>
					<el-step title="申购日" description="T日"></el-step>
					<el-step title="份额确认,收益计算日" description="T+1日"></el-step>
					<el-step title="查看收益" description="T+2日"></el-step>
				</el-steps>
			</div>
			<div class="date" v-if="formData.prdTemplate === '1307'">
				<el-steps :active="2" align-center>
					<el-step title="申购日" description="T日"></el-step>
					<el-step title="份额确认,收益计算日" description="T日"></el-step>
					<el-step title="查看收益" description="T+1日"></el-step>
				</el-steps>
			</div>
			<div class="date" v-if="formData.prdTemplate === '1303'">
				<el-steps :active="2" align-center>
					<el-step title="开始销售" :description="this.ksTime"></el-step>
					<el-step title="成立日" :description="formData.estabDate"></el-step>
					<el-step title="到期日" :description="formData.endDate"></el-step>
				</el-steps>
			</div>
		</div>
		<div style="height: 20px; background: #f8f8f8;"></div>
		<div class="detail-two">
			<d-form-previewer
					:form-struction="formStruction"
					:form-model="formData"
					:action-data="actionData"
					:config="config">
				<div id="error-box" class="error-box" slot="footer"></div>
			</d-form-previewer>
			<div class="pact fs14">
				<el-checkbox @click="pactChecked = !pactChecked" v-model="pactChecked"></el-checkbox>
				我已认真阅读 <span @click="read('理财产品说明书')">《理财产品说明书》</span>，<span @click="read('客户权益须知')">《客户权益须知》</span>，<span @click="read('理财产品协议书')">《理财产品协议书》</span>，<span @click="read('风险揭示书')">《风险揭示书》</span>并同意相关内容。
			</div>
		</div>
	</div>
</template>

<script>
// import util from '@/libs/util.js'
import { currencyMath_type_entity } from '@/assets/js/entity.js'
import util from '@/libs/util'
import { httpPost } from '@/api/sys/http'

export default {
  name: 'productInfo',
  data () {
    return {
      formData: {},
      config: {
        columns: 2
      },
      pactChecked: false,
      formStruction: {
        formWidth: '100%',
        labelWidth: '40%',
        groups: [
          {
            formItems: [
              { label: '产品代码', fieldName: 'prdCode' },
              { label: '产品名称', fieldName: 'prdName' },
              { label: '理财产品登记编码', fieldName: 'prdRegisterCode' },
              { label: '风险级别', fieldName: 'riskName' },
              { label: '募集期', fieldName: 'ipoDate', show: false },
              { label: '起息日', fieldName: 'incomeDate' },
              { label: '到期日', fieldName: 'incomeEndDate' },
              { label: '投资周期期限', fieldName: 'interestDays', content: '天', show: true },
              { label: '币种', fieldName: 'currency', formatter: (row, cellValue) => currencyMath_type_entity[cellValue] },
              { label: '起购金额', fieldName: 'ofirstAmt', content: '万元' },
              { label: '递增金额', fieldName: 'oappAmt', content: '万元' }
            ]
          },
          {
            width: 100,
            labelWidth: 15.5,
            formItems: []
          }
        ]
      },
      actionData: [
        { btnText: '购买', class: 'm-submit-btn', size: 'small', handler: this.buyHandler },
        { btnText: '返回', class: 'm-cancel-btn', size: 'small', handler: this.backHandler }
      ]
    }
  },
  created: function () {
    console.log(this.$route.params, 1111)
    this.formData = this.$route.params.data
    this.ksTime = this.formData.ipoStartDate
    if (this.$route.params.flag === 1) {
      this.$route.params.flag = ''
      this.formData.apNavDate = util.sepDate(this.formData.apNavDate)
      this.formData.ipoStartDate = util.sepDate(this.formData.ipoStartDate)
      this.formData.ipoEndDate = util.sepDate(this.formData.ipoEndDate)
      this.formData.incomeDate = util.sepDate(this.formData.incomeDate)
      this.formData.incomeEndDate = util.sepDate(this.formData.incomeEndDate)
      this.formData.estabDate = util.sepDate(this.formData.estabDate)
      this.formData.endDate = util.sepDate(this.formData.endDate)
      this.formData.netWorth = Number(this.formData.netWorth).toFixed(6)
      this.formData.ofirstAmt = Number(this.formData.ofirstAmt) / 10000
      this.formData.oappAmt = Number(this.formData.oappAmt) / 10000
    }
    this.formData.ipoDate = this.formData.ipoStartDate + '-' + this.formData.ipoEndDate
    if (this.formData.prdTemplate === '1300') {
      this.formStruction.groups[0].formItems[4].show = false
      this.formStruction.groups[0].formItems.splice(1, 0, {
        label: '七日年化收益率',
        fieldName: 'weekRate',
        content: ''
      })
      this.formStruction.groups[0].formItems.splice(1, 0, {
        label: '投资周期期限',
        fieldName: 'interestDays',
        content: '',
        formatter: (row, cellValue) => '无固定期限'
      })
      this.formStruction.groups[0].formItems.splice(1, 0, {
        label: '开放时间',
        fieldName: 'openingHours',
        content: '',
        formatter: (row, cellValue) => '工作日9:00-15:00'
      })
      this.formStruction.groups[1].formItems.splice(1, 0, {
        label: '申赎交易',
        fieldName: 'redemptionTransaction',
        content: '',
        formatter: (row, cellValue) => '工作日内进行申购/赎回，下一个工作日内进行申购/赎回；非工作日内进行申购/赎回，等同在下一工作日内的申购/赎回申请'
      })
      this.formStruction.groups[0].formItems.splice(1, 0, {
        label: '申赎费率',
        fieldName: 'redemptionRate',
        content: '',
        formatter: (row, cellValue) => '申购和赎回费率为0'
      })
      this.formStruction.groups[0].formItems.splice(1, 0, {
        label: '到账时间',
        fieldName: 'paymentDate',
        content: '',
        formatter: (row, cellValue) => 'T日赎回T+1日到账，否则再顺延下一工作日'
      })
    } else if (this.formData.prdTemplate === '1303' || this.formData.prdTemplate === '1102') {
      this.formStruction.groups[0].formItems[4].show = true
      this.formStruction.groups[0].formItems.splice(7, 0, {
        label: '业绩比较基准',
        fieldName: 'modelComment',
        content: ''
      })
      this.formStruction.groups[0].formItems.splice(8, 0, {
        label: '交易时间',
        fieldName: '',
        formatter: (row, cellValue) => '募集期 9:00-17:00'
      })
      // this.formStruction.groups[0].formItems.splice(4, 0, {
      //   label: '募集期',
      //   fieldName: 'ipoStartDate',
      //   formatter: (row, cellValue) => `${cellValue} - ${this.formData.ipoEndDate}`
      // })
      this.formStruction.groups[0].formItems.splice(5, 0, {
        label: '冷静期',
        fieldName: 'ipoEndDate',
        formatter: (row, cellValue) => `${cellValue} 为冷静期，不可购买、可撤销`
      })
      // this.formStruction.groups[0].formItems.splice(-1, 0, {
      //   label: '投资天数',
      //   fieldName: 'interestDays',
      //   content: '天'
      // })
    }
  },
  methods: {
    buyHandler (val) {
      console.log('val===', val)
      httpPost('eweb-invest.InvestCifQuery.do').then(res => {
        if (this.pactChecked === false || this.pactChecked === undefined) {
          this.$msg('请先阅读相关协议！')
        } else {
          let params = {
            data: val
          }
          params = typeof (this.$route.params.activeName) === 'undefined' ? Object.assign(params, { active: this.$route.params.active }) : Object.assign(params, { activeName: this.$route.params.activeName, isFromPrdSearch: this.$route.params.isFromPrdSearch })
          this.$router.push({
            name: 'financialPurchForm',
            params: params
          })
        }
      })
    },
    backHandler (val) {
      if (typeof (this.$route.params.activeName) === 'undefined') {
        if (this.$route.params.active === 'exclusive') {
          this.$router.push({
            name: 'productSearch',
            params: {
              active: this.$route.params.active,
              productCode: this.formData.prdCode
            }
          })
        } else {
          this.$router.push({
            name: 'productSearch',
            params: {
              active: this.$route.params.active
            }
          })
        }
      } else {
        this.$router.push({
          name: 'myFinancial',
          params: {
            activeName: this.$route.params.activeName,
            isFromPrdSearch: this.$route.params.isFromPrdSearch
          }
        })
      }
    },
    read (val) {
      this.$emit('go', val)
    }
  }
}
</script>

<style lang="scss">
	#productInfo {
		.el-steps {
			padding-left: 0;
			padding-right: 0;
			padding-top: 75px;
			background: #fff;
			margin: auto;
			width: 100%;
		}
		.el-step__title.is-finish, .el-steps .is-process, .el-step__title {
			color: #333;
		}
		.el-step__description.is-finish, .el-steps .el-step__description.is-process {
			color: #999;
		}
		.d-form-previewer .d2-container-full .d2-container-full__body {
			padding: 0;
		}
	}
</style>
<style lang="scss" scoped>
	#productInfo {
		.pact {
			margin: 20px 0;
			padding: 0 20px;
			color: #666;
			cursor: pointer;
			.el-checkbox {
				margin-right: 10px;
			}
			span {
				color: #409EFF;
			}
		}
		.detail-one {
			display: flex;
			.risk-level {
				position: absolute;
				top: 0;
				right: -24px;
				width: 115px;
				height: 67px;
				background-image: url('../../../../../assets/image/riskLevel2.png');
				span {
					display: inline-block;
					width: 100%;
					height: 54px;
					line-height: 54px;
					text-align: center;
					color: #fff;
				}
			}
			.title-detail, .date {
				padding: 30px 40px;
				flex: 1;
			}
			.title-detail {
				h3 {
					margin: 0;
					color: #0D155B;
					border-bottom: 1px solid #dedede;
					padding: 10px 0 20px;
					margin-bottom: 20px;
				}
				.details {
					display: flex;
					& > div {
						position: relative;
						flex: 1;
						padding: 0 20px;
						p {
							color: #666666;
						}
						.num {
							color: #D41618;
						}
						.text {
							color: #151515;
						}
					}
					div + div:before {
						content: '';
						width: 1px;
						height: 60px;
						background: #dedede;
						position: absolute;
						left: 0;
						top: 22px;
					}
				}
			}
		}
	}
</style>
