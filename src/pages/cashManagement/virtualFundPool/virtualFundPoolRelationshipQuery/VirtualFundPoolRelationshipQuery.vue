<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @inquire="inquire"
            >
            </m-new-form>
            <d-table
                    v-if="showTable"
                    :table-data="tableData"
                    :options="options"
                    :isPagination="true"
                    :tableHeadData="tableHeadData"
                    :operateData="operateData"
                    :pagesize="6"
                    @gotoDetails="gotoDetails"
            >
            </d-table>
        </div>
    </div>
</template>
<script>
/**
     *@name: 虚拟资金池关系查询
     * @author: 邓焕
     */
export default {
  name: 'raInquiry',
  data () {
    return {
      breadData: ['现金管理 ', '虚拟资金池', '虚拟资金池关系查询'],
      formModel: {
        poolAccount: '',
        poolAccountCurrency: ''
      },
      showTable: false,
      formConfigJson: {
        rules: {},
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '池账户',
                'type': 'input',
                'key': 'poolAccount'
              },
              {
                'disabled': false,
                'label': '池账户币种',
                'type': 'select',
                'options': [
                  { 'value': '1892948398439493/测试公司1', 'key': '1892948398439493' },
                  { 'value': '1934548398439673/测试公司2', 'key': '1934548398439673' }
                ],
                'key': 'poolAccountCurrency'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' }
      ],
      options: { // table属性
        stripe: true
      },
      tableHeadData: [
        { label: '账户', prop: 'accountNum' },
        { label: '户名', prop: 'accountName' },
        { label: '币种', prop: 'currency' },
        { label: '子账户账户类型', prop: 'subAccountType' },
        { label: '资金池级别', prop: 'fundPoolLevel' }
      ],
      tableData: [
        {
          accountNum: '1102********2201',
          accountName: '小馋猫食品公司',
          currency: '人民币',
          subAccountType: '收入账户',
          fundPoolLevel: '第1级'
        }
      ],
      operateData: {
        btnData: [
          {
            type: 'text',
            btnText: '查询',
            eventName: 'gotoDetails'
          }
        ]
      }
    }
  },
  methods: {
    inquire () {
      this.showTable = true
    },
    gotoDetails () {
      this.$router.push({
        name: 'VirtualFundPoolRelationshipDetail'
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
