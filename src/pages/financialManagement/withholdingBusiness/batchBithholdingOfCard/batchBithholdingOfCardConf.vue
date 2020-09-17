<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
      <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
        :btnData="btnData"
        @submit="onSubmit"
        @back="onBack">
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '../../../../api/sys/http'
import util from '@/libs/util'
import { currency_type } from '@/assets/js/entity'
const holdingType = {
  '1': '借记卡代扣',
  '2': '信用卡代扣'
}
const itemType = {
  '2001': '批量代扣'
}
const asFlagType = {
  '1': '需要',
  '0': '不需要'
}
export default {
  name: 'batchBithholdingOfCardConf',
  data () {
    return {
      formModel: {
        withholdingType: '',
        rcvAcNo: '',
        rcvAcName: '',
        asAcNo: '',
        asAcName: '',
        currencyCode: '',
        totalAmount: '',
        capitalMoney: '',
        count: '',
        recordNum: '',
        purpose: '',
        postscript: '',
        asFlag: '',
        rcvAccaddr: '',
        itemNo: '',
        fieldNum: ''
      },
      breadData: ['财务管理', '代扣业务', '批量信用卡代扣业务确认页'],
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'type': 'text',
                'label': '代扣类型',
                'key': 'withholdingType',
                formatter: (key, value) => holdingType[value]
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '收款账号',
                'key': 'rcvAcNo'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '收款户名',
                'key': 'rcvAcName'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '账簿号',
                'key': 'asAcNo',
                'show': true
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '账簿名',
                'key': 'asAcName',
                'show': true
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '币种',
                'key': 'rcvCurCode',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '总金额',
                'key': 'totalAmount'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '金额大写',
                'key': 'capitalMoney'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '总笔数',
                'key': 'count'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '总条数',
                'key': 'recordNum'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '摘要',
                'key': 'purpose'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '附言',
                'key': 'postscript'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '是否使用账簿',
                'key': 'asFlag',
                formatter: (key, value) => asFlagType[value]
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '收款地址',
                'key': 'rcvAccaddr'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '收款类型',
                'key': 'itemNo',
                formatter: (key, value) => itemType[value]
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '字段数',
                'key': 'fieldNum'
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
    onSubmit (params) {
      let _params = this.$route.params.formModel
      httpPost('/eweb-common.GenToken.do').then(token => {
        this.formModel._tokenName = token._tokenName
        const singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        httpPost('/eweb-transfer.CreditCardBulkWithholding.do', {
          _tokenName: token._tokenName,
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg,
          userSeq: _params.userSeq,
          roleSeq: _params.roleSeq,
          acList: _params.cifAcList,
          rcvAcNo: _params.rcvAcNo,
          rcvAcName: _params.rcvAcName,
          rcvCurCode: _params.rcvCurCode,
          supplyItem: this.formModel.itemNo,
          amount: _params.amount,
          count: _params.count,
          recordNum: _params.recordNum,
          purpose: _params.purpose,
          postscript: _params.postscript,
          asFlag: _params.asFlag,
          rcvAccaddr: _params.rcvAccaddr,
          fieldNum: _params.fieldNum,
          asAcNo: _params.asAcNo,
          asAcName: _params.asAcName
        }).then(res => {
          _params.JnlStatus = res._processState
          _params._jnlNo = res._jnlNo
          _params.transDate = res._transTime
          _params.transName = res.transName
          _params.operatorName = res.userName
          _params.operatorId = res.userId
          this.$router.push({
            name: 'batchBithholdingOfCardRes',
            params: {
              ...params,
              JnlStatus: res._processState,
              _jnlNo: res._jnlNo,
              transDate: res._transTime,
              transName: res.transName,
              operatorName: res.userName,
              operatorId: res.userId,
              _Data2Sign: res._Data2Sign,
              _authenticateType: res._authenticateType
            }
          })
        })
      })
    },
    onBack (data) {
      this.$router.push({
        name: 'batchBithholdingOfCard',
        params: this.formModel
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
      // this.tableData.rcvCurCode = util.handleEnums(currency_type, this.formModel.rcvCurCode)
      // if (this.formModel.asFlag === 1) {
      // }
      switch (this.formModel.asFlag) {
        case '1':
          this.formConfigJson.formItems[0].group[3].show = true
          this.formConfigJson.formItems[0].group[4].show = true
          break
        case '0':
          this.formConfigJson.formItems[0].group[3].show = false
          this.formConfigJson.formItems[0].group[4].show = false
          break
      }
      this.formModel.withholdingType = this.$route.params.withholdingType
      this.formModel.capitalMoney = this.$route.params.capitalMoney
      this.formModel.itemNo = this.$route.params.itemNo
    }
  }
}
</script>

<style scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
    .form-box >>> .el-checkbox__input.is-disabled+span.el-checkbox__label {
      color: #333333;
    }
</style>
