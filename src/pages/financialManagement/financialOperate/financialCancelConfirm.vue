<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <el-steps :active="stepsActive" align-center>
      <el-step title="交易确认"></el-step>
      <el-step title="提交结果"></el-step>
    </el-steps>
    <d-form-previewer
      :form-struction="formStruction"
      :formModel="formModel"
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
      data: ['理财服务', '理财产品', '购买撤销'],
      stepsActive: 0,
      formStruction: {
        groups: [
          {
            formItems: [
              { label: '产品名称', fieldName: 'prdName' },
              { label: '产品代码', fieldName: 'prdCode' },
              // { label: '起购金额(元)',
              //   fieldName: 'ofirstAmt',
              //   formatter: (row, cellValue) => util.formatCurrency(cellValue) },
              { label: '交易金额', fieldName: 'amount', formatter: (row, cellValue) => util.formatCurrency(cellValue) },
              { label: '撤销金额(元)',
                fieldName: 'amount',
                formatter: (row, cellValue) => util.formatCurrency(cellValue) },
              { label: '金额大写', fieldName: 'bigAmount' },
              { label: '业绩比较基准', fieldName: 'modelComment', show: false },
              { label: '起息日', fieldName: 'incomeDate', show: false },
              { label: '到期日', fieldName: 'incomeEndDate', show: false },
              { label: '单位净值',
                fieldName: 'netWorth',
                formatter: (row, cellValue) => this.net(cellValue),
                show: false },
              { label: '七日年化收益率', fieldName: 'weekRate', show: false },
              { label: '交易账户', fieldName: 'payeeAcNo' },
              { label: '推荐人编号', fieldName: 'mutiRecommender' }
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
  created () {
    this.formModel = this.$route.params
    this.formModel.apNavDate = util.sepDate(this.formModel.apNavDate)
    this.formModel.netWorth = Number(this.formModel.netWorth).toFixed(6)
    this.formModel.bigAmount = util.getMoneyHanzi(this.formModel.amount)
    if (this.formModel.prdTemplate === '1300') {
      this.formStruction.groups[0].formItems[8].show = true
      this.formStruction.groups[0].formItems[9].show = true
    } else {
      this.formStruction.groups[0].formItems[5].show = true
      this.formStruction.groups[0].formItems[6].show = true
      this.formStruction.groups[0].formItems[7].show = true
    }
  },
  methods: {
    // 拼接净值和净值日期
    net (value) {
      return value + '(' + this.formModel.apNavDate + ')'
    },
    // 提交确认
    printHandler () {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        let params = {
          payeeAcNo: this.formModel.payeeAcNo,
          coreJnlNo: this.formModel.coreJnlNo,
          prdCode: this.formModel.prdCode,
          amount: this.formModel.amount,
          prdName: this.formModel.prdName,
          prdTemplate: this.formModel.prdTemplate,
          weekRate: this.formModel.weekRate,
          modelComment: this.formModel.modelComment,
          _dataMapKey: this.$route.params._dataMapKey,
          ofirstAmt: this.formModel.ofirstAmt,
          apNavDate: this.formModel.apNavDate,
          netWorth: this.formModel.netWorth,
          incomeDate: this.formModel.incomeDate,
          incomeEndDate: this.formModel.incomeEndDate,
          mutiRecommender: this.formModel.mutiRecommender,
          _tokenName: token._tokenName,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('/eweb-invest.InvestProductCancle.do', {
          ...params
        }).then(res => {
          res._JnlStatus = res._processState
          res._jnlNo = res._jnlNo
          res.transDate = res._transTime
          this.$router.push({
            name: 'financialCancelRes',
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
        name: 'myFinancial',
        params: {
          activeName: 'agencyTransaction',
          isFromPrdSearch: 'true'
        }
      })
    }
  }
}
</script>
