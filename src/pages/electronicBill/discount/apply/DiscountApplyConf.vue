<template>
    <div>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
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
                    @submit="submit"
                    @goBack="goBack"
            >
            </m-new-form>
        </div>
        </div>
    </div>
</template>
<script>
/**
*@name: 出票登记-确认
*/
import { httpPost } from '@/api/sys/http'
import { bill_Type, payment_Type, clearing_Type, endorse_Type } from '@/assets/js/entity'
import util from '@/libs/util'
import BankQuery from '../../module/bankQuery'

export default {
  name: 'DiscountApplyConf',
  components: {
    BankQuery
  },
  data () {
    return {
      titleData: ['电子商业汇票', '贴现', '贴现申请确认'],
      stepsActive: 1,
      bankList: [], // 银行列表
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
        { label: '实付金额', prop: 'stdRealAmt', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '出票人名称', prop: 'stdDrwrNam' },
        { label: '收款人名称', prop: 'stdPyeeNam' },
        { label: '承兑人名称', prop: 'stdAccpNam' }
      ],
      tableData: [
      ],
      formModel: {
      },
      formConfigJson: {
        formWidth: '50%',
        // labelWidth: '40%',
        rules: {
          stdDsbkNme: [{ required: true, message: '贴入人名称', trigger: 'submit' }],
          stdDsbkBnm: [{ required: true, message: '贴入人开户行', trigger: 'submit' }],
          stdDsbkBnam: [{ required: true, message: '贴入人开户行名', trigger: 'submit' }],
          stdAoaiAcc: [{ required: true, message: '入账账户', trigger: 'submit' }],
          stdAoaiBnam: [{ required: true, message: '贴入人名称', trigger: 'submit' }],
          stdBnedRmt: [{ required: true, message: '允许背书', trigger: 'submit' }],
          stdStlMthd: [{ required: true, message: '清算方式', trigger: 'submit' }],
          stdInteMtd: [{ required: true, message: '付息方式', trigger: 'submit' }],
          stdIntRate: [{ required: true, message: '协议付息比例', trigger: 'submit' }],
          stdDscntRt: [{ required: true, message: '贴现利率', trigger: 'submit' }]
        },
        formItems: [
          {
            title: '票据信息',
            group: [
              {
                'disabled': false,
                'label': '贴现方式',
                'type': 'text',
                'key': 'stdDsntTyp'
              },
              {
                'disabled': false,
                'label': '付息方式',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(payment_Type, value),
                'key': 'stdInteMtd'
              },
              {
                'disabled': false,
                'label': '协议付息比例',
                'type': 'text',
                'show': false,
                'key': 'stdIntRate'
              },
              {
                'disabled': false,
                'label': '贴现利率',
                'type': 'text',
                'key': 'stdDscntRt'
              }
            ]
          },
          {
            title: '贴入人信息',
            group: [
              {
                'disabled': false,
                'label': '贴入人名称',
                'type': 'text',
                'key': 'stdDsbkNme'
              },
              {
                'disabled': false,
                'label': '贴入人开户行',
                'type': 'text',
                'key': 'stdDsbkBnm'
              },
              {
                'disabled': false,
                'label': '银行选择',
                'type': 'text',
                'key': 'stdDsbkBnam'
              },
              {
                'disabled': false,
                'label': '清算方式',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(clearing_Type, value),
                'key': 'stdStlMthd'
              }
            ]
          },
          {
            title: '入账信息',
            group: [
              {
                'disabled': false,
                'label': '入账账户',
                'type': 'text',
                'key': 'stdAoaiAcc'
              },
              {
                'disabled': false,
                'label': '银行选择',
                'type': 'text',
                'key': 'stdAoaiBnam'
              },
              {
                'disabled': false,
                'label': '允许背书',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(endorse_Type, value),
                'key': 'stdBnedRmt'
              }
            ]
          },
          {
            title: '申请人信息',
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
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'goBack' }]
    }
  },
  methods: {
    submit (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        let params = {
          stdDsntTyp: 'RM00', // 贴现类型
          stdOperTyp: 'TT00', // 交易类型
          stdDscntRt: data.stdDscntRt, // 贴现利率
          stdInteMtd: data.stdInteMtd, // 付息方式
          stdIntRate: data.stdIntRate, // 付息比例
          stdAoaiAcc: data.stdAoaiAcc, // 入账账户
          stdAoaiBnm: data.stdAoaiBnm, // 入账行号
          stdAoaiBnam: data.stdAoaiBnam, // 入账行名
          stdBnedRmt: data.stdBnedRmt, // 转让标记
          stdStlMthd: data.stdStlMthd, // 清算方式
          stdDsbkNme: data.stdDsbkNme, // 贴入人名称
          stdDsbkAcc: '0', // 贴入人账户
          stdDsbkBnm: data.stdDsbkBnm, // 贴入人开户行行号
          stdDsbkBnam: data.stdDsbkBnam, // 贴入人开户行行名
          stdPropAcc: data.stdCustAcc,
          amount: this.$route.params.amount, // 金额 注意转义
          sum: this.tableData.length, // 总笔数
          list: this.tableData,
          stdPropSgn: singMsg, // 电子签名
          _tokenName: token._tokenName,
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('eweb-edraft.DiscountBatch.do', params).then(res => {
          this.$router.push({
            name: 'DiscountApplyRes',
            params: {
              formModel: params, res
            }
          })
        })
      })
    },
    goBack () {
      this.$router.push({
        name: 'DiscountApplyDetailPre',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.tableData = this.$route.params.res.list
      this.formModel = this.$route.params.data
    }
    if (this.formModel.stdInteMtd === '03') {
      this.formConfigJson.formItems[0].group[2].show = true
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
