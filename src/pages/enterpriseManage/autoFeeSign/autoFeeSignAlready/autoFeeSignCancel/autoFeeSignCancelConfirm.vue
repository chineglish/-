<!--<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
export default {
  name: 'autoFeeSignCancelConfirm',
  data () {
    return {
      formModel: {
        payName: '',
        transDate: '',
        operaName: '',
        operaNum: ''
      },
      titleData: ['企业管理台', '证书管理', '证书自动扣费签约'],
      btnData: [
        { btnText: '返回首页', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '4',
        resData: {
          title: '交易已提交，请等待审核员审查！',
          group: [
            { label: '交易名称', key: 'payName' },
            { label: '交易日期', key: 'transDate' },
            { label: '操作员姓名', key: 'operaName' },
            { label: '操作员', key: 'operaNum' }]
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'index'
      })
    }
  },
  created () {
    this.formModel.transDate = this.$route.params.res._transTime ? this.$route.params.res._transTime : ''
    this.data._JnlStatus = this.$route.params.res._processState ? this.$route.params.res._processState : ''
    this.data.resData._jnlNo = this.$route.params.res._jnlNo ? this.$route.params.res._jnlNo : ''
    this.formModel.payName = '证书自动续费签约维护'
    const user = this.getUser()
    this.formModel.operaName = user ? user.userName : '' // (操作员名 )
    this.formModel.operaNum = user ? user.userId : '' // (操作员名)
  }
}
</script> -->
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
            <li class="newFormLi">{{item.userId}}&nbsp;&nbsp;&nbsp;{{item.userName}}&nbsp;&nbsp;&nbsp;{{item.usbKeySn}}</li>
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
                'label': '交易日期',
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
                'label': '已选择的操作员及证书',
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
      // Object.assign(this.formModel, this.$route.params.formModel)
      this.formModel.payName = '证书自动续费签约维护'
      this.formModel.payTime = this.$route.params.res._transTime
      this.JnlStatus = util.handleEnums(process_state, this.$route.params.res._processState)
      this.jnlNo = this.$route.params.res._jnlNo
      this.newFormUl = this.$route.params.feeList
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
