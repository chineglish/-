<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form ref="mNewForm"
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @chanegPayerAcNo="chanegPayerAcNo"
        @changeSmsCode="changeSmsCode"
        @back="back"
        @submit="submit"
        @changePhone="changePhone"
        @selectOpera="selectOpera"
        @inputCode="inputCode"
        >
        <!-- <div class="checkBalances" slot="checkBalances">
          <el-button type="primary" size="mini" @click="changeBalances" class="m-submit-btn">查询余额</el-button>
          <span class="fs14">{{balances}}</span>
        </div> -->
        <div class="smsCodeBtn" style="width:5%" slot="smsCodeBtn">
          <el-button size="mini" :disabled="disabled" @click="changeSmsCode" class="codeBtnWord">{{codeBtnWord}}</el-button>
        </div>
        <div class="codeBtn" style="width:100%" slot="checkProtocol" @change="changeCheck">
            <el-checkbox v-model="checked"></el-checkbox><span style="color: #D41618; cursor: pointer" @click="Agree">阅读并同意《证书自动续费协议》</span>
        </div>
      </m-new-form>
  </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { mapMutations } from 'vuex'
export default {
  name: 'innerSign',
  data: function () {
    return {
      codeBtnWord: '获取验证码',
      waitTime: 60,
      disabled: false,
      signBtn: '',
      balances: '',
      checked: false,
      operaMan: [],
      titleData: ['企业管理台', '证书管理', '证书自动扣费签约'],
      formModel: {
        payerAcNo: '',
        payerAcName: '',
        payerSubAcNo: '',
        balances: '',
        mobilePhone: '',
        smsCode: '',
        signFeeList: [],
        protocol: '',
        feeAmount: '',
        opera: []
      },
      transData: {},
      payerAccountList: [],
      formConfigJson: {
        stepsActive: 0,
        rules: {
          payerAcNo: [{ required: true, message: '续费签约账户不能为空', trigger: 'change' }],
          balances: [{ required: true, message: '账户余额不能为空', trigger: 'change' }],
          mobilePhone: [{ required: true, message: '扣费提前通知手机号不能为空', trigger: 'submit' }, {
            validator: (rule, value, callback) => util.verifyMobile(value, callback), trigger: 'submit' }],
          smsCode: [{ required: true, message: '验证码不能为空', trigger: 'submit' }],
          opera: [{ required: true, message: '已选择的操作员不能为空', trigger: 'submit' }]
          // protocol: [{ required: true, message: '阅读并同意《证书自动续费协议》', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '16.5%',
            group: [
              {
                'disabled': false,
                'label': '续费签约账户',
                'type': 'select',
                'key': 'payerAcNo',
                changeEventName: 'chanegPayerAcNo',
                trans: { value: 'showAcNo' },
                'options': []
                // 'rightSlotName': 'checkBalances'
              },
              {
                type: 'text',
                label: '可用余额',
                textType: 'shy',
                key: 'balances',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          },
          {
            formWidth: '100%',
            labelWidth: '16.5%',
            group: [
              {
                'disabled': false,
                'label': '选择操作员及证书',
                'type': 'checkbox',
                'key': 'opera',
                'options': [],
                // changeCheck: 'chageCheck',
                // formatter: (item) => {
                //   return item.userId + '  ' + item.userName + '  ' + item.usbKeySn
                // }
                'slotName': 'slotTable',
                'changeEvent': 'selectOpera'
              }
            ]
          },
          {
            formWidth: '50%',
            // labelWidth: '39%',
            group: [
              {
                'disabled': false,
                'label': '扣费提前通知手机号',
                'type': 'input',
                'key': 'mobilePhone',
                'inputEventName': 'changePhone',
                'maxlength': 11
              },
              {
                'disabled': false,
                'label': '验证码',
                'type': 'input',
                'key': 'smsCode',
                'width': '50%',
                'slotName': 'smsCodeBtn',
                'inputEventName': 'inputCode',
                'maxlength': 6
              }
            ]
          },
          {
            formWidth: '100%',
            labelWidth: '0',
            group: [
              {
                'slotName': 'checkProtocol',
                'key': 'protocol'
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
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    changeCheck () {
      if (this.checked) {
        this.formModel.protocol = '0'
      }
    },
    changePhone (res) {
      this.transData = res
    },
    chaneCheck (form, val) {
      // console.log(val)
    },
    initData () {
      // this.formModel.mobilePhone = this.getUser().mobilePhone
      httpPost('/eweb-query.PayerAccountListQry.do', { TransCode: 'AutDedFeeSign' }).then(list => {
        if (list.AcList.length === 0) {
          this.formModel.payerAcNo = ''
        } else {
          this.payerAccountList = list.AcList
          this.payerAccountList.forEach(item => {
            item.showAcNo = util.getPayerAccount(item)
          })
          this.formConfigJson.formItems[0].group[0].options = this.payerAccountList
          if (this.payerAccountList.length > 0) {
            this.formModel.payerAcNo = 0
            this.chanegPayerAcNo(this.formModel, this.payerAccountList[0])
          }
          // this.formModel.payerAcNo = 0
          // httpPost('/eweb-acmgmt.AccountInfoQuery.do', {
          //   payerAcNo: this.payerAccountList[this.formModel.payerAcNo].acNo,
          //   payerSubAcNo: this.payerAccountList[this.formModel.payerAcNo].subAcNo
          // }).then(AccountInfo => {
          //   this.balances = util.formatCurrency(AccountInfo.availBal) + '元'
          // }).catch(AccountInfo => {
          //   this.balances = '未查询到余额'
          // })
        }
      })
    },
    chanegPayerAcNo (data, obj) {
      this.$set(this.formModel, 'payerAcNo', obj.acNo)
      this.payerAc = obj
      this.formModel = data
      this.transData = data
      const params = {
        payerAcNo: obj.acNo,
        payerSubAcNo: obj.subAcNo
      }
      
      httpPost('/eweb-acmgmt.AccountInfoQuery.do', params).then(AccountInfo => {
        this.$set(this.formModel, 'balances', AccountInfo.availBal)
      }).catch(AccountInfo => {
        this.$set(this.formModel, 'balances', '未查询到余额')
      })
    },
    changeSmsCode () {
      const reg = /^1\d{10}$/
      if (this.formModel.mobilePhone && reg.test(this.formModel.mobilePhone) === false) {
        this.$msg('手机号输入错误')
      } else {
        httpPost('/eweb-common.GetSmsCode.do', {
          scene: 'OperatorModify',
          templateId: 'OperatorModifyTemplate',
          mobilePhone: this.transData.mobilePhone
        }).then(res => {
          this.formConfigJson.formItems[2].group[0].disabled = true
          let timer = setInterval(() => {
            if (this.waitTime > 1) {
              this.waitTime--
              this.disabled = true
              this.codeBtnWord = `${this.waitTime}s后再获取`
            } else {
              this.formConfigJson.formItems[2].group[0].disabled = false
              clearInterval(timer)
              this.codeBtnWord = '获取验证码'
              this.waitTime = 60
              this.disabled = false
            }
          }, 1000)
        })
      }
    },
    dataMap (res) {
      this.opera = res.opera
      this.formModel.signFeeList = []
      for (var i = 0; i < this.opera.length; i++) {
        const users = this.opera[i].split('  ')
        this.operaMan.forEach(item => {
          if (item.userId === users[0]) {
            let map = {}
            map.userId = item.userId
            map.userName = item.userName
            map.keyId = item.usbKeySn
            map.userSeq = item.userSeq
            this.formModel.signFeeList.push(map)
          }
        })
      }
    },
    certFeesParam (res) {
      httpPost('/eweb-common.CertFeesParamQry.do', { TransCode: 'CertFees' }).then(list => {
        this.formModel.feeAmount = util.formatCurrency(list.feeAmount)
      })
    },
    // 确定
    submit (res) {
      this.dataMap(res)
      // console.log(this.payerAc.acNo, this.payerAc.acName, this.payerAc.subAcNo)
      const params = {
        ...res,
        payerAcNo: this.payerAc.acNo,
        payerAcName: this.payerAc.acName,
        payerSubAcNo: this.payerAc.subAcNo,
        feeAmount: this.formModel.feeAmount,
        mobilePhone: res.mobilePhone,
        signFeeList: this.formModel.signFeeList
      }
      if (this.checked) {
        httpPost('/eweb-enterprise.AutDedFeeSignConfirm.do', params).then(conf => {
          res._Data2Sign = conf._Data2Sign
          res._authenticateType = conf._authenticateType
          res._dataMapKey = conf._dataMapKey
          this.$router.push({
            name: 'confirmSign',
            params: {
              ...res,
              payerAcNo: this.payerAc.acNo,
              payerAcName: this.payerAc.acName,
              payerSubAcNo: this.payerAc.subAcNo,
              feeAmount: this.formModel.feeAmount,
              mobilePhone: res.mobilePhone,
              signFeeList: this.formModel.signFeeList
            }
          })
        })
      } else {
        this.$msg({
          message: '阅读并同意《证书自动续费协议》',
          type: 'error',
          showClose: true
        })
      }
    },
    // 返回
    back (res) {
      this.$router.push({
        name: 'notSign'
      })
    },
    Agree () {
      this.$router.push({
        name: 'signProtocol',
        params: {
          data: this.transData,
          waitTime: this.waitTime
        }
      })
    },
    selectOpera (res) {
      this.transData = res
    },
    inputCode (res) {
      this.transData = res
    },
    getOpera () {
      this.formConfigJson.formItems[1].group[0].options = []
      httpPost('/eweb-enterprise.AutDedFeeSignQry.do', {
        signFlag: '1'// 0 已签约,1 未签约
      }).then(res => {
        this.operaMan = res.respAutDedFeeSignQryList
        // this.formConfigJson.formItems[1].group[0].options = this.operaMan
        for (var i = 0; i < this.operaMan.length; i++) {
          if (this.operaMan[i].userId && this.operaMan[i].userName && this.operaMan[i].usbKeySn && this.operaMan[i].userSeq) {
          // if (this.operaMan[i].userId) {
            this.formConfigJson.formItems[1].group[0].options.push({ value: this.operaMan[i].userId + '  ' + this.operaMan[i].userName + '  ' + this.operaMan[i].usbKeySn, key: this.operaMan[i].userId })
          }
        }
      })
    }
  },
  created () {
    this.formModel.mobilePhone = this.getUser().mobilePhone
    this.removeKeepAliveList() // 清除页面缓存
    if (this.$route.params.protocol) {
      this.protocol = this.$route.params.protocol
      this.formModel = this.$route.params.data
      this.waitTime = this.$route.params.waitTime
      this.transData = this.$route.params.data
      this.checked = this.$route.params.checked
      if (this.protocol === '0') {
        // console.log(this.formModel)
        this.formModel.protocol = '0'
        let timer = setInterval(() => {
          if (this.waitTime > 1 && this.waitTime < 60) {
            this.formConfigJson.formItems[2].group[0].disabled = true
            this.waitTime--
            this.disabled = true
            this.codeBtnWord = `${this.waitTime}s后再获取`
          } else {
            this.formConfigJson.formItems[2].group[0].disabled = false
            clearInterval(timer)
            this.codeBtnWord = '获取验证码'
            this.waitTime = 60
            this.disabled = false
          }
        }, 1000)
      } else {
        this.formModel.protocol = '1'
        let timer = setInterval(() => {
          if (this.waitTime > 1 && this.waitTime < 60) {
            this.waitTime--
            this.disabled = true
            this.codeBtnWord = `${this.waitTime}s后再获取`
          } else {
            this.formConfigJson.formItems[2].group[0].disabled = false
            clearInterval(timer)
            this.codeBtnWord = '获取验证码'
            this.waitTime = 60
            this.disabled = false
          }
        }, 1000)
      }
    }
    if (!(Array.isArray(this.payerAccountList) && this.payerAccountList.length > 0)) {
      this.initData()
      this.getOpera()
    }
    this.transData = this.formModel
    this.certFeesParam()
  }
}
</script>

<style lang="scss">
.form-box {
  .el-checkbox {
    // float: left;
    width: 45%;
  }
}
.codeBtn {
  .el-checkbox {
    float: left;
    width: 3%;
  }
}
</style>
<style lang="scss" scoped>
    .title{
        background: #FDF2F3;
        color: #333333;
        line-height: 40px;
        margin: 30px 0px;

        .title-separate{
            margin-left: 20px;
            background: #D41618;
            width: 6px;
            height: 28px;
        }
    }
    // .checkBalances{
    //     width: 30%;
    //     height: 35px;
    //     display: flex;
    //     justify-content: space-between;
    //     margin-left: 2.5%;

    //     .m-submit-btn{
    //         margin: 0!important;
    //         padding: 0 10px!important;
    //     }
    // }
    .codeBtnWord {
      background: #BB0B0D !important;
      background-image: linear-gradient(0deg, #530001 0%, #7D0405 17%, #BB0B0D 86%, #FFA1A3 100%) !important;
      // 兼容IE9
      filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#7D0405',endColorStr='#BB0B0D',gradientType='1');
      color: #fff !important;
      border-color: #cc444d !important;
      border-radius: 4px !important;
    }
    .el-button.is-disabled {
        color: #fff;
        background-color: #c8c9cc;
        border-color: #c8c9cc;
        background-image: none;
        // 兼容IE9
        filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#c6c6c6',endColorStr='#c6c6c6',gradientType='1');
      }
    .smsCodeBtn {
      margin-left: 10px;
    }
// .codeButton {
//   background-color: #cc444d;
//   border-color: #cc444d;
// }
</style>
