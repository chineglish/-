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
        <div class="u-key-box" id="password" slot="password"></div>
      </m-new-form>
    </div>
  </d2-container>
</template>
<script>
/**
 *@name: 单笔转账确认页
 * @author: 梁文彬
 * @date: 2019-12-10
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import UKey from '@/assets/js/u-key'
export default {
  name: 'singleTransConf',
  data () {
    return {
      uKey: '',
      formModel: {
        payerAcNo: '',
        payerAcName: '',
        payerBankAcc: '',
        payeeAcNo: '',
        trsType: '',
        payeeAcName: '',
        payeeBankName: '',
        payeeBankCode: '',
        payeeBankDeptId: '',
        payeeBankDeptName: '',
        amount: '',
        capitalMoney: '',
        pubDayAmount: '5000000.00',
        priDayAmount: '290000.00',
        // handle: '',
        remitModel: '',
        appointmentDate: '',
        appointmentTime: '',
        // remark: '单笔转账',
        postscript: '',
        balance: '',
        feeAmount: ''
      },
      data: ['转账汇款', '单笔转账'],
      // 以下为动态数据
      transTime: '',
      formConfigJson: {
        stepsActive: 1,
        formWidth: '50%',
        formItems: [
          {
            title: '付款信息',
            group: [
              {
                'disabled': true,
                'label': '付款账户',
                'type': 'text',
                'key': 'payerAcNo',
                formatter: (key, value) => {
                  let payerSubAcNo = ''
                  if (this.$route.params.payerSubAcNo !== '000156') {
                    payerSubAcNo = '/' + this.$route.params.payerSubAcNo
                  }
                  return this.$route.params.payerAcNo + payerSubAcNo
                }
              },
              { 'disabled': false, 'label': '可用余额', 'type': 'text', 'key': 'balance', formatter: (key, value) => util.formatCurrency(value) },
              {
                'disabled': true,
                'label': '付款账户开户行',
                'type': 'text',
                'key': 'payerBankAcc'
              },
              { 'disabled': false, 'label': '账户余额', 'type': 'text', 'key': 'zhanghye', formatter: (key, value) => util.formatCurrency(value) },
              {
                'disabled': true,
                'label': '是否使用账簿',
                'type': 'radio',
                'options': [ { 'value': '是', 'key': '1' }, { 'value': '否', 'key': '0' } ],
                'key': 'asFlag'
              },
              {
                'disabled': false,
                'label': '账簿号',
                'type': 'text',
                'key': 'asAcNo',
                'show': this.$route.params.asFlag === '1'
              },
              {
                'disabled': true,
                'label': '账簿名',
                'type': 'text',
                'key': 'asAcName',
                'show': this.$route.params.asFlag === '1'
              }
            ]
          },
          {
            title: '收款信息',
            group: [
              {
                'disabled': true,
                'label': '收款账号',
                'type': 'text',
                'key': 'payeeAcNo'
              },
              {
                'disabled': true,
                'label': '行内行外标志',
                'type': 'text',
                formatter: (key, value) => value === '0' ? '行内' : '行外',
                'key': 'trsType'
              },
              {
                'disabled': true,
                'label': '收款账户户名',
                'type': 'text',
                'key': 'payeeAcName'
              },
              {
                'disabled': true,
                'label': '收款账户开户行',
                'type': 'text',
                formatter: (key, value) => {
                  let bankName = '大连银行'
                  this.$route.params.bankList.forEach(item => {
                    if (item.bankNo === value) {
                      bankName = item.bankName
                    }
                  })
                  return bankName
                },
                'key': 'payeeBankCode'
              },
              {
                'disabled': true,
                'label': '收款账户开户网点',
                'type': 'text',
                'key': 'payeeBankDeptName',
                'show': true
              },
              {
                'disabled': true,
                'label': '开户网点号',
                'type': 'text',
                'key': 'payeeBankDeptId',
                'show': false
              }
            ]
          },
          {
            title: '交易金额',
            group: [
              {
                'disabled': true,
                'label': '交易金额',
                'type': 'text',
                'key': 'amount',
                'content': '(元)',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '可用对公日累计限额',
                'type': 'text',
                'key': 'pubDayAmount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '金额大写',
                'type': 'text',
                'key': 'capitalMoney'
              },
              {
                'disabled': true,
                'label': '可用对私日累计限额',
                'type': 'text',
                'key': 'priDayAmount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '手续费',
                'type': 'text',
                'key': 'feeAmount',
                style: 'color: red',
                formatter: (key, value) => util.formatCurrency(value) + '元'
              }
            ]
          },
          {
            title: '附件信息',
            group: [
              {
                'disabled': true,
                'label': '到账模式',
                'type': 'text',
                formatter: (key, value) => {
                  switch (value) {
                    case '0':
                      return '实时'
                    case '2':
                      return '次日'
                    case '3':
                      return '预约'
                  }
                },
                'key': 'remitModel'
              },
              {
                'disabled': true,
                'label': '附言',
                'type': 'text',
                'key': 'postscript',
                formatter: (key, value) => {
                  let postscript = value
                  this.$route.params.fuyan.forEach(item => {
                    if (item.key === value) {
                      postscript = item.value
                    }
                  })
                  return postscript
                }
              },
              //
              {
                'disabled': true,
                'label': '预约日期',
                'type': 'text',
                'key': 'appointmentDate',
                'show': false
              },
              {
                'disabled': true,
                'label': '预约时间',
                'type': 'text',
                'key': 'appointmentTime',
                formatter: (key, value) => value + ':00',
                'show': false
              },
              {
                disabled: false,
                label: '交易密码',
                type: 'blank',
                blankSlotName: 'password',
                show: this.$route.params.perCardFlag === '1'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      doSubmit: true
    }
  },
  computed: {
    balance () {
      return util.formatCurrency(this.formModel.balance)
    }
  },
  methods: {
    onSubmit (formModel) {
      this.feeAmount = util.formatCurrency(formModel.feeAmount)
      const dateObj = new Date()
      const yearStr = dateObj.getFullYear()
      const monthStr = (dateObj.getMonth() + 1 + '').padStart(2, '0')
      const dateStr = (dateObj.getDate() + '').padStart(2, '0')
      const hourStr = (dateObj.getHours() + '').padStart(2, '0')
      const minuteStr = (dateObj.getMinutes() + '').padStart(2, '0')
      const secondStr = (dateObj.getSeconds() + '').padStart(2, '0')
      const password = this.$route.params.perCardFlag === '1' ? this.uKey.getData().password : ''
      this.transTime = `${yearStr}-${monthStr}-${dateStr}  ${hourStr}:${minuteStr}:${secondStr}`
      this.$route.params.bankList.forEach(item => {
        if (item.bankNo === formModel.payeeBankCode) {
          formModel.payeeBankName = item.bankName
        }
      })
      if (this.$route.params.perCardFlag !== '1' || password) {
        /**
       * 发送接口数据
       */
        httpPost('/eweb-common.GenToken.do').then(token => {
          const _tokenName = token._tokenName
          let singMsg = this.isSign({ _Data2Sign: formModel._Data2Sign, _authenticateType: formModel._authenticateType })
          const params = {
          // ...this.formModel,
          // ...this.$route.params.subRes,
            password,
            payerAcNo: this.formModel.payerAcNo,
            payerAcName: this.formModel.payerAcName,
            openBank: this.formModel.openBank,
            payerSubAcNo: this.formModel.payerSubAcNo,
            payeeAcNo: this.formModel.payeeAcNo,
            payeeAcName: this.formModel.payeeAcName,
            amount: this.formModel.amount,
            payeeBankCode: this.formModel.payeeBankCode,
            remark: this.formModel.remark,
            postscript: this.formModel.postscript,
            // processFlag: this.formModel.processFlag,
            remitModel: this.formModel.remitModel,
            payeeBankDeptId: this.formModel.payeeBankDeptId,
            payeeBankDeptName: this.formModel.payeeBankDeptName,
            // feeAmount: this.$route.params.feeAmount,
            feeAmount: this.feeAmount,
            trsType: this.formModel.trsType,
            asFlag: this.formModel.asFlag,
            asAcNo: this.formModel.asAcNo,
            asAcName: this.formModel.asAcName,
            schedule: this.formModel.remitModel === '3' ? 'true' : null, // 是否预约交易
            scheduleFlag: this.formModel.remitModel === '3' ? 'Y' : null, // 预约规则标识
            scheduleFreq: this.formModel.remitModel === '3' ? '1' : null, // 预约执行频率
            scheduleType: this.formModel.remitModel === '3' ? '0' : null, // 预约方式-次数
            scheduleBeginDate: this.formModel.scheduleBeginDate,
            scheduleBeginTime: this.formModel.scheduleBeginTime,
            _tokenName: _tokenName,
            _dataMapKey: formModel._dataMapKey,
            _authenticateTypeChoose: formModel._authenticateType ? formModel._authenticateType[0] : '',
            CSIISignature: singMsg
          }
          httpPost('/eweb-transfer.Transfer.do', params).then(res => {
          // 保存为常用联系人
            if (formModel.savePayee) {
              let params = {
                payeeAcNo: formModel.payeeAcNo,
                payeeAcName: formModel.payeeAcName,
                payeeBankCode: '313',
                payeeBankId: '313',
                payeeBankName: '大连银行',
                payeeBankDeptId: '313222080002',
                payeeBankDeptName: '大连银行第一中心支行',
                transferType: formModel.trsType
              }
              if (formModel.trsType === '1') {
                params = {
                  ...params,
                  payeeBankCode: formModel.payeeBankCode,
                  payeeBankId: formModel.payeeBankCode,
                  payeeBankName: formModel.payeeBankName,
                  payeeBankDeptId: formModel.payeeBankDeptId,
                  payeeBankDeptName: formModel.payeeBankDeptName,
                  payeeBankProvinceNo: '',
                  payeeBankCityNo: ''
                }
              }
              httpPost('/eweb-transfer.PayeeBookAdd.do', params).then(() => {
              }).catch(e => {
                console.error(e)
              })
            }
            params.JnlStatus = res._processState
            params._jnlNo = res._jnlNo
            params.transDate = res._transTime
            const routeParams = {
              msg: params,
              transTime: res._transTime
            }
            this.$router.push({ name: 'singleTransResult', params: routeParams })
          }).catch(e => {
          /* params.JnlStatus = '0'
          const routeParams = {
            msg: params,
            transTime: this.transTime
          }
          this.$router.push({ name: 'singleTransResult', params: routeParams }) */
          })
        })
      } else {
        this.$msg('请输入交易密码')
      }
    },
    onBack (data) {
      this.$router.push({
        name: 'singleTransPre'
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      let pwd = document.getElementById('password')
      if (this.$route.params.perCardFlag === '1' && pwd) {
        const passConfig = [
        // 控件的ID，在控件回调javascript函数的时候用来确认是哪个控件调用了javascript函数
          { name: 'ObjectID', value: '' },
          // 密码的最小长度限制数
          { name: 'MinLength', value: '0' },
          // 密码的最大长度限制数
          { name: 'MaxLength', value: '6' },
          // 算法类型，0：RSA， 1：SM2
          { name: 'CipherType', value: '1' },
          // 检测到大写锁定按键按下时是否使用气泡提示。默认提示。0：提示大写锁定，1：不提示
          { name: 'CapsLockTip', value: '1' },
          // 控件边框宽度，默认值为1，设置为0则没有边框
          { name: 'BorderWidth', value: '0' },
          // 控件边框颜色设置参数，需要同时设置控件边框默认颜色与焦点在控件之上（即控件被选中时的颜色）。格式如下：“#CCEEFF|#FF0”。两个颜色均为标准CSS颜色格式，中间使用“|”分隔。前面的颜色为普通显示的颜色，后面的颜色为控件被选中时的颜色。不设置此参数时边框正常状态默认颜色为#D9D9D9，默认焦点在边框之上时颜色为#4D90FE
          { name: 'BorderColor', value: '#DCDFE6|#CE5C65' },
          // 控件背景色设置参数，需要同时设置控件默认颜色与焦点在控件之上（即控件被选中时的颜色）。格式如下：“#CF9|#BBFF66”。两个颜色均为标准CSS颜色格式，中间使用“|”分隔。前面的颜色为普通显示的颜色，后面的颜色为控件被选中时的颜色
          { name: 'BackgroundColor', value: '|#FFF' },
          // 输入密码复杂度判断正则表达式
          // { name: 'IntensityRegExp', value: '(^[!-~]*[A-Za-z]+[!-~]*[0-9]+[!-~]*$)|(^[!-~]*[0-9]+[!-~]*[A-Za-z]+[!-~]*$)' },
          { name: 'IntensityRegExp', value: '(^[!-~]*[A-Za-z]+[!-~]*[0-9]+[!-~]*$)|(^[!-~]*[0-9]+[!-~]*[A-Za-z]+[!-~]*$)' },
          // 允许输入字符集正则表达式
          // { name: 'RestrictRegExp', value: '([!-~]+)' },
          { name: 'RestrictRegExp', value: '([0-9]$)' },
          // 服务器端产生的随机数，BASE64编码格式
          // { name: 'ServerRandom', value: 'MDEyMzQ1Njc4OWFiY2RlZg==' }
          { name: 'ServerRandom', value: '' }
        ]
        this.uKey = new UKey(pwd, 'password-u-key', passConfig)
      }
    })
  },
  created () {
    this.formModel = this.$route.params
    if (this.formModel.trsType === '0') {
      this.formConfigJson.formItems[1].group[4].show = false
    } else {
      this.formConfigJson.formItems[1].group[3].show = false
    }
    if (this.$route.params.remitModel === '3') {
      this.formConfigJson.formItems[3].group[2].show = true
      this.formConfigJson.formItems[3].group[3].show = true
    } else {
      this.formConfigJson.formItems[3].group[2].show = false
      this.formConfigJson.formItems[3].group[3].show = false
    }
  }
}
</script>

<style scoped>
.u-key-box{
  width: calc(65% - 10px);
  height: 30px;
  padding: 1px;
  padding-left: 10px;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
}
</style>
