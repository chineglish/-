<template>
  <d2-container class="fund-re-in-summary">
    <m-breadcrumb :data="breadcrumb">
    </m-breadcrumb>
    <m-new-form
      :formModel="formModel"
      :componentJson="formConfigJson"
      :btnData="btnData"
      @statisticsTypeChangeHandler="statisticsTypeChangeHandler"
      @cycleChange="cycleChange"
      @submit="submitHandler"
      @reset="resetHandler">
    </m-new-form>
	<el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
		<el-tab-pane label="折线图" name="line">
		</el-tab-pane>
		<el-tab-pane label="柱状图" name="bar">
		</el-tab-pane>
		<div class="echarts-container" v-show="divShow">
			<div id="echart" style="height: 600px"></div>
		</div>
	</el-tabs>
	<d-table
			:table-data="tableData"
			:tableHeadData="tableHeadData"
			:pagesize="pagesize"
	>
	</d-table>
  </d2-container>
</template>

<script>
import echarts from 'echarts'
import { httpPost } from '@/api/sys/http'
import { currency_type } from '@/assets/js/entity'
import util from '@/libs/util.js'

export default {
  name: 'AccountBalanceTrend',
  data () {
    return {
      payerAccNoList: [],
      dataList: [],
      divShow: true,
      activeName: 'line',
      breadcrumb: ['统计分析', '账户余额趋势分析'],
      formModel: {
        cntType: '01',
        cycle: '01',
        beginDate: util.filterDate1('1').startDate,
        endDate: util.filterDate1('1').endDate,
        cmsCorpName: '',
        cmsCorpNo: '',
        orgCode: '',
        inclFlag: '0',
        accountNo: 0,
        currencyCode: 'CNY'
      },
      formConfigJson: {
        rules: {
          beginDate: [
            { validator: (rule, value, callback) => {
              this.formModel.beginDate = value
              if (value === '') {
                callback(new Error('请选择开始日期'))
              } else if (this.formModel.endDate !== '' && value > this.formModel.endDate) {
                callback(new Error('开始日期大于结束日期'))
              } else {
                callback()
              }
            },
            trigger: 'sumbit' }
          ],
          endDate: [
            { validator: (rule, value, callback) => {
              this.formModel.endDate = value
              if (value === '') {
                callback(new Error('请选择开始日期'))
              } else if (this.formModel.beginDate !== '' && value < this.formModel.beginDate) {
                callback(new Error('开始日期大于结束日期'))
              } else {
                callback()
              }
            },
            trigger: 'sumbit' }
          ]
        },
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '30%',
            group: [
              {
                'disabled': false,
                label: '统计方式',
                key: 'cntType',
                type: 'select',
                value: '',
                options: [
                  { label: '按账户统计', value: '01' },
                  { label: '按企业统计', value: '02' }
                ],
                trans: { value: 'label', key: 'value' },
                changeEventName: 'statisticsTypeChangeHandler'
              },
              {
                'disabled': false,
                label: '统计周期',
                key: 'cycle',
                type: 'select',
                value: '',
                options: [
                  { label: '按日期统计', value: '01' },
                  { label: '按月份统计', value: '02' },
                  { label: '按季度统计', value: '03' },
                  { label: '按年份统计', value: '04' }
                ],
                trans: { value: 'label', key: 'value' },
                changeEventName: 'cycleChange'
              },
              {
                label: '查询日期',
                firstKey: 'beginDate',
                secondKey: 'endDate',
                type: 'dateArea',
                dateType: 'date',
                format: 'yyyy-MM-dd',
                valueFormat: 'yyyyMMdd'
              },
              {
                label: '账户',
                type: 'select',
                options: [],
                trans: { value: 'payerAcNoShow' },
                key: 'accountNo',
                'show': true
              },
              {
                'disabled': false,
                label: '币种',
                type: 'select',
                trans: {
                  key: 'value',
                  value: 'label'
                },
                key: 'currencyCode',
                options: currency_type,
                'show': true
              },
              {
                label: '企业',
                key: 'cmsCorpName',
                type: 'text',
                value: '',
                'show': false
              },
              {
                'disabled': false,
                label: '包含下级企业',
                key: 'inclFlag',
                type: 'select',
                value: '',
                options: [
                  { label: '不包含', value: '0' },
                  { label: '包含', value: '1' }
                ],
                trans: { value: 'label', key: 'value' },
                changeEventName: '',
                'show': false
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      tableData: [],
      tableHeadData: [
        { label: '周期', prop: 'acDate' },
        { label: '余额', prop: 'balance' }
      ],
      pagesize: 20
    }
  },
  methods: {
    // 折线图 加工数据
    getDataLine (data) {
      let dateRange = []
      let profit = []
      let income = []
      for (let i = 0; i < data.length; i++) {
        dateRange.push(data[i].acDate)
        profit.push(data[i].balance)
        income.push(data[i].selfBal)
      }
      return {
        dateRange: dateRange,
        profit: profit,
        income: income
      }
    },
    // 折线图 绘制图形
    setEChartOptionLine (data) {
      var myChartLine = echarts.init(document.getElementById('echart'))
      let optionLine = {
        title: {
          left: 'center',
          top: '30px',
          text: '账户余额趋势分析'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          right: 100,
          top: 70,
          data: ['余额', '自身余额']
        },
        grid: {
          x: 70,
          y: 130,
          x2: 100,
          y2: 100,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: data.dateRange
          }
        ],
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '余额',
            type: 'line',
            label: {
              show: true,
              position: 'left'
            },
            data: data.profit
          },
          {
            name: '自身余额',
            type: 'line',
            label: {
              show: true,
              position: 'top'
            },
            data: data.income
          }
        ]
      }
      if (optionLine && typeof optionLine === 'object') {
        myChartLine.setOption(optionLine, true)
      }
    },
    // 柱状图 加工数据
    getDataBar (data) {
      let respData = [[]]
      respData[0] = []
      respData[0].push('product')
      respData[0].push('余额')
      respData[0].push('自身余额')
      for (let i = 0; i < data.length; i++) {
        respData[i + 1] = []
        respData[i + 1].push(data[i].acDate)
        respData[i + 1].push(data[i].balance)
        respData[i + 1].push(data[i].selfBal)
        respData[i + 1].push(data[i].netValue)
      }
      return {
        respData: respData
      }
    },
    // 柱状图 绘制图形
    setEChartOptionBar (data) {
      var myChartBar = echarts.init(document.getElementById('echart'))
      let optionBar = {
        title: {
          left: 'center',
          top: '30px',
          text: '账户余额趋势分析'
        },
        grid: {
          x: 130,
          y: 130,
          x2: 130,
          y2: 130
        },
        legend: {
          type: 'scroll',
          right: 100,
          top: 70
        },
        tooltip: {
          // formatter: '{a} <br/>{b} : ￥{c}'
          // formatter: function (data) {
          //   return data.seriesName + '<br/>' + data.name + ': ￥' + data.value
          // }
        },
        dataset: {
          source: data.respData
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
          {
            type: 'bar',
            barGap: 0,
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            type: 'bar',
            label: {
              show: true,
              position: 'top'
            }
          }
        ]
      }
      if (optionBar && typeof optionBar === 'object') {
        myChartBar.setOption(optionBar, true)
      }
    },
    // 切换图形
    handleClick () {
      if (this.activeName === 'line') {
        let resDataLine = this.getDataLine(this.dataList)
        this.setEChartOptionLine(resDataLine)
      }
      if (this.activeName === 'bar') {
        let resDataBar = this.getDataBar(this.dataList)
        this.setEChartOptionBar(resDataBar)
      }
    },
    // 切换日期方式
    cycleChange (formModel) {
      switch (formModel.cycle) {
        case '01':
          this.formModel.beginDate = util.filterDate1('1').startDate
          this.formModel.endDate = util.filterDate1('1').endDate
          this.formConfigJson.formItems[0].group[2].label = '起止日期'
          this.formConfigJson.formItems[0].group[2].dateType = 'date'
          this.formConfigJson.formItems[0].group[2].format = 'yyyy-MM-dd'
          break
        case '02':
          this.formModel.beginDate = util.filterDate1('1').startDate
          this.formModel.endDate = util.filterDate1('1').endDate
          this.formConfigJson.formItems[0].group[2].label = '起止月份'
          this.formConfigJson.formItems[0].group[2].dateType = 'month'
          this.formConfigJson.formItems[0].group[2].format = 'yyyy-MM'
          break
        case '03':
          this.formConfigJson.formItems[0].group[2].label = '起止季度'
          this.formConfigJson.formItems[0].group[2].dateType = 'quarter'
          break
        case '04':
          this.formModel.beginDate = util.standardDate(new Date()).substring(0, 4) + '0101'
          this.formModel.endDate = util.standardDate(new Date()).substring(0, 4) + '1231'
          this.formConfigJson.formItems[0].group[2].label = '起止年份'
          this.formConfigJson.formItems[0].group[2].dateType = 'year'
          this.formConfigJson.formItems[0].group[2].format = 'yyyy'
          break
      }
    },
    // 获取加工后的时间数组
    getDate (formModel) {
      let beginD = ''
      let endD = ''
      switch (formModel.cycle) {
        case '01':
          beginD = formModel.beginDate
          endD = formModel.endDate
          break
        case '02':
          beginD = formModel.beginDate.substring(0, 6) + '01'
          let yaerD = formModel.endDate.substring(0, 4)
          let monthD = formModel.endDate.substring(4, 6)
          endD = formModel.endDate.substring(0, 6) + util.getMonthDays(yaerD, monthD)
          break
        case '03':
          beginD = formModel.beginDate
          endD = formModel.endDate
          break
        case '04':
          beginD = formModel.beginDate.substring(0, 4) + '0101'
          endD = formModel.endDate.substring(0, 4) + '1231'
          break
      }
      return { beginD, endD }
    },
    // 切换查询方式
    statisticsTypeChangeHandler (formModel) {
      switch (formModel.cntType) {
        case '01':
          this.formConfigJson.formItems[0].group[3].show = true
          this.formConfigJson.formItems[0].group[4].show = true
          this.formConfigJson.formItems[0].group[5].show = false
          this.formConfigJson.formItems[0].group[6].show = false
          break
        case '02':
          this.formConfigJson.formItems[0].group[3].show = false
          this.formConfigJson.formItems[0].group[4].show = false
          this.formConfigJson.formItems[0].group[5].show = true
          this.formConfigJson.formItems[0].group[6].show = true
          break
      }
    },
    // 查询账户列表
    accountListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[3].options = this.payerAccNoList
      })
    },
    // 点击查询
    submitHandler (formModel) {
      this.formModel = formModel
      let dateArray = this.getDate(formModel)

      let params = {
        cntType: formModel.cntType,
        cycle: formModel.cycle,
        beginDate: dateArray.beginD,
        endDate: dateArray.endD,
        cmsCorpNo: formModel.cmsCorpNo,
        orgCode: formModel.orgCode,
        inclFlag: formModel.inclFlag,
        acNo: this.payerAccNoList[formModel.accountNo].acNo,
        currencyCode: formModel.currencyCode
        // cntType: '02',
        // cycle: '01',
        // beginDate: '20190401',
        // endDate: '20200531',
        // cmsCorpNo: '10000748',
        // orgCode: '0110201',
        // inclFlag: '0',
        // acNo: '',
        // currencyCode: 'CNY'
      }
      httpPost('/eweb-cash.AcctBalanceTrendQry.do', params).then(res => {
        this.dataList = res.list
        this.tableData = res.list
        this.handleClick()
        this.divShow = true
      }).catch(e => {
        this.handleClick()
        this.divShow = false
      })
    },
    // 重置
    resetHandler (formModel) {
      this.formModel = formModel
      this.formModel.cntType = '01'
      this.formModel.cycle = '01'
      this.formModel.beginDate = util.filterDate1('1').startDate
      this.formModel.endDate = util.filterDate1('1').endDate
      this.formModel.inclFlag = '0'
      this.formModel.accountNo = 0
      this.formModel.currencyCode = 'CNY'
      this.cycleChange(this.formModel)
      this.statisticsTypeChangeHandler(this.formModel)
    }
  },
  mounted () {
    const user = this.getUser()
    this.formModel.cmsCorpName = user.cif.cifName
    this.formModel.orgCode = user.cif.cifDeptId
    this.formModel.cmsCorpNo = user.cif.cmsCorpNo
    this.accountListQry()
  }
}
</script>

<style lang="scss" scoped>
  .fund-re-in-summary {

    .echarts-container {
      margin-top: 12px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
      background: #fff;
    }
  }
</style>
