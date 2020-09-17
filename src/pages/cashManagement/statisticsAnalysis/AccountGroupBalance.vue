<template>
  <d2-container class="account-group-balance">
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
      <el-tab-pane label="饼图" name="pie"></el-tab-pane>
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
				<template v-if="activeName === 'pie'">
					<div class="pie-container">
						<div class="radio">
							<el-radio-group v-if="level === '2'" v-model="radio" @change="changeRadio">
								<el-radio label="selfUppBal">本级上存汇总金额</el-radio>
								<el-radio label="selfGatherBal">下级上存汇总金额</el-radio>
							</el-radio-group>
						</div>
						<div id="echart1" style="height: 450px"></div>
					</div>
				</template>
				<div v-if="activeName === 'bar'">
					<div id="echart2" style="height: 450px"></div>
				</div>
			</div>
		</div>
    </el-tabs>

  </d2-container>
</template>

<script>
import echarts from 'echarts'
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util.js'
import { currency_type, currency_type_entity1 } from '@/assets/js/entity'

export default {
  name: 'AccountGroupBalance',
  data () {
    return {
      payerAccNoList: [],
      dataList: [],
      activeName: 'table',
      divShow: false,
      breadcrumb: ['统计分析', '账户归集余额分析'],
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
        { label: '账户', prop: 'acNo' },
        { label: '户名', prop: 'acName' },
        { label: '余额', prop: 'balance' },
        { label: '本级上存汇总金额', prop: 'selfUppBal' },
        { label: '自身上存金额', prop: 'uppBal' },
        { label: '下级上存汇总金额', prop: 'selfGatherBal' }
      ],
      treeList: [],
      defaultProps: {
        children: 'subLevel',
        label: 'asAcNoName'
      },
      optionBar: {
        title: {
          left: 'center',
          text: '账户归集余额分析图'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          top: 30,
          right: 0,
          data: ['余额', '本级上存汇总金额', '自身上存金额', '下级上存汇总金额']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '余额',
            type: 'bar',
            data: []
          },
          {
            name: '本级上存汇总金额',
            type: 'bar',
            data: []
          },
          {
            name: '自身上存金额',
            type: 'bar',
            data: []
          },
          {
            name: '下级上存汇总金额',
            type: 'bar',
            data: []
          }
        ]
      },
      optionPie: {
        title: {
          left: 'center',
          text: ''
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : ￥{c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: 60,
          right: 15,
          data: []
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['35%', '50%'],
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
      level: '1',
      radio: 'selfUppBal'
    }
  },
  methods: {
    changeRadio (val) {
      this.getDataPie(this.dataList)
      this.handleClick()
    },
    nodeClick (data) {
      this.level = data.acNoLevel
      this.dataList = this.handleData([data])
      this.getDataBar(this.dataList)
      this.getDataPie(this.dataList)
      this.handleClick()
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
          var myChartBar = echarts.init(document.getElementById('echart2'))
          myChartBar.setOption(this.optionBar, true)
        })
      }
    },
    // 点击查询
    submitHandler (formModel) {
      let params = {
        currencyCode: formModel.currencyCode,
        acNo: this.payerAccNoList[formModel.accountNo].acNo
        // 201000052002 B环境登录有数据
      }
      httpPost('/eweb-cash.CashCollectionBalQry.do', params).then(res => {
        res.levelTree['asAcNoName'] = `${res.levelTree.acNo} - ${currency_type_entity1[res.levelTree.currencyCode]} - ${res.levelTree.acName}`
        if (res.levelTree.subLevel && res.levelTree.subLevel.length > 0) {
          this.handleTreeData(res.levelTree.subLevel)
        }
        this.treeList = [ res.levelTree ]
        this.dataList = this.handleData(this.treeList)
        this.getDataBar(this.dataList)
        this.getDataPie(this.dataList)
        this.divShow = true
      }).catch(() => {
        this.divShow = false
      })
    },
    // 饼图 加工数据
    getDataPie (data) {
      let seriesData = []
      let legengData = []
      /* if (this.level === '1') {
        data.forEach(item => {
          legengData.push(item.acName)
          seriesData.push({
            name: item.acName,
            value: item.selfGatherBal
          })
        })
        this.optionPie.title.text = '账户归集下级上存汇总金额分布图'
        this.optionPie.series[0].name = '下级上存汇总金额'
        this.optionPie.legend.data = legengData
        this.optionPie.series[0].data = seriesData
      } else if (this.level === '2') {
        if (this.radio === 'selfUppBal') {
          data.forEach(item => {
            legengData.push(item.acName)
            seriesData.push({
              name: item.acName,
              value: item.selfUppBal
            })
          })
          this.optionPie.title.text = '账户归集本级级上存汇总金额分布图'
          this.optionPie.series[0].name = '本级上存汇总金额'
        } else {
          data.forEach(item => {
            legengData.push(item.acName)
            seriesData.push({
              name: item.acName,
              value: item.selfGatherBal
            })
          })
          this.optionPie.title.text = '账户归集下级上存汇总金额分布图'
          this.optionPie.series[0].name = '下级上存汇总金额'
        }
        this.optionPie.legend.data = legengData
        this.optionPie.series[0].data = seriesData
      } else {
        data.forEach(item => {
          legengData.push(item.acName)
          seriesData.push({
            name: item.acName,
            value: item.selfUppBal
          })
        })
        this.optionPie.title.text = '账户归集本级级上存汇总金额分布图'
        this.optionPie.series[0].name = '本级上存汇总金额'
        this.optionPie.legend.data = legengData
        this.optionPie.series[0].data = seriesData
      } */
      /* ******************************************************* 华丽的分割线 ******************************************************* */
      let text = ''
      let name = ''
      data.forEach(item => {
        let obj = { name: item.acName, value: '' }
        if (this.level === '1' || (this.level === '2' && this.radio === 'selfGatherBal')) {
          obj.value = item.selfGatherBal
          text = '账户归集下级上存汇总金额分布图'
          name = '下级上存汇总金额'
        } else if (this.level === '3' || (this.level === '2' && this.radio === 'selfUppBal')) {
          obj.value = item.selfUppBal
          text = '账户归集本级上存汇总金额分布图'
          name = '本级上存汇总金额'
        }
        legengData.push(item.acName)
        seriesData.push(obj)
      })
      this.optionPie.title.text = text
      this.optionPie.series[0].name = name
      this.optionPie.legend.data = legengData
      this.optionPie.series[0].data = seriesData
    },
    // 柱状图 加工数据
    getDataBar (data) {
      let acNameList = []
      let balanceList = []
      let selfUppBalList = []
      let uppBalList = []
      let selfGatherBalList = []
      data.forEach(item => {
        acNameList.push(item.acName)
        balanceList.push(item.balance)
        selfUppBalList.push(item.selfUppBal)
        uppBalList.push(item.uppBal)
        selfGatherBalList.push(item.selfGatherBal)
      })
      this.optionBar.xAxis.data = acNameList
      this.optionBar.series[0].data = balanceList
      this.optionBar.series[1].data = selfUppBalList
      this.optionBar.series[2].data = uppBalList
      this.optionBar.series[3].data = selfGatherBalList
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
          item['asAcNoName'] = `${item.acNo} - ${item.acName}`
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
      this.formModel.accountNo = 0
      this.formModel.currencyCode = 'CNY'
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
    this.accountListQry()
    this.formConfigJson.formItems[0].group[1].options = currency_type
  }
}
</script>

<style lang="scss" scoped>
  .account-group-balance {
    .tabs-container {
      overflow: hidden;
      .tree {
        width: 29.5%;
        height: 100%;
        float: left;
        overflow-x: scroll;
      }
      .showData {
        border-left: 1px solid #eee;
        width: 70%;
        float: right;
      }
    }
    .radio {
      text-align: right;
      margin-bottom: 20px;
    }
  }
</style>
