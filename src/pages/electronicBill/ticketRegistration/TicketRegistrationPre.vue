<template>
    <div>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @submit="submit">
            </m-new-form>
        </div>
    </div>
</template>
<script>
/**
 *@name: 出票登记-录入
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: 'TicketRegistrationPre',
  data () {
    return {
      titleData: ['电子商业汇票', '出票登记'],
      accNoList: [], // 账户信息列表
      formModel: {
        theDay: '',
        accountNum: 0,
        ticketMethod: '0',
        stdBillTyp: 'AC01',
        stdDrwrCod: '',
        stdDrwrBnm: '',
        stdDrwrBnam: ''
      },
      formConfigJson: {
        rules: {},
        formItems: [
          {
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'select',
                'options': [
                  { 'value': '银票', 'key': 'AC01' },
                  { 'value': '商票', 'key': 'AC02' }
                ],
                'key': 'stdBillTyp'
              },
              {
                'disabled': false,
                'label': '出票方式',
                'type': 'select',
                'options': [
                  { 'value': '单笔', 'key': '0' },
                  { 'value': '批量', 'key': '1' }
                ],
                'key': 'ticketMethod'
              },
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
                trans: { value: 'acNoShow' },
                'key': 'accountNum'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' }
      ]
    }
  },
  methods: {
    submit (data) {
      console.log(this.formModel)
      console.log(data)
      this.formModel = data
      let param = {
        custAcc: this.accNoList[this.formModel.accountNum].acNo
      }
      httpPost('eweb-edraft.OrganizationCode.do', param).then(res => {
        let params = {
          stdIssDate: this.formModel.theDay,
          ticketMethod: this.formModel.ticketMethod,
          stdBillTyp: this.formModel.stdBillTyp,
          stdDrwrAcc: this.accNoList[this.formModel.accountNum].acNo,
          stdDrwrNam: this.accNoList[this.formModel.accountNum].acName,
          accountNum: this.formModel.accountNum
        }
        if (this.formModel.ticketMethod === '1') {
          this.$router.push({
            name: 'TicketRegistrationBatch',
            params: { formModel: params,
              stdDrwrCod: res.custCod,
              stdDrwrBnm: res.stdDrwrbNm,
              stdDrwrBnam: res.stdDrwrbNam }
          })
        }
        if (this.formModel.ticketMethod === '0') {
          this.$router.push({
            name: 'TicketRegistrationInner',
            params: { formModel: params,
              stdDrwrCod: res.custCod,
              stdDrwrBnm: res.stdDrwrbNm,
              stdDrwrBnam: res.stdDrwrbNam }
          })
        }
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 账户列表查询
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.accNoList = res.AcList || []
        this.accNoList.forEach(item => {
          item.acNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[3].options = this.accNoList
        if (this.$route.params.formModel) {
          this.formModel = this.$route.params.formModel
        }
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.accNoListQry()
    this.formModel.theDay = util.standardDate(new Date())
  }
}
</script>
