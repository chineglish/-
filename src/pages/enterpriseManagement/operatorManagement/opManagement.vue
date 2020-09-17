<template>
  <div class="main">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <d-table
        :table-data="tableData"
        :tableHeadData="tableHeadData"
        :operate-data="operateData"
        :pagesize="pagesize"
        @clickTableLink="clickTableLink"
        @upDate="upDate"
        @detail="detail"
        @resetPassword="resetPassword">
      </d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
    <el-dialog
            :visible.sync="centerDialogVisible"
            width="60%"
            center>
      <div class="prompt fs16">请确认是否为该操作员重置密码？新密码将以短信形式发送给该操作员，请提示操作员注意查收短信。</div>
      <d-vertical-table
        :tabledata="verticalTableData"
        :showOne="showOne"
        :tableStyle="{ width:'80%' }"
      >
      </d-vertical-table>
      <div slot="title" class="dialog-title fs20">
        <img src="../../../components/m-hint-box/prompt.png" class="dialog-img"> 信息确认
      </div>
      <span slot="footer" class="dialog-footer m-form-btn">
        <div class="btn-box">
          <el-button class="m-submit-btn" type="primary" @click="resetPasswordSubmit">确认重置密码</el-button>
        </div>
        <div>
          <el-button class="m-cancel-btn"  @click="centerDialogVisible = false">返回</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>/**
 *@name: 操作员管理
 * @author: 梁文彬,邓焕
 * @date: 2019-12-17
 */

import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { id_type } from '@/assets/js/entity'
// import { Sign } from '@/assets/js/SignMsg'

export default {
  name: 'opManagement',
  data () {
    const userState = [
      { value: 'N', label: '正常' },
      { value: 'C', label: '销户' },
      { value: 'L', label: '锁定' },
      { value: 'U', label: '待激活' },
      { value: 'F', label: '冻结' },
      { value: 'S', label: '停用' },
      { value: 'T', label: '手机银行首次登录' }
    ]
    return {
      confData: {},
      userId: '',
      userName: '',
      mobilephone: '',
      centerDialogVisible: false,
      breadData: ['企业管理台', '操作员管理'],
      pagesize: 20,
      msgs: [
        '1.具有管理类交易权限的企业操作员使用该功能进行企业操作员管理，可对操作员进行查询和修改。双管理员模式下，管理员还可对操作员进行密码重置。'
      ],
      tableHeadData: [
        { label: '操作员编号', prop: 'userId', clickEventName: 'clickTableLink' },
        { label: '操作员姓名', prop: 'userName' },
        { label: '操作员状态', width: '110px', prop: 'userState', formatter: (row, colunm, cellValue, index) => util.handleEnums(userState, cellValue) },
        { label: '是否为管理员', width: '110px', prop: 'adminUser', formatter: (row, colunm, cellValue, index) => cellValue === '1' ? '是' : '否' },
        { label: '是否开通手机银行', width: '140px', prop: 'isOpenEmbs', formatter: (row, colunm, cellValue, index) => cellValue === 'Y' ? '是' : '否' },
        { label: '证件类型', prop: 'idType', formatter: (row, colunm, cellValue, index) => util.handleEnums(id_type, cellValue) },
        { label: '证件号码', prop: 'idNo', width: '200' }
      ],
      tableData: [],
      operateData: {
        width: '150',
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '修改',
            eventName: 'upDate'
          },
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '详情',
            eventName: 'detail'
          },
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '密码重置',
            eventName: 'resetPassword',
            pick: (row) => {
              return row.adminUser !== '1' && row.cifAuthMode === 'D'
            }
          }
        ]
      },
      showOne: true,
      verticalTableData: []
    }
  },
  methods: {
    upDate (index) {
      this.$router.push({
        name: 'opUpdate',
        params: index
      })
    },
    resetPassword (params) {
      this.verticalTableData = [
        { key: 'userName', label: '操作员姓名', value: params.data.userName },
        { key: 'userId', label: '操作员号', value: params.data.userId },
        { key: 'mobilephone', label: '手机号', value: params.data.mobilephone }
      ]
      this.userId = params.data.userId
      this.userName = params.data.userName
      this.mobilephone = params.data.mobilephone
      httpPost('/eweb-operator.OperatorPasswordResetConfirm.do', {
        userId: params.data.userId
      }).then(sure => {
        this.confData = sure
        this.centerDialogVisible = true
      })
    },
    resetPasswordSubmit () {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.confData._Data2Sign, _authenticateType: this.confData._authenticateType })
        httpPost('/eweb-operator.OperatorPasswordReset.do', {
          _dataMapKey: this.confData._dataMapKey,
          _authenticateTypeChoose: this.confData._authenticateType ? this.confData._authenticateType[0] : '',
          CSIISignature: singMsg,
          _tokenName: token._tokenName,
          userId: this.userId,
          userName: this.userName,
          mobilephone: this.mobilephone
        }).then(res => {
          const user = this.getUser()
          this.$router.push({
            name: 'resetPasswordRes',
            params: {
              msg: {
                JnlStatus: res._processState,
                _jnlNo: res._jnlNo,
                operatorId: res.userId ? res.userId : user ? user.userId : '',
                operatorName: res.userName ? res.userName : user ? user.userName : '',
                transName: res.transName ? res.transName : '操作员密码重置',
                transDate: res._transTime
              }
            }
          })
        })
      })
      this.centerDialogVisible = false
    },
    detail (res) {
      this.clickTableLink(res.data)
    },
    clickTableLink (data) {
      // 点击链接进入详情
      this.$router.push({
        name: 'opDetail',
        params: {
          data: data
        }
      })
    },
    operatorListQuery () {
      // 获取表格数据
      httpPost('/eweb-operator.OperatorListQuery.do').then(res => {
        this.tableData = res.list
      })
    }
  },
  created () {
    this.operatorListQuery()
  }
}
</script>

<style scoped>
  .main >>> .el-dialog__header{
    padding: 0;
  }

  .main >>> .el-dialog__close{
    display: none;
  }

  .main >>> .el-dialog__footer{
    border-top: 1px solid #f0f0f0;
  }

  .main >>> .el-dialog__body{
    padding-top: 0;
  }

  .dialog-title{
    text-align: center;
    font-weight: bold;
    background: #FDF2F3;
    color: #333333;
    line-height: 60px;
  }
  .dialog-img{
    width: auto;
    height: 20px;
    margin-bottom: -2px;
  }

  .dialog-footer{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .prompt{
    width: 100%;
    text-align: center;
    line-height: 50px;
  }
</style>
