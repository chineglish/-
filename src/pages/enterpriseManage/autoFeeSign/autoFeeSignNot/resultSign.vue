<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-steps :data="stepsData"></m-steps>
      <div class="head">
        <div class="resImage">
          <img class="image" v-if="JnlStatus" src="@/assets/image/suc.png">
          <img class="image" v-else src="@/assets/image/fail.png">
          <span class="restitle fs40">{{JnlStatus ? '交易已提交' : '交易失败,请重新交易'}}</span>
        </div>
      </div>
      <div class="serial fs20">交易流水号：{{jnlNo}}&nbsp;&nbsp;&nbsp;交易状态：{{JnlStatus}}</div>
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @back="back"
        >
        <div style="width:100%" slot="function">
          <ul class="newFormUl" v-for="item in newFormUl" :key="item.userId">
            <li class="newFormLi">{{item.userId}}&nbsp;&nbsp;&nbsp;{{item.userName}}&nbsp;&nbsp;&nbsp;{{item.keyId}}</li>
          </ul>
        </div>
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { process_state } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'autoFeeSignConfirm',
  data () {
    return {
      newFormUl: [],
      JnlStatus: '',
      jnlNo: '',
      titleData: ['企业管理台', '证书管理', '证书自动扣费签约'],
      stepsData: {
        stepsActive: 2,
        stepsData: [
          '信息录入',
          '交易确认',
          '提交结果'
        ]
      },
      formModel: {
        payName: '',
        signAccount: '',
        operator: '',
        payStanderd: '',
        phone: '',
        payTime: '',
        operaName: '',
        operaNum: ''
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '59%',
            group: [
              {
                'disabled': true,
                'label': '交易名称',
                'type': 'text',
                'key': 'payName'
              },
              {
                'disabled': true,
                'label': '提交时间',
                'type': 'text',
                'key': 'payTime'
              }
            ]
          },
          {
            formWidth: '100%',
            labelWidth: '23%',
            group: [
              {
                'disabled': true,
                'label': '签约缴费账户',
                'type': 'text',
                'key': 'signAccount'
              },
              {
                'disabled': true,
                'label': '已选择的操作员',
                'type': 'text',
                'key': 'operator',
                'slotName': 'function'
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '59%',
            group: [
              {
                'disabled': true,
                'label': '收费标准（张/年）',
                'type': 'text',
                'key': 'payStanderd'
              },
              {
                'disabled': true,
                'label': '扣费提前通知手机号',
                'type': 'text',
                'key': 'phone'
              },
              {
                'disabled': true,
                'label': '操作员姓名',
                'type': 'text',
                'key': 'operaName'
              },
              {
                'disabled': true,
                'label': '操作员号',
                'type': 'text',
                'key': 'operaNum'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '返回首页', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    back (res) {
      this.$router.push({
        name: 'index'
      })
    }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params.formModel)
      this.resSub = this.$route.params.resSub
      this.formModel.payName = '证书自动扣费签约'
      this.JnlStatus = util.handleEnums(process_state, this.resSub._processState)
      this.jnlNo = this.resSub._jnlNo
      this.formModel.payTime = this.resSub._transTime
      this.newFormUl = this.formModel.signFeeList
      const user = this.getUser()
      this.formModel.operaName = user ? user.userName : ''
      this.formModel.operaNum = user ? user.userId : ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
  }
  .newFormLi{
      margin-left: 15px;
      width: 45%;
      float: left;
  }
  .head {
    width: 100%;
    display: flex;
    justify-content: center;
    .image {
      width: 40px;
      height: 40px;
    }
    .restitle {
      margin-left: 20px;
    }
  }
  .serial {
    width: 100%;
    text-align: center;
    margin: 10px 0;
  }
</style>
