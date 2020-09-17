<template>
    <d2-container>
       <m-breadcrumb :data="data"></m-breadcrumb>
       <div class="form-box">
            <m-new-form :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @submit="onSubmit"
                @back="onBack"
                @changeUp="changeUp"
                @changeZhramfjg="changeZhramfjg"
                @draw="draw"
                >
            </m-new-form>
        </div>
    </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { lxzffans_type, saveDate, drawType } from '@/assets/js/entity'
import util from '@/libs/util'
import { mapMutations } from 'vuex'
export default {
  name: 'payForInner',
  data () {
    return {
      formModel: {
        lDAcNo: '',
        actBal: '',
        depositTerm: '',
        drawType: '0',
        priceType: '',
        amount: '',
        share: '',
        prdBatchCode: '',
        accruedInterestUnpaid: ''
      },
      formType: {},
      data: ['理财服务', '大额存单', '单位大额存单转让录入'],
      formConfigJson: {
        formWidth: '50%',
        stepsActive: 0,
        rules: {
          share: [{ required: true, message: '转让份额', trigger: 'change' },
            { validator: (rule, value, callback) => {
              this.formModel.share = value
              if (Number(value < 10000000)) {
                callback(new Error('转让份额不小于一千万，可以等于一千万'))
              } else if (Number(value % 10000) !== 0) {
                callback(new Error('转让份额必须是一万的整数倍'))
              } else {
                callback()
              }
            },
            trigger: 'submit' }
          ],
          amount: [{ required: true, message: '转让价格', trigger: 'change' },
            { validator: (rule, value, callback) => {
              this.formModel.amount = value
              if (Number(value < 10000000)) {
                callback(new Error('转让价格需大于一千万'))
              } else {
                callback()
              }
            },
            trigger: 'submit' }
          ]
        },
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
                'disabled': false,
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
                'key': 'share',
                maxlength: 13,
                keydownEventName: 'limitMoneyInputKeyDown',
                oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                'inputEventName': 'changeUp'
              },
              {
                'disabled': false,
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
                'key': 'amount',
                maxlength: 13,
                // inputType: 'money',
                keydownEventName: 'limitMoneyInputKeyDown',
                oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                'inputEventName': 'changeZhramfjg'
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
      ],
      res: {},
      djPrice: {}
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.share = util.limitInputMoney(res.share)
      this.formModel.amount = res.share
    },
    changeZhramfjg (res) {
      res.amount = util.limitInputMoney(res.amount)
    },
    // 确定
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
      httpPost('/eweb-largeDeposit.LargeDepositAssignApplyConfirm.do', params).then(res => {
        Object.assign(res, data)
        if (data.drawType === '1') {
          if (Number(data.actBal - data.share) < 10000000) {
            this.$msg('部分转让时剩余可用余额需大于一千万')
          } else {
            this.$router.push({
              name: 'payForComfirm',
              params: res
            })
          }
        } else {
          this.$router.push({
            name: 'payForComfirm',
            params: res
          })
        }
      })
    },
    onBack () {
      this.$router.push({
        name: 'payForQuery',
        params: this.$route.params.res
      })
      this.removeKeepAliveList()
    },
    // 转让份额
    draw (res) {
      if (res.drawType === '1') {
        this.formModel.share = ''
        this.formConfigJson.formItems[0].group[this.formConfigJson.formItems[0].group.length - 5].disabled = false
      } else {
        this.formConfigJson.formItems[0].group[this.formConfigJson.formItems[0].group.length - 5].disabled = true
        this.formModel.share = this.formModel.actBal
        this.formModel.amount = this.formModel.actBal
      }
    },
    lixiQuery () {
      const params = {
        acNo: this.formModel.lDAcNo,
        subAccNo: this.formModel.subAcNo
      }
      httpPost('/eweb-largeDeposit.EntLarDepAssAccInfoQry.do', params).then(res => {
        this.formModel.accruedInterestUnpaid = res.accruedInterestUnpaid
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.formType = this.$route.params.res
    // 查询页到录入页
    if (this.$route.params.res) {
      this.res = this.$route.params.res
      Object.assign(this.formModel, this.$route.params.res)
      this.formModel.share = this.$route.params.res.actBal
      this.formModel.amount = this.res.actBal
    }
    this.djPrice = this.$route.params.res
    if (this.djPrice.priceType === '1') {
      this.formConfigJson.formItems[0].group[13].disabled = false
    } else {
      this.formConfigJson.formItems[0].group[13].disabled = true
    }
    if (this.formType.priceType === '0') {
      this.formConfigJson.formItems[0].group[14].show = false
    } else {
      this.lixiQuery()
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
