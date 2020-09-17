<template>
  <d2-container class="multi-ledger-balance">
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>
    <m-new-form
      :formModel="formModel"
      :componentJson="formConfigJson"
      :btnData="btnData"
      @submit="submitHandler"
      @reset="resetHandler">
    </m-new-form>

    <el-tabs v-show="divShow" type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="表格" name="table"></el-tab-pane>
		<el-tab-pane label="折线图" name="line"></el-tab-pane>
		<el-tab-pane label="柱状图" name="bar"></el-tab-pane>
		<div class="tabs-container">
			<div class="tree">
				<el-tree
						:data="treeList"
						:props="defaultProps"
						:default-expand-all="true"
						:expand-on-click-node="false"
						@node-click="nodeClick"
				></el-tree>
			</div>
			<div class="showData">
				<template v-if="activeName === 'table'">
					<d-table
							:table-data="dataList"
							:tableHeadData="tableHeadData"
					></d-table>
				</template>
				<template v-if="activeName === 'line'">
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
import { currency_type } from '@/assets/js/entity'

export default {
  name: 'MultiLedgerBalance',
  data () {
    return {
      payerAccNoList: [],
      dataList: [],
      divShow: false,
      activeName: 'table',
      breadcrumb: ['统计分析', '多级账簿成员单位余额分布'],
      formModel: {
        accountNo: 0,
        currencyCode: 'CNY'
      },
      formConfigJson: {
        rules: {},
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '30%',
            group: [
              {
                label: '账户',
                type: 'select',
                options: [],
                trans: { value: 'payerAcNoShow' },
                key: 'accountNo'
              },
              {
                label: '币种',
                type: 'select',
                trans: {
                  key: 'value',
                  value: 'label'
                },
                key: 'currencyCode',
                options: currency_type
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      tableHeadData: [
        { label: '账簿号', prop: 'asAcNo' },
        { label: '账簿名', prop: 'asAcName' },
        { label: '余额', prop: 'selfBal' },
        { label: '可用余额', prop: 'useBal' },
        { label: '汇总余额', prop: 'uppBal' }
      ],
      treeList: [],
      defaultProps: {
        children: 'subLevel',
        label: 'asAcNoName'
      },
      optionBar: {
        title: {
          left: 'center',
          text: '多级账簿成员单位余额分布'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          right: 0,
          data: ['余额', '可用余额']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {},
        series: [
          {
            name: '余额',
            type: 'bar',
            barWidth: '70px',
            data: []
          },
          {
            name: '可用余额',
            type: 'bar',
            barWidth: '70px',
            data: []
          }
        ]
      },
      optionLine: {
        title: {
          left: 'center',
          text: '多级账簿成员单位余额分布'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          right: 0,
          data: ['余额', '可用余额']
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
        yAxis: {},
        series: [
          {
            name: '余额',
            type: 'line',
            data: []
          },
          {
            name: '可用余额',
            type: 'line',
            data: []
          }
        ]
      }
    }
  },
  methods: {
    nodeClick (data) {
      this.dataList = this.handleData([data])
      this.getData(this.dataList)
      this.handleClick()
    },
    // 切换图形
    handleClick () {
      if (this.activeName === 'line') {
        // 折线图 绘制图形
        this.$nextTick(() => {
          var myChartLine = echarts.init(document.getElementById('echart1'))
          myChartLine.setOption(this.optionLine, true)
        })
      } else if (this.activeName === 'bar') {
        // 柱状图 绘制图形
        this.$nextTick(() => {
          var myChartBar = echarts.init(document.getElementById('echart2'))
          myChartBar.setOption(this.optionBar, true)
        })
      }
    },
    // 点击查询
    submitHandler (formModel) {
      let params = {
        acNo: this.payerAccNoList[formModel.accountNo].acNo,
        currencyCode: formModel.currencyCode
      }
      httpPost('/eweb-cash.MultistageBookUnitBalQry.do', params).then(res => {
        this.handleTreeData([ res.levelTree ])
        this.treeList = [ res.levelTree ]
        this.dataList = this.handleData(this.treeList)
        this.getData(this.dataList)
        this.divShow = true
      }).catch(() => {
        this.divShow = false
      })
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
    // 重置
    resetHandler (formModel) {
      this.divShow = false
      this.formModel = formModel
      this.formModel.accountNo = 0
      this.formModel.currencyCode = 'CNY'
    },
    // echarts图 加工数据
    getData (data) {
      let asAcName = []
      let selfBal = []
      let useBal = []
      for (let i = 0; i < data.length; i++) {
        asAcName.push(data[i].asAcName)
        selfBal.push(data[i].selfBal)
        useBal.push(data[i].useBal)
      }
      this.optionLine.xAxis[0].data = asAcName
      this.optionLine.series[0].data = selfBal
      this.optionLine.series[1].data = useBal
      this.optionBar.xAxis.data = asAcName
      this.optionBar.series[0].data = selfBal
      this.optionBar.series[1].data = useBal
    },
    handleTreeData (list) {
      if (Array.isArray(list) && list.length > 0) {
        list.forEach(item => {
          item['asAcNoName'] = `${item.asAcNo} - ${item.asAcName}`
          if (item.subLevel && item.subLevel.length > 0) {
            this.handleTreeData(item.subLevel)
          }
        })
      }
    },
    // 查询账户列表
    accountListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
      })
    }
  },
  created () {
    this.formConfigJson.formItems[0].group[1].options = currency_type
    this.accountListQry()
  }
}
</script>

<style lang="scss" scoped>
  .multi-ledger-balance {
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

<style>
	.multi-ledger-balance .el-tree-node>.el-tree-node__children {
		overflow: inherit;
	}
</style>
