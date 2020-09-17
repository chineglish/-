<template>
  <d2-container>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
        :btnData="btnData"
        :isDisabled="doSubmit"
        @submit="onSubmit"
        @back="onBack">
      </m-new-form>
    </div>
    <div class="form-box">
      <d-table
        :table-data="formConfigJson.promptList"
        :tableHeadData="formConfigJson.tableHeadData">
      </d-table>
    </div>
  </d2-container>
</template>
<script>
/**
 *@name: 批量转账确认页
 * @author: yuzq
 * @date: 2019-12-9
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'batchTransferConf',
  data () {
    const isInBank = [
      { value: '0', label: '行内' },
      { value: '1', label: '行外' }
    ]
    return {
      formModel: {
        payerAcNo: '',
        payerSubAcNo: '',
        amount: '',
        totalCount: '',
        activeName: ''
      },
      data: ['转账汇款', '批量转账确认'],
      // 以下为动态数据
      formConfigJson: {
        tableHeadData: [
          { label: '序号', prop: 'seq' },
          { label: '行内外标志', prop: 'trsType', show: this.$route.params.activeName !== 'first', formatter: (row, column, cellValue, index) => util.handleEnums(isInBank, cellValue) },
          { label: '收款行行号', prop: 'payeeBankId' },
          { label: '收款账户开户行行号', prop: 'payeeDeptId', width: '200' },
          { label: '收款人账号', prop: 'payeeAcNo' },
          { label: '收款人姓名', prop: 'payeeAcName' },
          { label: '金额', prop: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
          { label: '手续费', prop: 'feeAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
          { label: '附言', prop: 'postScript' }
        ],
        promptList: [],
        stepsActive: 1,
        formItems: [{
          formWidth: '50%',
          // labelWidth: '33%',
          title: '交易信息',
          group: [
            {
              'disabled': true,
              'label': '付款账号',
              'type': 'text',
              'key': 'payerAccontShow'
            },
            {
              'disabled': true,
              'label': '手续费',
              'type': 'text',
              'key': 'totalFeeAmount',
              formatter: (name, value) => util.formatCurrency(value)
            },
            {
              'disabled': true,
              'label': '总笔数',
              'type': 'text',
              'key': 'totalCount'
            },
            {
              'disabled': false,
              'label': '总金额',
              'type': 'text',
              'key': 'amount',
              formatter: (name, value) => util.formatCurrency(value)
            }
          ]
        }]
      },
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      doSubmit: true
    }
  },
  methods: {
    onSubmit (formModel) {
      /**
       * 发送接口数据
       */
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: formModel._Data2Sign, _authenticateType: formModel._authenticateType })
        let url = ''
        if (this.formModel.activeName === 'second') {
          url = 'eweb-transfer.BatchTransferAdd.do'
        } else {
          url = 'eweb-transfer.BatchTransfer.do'
        }
        httpPost(url, {
          _dataMapKey: formModel._dataMapKey,
          _authenticateTypeChoose: formModel._authenticateType ? formModel._authenticateType[0] : '',
          CSIISignature: singMsg,
          payerAcNo: formModel.payerAcNo,
          totalCount: formModel.totalCount,
          payerSubAcNo: this.formModel.payerSubAcNo,
          amount: formModel.amount,
          _tokenName: token._tokenName
        }).then(res => {
          this.$router.push({
            name: 'batchTransferRes',
            params: { formModel: this.formModel, res }
          })
        }).catch(e => {
        })
      })
    },
    onBack (data) {
      this.$router.push({
        name: 'batchTransfer',
        params: data,
        activeName: this.formModel.activeName
      })
    }
  },
  created () {
    this.formModel = this.$route.params
    this.formConfigJson.promptList = this.$route.params.postList
  }
}
</script>
