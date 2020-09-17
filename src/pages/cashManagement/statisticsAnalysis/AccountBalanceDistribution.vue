<template>
  <d2-container class="account-balance-distribution">
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>
    <m-new-form
      :formModel="formModel"
      :componentJson="formConfigJson"
      :btnData="btnData"
      @cycleChange="cycleChange"
      @submit="submitHandler"
      @reset="resetHandler"
      @change="changeType"
	></m-new-form>

    <el-tabs v-show="divShow" type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="表格" name="table"></el-tab-pane>
      <el-tab-pane label="饼图" name="pie"></el-tab-pane>
      <el-tab-pane label="柱状图" name="bar"></el-tab-pane>
      <div class="tabs-container">
        <div class="tree" v-if="!isShow">
          <el-tree
              :data="treeList"
              :props="defaultProps"
              :default-expand-all="true"
              :expand-on-click-node="false"
              @node-click="nodeClick"
          ></el-tree>
        </div>
        <div :class="{ showData: !isShow }">
          <template v-if="activeName === 'table'">
            <d-table
                :table-data="dataList"
                :tableHeadData="isShow ? tableHeadData1 : tableHeadData2"
            ></d-table>
          </template>
          <template v-if="activeName === 'pie'">
            <div id="echart1" style="height: 450px"></div>
          </template>
          <template v-if="activeName === 'bar'">
            <div id="echart2" style="height: 450px"></div>
          </template>
        </div>
      </div>
    </el-tabs>
  </d2-container>
</template>

<script>
import echarts from 'echarts'
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util.js'
import { currency_type_entity1 } from '@/assets/js/entity'

