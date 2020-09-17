<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <el-steps :active="stepsActive" align-center>
      <el-step title="信息录入"></el-step>
      <el-step title="交易确认"></el-step>
      <el-step title="提交结果"></el-step>
    </el-steps>
    <m-new-form :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                :msgs="msgs"
                @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
                @changeUp="changeUp"
                @submit="onSubmit"
                @reset="reset">
    </m-new-form>
  </div>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: 'financialRedeemForm',
  data: function () {
    return {
      data: ['理财服务', '理财产品', '产品赎回'],
      stepsActive: 0,
      formModel: {},
      formConfigJson: {
        rules: {
          portion: [
            { required: true, message: '请填写赎回份额', trigger: 'submit' }
          ]
        },
        formItems: [{
          formWidth: '100%',
          labelWidth: '50%',
          title: '',
          group: [
            {
              'disabled': true,
              'label': '产品名称',
              'type': 'text',
              'key': 'prdName'
            },
            {
              'disabled': true,
              'label': '产品代码',
              'type': 'text',
              'key': 'prdCode'
            },
            {
              'disabled': true,
              'label': '可用份额(份)',
              'type': 'text',
              'key': 'vol',
              formatter: (row, cellValue) => util.formatCurrency(cellValue)
            },
            {
              'disabled': true,
              'label': '交易账户',
              'type': 'text',
              'key': 'payeeAcNo'
            },
            {
              'disabled': false,
              'label': '赎回份额(份)',
              'type': 'input',
              'key': 'portion',
              // maxlength: 13,
              inputType: 'money',
              keydownEventName: 'limitMoneyInputKeyDown',
              // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
              'inputEventName': 'changeUp'
            }
          ]
        }]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'reset' }],
      msgs: []
    }
  },
  mounted: function () {
    this.formModel = this.$route.params.data
  },
  methods: {
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.portion = util.limitInputMoney(res.portion)
    },
    onSubmit (data) {
      if (Number(data.portion) > Number(this.formModel.vol)) {
        this.$msg('赎回份额不能超过可用份额！')
      } else {
        let params = {
          payeeAcNo: this.formModel.payeeAcNo,
          prdCode: this.formModel.prdCode,
          portion: data.portion,
          // largRedFlag: '0',
          prdName: this.formModel.prdName,
          prdTemplate: this.formModel.prdTemplate,
          vol: this.formModel.vol
        }
        httpPost('/eweb-invest.InvestProductRedeemConfirm.do', {
          ...params
        }).then(conf => {
          Object.assign(conf, params)
          this.$router.push({
            name: 'financialRedeemConfirm',
            params: conf
          })
        })
      }
    },
    // 返回
    reset () {
      this.$router.push('myFinancial/true')
    }
  },
  components: {}
}
</script>
