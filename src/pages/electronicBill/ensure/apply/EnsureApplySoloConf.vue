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
            >
            </m-new-form>
        </div>
    </div>
</template>
<script>
/**
     *@name: 提示保证申请录入
     */
import userQuery from '../../module/userQuery'
import { ensure_Type } from '@/assets/js/entity'
import util from '@/libs/util'
import { httpPost } from '@/api/sys/http'
export default {
  name: 'EnsureApplySoloConf',
  components: {
    userQuery
  },
  data () {
    return {
      titleData: ['电子商业汇票', '保证', '提示保证申请确认'],
      showUserQuery: false,
      formModel: {
      },
      formConfigJson: {
        stepsActive: 1,
        rules: {},
        formItems: [
          {
            title: '票据信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '票据号码',
                'type': 'text',
                'key': 'stdBillNum'
              },
              {
                'disabled': false,
                'label': '保证类型',
                'type': 'text',
                'key': 'stdGuarTyp',
                formatter: (key, value) => util.handleEnums(ensure_Type, value)
              },
              {
                'disabled': false,
                'label': '保证申请日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'stdApplDat'
              }
            ]
          },
          {
            title: '被保证人信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '被保证人账户',
                'type': 'text',
                'key': 'account'
              },
              {
                'disabled': false,
                'label': '被保证人账户名称',
                'type': 'text',
                'key': 'name'
              },
              {
                'disabled': false,
                'label': '被保证人组织机构代码',
                'type': 'text',
                'key': 'code'
              },
              {
                'disabled': false,
                'label': '被保证人开户行号',
                'type': 'text',
                'key': 'bankNumber'
              }
            ]
          },
          {
            title: '保证人信息',
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '保证人名称',
                'type': 'text',
                'key': 'stdWareNam'
              },
              {
                'disabled': false,
                'label': '保证人账号',
                'type': 'text',
                'key': 'stdWareAcc'
              },
              {
                'disabled': false,
                'label': '保证人开户行号',
                'type': 'text',
                'key': 'stdWareBnm'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '取消', class: 'm-cancel-btn', clickEventName: 'goBack' }]
    }
  },
  methods: {
    submit (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        let params = {}
        if (this.formModel.stdGuarTyp === '01') {
          params = {
            stdBillNum: data.stdBillNum, // 票号
            stdBillTyp: data.stdBillTyp, // 票据类型
            // stdAccpAmt: data.stdPmMoney, // 金额 注意转义
            stdGteeTyp: data.stdDrwrTyp, // 被保证人类型
            stdGteeNam: data.name, // 被保证人名称
            stdGteeCod: data.code, // 被保证人组织机构代码
            stdGteeAcc: data.account, // 被保证人账号
            stdGteeBnm: data.bankNumber, // 被保证人行号
            stdPmMoney: data.stdPmMoney, // 票面金额
            stdGuarTyp: data.stdGuarTyp, // 保证类型
            stdApplDat: data.stdApplDat, // 保证申请日期
            stdWareNam: data.stdWareNam, // 保证人名称
            stdWareAcc: data.stdWareAcc, // 保证人账号
            stdWareBnm: data.stdWareBnm, // 保证人行号
            _tokenName: token._tokenName,
            stdEndrSgn: singMsg, // 电子签名
            _dataMapKey: this.$route.params._dataMapKey,
            _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
            CSIISignature: singMsg
          }
        }
        if (this.formModel.stdGuarTyp === '02') {
          params = {
            stdBillNum: data.stdBillNum, // 票号
            stdBillTyp: data.stdBillTyp, // 票据类型
            // stdAccpAmt: data.stdPmMoney, // 金额 注意转义
            stdGteeTyp: data.stdRcvType, // 被保证人类型
            stdGteeNam: data.name, // 被保证人名称
            stdGteeCod: data.code, // 被保证人组织机构代码
            stdGteeAcc: data.account, // 被保证人账号
            stdGteeBnm: data.bankNumber, // 被保证人行号
            stdPmMoney: data.stdPmMoney, // 票面金额
            stdGuarTyp: data.stdGuarTyp, // 保证类型
            stdApplDat: data.stdApplDat, // 保证申请日期
            stdWareNam: data.stdWareNam, // 保证人名称
            stdWareAcc: data.stdWareAcc, // 保证人账号
            stdWareBnm: data.stdWareBnm, // 保证人行号
            _tokenName: token._tokenName,
            stdEndrSgn: singMsg, // 电子签名
            _dataMapKey: this.$route.params._dataMapKey,
            _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
            CSIISignature: singMsg
          }
        }
        if (this.formModel.stdGuarTyp === '03') {
          params = {
            stdBillNum: data.stdBillNum, // 票号
            stdBillTyp: data.stdBillTyp, // 票据类型
            // stdAccpAmt: data.stdPmMoney, // 金额 注意转义
            stdGteeTyp: data.stdAppType, // 被保证人类型
            stdGteeNam: data.name, // 被保证人名称
            stdGteeCod: data.code, // 被保证人组织机构代码
            stdGteeAcc: data.account, // 被保证人账号
            stdGteeBnm: data.bankNumber, // 被保证人行号
            stdPmMoney: data.stdPmMoney, // 票面金额
            stdGuarTyp: data.stdGuarTyp, // 保证类型
            stdApplDat: data.stdApplDat, // 保证申请日期
            stdWareNam: data.stdWareNam, // 保证人名称
            stdWareAcc: data.stdWareAcc, // 保证人账号
            stdWareBnm: data.stdWareBnm, // 保证人行号
            _tokenName: token._tokenName,
            stdEndrSgn: singMsg, // 电子签名
            _dataMapKey: this.$route.params._dataMapKey,
            _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
            CSIISignature: singMsg
          }
        }
        httpPost('eweb-edraft.GuaranteeApply.do', params).then(res => {
          this.$router.push({
            name: 'EnsureApplyRes',
            params: { data: data, res }
          })
        })
      }).catch(err => {
        console.error(err)
      })
    },
    goBack () {
      this.$router.push({
        name: 'EnsureApplySolo',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
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
