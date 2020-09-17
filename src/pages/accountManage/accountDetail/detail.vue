<template>
  <div>
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>
    <div class="account-detail-detail">
      <div class="box">
        <div class="topLogo clearfix">
          <img class="fll" src="../../home/image/headerLogo.jpg"/>
          <div class="fll title">电子对账单</div>
        </div>
        <div class="table">
          <div class="container">
            <div class="col-1">
              <div class="col-2">
                <div class="col">
                  <div class="col-4">付款人</div>
                  <div class="col-5">
                    <div class="row-1 label">账户名称</div>
                    <div class="row-1 label">账号</div>
                    <div class="row-1 label">开户银行</div>
                  </div>
                </div>
                <div class="row-3 label">金额（小写）</div>
                <div class="row-3 label">交易时间</div>
              </div>
              <div class="col-3">
                <div class="row-2">{{formModel.payerAcName}}</div>
                <div class="row-2">{{formModel.payerAcNo}}</div>
                <div class="row-2">{{formModel.payerFinName}}</div>
                <div class="row-2">{{formModel.amount | formatCurrency}}</div>
                <div class="row-2">{{formModel.transDateTime}}</div>
              </div>
            </div>
            <div class="col-1">
              <div class="col-2">
                <div class="col">
                  <div class="col-4">收款人</div>
                  <div class="col-5">
                    <div class="row-1 label">账户名称</div>
                    <div class="row-1 label">账号</div>
                    <div class="row-1 label">开户银行</div>
                  </div>
                </div>
                <div class="row-3 label">金额（大写）</div>
                <div class="row-3 label">摘要</div>
              </div>
              <div class="col-3">
                <div class="row-2">{{formModel.payeeAcName}}</div>
                <div class="row-2">{{formModel.payeeAcNo}}</div>
                <div class="row-2">{{formModel.payeeFinName}}</div>
                <div class="row-2">{{formModel.capAmount}}</div>
                <div class="row-2">{{formModel.remark}}</div>
              </div>
            </div>
          </div>
          <div class="row-4">
            <div class="col-6 label">附言</div>
            <div class="col-7">{{formModel.infoRemarks}}</div>
          </div>
          <img :src="imgUrl">
        </div>
      </div>
    </div>
    <m-btn :btnData="btnData" @click="clickEvent" class="no-print"></m-btn>
    <m-hint-box :msgs="msgs" class="no-print"></m-hint-box>
    <!-- <el-dialog title="电子对账单打印" center :visible.sync="showPrintBox">
      <div id="printArea" class=""></div>
      <m-btn :btnData="btnData" @click="dialogClickEvent"></m-btn>
    </el-dialog> -->
    <!-- 电子对账单下载弹窗 -->
    <el-dialog title="电子对账单下载" center :visible.sync="centerDialogVisible">
      <el-form :model="downloadForm">
        <el-form-item label="导出格式：">
          <el-radio-group v-model="downloadForm.fileType">
            <el-radio :key="idx" :label="type.value" v-for="(type, idx) in fileTypes">导出为{{type.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <m-btn :btnData="dialogBtnData" @click="dialogClickEvent"></m-btn>
    </el-dialog>
  </div>
</template>

<script>
import { httpPost, downloadFile } from '@/api/sys/http'
import util from '@/libs/util.js'

export default {
  name: 'accountDetail',

  data () {
    return {
      formModel: {
        crFlag: '',
        payerAcNo: '',
        payerAcName: '',
        payerFinName: '',
        payeeAcNo: '',
        payeeAcName: '',
        payeeFinName: ''
      },
      showPrintBox: true,
      msgs: [
        '1.查询起止时间最长为六个月,通常历史明细查询可查询该账户最近六个月内的所有交易明细。',
        '2.用于查询本企业加挂全部账户的交易明细详情，并可对交易明细详情进行下载和打印。'
      ],
      downloadForm: {
        fileType: 'pdf'
      },
      fileTypes: [
        { label: 'excel', value: 'xls' },
        { label: 'pdf', value: 'pdf' }
      ],
      dialogBtnData: [
        {
          btnText: '下载',
          class: 'm-submit-btn',
          eventName: 'download'
        },
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          eventName: 'backHandler'
        }
      ],
      btnData: [
        {
          btnText: '打印',
          class: 'm-submit-btn',
          eventName: 'handerPrint'
        },
        {
          btnText: '下载',
          class: 'm-submit-btn',
          eventName: 'download'
        },
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          eventName: 'backHandler'
        }
      ],
      centerDialogVisible: false,
      breadcrumb: ['账户管理', '账户明细查询', '详情页'],
      imgUrl: ''
    }
  },
  filters: {
    formatCurrency (value) {
      // console.log(value)
      return util.formatCurrency(value)
    }
  },
  methods: {
    clickEvent (eventName) {
      switch (eventName) {
        case 'backHandler':
          this.backHandler()
          break
        case 'download':
          this.download()
          break
        case 'handerPrint':
          util.handerPrint()
          break
      }
    },
    dialogClickEvent (eventName) {
      switch (eventName) {
        case 'backHandler':
          this.centerDialogVisible = false
          break
        case 'download':
          this.downloadConfirm()
          break
      }
    },
    backHandler () {
      this.$router.push({
        name: 'accountDetailQry',
        params: {
          formModel: this.$route.params.formModel
        }
      })
    },
    downloadConfirm () {
      const params = {
        ...this.formModel,
        _Download: this.downloadForm.fileType
      }
      downloadFile('/eweb-acmgmt.AcctDetailDetDown.do', params)
      this.centerDialogVisible = false
    },
    download () {
      this.centerDialogVisible = true
    }
  },

  created () {
    let data = this.$route.params.detail || this.formModel
    this.formModel = data
    if (data.crFlag === '0') {
      this.formModel.payerAcNo = data.acNo
      this.formModel.payerAcName = data.acName
      this.formModel.payerFinName = data.operBranchNm
      this.formModel.payeeAcNo = data.oppAcNo
      this.formModel.payeeAcName = data.oppAcName
      this.formModel.payeeFinName = data.oppFinName
    } else {
      this.formModel.payerAcNo = data.oppAcNo
      this.formModel.payerAcName = data.oppAcName
      this.formModel.payerFinName = data.oppFinName
      this.formModel.payeeAcNo = data.acNo
      this.formModel.payeeAcName = data.acName
      this.formModel.payeeFinName = data.operBranchNm
    }
    this.formModel.transDate = util.separationDate(this.formModel.transDate)
    // console.log(this.formModel)
    httpPost('eweb-acmgmt.AcctDetailDetQry.do', this.formModel).then(res => {
      this.imgUrl = 'data:image/bmp;base64,' + res.sealData1
    })
  }
}
</script>

