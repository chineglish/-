<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <el-steps :active="stepsActive" align-center>
      <el-step title="信息录入"></el-step>
      <el-step title="交易确认"></el-step>
      <el-step title="提交结果"></el-step>
    </el-steps>
    <d-form-previewer
      :form-struction="formStruction"
      :form-model="formModel"
      :action-data="actionData">
    </d-form-previewer>
  </d2-container>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: '',
  data: function () {
    return {
      data: ['理财服务', '理财产品', '赎回确认'],
      stepsActive: 1,
      formStruction: {
        groups: [
          {
            formItems: [
              { label: '产品名称', fieldName: 'prdName' },
              { label: '产品代码', fieldName: 'prdCode' },
              { label: '可用份额(份)',
                fieldName: 'vol',
                formatter: (row, cellValue) => util.formatCurrency(cellValue) },
              { label: '交易账户', fieldName: 'payeeAcNo' },
              { label: '赎回份额(份)',
                fieldName: 'portion',
                formatter: (row, cellValue) => util.formatCurrency(cellValue) }
            ]
          }
        ]
      },
      formModel: {},
      actionData: [
        { btnText: '确定', class: 'm-submit-btn', handler: this.printHandler },
        { btnText: '返回', class: 'm-cancel-btn', handler: this.backHandler }
      ]
    }
  },
  mounted: function () {
    this.formModel = this.$route.params
  },
  methods: {
    // 提交确认
    printHandler () {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        let params = {
          payeeAcNo: this.formModel.payeeAcNo,
          prdCode: this.formModel.prdCode,
          portion: this.formModel.portion,
          prdName: this.formModel.prdName,
          // largRedFlag: '0',
          vol: this.formModel.vol,
          prdTemplate: this.formModel.prdTemplate,
          _tokenName: token._tokenName,
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('/eweb-invest.InvestProductRedeem.do', params).then(res => {
          res._JnlStatus = res._processState
          res._jnlNo = res._jnlNo
          res.transDate = res._transTime
          this.$router.push({
            name: 'financialRedeemRes',
            params: ({
              data: this.formModel,
              res: res
            })
          })
        })
      })
    },
    // 返回
    backHandler () {
      this.$router.push({
        name: 'financialRedeemForm',
        params: ({
          data: this.formModel
        })
      })
    }
  }
}
</script>
