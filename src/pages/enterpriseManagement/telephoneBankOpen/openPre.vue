<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        :msgs="msgs"
        @submit="submit"
        @visibleChange="visibleChange"
        @montedNext="creatPassword"
        @reset="reset">
        <div class="u-key-box" id="u-key-1" slot="newPassword">
        </div>
        <div class="u-key-box" id="u-key-2" slot="newPasswordConf">
        </div>
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import UKey from '@/assets/js/u-key'
import util from '@/libs/util'
export default {
  name: 'telephoneBankOpenPre',
  data () {
    return {
      uKey$1: null,
      uKey$2: null,
      payerAccNoList: [], // 付款账户信息列表
      titleData: ['企业管理台 ', '电话银行开通'],
      formModel: {
        accont: '',
        newPassword: '',
        newPasswordConf: ''
      },
      formConfigJson: {
        rules: {
          newPassword: [{ required: true, message: '新密码', trigger: 'submit' }],
          newPasswordConf: [{ required: true, message: '新密码确认', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                visibleChangeEventName: 'visibleChange',
                'options': [],
                'key': 'accont',
                trans: { value: 'payerAccNoshow' }
              },
              {
                'disabled': false,
                'label': '新密码',
                'type': 'blank',
                blankSlotName: 'newPassword'
              },
              {
                'disabled': false,
                'label': '新密码确认',
                'type': 'blank',
                blankSlotName: 'newPasswordConf'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: [
        '1.可实现企业用户开通电话银行',
        '2.企业开通电话银行,密码为6位数字;确认密码应和密码保持一致'
      ]
    }
  },
  methods: {
    /**
     * 交易账户获取
     */
    visibleChange (flag) {
      let uKey1 = document.getElementById('password-u-key-1')
      let uKey2 = document.getElementById('password-u-key-2')
      if (flag) {
        uKey1.style.display = 'none'
        uKey2.style.display = 'none'
      } else {
        uKey1.style.display = 'block'
        uKey2.style.display = 'block'
      }
    },
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { transCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => { item.payerAccNoshow = util.getPayerAccount(item) })
        this.formModel.accont = 0
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
      }).catch(err => {
        console.error(err)
      })
    },
    submit (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        const password = this.uKey$1.getData().password
        const newPasswordConf = this.uKey$2.getData().password
        httpPost('/eweb-setting.TelephonePswReset.do', {
          acNo: this.payerAccNoList[data.accont].acNo,
          acName: this.payerAccNoList[data.accont].acName,
          password: password,
          passwordRepeat: newPasswordConf,
          _tokenName: token._tokenName
        }).then(res => {
          httpPost('/eweb-common.GenToken.do').then(token => {
            const password = this.uKey$1.getData().password
            const newPasswordConf = this.uKey$2.getData().password
            httpPost('/eweb-setting.TelephoneBankApplication.do', {
              acNo: this.payerAccNoList[data.accont].acNo,
              acName: this.payerAccNoList[data.accont].acName,
              password: password,
              passwordRepeat: newPasswordConf,
              _tokenName: token._tokenName
            }).then(res => {
              this.$router.push({
                name: 'telephoneBankOpenRes',
                params: {
                  acName: this.payerAccNoList[data.accont].acName,
                  acNo: this.payerAccNoList[data.accont].acNo,
                  res
                }
              })
            })
          })
        })
      })
    },
    reset (res) {
      res.accont = 0
      this.uKey$1.clearData()
      this.uKey$2.clearData()
    },
    // 在子元素的moted里面的nextTick定义的自定义事件触发后生效,确保生成密码控件之前元素渲染完成
    creatPassword () {
      // 写两个一样的数组是为了防止他们互相影响, 不要删除
      const passConfig1 = [
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
      const passConfig2 = [
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
      this.uKey$1 = new UKey(document.getElementById('u-key-1'), 'password-u-key-1', passConfig1)
      this.uKey$2 = new UKey(document.getElementById('u-key-2'), 'password-u-key-2', passConfig2)
    }
  },
  mounted () {
    // 获取账号
    this.accNoListQry()
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
