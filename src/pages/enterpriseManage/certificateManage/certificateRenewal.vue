<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <div>
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @chanegPayerAccNo="chanegPayerAccNo"
        @submit="onSubmit"
        @back="onBack">
        <!-- todo -->
        <!-- <div class="checkBalances" slot="checkBalances">
          <el-button type="primary" size="mini" @click="changeBalances" class="m-submit-btn fs14">查询余额</el-button>
          <span>{{balances | Money}}元</span>
        </div> -->
      </m-new-form>
    </div>
  </d2-container>
</template>

<script type="text/javascript">
import { httpPost } from '../../../api/sys/http'
import util from '../../../libs/util'

export default {
  name: 'certificateRenewal',
  data: function () {
    return {
      signBtn: '',
      balances: '',
      formModel: {
        payerAcNo: '',
        payerAcName: '',
        feesUserId: '',
        amount: '',
        payCertNo: '',
        fundUsage: ''
      },
      data: ['企业管理', '证书管理', '证书续费'],
      // 以下为动态数据
      formConfigJson: {
        stepsActive: 0,
        rules: {
          payerAcNo: [{ required: true, message: '缴费账户', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '缴费账户',
                'type': 'select',
                'key': 'payerAcNo',
                'options': [],
                changeEventName: 'chanegPayerAccNo'
                // 'rightSlotName': 'checkBalances'
              },
              {
                label: '可用余额',
                type: 'text',
                key: 'balances',
                textType: 'shy'
              },
              {
                'disabled': false,
                'label': '缴费操作员号',
                'type': 'text',
                'key': 'feesUserId'
              },
              {
                'disabled': false,
                'label': '缴费金额',
                'type': 'text',
                'key': 'amount'
              },
              {
                'disabled': false,
                'label': '证书编号',
                'type': 'text',
                'key': 'payCertNo'
              },
              {
                'disabled': false,
                'label': '摘要',
                'type': 'text',
                'key': 'fundUsage'
              }
            ]
          }]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  created () {
    this.initData()
  },
  methods: {
    // 初始化默认参数
    initData () {
      // 查询账户列表及账户余额
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'CertFees' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
          .map(item => (
            { value: util.getPayerAccount(item), key: item.acNo + '/' + item.subAcNo + '/' + item.acName }
          ))
        this.formModel.payerAcNo = res.AcList[0].acNo + '/' + res.AcList[0].subAcNo + '/' + res.AcList[0].acName
        httpPost('eweb-acmgmt.AccountInfoQuery.do', {
          payerAcNo: res.AcList[0].acNo,
          payerSubAcNo: res.AcList[0].subAcNo
        }).then(bal => {
          this.$set(this.formModel, 'balances', bal.availBal)
          // this.balances = bal.availBal
        }).catch(e => {
          this.$set(this.formModel, 'balances', '未查询到账户余额')
          console.error(e)
        })
      }).catch(err => {
        console.error(err)
      })
      // 查询缴费金额
      httpPost('/eweb-common.CertFeesParamQry.do', { TransCode: 'CertFees' }).then(list => {
        this.formModel.amount = util.formatCurrency(list.feeAmount)
      })
      // 初始化数据
      this.formModel.fundUsage = '操作员证书缴费'
      this.formModel.feesUserId = this.$route.params.formModel.feesUserId
      this.formModel.payCertNo = this.$route.params.formModel.usbKeySn
      this.formModel.feesUserSeq = this.$route.params.formModel.feesUserSeq
      this.formModel.feesUserName = this.$route.params.formModel.feesUserName
      // 返回判断 赋值
      if (typeof this.formModel.payCertNo === 'undefined') {
        this.formModel.payCertNo = this.$route.params.formModel.payCertNo
      }
    },
    chanegPayerAccNo (data) {
      this.formModel = data
      httpPost('/eweb-common.CertFeesParamQry.do', { TransCode: 'CertFees' }).then(list => {
        this.formModel.amount = util.formatCurrency(list.feeAmount)
      })
      const [accNo, subAccNo] = (this.formModel.payerAcNo || '').split('/')
      const params = {
        payerAcNo: accNo,
        payerSubAcNo: subAccNo
      }
      // this.balances = ''
      httpPost('/eweb-acmgmt.AccountInfoQuery.do', params).then(AccountInfo => {
        this.$set(this.formModel, 'balances', AccountInfo.availBal)
        // this.balances = AccountInfo.availBal
      }).catch(AccountInfo => {
        this.$set(this.formModel, 'balances', '未查询到账户余额')
        // this.balances = '未查询到账户余额'
      })
    },
    onSubmit (data) {
      const [accNo, subAccNo, acName] = (data.payerAcNo || '').split('/')
      const params = {
        ...data,
        payerAcNo: accNo,
        payerSubAcNo: subAccNo,
        payerAcName: acName
      }
      if (Number(data.balances) < Number(data.amount)) {
        this.$msg('余额不足')
      } else {
        httpPost('/eweb-enterprise.CertFeesConfirm.do', params).then(conf => {
          let _params = params
          _params._Data2Sign = conf._Data2Sign
          _params._dataMapKey = conf._dataMapKey
          _params._authenticateType = conf._authenticateType
          this.$router.push({
            name: 'certificateConfirm',
            params: {
              formModel: _params
            }
          })
        })
      }
    },
    onBack () {
      this.$router.push({
        name: 'enterpriseManage'
      })
    }
    // changeBalances () {
    //   const [accNo, subAccNo] = (this.formModel.payerAcNo || '').split('/')
    //   const params = {
    //     payerAcNo: accNo,
    //     payerSubAcNo: subAccNo
    //   }
    //   httpPost('/eweb-acmgmt.AccountInfoQuery.do', params).then(AccountInfo => {

    //     this.balances = AccountInfo.availBal
    //   }).catch(AccountInfo => {
    //     this.balances = '未查询到余额'
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
    .title{
        background: #FDF2F3;
        color: #333333;
        line-height: 40px;
        margin: 30px 0px;

        .title-separate{
            margin-left: 20px;
            background: #D41618;
            width: 6px;
            height: 28px;
        }
    }
    .checkBalances{
        width: 30%;
        height: 35px;
        display: flex;
        display: inline-block\9;
        justify-content: space-between;
        margin-left: 2.5%;

        .m-submit-btn{
            margin: 0!important;
            padding: 0 10px!important;
        }
    }
</style>
