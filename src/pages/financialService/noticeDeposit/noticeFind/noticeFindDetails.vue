<template>
  <d2-container>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @back="onBack">
      </m-new-form>
    </div>
  </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { currency_type, acc_status, limit_type } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'noticeFindDetails',
  data () {
    return {
      formModel: {
        serial: '',
        acName: '',
        lDAcNo: '',
        subAcNo: '',
        currencyCode: '',
        actBal: '',
        struRates: '',
        openAmount: '',
        openDate: '',
        depositTerm: '',
        cashFlag: '',
        actStatus: '',
        limitType: ''
      },
      breadData: ['理财服务', '通知存款', '通知存款账户查询详情'],
      routeParams: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      formConfigJson: {
        rules: {},
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '证实书（存单）编号',
                'key': 'serial'
              }
            ]
          },
          {
            formWidth: '50%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '账户名称',
                'key': 'acName'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '账号',
                'key': 'lDAcNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '子账户序号',
                'key': 'subAcNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '币种',
                'key': 'currencyCode'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '当前金额',
                'key': 'actBal',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '年利率',
                'key': 'zhxililv',
                formatter: (key, value) => util.formatInterestRate(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '开户金额',
                'key': 'openAmount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '开户日期',
                'key': 'qixiriqi',
                formatter: (key, value) => util.separationDate(value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '通知类型',
                'key': 'depositTerm'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '钞汇标志',
                'key': 'cashFlag'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '账户状态',
                'key': 'actStatus'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '限制类型',
                'key': 'limitType',
                formatter: (key, value) => util.handleEnums(limit_type, value)
              }
            ]
          }
        ]
      },
      rmbType: {
        '0': '现钞',
        '1': '现汇',
        'N': '无'
      },
      accType: {
        '0': '对公一般账户',
        '1': '卡',
        '2': '活期一本通',
        '3': '定期一本通',
        '4': '活期存折',
        '5': '存单',
        '7': '股金账户',
        '8': '贷款账户',
        '9': '内部账',
        'A': '组合账户',
        'B': '一号通 ',
        'F': '个人一本通存折',
        'G': '国债',
        'N': '电子储蓄国债',
        'X': '待销账',
        'K': '会计账户',
        'D': '电子账户',
        'J': '快捷账户'
      },
      messageType: {
        '1D': '一天',
        '7D': '七天'
      }
    }
  },
  methods: {
    onSubmit () {},
    getData () {
      let _this = this
      httpPost('eweb-invest.CallDepositQuery.do', { acNo: _this.$route.params.lDAcNo }).then(res => {
        _this.formModel = res.acctInfoList[0]
        _this.formModel.depositTerm = _this.formatter(_this.messageType, _this.formModel.depositTerm)
        _this.formModel.cashFlag = _this.formatter(_this.rmbType, _this.formModel.cashFlag)
        _this.formModel.actStatus = _this.formatter(acc_status, _this.formModel.actStatus)
        _this.formModel.currencyCode = _this.formatter(currency_type, _this.formModel.currencyCode)
      })
    },
    onBack (data) {
      this.$router.push({
        name: 'noticeFinding',
        params: this.$route.params
      })
    },
    formatter (object, key) {
      if (Array.isArray(object)) {
        let arr = object.find(item => item.value === key)
        return arr.label
      } else {
        return object[key]
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
