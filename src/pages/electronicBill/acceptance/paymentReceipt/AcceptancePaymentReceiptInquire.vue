<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <d-table
                    :table-data="tableData"
                    :options="options"
                    :isPagination="true"
                    :firstColIndex="firstColIndex"
                    :tableHeadData="tableHeadData"
                    :actionData="actionData"
                    :pagesize="6"
                    @paymentReceipt="paymentReceipt"
            >
            </d-table>
        </div>
    </div>
</template>
<script>
/**
     *@name: 付款签收-查询
     */
export default {
  name: 'AcceptanceInquire',
  data () {
    return {
      breadData: ['电子商业汇票', '付款签收'],
      options: { // table属性
        stripe: true
      },
      firstColIndex: {
        type: 'selection'
      },
      tableHeadData: [
        { label: '票据类型', prop: 'ticketType' },
        { label: '票据种类', prop: 'billType' },
        { label: '出票日期', prop: 'ticketingDate' },
        { label: '到期日', prop: 'expiryDate' },
        { label: '票面金额', prop: 'faceValue' },
        { label: '出票人名称', prop: 'drawerName' },
        { label: '收款人名称', prop: 'beneficiaryName' },
        { label: '承兑行行号', prop: 'acceptBankNum' },
        { label: '审核状态', prop: 'approvalStatus' }
      ],
      tableData: [
        {
          ticketType: '银票',
          billType: '电子',
          ticketingDate: '2019--08-01',
          expiryDate: '2019-09-11',
          faceValue: '1,500.00',
          drawerName: '出票公司',
          beneficiaryName: '收款公司',
          acceptBankNum: '123456789012',
          approvalStatus: '可操作'
        },
        {
          ticketType: '银票',
          billType: '电子',
          ticketingDate: '2019--08-01',
          expiryDate: '2019-09-11',
          faceValue: '1,500.00',
          drawerName: '出票公司',
          beneficiaryName: '收款公司',
          acceptBankNum: '123456789012',
          approvalStatus: '可操作'
        },
        {
          ticketType: '银票',
          billType: '电子',
          ticketingDate: '2019--08-01',
          expiryDate: '2019-09-11',
          faceValue: '1,500.00',
          drawerName: '出票公司',
          beneficiaryName: '收款公司',
          acceptBankNum: '123456789012',
          approvalStatus: '可操作'
        }
      ],
      actionData: [
        {
          btnText: '付款签收',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'paymentReceipt'
        }
      ]
    }
  },
  methods: {
    paymentReceipt () {
      let theDay = new Date()
      this.$router.push({
        name: 'AcceptancePaymentReceiptPre',
        params: {
          formModel: {
            theDay: theDay.getFullYear() + '-' + theDay.getMonth() + '-' + theDay.getDate(),
            accountNum: '1892948398439493',
            drawerName: '出票人',
            beneficiaryName: '收款人',
            payingBankName: '付款行',
            ticketIssuingDay: '2018-08-08',
            facedate: '2018-08-08'
          }
        }
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
