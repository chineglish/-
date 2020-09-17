<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="card">
      <m-steps :data="stepsData"></m-steps>
      <div class="boxWrap">
        <div class="left">
          <img id="headerImg" :src="headerImg">
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
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { cert_state, id_type, user_state } from '@/assets/js/entity'

export default {
  name: 'informationPre',
  data () {
    return {
      breadData: ['企业管理台', '个人信息维护'],
      formModel: {},
      headerImg: '',
      formConfigJson: {
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
                formatter: (key, value) => util.hideMsg(value, 6, 4)
              },
              {
                'disabled': true,
                'label': 'E-mail',
                'type': 'text',
                'key': 'email'
              },
              {
                'disabled': true,
                'label': '手机号码',
                'type': 'text',
                'key': 'mobilePhone'
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
        stepsActive: 1,
        stepsData: [
          '信息录入',
          '交易确认',
          '提交结果'
        ]
      },
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    // 提交个人信息修改
    goConfirm (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        httpPost('eweb-operator.OperatorInfoModify.do', {
          userSeq: this.getUser().userSeq,
          userId: this.getUser().userId,
          cifNo: this.getUser().cif.coreCifNo,
          userAlias: data.alias,
          mobilePhone: data.mobilePhone,
          email: data.email,
          picId: data.picId,
          _tokenName: token._tokenName,
          ...this.formModel
        }).then(res => {
          this.$router.push({
            name: 'informationRes',
            params: {
              formModel: res.userChannel,
              res
            }
          })
        })
      })
    },
    // 返回录入页
    goBack () {
      this.$router.push({
        name: 'informationPre',
        params: {
          formModel: this.$route.params.formModel
        }
      })
    }
  },
  created () {
    // 初始化数据,如果没有数据跳转录入页
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      this.headerImg = `${util.getUrl()}header/${this.$route.params.formModel.picId}@3x.png`
    } else {
      this.$router.push('/queryInformation')
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
        img {
          position: absolute;
          left: 24%;
          top: 40%;
          width: 80px;
          height: 80px;
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
