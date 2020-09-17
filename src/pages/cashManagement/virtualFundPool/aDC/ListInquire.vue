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
                    @onChange="onChange"
            >
            </d-table>
        </div>
    </div>
</template>
<script>
/**
     *@name: 追索申请-查询
     * @author: 梁文彬
     * @date: 2019-12-20
     */
export default {
  name: 'raInquiry',
  data () {
    return {
      breadData: ['现金管理 ', '虚拟资金池', ' 虚拟资金池关系加入/修改/删除'],
      options: { // table属性
        stripe: true
      },
      firstColIndex: {
        type: 'radio',
        label: '操作'
      },
      tableHeadData: [
        { label: '签约户名', prop: 'signedAccName' },
        { label: '签约账户', prop: 'contractAcc' },
        { label: '币种', prop: 'currency' },
        { label: '账户收支类型', prop: 'incomeExpenditureType' },
        { label: '资金池级别', prop: 'fundPoolLevel' }
      ],
      tableData: [
        {
          signedAccName: '小馋猫食品公司',
          contractAcc: '5515515',
          currency: '人民币',
          incomeExpenditureType: '收入账户',
          fundPoolLevel: '第1级'
        },
        {
          signedAccName: '小馋猫食品公司',
          contractAcc: '5515515',
          currency: '人民币',
          incomeExpenditureType: '收入账户',
          fundPoolLevel: '第1级'
        },
        {
          signedAccName: '小馋猫食品公司',
          contractAcc: '5515515',
          currency: '人民币',
          incomeExpenditureType: '收入账户',
          fundPoolLevel: '第1级'
        }
      ],
      actionData: [
        {
          btnText: '加入',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'add'
        },
        {
          btnText: '修改',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'onChange'
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
      this.$router.push('/AddVirtualFundPoolRelationPre')
    },
    onChange () {
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