export default {
  name: 'AccountBalanceDistribution',
  data () {
    return {
      dataList: [],
      activeName: 'table',
      divShow: false,
      breadcrumb: ['统计分析', '账户余额分布统计'],
      formModel: {
        cntType: '01',
        cycle: '01',
        beginDate: util.standardDate(new Date()),
        // endDate: '',
        cmsCorpName: '',
        cmsCorpNo: '',
        orgCode: ''
      },
      formConfigJson: {
        rules: {
          beginDate: [{ required: true, message: '请输入起始日期', trigger: 'submit' }]
          // endDate: [{ required: true, message: '请输入截至日期', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '30%',
            group: [
              {
                label: '统计方式',
                key: 'cntType',
                type: 'select',
                value: '',
                options: [
                  { label: '按企业统计', value: '01' },
                  { label: '按集团统计', value: '02' }
                ],
                trans: { value: 'label', key: 'value' },
                changeEventName: 'change'
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
                key: 'beginDate',
                type: 'date',
                dateType: 'date',
                format: 'yyyy-MM-dd',
                valueFormat: 'yyyyMMdd'
              },
              // {
              //   label: '截止日期',
              //   key: 'endDate',
              //   type: 'date',
              //   dateType: 'date',
              //   valueFormat: 'yyyyMMdd'
              // },
              {
                label: '企业',
                key: 'cmsCorpName',
                type: 'text',
                value: ''
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      isShow: true,
      tableData: [],
      tableHeadData1: [
        { label: '账户', prop: 'acNo' },
        { label: '币种', prop: 'curCode', formatter: (row, cell, value, index) => currency_type_entity1[value] },
        { label: '户名', prop: 'acName' },
        { label: '余额', prop: 'balance', formatter: (row, cell, value, index) => util.formatCurrency(value) }
      ],
      tableHeadData2: [
        { label: '企业代码', prop: 'relCmsCorpNo' },
        { label: '企业名称', prop: 'relCorpCnName' },
        { label: '余额', prop: 'balance', formatter: (row, cell, value, index) => util.formatCurrency(value) }
      ],
      optionPie: {
        title: {
          left: 'center',
          text: '账户余额分布统计图'
        },
        tooltip: {
          trigger: 'item',
          // formatter: '{a} <br/>{b} : ￥{c} ({d}%)'
          formatter: function (data) {
            return data.seriesName + '<br/>' + data.name + ': ￥' + data.value + '(' + data.percent + '%)'
          }
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 100,
          top: 70,
          data: []
        },
        series: [
          {
            name: '余额',
            type: 'pie',
            radius: '55%',
            center: ['40%', '55%'],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      optionBar: {
        title: {
          left: 'center',
          text: '账户余额分布统计图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          right: 100,
          data: ['余额']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: []
      },
      treeList: [],
      defaultProps: {
        children: 'subLevel',
        label: 'asAcNoName'
      }
    }
  },
  methods: {
    changeType (obj, { value }) {
      this.divShow = false
      this.isShow = value === '01'
    },
    // 切换图形
    handleClick () {
      if (this.activeName === 'pie') {
        // 饼图 绘制图形
        this.$nextTick(() => {
          var myChartPie = echarts.init(document.getElementById('echart1'))
          myChartPie.setOption(this.optionPie, true)
        })
      } else if (this.activeName === 'bar') {
        // 柱状图 绘制图形
        this.$nextTick(() => {
          let myChartBar = echarts.init(document.getElementById('echart2'))
          myChartBar.setOption(this.optionBar, true)
        })
      }
    },
    // 切换日期方式
    cycleChange (formModel) {
      switch (formModel.cycle) {
        case '01':
          this.formModel.beginDate = util.standardDate(new Date())
          this.formConfigJson.formItems[0].group[2].label = '日期'
          this.formConfigJson.formItems[0].group[2].dateType = 'date'
          this.formConfigJson.formItems[0].group[2].type = 'date'
          this.formConfigJson.formItems[0].group[2].format = 'yyyy-MM-dd'
          break
        case '02':
          this.formModel.beginDate = util.standardDate(new Date()).substring(0, 6) + '01'
          this.formConfigJson.formItems[0].group[2].label = '月份'
          this.formConfigJson.formItems[0].group[2].dateType = 'month'
          this.formConfigJson.formItems[0].group[2].type = 'date'
          this.formConfigJson.formItems[0].group[2].format = 'yyyy-MM'
          break
        case '03':
          this.formConfigJson.formItems[0].group[2].label = '季度'
          this.formConfigJson.formItems[0].group[2].type = 'quarter'
          break
        case '04':
          this.formModel.beginDate = util.standardDate(new Date()).substring(0, 4) + '0101'
          this.formConfigJson.formItems[0].group[2].label = '年份'
          this.formConfigJson.formItems[0].group[2].dateType = 'year'
          this.formConfigJson.formItems[0].group[2].type = 'date'
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
          endD = formModel.beginDate
          break
        case '02':
          beginD = formModel.beginDate.substring(0, 6) + '01'
          let yaerD = formModel.beginDate.substring(0, 4)
          let monthD = formModel.beginDate.substring(4, 6)
          endD = formModel.beginDate.substring(0, 6) + util.getMonthDays(yaerD, monthD)
          break
        case '03':
          beginD = formModel.beginDate[0]
          endD = formModel.beginDate[1]
          break
        case '04':
          beginD = formModel.beginDate.substring(0, 4) + '0101'
          endD = formModel.beginDate.substring(0, 4) + '1231'
          break
      }
      return { beginD, endD }
    },
    // 点击查询
    submitHandler (formModel) {
      this.divShow = false
      this.formModel = formModel
      let dateArray = this.getDate(formModel)
      let params = {
        cntType: formModel.cntType,
        beginDate: dateArray.beginD,
        endDate: dateArray.endD,
        cmsCorpNo: formModel.cmsCorpNo,
        orgCode: formModel.orgCode
        // cntType: '01',
        // beginDate: '20180101',
        // endDate: '20200101',
        // cmsCorpNo: '10000852',
        // orgCode: '0070601'
      }
      httpPost('/eweb-cash.AcctBalanceMalQry.do', params).then(res => {
        if (this.isShow) {
          this.dataList = res.list
        } else {
          this.handleTreeData([ res.levelTree ])
          this.treeList = [ res.levelTree ]
          this.dataList = this.handleData(this.treeList)
        }
        this.getDataPie(this.dataList)
        this.getDataBar(this.dataList)
        this.divShow = true
      }).catch(e => {
        this.divShow = false
      })
    },
    nodeClick (arr) {
      this.dataList = this.handleData([arr])
      this.getDataPie(this.dataList)
      this.getDataBar(this.dataList)
      this.handleClick()
    },
    handleData (arr) {
      let list = []
      list.push(arr[0])
      if (arr[0].subLevel && arr[0].subLevel.length > 0) {
        arr[0].subLevel.forEach(item => {
          list.push(item)
        })
      }
      return list
    },
    handleTreeData (data) {
      if (Array.isArray(data) && data.length > 0) {
        data.forEach(item => {
          item['asAcNoName'] = `${item.relCmsCorpNo} - ${item.relCorpCnName}`
          if (item.subLevel && item.subLevel.length > 0) {
            this.handleTreeData(item.subLevel)
          }
        })
      }
    },
    // 重置
    resetHandler (formModel) {
      this.divShow = false
      this.formModel = formModel
      this.formModel.cntType = '01'
      this.formModel.cycle = '01'
      this.formModel.beginDate = util.standardDate(new Date())
      this.cycleChange(this.formModel)
    },
    // 饼图 加工数据
    getDataPie (data) {
      let legendData = []
      let seriesData = []
      if (this.isShow) { // 按企业
        data.forEach(item => {
          legendData.push(item.acName)
          seriesData.push({
            name: item.acName,
            value: item.balance ? item.balance : '0'
          })
        })
      } else { // 按集团
        for (let i = 0; i < data.length; i++) {
          let name = data[i].relCorpCnName
          legendData.push(name)
          seriesData.push({
            name: name,
            value: data[i].balance ? data[i].balance : '0'
          })
        }
      }
      this.optionPie.legend.data = legendData
      this.optionPie.series[0].data = seriesData
    },
    // 柱状图 加工数据
    getDataBar (data) {
      let titleData = []
      let respData = []
      let list = []
      let obj = {
        name: '余额',
        type: 'bar',
        barWidth: '70px',
        data: []
      }
      if (this.isShow) { // 按企业
        data.forEach(item => {
          titleData.push(item.acName)
          item.balance ? list.push(item.balance) : list.push('0')
        })
      } else { // 按集团
        data.forEach(item => {
          titleData.push(item.relCorpCnName)
          item.selfBal ? list.push(item.balance) : list.push('0')
        })
      }

      this.$set(obj, 'data', list)
      respData.push(obj)

      this.$set(this.optionBar.xAxis[0], 'data', titleData)
      this.$set(this.optionBar, 'series', respData)
    }
  },
  created () {
    const user = this.getUser()
    this.formModel.cmsCorpName = user.cif.cifName
    this.formModel.orgCode = user.cif.cifDeptId
    this.formModel.cmsCorpNo = user.cif.cmsCorpNo
  }
}
</script>

<style lang="scss" scoped>
  .account-balance-distribution {
    .echarts-container {
      margin-top: 12px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
      background: #fff;
    }
    .tabs-container {
      overflow: hidden;
      .tree {
        width: 29.5%;
        height: 100%;
        float: left;
      }
      .showData {
        border-left: 1px solid #eee;
        width: 70%;
        float: right;
      }
    }
  }
</style>
