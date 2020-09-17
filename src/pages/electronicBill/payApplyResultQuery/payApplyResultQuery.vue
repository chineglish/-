<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <d-table
              :table-data="tableData"
              :options="options"
              :isPagination="true"
              :tableHeadData="tableHeadData"
              :actionData="actionData"
              :pagesize="6"
              @back="back">
      </d-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'payApplyResultQuery',
  data () {
    return {
      breadData: ['电子商业汇票 ', '追索', '清偿申请结果查询'],
      options: { // table属性
        border: true,
        stripe: true
      },
      tableHeadData: [
        { label: '票据号码', prop: 'billNum' },
        { label: '票据类型', prop: 'billType' },
        { label: '出票日期', prop: 'ticketDate' },
        { label: '到期日', prop: 'expiryDate' },
        { label: '票面金额', prop: 'billMoney' },
        { label: '出票人名称', prop: 'drawerName' },
        { label: '承兑人名称', prop: 'acceptanceName' },
        { label: '状态', prop: 'status' }
      ],
      tableData: [
        {
          billNum: '13132210661',
          billType: '银票',
          ticketDate: '2019-08-01',
          expiryDate: '2019-09-11',
          billMoney: '1,500.00',
          drawerName: '出票人公司',
          acceptanceName: '承兑人公司',
          status: '非拒付追索同意清偿申请'
        },
        {
          billNum: '10661182011',
          billType: '银票',
          ticketDate: '2019-08-10',
          expiryDate: '2019-09-21',
          billMoney: '2,000.00',
          drawerName: '出票人公司',
          acceptanceName: '承兑人公司',
          status: '非拒付追索同意清偿申请'
        },
        {
          billNum: '11070100147',
          billType: '银票',
          ticketDate: '2019-08-20',
          expiryDate: '2019-09-30',
          billMoney: '3,000.00',
          drawerName: '出票人公司',
          acceptanceName: '承兑人公司',
          status: '非拒付追索同意清偿申请'
        }
      ],
      actionData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'back'
        }
      ]
    }
  },
  methods: {
    back () {
      this.$router.push({
        name: 'payApplyResultQueryInput'
      })
    }
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
