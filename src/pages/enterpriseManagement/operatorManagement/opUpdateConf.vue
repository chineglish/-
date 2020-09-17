<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @submit="submit"
                    @back="back"
            >
            </m-new-form>
        </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { id_type, gender_type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'opUpdateConf',
  data () {
    return {
      breadData: ['企业管理台', '操作员管理'],
      formModel: {
        businessOpening: [],
        administrator: '',
        roleList: [],
        opaAccount: [],
        verificationCode: '',
        authorizedAcc: []
      },
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '操作员号',
                'type': 'text',
                'key': 'userId'
              },
              {
                'disabled': true,
                'label': '操作员姓名',
                'type': 'text',
                'key': 'userName'
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
                'key': 'idNo'
              },
              {
                'disabled': true,
                'label': '性别',
                'type': 'text',
                'key': 'gender',
                formatter: (key, value) => value ? util.handleEnums(gender_type, value) : '--'
              },
              // {
              //   'disabled': true,
              //   'label': '联系电话',
              //   'type': 'text',
              //   'key': 'telephone'
              // },
              {
                'disabled': true,
                'label': '手机号码',
                'type': 'text',
                'key': 'mobilephone'
              },
              {
                'disabled': true,
                'label': 'Email地址',
                'type': 'text',
                'key': 'email'
              },
              {
                'disabled': true,
                'label': '是否管理员',
                'type': 'text',
                'key': 'administrator'
              }
            ]
          },
          {
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '操作员角色',
                'type': 'radio',
                'key': 'roleSeq',
                'options': [],
                trans: { value: 'roleName', key: 'roleSeq' }
              },
              {
                'disabled': true,
                'label': '业务开通',
                'type': 'checkbox',
                'key': 'businessOpening',
                'options': [
                  { 'value': '网上银行', 'key': '0' },
                  { 'value': '手机银行', 'key': '1' }
                ]
              },
              {
                'disabled': true,
                'label': '可操作账户',
                'type': 'checkbox',
                'key': 'opaAccount',
                'options': []
              },
              {
                'disabled': true,
                'label': '企业授权账号',
                'type': 'checkbox',
                'key': 'authorizedAcc',
                'options': []
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    submit (params) {
      let _params = this.$route.params.formModel
      httpPost('/eweb-common.GenToken.do').then(token => {
        this.formModel._tokenName = token._tokenName
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        httpPost('/eweb-operator.OperatorModify.do', {
          ..._params,
          roleSeq: _params.roleSeq,
          _tokenName: token._tokenName,
          acList: _params.cifAcList,
          isOpenEmbs: _params.businessOpening.length === 2,
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg
        }).then(res => {
          _params.JnlStatus = res._processState
          _params._jnlNo = res._jnlNo
          _params.transDate = res._transTime
          _params.transName = res.transName
          _params.operatorName = res.userName
          _params.operatorId = res.userId
          this.$router.push({
            name: 'opUpdateRes',
            params: {
              ...params,
              JnlStatus: res._processState,
              _jnlNo: res._jnlNo,
              transDate: res._transTime,
              transName: res.transName,
              operatorName: res.userName,
              operatorId: res.userId,
              _Data2Sign: res._Data2Sign,
              _authenticateType: res._authenticateType
            }
          })
        })
      })
    },
    back (res) {
      this.$router.push({
        name: 'opUpdate',
        params: {
          formModel: this.$route.params.formModel
        }
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
      if (this.formModel.adminUser === '1') {
        this.formModel.administrator = '是'
        this.formConfigJson.formItems[1].group[0].options = this.formModel.adminRoleList
      } else {
        this.formModel.administrator = '否'
        this.formConfigJson.formItems[1].group[0].options = this.formModel.unAdminRoleList
      }
      this.formConfigJson.formItems[1].group[2].options = this.formModel.opaAccountList
      this.formConfigJson.formItems[1].group[3].options = this.formModel.authorizedAccList
    } else {
      this.$router.push('/opManagement')
    }
  }
}
</script>

<style scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
    .form-box >>> .el-checkbox__input.is-disabled+span.el-checkbox__label {
      color: #333333;
    }
</style>
