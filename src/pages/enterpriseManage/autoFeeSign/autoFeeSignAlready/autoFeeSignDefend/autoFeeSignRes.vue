<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-steps :data="stepsData"></m-steps>
    <div class="form-box">
      <div class="head">
        <div class="resImage">
            <img class="image" v-if="JnlStatus" src="@/assets/image/suc.png">
            <img class="image" v-else src="@/assets/image/fail.png">
            <span class="restitle fs40">{{JnlStatus ? '交易已提交' : '交易失败,请重新交易'}}</span>
        </div>
      </div>
      <div class="serial fs20">交易流水号：{{formModel._jnlNo}}&nbsp;&nbsp;&nbsp;交易状态：{{JnlStatus}}</div>
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @back="back"
        >
        <div style="width:100%" slot="function">
          <ul class="newFormUl">
              <li class="newFormLi">{{formModel.userId}}&nbsp;&nbsp;&nbsp;{{formModel.userName}}&nbsp;&nbsp;&nbsp;{{formModel.usbKeySn}}&nbsp;&nbsp;&nbsp;</li>
          </ul>
        </div>
        <!-- <div style="width:100%" slot="del">
          <ul class="newFormUl" v-for="item in delMember" :key="item.userId">
              <li class="newFormLi">{{item.userId}}&nbsp;&nbsp;&nbsp;{{item.userName}}&nbsp;&nbsp;&nbsp;{{item.keyId}}&nbsp;&nbsp;&nbsp;</li>
          </ul>
        </div> -->
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { process_state } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'autoFeeSignRes',
  data () {
    return {
      newFormUl: [],
      delMember: [],
      JnlStatus: '',
      stepsData: {
        stepsActive: 2
      },
      titleData: ['企业管理台', '证书管理', '证书自动扣费签约'],
      formModel: {
        payName: '证书自动续费签约',
        signAccount: '',
        opera: '',
        delOpera: '',
        feeAmount: '',
        mobilePhone: '',
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
                'key': 'opera',
                'slotName': 'function'
              }
              // {
              //   'disabled': true,
              //   'label': '已删除的操作员',
              //   'type': 'text',
              //   'key': 'delOpera',
              //   'slotName': 'del',
              //   'show': false
              // }
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
                'key': 'feeAmount'
              },
              {
                'disabled': true,
                'label': '扣费提前通知手机号',
                'type': 'text',
                'key': 'mobilePhone'
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
      Object.assign(this.formModel, this.$route.params)
      this.formModel.operaName = this.getUser().userName
      this.formModel.operaNum = this.getUser().userId
      this.formModel.payTime = this.$route.params._transTime
      // this.newFormUl = this.formModel.signFeeList
      // this.delMember = this.formModel.relFeeList
      this.JnlStatus = util.handleEnums(process_state, this.$route.params._processState)
    }
    // if (this.delMember) {
    //   this.formConfigJson.formItems[1].group[2].show = true
    // }
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
