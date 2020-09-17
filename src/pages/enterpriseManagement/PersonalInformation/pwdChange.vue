<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="boxWrap">
            <ul>
                <li>
                  <div class="fs18">旧密码</div>
                  <div class="u-key-container-wrapper">
                    <div id="u-key-1" class="u-key-container"></div>
                    <div class="u-key-prompt fs14">
                    </div>
                  </div>
                </li>
                <li>
                  <div class="fs18">新密码</div>
                  <div class="u-key-container-wrapper">
                    <div id="u-key-2" class="u-key-container"></div>
                    <div class="u-key-prompt fs14" id="safetyStrength">
                    </div>
                  </div>
                </li>
                <li>
                  <div class="fs18">新密码确认</div>
                  <div class="u-key-container-wrapper">
                    <div id="u-key-3" class="u-key-container"></div>
                    <div class="u-key-prompt fs14">
                      {{prompt}}
                    </div>
                  </div>
                </li>
            </ul>
            <ul class="error-box" id="error-box"></ul>
            <m-btn :btnData="btnData" @click="btnClick"></m-btn>
            <!-- <div>
                <button class="m-submit-btn" @click="commit">确定</button>
                <button class="m-cancel-btn" @click="pwdReset">返回</button>
            </div> -->
        </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import UKey from '@/assets/js/u-key'

export default {
  data () {
    return {
      uKey$1: null,
      uKey$2: null,
      uKey$3: null,
      prompt: '',
      password1: '',
      password2: '',
      password3: '',
      breadData: ['企业管理台', '操作员密码修改'],
      oldPassword: '',
      password: '',
      passwordRepeat: '',
      userChannel: [],
      btnData: [
        { btnText: '确定', clickEventName: 'commit', class: 'm-submit-btn' },
        { btnText: '返回', clickEventName: 'pwdReset', class: 'm-cancel-btn' }
      ]
    }
  },
  methods: {
    commit () {
      this.prompt = ''
      let password1 = ''
      let password2 = ''
      let password3 = ''
      let pwdLevel = ''
      try {
        const data1 = this.uKey$1.getData()
        password1 = data1.password
      } catch (e) {
        this.$msg('未输入旧密码')
      }
      try {
        const data2 = this.uKey$2.getData()
        password2 = data2.password
        pwdLevel = data2.passwordStrength
      } catch (e) {
        this.$msg('未输入新密码')
      }
      try {
        const data3 = this.uKey$3.getData()
        password3 = data3.password
      } catch (e) {
        this.$msg('未输入新密码确认')
      }
      let params = {
        userSeq: this.getUser().userSeq,
        oldPassword: password1,
        password: password2,
        pwdLevel: pwdLevel,
        passwordRepeat: password3
      }
      if (!this.uKey$2.getData().passwordLengthIntensity) {
        this.$msg('用户密码长度不够，请重新输入密码')
      } else if (this.uKey$2.getData().isWeakPassword) {
        this.$msg('用户密码过于简单，请重新输入密码')
      } else if (this.uKey$2.getData().passwordStrength < 2) {
        this.$msg('密码强度不合格，用户密码应至少由数组、字母、字符中的其中两项组成')
      } else {
        httpPost('/eweb-common.GenToken.do').then(token => {
          params._tokenName = token._tokenName
          httpPost('eweb-operator.OperatorPswModify.do', params).then(res => {
            this.$router.push({
              name: 'usualRes',
              params: {
                res
              }
            })
          })
        })
      }
    },
    pwdReset () {
      this.$router.push('/queryInformation')
    },
    initUKey () {
      try {
        this.uKey$1 = new UKey(document.getElementById('u-key-1'), 'password-u-key-1')
        this.uKey$2 = new UKey(document.getElementById('u-key-2'), 'password-u-key-2')
        this.uKey$3 = new UKey(document.getElementById('u-key-3'), 'password-u-key-3')
        var jsevent = document.createElement('script')
        jsevent = document.createElement('script')
        jsevent.type = 'text/javascript'
        jsevent.event = 'KeyPressSuccess(BstrObjectID)'
        jsevent.htmlFor = 'password-u-key-2'
        jsevent.async = true
        jsevent.innerHTML = 'KeyPressSuccess(BstrObjectID); '
        document.head.appendChild(jsevent)
        this.$forceUpdate()
      } catch (e) {
        console.error(e)
      }
    },
    btnClick (clickEvent) {
      if (clickEvent === 'commit') {
        this.commit()
      } else if (clickEvent === 'pwdReset') {
        this.pwdReset()
      }
    }
  },
  mounted () {
    if (this.$route.params) {
      this.userChannel = this.$route.params.userChannel
    }
    this.initUKey()
  }
}
</script>

<style lang="scss" scoped>
.boxWrap {
    background: #fff;
    box-shadow: 0 0 10px #ccc;
    margin-bottom: 20px;
    padding-top: 30px;
    ul {
        margin: 0 200px;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        li {
            height: 54px;
            line-height: 54px;
            background: #f8f8f8;
            display: flex;
            border-bottom: 1px solid #ccc;
            div {
                display: inline-block\9;
                width: calc(100%/3)\9;
                vertical-align: middle\9;
                padding: 0;
                flex: 1;
                text-align: center;
            }
            .u-key-container-wrapper {
              flex: 2;
              margin: 12px 0;
              height: 30px;
              background: #f8f8f8!important;
              line-height: 32px;
              display: flex;
              align-items: center;
              text-align: center;
              justify-content: center;
              display: inline-block\9;
              width: calc(100%/3*2 - 24px)\9;
              .u-key-container {
                flex: 2;
                display: inline-block\9;
                width: calc(100%/3*2 - 20px)\9;
                text-align: center;
                height: 30px;
                padding-top: 3px;
                margin-left: 20px;
                border: 1px solid #DCDFE6;
                background: #fff;
                border-radius: 4px;
              }
              .u-key-prompt {
                flex: 1;
                display: inline-block\9;
                width: calc(100%/3*2)\9;
                background: #f8f8f8!important;
                text-align: left;
                padding-left: 10px;
                border: 0;
              }
            }
        }
        li div:last-child {
            border-left: 1px solid #ccc;
            background: #fff;
        }
    }
    div {
        padding: 30px 0 30px;
        text-align: center;
        button {
            margin: 0 50px;
            color: #fff;
            background-color: #cc444d;
            background-image: linear-gradient(0deg, #710A0B 0%, #C21D1F 17%, #E72E32 86%, #FFA1A3 100%);
            cursor: pointer;
            outline: none;
        }
    }

}
</style>
