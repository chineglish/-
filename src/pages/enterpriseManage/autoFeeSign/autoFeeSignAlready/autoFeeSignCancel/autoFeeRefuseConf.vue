<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <m-steps :data="stepsData"></m-steps>
    <div class="form-box">
      <d-table
          :table-data="tableData"
          :actionData="actionData"
          :tableHeadData="tableHeadData"
          :pagesize = "pagesize"
          @submit="submit"
          @back="back"
      >
      </d-table>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { mapMutations } from 'vuex'
export default {
  name: 'autoFeeRefuseConf',
  data () {
    return {
      stepsData: {
        stepsActive: 1
      },
      pagesize: 20,
      feeList: [],
      relFeeList: [],
      titleData: ['企业管理台', '证书管理', '证书自动扣费签约'],
      tableHeadData: [
        { label: '操作员号', prop: 'userId' },
        { label: '操作员姓名', prop: 'userName' },
        { label: '证书ID', prop: 'usbKeySn' },
        { label: '签约缴费账号', prop: 'feeAcNo' },
        { label: '扣费提前通知手机号', prop: 'mobilePhone' },
        { label: '收费标准(张/年)', prop: 'feeAmount' }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '确认',
          // type: 'info',
          class: 'm-submit-btn',
          eventName: 'submit'
        },
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          // type: 'info',
          eventName: 'back'
        }
      ]
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    back () {
      this.$router.push('autoFeeSignAlready')
    },
    submit (res) {
      const params = this.$route.params.feeDate
      httpPost('/eweb-common.GenToken.do').then(token => {
        const singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        httpPost('/eweb-enterprise.AutDedFeeRel.do', {
          ...params,
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg,
          _tokenName: token._tokenName
        }).then(res => {
          this.$router.push({
            name: 'autoFeeSignCancelConfirm',
            params: {
              res: res,
              feeList: this.feeList
            }
          })
        })
      })
    }
  },
  created () {
    if (this.$route.params) {
      this.feeList = this.$route.params.feeList
      this.tableData = this.$route.params.feeList
    }
  }
}
</script>
<style lang="scss">
  .action-btn{
    width: 50% !important;
    margin-left: 25%;
  }
  .form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  }
  .el-dialog__header {
    background: #cc444d;
    text-align: center;
  }
  .el-dialog__footer {
    background: #f0f0f0
  }
  .el-dialog__body {
    background: #f0f0f0
  }
  .el-dialog__title {
    color: #ffffff;
  }
  .newFormUl li{
      width: 50%;
      float: left;
      /* margin-right: 5%; */
  }
  .button {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 25px;
    border-top: 1px solid #999999
  }
</style>
