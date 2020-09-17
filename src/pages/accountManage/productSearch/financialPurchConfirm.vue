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
import util from '@/libs/util.js'

export default {
  name: 'financialPurchConfirm',
  data: function () {
    return {
      data: ['理财服务', '理财产品', '产品购买确认'],
      stepsActive: 1,
      formStruction: {
        groups: [
          {
            formItems: [
              { label: '产品名称', fieldName: 'prdName' },
              { label: '产品编码', fieldName: 'prdCode', show: false },
              { label: '单位净值', fieldName: 'netWorth', formatter: (row, cellValue) => this.net(cellValue), show: false },
              { label: '起购金额', fieldName: 'ofirstAmt', content: '万元' },
              { label: '购买金额(元)', fieldName: 'amount', formatter: (row, cellValue) => util.formatCurrency(cellValue) },
              { label: '金额大写', fieldName: 'bigAmount' },
              { label: '转出账号', fieldName: 'payerAcNo' },
              {
                label: '募集期', fieldName: 'ipoDate', show: false
              },
              {
                label: '冷静期', fieldName: 'ipoEndDate', show: false
              },
              { label: '起息日', fieldName: 'incomeDate', show: false },
              { label: '到期日', fieldName: 'incomeEndDate', show: false },
              { label: '业绩比较基准', fieldName: 'modelComment', show: false },
              { label: '七日年化收益率', fieldName: 'weekRate', show: false },
              { label: '投资周期期限', fieldName: 'interestDays', show: false, content: '天' },
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
  methods: {
    // 拼接净值和净值日期
    net (value) {
      return value + '(' + this.formModel.apNavDate + ')'
    },
    printHandler (formModel) {
      httpPost('eweb-common.GenToken.do').then(res => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params.formModel._Data2Sign, _authenticateType: this.$route.params.formModel._authenticateType })
        let params = {
          payerAcNo: formModel.payerAcNo,
          prdCode: formModel.prdCode,
          amount: formModel.amount,
          prdName: formModel.prdName,
          netWorth: formModel.netWorth,
          apNavDate: formModel.apNavDate,
          modelComment: formModel.modelComment,
          weekRate: formModel.weekRate,
          ofirstAmt: formModel.ofirstAmt * 10000,
          prdTemplate: formModel.prdTemplate,
          mutiRecommender: formModel.mutiRecommender,
          _tokenName: res._tokenName,
          _dataMapKey: this.$route.params.formModel._dataMapKey,
          _authenticateTypeChoose: this.$route.params.formModel._authenticateType ? this.$route.params.formModel._authenticateType[0] : '',
          CSIISignature: singMsg,
          incomeDate: formModel.incomeDate,
          incomeEndDate: formModel.incomeEndDate,
          interestDays: formModel.interestDays
        }
        httpPost('/eweb-invest.InvestProductBuy.do', {
          ...params
        }).then(res => {
          // res['payerAcNo'] = formModel.payerAcNo
          res._JnlStatus = res._processState
          res._jnlNo = res._jnlNo
          res.transDate = res._transTime
          this.$router.push({
            name: 'financialPurchRes',
            params: ({
              data: this.formModel,
              res: res
            })
          })
        }).catch(() => {
          this.$store.dispatch('common/findPTokenName')
        })
      })
    },
    backHandler () {
      let params = {
        data: this.$route.params.data
      }
      params = typeof (this.$route.params.activeName) === 'undefined' ? Object.assign(params, { active: this.$route.params.active }) : Object.assign(params, { activeName: this.$route.params.activeName, isFromPrdSearch: this.$route.params.isFromPrdSearch })
      this.$router.push({
        name: 'financialPurchForm',
        params: params
      })
    }
  },
  created () {
    this.formModel = this.$route.params.formModel
    // 募集期拼接
    // this.formModel.ipoStartDate = this.formModel.ipoStartDate + '-' + this.formModel.ipoEndDate
    this.formModel.ofirstAmt = Number(this.formModel.ofirstAmt) / 10000
    // if (this.formModel.prdTemplate === '1300') {
    //   this.formStruction.groups[0].formItems.splice(-1, 0, {
    //     label: '七日年化收益率',
    //     fieldName: 'weekRate',
    //     content: ''
    //   })
    // this.formConfigJson.formItems[0].group.splice(-1, 0, {
    //   'disabled': true,
    //   'label': '单位净值',
    //   'type': 'text',
    //   'key': 'netWorth',
    //   formatter: (row, value) => this.net(value)
    // })
    // }
    // if (this.formModel.prdTemplate === '1303' || this.formModel.prdTemplate === '1102') {
    //   this.formStruction.groups[0].formItems.splice(-1, 0, {
    //     label: '业绩比较基准',
    //     fieldName: 'modelComment',
    //     content: ''
    //   })
    // }
    if (this.formModel.prdTemplate === '1300') {
      this.formStruction.groups[0].formItems[2].show = true
      this.formStruction.groups[0].formItems[12].show = true
    } else {
      this.formStruction.groups[0].formItems[1].show = true
      this.formStruction.groups[0].formItems[7].show = true
      this.formStruction.groups[0].formItems[8].show = true
      this.formStruction.groups[0].formItems[9].show = true
      this.formStruction.groups[0].formItems[10].show = true
      this.formStruction.groups[0].formItems[11].show = true
      this.formStruction.groups[0].formItems[13].show = true
    }
  }
}
</script>
