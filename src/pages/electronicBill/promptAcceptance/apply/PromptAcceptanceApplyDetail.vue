<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-steps :data="{ stepsActive: stepsActive }"/>
        <div class="form-box">
          <d-table
            :table-data="tableData"
            :tableHeadData="tableHeadData"
            :tableTitle="tableTitle"
          ></d-table>
          <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @add="add"
              @onReturn="onReturn"
            ></m-new-form>
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
  name: 'PromptAcceptanceApplyDetail',
  data () {
    return {
      breadData: ['电子商业汇票 ', '提示承兑', '提示承兑录入'],
      stepsActive: 0,
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
                'type': 'input',
                'key': 'stdContRnm'
              },
              {
                'disabled': false,
                'label': '发票编号',
                'type': 'input',
                'key': 'stdInvcNum'
              },
              {
                'disabled': false,
                'label': '批次号',
                'type': 'input',
                'key': 'stdBatchNm'
              },
              {
                'disabled': false,
                'label': '备注',
                'type': 'input',
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
      let params = {
        list: this.tableData,
        stdDrwrAcc: data.stdCustAcc, // 出票人账号
        amount: this.$route.params.amount, // 金额 注意转义
        sum: this.tableData.length, // 总笔数
        stdContRnm: data.stdContRnm, // 合同编号
        stdInvcNum: data.stdInvcNum, // 发票编号
        stdBatchNm: data.stdBatchNm, // 批次号
        std400Memo: data.std400Mem // 备注 注意转义
      }
      httpPost('eweb-edraft.AcceptApplicationBatchConfirm.do', params).then(res => {
        this.$router.push({
          name: 'PromptAcceptanceApplyConf',
          params: {
            _Data2Sign: res._Data2Sign,
            _authenticateType: res._authenticateType,
            _dataMapKey: res._dataMapKey,
            formModel: this.tableData, // 列表数据
            data: data, // 表单数据
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params, // 查询条件
            amount: this.$route.params.amount // 总金额
          }
        })
      })
    },
    onReturn (data) {
      this.$router.push({
        name: 'promptAcceptanceInquire',
        params: {
          pageNation: this.$route.params.pageNation, // 分页信息
          params: this.$route.params.params // 查询条件
        }
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.tableData = this.$route.params.formModel
      this.formModel.stdCustAcc = this.$route.params.params.stdCustAcc
    }
    if (this.$route.params.data) {
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
