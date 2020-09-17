<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-new-form :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @submit="onSubmit"
                @back="back">
    </m-new-form>
  </d2-container>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, trans_type_code } from '@/assets/js/entity'
export default {
  name: 'quotaUpdateConfirm',
  data: function () {
    return {
      fromWhere: '',
      data: ['企业管理台', '限额管理', '限额设置'],
      formModel: {
        acNo: '',
        acName: '',
        currency: '',
        transTypeCode: '',

        limitTrs: '',
        limitDay: '',
        limitMon: '',
        limitYear: '',
        limitDayCount: '',
        limitMonCount: '',
        limitYearCount: ''
      },
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '40%',
            group: [
              {
                'disabled': true,
                'label': '账号',
                'type': 'text',
                'key': 'acNo'
              },
              {
                'disabled': true,
                'label': '账户名称',
                'type': 'text',
                'key': 'acName'
              },
              {
                'disabled': true,
                'label': '币种',
                'type': 'text',
                'key': 'currency',
                formatter: (name, value) => util.handleEnums(currency_type, value)
              },
              {
                'disabled': true,
                'label': '限额名称',
                'type': 'text',
                'key': 'transTypeCode',
                formatter: (name, value) => util.handleEnums(trans_type_code, value)
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '40%',
            title: '限额信息',
            group: [
              {
                'disabled': true,
                'label': '单笔限额（元）',
                'type': 'text',
                'key': 'limitTrs',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '日累计限额（元）',
                'type': 'text',
                'key': 'limitDay',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '月累计限额（元）',
                'type': 'text',
                'key': 'limitMon',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '年累计限额（元）',
                'type': 'text',
                'key': 'limitYear',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '40%',
            title: '笔数信息',
            group: [
              {
                'disabled': true,
                'label': '日累计笔数',
                'type': 'text',
                'key': 'limitDayCount'
              }, {
                'disabled': true,
                'label': '月累计笔数',
                'type': 'text',
                'key': 'limitMonCount'
              }, {
                'disabled': true,
                'label': '年累计笔数',
                'type': 'text',
                'key': 'limitYearCount'
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
    onSubmit (formModel) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        let req = {
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg,
          _tokenName: token._tokenName,
          acNo: formModel.payerAcNoList[formModel.accountNo].acNo,
          // acName: formModel.acName,
          productId: formModel.productId,
          transTypeCode: formModel.transTypeCode,
          limitTrs: formModel.limitTrs,
          limitDay: formModel.limitDay,
          limitDayCount: formModel.limitDayCount,
          limitMon: formModel.limitMon,
          limitMonCount: formModel.limitMonCount,
          limitYear: formModel.limitYear,
          limitYearCount: formModel.limitYearCount
        }
        httpPost('/eweb-enterprise.CifAcLimitSet.do', req).then(res => {
          let data = this.$route.params.data
          let tableData = this.$route.params.tableData
          this.$router.push({
            name: 'quotaUpdateRes',
            params: {
              _JnlStatus: res._processState,
              _jnlNo: res._jnlNo,
              transDate: res._transTime,
              fromWhere: this.fromWhere,
              data: data,
              formModel: formModel,
              tableData: tableData
            }
          })
        })
      })
    },
    back () {
      let data = this.$route.params.data
      let formModel = this.$route.params.formModel
      let tableData = this.$route.params.tableData
      this.$router.push({
        name: 'quotaUpdateInput',
        params: {
          fromWhere: this.$route.params.fromWhere,
          data: data,
          formModel: formModel,
          tableData: tableData
        }
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
    }
  }
}
</script>
