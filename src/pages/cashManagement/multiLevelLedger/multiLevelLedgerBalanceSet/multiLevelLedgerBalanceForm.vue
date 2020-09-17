<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      :msgs="msgs"
      @submit="onSubmit"
      @reset="reset"
      @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
      @changeInNum="changeInNum"
      @changeOutNum="changeOutNum"
      @changeHanzi="changeHanzi"
      @changeNum="changeNum"
    >
    </m-new-form>
  </div>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import { currency_type_entity } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'multiLevelLedgerBalanceSet',
  data () {
    return {
      data: ['现金管理', '多级账簿', '多级账簿余额调整'],
      bookIntoQryList: [],
      acList: [],
      actList: [],
      formModel: {
        acNo: '',
        currencyCode: '',
        accountName: '',
        outLedgerNum: '',
        outLedgerName: '',
        incomeLedgerNum: '',
        incomeLedgerName: '',
        setAmount: '',
        bigNum: '',
        user: '',
        postScript: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          outLedgerNum: [
            { required: true, message: '调出账簿号', trigger: 'submit' }
          ],
          incomeLedgerNum: [
            { required: true, message: '调入账簿号', trigger: 'submit' }
          ],
          setAmount: [
            { required: true, message: '调整金额', trigger: 'submit' }
          ],
          purpose: [{ required: true, message: '用途', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '30%',
            group: [
              {
                disabled: false,
                label: '账户',
                type: 'select',
                options: [],
                trans: { value: 'showAcNo', key: 'acNo' },
                changeEventName: 'changeNum',
                key: 'acNo'
              },
              {
                disabled: true,
                label: '币种',
                type: 'text',
                key: 'currencyCode',
                formatter: (key, value) => currency_type_entity[value]
              },
              // {
              //   'disabled': false,
              //   'label': '户名',
              //   'type': 'text',
              //   'key': 'accountName'
              // },
              {
                // 应业务要求添加筛选功能,不只是下拉框
                disabled: false,
                label: '调出账簿号',
                type: 'select',
                filterOptions: true,
                trans: { value: 'showName', key: 'limitAsAcNo' },
                options: [],
                changeEventName: 'changeOutNum',
                key: 'outLedgerNum'
              },
              {
                disabled: false,
                label: '调出账簿名',
                type: 'text',
                key: 'outLedgerName'
              },
              {
                // 应业务要求添加筛选功能,不只是下拉框
                disabled: false,
                label: '调入账簿号',
                type: 'select',
                filterOptions: true,
                trans: { value: 'showName', key: 'limitAsAcNo' },
                options: [],
                changeEventName: 'changeInNum',
                key: 'incomeLedgerNum'
              },
              {
                disabled: false,
                label: '调入账簿名',
                type: 'text',
                key: 'incomeLedgerName'
              },
              {
                disabled: false,
                label: '调整金额',
                type: 'input',
                key: 'setAmount',
                // maxlength: 13,
                inputType: 'money',
                keydownEventName: 'limitMoneyInputKeyDown',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                inputEventName: 'changeHanzi'
              },
              {
                disabled: false,
                label: '金额大写',
                type: 'text',
                key: 'bigNum'
              },
              {
                disabled: false,
                label: '用途',
                type: 'input',
                key: 'purpose'
              },
              {
                disabled: false,
                label: '附言',
                maxlength: 70,
                type: 'input',
                options: [],
                key: 'postScript'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: []
    }
  },
  methods: {
    reset (res) {
      res.setAmountcopy = ''
      this.formModel = res
      this.actListQry()
    },
    // 附言查询
    getPostscript () {
      // httpPost('/eweb-transfer.TransferRemarkManage.do', {
      //   trsFlag: '0',
      //   remarkName: ''
      // }).then(res => {
      //   // this.fuyan = res.remrkNameList
      //   const post = res.remrkNameList.map((item, index) => ({ value: item.remarkName, key: index }))
      //   for (let i = 0; i < post.length; i++) {
      //     this.formConfigJson.formItems[0].group[9].options.push(post[i])
      //   }
      // })
      this.formConfigJson.formItems[0].group[9].options = util.getPostscript()
    },
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeHanzi (res) {
      res.setAmount = util.limitInputMoney(res.setAmount)
      res.bigNum = util.getMoneyHanzi(res.setAmount)
    },
    changeOutNum (form, obj) {
      if (
        this.formModel.incomeLedgerNum &&
        this.formModel.incomeLedgerNum === obj.limitAsAcNo
      ) {
        this.$msg('调入账簿号和调出账簿号不能相同')
        this.formModel.outLedgerNum = ''
        this.formModel.outLedgerName = ''
      } else {
        this.$set(this.formModel, 'outLedgerNum', obj.limitAsAcNo)
        this.$set(this.formModel, 'outLedgerName', obj.asAcName)
        // this.formModel.outLedgerNum = form.limitAsAcNo
        // this.formModel.outLedgerName = form.asAcName
      }
    },
    changeInNum (form, obj) {
      // form是选择的当前选项
      if (
        this.formModel.outLedgerNum &&
        this.formModel.outLedgerNum === obj.limitAsAcNo
      ) {
        this.$msg('调入账簿号和调出账簿号不能相同')
        this.formModel.incomeLedgerNum = ''
        this.formModel.incomeLedgerName = ''
      } else {
        this.$set(this.formModel, 'incomeLedgerNum', obj.limitAsAcNo)
        this.$set(this.formModel, 'incomeLedgerName', obj.asAcName)
        // this.formModel.incomeLedgerNum = form.limitAsAcNo
        // this.formModel.incomeLedgerName = form.asAcName
      }
    },
    changeNum (res, obj) {
      this.formModel.currencyCode = obj.currencyCode
      this.formModel.accountName = obj.acName
      let params = {
        acNo: res.acNo,
        currencyCode: this.formModel.currencyCode,
        userNo: this.getUser().userId
      }
      httpPost('/eweb-cash.MultistageBookRightQry.do', params).then(res => {
        res.list.forEach(item => {
          item['showName'] = `${item.limitAsAcNo} | ${item.asAcName}`
        })
        this.acList = res.list
        this.formConfigJson.formItems[0].group[2].options = this.acList
        this.formConfigJson.formItems[0].group[4].options = this.acList
        // this.acList.length > 0 && this.changeOutNum()
      })

      // httpPost('/eweb-cash.MultistageBookInfoQry.do', params).then(res1 => {
      //   this.acList = res1.list
      //   httpPost('/eweb-cash.MultistageBookRightQry.do', params).then(res => {
      //     this.bookIntoQryList = res.list
      //     this.formConfigJson.formItems[0].group[3].options = this.bookIntoQryList
      //     this.formConfigJson.formItems[0].group[5].options = this.bookIntoQryList
      //     if (this.bookIntoQryList.length > 0) {
      //       this.changeOutNum(this.bookIntoQryList[0], this.formModel)
      //     }
      //   })
      // })
    },
    // 提交
    onSubmit (data) {
      let params = {
        acNo: data.acNo,
        currencyCode: data.currencyCode,
        acName: data.accountName,
        inAsAcNo: data.incomeLedgerNum,
        inAsAcName: data.incomeLedgerName,
        outAsAcNo: data.outLedgerNum,
        outAsAcName: data.outLedgerName,
        bigNum: data.bigNum,
        purpose: data.purpose,
        postScript: data.postScript,
        amount: data.setAmount
      }
      httpPost('/eweb-cash.MultistageBookBalUpdateConfirm.do', params).then(
        res => {
          this.$router.push({
            name: 'multiLevelLedgerBalanceSetConfirm',
            params: {
              ...params,
              _Data2Sign: res._Data2Sign,
              _authenticateType: res._authenticateType,
              _dataMapKey: res._dataMapKey,
              outLedgerNum: data.outLedgerNum,
              incomeLedgerNum: data.incomeLedgerNum,
              accountNum: data.acNo
            }
          })
        }
      )
    },
    // 返回1
    actListQry () {
      httpPost('/eweb-cash.MultistageBookActListQry.do', {
        productType: '02'
      }).then(res => {
        this.actList = res.acList
        this.actList.forEach(item => {
          item.showAcNo = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.actList
        if (this.actList.length > 0) {
          this.formModel.acNo = this.actList[0].acNo
        }
        this.changeNum(this.formModel, this.actList[0])
      })
    }
  },
  created () {
    // 附言查询
    this.getPostscript()
    this.actListQry()
  }
}
</script>
