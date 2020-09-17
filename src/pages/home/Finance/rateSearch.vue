<template>
  <div class="table-test">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <d-table
      v-if="!$route.params.activeName || activeName==='first'"
      :tableTitle="tableTitle"
      :table-data="tableData"
      :tableHeadData="tableHeadData"
      :operate-data="operateData"
      @handleLoanDetail="handleLoanDetail"
      @handleQuery="handleQuery"
      @handleTipsClick="handleTipsClick"
    ></d-table>
    <d-table
      v-if="!$route.params.activeName || activeName==='second'"
      :tableTitle="tableTitle2"
      :table-data="tableData2"
      :tableHeadData="tableHeadData2"
      :operate-data="operateData2"
      @handleLoanDetail="handleLoanDetail"
      @handleQuery="handleQuery2"
      @handleTipsClick="handleTipsClick2"
      @onBack="onBack"
    ></d-table>
    <m-btn :btnData="actionData" @click="onBack" />
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'

export default {
  name: 'tableTest',
  data () {
    return {
      filename: __filename,
      breadData: ['首页', '金融小工具', '利率查询'],
      tableTitle: {
        isBorder: true,
        leftInfo: {
          title: '存款'
          // options: [{
          //   value: '01',
          //   label: '全部'
          // }, {
          //   value: '02',
          //   label: '余额'
          // }]
        }
        // rightInfo: {
        //   tip: 'sbxhjdsbx',
        //   queryBtn: {
        //     innerText: '查询',
        //     eventName: 'handleQuery'
        //   }
        // }
      },
      // firstColIndex: {
      //   type: 'selection'
      // },
      tableHeadData: [
        { label: '产品类型', prop: 'description' },
        { label: '期限', prop: 'term', formatter: (row, column, cellValue, index) => this.termState[cellValue] },
        { label: '执行利率（％）', prop: 'interest', sortable: true }
      ],
      tableData: [],
      operateData: {
        btnData: [
          {
            type: 'primary',
            size: 'mini',
            plain: true,
            btnText: '添加',
            eventName: 'handleLoanDetail'
          }
        ]
      },
      tableTitle2: {
        isBorder: true,
        leftInfo: {
          title: '贷款（现行LPR利率，产品类型和利率另进行相应调整。参照门户网站，贷款LPR报价，每月20号更新）'
        }
      },
      tableHeadData2: [
        { label: '产品类型', prop: 'description' },
        { label: '期限', prop: 'term', formatter: (row, column, cellValue, index) => this.termState[cellValue] },
        { label: '执行利率（％）(央行基准利率)', prop: 'interest', sortable: true }
      ],
      tableData2: [],
      operateData2: {
        btnData: [
          {
            type: 'primary',
            size: 'mini',
            plain: true,
            btnText: '添加',
            eventName: 'handleLoanDetail'
          }
        ]
      },
      actionData: [
        {
          btnText: '返回',
          type: 'info',
          class: 'm-cancel-btn',
          eventName: 'onBack'
        }
      ],
      termState: {
        '0D': '-',
        '1D': '一天',
        '7D': '七天',
        '1M': '一个月',
        '3M': '三个月',
        '6M': '半年',
        'L1Y': '一年以内(含一年)',
        '1Y': '一年',
        '2Y': '两年',
        '3Y': '三年',
        '5Y': '五年',
        '1YT5Y': '一年到五年(含五年)',
        'M5Y': '五年以上',
        '10Y': '十年'
      },
      depAmount: '',
      depTime: '',
      activeName: '',
      creditAmount: '',
      creditTime: '',
      creditType: '',
      backpage: ''
    }
  },
  methods: {
    // 存款详情
    handleLoanDetail (data) {
      this.$router.push({
        name: 'calculator',
        params: {
          ...data,
          depAmount: this.depAmount,
          depTime: this.depTime,
          activeName: this.activeName,
          creditAmount: this.creditAmount,
          creditTime: this.creditTime,
          creditType: this.creditType
        }
      })
    },
    // 贷款详情
    handleLoanDetail2 (data) {
    },
    // 处理查询
    handleQuery (param) {
    },
    // 信息提示点击
    handleTipsClick (params) {
    },
    // 处理查询
    handleQuery2 (param) {
    },
    // 信息提示点击
    handleTipsClick2 (params) {
    },
    onBack (data) {
      if (this.backpage === 'index') {
        this.$router.push({
          name: 'index'
        })
      } else {
        this.$router.push({
          name: 'calculator',
          params: {
            ...data,
            depAmount: this.depAmount,
            depTime: this.depTime,
            activeName: this.activeName,
            creditAmount: this.creditAmount,
            creditTime: this.creditTime,
            creditType: this.creditType
          }
        })
      }
    }
  },
  mounted () {
    this.depAmount = this.$route.params.depAmount
    this.depTime = this.$route.params.depTime
    this.activeName = this.$route.params.activeName
    this.creditAmount = this.$route.params.creditAmount
    this.creditTime = this.$route.params.creditTime
    this.creditType = this.$route.params.creditType
    this.backpage = this.$route.params.backpage
    httpPost('eweb-query.HomePageRateQry.do').then(res => {
      this.tableData = res.savList
      this.tableData2 = res.lnsList
    })
  },
  created () {
    if (this.$route.params.state === '0') {
      this.operateData = null
      this.operateData2 = null
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
