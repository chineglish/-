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
        :tableData="tableData"
        :tableHeadData="tableHeadData"
        >
      </d-table>
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
        :btnData="btnData"
        @submit="submit"
        @back="onBack"
        >
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
     *@name: 社保缴费确认
*/
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'socialSecurityPaymentConf',
  data () {
    return {
      titleData: ['转账汇款', '社保缴费'],
      formModel: {
        acNo: '',
        acName: '',
        totalAmount: ''
      },
      tableData: [],
      formModelData: {},
      tableHeader: {
        stepsActive: 1,
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
      formConfigJson: {
        rules: {},
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '付款账号',
                'key': 'acNo'
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
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    submit (params) {
      let paymentInfoList = []
      this.tableData.forEach((item, index) => {
          paymentInfoList.push({ 'fkssq': item.fkssq, 'yhsjje': item.yhsjje, 'sbsjxh': item.sbsjxh, 'sbywlsh': item.sbywlsh, 'nsrlsh': item.nsrlsh, 'dwjflx': item.dwjflx })
      })
      let _params = {
        _Data2Sign: this.$route.params._Data2Sign,
        _authenticateType: this.$route.params._authenticateType,
        paymentInfoList: paymentInfoList,
        socSecurUnitCode: this.$route.params.formModelData.socSecurUnitCode,
        taxAuthorityCode: this.$route.params.formModelData.taxAuthorityCode,
        socSecurUnitName: this.$route.params.formModelData.socSecurUnitName,
        collectAcNo: this.$route.params.resTable.collectAcNo,
        yhzh: this.$route.params.formModel.acNo,
        totalAmount: this.$route.params.formModel.totalAmount,
        totalNum: this.$route.params.formModel.totalNum,
        cxlsh: this.$route.params.resTable.qryJnl,
        taxPayerId: this.$route.params.resTable.taxPayerId,
        operBranchName: this.$route.params.resTable.operBranchName,
        operBranch: this.$route.params.resTable.operBranch,
        acList: this.$route.params.acList
      }
      httpPost('/eweb-common.GenToken.do').then(token => {
        _params._tokenName = token._tokenName
        const singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        httpPost('eweb-transfer.SocialSecurityContribution.do', {
          _tokenName: token._tokenName,
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg,
          ..._params
        }).then(res => {
          _params.JnlStatus = res._processState
          _params._jnlNo = res._jnlNo
          _params.transDate = res._transTime
          _params.transName = res._transName
          _params.operatorName = res.userName
          _params.operatorId = res.userId
          this.$router.push({
            name: 'socialSecurityPaymentRes',
            params: {
              ..._params,
              JnlStatus: res._processState,
              _jnlNo: res._jnlNo,
              transDate: res._transTime,
              transName: res.transName,
              operatorName: res.userName,
              operatorId: res.userId,
              acNo: this.formModel.acNo,
              acName: this.formModel.acName,
              acList: this.$route.params.acList
            }
          })
        })
      })
    },
    onBack () {
      this.$router.push({
        name: 'socialSecurityPaymentPer',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.tableData = this.$route.params.tableData
      this.formModelData = this.$route.params.formModelData
      this.formModel.totalAmount = this.$route.params.amountOfMoney
      this.formModel = this.$route.params.formModel
      this.formModel.zpph = this.$route.params.zpph
      this.formModel.zpxh = this.$route.params.zpxh
      this.formModel.acNo = this.$route.params.acNo
      console.log('333', this.tableData)
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
