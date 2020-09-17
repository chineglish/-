<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @submit="onSubmit"
              @back="onBack"
              @changMobileBank="changMobileBank"
              @inputVerification="inputVerification"
            >
                <div slot="verificationRight">
                    <el-button class="verification-btn" type="info" @click="submitVerification">{{ btnText }}</el-button>
                </div>
            </m-new-form>
        </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { id_type, asFlag_Type, gender_type } from '@/assets/js/entity'
import util from '@/libs/util'

/**
 *@name:操作员管理-修改
 */
export default {
  name: 'opUpdate',
  data () {
    return {
      totalCount: 0,
      breadData: ['企业管理台', '操作员管理'],
      formModel: {
        id: '',
        name: '',
        certificateType: '',
        certificateNum: '',
        sex: '',
        telephone: '',
        phone: '',
        email: '',
        businessOpening: [],
        roleList: [],
        unAdminRoleList: [],
        adminRoleList: [],
        opaAccount: [],
        checkMessage: '',
        authorizedAcc: []
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          checkMessage: [{ required: true, message: '请输入验证码', trigger: 'submit' }],
          roleList: [{ required: true, message: '操作员角色', trigger: 'submit' }],
          unAdminRoleList: [{ required: true, message: '操作员角色', trigger: 'submit' }],
          adminRoleList: [{ required: true, message: '操作员角色', trigger: 'submit' }],
          opaAccount: [{ required: true, message: '可操作账户', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '操作员号',
                'type': 'text',
                'key': 'userId',
                formatter: (key, value) => value || '--'
              },
              {
                'disabled': true,
                'label': '操作员姓名',
                'type': 'text',
                'key': 'userName',
                formatter: (key, value) => value || '--'
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
                formatter: (key, value) => value || '--'
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
              //   'key': 'phone'
              // },
              {
                'disabled': true,
                'label': '手机号码',
                'type': 'text',
                'key': 'mobilephone',
                formatter: (key, value) => value || '--'
              },
              {
                'disabled': true,
                'label': 'Email地址',
                'type': 'text',
                'key': 'email',
                formatter: (key, value) => value || '--'
              },
              {
                'disabled': true,
                'label': '是否管理员',
                'type': 'text',
                'key': 'adminUser',
                formatter: (key, value) => util.handleEnums(asFlag_Type, value)
              }
            ]
          },
          {
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '操作员角色',
                'type': 'radio',
                'key': 'roleSeq',
                'options': [],
                trans: { value: 'roleName', key: 'roleSeq' },
                changeEvent: 'changeAct'
              },
              {
                'label': '业务开通',
                'type': 'checkbox',
                'key': 'businessOpening',
                changeEvent: 'changMobileBank',
                'options': [
                  { 'value': '网上银行', 'key': '0', 'disabled': true },
                  { 'value': '手机银行', 'key': '1', disabled: true }
                ]
              },
              {
                'disabled': false,
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
    onSubmit (params) {
      let _params = params
      let list = []
      _params.cifAcList.forEach(item => {
        _params.opaAccount.forEach(account => {
          if (item.acNo === (account.substring(0, account.indexOf('/')))) {
            list.push(item)
          }
        })
      })
      _params.cifAcList = list
      httpPost('eweb-operator.OperatorModifyConfirm.do', {
        roleSeq: _params.roleSeq,
        userSeq: _params.userSeq,
        acList: _params.cifAcList,
        isOpenEmbs: _params.businessOpening.length === 2,
        checkMessage: this.formModel.checkMessage,
        mobilephone: this.formModel.mobilephone
      }).then(res => {
        this.$router.push({
          name: 'opUpdateConf',
          params: {
            formModel: _params,
            _Data2Sign: res._Data2Sign,
            _dataMapKey: res._dataMapKey,
            _authenticateType: res._authenticateType
          }
        })
      })
    },
    onBack () {
      this.$router.push('/opManagement')
    },
    changMobileBank (res) {
      if (res.businessOpening.indexOf('手机银行') === -1 && this.formConfigJson.formItems[1].group[2].key === 'checkMessage') {
        this.formConfigJson.formItems[1].group.splice(2, 1)
      } else if (res.businessOpening.indexOf('手机银行') !== -1) {
        this.formConfigJson.formItems[1].group.splice(2, 0, {
          'disabled': false,
          'label': '验证码',
          'type': 'input',
          'key': 'checkMessage',
          interval: undefined,
          totalCount: 0,
          changeEventName: 'inputVerification',
          rightSlotName: 'verificationRight'
        })
      }
    },
    inputVerification (res) {
      this.formModel.checkMessage = res.checkMessage
    },
    submitVerification () {
    //    发送接口获取验证码
      httpPost('eweb-operator.OperatorModifyMessage.do', {
        mobilePhone: this.formModel.mobilephone
      }).then(res => {
        this.disabled = true
        this.totalCount = 60
        this.interval = setInterval(() => {
          this.totalCount--
          if (this.totalCount === 0) {
            clearTimeout(this.interval)
            this.disabled = false
          }
        }, 1000)
      })
    },
    // 获取可操作账户列表
    OperatorInfoQuery () {
      let params = {
        userId: this.$route.params.data.userId // 用户顺序号
      }
      httpPost('/eweb-operator.OperatorModifyQuery.do', params).then(result => {
        this.formModel = result
        this.formModel.adminRoleList = []
        this.formModel.unAdminRoleList = []
        this.formModel.opaAccount = []
        let rightFlag = ''
        // let disabled = false
        this.formModel.roleList.forEach((item, index) => {
          if (item.adminRoleFlag) {
            // 管理员角色集合
            this.formModel.adminRoleList.push(item)
          } else {
            // 非管理员角色集合
            this.formModel.unAdminRoleList.push(item)
          }
        })
        this.formModel.cifChannelList.forEach(item => {
          if (item.mchannel === 'EMBS') {
            // 根据客户手机银行渠道开启判断是否可开通手机银行
            this.formConfigJson.formItems[1].group[1].options[1].disabled = false
          }
        })
        if (this.formModel.adminUser === '1') {
          // 管理员
          this.formConfigJson.formItems[1].group[0].options = this.formModel.adminRoleList
          this.formConfigJson.formItems[1].group[0].disabled = true
        } else if (this.formModel.adminUser === '0') {
          // 非管理员
          this.formConfigJson.formItems[1].group[0].options = this.formModel.unAdminRoleList
        }
        // 初始化业务开通选项勾选, 默认开启网上银行
        this.formModel.businessOpening = ['网上银行']
        if (this.formModel.isOpenEmbs === 'Y') {
          this.formModel.businessOpening.push('手机银行')
        }
        // 我也不知道这个判断列表长度有什么用, 但由于猜不到之前的想法,所以先不删了
        // if (this.formModel.cifAcList.length === 1 && typeof (this.formModel.cifAcList[0]) !== 'object') {
        //   this.formConfigJson.formItems[1].group[2].options = [{ value: this.formModel.cifAcList[0], key: '0' }]
        //   this.formConfigJson.formItems[1].group[3].options = [{ value: this.formModel.cifAcList[0], key: '0' }]
        // } else {
        // 可操作账户
        this.formModel.cifAcList.forEach((item, index) => {
          // 获取账户的操作权限
          if (item.rightFlag === 'FT') {
            rightFlag = '任意转出'
          } else if (item.rightFlag === 'EIT') {
            rightFlag = '只划至本企业'
          } else if (item.rightFlag === 'Q') {
            rightFlag = '仅开通查询'
          } else if (item.rightFlag === 'SPT') {
            rightFlag = '指定收款人'
          } else if (item.rightFlag === 'FTE') {
            rightFlag = '任意转出 + 现金管理'
          } else if (item.rightFlag === 'AT') {
            rightFlag = '只划至被授权人'
          } else {
            rightFlag = '没有权限'
          }
          // 如果authFlag=== '1'可操作账户不可点击
          if (item.authFlag === '1') {
            // disabled = true
          } else {
            if (item.signFlag) {
            // 判断当前操作员是否具有操作该账号的权限
              this.formModel.opaAccount.push(item.acNo + '/' + item.acName + '/' + item.openBank + '/' + rightFlag)
            }
            // 组装该客户下可操作的所有账号
            this.formConfigJson.formItems[1].group[2].options.push({
              value: item.acNo + '/' + item.acName + '/' + item.openBank + '/' + rightFlag,
              key: index
            })
          }
        }
        )
        // }
        this.formModel.authorizedAcc = []
        // 企业授权账户
        this.formModel.authAcList.forEach((item, index) => {
          if (item.rightFlag === 'FT') {
            rightFlag = '任意转出'
          } else if (item.rightFlag === 'EIT') {
            rightFlag = '只划至本企业'
          } else if (item.rightFlag === 'Q') {
            rightFlag = '仅开通查询'
          } else if (item.rightFlag === 'SPT') {
            rightFlag = '指定收款人'
          } else if (item.rightFlag === 'FTE') {
            rightFlag = '任意转出 + 现金管理'
          } else if (item.rightFlag === 'AT') {
            rightFlag = '只划至被授权人'
          } else {
            rightFlag = '没有权限'
          }
          this.formModel.authorizedAcc.push(item.acNo + '/' + item.acName + '/' + item.openBank + '/' + rightFlag)
          this.formConfigJson.formItems[1].group[3].options.push(
            {
              value: item.acNo + '/' + item.acName + '/' + item.openBank + '/' + rightFlag,
              key: index
            })
        })
        this.formModel.rolenameList = this.formConfigJson.formItems[1].group[0].options
        this.formModel.opaAccountList = this.formConfigJson.formItems[1].group[2].options
        this.formModel.authorizedAccList = this.formConfigJson.formItems[1].group[3].options
      })
    }
  },
  created () {
    if (this.$route.params.data) {
      this.OperatorInfoQuery()
    } else if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
      switch (this.formModel.adminUser) {
        case '1':
          this.formConfigJson.formItems[1].group[0].options = this.formModel.adminRoleList
          break
        case '0':
          this.formConfigJson.formItems[1].group[0].options = this.formModel.unAdminRoleList
          break
      }
      this.formConfigJson.formItems[1].group[2].options = this.formModel.opaAccountList
      this.formConfigJson.formItems[1].group[3].options = this.formModel.authorizedAccList
      this.changMobileBank(this.formModel)
    } else {
      this.back()
    }
  },
  computed: {
    btnText () {
      return this.totalCount === 0 ? '获取验证码' : `${this.totalCount}秒再次获取验证码`
    }
  }
}
</script>

<style scoped>
  .verification-btn{
      background-color: #cc444d;
      margin-left: 20px;
      padding-left: 5px;
      padding-right: 5px;
      border-color: #ffffff;
      border-radius: 5px;
  }
  .form-box >>> .el-checkbox__input.is-disabled+span.el-checkbox__label {
    color: #333333;
  }
</style>
