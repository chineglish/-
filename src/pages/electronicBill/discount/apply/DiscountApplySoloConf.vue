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
*@name: 出票登记-确认
*/
import { httpPost } from '@/api/sys/http'
import { bill_Type, endorse_Type, clearing_Type, payment_Type } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'DiscountApplySoloConf',
  data () {
    return {
      titleData: ['电子商业汇票', '贴现', '贴现申请确认'],
      bankList: [], // 银行列表
      formModel: {
      },
      formConfigJson: {
        stepsActive: 1,
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
          stdIntRate: [{ required: true, message: '协议付息比例', trigger: 'submit' }],
          stdInteMtd: [{ required: true, message: '付息方式', trigger: 'submit' }],
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
                'label': '入账账号',
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
          stdDsbkBnam: data.stdDsbkBnam, // 贴入人开户行行名
          _tokenName: token._tokenName,
          stdPropSgn: singMsg, // 电子签名
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }
        httpPost('eweb-edraft.Discount.do', params).then(res => {
          this.$router.push({
            name: 'DiscountApplyRes',
            params: {
              data: data, res
            }
          })
        })
      }).catch(err => {
        console.error(err)
      })
    },
    goBack () {
      this.$router.push({
        name: 'DiscountApplySolo',
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
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
