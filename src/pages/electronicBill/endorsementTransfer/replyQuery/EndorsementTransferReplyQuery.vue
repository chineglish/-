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
                    @onBack="onBack"
            >
            </d-table>
        </div>
    </div>
</template>
<script>
/**
     *@name: 被背书应答查询
     */
export default {
  name: 'EndorsementTransferReplyQuery',
  data () {
    return {
      breadData: ['电子商业汇票', '被背书应答查询'],
      options: { // table属性
        stripe: true
      },
      tableHeadData: [
        { label: '票据号码', prop: 'ticketNum' },
        { label: '票据种类', prop: 'billType' },
        { label: '出票日期', prop: 'ticketingDate' },
        { label: '到期日', prop: 'expiryDate' },
        { label: '票面金额', prop: 'faceValue' },
        { label: '出票人名称', prop: 'drawerName' },
        { label: '收款人名称', prop: 'beneficiaryName' }
      ],
      tableData: [
        {
          ticketNum: '13132210661',
          ticketType: '银票',
          billType: '电子',
          ticketingDate: '2019--08-01',
          expiryDate: '2019-09-11',
          faceValue: '1,500.00',
          drawerName: '出票公司',
          beneficiaryName: '收款公司'
        },
        {
          ticketNum: '13132210661',
          ticketType: '银票',
          billType: '电子',
          ticketingDate: '2019--08-01',
          expiryDate: '2019-09-11',
          faceValue: '1,500.00',
          drawerName: '出票公司',
          beneficiaryName: '收款公司'
        },
        {
          ticketNum: '13132210661',
          ticketType: '银票',
          billType: '电子',
          ticketingDate: '2019--08-01',
          expiryDate: '2019-09-11',
          faceValue: '1,500.00',
          drawerName: '出票公司',
          beneficiaryName: '收款公司'
        }
      ],
      actionData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'onBack'
        }
      ]
    }
  },
  methods: {
    onBack () {
      this.$router.push('/index')
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
