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
              <div slot="moneyArea" style="width: 50%; display: flex">
                <el-input v-model="formModel.startMoney" @change="val => formModel.startMoney = val" style="width: 200px"></el-input> --
                <el-input v-model="formModel.endMoney" @change="val => formModel.endMoney = val" style="width: 200px"></el-input>
              </div>
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util.js'
export default {
  name: 'payApplyResultQueryInput',
  data () {
    return {
      startMoney: '',
      endMoney: '',
      titleData: ['电子商业汇票 ', '票据追索', '清偿申请结果查询'],
      payerAccNoList: [], // 付款账户信息列表
      formModel: {
        theDay: '',
        account: '1',
        queryStatus: '',
        remitterName: '',
        payeeName: '',
        acceptorName: '',
        startMoney: '',
        endMoney: '',
        startremitDate: '',
        endremitDate: '',
        startexpireDate: '',
        endexpireDate: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          account: [{ required: true, message: '请选择账户', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '当日日期',
                'type': 'text',
                'key': 'theDay'
              },
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'select',
                'options': [
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
                'options': [
                ],
                trans: { value: 'payerAcNoShow' },
                'key': 'account'
              },
              {
                'disabled': false,
                'label': '出票人名称',
                'type': 'input',
                'key': 'remitterName'
              },
              {
                'disabled': false,
                'label': '收款人名称',
                'type': 'input',
                'key': 'payeeName'
              },
              {
                'disabled': false,
                'label': '承兑人名称',
                'type': 'input',
                'key': 'acceptorName'
              },
              {
                'disabled': false,
                'label': '票面金额区间',
                'type': 'blank',
                'blankSlotName': 'moneyArea'
              },
              {
                'disabled': false,
                'label': '出票日期区间',
                'type': 'dateArea',
                firstKey: 'startremitDate',
                secondKey: 'endremitDate',
                valueFormat: 'yyyyMMdd'
              },
              {
                'disabled': false,
                'label': '到期日期区间',
                'type': 'dateArea',
                firstKey: 'startexpireDate',
                secondKey: 'endexpireDate',
                valueFormat: 'yyyyMMdd'
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
    submit (params) {
      let _params = params
      this.$router.push({
        name: 'payApplyResultQuery',
        params: _params
      })
    },
    reset (res) {
      res = this.formModel
    },
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[3].options = this.payerAccNoList
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    let theDay = new Date()
    this.formModel.theDay = theDay.getFullYear() + '-' + theDay.getMonth() + '-' + theDay.getDate()
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
