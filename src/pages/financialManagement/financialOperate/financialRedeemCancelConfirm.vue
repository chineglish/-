<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <el-steps :active="stepsActive" align-center>
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
      data: ['理财服务', '理财产品', '赎回撤销'],
      stepsActive: 0,
      formStruction: {
        groups: [
          {
            formItems: [
              { label: '产品名称', fieldName: 'prdName' },
              { label: '产品代码', fieldName: 'prdCode' },
              // { label: '可用份额(份)',
              //   fieldName: 'vol',
              //   formatter: (row, cellValue) => util.formatCurrency(cellValue) },
              { label: '交易份额', fieldName: 'vol', formatter: (row, cellValue) => util.formatCurrency(cellValue) },
              { label: '撤销份额(份)',
                fieldName: 'portion',
                formatter: (row, cellValue) => util.formatCurrency(cellValue) },
              { label: '份额大写', fieldName: 'bigAmount' },
              { label: '业绩比较基准', fieldName: 'modelComment', show: false },
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
    if (this.formModel.prdTemplate === '1300') {
      this.formStruction.groups[0].formItems[6].show = true
      this.formStruction.groups[0].formItems[7].show = true
    } else {
      this.formStruction.groups[0].formItems[5].show = true
    }
    this.formModel.bigAmount = util.getMoneyHanzi(this.formModel.portion)
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
          vol: this.formModel.vol,
          prdTemplate: this.formModel.prdTemplate,
          modelComment: this.formModel.modelComment,
          netWorth: this.formModel.netWorth,
          weekRate: this.formModel.weekRate,
          portion: this.formModel.portion,
          mutiRecommender: this.formModel.mutiRecommender,
          _dataMapKey: this.$route.params._dataMapKey,
          prdName: this.formModel.prdName,
          _tokenName: token._tokenName,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('/eweb-invest.InvestProductRedCancle.do', {
          ...params
        }).then(res => {
          res._JnlStatus = res._processState
          res._jnlNo = res._jnlNo
          res.transDate = res._transTime
          this.$router.push({
            name: 'financialRedeemCancelRes',
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
