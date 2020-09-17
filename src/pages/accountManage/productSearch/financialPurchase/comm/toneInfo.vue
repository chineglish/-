<template>
	<div id="productInfo">
		<div class="detail-one">
			<div class="risk-level">
				<span class="fs20">{{formData.riskName}}</span>
			</div>
			<div class="title-detail">
				<h3 class="fs24">{{formData.prdName}}</h3>
        <p>理财产品登记编码: {{formData.prdRegisterCode}}</p>
				<div class="details">
					<div>
						<p class="fs14">{{formData.prdTemplate==='1300' ? '七日年化收益率' : '业绩比较基准'}}</p>
						<span class="text fs20"><span class="num fs32">{{formData.prdTemplate==='1300' ? formData.weekRate : formData.modelComment}}</span></span>
					</div>
					<div v-if="formData.prdTemplate === '1300'">
						<p class="fs14">最新净值 {{formData.apNavDate}}</p>
						<span class="num fs32">{{formData.netWorth}}</span>
					</div>
					<div>
						<p class="fs14">起购金额</p>
						<span class="text fs20"><span class="num fs32">{{formData.ofirstAmt}}</span>万元</span>
					</div>
				</div>
			</div>
			<div class="date">
				<el-steps :active="2" align-center>
					<el-step title="申购日" description="T日"></el-step>
					<el-step title="份额确认,收益计算日" description="T+1日"></el-step>
					<el-step title="查看收益" description="T+2日"></el-step>
				</el-steps>
        <p class="dateP">T日为银行工作日(银行公告暂停开放的日期除外)</p>
			</div>
		</div>
		<!-- <div style="height: 20px; background: #f8f8f8;"></div> -->
		<div class="card-tabs">
      <div>
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane label="历史净值表现" name="first">
              <div v-if="optionLIne" id="EchartsValue" style="width: 800px; height: 400px; margin: 0 auto; text-align: center; padding-top: 20px;"></div>
              <div class="btn-el">
                <el-button class="el-button-el" @click="getLastWeek">近一周</el-button>
                <el-button class="el-button-el" @click="getLastMonth">近一个月</el-button>
                <el-button class="el-button-el" @click="getTwoMonth">近两个月</el-button>
                <el-button class="el-button-el" @click="getLast3Month">近三个月</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="历史收益表现" name="second">
              <div id="EchartsValu" style="width: 800px; height: 400px; margin: 0 auto; text-align: center; padding-top: 20px;"></div>
              <div class="btn-el">
                <el-button class="el-button-el" @click="getLastWeek">近一周</el-button>
                <el-button class="el-button-el" @click="getLastMonth">近一个月</el-button>
                <el-button class="el-button-el" @click="getTwoMonth">近两个月</el-button>
                <el-button class="el-button-el" @click="getLast3Month">近三个月</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
      <div class="data-con">
        <div class="con-adv">
          <div>
            <p class="p-title">交易灵活，流动性强</p>
            <p class="p-content">T+1开放式产品，T日申购/赎回，T+1日确认</p>
          </div>
          <div>
            <p class="p-title">投资策略稳健</p>
            <p class="p-content">主要投资于固收类资产，收益相对稳定</p>
          </div>
          <div>
            <p class="p-title">产品风险较低</p>
            <p class="p-content">以高流动性投资品种为主，不参与股市</p>
          </div>
        </div>
        <div class="con-trans">
          <p class="jyrules">交易规则</p>
          <div class="kftime">
            <span class="spanLeft">开放时间</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>工作日: 9:00-15:00</span>
          </div>
          <div style="width: 100%; display: flex;">
            <div class="spanLeft" style="width: 15%;">申赎交易</div>
            <div style="width: 85%; margin-left: 11px;">工作日内进行申购赎回，下一工作日内进行申购/赎回确认；非工作日内进行申购/赎回，等同在下一工作日内的申购/赎回申请</div>
          </div>
          <div>
            <span class="spanLeft">申赎费率</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>申购和赎回费率为0</span>
          </div>
          <div>
            <span class="spanLeft">到账时间</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>T日赎回T+1日到账，否则再顺延至下一工作日</span>
          </div>
        </div>
      </div>
			<d-form-previewer
					:form-struction="formStruction"
          :form-model="formData"
					:action-data="actionData"
					>
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
import util from '@/libs/util.js'
import echarts from 'echarts'
import { httpPost } from '@/api/sys/http'
export default {
  name: 'toneInfo',
  data () {
    return {
      echartRes: [],
      optionLIne: true,
      activeName: 'first',
      formData: {},
      pactChecked: false,
      formStruction: {
        formWidth: '100%',
        labelWidth: '40%',
        groups: [
          {
            width: 100,
            labelWidth: 15.5,
            formItems: []
          }
        ]
      },
      actionData: [
        { btnText: '购买', class: 'm-submit-btn', handler: this.buyHandler },
        { btnText: '返回', class: 'm-cancel-btn', handler: this.backHandler }
      ],
      // 历史净值表现
      optionsLine: {
        legend: [
          {
            orient: 'vertical',
            data: ['单位净值', '累计净值']
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        // 横坐标
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLabel: {
            interval: 'auto'
          }
        },
        // 纵坐标
        yAxis: {
          type: 'value',
          name: '净值走势',
          axisLabel: {
            formatter: function (value, index) {
              return value.toFixed(6)
            }
          }
        },
        series: [
          {
            name: '单位净值',
            data: [],
            type: 'line',
            areaStyle: {}
          },
          {
            name: '累计净值',
            data: [],
            type: 'line',
            areaStyle: {}
          }
        ]
      },
      // 历史收益表现
      optionsLineww: {
        // 横坐标
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        // 纵坐标
        yAxis: {
          type: 'value',
          name: '七日化收益率',
          axisLabel: {
            formatter: '{value} %'
          }
        },
        series: [
          {
            data: [],
            type: 'line',
            areaStyle: {}
          }
        ]
      }
    }
  },
  created: function () {
    this.formData = this.$route.params.data
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
    // this.getEcharts()
    // this.getLastWeek()
  },
  mounted () {
    this.getLastWeek()
  },
  methods: {
    buyHandler (val) {
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
    },
    // 近三个月
    get3Month (date) {
      let arr = date.split('-')
      let year = arr[0] // 获取当前日期的年份
      let month = arr[1] // 获取当前日期的月份
      let day = arr[2] // 获取当前日期的日
      // let dayse = new Date(year, month, 0)
      // this.dayse = this.dayse.getDate() // 获取当前日期中月的天数
      let year2 = year
      let month2 = parseInt(month) - 3
      if (month2 === 0) { // 如果是1月份，则取上一年的12月份
        year2 = parseInt(year2) - 1
        month2 = 12
      }
      let day2 = day
      let days2 = new Date(year2, month2, 0)
      days2 = days2.getDate()
      if (day2 > days2) { // 如果原来日期大于上一月的日期，则取当月的最大日期。比如3月的30日，在2月中没有30
        day2 = days2
      }
      if (month2 < 10) {
        month2 = '0' + month2 // 月份填补成2位。
      }
      let t2 = year2 + '-' + month2 + '-' + day2
      return t2
    },
    getLast3Month () {
      let endDate = new Date()
      let endYear = endDate.getFullYear()
      let endMonth = endDate.getMonth() + 1
      let endDay = endDate.getDate()
      endMonth = endMonth > 9 ? endMonth : `0${endMonth}`
      endDate = `${endYear}-${endMonth}-${endDay}`
      let startDate = this.get3Month(endDate)
      startDate = startDate.split('-').join('')
      endDate = endDate.split('-').join('')
      const params = {
        prdCode: this.formData.prdCode,
        orderFlag: 0,
        startDate: startDate,
        endDate: endDate
      }
      httpPost('eweb-invest.InvestProductNetQuery.do', params).then(res => {
        this.echartRes = res.result
        let nav = [] // 单位净值
        let TotNav = []
        var aPNavDate = []
        let weekRate = []
        this.$nextTick(() => {
          // 历史净值表现
          let myEcharts = echarts.init(document.getElementById('EchartsValue'))
          myEcharts.setOption(this.optionsLine, true)
          // 历史收益表现
          let myEchart = echarts.init(document.getElementById('EchartsValu'))
          myEchart.setOption(this.optionsLineww, true)
        })
        for (let i = 0; i < this.echartRes.length; i++) {
          nav.push(Number(this.echartRes[i].nav).toFixed(6))
          TotNav.push(Number(this.echartRes[i].TotNav).toFixed(6))
          aPNavDate.push(this.echartRes[i].aPNavDate)
          weekRate.push(this.echartRes[i].weekRate)
        }
        this.optionsLine.series[0].data = nav
        this.optionsLine.series[1].data = TotNav
        this.optionsLine.xAxis.data = aPNavDate
        this.optionsLineww.xAxis.data = aPNavDate
        this.optionsLineww.series[0].data = weekRate
      })
    },
    // 近两个月
    get2Month (date) {
      let arr = date.split('-')
      let year = arr[0] // 获取当前日期的年份
      let month = arr[1] // 获取当前日期的月份
      let day = arr[2] // 获取当前日期的日
      let year2 = year
      let month2 = parseInt(month) - 2
      if (month2 === 0) { // 如果是1月份，则取上一年的12月份
        year2 = parseInt(year2) - 1
        month2 = 12
      }
      let day2 = day
      let days2 = new Date(year2, month2, 0)
      days2 = days2.getDate()
      if (day2 > days2) { // 如果原来日期大于上一月的日期，则取当月的最大日期。比如3月的30日，在2月中没有30
        day2 = days2
      }
      if (month2 < 10) {
        month2 = '0' + month2 // 月份填补成2位。
      }
      let t2 = year2 + '-' + month2 + '-' + day2
      return t2
    },
    getTwoMonth () {
      let endDate = new Date()
      let endYear = endDate.getFullYear()
      let endMonth = endDate.getMonth() + 1
      let endDay = endDate.getDate()
      endMonth = endMonth > 9 ? endMonth : `0${endMonth}`
      endDate = `${endYear}-${endMonth}-${endDay}`
      let startDate = this.get2Month(endDate)
      startDate = startDate.split('-').join('')
      endDate = endDate.split('-').join('')
      const params = {
        prdCode: this.formData.prdCode,
        orderFlag: 0,
        startDate: startDate,
        endDate: endDate
      }
      httpPost('eweb-invest.InvestProductNetQuery.do', params).then(res => {
        this.echartRes = res.result
        let nav = [] // 单位净值
        let TotNav = []
        let aPNavDate = []
        let weekRate = []
        for (let i = 0; i < this.echartRes.length; i++) {
          nav.push(Number(this.echartRes[i].nav).toFixed(6))
          TotNav.push(Number(this.echartRes[i].TotNav).toFixed(6))
          aPNavDate.push(this.echartRes[i].aPNavDate)
          weekRate.push(this.echartRes[i].weekRate)
        }
        this.optionsLine.series[0].data = nav
        this.optionsLine.series[1].data = TotNav
        this.optionsLine.xAxis.data = aPNavDate
        this.optionsLineww.xAxis.data = aPNavDate
        this.optionsLineww.series[0].data = weekRate
        this.$nextTick(() => {
          // 历史净值表现
          var myEcharts = echarts.init(document.getElementById('EchartsValue'))
          myEcharts.setOption(this.optionsLine, true)
          // 历史收益表现
          var myEchart = echarts.init(document.getElementById('EchartsValu'))
          myEchart.setOption(this.optionsLineww, true)
        })
      })
    },
    // 近一个月
    get1Month (date) {
      let arr = date.split('-')
      let year = arr[0] // 获取当前日期的年份
      let month = arr[1] // 获取当前日期的月份
      let day = arr[2] // 获取当前日期的日
      let year2 = year
      let month2 = parseInt(month) - 1
      if (month2 === 0) { // 如果是1月份，则取上一年的12月份
        year2 = parseInt(year2) - 1
        month2 = 12
      }
      let day2 = day
      let days2 = new Date(year2, month2, 0)
      days2 = days2.getDate()
      if (day2 > days2) { // 如果原来日期大于上一月的日期，则取当月的最大日期。比如3月的30日，在2月中没有30
        day2 = days2
      }
      if (month2 < 10) {
        month2 = '0' + month2 // 月份填补成2位。
      }
      let t2 = year2 + '-' + month2 + '-' + day2
      return t2
    },
    getLastMonth () {
      let endDate = new Date()
      let endYear = endDate.getFullYear()
      let endMonth = endDate.getMonth() + 1
      let endDay = endDate.getDate()
      endMonth = endMonth > 9 ? endMonth : `0${endMonth}`
      endDate = `${endYear}-${endMonth}-${endDay}`
      let startDate = this.get1Month(endDate)
      startDate = startDate.split('-').join('')
      endDate = endDate.split('-').join('')
      const params = {
        prdCode: this.formData.prdCode,
        orderFlag: 0,
        startDate: startDate,
        endDate: endDate
      }
      httpPost('eweb-invest.InvestProductNetQuery.do', params).then(res => {
        this.echartRes = res.result
        // setMyEcharts () {
        let nav = [] // 单位净值
        let TotNav = []
        let aPNavDate = []
        let weekRate = []
        this.$nextTick(() => {
          // 历史净值表现
          var myEcharts = echarts.init(document.getElementById('EchartsValue'))
          myEcharts.setOption(this.optionsLine, true)
          // 历史收益表现
          var myEchart = echarts.init(document.getElementById('EchartsValu'))
          myEchart.setOption(this.optionsLineww, true)
        })
        for (let i = 0; i < this.echartRes.length; i++) {
          nav.push(Number(this.echartRes[i].nav).toFixed(6))
          TotNav.push(Number(this.echartRes[i].TotNav).toFixed(6))
          aPNavDate.push(this.echartRes[i].aPNavDate)
          weekRate.push(this.echartRes[i].weekRate)
        }
        this.optionsLine.series[0].data = nav
        this.optionsLine.series[1].data = TotNav
        this.optionsLine.xAxis.data = aPNavDate
        this.optionsLineww.xAxis.data = aPNavDate
        this.optionsLineww.series[0].data = weekRate
      // },
      })
    },
    // 近一周
    getLastWeek () {
      var endDate = new Date()
      // 格式化日期
      var date = endDate.getTime()
      // 定义返回开始日期
      var start = ''
      var startDate = ''
      var startYear = ''
      var startMonth = ''
      var startDay = ''
      // 定义返回结束日期
      var endYear = endDate.getFullYear()
      var endMonth = endDate.getMonth() + 1
      var endDay = endDate.getDate()
      endMonth = endMonth > 9 ? endMonth : `0${endMonth}`
      endDay = endDay > 9 ? endDay : `0${endDay}`
      endDate = `${endYear}-${endMonth}-${endDay}`
      start = date - 24 * 60 * 60 * 1000 * 7
      startDate = new Date(start)
      startYear = startDate.getFullYear()
      startMonth = startDate.getMonth() + 1
      startDay = startDate.getDate()
      startMonth = startMonth > 9 ? startMonth : `0${startMonth}`
      startDay = startDay > 9 ? startDay : `0${startDay}`
      startDate = `${startYear}-${startMonth}-${startDay}`
      startDate = startDate.split('-').join('')
      endDate = endDate.split('-').join('')
      const params = {
        prdCode: this.formData.prdCode,
        orderFlag: 0,
        startDate: startDate,
        endDate: endDate
      }
      httpPost('eweb-invest.InvestProductNetQuery.do', params).then(res => {
        this.echartRes = res.result
        let nav = [] // 单位净值
        let TotNav = []
        let aPNavDate = []
        let weekRate = []
        this.$nextTick(() => {
          // 历史净值表现
          var myEcharts = echarts.init(document.getElementById('EchartsValue'))
          myEcharts.setOption(this.optionsLine, false)
          // 历史收益表现
          var myEchart = echarts.init(document.getElementById('EchartsValu'))
          myEchart.setOption(this.optionsLineww, false)
        })
        for (let i = 0; i < this.echartRes.length; i++) {
          nav.push(Number(this.echartRes[i].nav).toFixed(6))
          TotNav.push(Number(this.echartRes[i].TotNav).toFixed(6))
          aPNavDate.push(this.echartRes[i].aPNavDate)
          weekRate.push(this.echartRes[i].weekRate)
        }
        this.optionsLine.series[0].data = nav
        this.optionsLine.series[1].data = TotNav
        this.optionsLine.xAxis.data = aPNavDate
        this.optionsLineww.xAxis.data = aPNavDate
        this.optionsLineww.series[0].data = weekRate
      })
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
        .dateP {
          margin: 40px 0 0 63px;
        }
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
						// flex: 1;
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
    .card-tabs {
      width: 98%;
      margin: 20px 10px;
      .data-con {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        height: 280px;
        .con-adv {
          width: 45%;
          // height: 200px;
          margin-top: 20px;
          .p-title {
            font-size: 16px;
            font-weight: bold;
          }
          .p-content {
            font-size: 16px;
            color: gray;
          }
        }
        .con-trans {
          width: 45%;
          margin-top: 20px;
          .jyrules {
            font-size: 18px;
            font-weight: bold;
          }
          div {
            font-size: 16px;
            line-height: 32px;
          }
          .spanLeft {
            color: gray;
          }
        }
      }
      .btn-el {
        margin: 0 auto;
        text-align: center;
        margin-bottom: 20px;
        .el-button-el {
          color: red;
          font-weight: bold;
          font-size: 16px;
          border: 2px solid red;
        }
      }
    }
	}
</style>
