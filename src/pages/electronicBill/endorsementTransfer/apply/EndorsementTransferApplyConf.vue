<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <el-steps :active="stepsActive" align-center>
        <el-step title="信息录入"></el-step>
        <el-step title="交易确认"></el-step>
        <el-step title="提交结果"></el-step>
        </el-steps>
        <div class="form-box">
            <d-table
                    :table-data="tableData"
                    :tableTitle="tableTitle"
                    :tableHeadData="tableHeadData"
            >
            </d-table>
          <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @add="add"
                    @onReturn="onReturn"
            >
            </m-new-form>
         </div>
        </div>
    </div>
</template>
<script>
/**
     *@name: 背书转让
     */
import { bill_Type, endorse_Type } from '@/assets/js/entity'
import util from '@/libs/util'
import { httpPost } from '@/api/sys/http'

export default {
  name: 'EndorsementTransferApplyConf',
  data () {
    return {
      breadData: ['电子商业汇票 ', '背书转让', '背书申请确认'],
      stepsActive: 1,
      showUserQuery: false,
      tableTitle: {
        rightInfo: {
          tip: '总金额:' + util.formatCurrency(this.$route.params.amount) + ',  总笔数:' + this.$route.params.formModel.length
        }
      },
      tableHeadData: [
        { label: '票据号码', prop: 'stdBillNum' },
        { label: '票据类型',
          prop: 'stdBillTyp',
          formatter: (row, column, cellValue, index) => util.handleEnums(bill_Type, cellValue) },
        { label: '出票日期', prop: 'stdIssDate', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '到期日', prop: 'stdDueDate', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '票面金额', prop: 'stdPmMoney', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '出票人名称', prop: 'stdDrwrNam' },
        { label: '收款人名称', prop: 'stdPyeeNam' },
        { label: '承兑人名称', prop: 'stdAccpNam' }
      ],
      tableData: [
      ],
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'add' },
        { btnText: '取消', class: 'm-cancel-btn', clickEventName: 'onReturn' }
      ],
      formModel: {
      },
      formConfigJson: {
        rules: {},
        formItems: [
          {
            title: '被背书人信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '被背书人名称',
                'type': 'text',
                'key': 'stdEndeNam'
              },
              {
                'disabled': false,
                'label': '被背书人账号',
                'type': 'text',
                'key': 'stdEndeAcc'
              },
              {
                'disabled': false,
                'label': '被背书人开户行号',
                'type': 'text',
                'key': 'stdEndeBnm'
              },
              {
                'disabled': false,
                'label': '转让标记',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(endorse_Type, value),
                'key': 'stdBanmFlg'
              },
              {
                'disabled': false,
                'label': '被背书人备注',
                'type': 'text',
                'key': 'std400Memo'
              }
            ]
          },
          {
            title: '申请人信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '客户账号',
                'type': 'text',
                'key': 'stdCustAcc'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    add (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        let params = {
          stdEndrAcc: data.stdCustAcc,
          stdBanmFlg: data.stdBanmFlg,
          stdEndeNam: data.stdEndeNam,
          stdEndeAcc: data.stdEndeAcc,
          stdEndeBnm: data.stdEndeBnm,
          std400Memo: data.std400Memo,
          amount: this.$route.params.amount, // 金额 注意转义
          sum: this.tableData.length, // 总笔数
          list: this.tableData,
          stdEndrSgn: singMsg, // 电子签名
          _tokenName: token._tokenName,
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('eweb-edraft.EndorsedTransferBatch.do', params).then(res => {
          this.$router.push({
            name: 'EndorsementTransferApplyRes',
            params: {
              formModel: params, res
            }
          })
        })
      })
    },
    onReturn (data) {
      this.$router.push({
        name: 'EndorsementTransferApplyDetailPre',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.tableData = this.$route.params.formModel
      Object.assign(this.formModel, this.$route.params.data)
    }
  }
}
</script>

<style scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
</style>
