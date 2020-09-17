<template>
  <div id="financialPurchForm">
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
                @selectAcc="selectAcc"
                @submit="onSubmit"
                @reset="reset"
                @changeUp="changeUp">
		<span slot="tip" class="fs12" style="color: #666;">起购金额{{this.formModel.ofirstAmt}}万元 递增金额{{this.formModel.oappAmt}}万元</span>
    </m-new-form>
  </div>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: '',
  data: function () {
    return {
      data: ['理财服务', '理财产品', '理财产品购买'],
      payerAccNoList: [], // 付款账号信息列表
      stepsActive: 0,
      formModel: {},
      formConfigJson: {
        rules: {
          amount: [{ required: true, message: '请填写购买金额', trigger: 'change' }],
          payerAcNo: [{ required: true, message: '请选择转出账户', trigger: 'change' }],
          mutiRecommender: [{ required: false, message: '请填写正确的推荐人信息', trigger: 'change' }]
        },
        formItems: [{
          formWidth: '100%',
          labelWidth: '30%',
          title: '申购信息',
          group: [
            {
              'disabled': true,
              'label': '产品名称',
              'type': 'text',
              'key': 'prdName'
            },
            {
              'disabled': true,
              'label': '产品编码',
              'type': 'text',
              'key': 'prdCode',
              show: false
            },
            {
              'disabled': false,
              'label': '购买金额(元)',
              'type': 'input',
              'key': 'amount',
              // maxlength: 13,
              inputType: 'money',
              keydownEventName: 'limitMoneyInputKeyDown',
              // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
              'inputEventName': 'changeUp',
              'suffixSlotName': 'tip'
            },
            {
              'disabled': true,
              'label': '金额大写',
              'type': 'text',
              'key': 'bigAmount'
            },
            {
              'disabled': false,
              'label': '转出账户',
              'type': 'select',
              'options': [],
              'key': 'payerAcNo',
              trans: { value: 'acNoLabel', key: 'acNo' },
              'changeEventName': 'selectAcc'
            },
            {
              'disabled': false,
              'label': '募集期',
              'type': 'text',
              'key': 'ipoDate',
              show: false
            },
            {
              'disabled': false,
              'label': '冷静期',
              'type': 'text',
              'key': 'ipoEndDate',
              show: false
            },
            {
              'disabled': true,
              'label': '可用余额(元)',
              'type': 'text',
              textType: 'shy',
              'key': 'availBal',
              formatter: (row, value) => util.formatCurrency(value)
            },
            { label: '起息日', type: 'text', key: 'incomeDate', show: false },
            { label: '到期日', type: 'text', key: 'incomeEndDate', show: false },
            {
              'disabled': false,
              'label': '推荐人编号',
              'type': 'input',
              'key': 'mutiRecommender'
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
  methods: {
    // 拼接净值和净值日期
    net (value) {
      return value + '(' + this.formModel.apNavDate + ')'
    },
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.amount = util.limitInputMoney(res.amount)
      res.bigAmount = util.getMoneyHanzi(res.amount)
    },
    // 提交资料
    onSubmit (formModel) {
      if (Number(formModel.availBal) >= Number(formModel.amount)) {
        if (Number(formModel.amount) >= formModel.ofirstAmt * 10000) {
          if (((Number(formModel.amount) - formModel.ofirstAmt * 10000) % (formModel.oappAmt * 10000)) === 0 || Number(formModel.oappAmt) === 0) {
            if (Number(formModel.orgTotUseLimit) >= Number(formModel.amount)) {
              let params = {
                payerAcNo: this.formModel.payerAcNo,
                prdCode: formModel.prdCode,
                amount: formModel.amount,
                prdName: formModel.prdName,
                netWorth: formModel.netWorth,
                apNavDate: formModel.apNavDate,
                modelComment: formModel.modelComment,
                weekRate: formModel.weekRate,
                ofirstAmt: formModel.ofirstAmt * 10000,
                bigAmount: formModel.bigAmount,
                prdTemplate: formModel.prdTemplate,
                mutiRecommender: formModel.mutiRecommender,
                incomeDate: formModel.incomeDate,
                incomeEndDate: formModel.incomeEndDate,
                interestDays: formModel.interestDays,
                riskLevel: formModel.riskLevel,
                prdRegisterCode: formModel.prdRegisterCode,
                ipoStartDate: formModel.ipoStartDate,
                ipoEndDate: formModel.ipoEndDate,
                ipoDate: formModel.ipoDate
              }
              httpPost('/eweb-invest.InvestProductBuyConfirm.do', {
                ...params
              }).then(conf => {
                let paramsData = {
                  formModel: Object.assign(conf, params),
                  data: formModel
                }
                paramsData = typeof (this.$route.params.activeName) === 'undefined' ? Object.assign(paramsData, { active: this.$route.params.active }) : Object.assign(paramsData, { activeName: this.$route.params.activeName, isFromPrdSearch: this.$route.params.isFromPrdSearch })
                this.$router.push({
                  name: 'financialPurchConfirm',
                  params: paramsData
                })
              })
            } else {
              this.$msg('购买金额不得大于理财产品剩余可用余额！')
            }
          } else {
            this.$msg('购买金额必须是递增金额的整数倍！')
          }
        } else {
          this.$msg('购买金额不得小于起购金额！')
        }
      } else {
        this.$msg('购买金额不得大于可用账号可用余额！')
      }
    },
    reset () {
      let params = {
        data: this.formModel
      }
      params = typeof (this.$route.params.activeName) === 'undefined' ? Object.assign(params, { active: this.$route.params.active }) : Object.assign(params, { activeName: this.$route.params.activeName, isFromPrdSearch: this.$route.params.isFromPrdSearch })
      if (this.formModel.prdTemplate === '1300') {
        this.$router.push({
          name: 'indexTOne',
          params: params
        })
      } else {
        this.$router.push({
          name: 'financialPurchase',
          params: params
        })
      }
    },
    // 获取签约账号列表
    getAccountList () {
      httpPost('/eweb-invest.InvestAccountListQuery.do').then(res => {
        res.list.forEach(item => {
          item.acNoLabel = util.getPayerAccount(item)
        })
        this.payerAccNoList = res.list || []
        this.formConfigJson.formItems[0].group[4].options = this.payerAccNoList
        this.formModel.payerAcNo = this.payerAccNoList[0].acNo
        this.selectAcc(this.formModel)
      })
    },
    selectAcc (data) {
      let obj = this.payerAccNoList.find(item => data.payerAcNo === item.acNo)
      const acNo = obj.acNo
      const subAcNo = obj.subAcNo
      const params = {
        payerAcNo: acNo,
        payerSubAcNo: subAcNo
      }
      httpPost('/eweb-acmgmt.AccountInfoQuery.do', params).then(res => {
        this.$set(this.formModel, 'availBal', res.availBal)
      }).catch(e => {
        this.formModel.availBal = '0.00'
      })
    }
  },
  created () {
    this.formModel = this.$route.params.data
    // 募集期拼接
    // this.formModel.ipoStartDate = this.formModel.ipoStartDate + '-' + this.formModel.ipoEndDate
    if (this.formModel.prdTemplate === '1303' || this.formModel.prdTemplate === '1102') {
      this.formConfigJson.formItems[0].group.splice(-1, 0, {
        'disabled': true,
        'label': '业绩比较基准',
        'type': 'text',
        'key': 'modelComment',
        'content': ''
      })
      this.formConfigJson.formItems[0].group.splice(-1, 0, {
        label: '投资周期期限', type: 'text', key: 'interestDays', content: '天'
      })
    }
    if ((this.formModel.prdTemplate === '1300')) {
      this.formConfigJson.formItems[0].group.splice(-1, 0, {
        'disabled': true,
        'label': '七日年化收益率',
        'type': 'text',
        'key': 'weekRate',
        'content': ''
      })
      this.formConfigJson.formItems[0].group.splice(-1, 0, {
        'disabled': true,
        'label': '单位净值',
        'type': 'text',
        'key': 'netWorth',
        formatter: (row, value) => this.net(value)
      })
      this.formConfigJson.formItems[0].group.splice(-1, 0, {
        label: '投资周期期限', type: 'text', key: 'interestDays', formatter: (row, value) => '无固定期限'
      })
    }
    if (this.formModel.prdTemplate === '1303' || this.formModel.prdTemplate === '1102') {
      this.formConfigJson.formItems[0].group[1].show = true
      this.formConfigJson.formItems[0].group[5].show = true
      this.formConfigJson.formItems[0].group[6].show = true
      this.formConfigJson.formItems[0].group[8].show = true
      this.formConfigJson.formItems[0].group[9].show = true
    }
    this.getAccountList()
  }
}
</script>
<style lang="scss" scoped>

</style>
