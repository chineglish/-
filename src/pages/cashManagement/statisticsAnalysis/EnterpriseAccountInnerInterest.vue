<template>
  <d2-container class="cmsCorpNo-account-inner-interest">
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>

    <m-new-form
      :formModel="formModel"
      :componentJson="formConfigJson"
      :btnData="btnData"
      @statisticsTypeChangeHandler="statisticsTypeChangeHandler"
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

  </d2-container>
</template>

<script>
import echarts from 'echarts'
import { httpPost } from '@/api/sys/http'
import { currency_type } from '@/assets/js/entity'
import util from '@/libs/util.js'

export default {
  name: 'EnterpriseAccountInnerInterest',
  data () {
    return {
      payerAccNoList: [],
      dataList: [],
      divShow: true,
      activeName: 'line',
      breadcrumb: ['统计分析', '企业账户内部利息汇总'],
      formModel: {
        cntType: '01',
        year: (new Date()).getFullYear().toString(),
        cmsCorpNo: '',
        accountNo: 0,
        currencyCode: 'CNY'
      },
      formConfigJson: {
        rules: {
          year: [{ required: true, message: '请输入查询年份', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '30%',
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
                label: '年份',
                key: 'year',
                type: 'date',
                dateType: 'year',
                format: 'yyyy',
                valueFormat: 'yyyy',
                placeholder: '请选择年份'
              },
              {
                label: '企业',
                key: 'cmsCorpName',
                type: 'text',
                value: '',
                'show': false
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
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  methods: {
    // 折线图 加工数据
    getDataLine (data) {
      let acName = []
      let firstSel = []
      let secondSel = []
      let thirdSel = []
      let fourthSel = []
      for (let i = 0; i < data.length; i++) {
        acName.push(data[i].acName)
        firstSel.push(data[i].firstSel)
        secondSel.push(data[i].secondSel)
        thirdSel.push(data[i].thirdSel)
        fourthSel.push(data[i].fourthSel)
      }
      return {
        acName: acName,
        firstSel: firstSel,
        secondSel: secondSel,
        thirdSel: thirdSel,
        fourthSel: fourthSel
      }
    },
    // 折线图 绘制图形
    setEChartOptionLine (data) {
      var myChartLine = echarts.init(document.getElementById('echart'))

      let optionLine = {
        title: {
          left: 'center',
          top: '30px',
          text: '企业账户内部利息汇总'
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
          data: ['第一季度', '第二季度', '第三季度', '第四季度']
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
            data: data.acName
          }
        ],
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '第一季度',
            type: 'line',
            label: {
              show: true,
              position: 'left'
            },
            data: data.firstSel
          },
          {
            name: '第二季度',
            type: 'line',
            label: {
              show: true,
              position: 'top'
            },
            data: data.secondSel
          },
          {
            name: '第三季度',
            type: 'line',
            label: {
              show: true,
              position: 'right'
            },
            data: data.thirdSel
          },
          {
            name: '第四季度',
            type: 'line',
            label: {
              show: true,
              position: 'top'
            },
            data: data.fourthSel
          }
        ]
      }
      if (optionLine && typeof optionLine === 'object') {
        myChartLine.setOption(optionLine, true)
      }
    },
    // 折线图 加工数据 按账户统计
    getDataLine1 (data) {
      let xData = []
      let yData = []
      for (let i = 0; i < data.length; i++) {
        xData.push(data[i].acName)
        yData.push(data[i].firstSel)
        yData.push(data[i].secondSel)
        yData.push(data[i].thirdSel)
        yData.push(data[i].fourthSel)
      }
      return {
        yData: yData,
        xData: xData
      }
    },
    // 折线图 绘制图形 按账户统计
    setEChartOptionLine1 (data) {
      var myChartLine1 = echarts.init(document.getElementById('echart'))
      let optionLine1 = {
        title: {
          left: 'center',
          top: '30px',
          text: '企业账户内部利息汇总'
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
          data: data.xData
        },
        grid: {
          x: 100,
          y: 130,
          x2: 100,
          y2: 100,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['第一季度', '第二季度', '第三季度', '第四季度'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: data.xData,
            type: 'line',
            barWidth: '60%',
            label: {
              show: true,
              position: 'top'
            },
            data: data.yData
          }
        ]
      }
      if (optionLine1 && typeof optionLine1 === 'object') {
        myChartLine1.setOption(optionLine1, true)
      }
    },
    // 柱状图 加工数据
    getDataBar (data) {
      let respData = [[]]
      respData[0] = []
      respData[0].push('product')
      respData[0].push('第一季度')
      respData[0].push('第二季度')
      respData[0].push('第三季度')
      respData[0].push('第四季度')
      for (let i = 0; i < data.length; i++) {
        respData[i + 1] = []
        respData[i + 1].push(data[i].acName)
        respData[i + 1].push(data[i].firstSel)
        respData[i + 1].push(data[i].secondSel)
        respData[i + 1].push(data[i].thirdSel)
        respData[i + 1].push(data[i].fourthSel)
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
          text: '企业账户内部利息汇总'
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
            // barGap: 0,
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
          },
          {
            type: 'bar',
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
      if (this.activeName === 'line' && this.formModel.cntType === '01') {
        let resDataLine1 = this.getDataLine1(this.dataList)
        this.setEChartOptionLine1(resDataLine1)
      }
      if (this.activeName === 'line' && this.formModel.cntType === '02') {
        let resDataLine = this.getDataLine(this.dataList)
        this.setEChartOptionLine(resDataLine)
      }
      if (this.activeName === 'bar') {
        let resDataBar = this.getDataBar(this.dataList)
        this.setEChartOptionBar(resDataBar)
      }
    },
    // 切换查询方式
    statisticsTypeChangeHandler (formModel) {
      switch (formModel.cntType) {
        case '01':
          this.formConfigJson.formItems[0].group[2].show = false
          this.formConfigJson.formItems[0].group[3].show = true
          this.formConfigJson.formItems[0].group[4].show = true
          break
        case '02':
          this.formConfigJson.formItems[0].group[2].show = true
          this.formConfigJson.formItems[0].group[3].show = false
          this.formConfigJson.formItems[0].group[4].show = false
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
      let params = {
        // acNo: '800620000000555',
        // cmsCorpNo: '10000852',
        // year: '2018',

        cntType: formModel.cntType,
        year: formModel.year,
        cmsCorpNo: formModel.cmsCorpNo,
        acNo: this.payerAccNoList[formModel.accountNo].acNo,
        currencyCode: formModel.currencyCode
      }
      httpPost('/eweb-cash.AcctInnerInterestQry.do', params).then(res => {
        this.dataList = res.list
        this.handleClick()
        this.divShow = true
      }).catch(e => {
        console.error(e)
        this.handleClick()
        this.divShow = false
      })
    },
    // 重置
    resetHandler (formModel) {
      this.formModel = formModel
      this.formModel.cntType = '01'
      this.formModel.accountNo = 0
      this.formModel.currencyCode = 'CNY'
      this.formModel.year = (new Date()).getFullYear().toString()
      this.statisticsTypeChangeHandler(this.formModel)
    }
  },
  mounted () {
    const user = this.getUser()
    this.formModel.cmsCorpName = user.cif.cifName
    this.formModel.cmsCorpNo = user.cif.cmsCorpNo
    this.accountListQry()
  }
}
</script>

<style lang="scss" scoped>
.cmsCorpNo-account-inner-interest {

  .echarts-container {
    margin-top: 12px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    background: #fff;
  }
}
</style>
