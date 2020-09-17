<template>
  <div id="fixedProPage">
    <ul class="listBox">
      <li class="listStyle" v-for="(item,index) in productList" :key="index">
        <div class="header">
          <span class="title fs24">{{item.prdName}}</span>
          <span class="productState fs16">{{item.statusName}}</span>
          <span class="risk fs14">{{item.riskName}}</span>
          <p class="offerPeriod">{{item.status==='0' ? '开放期：无固定期限' : item.status==='1' ? '募集期: '+item.ipoStartDate+'-'+item.ipoEndDate : item.status}}</p>
          <!-- <p class="offerPeriod">{{item.status==='2' ? '开放期：无固定期限' : item.status==='0' ? '募集期: '+item.incomeDate+'-'+item.incomeEndDate : item.status}}</p> -->
        </div>
        <el-row class="details">
          <el-col :span="4">
            <p>{{item.prdTemplate === '1300' ? '七日年化收益率' : '业绩比较基准'}}</p>
            <span class="num">{{item.prdTemplate === '1300' ? item.weekRate : item.modelComment}}</span>
          </el-col>
          <el-col :span="4" v-if="item.prdTemplate === '1300'">
            <p>单位净值({{item.apNavDate}})</p>
            <span class="num">{{item.netWorth}}</span>
          </el-col>
          <el-col :span="3">
            <p>起购金额</p>
            <!-- <span class="text"><span class="num">{{Number(item.ofirstAmt) / 10000}}</span>万元</span> -->
            <span class="text"><span class="num">{{item.ofirstAmt}}</span>万元</span>
          </el-col>
          <el-col :span="4">
            <p>投资周期期限</p>
            <span class="text">{{item.prdTemplate==='1300' ? '无固定期限' : item.interestDays+'天'}}</span>
          </el-col>
			<el-col :span="4"  v-if="item.prdTemplate !== '1300'">
				<p>总额度</p>
				<span class="text">{{ item.totLimit | formatCurrency }}</span>
			</el-col>
          <el-col :span="6">
            <p>剩余额度</p>
            <span class="text">
              <el-progress :percentage="(item.orgTotUseLimit/item.totLimit)*100" status="exception" :show-text="false"></el-progress>{{ item.orgTotUseLimit | formatCurrency }}元
            </span>
          </el-col>
          <el-col :span="3">
            <button class="btn" @click="toBuyPage(item)">购买</button>
          </el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: 'fixedProPage',
  props: {
    productCode: ''
  },
  filters: {
    formatCurrency (value) {
      // console.log(value)
      return util.formatCurrency(value)
    }
  },
  data: function () {
    return {
      productList: []
    }
  },
  created: function () {
    // console.log(11111, this.productCode)
    if (!(this.productCode === '' || this.productCode === undefined)) {
      // console.log(22222, this.productCode)
      this.getNormalList(this.productCode)
    }
  },
  methods: {
    toBuyPage (item) {
      this.$router.push({
        name: 'financialPurchase',
        params: ({
          data: item,
          active: 'exclusive'
        })
      })
    },
    getNormalList (obj) {
      // console.log(3333333333, obj)
      if (obj === '' || obj === undefined) {
        this.$message.warning('产品编号不能为空')
        this.productList = []
      } else {
        let params = {
          prdCode: obj,
          pageNo: 1,
          pageSize: 20,
          orderFlag: '0',
          // prdAttr: ''
          ipoType: '1'
        }
        // console.log(77777, this.searchModel.productCode)
        httpPost('eweb-invest.InvestProductListQuery.do', params).then(res => {
          this.productList = res.result
          for (let i = 0; i < this.productList.length; i++) {
            this.productList[i].apNavDate = util.sepDate(this.productList[i].apNavDate)
            this.productList[i].ipoStartDate = util.sepDate(this.productList[i].ipoStartDate)
            this.productList[i].ipoEndDate = util.sepDate(this.productList[i].ipoEndDate)
            this.productList[i].incomeDate = util.sepDate(this.productList[i].incomeDate)
            this.productList[i].incomeEndDate = util.sepDate(this.productList[i].incomeEndDate)
            this.productList[i].estabDate = util.sepDate(this.productList[i].estabDate)
            this.productList[i].endDate = util.sepDate(this.productList[i].endDate)
            this.productList[i].netWorth = Number(this.productList[i].netWorth).toFixed(6)
            this.productList[i].ofirstAmt = Number(this.productList[i].ofirstAmt) / 10000
            this.productList[i].oappAmt = Number(this.productList[i].oappAmt) / 10000
          }
        }).catch(err => {
          console.error(err)
          this.productList = []
        })
      }
    }
  }
}
</script>
<style lang="scss">
  #fixedProPage{
    .el-form {
		position: absolute;
		right: 0;
		top: -65px;
		.el-form-item {
			margin-bottom: 0;
			.el-form-item__label {
				line-height: 40px;
			}
			.el-form-item__content {
				width: 300px;
			}
		}
	}
  }
</style>
<style lang="scss" scoped>
	#fixedProPage {
		padding: 0 20px;
		.el-input {
			width: 200px;
			margin-right: 10px;
		}
		.search-btn {
			width: 72px;
			height: 26px;
            background-color: #cc444d;
			background-image: linear-gradient(0deg, #710A0B 0%, #C21D1F 17%, #E72E32 86%, #FFA1A3 100%);
			border-radius: 4px;
			color: #fff;
			outline: none;
			border: none;
			cursor: pointer;
		}
		.search-btn:active {
			border: none;
		}

		ul {
			padding: 20px;
			.header {
				.title {
					color: #0D155B;
				}
				span  {
					margin-right: 15px;
				}
				.productState {
					color: #D41618;
					border: 1px solid #D41618;
					border-radius: 17px;
					padding: 0 10px;
					vertical-align: text-bottom;
				}
				.risk {
					padding: 2px 10px;
					background: #03AF3A;
					color: #fff;
				}
				.offerPeriod {
					float: right;
					margin: 0;
				}
			}
			.details {
				p {
					color: #666;
				}
				.num {
					color: #D41618;
				}
				.text {
					color: #333;
				}
				.el-progress {
					display: inline-block;
					width: 150px;
					margin-right: 10px;
					position: relative;
					top: -5px;
				}
				.btn {
					width: 110px;
					height: 38px;
                    background-color: #cc444d;
					background-image: linear-gradient(0deg, #710A0B 0%, #C21D1F 17%, #E72E32 86%, #FFA1A3 100%);
					border-radius: 6px;
					color: #fff;
					outline: none;
					cursor: pointer;
					position: relative;
					top: 40px;
				}
				.btn:active {
					border: none;
				}
			}
			li {
				position: relative;
				padding-bottom: 20px;
				margin-bottom: 20px;
			}
			li:after {
				content: '';
				width: 100%;
				height: 1px;
				background: rgba(0,0,0,0.12);
				position: absolute;
				left: 0;
				bottom: 0;
			}
		}
	}
</style>
