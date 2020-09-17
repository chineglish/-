<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-steps :data="{ stepsActive: stepsActive }"/>
        <div class="form-box">
            <d-table
                    :table-data="tableData"
                    :tableHeadData="tableHeadData"
                    :tableTitle="tableTitle"
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
     *@name: 提示承兑-查询
     */
import util from '@/libs/util'
import { bill_Type } from '@/assets/js/entity'
import { httpPost } from '@/api/sys/http'
export default {
  name: 'PromptAcceptanceApplyConf',
  data () {
    return {
      breadData: ['电子商业汇票 ', '提示承兑', '提示承兑确认'],
      stepsActive: 1,
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
      formModel: {
      },
      formConfigJson: {
        rules: {},
        formItems: [
          {
            title: '其他信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '合同编号',
                'type': 'text',
                'key': 'stdContRnm'
              },
              {
                'disabled': false,
                'label': '发票编号',
                'type': 'text',
                'key': 'stdInvcNum'
              },
              {
                'disabled': false,
                'label': '批次号',
                'type': 'text',
                'key': 'stdBatchNm'
              },
              {
                'disabled': false,
                'label': '备注',
                'type': 'text',
                'key': 'std400Mem'
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
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'add' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'onReturn' }
      ]
    }
  },
  methods: {
    add (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        let params = {
          list: this.tableData,
          stdDrwrAcc: data.stdCustAcc, // 出票人账号
          amount: this.$route.params.amount, // 金额 注意转义
          sum: this.tableData.length, // 总笔数
          stdContRnm: data.stdContRnm, // 合同编号
          stdInvcNum: data.stdInvcNum, // 发票编号
          stdBatchNm: data.stdBatchNm, // 批次号
          std400Memo: data.std400Mem, // 备注 注意转义
          stdDrwrSgn: singMsg, // 电子签名
          _tokenName: token._tokenName,
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('eweb-edraft.AcceptApplicationBatch.do', params).then(res => {
          this.$router.push({
            name: 'PromptAcceptanceApplyRes',
            params: {
              formModel: res,
              count: this.tableData.length,
              amount: this.$route.params.amount
            }
          })
        })
      })
    },
    onReturn (data) {
      this.$router.push({
        name: 'PromptAcceptanceApplyDetail',
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
