<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="card">
      <div class="boxWrap">
        <div class="left">
          <img id="headerImg" :src="headerImg" @click="showHeaderSelect = true" >
          <span class="header-msg fs14">点击图片修改头像</span>
        </div>
        <div class="right">
          <m-new-form
            :componentJson="formConfigJson"
            :btnData="btnData"
            :formModel="formModel"
            @goInformation="goInformation"
            @goPwdChange="goPwdChange"
          >
           <div slot="textSlot" style="color: #009CD8;cursor: pointer;" @click="lookRole">查看</div>
          <div slot="acList" v-for="(item,index) in formModel.account" :key="index">
            <div >{{getAccount(item)}}</div>
          </div>
          </m-new-form>
        </div>
      </div>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
    <el-dialog title="角色详情" width="1260px" :visible.sync="showRoleDetails">
      <role-details :roleName="roleName" :defaultFlag="defaultFlag" :adminRoleFlag="adminRoleFlag" :roleSeq="roleSeq"></role-details>
    </el-dialog>
    <el-dialog title="选择头像" width="1260px" :visible.sync="showHeaderSelect">
      <!-- 循环遍历所有头像,24是头像库里的所有头像数量,如果有新增必须修改 -->
      <img
        v-for="(item, index) in 24"
        :key="index"
        @click="changHeaderImg(item)"
        style="width: 100px; height: 100px; padding: 10px"
        :src="getHeader(item)">
    </el-dialog>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import RoleDetails from './roleDetails'
import { cert_state, id_type, user_state, right_flag } from '@/assets/js/entity'