<style lang="scss" scoped>
  .account-detail-detail {
    .box {
      padding: 20px;
      background: #ffffff;
      margin-bottom: 20px;
    }
    .topLogo {
      margin: 0 auto;
      width: 405px;
      img {
        width: 215px;
        height: 100px;
      }
      .title {
        margin-top: 50px;
        margin-left: 30px;
        font-weight: 600;
      }
    }
    .table {
      border-top: 1px solid #333333;
      border-left: 1px solid #333333;
      position: relative;
      z-index: 1;
      img {
        position: absolute;
        top: 140px;
        right: 30px;
        width: 150px;
        z-index: -1;
      }
      .container {
        display: flex;
        .col-1 {
          flex: 1;
          display: flex;
          width: 50%\9;
          display: inline-block\9;
          .col-2 {
            flex: 2;
            width: 40%\9;
            float: left\9;
            display: inline-block\9;
            .col {
              display: flex;
              white-space: nowrap\9;
              width: 100%\9;
              .col-4{
                flex: 1;
                height: 122px;
                line-height: 122px;
                width: calc(100%/3 - 30px)\9;
                display: inline-block\9;
                vertical-align: middle\9;
              }
              .col-5 {
                flex: 2;
                width: calc(100%/3*2)\9;
                display: inline-block\9;
                vertical-align: middle\9;
              }
            }
          }
          .col-3 {
            flex: 3;
            width: 60%\9;
            display: inline-block\9;
          }
        }
      }
      .col-4, .col-7, .row-2, .label {
        text-align: right;
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        border-right: 1px solid #333333;
        border-bottom: 1px solid #333333;
      }
      .row-4 {
        display: flex;
        white-space: nowrap\9;
        .col-6 {
          width: calc(100%/5 - 31px)\9;
          display: inline-block\9;
          vertical-align: middle\9;
          flex: 1;
        }
        .col-7 {
          flex: 4.46;
          width: calc(100%/5*4 - 31px)\9;
          display: inline-block\9;
          vertical-align: middle\9;
          text-align: left;
        }
      }
      .row-2 {
        text-align: left;
        // width: 302px;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .footer {
      margin-top: 40px;
      text-align: center;
      position: relative;

    }
  }
</style>
