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
                    @apply="apply"
            >
            </d-table>
        </div>
    </div>
</template>
<script>
/**
 *@name: 提示保证申请-查询
 */
export default {
  name: 'EnsureApplyQuery',
  data () {
    return {
      breadData: ['电子商业汇票', '保证', '提示保证申请'],
      options: { // table属性
        stripe: true
      },
      firstColIndex: {
        type: 'selection'
      },
      tableHeadData: [
        { label: '票据号码', prop: 'ticketNum' },
        { label: '票据类型', prop: 'ticketType' },
        { label: '出票日期', prop: 'ticketingDate' },
        { label: '到期日', prop: 'expiryDate' },
        { label: '票面金额', prop: 'faceValue' },
        { label: '收款人名称', prop: 'beneficiaryName' },
        { label: '付款人名称', prop: 'payerName' },
        { label: '审核状态', prop: 'approvalStatus' }
      ],
      tableData: [
        {
          ticketNum: '13132210661',
          ticketType: '银票',
          ticketingDate: '2019--08-01',
          expiryDate: '2019-09-11',
          faceValue: '1,500.00',
          beneficiaryName: '收款公司',
          payerName: '付款人公司',
          approvalStatus: '可操作'
        },
        {
          ticketNum: '13132210661',
          ticketType: '银票',
          ticketingDate: '2019--08-01',
          expiryDate: '2019-09-11',
          faceValue: '1,500.00',
          beneficiaryName: '收款公司',
          payerName: '付款人公司',
          approvalStatus: '可操作'
        },
        {
          ticketNum: '13132210661',
          ticketType: '银票',
          ticketingDate: '2019--08-01',
          expiryDate: '2019-09-11',
          faceValue: '1,500.00',
          beneficiaryName: '收款公司',
          payerName: '付款人公司',
          approvalStatus: '可操作'
        }
      ],
      actionData: [
        {
          btnText: '申请',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'apply'
        }
      ]
    }
  },
  methods: {
    apply () {
      this.$router.push({
        name: 'EnsureApplyQueryDetail',
        params: {
          formModel: {
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
