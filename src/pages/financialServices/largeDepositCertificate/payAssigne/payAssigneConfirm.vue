<template>
    <d2-container>
       <m-breadcrumb :data="data"></m-breadcrumb>
       <div class="form-box">
            <m-new-form :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @submit="onSubmit"
                @back="onBack">
            </m-new-form>
        </div>
    </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { lxzffans_type, drawType, saveDate, zr_type, price_type } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'payAssigneConfirm',
  data () {
    return {
      formModel: {
        accruedInterestUnpaid: ''
      },
      conFirmData: '',
      accruedInterest: {},
      data: ['理财服务', '大额存单', '单位大额存单受让确认'],
      // 以下为动态数据
      formConfigJson: {
        formWidth: '50%',
        stepsActive: 1,
        // labelWidth: '100%',
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '产品期次编号',
                'type': 'text',
                'key': 'chpnqcbh'
              },
              {
                'disabled': false,
                'label': '产品名称',
                'type': 'text',
                'key': 'chanpshm'
              },
              {
                'disabled': false,
                'label': '年利率(%)',
                'type': 'text',
                'key': 'zhxililv',
                formatter: (key, value) => util.formatInterestRate(value)
              },
              {
                'disabled': false,
                'label': '产品期限',
                'type': 'text',
                'key': 'depositTerm',
                formatter: (key, value) => util.handleEnums(saveDate, value)
              },
              {
                'disabled': false,
                'label': '支付利息方式',
                'type': 'text',
                'key': 'lxzffans',
                formatter: (key, value) => util.handleEnums(lxzffans_type, value)
              },
              {
                'disabled': false,
                'label': '支取标识',
                'type': 'text',
                'key': 'isAllowAdvancedDraw',
                formatter: (key, value) => util.handleEnums(drawType, value)
              },
              {
                'disabled': false,
                'label': '受让账号',
                'type': 'text',
                'key': 'srrkehzh'
              },
              {
                'disabled': false,
                'label': '受让账户名称',
                'type': 'text',
                'key': 'srrmingc'
              },
              // 1 : 部分转让 ,0: 全部转让
              {
                'disabled': false,
                'label': '转让类型',
                'type': 'text',
                'key': 'zhraleix',
                formatter: (key, value) => util.handleEnums(zr_type, value)
              },
              {
                'disabled': true,
                'label': '受让份额',
                'type': 'text',
                'key': 'shareAmount',
                formatter: (key, cellValue) => util.formatCurrency(cellValue)
              },
              // 0: 系统定价， 1: 客户定价
              {
                'disabled': false,
                'label': '定价方式',
                'type': 'text',
                'key': 'djiafshi',
                formatter: (key, value) => util.handleEnums(price_type, value)
              },
              {
                'disabled': true,
                'label': '受让价格',
                'type': 'text',
                'key': 'zhuanrje',
                formatter: (key, cellValue) => util.formatCurrency(cellValue)
              },
              { // 系统定价是不显示
                'disabled': false,
                'label': '已计提利息',
                'type': 'text',
                'key': 'leijlixi',
                formatter: (key, value) => util.formatCurrency(value),
                show: false
              }
            ]

          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    onSubmit (data) {
      const params = {
        taskId: data.taskId,
        isConfirm: this.conFirmData, // 是否通过 0：通过  1：拒绝
        kehuzhao: data.kehuzhao,
        srrzihxh: data.srrzihxh,
        srrkehzh: data.srrkehzh,
        zhhaoxuh: data.zhhaoxuh,
        zhuanrje: data.zhuanrje,
        prdBatchCode: data.chpnqcbh,
        chanpshm: data.chanpshm,
        actualRate: data.zhxililv,
        depositTerm: data.depositTerm,
        lxzffans: data.lxzffans,
        isAllowAdvancedDraw: data.isAllowAdvancedDraw,
        srrmingc: data.srrmingc,
        drawType: data.zhraleix,
        priceType: data.djiafshi,
        shareAmount: data.shareAmount,
        amount: data.zhuanrje,
        accruedInterestUnpaid: data.leijlixi

      }
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: data._Data2Sign, _authenticateType: data._authenticateType })
        httpPost('/eweb-largeDeposit.LargeDepositAssignAffirm.do', {
          ...params,
          _tokenName: token._tokenName,
          _dataMapKey: data._dataMapKey,
          _authenticateTypeChoose: data._authenticateType ? data._authenticateType[0] : '',
          CSIISignature: singMsg
        }).then(res => {
          // Object.assign(res, data)
          this.$router.push({
            name: 'payAssigneResult',
            params: {
              res,
              data
            }
          })
        })
      })
    },
    onBack () {
      this.$router.push({
        name: 'payDealBook',
        params: this.$route.params.res
      })
    }
  },
  created () {
    this.conFirmData = this.$route.params.params.isConfirm
    this.accruedInterest = this.$route.params
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params.res)
    }
    if (this.accruedInterest.params.priceType === '0') {
      this.formConfigJson.formItems[0].group[12].show = false
    } else {
      this.formConfigJson.formItems[0].group[12].show = true
    }
  }
}
</script>

<style  scoped>
    .form-box{
        width :1120px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    }
</style>
