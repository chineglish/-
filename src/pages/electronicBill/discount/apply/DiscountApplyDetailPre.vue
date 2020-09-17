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
                    @changeRate="changeRate"
                    @changeMtd="changeMtd"
                    @selectBank="selectBank"
                    @selectPutBank="selectPutBank "
            >
            <div slot="suffixSlotName">
            %
          </div>
            </m-new-form>
        </div>
        <el-dialog
          title="选择贴入网点"
          :visible.sync="showBankSelection"
          width="80%"
          center>
          <bank-query eventName="bankSelect"  @bankSelect="bankSelect"/>
        </el-dialog>
        <el-dialog
          title="选择资金入账网点"
          :visible.sync="showSelectPutBank"
          width="80%"
          center>
          <bank-query eventName="putBankselect"  @putBankselect="putBankselect"/>
        </el-dialog>
        </div>
    </div>
</template>
<script>
/**
*@name: 出票登记-确认
*/
import util from '@/libs/util'
import { bill_Type } from '@/assets/js/entity'
import { httpPost } from '@/api/sys/http'
import BankQuery from '../../module/bankQuery'

export default {
  name: 'DiscountApplyDetailPre',
  components: {
    BankQuery
  },
  data () {
    return {
      titleData: ['电子商业汇票', '贴现', '贴现申请'],
      stepsActive: 0,
      showSelectPutBank: false,
      showBankSelection: false,
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
        { label: '出票人名称', prop: 'stdDrwrNam' },
        { label: '收款人名称', prop: 'stdPyeeNam' },
        { label: '承兑人名称', prop: 'stdAccpNam' }
      ],
      tableData: [
      ],
      formModel: {
        stdDsbkBnam: '选择贴入网点',
        stdAoaiBnam: '选择资金入账网点',
        stdBnedRmt: 'EM00',
        stdStlMthd: 'SM00',
        stdInteMtd: '01',
        stdDsntTyp: '买断式',
        stdIntRate: '1',
        stdDsbkBnm: '',
        stdAoaiBnm: ''
      },
      formConfigJson: {
        formWidth: '100%',
        // labelWidth: '40%',
        rules: {
          stdDsbkNme: [{ required: true, message: '贴入人名称', trigger: 'submit' }],
          stdDsbkBnm: [{ required: true, message: '贴入人开户行', trigger: 'submit' }],
          stdDsbkBnam: [{ required: true, message: '贴入人开户行名', trigger: 'submit' }],
          stdAoaiAcc: [{ required: true, message: '入账账号', trigger: 'submit' }],
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
                'type': 'select',
                'options': [
                  { 'value': '买方付息', 'key': '01' },
                  { 'value': '卖方付息', 'key': '02' },
                  { 'value': '协议付息', 'key': '03' }
                  // { 'value': '第三方付息', 'key': '04' }
                ],
                'changeEventName': 'changeMtd',
                'key': 'stdInteMtd'
              },
              {
                'disabled': false,
                'label': '协议付息比例',
                'type': 'input',
                placeholder: '请输入0~1之间数字',
                'inputEventName': 'changeRate',
                'show': false,
                'key': 'stdIntRate'
              },
              {
                'disabled': false,
                'label': '贴现利率',
                'type': 'input',
                'suffixSlotName': 'suffixSlotName',
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
                'type': 'input',
                'key': 'stdDsbkNme'
              },
              {
                'disabled': false,
                'label': '贴入人开户行',
                'type': 'input',
                'key': 'stdDsbkBnm'
              },
              {
                'disabled': false,
                'label': '银行选择',
                'type': 'link',
                formatter: (value) => value || '选择贴入网点',
                'clickEventName': 'selectBank',
                'key': 'stdDsbkBnam'
              },
              {
                'disabled': false,
                'label': '清算方式',
                'type': 'select',
                'options': [
                  { 'value': '线上清算', 'key': 'SM00' },
                  { 'value': '线下清算', 'key': 'SM01' }
                ],
                'key': 'stdStlMthd'
              }
            ]
          },
          {
            title: '入账信息',
            group: [
              {
                'disabled': false,
                'label': '入账账号',
                'type': 'input',
                'key': 'stdAoaiAcc'
              },
              {
                'disabled': false,
                'label': '银行选择',
                'type': 'link',
                formatter: (value) => value || '选择资金入账网点',
                'clickEventName': 'selectPutBank',
                'key': 'stdAoaiBnam'
              },
              {
                'disabled': false,
                'label': '允许背书',
                'type': 'select',
                'options': [
                  { 'value': '可转让', 'key': 'EM00' },
                  { 'value': '不可转让', 'key': 'EM01' }
                ],
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
    changeRate (res) {
      res.stdIntRate = this.limitInputInterestRate(res.stdIntRate)
      this.formModel.stdIntRate = res.stdIntRate
    },
    limitInputInterestRate (value) {
      // 先把非数字的都替换掉，除了数字和.
      value = value.replace(/[^\d.]/g, '')
      // value = value.replace(/[^\d.]/g, '')
      // 必须保证第一个为数字为0而不是.
      value = value.replace(/^[1-9]/g, '')
      value = value.replace(/^\./g, '')
      // 保证只有出现一个.而没有多个.
      value = value.replace(/\.{2,}/g, '.')
      // 保证.只出现一次，而不能出现两次以上
      value = value.replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      value = value.replace(
        /^(-)*(\d+)\.(\d\d).*$/,
        '$1$2.$3'
      ) // 只能输入俩个小数
      var t = value.charAt(0)
      var n = value.charAt(1)
      if (t === '0' && n !== '.') {
        value = '0'
      }
      if (value.indexOf('.') === -3 && value.length > 10) {
        value = value.substring(0, 10)
      }
      return value
    },
    selectBank (res) {
      this.formModel = res
      this.showBankSelection = true
    },
    selectPutBank (res) {
      this.formModel = res
      this.showSelectPutBank = true
    },
    bankSelect (data) {
      this.showBankSelection = false
      this.formModel.stdDsbkBnam = data.lName
      this.formModel.stdDsbkBnm = data.bankCode
      if (data.drecCode === '313222080002') {
        this.formModel.stdStlMthd = 'SM01'
        this.formConfigJson.formItems[1].group[3].disabled = true
      } else {
        this.formConfigJson.formItems[1].group[3].disabled = false
      }
    },
    putBankselect (data) {
      this.showSelectPutBank = false
      this.formModel.stdAoaiBnam = data.lName
      this.formModel.stdAoaiBnm = data.bankCode
    },
    changeMtd (res) {
      this.formModel = res
      if (this.formModel.stdInteMtd === '01') {
        this.formModel.stdIntRate = '1'
        this.formConfigJson.formItems[0].group[2].show = false
      }
      if (this.formModel.stdInteMtd === '02') {
        this.formModel.stdIntRate = '2'
        this.formConfigJson.formItems[0].group[2].show = false
      }
      if (this.formModel.stdInteMtd === '03') {
        this.formModel.stdIntRate = ''
        this.formConfigJson.formItems[0].group[2].show = true
      }
    },
    submit (data) {
      let params = {
        stdDsntTyp: 'RM00', // 贴现类型
        stdOperTyp: 'TT00', // 交易类型
        stdDscntRt: data.stdDscntRt, // 贴现利率
        stdInteMtd: data.stdInteMtd, // 付息方式
        stdIntRate: data.stdIntRate, // 付息比例
        stdAoaiAcc: data.stdAoaiAcc, // 入账账号
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
        list: this.tableData
      }
      httpPost('eweb-edraft.DiscountBatchConfirm.do', params).then(res => {
        this.$router.push({
          name: 'DiscountApplyConf',
          params: {
            res,
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
    goBack () {
      this.$router.push({
        name: 'DiscountApplyInquire',
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
