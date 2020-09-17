<template>
  <div>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              :msgs="msgs"
              @reset="reset"
              @submit="submit">
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'comBillInfoQuery',
  data () {
    return {
      payerAccNoList: [], // 付款账户信息列表
      formModel: {
        theDay: '',
        account: 0,
        stdQryCont: '01',
        stdSendFlg: '01',
        stdDrwrNam: '',
        stdAccpNam: '',
        stdBegIssDate: '',
        stdEndIssDate: '',
        stdBegDueDate: '',
        stdEndDueDate: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          account: [{ required: true, message: '选择账户', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '当日日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'theDay'
              },
              {
                'disabled': false,
                'label': '选择账户',
                'type': 'select',
                'options': [],
                trans: { value: 'payerAcNoShow' },
                'key': 'account'
              },
              {
                'disabled': false,
                'label': '查询类型',
                'type': 'select',
                'options': [
                  { 'value': '出票登记', 'key': '01' },
                  { 'value': '承兑', 'key': '02' },
                  { 'value': '收票', 'key': '03' },
                  { 'value': '撤票', 'key': '04' },
                  { 'value': '背书', 'key': '05' },
                  { 'value': '贴现', 'key': '06' },
                  { 'value': '背书保证', 'key': '12' },
                  { 'value': '出票人保证', 'key': '14' },
                  { 'value': '承兑人保证', 'key': '13' },
                  { 'value': '质押', 'key': '15' },
                  { 'value': '质押解除', 'key': '16' },
                  { 'value': '提示付款', 'key': '17' },
                  { 'value': '预期提示付款', 'key': '18' },
                  { 'value': '追索通知', 'key': '19' },
                  { 'value': '清偿确认', 'key': '20' }
                  // { 'value': '追索清偿签收通知', 'key': '21' }
                ],
                'changeEventName': 'selectStatus',
                'key': 'stdQryCont'
              },
              {
                'disabled': false,
                'label': '发起方标志',
                'type': 'select',
                'options': [
                  { 'value': '发起方', 'key': '01' },
                  { 'value': '签收方', 'key': '02' }
                ],
                'key': 'stdSendFlg'
              },
              {
                'disabled': false,
                'label': '出票人名称',
                'type': 'input',
                'key': 'stdDrwrNam'
              },
              {
                'disabled': false,
                'label': '承兑人名称',
                'type': 'input',
                'key': 'stdAccpNam'
              },
              {
                'disabled': false,
                'label': '出票日期区间',
                'type': 'dateArea',
                firstKey: 'stdBegIssDate',
                secondKey: 'stdEndIssDate',
                valueFormat: 'yyyyMMdd'
              },
              {
                'disabled': false,
                'label': '到期日期区间',
                'type': 'dateArea',
                firstKey: 'stdBegDueDate',
                secondKey: 'stdEndDueDate',
                valueFormat: 'yyyyMMdd'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: []
    }
  },
  methods: {
    submit (data) {
      const params = {
        stdAppAcct: this.payerAccNoList[data.account].acNo,
        stdQryCont: data.stdQryCont,
        stdSendFlg: data.stdSendFlg,
        pageSize: 20,
        pageIndex: 1,
        stdBegIssDate: data.stdBegIssDate, // 起始出票日期
        stdEndIssDate: data.stdEndIssDate, // 截止出票日期
        stdBegDueDate: data.stdBegDueDate, // 起始到期日
        stdEndDueDate: data.stdEndDueDate, // 截止到期日
        stdDrwrNam: data.stdDrwrNam, // 出票人名称
        stdAccpNam: data.stdAccpNam // 承兑人名称
      }
      httpPost('/eweb-edraft.BillOperateResultQry.do', params).then(res => {
        if (res.list.length > 0) {
          this.$router.push({
            name: 'billInfoQueryList',
            params: {
              res,
              acNo: this.payerAccNoList[data.account].acNo,
              params
            }
          })
        } else {
          this.$msg('当前条件查询无数据!!!')
        }
      }).catch(err => {
        console.error(err)
      })
    },
    reset (res) {
      res.stdBegIssDate = ''
      res.stdEndIssDate = ''
      res.stdBegDueDate = ''
      res.stdEndDueDate = ''
      res = this.formModel
    },
    // 账户查询
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[1].options = this.payerAccNoList
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.formModel.theDay = util.standardDate(new Date())
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