export default {
  name: 'queryInformation',
  components: {
    RoleDetails
  },
  data () {
    return {
      showHeaderSelect: false,
      showRoleDetails: false,
      defaultFlag: false,
      adminRoleFlag: false,
      roleName: '',
      roleSeq: 0,
      headerImg: '',
      breadData: ['企业管理台', '个人信息维护'],
      msgs: [
        '可实现操作员对个人信息的查询、修改功能。'
      ],
      formModel: {},
      formConfigJson: {
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '操作员姓名',
                'type': 'text',
                'key': 'name'
              },
              {
                'disabled': true,
                'label': '操作员号',
                'type': 'text',
                'key': 'userId'
              },
              {
                'disabled': true,
                'label': '昵称',
                'type': 'text',
                'key': 'alias'
              },
              {
                'disabled': true,
                'label': '性别',
                'type': 'text',
                'key': 'gender',
                formatter: (key, value) => value === '0' ? '男' : value === '1' ? '女' : '未知'
              },
              {
                'disabled': true,
                'label': '证件类型',
                'type': 'text',
                'key': 'idType',
                formatter: (key, value) => util.handleEnums(id_type, value)
              },
              {
                'disabled': true,
                'label': '证件号码',
                'type': 'text',
                'key': 'idNo',
                // formatter: (key, value) => util.hideMsg(value, 6, 4)
                formatter: (key, value) => util.acNoFormatExt(String(value))
              },
              {
                'disabled': true,
                'label': '手机号码',
                'type': 'text',
                'key': 'mobilePhone'
              },
              {
                'disabled': true,
                'label': 'E-mail',
                'type': 'text',
                'key': 'email'
              },
              {
                'disabled': true,
                'label': '操作员状态',
                'type': 'text',
                'key': 'userState',
                formatter: (key, value) => util.handleEnums(user_state, value)
              },
              {
                'disabled': true,
                'label': '操作员角色',
                'type': 'text',
                'key': 'role',
                textSlot: 'textSlot'
              },
              {
                'disabled': true,
                'label': 'USBKey ID',
                'type': 'text',
                'key': 'usbKeyId'
              },
              {
                'label': ''
              },
              {
                'disabled': true,
                'label': '证书状态',
                'type': 'text',
                'key': 'certState',
                formatter: (key, value) => util.handleEnums(cert_state, value)
              },
              {
                'disabled': true,
                'label': '证书到期日期',
                'type': 'text',
                'key': 'expireDate'
              },
              {
                'disabled': true,
                'label': '证书应续费日期',
                'type': 'text',
                'key': 'nextFeeDate'
              },
              {
                'disabled': true,
                'label': '证书上次缴费日期',
                'type': 'text',
                'key': 'feeDate'
              }
            ]
          },
          {
            formWidth: '100%',
            labelWidth: '20%',
            group: [
              {
                'disabled': true,
                'label': '业务开通',
                'type': 'checkbox',
                'key': 'businessOpen',
                options: [{ value: '网上银行', key: 0 }, { value: '手机银行', key: 1 }]
              },
              {
                'disabled': true,
                'label': '可操作账户',
                slotName: 'acList'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '修改', class: 'm-submit-btn', clickEventName: 'goInformation' },
        { btnText: '密码修改', class: 'm-submit-btn', clickEventName: 'goPwdChange' }
      ]
    }
  },
  methods: {
    // 显示角色详情
    lookRole () {
      this.showRoleDetails = true
    },
    // 初始化获取所有头像地址
    getHeader (index) {
      return `${util.getUrl()}header/header${index}@3x.png`
    },
    // 跳转修改个人信息页面
    goInformation (data) {
      this.$router.push({
        name: 'informationPre',
        params: {
          formModel: data
        }
      })
    },
    // 拼接可操作账户
    getAccount (item) {
      return item.mainAcNo + '/' + item.acName + '/' + item.openBank + '  ' + util.handleEnums(right_flag, item.rightFlag)
    },
    // 跳转修改密码页面
    goPwdChange (data) {
      this.$router.push({
        name: 'pwdChange',
        params: {
          formModel: data
        }
      })
    },
    // 更改用户头像, 只修改用户头像,未修改其他
    changHeaderImg (index) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        httpPost('eweb-operator.OperatorInfoModify.do', {
          userSeq: this.getUser().userSeq,
          userId: this.getUser().userId,
          cifNo: this.getUser().cif.coreCifNo,
          userAlias: this.formModel.alias,
          name: this.formModel.name,
          gender: this.formModel.gender,
          idType: this.formModel.idType,
          idNo: this.formModel.idNo,
          role: this.formModel.role,
          userState: this.formModel.userState,
          usbKeyId: this.formModel.usbKeyId,
          certState: this.formModel.certState,
          expireDate: this.formModel.expireDate,
          feeDate: this.formModel.feeDate,
          mobilePhone: this.formModel.mobilePhone,
          email: this.formModel.email,
          picId: `header${index}`,
          _tokenName: token._tokenName
        }).then(res => {
          this.showHeaderSelect = false
          this.formModel.picId = `header${index}`
          this.$message.success('修改成功')
          this.headerImg = `${util.getUrl()}header/header${index}@3x.png`
        })
      })
    }
  },
  created () {
    httpPost('/eweb-operator.OperatorInfoQuery.do').then(res => {
      this.formModel = res
      // 初始化当前用户头像
      if (res.picId === '' || res.picId === null) {
        this.headerImg = `${util.getUrl()}header/header1@3x.png`
      } else {
        this.headerImg = `${util.getUrl()}header/${res.picId}@3x.png`
      }
      if (res.roleList.length > 0) {
        let role = res.roleList[0]
        this.roleSeq = role.roleSeq
        this.adminRoleFlag = role.adminRoleFlag
        this.defaultFlag = role.defaultFlag
        this.roleName = role.roleName
      }

      // 初始化业务开通选项
      if (res.isOpenEmbs === '1') {
        this.formModel.businessOpen = ['网上银行', '手机银行']
      } else {
        this.formModel.businessOpen = ['网上银行']
      }
    })
  }
}
</script>

<style lang="scss" scoped>
 .card {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  background: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  .boxWrap {
      display: flex;
      width: 100%;;
      .left {
        flex: 1;
        width: calc(100%/8)\9;
        position: relative;
        border-bottom: 1px solid #EEEEEE;
        display: inline-block\9;
        vertical-align: middle\9;
        height: 420px\9;
        img {
          position: absolute;
          left: 24%;
          top: 40%;
          width: 80px;
          height: 80px;
          cursor: pointer;
        }
        .header-msg{
          position: absolute;
          top: 55%;
          width: 100%;
          text-align: center;
          left: 0;
          color: #666;
        }
        button {
          position: absolute;
          top: 60%;
          left: 31%;
          width: 60px;
          border-radius: 6px;
          cursor: pointer;
          outline: none;
          color: #fff;
          background-color: #cc444d;
          background-image: linear-gradient(0deg, #710A0B 0%, #C21D1F 17%, #E72E32 86%, #FFA1A3 100%);
        }
      }
      .right {
          flex: 7;
          width: calc(100%/8*7)\9;
          display: inline-block\9;
          vertical-align: middle\9;
      }
  }
}
</style>
