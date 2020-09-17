
<template>
  <d2-container class="enterprise-bank-bill-qry">
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>

    <d2-container>
      <d-table
        :tableHeadData="tableHeadData"
        :tableData="tableData"
        :options="options"
        :pagesize="20"
        :actionData="actionData"
        @clickTableLink="clickTableLink"
        @on-view-all="viewAllHandler"
        @on-back="backHandler"></d-table>
    </d2-container>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'

export default {
  name: 'enterprise-bank-bill-qry',
  data () {
    return {
      breadcrumb: ['账户管理', '银企对账'],
      msgs: ['1.用于企业用户查询已签约电子对账方式的对账信息并进行对账。'],
      options: { // table属性
        border: true,
        stripe: true
      },
      tableHeadData: [
        {
          label: '账号',
          prop: 'acNo',
          checkLink: (value, item) => item.flag === '0',
          clickEventName: 'clickTableLink'
        },
        {
          label: '是否可以对账',
          prop: 'flag',
          formatter: (a, b, value, d) => value === '0' ? '是' : '否'
        },
        {
          label: '不允许对账原因',
          prop: 'errMessage'
        }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '查看全部待对账账单',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'on-view-all',
          disabled: true
        },
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'on-back'
        }
      ]
    }
  },
  methods: {
    clickTableLink (data) {
      this.$router.push({
        name: 'enterpriseBankCheckBillPre',
        params: {
          acNo: data.acNo
        }
      })
    },
    viewAllHandler () {
      this.$router.push({
        name: 'enterpriseBankCheckBillPre'
      })
    },
    backHandler () {
      // this.$router.back()
      this.$router.push({
        name: 'index'
      })
    }
  },
  created () {
    httpPost('eweb-query.BankCheckQuery.do', {}).then(res => {
      this.tableData = res.list
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].flag === '0') {
          this.actionData[0].disabled = false
          break
        }
      }
    })
  }
}
</script>
