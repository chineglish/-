<template>
  <div class="table-test">
    <d-table
      :tableTitle="tableTitle"
      :table-data="tableData"
      :options="options"
      :tableHeadData="tableHeadData"
      :operate-data="operateData"
      :infoTips="infoTips"
      :actionData="actionData"
      @handleLoanDetail="handleLoanDetail"
      @handleQuery="handleQuery"
      @handleTipsClick="handleTipsClick"
    >
    </d-table>
    <d-table
      :tableTitle="tableTitle"
      :table-data="tableData"
      :options="options"
      :tableHeadData="tableHeadData"
      :operate-data="operateData"
      :infoTips="infoTips"
      :actionData="actionData"
      @handleLoanDetail="handleLoanDetail"
      @handleQuery="handleQuery"
      @handleTipsClick="handleTipsClick"
    >
    </d-table>
  </div>
</template>

<script>
export default {
  name: 'tableTest',
  data () {
    return {
      filename: __filename,
      breadData: ['贷款业务', '贷款信息查询'],
      tableTitle: {
        isBorder: true,
        leftInfo: {
          title: '情况'
          // options: [{
          //   value: '01',
          //   label: '全部'
          // }, {
          //   value: '02',
          //   label: '余额'
          // }]
        },
        rightInfo: {
          tip: 'sbxhjdsbx',
          queryBtn: {
            innerText: '查询',
            eventName: 'handleQuery'
          }
        }
      },
      options: { // table属性
        border: true,
        stripe: true
      },
      infoTips: [ // 信息提示
        '我的',
        '你的'
      ],
      // firstColIndex: {
      //   type: 'selection'
      // },
      tableHeadData: [
        { label: '贷款借据号', prop: 'loanId' },
        { label: '贷款账号', prop: 'loanAccount' },
        { label: '贷款余额', prop: 'loanBalance', sortable: true },
        { label: '币种', prop: 'currency' },
        { label: '贷款本金余额', prop: 'loanPrincipalBalance' },
        { label: '贷款状态', prop: 'loanStatus' }
      ],
      tableData: [
        {
          loanId: '981920190021',
          loanAccount: '013422222222',
          loanBalance: '250,000.00',
          currency: '人民币',
          loanPrincipalBalance: '0.00',
          loanStatus: '正常'
        },
        {
          loanId: '981920190022',
          loanAccount: '013422222222',
          loanBalance: '240,000.00',
          currency: '人民币',
          loanPrincipalBalance: '0.00',
          loanStatus: '正常'
        },
        {
          loanId: '981920190023',
          loanAccount: '013422222222',
          loanBalance: '240,004.00',
          currency: '人民币',
          loanPrincipalBalance: '0.00',
          loanStatus: '正常'
        },
        {
          loanId: '981920190024',
          loanAccount: '013422222222',
          loanBalance: '240,400.00',
          currency: '人民币',
          loanPrincipalBalance: '0.00',
          loanStatus: '正常'
        },
        {
          loanId: '981920190024',
          loanAccount: '013422222222',
          loanBalance: '240,400.00',
          currency: '人民币',
          loanPrincipalBalance: '0.00',
          loanStatus: '正常'
        },
        {
          loanId: '981920190024',
          loanAccount: '013422222222',
          loanBalance: '240,400.00',
          currency: '人民币',
          loanPrincipalBalance: '0.00',
          loanStatus: '正常'
        },
        {
          loanId: '981920190024',
          loanAccount: '013422222222',
          loanBalance: '240,400.00',
          currency: '人民币',
          loanPrincipalBalance: '0.00',
          loanStatus: '正常'
        }
      ],
      operateData: {
        btnData: [
          {
            type: 'primary',
            size: 'mini',
            plain: true,
            pick: (dsd, sdsd) => {
              return true
            },
            btnText: '详情',
            eventName: 'handleLoanDetail'
          }
        ]
      },
      actionData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'handleBack'
        }
      ]
    }
  },
  methods: {
    // 贷款详情
    handleLoanDetail (data) {
    },
    // 处理查询
    handleQuery (param) {
    },
    // 信息提示点击
    handleTipsClick (params) {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
