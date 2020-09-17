<template>
    <div>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @submit="submit"
                    @back="onBack"
                    @selectBank="selectBank"
            >
            </m-new-form>
        </div>
        <el-dialog
          title="选择质押人网点"
          :visible.sync="showBankSelection"
          width="80%"
          center>
          <bank-query eventName="bankSelect"  @bankSelect="bankSelect"/>
        </el-dialog>
    </div>
</template>
<script>
import BankQuery from '../../module/bankQuery'
import { httpPost } from '@/api/sys/http'
import { bill_Type } from '@/assets/js/entity.js'
import util from '@/libs/util'
export default {
  name: 'pldgeApplyInfoInput',
  components: {
    BankQuery
  },
  data () {
    return {
      input: '',
      showBankSelection: false,
      bankList: [], // 银行列表
      titleData: ['电子商业汇票 ', '票据质押', '质押申请'],
      formModel: {
        theDay: '',
        stdBillNum: '',
        stdBillTyp: '',
        ticketIssuingDay: '',
        stdIssDate: '',
        stdDueDate: '',
        stdPmMoney: '',
        stdDrwrNam: '',
        stdPyeeNam: '',
        pledgeeName: '',
        pledgeeAcc: '',
        pledgeeBank: '',
        bankCode: '',
        stdDrwrAcc: ''
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      formConfigJson: {
        stepsActive: 0,
        rules: {
          pledgeeName: [{ required: true, message: '质权人名称 ', trigger: 'change' }],
          pledgeeAcc: [{ required: true, message: '质权人账户 ', trigger: 'change' }],
          pledgeeBank: [{ required: true, message: '质权人开户网点 ', trigger: 'change' }]
        },
        formItems: [
          {
            formTitle: '票据信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '票据号码',
                'type': 'text',
                'key': 'stdBillNum'
              },
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(bill_Type, value),
                'key': 'stdBillTyp'
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
                'label': '票面到期日',
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
              }
            ]
          },
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
                formatter: (value) => value || '请选择质权人开户行',
                'clickEventName': 'selectBank',
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
                'key': 'stdRcvAcct'
              }
            ]
          }
        ]
      }
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
    submit (data) {
      let params = {
        stdBillNum: data.stdBillNum, // 票号
        stdBillTyp: data.stdBillTyp, // 票据类型
        stdIssDate: data.stdIssDate, // 出票日期
        stdDueDate: data.stdDueDate, // 到期日
        stdPmMoney: data.stdPmMoney, // 票面金额
        stdColtNam: data.stdrcvname, // 出质人全称
        stdColtTyp: data.stdrcvtype, // 出质人类型
        stdColtCod: data.stdrcvcode, // 出质人组织机构代码
        stdColtAcc: data.stdrcvacct, // 出质人账户
        stdColtBnm: data.stdRcvBnm, // 出质人开户行行号
        stdCobkNam: this.formModel.pledgeeName, // 质权人全称
        stdCobkAcc: this.formModel.pledgeeAcc, // 质权人账户
        stdColtDat: data.theDay,
        stdCobkBnm: this.formModel.bankCode // 质权人开户行行号
        // stdColtSgn: data.stdColtSgn, // 出质人电子签名
        // stdColtDat: data.stdColtDat, // 质押申请日期
        // stdBatchNm: data.stdBatchNm, // 批次号
        // std400Memo: data.std400Memo // 备注
      }
      httpPost('eweb-edraft.PledgeReqConfirm.do', params).then(res => {
        this.$router.push({
          name: 'pledgeApplyComfirm',
          params: {
            formModel: this.formModel,
            res,
            data,
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params // 查询条件
          }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    onBack () {
      if (this.$route.params.pageNation) {
        this.$router.push({
          name: 'pledgeApplyQuery',
          params: {
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params // 查询条件
          }
        })
      }
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      this.formModel.pledgeeBank = ''
      this.formModel.theDay = util.standardDate(new Date())
    }
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
.set{
    background-color: #cc444d;
    color: #fff;
    border-radius: 3px;
  }
  .divBtn{
    margin-left: 3%;
  }
</style>
