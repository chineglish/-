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
import { lxzffans_type, saveDate, drawType } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'payForComfirm',
  data () {
    return {
      formModel: {},
      formType: {},
      data: ['理财服务', '大额存单', '单位大额存单转让确认'],
      // 以下为动态数据
      formConfigJson: {
        formWidth: '50%',
        stepsActive: 1,
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '产品期次编号',
                'type': 'text',
                'key': 'prdBatchCode'
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
                'key': 'actualRate',
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
                'label': '转让账号',
                'type': 'text',
                'key': 'lDAcNo'
              },
              {
                'disabled': false,
                'label': '转让账户名称',
                'type': 'text',
                'key': 'crrmingc'
              },
              {
                'disabled': false,
                'label': '开户金额',
                'type': 'text',
                'key': 'openAmount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '可用余额',
                'type': 'text',
                'key': 'actBal',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '转让类型',
                'type': 'radio',
                'options': [{ 'value': '全部转让', 'key': '0' }, { 'value': '部分转让', 'key': '1' }],
                'key': 'drawType',
                'changeEventName': 'draw'
              },
              {
                'disabled': true,
                'label': '转让份额',
                'type': 'input',
                'key': 'share'
              },
              {
                'disabled': true,
                'label': '定价方式',
                'type': 'text',
                'options': [{ 'value': '系统定价', 'key': '0' }, { 'value': '客户定价', 'key': '1' }],
                'key': 'priceType',
                'changeEventName': 'priceType'
              },
              {
                'disabled': true,
                'label': '转让价格',
                'type': 'input',
                'key': 'amount'
              },
              {
                'disabled': false,
                'label': '已计提利息',
                'type': 'text',
                'key': 'accruedInterestUnpaid',
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
        lDAcNo: data.lDAcNo,
        actBal: data.actBal,
        actualRate: data.actualRate,
        benjinnn: data.benjinnn,
        chanpshm: data.chanpshm,
        chaohubz: data.chaohubz,
        crrfuzzh: data.crrfuzzh,
        crrkaihh: data.crrkaihh,
        crrkehzh: data.crrkehzh,
        crrmingc: data.crrmingc,
        crrzihxh: data.crrzihxh,
        depositTerm: data.depositTerm,
        drawType: data.drawType,
        faxingnd: data.faxingnd,
        faxiqici: data.faxiqici,
        fkzhzftj: data.fkzhzftj,
        huobdaih: data.huobdaih,
        isAllowAdvancedDraw: data.isAllowAdvancedDraw,
        kehuleix: data.kehuleix,
        kehuzhlx: data.kehuzhlx,
        lxzffans: data.lxzffans,
        openAmount: data.openAmount,
        pngzphao: data.pngzphao,
        pngzxhao: data.pngzxhao,
        pngzzlei: data.pngzzlei,
        prdBatchCode: data.prdBatchCode,
        priceType: data.priceType,
        rengbhao: data.rengbhao,
        subAcNo: data.subAcNo,
        tsckztai: data.tsckztai,
        zhanghao: data.zhanghao,
        zhjhaoma: data.zhjhaoma,
        zhjnzlei: data.zhjnzlei,
        zhrafish: data.zhrafish,
        zhramfjg2: data.zhramfjg,
        amount: data.amount,
        share: data.share,
        accruedInterestUnpaid: data.accruedInterestUnpaid
      }
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: data._Data2Sign, _authenticateType: data._authenticateType })
        httpPost('/eweb-largeDeposit.LargeDepositAssignApply.do', {
          ...params,
          _tokenName: token._tokenName,
          _dataMapKey: data._dataMapKey,
          _authenticateTypeChoose: data._authenticateType ? data._authenticateType[0] : '',
          CSIISignature: singMsg
        }).then(res => {
          this.$router.push({
            name: 'payForResult',
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
        name: 'payForInner'
      })
    }
  },
  created () {
    this.formType = this.$route.params
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
    }
    if (this.formType.priceType === '0') {
      this.formConfigJson.formItems[0].group[14].show = false
    } else {
      this.formConfigJson.formItems[0].group[14].show = true
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
