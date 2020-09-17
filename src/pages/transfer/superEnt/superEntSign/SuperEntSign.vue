<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
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
  name: 'SuperEntSign',
  data () {
    return {
      startMoney: '',
      endMoney: '',
      titleData: ['转账汇款 ', '超级网银', '他行账户签约'],
      payerAccNoList: [], // 付款账户信息列表
      formModel: {
        theDay: '',
        account: 0,
        queryStatus: '',
        remitterName: '',
        payeeName: '',
        acceptorName: '',
        stdPBegmMoney: '',
        stdPEdnmMoney: '',
        startremitDate: '',
        endremitDate: '',
        startexpireDate: '',
        endexpireDate: ''
      },
      formConfigJson: {
        rules: {
          account: [{ required: true, message: '选择账户', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '当日日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'theDay'
              },
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'select',
                'options': [
                  { 'value': '全部', 'key': '' },
                  { 'value': '银票', 'key': 'AC01' },
                  { 'value': '商票', 'key': 'AC02' }
                ],
                'changeEventName': 'selectStatus',
                'key': 'queryStatus'
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
                'label': '出票人名称',
                'type': 'input',
                'key': 'remitterName',
                'show': false
              },
              {
                'disabled': false,
                'label': '收款人名称',
                'type': 'input',
                'key': 'payeeName',
                'show': false
              },
              {
                'disabled': false,
                'label': '承兑人名称',
                'type': 'input',
                'key': 'acceptorName',
                'show': false
              },
              {
                label: '票面金额区间',
                type: 'inputArea',
                maxlength: 13,
                keydownEventName: 'limitMoneyInputKeyDown',
                oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                'inputEventName': 'change',
                firstKey: 'stdPBegmMoney',
                secondKey: 'stdPEdnmMoney',
                'show': false
              },
              {
                'disabled': false,
                'label': '出票日期区间',
                'type': 'dateArea',
                firstKey: 'startremitDate',
                secondKey: 'endremitDate',
                valueFormat: 'yyyyMMdd',
                'show': false
              },
              {
                'disabled': false,
                'label': '到期日期区间',
                'type': 'dateArea',
                firstKey: 'startexpireDate',
                secondKey: 'endexpireDate',
                valueFormat: 'yyyyMMdd',
                'show': false
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: []
    }
  },
  methods: {
    submit (data) {
      let params = {}
      httpPost('/eweb-edraft.CustomerQry.do', params).then(res => {
        if (res.list.length > 0) {
          this.$router.push({
            name: 'jiePledgeApplyQuery',
            params: { formModel: data, res, params }
          })
        } else {
          this.$confirm('当前条件无数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          })
        }
      })
    },
    reset (res) {
      this.formModel = res
      this.formModel.remitterName = ''
      this.formModel.payeeName = ''
      this.formModel.acceptorName = ''
      this.formModel.stdPBegmMoney = ''
      this.formModel.stdPEdnmMoney = ''
      this.formModel.stdCustAcc = 0
      this.formModel.queryStatus = ''
    },
    accNoListQry () {
    }
  },
  created () {
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
</style>
