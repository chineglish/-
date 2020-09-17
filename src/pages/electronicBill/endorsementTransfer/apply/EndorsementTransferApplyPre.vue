<template>
    <div>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @change="change"
                    @reset="reset"
                    @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
                    @submit="submit">
        <div slot="otherPanel" class="other-panel">
          <span style="cursor: pointer;" @click="moreConditions">
            {{ moreText }} >>
          </span>
        </div>
            </m-new-form>
        </div>
    </div>
</template>
<script>
/**
     *@name: 提示承兑应答
     */
import util from '@/libs/util'
import { httpPost } from '@/api/sys/http'
export default {
  name: 'EndorsementTransferApplyPre',
  data () {
    return {
      titleData: ['电子商业汇票', '背书转让 ', '背书申请'],
      accNoList: [],
      formModel: {
        theDay: '',
        stdPBegmMoney: '',
        stdPEdnmMoney: '',
        stdDegdate: '',
        stdEnddate: '',
        stdCustAcc: 0,
        ticketMethod: '0',
        remitterName: '',
        stdBillTyp: ''
      },
      moreText: '更多查询条件',
      isMore: false,
      formConfigJson: {
        rules: {
          stdCustAcc: [{ required: true, message: '请选择账户', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '100%',
            // labelWidth: '50%',
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
                'label': '票据类型',
                'type': 'select',
                'options': [
                  { 'value': '全部', 'key': '' },
                  { 'value': '银票', 'key': 'AC01' },
                  { 'value': '商票', 'key': 'AC02' }
                ],
                'key': 'stdBillTyp'
              },
              {
                'disabled': false,
                'label': '选择账户',
                'type': 'select',
                'options': [],
                trans: { value: 'acNoShow' },
                'key': 'stdCustAcc'
              },
              {
                'disabled': false,
                'label': '出票人名称',
                'type': 'input',
                show: false,
                'key': 'remitterName'
              },
              {
                'disabled': false,
                'label': '收款人名称',
                'type': 'input',
                show: false,
                'key': 'payeeName'
              },
              {
                'disabled': false,
                'label': '承兑人名称',
                'type': 'input',
                show: false,
                'key': 'acceptorName'
              },
              {
                label: '票面金额区间',
                type: 'inputArea',
                maxlength: 13,
                keydownEventName: 'limitMoneyInputKeyDown',
                oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                'inputEventName': 'change',
                show: false,
                firstKey: 'stdPBegmMoney',
                secondKey: 'stdPEdnmMoney'
              },
              {
                label: '出票日期区间',
                type: 'dateArea',
                firstKey: 'remitterBegDate',
                secondKey: 'remitterEndDate',
                show: false,
                valueFormat: 'yyyyMMdd'
              },
              {
                'disabled': false,
                'label': '到期日期区间',
                'type': 'dateArea',
                firstKey: 'stdDegdate',
                secondKey: 'stdEnddate',
                show: false,
                valueFormat: 'yyyyMMdd'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  methods: {
    // 更多查询条件
    moreConditions () {
      if (!this.isMore) {
        this.moreText = '收起'
        // let filterDate = util.filterDate('1')
        // this.formModel.remitterBegDate = util.standardDate(filterDate.startDate)
        // this.formModel.remitterEndDate = util.standardDate(filterDate.endDate)
        // this.formModel.stdDegdate = util.standardDate(filterDate.startDate)
        // this.formModel.stdEnddate = util.standardDate(filterDate.endDate)
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
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.accNoList = res.AcList || []
        this.accNoList.forEach(item => {
          item.acNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[2].options = this.accNoList
        if (this.$route.params.formModel) {
          this.formModel = this.$route.params.formModel
        }
      }).catch(err => {
        console.error(err)
      })
    },
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    reset (res) {
      this.formModel = res
      this.formModel.remitterName = ''
      this.formModel.payeeName = ''
      this.formModel.acceptorName = ''
      this.formModel.stdPBegmMoney = ''
      this.formModel.stdPEdnmMoney = ''
      this.formModel.stdCustAcc = 0
      this.formModel.stdBillTyp = ''
      this.formModel.remitterBegDate = ''
      this.formModel.remitterEndDate = ''
      this.formModel.stdDegdate = ''
      this.formModel.stdEnddate = ''
      // let filterDate = util.filterDate('1')
      // this.formModel.remitterBegDate = util.standardDate(filterDate.startDate)
      // this.formModel.remitterEndDate = util.standardDate(filterDate.endDate)
      // this.formModel.stdDegdate = util.standardDate(filterDate.startDate)
      // this.formModel.stdEnddate = util.standardDate(filterDate.endDate)
    },
    change (res) {
      res.stdPBegmMoney = util.limitInputMoney(res.stdPBegmMoney)
      res.stdPEdnmMoney = util.limitInputMoney(res.stdPEdnmMoney)
    },
    submit (data) {
      let params = {}
      if (!this.isMore) {
        params = {
          stdQryCont: '05', // 查询内容编号
          stdTrastat: '0', // 交易状态0可操作 1正在操作
          stdSendFlg: '01', // 发送方标志01发起方（查询所有可发起的交易） 02接收方（查询所有可签收的交易)
          stdCustAcc: this.accNoList[data.stdCustAcc].acNo, // 账号
          stdBillTyp: data.stdBillTyp, // 票据类型
          pageSize: '20', // 分页大小
          pageIndex: '1' // 分页索引
        }
      } else {
        params = {
          stdQryCont: '05', // 查询内容编号
          stdTrastat: '0', // 交易状态0可操作 1正在操作
          stdSendFlg: '01', // 发送方标志01发起方（查询所有可发起的交易） 02接收方（查询所有可签收的交易)
          stdCustAcc: this.accNoList[data.stdCustAcc].acNo, // 账号
          stdBillTyp: data.stdBillTyp, // 票据类型
          remitterName: data.remitterName, // 出票人
          payeeName: data.payeeName, // 收票人
          acceptorName: data.acceptorName, // 承兑人
          stdPBegmMoney: data.stdPBegmMoney, // 票面金额下限
          stdPEdnmMoney: data.stdPEdnmMoney, // 票面金额上限
          remitterBegDate: data.remitterBegDate ? data.remitterBegDate : '', // 出票日期下限
          remitterEndDate: data.remitterEndDate ? data.remitterEndDate : '', // 出票日期上限
          stdDegdate: data.stdDegdate ? data.stdDegdate : '', // 到票日期下限
          stdEnddate: data.stdEnddate ? data.stdEnddate : '', // 到票日期上限
          pageSize: '20', // 分页大小
          pageIndex: '1' // 分页索引
        }
      }

      httpPost('eweb-edraft.CustomerQry.do', params).then(res => {
        if (res.list.length > 0) {
          this.$router.push({
            name: 'EndorsementTransferApplyInquire',
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
