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
                    @add="add"
                    @onDelete="onDelete"
                    @onReturn="onReturn"
            >
            </d-table>
        </div>
    </div>
</template>
<script>
/**
     *@name: 追索申请-查询
     */
export default {
  name: 'TicketRegistrationList',
  data () {
    return {
      breadData: ['电子商业汇票 ', '出票登记'],
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
          btnText: '出票登记',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'add'
        },
        {
          btnText: '退回',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'onReturn'
        },
        {
          btnText: '删除',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'onDelete'
        }
      ]
    }
  },
  methods: {
    add () {
      this.$router.push('/TicketRegistrationPre')
    },
    onReturn () {
      this.$router.push({
        name: 'ChangeVirtualFundPoolRelationPre',
        params: {
          formModel: {
            poolAcc: '12345687',
            poolAccCurrency: '人民币',
            subAcc: '148484848',
            subAccCurrency: '人民币',
            lenderInterestRate: '15',
            debitRate: '11'
          }
        }
      })
    },
    onDelete () {
      this.$router.push({
        name: 'DeletionVirtualFundPoolRelationConf',
        params: {
          formModel: {
            poolAcc: '12345687',
            poolAccCurrency: '人民币',
            subAcc: '148484848',
            subAccCurrency: '人民币',
            lenderInterestRate: '15',
            debitRate: '11'
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
