<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        ref="mNewForm"
        :componentJson="formConfigJson"
        :formModel="formModel"
        :btnData="btnData"
        @changeUp="changeUp"
        @AccNoChange="AccNoChange"
        @payerAccNoChange="payerAccNoChange"
        @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
        @submit="onSubmit"
        @reset="reset"
        >
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 *@name: 卡
 * @author: 陈天浩
 * @date: 2020-04-23
 */
// @payerAccNoChange="payerAccNoChange"
import util from '@/libs/util'
import { currency_type } from '@/assets/js/entity'
import { httpPost } from '@/api/sys/http'
export default {
  name: 'batchBithholdingOfCard',
  data () {
    return {
      breadData: ['财务管理', '代扣业务', '批量代扣业务录入页'],
      formModel: {
        amount: '',
        uploadFile: [],
        withholdingType: '2',
        acNo: '',
        purpose: '水费',
        itemNo: '2001',
        asFlag: '1',
        acName: '',
        asAcNo: '',
        asAcName: '',
        count: '',
        recordNum: '',
        fieldNum: '',
        currencyCode: '',
        capitalMoney: '',
        postscript: '',
        rcvAccaddr: ''
      },
      payerAccNoList: [], // 收款账户信息列表
      // url: '/eweb-transfer.DebitCardBulkWithholding.do',
      formConfigJson: {
        stepsActive: 0,
        rules: {
          withholdingType: [{ required: true, message: '代扣类型', trigger: 'submit' }],
          acNo: [{ required: true, message: '收款账号', trigger: 'submit' }],
          acName: [{ required: true, message: '收款户名', trigger: 'submit' }],
          // asAcNo: [{ required: true, message: '账簿号', trigger: 'submit' }],
          // asAcName: [{ required: true, message: '账簿名', trigger: 'submit' }],
          count: [{ required: true, message: '总笔数', trigger: 'submit' }],
          amount: [{ required: true, message: '总金额', trigger: 'submit' }],
          purpose: [{ required: true, message: '摘要', trigger: 'submit' }],
          uploadFile: [{ required: true, message: '上传附件', trigger: 'submit' }],
          recordNum: [{ required: true, message: '总条数', trigger: 'submit' }],
          asFlag: [{ required: true, message: '是否使用账簿', trigger: 'submit' }],
          itemNo: [{ required: true, message: '收款类型', trigger: 'submit' }],
          fieldNum: [{ required: true, message: '字段数', trigger: 'submit' }],
          currencyCode: [{ required: true, message: '币种', trigger: 'submit' }],
          capitalMoney: [{ required: true, message: '金额大写', trigger: 'submit' }]
        },
        formWidth: '50%',
        formItems: [
          {
            title: '代扣信息',
            group: [
              {
                'disable': 'false',
                'label': '代扣类型',
                'type': 'select',
                'options': [
                  { 'key': '1', 'value': '借记卡代扣' },
                  { 'key': '2', 'value': '信用卡代扣' }
                ],
                'key': 'withholdingType'
              },
              {
                'disable': 'false',
                'label': '收款账号',
                'type': 'select',
                'options': [],
                'key': 'acNo',
                trans: { value: 'payerAcNoShow' },
                'changeEventName': 'payerAccNoChange'
              },
              {
                'disable': 'false',
                'label': '收款户名',
                'key': 'acName',
                'type': 'text'
              },
              {
                'disable': 'false',
                'label': '账簿号',
                'key': 'asAcNo',
                'type': 'text',
                'show': true
              },
              {
                'disable': 'false',
                'label': '账簿名',
                'key': 'asAcName',
                'type': 'text',
                'show': true
              },
              {
                'disable': 'false',
                'label': '币种',
                'key': 'currencyCode',
                'type': 'text',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disable': 'false',
                'label': '总金额',
                'key': 'amount',
                'type': 'input',
                inputType: 'money',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                'content': '(元)',
                'inputEventName': 'changeUp'
              },
              {
                'label': '金额大写',
                'key': 'capitalMoney',
                'type': 'text'
              },
              {
                'disable': 'false',
                'label': '总笔数',
                'key': 'count',
                'type': 'input'
              },
              {
                'disable': 'fasle',
                'label': '总条数',
                'key': 'recordNum',
                'type': 'input'
              },
              {
                'disable': 'false',
                'label': '摘要',
                'key': 'purpose',
                'type': 'select',
                'options': [
                  { 'value': '水费', 'key': '水费' },
                  { 'value': '电费', 'key': '电费' },
                  { 'value': '电视费', 'key': '电视费' },
                  { 'value': '学费', 'key': '学费' },
                  { 'value': '税费', 'key': '税费' },
                  { 'value': '按揭', 'key': '按揭' },
                  { 'value': '卫生费', 'key': '卫生费' },
                  { 'value': '管理费', 'key': '管理费' },
                  { 'value': '租金', 'key': '租金' },
                  { 'value': '扣划', 'key': '扣划' },
                  { 'value': '罚金', 'key': '罚金' },
                  { 'value': '排污费', 'key': '排污费' },
                  { 'value': '信息费', 'key': '信息费' },
                  { 'value': '宽频费', 'key': '宽频费' },
                  { 'value': '互联网', 'key': '互联网' },
                  { 'value': '保险费', 'key': '保险费' },
                  { 'value': '代收', 'key': '代收' }
                ]
              },
              {
                'disable': 'false',
                'label': '附言',
                maxlength: 70,
                'key': 'postscript',
                'type': 'input'
              },
              {
                'disable': 'false',
                'label': '是否使用账簿',
                'key': 'asFlag',
                'type': 'radio',
                'options': [
                  {
                    'key': '1',
                    'value': '需要'
                  },
                  {
                    'key': '0',
                    'value': '不需要'
                  }
                ],
                'changeEventName': 'AccNoChange'
              },
              {
                'disable': 'false',
                'label': '收款地址',
                'key': 'rcvAccaddr',
                'type': 'input'
              },
              {
                'disable': 'false',
                'label': '收款类型',
                'key': 'itemNo',
                'type': 'select',
                'options': [
                  {
                    'key': '2001',
                    'value': '批量代扣'
                  }
                ]
              },
              {
                'disable': 'false',
                'label': '字段数',
                'key': 'fieldNum',
                'type': 'input'
              }
            ]
          },
          {
            formWidth: '100%',
            group: [
              {
                'disable': false,
                label: '上传附件',
                key: 'uploadFile',
                type: 'upload',
                fileType: ['xls', 'xlsx']
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      promptList: [
        '1.提交前请务必仔细核对笔数，金额是否正确。',
        '2.导入格式参见《批量代扣导入格式》。',
        '3.为了保护您的账户和资金安全，请勿向陌生人汇款，慎防电信网络新型违法犯罪。'
      ]
    }
  },
  methods: {
    /**
     * 付款账户列表查询
     */
    accNoListQry () {
      httpPost('eweb-transfer.ActingWithholdingBusinessContractQry.do', { itemType: '2' }).then(res => {
        this.payerAccNoList = res.list || []
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = item.acNo
        })
        this.formConfigJson.formItems[0].group[1].options = this.payerAccNoList
        if (res.list.length > 0) {
          this.formModel.acNo = 0
          this.formModel.acName = res.list[0].acName
          this.formModel.asAcNo = res.list[0].asAcNo
          this.formModel.asAcName = res.list[0].asAcName
          this.formModel.currencyCode = res.list[0].currencyCode
        }

        this.payerAccNoChange(this.formModel)
      }).catch({})
    },
    payerAccNoChange (data) {
      const currentrcvAcno = this.payerAccNoList[data.acNo]
      if (currentrcvAcno) {
        this.$refs.mNewForm.$data.form.acName = currentrcvAcno.acName
        this.$refs.mNewForm.$data.form.asAcName = currentrcvAcno.asAcName
        this.$refs.mNewForm.$data.form.asAcNo = currentrcvAcno.asAcNo
        this.$refs.mNewForm.$data.form.currencyCode = currentrcvAcno.currencyCode
      }
    },
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    /**
     * 将金额数据转换成大写
     */
    changeUp (res) {
      res.amount = util.limitInputMoney(res.amount)
      res.capitalMoney = util.getMoneyHanzi(res.amount)
    },
    /**
     * 隐藏账簿号
     */
    AccNoChange (formModel) {
      switch (formModel.asFlag) {
        case '1':
          this.formConfigJson.formItems[0].group[3].show = true
          this.formConfigJson.formItems[0].group[4].show = true
          break
        case '0':
          this.formConfigJson.formItems[0].group[3].show = false
          this.formConfigJson.formItems[0].group[4].show = false
          break
      }
    },
    onSubmit (data) {
      this.formModel = data
      let uploadData = new window.FormData()
      uploadData.append('rcvAcNo', this.payerAccNoList[data.acNo].acNo)
      uploadData.append('rcvAcName', data.acName)
      uploadData.append('rcvCurCode', data.currencyCode)
      uploadData.append('count', data.count)
      uploadData.append('supplyItem', data.itemNo)
      uploadData.append('amount', data.amount)
      uploadData.append('recordNum', data.recordNum)
      uploadData.append('purpose', data.purpose)
      uploadData.append('postscript', data.postscript)
      uploadData.append('asFlag', data.asFlag)
      uploadData.append('rcvAccaddr', data.rcvAccaddr)
      uploadData.append('fieldNum', data.fieldNum)
      uploadData.append('asAcNo', data.asAcNo)
      uploadData.append('asAcName', data.asAcName)
      uploadData.append('fileType', 'xls')
      uploadData.append('uploadFile', data.uploadFile[0])
      if (this.formModel.withholdingType !== '2') {
        httpPost('/eweb-transfer.DebitCardBulkWithholdingConfirm.do', uploadData).then(res => {
          Object.assign(data, res)
          let _params = res
          this.$router.push({
            name: 'batchWithholdingOfDebitCardConf',
            params: {
              formModel: _params,
              withholdingType: this.formModel.withholdingType,
              capitalMoney: this.formModel.capitalMoney,
              itemNo: this.formModel.itemNo,
              _Data2Sign: res._Data2Sign,
              _dataMapKey: res._dataMapKey,
              _authenticateType: res._authenticateType
            }
          })
        })
      } else {
        httpPost('/eweb-transfer.CreditCardBulkWithholdingConfirm.do', uploadData).then(res => {
          Object.assign(data, res)
          let _params = res
          this.$router.push({
            name: 'batchBithholdingOfCardConf',
            params: {
              formModel: _params,
              withholdingType: this.formModel.withholdingType,
              capitalMoney: this.formModel.capitalMoney,
              itemNo: this.formModel.itemNo,
              _Data2Sign: res._Data2Sign,
              _dataMapKey: res._dataMapKey,
              _authenticateType: res._authenticateType
            }
          })
        })
      }
    },
    reset (res) {
      this.formModel = res
      this.accNoListQry()
    }
  },
  created () {
    if (this.$route.params.amount) {
      Object.assign(this.formModel, this.$route.params)
      this.formModel.withholdingType = this.$route.params.withholdingType
      this.formModel.acNo = this.$route.params.rcvAcNo
      this.formModel.acName = this.$route.params.rcvAcName
      this.formModel.asAcNo = this.$route.params.asAcNo
      this.formModel.asAcName = this.$route.params.asAcName
      this.formModel.asFlag = this.$route.params.asFlag
      this.formModel.currencyCode = this.$route.params.rcvCurCode
      this.formModel.amount = this.$route.params.amount
      this.formModel.capitalMoney = this.$route.params.capitalMoney
      this.formModel.count = this.$route.params.count
      this.formModel.recordNum = this.$route.params.recordNum
      this.formModel.purpose = this.$route.params.purpose
      this.formModel.postscript = this.$route.params.postscript
      this.formModel.rcvAccaddr = this.$route.params.rcvAccaddr
      this.formModel.itemNo = this.$route.params.supplyItem
      this.formModel.fieldNum = this.$route.params.fieldNum
      if (!(Array.isArray(this.payerAccNoList) && this.payerAccNoList.length > 0)) {
        this.accNoListQry()
      }
    } else {
      this.accNoListQry()
    }
  }
}
</script>
<style  scoped>
    .form-box{
        width: 1120px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    }
</style>
