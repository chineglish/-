<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <div class="title">非税缴费</div>
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        :msgs="promptList"
        @selectAcc="selectAcc"
        @back="back"
        @submit="submit">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 *@name: 非税缴费录入
 * @author: 梁文彬
 * @date: 2019-12-17
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'noTaxPayPre',
  data () {
    return {
      payerAccNoList: [], // 付款账户信息列表
      titleData: ['转账汇款', '非税缴费'],
      promptList: [
        '1.该交易支持7×24小时缴费。',
        '2.我行不提供发票，如需发票请联系执收单位。'
      ],
      formModel: {
        payerAcNo: '',
        balance: '',
        payItem: '地方财政非税收入缴款',
        payCode: '',
        chgAgenName: '',
        chgAgenCode: '',
        payerAcName: '',
        payeeAcName: '',
        remark: '',
        amount: '',
        payStats: '',
        payerSubAcNo: ''
      },
      formConfigJson: {
        rules: {
          payerAcNo: [{ required: true, message: '付款账户', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '30%',
            group: [
              {
                'disabled': false,
                'label': '付款账户',
                'type': 'select',
                'options': [],
                'changeEventName': 'selectAcc',
                trans: { value: 'payerAcNoShow' },
                'key': 'payerAcNo'
              }, {
                'disabled': true,
                'label': '可用余额',
                'type': 'text',
                textType: 'shy',
                'key': 'balance'
              }, {
                'disabled': true,
                'label': '缴款项目',
                'type': 'text',
                'key': 'payItem'
              }, {
                'disabled': true,
                'label': '缴款码',
                'type': 'text',
                'key': 'payCode'
              }, {
                'disabled': true,
                'label': '执行单位名称',
                'type': 'text',
                'key': 'chgAgenName'
              }, {
                'disabled': true,
                'label': '执行单位编码',
                'type': 'text',
                'key': 'chgAgenCode'
              }, {
                'disabled': true,
                'label': '缴款人名称',
                'type': 'text',
                'key': 'payerAcName'
              }, {
                'disabled': true,
                'label': '收款人名称',
                'type': 'text',
                'key': 'payeeAcName'
              }, {
                'disabled': true,
                'label': '摘要',
                'type': 'text',
                'key': 'remark'
              }, {
                'disabled': true,
                'label': '缴款金额',
                'type': 'text',
                'key': 'amount'
              }, {
                'disabled': true,
                'label': '缴款状态',
                'type': 'text',
                'key': 'payStats'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    submit (data) {
      const accNo = this.payerAccNoList[data.payerAcNo].acNo
      const subAccNo = this.payerAccNoList[data.payerAcNo].subAcNo
      const params = {
        payCode: data.payCode,
        payerAcNo: accNo,
        amount: data.amount,
        payerName: data.payerAcNo.payerAcName,
        payerSubAcNo: subAccNo,
        remark: data.remark
      }
      httpPost('/eweb-transfer.PaymentPayInfoConfirm.do', params).then(res => {
        Object.assign(data, res)
        data.payStats = this.formModel.payStats
        this.$router.push({
          name: 'noTaxPayConf',
          params: data
        })
      }).catch(err => {
        console.error(err)
      })
    },
    back (data) {
      this.$router.push({
        name: 'noTaxPay',
        params: data
      })
    },
    /**
     * 交易账户获取
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { transCode: 'PaymentPayInfo' }).then(res => {
        this.payerAccNoList = res.AcList || []
        // this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        //   .map(item => ({ value: item.acNo + '/' + item.subAcNo + '/' + item.acName + '/' + item.acAlias, key: item.acNo + '-' + item.subAcNo }))
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.formModel.payerAcNo = 0
        this.selectAcc(this.formModel)
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 显示选择账户的余额
     */
    selectAcc (data) {
      const accNo = this.payerAccNoList[data.payerAcNo].acNo
      const subAccNo = this.payerAccNoList[data.payerAcNo].subAcNo
      httpPost('eweb-acmgmt.AccountInfoQuery.do', {
        payerAcNo: accNo,
        payerSubAcNo: subAccNo
      }).then(bal => {
        this.formModel.balance = bal.availBal
      }).catch(e => {
        console.error(e)
      })
    }
  },
  created () {
    this.accNoListQry()
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
      switch (this.formModel.payStats) {
        case '0':
          this.formModel.payStats = '未缴费'
          break
        case '1':
          this.formModel.payStats = '已缴费'
          break
        case '-1':
          this.formModel.payStats = '已退付'
          break
      }
    }
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
.title{
  height: 0;
  line-height: 30px;
  width: 150px;
  border-bottom: 30px solid #D41618;
  border-right: 37px solid transparent;
  border-top-left-radius: 5px;
  text-align: center;
  color: #ffffff;
}
</style>
