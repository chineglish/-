<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @reset="reset"
        @changeAccount="changeAccount"
        @submit="submit">
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'billBalanceQuery',
  data () {
    return {
      titleData: ['电子商业汇票 ', '票据信息查询', '票据余额查询'],
      payerAccNoList: [], // 付款账户信息列表
      formModel: {
        theDay: '',
        account: 0,
        stdQryCont: '01',
        stdBilaTtr: '2'
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
                trans: { value: 'payerAcNoShow', key: 'acNo' },
                'key': 'account',
                changeEventName: 'changeAccount'
              },
              {
                'disabled': false,
                'label': '查询类型',
                'type': 'select',
                'options': [
                  { 'value': '出票余额', 'key': '01' },
                  { 'value': '承兑余额', 'key': '02' },
                  { 'value': '出质人余额', 'key': '03' },
                  { 'value': '持票余额', 'key': '04' },
                  { 'value': '待回购余额', 'key': '05' },
                  { 'value': '质权人余额', 'key': '07' }
                ],
                'key': 'stdQryCont'
              },
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'select',
                'options': [
                  { 'value': '电子票据', 'key': '2' }
                ],
                'changeEventName': 'selectStatus',
                'key': 'stdBilaTtr'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  methods: {
    submit (data) {
      const params = {
        stdCustAcc: data.account,
        stdQryCont: data.stdQryCont, // 查询类型
        stdBilaTtr: data.stdBilaTtr, // 票据属性
        pageIndex: 1, // 分页索引
        pageSize: 20 // 分页大小
      }
      httpPost('/eweb-edraft.BillBalanceQry.do', params).then(res => {
        console.log(res)
        if (res.list) {
          this.$router.push({
            name: 'billBalanceQueryResult',
            params: {
              res,
              acNo: data.account,
              params
            }
          })
        } else {
          this.$confirm('当前条件无数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          })
        }
      }).catch(err => {
        console.error(err)
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
        this.formConfigJson.formItems[0].group[1].options = this.payerAccNoList
        if (res.AcList.length > 0) { this.changeAccount(this.formModel, res.AcList[0]) }
      }).catch(err => {
        console.error(err)
      })
    },
    changeAccount (res, obj) {
      this.$set(res, 'account', obj.acNo)
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
