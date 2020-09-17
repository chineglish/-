<template>
    <div>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @submit="submit"
                    @goBack="goBack"
                    @selectBank="selectBank"
                    @selectPutBank="selectPutBank "
                    @changeMtd="changeMtd"
                    @change="change"
                    @changeRate="changeRate"
            >
          <div class="right-slot" slot="amountQry" @click="amountQry">
            实付金额查询
          </div>
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
          title="选择入账网点"
          :visible.sync="showSelectPutBank"
          width="80%"
          center>
          <bank-query eventName="putBankselect"  @putBankselect="putBankselect"/>
        </el-dialog>
    </div>
</template>
<script>
/**
*@name: 贴现申请
*/
import { httpPost } from '@/api/sys/http'
import { bill_Type } from '@/assets/js/entity'
import util from '@/libs/util'
import BankQuery from '../../module/bankQuery'

export default {
  name: 'DiscountApplySolo',
  components: {
    BankQuery
  },
  data () {
    return {
      titleData: ['电子商业汇票', '贴现', '贴现申请'],
      showSelectPutBank: false,
      showBankSelection: false,
      bankList: [], // 银行列表
      formModel: {
        stdDsbkNme: '',
        stdDscntRt: '',
        stdBillTyp: '',
        stDrealAmt: '',
        stdIntRate: '1',
        stdInteMtd: '01',
        stdDscntDt: util.standardDate(new Date()),
        stdDsbkBnam: '',
        stdAoaiBnam: '',
        stdBnedRmt: 'EM00',
        stdStlMthd: 'SM00',
        drawerType: '企业',
        paperType: '电子',
        stdDsntTyp: '买断式'
      },
      formConfigJson: {
        stepsActive: 0,
        formWidth: '100%',
        // labelWidth: '40%',
        rules: {
          stdDsbkNme: [{ required: true, message: '贴入人名称', trigger: 'submit' }],
          stdDsbkBnm: [{ required: true, message: '贴入人开户行', trigger: 'submit' }],
          stdDsbkBnam: [{ required: true, message: '请选择贴入网点', trigger: 'submit' }],
          stdAoaiAcc: [{ required: true, message: '入账账号', trigger: 'submit' }],
          stdAoaiBnam: [{ required: true, message: '请选择资金入账网点', trigger: 'submit' }],
          stdBnedRmt: [{ required: true, message: '允许背书', trigger: 'submit' }],
          stdStlMthd: [{ required: true, message: '清算方式', trigger: 'submit' }],
          stdInteMtd: [{ required: true, message: '付息方式', trigger: 'submit' }],
          stdIntRate: [{ required: true, message: '协议付息比例', trigger: 'submit' }],
          stdDscntRt: [{ required: true, message: '贴现利率', trigger: 'submit' }],
          stDrealAmt: [{ required: true, message: '实付金额', trigger: 'submit' }]
        },
        formItems: [
          {
            title: '票据信息',
            group: [
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'text',
                'key': 'stdBillTyp',
                formatter: (key, value) => util.handleEnums(bill_Type, value)
              },
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'text',
                'key': 'paperType'
              },
              {
                'disabled': false,
                'label': '出票日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdIssDate'
              },
              {
                'disabled': false,
                'label': '到期日',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdDueDate'
              },
              {
                'disabled': false,
                'label': '票面金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stdPmMoney'
              },
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
                'inputEventName': 'change',
                'rightSlotName': 'amountQry',
                'suffixSlotName': 'suffixSlotName',
                'key': 'stdDscntRt'
              },
              {
                'disabled': false,
                'label': '实付金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stDrealAmt'
              },
              {
                'disabled': false,
                'label': '贴现日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdDscntDt'
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
                formatter: value => value || '请选择贴入网点',
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
                formatter: value => value || '请选择资金入账网点',
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
      this.formModel.stdDscntRt = res.stdDscntRt
      this.formModel.stDrealAmt = ''
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
    change (res) {
      this.formModel.stdIntRate = res.stdIntRate
      this.formModel.stdDscntRt = res.stdDscntRt
      this.formModel.stDrealAmt = ''
    },
    changeMtd (res) {
      this.formModel = res
      if (this.formModel.stdInteMtd === '01') {
        this.formModel.stdIntRate = '1'
        this.formModel.stDrealAmt = ''
        this.formConfigJson.formItems[0].group[7].show = false
      }
      if (this.formModel.stdInteMtd === '02') {
        this.formModel.stdIntRate = '2'
        this.formModel.stDrealAmt = ''
        this.formConfigJson.formItems[0].group[7].show = false
      }
      if (this.formModel.stdInteMtd === '03') {
        this.formModel.stdIntRate = ''
        this.formModel.stDrealAmt = ''
        this.formConfigJson.formItems[0].group[7].show = true
      }
    },
    amountQry () {
      let params = {
        stdBillNum: this.formModel.stdBillNum,
        stdDscntRt: this.formModel.stdDscntRt,
        stdDsntTyp: 'RM00',
        stdDsbkbNm: this.formModel.stdAppBnm,
        stdInteMtd: this.formModel.stdInteMtd,
        stdIntrate: this.formModel.stdIntRate
      }
      httpPost('eweb-edraft.DiscountAmountQry.do', params).then(res => {
        this.formModel.stDrealAmt = res.stDrealAmt
      })
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
    submit (data) {
      let params = {
        stdBillNum: data.stdBillNum, // 票号
        stdBillTyp: data.stdBillTyp, // 票据类型
        stdIssDate: data.stdIssDate, // 出票日期
        stdDueDate: data.stdDueDate, // 到期日
        stdPmMoney: data.stdPmMoney, // 金额 注意转义
        stdDrwrNam: data.stdDrwrNam, // 出票人名
        stdRvkrBnm: data.stdPyeeNam, // 收票人
        stdDscntDt: data.stdDscntDt, // 申请贴现日期
        stdDscntRt: data.stdDscntRt, // 贴现利率
        stdInteMtd: data.stdInteMtd, // 付息方式
        stdIntRate: data.stdIntRate, // 付息比例
        stdDsntTyp: 'RM00',
        stdOperTyp: 'TT00',
        stdRealAmt: data.stDrealAmt, // 实付金额
        stdAoaiAcc: data.stdAoaiAcc, // 入账账号
        stdAoaiBnm: data.stdAoaiBnm, // 入账行号
        stdAoaiBnam: data.stdAoaiBnam, // 入账行名
        stdBnedRmt: data.stdBnedRmt, // 转让标记
        stdStlMthd: data.stdStlMthd, // 清算方式
        stdPropTyp: data.stdRcvType, // 贴出人类型
        stdPropNme: data.stdRcvName, // 贴出人名称
        stdPropCod: data.stdRcvCode, // 贴出人组织机构代码证号
        stdPropAcc: data.stdRcvAcct, // 贴出人账户
        stdPropBnm: data.stdRcvBnm, // 贴出人开户行行号
        stdDsbkNme: data.stdDsbkNme, // 贴入人名称
        stdDsbkAcc: '0', // 贴入人账户
        stdDsbkBnm: data.stdDsbkBnm, // 贴入人开户行行号
        stdDsbkBnam: data.stdDsbkBnam // 贴入人开户行行名
        // std400Memo: data.std400Mem // 备注 注意转义
        // stdPropSgn: data. // 贴出人电子签名
      }
      httpPost('eweb-edraft.DiscountConfirm.do', params).then(res => {
        this.$router.push({
          name: 'DiscountApplySoloConf',
          params: {
            _Data2Sign: res._Data2Sign,
            _dataMapKey: res._dataMapKey,
            _authenticateType: res._authenticateType,
            formModel: data, // 列表信息
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params // 查询条件
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
      Object.assign(this.formModel, this.$route.params.formModel)
      this.formModel.stdCustAcc = this.$route.params.params.stdCustAcc
    }
    if (this.formModel.stdInteMtd === '03') {
      this.formConfigJson.formItems[0].group[7].show = true
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
