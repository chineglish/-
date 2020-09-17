<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
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
                    @selectBank="selectBank"
                    @onReturn="onReturn"
            >
            </m-new-form>
            <el-dialog
          title="选择质押人网点"
          :visible.sync="showBankSelection"
          width="80%"
          center>
          <bank-query eventName="bankSelect"  @bankSelect="bankSelect"/>
        </el-dialog>
         </div>
        </div>
    </div>
</template>
<script>
/**
     *@name: 提示承兑-查询
     */
import util from '@/libs/util'
import BankQuery from '../../module/bankQuery'
import { bill_Type } from '@/assets/js/entity'
import { httpPost } from '@/api/sys/http'
export default {
  name: 'pldgeApplyBatchPre',
  components: {
    BankQuery
  },
  data () {
    return {
      breadData: ['电子商业汇票 ', '质押申请', '批量质押录入'],
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
        pledgeeBank: ''
      },
      showBankSelection: false,
      formConfigJson: {
        rules: {},
        formItems: [
          {
            formTitle: '质权人信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '质权人名称',
                'type': 'input',
                'key': 'pledgeeName'
              },
              {
                'disabled': false,
                'label': '质权人账户',
                'type': 'input',
                'key': 'pledgeeAcc'
              },
              {
                'disabled': false,
                'label': '质权人开户行',
                'type': 'link',
                'clickEventName': 'selectBank',
                formatter: (value) => value || '请选择质权人开户行',
                'key': 'pledgeeBank'
              }
            ]
          },
          {
            formTitle: '申请人信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '客户账号',
                'type': 'text',
                'key': 'stdDrwrAcc'
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
    selectBank (res) {
      this.formModel = res
      this.showBankSelection = true
    },
    bankSelect (data) {
      this.showBankSelection = false
      this.formModel.pledgeeBank = data.lName
      this.formModel.bankCode = data.bankCode
    },
    add (data) {
      let params = {
        list: this.tableData,
        amount: this.$route.params.amount, // 金额 注意转义
        sum: this.tableData.length, // 总笔数
        stdColtAcc: data.stdDrwrAcc, // 出质人账户
        stdCobkNam: data.pledgeeName, // 质权人全称
        stdCobkAcc: data.pledgeeAcc, // 质权人账户
        stdCobkBnm: data.bankCode // 质权人开户行行号
      }
      httpPost('eweb-edraft.PledgeReqBatchConfirm.do', params).then(res => {
        this.$router.push({
          name: 'pldgeApplyBatchConf',
          params: {
            formModel: this.tableData, // 列表数据
            data: data, // 表单数据
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params, // 查询条件
            amount: this.$route.params.amount, // 总金额
            res
          }
        })
      })
    },
    onReturn (data) {
      this.$router.push({
        name: 'pledgeApplyQuery',
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
      this.formModel.stdDrwrAcc = this.$route.params.params.stdCustAcc
      this.formModel.pledgeeBank = ''
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
