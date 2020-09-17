<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="card">
          <m-steps :data="stepsData"></m-steps>
          <div class="boxWrap">
            <div class="left">
              <img id="headerImg" :src="headerImg">
              <button class="fs14" @click="showHeaderSelect = true">选择</button>
            </div>
            <div class="right">
              <m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @submit="goConfirm"
                @back="goBack"
              ></m-new-form>
            </div>
          </div>
        </div>
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
import util from '@/libs/util'
import { cert_state, id_type, user_state } from '@/assets/js/entity'

export default {
  name: 'informationPre',
  data () {
    return {
      showHeaderSelect: false,
      headerImg: `${util.getUrl()}header/header1@3x.png`,
      breadData: ['企业管理台', '个人信息维护'],
      formModel: {},
      formConfigJson: {
        rules: {
          alias: this.$route.params.formModel.cmsCorpNo ? [] : [{ required: true, message: '请输入昵称', trigger: 'submit' }, { validator: (rule, value, callback) => util.verifyNickName(value, callback), trigger: 'submit' }],
          email: [{ required: false, message: '请输入邮箱', trigger: 'submit' }, { validator: (rule, value, callback) => util.verifyEmail(value, callback), trigger: 'submit' }],
          mobilePhone: [{ required: true, message: '请输入手机号码', trigger: 'submit' }, { validator: (rule, value, callback) => util.verifyMobile(value, callback), trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
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
                'disabled': !!this.$route.params.formModel.cmsCorpNo,
                'label': '昵称',
                'type': 'input',
                'key': 'alias',
                maxlength: 20
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
                formatter: (key, value) => util.hideMsg(value, 6, 4)
              },
              {
                'disabled': false,
                'label': 'E-mail',
                'type': 'input',
                'key': 'email'
              },
              {
                'disabled': false,
                'label': '手机号码',
                'type': 'input',
                'key': 'mobilePhone',
                maxlength: 11
              },
              {
                'disabled': true,
                'label': '操作员角色',
                'type': 'text',
                'key': 'role'
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
                'label': 'USBKey ID',
                'type': 'text',
                'key': 'usbKeyId'
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
                'label': '证书有效期',
                'type': 'text',
                'key': 'expireDate'
              },
              {
                'disabled': true,
                'label': '证书缴费日期',
                'type': 'text',
                'key': 'feeDate'
              }
            ]
          }
        ]
      },
      stepsData: {
        stepsActive: 0,
        stepsData: [
          '信息录入',
          '交易确认',
          '提交结果'
        ]
      },
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      leaveState: false,
      userChannel: [],
      userAlias: '',
      mobilePhone: '',
      email: ''
    }
  },
  methods: {
    // 初始化获取所有头像地址
    getHeader (index) {
      return `${util.getUrl()}header/header${index}@3x.png`
    },
    // 选择头像
    changHeaderImg (index) {
      this.headerImg = `${util.getUrl()}header/header${index}@3x.png`
      this.formModel.picId = `header${index}`
      this.showHeaderSelect = false
    },
    // 跳转确认页
    goConfirm (data) {
      data.headerImg = this.headerImg
      this.$router.push({
        name: 'informationConf',
        params: {
          formModel: data
        }
      })
    },
    // 返回个人信息管理页面
    goBack () {
      this.$router.push('/queryInformation')
    }
  },
  created () {
    if (this.$route.params.formModel) {
      // 初始化当前用户头像
      this.headerImg = `${util.getUrl()}header/${this.$route.params.formModel.picId}@3x.png`
      this.formModel = this.$route.params.formModel
    }
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
          }
          button {
            position: absolute;
            top: 60%;
            left: 31%;
            width: 60px;
            border-radius: 6px;
            cursor: pointer;
            outline: none;
            border: 0px;
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
