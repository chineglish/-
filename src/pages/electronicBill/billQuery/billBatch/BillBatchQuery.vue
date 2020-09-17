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
  name: 'billBatchQuery',
  data () {
    return {
      titleData: ['电子商业汇票 ', '票据信息查询', '票据批量查询'],
      payerAccNoList: [], // 付款账户信息列表
      formModel: {
        theDay: '',
        account: 0,
        dateArea: ''
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
                'disabled': true,
                'label': '当日日期',
                'type': 'text',
                'key': 'theDay',
                formatter: (key, value) => util.separationDate(value)
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
                'label': '交易时间',
                'type': 'dateArea',
                firstKey: 'tranStartTime',
                secondKey: 'tranEndTime',
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
    // 确定
    submit (data) {
      const params = {
        acNo: this.payerAccNoList[data.account].acNo,
        defDate: data.tranStartTime,
        endDate: data.tranEndTime

      }
      httpPost('/eweb-edraft.BatchBillQry.do', params).then(res => {
        this.$router.push({
          name: 'billBatchQueryDetails',
          params: res
        })
      }).catch(err => {
        console.error(err)
      })
    },
    reset (res) {
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
    let filterDate = util.filterDate('1')
    this.formModel.theDay = util.standardDate(new Date())
    this.formModel.tranStartTime = util.standardDate(filterDate.startDate)
    this.formModel.tranEndTime = util.standardDate(filterDate.endDate)
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
