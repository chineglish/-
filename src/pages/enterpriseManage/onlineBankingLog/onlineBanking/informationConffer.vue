<template>
  <div>
    <div class="card">
      <div class="boxWrap">
        <div class="left">
          <img id="headerImg" :src="headerImg">
        </div>
        <div class="right">
          <m-new-form
            :componentJson="formConfigJson"
            :formModel="formModel"
          ></m-new-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util'
import { cert_state, id_type, user_state } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'informationConffer',
  data () {
    return {
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
                'key': 'userAlias'
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
      }
    }
  },
  created () {
    // 初始化数据,如果没有数据跳转录入页
    if (this.formModel) {
      this.headerImg = `${util.getUrl()}header/${this.formModel.picId}@3x.png`
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
