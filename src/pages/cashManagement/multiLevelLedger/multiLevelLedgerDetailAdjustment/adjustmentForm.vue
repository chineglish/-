<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @submit="onSubmit"
      @changeInNum="changeInNum"
      @reset="reset">
    </m-new-form>
  </div>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import { currency_type, trans_TType } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'adjustmentForm',
  data: function () {
    return {
      data: ['现金管理', '多级账簿', '多级账簿明细调账'],
      acList: [],
      bookIntoQryList: [],
      formModel: {
        acNo: '', // 账户
        currencyCode: '', // 币种
        asAcNo: '', // 账簿号
        acName: '', // 户名
        asAcName: '', // 账簿名
        limitAsAcNo: '', // 调入账簿号
        asInAcName: '', // 调入账簿名
        bigNum: '', // 金额大写
        serialNo: '', // 流水
        trsAcDate: '', // 交易时间
        amount: '', // 金额
        reserved2: '', // 手续费
        purpose: '', // 原因
        trsType: '' // 交易类型
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          limitAsAcNo: [{ required: true, message: '请输入调入账簿号', trigger: 'submit' }],
          purpose: [{ required: true, message: '请输入调账原因', trigger: 'submit' }]
        },
        formItems: [{
          formWidth: '50%',
          // labelWidth: '30%',
          group: [
            {
              'disabled': false,
              'label': '流水号',
              'type': 'text',
              'key': 'serialNo'
            },
            {
              'disabled': false,
              'label': '交易日期',
              'type': 'text',
              'key': 'trsAcDate',
              formatter: (key, value) => util.separationDate(value)
            },
            {
              'disabled': false,
              'label': '账户',
              'type': 'text',
              'key': 'acNo'
            },
            {
              'disabled': false,
              'label': '户名',
              'type': 'text',
              'key': 'acName'
            },
            {
              'disabled': false,
              'label': '币种',
              'type': 'text',
              'key': 'currencyCode'
            },
            {
              'disabled': false,
              'label': '  ',
              'type': 'text'
            },
            {
              'disabled': false,
              'label': '调出账簿号',
              'type': 'text',
              'key': 'asAcNo'
            },
            {
              'disabled': false,
              'label': '调出账簿名',
              'type': 'text',
              'key': 'asAcName'
            },
            {
              'disabled': false,
              'label': '金额',
              'type': 'text',
              'key': 'amount'
            },
            {
              'disabled': false,
              'label': '金额大写',
              'type': 'text',
              'key': 'bigNum'
            },
            // {
            //   'disabled': false,
            //   'label': '手续费',
            //   'type': 'text',
            //   'key': 'reserved2'
            // },
            {
              'disabled': false,
              'label': '  ',
              'type': 'text'
            },
            {
              'disabled': false,
              'label': '调入账簿号',
              'type': 'select',
              'options': [],
              'changeEventName': 'changeInNum',
              'trans': { 'value': 'limitAsAcNo', 'key': 'limitAsAcNo' },
              'key': 'limitAsAcNo'
            },
            {
              'disabled': false,
              'label': '调入账簿名',
              'type': 'text',
              'key': 'asInAcName'
            },
            {
              'disabled': false,
              'label': '调账原因',
              'type': 'input',
              'key': 'purpose'
            },
            {
              'disabled': false,
              'label': '交易类型',
              'type': 'text',
              'key': 'trsType'
            }
          ]
        }]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  mounted: function () {
  },
  methods: {
    changeInNum (res, obj) {
      if (res.asAcNo === res.limitAsAcNo) {
        this.$confirm('调入账簿号和调出账簿号不能相同', '提示', {
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        res.limitAsAcNo = ''
        res.asInAcName = ''
      } else {
        res.asInAcName = obj.asAcName
      }
    },
    // 提交
    onSubmit (data) {
      let params = {
        acNo: data.acNo,
        outAsAcNo: data.asAcNo,
        serialNo: data.serialNo,
        trsDate: data.trsAcDate,
        amount: data.amount,
        feeAmt: data.reserved2,
        purpose: data.purpose,
        inAsAcNo: data.limitAsAcNo,
        asAcName: data.asAcName,
        bigNum: data.bigNum,
        asInAcName: data.asInAcName,
        acName: data.acName
      }
      if (this.$route.params.confirmFlag === 1) {
        params = { ...params,
          currencyCode: this.$route.params.currencyCode,
          trsType: this.$route.params.trsType }
      } else {
        params = { ...params,
          currencyCode: this.$route.params.data.currencyCode,
          trsType: this.$route.params.data.trsType }
      }
      httpPost('/eweb-cash.MultistageBookDetailAdjustConfirm.do', params).then(res => {
        this.$router.push({
          name: 'adjustmentConfirm',
          params: { ...params,
            _Data2Sign: res._Data2Sign,
            _authenticateType: res._authenticateType,
            acList: this.acList,
            accountNo: this.formModel.accountNo,
            _dataMapKey: res._dataMapKey,
            transType: this.formModel.transType,
            ledgerNum: this.formModel.ledgerNum,
            startDate: this.formModel.startDate,
            endDate: this.formModel.endDate,
            bookIntoQryList: this.bookIntoQryList }
        })
      }).catch(e => {
        console.error(e)
      })
    },
    // 返回
    reset () {
      this.$router.push({
        name: 'multiLevelLedgerDetailAdjustment',
        params: { ...this.$route.params, pageFlag: 1 }
      })
    },
    BookInfoQry () {
      this.acList = this.$route.params.acList
      this.bookIntoQryList = this.$route.params.bookIntoQryList
      this.formConfigJson.formItems[0].group[12].options = this.bookIntoQryList
    }
  },
  created () {
    this.BookInfoQry()
    // 判断是提交还是返回
    if (this.$route.params.confirmFlag === 1) {
      this.formModel.acNo = this.$route.params.acNo
      this.formModel.currencyCode = util.handleEnums(currency_type, this.$route.params.currencyCode)
      this.formModel.acName = this.$route.params.acName
      this.formModel.asAcName = this.$route.params.asAcName
      this.formModel.asAcNo = this.$route.params.outAsAcNo
      this.formModel.serialNo = this.$route.params.serialNo
      this.formModel.trsAcDate = this.$route.params.trsDate
      this.formModel.reserved2 = this.$route.params.feeAmt
      this.formModel.trsType = util.handleEnums(trans_TType, this.$route.params.trsType)
      this.formModel.amount = this.$route.params.amount
      this.formModel.bigNum = this.$route.params.bigNum
      this.formModel.limitAsAcNo = this.$route.params.inAsAcNo
      this.formModel.asInAcName = this.$route.params.asInAcName
      this.formModel.purpose = this.$route.params.purpose
      this.formModel.accountNo = this.$route.params.accountNo
      this.formModel.transType = this.$route.params.transType
      this.formModel.ledgerNum = this.$route.params.ledgerNum
      this.formModel.startDate = this.$route.params.startDate
      this.formModel.endDate = this.$route.params.endDate
    } else {
      this.formModel.acNo = this.$route.params.data.acNo
      this.formModel.currencyCode = util.handleEnums(currency_type, this.$route.params.data.currencyCode)
      this.formModel.acName = this.$route.params.data.acName
      this.formModel.asAcName = this.$route.params.data.asAcName
      this.formModel.asAcNo = this.$route.params.data.asAcNo
      this.formModel.serialNo = this.$route.params.data.serialNo
      this.formModel.trsAcDate = this.$route.params.data.trsAcDate
      this.formModel.reserved2 = this.$route.params.data.reserved2
      this.formModel.accountNo = this.$route.params.accountNo
      this.formModel.transType = this.$route.params.transType
      this.formModel.ledgerNum = this.$route.params.ledgerNum
      this.formModel.startDate = this.$route.params.startDate
      this.formModel.endDate = this.$route.params.endDate
      this.formModel.trsType = util.handleEnums(trans_TType, this.$route.params.data.trsType)
      let crdrFlag = this.$route.params.data.crdrFlag
      if (crdrFlag === 'D') {
        this.formModel.amount = this.$route.params.data.payAmt
      }
      if (crdrFlag === 'C') {
        this.formModel.amount = this.$route.params.data.rcvAmt
      }
      this.formModel.bigNum = util.getMoneyHanzi(this.formModel.amount)
    }
  },
  components: {}
}
</script>
