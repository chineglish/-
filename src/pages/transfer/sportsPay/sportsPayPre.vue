<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        :msgs="promptList"
        @selectAcc="selectAcc"
        @selectlottery="selectlottery"
        @reset="reset"
        @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
        @changeUp="changeUp"
        @submit="submit">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 *@name: 体彩缴费录入
 * @author: 梁文彬
 * @date: 2019-12-17
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: 'sportsPayPre',
  data () {
    return {
      titleData: ['转账汇款', '体彩缴费'],
      promptList: [
        '1.如果交易出现异常情况，请立即查询“账户明细”确认交易是否成功。'
      ],
      formModel: {
        payArea: '大连',
        payItem: '体彩缴费',
        chargeUnit: '大连体彩中心',
        lotteryType: '',
        betStationNum: '',
        payerAcNo: '',
        balance: '',
        amount: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          lotteryType: [{ required: true, message: '彩票类型', trigger: 'change' }],
          betStationNum: [{ required: true, message: '投注站编号', trigger: 'change' }],
          payerAcNo: [{ required: true, message: '缴款账户', trigger: 'change' }],
          amount: [{ required: true, message: '缴费金额', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '缴费地区',
                'type': 'text',
                'key': 'payArea'
              }, {
                'disabled': true,
                'label': '缴费项目',
                'type': 'text',
                'key': 'payItem'
              }, {
                'disabled': true,
                'label': '收费单位',
                'type': 'text',
                'key': 'chargeUnit'
              }, {
                'disabled': false,
                'label': '彩票类型',
                'type': 'select',
                'options': [
                  { 'value': '电脑彩票', 'key': '0120000501' }
                ],
                'changeEventName': 'selectlottery',
                'key': 'lotteryType'
              }, {
                'disabled': false,
                'label': '投注站编号',
                'type': 'input',
                'key': 'betStationNum'
              }, {
                'disabled': false,
                'label': '缴款账户',
                'type': 'select',
                'options': [],
                'changeEventName': 'selectAcc',
                'key': 'payerAcNo'
              }, {
                'disabled': true,
                'label': '可用余额',
                'type': 'text',
                textType: 'shy',
                'key': 'balance',
                formatter: (name, value) => util.formatCurrency(value)
              }, {
                'disabled': false,
                'label': '缴款金额',
                'type': 'input',
                'key': 'amount',
                inputType: 'money',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                blurEventName: 'formatCurrency',
                'content': '(元)',
                'inputEventName': 'changeUp'
                // maxlength: 9
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  methods: {
    formatCurrency (value) {
      // this.formModel.amount = util.formatCurrency(value)
    },
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    /**
     * 将金额数据转换成大写
     */
    changeUp (res) {
      res.amount = util.limitInputMoney(res.amount)
      res.capitalMoney = util.getMoneyHanzi(res.amount)
    },
    submit (data) {
      const [accNo] = (data.payerAcNo || '').split('-')
      const params = {
        lotteryType: data.lotteryType,
        lotteryCenterNumber: data.betStationNum,
        payerAcNo: accNo,
        amount: data.amount
      }
      httpPost('eweb-transfer.LotteryPayFeeConfirm.do', params).then(res => {
        this.$router.push({
          name: 'sportsPayConf',
          params: {
            ...data,
            ...params,
            _Data2Sign: res._Data2Sign,
            _dataMapKey: res._dataMapKey,
            _authenticateType: res._authenticateType,
            cifName: res.cifName,
            cifAddrs: res.cifAddrs }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    reset (res) {
      res.amountcopy = ''
      this.formModel = res
      this.accNoListQry()
    },
    selectAcc (res) {
      this.balenceQry(res)
    },
    selectlottery (res) {
      switch (res.lotteryType) {
        case '0':
          this.formModel.lotteryType = '电脑彩票'
          break
      }
    },
    /**
     * 付款账户列表查询
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { transCode: 'LotteryPayFee' }).then(res => {
        const list = (res.AcList || []).map(item => ({ value: util.getPayerAccount(item), key: item.acNo + '-' + item.subAcNo }))
        this.formConfigJson.formItems[0].group[5].options = list
        this.formModel.payerAcNo = res.AcList[0].acNo + '-' + res.AcList[0].subAcNo
        this.selectAcc(this.formModel)
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 查询可用余额
     */
    balenceQry (data) {
      const acNos = data.payerAcNo.split('-')
      const params = {
        payerAcNo: acNos[0],
        payerSubAcNo: acNos[1]
      }
      httpPost('eweb-acmgmt.AccountInfoQuery.do', params).then(res => {
        this.formModel = { ...this.formModel, ...data, balance: res.availBal }
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.accNoListQry()
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
</style>
