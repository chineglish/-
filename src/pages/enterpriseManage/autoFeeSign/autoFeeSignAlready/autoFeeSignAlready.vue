<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <d-table
          :table-data="tableData"
          :actionData="actionData"
          :firstColIndex="firstColIndex"
          :tableHeadData="tableHeadData"
          :pagesize = "pagesize"
          @handleSelectionChange="changeItem"
          @agree = "agree"
          @refuse="refuse"
      >
      </d-table>
    </div>
    <!-- <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @cancelSign="cancelSign"
        @submit="submit"
        >
        <div style="width:100%" slot="function">
          <ul class="newFormUl">
            <li v-for="item in newFormUl" :key="item.num">{{item.userId}}&nbsp;&nbsp;&nbsp;{{item.userName}}&nbsp;&nbsp;&nbsp;{{item.usbKeySn}}</li>
          </ul>
        </div>
      </m-new-form>
    </div> -->
    <!-- <div class="cancel">
      <el-dialog
        title="信息确认"
        :visible.sync="backI"
        width="40%"
        center
        :show-close="false">
        <div class="fs20" style="text-align: center;">请确认是否解约证书自动扣费?</div>
        <span slot="footer" class="dialog-footer">
          <div class="button">
            <el-button class="m-submit-btn" type="info" @click="confirm">确定</el-button>
            <el-button class="m-cancel-btn" type="info" @click="cancel">返回</el-button>
          </div>
        </span>
      </el-dialog>
    </div> -->
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { mapMutations } from 'vuex'
export default {
  name: 'autoFeeSignAlready',
  data () {
    return {
      // backI: false,
      pagesize: 20,
      newFormUl: [],
      currentSelect: [],
      relFeeList: [],
      titleData: ['企业管理台', '证书管理', '证书自动扣费签约'],
      firstColIndex: {
        type: 'selection',
        label: '全选',
        eventName: ''
      },
      tableHeadData: [
        { label: '操作员号', prop: 'userId' },
        { label: '操作员姓名', prop: 'userName' },
        { label: '证书ID', prop: 'usbKeySn', width: '180' },
        { label: '签约缴费账号', prop: 'feeAcNo' },
        { label: '扣费提前通知手机号', prop: 'mobilePhone' },
        { label: '收费标准(张/年)', prop: 'feeAmount' },
        { label: '签约扣费状态', prop: 'certAutoSign', formatter: (row, column, cellValue, index) => cellValue === '0' ? '自动缴费开启' : '自动缴费关闭' }
      ],
      operateData: {
        btnData: []
      },
      tableData: [],
      actionData: [
        {
          btnText: '修改签约信息',
          // type: 'info',
          class: 'm-submit-btn',
          eventName: 'agree'
        },
        {
          btnText: '解约',
          class: 'm-cancel-btn',
          // type: 'info',
          eventName: 'refuse'
        }
      ]
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    changeItem (obj) {
      this.currentSelect = obj
    },
    // 修改签约信息
    agree (res) {
      if (this.currentSelect.length !== 0) {
        if (this.currentSelect.length === 1) {
          this.removeKeepAliveList() // 清除页面缓存
          this.$router.push({
            name: 'autoFeeSignDefend',
            params: this.currentSelect[0]
          })
        } else {
          this.$msg('仅支持单笔修改')
        }
      } else {
        this.$msg('请选择需要修改的信息')
      }
    },
    // 解约
    refuse (res) {
      let judgment = false
      this.relFeeList = []
      for (var i = 0; i < this.currentSelect.length; i++) {
        this.relFeeList.push({
          feeAcNo: this.currentSelect[i].feeAcNo,
          payerSubAcNo: this.currentSelect[i].feeSubAcNo,
          feeAcName: this.currentSelect[i].feeAcName,
          feeSubAcNo: this.currentSelect[i].feeSubAcNo,
          mobilePhone: this.currentSelect[i].mobilePhone,
          userId: this.currentSelect[i].userId,
          userName: this.currentSelect[i].userName,
          keyId: this.currentSelect[i].usbKeySn,
          userSeq: this.currentSelect[i].userSeq,
          feeAmount: this.currentSelect[i].feeAmount
        })
      }
      let params = {}
      httpPost('/eweb-query.PayerAccountListQry.do', { TransCode: 'AutDedFeeSign' }).then(list => {
        for (let i = 0; i < list.AcList.length; i++) {
          for (let j = 0; j < this.currentSelect.length; j++) {
            if (list.AcList[i].acNo.indexOf(this.currentSelect[j].feeAcNo) > -1) {
              params = {
                payerAcNo: this.currentSelect[j].feeAcNo,
                payerAcName: this.currentSelect[j].feeAcName,
                feeAmount: this.currentSelect[j].feeAmount,
                mobilePhone: this.currentSelect[j].mobilePhone,
                relFeeList: this.relFeeList
              }
              judgment = false
              break
            } else {
              judgment = true
            }
          }
        }
        if (judgment) {
          params = {
            payerAcNo: this.currentSelect[0].feeAcNo,
            payerAcName: this.currentSelect[0].feeAcName,
            feeAmount: this.currentSelect[0].feeAmount,
            mobilePhone: this.currentSelect[0].mobilePhone,
            relFeeList: this.relFeeList
          }
        }
        httpPost('/eweb-enterprise.AutDedFeeRelConfirm.do', params).then(conf => {
          this._Data2Sign = conf._Data2Sign
          this._authenticateType = conf._authenticateType
          this.$router.push({
            name: 'autoFeeRefuseConf',
            params: {
              feeList: this.currentSelect,
              feeDate: params,
              _Data2Sign: conf._Data2Sign,
              _dataMapKey: conf._dataMapKey,
              _authenticateType: conf._authenticateType
            }
          })
        })
      })
    },
    // 弹框取消按钮
    // cancel () {
    //   this.backI = false
    // },
    // 弹框确认按钮
    // confirm (res) {
    //   this.relFeeList = []
    //   for (var i = 0; i < this.currentSelect.length; i++) {
    //     this.relFeeList.push({
    //       feeAcNo: this.currentSelect[i].feeAcNo,
    //       feeAcName: this.currentSelect[i].feeAcNo,
    //       feeSubAcNo: this.currentSelect[i].feeSubAcNo,
    //       mobilePhone: this.currentSelect[i].mobilePhone,
    //       userId: this.currentSelect[i].userId,
    //       userName: this.currentSelect[i].userName,
    //       keyId: this.currentSelect[i].usbKeySn,
    //       userSeq: this.currentSelect[i].userSeq
    //     })
    //   }
    //   const params = {
    //     payerAcNo: this.currentSelect[0].feeAcNo,
    //     payerAcName: this.currentSelect[0].feeAcName,
    //     feeAmount: this.currentSelect[0].feeAmount,
    //     mobilePhone: this.currentSelect[0].mobilePhone,
    //     relFeeList: this.relFeeList
    //   }
    //   httpPost('/eweb-common.GenToken.do').then(token => {
    //     const singMsg = this.isSign({ _Data2Sign: this._Data2Sign, _authenticateType: this._authenticateType })
    //     httpPost('/eweb-enterprise.AutDedFeeRel.do', {
    //       ...params,
    //       _authenticateTypeChoose: this._authenticateType ? this._authenticateType[0] : '',
    //       CSIISignature: singMsg,
    //       _tokenName: token._tokenName
    //     }).then(res => {
    //       this.$router.push({
    //         name: 'autoFeeSignCancelConfirm',
    //         params: {
    //           res: res
    //         }
    //       })
    //     })
    //   })
    //   this.backI = true
    // },
    AutDedFeeSignQry () {
      httpPost('/eweb-enterprise.AutDedFeeSignQry.do', { signFlag: '0' }).then(res => {
        this.tableData = res.respAutDedFeeSignQryList
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].feeAmount = res.feeAmount
        }
      })
    }
  },
  created () {
    this.AutDedFeeSignQry()
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
    margin-top: 20px;
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
