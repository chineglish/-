<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :formModel="formModelData"
        :componentJson="tableHeader"
        >
      </m-new-form>
      <d-table
        :table-data="tableData"
        :tableHeadData="tableHeadData"
        >
      </d-table>
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
        :btnData="btnData"
        @payerAccNoChange="payerAccNoChange"
        @submit="submit"
        @reset="reset"
        @back="back"
        >
      </m-new-form>
    </div>
  </div>
</template>

<script>
/**
     *@name: 社保缴费录入
*/
import util from '@/libs/util'
import { httpPost } from '@/api/sys/http'
export default {
  name: 'socialSecurityPaymentPer',
  data () {
    return {
      titleData: ['转账汇款', '社保缴费'],
      formModel: {
        acNo: 0,
        acName: '',
        totalAmount: '',
        totalNum: ''
      },
      tableHeader: {
        stepsActive: 0,
        formItems: [
          {
            formWidth: '100%',
            title: '社保信息',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '社保单位名称',
                'key': 'socSecurUnitName'
              }
            ]
          },
          {
            formWidth: '50%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '社保单位编号',
                'key': 'socSecurUnitCode'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '纳税人识别号',
                'key': 'taxPayerId'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '征收账号',
                'key': 'collectAcNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '开户机构名称',
                'key': 'operBranchName'
              }
            ]
          }
        ]
      },
      tableHeadData: [
        {
          label: '费款所属期',
          prop: 'fkssq',
          formatter: (row, column, cellValue, index) => util.separationTimeSlot(cellValue)
        },
        {
          label: '实缴金额',
          prop: 'yhsjje',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '社保实缴序号',
          prop: 'sbsjxh'
        },
        {
          label: '业务流水号',
          prop: 'sbywlsh'
        },
        {
          label: '纳税人流水号',
          prop: 'nsrlsh'
        },
        {
          label: '单位缴费类型',
          prop: 'dwjflx'
        }
      ],
      tableData: [],
      formModelData: {},
      formConfigJson: {
        rules: {
        },
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disable': true,
                'type': 'select',
                options: [],
                'label': '付款账号',
                trans: { value: 'payerAcNoShow' },
                'key': 'acNo',
                'changeEventName': 'payerAccNoChange'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '付款账户名称',
                'key': 'acName'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '总金额',
                'key': 'totalAmount',
                formatter: (key, value) => {
                  return util.formatCurrency(value)
                }
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  methods: {
    submit (data) {
      this.formModel = data
      let paymentInfoList = []
      this.tableData.forEach((item, index) => {
          paymentInfoList.push({ 'fkssq': item.fkssq, 'yhsjje': item.yhsjje, 'sbsjxh': item.sbsjxh, 'sbywlsh': item.sbywlsh, 'nsrlsh': item.nsrlsh, 'dwjflx': item.dwjflx })
      })
      let param = {
        ...this.$route.params,
        ...this.formModel,
        paymentInfoList: paymentInfoList,
        yhzh: this.payerAccNoList[data.acNo].acNo,
        totalAmount: this.$route.params.amountOfMoney
      }  
      httpPost('/eweb-transfer.SocialSecurityContributionConfirm.do', param).then(res => {
        Object.assign(data, res)
        this.$router.push({
          name: 'socialSecurityPaymentConf',
          params: {
            formModel: this.formModel,
            tableData: this.tableData,
            formModelData: this.formModelData,
            acNo: this.payerAccNoList[data.acNo].acNo,
            resTable: this.$route.params.resTable,
            tableModel: this.$route.params.tableModel,
            acList: this.payerAccNoList[data.acNo],
            _Data2Sign: res._Data2Sign,
            _dataMapKey: res._dataMapKey,
            _authenticateType: res._authenticateType
          }
        })
      })
    },
    reset (res) {
      this.formModel = res
      this.accNoListQry()
    },
    back () {
      this.$router.push({
        name: 'socialSecurityPayment',
        params: this.$route.params
      })
    },
    /**
     * 付款账户列表查询
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'Transfer' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.formModel.acName = res.AcList[0].acName
        this.payerAccNoChange(this.formModel)
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 根据选择的付款账户 反显 付款账户姓名
     * @param data
     */
    payerAccNoChange (data) {
      const currentrcvAcno = this.payerAccNoList[data.acNo]
      if (currentrcvAcno) {
        this.formModel.acName = currentrcvAcno.acName
      }
    }
  },
  created () {
    if (this.$route.params.zpph) {
      this.tableData = this.$route.params.tableData
      this.formModel.totalAmount = this.$route.params.formModel.totalAmount
      this.formModel.totalNum = this.$route.params.formModel.totalNum
      this.formModelData = this.$route.params.formModelData
      if (!(Array.isArray(this.payerAccNoList) && this.payerAccNoList.length > 0)) {
        this.accNoListQry(this.$route.params.formModel.acNo)
      }
    } else if (this.$route.params.formModel) {
      this.tableData = this.$route.params.formModel
      this.formModelData = this.$route.params.formModelData
      this.formModel.totalAmount = this.$route.params.amountOfMoney
      this.formModel.totalNum = this.$route.params.totalNum
      if (!(Array.isArray(this.payerAccNoList) && this.payerAccNoList.length > 0)) {
        this.accNoListQry(this.$route.params.formModel.acNo)
      }
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
