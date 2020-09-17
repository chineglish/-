<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @chanegPayerAccNo="chanegPayerAccNo"
        @back="back"
        @submit="submit"
        @changePhone="changePhone"
        @smsCodeBtn="smsCodeBtn"
        >
        <div style="width:100%" slot="function">
          <ul class="newFormUl">
            <li class="newFormLi">{{formModel.userId}}&nbsp;{{formModel.userName}}&nbsp;{{formModel.usbKeySn}}&nbsp;&nbsp;&nbsp;</li>
          </ul>
          <!-- <span class="operate" @click="add">+添加操作员>></span> -->
        </div>
        <div class="smsCodeBtn" style="width:5%" slot="smsCodeBtn">
          <el-button size="medium" :disabled="disabled" @click="changeSmsCode" class="codeBtnWord">{{codeBtnWord}}</el-button>
        </div>
        <div class="checkBalances" slot="checkBalances">
          <el-button type="primary" size="mini" @click="changeBalances" class="m-submit-btn fs14">查询余额</el-button>
          <span class="fs14">{{balance}}</span>
        </div>
      </m-new-form>
    </div>
    <!-- <div class="form-box"> -->
      <!-- 添加操作员弹框 -->
      <!-- <div class="add">
        <el-dialog title="添加操作员" center width="48%" :visible.sync="dialogTable" :show-close="false">
          <div class="add-body">
            <div class="add-label">选择操作员及证书</div>
            <div class="add-content">
              <el-table
                ref="multipleTable"
                :data="tableDataAdd"
                tooltip-effect="dark"
                style="width: 100%"
                :show-header="false"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="20">
                </el-table-column>
                <el-table-column
                prop="userId"
                width="120">
                </el-table-column>
                <el-table-column
                  prop="userName"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="usbKeySn"
                  width="165"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="dialogButton">
            <el-button type="info" class="m-submit-btn" @click="submitAdd">确定</el-button>
            <el-button type="info" class="m-cancel-btn" @click="backAdd">取消</el-button>
          </div>
        </el-dialog>
      </div> -->

      <!-- 删除操作员弹框 -->
      <!-- <div class="delect">
        <el-dialog title="删除操作员" center width="43%" :visible.sync="showDelDialog" :show-close="false">
          <div class="dialog-caption fs18">请确定是否解约改操作员的证书续费自动扣划？</div>
          <div class="dialog-body">
            <div class="dialog-label">操作员及证书</div>
            <div class="dialog-content">{{delItem.userId}}&nbsp;{{delItem.userName}}&nbsp;{{delItem.usbKeySn}}</div>
          </div>
          <div class="dialog-button">
            <el-button type="info" class="m-submit-btn" @click="delect">确定</el-button>
            <el-button type="info" class="m-cancel-btn" @click="delectCancel">取消</el-button>
          </div>
        </el-dialog>
      </div> -->
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { mapMutations } from 'vuex'
export default {
  name: 'autoFeeSignDefend',
  data () {
    return {
      codeBtnWord: '获取验证码',
      waitTime: 60,
      disabled: false,
      dialogTable: false,
      showDelDialog: false,
      delIndex: '',
      delItem: {},
      selectMem: [],
      delectMem: [],
      newFormUl: [], // 旧签约成员
      oldContract: [],
      titleData: ['企业管理台', '证书管理', '证书自动扣费签约'],
      balance: '',
      formModel: {
        signAccount: '',
        feeAmount: '',
        mobilePhone: '',
        updateFeeList: [],
        smsCode: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          signAccount: [{ required: true, message: '续费签约账户不可空', trigger: 'change' }],
          mobilePhone: [{ required: true, message: '扣费提前通知手机号不能为空', trigger: 'submit' }, {
            validator: (rule, value, callback) => util.verifyMobile(value, callback), trigger: 'submit' }],
          smsCode: [{ required: true, message: '验证码不能为空', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '16.5%',
            group: [
              {
                'disabled': false,
                'label': '签约缴费账号',
                'type': 'select',
                'key': 'signAccount',
                'options': [],
                changeEventName: 'chanegPayerAccNo',
                'slotName': 'checkBalances'
              }
            ]
          },
          {
            formWidth: '100%',
            labelWidth: '16.5%',
            group: [
              {
                'label': '操作员及证书',
                'type': 'blank',
                'slotName': 'function'
              }
            ]
          },
          {
            formWidth: '100%',
            labelWidth: '16.5%',
            group: [
              {
                'disabled': true,
                'label': '收费标准（张/年）',
                'type': 'text',
                'key': 'feeAmount'
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
                'inputEventName': 'smsCodeBtn',
                'maxlength': 6
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
      // formConfigJsonAdd: {
      //   formItems: [
      //     {
      //       formWidth: '100%',
      //       labelWidth: '23%',
      //       title: '添加操作员',
      //       group: [
      //         {
      //           'disabled': true,
      //           'label': '选择操作员及证书',
      //           'type': 'text',
      //           'key': 'operaMan',
      //           'slotName': 'operaMan'
      //         }
      //       ]
      //     }
      //   ]
      // },
      // tableDataAdd: [],
      // formConfigJsonDel: {
      //   formItems: [
      //     {
      //       formWidth: '100%',
      //       labelWidth: '23%',
      //       title: '删除操作员',
      //       group: [
      //         {
      //           'disabled': true,
      //           'label': '操作员及证书',
      //           'type': 'text',
      //           'key': 'operaDel',
      //           'slotName': 'operaDel'
      //         }
      //       ]
      //     }
      //   ]
      // }
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    changePhone (res) {
      this.formModel.mobilePhone = res.mobilePhone
    },
    smsCodeBtn (res) {
      this.formModel.smsCode = res.smsCode
    },
    dataMap () {
      this.formModel.updateFeeList = []
      let map = {}
      map.userId = this.formModel.userId
      map.userName = this.formModel.userName
      map.keyId = this.formModel.usbKeySn
      map.userSeq = this.formModel.userSeq
      this.formModel.updateFeeList.push(map)
    },
    // 确定
    submit (data) {
      this.dataMap()
      const [accNo, subAccNo, acName] = (this.formModel.signAccount || '').split('/')
      const params = {
        payerAcNo: accNo,
        payerAcName: acName,
        payerSubAcNo: subAccNo,
        feeAmount: data.feeAmount,
        mobilePhone: data.mobilePhone,
        updateFeeList: this.formModel.updateFeeList,
        smsCode: data.smsCode
      }
      if (data.feeAcNo === accNo && data.feeSubAcNo === subAccNo && this.$route.params.mobilePhone === data.mobilePhone) {
        this.$msg('签约未修改，请修改')
      } else {
        httpPost('/eweb-enterprise.UpdateAutDedFeeSignConfirm.do', params).then(res => {
          data._Data2Sign = res._Data2Sign
          data._authenticateType = res._authenticateType
          this.$router.push({
            name: 'autoFeeSignConfirm',
            params: {
              ...this.formModel,
              _Data2Sign: data._Data2Sign,
              _dataMapKey: res._dataMapKey,
              _authenticateType: data._authenticateType
            }
          })
        })
      }
    },
    // 返回
    back (res) {
      this.$router.push({
        name: 'autoFeeSignAlready'
      })
    },
    // add () {
    //   httpPost('/eweb-enterprise.AutDedFeeSignQry.do', { signFlag: '1' }).then(res => {
    //     this.tableDataAdd = res.respAutDedFeeSignQryList
    //   })
    //   this.dialogTable = true
    // },
    // del (index) {
    //   this.delItem = this.newFormUl[index]
    //   this.delIndex = index
    //   this.showDelDialog = true
    // },
    // 删除操作员弹框，确认
    // delect () {
    //   for (let i = 0; i < this.oldContract.length; i++) {
    //     let map = {}
    //     map.userId = this.newFormUl[this.delIndex].userId
    //     map.userName = this.newFormUl[this.delIndex].userName
    //     map.keyId = this.newFormUl[this.delIndex].usbKeySn
    //     if (this.oldContract[i].userId === this.newFormUl[this.delIndex].userId) {
    //       this.delectMem.push(map)
    //       this.formModel.relFeeList = this.delectMem
    //       break
    //     }
    //   }
    //   this.newFormUl.splice(this.delIndex, 1)
    //   this.delIndex = ''
    //   this.showDelDialog = false
    // },
    // // 选择的添加的成员
    // handleSelectionChange (val) {
    //   this.selectMem = val
    // },
    // // 添加操作员弹框,确定
    // submitAdd () {
    //   for (let i = 0; i < this.selectMem.length; i++) {
    //     let Judgment = true
    //     for (let j = 0; j < this.newFormUl.length; j++) {
    //       if (this.newFormUl[j].userId === this.selectMem[i].userId) {
    //         Judgment = false
    //         break
    //       }
    //     }
    //     if (Judgment) {
    //       this.newFormUl.push(this.selectMem[i])
    //     }
    //   }
    //   this.dialogTable = false
    // },
    // // 添加操作员弹框，取消
    // backAdd () {
    //   this.dialogTable = false
    // },
    // // 删除操作员，取消
    // delectCancel () {
    //   this.showDelDialog = false
    // },
    // AutDedFeeSignQry () {
    //   httpPost('/eweb-enterprise.AutDedFeeSignQry.do', { signFlag: '0' }).then(res => {
    //     this.formModel = res
    //     for (let i = 0; i < res.respAutDedFeeSignQryList.length; i++) {
    //       this.oldContract.push(res.respAutDedFeeSignQryList[i])
    //     }
    //     this.newFormUl = res.respAutDedFeeSignQryList
    //     this.formModel.signAccount = this.formModel.feeAcNo + '/' + this.formModel.feeSubAcNo + '/' + this.formModel.feeAcName
    //     this.formModel.phone = this.formModel.mobilePhone
    //     httpPost('eweb-acmgmt.AccountInfoQuery.do', {
    //       payerAcNo: this.formModel.feeAcNo,
    //       payerSubAcNo: this.formModel.feeSubAcNo
    //     }).then(res => {
    //       this.balance = util.formatCurrency(res.availBal)
    //     })
    //   })
    // },
    //  余额查询
    changeBalances () {
      const [accNo, subAccNo] = (this.formModel.signAccount || '').split('/')
      const params = {
        payerAcNo: accNo,
        payerSubAcNo: subAccNo
      }
      httpPost('/eweb-acmgmt.AccountInfoQuery.do', params).then(AccountInfo => {
        this.balance = util.formatCurrency(AccountInfo.availBal) + '元'
      }).catch(AccountInfo => {
        this.balance = '未查询到余额'
      })
    },
    chanegPayerAccNo (data) {
      this.formModel = data
      const [accNo, subAccNo] = (this.formModel.signAccount || '').split('/')
      const params = {
        payerAcNo: accNo,
        payerSubAcNo: subAccNo
      }
      this.balance = ''
      httpPost('/eweb-acmgmt.AccountInfoQuery.do', params).then(AccountInfo => {
        this.balance = util.formatCurrency(AccountInfo.availBal)
      }).catch(AccountInfo => {
        this.balance = '未查询到余额'
      })
    },
    initData () {
      // 查询账户列表及账户余额
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'AutDedFeeSign' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
          .map(item => (
            { value: util.getPayerAccount(item), key: item.acNo + '/' + item.subAcNo + '/' + item.acName }
          ))
        this.changeBalances()
      }).catch(err => {
        console.error(err)
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
          mobilePhone: this.formModel.mobilePhone
        }).then(res => {
          this.formConfigJson.formItems[3].group[0].disabled = true
          let timer = setInterval(() => {
            if (this.waitTime > 1) {
              this.waitTime--
              this.disabled = true
              this.codeBtnWord = `${this.waitTime}s后再获取`
            } else {
              this.formConfigJson.formItems[3].group[0].disabled = false
              clearInterval(timer)
              this.codeBtnWord = '获取验证码'
              this.waitTime = 60
              this.disabled = false
            }
          }, 1000)
        })
      }
    }
  },
  created () {
    this.removeKeepAliveList() // 清除页面缓存
    // this.AutDedFeeSignQry()
    this.initData()
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
    }
    this.formModel.signAccount = this.$route.params.feeAcNo + '/' + this.$route.params.feeSubAcNo + '/' + this.$route.params.feeAcName
  }
}
</script>

<style lang="scss" scope>
  .form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
  }
  .newFormLi{
      margin-left: 15px;
      width: 45%;
      float: left;
  }
    .operate{
      color: blue;
  }
  .newFormAdd li{
    margin-left: 3%;
  }
  .dialogButton{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 25px;
    padding-top: 25px;
    border-top: 1px solid #999999;
  }
  .checkBalances{
    width: 30%;
    height: 35px;
    display: flex;
    display: inline-block\9;
    justify-content: space-between;
    margin-left: 2.5%;
    .m-submit-btn{
        margin: 0!important;
        padding: 0 10px!important;
    }
  }
.el-dialog__title {
    color: #ffffff;
  }
.el-dialog__header {
    background: #cc444d;
    text-align: center;
  }
.el-dialog__body {
    padding: 30px;
    background: #F0F0F0;
  }
  .add-body {
    display: flex;
    .add-label {
      display: flex;
      width: 25%;
      justify-content: center;
      align-items: center;
      background: cornsilk;
      border: 1px solid #999999;
      border-right: 0px solid #999999;
    }
    .add-content {
      width: 74%;
      border: 1px solid #999999;
      background: #ffffff;
      .el-table-column--selection .cell {
        padding-left: 5px;
        padding-right: 0px;
        // margin: 0px 10px;
      }
    }
  }
  // .delect >>> .el-dialog__title {
  //   color: #ffffff;
  // }
  // .delect >>> .el-dialog__header {
  //   background: #cc444d;
  //   text-align: center;
  // }
  // .delect >>> .el-dialog__body {
  //   background: #F0F0F0;
  // }
  .dialog-caption {
    text-align: center;
    margin-bottom: 20px;
  }
  .dialog-body {
    display: flex;
    text-align: center;
    height: 40px;
    .dialog-label{
      line-height: 40px;
      background: cornsilk;
      width: 20%;
      border: 1px solid #999999;
      border-right: 0px solid #999999;
      padding: 0 20px;
    }
    .dialog-content{
      width: 79%;
      line-height: 40px;
      border: 1px solid #999999;
      background: #ffffff;
    }
  }
  .dialog-button {
    margin-top: 25px;
    padding-top: 25px;
    width: 100%;
    display: flex;
    justify-content: center;
    border-top: 1px solid #999999;
  }
  .codeBtnWord, .codeBtnWord:hover, .codeBtnWord:focus {
  // margin-left: 5px;
  background: #BB0B0D !important;
  background-image: linear-gradient(0deg, #530001 0%, #7D0405 17%, #BB0B0D 86%, #FFA1A3 100%) !important;
  // 兼容IE9
  filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#7D0405',endColorStr='#BB0B0D',gradientType='1');
  color: #fff;
  border-color: #cc444d;
  border-radius: 4px;
}
.smsCodeBtn {
  margin-left: 10px;
}
.el-button.is-disabled{
    // 兼容IE9
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#c6c6c6',endColorStr='#c6c6c6',gradientType='1');
  }
</style>
