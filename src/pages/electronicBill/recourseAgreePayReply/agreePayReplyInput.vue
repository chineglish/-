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
               @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
              @submit="submit">
              <div slot="otherPanel" style="line-height: 40px; padding-right: 15px; font-size: 12px; color: #2886E2; text-align: right;">
                <span style="cursor: pointer;" @click="moreConditions">
                  {{ moreText }} >>
                </span>
              </div>
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'agreePayReplyInput',
  data () {
    return {
      startMoney: '',
      endMoney: '',
      titleData: ['电子商业汇票 ', '票据追索', '同意清偿应答'],
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
      moreText: '更多查询条件',
      isMore: false,
      msgs: []
    }
  },
  methods: {
    moreConditions () {
      if (!this.isMore) {
        // this.formConfigJson.formItems = this.backupData2
        this.moreText = '收起'
        this.formConfigJson.formItems[0].group[3].show = true
        this.formConfigJson.formItems[0].group[4].show = true
        this.formConfigJson.formItems[0].group[5].show = true
        this.formConfigJson.formItems[0].group[6].show = true
        this.formConfigJson.formItems[0].group[7].show = true
        this.formConfigJson.formItems[0].group[8].show = true
        this.isMore = !this.isMore
      } else {
        this.formConfigJson.formItems[0].group[3].show = false
        this.formConfigJson.formItems[0].group[4].show = false
        this.formConfigJson.formItems[0].group[5].show = false
        this.formConfigJson.formItems[0].group[6].show = false
        this.formConfigJson.formItems[0].group[7].show = false
        this.formConfigJson.formItems[0].group[8].show = false
        this.moreText = '更多查询条件'
        this.isMore = !this.isMore
      }
    },
    submit (data) {
      let params = {}
      if (this.isMore) {
        params = {
          stdQryCont: '21', // 查询内容编号
          stdTrastat: '0', // 交易状态0可操作 1正在操作
          stdSendFlg: '02', // 发送方标志01发起方（查询所有可发起的交易） 02接收方（查询所有可签收的交易)
          stdCustAcc: this.payerAccNoList[data.account].acNo,
          stdBillTyp: data.queryStatus,
          remitterName: data.remitterName,
          payeeName: data.payeeName,
          acceptorName: data.acceptorName,
          stdPBegmMoney: data.stdPBegmMoney, // 票面金额下限
          stdPEdnmMoney: data.stdPEdnmMoney, // 票面金额上限
          remitterBegDate: data.startremitDate ? data.startremitDate : '', // 出票日期下限
          remitterEndDate: data.endremitDate ? data.endremitDate : '', // 出票日期上限
          stdDegdate: data.startexpireDate ? data.startexpireDate : '', // 到期日下区间
          stdEnddate: data.endexpireDate ? data.endexpireDate : '', // 到期日上区间
          pageSize: '20', // 分页大小
          pageIndex: '1' // 分页索引
        }
      } else {
        params = {
          stdQryCont: '21', // 查询内容编号
          stdTrastat: '0', // 交易状态0可操作 1正在操作
          stdSendFlg: '02', // 发送方标志01发起方（查询所有可发起的交易） 02接收方（查询所有可签收的交易)
          stdCustAcc: this.payerAccNoList[data.account].acNo,
          stdBillTyp: data.queryStatus,
          pageSize: '20', // 分页大小
          pageIndex: '1' // 分页索引
        }
      }
      httpPost('/eweb-edraft.CustomerQry.do', params).then(res => {
        if (res.list.length > 0) {
          this.$router.push({
            name: 'agreePayReplyQuery',
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
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    change (res) {
      res.stdPBegmMoney = util.limitInputMoney(res.stdPBegmMoney)
      res.stdPEdnmMoney = util.limitInputMoney(res.stdPEdnmMoney)
    },
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[2].options = this.payerAccNoList
        if (this.$route.params.formModel) {
          this.formModel = this.$route.params.formModel
        }
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.formModel.theDay = util.standardDate(new Date())
    let filterDate = util.filterDate('1')
    this.formModel.startremitDate = util.standardDate(filterDate.startDate)
    this.formModel.endremitDate = util.standardDate(filterDate.endDate)
    this.formModel.startexpireDate = util.standardDate(filterDate.startDate)
    this.formModel.endexpireDate = util.standardDate(filterDate.endDate)
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
