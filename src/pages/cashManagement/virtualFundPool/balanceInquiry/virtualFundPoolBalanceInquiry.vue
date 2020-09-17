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
            <d-vertical-table
                    v-if="showTable"
                    :tabledata="tableData"
                    :showOne="true"
                    :tableStyle="{ width: '100%' }"
            >
            </d-vertical-table>
        </div>
    </div>
</template>
<script>
/**
 * @name:  虚拟资金池余额查询
 * @author: 邓焕
 */

import { currency_type } from '@/assets/js/entity'

export default {
  name: 'virtualFundPoolBalanceInquiry',
  data () {
    return {
      breadData: ['现金管理 ', '虚拟资金池', '虚拟资金池余额查询'],
      formModel: {
        poolAccount: '',
        poolAccountCurrency: ''
      },
      showTable: false,
      formConfigJson: {
        rules: {},
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '最高级账户',
                'type': 'input',
                'key': 'account'
              },
              {
                'disabled': false,
                'label': '币种',
                'type': 'select',
                'options': currency_type,
                trans: { value: 'label', key: 'value' },
                'key': 'currency'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' }
      ],
      tableData: [
        { key: '', label: '余额', value: '10,000.000.00' },
        { key: '', label: '可用余额', value: '10,000.000.00' },
        { key: '', label: '产品号', value: '00011' },
        { key: '', label: '户名', value: '大连XXX公司' },
        { key: '', label: '池账户币种', value: '人民币' },
        { key: '', label: '池账户', value: '1102********2202' }
      ]
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
