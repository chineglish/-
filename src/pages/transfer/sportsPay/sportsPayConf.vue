<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              :msgs="msgs"
              @back="back"
              @submit="submit">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 *@name: 体彩缴费确认
 */
import { httpPost } from '@/api/sys/http'
export default {
  name: 'sportsPayConf',
  data () {
    return {
      titleData: ['转账汇款', '体彩缴费'],
      formModel: {
        payArea: '',
        payItem: '',
        chargeUnit: '',
        lotterytype: '',
        betStationNum: '',
        cifName: '',
        cifAddrs: '',
        amount: ''
      },
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '缴费地区',
                'type': 'text',
                'key': 'payArea'
              }, {
                'disabled': true,
                'label': '缴费项目',
                'type': 'text',
                'key': 'payItem'
              }, {
                'disabled': true,
                'label': '收费单位',
                'type': 'text',
                'key': 'chargeUnit'
              }, {
                'disabled': true,
                'label': '彩票类型',
                'type': 'text',
                'key': 'lotterytype'
              }, {
                'disabled': true,
                'label': '投注站编号',
                'type': 'text',
                'key': 'betStationNum'
              }, {
                'disabled': true,
                'label': '客户姓名',
                'type': 'text',
                'key': 'cifName'
              }, {
                'disabled': true,
                'label': '客户地址',
                'type': 'text',
                'key': 'cifAddrs'
              }, {
                'disabled': true,
                'label': '缴款金额',
                'type': 'text',
                'key': 'amount'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      msgs: []
    }
  },
  methods: {
    submit (data) {
      const routeParams = { ...data }
      const transDateObj = new Date()
      let singMsg = this.isSign({ _Data2Sign: data._Data2Sign, _authenticateType: data._authenticateType })
      const params = {
        _dataMapKey: data._dataMapKey,
        _authenticateTypeChoose: data._authenticateType ? data._authenticateType[0] : '',
        CSIISignature: singMsg,
        lotteryType: data.lotteryType,
        lotteryCenterNumber: data.lotteryCenterNumber,
        payerAcNo: data.payerAcNo,
        amount: data.amount,
        cifName: data.cifName,
        cifAddrs: data.cifAddrs
      }
      /**
       * 发送接口数据
       */
      httpPost('/eweb-common.GenToken.do').then(token => {
        params._tokenName = token._tokenName
        httpPost('eweb-transfer.LotteryPayFee.do', params).then(res => {
          routeParams.JnlStatus = '1' // ’1‘ 代表成功，‘0’ 代表失败
          Object.assign(routeParams, res)
          this.$router.push({
            name: 'sportsPayRes',
            params: {
              msg: routeParams,
              transDateObj,
              res: res
            }
          })
        })
      })
    },
    back () {
      this.$router.back()
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
    }
    switch (this.formModel.lotteryType) {
      case '0120000501':
        this.formModel.lotterytype = '电脑彩票'
        break
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
