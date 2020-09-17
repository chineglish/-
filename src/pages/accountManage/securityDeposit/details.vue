<template>
  <d2-container class="security-deposit-details">
    <m-breadcrumb :data="breadData"></m-breadcrumb>

    <d2-container>
      <d-table
        :tableData="tableData"
        :options="options"
        :firstColIndex="firstColIndex"
        :tableHeadData="tableHeadData"
        :actionData="actionData"
        :infoTips="infoTips"
        @on-back="backHandler"
      >
      </d-table>
    </d2-container>
  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { frozenType, jixiType } from '@/assets/js/entity'
export default {
  name: 'security-deposit-details',
  data () {
    return {
      breadData: ['账户管理', '保证金查询', '详情页'],
      options: { // table属性
        border: true,
        stripe: true
      },
      infoTips: [ // 信息提示
      ],
      firstColIndex: {
        type: 'index',
        label: '冻结序号',
        eventName: ''
      },
      tableHeadData: [
        {
          label: '冻结金额',
          prop: 'donjjine',
          width: 140,
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '起息日',
          prop: 'qixiriqi',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '到期日',
          prop: 'djzzriqi',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '利率（%）',
          prop: 'zhxililv'
        },
        {
          label: '计息方式',
          prop: 'cunqiiii',
          formatter: (row, column, cellValue, index) => {
            return row.jixibioz === '1' ? util.handleEnums(jixiType, cellValue) : row.jixibioz === '0' ? '不计息' : '未知'
          }
        },
        {
          label: '用途',
          prop: 'donjyyin'
        },
        {
          label: '冻结种类',
          prop: 'donjzhgl',
          formatter: (row, column, cellValue, index) => {
            const target = frozenType.find(item => item.value === cellValue)
            return target ? target.label : ''
          }
        }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '返回',
          type: 'info',
          class: 'm-cancel-btn',
          eventName: 'on-back'
        }
      ]
    }
  },
  methods: {
    listQry (data) {
      const params = {
        acNo: data.depositAcNo,
        subAcNo: data.subAcNo
      }
      httpPost('eweb-acmgmt.DepositAmountDetailQry.do', params).then(res => {
        this.tableData = res.acctInfoList || []
      })
    },
    backHandler () {
      this.$router.back()
    }
  },
  created () {
    const { kehuzhao: depositAcNo, zhanghao: subAcNo } = this.$route.params
    this.listQry({ depositAcNo, subAcNo })
  }
}
</script>
